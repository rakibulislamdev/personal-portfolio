import React from "react";
import BlogCard, { BlogItem } from "./BlogCard";
import BlogsHeader from "./BlogsHeader";

interface AllBlogsGridProps {
  blogsList?: BlogItem[];
}

const defaultBlogs: BlogItem[] = [];

export const AllBlogsGrid: React.FC<AllBlogsGridProps> = ({
  blogsList = defaultBlogs,
}) => {
  if (blogsList.length === 0) {
    return (
      <div className="space-y-6">
        <BlogsHeader />
        <div className="text-center py-16 bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 p-8">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            No articles published yet. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  // If we have less than 4 blogs, fallback to a clean standard grid to keep it visually balanced
  if (blogsList.length < 4) {
    return (
      <div className="space-y-8">
        <BlogsHeader />
        <div className={`grid grid-cols-1 ${
          blogsList.length === 1 
            ? "max-w-md mx-auto" 
            : blogsList.length === 2 
            ? "md:grid-cols-2 max-w-4xl mx-auto" 
            : "md:grid-cols-3"
        } gap-6`}>
          {blogsList.map((blog) => (
            <BlogCard key={blog.id} blog={blog} imageHeightClass="h-72" />
          ))}
        </div>
      </div>
    );
  }

  const p1 = blogsList[0];
  const p2 = blogsList[1];
  const p3 = blogsList[2];
  const p4 = blogsList[3];
  const restBlogs = blogsList.slice(4);

  return (
    <div className="space-y-6">
      {/* Mobile Only Header: Renders at the very top of the page on small screens */}
      <div className="block lg:hidden w-full">
        <BlogsHeader />
      </div>

      {/* 3-Column Asymmetric Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Slot 1 & Slot 4 (Tall Card) */}
        <div className="flex flex-col gap-6">
          {p1 && <BlogCard blog={p1} imageHeightClass="h-72" />}
          {p4 && <BlogCard blog={p4} imageHeightClass="h-[387px]" />}
        </div>

        {/* Right 2 Columns Container */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Desktop Only Header: Sits inside the grid to preserve asymmetric card heights */}
          <div className="hidden lg:block w-full">
            <BlogsHeader />
          </div>

          {/* Dynamic Grid for remaining cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {p2 && <BlogCard blog={p2} imageHeightClass="h-72" />}
            {p3 && <BlogCard blog={p3} imageHeightClass="h-72" />}
            {restBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} imageHeightClass="h-72" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogsGrid;
