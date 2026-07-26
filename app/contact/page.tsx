import React from "react";
import type { Metadata } from "next";
import ContactInfo from "./_components/ContactInfo";
import ContactForm from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Rakibul Islam | Web & Frontend Developer",
  description:
    "Get in touch with Rakibul Islam for custom web application development, React & Next.js projects, freelance inquiries, and technical collaboration.",
  keywords: [
    "Contact Rakibul Islam",
    "Hire Web Developer Bangladesh",
    "Hire React Developer",
    "Hire Next.js Developer",
    "Frontend Developer Contact",
    "Software Engineer Bangladesh",
  ],
  alternates: {
    canonical: "https://rakibulislamdev.me/contact",
  },
  openGraph: {
    title: "Contact Rakibul Islam | Web Developer & Frontend Specialist",
    description:
      "Looking for a skilled Web Developer? Contact Rakibul Islam to discuss project ideas, freelance contracts, or technical solutions.",
    url: "https://rakibulislamdev.me/contact",
    siteName: "Rakibul Islam Portfolio",
    images: [
      {
        url: "/assets/Images/Rakibulislam1.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Rakibul Islam - Web Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Rakibul Islam | Web Developer",
    description:
      "Get in touch with Rakibul Islam for web development projects and technical collaboration.",
    images: ["/assets/Images/Rakibulislam1.jpg"],
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://rakibulislamdev.me/contact/#webpage",
        url: "https://rakibulislamdev.me/contact",
        name: "Contact Rakibul Islam | Web & Frontend Developer",
        description:
          "Contact page of Rakibul Islam, a web developer based in Dhaka, Bangladesh.",
        isPartOf: {
          "@id": "https://rakibulislamdev.me/#website",
        },
      },
      {
        "@type": "Person",
        "@id": "https://rakibulislamdev.me/#person",
        name: "Rakibul Islam",
        jobTitle: "Web Developer",
        email: "rirakib03@gmail.com",
        telephone: "+8801621-574994",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dhaka",
          addressCountry: "Bangladesh",
        },
        url: "https://rakibulislamdev.me",
        sameAs: [
          "https://github.com/rakibulislamdev",
          "https://www.linkedin.com/in/rakibulislamdev/",
          "https://www.facebook.com/iamrakib2/",
        ],
      },
    ],
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Contact Rakibul Islam - Web & Frontend Developer</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Contact Info Left Column */}
        <ContactInfo />

        {/* Contact Form Right 2-Column Span */}
        <ContactForm />
      </div>
    </section>
  );
}
