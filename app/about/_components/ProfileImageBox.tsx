import React from "react";

const profileSrc = "/assets/Images/Rakibulislam1.jpg";

export const ProfileImageBox = () => {
  return (
    <div className="col-span-1 bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 p-6 flex justify-center items-center shadow-md">
      <div className="flex justify-center items-center w-full h-full">
        <img
          className="rounded-2xl w-full max-w-[280px] aspect-square object-cover border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm"
          src={profileSrc}
          alt="Rakibul Islam Profile Image"
          loading="eager"
        />
      </div>
    </div>
  );
};

export default ProfileImageBox;
