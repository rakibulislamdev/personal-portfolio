import React from "react";
import Image from "next/image";

const profileSrc = "/assets/Images/rakibulislam.jpg";

export const ProfileImageBox = () => {
  return (
    <div className="col-span-1 bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 p-5 flex justify-center items-center shadow-md">
      <div className="flex justify-center items-center w-full h-full">
        <Image
          className="rounded-2xl w-full h-auto aspect-square object-cover border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm"
          src={profileSrc}
          alt="Rakibul Islam Profile Image"
          width={800}
          height={800}
          quality={95}
          priority
        />
      </div>
    </div>
  );
};

export default ProfileImageBox;
