import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, Brain } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TrustDisclaimer } from '@/components/scam-awareness/TrustDisclaimer';
import { ScamAnatomyVisual } from '@/components/scam-awareness/ScamAnatomyVisual';
import { SocialEngineeringVisual } from '@/components/scam-awareness/SocialEngineeringVisual';
import { ScamFlow } from '@/components/scam-awareness/ScamFlow';
import { ScamAnatomy } from '@/components/scam-awareness/ScamAnatomy';
import { ScamAnatomyDiagram } from '@/components/visuals/ScamAnatomyDiagram';
import { SITE_URL } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'How Scams Work — The Psychology of Social Engineering',
  description:
    'Understand the psychology behind urgency, fear, authority, greed, curiosity, and trust in modern social-engineering schemes.',
  alternates: {
    canonical: '/scam-awareness/how-scams-work',
  },
  openGraph: {
    title: 'How Scams Work — The Psychology of Social Engineering | CyberAntigravity',
    description:
      'Understand the psychology behind urgency, fear, authority, greed, curiosity, and trust in modern social-engineering schemes.',
    url: `${SITE_URL}/scam-awareness/how-scams-work`,
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'How Scams Work — The Psychology of Social Engineering | CyberAntigravity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Scams Work — The Psychology of Social Engineering | CyberAntigravity',
    description:
      'Understand the psychology behind urgency, fear, authority, greed, curiosity, and trust in modern social-engineering schemes.',
    creator: '@cyberantigravity',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function HowScamsWorkPage() {
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
        name: 'Scam Awareness',
        item: `${SITE_URL}/scam-awareness`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How Scams Work',
        item: `${SITE_URL}/scam-awareness/how-scams-work`,
      },
    ],
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/scam-awareness/how-scams-work#webpage`,
    url: `${SITE_URL}/scam-awareness/how-scams-work`,
    name: 'How Scams Work — The Psychology of Social Engineering',
    description:
      'Understand the psychology behind urgency, fear, authority, greed, curiosity, and trust in modern social-engineering schemes.',
    publisher: {
      '@type': 'Organization',
      name: 'CyberAntigravity',
      url: SITE_URL,
    },
    inLanguage: 'en-US',
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-purple-500/30 selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Header Section */}
        <section className="relative pt-8 pb-12 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#070b14] to-[#05080e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
              <Link href="/scam-awareness" className="hover:text-cyan-400 transition-colors">
                Scam Awareness
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
              <span className="text-purple-400 font-medium" aria-current="page">
                How Scams Work
              </span>
            </nav>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-800/80 bg-purple-950/40 text-purple-300 text-xs font-mono uppercase tracking-wider">
                <Brain className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
                PSYCHOLOGY & ATTACK ANATOMY
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                How Scams Work
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Understand the psychology behind urgency, fear, authority, greed, curiosity, and trust.
              </p>
              <div className="pt-2">
                <Link
                  href="/scam-awareness"
                  className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  Back to Scam Awareness Hub
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Trust Notice */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <TrustDisclaimer variant="card" />
        </div>

        {/* 1. Scam Anatomy Visual: 6 Stages from Target to Disappear */}
        <ScamAnatomyVisual />

        {/* 2. Social Engineering Psychology Visual: Fear, Greed, Urgency, Authority */}
        <SocialEngineeringVisual />

        {/* 3. Scam Flow Architectural Diagram */}
        <div className="py-8 bg-slate-950/40 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScamAnatomyDiagram />
          </div>
        </div>

        {/* 4. Attack Flow Breakdown */}
        <ScamFlow />

        {/* 5. Psychological Deep Dive */}
        <ScamAnatomy />
      </main>

      <Footer />
    </div>
  );
}
