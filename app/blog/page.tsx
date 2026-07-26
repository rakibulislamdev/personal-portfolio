import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Rakibul Islam - Web Development Articles & Thoughts",
  description:
    "Read articles, tutorials, and insights by Rakibul Islam on web development, React, Next.js, TypeScript, and modern frontend technologies.",
  keywords: [
    "Rakibul Islam Blog",
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

export default function BlogPage() {
  return (
    <div className="py-10 px-4 sm:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Blogs</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Articles & Thoughts by Rakibul Islam.
      </p>
    </div>
  );
}
