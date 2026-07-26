"use client";

import React from "react";
import { Mail, Loader2 } from "lucide-react";
import { TabType } from "./types";

interface MessagesHeaderProps {
  isLoading: boolean;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function MessagesHeader({
  isLoading,
  activeTab,
  setActiveTab,
}: MessagesHeaderProps) {
  const tabs: TabType[] = ["ALL", "UNREAD", "READ", "REPLIED"];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Mail className="w-6 h-6 text-[var(--theme-color)]" /> Client Messages & Inquiries
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[var(--theme-color)]" />}
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Manage, view, and reply to inquiries submitted via your website contact form.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-white dark:bg-[#1a1a1a] p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === tab
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
