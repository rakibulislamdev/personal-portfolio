"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat, UIMessage } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  RotateCcw,
  Loader2,
  ChevronDown,
} from "lucide-react";

const STARTER_QUESTIONS = [
  "🚀 What are Rakibul's top projects?",
  "🛠️ What technologies does he specialize in?",
  "📩 How can I contact Rakibul?",
  "💼 Is Rakibul available for hire?",
];

const FUNNY_FALLBACK_MESSAGE = `Oops! AI Service is on a Coffee Break! ☕

Developer **Rakib** hasn't paid the AI service bill yet! 😅

**How you can help wake me up:**
Hire Rakibul for a web development project! Your project contract will help him pay for the AI service so I can get back to assisting you!

- 📧 **Email Rakibul:** [rirakib03@gmail.com](mailto:rirakib03@gmail.com)
- 💼 **Hire Rakibul:** [Contact Rakibul](/contact)`;

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");

  const {
    messages,
    status,
    setMessages,
    sendMessage,
  } = useChat({
    onError: (err: Error) => {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: FUNNY_FALLBACK_MESSAGE,
          parts: [
            {
              type: "text",
              text: FUNNY_FALLBACK_MESSAGE,
            },
          ],
        },
      ]);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userText = input.trim();
    setInput("");

    const userMsgId = Date.now().toString();
    const assistantMsgId = (Date.now() + 1).toString();

    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        role: "user",
        content: userText,
        parts: [{ type: "text", text: userText }],
      },
      {
        id: assistantMsgId,
        role: "assistant",
        content: FUNNY_FALLBACK_MESSAGE,
        parts: [{ type: "text", text: FUNNY_FALLBACK_MESSAGE }],
      },
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSuggestionClick = (question: string) => {
    const userMsgId = Date.now().toString();
    const assistantMsgId = (Date.now() + 1).toString();

    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        role: "user",
        content: question,
        parts: [{ type: "text", text: question }],
      },
      {
        id: assistantMsgId,
        role: "assistant",
        content: FUNNY_FALLBACK_MESSAGE,
        parts: [{ type: "text", text: FUNNY_FALLBACK_MESSAGE }],
      },
    ]);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3.5 px-5 py-3.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700/60 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[var(--theme-color)]"
            aria-label="Open AI Chatbot"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <span className="font-semibold text-sm tracking-wide">
              Ask AI Assistant
            </span>
          </button>
        )}
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[580px] max-h-[85vh] flex flex-col bg-zinc-950/95 dark:bg-zinc-950/95 text-white border border-zinc-800/80 rounded-3xl shadow-2xl backdrop-blur-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-zinc-900/80 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-2.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-900"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2">
                  Rakibul&apos;s AI Assistant
                </h3>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-center px-4 space-y-5">
                <div className="p-4 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 text-amber-400">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-200 text-base mb-1">
                    Hello! I&apos;m Rakibul&apos;s AI Assistant
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-[280px]">
                    Ask me anything about Rakibul&apos;s projects, tech stack,
                    experience, or how to get in touch!
                  </p>
                </div>

                {/* Starter Suggestions */}
                <div className="w-full space-y-2 pt-2">
                  <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-left px-1">
                    Suggested Questions:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {STARTER_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(q)}
                        className="text-left text-xs px-3.5 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 text-zinc-300 hover:text-white transition flex items-center justify-between group"
                      >
                        <span>{q}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 -rotate-90 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((m: UIMessage) => (
                <div
                  key={m.id}
                  className={`flex gap-3 text-xs leading-relaxed ${m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  {m.role === "assistant" && (
                    <div className="w-7 h-7 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl ${m.role === "user"
                      ? "bg-zinc-800 text-white border border-zinc-700/60 rounded-br-none"
                      : "bg-zinc-900/90 text-zinc-200 border border-zinc-800 rounded-bl-none shadow-md"
                      }`}
                  >
                    {m.role === "assistant" ? (
                      <div className="prose prose-invert prose-xs max-w-none prose-p:my-1.5 prose-p:leading-relaxed prose-a:text-amber-400 prose-a:underline hover:prose-a:text-amber-300">
                        <ReactMarkdown
                          components={{
                            a: ({ node, ...props }) => (
                              <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-400 hover:text-amber-300 underline font-semibold decoration-amber-400/60 underline-offset-2"
                              />
                            ),
                          }}
                        >
                          {m.parts && m.parts.length > 0
                            ? m.parts
                              .filter((p): p is { type: "text"; text: string } => p.type === "text")
                              .map((p) => p.text)
                              .join("")
                            : ((m as any).content || "")}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">
                        {m.parts && m.parts.length > 0
                          ? m.parts
                            .filter((p): p is { type: "text"; text: string } => p.type === "text")
                            .map((p) => p.text)
                            .join("")
                          : ((m as any).content || "")}
                      </p>
                    )}
                  </div>

                  {m.role === "user" && (
                    <div className="w-7 h-7 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))
            )}

            {(status === "streaming" || status === "submitted") && (
              <div className="flex gap-3 text-xs justify-start items-center">
                <div className="w-7 h-7 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-zinc-400 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-zinc-900/90 border-t border-zinc-800 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about Rakibul's work or skills..."
              className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-amber-500/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition"
              disabled={status === "streaming" || status === "submitted"}
            />
            <button
              type="submit"
              disabled={status === "streaming" || status === "submitted" || !input.trim()}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-zinc-950 font-bold transition flex items-center justify-center"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
