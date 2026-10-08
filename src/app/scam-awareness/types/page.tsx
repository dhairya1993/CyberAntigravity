import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TrustDisclaimer } from '@/components/scam-awareness/TrustDisclaimer';
import { ScamTypesThreatMap } from '@/components/scam-awareness/types/ScamTypesThreatMap';
import { ScamTypesExplorer } from '@/components/scam-awareness/types/ScamTypesExplorer';
import { ScamWarningPatterns } from '@/components/scam-awareness/types/ScamWarningPatterns';
import { ScamLearningPathTimeline } from '@/components/scam-awareness/types/ScamLearningPathTimeline';
import { ScamTypesCTA } from '@/components/scam-awareness/types/ScamTypesCTA';

export const metadata: Metadata = {
  title: 'Scam Types Explorer — Know the Scam. Spot the Pattern. | CyberAntigravity',
  description:
    'Explore the most common online scam categories, understand their warning signs, and learn how to respond safely. Search and filter by threat type to learn warning signs.',
  alternates: {
    canonical: 'https://cyberantigravity.com/scam-awareness/types',
  },
  openGraph: {
    title: 'Scam Types Explorer — Know the Scam. Spot the Pattern. | CyberAntigravity',
    description:
      'Explore the most common online scam categories, understand their warning signs, and learn how to respond safely.',
    url: 'https://cyberantigravity.com/scam-awareness/types',
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'article',
  },
};

export default function ScamTypesPage() {
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
        name: 'Scam Awareness',
        item: 'https://cyberantigravity.com/scam-awareness',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Scam Types',
        item: 'https://cyberantigravity.com/scam-awareness/types',
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Global Navigation */}
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* 1. PAGE HERO */}
        <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-18 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#070b14] to-[#05080e]">
          {/* Cyber grid & glow background */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a15_1px,transparent_1px),linear-gradient(to_bottom,#0f172a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
            aria-hidden={true}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none opacity-60"
            aria-hidden={true}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb: Home > Scam Awareness > Scam Types */}
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 sm:mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden={true} />
              <Link href="/scam-awareness" className="hover:text-cyan-400 transition-colors">
                Scam Awareness
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden={true} />
              <span className="text-cyan-400 font-medium" aria-current="page">
                Scam Types
              </span>
            </nav>

            {/* 2-Column Responsive Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column Copy */}
              <div className="lg:col-span-7 space-y-5">
                {/* Badge: SCAM AWARENESS • SCAM TYPES */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-800/80 bg-cyan-950/40 backdrop-blur-md shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden={true} />
                  <span className="text-xs font-semibold text-cyan-300 tracking-wider uppercase font-mono">
                    SCAM AWARENESS &bull; SCAM TYPES
                  </span>
                </div>

                {/* Main Headline: "Know the Scam. Spot the Pattern." */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  Know the Scam. <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200">
                    Spot the Pattern.
                  </span>
                </h1>

                {/* Supporting Text */}
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
                  Explore the most common online scam categories, understand their warning signs, and learn how to respond safely.
                </p>
              </div>

              {/* Right Column: Graphical "SCAM THREAT MAP" */}
              <div className="lg:col-span-5 w-full">
                <ScamTypesThreatMap />
              </div>
            </div>
          </div>
        </section>

        {/* Educational Trust Notice */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <TrustDisclaimer variant="card" />
        </div>

        {/* 2 & 3 & 4. SEARCH AREA + FILTER SYSTEM + 12 CATEGORY CARDS */}
        <ScamTypesExplorer />

        {/* 7. INTERACTIVE "WARNING PATTERNS" SECTION */}
        <ScamWarningPatterns />

        {/* 8. STUDENT LEARNING PATH */}
        <ScamLearningPathTimeline />

        {/* 9. FINAL CTA */}
        <ScamTypesCTA />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
