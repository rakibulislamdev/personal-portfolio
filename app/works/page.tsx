import type { Metadata } from "next";
import AllProjectsGrid from "./_components/AllProjectsGrid";
import { getProjects } from "@/lib/data";

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
    url: "https://rakibulislamdev.me/works",
    type: "website",
  },
};

export default async function WorksPage() {
  // Fetch real-time projects from server cache / Neon DB
  let dbProjects = await getProjects();

  const formattedProjects = dbProjects.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle || "",
    category: p.category,
    image: p.image,
  }));

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <AllProjectsGrid projectsList={formattedProjects.length > 0 ? formattedProjects : undefined} />
    </section>
  );
}
