import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Heart,
  Lock,
  Globe2,
  Users,
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Mail,
  FileCheck,
  Eye,
  GraduationCap,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About CyberAntigravity — Mission, Ethics & Trust Mandate',
  description:
    'Learn why CyberAntigravity was founded: democratizing defensive cybersecurity education, scam awareness, and ethical digital literacy for everyone worldwide.',
  alternates: {
    canonical: 'https://cyberantigravity.com/about',
  },
  openGraph: {
    title: 'About CyberAntigravity — Mission, Ethics & Trust Mandate',
    description:
      'Learn why CyberAntigravity was founded: democratizing defensive cybersecurity education, scam awareness, and ethical digital literacy for everyone worldwide.',
    url: 'https://cyberantigravity.com/about',
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CyberAntigravity — Mission, Ethics & Trust Mandate',
    description:
      'Democratizing defensive cybersecurity education, scam awareness, and ethical digital literacy.',
    creator: '@cyberantigravity',
  },
};

export default function AboutPage() {
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
        name: 'About',
        item: 'https://cyberantigravity.com/about',
      },
    ],
  };

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About CyberAntigravity',
    url: 'https://cyberantigravity.com/about',
    description:
      'Global cybersecurity education and online safety platform empowering individuals with proactive digital defense, scam awareness, and ethical security literacy.',
    publisher: {
      '@type': 'Organization',
      name: 'CyberAntigravity',
      url: 'https://cyberantigravity.com',
      logo: 'https://cyberantigravity.com/brand/cyberantigravity-logo.png',
    },
  };

  const pillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title: 'Defensive-First Education',
      description:
        'We focus exclusively on defense, risk reduction, and recognizing deception. We never teach offensive exploitation or weaponized attack methods.',
    },
    {
      icon: <Lock className="w-6 h-6 text-emerald-400" />,
      title: 'Zero-Telemetry Learner Privacy',
      description:
        'All tools—from password entropy calculators to URL structure decoders—execute 100% in your local browser memory. No inputs are stored or transmitted.',
    },
    {
      icon: <Compass className="w-6 h-6 text-amber-400" />,
      title: 'Practical, Real-World Clarity',
      description:
        'Cybersecurity is too often hidden behind dense enterprise jargon. We explain complex technical concepts with visual models, diagrams, and realistic scenarios.',
    },
    {
      icon: <Globe2 className="w-6 h-6 text-purple-400" />,
      title: 'Free, Unbiased & Accessible',
      description:
        'We do not accept commercial tracking pixels or paid product endorsements that compromise objective educational integrity. Security literacy is a public good.',
    },
  ];

  const audiences = [
    {
      icon: <Users className="w-5 h-5 text-cyan-400" />,
      title: 'Everyday Internet Users',
      desc: 'Clear, jargon-free habits to avoid credential theft, fake shopping portals, and fraudulent payment traps.',
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-emerald-400" />,
      title: 'Students & Beginners',
      desc: 'Structured foundational roadmaps covering networking, web safety, the CIA triad, and ethical security literacy.',
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-400" />,
      title: 'Families & Older Adults',
      desc: 'Proactive safeguards against tech-support scams, emergency imposter calls, remote-access coercion, and phishing.',
    },
    {
      icon: <FileCheck className="w-5 h-5 text-purple-400" />,
      title: 'Small Businesses & Teams',
      desc: 'Practical operational security checklists, wire fraud countermeasures, and employee phishing awareness guidance.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* Schema Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#070b14] to-[#05080e] overflow-hidden">
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#0e1726_1px,transparent_1px),linear-gradient(to_bottom,#0e1726_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <Breadcrumbs items={[{ label: 'About CyberAntigravity' }]} className="mb-2" />

            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/80 bg-cyan-950/60 text-cyan-300 text-xs font-mono uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                ABOUT CYBERANTIGRAVITY
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Rise Above <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-300">
                  Online Threats.
                </span>
              </h1>

              <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
                CyberAntigravity is an independent cybersecurity education and online scam-awareness platform.
                We believe digital safety is a fundamental life skill in the modern world—not a luxury reserved for technical specialists.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement Callout */}
        <section className="py-12 bg-slate-950/50 border-b border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-cyan-950/20 to-slate-900/90 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Eye className="w-4 h-4" />
                <span>Our Core Mandate</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Democratizing Defensive Security for Everyone
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Online scams, social engineering, and account takeovers cost everyday people billions of dollars annually while causing immense stress and emotional distress. Traditional cybersecurity advice is often either overly theoretical, condescending, or commercially biased. CyberAntigravity provides transparent, visual, hands-on learning resources so anyone can build confidence, recognize deceptive patterns, and protect their digital life.
              </p>
            </div>
          </div>
        </section>

        {/* 4 Guiding Pillars */}
        <section className="py-16 md:py-24 border-b border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Principles of Action
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                What Guides Everything We Build
              </h2>
              <p className="text-sm text-slate-400">
                Four core commitments that define our curriculum, educational tools, and community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="py-16 md:py-24 bg-slate-950/40 border-b border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Audience & Purpose
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Built for Everyone Who Uses the Internet
              </h2>
              <p className="text-sm text-slate-400">
                Whether you are checking your first bank account or studying for an entry-level security certificate, our content meets you where you are.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {audiences.map((aud) => (
                <div
                  key={aud.title}
                  className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      {aud.icon}
                    </div>
                    <h3 className="text-base font-bold text-white">{aud.title}</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{aud.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ethical Standards & Disclaimers */}
        <section className="py-16 md:py-24 border-b border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                Integrity & Transparency
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Educational Disclaimers & Ethics
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Defensive and Ethical Use Only</span>
                </div>
                <p>
                  All concepts, simulation sandboxes, and threat analyses on CyberAntigravity are designed strictly for educational defense, system hardening, and awareness. We prohibit using our content for unauthorized penetration testing, credential interception, or malicious activities.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>No Guarantee of 100% Security</span>
                </div>
                <p>
                  In cybersecurity, absolute 100% immunity does not exist. Our tools and guides demonstrate proven defensive habits, but cannot guarantee protection against all advanced persistent threats or unknown zero-day vulnerabilities.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 text-xs font-mono">
              <Link
                href="/disclaimer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                Security Disclaimer &rarr;
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                href="/privacy"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                Privacy Policy &rarr;
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                href="/terms"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                Terms of Service &rarr;
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                href="/disclosure"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                Responsible Disclosure &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Contact & Explore Navigation */}
        <section className="py-16 md:py-20 bg-slate-950/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Strengthen Your Digital Defense?
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Explore our core learning sections, test interactive defensive tools, or contact our team with questions and suggestions.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button
                asLink
                href="/cyber-safety"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Cyber Safety Guide
              </Button>
              <Button
                asLink
                href="/scam-awareness"
                variant="outline"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Scam Awareness Hub
              </Button>
              <Button
                asLink
                href="/tools"
                variant="outline"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Defensive Tools
              </Button>
            </div>

            <div className="pt-6 text-xs text-slate-400 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Reach our editorial team at</span>
              <a
                href="mailto:contact@cyberantigravity.com"
                className="text-cyan-400 hover:underline font-mono"
              >
                contact@cyberantigravity.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
