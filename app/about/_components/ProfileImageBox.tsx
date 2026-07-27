import React from "react";
import Image from "next/image";
import { getProfileSettings } from "@/lib/data";

export const ProfileImageBox = async () => {
  let aboutImage = "";
  let name = "Rakibul Islam";

  try {
    const settings = await getProfileSettings();
    if (settings) {
      aboutImage = settings.aboutImage || "";
      name = settings.name || "Rakibul Islam";
    }
  } catch (err) {
    console.error("Error fetching aboutImage in ProfileImageBox:", err);
  }

  return (
    <div className="col-span-1 bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 p-5 flex justify-center items-center shadow-md">
      <div className="flex justify-center items-center w-full h-full">
        {aboutImage ? (
          <Image
            className="rounded-2xl w-full h-auto aspect-square object-cover border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm select-none pointer-events-none"
            src={aboutImage}
            alt={`${name} About Profile Image`}
            width={1200}
            height={1200}
            quality={100}
            priority
            draggable={false}
          />
        ) : (
          <div className="w-full aspect-square rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 font-medium text-xs">
            No Image Uploaded
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileImageBox;
