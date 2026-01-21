import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseURL = process.env.NEXT_PUBLIC_APP_URL;

  return [
    {
      url: `${baseURL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];
}
