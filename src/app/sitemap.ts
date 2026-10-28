import { MetadataRoute } from 'next';
import { BLOG_ARTICLES } from '@/data/blogArticles';
import { SCAM_EXPLORER_CATEGORIES } from '@/data/scamTypesExplorerData';
import { SITE_URL } from '@/lib/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const siteUpdateDate = new Date('2026-10-26T00:00:00Z');

  const blogRoutes: MetadataRoute.Sitemap = BLOG_ARTICLES.filter(
    (a) => a.status === 'published'
  ).map((article) => {
    const rawDate = article.updatedAt || article.publishedAt;
    return {
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: rawDate ? new Date(rawDate) : siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  const scamCategoryRoutes: MetadataRoute.Sitemap = SCAM_EXPLORER_CATEGORIES.filter(
    (cat) => cat.slug !== 'phishing'
  ).map((cat) => ({
    url: `${baseUrl}/scam-awareness/types/${cat.slug}`,
    lastModified: siteUpdateDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const legalRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclosure`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/brand`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  return [
    {
      url: baseUrl,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cyber-safety`,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/scam-awareness`,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/scam-awareness/types`,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scam-awareness/types/phishing`,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/scam-awareness/how-scams-work`,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scam-awareness/red-flags`,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scam-awareness/response`,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scam-awareness/challenge`,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scam-awareness/simulator`,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cyber-iq`,
      lastModified: siteUpdateDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/learn/progress`,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/learn/cybersecurity-fundamentals`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: siteUpdateDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/password-strength`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/password-generator`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/url-explainer`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/password-reuse`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/security-headers`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/cyber-hygiene`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...scamCategoryRoutes,
    ...blogRoutes,
    ...legalRoutes,
  ];
}
