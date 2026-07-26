import React from "react";
import Link from "next/link";
import { IoIosMail } from "react-icons/io";
import { BiSolidContact, BiSolidPhone } from "react-icons/bi";
import { MdMyLocation } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { prisma } from "@/lib/prisma";

export const ContactInfo = async () => {
  let email = "rirakib03@gmail.com";
  let phone = "+8801621-574994";
  let location = "Pabna, Bangladesh";
  let github = "";
  let linkedin = "";
  let instagram = "";
  let facebook = "";
  let twitter = "";
  let showGithub = true;
  let showLinkedin = true;
  let showFacebook = true;
  let showTwitter = true;
  let showInstagram = true;

  try {
    const settings = await prisma.profileSettings.findUnique({
      where: { id: "default" },
    });
    if (settings) {
      email = settings.email || email;
      phone = settings.phone || phone;
      location = settings.location || location;
      github = settings.github || "";
      linkedin = settings.linkedin || "";
      instagram = settings.instagram || "";
      facebook = (settings as unknown as { facebook?: string }).facebook || "";
      twitter = (settings as unknown as { twitter?: string }).twitter || "";
      showGithub = (settings as unknown as { githubInContact?: boolean }).githubInContact ?? true;
      showLinkedin = (settings as unknown as { linkedinInContact?: boolean }).linkedinInContact ?? true;
      showFacebook = (settings as unknown as { facebookInContact?: boolean }).facebookInContact ?? true;
      showTwitter = (settings as unknown as { twitterInContact?: boolean }).twitterInContact ?? true;
      showInstagram = (settings as unknown as { instagramInContact?: boolean }).instagramInContact ?? true;
    } else {
      github = "https://github.com/Rakibul-Islam-1";
      linkedin = "https://linkedin.com/in/rakibul-islam";
    }
  } catch (err) {
    console.error("Error loading contact settings in ContactInfo:", err);
    github = "https://github.com/Rakibul-Islam-1";
    linkedin = "https://linkedin.com/in/rakibul-islam";
  }

  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  return (
    <div className="col-span-1 space-y-8">
      {/* Contact Info Group */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-6">
          CONTACT INFO
        </h3>

        <div className="space-y-6">
          {/* Email Item */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1f1e1e] border border-zinc-200/90 dark:border-zinc-800/80 flex items-center justify-center shadow-sm flex-shrink-0 text-zinc-800 dark:text-white">
              <IoIosMail className="text-2xl" />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-[#999999]">
                MAIL US
              </span>
              <a
                href={`mailto:${email}`}
                className="text-sm font-semibold text-zinc-900 dark:text-white hover:text-[var(--theme-color)] transition-colors"
              >
                {email}
              </a>
            </div>
          </div>

          {/* Phone Item */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1f1e1e] border border-zinc-200/90 dark:border-zinc-800/80 flex items-center justify-center shadow-sm flex-shrink-0 text-zinc-800 dark:text-white">
              <BiSolidPhone className="text-2xl" />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-[#999999]">
                CONTACT US
              </span>
              <a
                href={`tel:${cleanPhone}`}
                className="text-sm font-semibold text-zinc-900 dark:text-white hover:text-[var(--theme-color)] transition-colors"
              >
                {phone}
              </a>
            </div>
          </div>

          {/* Location Item */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1f1e1e] border border-zinc-200/90 dark:border-zinc-800/80 flex items-center justify-center shadow-sm flex-shrink-0 text-zinc-800 dark:text-white">
              <MdMyLocation className="text-2xl" />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-[#999999]">
                LOCATION
              </span>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                {location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Info Group */}
      <div className="pt-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-6">
          SOCIAL INFO
        </h3>

        <div className="flex items-center gap-4">
          {facebook && showFacebook && (
            <Link
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-white dark:bg-[#1f1e1e] border border-zinc-200/90 dark:border-zinc-800/80 flex items-center justify-center shadow-sm hover:scale-110 transition-all duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)]"
              title="Facebook"
            >
              <FaFacebookF className="text-2xl" />
            </Link>
          )}
          {github && showGithub && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-white dark:bg-[#1f1e1e] border border-zinc-200/90 dark:border-zinc-800/80 flex items-center justify-center shadow-sm hover:scale-110 transition-all duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)]"
              title="GitHub"
            >
              <FaGithub className="text-2xl" />
            </Link>
          )}
          {linkedin && showLinkedin && (
            <Link
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-white dark:bg-[#1f1e1e] border border-zinc-200/90 dark:border-zinc-800/80 flex items-center justify-center shadow-sm hover:scale-110 transition-all duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)]"
              title="LinkedIn"
            >
              <FaLinkedinIn className="text-2xl" />
            </Link>
          )}
          {twitter && showTwitter && (
            <Link
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-white dark:bg-[#1f1e1e] border border-zinc-200/90 dark:border-zinc-800/80 flex items-center justify-center shadow-sm hover:scale-110 transition-all duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)]"
              title="Twitter"
            >
              <FaTwitter className="text-2xl" />
            </Link>
          )}
          {instagram && showInstagram && (
            <Link
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-white dark:bg-[#1f1e1e] border border-zinc-200/90 dark:border-zinc-800/80 flex items-center justify-center shadow-sm hover:scale-110 transition-all duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)]"
              title="Instagram"
            >
              <FaInstagram className="text-2xl" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
