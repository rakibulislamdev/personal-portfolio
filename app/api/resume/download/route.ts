import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const settings = await prisma.profileSettings.findUnique({
      where: { id: "default" },
    });

    const resumeUrl = settings?.resumeUrl;

    if (!resumeUrl) {
      return NextResponse.json({ error: "No resume file uploaded yet" }, { status: 404 });
    }

    // Remote file (Cloudinary CDN or external link)
    if (resumeUrl.startsWith("http://") || resumeUrl.startsWith("https://")) {
      const res = await fetch(resumeUrl);
      if (!res.ok) {
        // Fallback: Redirect directly if proxy fetch fails
        return NextResponse.redirect(resumeUrl);
      }

      const arrayBuffer = await res.arrayBuffer();
      const headers = new Headers();
      headers.set("Content-Type", "application/pdf");
      headers.set("Content-Disposition", 'attachment; filename="Rakibul Islam.pdf"');

      return new NextResponse(arrayBuffer, { status: 200, headers });
    }

    // Local file stored in public directory
    const cleanPath = resumeUrl.startsWith("/") ? resumeUrl.slice(1) : resumeUrl;
    const localFilePath = path.join(process.cwd(), "public", cleanPath);

    try {
      const fileBuffer = await fs.readFile(localFilePath);
      const headers = new Headers();
      headers.set("Content-Type", "application/pdf");
      headers.set("Content-Disposition", 'attachment; filename="Rakibul Islam.pdf"');

      return new NextResponse(fileBuffer, { status: 200, headers });
    } catch {
      return NextResponse.json({ error: "Resume file not found on server" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in /api/resume/download:", error);
    return NextResponse.json({ error: "Failed to download resume" }, { status: 500 });
  }
}
