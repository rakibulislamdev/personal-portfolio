import React from "react";
import Image from "next/image";
import HoverIcon from "../HoverIcon/HoverIcon";
import TypewriterWrapper from "../ClientWrappers/TypewriterWrapper";

const profileSrc = "/assets/Images/rakibulislam.jpg";

export const ProfileHeroCard = () => {
  return (
    <div className="group bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl h-full flex flex-col justify-center">
      <div className="grid lg:items-center grid-cols-1 lg:grid-cols-2 gap-8 lg:p-12 p-10 relative h-full">
        <div className="flex items-center justify-center">
          <Image
            className="rounded-tl-3xl rounded-br-3xl rounded-tr-none rounded-bl-none w-56 object-cover aspect-square bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-transparent group-hover:border-[var(--theme-color)] transition-colors duration-500 shadow-sm"
            src={profileSrc}
            alt="Rakibul Islam"
            width={600}
            height={600}
            quality={95}
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-1.5 transition-colors duration-300"
            style={{ color: "var(--theme-color)" }}
          >
            A WEB DEVELOPER
          </h2>
          <h1 className="text-zinc-900 dark:text-white font-bold md:text-4xl text-2xl tracking-tight">
            Rakibul Islam.
          </h1>
          <div className="text-zinc-600 dark:text-[#9F9F9F] text-sm mt-2 font-medium">
            <TypewriterWrapper
              strings={["I am a Web Developer based in Bangladesh"]}
            />
          </div>
          <div className="absolute bottom-7 right-7">
            <HoverIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeroCard;
