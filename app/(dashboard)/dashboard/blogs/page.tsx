"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { BlogPost } from "./_components/types";
import BlogTableHeader from "./_components/BlogTableHeader";
import BlogTable from "./_components/BlogTable";
import BlogModal from "./_components/BlogModal";

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Deletion State
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Published");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error("Failed to load blog posts:", err);
      toast.error("Failed to load blog posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingBlog(null);
    setTitle("");
    setCategory("Web Dev");
    setStatus("Published");
    setContent("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setCategory(blog.category);
    setStatus(blog.status);
    setContent(blog.content || "");
    setIsModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category) {
      toast.error("Title and category are required");
      return;
    }

    setIsSaving(true);
    try {
      const payload = { title, category, status, content };

      if (editingBlog) {
        const res = await fetch("/api/blogs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingBlog.id, ...payload }),
        });

        if (res.ok) {
          toast.success("Blog post updated successfully");
          fetchBlogs();
          setIsModalOpen(false);
        } else {
          toast.error("Failed to update blog post");
        }
      } else {
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          toast.success("Blog post published successfully");
          fetchBlogs();
          setIsModalOpen(false);
        } else {
          toast.error("Failed to publish blog post");
        }
      }
    } catch (err) {
      toast.error("Error saving blog post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        toast.success("Blog post deleted successfully");
      } else {
        toast.error("Failed to delete blog post");
      }
    } catch (err) {
      toast.error("Error deleting blog post");
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toISOString().split("T")[0];
    } catch {
      return "2026-07-26";
    }
  };

  const filteredBlogs = blogs.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <BlogTableHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLoading={isLoading}
        onOpenCreateModal={handleOpenCreateModal}
      />

      {/* Blog Table */}
      <BlogTable
        blogs={filteredBlogs}
        isLoading={isLoading}
        onEdit={handleOpenEditModal}
        onDelete={setDeletingBlogId}
        formatDate={formatDate}
      />

      {/* Create / Edit Modal */}
      <BlogModal
        isOpen={isModalOpen}
        editingBlog={editingBlog}
        title={title}
        setTitle={setTitle}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
        content={content}
        setContent={setContent}
        isSaving={isSaving}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBlog}
      />

      {/* Delete Confirmation Modal */}
      {deletingBlogId !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="text-center">
              <h3 className="text-sm font-bold text-white">Delete Blog Post</h3>
              <p className="text-[11px] text-zinc-400 mt-1">
                Are you sure you want to delete this blog post? This action cannot be undone.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingBlogId(null)}
                className="py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (deletingBlogId) {
                    await handleDeleteBlog(deletingBlogId);
                    setDeletingBlogId(null);
                  }
                }}
                className="py-2 bg-red-650 hover:bg-red-600 text-white font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
