"use client";

import React from "react";
import { FolderKanban, Mail, Globe, TrendingUp } from "lucide-react";
import { DashboardData } from "./types";

interface DashboardStatsGridProps {
  data: DashboardData | null;
  isLoading: boolean;
}

export default function DashboardStatsGrid({
  data,
  isLoading,
}: DashboardStatsGridProps) {
  const topCountryText = data?.topCountry
    ? `${data.topCountry.flag} ${data.topCountry.name} (${data.topCountry.percentage}%)`
    : "Bangladesh 🇧🇩";

  const stats = [
    {
      title: "Total Projects",
      value: data ? data.totalProjects.toString() : "0",
      change: "Live Database",
      icon: FolderKanban,
    },
    {
      title: "Messages Received",
      value: data ? data.recentMessages.length.toString() : "0",
      change: data ? `${data.unreadMessagesCount} unread` : "0 unread",
      icon: Mail,
    },
    {
      title: "Live Online Visitors",
      value: data && (data.activeLiveVisitors || data.recentVisitors.length > 0)
        ? (data.activeLiveVisitors || data.recentVisitors.length).toString()
        : "1",
      change: `Top: ${topCountryText}`,
      icon: Globe,
    },
    {
      title: "Total Site Views",
      value: data ? data.totalVisitors.toString() : "0",
      change: "Recorded visits",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                {stat.title}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-1 flex items-center gap-2">
                {isLoading ? (
                  <span className="w-12 h-7 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-md" />
                ) : (
                  stat.value
                )}
                {stat.title.includes("Live") && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </h3>
              <span className="text-[11px] font-semibold text-[var(--theme-color)] block mt-1">
                {stat.change}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-800 dark:text-white">
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
