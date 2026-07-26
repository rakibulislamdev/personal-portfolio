"use client";

import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { BlogPost } from "./types";

interface BlogTableProps {
  blogs: BlogPost[];
  isLoading: boolean;
  onEdit: (blog: BlogPost) => void;
  onDelete: (id: string) => void;
  formatDate: (dateStr: string) => string;
}

export default function BlogTable({
  blogs,
  isLoading,
  onEdit,
  onDelete,
  formatDate,
}: BlogTableProps) {
  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 text-xs uppercase font-semibold">
              <th className="py-3 px-4">Article Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Views</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Published Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {isLoading ? (
              [1, 2, 3].map((n) => (
                <tr key={n}>
                  <td colSpan={6} className="py-4 px-4">
                    <div className="h-8 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl animate-pulse" />
                  </td>
                </tr>
              ))
            ) : blogs.length > 0 ? (
              blogs.map((post) => (
                <tr key={post.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition">
                  <td className="py-4 px-4 font-bold text-zinc-900 dark:text-white max-w-xs truncate">
                    {post.title}
                  </td>
                  <td className="py-4 px-4 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    {post.category}
                  </td>
                  <td className="py-4 px-4 text-xs text-zinc-500 dark:text-zinc-400">
                    {post.views}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        post.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs text-zinc-400">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => onEdit(post)}
                      className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:text-[var(--theme-color)] transition"
                      title="Edit Blog Post"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(post.id)}
                      className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-rose-500 hover:bg-rose-500/10 transition"
                      title="Delete Blog Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-xs text-zinc-500">
                  No blog posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
