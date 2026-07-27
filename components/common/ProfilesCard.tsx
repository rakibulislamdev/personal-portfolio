import React from "react";
import Link from "next/link";
import HoverIcon from "../HoverIcon/HoverIcon";
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { getProfileSettings } from "@/lib/data";

export const ProfilesCard = async () => {
  let github = "";
  let linkedin = "";
  let instagram = "";
  let facebook = "";
  let twitter = "";
  let showGithub = true;
  let showLinkedin = true;
  let showFacebook = false;
  let showTwitter = false;
  let showInstagram = false;

  try {
    const settings = await getProfileSettings();
    if (settings) {
      github = settings.github || "";
      linkedin = settings.linkedin || "";
      instagram = settings.instagram || "";
      facebook = (settings as unknown as { facebook?: string }).facebook || "";
      twitter = (settings as unknown as { twitter?: string }).twitter || "";
      showGithub = (settings as unknown as { githubInProfilesCard?: boolean }).githubInProfilesCard ?? true;
      showLinkedin = (settings as unknown as { linkedinInProfilesCard?: boolean }).linkedinInProfilesCard ?? true;
      showFacebook = (settings as unknown as { facebookInProfilesCard?: boolean }).facebookInProfilesCard ?? false;
      showTwitter = (settings as unknown as { twitterInProfilesCard?: boolean }).twitterInProfilesCard ?? false;
      showInstagram = (settings as unknown as { instagramInProfilesCard?: boolean }).instagramInProfilesCard ?? false;
    } else {
      github = "https://github.com/Rakibul-Islam-1";
      linkedin = "https://linkedin.com/in/rakibul-islam";
    }
  } catch (err) {
    console.error("Error loading profile settings in ProfilesCard:", err);
    github = "https://github.com/Rakibul-Islam-1";
    linkedin = "https://linkedin.com/in/rakibul-islam";
  }

  return (
    <div
      className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl flex flex-col justify-between h-full"
    >
      <div className="py-6 px-8 sm:px-10 flex flex-col justify-between h-full">
        <div>
          {/* Inner Rounded Graphic Box with Circular Profile Icons */}
          <div className="bg-zinc-100 dark:bg-[#1a1a1a]/80 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-4 flex items-center justify-center gap-3 py-2 min-h-[110px] mb-4 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors flex-wrap">
            {facebook && showFacebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-200 dark:bg-[#252525] border border-zinc-300/60 dark:border-zinc-700/60 flex items-center justify-center shadow-inner hover:scale-110 transition-transform duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)] z-10"
                title="Facebook Profile"
              >
                <FaFacebookF className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            )}
            {github && showGithub && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-200 dark:bg-[#252525] border border-zinc-300/60 dark:border-zinc-700/60 flex items-center justify-center shadow-inner hover:scale-110 transition-transform duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)] z-10"
                title="GitHub Profile"
              >
                <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            )}
            {linkedin && showLinkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-200 dark:bg-[#252525] border border-zinc-300/60 dark:border-zinc-700/60 flex items-center justify-center shadow-inner hover:scale-110 transition-transform duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)] z-10"
                title="LinkedIn Profile"
              >
                <FaLinkedinIn className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            )}
            {twitter && showTwitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-200 dark:bg-[#252525] border border-zinc-300/60 dark:border-zinc-700/60 flex items-center justify-center shadow-inner hover:scale-110 transition-transform duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)] z-10"
                title="Twitter Profile"
              >
                <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            )}
            {instagram && showInstagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-200 dark:bg-[#252525] border border-zinc-300/60 dark:border-zinc-700/60 flex items-center justify-center shadow-inner hover:scale-110 transition-transform duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)] z-10"
                title="Instagram Profile"
              >
                <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            )}
          </div>

          <Link href="/contact" className="block group/link">
            <p
              className="font-bold text-xs uppercase tracking-widest mb-1.5 transition-colors duration-300"
              style={{ color: "var(--theme-color)" }}
            >
              STAY WITH ME
            </p>
            <h3 className="font-bold text-zinc-900 dark:text-white text-xl">
              Profiles
            </h3>
          </Link>
        </div>
        <Link href="/contact" className="absolute bottom-7 right-7">
          <HoverIcon />
        </Link>
      </div>
    </div>
  );
};

export default ProfilesCard;
