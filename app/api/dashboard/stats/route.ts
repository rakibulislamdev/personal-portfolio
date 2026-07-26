import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Projects count & recent projects
    const totalProjects = await prisma.project.count();
    let recentProjects = await prisma.project.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });

    if (recentProjects.length === 0) {
      // Trigger project seed if needed
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
