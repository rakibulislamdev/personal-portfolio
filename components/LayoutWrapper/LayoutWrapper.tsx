"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";
import { Toaster } from "@/components/ui/sonner";

import VisitorTracker from "@/components/Analytics/VisitorTracker";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide Navbar, Footer, and ThemeSwitcher on Dashboard and Login routes
  const isDashboardOrLogin = pathname.startsWith("/dashboard") || pathname === "/login";

  if (isDashboardOrLogin) {
    return (
      <>
        <main className="flex-1">{children}</main>
        <Toaster position="bottom-right" richColors closeButton />
      </>
    );
  }

  return (
    <>
      <VisitorTracker />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ThemeSwitcher />
      <Toaster position="bottom-right" richColors closeButton />
    </>
  );
}
