import React from "react";
import Link from "next/link";
import HoverIcon from "../HoverIcon/HoverIcon";
import TypewriterWrapper from "../ClientWrappers/TypewriterWrapper";

const iconSrc = "/assets/Icons/icon_2.png";

export const LetsTalkCard = () => {
  return (
    <Link
      href="/contact"
      className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden h-full"
    >
      {/* Top Hanging Decorative Star Graphic */}
      <div className="absolute top-0 left-8 sm:left-10 z-10 pointer-events-none">
        <img
          src={iconSrc}
          alt="Star Icon"
          className="w-7 sm:w-8 h-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="pt-6">
        <h3 className="text-zinc-900 dark:text-[#BCBCBC] text-4xl sm:text-5xl font-bold tracking-tight mt-4">
          Let&apos;s <br /> work{" "}
          <span
            className="inline-block transition-colors duration-300 font-extrabold"
            style={{ color: "var(--theme-color)" }}
          >
            <TypewriterWrapper strings={["together."]} />
          </span>
        </h3>
      </div>

      <div className="absolute bottom-7 right-7">
        <HoverIcon />
      </div>
    </Link>
  );
};

export default LetsTalkCard;
