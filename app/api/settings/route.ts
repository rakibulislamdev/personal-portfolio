import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Ensure schema columns exist in DB (safeguard for dynamic Prisma schema updates)
async function ensureDbColumns() {
  try {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "ProfileSettings" ADD COLUMN IF NOT EXISTS "resumeUrl" TEXT DEFAULT '';`
    );
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "ProfileSettings" ADD COLUMN IF NOT EXISTS "enabledSkills" TEXT DEFAULT '';`
    );
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "ProfileSettings" ADD COLUMN IF NOT EXISTS "profileImageAlt" TEXT DEFAULT 'Rakibul Islam - Full Stack & MERN Web Developer';`
    );
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "ProfileSettings" ADD COLUMN IF NOT EXISTS "aboutImageAlt" TEXT DEFAULT 'Rakibul Islam - About Profile Photo';`
    );
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "ProfileSettings" ADD COLUMN IF NOT EXISTS "experiences" TEXT DEFAULT '[]';`
    );
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "ProfileSettings" ADD COLUMN IF NOT EXISTS "educations" TEXT DEFAULT '[]';`
    );
  } catch (err) {
    // Table or column already exists / migration handled
  }
}

// GET: Fetch current profile settings
export async function GET() {
  try {
    await ensureDbColumns();

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
          profileImageAlt: "Rakibul Islam - Full Stack & MERN Web Developer",
          aboutImage: "/assets/Images/rakibulislam.jpg",
          aboutImageAlt: "Rakibul Islam - About Profile Photo",
          typewriterText: "Web Developer based in Bangladesh",
          aboutBio:
            "I am a Dhaka, Bangladesh-based web developer with a focus on web development. I have a diverse range of experience having worked on various web applications.",
          experienceMonths: 6,
          clientsWorldwide: 25,
          experiences: JSON.stringify([
            { id: "1", year: "2023 - 2024", title: "Fiverr (Marketplace)", role: "Junior Web Developer" },
            { id: "2", year: "2023 - Present", title: "Programming Hero", role: "Web Development Learner" },
          ]),
          educations: JSON.stringify([
            { id: "1", year: "2021 - 2025", title: "Diploma in Computer Science & Technology", institution: "Pabna Polytechnic Institute, Pabna" },
          ]),
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
    await ensureDbColumns();
    const body = await req.json();

    // Direct SQL update to ensure reliability across Turbopack / Prisma DMMF caching
    await prisma.$executeRawUnsafe(
      `UPDATE "ProfileSettings" SET 
        "name" = $1,
        "title" = $2,
        "email" = $3,
        "phone" = $4,
        "location" = $5,
        "github" = $6,
        "linkedin" = $7,
        "facebook" = $8,
        "twitter" = $9,
        "instagram" = $10,
        "githubInContact" = $11,
        "linkedinInContact" = $12,
        "facebookInContact" = $13,
        "twitterInContact" = $14,
        "instagramInContact" = $15,
        "githubInProfilesCard" = $16,
        "linkedinInProfilesCard" = $17,
        "facebookInProfilesCard" = $18,
        "twitterInProfilesCard" = $19,
        "googleAnalyticsId" = $20,
        "metaPixelId" = $21,
        "resumeUrl" = $22,
        "enabledSkills" = $23,
        "profileImage" = $24,
        "profileImageAlt" = $25,
        "aboutImage" = $26,
        "aboutImageAlt" = $27,
        "typewriterText" = $28,
        "aboutBio" = $29,
        "experienceMonths" = $30,
        "experiences" = $31,
        "educations" = $32,
        "updatedAt" = NOW()
      WHERE "id" = 'default'`,
      body.name || "Rakibul Islam",
      body.title || "Web Developer & Frontend Specialist",
      body.email || "rirakib03@gmail.com",
      body.phone || "+8801621-574994",
      body.location || "Dhaka, Bangladesh",
      body.github ?? "",
      body.linkedin ?? "",
      body.facebook ?? "",
      body.twitter ?? "",
      body.instagram ?? "",
      Boolean(body.githubInContact ?? true),
      Boolean(body.linkedinInContact ?? true),
      Boolean(body.facebookInContact ?? true),
      Boolean(body.twitterInContact ?? true),
      Boolean(body.instagramInContact ?? true),
      Boolean(body.githubInProfilesCard ?? true),
      Boolean(body.linkedinInProfilesCard ?? true),
      Boolean(body.facebookInProfilesCard ?? false),
      Boolean(body.twitterInProfilesCard ?? false),
      body.googleAnalyticsId ?? "",
      body.metaPixelId ?? "",
      body.resumeUrl ?? "",
      body.enabledSkills ?? "",
      body.profileImage ?? "",
      body.profileImageAlt ?? "Rakibul Islam - Full Stack & MERN Web Developer",
      body.aboutImage ?? "",
      body.aboutImageAlt ?? "Rakibul Islam - About Profile Photo",
      body.typewriterText || "Web Developer based in Bangladesh",
      body.aboutBio || "I am a Dhaka, Bangladesh-based web developer.",
      Number(body.experienceMonths) || 6,
      body.experiences ?? "[]",
      body.educations ?? "[]"
    );

    revalidatePath("/", "layout");
    try {
      const { revalidateTag } = await import("next/cache");
      (revalidateTag as (tag: string) => void)("profile-settings");
    } catch { }

    const settings = await prisma.profileSettings.findUnique({
      where: { id: "default" },
    });

    return NextResponse.json(settings || body);
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save settings" },
      { status: 500 }
    );
  }
}
