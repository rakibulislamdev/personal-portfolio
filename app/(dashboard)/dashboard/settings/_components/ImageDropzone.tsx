"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Loader2, Link as LinkIcon, Image as ImageIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface ImageDropzoneProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export default function ImageDropzone({
  label,
  value,
  onChange,
  placeholder = "/assets/Images/rakibulislam.jpg",
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WebP, etc.)");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
        toast.success("High quality image uploaded successfully!");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Error uploading image file");
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
    <div className="space-y-2">
      <div>
        <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          {label}
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Preview Thumbnail - High Quality */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 flex-shrink-0 flex items-center justify-center group shadow-md">
          {value ? (
            <Image
              src={value}
              alt={label}
              width={400}
              height={400}
              quality={100}
              unoptimized
              priority
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <ImageIcon className="w-10 h-10 text-zinc-400" />
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-1.5 text-white">
              <Loader2 className="w-7 h-7 animate-spin text-[var(--theme-color)]" />
              <span className="text-[10px] font-bold">Uploading HD...</span>
            </div>
          )}
        </div>

        {/* Drag and Drop Zone */}
        <div className="flex-1 w-full space-y-2">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full py-5 px-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
              isDragging
                ? "border-[var(--theme-color)] bg-[var(--theme-color)]/10 scale-[1.01]"
                : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] hover:border-[var(--theme-color)]/60"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <UploadCloud className="w-7 h-7 text-zinc-400 dark:text-zinc-500 mb-1.5" />
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Drag & Drop high-res image here, or{" "}
              <span style={{ color: "var(--theme-color)" }}>Browse</span>
            </p>
            <p className="text-[10px] text-zinc-400 mt-0.5">
              Original quality preserved • PNG, JPG, WebP (Max 25MB)
            </p>
          </div>

          {/* Direct URL Input Fallback */}
          <div className="relative flex items-center">
            <LinkIcon className="absolute left-3.5 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-9 pr-4 py-2.5 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
