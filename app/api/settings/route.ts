import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch current profile settings
export async function GET() {
  try {
    let settings = await prisma.profileSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.profileSettings.create({
        data: {
          id: "default",
          name: "Rakibul Islam",
          title: "Web Developer & Frontend Specialist",
          email: "rirakib03@gmail.com",
          location: "Pabna, Bangladesh",
          github: "https://github.com/Rakibul-Islam-1",
          linkedin: "https://linkedin.com/in/rakibul-islam",
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PUT: Update profile settings
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { name, title, email, location, github, linkedin } = body;

    const updatedSettings = await prisma.profileSettings.upsert({
      where: { id: "default" },
      update: {
        name,
        title,
        email,
        location,
        github,
        linkedin,
      },
      create: {
        id: "default",
        name: name || "Rakibul Islam",
        title: title || "Web Developer & Frontend Specialist",
        email: email || "rirakib03@gmail.com",
        location: location || "Pabna, Bangladesh",
        github: github || "https://github.com/Rakibul-Islam-1",
        linkedin: linkedin || "https://linkedin.com/in/rakibul-islam",
      },
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    );
  }
}
