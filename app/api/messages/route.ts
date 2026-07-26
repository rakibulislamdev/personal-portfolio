import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const defaultSeedMessages = [
  {
    name: "Sarah Jenkins",
    email: "sarah@techcorp.io",
    subject: "Next.js E-Commerce Redesign Project",
    message:
      "Hi Rakibul, we love your portfolio work and would like to invite you for a contract project rebuilding our storefront in Next.js 15. Are you available?",
    status: "Unread",
  },
  {
    name: "Alex Rivera",
    email: "arivera@designstudio.co",
    subject: "Frontend Developer Remote Role",
    message:
      "Hello Rakibul, we are looking for a Senior Frontend Developer with expertise in React & Tailwind CSS. Let us know if you'd be open for a call.",
    status: "Replied",
  },
  {
    name: "Michael Chen",
    email: "m.chen@startup.ai",
    subject: "React Native Mobile App Development",
    message:
      "Hey Rakib, checking in to see your availability for building a cross-platform mobile application for our AI startup.",
    status: "Read",
  },
];

// GET: Fetch all messages (with auto-seed)
export async function GET() {
  try {
    let messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (messages.length === 0) {
      await prisma.message.createMany({
        data: defaultSeedMessages,
      });
      messages = await prisma.message.findMany({
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST: Create a new contact inquiry message
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        subject,
        message,
        status: "Unread",
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

// PUT: Update message status (e.g. Read, Replied, Unread)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Message ID and status are required" },
        { status: 400 }
      );
    }

    const updatedMessage = await prisma.message.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedMessage);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update message status" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a message by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 }
      );
    }

    await prisma.message.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
