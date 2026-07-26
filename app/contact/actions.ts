"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_until_env_set");

export interface SendEmailResponse {
  success: boolean;
  message: string;
}

export async function sendEmailAction(formData: FormData): Promise<SendEmailResponse> {
  const name = (formData.get("name") || formData.get("to_name")) as string;
  const email = (formData.get("email") || formData.get("to_email")) as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    };
  }

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["rirakib03@gmail.com"], // Your email address where you want to receive messages
      replyTo: email,
      subject: `[Portfolio Contact] ${subject || "New Message"} from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
          <h2 style="color: #333;">New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "N/A"}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3>Message:</h3>
          <p style="white-space: pre-line; background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
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
