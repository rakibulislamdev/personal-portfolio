import React from "react";
import type { Metadata } from "next";
import AllBlogsGrid from "./_components/AllBlogsGrid";
import { getBlogs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog | Rakibul Islam - Web Development Articles & Thoughts",
  description:
    "Read articles, tutorials, and insights by Rakibul Islam on web development, React, Next.js, TypeScript, and modern frontend technologies.",
  keywords: [
    "Rakibul Islam Blog",
    "Rakibul Islam Articles",
    "Rakibul Islam Writing",
    "Rakibul Islam Web Development",
    "Web Development Articles",
    "React Tutorial",
    "Next.js Blog",
    "Frontend Development Tips",
    "JavaScript Articles Bangladesh",
  ],
  alternates: {
    canonical: "https://rakibulislamdev.me/blog",
  },
  openGraph: {
    title: "Blog | Rakibul Islam - Web Development Articles",
    description:
      "Explore web development articles and insights by Rakibul Islam covering React, Next.js, TypeScript, and more.",
    url: "https://rakibulislamdev.me/blog",
    siteName: "Rakibul Islam Portfolio",
    images: [
      {
        url: "/assets/Images/Rakibulislam1.jpg",
        width: 1200,
        height: 630,
        alt: "Rakibul Islam Blog - Web Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Rakibul Islam",
    description:
      "Web development articles and insights by Rakibul Islam.",
    images: ["/assets/Images/Rakibulislam1.jpg"],
  },
};

export default async function BlogPage() {
  const allBlogs = await getBlogs();
  
  // Filter for published posts
  const publishedBlogs = allBlogs.filter((blog) => blog.status === "Published");

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <AllBlogsGrid blogsList={publishedBlogs.length > 0 ? (publishedBlogs as any) : undefined} />
    </section>
  );
}
