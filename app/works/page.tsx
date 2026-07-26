import type { Metadata } from "next";
import AllProjectsGrid from "./_components/AllProjectsGrid";

export const metadata: Metadata = {
  title: "My Works | Rakibul Islam - Web Developer Projects & Portfolio",
  description:
    "Explore full-stack and frontend web development projects by Rakibul Islam. Featuring Fruit Burst, Cafena, Event Vibe Hub, Road Riders Hub, Gamer Zone, and Starbucks Web.",
  keywords: [
    "Rakibul Islam Works",
    "Rakibul Islam Projects",
    "Frontend Developer Portfolio Bangladesh",
    "React Next.js Web Projects",
    "Fruit Burst Online Fruit Shop",
    "Road Riders Hub Car Shop",
    "Event Vibe Hub",
    "Cafena Coffee Shop",
  ],
  openGraph: {
    title: "My Works & Portfolio Showcase | Rakibul Islam",
    description:
      "Explore modern web applications, e-commerce platforms, and interactive user interfaces developed by Rakibul Islam.",
    url: "https://rakibulislam.dev/works",
    type: "website",
  },
};

export default function WorksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects & Portfolio Showcase | Rakibul Islam",
    description: "Featured web development projects built by Rakibul Islam.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Fruit Burst - Online Fruits Shop",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Cafena - Coffee Shop App",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Event Vibe Hub - Event Management",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Road Riders Hub - Branded Car Shop",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Gamer Zone - Gaming Portal",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Starbucks Web - Web Application",
        },
      ],
    },
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AllProjectsGrid />
    </section>
  );
}
