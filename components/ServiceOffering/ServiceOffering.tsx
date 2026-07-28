import React from "react";
import Link from "next/link";
import { FaBlog } from "react-icons/fa";
import HoverIcon from "../HoverIcon/HoverIcon";
import ProfilesCard from "../common/ProfilesCard";
import { getProfileSettings } from "@/lib/data";
import MarqueeSkills from "./MarqueeSkills";

const ServiceOffering = async () => {
  const settings = await getProfileSettings();
  const rawEnabledSkills = (settings as unknown as { enabledSkills?: string })?.enabledSkills ?? "";

  return (
    <div className="my-10 mx-3 lg:mx-0">
      <section className="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-6 gap-y-6">
        {/* Blog Card */}
        <Link
          href="/blog"
          className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl flex flex-col justify-between"
        >
          <div className="py-6 px-8 sm:px-10 flex flex-col justify-between h-full">
            <div>
              <div className="text-zinc-700 dark:text-white flex justify-center items-center py-2 min-h-[120px] mb-4">
                <FaBlog className="text-8xl sm:text-8xl text-zinc-400 dark:text-[#9F9F9F] group-hover:scale-105 transition-transform duration-300" />
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
        <div
          className="col-span-1 lg:col-span-2 group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl flex flex-col justify-between overflow-hidden"
        >
          <div className="pt-7 pb-6 flex flex-col justify-between h-full min-h-[220px]">
            {/* Marquee rows */}
            <MarqueeSkills rawEnabledSkills={rawEnabledSkills} />

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
          </div>
        </div>

        {/* Profiles Card */}
        <div data-aos="fade-up-left" data-aos-delay="50" data-aos-duration="1000">
          <ProfilesCard />
        </div>
      </section>
    </div>
  );
};

export default ServiceOffering;
