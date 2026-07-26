import React from "react";
import Link from "next/link";
import { MoveLeft, Home, Compass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-xl w-full text-center relative z-10">
        {/* Glowing Background Blur Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-[var(--theme-color)]/20 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-[#1f1e1e]/80 border border-zinc-200/90 dark:border-zinc-800/80 shadow-sm backdrop-blur-md mb-8">
          <Compass className="w-4 h-4 text-[var(--theme-color)] animate-spin-slow" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
            Error 404
          </span>
        </div>

        {/* 404 Large Text */}
        <h1 className="text-7xl sm:text-9xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4 drop-shadow-sm">
          4<span className="text-[var(--theme-color)]">0</span>4
        </h1>

        {/* Heading & Paragraph */}
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-[#BCBCBC] leading-relaxed mb-8 max-w-md mx-auto">
          Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
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
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
