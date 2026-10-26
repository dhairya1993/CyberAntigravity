import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToolShell } from '@/components/tools/ToolShell';
import { PasswordGeneratorTool } from '@/components/tools/PasswordGeneratorTool';
import { ALL_TOOLS } from '@/data/toolsHubData';
import { SITE_URL } from '@/lib/siteConfig';

const tool = ALL_TOOLS.find((t) => t.slug === 'password-generator')!;

export const metadata: Metadata = {
  title: 'Secure Password & Passphrase Generator: Web Crypto Powered',
  description:
    'Generate cryptographically random passwords and multi-word passphrases using the browser Web Crypto API. 100% client-side, zero server transmission.',
  alternates: {
    canonical: '/tools/password-generator',
  },
  openGraph: {
    title: 'Secure Password & Passphrase Generator | CyberAntigravity',
    description:
      'Generate cryptographically random passwords and passphrases locally in your browser.',
    url: `${SITE_URL}/tools/password-generator`,
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Secure Password Generator | CyberAntigravity',
    description: 'Cryptographically secure password and passphrase generator.',
    creator: '@cyberantigravity',
  },
};

export default function PasswordGeneratorPage() {
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
        name: 'Password Generator',
        item: `${SITE_URL}/tools/password-generator`,
      },
    ],
  };

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CyberAntigravity Secure Password & Passphrase Generator',
    url: `${SITE_URL}/tools/password-generator`,
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description:
      'Generate cryptographically random passwords and multi-word passphrases using the browser Web Crypto API. 100% client-side, zero server transmission.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Web Crypto API cryptographically secure pseudo-random number generator (CSPRNG)',
      'Custom character sets: uppercase, lowercase, numbers, special symbols',
      'Memorable Diceware-style multi-word passphrases',
      'Calculated entropy bit-strength rating',
      '100% private, client-side browser execution',
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
          <PasswordGeneratorTool />
        </ToolShell>
      </main>
      <Footer />
    </div>
  );
}
