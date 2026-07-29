import React from "react";
import ProjectCard from "./ProjectCard";
import WorksHeader from "./WorksHeader";

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
  // If we have less than 4 projects, fallback to a clean standard grid to keep it visually balanced
  if (projectsList.length < 4) {
    return (
      <div className="space-y-8">
        <WorksHeader />
        <div className={`grid grid-cols-1 ${
          projectsList.length === 1 
            ? "max-w-md mx-auto" 
            : projectsList.length === 2 
            ? "md:grid-cols-2 max-w-4xl mx-auto" 
            : "md:grid-cols-3"
        } gap-6`}>
          {projectsList.map((project, idx) => (
            <ProjectCard key={project.id || idx} project={project} imageHeightClass="h-72" />
          ))}
        </div>
      </div>
    );
  }

  const p1 = projectsList[0];
  const p2 = projectsList[1];
  const p3 = projectsList[2];
  const p4 = projectsList[3];
  const restProjects = projectsList.slice(4);

  return (
    <div className="space-y-6">
      {/* Mobile Only Header: Renders at the very top of the page on small screens */}
      <div className="block lg:hidden w-full">
        <WorksHeader />
      </div>

      {/* 3-Column Asymmetric Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Slot 1 & Slot 4 (Tall Card) */}
        <div className="flex flex-col gap-6">
          {p1 && <ProjectCard project={p1} imageHeightClass="h-72" />}
          {p4 && <ProjectCard project={p4} imageHeightClass="h-[387px]" />}
        </div>

        {/* Right 2 Columns Container */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Desktop Only Header: Sits inside the grid to preserve asymmetric card heights */}
          <div className="hidden lg:block w-full">
            <WorksHeader />
          </div>

          {/* Dynamic Grid for remaining cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {p2 && <ProjectCard project={p2} imageHeightClass="h-72" />}
            {p3 && <ProjectCard project={p3} imageHeightClass="h-72" />}
            {restProjects.map((project, idx) => (
              <ProjectCard key={project.id || idx} project={project} imageHeightClass="h-72" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjectsGrid;
