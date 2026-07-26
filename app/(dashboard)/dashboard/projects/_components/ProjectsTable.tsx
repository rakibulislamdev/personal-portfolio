"use client";

import React from "react";
import { Edit, Trash2, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "./types";

interface ProjectsTableProps {
  projects: Project[];
  loading: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectsTable({
  projects,
  loading,
  onEdit,
  onDelete,
}: ProjectsTableProps) {
  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md">
      {loading ? (
        <div className="py-12 flex justify-center items-center gap-2 text-zinc-400 text-sm">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading projects from Neon DB...
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 text-xs uppercase font-semibold">Preview</TableHead>
              <TableHead className="text-zinc-400 text-xs uppercase font-semibold">Project Title</TableHead>
              <TableHead className="text-zinc-400 text-xs uppercase font-semibold">Subtitle / Type</TableHead>
              <TableHead className="text-zinc-400 text-xs uppercase font-semibold">Category</TableHead>
              <TableHead className="text-zinc-400 text-xs uppercase font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((proj) => (
              <TableRow key={proj.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition border-b border-zinc-100 dark:border-zinc-800/60">
                <TableCell className="py-3">
                  <div className="w-16 h-12 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                  </div>
                </TableCell>
                <TableCell className="py-4 font-bold text-zinc-900 dark:text-white">
                  {proj.title}
                </TableCell>
                <TableCell className="py-4 text-xs text-zinc-500 dark:text-zinc-400">
                  {proj.subtitle || "N/A"}
                </TableCell>
                <TableCell className="py-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {proj.category}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-right space-x-2">
                  <button
                    onClick={() => onEdit(proj)}
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:text-[var(--theme-color)] transition cursor-pointer"
                    title="Edit Project"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(proj.id)}
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
