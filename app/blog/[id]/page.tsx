import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogById, getBlogs, getProfileSettings } from "@/lib/data";
import BlogViewTracker from "./_components/BlogViewTracker";
import { 
  ArrowLeft, 
  Calendar, 
  Eye, 
  Layers, 
  BookOpen
} from "lucide-react";

interface BlogDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BlogDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog || blog.status !== "Published") {
    return {
      title: "Article Not Found | Rakibul Islam",
    };
  }

  // Clean description of markdown symbols
  const cleanDescription = blog.content
    ? blog.content.replace(/[#*`_[\]()-]/g, "").substring(0, 155).trim() + "..."
    : "Read this article by Rakibul Islam";

  const coverUrl = blog.coverImage || "/assets/Images/Starbucks.png";
  const slugOrId = blog.slug || blog.id;

  return {
    title: `${blog.title} | Blog - Rakibul Islam`,
    description: cleanDescription,
    keywords: [
      blog.title.toLowerCase(),
      blog.category.toLowerCase(),
      "rakibul islam blog",
      "web development article",
      "javascript nextjs developer",
      "bangladesh frontend developer",
    ],
    alternates: {
      canonical: `https://rakibulislamdev.me/blog/${slugOrId}`,
    },
    openGraph: {
      title: `${blog.title} | Blog - Rakibul Islam`,
      description: cleanDescription,
      url: `https://rakibulislamdev.me/blog/${slugOrId}`,
      siteName: "Rakibul Islam Portfolio",
      images: [
        {
          url: coverUrl,
          alt: blog.title,
        },
      ],
      type: "article",
      publishedTime: new Date(blog.createdAt).toISOString(),
      modifiedTime: new Date(blog.updatedAt).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | Blog - Rakibul Islam`,
      description: cleanDescription,
      images: [coverUrl],
    },
  };
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog || blog.status !== "Published") {
    notFound();
  }

  // Fetch settings dynamically for social toggles
  const settings = await getProfileSettings();

  // Fetch other recent blogs for "Read More" section
  let otherBlogs: any[] = [];
  try {
    const all = await getBlogs();
    otherBlogs = all.filter((b) => b.id !== blog.id && b.status === "Published").slice(0, 2);
  } catch (e) {
    // ignore
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const cleanDescription = blog.content
    ? blog.content.replace(/[#*`_[\]()-]/g, "").substring(0, 155).trim() + "..."
    : "Read this article by Rakibul Islam";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.coverImage || "https://rakibulislamdev.me/assets/Images/Starbucks.png",
    "datePublished": new Date(blog.createdAt).toISOString(),
    "dateModified": new Date(blog.updatedAt).toISOString(),
    "author": {
      "@type": "Person",
      "name": "Rakibul Islam",
      "url": "https://rakibulislamdev.me"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rakibul Islam",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rakibulislamdev.me/assets/Images/rakibulislam.jpg"
      }
    },
    "description": cleanDescription
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogViewTracker blogId={blog.id} />
      {/* Back Button & Category */}
      <div className="flex items-center justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-zinc-200/90 dark:border-zinc-800/80 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:border-[var(--theme-color)] transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-[var(--theme-color)]" />
          Back to Articles
        </Link>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-color)]/10 text-[var(--theme-color)] text-xs font-bold uppercase tracking-widest">
          {blog.category}
        </span>
      </div>

      {/* Article Title & Subtitle */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
          {blog.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-505 dark:text-zinc-400">
          <span className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
            By <span className="text-[var(--theme-color)] font-bold">Rakibul Islam</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[var(--theme-color)]" />
            {formattedDate}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-zinc-500" />
            {blog.views} views
          </span>
        </div>
      </div>

      {/* Main Cover Image */}
      {blog.coverImage && (
        <div className="relative w-full h-[300px] sm:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden border border-zinc-200/90 dark:border-zinc-800/80 shadow-xl bg-zinc-900">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Markdown content styled like Medium article */}
        <div className="lg:col-span-2 space-y-8">
          <article className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 sm:p-10 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md">
            <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-white prose-p:text-base prose-p:leading-relaxed prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-a:text-[var(--theme-color)] prose-a:underline hover:prose-a:opacity-85 transition prose-h3:text-xl prose-h4:text-lg">
              {blog.content ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img({ src, alt, ...props }) {
                      const srcString = typeof src === "string" ? src : "";
                      const hash = srcString ? srcString.split("#")[1] : "";
                      const alignment = ["left", "right", "center"].includes(hash) ? hash : "center";

                      let containerClass = "my-6 flex flex-col ";
                      if (alignment === "left") {
                        containerClass += "items-start float-left mr-6 max-w-[50%] md:max-w-[40%] clear-none";
                      } else if (alignment === "right") {
                        containerClass += "items-end float-right ml-6 max-w-[50%] md:max-w-[40%] clear-none";
                      } else {
                        containerClass += "items-center mx-auto max-w-full clear-both";
                      }

                      return (
                        <span className={containerClass}>
                          <img
                            src={src}
                            alt={alt && alt !== "Image" ? alt : `${blog.title} - ${blog.category} Illustration`}
                            className="rounded-2xl max-h-[350px] object-cover shadow-lg border border-zinc-200 dark:border-zinc-800 w-full"
                            {...props}
                          />
                          {alt && alt !== "Image" && (
                            <span className="block mt-2.5 text-center text-xs font-medium text-zinc-400 dark:text-zinc-500 italic">
                              {alt}
                            </span>
                          )}
                        </span>
                      );
                    },
                    code({ node, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      const isInline = !match;
                      const lang = match ? match[1] : "code";
                      
                      return !isInline ? (
                        <div className="relative my-7 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md">
                          {/* Code Block Header */}
                          <div className="flex items-center justify-between px-5 py-2.5 bg-zinc-100 dark:bg-[#151515] border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
                            <span>{lang}</span>
                            <span className="flex gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                            </span>
                          </div>
                          {/* Main Code */}
                          <pre className="bg-[#fcfcfc] dark:bg-[#0c0c0c] p-5 overflow-x-auto font-mono text-sm text-zinc-850 dark:text-zinc-100 leading-relaxed m-0">
                            <code>{String(children).replace(/\n$/, "")}</code>
                          </pre>
                        </div>
                      ) : (
                        <code
                          className="bg-zinc-100/80 dark:bg-zinc-800/60 px-2 py-0.5 rounded text-xs font-mono text-[var(--theme-color)] dark:text-[var(--theme-hover-color)] font-semibold border border-zinc-200/50 dark:border-zinc-700/30"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    blockquote({ children, ...props }) {
                      return (
                        <blockquote 
                          className="border-l-4 border-[var(--theme-color)] pl-5 italic text-zinc-500 dark:text-zinc-400 my-6 bg-zinc-50/50 dark:bg-zinc-900/30 py-1.5 pr-4 rounded-r-xl"
                          {...props}
                        >
                          {children}
                        </blockquote>
                      );
                    },
                    a({ href, children, ...props }) {
                      let finalHref = href || "";
                      if (!/^https?:\/\//i.test(finalHref) && !finalHref.startsWith("/") && !finalHref.startsWith("#")) {
                        finalHref = "https://" + finalHref;
                      }
                      return (
                        <a 
                          href={finalHref} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[var(--theme-color)] hover:text-[var(--theme-hover-color)] underline font-semibold transition-colors duration-200"
                          {...props}
                        >
                          {children}
                        </a>
                      );
                    }
                  }}
                >
                  {blog.content}
                </ReactMarkdown>
              ) : (
                <p className="text-zinc-400 dark:text-zinc-500 italic">This post has no content yet.</p>
              )}
            </div>
          </article>
        </div>

        {/* Right Column: Metadata & Tech Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md space-y-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800/80 pb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[var(--theme-color)]" />
              Article Info
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">Category</span>
                <span className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider">{blog.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">Published</span>
                <span className="font-bold text-zinc-900 dark:text-white">{formattedDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">Views</span>
                <span className="font-bold text-zinc-900 dark:text-white">{blog.views} views</span>
              </div>
            </div>

            {/* Author Profile Quick Info & Portfolio/Social Links */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 space-y-3">
              <span className="text-xs font-semibold text-zinc-400 block">About The Author</span>
              <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                {settings?.aboutBio || "Rakibul Islam is a Full Stack Web Developer based in Bangladesh, specialized in building next-gen web applications."}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-zinc-500 dark:text-zinc-400">
                <a
                  href="/"
                  className="text-[var(--theme-color)] hover:underline font-bold transition-all"
                >
                  Portfolio
                </a>
                
                {settings?.github && (settings?.githubInBlog ?? true) && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-700">|</span>
                    <a
                      href={settings.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                  </>
                )}

                {settings?.linkedin && (settings?.linkedinInBlog ?? true) && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-700">|</span>
                    <a
                      href={settings.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                  </>
                )}

                {settings?.facebook && settings?.facebookInBlog && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-700">|</span>
                    <a
                      href={settings.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      Facebook
                    </a>
                  </>
                )}

                {settings?.twitter && settings?.twitterInBlog && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-700">|</span>
                    <a
                      href={settings.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      Twitter
                    </a>
                  </>
                )}

                {settings?.instagram && settings?.instagramInBlog && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-700">|</span>
                    <a
                      href={settings.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      Instagram
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* More Articles Sidebar */}
          {otherBlogs.length > 0 && (
            <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md space-y-4">
              <h3 className="text-md font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--theme-color)]" />
                Related Articles
              </h3>
              
              <div className="space-y-4">
                {otherBlogs.map((otherBlog) => (
                  <Link 
                    key={otherBlog.id} 
                    href={`/blog/${otherBlog.slug || otherBlog.id}`}
                    className="block group space-y-1"
                  >
                    <span className="text-[10px] font-bold text-[var(--theme-color)] uppercase tracking-wider">
                      {otherBlog.category}
                    </span>
                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-[var(--theme-color)] transition line-clamp-2">
                      {otherBlog.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
