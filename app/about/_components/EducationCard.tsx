import React from "react";
import { getProfileSettings } from "@/lib/data";

interface EducationItem {
  id?: string;
  year: string;
  title: string;
  institution: string;
}

const defaultEducations: EducationItem[] = [
  {
    id: "1",
    year: "2021 - 2025",
    title: "Diploma in Computer Science & Technology",
    institution: "Pabna Polytechnic Institute, Pabna",
  },
];

export const EducationCard = async () => {
  let educations: EducationItem[] = defaultEducations;

  try {
    const settings = await getProfileSettings();
    if (settings && settings.educations) {
      const parsed = JSON.parse(settings.educations);
      if (Array.isArray(parsed) && parsed.length > 0) {
        educations = parsed;
      }
    }
  } catch (err) {
    console.error("Error parsing educations in EducationCard:", err);
  }

  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 p-8 space-y-6 shadow-md h-full">
      <h3
        className="font-bold text-xs uppercase tracking-widest transition-colors duration-300"
        style={{ color: "var(--theme-color)" }}
      >
        EDUCATION
      </h3>

      <div className="space-y-5">
        {educations.map((edu, idx) => (
          <div key={edu.id || idx} className="space-y-1">
            <span className="block text-xs font-semibold text-[var(--text-muted)]">
              {edu.year}
            </span>
            <p className="font-bold text-zinc-900 dark:text-white text-lg">
              {edu.title}
            </p>
            <span className="block text-xs font-medium text-[var(--text-muted)]">
              {edu.institution}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationCard;
