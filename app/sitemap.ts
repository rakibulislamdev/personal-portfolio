import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rakibulislamdev.me';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  // Fetch dynamic projects sitemap routes
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await prisma.project.findMany({
      select: { id: true, title: true, updatedAt: true },
    });
    projectRoutes = projects.map((p) => {
      const slug = p.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return {
        url: `${baseUrl}/works/${slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error("Error generating sitemap projects:", error);
  }

  // Fetch dynamic published blog posts sitemap routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await prisma.blogPost.findMany({
      where: { status: "Published" },
      select: { id: true, slug: true, title: true, updatedAt: true },
    });
    blogRoutes = blogs.map((b) => {
      const slug = b.slug || b.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(b.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error("Error generating sitemap blogs:", error);
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
