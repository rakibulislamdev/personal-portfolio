import React from "react";
import Navbar from "@/components/Navbar/Navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f6] dark:bg-[#0f0f0f] text-zinc-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
