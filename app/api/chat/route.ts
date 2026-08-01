import { GoogleGenerativeAI } from "@google/generative-ai";
import { getProfileSettings, getProjects, getBlogs } from "@/lib/data";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

// Simple in-memory rate limiting (10 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

// Periodic cleanup
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetTime) rateLimitMap.delete(ip);
  }
}, 5 * 60 * 1000);

const funnyFallbackMessage = `Oops! AI Service is on a Coffee Break! ☕

Developer **Rakib** hasn't paid the AI service bill yet! 😅

**How you can help wake me up:**
Hire Rakibul for a web development project! Your project contract will help him pay for the AI service so I can get back to assisting you!

- 📧 **Email Rakibul:** [rirakib03@gmail.com](mailto:rirakib03@gmail.com)
- 💼 **Hire Rakibul:** [Contact Rakibul](/contact)`;

export async function POST(req: Request) {
  try {
    // Rate limiting
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-ip";

    const now = Date.now();
    const rateData = rateLimitMap.get(clientIp);
    if (rateData && now < rateData.resetTime) {
      if (rateData.count >= RATE_LIMIT_MAX) {
        return new Response(
          `⏱️ Rate limit exceeded!\n\nYou have sent too many messages in a short time. Please wait a minute before asking another question!`,
          { status: 429, headers: { "Content-Type": "text/plain; charset=utf-8" } }
        );
      }
      rateData.count += 1;
    } else {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(funnyFallbackMessage, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const { messages } = await req.json();

    // Fetch live database context
    const [settings, projects, blogs] = await Promise.all([
      getProfileSettings(),
      getProjects(),
      getBlogs(),
    ]);

    const projectsContext = projects
      .map((p) =>
        `- **${p.title}** (${p.category}, ${p.year || "Recent"})\n  - Description: ${p.description || "N/A"}\n  - Key Features: ${p.keyFeatures || "N/A"}\n  - Technologies: ${p.technologies || "N/A"}\n  - Live Demo: ${p.liveUrl || "N/A"}\n  - GitHub: ${p.githubUrl || "N/A"}`
      )
      .join("\n\n");

    const blogsContext = blogs
      .map((b) => `- **${b.title}** (${b.category}): /blog/${b.slug}`)
      .join("\n");

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
3. Always format emails, project links, GitHub links, LinkedIn links, and contact links as active Markdown links!
   - Example Email: [rirakib03@gmail.com](mailto:rirakib03@gmail.com)
   - Example Contact: [Contact Rakibul](/contact)
   - Example Live Demo: [Live Demo](URL)
4. Match the user's language (if the user asks in Bengali / Banglish, reply in helpful Bengali / Banglish. If in English, reply in English).
5. If the user asks for something not in the portfolio data, politely state that you don't have that specific detail and offer to connect them via Rakibul's email ([${settings?.email || "rirakib03@gmail.com"}](mailto:${settings?.email || "rirakib03@gmail.com"})).
`;

    // Build Gemini chat history (all messages except the last user message)
    const chatHistory = Array.isArray(messages)
      ? messages.slice(0, -1).map((m: any) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: typeof m.content === "string" ? m.content : "" }],
        }))
      : [];

    const lastMessage = Array.isArray(messages) ? messages[messages.length - 1] : null;
    const userText = lastMessage?.content ?? "";

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      systemInstruction: systemPrompt,
    });

    const chat = model.startChat({ history: chatHistory });
    const streamResult = await chat.sendMessageStream(userText);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResult.stream) {
            const text = chunk.text();
            if (text) {
              const data = JSON.stringify({ delta: text });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error: any) {
    const errMsg = error?.message || String(error);
    console.error("Chat API error:", errMsg);
    return new Response(funnyFallbackMessage, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
