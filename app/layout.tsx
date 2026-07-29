import type { Metadata, Viewport } from "next";
import { Mr_De_Haviland, Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme/ThemeContext";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import ChatbotWidget from "@/components/Chatbot/ChatbotWidget";
import { getProfileSettings } from "@/lib/data";

const signatureFont = Mr_De_Haviland({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
});

const sansFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rakibulislamdev.me"),
  title: {
    default: "Rakibul Islam | Full Stack & MERN Developer in Dhaka, Bangladesh",
    template: "%s | Rakibul Islam",
  },
  description:
    "Skilled Full Stack Web Developer specializing in MERN Stack, React.js, Next.js, TypeScript & Tailwind CSS. Based in Dhaka, Bangladesh. View my projects & hire me.",
  keywords: [
    // Primary Keywords
    "Web Developer Dhaka",
    "React.js Developer Bangladesh",
    "MERN Stack Developer Dhaka",
    "Next.js Developer Bangladesh",
    "Freelance Web Developer Dhaka",
    // Secondary & Long-tail Keywords
    "React.js & Next.js Web Developer",
    "TypeScript Web Developer Dhaka",
    "Tailwind CSS Developer Bangladesh",
    "Junior Web Developer Portfolio",
    "Hire React Developer Bangladesh",
    "Full Stack Developer Pabna",
    "Full Stack Developer Dhaka",
    // Additional Brand & Core Keywords
    "Rakibul Islam",
    "Rakibul Islam Web Developer",
    "Rakibul Islam Portfolio",
    "Rakibul Islam Bangladesh",
    "Rakibul Islam Dhaka",
    "Rakibul Islam Developer",
    "Rakibul Islam Full Stack",
    "rakibulislamdev",
    "rakibulislamdev.me",
    "Full Stack Developer",
    "Frontend Developer",
    "MERN Stack Developer",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Rakibul Islam", url: "https://rakibulislamdev.me" }],
  creator: "Rakibul Islam",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rakibulislamdev.me",
    title: "Rakibul Islam | Full Stack & MERN Developer in Dhaka, Bangladesh",
    description:
      "Skilled Full Stack Web Developer specializing in MERN Stack, React.js, Next.js, TypeScript & Tailwind CSS. Based in Dhaka, Bangladesh. View my projects & hire me.",
    siteName: "Rakibul Islam Portfolio",
    images: [
      {
        url: "https://rakibulislamdev.me/assets/Images/rakibulislam.jpg",
        width: 1200,
        height: 630,
        alt: "Rakibul Islam - Full Stack & MERN Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakibul Islam | Full Stack & MERN Developer in Dhaka, Bangladesh",
    description:
      "Skilled Full Stack Web Developer specializing in MERN Stack, React.js, Next.js, TypeScript & Tailwind CSS. Based in Dhaka, Bangladesh. View my projects & hire me.",
    images: ["https://rakibulislamdev.me/assets/Images/rakibulislam.jpg"],
  },
  alternates: {
    canonical: "https://rakibulislamdev.me",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let googleAnalyticsId = "";
  let metaPixelId = "";

  try {
    const settings = await getProfileSettings();
    if (settings) {
      googleAnalyticsId = (settings as unknown as { googleAnalyticsId?: string }).googleAnalyticsId || "";
      metaPixelId = (settings as unknown as { metaPixelId?: string }).metaPixelId || "";
    }
  } catch (err) {
    console.error("Error loading analytics settings in RootLayout:", err);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://rakibulislamdev.me/#person",
        name: "Rakibul Islam",
        jobTitle: "Full Stack & MERN Web Developer",
        url: "https://rakibulislamdev.me",
        image: "https://rakibulislamdev.me/assets/Images/rakibulislam.jpg",
        email: "rirakib03@gmail.com",
        telephone: "+8801621-574994",
        knowsLanguage: ["English", "Bengali", "Hindi"],
        worksFor: {
          "@type": "Organization",
          name: "Freelance",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dhaka",
          addressRegion: "Dhaka Division",
          addressCountry: "Bangladesh",
        },
        sameAs: [
          "https://github.com/rakibulislamdev",
          "https://www.linkedin.com/in/rakibulislamdev/",
          "https://www.facebook.com/iamrakib2/",
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Pabna Polytechnic Institute",
        },
        knowsAbout: [
          "HTML5", "CSS3", "JavaScript", "TypeScript",
          "React.js", "Next.js", "Tailwind CSS", "Sass", "Node.js",
          "MongoDB", "Express.js", "MERN Stack", "Prisma",
          "REST API", "Git", "GitHub", "Figma", "UI/UX Design",
          "Redux", "PostgreSQL", "Vercel", "Firebase", "Docker",
          "Responsive Web Design", "SEO", "Web Development",
          "Frontend Development", "Full Stack Development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://rakibulislamdev.me/#website",
        url: "https://rakibulislamdev.me",
        name: "Rakibul Islam Portfolio",
        description: "Official portfolio of Rakibul Islam, Full Stack & MERN Developer based in Dhaka, Bangladesh.",
        inLanguage: "en-US",
        publisher: {
          "@id": "https://rakibulislamdev.me/#person",
        },
        author: {
          "@id": "https://rakibulislamdev.me/#person",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${signatureFont.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Tag Manager / Analytics */}
        {googleAnalyticsId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${googleAnalyticsId}');
                `,
              }}
            />
          </>
        )}

        {/* Dynamic Meta (Facebook) Pixel Integration */}
        {metaPixelId && (
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-[#0f0f0f] text-white transition-colors duration-300">
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <ChatbotWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
