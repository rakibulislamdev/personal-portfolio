import React from "react";
import Link from "next/link";
import { Sparkles, Home, ArrowRight, Bell } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Rakibul Islam - Web Development Articles & Thoughts",
  description:
    "Read articles, tutorials, and insights by Rakibul Islam on web development, React, Next.js, TypeScript, and modern frontend technologies.",
  keywords: [
    "Rakibul Islam Blog",
    "Web Development Articles",
    "React Tutorial",
    "Next.js Blog",
    "Frontend Development Tips",
    "JavaScript Articles Bangladesh",
  ],
  alternates: {
    canonical: "https://rakibulislamdev.me/blog",
  },
  openGraph: {
    title: "Blog | Rakibul Islam - Web Development Articles",
    description:
      "Explore web development articles and insights by Rakibul Islam covering React, Next.js, TypeScript, and more.",
    url: "https://rakibulislamdev.me/blog",
    siteName: "Rakibul Islam Portfolio",
    images: [
      {
        url: "/assets/Images/Rakibulislam1.jpg",
        width: 1200,
        height: 630,
        alt: "Rakibul Islam Blog - Web Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Rakibul Islam",
    description:
      "Web development articles and insights by Rakibul Islam.",
    images: ["/assets/Images/Rakibulislam1.jpg"],
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-xl w-full text-center relative z-10">
        {/* Glowing Background Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-[var(--theme-color)]/15 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-[#1f1e1e]/80 border border-zinc-200/90 dark:border-zinc-800/80 shadow-sm backdrop-blur-md mb-8">
          <Sparkles className="w-4 h-4 text-[var(--theme-color)] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
            Articles & Insights
          </span>
        </div>

        {/* Coming Soon Main Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
          Blogs <span className="text-[var(--theme-color)]">Coming Soon</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-zinc-600 dark:text-[#BCBCBC] leading-relaxed mb-8 max-w-md mx-auto">
          I am currently working on insightful articles about web development, Next.js, React, and frontend best practices. Stay tuned!
        </p>

        {/* Feature Teasers / Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {["React & Next.js", "Frontend Architecture", "UI/UX Tips", "Web Performance"].map((tag, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-xl bg-white/60 dark:bg-[#1f1e1e]/60 border border-zinc-200/60 dark:border-zinc-800/60 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-sm hover:bg-[var(--theme-color)] dark:hover:bg-[var(--theme-color)] dark:hover:text-white transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white dark:bg-[#1f1e1e] text-zinc-900 dark:text-white border border-zinc-200/90 dark:border-zinc-800/80 font-bold text-sm hover:border-[var(--theme-color)] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
