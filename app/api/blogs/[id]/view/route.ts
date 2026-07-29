import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieName = `viewed_blog_${id}`;
    const hasViewed = request.cookies.has(cookieName);

    if (!hasViewed) {
      const updated = await prisma.blogPost.update({
        where: { id },
        data: {
          views: {
            increment: 1,
          },
        },
      });

      const response = NextResponse.json({ views: updated.views });
      // Set cookie in the response to expire in 24 hours
      response.cookies.set(cookieName, "true", {
        maxAge: 60 * 60 * 24,
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });
      return response;
    }

    return NextResponse.json({ message: "Already viewed" });
  } catch (error) {
    console.error("View increment API error:", error);
    return NextResponse.json({ error: "Failed to increment view" }, { status: 500 });
  }
}
