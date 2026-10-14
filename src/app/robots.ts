import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/siteConfig';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/progress', '/forgot-password'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
