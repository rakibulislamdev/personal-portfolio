import React from "react";

export const EducationCard = () => {
  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 p-8 space-y-6 shadow-md h-full">
      <h3
        className="font-bold text-xs uppercase tracking-widest transition-colors duration-300"
        style={{ color: "var(--theme-color)" }}
      >
        EDUCATION
      </h3>

      <div className="space-y-1">
        <span className="block text-xs font-semibold text-[var(--text-muted)]">
          2021 - 2025
        </span>
        <p className="font-bold text-zinc-900 dark:text-white text-lg">
          Diploma in Computer Science & Technology
        </p>
        <span className="block text-xs font-medium text-[var(--text-muted)]">
          Pabna Polytechnic Institute, Pabna
        </span>
      </div>
    </div>
  );
};

export default EducationCard;
