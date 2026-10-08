import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, Target } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TrustDisclaimer } from '@/components/scam-awareness/TrustDisclaimer';
import { ScamChallenge } from '@/components/scam-awareness/ScamChallenge';
import { ScamQuiz } from '@/components/scam-awareness/ScamQuiz';

export const metadata: Metadata = {
  title: 'Scam Challenge — Test Your Scam Detection IQ | CyberAntigravity',
  description:
    'Test your scam-detection skills through progressively harder scenarios and evaluate your defensive reflexes.',
  alternates: {
    canonical: 'https://cyberantigravity.com/scam-awareness/challenge',
  },
};

export default function ScamChallengePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-orange-500/30 selection:text-white">
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
              <span className="text-orange-400 font-medium" aria-current="page">
                Scam Challenge
              </span>
            </nav>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-800/80 bg-orange-950/40 text-orange-300 text-xs font-mono uppercase tracking-wider">
                <Target className="w-3.5 h-3.5 text-orange-400" aria-hidden="true" />
                SKILL EVALUATION
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Scam Challenge
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Test your scam-detection skills through progressively harder scenarios.
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

        {/* 1. Scam Challenge: 5 Progressive Scenarios + Pause Principle */}
        <ScamChallenge />

        {/* 2. Interactive Scam Quiz */}
        <ScamQuiz />
      </main>

      <Footer />
    </div>
  );
}
