"use client";

import React from "react";
import { FolderKanban, Plus } from "lucide-react";

interface ProjectsHeaderProps {
  onAddNew: () => void;
}

export default function ProjectsHeader({ onAddNew }: ProjectsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <FolderKanban className="w-6 h-6 text-[var(--theme-color)]" /> Portfolio Projects Management
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Real-time Add, Edit, and Delete projects connected to Neon Database.
        </p>
      </div>
      <button
        onClick={onAddNew}
        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-[#252525] dark:hover:bg-[#303030] text-white font-bold text-xs border border-zinc-700/50 hover:border-[var(--theme-color)] transition shadow-sm cursor-pointer"
      >
        <Plus className="w-4 h-4" /> Add New Project
      </button>
    </div>
  );
}
