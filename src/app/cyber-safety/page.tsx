import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CyberSafetyHero } from '@/components/cyber-safety/CyberSafetyHero';
import { SafetyChecklist } from '@/components/cyber-safety/SafetyChecklist';
import { DigitalSafetyMap } from '@/components/cyber-safety/DigitalSafetyMap';
import { SecurityHabitsComparison } from '@/components/cyber-safety/SecurityHabitsComparison';
import { SafetyTopicsSection } from '@/components/cyber-safety/SafetyTopicsSection';
import { RedFlagsSection } from '@/components/cyber-safety/RedFlagsSection';
import { SafetyScenarios } from '@/components/cyber-safety/SafetyScenarios';
import { AudienceSafetyCards } from '@/components/cyber-safety/AudienceSafetyCards';
import { EmergencySteps } from '@/components/cyber-safety/EmergencySteps';
import { SecurityScorecard } from '@/components/cyber-safety/SecurityScorecard';
import { CyberMythsSection } from '@/components/cyber-safety/CyberMythsSection';
import { SafetyRoadmap } from '@/components/cyber-safety/SafetyRoadmap';
import { TrustNotice } from '@/components/cyber-safety/TrustNotice';
import { DigitalDefenseSurface } from '@/components/visuals/DigitalDefenseSurface';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CyberSafetyFAQ } from '@/components/cyber-safety/CyberSafetyFAQ';
import { CYBER_SAFETY_FAQS } from '@/data/cyberSafetyHubData';
import { CyberSafetyCrossLinks } from '@/components/cyber-safety/CyberSafetyCrossLinks';

export const metadata: Metadata = {
  title: {
    absolute: 'Cyber Safety Guide — Learn Safer Digital Habits | CyberAntigravity',
  },
  description:
    'Learn practical cyber safety habits, recognize online threats, protect accounts and devices, and make safer decisions online with CyberAntigravity.',
  alternates: {
    canonical: 'https://cyberantigravity.com/cyber-safety',
  },
  openGraph: {
    title: 'Cyber Safety Guide — Learn Safer Digital Habits | CyberAntigravity',
    description:
      'Learn practical cyber safety habits, recognize online threats, protect accounts and devices, and make safer decisions online with CyberAntigravity.',
    url: 'https://cyberantigravity.com/cyber-safety',
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber Safety Guide — Learn Safer Digital Habits | CyberAntigravity',
    description:
      'Learn practical cyber safety habits, recognize online threats, protect accounts and devices, and make safer decisions online with CyberAntigravity.',
    creator: '@cyberantigravity',
  },
};

export default function CyberSafetyPage() {
  // Breadcrumb Structured Data
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
        name: 'Cyber Safety Hub',
        item: 'https://cyberantigravity.com/cyber-safety',
      },
    ],
  };

  // WebPage Guide Structured Data
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://cyberantigravity.com/cyber-safety#webpage',
    url: 'https://cyberantigravity.com/cyber-safety',
    name: 'Cyber Safety Guide — Learn Safer Digital Habits | CyberAntigravity',
    description:
      'Learn practical cyber safety habits, recognize online threats, protect accounts and devices, and make safer decisions online with CyberAntigravity.',
    publisher: {
      '@type': 'Organization',
      name: 'CyberAntigravity',
      url: 'https://cyberantigravity.com',
    },
    inLanguage: 'en-US',
  };

  // FAQPage Structured Data (Matches visible FAQs exactly)
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CYBER_SAFETY_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
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

      {/* Main Pillar Content */}
      <main id="main-content" className="flex-1">
        {/* 1. Hero Section (Includes Graphical Ecosystem Illustration USER -> DEVICE -> NETWORK -> ACCOUNT -> DATA + Shield) */}
        <CyberSafetyHero />

        {/* 1.5. Visual Digital Defense Surface Ecosystem */}
        <section className="py-12 bg-slate-950/40 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DigitalDefenseSurface />
          </div>
        </section>

        {/* 2. Quick Safety Checklist: "Your Everyday Cyber Safety Checklist" */}
        <SafetyChecklist />

        {/* 2.5. Digital Safety Map (Interactive Cross/Stacked Topology Diagram) */}
        <DigitalSafetyMap />

        {/* 2.75. Security Habits Visual ("Good Habits vs Risky Habits") */}
        <SecurityHabitsComparison />

        {/* 3. Cyber Safety Topics (10 Core Categories A - J) */}
        <SafetyTopicsSection />

        {/* 4. Threat Red Flags: "10 Red Flags You Should Never Ignore" */}
        <RedFlagsSection />

        {/* 4.5. "What Would You Do?" Interactive Scenarios: "Would You Spot the Risk?" */}
        <SafetyScenarios />

        {/* 4.75. Cyber Safety for Different Users (Students, Parents, Employees, Seniors, Small Businesses) */}
        <AudienceSafetyCards />

        {/* 5. Emergency Response Flow: "Think You May Have Been Scammed?" (7-step sequential flow) */}
        <EmergencySteps />

        {/* Dedicated Callout: Cyber Safety → Scam Awareness Hub */}
        <section className="py-8 bg-slate-950/60 border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-amber-800/60 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-amber-700 bg-amber-950/70 text-amber-300 font-semibold">
                    Dedicated Content Pillar
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Cyber Safety &rarr; Scam Awareness</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Explore the Complete Scam Awareness Hub
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Deep-dive into 16 specific scam categories, explore interactive simulated messages with our Red Flag Analyzer, and test your digital judgment with the Scam IQ Challenge.
                </p>
              </div>
              <Link
                href="/scam-awareness"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-950/30 shrink-0 cyber-focus-ring"
              >
                <span>Open Scam Awareness Hub</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Cyber Safety Score: "How Strong Is Your Cyber Hygiene?" (Educational Self-Assessment) */}
        <SecurityScorecard />

        {/* 7. Common Myths Section */}
        <CyberMythsSection />

        {/* 8. Beginner Roadmap */}
        <SafetyRoadmap />

        {/* 9. Trust & Credibility Section */}
        <TrustNotice />

        {/* 10. Frequently Asked Questions */}
        <CyberSafetyFAQ />

        {/* 11. Internal Cross-Linking */}
        <CyberSafetyCrossLinks />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
