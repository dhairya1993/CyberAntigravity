import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToolsHero } from '@/components/tools/ToolsHero';
import { ToolsDirectory } from '@/components/tools/ToolsDirectory';
import { ToolDisclaimer } from '@/components/tools/ToolDisclaimer';
import { PasswordStrengthTool } from '@/components/tools/PasswordStrengthTool';
import { UrlExplainerTool } from '@/components/tools/UrlExplainerTool';
import Link from 'next/link';
import { ArrowRight, Shield, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Cybersecurity Tools for Safer Digital Habits | CyberAntigravity',
  description:
    'Explore free browser-based cybersecurity tools for password hygiene, URL structure, security headers, cyber hygiene and online safety.',
  alternates: {
    canonical: 'https://cyberantigravity.com/tools',
  },
  openGraph: {
    title: 'Free Cybersecurity Tools for Safer Digital Habits | CyberAntigravity',
    description:
      'Explore free browser-based cybersecurity tools for password hygiene, URL structure, security headers, cyber hygiene and online safety.',
    url: 'https://cyberantigravity.com/tools',
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Cybersecurity Tools for Safer Digital Habits | CyberAntigravity',
    description:
      'Explore free browser-based cybersecurity tools for password hygiene, URL structure, security headers, cyber hygiene and online safety.',
    creator: '@cyberantigravity',
  },
};

export default function ToolsHubPage() {
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
        name: 'Cybersecurity Tools Hub',
        item: 'https://cyberantigravity.com/tools',
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* Structured Breadcrumbs Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <main className="flex-1">
        {/* 1. Tools Hero */}
        <ToolsHero />

        {/* 2. Full Directory with Search & Category Filters */}
        <ToolsDirectory />

        {/* 3. Featured Interactive Quick Tools Section */}
        <section className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Instant Browser Utilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Featured Client-Side Utilities
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Evaluate password entropy and dissect suspicious URL structures directly on this page or visit their dedicated standalone tool pages.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Quick Tool 1: Password Strength */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-cyan-400" />
                    <span>Password Strength Educator</span>
                  </h3>
                  <Link
                    href="/tools/password-strength"
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
                  >
                    <span>Full Page View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <PasswordStrengthTool />
              </div>

              {/* Quick Tool 2: URL Explainer */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <span>URL Structure Explainer</span>
                  </h3>
                  <Link
                    href="/tools/url-explainer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
                  >
                    <span>Full Page View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <UrlExplainerTool />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Global Tool Disclaimer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ToolDisclaimer />
        </div>
      </main>

      <Footer />
    </div>
  );
}
