import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBlog, FaGithub, FaLinkedinIn } from "react-icons/fa";
import HoverIcon from "../HoverIcon/HoverIcon";
import ProfilesCard from "../common/ProfilesCard";

// Import asset images or use public paths safely
const html = "/assets/Icons/html.png";
const css = "/assets/Icons/css.png";
const js = "/assets/Icons/js.png";
const tailwind = "/assets/Icons/tailwind.png";
const react = "/assets/Icons/react.png";
const node = "/assets/Icons/node.png";
const mongodb = "/assets/Icons/mongodb.png";

const ServiceOffering = () => {
  return (
    <div className="my-10 mx-3 lg:mx-0">
      <section className="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-6 gap-y-6">
        {/* Blog Card */}
        <Link
          href="/blog"
          data-aos="fade-down-right"
          data-aos-delay="50"
          data-aos-duration="1000"
          className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl flex flex-col justify-between"
        >
          <div className="py-6 px-8 sm:px-10 flex flex-col justify-between h-full">
            <div>
              <div className="text-zinc-700 dark:text-white flex justify-center items-center py-2 min-h-[110px] mb-4">
                <FaBlog className="text-7xl sm:text-8xl text-zinc-400 dark:text-[#9F9F9F] group-hover:scale-105 transition-transform duration-300" />
              </div>
              <p
                className="font-bold text-xs uppercase tracking-widest mb-1.5 transition-colors duration-300"
                style={{ color: "var(--theme-color)" }}
              >
                BLOG
              </p>
              <h3 className="font-bold text-zinc-900 dark:text-white text-xl">
                My Blogs
              </h3>
            </div>
            <div className="absolute bottom-7 right-7">
              <HoverIcon />
            </div>
          </div>
        </Link>

        {/* Specialization / Tech Stack Card */}
        <Link
          href="/services"
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="1000"
          className="col-span-1 lg:col-span-2 group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl flex flex-col justify-between"
        >
          <div className="py-6 px-8 sm:px-10 flex flex-col justify-between h-full">
            <div>
              <div className="text-zinc-900 dark:text-white flex justify-center gap-5 sm:gap-7 flex-wrap items-center py-2 min-h-[110px] mb-4">
                <Image width={48} height={48} className="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300" src={html} alt="HTML5" />
                <Image width={48} height={48} className="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300" src={css} alt="CSS3" />
                <Image width={48} height={48} className="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300" src={tailwind} alt="Tailwind CSS" />
                <Image width={48} height={48} className="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300" src={js} alt="JavaScript" />
                <Image width={48} height={48} className="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300" src={react} alt="React" />
                <Image width={48} height={48} className="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300" src={node} alt="Node.js" />
                <Image width={48} height={48} className="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300" src={mongodb} alt="MongoDB" />
              </div>
              <p
                className="font-bold text-xs uppercase tracking-widest mb-1.5 transition-colors duration-300"
                style={{ color: "var(--theme-color)" }}
              >
                SPECIALIZATION
              </p>
              <h3 className="font-bold text-zinc-900 dark:text-white text-xl">
                Services Offering
              </h3>
            </div>
            <div className="absolute bottom-7 right-7">
              <HoverIcon />
            </div>
          </div>
        </Link>

        {/* Profiles / Stay With Me Card */}
        <div data-aos="fade-up-left" data-aos-delay="50" data-aos-duration="1000">
          <ProfilesCard />
        </div>
      </section>
    </div>
  );
};

export default ServiceOffering;
