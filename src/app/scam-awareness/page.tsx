import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Core Hero & Educational Trust
import { ScamAwarenessHero } from '@/components/scam-awareness/ScamAwarenessHero';
import { TrustDisclaimer } from '@/components/scam-awareness/TrustDisclaimer';

// Interactive Step 6 Additions
import { StudentModeSection } from '@/components/scam-awareness/StudentModeSection';
import { ScamDetectionLab } from '@/components/scam-awareness/ScamDetectionLab';
import { ScamChallenge } from '@/components/scam-awareness/ScamChallenge';
import { ScamEmergencyFlow } from '@/components/scam-awareness/ScamEmergencyFlow';
import { CommonRedFlagsChecklist } from '@/components/scam-awareness/CommonRedFlagsChecklist';
import { ScamAnatomyVisual } from '@/components/scam-awareness/ScamAnatomyVisual';
import { SocialEngineeringVisual } from '@/components/scam-awareness/SocialEngineeringVisual';
import { ScamTypeExplorer } from '@/components/scam-awareness/ScamTypeExplorer';
import { ScamMythsSection } from '@/components/scam-awareness/ScamMythsSection';

// Preserved Existing Components
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
  title: {
    absolute: 'Scam Awareness Guide — Learn to Spot Online Scams | CyberAntigravity',
  },
  description:
    'Learn how phishing, impersonation, fake offers and social-engineering scams work. Practice spotting red flags with CyberAntigravity’s interactive scam-awareness lessons.',
  alternates: {
    canonical: 'https://cyberantigravity.com/scam-awareness',
  },
  openGraph: {
    title: 'Scam Awareness Guide — Learn to Spot Online Scams | CyberAntigravity',
    description:
      'Learn how phishing, impersonation, fake offers and social-engineering scams work. Practice spotting red flags with CyberAntigravity’s interactive scam-awareness lessons.',
    url: 'https://cyberantigravity.com/scam-awareness',
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scam Awareness Guide — Learn to Spot Online Scams | CyberAntigravity',
    description:
      'Learn how phishing, impersonation, fake offers and social-engineering scams work. Practice spotting red flags with CyberAntigravity’s interactive scam-awareness lessons.',
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
    name: 'Scam Awareness Guide — Learn to Spot Online Scams',
    description:
      'Learn how phishing, impersonation, fake offers and social-engineering scams work. Practice spotting red flags with CyberAntigravity’s interactive scam-awareness lessons.',
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

      {/* Main Scam Awareness Hub Content: LEARN → INSPECT → DECIDE → UNDERSTAND → IMPROVE */}
      <main id="main-content" className="flex-1">
        {/* 1. HERO SECTION (Eyebrow, Headline, Supporting text, CTAs, Vector illustration) */}
        <ScamAwarenessHero />

        {/* Educational Trust Notice */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <TrustDisclaimer variant="card" />
        </div>

        {/* 14. STUDENT MODE: "Learn Through Practice" (Read → Inspect → Choose → Get Feedback → Improve) */}
        <StudentModeSection />

        {/* 2, 3, 4, 5. SCAM DETECTION LAB: Simulated Message + Red Flag Inspector + Scam Score + Decision System */}
        <ScamDetectionLab />

        {/* 9 & 10. SCAM CHALLENGE: 5 Realistic Scenarios + "Not Sure" Pause Principle */}
        <ScamChallenge />

        {/* 11. SCAM RESPONSE FLOW: Graphical SPOT → STOP → DON'T CLICK → VERIFY → SECURE → REPORT */}
        <ScamEmergencyFlow />

        {/* 12. COMMON SCAM RED FLAGS: 10 Red Flags Self-Audit Checklist */}
        <CommonRedFlagsChecklist />

        {/* 7. SCAM ANATOMY: How a Scam Works (6 Stages from Target to Disappear) */}
        <ScamAnatomyVisual />

        {/* 8. SOCIAL ENGINEERING VISUAL: The Psychology Behind Many Scams (Fear, Greed, Urgency, Authority) */}
        <SocialEngineeringVisual />

        {/* 6. SCAM TYPE EXPLORER: 12 Visual Cards with Custom SVG Illustrations */}
        <ScamTypeExplorer />

        {/* 13. SCAM MYTHS VS REALITY: 5 Key Misconceptions Debunked */}
        <ScamMythsSection />

        {/* =========================================================================
            PRESERVED EXISTING MODULES (Preserved per User Prompt Section 20)
            ========================================================================= */}

        {/* Preserved Visual Scam Anatomy & Archetypes */}
        <section className="py-10 bg-slate-950/40 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScamAnatomyDiagram />
          </div>
        </section>

        {/* Preserved Full Scam Category Library (16 categories, search & filters) */}
        <ScamCategoryExplorer />

        {/* Preserved Scam Attack Flow Details */}
        <ScamFlow />

        {/* Preserved Simulated SMS Red Flag Analyzer */}
        <RedFlagAnalyzer />

        {/* Preserved 6-Scenario Scam Quiz */}
        <ScamQuiz />

        {/* Preserved Scam Anatomy Psychological Deep Dive */}
        <ScamAnatomy />

        {/* Preserved Incident Response Steps & Country Emergency Contacts */}
        <ScamResponseSteps />

        {/* Preserved 8-Question Security Checklist */}
        <ScamChecklist />

        {/* Preserved Deconstructed Case Studies */}
        <ScamStoriesSection />

        {/* Preserved Upcoming Defensive Tools */}
        <ComingSoonToolsSection />

        {/* Preserved Comprehensive FAQ */}
        <ScamAwarenessFAQ />

        {/* Preserved Internal Navigation & Resource Links */}
        <ScamCrossLinks />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
