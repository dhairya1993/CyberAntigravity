import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata = {
  title: 'Terms of Service | CyberAntigravity',
  description: 'Terms of Service and defensive education code of conduct for CyberAntigravity.',
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Breadcrumbs items={[{ label: 'Terms of Service' }]} className="mb-6" />

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Terms of Service
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">Last Updated: October 2026</p>
            </div>
          </div>

          <section className="space-y-4 pt-4 text-slate-300 leading-relaxed text-sm">
            <h2 className="text-xl font-bold text-white">1. Defensive Purpose Mandate</h2>
            <p>
              CyberAntigravity is designed solely for defensive cybersecurity education, ethical learning, and digital fraud awareness. By accessing our resources, you agree to use all knowledge, tools, and curricula solely to defend systems, protect personal data, and cultivate ethical security practices.
            </p>

            <h2 className="text-xl font-bold text-white pt-4">2. Prohibited Exploitation</h2>
            <p>
              You agree never to use information or concepts from CyberAntigravity to attempt unauthorized access, conduct denial-of-service attacks, reverse-engineer third-party private systems, or engage in extortion or cybercrime.
            </p>

            <h2 className="text-xl font-bold text-white pt-4">3. Educational Disclaimers</h2>
            <p>
              All materials, tool demonstrations, and articles are provided &ldquo;as is&rdquo; for educational purposes only. CyberAntigravity does not guarantee that following any guidance will achieve 100% security against all future cyber threats.
            </p>

            <h2 className="text-xl font-bold text-white pt-4">4. Inquiries</h2>
            <p>
              For legal or terms questions, email us at{' '}
              <a href="mailto:contact@cyberantigravity.com" className="text-cyan-400 underline">
                contact@cyberantigravity.com
              </a>.
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
