import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PhishingLabInteractiveView } from '@/components/scam-awareness/phishing-lab/PhishingLabInteractiveView';

export const metadata: Metadata = {
  title: 'Can You Spot the Phish? Interactive Phishing Learning Lab | CyberAntigravity',
  description:
    'Interactive cybersecurity simulation lab. Inspect simulated deceptive messages, spot psychological red flags, analyze spoofed domains, and test defensive decision-making in a safe educational sandbox.',
  alternates: {
    canonical: 'https://cyberantigravity.com/scam-awareness/types/phishing',
  },
  openGraph: {
    title: 'Phishing Interactive Learning Lab | CyberAntigravity',
    description:
      'Practice spotting deceptive messages and fake banking alerts in a safe client-side cybersecurity lab.',
    url: 'https://cyberantigravity.com/scam-awareness/types/phishing',
    type: 'website',
  },
};

export default function PhishingLabPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      <Navbar />

      <main id="main-content" className="flex-1">
        <PhishingLabInteractiveView />
      </main>

      <Footer />
    </div>
  );
}
