import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToolShell } from '@/components/tools/ToolShell';
import { CyberHygieneTool } from '@/components/tools/CyberHygieneTool';
import { ALL_TOOLS } from '@/data/toolsHubData';

const tool = ALL_TOOLS.find((t) => t.slug === 'cyber-hygiene')!;

export const metadata: Metadata = {
  title: 'Cyber Hygiene Checklist: 9-Point Security Audit | CyberAntigravity',
  description:
    'Interactive client-side security checklist covering MFA, unique passwords, backups, and app permissions. Track your defense posture locally.',
  alternates: {
    canonical: 'https://cyberantigravity.com/tools/cyber-hygiene',
  },
  openGraph: {
    title: 'Cyber Hygiene Checklist | CyberAntigravity',
    description:
      'Audit your personal and organizational security posture with an interactive 9-point hygiene checklist.',
    url: 'https://cyberantigravity.com/tools/cyber-hygiene',
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber Hygiene Checklist | CyberAntigravity',
    description: 'Interactive client-side checklist for daily digital security posture.',
    creator: '@cyberantigravity',
  },
};

export default function CyberHygienePage() {
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
        name: 'Cyber Hygiene Checklist',
        item: 'https://cyberantigravity.com/tools/cyber-hygiene',
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
          <CyberHygieneTool />
        </ToolShell>
      </main>
      <Footer />
    </div>
  );
}
