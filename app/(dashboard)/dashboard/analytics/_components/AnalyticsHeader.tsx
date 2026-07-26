"use client";

import React from "react";
import { Globe, RefreshCw } from "lucide-react";

interface AnalyticsHeaderProps {
  loading: boolean;
  onRefresh: () => void;
}

export default function AnalyticsHeader({
  loading,
  onRefresh,
}: AnalyticsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Globe className="w-6 h-6 text-[var(--theme-color)]" /> Visitor IP & Location Tracker
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Real-time analytics tracking visitor IP addresses, geolocation, country flags, and devices.
        </p>
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh Live Data
      </button>
    </div>
  );
}
