import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return generic success to prevent email enumeration attacks
      return NextResponse.json(
        { message: "If a matching administrator account exists, an OTP code has been sent to your email." },
        { status: 200 }
      );
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration

    // Save token to VerificationToken table (upsert/replace old tokens for this email)
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: otp,
        expires,
      },
    });

    // Send the email using Resend
    try {
      const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Reset Your Password</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #0b0b0c;
            color: #e4e4e7;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 580px;
            margin: 40px auto;
            background-color: #121214;
            border: 1px solid #27272a;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }
          .header {
            background-color: #1c1c1f;
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid #27272a;
          }
          .logo {
            display: inline-block;
            width: 48px;
            height: 48px;
            line-height: 48px;
            background-color: #ffffff;
            color: #09090b;
            font-size: 24px;
            font-weight: bold;
            border-radius: 10px;
            text-align: center;
          }
          .content {
            padding: 40px 30px;
          }
          h1 {
            font-size: 22px;
            font-weight: 700;
            color: #ffffff;
            margin-top: 0;
            margin-bottom: 16px;
            text-align: center;
          }
          p {
            font-size: 15px;
            line-height: 1.6;
            color: #a1a1aa;
            margin-bottom: 24px;
          }
          .otp-container {
            background-color: #1c1c1f;
            border: 1px solid #27272a;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            margin: 30px 0;
          }
          .otp-code {
            font-size: 36px;
            font-weight: 850;
            letter-spacing: 8px;
            color: #ffffff;
            margin: 0;
          }
          .footer {
            background-color: #18181b;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #71717a;
            border-top: 1px solid #27272a;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">R</div>
          </div>
          <div class="content">
            <h1>Reset Your Password</h1>
            <p>Hello,</p>
            <p>We received a request to reset your password for the Rakibul Islam Portfolio Dashboard. Use the following One-Time Password (OTP) to proceed. This code is valid for <strong>5 minutes</strong>.</p>
            
            <div class="otp-container">
              <div class="otp-code">${otp}</div>
            </div>
            
            <p>If you did not request this password reset, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Rakibul Islam. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
      `;

      await resend.emails.send({
        from: "Portfolio Admin <onboarding@resend.dev>",
        to: email,
        subject: "Your Password Reset OTP",
        html: emailHtml,
      });

      // For easier local development/debugging, log OTP to console as well
      console.log(`[OTP DEBUG] OTP for ${email} is: ${otp}`);
    } catch (emailError: any) {
      console.error("Failed to send email via Resend:", emailError);
      // Fallback: log to console so development is not blocked
      console.log(`[OTP FALLBACK DEBUG] OTP for ${email} is: ${otp}`);
    }

    return NextResponse.json(
      { message: "If a matching administrator account exists, an OTP code has been sent to your email." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
