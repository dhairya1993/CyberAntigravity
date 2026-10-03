'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Heart,
  Lock,
  Globe,
  CheckCircle2,
  Mail,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const MissionSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }

    // Client-side confirmation state
    setSubmitted(true);
  };

  const audiences = [
    { title: 'Complete Beginners', desc: 'Demystifying security jargon into clear, practical daily digital hygiene.' },
    { title: 'Students & Educators', desc: 'Structured learning roadmaps and foundational principles of computing safety.' },
    { title: 'Families & Parents', desc: 'Guidance to safeguard children against online predators, cyberbullying, and account takeover.' },
    { title: 'Small Business Owners', desc: 'Essential operational safeguards, wire fraud defense, and employee phishing awareness.' },
    { title: 'IT & Security Learners', desc: 'Rigorous deep-dives into modern protocols, threat modeling, and defensive architecture.' },
    { title: 'Ethical Hacking Students', desc: 'Responsible vulnerability disclosure and defensive mindset cultivation.' },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative scroll-mt-20 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Our Mission & Trust Mandate"
          badgeVariant="emerald"
          title="Democratizing Cybersecurity Defense for Everyone"
          description="We founded CyberAntigravity on a single unwavering principle: online safety is a fundamental human right in the digital age, not a luxury reserved for enterprise cybersecurity budgets."
        />

        {/* 4 Core Pillars of Trust */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Built for Defensive Education</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We focus strictly on defensive techniques, digital hygiene, and ethical principles. We do not provide weaponized exploits or offensive attack tooling.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">No Commercial Ad Trackers</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              This website is built for public education. We do not run third-party advertising trackers, sell personal data, or monetize visitor information.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Clarity Over Fear</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              No fear-mongering or sensationalist marketing. We replace anxiety with actionable habits, verification protocols, and self-confidence.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Global Educational Access</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engineered with accessible semantic web standards so that cybersecurity literacy is understandable and accessible worldwide.
            </p>
          </div>
        </div>

        {/* Who We Empower Grid */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-10 mb-16">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="cyan" dot size="sm">Universal Scope</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white">Designed for Every Stage of the Digital Journey</h3>
            <p className="text-sm text-slate-400 mt-2">
              Whether you are locking down your grandmother&apos;s iPad or configuring enterprise DNSSEC, CyberAntigravity provides clear, grounded guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audiences.map((aud, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>{aud.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{aud.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Advisory Dispatch Subscription Form */}
        <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-8 sm:p-12 text-center max-w-3xl mx-auto cyber-card-glow">
          <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-700/80 text-cyan-400 mx-auto flex items-center justify-center mb-4">
            <Mail className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Stay Ahead of Emerging Cyber Threats
          </h3>

          <p className="text-sm text-slate-300 mt-2 max-w-xl mx-auto">
            Receive concise, bi-weekly threat intelligence dispatches detailing active phishing campaigns, critical security patches, and practical digital safety tips.
          </p>

          {submitted ? (
            <div className="mt-8 p-4 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-sm flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Thank you for subscribing! You are now enlisted for CyberAntigravity threat updates.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm cyber-focus-ring"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="shrink-0"
                >
                  Join Advisory
                </Button>
              </div>

              {error && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 text-left pt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{error}</span>
                </div>
              )}

              <p className="text-[11px] text-slate-500 mt-2">
                Zero spam. Zero third-party sharing. Encrypted delivery. Unsubscribe with one click anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
