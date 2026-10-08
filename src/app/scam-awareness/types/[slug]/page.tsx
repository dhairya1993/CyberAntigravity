import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  Lock,
  ArrowRight,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import {
  SCAM_EXPLORER_CATEGORIES,
  ScamCategoryDetail,
} from '@/data/scamTypesExplorerData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SCAM_EXPLORER_CATEGORIES.filter((category) => category.slug !== 'phishing').map(
    (category) => ({
      slug: category.slug,
    })
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const scam = SCAM_EXPLORER_CATEGORIES.find((item) => item.slug === slug);

  if (!scam) {
    return {
      title: 'Scam Type Not Found | CyberAntigravity',
    };
  }

  return {
    title: `${scam.title} Scam Guide — Warning Signs, Response & Example | CyberAntigravity`,
    description: scam.shortDescription,
    alternates: {
      canonical: `https://cyberantigravity.com/scam-awareness/types/${scam.slug}`,
    },
  };
}

export default async function ScamTypeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const scam: ScamCategoryDetail | undefined = SCAM_EXPLORER_CATEGORIES.find(
    (item) => item.slug === slug
  );

  if (!scam) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Header Section */}
        <section className="relative pt-8 pb-12 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#070b14] to-[#05080e]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation: Home > Scam Awareness > Scam Types > [Title] */}
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden={true} />
              <Link href="/scam-awareness" className="hover:text-cyan-400 transition-colors">
                Scam Awareness
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden={true} />
              <Link href="/scam-awareness/types" className="hover:text-cyan-400 transition-colors">
                Scam Types
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden={true} />
              <span className="text-cyan-400 font-medium" aria-current="page">
                {scam.title}
              </span>
            </nav>

            {/* Title & Metadata Badges */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {scam.number}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${
                    scam.risk === 'CRITICAL'
                      ? 'border-rose-800/80 bg-rose-950/60 text-rose-300'
                      : 'border-amber-800/80 bg-amber-950/60 text-amber-300'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      scam.risk === 'CRITICAL' ? 'bg-rose-400 animate-pulse' : 'bg-amber-400'
                    }`}
                    aria-hidden={true}
                  />
                  {scam.risk === 'CRITICAL' ? 'CRITICAL RISK' : 'HIGH RISK'}
                </span>
                {scam.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono tracking-wide uppercase px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {scam.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
                {scam.shortDescription}
              </p>

              <div className="pt-2">
                <Link
                  href="/scam-awareness/types"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden={true} />
                  Back to Scam Types
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content Body: 4 Structured Sections */}
        <section className="py-12 bg-[#07090e]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* 1. What Is This Scam? */}
            <div className="rounded-2xl border border-slate-800/90 bg-slate-950/80 p-6 sm:p-8 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Lock className="w-4 h-4" aria-hidden={true} />
                OVERVIEW
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                What is this scam?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                {scam.whatItIs}
              </p>
            </div>

            {/* 2. Common Warning Signs */}
            <div className="rounded-2xl border border-amber-900/40 bg-slate-950/80 p-6 sm:p-8 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" aria-hidden={true} />
                DETECTION SIGNALS
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Common warning signs
              </h2>
              <div className="grid grid-cols-1 gap-3 pt-1">
                {scam.warningSigns.map((sign, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/60"
                  >
                    <span className="w-6 h-6 rounded-md bg-amber-950/60 border border-amber-800/80 flex items-center justify-center shrink-0 text-amber-400 font-mono text-xs font-bold mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {sign}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Safe Response */}
            <div className="rounded-2xl border border-emerald-900/40 bg-slate-950/80 p-6 sm:p-8 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" aria-hidden={true} />
                DEFENSIVE ACTIONS
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Safe response
              </h2>
              <div className="grid grid-cols-1 gap-3 pt-1">
                {scam.safeResponse.map((resp, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/60"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden={true} />
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {resp}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Educational Fictional Example */}
            <div className="rounded-2xl border border-cyan-900/40 bg-slate-950/90 p-6 sm:p-8 backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <Terminal className="w-4 h-4" aria-hidden={true} />
                  EDUCATIONAL FICTIONAL EXAMPLE
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/50 border border-amber-800/60 px-2 py-0.5 rounded uppercase">
                  SIMULATED SCENARIO
                </span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#0d121e] p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                  <span>Channel: {scam.fictionalExample.channel}</span>
                  <span>Sender: {scam.fictionalExample.sender}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950/90 border border-amber-500/30 text-amber-200 text-sm font-mono leading-relaxed">
                  {scam.fictionalExample.simulatedMessage}
                </div>
                <div className="text-xs text-slate-300 leading-relaxed pt-1">
                  <strong className="text-slate-100 font-semibold font-sans">Key Deception Method: </strong>
                  {scam.fictionalExample.deceptionMethod}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 font-mono">
                * All names, numbers, and links are strictly fictional representations created solely for cybersecurity awareness.
              </p>
            </div>

            {/* Bottom Actions & Navigation Bar */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/scam-awareness/types"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden={true} />
                Back to Scam Types
              </Link>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  asLink
                  href="/scam-awareness/challenge"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" aria-hidden={true} />}
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  Test Skills in Challenge &rarr;
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
