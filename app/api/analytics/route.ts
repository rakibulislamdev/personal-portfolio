import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const seedVisitorLogs = [
  { ip: "103.145.72.18", flag: "🇧🇩", country: "Bangladesh", city: "Dhaka", page: "/", device: "Chrome / Windows" },
  { ip: "185.220.101.4", flag: "🇺🇸", country: "United States", city: "New York", page: "/works", device: "Safari / macOS" },
  { ip: "89.207.132.170", flag: "🇬🇧", country: "United Kingdom", city: "London", page: "/contact", device: "Firefox / Linux" },
  { ip: "139.99.104.21", flag: "🇩🇪", country: "Germany", city: "Berlin", page: "/about", device: "Chrome / Android" },
  { ip: "103.145.72.19", flag: "🇧🇩", country: "Bangladesh", city: "Chittagong", page: "/dashboard", device: "Edge / Windows" },
];

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

    let topCountry = { name: "Bangladesh", flag: "🇧🇩", percentage: 45 };
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ip, country, city, flag, page, device } = body;

    const newLog = await prisma.visitorLog.create({
      data: {
        ip: ip || "127.0.0.1",
        country: country || "Unknown",
        city: city || "Unknown",
        flag: flag || "🌐",
        page: page || "/",
        device: device || "Unknown",
      },
    });

    return NextResponse.json({ success: true, log: newLog });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to log visitor" },
      { status: 500 }
    );
  }
}
