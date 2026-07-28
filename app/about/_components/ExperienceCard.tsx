import React from "react";

export const ExperienceCard = () => {
  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 p-8 space-y-6 shadow-md h-full">
      <h3
        className="font-bold text-xs uppercase tracking-widest transition-colors duration-300"
        style={{ color: "var(--theme-color)" }}
      >
        EXPERIENCE
      </h3>

      <div className="space-y-1">
        <span className="block text-xs font-semibold text-[var(--text-muted)]">
          2023 - 2024
        </span>
        <p className="font-bold text-zinc-900 dark:text-white text-lg">
          Fiverr (Marketplace)
        </p>
        <span className="block text-xs font-medium text-[var(--text-muted)]">
          Junior Web Developer
        </span>
      </div>

      <div className="space-y-1 pt-2">
        <span className="block text-xs font-semibold text-[var(--text-muted)]">
          2023 - Present
        </span>
        <p className="font-bold text-zinc-900 dark:text-white text-lg">
          Programming Hero
        </p>
        <span className="block text-xs font-medium text-[var(--text-muted)]">
          Web Development Learner
        </span>
      </div>
    </div>
  );
};

export default ExperienceCard;
