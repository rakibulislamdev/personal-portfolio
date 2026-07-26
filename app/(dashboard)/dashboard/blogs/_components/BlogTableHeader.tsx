"use client";

import React from "react";
import { FileText, Plus, Search, Loader2 } from "lucide-react";

interface BlogTableHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean;
  onOpenCreateModal: () => void;
}

export default function BlogTableHeader({
  searchQuery,
  setSearchQuery,
  isLoading,
  onOpenCreateModal,
}: BlogTableHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-[var(--theme-color)]" /> Blog Posts Management
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[var(--theme-color)]" />}
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Write, publish, and manage your articles and technical blogs.
        </p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--theme-color)] transition shadow-sm"
          />
        </div>

        <button
          onClick={onOpenCreateModal}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-[#252525] dark:hover:bg-[#303030] text-white font-bold text-xs border border-zinc-700/50 hover:border-[var(--theme-color)] transition shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" /> Create New Post
        </button>
      </div>
    </div>
  );
}
