import React from "react";
import { getProfileSettings } from "@/lib/data";

interface ExperienceItem {
  id?: string;
  year: string;
  title: string;
  role: string;
}

const defaultExperiences: ExperienceItem[] = [
  {
    id: "1",
    year: "2023 - 2024",
    title: "Fiverr (Marketplace)",
    role: "Junior Web Developer",
  },
  {
    id: "2",
    year: "2023 - Present",
    title: "Programming Hero",
    role: "Web Development Learner",
  },
];

export const ExperienceCard = async () => {
  let experiences: ExperienceItem[] = defaultExperiences;

  try {
    const settings = await getProfileSettings();
    if (settings && settings.experiences) {
      const parsed = JSON.parse(settings.experiences);
      if (Array.isArray(parsed) && parsed.length > 0) {
        experiences = parsed;
      }
    }
  } catch (err) {
    console.error("Error parsing experiences in ExperienceCard:", err);
  }

  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 p-8 space-y-6 shadow-md h-full">
      <h3
        className="font-bold text-xs uppercase tracking-widest transition-colors duration-300"
        style={{ color: "var(--theme-color)" }}
      >
        EXPERIENCE
      </h3>

      <div className="space-y-5">
        {experiences.map((exp, idx) => (
          <div key={exp.id || idx} className="space-y-1">
            <span className="block text-xs font-semibold text-[var(--text-muted)]">
              {exp.year}
            </span>
            <p className="font-bold text-zinc-900 dark:text-white text-lg">
              {exp.title}
            </p>
            <span className="block text-xs font-medium text-[var(--text-muted)]">
              {exp.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceCard;
