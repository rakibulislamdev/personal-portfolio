"use client";

import React from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { VisitorLog } from "./types";

interface LiveVisitorWidgetProps {
  visitors: VisitorLog[];
  isLoading: boolean;
}

export default function LiveVisitorWidget({
  visitors,
  isLoading,
}: LiveVisitorWidgetProps) {
  const formatTimeAgo = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
      if (diffInMinutes < 1) return "Just now";
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours}h ago`;
      return `${Math.floor(diffInHours / 24)}d ago`;
    } catch {
      return "Recent";
    }
  };

  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 sm:p-8 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-[var(--theme-color)]" /> Live Visitor IP & Geolocation Stream
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Tracking real-time IP addresses and geographical locations of website visitors.
          </p>
        </div>
        <Link
          href="/dashboard/analytics"
          className="text-xs font-semibold text-[var(--theme-color)] hover:underline flex items-center gap-1"
        >
          View Live Stream &rarr;
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-24 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : visitors && visitors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visitors.map((v) => (
            <div
              key={v.id}
              className="p-4 bg-zinc-50 dark:bg-[#1a1a1a] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 space-y-2 hover:border-[var(--theme-color)] transition"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[var(--theme-color)]">{v.ip}</span>
                <span className="text-[10px] text-zinc-400 font-medium">{formatTimeAgo(v.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-white">
                <span className="text-[10px] font-bold tracking-wider px-1 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60">
                  {v.flag && v.flag.length === 2 && /^[A-Za-z]{2}$/.test(v.flag)
                    ? v.flag.toUpperCase()
                    : "BD"}
                </span>
                <img
                  src={`https://flagcdn.com/24x18/${
                    v.flag && v.flag.length === 2 && /^[A-Za-z]{2}$/.test(v.flag)
                      ? v.flag.toLowerCase()
                      : v.country?.toLowerCase().includes("bangladesh")
                      ? "bd"
                      : "bd"
                  }.png`}
                  alt={v.country || "Flag"}
                  className="w-4 h-3 object-cover rounded-xs"
                />
                <span>{v.country}</span>
                <span className="text-zinc-400 text-[11px] font-normal">({v.city})</span>
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                Page: <span className="text-zinc-700 dark:text-zinc-300">{v.page}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-xs text-zinc-500">No visitor logs recorded yet.</div>
      )}
    </div>
  );
}
