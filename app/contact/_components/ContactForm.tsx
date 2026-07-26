import Image from "next/image";
import TypewriterWrapper from "@/components/ClientWrappers/TypewriterWrapper";
import { ContactFormFields } from "./ContactFormFields";

const iconSrc = "/assets/Icons/icon_2.png";

export const ContactForm = () => {
  return (
    <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 p-6 sm:p-10 shadow-md relative overflow-hidden">
      {/* Top Right Hanging Decorative Star Graphic */}
      <div className="absolute top-0 right-8 pointer-events-none">
        <Image src={iconSrc} alt="Star Icon" width={32} height={32} className="w-7 sm:w-8 h-auto object-contain" />
      </div>

      <div className="text-zinc-900 dark:text-white text-2xl sm:text-4xl font-bold mb-8 flex flex-wrap items-center gap-2">
        <span>Let&apos;s work</span>
        <span style={{ color: "var(--theme-color)" }}>
          <TypewriterWrapper strings={["together."]} />
        </span>
      </div>

      {/* Interactive Client Form */}
      <ContactFormFields />
    </div>
  );
};

export default ContactForm;
