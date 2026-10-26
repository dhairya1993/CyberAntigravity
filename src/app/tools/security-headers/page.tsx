import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToolShell } from '@/components/tools/ToolShell';
import { SecurityHeadersTool } from '@/components/tools/SecurityHeadersTool';
import { SecurityHeadersVisual } from '@/components/visuals/CyberToolVisuals';
import { ALL_TOOLS } from '@/data/toolsHubData';
import { SITE_URL } from '@/lib/siteConfig';

const tool = ALL_TOOLS.find((t) => t.slug === 'security-headers')!;

export const metadata: Metadata = {
  title: 'Security Headers Educator: CSP, HSTS & Permissions Policy',
  description:
    'Interactive educational explainer for HTTP response headers: Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), and Permissions-Policy.',
  alternates: {
    canonical: '/tools/security-headers',
  },
  openGraph: {
    title: 'Security Headers Educator | CyberAntigravity',
    description:
      'Learn how HTTP security headers protect web applications against cross-site scripting and framing attacks.',
    url: `${SITE_URL}/tools/security-headers`,
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security Headers Educator | CyberAntigravity',
    description: 'Master CSP, HSTS, and HTTP security response headers.',
    creator: '@cyberantigravity',
  },
};

export default function SecurityHeadersPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Cybersecurity Tools',
        item: `${SITE_URL}/tools`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Security Headers Educator',
        item: `${SITE_URL}/tools/security-headers`,
      },
    ],
  };

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CyberAntigravity Security Headers Educator & Inspector',
    url: `${SITE_URL}/tools/security-headers`,
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description:
      'Learn how CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy protect websites against XSS, clickjacking, and MITM attacks.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Interactive testing of Content-Security-Policy (CSP) rules',
      'HSTS preload and max-age configuration guides',
      'Clickjacking defense with X-Frame-Options and frame-ancestors',
      'Copy-paste production ready Nginx, Apache, and Next.js headers snippets',
      'Educational threat mitigation walkthrough',
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <ToolShell tool={tool}>
          <div className="space-y-8">
            <SecurityHeadersTool />
            <SecurityHeadersVisual />
          </div>
        </ToolShell>
      </main>
      <Footer />
    </div>
  );
}
