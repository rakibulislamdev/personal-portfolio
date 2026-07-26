import type { Metadata } from "next";
import { Ephesis } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme/ThemeContext";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import { prisma } from "@/lib/prisma";

const signatureFont = Ephesis({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rakibulislamdev.me"),
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
  authors: [{ name: "Rakibul Islam", url: "https://rakibulislamdev.me" }],
  creator: "Rakibul Islam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rakibulislamdev.me",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let googleAnalyticsId = "";
  let metaPixelId = "";

  try {
    const settings = await prisma.profileSettings.findUnique({
      where: { id: "default" },
    });
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
        jobTitle: "Web Developer",
        url: "https://rakibulislamdev.me",
        email: "rirakib03@gmail.com",
        telephone: "+8801621-574994",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dhaka",
          addressCountry: "Bangladesh",
        },
        sameAs: [
          "https://github.com/rakibulislamdev",
          "https://www.linkedin.com/in/rakibulislamdev/",
          "https://www.facebook.com/iamrakib2/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://rakibulislamdev.me/#website",
        url: "https://rakibulislamdev.me",
        name: "Rakibul Islam Portfolio",
        publisher: {
          "@id": "https://rakibulislamdev.me/#person",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${signatureFont.variable} h-full antialiased dark`}
    >
      <head>
        {/* Fontshare CDN — Clash Display + Satoshi */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Dynamic Google Analytics Integration */}
        {googleAnalyticsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${googleAnalyticsId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Dynamic Meta (Facebook) Pixel Integration */}
        {metaPixelId && (
          <script
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
      <body className="min-h-full flex flex-col bg-[#f0f2f5] dark:bg-[#0f0f0f] text-zinc-900 dark:text-white transition-colors duration-300">
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
