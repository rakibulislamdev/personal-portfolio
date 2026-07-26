import React from "react";
import HeroArea from "@/components/HeroArea/HeroArea";
import ServiceOffering from "@/components/ServiceOffering/ServiceOffering";
import AccivementArea from "@/components/AccivementArea/AccivementArea";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f6] dark:bg-[#0f0f0f] text-zinc-900 dark:text-white py-10 px-4 sm:px-8 max-w-7xl mx-auto transition-colors duration-300">
      <HeroArea />
      <ServiceOffering />
      <AccivementArea />
    </div>
  );
}
