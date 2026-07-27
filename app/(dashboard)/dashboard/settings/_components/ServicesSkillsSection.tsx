"use client";

import React from "react";
import { Cpu, CheckSquare, Square } from "lucide-react";
import { ProfileSettingsData } from "./types";
import { FaCss3Alt, FaJava, FaPhp, FaPython, FaAws, FaLinux, FaAndroid, FaApple } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import {
  SiHtml5, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiSvelte,
  SiTailwindcss, SiBootstrap, SiSass, SiJquery, SiThreedotjs,
  SiNodedotjs, SiExpress, SiNestjs, SiDjango, SiFastapi, SiLaravel, SiRubyonrails,
  SiSpringboot, SiGo, SiCplusplus, SiRust, SiDotnet, SiGraphql,
  SiMongodb, SiPostgresql, SiMysql, SiSqlite, SiRedis, SiPrisma, SiSupabase, SiFirebase, SiMariadb,
  SiGit, SiGithub, SiGitlab, SiDocker, SiKubernetes, SiGooglecloud, SiVercel, SiNetlify, SiNginx, SiVite,
  SiJest, SiCypress, SiPostman, SiFigma, SiRedux, SiFramer, SiFlutter, SiSwift, SiKotlin,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { MdOutlineDevices } from "react-icons/md";

export interface SkillConfig {
  id: string;
  label: string;
  Icon: React.ElementType;
  color: string;
  defaultRow: 1 | 2;
  category?: string;
}

export const ALL_SKILLS: SkillConfig[] = [
  // Frontend
  { id: "html5", label: "HTML5", Icon: SiHtml5, color: "#E34F26", defaultRow: 1, category: "Frontend" },
  { id: "css3", label: "CSS3", Icon: FaCss3Alt, color: "#1572B6", defaultRow: 1, category: "Frontend" },
  { id: "javascript", label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", defaultRow: 1, category: "Frontend" },
  { id: "typescript", label: "TypeScript", Icon: SiTypescript, color: "#3178C6", defaultRow: 1, category: "Frontend" },
  { id: "react", label: "React.js", Icon: SiReact, color: "#61DAFB", defaultRow: 1, category: "Frontend" },
  { id: "nextjs", label: "Next.js", Icon: SiNextdotjs, color: "#ffffff", defaultRow: 1, category: "Frontend" },
  { id: "vuejs", label: "Vue.js", Icon: SiVuedotjs, color: "#4FC08D", defaultRow: 1, category: "Frontend" },
  { id: "angular", label: "Angular", Icon: SiAngular, color: "#DD0031", defaultRow: 1, category: "Frontend" },
  { id: "svelte", label: "Svelte", Icon: SiSvelte, color: "#FF3E00", defaultRow: 1, category: "Frontend" },
  { id: "tailwind", label: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4", defaultRow: 1, category: "Frontend" },
  { id: "bootstrap", label: "Bootstrap", Icon: SiBootstrap, color: "#7952B3", defaultRow: 1, category: "Frontend" },
  { id: "sass", label: "Sass / SCSS", Icon: SiSass, color: "#CC6699", defaultRow: 1, category: "Frontend" },
  { id: "jquery", label: "jQuery", Icon: SiJquery, color: "#0769AD", defaultRow: 1, category: "Frontend" },
  { id: "threejs", label: "Three.js / WebGL", Icon: SiThreedotjs, color: "#ffffff", defaultRow: 1, category: "Frontend" },
  { id: "redux", label: "Redux / Toolkit", Icon: SiRedux, color: "#764ABC", defaultRow: 1, category: "Frontend" },

  // Backend
  { id: "nodejs", label: "Node.js", Icon: SiNodedotjs, color: "#339933", defaultRow: 1, category: "Backend" },
  { id: "expressjs", label: "Express.js", Icon: SiExpress, color: "#ffffff", defaultRow: 1, category: "Backend" },
  { id: "nestjs", label: "NestJS", Icon: SiNestjs, color: "#E0234E", defaultRow: 1, category: "Backend" },
  { id: "python", label: "Python", Icon: FaPython, color: "#3776AB", defaultRow: 1, category: "Backend" },
  { id: "django", label: "Django", Icon: SiDjango, color: "#092E20", defaultRow: 1, category: "Backend" },
  { id: "fastapi", label: "FastAPI", Icon: SiFastapi, color: "#009688", defaultRow: 1, category: "Backend" },
  { id: "php", label: "PHP", Icon: FaPhp, color: "#777BB4", defaultRow: 1, category: "Backend" },
  { id: "laravel", label: "Laravel", Icon: SiLaravel, color: "#FF2D20", defaultRow: 1, category: "Backend" },
  { id: "java", label: "Java", Icon: FaJava, color: "#007396", defaultRow: 1, category: "Backend" },
  { id: "springboot", label: "Spring Boot", Icon: SiSpringboot, color: "#6DB33F", defaultRow: 1, category: "Backend" },
  { id: "golang", label: "Go (Golang)", Icon: SiGo, color: "#00ADD8", defaultRow: 1, category: "Backend" },
  { id: "cpp", label: "C++", Icon: SiCplusplus, color: "#00599C", defaultRow: 1, category: "Backend" },
  { id: "rust", label: "Rust", Icon: SiRust, color: "#CE412B", defaultRow: 1, category: "Backend" },
  { id: "dotnet", label: ".NET / C#", Icon: SiDotnet, color: "#512BD4", defaultRow: 1, category: "Backend" },
  { id: "graphql", label: "GraphQL", Icon: SiGraphql, color: "#E10098", defaultRow: 1, category: "Backend" },
  { id: "restapi", label: "REST API", Icon: TbApi, color: "#9F9F9F", defaultRow: 1, category: "Backend" },

  // Mobile App Dev
  { id: "reactnative", label: "React Native", Icon: SiReact, color: "#61DAFB", defaultRow: 2, category: "Mobile" },
  { id: "flutter", label: "Flutter", Icon: SiFlutter, color: "#02569B", defaultRow: 2, category: "Mobile" },
  { id: "swift", label: "Swift (iOS)", Icon: SiSwift, color: "#F05138", defaultRow: 2, category: "Mobile" },
  { id: "kotlin", label: "Kotlin (Android)", Icon: SiKotlin, color: "#7F52FF", defaultRow: 2, category: "Mobile" },
  { id: "android", label: "Android Dev", Icon: FaAndroid, color: "#3DDC84", defaultRow: 2, category: "Mobile" },

  // Database
  { id: "mongodb", label: "MongoDB", Icon: SiMongodb, color: "#47A248", defaultRow: 2, category: "Database" },
  { id: "postgresql", label: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1", defaultRow: 2, category: "Database" },
  { id: "mysql", label: "MySQL", Icon: SiMysql, color: "#4479A1", defaultRow: 2, category: "Database" },
  { id: "sqlite", label: "SQLite", Icon: SiSqlite, color: "#003B57", defaultRow: 2, category: "Database" },
  { id: "redis", label: "Redis", Icon: SiRedis, color: "#DC382D", defaultRow: 2, category: "Database" },
  { id: "prisma", label: "Prisma ORM", Icon: SiPrisma, color: "#2D3748", defaultRow: 2, category: "Database" },
  { id: "supabase", label: "Supabase", Icon: SiSupabase, color: "#3ECF8E", defaultRow: 2, category: "Database" },
  { id: "firebase", label: "Firebase", Icon: SiFirebase, color: "#FFCA28", defaultRow: 2, category: "Database" },

  // DevOps & Cloud
  { id: "git", label: "Git", Icon: SiGit, color: "#F05032", defaultRow: 2, category: "DevOps" },
  { id: "github", label: "GitHub", Icon: SiGithub, color: "#ffffff", defaultRow: 2, category: "DevOps" },
  { id: "gitlab", label: "GitLab", Icon: SiGitlab, color: "#FC6D26", defaultRow: 2, category: "DevOps" },
  { id: "docker", label: "Docker", Icon: SiDocker, color: "#2496ED", defaultRow: 2, category: "DevOps" },
  { id: "kubernetes", label: "Kubernetes", Icon: SiKubernetes, color: "#326CE5", defaultRow: 2, category: "DevOps" },
  { id: "aws", label: "AWS", Icon: FaAws, color: "#FF9900", defaultRow: 2, category: "DevOps" },
  { id: "gcp", label: "Google Cloud", Icon: SiGooglecloud, color: "#4285F4", defaultRow: 2, category: "DevOps" },
  { id: "azure", label: "Microsoft Azure", Icon: VscAzure, color: "#0089D6", defaultRow: 2, category: "DevOps" },
  { id: "vercel", label: "Vercel", Icon: SiVercel, color: "#ffffff", defaultRow: 2, category: "DevOps" },
  { id: "netlify", label: "Netlify", Icon: SiNetlify, color: "#00C7B7", defaultRow: 2, category: "DevOps" },
  { id: "linux", label: "Linux", Icon: FaLinux, color: "#FCC624", defaultRow: 2, category: "DevOps" },
  { id: "nginx", label: "Nginx", Icon: SiNginx, color: "#009639", defaultRow: 2, category: "DevOps" },
  { id: "vite", label: "Vite", Icon: SiVite, color: "#646CFF", defaultRow: 2, category: "DevOps" },

  // Tools & Design
  { id: "figma", label: "Figma", Icon: SiFigma, color: "#F24E1E", defaultRow: 2, category: "Design" },
  { id: "uiux", label: "UI / UX Design", Icon: SiFigma, color: "#A259FF", defaultRow: 2, category: "Design" },
  { id: "framer", label: "Framer", Icon: SiFramer, color: "#0055FF", defaultRow: 2, category: "Design" },
  { id: "responsive", label: "Responsive Design", Icon: MdOutlineDevices, color: "#9F9F9F", defaultRow: 2, category: "Design" },
  { id: "postman", label: "Postman", Icon: SiPostman, color: "#FF6C37", defaultRow: 2, category: "Tools" },
  { id: "jest", label: "Jest", Icon: SiJest, color: "#C21325", defaultRow: 2, category: "Tools" },
  { id: "cypress", label: "Cypress", Icon: SiCypress, color: "#17202C", defaultRow: 2, category: "Tools" },
];

interface ServicesSkillsSectionProps {
  profile: ProfileSettingsData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileSettingsData>>;
}

export default function ServicesSkillsSection({
  profile,
  setProfile,
}: ServicesSkillsSectionProps) {
  const [activeCategory, setActiveCategory] = React.useState<string>("All");

  const parseEnabledList = (): string[] => {
    if (!profile.enabledSkills || profile.enabledSkills.trim() === "") {
      return [];
    }
    try {
      let parsed: any = profile.enabledSkills;
      if (typeof parsed === "string") {
        try {
          parsed = JSON.parse(parsed);
        } catch {
          return profile.enabledSkills.split(",").map((s) => s.trim());
        }
      }
      if (typeof parsed === "string") {
        try {
          parsed = JSON.parse(parsed);
        } catch {}
      }
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Fallback
    }
    return [];
  };

  const enabledIds = parseEnabledList();

  const toggleSkill = (id: string) => {
    let nextList: string[];
    if (enabledIds.includes(id)) {
      nextList = enabledIds.filter((item) => item !== id);
    } else {
      nextList = [...enabledIds, id];
    }
    setProfile({
      ...profile,
      enabledSkills: JSON.stringify(nextList),
    });
  };

  const handleSelectAll = () => {
    setProfile({
      ...profile,
      enabledSkills: JSON.stringify(ALL_SKILLS.map((s) => s.id)),
    });
  };

  const handleDeselectAll = () => {
    setProfile({
      ...profile,
      enabledSkills: JSON.stringify([]),
    });
  };

  const categories = ["All", "Frontend", "Backend", "Mobile", "Database", "DevOps", "Design", "Tools"];

  const filteredSkills = ALL_SKILLS.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[var(--theme-color)]" /> Specialization & Programming Skills ({ALL_SKILLS.length} Total)
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Toggle ON skills to feature them on your portfolio&apos;s &quot;Services Offering&quot; card marquee.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handleSelectAll}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-[var(--theme-color)] transition border border-zinc-200/80 dark:border-zinc-700/60"
          >
            <CheckSquare className="w-3.5 h-3.5" /> Select All
          </button>
          <button
            type="button"
            onClick={handleDeselectAll}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-red-500 transition border border-zinc-200/80 dark:border-zinc-700/60"
          >
            <Square className="w-3.5 h-3.5" /> Deselect All
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-[var(--theme-color)] text-white shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
        {filteredSkills.map((skill) => {
          const isEnabled = enabledIds.includes(skill.id);
          const Icon = skill.Icon;

          return (
            <div
              key={skill.id}
              onClick={() => toggleSkill(skill.id)}
              className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer select-none transition-all duration-200 ${
                isEnabled
                  ? "bg-zinc-50 dark:bg-[#1a1a1a] border-[var(--theme-color)]/50 shadow-sm"
                  : "bg-zinc-100/50 dark:bg-[#151515]/50 border-zinc-200/60 dark:border-zinc-800/60 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <Icon style={{ color: skill.color }} className="text-lg flex-shrink-0" />
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">
                  {skill.label}
                </span>
              </div>

              {/* Toggle switch */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSkill(skill.id);
                }}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isEnabled ? "bg-[var(--theme-color)]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isEnabled ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
