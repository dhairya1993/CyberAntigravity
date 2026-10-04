import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToolShell } from '@/components/tools/ToolShell';
import { UrlExplainerTool } from '@/components/tools/UrlExplainerTool';
import { UrlExplainerVisual } from '@/components/visuals/CyberToolVisuals';
import { ALL_TOOLS } from '@/data/toolsHubData';

const tool = ALL_TOOLS.find((t) => t.slug === 'url-explainer')!;

export const metadata: Metadata = {
  title: 'URL Structure Explainer: Deconstruct Web Addresses | CyberAntigravity',
  description:
    'Dissect web addresses into protocol, subdomains, registrable domain, path, and query parameters. Educational tool explaining URL architecture.',
  alternates: {
    canonical: 'https://cyberantigravity.com/tools/url-explainer',
  },
  openGraph: {
    title: 'URL Structure Explainer | CyberAntigravity',
    description:
      'Dissect web addresses into protocol, subdomains, registrable domain, path, and query parameters.',
    url: 'https://cyberantigravity.com/tools/url-explainer',
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Structure Explainer | CyberAntigravity',
    description: 'Learn how web URLs are structured and spot deceptive prefix tricks.',
    creator: '@cyberantigravity',
  },
};

export default function UrlExplainerPage() {
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
        name: 'URL Structure Explainer',
        item: 'https://cyberantigravity.com/tools/url-explainer',
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
            <UrlExplainerTool />
            <UrlExplainerVisual />
          </div>
        </ToolShell>
      </main>
      <Footer />
    </div>
  );
}
