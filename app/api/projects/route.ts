import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const defaultSeedProjects = [
  { title: "Fruit Burst", category: "WEB DESIGNING", subtitle: "Online Fruits Shop", image: "/assets/Images/FruitBurst.png" },
  { title: "Cafena", category: "MOBILE DESIGNING", subtitle: "Coffee Shop", image: "/assets/Images/Cafena.png" },
  { title: "Event Vibe Hub", category: "BRANDING", subtitle: "Event Management", image: "/assets/Images/Eventvibehub.png" },
  { title: "Road Riders Hub", category: "PHOTOGRAPHY", subtitle: "Branded Car Shop", image: "/assets/Images/RoadRidersHub.png" },
  { title: "Gamer Zone", category: "MOBILE DESIGNING", subtitle: "Gaming Portal", image: "/assets/Images/GamerZone.png" },
  { title: "Starbucks Web", category: "WEB DESIGNING", subtitle: "Coffee House App", image: "/assets/Images/Starbucks.png" },
];

// GET: Fetch all projects with pagination support
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pageParam = parseInt(searchParams.get("page") || "", 10);
    const limitParam = parseInt(searchParams.get("limit") || "", 10);

    // If page is provided, return paginated data
    if (!isNaN(pageParam) && pageParam > 0) {
      const page = pageParam;
      const limit = isNaN(limitParam) || limitParam < 1 ? 6 : limitParam;
      const skip = (page - 1) * limit;

      const totalCount = await prisma.project.count();
      const projects = await prisma.project.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      });
      const totalPages = Math.ceil(totalCount / limit) || 1;

      return NextResponse.json({
        projects,
        pagination: {
          totalCount,
          totalPages,
          currentPage: page,
          limit,
        },
      });
    }

    // Default: Return all projects if no page param specified
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST: Add a new project
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, subtitle, category, image, altText } = body;

    if (!title || !category || !image) {
      return NextResponse.json(
        { error: "Title, category, and image are required" },
        { status: 400 }
      );
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        subtitle: subtitle || "",
        category,
        image,
        altText: altText || `${title} preview image`,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing project
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, subtitle, category, image, altText } = body;

    if (!id || !title || !category || !image) {
      return NextResponse.json(
        { error: "Project ID, title, category, and image are required" },
        { status: 400 }
      );
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        subtitle: subtitle || "",
        category,
        image,
        altText: altText || `${title} preview image`,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a project by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
