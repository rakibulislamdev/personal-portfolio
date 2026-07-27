import Image from "next/image";
import Link from "next/link";
import HoverIcon from "../HoverIcon/HoverIcon";
import MarqueeStarIcon from "../Icons/MarqueeStarIcon";
import TypewriterWrapper from "../ClientWrappers/TypewriterWrapper";
import MarqueeWrapper from "../ClientWrappers/MarqueeWrapper";
import { getProfileSettings } from "@/lib/data";

const defaultProfileSrc = "";
const myWorksSrc = "/assets/Images/my-works.png";

const HeroArea = async () => {
  let settings = null;
  try {
    settings = await getProfileSettings();
  } catch (err) {
    console.error("Error loading settings in HeroArea:", err);
  }

  const name = settings?.name || "Rakibul Islam";
  const title = settings?.title || "A WEB DEVELOPER";
  const email = settings?.email || "rirakib03@gmail.com";
  const location = settings?.location || "Dhaka, Bangladesh";
  const profileImage = settings?.profileImage || "";
  const typewriterText = settings?.typewriterText || `Web Developer based in ${location}`;

  return (
    <div className="mx-3 lg:mx-0">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 items-stretch">
        {/* Main Profile Card - Server Component */}
        <div
          className="group bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl h-full flex flex-col justify-center"
        >
          <div className="grid lg:items-center grid-cols-1 lg:grid-cols-2 gap-8 lg:p-12 p-6 sm:p-10 relative h-full">
            <div className="flex items-center justify-center">
              {profileImage ? (
                <Image
                  className="rounded-tl-3xl rounded-br-3xl rounded-tr-none rounded-bl-none w-48 sm:w-56 h-auto aspect-square object-cover bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-transparent group-hover:border-[var(--theme-color)] transition-colors duration-500 shadow-sm select-none pointer-events-none"
                  src={profileImage}
                  alt={name}
                  width={1000}
                  height={1000}
                  quality={100}
                  unoptimized
                  priority
                  draggable={false}
                />
              ) : (
                <div className="w-56 h-56 rounded-tl-3xl rounded-br-3xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 font-medium text-xs">
                  No Image Uploaded
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <h2
                className="text-xs font-bold uppercase tracking-widest mb-1.5 transition-colors duration-300"
                style={{ color: "var(--theme-color)" }}
              >
                {title.toUpperCase()}
              </h2>
              <h1 className="text-zinc-900 dark:text-white font-bold md:text-4xl text-2xl tracking-tight">
                {name}.
              </h1>
              <div className="text-zinc-600 dark:text-[#9F9F9F] text-sm mt-2 font-medium">
                <TypewriterWrapper
                  strings={[`I am a ${typewriterText}`]}
                />
              </div>
              <div className="absolute bottom-7 right-7">
                <HoverIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Container - Server Component */}
        <div className="flex flex-col justify-between gap-6 h-full">
          {/* Marquee Banner Card */}
          <div
            className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] px-10 py-5 rounded-full border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md"
          >
            <MarqueeWrapper>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-900 dark:text-white ml-4 font-bold">Email :</span>
                  <span className="text-zinc-700 dark:text-[#9F9F9F] font-medium">{email}</span>
                </div>
                <div style={{ color: "var(--theme-color)" }}>
                  <MarqueeStarIcon className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-900 dark:text-white font-bold">Location :</span>
                  <span className="text-zinc-700 dark:text-[#9F9F9F] font-medium">{location}</span>
                </div>
                <div style={{ color: "var(--theme-color)" }}>
                  <MarqueeStarIcon className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-900 dark:text-white font-bold">Developer :</span>
                  <span className="text-zinc-700 dark:text-[#9F9F9F] font-medium">
                    {name}
                  </span>
                </div>
                <div style={{ color: "var(--theme-color)" }}>
                  <MarqueeStarIcon className="w-3.5 h-3.5" />
                </div>
              </div>
            </MarqueeWrapper>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 flex-1">
            {/* Credentials Card */}
            <Link
              href="/about"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
              className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="py-6 px-8 sm:px-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-center items-center py-2 min-h-[100px] mb-4 -translate-x-2 translate-y-3">
                    <span className="font-[family-name:var(--font-signature)] text-5xl sm:text-6xl text-zinc-900 dark:text-white select-none group-hover:scale-105 transition-transform duration-300">
                      {"Rakib"}
                    </span>
                  </div>
                  <p
                    className="font-bold text-xs uppercase tracking-widest mb-1.5 transition-colors duration-300"
                    style={{ color: "var(--theme-color)" }}
                  >
                    MORE ABOUT ME
                  </p>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-xl">Credentials</h3>
                </div>
                <div className="absolute bottom-7 right-7">
                  <HoverIcon />
                </div>
              </div>
            </Link>

            {/* Projects Showcase Card */}
            <Link
              href="/works"
              data-aos="fade-down"
              data-aos-delay="50"
              data-aos-duration="1000"
              className="group relative bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 hover:border-[var(--theme-color)] transition-all duration-500 shadow-md hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="py-6 px-8 sm:px-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-center items-center py-2 min-h-[100px] mb-4 overflow-hidden">
                    <Image
                      src={myWorksSrc}
                      alt="Showcase Projects"
                      width={160}
                      height={80}
                      className="max-h-20 w-auto object-contain opacity-95 group-hover:opacity-100 transition-all duration-300 scale-110"
                    />
                  </div>
                  <p
                    className="font-bold text-xs uppercase tracking-widest mb-1.5 transition-colors duration-300"
                    style={{ color: "var(--theme-color)" }}
                  >
                    SHOWCASE
                  </p>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-xl">Projects</h3>
                </div>
                <div className="absolute bottom-7 right-7">
                  <HoverIcon />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroArea;
