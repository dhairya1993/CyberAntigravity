import React from 'react';
import {
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const CyberSafetyHero: React.FC = () => {
  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden border-b border-slate-800/80">
      {/* Background Ambience & Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 cyber-radial-glow pointer-events-none opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'Cyber Safety Hub' }]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Copy (Left / Top) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Factual Educational Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold tracking-wide shadow-sm shadow-cyan-500/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Practical Cyber Safety Education</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Cyber Safety Starts{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                With Awareness.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Learn how to recognize common online threats, protect your accounts, secure your devices, and make safer decisions online.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#safety-topics"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0 cyber-focus-ring"
              >
                <span>Explore Safety Topics</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#red-flags"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-white font-semibold text-sm transition-all duration-200 cyber-focus-ring"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Learn About Scams</span>
              </a>
            </div>

            {/* Clear Non-Deceptive Protection Mandate */}
            <div className="pt-2 flex items-start gap-3 text-xs text-slate-400 max-w-xl bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-slate-300 font-semibold">Educational Hub:</strong> CyberAntigravity teaches proactive defensive security knowledge. We do not claim or pretend to automatically protect your device or run remote scans.
              </p>
            </div>
          </div>

          {/* Hero Feature Matrix Card (Right) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/90 via-slate-950/80 to-slate-900/90 p-6 sm:p-7 backdrop-blur-md shadow-2xl shadow-black/60 relative overflow-hidden cyber-card-glow">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-5 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-cyan-950/90 border border-cyan-700/60 flex items-center justify-center text-cyan-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Cyber Safety Overview</h2>
                    <p className="text-[11px] text-slate-400">Global Citizen Digital Hygiene</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-medium">
                  Safety Guide
                </span>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 gap-3.5 py-5 border-b border-slate-800/80 text-left">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Core Domains</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-extrabold text-cyan-400 font-mono">10</span>
                    <span className="text-xs text-slate-300">Categories</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">Passwords to Wi-Fi</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Quick Checklist</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono">8</span>
                    <span className="text-xs text-slate-300">Habits</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">Daily best practices</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Common Red Flags</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-extrabold text-amber-400 font-mono">10</span>
                    <span className="text-xs text-slate-300">Red Flags</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">Spot active fraud</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Self-Assessment</span>
                  <div className="mt-1">
                    <span className="text-xs sm:text-sm font-bold text-teal-300 block">No Personal Data Required</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Runs in your browser</span>
                </div>
              </div>

              {/* Target Audience Bar */}
              <div className="pt-4 space-y-2">
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
                  Built For Everyday Users:
                </span>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                  <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60">Beginners</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60">Students</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60">Parents</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60">Employees</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60">Seniors</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60">Small Businesses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
