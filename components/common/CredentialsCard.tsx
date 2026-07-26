import React from "react";
import Link from "next/link";
import HoverIcon from "../HoverIcon/HoverIcon";

export const CredentialsCard = () => {
  return (
    <Link
      href="/about"
      className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl flex flex-col justify-between h-full"
    >
      <div className="py-6 px-8 sm:px-10 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-center items-center py-2 min-h-[100px] mb-4">
            <span className="font-[family-name:var(--font-signature)] text-5xl sm:text-6xl text-zinc-900 dark:text-white select-none group-hover:scale-105 transition-transform duration-300">
              Rakib
            </span>
          </div>
          <p
            className="font-bold text-xs uppercase tracking-widest mb-1.5 transition-colors duration-300"
            style={{ color: "var(--theme-color)" }}
          >
            MORE ABOUT ME
          </p>
          <h3 className="font-bold text-zinc-900 dark:text-white text-xl">
            Credentials
          </h3>
        </div>
        <div className="absolute bottom-7 right-7">
          <HoverIcon />
        </div>
      </div>
    </Link>
  );
};

export default CredentialsCard;
