import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LearningHero } from '@/components/learn/LearningHero';
import { BeginnerStartPath } from '@/components/learn/BeginnerStartPath';
import { LearningRoadmap } from '@/components/learn/LearningRoadmap';
import { TeachingPrinciples } from '@/components/learn/TeachingPrinciples';
import { SafePracticeNotice } from '@/components/learn/SafePracticeNotice';
import { FutureLabsTeaser } from '@/components/learn/FutureLabsTeaser';
import { LearningCrossLinks } from '@/components/learn/LearningCrossLinks';
import { LearningRoadmapVisual } from '@/components/visuals/LearningRoadmapVisual';

export const metadata: Metadata = {
  title: 'Learn Cybersecurity Online: Beginner to Advanced | CyberAntigravity',
  description:
    'Learn cybersecurity fundamentals, digital safety, networking, web security, ethical hacking, SOC concepts, digital forensics and AI security with CyberAntigravity.',
  alternates: {
    canonical: 'https://cyberantigravity.com/learn',
  },
  openGraph: {
    title: 'Learn Cybersecurity Online: Beginner to Advanced | CyberAntigravity',
    description:
      'Learn cybersecurity fundamentals, digital safety, networking, web security, ethical hacking, SOC concepts, digital forensics and AI security with CyberAntigravity.',
    url: 'https://cyberantigravity.com/learn',
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn Cybersecurity Online: Beginner to Advanced | CyberAntigravity',
    description:
      'Learn cybersecurity fundamentals, digital safety, networking, web security, ethical hacking, SOC concepts, digital forensics and AI security with CyberAntigravity.',
    creator: '@cyberantigravity',
  },
};

export default function LearnPage() {
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
        {/* 1. Learning Hub Hero */}
        <LearningHero />

        {/* 2. Beginner Start Path ("Not Sure Where to Start?") */}
        <BeginnerStartPath />

        {/* 2.5. Interactive 9-Level Visual Journey */}
        <section className="py-12 bg-slate-950/60 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LearningRoadmapVisual />
          </div>
        </section>

        {/* 3. Learning Roadmap (9 Levels with Search & Filters) */}
        <LearningRoadmap />

        {/* 4. Safe Practice Notice Trust Component */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SafePracticeNotice />
        </div>

        {/* 5. How CyberAntigravity Teaches (Principles) */}
        <TeachingPrinciples />

        {/* 6. Hands-On Cyber Labs (Coming Soon Teaser) */}
        <FutureLabsTeaser />

        {/* 7. Ecosystem Internal Linking */}
        <LearningCrossLinks />
      </main>

      <Footer />
    </div>
  );
}
