import React from "react";
import Image from "next/image";
import Link from "next/link";
import HoverIcon from "../HoverIcon/HoverIcon";
import TypewriterWrapper from "../ClientWrappers/TypewriterWrapper";
import CountUpWrapper from "../ClientWrappers/CountUpWrapper";
import { getProfileSettings, getProjectCount } from "@/lib/data";

const iconSrc = "/assets/Icons/icon_2.png";

const AccivementArea = async () => {
  let projectCount = 30;
  let experienceMonths = 6;
  let clientsWorldwide = 25;

  try {
    const count = await getProjectCount();
    if (count > 0) {
      projectCount = count;
    }

    const settings = await getProfileSettings();

    if (settings) {
      experienceMonths = settings.experienceMonths ?? 6;
      clientsWorldwide = settings.clientsWorldwide ?? 25;
    }
  } catch (err) {
    console.error("Error fetching stats in AccivementArea:", err);
  }

  return (
    <div className="my-10 mx-3 lg:mx-0">
      <div className="grid lg:grid-cols-2 gap-6 grid-cols-1">
        {/* Left Column: Achievement Stats Card */}
        <div
          data-aos="zoom-in"
          data-aos-delay="50"
          data-aos-duration="1000"
          className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 p-6 sm:p-7 shadow-md"
        >
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 sm:gap-6 h-full items-center">
            {/* Stat 1 */}
            <div className="group/stat flex justify-center items-center bg-zinc-100/80 dark:bg-gradient-to-br dark:from-[#353535] dark:to-[#181818] rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 hover:border-[var(--theme-color)] dark:hover:border-[var(--theme-color)] py-8 px-4 h-full shadow-sm hover:shadow-lg transition-all duration-500">
              <div className="text-center uppercase">
                <div className="text-4xl sm:text-5xl font-black mb-2 tracking-tight flex items-center justify-center">
                  <CountUpWrapper end={experienceMonths} duration={2.4} />
                </div>
                <p className="text-zinc-300 dark:text-zinc-300 text-[11px] font-bold leading-5 tracking-widest uppercase transition-colors">
                  Months <br /> Experience
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="group/stat flex justify-center items-center bg-zinc-100/80 dark:bg-gradient-to-br dark:from-[#353535] dark:to-[#181818] rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 hover:border-[var(--theme-color)] dark:hover:border-[var(--theme-color)] py-8 px-4 h-full shadow-sm hover:shadow-lg transition-all duration-500">
              <div className="text-center uppercase">
                <div className="text-4xl sm:text-5xl font-black mb-2 tracking-tight flex items-center justify-center">
                  <CountUpWrapper end={clientsWorldwide} duration={2.4} />
                </div>
                <p className="text-zinc-300 dark:text-zinc-300 text-[11px] font-bold leading-5 tracking-widest uppercase transition-colors">
                  CLIENTS <br /> WORLDWIDE
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="group/stat flex justify-center items-center bg-zinc-100/80 dark:bg-gradient-to-br dark:from-[#353535] dark:to-[#181818] rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 hover:border-[var(--theme-color)] dark:hover:border-[var(--theme-color)] py-8 px-4 h-full shadow-sm hover:shadow-lg transition-all duration-500">
              <div className="text-center uppercase">
                <div className="text-4xl sm:text-5xl font-black mb-2 tracking-tight flex items-center justify-center">
                  <CountUpWrapper end={projectCount} duration={2.4} />
                </div>
                <p className="text-zinc-300 dark:text-zinc-300 text-[11px] font-bold leading-5 tracking-widest uppercase transition-colors">
                  Total <br /> Projects
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Let's Talk CTA Card */}
        <Link
          href="/contact"
          aria-label="Contact Rakibul Islam - Let's Talk"
          data-aos="zoom-in"
          data-aos-delay="50"
          data-aos-duration="1000"
          className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl p-7 sm:p-10 flex flex-col justify-between overflow-hidden"
        >
          {/* Top Hanging Decorative Star Graphic */}
          <div className="absolute top-0 left-8 sm:left-10 z-10 pointer-events-none">
            <Image
              src={iconSrc}
              alt="Star Icon"
              width={32}
              height={32}
              className="w-7 sm:w-8 h-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="pt-8 sm:pt-10">
            <h2 className="text-zinc-900 dark:text-[#BCBCBC] md:text-5xl text-3xl font-bold tracking-tight mt-4">
              Let&apos;s <br /> talk{" "}
              <span
                className="inline-block transition-colors duration-300 font-extrabold"
                style={{ color: "var(--theme-color)" }}
              >
                <TypewriterWrapper strings={["with me."]} />
              </span>
            </h2>
          </div>

          <div className="absolute bottom-7 right-7">
            <HoverIcon />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AccivementArea;
