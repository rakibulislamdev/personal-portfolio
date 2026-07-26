"use client";

import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Message } from "./types";

interface RecentInquiriesWidgetProps {
  messages: Message[];
  unreadCount: number;
  isLoading: boolean;
}

export default function RecentInquiriesWidget({
  messages,
  unreadCount,
  isLoading,
}: RecentInquiriesWidgetProps) {
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
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Mail className="w-5 h-5 text-[var(--theme-color)]" /> Recent Inquiries
        </h2>
        <Link
          href="/dashboard/messages"
          className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-[11px] font-bold hover:underline"
        >
          {isLoading ? "Loading..." : `${unreadCount} New`}
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : messages && messages.length > 0 ? (
        <div className="space-y-3">
          {messages.map((msg) => (
            <Link
              key={msg.id}
              href="/dashboard/messages"
              className="block p-4 bg-zinc-50 dark:bg-[#1a1a1a] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 space-y-1 hover:border-[var(--theme-color)] transition"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                  {msg.name}
                </h4>
                <span className="text-[10px] text-zinc-400 font-medium">
                  {formatTimeAgo(msg.createdAt)}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium truncate">
                {msg.subject}
              </p>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate">
                {msg.email}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-xs text-zinc-500">No client messages received yet.</div>
      )}
    </div>
  );
}
