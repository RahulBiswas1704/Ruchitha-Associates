import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ruchithaassociatess.com';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/gallery',
    '/jobs',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Dynamic Jobs
    const jobs = await prisma.job.findMany({
      select: { id: true, updatedAt: true },
    });

    const jobRoutes = jobs.map((job: { id: string; updatedAt: Date }) => ({
      url: `${baseUrl}/jobs/${job.id}`,
      lastModified: job.updatedAt,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...jobRoutes];
  } catch (e) {
    // Fallback if DB fails
    return staticRoutes;
  }
}
