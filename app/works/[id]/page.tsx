import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectById, getProjects } from "@/lib/data";
import { 
  ArrowLeft, 
  ExternalLink, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  ArrowRight
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>;
}

// Fallback project details generator for standard/demo items
const getProjectDetails = (id: string, dbProject?: any) => {
  if (dbProject) {
    const rawTech = dbProject.technologies || "";
    const techArray =
      typeof rawTech === "string" && rawTech.trim().length > 0
        ? rawTech.split(",").map((t: string) => t.trim()).filter(Boolean)
        : ["React.js", "Next.js 15", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"];

    const rawFeatures = dbProject.keyFeatures || "";
    const featuresArray =
      typeof rawFeatures === "string" && rawFeatures.trim().length > 0
        ? rawFeatures.split("\n").map((f: string) => f.trim()).filter(Boolean)
        : [
            "Fully responsive & mobile-first UI design",
            "Optimized Lighthouse & Core Web Vitals score",
            "Server-side rendering & Fast API integrations",
            "Dark & Light mode seamless theme support",
          ];

    return {
      id: dbProject.id,
      title: dbProject.title,
      category: dbProject.category,
      subtitle: dbProject.subtitle || "Modern Web Application",
      image: dbProject.image,
      description:
        dbProject.description ||
        "A high-performance modern web application built with precision, responsive layout, and cutting-edge web technologies to deliver an exceptional user experience.",
      year: dbProject.year || "2025 - Present",
      client: dbProject.client || "Featured Project",
      liveUrl: dbProject.liveUrl || "https://rakibulislamdev.me",
      githubUrl: dbProject.githubUrl || "https://github.com/rakibulislamdev",
      technologies: techArray,
      keyFeatures: featuresArray,
    };
  }

  // Pre-configured projects fallback matching standard titles
  const formattedId = decodeURIComponent(id).toLowerCase();
  
  return {
    id,
    title: id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    category: "WEB DEVELOPMENT",
    subtitle: "Featured Portfolio Showcase Project",
    image: "/assets/Images/FruitBurst.png",
    description:
      "An innovative web application designed with modern frontend principles, interactive user interfaces, and optimized performance.",
    year: "2025",
    client: "Client Project",
    liveUrl: "https://rakibulislamdev.me",
    githubUrl: "https://github.com/rakibulislamdev",
    technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    keyFeatures: [
      "Intuitive UX and smooth micro-animations",
      "Robust state management & clean architecture",
      "Cross-browser and mobile compatibility",
    ],
  };
};

export async function generateMetadata({ params }: ProjectDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  let dbProject = null;
  
  try {
    dbProject = await getProjectById(id);
  } catch (e) {
    // ignore lookup error
  }

  const project = getProjectDetails(id, dbProject);

  return {
    title: `${project.title} | Project Details - Rakibul Islam`,
    description: `Detailed showcase of ${project.title} - ${project.subtitle} by Rakibul Islam. Built with ${project.technologies.join(", ")}.`,
    alternates: {
      canonical: `https://rakibulislamdev.me/works/${id}`,
    },
    openGraph: {
      title: `${project.title} | Web Project by Rakibul Islam`,
      description: project.description,
      url: `https://rakibulislamdev.me/works/${id}`,
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { id } = await params;
  let dbProject = null;

  try {
    dbProject = await getProjectById(id);
  } catch (e) {
    // ignore fallback
  }

  const project = getProjectDetails(id, dbProject);

  // Fetch other recent projects for "More Works" section
  let otherProjects = [];
  try {
    const all = await getProjects();
    otherProjects = all.filter((p) => p.id !== id).slice(0, 2);
  } catch (e) {
    // ignore
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-zinc-200/90 dark:border-zinc-800/80 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:border-[var(--theme-color)] transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-[var(--theme-color)]" />
          Back to All Works
        </Link>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-color)]/10 text-[var(--theme-color)] text-xs font-bold uppercase tracking-widest">
          {project.category}
        </span>
      </div>

      {/* Hero Banner Section */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          {project.title}
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-3xl">
          {project.subtitle}
        </p>
      </div>

      {/* Main Feature Image Container */}
      <div className="relative w-full h-[320px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-zinc-200/90 dark:border-zinc-800/80 shadow-xl bg-zinc-900">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover object-top hover:object-bottom transition-all duration-[6s] ease-in-out"
        />
      </div>

      {/* Info Grid & Action Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Description & Key Features */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 sm:p-8 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md space-y-4">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[var(--theme-color)]" />
              Project Overview
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Features */}
          <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 sm:p-8 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md space-y-4">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Key Highlights & Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-[#1a1a1a] border border-zinc-200/60 dark:border-zinc-800/60"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--theme-color)] shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Tech Stack */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md space-y-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800/80 pb-3">
              Project Details
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">Category</span>
                <span className="font-bold text-zinc-900 dark:text-white">{project.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">Year</span>
                <span className="font-bold text-zinc-900 dark:text-white">{project.year}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">Type</span>
                <span className="font-bold text-zinc-900 dark:text-white">{project.client}</span>
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Technologies Used
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Live & Github Links */}
            <div className="space-y-3 pt-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[var(--theme-color)] hover:opacity-90 text-white font-bold text-xs transition shadow-md"
              >
                <ExternalLink className="w-4 h-4" /> Live Preview
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs hover:bg-zinc-800 transition"
              >
                <FaGithub className="w-4 h-4" /> View Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
