import React from "react";
import SparkleStarIcon from "@/components/Icons/SparkleStarIcon";

export const WorksHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-3 py-2 w-full">
      <SparkleStarIcon
        className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 transition-colors duration-300"
        style={{ color: "var(--theme-color)" }}
      />
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-wider text-center whitespace-nowrap">
        ALL PROJECTS
      </h1>
      <SparkleStarIcon
        className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 transition-colors duration-300"
        style={{ color: "var(--theme-color)" }}
      />
    </div>
  );
};

export default WorksHeader;
