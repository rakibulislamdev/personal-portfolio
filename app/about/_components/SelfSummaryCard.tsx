import React from "react";
import Image from "next/image";
import { getProfileSettings } from "@/lib/data";

const iconSrc = "/assets/Icons/icon_2.png";

export const SelfSummaryCard = async () => {
  let name = "Rakibul Islam";
  let bio =
    "I am a Pabna, Bangladesh-based web developer with a focus on web development. I have a diverse range of experience having worked on various web applications.";

  try {
    const settings = await getProfileSettings();
    if (settings) {
      name = settings.name || "Rakibul Islam";
      bio = settings.aboutBio || bio;
    }
  } catch (err) {
    console.error("Error loading bio in SelfSummaryCard:", err);
  }

  return (
    <div className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 p-8 sm:p-10 shadow-md flex-1 flex flex-col justify-center overflow-hidden">
      {/* Top Hanging Decorative Star Graphic */}
      <div className="absolute top-0 left-8 sm:left-10 z-10 pointer-events-none">
        <Image
          src={iconSrc}
          alt="Decorative Star Icon"
          width={32}
          height={32}
          className="w-7 sm:w-8 h-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="pt-6">
        <h2 className="text-zinc-900 dark:text-white text-3xl sm:text-4xl font-bold">
          {name}
        </h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base font-normal mt-3 leading-7 whitespace-pre-line">
          {bio}
        </p>
      </div>
    </div>
  );
};

export default SelfSummaryCard;
