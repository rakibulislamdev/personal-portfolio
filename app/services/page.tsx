import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Rakibul Islam - Web Development Services",
  description:
    "Explore the web development services offered by Rakibul Islam including React, Next.js, full-stack development, UI/UX implementation, and custom web application development.",
  keywords: [
    "Web Development Services",
    "Rakibul Islam Services",
    "Hire React Developer Bangladesh",
    "Next.js Development Service",
    "Frontend Development Service",
    "Custom Web Application Bangladesh",
  ],
  alternates: {
    canonical: "https://rakibulislamdev.me/services",
  },
  openGraph: {
    title: "Services | Rakibul Islam - Web Development Services",
    description:
      "Professional web development services by Rakibul Islam — React, Next.js, full-stack development, and modern UI implementation.",
    url: "https://rakibulislamdev.me/services",
    siteName: "Rakibul Islam Portfolio",
    images: [
      {
        url: "/assets/Images/Rakibulislam1.jpg",
        width: 1200,
        height: 630,
        alt: "Rakibul Islam - Web Development Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Rakibul Islam",
    description:
      "Professional web development services by Rakibul Islam.",
    images: ["/assets/Images/Rakibulislam1.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <div className="py-10 px-4 sm:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Services Offering</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Specialization & Tech Stack Offerings.
      </p>
    </div>
  );
}
