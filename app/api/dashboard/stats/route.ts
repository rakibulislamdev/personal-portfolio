import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Optimal 30-second caching balance for real-time dashboard analytics
export const revalidate = 30;

export async function GET() {
  try {
    // 1. Projects count & recent projects
    const totalProjects = await prisma.project.count();
    let recentProjects = await prisma.project.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });

    if (recentProjects.length === 0) {
      await prisma.project.createMany({
        data: [
          { title: "Fruit Burst", category: "WEB DESIGNING", subtitle: "Online Fruits Shop", image: "/assets/Images/FruitBurst.png" },
          { title: "Cafena", category: "MOBILE DESIGNING", subtitle: "Coffee Shop", image: "/assets/Images/Cafena.png" },
          { title: "Event Vibe Hub", category: "BRANDING", subtitle: "Event Management", image: "/assets/Images/Eventvibehub.png" },
          { title: "Road Riders Hub", category: "PHOTOGRAPHY", subtitle: "Branded Car Shop", image: "/assets/Images/RoadRidersHub.png" },
        ],
      });
      recentProjects = await prisma.project.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
      });
    }

    // 2. Visitor analytics
    const totalVisitors = await prisma.visitorLog.count();
    const visitorLogs = await prisma.visitorLog.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    });

    // Calculate Active Live Visitors (visitors in the last 15 minutes)
    const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
    const recentLiveCount = await prisma.visitorLog.count({
      where: { createdAt: { gte: fifteenMinsAgo } },
    });
    const activeLiveVisitors = recentLiveCount > 0 ? recentLiveCount : (totalVisitors > 0 ? 1 : 0);

    // Calculate Top Visitor Country dynamically
    const allLogsForCountry = await prisma.visitorLog.findMany({
      take: 200,
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

    // 3. Client messages / Inquiries
    let recentMessages = await prisma.message.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });

    if (recentMessages.length === 0) {
      await prisma.message.createMany({
        data: [
          {
            name: "Sarah Jenkins",
            email: "sarah@techcorp.io",
            subject: "Next.js E-Commerce Redesign Project",
            message: "Hi Rakibul, we love your portfolio work and would like to invite you for a contract project rebuilding our storefront in Next.js 15. Are you available?",
            status: "Unread",
          },
          {
            name: "Alex Rivera",
            email: "arivera@designstudio.co",
            subject: "Frontend Developer Remote Role",
            message: "Hello Rakibul, we are looking for a Senior Frontend Developer with expertise in React & Tailwind CSS. Let us know if you'd be open for a call.",
            status: "Replied",
          },
          {
            name: "Michael Chen",
            email: "m.chen@startup.ai",
            subject: "React Native Mobile App Development",
            message: "Hey Rakib, checking in to see your availability for building a cross-platform mobile application for our AI startup.",
            status: "Read",
          },
        ],
      });
      recentMessages = await prisma.message.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
      });
    }

    const unreadMessagesCount = await prisma.message.count({
      where: { status: "Unread" },
    });

    return NextResponse.json({
      totalProjects,
      totalVisitors,
      activeLiveVisitors,
      topCountry,
      recentVisitors: visitorLogs,
      recentProjects,
      recentMessages,
      unreadMessagesCount,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
