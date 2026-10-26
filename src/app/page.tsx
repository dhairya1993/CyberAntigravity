import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import dynamic from 'next/dynamic';
// AttackPathSection dynamically imported below
import { DigitalDefenseSection } from '@/components/sections/DigitalDefenseSection';
import { CyberLabPreviewSection } from '@/components/sections/CyberLabPreviewSection';
import { StudentExperienceSection } from '@/components/sections/StudentExperienceSection';
import { SecurityToolsPreviewSection } from '@/components/sections/SecurityToolsPreviewSection';
import { WhyCyberAntigravitySection } from '@/components/sections/WhyCyberAntigravitySection';

// Code-split below-the-fold interactive components with SSR preserved for SEO
const AttackPathSection = dynamic(
  () => import('@/components/sections/AttackPathSection').then((m) => m.AttackPathSection)
);
const ThreatLandscapeSection = dynamic(
  () => import('@/components/sections/ThreatLandscapeSection').then((m) => m.ThreatLandscapeSection)
);
const VisualStorytellingTransitions = dynamic(
  () => import('@/components/visuals/VisualStorytellingTransitions').then((m) => m.VisualStorytellingTransitions)
);
const CyberIQPreviewSection = dynamic(
  () => import('@/components/sections/CyberIQPreviewSection').then((m) => m.CyberIQPreviewSection)
);
const LearningRoadmapPreviewSection = dynamic(
  () => import('@/components/sections/LearningRoadmapPreviewSection').then((m) => m.LearningRoadmapPreviewSection)
);
const ScamSpotterPreviewSection = dynamic(
  () => import('@/components/sections/ScamSpotterPreviewSection').then((m) => m.ScamSpotterPreviewSection)
);
const MissionSection = dynamic(
  () => import('@/components/sections/MissionSection').then((m) => m.MissionSection)
);
import { LatestGuidesSection } from '@/components/sections/LatestGuidesSection';
import { AiCyberFutureSection } from '@/components/sections/AiCyberFutureSection';
import { TrustNoticeSection } from '@/components/sections/TrustNoticeSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    absolute: 'CyberAntigravity — Free Cybersecurity Learning Platform & Scam Awareness Hub',
  },
  description:
    'Master practical digital defense, recognize online scams, test password strength, and simulate real-world cyber attacks with CyberAntigravity. Free, interactive cybersecurity education for everyone.',
  alternates: {
    canonical: '/',
  },
  keywords: [
    'free cybersecurity course',
    'online scam awareness',
    'phishing simulator',
    'password generator online',
    'digital hygiene guide',
    'how to prevent cyber attacks',
    'cybersecurity for students',
    'interactive cyber lab',
    'cyber security training',
    'scam spotter tool',
  ],
  openGraph: {
    title: 'CyberAntigravity — Learn Cybersecurity & Defend Against Online Scams',
    description:
      'Interactive cybersecurity learning platform. Visualize cyber attack chains, spot deceptive phishing scams, and master practical digital defense with zero friction.',
    url: '/',
    siteName: 'CyberAntigravity',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CyberAntigravity Cybersecurity Education & Threat Defense Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CyberAntigravity — Free Cybersecurity Learning & Scam Awareness',
    description:
      'Interactive visual cybersecurity learning platform. Explore live attack chains, spot phishing scams, and test digital hygiene.',
    images: ['/og-image.png'],
  },
};

const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is CyberAntigravity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CyberAntigravity is a 100% free, interactive cybersecurity education platform designed to help students, developers, and internet users learn digital safety, recognize online scams, and build defense skills through hands-on simulators.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I recognize an online scam or phishing email?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Look for urgent or coercive language, spoofed email domains, unexpected attachments, mismatched URLs, and requests for sensitive credentials or OTPs. Use CyberAntigravity’s interactive Scam Spotter and URL Explainer to inspect suspicious patterns safely.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the security tools on CyberAntigravity free and private?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All tools on CyberAntigravity—including the Password Generator, Password Strength Meter, Security Headers Inspector, and URL Explainer—are completely free and run client-side in your web browser. No sensitive user data is ever stored or transmitted to external servers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I start learning cybersecurity as a beginner?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start with foundational concepts such as password security, multi-factor authentication (MFA), and phishing detection on our Cyber Defense roadmap, then progress to network security, malware analysis, and cloud defense in our interactive Cyber Lab.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can CyberAntigravity help protect me from cyber attacks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CyberAntigravity equips you with practical threat visualization, real-world attack chain comprehension, and defensive habits so you can identify malicious tactics, secure your digital accounts, and prevent social engineering attacks.',
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* Homepage FAQ Rich Snippets for Google Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />

      {/* Global Navigation */}
      <Navbar />

      {/* Main Content Sections:
          SEE A THREAT → UNDERSTAND THE ATTACK → MAKE A DECISION → LEARN THE DEFENSE → BUILD SECURITY SKILLS
      */}
      <main className="flex-1">
        {/* 1. Hero Section & Cyber Defense Command Center */}
        <HeroSection />

        {/* 2. SEE A THREAT — Section 1: Cyber Threat Gallery (6 Custom Interactive Vector Cards) */}
        <ThreatLandscapeSection />

        {/* 3. VISUAL STORYTELLING — Section 8: Graphical Transitions (Threat -> Decision -> Defense) */}
        <VisualStorytellingTransitions />

        {/* 4. UNDERSTAND THE ATTACK — Section 2: Attack → Defense Simulator (Path A vs Path B) */}
        <AttackPathSection />

        {/* 5. MAKE A DECISION — Section 6: Cyber IQ Challenge & Section 7: Security Skill Meter */}
        <CyberIQPreviewSection />

        {/* 6. LEARN THE DEFENSE — Section 3: Cyber Defense Shield (Central Shield & 8 Layers) */}
        <DigitalDefenseSection />

        {/* 7. PRACTICE IN SANDBOX — Section 5: Cyber Lab Preview (Laptop + Terminal + Nodes) */}
        <CyberLabPreviewSection />

        {/* 8. BUILD SECURITY SKILLS — Section 4: Student Cybersecurity Roadmap (8 Progressive Stages) */}
        <LearningRoadmapPreviewSection />

        {/* 9. Scam Spotter Interactive Sandbox */}
        <ScamSpotterPreviewSection />

        {/* 10. Student Interactive Experience Pillars */}
        <StudentExperienceSection />

        {/* 11. Practical Security Tools Preview */}
        <SecurityToolsPreviewSection />

        {/* 12. Why Learn With CyberAntigravity */}
        <WhyCyberAntigravitySection />

        {/* 12.5. Mission & Trust Mandate (About Anchor) */}
        <MissionSection />

        {/* 13. Latest Cybersecurity Guides */}
        <LatestGuidesSection />

        {/* 14. Where Cybersecurity Is Going (AI + Defense Future) */}
        <AiCyberFutureSection />

        {/* 15. Trust & Educational Disclaimer Notice */}
        <TrustNoticeSection />

        {/* 16. Final Call to Action */}
        <FinalCtaSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
