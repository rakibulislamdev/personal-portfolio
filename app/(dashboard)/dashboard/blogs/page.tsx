"use client";

import React, { useState } from "react";
import { FileText, Plus, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState([
    { id: 1, title: "Building Modern Web Applications with Next.js 15 App Router", category: "Web Dev", views: "1.2K", status: "Published", date: "2026-07-10" },
    { id: 2, title: "Mastering Tailwind CSS v4 in Personal Portfolios", category: "CSS & Design", views: "850", status: "Published", date: "2026-06-25" },
    { id: 3, title: "Optimizing Web Vitals & Image Performance in React", category: "Performance", views: "0", status: "Draft", date: "2026-07-24" },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-[var(--theme-color)]" /> Blog Posts Management
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Write, publish, and manage your articles and technical blogs.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-[#252525] dark:hover:bg-[#303030] text-white font-bold text-xs border border-zinc-700/50 hover:border-[var(--theme-color)] transition shadow-sm">
          <Plus className="w-4 h-4" /> Create New Post
        </button>
      </div>

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
              {blogs.map((post) => (
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
                    {post.date}
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:text-[var(--theme-color)] transition">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-rose-500 hover:bg-rose-500/10 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
