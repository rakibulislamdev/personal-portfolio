import React from "react";
import Link from "next/link";
import { IoIosMail } from "react-icons/io";
import { BiSolidContact } from "react-icons/bi";
import { MdMyLocation } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export const ContactInfo = () => {
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
                href="mailto:rirakib03@gmail.com"
                className="text-sm font-semibold text-zinc-900 dark:text-white hover:text-[var(--theme-color)] transition-colors"
              >
                rirakib03@gmail.com
              </a>
            </div>
          </div>

          {/* Phone Item */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1f1e1e] border border-zinc-200/90 dark:border-zinc-800/80 flex items-center justify-center shadow-sm flex-shrink-0 text-zinc-800 dark:text-white">
              <BiSolidContact className="text-2xl" />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-[#999999]">
                CONTACT US
              </span>
              <a
                href="tel:+8801621574994"
                className="text-sm font-semibold text-zinc-900 dark:text-white hover:text-[var(--theme-color)] transition-colors"
              >
                +8801621-574994
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
                Pabna, Bangladesh
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
          <Link
            href="https://github.com/Rakibul-Islam-1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-white dark:bg-[#1f1e1e] border border-zinc-200/90 dark:border-zinc-800/80 flex items-center justify-center shadow-sm hover:scale-110 transition-all duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)]"
            title="GitHub"
          >
            <FaGithub className="text-2xl" />
          </Link>
          <Link
            href="https://linkedin.com/in/rakibul-islam"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-white dark:bg-[#1f1e1e] border border-zinc-200/90 dark:border-zinc-800/80 flex items-center justify-center shadow-sm hover:scale-110 transition-all duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)]"
            title="LinkedIn"
          >
            <FaLinkedinIn className="text-2xl" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-white dark:bg-[#1f1e1e] border border-zinc-200/90 dark:border-zinc-800/80 flex items-center justify-center shadow-sm hover:scale-110 transition-all duration-300 text-zinc-800 dark:text-white hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)]"
            title="Instagram"
          >
            <FaInstagram className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
