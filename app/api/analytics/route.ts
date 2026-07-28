import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getCountryFlag(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function parseDevice(userAgent?: string): string {
  if (!userAgent) return "Browser / Desktop";
  const ua = userAgent.toLowerCase();

  let os = "Desktop";
  if (ua.includes("iphone")) os = "iPhone";
  else if (ua.includes("ipad")) os = "iPad";
  else if (ua.includes("android")) os = "Android Phone";
  else if (ua.includes("macintosh") || ua.includes("mac os")) os = "Mac";
  else if (ua.includes("windows")) os = "Windows PC";
  else if (ua.includes("linux")) os = "Linux PC";

  let browser = "Browser";
  if (ua.includes("edg/")) browser = "Edge";
  else if (ua.includes("chrome") && !ua.includes("edg/")) browser = "Chrome";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  else if (ua.includes("firefox")) browser = "Firefox";

  return `${browser} / ${os}`;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const limitParam = parseInt(searchParams.get("limit") || "10", 10);

    const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const limit = isNaN(limitParam) || limitParam < 1 ? 10 : limitParam;
    const skip = (page - 1) * limit;

    const totalCount = await prisma.visitorLog.count();

    const logs = await prisma.visitorLog.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const totalPages = Math.ceil(totalCount / limit) || 1;

    // Calculate Top Country dynamically
    const allLogsForCountry = await prisma.visitorLog.findMany({
      take: 100,
      orderBy: { createdAt: "desc" },
    });

    const countryCounts: Record<string, { count: number; flag: string }> = {};
    allLogsForCountry.forEach((log: { country?: string | null; flag?: string | null }) => {
      if (log.country && log.country !== "Unknown") {
        if (!countryCounts[log.country]) {
          countryCounts[log.country] = { count: 0, flag: log.flag || "🌐" };
        }
        countryCounts[log.country].count += 1;
      }
    });

    let topCountry = { name: "Bangladesh", flag: "🇧🇩", percentage: 100 };
    const totalWithCountry = Object.values(countryCounts).reduce((acc, curr) => acc + curr.count, 0);

    if (totalWithCountry > 0) {
      let maxCount = 0;
      let topCountryName = "";
      let topFlag = "🌐";

      Object.entries(countryCounts).forEach(([cName, cData]) => {
        if (cData.count > maxCount) {
          maxCount = cData.count;
          topCountryName = cName;
          topFlag = cData.flag;
        }
      });

      if (topCountryName) {
        const percentage = Math.round((maxCount / totalWithCountry) * 100);
        topCountry = { name: topCountryName, flag: topFlag, percentage };
      }
    }

    const formattedLogs = logs.map((log: { id: string; ip: string; country: string; city: string; flag: string; page: string; device: string; createdAt: Date | string }) => ({
      id: log.id,
      ip: log.ip,
      country: log.country,
      city: log.city,
      flag: log.flag,
      page: log.page,
      device: log.device,
      timestamp: new Date(log.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    return NextResponse.json({
      totalVisitors: totalCount,
      activeLive: totalCount > 0 ? totalCount : 1,
      topCountry,
      logs: formattedLogs,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch analytics from database" },
      { status: 500 }
    );
  }
}

// In-memory rate limiting for Analytics Logging (max 20 visitor logs per minute per IP)
const analyticsRateLimitMap = new Map<string, { count: number; resetTime: number }>();
const ANALYTICS_LIMIT_MAX = 20;
const ANALYTICS_WINDOW_MS = 60 * 1000;

setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of analyticsRateLimitMap.entries()) {
    if (now > data.resetTime) {
      analyticsRateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export async function POST(req: Request) {
  try {
    let clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      req.headers.get("cf-connecting-ip") ||
      "";

    const userAgent = req.headers.get("user-agent") || "";
    const detectedDevice = parseDevice(userAgent);

    const body = await req.json().catch(() => ({}));
    const page = body.page || "/";

    // If local or unknown IP, resolve server's public IP for local testing accuracy
    if (!clientIp || clientIp === "127.0.0.1" || clientIp === "::1" || clientIp === "unknown-ip") {
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json", { cache: "no-store" });
        if (ipRes.ok) {
          const ipData = await ipRes.json();
          if (ipData?.ip) clientIp = ipData.ip;
        }
      } catch {
        clientIp = "127.0.0.1";
      }
    }

    const now = Date.now();
    const rateData = analyticsRateLimitMap.get(clientIp);
    if (rateData && now < rateData.resetTime) {
      if (rateData.count >= ANALYTICS_LIMIT_MAX) {
        return NextResponse.json({ success: true, ignored: true });
      }
      rateData.count += 1;
    } else {
      analyticsRateLimitMap.set(clientIp, {
        count: 1,
        resetTime: now + ANALYTICS_WINDOW_MS,
      });
    }

    let country = "Bangladesh";
    let city = "Dhaka";
    let flag = "🇧🇩";

    if (clientIp && clientIp !== "127.0.0.1" && clientIp !== "::1") {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${clientIp}?fields=status,country,countryCode,city`, {
          cache: "no-store",
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.status === "success") {
            country = geoData.country || country;
            city = geoData.city || city;
            flag = getCountryFlag(geoData.countryCode);
          }
        }
      } catch (err) {
        console.error("Geo IP lookup error:", err);
      }
    }

    const newLog = await prisma.visitorLog.create({
      data: {
        ip: clientIp || "127.0.0.1",
        country,
        city,
        flag,
        page,
        device: detectedDevice,
      },
    });

    return NextResponse.json({ success: true, log: newLog });
  } catch (error) {
    console.error("Failed to log visitor:", error);
    return NextResponse.json(
      { error: "Failed to log visitor" },
      { status: 500 }
    );
  }
}
