import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToolShell } from '@/components/tools/ToolShell';
import { SecurityHeadersTool } from '@/components/tools/SecurityHeadersTool';
import { SecurityHeadersVisual } from '@/components/visuals/CyberToolVisuals';
import { ALL_TOOLS } from '@/data/toolsHubData';

const tool = ALL_TOOLS.find((t) => t.slug === 'security-headers')!;

export const metadata: Metadata = {
  title: 'Security Headers Educator: CSP, HSTS & Permissions Policy | CyberAntigravity',
  description:
    'Interactive educational explainer for HTTP response headers: Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), and Permissions-Policy.',
  alternates: {
    canonical: 'https://cyberantigravity.com/tools/security-headers',
  },
  openGraph: {
    title: 'Security Headers Educator | CyberAntigravity',
    description:
      'Learn how HTTP security headers protect web applications against cross-site scripting and framing attacks.',
    url: 'https://cyberantigravity.com/tools/security-headers',
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
        item: 'https://cyberantigravity.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Cybersecurity Tools',
        item: 'https://cyberantigravity.com/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Security Headers Educator',
        item: 'https://cyberantigravity.com/tools/security-headers',
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
