import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata = {
  title: 'Privacy Policy | CyberAntigravity',
  description: 'Learn about our transparent privacy policy and defensive education mandate.',
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} className="mb-6" />

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">Last Updated: October 2026</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300">
            <span className="font-semibold text-white">Our Core Commitment:</span> CyberAntigravity is built on public cybersecurity education. We do not sell user data, run third-party advertising trackers, or monetize visitor vulnerabilities.
          </div>

          <section className="space-y-4 pt-4 text-slate-300 leading-relaxed text-sm">
            <h2 className="text-xl font-bold text-white">1. Information We Do Not Collect</h2>
            <p>
              When you browse CyberAntigravity, we do not require user account registration, credit cards, or tracking cookies. All client-side tools (such as the Password Entropy Calculator and URL Pattern Simulator) execute strictly in your local browser memory. No inputs are sent to our servers.
            </p>

            <h2 className="text-xl font-bold text-white pt-4">2. Voluntary Information</h2>
            <p>
              If you voluntarily choose to subscribe to our Threat Advisory Dispatch, we collect only your submitted email address. This email is used exclusively to send educational security updates and advisory notes. You can unsubscribe at any time with one click.
            </p>

            <h2 className="text-xl font-bold text-white pt-4">3. Third-Party Trackers & Ads</h2>
            <p>
              CyberAntigravity does not host commercial display advertising networks or behavioral remarketing pixels. We believe cybersecurity guidance should be unbiased, ad-free, and respectful of your privacy.
            </p>

            <h2 className="text-xl font-bold text-white pt-4">4. Contact & Inquiries</h2>
            <p>
              If you have any questions or data privacy requests, contact us directly at{' '}
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
