import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StudentProgressDashboard } from '@/components/gamification/StudentProgressDashboard';

export const metadata: Metadata = {
  title: 'Student Progress & Achievements: Cybersecurity Gamification | CyberAntigravity',
  description:
    'Track your cybersecurity learning journey: earn XP, level up across 9 skill ranks, maintain daily learning streaks, and unlock defensive achievement badges.',
  alternates: {
    canonical: 'https://cyberantigravity.com/learn/progress',
  },
  openGraph: {
    title: 'Student Progress & Achievements | CyberAntigravity',
    description:
      'Track your cybersecurity learning journey: earn XP, level up across 9 skill ranks, maintain daily learning streaks, and unlock defensive achievement badges.',
    url: 'https://cyberantigravity.com/learn/progress',
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Progress & Achievements | CyberAntigravity',
    description:
      'Track your cybersecurity learning journey: earn XP, level up across 9 skill ranks, maintain daily learning streaks, and unlock defensive achievement badges.',
    creator: '@cyberantigravity',
  },
};

export default function LearnProgressPage() {
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
        name: 'Student Progress & Gamification',
        item: 'https://cyberantigravity.com/learn/progress',
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

      <main className="flex-1 py-10 sm:py-16">
        <div className="cyber-container">
          <StudentProgressDashboard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
