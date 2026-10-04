import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToolShell } from '@/components/tools/ToolShell';
import { PasswordStrengthTool } from '@/components/tools/PasswordStrengthTool';
import { ALL_TOOLS } from '@/data/toolsHubData';

const tool = ALL_TOOLS.find((t) => t.slug === 'password-strength')!;

export const metadata: Metadata = {
  title: 'Password Strength Educator: Client-Side Complexity Analyzer | CyberAntigravity',
  description:
    'Evaluate password complexity, character diversity, and vulnerability to common dictionary and sequential patterns locally in your browser.',
  alternates: {
    canonical: 'https://cyberantigravity.com/tools/password-strength',
  },
  openGraph: {
    title: 'Password Strength Educator: Client-Side Complexity Analyzer | CyberAntigravity',
    description:
      'Evaluate password complexity, character diversity, and vulnerability to common dictionary and sequential patterns locally in your browser.',
    url: 'https://cyberantigravity.com/tools/password-strength',
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
        name: 'Password Strength Educator',
        item: 'https://cyberantigravity.com/tools/password-strength',
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
          <PasswordStrengthTool />
        </ToolShell>
      </main>
      <Footer />
    </div>
  );
}
