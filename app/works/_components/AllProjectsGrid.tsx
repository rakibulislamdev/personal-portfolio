import React from "react";
import SparkleStarIcon from "@/components/Icons/SparkleStarIcon";
import HoverIcon from "@/components/HoverIcon/HoverIcon";

export interface ProjectItem {
  id?: string;
  title: string;
  category: string;
  subtitle?: string;
  image: string;
  featured?: boolean;
}

const defaultProjects: ProjectItem[] = [
  {
    title: "Fruit Burst",
    category: "WEB DESIGNING",
    subtitle: "Online Fruits Shop",
    image: "/assets/Images/FruitBurst.png",
  },
  {
    title: "Cafena",
    category: "MOBILE DESIGNING",
    subtitle: "Coffee Shop",
    image: "/assets/Images/Cafena.png",
  },
  {
    title: "Event Vibe Hub",
    category: "BRANDING",
    subtitle: "Event Management",
    image: "/assets/Images/Eventvibehub.png",
  },
  {
    title: "Road Riders Hub",
    category: "PHOTOGRAPHY",
    subtitle: "Branded Car Shop",
    image: "/assets/Images/RoadRidersHub.png",
  },
  {
    title: "Gamer Zone",
    category: "MOBILE DESIGNING",
    subtitle: "Gaming Portal",
    image: "/assets/Images/GamerZone.png",
  },
  {
    title: "Starbucks Web",
    category: "WEB DESIGNING",
    subtitle: "Coffee House App",
    image: "/assets/Images/Starbucks.png",
  },
];

interface AllProjectsGridProps {
  projectsList?: ProjectItem[];
}

export const AllProjectsGrid: React.FC<AllProjectsGridProps> = ({
  projectsList = defaultProjects,
}) => {
  // Extract items dynamically for grid slots
  const p1 = projectsList[0];
  const p2 = projectsList[1];
  const p3 = projectsList[2];
  const p4 = projectsList[3]; // Accent Tall card in Left Column
  const restProjects = projectsList.slice(4);

  return (
    <div className="space-y-6">
      {/* 3-Column Asymmetric Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Slot 1 (p1) & Slot 4 (p4 - Tall Card) */}
        <div className="flex flex-col gap-6">
          {p1 && (
            <div className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl p-6 flex flex-col justify-between">
              <div className="h-72 w-full overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm relative">
                <img
                  className="w-full h-full ease-in-out duration-[3s] rounded-2xl object-top object-cover hover:object-bottom transition-all"
                  src={p1.image}
                  alt={p1.title}
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p
                    className="text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
                    style={{ color: "var(--theme-color)" }}
                  >
                    {p1.category}
                  </p>
                  <h3 className="text-zinc-900 dark:text-white text-xl font-bold mt-0.5">
                    {p1.title}
                  </h3>
                </div>
                <HoverIcon />
              </div>
            </div>
          )}

          {p4 && (
            <div className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl p-6 flex flex-col justify-between">
              <div className="h-[387px] w-full overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm relative">
                <img
                  className="w-full h-full ease-in-out duration-[3s] rounded-2xl object-top object-cover hover:object-bottom transition-all"
                  src={p4.image}
                  alt={p4.title}
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p
                    className="text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
                    style={{ color: "var(--theme-color)" }}
                  >
                    {p4.category}
                  </p>
                  <h3 className="text-zinc-900 dark:text-white text-xl font-bold mt-0.5">
                    {p4.title}
                  </h3>
                </div>
                <HoverIcon />
              </div>
            </div>
          )}
        </div>

        {/* Right 2 Columns Container (Header + 2x2 Grid for Slot 2, Slot 3 & any additional dynamic projects) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* ALL PROJECTS Header centered across both right columns */}
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

          {/* Dynamic Grid for remaining projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {p2 && (
              <div className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl p-6 flex flex-col justify-between">
                <div className="h-72 w-full overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm relative">
                  <img
                    className="w-full h-full ease-in-out duration-[3s] rounded-2xl object-top object-cover hover:object-bottom transition-all"
                    src={p2.image}
                    alt={p2.title}
                  />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p
                      className="text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
                      style={{ color: "var(--theme-color)" }}
                    >
                      {p2.category}
                    </p>
                    <h3 className="text-zinc-900 dark:text-white text-xl font-bold mt-0.5">
                      {p2.title}
                    </h3>
                  </div>
                  <HoverIcon />
                </div>
              </div>
            )}

            {p3 && (
              <div className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl p-6 flex flex-col justify-between">
                <div className="h-72 w-full overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm relative">
                  <img
                    className="w-full h-full ease-in-out duration-[3s] rounded-2xl object-top object-cover hover:object-bottom transition-all"
                    src={p3.image}
                    alt={p3.title}
                  />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p
                      className="text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
                      style={{ color: "var(--theme-color)" }}
                    >
                      {p3.category}
                    </p>
                    <h3 className="text-zinc-900 dark:text-white text-xl font-bold mt-0.5">
                      {p3.title}
                    </h3>
                  </div>
                  <HoverIcon />
                </div>
              </div>
            )}

            {/* Render any additional dynamic projects automatically */}
            {restProjects.map((project, idx) => (
              <div
                key={project.id || idx}
                className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl p-6 flex flex-col justify-between"
              >
                <div className="h-72 w-full overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm relative">
                  <img
                    className="w-full h-full ease-in-out duration-[3s] rounded-2xl object-top object-cover hover:object-bottom transition-all"
                    src={project.image}
                    alt={project.title}
                  />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p
                      className="text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
                      style={{ color: "var(--theme-color)" }}
                    >
                      {project.category}
                    </p>
                    <h3 className="text-zinc-900 dark:text-white text-xl font-bold mt-0.5">
                      {project.title}
                    </h3>
                  </div>
                  <HoverIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjectsGrid;
