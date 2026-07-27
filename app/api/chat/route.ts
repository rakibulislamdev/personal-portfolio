import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { getProfileSettings, getProjects, getBlogs } from "@/lib/data";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Fetch live database context
    const [settings, projects, blogs] = await Promise.all([
      getProfileSettings(),
      getProjects(),
      getBlogs(),
    ]);

    // Build structured projects context
    const projectsContext = projects
      .map((p) => {
        return `- **${p.title}** (${p.category}, ${p.year || "Recent"})
  - Description: ${p.description || "N/A"}
  - Key Features: ${p.keyFeatures || "N/A"}
  - Technologies: ${p.technologies || "N/A"}
  - Live Demo: ${p.liveUrl || "N/A"}
  - GitHub: ${p.githubUrl || "N/A"}`;
      })
      .join("\n\n");

    // Build structured blogs context
    const blogsContext = blogs
      .map((b) => `- **${b.title}** (${b.category}): /blog/${b.slug}`)
      .join("\n");

    // Construct system prompt
    const systemPrompt = `You are the official AI Assistant for Rakibul Islam's personal portfolio website (rakibulislamdev.me).
Your goal is to assist recruiters, clients, and visitors by answering questions about Rakibul's portfolio, experience, skills, projects, and contact info in a helpful, friendly, and professional manner.

---
### ABOUT RAKIBUL ISLAM:
- **Name**: ${settings?.name || "Rakibul Islam"}
- **Title**: ${settings?.title || "Web Developer & Frontend Specialist"}
- **Email**: ${settings?.email || "rirakib03@gmail.com"}
- **Phone**: ${settings?.phone || "+8801621-574994"}
- **Location**: ${settings?.location || "Pabna, Bangladesh"}
- **Bio**: ${settings?.aboutBio || "Web developer focused on modern web applications."}
- **Experience**: ${settings?.experienceMonths ? `${settings.experienceMonths} months+` : "Professional experience"}
- **Enabled Skills**: ${settings?.enabledSkills || "React, Next.js, TypeScript, Tailwind CSS, Prisma, Node.js, PostgreSQL"}
- **GitHub**: ${settings?.github || "https://github.com/rakibulislamdev"}
- **LinkedIn**: ${settings?.linkedin || "https://linkedin.com/in/rakibulislamdev"}

---
### PROJECTS IN PORTFOLIO:
${projectsContext || "No public projects listed yet."}

---
### BLOG POSTS:
${blogsContext || "No public blogs listed yet."}

---
### GUIDELINES:
1. Speak as Rakibul's knowledgeable AI assistant.
2. If asked about a specific project or topic, provide clear, concise details using the data above.
3. Always format project links, GitHub links, and live URLs as clean Markdown links e.g. [Live Demo](URL) or [GitHub](URL).
4. Match the user's language (if the user asks in Bengali / Banglish, reply in helpful Bengali / Banglish. If in English, reply in English).
5. If the user asks for something not in the portfolio data, politely state that you don't have that specific detail and offer to connect them via Rakibul's email (${settings?.email}).
`;

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

    const funnyFallbackMessage = `Oops! AI Service is on a Coffee Break!

Developer **Rakibul** hasn't paid the AI service bill yet! 😅

How you can help wake me up:
Hire Rakibul for a web development project! Your project contract will help him pay for the AI service so I can get back to assisting you!

Email Rakibul: [${settings?.email || "rirakib03@gmail.com"}](mailto:${settings?.email || "rirakib03@gmail.com"})
Explore Projects & Hire: [Contact Rakibul](/#contact)`;

    if (!apiKey) {
      console.error("Gemini API Key missing in environment variables!");
      return new Response(funnyFallbackMessage, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const formattedMessages = Array.isArray(messages)
      ? messages.map((m: any) => ({
        role: m.role,
        content:
          typeof m.content === "string" && m.content
            ? m.content
            : Array.isArray(m.parts)
              ? m.parts
                .filter((p: any) => p.type === "text")
                .map((p: any) => p.text)
                .join("")
              : "",
      }))
      : [];

    try {
      const result = streamText({
        model: google("gemini-2.0-flash"),
        system: systemPrompt,
        messages: formattedMessages,
      });

      return result.toTextStreamResponse();
    } catch (streamErr: any) {
      console.error("StreamText execution failed:", streamErr?.message || streamErr);
      return new Response(funnyFallbackMessage, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  } catch (error: any) {
    console.error("Chat API error:", error?.message || error);
    return new Response(
      `Oops! AI Service is on a Coffee Break!\n\nDeveloper **Rakibul** hasn't paid for the AI service quota yet! 😅\n\nHow you can help:\nHire Rakibul for a project so he can afford to renew the AI subscription and get me back online!`,
      { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }
}
