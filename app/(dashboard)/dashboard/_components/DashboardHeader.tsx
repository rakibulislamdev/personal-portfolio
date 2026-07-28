"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Globe, Loader2, RefreshCw } from "lucide-react";

interface DashboardHeaderProps {
  isLoading: boolean;
  onRefresh: () => void;
}

export default function DashboardHeader({
  isLoading,
  onRefresh,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 sm:p-8 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
          Welcome back, Rakibul 👋
          {isLoading && <Loader2 className="w-5 h-5 animate-spin text-[var(--theme-color)]" />}
        </h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">
          Real-time portfolio analytics, live visitor IP tracking, and message overview.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition disabled:opacity-50"
          title="Refresh Data"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition"
        >
          <ExternalLink className="w-4 h-4" /> Live Portfolio
        </Link>
        <Link
          href="/dashboard/analytics"
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-[#252525] dark:hover:bg-[#303030] text-white font-bold text-xs border border-zinc-700/50 hover:border-[var(--theme-color)] transition shadow-sm"
        >
          <Globe className="w-4 h-4 text-[var(--theme-color)]" /> Full IP Tracker
        </Link>
      </div>
    </div>
  );
}
