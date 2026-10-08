import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Scam Awareness Learning Hub Modular Components
import { ScamHubHero } from '@/components/scam-awareness/hub/ScamHubHero';
import { ScamHubStatsStrip } from '@/components/scam-awareness/hub/ScamHubStatsStrip';
import { ScamHubLearningPath } from '@/components/scam-awareness/hub/ScamHubLearningPath';
import { ScamHubFeaturedScenario } from '@/components/scam-awareness/hub/ScamHubFeaturedScenario';
import { ScamHubLearningJourney } from '@/components/scam-awareness/hub/ScamHubLearningJourney';
import { ScamHubSafetyNotice } from '@/components/scam-awareness/hub/ScamHubSafetyNotice';

export const metadata: Metadata = {
  title: {
    absolute: 'Scam Awareness Learning Hub — Spot the Scam. Protect Yourself. | CyberAntigravity',
  },
  description:
    'Learn how modern scams manipulate trust, urgency, and emotion — then practice identifying them through interactive scenarios. Choose your learning path with CyberAntigravity.',
  alternates: {
    canonical: 'https://cyberantigravity.com/scam-awareness',
  },
  openGraph: {
    title: 'Scam Awareness Learning Hub — Spot the Scam. Protect Yourself. | CyberAntigravity',
    description:
      'Learn how modern scams manipulate trust, urgency, and emotion — then practice identifying them through interactive scenarios.',
    url: 'https://cyberantigravity.com/scam-awareness',
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scam Awareness Learning Hub — Spot the Scam. Protect Yourself. | CyberAntigravity',
    description:
      'Learn how modern scams manipulate trust, urgency, and emotion — then practice identifying them through interactive scenarios.',
    creator: '@cyberantigravity',
  },
};

export default function ScamAwarenessPage() {
  // Breadcrumb Schema
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
        name: 'Scam Awareness',
        item: 'https://cyberantigravity.com/scam-awareness',
      },
    ],
  };

  // WebPage Schema
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://cyberantigravity.com/scam-awareness#webpage',
    url: 'https://cyberantigravity.com/scam-awareness',
    name: 'Scam Awareness Learning Hub — Spot the Scam. Protect Yourself.',
    description:
      'Learn how modern scams manipulate trust, urgency, and emotion — then practice identifying them through interactive scenarios.',
    publisher: {
      '@type': 'Organization',
      name: 'CyberAntigravity',
      url: 'https://cyberantigravity.com',
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

      {/* Global Navigation (Unchanged) */}
      <Navbar />

      {/* Main Scam Awareness Hub */}
      <main id="main-content" className="flex-1">
        {/* 1 & 2. Top Breadcrumb & Hero Section */}
        <ScamHubHero />

        {/* 3. Quick Stats / Trust Strip */}
        <ScamHubStatsStrip />

        {/* 4. Main Learning Path (Exactly 6 Interactive Cards) */}
        <ScamHubLearningPath />

        {/* 5. Featured Interactive Area (Realistic UI Mockup + 3 Warning Indicators) */}
        <ScamHubFeaturedScenario />

        {/* 6. Learning Flow (LEARN → IDENTIFY → PRACTICE → CHALLENGE → MASTER) */}
        <ScamHubLearningJourney />

        {/* 7. Safety / Privacy Notice */}
        <ScamHubSafetyNotice />
      </main>

      {/* Global Footer (Unchanged) */}
      <Footer />
    </div>
  );
}
