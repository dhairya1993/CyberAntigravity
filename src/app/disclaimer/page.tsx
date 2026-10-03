import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata = {
  title: 'Security Disclaimer | CyberAntigravity',
  description: 'Educational disclaimer regarding cybersecurity guidance and tool simulations.',
};

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Breadcrumbs items={[{ label: 'Security Disclaimer' }]} className="mb-6" />

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-800 text-amber-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Security Disclaimer
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">Last Updated: October 2026</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300">
            <span className="font-semibold text-white">Summary:</span> All content, tools, and calculators on CyberAntigravity are designed for general public awareness and educational demonstration only.
          </div>

          <section className="space-y-4 pt-4 text-slate-300 leading-relaxed text-sm">
            <h2 className="text-xl font-bold text-white">1. Not Professional Cybersecurity Advice</h2>
            <p>
              The content provided across CyberAntigravity does not constitute formal legal, regulatory compliance (e.g., HIPAA, PCI-DSS, SOC 2), or enterprise incident response consulting. Organizations requiring specific compliance certifications or incident mitigation should engage certified security professionals.
            </p>

            <h2 className="text-xl font-bold text-white pt-4">2. Tool Simulation Accuracy</h2>
            <p>
              Interactive tools provided on this website (such as the Password Entropy Calculator and Deceptive URL Pattern Simulator) operate strictly within the client browser. They are mathematical and structural models designed to illustrate concepts; they do not guarantee protection against real-world zero-day vulnerabilities, active malware infections, or advanced persistent threats.
            </p>

            <h2 className="text-xl font-bold text-white pt-4">3. No Guarantee of 100% Security</h2>
            <p>
              In cybersecurity, absolute 100% security does not exist. Defense relies on layered defense-in-depth, continuous updates, and human vigilance. CyberAntigravity disclaims liability for any loss resulting from reliance on the educational materials on this site.
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
