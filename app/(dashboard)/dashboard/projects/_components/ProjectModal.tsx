"use client";

import React, { useRef, useState } from "react";
import { X, Loader2, UploadCloud } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "./types";

interface ProjectModalProps {
  isOpen: boolean;
  editingProject: Project | null;
  title: string;
  setTitle: (val: string) => void;
  subtitle: string;
  setSubtitle: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  image: string;
  setImage: (val: string) => void;
  altText: string;
  setAltText: (val: string) => void;
  isSaving: boolean;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  onFileSelect: (file: File) => void;
}

export default function ProjectModal({
  isOpen,
  editingProject,
  title,
  setTitle,
  subtitle,
  setSubtitle,
  category,
  setCategory,
  image,
  setImage,
  altText,
  setAltText,
  isSaving,
  onClose,
  onSave,
  onFileSelect,
}: ProjectModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-3xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">
            {editingProject ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Fruit Burst"
                className="w-full h-12 px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <Select value={category} onValueChange={(val) => setCategory(val ?? "")}>
                <SelectTrigger className="w-full !h-12 px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition flex items-center justify-between [&>svg]:ml-auto shrink-0">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="w-[var(--anchor-width)] bg-white dark:bg-[#1f1f1f] border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl z-[70] p-1">
                  <SelectItem value="WEB DESIGNING">WEB DESIGNING</SelectItem>
                  <SelectItem value="MOBILE DESIGNING">MOBILE DESIGNING</SelectItem>
                  <SelectItem value="BRANDING">BRANDING</SelectItem>
                  <SelectItem value="PHOTOGRAPHY">PHOTOGRAPHY</SelectItem>
                  <SelectItem value="DEVELOPMENT">DEVELOPMENT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Subtitle / Description
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Online Fruits Shop"
              className="w-full h-12 px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
            />
          </div>

          {/* Drag and Drop Image Upload Zone */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Upload Image & SEO Alt Tag *
            </label>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1.5 ${
                isDragging
                  ? "border-[var(--theme-color)] bg-[var(--theme-color)]/10"
                  : "border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-[#1a1a1a] hover:border-[var(--theme-color)]"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    onFileSelect(e.target.files[0]);
                  }
                }}
              />

              {image ? (
                <div className="relative w-full h-24 rounded-lg overflow-hidden group">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-[11px] font-bold gap-1.5">
                    <UploadCloud className="w-3.5 h-3.5" /> Click or Drop to Replace
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-9 h-9 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                    <UploadCloud className="w-4 h-4 text-[var(--theme-color)]" />
                  </div>
                  <p className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                    Drag & Drop or <span className="text-[var(--theme-color)] underline">Browse</span>
                  </p>
                </>
              )}
            </div>

            {/* Direct Image Path & Alt Tag Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2.5">
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL / Path"
                className="w-full h-11 px-3.5 py-2.5 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded-xl text-[11px] text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--theme-color)] transition"
              />
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Image Alt Tag (SEO)"
                className="w-full h-11 px-3.5 py-2.5 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded-xl text-[11px] text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--theme-color)] transition"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs hover:bg-zinc-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-[#252525] dark:hover:bg-[#303030] text-white font-bold text-xs border border-zinc-700/50 hover:border-[var(--theme-color)] transition shadow-sm flex items-center gap-2"
            >
              {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {editingProject ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
