"use server";

import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_until_env_set");

export interface SendEmailResponse {
  success: boolean;
  message: string;
}

export async function sendEmailAction(formData: FormData): Promise<SendEmailResponse> {
  const name = (formData.get("name") || formData.get("to_name")) as string;
  const email = (formData.get("email") || formData.get("to_email")) as string;
  const subject = (formData.get("subject") as string) || "";
  const message = (formData.get("message") as string) || "";

  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    };
  }

  try {
    // 1. Save contact message to Database (Message Table)
    await prisma.message.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["rirakib03@gmail.com"], // Your email address where you want to receive messages
      replyTo: email,
      subject: `Rakibul Islam ${subject || "New Message"} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>New Contact Message</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 16px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #18181b 0%, #27272a 60%, #3f3f46 100%); padding: 40px 40px 32px; text-align: center;">
                      <p style="margin: 0 0 6px; font-size: 12px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #9F9F9F;">Portfolio Contact</p>
                      <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.03em;">New Message Received</h1>
                      <p style="margin: 10px 0 0; font-size: 14px; color: #a1a1aa;">Someone reached out through your contact form</p>
                    </td>
                  </tr>

                  <!-- Sender Info Cards -->
                  <tr>
                    <td style="padding: 32px 40px 0;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <!-- Name Card -->
                          <td width="50%" style="padding-right: 8px;">
                            <div style="background: #f4f4f5; border-radius: 14px; padding: 16px 18px; border: 1px solid #e4e4e7;">
                              <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #9F9F9F;">From</p>
                              <p style="margin: 0; font-size: 15px; font-weight: 600; color: #18181b;">${name}</p>
                            </div>
                          </td>
                          <!-- Email Card -->
                          <td width="50%" style="padding-left: 8px;">
                            <div style="background: #f4f4f5; border-radius: 14px; padding: 16px 18px; border: 1px solid #e4e4e7;">
                              <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #9F9F9F;">Email</p>
                              <p style="margin: 0; font-size: 14px; font-weight: 500; color: #18181b; word-break: break-all;">
                                <a href="mailto:${email}" style="color: #18181b; text-decoration: none;">${email}</a>
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Subject -->
                  <tr>
                    <td style="padding: 16px 40px 0;">
                      <div style="background: #f4f4f5; border-radius: 14px; padding: 16px 18px; border: 1px solid #e4e4e7;">
                        <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #9F9F9F;">Subject</p>
                        <p style="margin: 0; font-size: 15px; font-weight: 600; color: #18181b;">${subject || "No subject provided"}</p>
                      </div>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding: 28px 40px 0;">
                      <div style="height: 1px; background: linear-gradient(to right, transparent, #e4e4e7, transparent);"></div>
                    </td>
                  </tr>

                  <!-- Message Body -->
                  <tr>
                    <td style="padding: 24px 40px 0;">
                      <p style="margin: 0 0 12px; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #9F9F9F;">Message</p>
                      <div style="background: #fafafa; border-radius: 16px; padding: 24px; border: 1px solid #e4e4e7; border-left: 4px solid #9F9F9F;">
                        <p style="margin: 0; font-size: 15px; line-height: 1.75; color: #3f3f46; white-space: pre-line;">${message}</p>
                      </div>
                    </td>
                  </tr>

                  <!-- Reply CTA -->
                  <tr>
                    <td style="padding: 28px 40px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}?subject=Re: ${subject || 'Your message'}" style="display: inline-block; background: #18181b; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 14px 32px; border-radius: 50px; letter-spacing: 0.02em;">
                              Reply to ${name} →
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background: #f4f4f5; padding: 28px 40px; text-align: center; border-top: 1px solid #e4e4e7;">
                      <p style="margin: 0 0 4px; font-size: 13px; font-weight: 600; color: #18181b;">Rakibul Islam</p>
                      <p style="margin: 0 0 16px; font-size: 12px; color: #9F9F9F;">Web &amp; Frontend Developer</p>

                      <!-- Social Links -->
                      <table cellpadding="0" cellspacing="0" style="margin: 0 auto 16px;">
                        <tr>
                          <!-- LinkedIn -->
                          <td style="padding: 0 6px;">
                            <a href="https://www.linkedin.com/in/rakibulislamdev/" style="display: inline-block; background: #0077B5; color: #ffffff; text-decoration: none; font-size: 11px; font-weight: 600; padding: 7px 14px; border-radius: 50px; letter-spacing: 0.03em;">in LinkedIn</a>
                          </td>
                          <!-- GitHub -->
                          <td style="padding: 0 6px;">
                            <a href="https://github.com/rakibulislamdev" style="display: inline-block; background: #24292e; color: #ffffff; text-decoration: none; font-size: 11px; font-weight: 600; padding: 7px 14px; border-radius: 50px; letter-spacing: 0.03em;">⌥ GitHub</a>
                          </td>
                          <!-- Facebook -->
                          <td style="padding: 0 6px;">
                            <a href="https://www.facebook.com/iamrakib2/" style="display: inline-block; background: #1877F2; color: #ffffff; text-decoration: none; font-size: 11px; font-weight: 600; padding: 7px 14px; border-radius: 50px; letter-spacing: 0.03em;">f Facebook</a>
                          </td>
                        </tr>
                      </table>

                      <p style="margin: 0; font-size: 11px; color: #a1a1aa;">
                        This message was sent via
                        <a href="https://rakibulislamdev.me/contact" style="color: #9F9F9F; text-decoration: none; font-weight: 500;">rakibulislamdev.me/contact</a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (data.error) {
      console.error("Resend Error:", data.error);
      return {
        success: false,
        message: data.error.message || "Failed to send email.",
      };
    }

    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error: any) {
    console.error("Server Action Email Error:", error);
    return {
      success: false,
      message: error?.message || "An unexpected error occurred while sending email.",
    };
  }
}
