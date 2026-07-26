import React from "react";
import Link from "next/link";
import HoverIcon from "../HoverIcon/HoverIcon";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export const ProfilesCard = () => {
  return (
    <Link
      href="/contact"
      className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl flex flex-col justify-between h-full"
    >
      <div className="py-6 px-8 sm:px-10 flex flex-col justify-between h-full">
        <div>
          {/* Inner Rounded Graphic Box with 2 Circular Profile Icons (GitHub & LinkedIn) */}
          <div className="bg-zinc-100 dark:bg-[#1a1a1a]/80 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-4 flex items-center justify-center gap-4 py-2 min-h-[110px] mb-4 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors">
            <a
              href="https://github.com/Rakibul-Islam-1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-zinc-200 dark:bg-[#252525] border border-zinc-300/60 dark:border-zinc-700/60 flex items-center justify-center shadow-inner hover:scale-110 transition-transform duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)]"
              title="GitHub Profile"
            >
              <FaGithub className="w-7 h-7" />
            </a>
            <a
              href="https://linkedin.com/in/rakibul-islam"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-zinc-200 dark:bg-[#252525] border border-zinc-300/60 dark:border-zinc-700/60 flex items-center justify-center shadow-inner hover:scale-110 transition-transform duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)]"
              title="LinkedIn Profile"
            >
              <FaLinkedinIn className="w-7 h-7" />
            </a>
          </div>

          <p
            className="font-bold text-xs uppercase tracking-widest mb-1.5 transition-colors duration-300"
            style={{ color: "var(--theme-color)" }}
          >
            STAY WITH ME
          </p>
          <h3 className="font-bold text-zinc-900 dark:text-white text-xl">
            Profiles
          </h3>
        </div>
        <div className="absolute bottom-7 right-7">
          <HoverIcon />
        </div>
      </div>
    </Link>
  );
};

export default ProfilesCard;
