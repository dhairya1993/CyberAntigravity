'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  KeyRound,
  MailWarning,
  UserX,
  ShieldCheck,
  EyeOff,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SAFETY_PILLARS } from '@/data/safetyTopics';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { DigitalDefenseSurface } from '@/components/visuals/DigitalDefenseSurface';
import { VISUAL_SECURITY_TOPICS, VisualTopicCard } from '@/components/visuals/VisualTopicCard';

export const CyberSafetySection: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState(SAFETY_PILLARS[0].id);

  // Simple interactive hygiene checklist
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    mfa: true,
    passwords: true,
    updates: false,
    lock: true,
    backups: false,
  });

  const toggleCheck = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalChecks = Object.keys(checklist).length;
  const passedChecks = Object.values(checklist).filter(Boolean).length;
  const scorePercent = Math.round((passedChecks / totalChecks) * 100);

  const iconMap: Record<string, React.ReactNode> = {
    KeyRound: <KeyRound className="w-6 h-6 text-cyan-400" />,
    MailWarning: <MailWarning className="w-6 h-6 text-cyan-400" />,
    UserX: <UserX className="w-6 h-6 text-cyan-400" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
    EyeOff: <EyeOff className="w-6 h-6 text-cyan-400" />,
    Laptop: <Laptop className="w-6 h-6 text-cyan-400" />,
  };

  const activePillar = SAFETY_PILLARS.find((p) => p.id === selectedPillarId) || SAFETY_PILLARS[0];

  return (
    <section id="cyber-safety" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Cyber Safety Foundations"
          badgeVariant="cyan"
          title="Master Essential Digital Self-Defense"
          description="Cyber threats evolve constantly, but 90% of successful attacks exploit fundamental lapses in daily digital hygiene. Learn the six foundational pillars of personal and institutional safety."
        />

        {/* Interactive Digital Defense Surface */}
        <div className="mb-14">
          <DigitalDefenseSurface />
        </div>

        {/* 6 Pillars Interactive Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SAFETY_PILLARS.map((pillar) => {
            const isSelected = pillar.id === selectedPillarId;
            return (
              <div
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    {iconMap[pillar.iconName]}
                  </div>
                  <Badge variant={isSelected ? 'cyan' : 'outline'} size="sm">
                    {pillar.readTime}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {pillar.shortDesc}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className={`font-semibold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {isSelected ? 'Currently Viewing' : 'Click to View Guide'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Pillar Deep Dive Drawer/Card */}
        <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-md p-6 sm:p-10 mb-16 cyber-card-glow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <Badge variant="cyan" dot size="sm">Deep-Dive Overview</Badge>
                <span className="text-xs text-slate-400 font-mono">{activePillar.readTime}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {activePillar.title}
              </h3>

              <p className="text-base text-slate-300 leading-relaxed">
                {activePillar.fullDesc}
              </p>

              {/* Best Practices Checklist */}
              <div className="space-y-3 pt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Defensive Best Practices:
                </h4>
                {activePillar.bestPractices.map((bp, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Primary Threat Vectors:
              </h4>

              <div className="space-y-3">
                {activePillar.threats.map((threat, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                    <span>{threat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
                <span className="font-semibold text-slate-300">Defense Rule:</span> Treat credentials and personal communications as zero-trust channels until verified out-of-band.
              </div>
            </div>
          </div>
        </div>

        {/* Build Your Cyber Defense - Visual Topic Cards */}
        <div className="mb-16 space-y-6 text-left">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              Curated Defense Pillars
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Build Your Personal Cyber Defense
            </h3>
            <p className="text-sm text-slate-300">
              Interactive guides with difficulty ratings and completion tracking across all foundational threat domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {VISUAL_SECURITY_TOPICS.map((topic) => (
              <VisualTopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>

        {/* Educational Self-Assessment Checklist */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="cyan" dot size="sm">Self-Assessment Guide</Badge>
              </div>
              <h3 className="text-xl font-bold text-white">Digital Safety Self-Assessment</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Check off your current security habits to review areas where you can improve your defensive baseline. (Educational self-assessment only — no device data is collected or monitored).
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-900 px-5 py-3 rounded-xl border border-slate-800 shrink-0">
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-mono">Completed Habits</span>
                <span className={`text-2xl font-bold font-mono ${
                  scorePercent >= 80 ? 'text-emerald-400' : scorePercent >= 60 ? 'text-cyan-400' : 'text-amber-400'
                }`}>
                  {passedChecks}/{totalChecks} ({scorePercent}%)
                </span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {[
              { id: 'mfa', label: 'MFA enabled on all primary accounts (email, banking)' },
              { id: 'passwords', label: 'Use a password manager with zero password reuse' },
              { id: 'updates', label: 'Automatic OS & app security updates turned ON' },
              { id: 'lock', label: 'Biometrics / PIN lock set on mobile and laptop' },
              { id: 'backups', label: 'Encrypted off-site or cloud backups maintained weekly' },
            ].map((check) => (
              <label
                key={check.id}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer select-none transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checklist[check.id] || false}
                  onChange={() => toggleCheck(check.id)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-400 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-slate-300 leading-snug">{check.label}</span>
              </label>
            ))}
          </div>

          {/* Full Pillar Portal Link */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold text-white">Looking for the Complete Cyber Safety Hub?</h4>
              <p className="text-xs text-slate-300">
                Explore all 10 domain breakdowns, 10 scam red flags, emergency response protocol, and interactive self-assessment.
              </p>
            </div>
            <Link
              href="/cyber-safety"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide transition-colors shrink-0 shadow-md shadow-cyan-500/20"
            >
              <span>Visit Cyber Safety Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
