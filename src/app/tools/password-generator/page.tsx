import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToolShell } from '@/components/tools/ToolShell';
import { PasswordGeneratorTool } from '@/components/tools/PasswordGeneratorTool';
import { ALL_TOOLS } from '@/data/toolsHubData';

const tool = ALL_TOOLS.find((t) => t.slug === 'password-generator')!;

export const metadata: Metadata = {
  title: 'Secure Password & Passphrase Generator: Web Crypto Powered | CyberAntigravity',
  description:
    'Generate cryptographically random passwords and multi-word passphrases using the browser Web Crypto API. 100% client-side, zero server transmission.',
  alternates: {
    canonical: 'https://cyberantigravity.com/tools/password-generator',
  },
  openGraph: {
    title: 'Secure Password & Passphrase Generator | CyberAntigravity',
    description:
      'Generate cryptographically random passwords and passphrases locally in your browser.',
    url: 'https://cyberantigravity.com/tools/password-generator',
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
        name: 'Password Generator',
        item: 'https://cyberantigravity.com/tools/password-generator',
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
          <PasswordGeneratorTool />
        </ToolShell>
      </main>
      <Footer />
    </div>
  );
}
