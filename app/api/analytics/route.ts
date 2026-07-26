import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const seedVisitorLogs = [
  { ip: "103.145.72.18", flag: "🇧🇩", country: "Bangladesh", city: "Dhaka", page: "/", device: "Chrome / Windows" },
  { ip: "185.220.101.4", flag: "🇺🇸", country: "United States", city: "New York", page: "/works", device: "Safari / macOS" },
  { ip: "89.207.132.170", flag: "🇬🇧", country: "United Kingdom", city: "London", page: "/contact", device: "Firefox / Linux" },
  { ip: "139.99.104.21", flag: "🇩🇪", country: "Germany", city: "Berlin", page: "/about", device: "Chrome / Android" },
  { ip: "103.145.72.19", flag: "🇧🇩", country: "Bangladesh", city: "Chittagong", page: "/dashboard", device: "Edge / Windows" },
];

export async function GET() {
  try {
    let logs = await prisma.visitorLog.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
    });

    if (logs.length === 0) {
      await prisma.visitorLog.createMany({
        data: seedVisitorLogs,
      });
      logs = await prisma.visitorLog.findMany({
        take: 20,
        orderBy: { createdAt: "desc" },
      });
    }

    const totalVisitors = await prisma.visitorLog.count();

    // Calculate Top Country dynamically
    const countryCounts: Record<string, { count: number; flag: string }> = {};
    logs.forEach((log) => {
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

    const formattedLogs = logs.map((log) => ({
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
      totalVisitors,
      activeLive: logs.length > 0 ? logs.length : 1,
      topCountry,
      logs: formattedLogs,
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
