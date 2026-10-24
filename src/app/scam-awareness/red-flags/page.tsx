import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TrustDisclaimer } from '@/components/scam-awareness/TrustDisclaimer';
import { RedFlagAnalyzer } from '@/components/scam-awareness/RedFlagAnalyzer';
import { CommonRedFlagsChecklist } from '@/components/scam-awareness/CommonRedFlagsChecklist';
import { SITE_URL } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Spot Scam Red Flags — Interactive Warning Signs Guide',
  description:
    'Learn how to identify suspicious messages, deceptive domains, artificial urgency, and social-engineering red flags before clicking.',
  alternates: {
    canonical: '/scam-awareness/red-flags',
  },
  openGraph: {
    title: 'Spot Scam Red Flags — Interactive Warning Signs Guide | CyberAntigravity',
    description:
      'Learn how to identify suspicious messages, deceptive domains, artificial urgency, and social-engineering red flags before clicking.',
    url: `${SITE_URL}/scam-awareness/red-flags`,
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Spot Scam Red Flags — Interactive Warning Signs Guide | CyberAntigravity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spot Scam Red Flags — Interactive Warning Signs Guide | CyberAntigravity',
    description:
      'Learn how to identify suspicious messages, deceptive domains, artificial urgency, and social-engineering red flags before clicking.',
    creator: '@cyberantigravity',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function ScamRedFlagsPage() {
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
        name: 'Spot the Red Flags',
        item: `${SITE_URL}/scam-awareness/red-flags`,
      },
    ],
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/scam-awareness/red-flags#webpage`,
    url: `${SITE_URL}/scam-awareness/red-flags`,
    name: 'Spot Scam Red Flags — Interactive Warning Signs Guide',
    description:
      'Learn how to identify suspicious messages, deceptive domains, artificial urgency, and social-engineering red flags before clicking.',
    publisher: {
      '@type': 'Organization',
      name: 'CyberAntigravity',
      url: SITE_URL,
    },
    inLanguage: 'en-US',
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
              <span className="text-amber-400 font-medium" aria-current="page">
                Spot the Red Flags
              </span>
            </nav>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-800/80 bg-amber-950/40 text-amber-300 text-xs font-mono uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                DETECTION GUIDE
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Spot the Red Flags
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Learn how to identify suspicious messages, links, requests, and social-engineering signals before you react.
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

        {/* 1. Interactive SMS / Message Red Flag Analyzer */}
        <RedFlagAnalyzer />

        {/* 2. Common Scam Red Flags Checklist */}
        <CommonRedFlagsChecklist />
      </main>

      <Footer />
    </div>
  );
}
