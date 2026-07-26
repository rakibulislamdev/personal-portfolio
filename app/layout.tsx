import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/components/Theme/ThemeContext";
import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const signatureFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rakibulislam.dev"), // Change to your actual domain when deployed
  title: {
    default: "Rakibul Islam | Web Developer & Frontend Specialist",
    template: "%s | Rakibul Islam",
  },
  description:
    "Official portfolio of Rakibul Islam, a passionate Web Developer based in Bangladesh specializing in React, Next.js, TypeScript, and modern web application development.",
  keywords: [
    "Rakibul Islam",
    "Web Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Full Stack Developer Bangladesh",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Rakibul Islam", url: "https://rakibulislam.dev" }],
  creator: "Rakibul Islam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rakibulislam.dev",
    title: "Rakibul Islam | Web Developer & Frontend Specialist",
    description:
      "Personal portfolio of Rakibul Islam - Web Developer building modern, fast, and responsive web applications.",
    siteName: "Rakibul Islam Portfolio",
    images: [
      {
        url: "/assets/Images/Rakibulislam1.jpg",
        width: 1200,
        height: 630,
        alt: "Rakibul Islam - Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakibul Islam | Web Developer & Frontend Specialist",
    description:
      "Personal portfolio of Rakibul Islam - Web Developer building modern web applications.",
    images: ["/assets/Images/Rakibulislam1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://rakibulislam.dev/#person",
        name: "Rakibul Islam",
        jobTitle: "Web Developer",
        url: "https://rakibulislam.dev",
        email: "rirakib03@gmail.com",
        telephone: "+8801621-574994",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pabna",
          addressCountry: "Bangladesh",
        },
        sameAs: [
          "https://github.com/",
          "https://linkedin.com/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://rakibulislam.dev/#website",
        url: "https://rakibulislam.dev",
        name: "Rakibul Islam Portfolio",
        publisher: {
          "@id": "https://rakibulislam.dev/#person",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${signatureFont.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f0f2f5] dark:bg-[#0f0f0f] text-zinc-900 dark:text-white transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ThemeSwitcher />
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
