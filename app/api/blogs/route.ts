import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const defaultSeedBlogs = [
  {
    title: "Building Modern Web Applications with Next.js 15 App Router",
    slug: "building-modern-web-applications-nextjs-15",
    category: "Web Dev",
    views: 1240,
    status: "Published",
    content: "Explore the new features of Next.js 15 App Router, Server Components, and optimized rendering strategies for modern web apps.",
  },
  {
    title: "Mastering Tailwind CSS v4 in Personal Portfolios",
    slug: "mastering-tailwind-css-v4-portfolios",
    category: "CSS & Design",
    views: 850,
    status: "Published",
    content: "Tailwind CSS v4 introduces high performance CSS engine and CSS variables design token syntax. Learn how to craft modern dark-mode interfaces.",
  },
  {
    title: "Optimizing Web Vitals & Image Performance in React",
    slug: "optimizing-web-vitals-image-performance-react",
    category: "Performance",
    views: 0,
    status: "Draft",
    content: "Learn how to optimize Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) using next/image and modern web optimization techniques.",
  },
];

// Helper to generate URL-safe slugs
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET: Fetch all blog posts
export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST: Create a new blog post
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, status, content, coverImage } = body;

    if (!title || !category) {
      return NextResponse.json(
        { error: "Title and Category are required" },
        { status: 400 }
      );
    }

    let slug = slugify(title);
    // Ensure slug uniqueness
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const newBlog = await prisma.blogPost.create({
      data: {
        title,
        slug,
        category,
        status: status || "Published",
        content: content || "",
        coverImage: coverImage || "",
      },
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing blog post
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, category, status, content, coverImage } = body;

    if (!id || !title || !category) {
      return NextResponse.json(
        { error: "Blog ID, Title, and Category are required" },
        { status: 400 }
      );
    }

    const updatedBlog = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        category,
        status: status || "Published",
        content: content || "",
        coverImage: coverImage || "",
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a blog post by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Blog post deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
