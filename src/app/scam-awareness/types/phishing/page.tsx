import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PhishingLabInteractiveView } from '@/components/scam-awareness/phishing-lab/PhishingLabInteractiveView';
import { SITE_URL } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Can You Spot the Phish? Interactive Phishing Learning Lab',
  description:
    'Interactive cybersecurity simulation lab. Inspect simulated deceptive messages, spot psychological red flags, analyze spoofed domains, and test defensive decision-making in a safe educational sandbox.',
  alternates: {
    canonical: '/scam-awareness/types/phishing',
  },
  openGraph: {
    title: 'Can You Spot the Phish? Interactive Phishing Learning Lab | CyberAntigravity',
    description:
      'Practice spotting deceptive messages and fake banking alerts in a safe client-side cybersecurity lab.',
    url: `${SITE_URL}/scam-awareness/types/phishing`,
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/scam-awareness/types/phishing/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Can You Spot the Phish? Interactive Phishing Learning Lab — CyberAntigravity',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can You Spot the Phish? Interactive Phishing Learning Lab | CyberAntigravity',
    description:
      'Practice spotting deceptive messages and fake banking alerts in a safe client-side cybersecurity lab.',
    creator: '@cyberantigravity',
    images: [
      {
        url: `${SITE_URL}/scam-awareness/types/phishing/twitter-image`,
        width: 1200,
        height: 630,
        alt: 'Can You Spot the Phish? Interactive Phishing Learning Lab — CyberAntigravity',
      },
    ],
  },
};

export default function PhishingLabPage() {
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
        name: 'Scam Types',
        item: `${SITE_URL}/scam-awareness/types`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Phishing',
        item: `${SITE_URL}/scam-awareness/types/phishing`,
      },
    ],
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/scam-awareness/types/phishing#webpage`,
    url: `${SITE_URL}/scam-awareness/types/phishing`,
    name: 'Can You Spot the Phish? Interactive Phishing Learning Lab',
    description:
      'Interactive cybersecurity simulation lab. Inspect simulated deceptive messages, spot psychological red flags, analyze spoofed domains, and test defensive decision-making in a safe educational sandbox.',
    publisher: {
      '@type': 'Organization',
      name: 'CyberAntigravity',
      url: SITE_URL,
    },
    inLanguage: 'en-US',
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
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
        <PhishingLabInteractiveView />
      </main>

      <Footer />
    </div>
  );
}
