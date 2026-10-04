import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToolShell } from '@/components/tools/ToolShell';
import { PasswordReuseTool } from '@/components/tools/PasswordReuseTool';
import { PasswordReuseVisual } from '@/components/visuals/CyberToolVisuals';
import { ALL_TOOLS } from '@/data/toolsHubData';

const tool = ALL_TOOLS.find((t) => t.slug === 'password-reuse')!;

export const metadata: Metadata = {
  title: 'Password Reuse Risk Checker: Behavioral Exposure Audit | CyberAntigravity',
  description:
    'Assess your credential reuse habits through an educational self-check. Understand credential-stuffing vulnerability without sharing passwords.',
  alternates: {
    canonical: 'https://cyberantigravity.com/tools/password-reuse',
  },
  openGraph: {
    title: 'Password Reuse Risk Checker | CyberAntigravity',
    description:
      'Assess your credential reuse habits through an educational self-check without sharing passwords.',
    url: 'https://cyberantigravity.com/tools/password-reuse',
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Reuse Risk Checker | CyberAntigravity',
    description: 'Educational self-assessment of credential reuse and cascading breach risk.',
    creator: '@cyberantigravity',
  },
};

export default function PasswordReusePage() {
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
        name: 'Password Reuse Risk Checker',
        item: 'https://cyberantigravity.com/tools/password-reuse',
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
            <PasswordReuseTool />
            <PasswordReuseVisual />
          </div>
        </ToolShell>
      </main>
      <Footer />
    </div>
  );
}
