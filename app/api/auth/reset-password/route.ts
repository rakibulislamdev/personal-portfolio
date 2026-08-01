import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, otp, password } = await req.json();

    if (!email || !otp || !password) {
      return NextResponse.json(
        { error: "Email, OTP, and new password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Retrieve the token from VerificationToken table
    const storedToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token: otp,
      },
    });

    if (!storedToken) {
      return NextResponse.json(
        { error: "Invalid OTP code. Please check and try again." },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (new Date() > storedToken.expires) {
      // Clean up expired token
      await prisma.verificationToken.deleteMany({
        where: { identifier: email },
      });
      return NextResponse.json(
        { error: "OTP code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Find the user to update
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No admin user found with this email address." },
        { status: 404 }
      );
    }

    // Update password in the database
    await prisma.user.update({
      where: { email },
      data: { password },
    });

    // Delete verification token so it cannot be reused
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    return NextResponse.json(
      { message: "Your password has been reset successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
