import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToolShell } from '@/components/tools/ToolShell';
import { PasswordStrengthTool } from '@/components/tools/PasswordStrengthTool';
import { ALL_TOOLS } from '@/data/toolsHubData';
import { SITE_URL } from '@/lib/siteConfig';

const tool = ALL_TOOLS.find((t) => t.slug === 'password-strength')!;

export const metadata: Metadata = {
  title: 'Password Strength Educator: Client-Side Complexity Analyzer | CyberAntigravity',
  description:
    'Evaluate password complexity, character diversity, and vulnerability to common dictionary and sequential patterns locally in your browser.',
  alternates: {
    canonical: '/tools/password-strength',
  },
  openGraph: {
    title: 'Password Strength Educator: Client-Side Complexity Analyzer | CyberAntigravity',
    description:
      'Evaluate password complexity, character diversity, and vulnerability to common dictionary and sequential patterns locally in your browser.',
    url: `${SITE_URL}/tools/password-strength`,
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Strength Educator | CyberAntigravity',
    description: 'Evaluate password complexity and patterns locally in your browser.',
    creator: '@cyberantigravity',
  },
};

export default function PasswordStrengthPage() {
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
        name: 'Password Strength Educator',
        item: `${SITE_URL}/tools/password-strength`,
      },
    ],
  };

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CyberAntigravity Password Strength & Crack-Time Calculator',
    url: `${SITE_URL}/tools/password-strength`,
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description:
      'Real-time entropy and brute-force crack time calculator. Evaluates password resilience against modern GPU cluster hashing attacks with zero server transmission.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Real-time information entropy calculation in bits',
      'Brute-force crack time estimation across CPU, GPU, and quantum scenarios',
      'Common dictionary word & pattern matching warnings',
      'Instant strength meter with actionable hardening suggestions',
      '100% private, client-side browser evaluation',
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
          <PasswordStrengthTool />
        </ToolShell>
      </main>
      <Footer />
    </div>
  );
}
