"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Loader2, FileText, ExternalLink, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ResumeDropzoneProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export default function ResumeDropzone({
  label,
  value = "",
  onChange,
  placeholder = "Upload PDF/DOC file or paste Drive/CDN link...",
}: ResumeDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    // Strict PDF File Type Check
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      toast.error("Only PDF files (.pdf) are allowed for Resume upload!");
      return;
    }

    // Max 25MB check
    if (file.size > 25 * 1024 * 1024) {
      toast.error("File size is too large (Max 25MB allowed)");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "resume");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
        toast.success("Resume PDF uploaded successfully!");
      } else {
        toast.error("Failed to upload resume PDF");
      }
    } catch (err) {
      console.error("Resume upload failed:", err);
      toast.error("Error uploading resume PDF");
    } finally {
      setIsUploading(false);
    }
  };

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
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-3 p-5 bg-zinc-50/70 dark:bg-[#181818]/70 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-[var(--theme-color)]" />
          {label}
        </label>
        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-[var(--theme-color)] hover:underline flex items-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> View Current Resume (PDF) <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {/* Drag & Drop Box */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full py-6 px-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
            isDragging
              ? "border-[var(--theme-color)] bg-[var(--theme-color)]/10 scale-[1.01]"
              : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] hover:border-[var(--theme-color)]/60"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--theme-color)]" />
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Uploading Resume PDF...</span>
            </div>
          ) : (
            <>
              <UploadCloud className="w-8 h-8 text-zinc-400 dark:text-zinc-500 mb-2" />
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                Drag & Drop your Resume PDF file here, or{" "}
                <span style={{ color: "var(--theme-color)" }}>Browse PDF</span>
              </p>
              <p className="text-[10px] text-zinc-400 mt-1">
                Strictly PDF files only (.pdf) • Max 25MB
              </p>
            </>
          )}
        </div>

        {/* Direct Link Input */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 bg-white dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
          />
        </div>
      </div>
    </div>
  );
}
