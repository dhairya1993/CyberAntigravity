import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata = {
  title: 'Responsible Disclosure | CyberAntigravity',
  description: 'Responsible vulnerability disclosure policy and security contact information.',
};

export default function DisclosurePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Breadcrumbs items={[{ label: 'Responsible Disclosure' }]} className="mb-6" />

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Responsible Vulnerability Disclosure
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">Last Updated: October 2026</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300">
            <span className="font-semibold text-white">Guidelines for Researchers:</span> We welcome responsible reports from security researchers and the global cybersecurity community.
          </div>

          <section className="space-y-4 pt-4 text-slate-300 leading-relaxed text-sm">
            <h2 className="text-xl font-bold text-white">1. Reporting a Finding</h2>
            <p>
              If you discover a security vulnerability or bug in our website infrastructure, please report it to our security team via email at{' '}
              <a href="mailto:contact@cyberantigravity.com" className="text-cyan-400 underline">
                contact@cyberantigravity.com
              </a>. Please include detailed steps to reproduce the issue.
            </p>

            <h2 className="text-xl font-bold text-white pt-4">2. Safe Harbor Commitment</h2>
            <p>
              We commit to not pursuing legal action against researchers who act in good faith, avoid violating user privacy, do not disrupt platform availability (no DoS/DDoS), and give us reasonable time to remediate before public disclosure.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-800">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
