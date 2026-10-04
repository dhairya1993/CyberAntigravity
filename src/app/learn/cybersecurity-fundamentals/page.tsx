import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TopicPageLayout } from '@/components/learn/TopicPageLayout';
import { CYBERSECURITY_FUNDAMENTALS_TOPIC } from '@/data/learningHubData';

export const metadata: Metadata = {
  title: 'Cybersecurity Fundamentals: Core Principles & CIA Triad | CyberAntigravity',
  description:
    'Learn foundational cybersecurity concepts: the CIA Triad, Authentication vs. Authorization (AAA), threat categories, and the Principle of Least Privilege.',
  alternates: {
    canonical: 'https://cyberantigravity.com/learn/cybersecurity-fundamentals',
  },
  openGraph: {
    title: 'Cybersecurity Fundamentals: Core Principles & CIA Triad | CyberAntigravity',
    description:
      'Learn foundational cybersecurity concepts: the CIA Triad, Authentication vs. Authorization (AAA), threat categories, and the Principle of Least Privilege.',
    url: 'https://cyberantigravity.com/learn/cybersecurity-fundamentals',
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity Fundamentals: Core Principles & CIA Triad | CyberAntigravity',
    description:
      'Learn foundational cybersecurity concepts: the CIA Triad, Authentication vs. Authorization (AAA), threat categories, and the Principle of Least Privilege.',
    creator: '@cyberantigravity',
  },
};

export default function CybersecurityFundamentalsPage() {
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
        name: 'Cybersecurity Learning Hub',
        item: 'https://cyberantigravity.com/learn',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cybersecurity Fundamentals',
        item: 'https://cyberantigravity.com/learn/cybersecurity-fundamentals',
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* Structured Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <main className="flex-1">
        <TopicPageLayout topic={CYBERSECURITY_FUNDAMENTALS_TOPIC} />
      </main>

      <Footer />
    </div>
  );
}
