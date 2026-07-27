import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

// Cached profile settings getter
export const getProfileSettings = cache(
  unstable_cache(
    async () => {
      try {
        let settings = await prisma.profileSettings.findUnique({
          where: { id: "default" },
        });

        if (!settings) {
          settings = await prisma.profileSettings.create({
            data: {
              id: "default",
              name: "Rakibul Islam",
              title: "Web Developer & Frontend Specialist",
              email: "rirakib03@gmail.com",
              phone: "+8801621-574994",
              location: "Pabna, Bangladesh",
              github: "https://github.com/Rakibul-Islam-1",
              linkedin: "https://linkedin.com/in/rakibul-islam",
              instagram: "https://instagram.com",
              profileImage: "/assets/Images/rakibulislam.jpg",
              aboutImage: "/assets/Images/rakibulislam.jpg",
              typewriterText: "Web Developer based in Bangladesh",
              aboutBio:
                "I am a Pabna, Bangladesh-based web developer with a focus on web development. I have a diverse range of experience having worked on various web applications.",
              experienceMonths: 6,
              clientsWorldwide: 25,
            },
          });
        }
        return settings;
      } catch (error) {
        console.error("Error fetching profile settings:", error);
        return null;
      }
    },
    ["profile-settings"],
    { tags: ["profile-settings"] }
  )
);

// Cached projects list getter (React cache for request-deduplication without 2MB Next cache overflow)
export const getProjects = cache(async () => {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
});

// Cached single project getter by ID
export const getProjectById = cache(async (id: string) => {
  try {
    return await prisma.project.findUnique({ where: { id } });
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return null;
  }
});

// Cached project count getter
export const getProjectCount = cache(
  unstable_cache(
    async () => {
      try {
        return await prisma.project.count();
      } catch (error) {
        console.error("Error fetching project count:", error);
        return 0;
      }
    },
    ["project-count"],
    { tags: ["projects"] }
  )
);

// Cached blog posts list getter
export const getBlogs = cache(
  unstable_cache(
    async () => {
      try {
        return await prisma.blogPost.findMany({
          orderBy: { createdAt: "desc" },
        });
      } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
      }
    },
    ["blogs-list"],
    { tags: ["blogs"] }
  )
);
