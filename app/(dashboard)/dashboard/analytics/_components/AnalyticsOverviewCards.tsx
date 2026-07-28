"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { TopCountry } from "./types";

interface AnalyticsOverviewCardsProps {
  activeLive: number;
  topCountry: TopCountry | null;
  loading: boolean;
}

export default function AnalyticsOverviewCards({
  activeLive,
  topCountry,
  loading,
}: AnalyticsOverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md">
        <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Active Live Visitors
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">
            {loading ? "..." : `${activeLive} Online`}
          </h3>
        </div>
      </div>

      <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md">
        <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Top Visitor Country
        </p>
        <div className="flex items-center gap-2 mt-2">
          {topCountry && (
            <>
              <span className="text-xs font-bold tracking-wider px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60">
                {topCountry.flag && topCountry.flag.length === 2 && /^[A-Za-z]{2}$/.test(topCountry.flag)
                  ? topCountry.flag.toUpperCase()
                  : "BD"}
              </span>
              <img
                src={`https://flagcdn.com/24x18/${
                  topCountry.flag && topCountry.flag.length === 2 && /^[A-Za-z]{2}$/.test(topCountry.flag)
                    ? topCountry.flag.toLowerCase()
                    : topCountry.name?.toLowerCase().includes("bangladesh")
                    ? "bd"
                    : "bd"
                }.png`}
                alt={topCountry.name}
                className="w-6 h-4 object-cover rounded-xs shadow-xs"
              />
            </>
          )}
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
            {loading
              ? "..."
              : topCountry
              ? `${topCountry.name} (${topCountry.percentage}%)`
              : "Unknown"}
          </h3>
        </div>
      </div>

      <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md">
        <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          IP Privacy Protection
        </p>
        <div className="flex items-center gap-2 mt-2 text-emerald-500 font-bold text-sm">
          <ShieldCheck className="w-5 h-5" /> Middleware Active
        </div>
      </div>
    </div>
  );
}
