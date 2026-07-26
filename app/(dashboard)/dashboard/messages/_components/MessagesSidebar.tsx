"use client";

import React from "react";
import { Search } from "lucide-react";
import { Message } from "./types";

interface MessagesSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredMessages: Message[];
  selectedId: string | null;
  isLoading: boolean;
  onSelectMessage: (msg: Message) => void;
  formatTimeAgo: (dateStr: string) => string;
  getStatusBadge: (status: string) => string;
}

export default function MessagesSidebar({
  searchQuery,
  setSearchQuery,
  filteredMessages,
  selectedId,
  isLoading,
  onSelectMessage,
  formatTimeAgo,
  getStatusBadge,
}: MessagesSidebarProps) {
  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-5 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, email..."
          className="w-full pl-9 pr-3 py-2.5 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--theme-color)] transition"
        />
      </div>

      {/* Messages List */}
      <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-20 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => onSelectMessage(msg)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                selectedId === msg.id
                  ? "bg-zinc-100 dark:bg-zinc-800 border-[var(--theme-color)] shadow-sm"
                  : "bg-zinc-50 dark:bg-[#1a1a1a] border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-1.5">
                  {msg.name}
                  {msg.status === "Unread" && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  )}
                </h4>
                <span className="text-[10px] text-zinc-400 font-medium">
                  {formatTimeAgo(msg.createdAt)}
                </span>
              </div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 truncate">
                {msg.subject}
              </p>
              <div className="flex items-center justify-between pt-1">
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[170px]">
                  {msg.message}
                </p>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                    msg.status
                  )}`}
                >
                  {msg.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-xs text-zinc-500">
            No matching messages found.
          </div>
        )}
      </div>
    </div>
  );
}
