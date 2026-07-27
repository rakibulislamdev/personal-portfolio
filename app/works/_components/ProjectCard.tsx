import React from "react";
import Image from "next/image";
import Link from "next/link";
import HoverIcon from "@/components/HoverIcon/HoverIcon";
import { ProjectItem } from "./AllProjectsGrid";

interface ProjectCardProps {
  project: ProjectItem;
  imageHeightClass?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  imageHeightClass = "h-72",
}) => {
  const projectSlug = project.id || project.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      href={`/works/${projectSlug}`}
      className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl p-6 flex flex-col justify-between block"
    >
      <div className={`${imageHeightClass} w-full overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm relative`}>
        <Image
          className="w-full h-full ease-in-out duration-[3s] rounded-2xl object-top object-cover hover:object-bottom transition-all"
          src={project.image}
          alt={`${project.title} - ${project.category} Portfolio Project`}
          width={600}
          height={400}
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
    </Link>
  );
};

export default ProjectCard;
