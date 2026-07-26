
import React from "react";
import Link from "next/link";
import { FaBlog, FaCss3Alt } from "react-icons/fa";
import {
  SiHtml5, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiTailwindcss, SiNodedotjs, SiMongodb, SiPrisma, SiGit, SiGithub,
  SiFigma, SiRedux, SiPostgresql, SiVercel, SiFirebase, SiExpress,
  SiFramer, SiDocker,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { MdOutlineDevices } from "react-icons/md";
import HoverIcon from "../HoverIcon/HoverIcon";
import ProfilesCard from "../common/ProfilesCard";

type Skill = {
  label: string;
  Icon: React.ElementType;
  color: string;
};

const row1Skills: Skill[] = [
  { label: "HTML5",      Icon: SiHtml5,        color: "#E34F26" },
  { label: "CSS3",       Icon: FaCss3Alt,      color: "#1572B6" },
  { label: "JavaScript", Icon: SiJavascript,   color: "#F7DF1E" },
  { label: "TypeScript", Icon: SiTypescript,   color: "#3178C6" },
  { label: "React",      Icon: SiReact,        color: "#61DAFB" },
  { label: "Next.js",    Icon: SiNextdotjs,    color: "#ffffff" },
  { label: "Tailwind",   Icon: SiTailwindcss,  color: "#06B6D4" },
  { label: "Node.js",    Icon: SiNodedotjs,    color: "#339933" },
  { label: "MongoDB",    Icon: SiMongodb,      color: "#47A248" },
  { label: "Prisma",     Icon: SiPrisma,       color: "#2D3748" },
  { label: "REST API",   Icon: TbApi,          color: "#9F9F9F" },
  { label: "Git",        Icon: SiGit,          color: "#F05032" },
];

const row2Skills: Skill[] = [
  { label: "Figma",       Icon: SiFigma,        color: "#F24E1E" },
  { label: "Redux",       Icon: SiRedux,        color: "#764ABC" },
  { label: "PostgreSQL",  Icon: SiPostgresql,   color: "#4169E1" },
  { label: "Vercel",      Icon: SiVercel,       color: "#ffffff" },
  { label: "Firebase",    Icon: SiFirebase,     color: "#FFCA28" },
  { label: "Express.js",  Icon: SiExpress,      color: "#ffffff" },
  { label: "Vite / Docker", Icon: SiDocker,  color: "#2496ED" },
  { label: "Framer",        Icon: SiFramer,  color: "#0055FF" },
  { label: "Responsive",  Icon: MdOutlineDevices, color: "#9F9F9F" },
  { label: "GitHub",      Icon: SiGithub,       color: "#ffffff" },
  { label: "UI/UX",       Icon: SiFigma,        color: "#A259FF" },
  { label: "PostgreSQL",  Icon: SiPostgresql,   color: "#4169E1" },
];

const SkillBadge = ({ skill }: { skill: Skill }) => {
  const { label, Icon, color } = skill;
  return (
    <span className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap select-none bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700/50 text-zinc-700 dark:text-zinc-300">
      <Icon style={{ color, flexShrink: 0 }} className="text-[10px] sm:text-sm" />
      {label}
    </span>
  );
};

const MarqueeRow = ({
  skills,
  direction,
}: {
  skills: Skill[];
  direction: "left" | "right";
}) => {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <div
        className={`flex gap-2.5 w-max ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {/* Original — visible to Google */}
        {skills.map((skill, i) => (
          <SkillBadge key={`a-${i}`} skill={skill} />
        ))}
        {/* Duplicate for seamless loop — hidden from screen readers & Google */}
        <span aria-hidden="true" className="contents">
          {skills.map((skill, i) => (
            <SkillBadge key={`b-${i}`} skill={skill} />
          ))}
        </span>
      </div>
    </div>
  );
};

const ServiceOffering = () => {
  return (
    <div className="my-10 mx-3 lg:mx-0">
      <section className="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-6 gap-y-6">
        {/* Blog Card */}
        <Link
          href="/blog"
          data-aos="fade-down-right"
          data-aos-delay="50"
          data-aos-duration="1000"
          className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl flex flex-col justify-between"
        >
          <div className="py-6 px-8 sm:px-10 flex flex-col justify-between h-full">
            <div>
              <div className="text-zinc-700 dark:text-white flex justify-center items-center py-2 min-h-[110px] mb-4">
                <FaBlog className="text-7xl sm:text-8xl text-zinc-400 dark:text-[#9F9F9F] group-hover:scale-105 transition-transform duration-300" />
              </div>
              <p
                className="font-bold text-xs uppercase tracking-widest mb-1.5"
                style={{ color: "var(--theme-color)" }}
              >
                BLOG
              </p>
              <h3 className="font-bold text-zinc-900 dark:text-white text-xl">
                My Blogs
              </h3>
            </div>
            <div className="absolute bottom-7 right-7">
              <HoverIcon />
            </div>
          </div>
        </Link>

        {/* Specialization / Tech Stack Card */}
        <Link
          href="/services"
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="1000"
          className="col-span-1 lg:col-span-2 group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl flex flex-col justify-between overflow-hidden"
        >
          <div className="pt-7 pb-6 flex flex-col justify-between h-full">
            {/* Marquee rows */}
              <div className="flex flex-col gap-2.5 mb-5 mt-6">
                <div className="px-14">
                  <MarqueeRow skills={row1Skills} direction="left" />
                </div>
                <div className="px-24">
                  <MarqueeRow skills={row2Skills} direction="right" />
                </div>
              </div>

            <div className="px-8 sm:px-10">
              <p
                className="font-bold text-xs uppercase tracking-widest mb-1.5"
                style={{ color: "var(--theme-color)" }}
              >
                SPECIALIZATION
              </p>
              <h3 className="font-bold text-zinc-900 dark:text-white text-xl">
                Services Offering
              </h3>
            </div>

            <div className="absolute bottom-7 right-7">
              <HoverIcon />
            </div>
          </div>
        </Link>

        {/* Profiles Card */}
        <div data-aos="fade-up-left" data-aos-delay="50" data-aos-duration="1000">
          <ProfilesCard />
        </div>
      </section>
    </div>
  );
};

export default ServiceOffering;
