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
          phone: "+8801621-574994",
          location: "Dhaka, Bangladesh",
          github: "https://github.com/Rakibul-Islam-1",
          linkedin: "https://linkedin.com/in/rakibul-islam",
          instagram: "https://instagram.com",
          profileImage: "/assets/Images/rakibulislam.jpg",
          aboutImage: "/assets/Images/rakibulislam.jpg",
          typewriterText: "Web Developer based in Bangladesh",
          aboutBio:
            "I am a Dhaka, Bangladesh-based web developer with a focus on web development. I have a diverse range of experience having worked on various web applications.",
          experienceMonths: 6,
          clientsWorldwide: 25,
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

    const updatedSettings = await prisma.profileSettings.upsert({
      where: { id: "default" },
      update: {
        name: body.name || "Rakibul Islam",
        title: body.title || "Web Developer & Frontend Specialist",
        email: body.email || "rirakib03@gmail.com",
        phone: body.phone || "+8801621-574994",
        location: body.location || "Dhaka, Bangladesh",
        github: body.github ?? "",
        linkedin: body.linkedin ?? "",
        facebook: body.facebook ?? "",
        twitter: body.twitter ?? "",
        instagram: body.instagram ?? "",
        githubInContact: Boolean(body.githubInContact ?? true),
        linkedinInContact: Boolean(body.linkedinInContact ?? true),
        facebookInContact: Boolean(body.facebookInContact ?? true),
        twitterInContact: Boolean(body.twitterInContact ?? true),
        instagramInContact: Boolean(body.instagramInContact ?? true),
        githubInProfilesCard: Boolean(body.githubInProfilesCard ?? true),
        linkedinInProfilesCard: Boolean(body.linkedinInProfilesCard ?? true),
        facebookInProfilesCard: Boolean(body.facebookInProfilesCard ?? false),
        twitterInProfilesCard: Boolean(body.twitterInProfilesCard ?? false),
        instagramInProfilesCard: Boolean(body.instagramInProfilesCard ?? false),
        profileImage: body.profileImage ?? "",
        aboutImage: body.aboutImage ?? "",
        typewriterText: body.typewriterText || "Web Developer based in Bangladesh",
        aboutBio:
          body.aboutBio ||
          "I am a Dhaka, Bangladesh-based web developer with a focus on web development. I have a diverse range of experience having worked on various web applications.",
        experienceMonths: Number(body.experienceMonths) || 6,
      },
      create: {
        id: "default",
        name: body.name || "Rakibul Islam",
        title: body.title || "Web Developer & Frontend Specialist",
        email: body.email || "rirakib03@gmail.com",
        phone: body.phone || "+8801621-574994",
        location: body.location || "Dhaka, Bangladesh",
        github: body.github ?? "",
        linkedin: body.linkedin ?? "",
        facebook: body.facebook ?? "",
        twitter: body.twitter ?? "",
        instagram: body.instagram ?? "",
        githubInContact: Boolean(body.githubInContact ?? true),
        linkedinInContact: Boolean(body.linkedinInContact ?? true),
        facebookInContact: Boolean(body.facebookInContact ?? true),
        twitterInContact: Boolean(body.twitterInContact ?? true),
        instagramInContact: Boolean(body.instagramInContact ?? true),
        githubInProfilesCard: Boolean(body.githubInProfilesCard ?? true),
        linkedinInProfilesCard: Boolean(body.linkedinInProfilesCard ?? true),
        facebookInProfilesCard: Boolean(body.facebookInProfilesCard ?? false),
        twitterInProfilesCard: Boolean(body.twitterInProfilesCard ?? false),
        instagramInProfilesCard: Boolean(body.instagramInProfilesCard ?? false),
        googleAnalyticsId: body.googleAnalyticsId ?? "",
        metaPixelId: body.metaPixelId ?? "",
        profileImage: body.profileImage ?? "",
        aboutImage: body.aboutImage ?? "",
        typewriterText: body.typewriterText || "Web Developer based in Bangladesh",
        aboutBio:
          body.aboutBio ||
          "I am a Dhaka, Bangladesh-based web developer with a focus on web development. I have a diverse range of experience having worked on various web applications.",
        experienceMonths: Number(body.experienceMonths) || 6,
      },
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save settings" },
      { status: 500 }
    );
  }
}
