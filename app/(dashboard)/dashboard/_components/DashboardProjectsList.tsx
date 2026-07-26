"use client";

import React from "react";
import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { Project } from "./types";

interface DashboardProjectsListProps {
  projects: Project[];
  isLoading: boolean;
}

export default function DashboardProjectsList({
  projects,
  isLoading,
}: DashboardProjectsListProps) {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 sm:p-8 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <FolderKanban className="w-5 h-5 text-[var(--theme-color)]" /> Portfolio Projects List
        </h2>
        <Link href="/dashboard/projects" className="text-xs font-semibold text-[var(--theme-color)] hover:underline">
          View All & Manage
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-16 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-zinc-50 dark:bg-[#1a1a1a] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between gap-4 hover:border-[var(--theme-color)] transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 rounded-xl overflow-hidden relative shrink-0 border border-zinc-200 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {project.subtitle || "Portfolio item"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-xs text-zinc-500">No projects added yet.</div>
      )}
    </div>
  );
}
