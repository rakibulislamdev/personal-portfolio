import React from "react";
import Image from "next/image";
import Link from "next/link";
import HoverIcon from "@/components/HoverIcon/HoverIcon";
import { Eye, Calendar } from "lucide-react";

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  views: number;
  coverImage?: string | null;
  createdAt: Date | string;
  content?: string | null;
}

interface BlogCardProps {
  blog: BlogItem;
  imageHeightClass?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  imageHeightClass = "h-72",
}) => {
  const blogUrl = `/blog/${blog.slug || blog.id}`;
  
  // Extract the first image from markdown content if no coverImage is explicitly set
  let imageUrl = blog.coverImage || "";
  if (!imageUrl && blog.content) {
    const imgRegex = /!\[.*?\]\((.*?)(?:#.*?)?\)/;
    const match = blog.content.match(imgRegex);
    if (match && match[1]) {
      imageUrl = match[1];
    }
  }

  // Final fallback placeholder
  if (!imageUrl) {
    imageUrl = "/assets/Images/Starbucks.png";
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={blogUrl}
      className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl p-6 flex flex-col justify-between block"
    >
      <div className={`${imageHeightClass} w-full overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm relative bg-zinc-950`}>
        <Image
          className="w-full h-full ease-in-out duration-[3s] rounded-2xl object-cover hover:scale-[1.03] transition-all"
          src={imageUrl}
          alt={blog.title}
          width={600}
          height={400}
        />
        {/* Date overlay badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-[10px] font-bold text-zinc-300 flex items-center gap-1.5 border border-white/10">
          <Calendar className="w-3 h-3 text-[var(--theme-color)]" />
          {formattedDate}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
              style={{ color: "var(--theme-color)" }}
            >
              {blog.category}
            </span>
            <span className="text-[10px] text-zinc-400 font-medium flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-zinc-500" />
              {blog.views} views
            </span>
          </div>
          <h3 className="text-zinc-900 dark:text-white text-xl font-bold mt-1.5 line-clamp-2">
            {blog.title}
          </h3>
        </div>
        <HoverIcon />
      </div>
    </Link>
  );
};

export default BlogCard;
