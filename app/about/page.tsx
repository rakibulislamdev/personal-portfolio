import type { Metadata } from "next";
import SparkleStarIcon from "@/components/Icons/SparkleStarIcon";
import ProfilesCard from "@/components/common/ProfilesCard";
import LetsTalkCard from "@/components/common/LetsTalkCard";
import CredentialsCard from "@/components/common/CredentialsCard";
import EducationCard from "@/app/about/_components/EducationCard";
import ExperienceCard from "@/app/about/_components/ExperienceCard";
import ProfileImageBox from "@/app/about/_components/ProfileImageBox";
import SelfSummaryCard from "@/app/about/_components/SelfSummaryCard";

export const metadata: Metadata = {
  title: "About Rakibul Islam | Professional Web Developer & Credentials",
  description:
    "Learn more about Rakibul Islam - Dhaka, Bangladesh based Web Developer. Explore my professional credentials, web development experience, CST diploma education, and technical skills.",
  keywords: [
    "About Rakibul Islam",
    "Rakibul Islam Credentials",
    "Web Developer Dhaka Bangladesh",
    "Frontend Engineer Portfolio",
    "Fiverr Junior Web Developer",
    "Pabna Polytechnic Institute CST",
  ],
  openGraph: {
    title: "About Rakibul Islam | Professional Web Developer",
    description:
      "Explore credentials, experience, and educational background of Rakibul Islam, a web developer based in Bangladesh.",
    url: "https://rakibulislamdev.me/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "About Rakibul Islam",
    mainEntity: {
      "@type": "Person",
      name: "Rakibul Islam",
      jobTitle: "Web Developer",
      url: "https://rakibulislamdev.me",
      description:
        "Dhaka, Bangladesh-based web developer focused on React, Next.js, and modern web application development.",
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Pabna Polytechnic Institute",
      },
      sameAs: [
        "https://github.com/rakibulislamdev",
        "https://www.linkedin.com/in/rakibulislamdev/",
        "https://www.facebook.com/iamrakib2/",
      ],
    },
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Top Profile Summary Grid */}
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 items-stretch">
        {/* Profile Image Box Component */}
        <ProfileImageBox />

        {/* Self-Summary Header & Card Container */}
        <div className="col-span-1 lg:col-span-2 flex flex-col justify-between gap-6">
          <div className="flex items-center justify-center gap-3 sm:gap-4 py-2">
            <SparkleStarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#BCBCBC]" />
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-wider text-center">
              SELF-SUMMARY
            </h1>
            <SparkleStarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#BCBCBC]" />
          </div>

          {/* Self-Summary Card Component */}
          <SelfSummaryCard />
        </div>
      </div>

      {/* Experience & Education 2-Column Grid */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        {/* Experience Card Component */}
        <ExperienceCard />

        {/* Education Card Component */}
        <EducationCard />
      </div>

      {/* Bottom 3-Card Single Row Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-1 lg:col-span-1">
          <ProfilesCard />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <LetsTalkCard />
        </div>
        <div className="col-span-1 lg:col-span-1">
          <CredentialsCard />
        </div>
      </div>
    </section>
  );
}
