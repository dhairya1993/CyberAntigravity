/**
 * Global Site Configuration & Production URL Resolver
 * 
 * Ensures all canonical URLs, Open Graph tags, JSON-LD structured data,
 * sitemaps, and robots.txt point to the active production domain
 * (e.g. https://cyberantigravity.vercel.app) rather than an unpurchased custom domain.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes('localhost')
    ? process.env.NEXT_PUBLIC_APP_URL
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://cyberantigravity.vercel.app');

export const SITE_NAME = 'CyberAntigravity';
export const SITE_TAGLINE = 'Rise Above Cyber Threats.';
export const SITE_DESCRIPTION =
  'CyberAntigravity is a premier global cybersecurity education and online safety platform empowering individuals, families, and organizations with proactive digital defense, scam awareness, and ethical security literacy.';
