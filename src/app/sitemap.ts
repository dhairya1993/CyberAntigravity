import { MetadataRoute } from 'next';
import { BLOG_ARTICLES } from '@/data/blogArticles';
import { SCAM_EXPLORER_CATEGORIES } from '@/data/scamTypesExplorerData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cyberantigravity.com';

  const blogRoutes: MetadataRoute.Sitemap = BLOG_ARTICLES.filter(
    (a) => a.status === 'published'
  ).map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const scamCategoryRoutes: MetadataRoute.Sitemap = SCAM_EXPLORER_CATEGORIES.filter(
    (cat) => cat.slug !== 'phishing'
  ).map((cat) => ({
    url: `${baseUrl}/scam-awareness/types/${cat.slug}`,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const legalRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclosure`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/brand`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cyber-safety`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/scam-awareness`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/scam-awareness/types`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scam-awareness/types/phishing`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/scam-awareness/how-scams-work`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scam-awareness/red-flags`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scam-awareness/response`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scam-awareness/challenge`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scam-awareness/simulator`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cyber-iq`,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/learn`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/learn/cybersecurity-fundamentals`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/password-strength`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/password-generator`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/url-explainer`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/password-reuse`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/security-headers`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/cyber-hygiene`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...scamCategoryRoutes,
    ...blogRoutes,
    ...legalRoutes,
  ];
}
