import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScamAwarenessHero } from '@/components/scam-awareness/ScamAwarenessHero';
import { TrustDisclaimer } from '@/components/scam-awareness/TrustDisclaimer';
import { ScamCategoryExplorer } from '@/components/scam-awareness/ScamCategoryExplorer';
import { ScamFlow } from '@/components/scam-awareness/ScamFlow';
import { RedFlagAnalyzer } from '@/components/scam-awareness/RedFlagAnalyzer';
import { ScamQuiz } from '@/components/scam-awareness/ScamQuiz';
import { ScamAnatomy } from '@/components/scam-awareness/ScamAnatomy';
import { ScamResponseSteps } from '@/components/scam-awareness/ScamResponseSteps';
import { ScamChecklist } from '@/components/scam-awareness/ScamChecklist';
import { ScamStoriesSection } from '@/components/scam-awareness/CaseStudyCard';
import { ComingSoonToolsSection } from '@/components/scam-awareness/ComingSoonToolCard';
import { ScamAwarenessFAQ } from '@/components/scam-awareness/ScamAwarenessFAQ';
import { ScamCrossLinks } from '@/components/scam-awareness/ScamCrossLinks';
import { ScamAnatomyDiagram } from '@/components/visuals/ScamAnatomyDiagram';
import { SCAM_AWARENESS_FAQS } from '@/data/scamAwarenessData';

export const metadata: Metadata = {
  title: 'Scam Awareness Guide: Spot Phishing, Fraud & Online Scams | CyberAntigravity',
  description:
    'Learn how phishing, fake job offers, investment scams, impersonation, payment fraud and other online scams work—and practice spotting their warning signs.',
  alternates: {
    canonical: 'https://cyberantigravity.com/scam-awareness',
  },
  openGraph: {
    title: 'Scam Awareness Guide: Spot Phishing, Fraud & Online Scams | CyberAntigravity',
    description:
      'Learn how phishing, fake job offers, investment scams, impersonation, payment fraud and other online scams work—and practice spotting their warning signs.',
    url: 'https://cyberantigravity.com/scam-awareness',
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scam Awareness Guide: Spot Phishing, Fraud & Online Scams | CyberAntigravity',
    description:
      'Learn how phishing, fake job offers, investment scams, impersonation, payment fraud and other online scams work—and practice spotting their warning signs.',
    creator: '@cyberantigravity',
  },
};

export default function ScamAwarenessPage() {
  // Breadcrumb Schema
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
        name: 'Scam Awareness Hub',
        item: 'https://cyberantigravity.com/scam-awareness',
      },
    ],
  };

  // WebPage Guide Schema
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://cyberantigravity.com/scam-awareness#webpage',
    url: 'https://cyberantigravity.com/scam-awareness',
    name: 'Scam Awareness Guide: Spot Phishing, Fraud & Online Scams',
    description:
      'Learn how phishing, fake job offers, investment scams, impersonation, payment fraud and other online scams work—and practice spotting their warning signs.',
    publisher: {
      '@type': 'Organization',
      name: 'CyberAntigravity',
      url: 'https://cyberantigravity.com',
    },
    inLanguage: 'en-US',
  };

  // FAQPage Schema
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SCAM_AWARENESS_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-amber-500/30 selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Global Navigation */}
      <Navbar />

      {/* Visible Educational Top Banner */}
      <TrustDisclaimer variant="banner" />

      {/* Main Scam Awareness Hub Content */}
      <main id="main-content" className="flex-1">
        {/* 1. Hero Section */}
        <ScamAwarenessHero />

        {/* Prominent Educational Notice */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TrustDisclaimer variant="card" />
        </div>

        {/* 1.5. Visual Scam Anatomy & 8 Core Archetypes */}
        <section className="py-10 bg-slate-950/40 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScamAnatomyDiagram />
          </div>
        </section>

        {/* 2. Scam Category Explorer (16 categories, search & filters) */}
        <ScamCategoryExplorer />

        {/* 3. How a Scam Works (6-stage social engineering flow) */}
        <ScamFlow />

        {/* 4. Spot the Red Flags (Interactive simulated SMS analyzer) */}
        <RedFlagAnalyzer />

        {/* 5. Scam IQ Challenge (Can you spot the scam? 6 scenarios, scoring) */}
        <ScamQuiz />

        {/* 6. Scam Anatomy (6 phases & 7 psychological triggers) */}
        <ScamAnatomy />

        {/* 7. What to Do: 8 Steps & Official Country Reporting */}
        <ScamResponseSteps />

        {/* 8. Scam Warning Checklist (Interactive 8-question checklist) */}
        <ScamChecklist />

        {/* 9. Scam Stories: Deconstructed Educational Scenarios */}
        <ScamStoriesSection />

        {/* 10 & 11. Upcoming Tools (Link Checker & Message Analyzer previews) */}
        <ComingSoonToolsSection />

        {/* 12. FAQ Section */}
        <ScamAwarenessFAQ />

        {/* 13. Cross-Link Navigation */}
        <ScamCrossLinks />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
