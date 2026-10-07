'use client';

import React, { useState } from 'react';
import {
  Target,
  Handshake,
  Clock,
  Zap,
  CreditCard,
  LogOut,
  HelpCircle,
  ShieldCheck,
  GitCommit,
} from 'lucide-react';

interface ScamStage {
  stage: number;
  label: string;
  subtitle: string;
  psychologicalTechnique: string;
  defenseIntervention: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SCAM_STAGES: ScamStage[] = [
  {
    stage: 1,
    label: 'Target',
    subtitle: 'Reconnaissance & Selection',
    psychologicalTechnique: 'Attackers harvest phone numbers, emails, or job postings from data breaches, scraping tools, and social media to select prospective victims.',
    defenseIntervention: 'Minimize public personal data (PII) on social networks and decline unsolicited contact from unverified profiles.',
    icon: Target,
  },
  {
    stage: 2,
    label: 'Trust',
    subtitle: 'Rapport & Brand Spoofing',
    psychologicalTechnique: 'Borrowing institutional authority by copying bank logos, spoofing caller ID headers, or mirroring friendly conversational cadences.',
    defenseIntervention: 'Verify incoming identity out-of-band. Never assume a message is authentic just because it displays familiar colors or names.',
    icon: Handshake,
  },
  {
    stage: 3,
    label: 'Urgency',
    subtitle: 'Manufactured Crisis',
    psychologicalTechnique: 'Creates pressure so the target acts before verifying. Fabricating a 15-minute countdown bypasses deliberate analytical reasoning.',
    defenseIntervention: 'Deliberately pause. Artificial deadlines are the number-one signature indicator of social engineering deception.',
    icon: Clock,
  },
  {
    stage: 4,
    label: 'Action',
    subtitle: 'Compliance Trigger',
    psychologicalTechnique: 'Directing the target to click an obfuscated link, open a file attachment, install remote software, or stay on the phone.',
    defenseIntervention: 'Refuse to install unexpected utilities. Navigate to portals through independent browser bookmarks.',
    icon: Zap,
  },
  {
    stage: 5,
    label: 'Information / Money Request',
    subtitle: 'Extraction Phase',
    psychologicalTechnique: 'Soliciting one-time verification passcodes, account passwords, credit card numbers, wire transfers, or retail gift cards.',
    defenseIntervention: 'Zero-Sharing Rule: Never read out temporary authentication passcodes or transfer balances to "safe holding accounts".',
    icon: CreditCard,
  },
  {
    stage: 6,
    label: 'Exit / Disappear',
    subtitle: 'Severing Contact',
    psychologicalTechnique: 'The perpetrator deletes the chat account, launders transferred funds across multiple mixers, or blocks the victim completely.',
    defenseIntervention: 'Execute immediate emergency triage: freeze payment cards, notify official banking fraud desks, and report the incident.',
    icon: LogOut,
  },
];

export const ScamAnatomyVisual: React.FC = () => {
  const [selectedStageNumber, setSelectedStageNumber] = useState<number>(3); // Default to Urgency per prompt example

  const activeStage = SCAM_STAGES.find((s) => s.stage === selectedStageNumber) || SCAM_STAGES[2];
  const ActiveIcon = activeStage.icon;

  return (
    <section id="scam-anatomy-visual" className="py-16 sm:py-24 relative bg-[#07090e] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <GitCommit className="w-3.5 h-3.5 text-cyan-400" />
            <span>Behavioral Timeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            How a Scam Usually Works
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Every social engineering attack follows an orderly six-stage psychological pipeline. Click any stage below to inspect how the manipulation operates and how to break the attack chain.
          </p>
        </div>

        {/* 6-Stage Progression Pipeline */}
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Timeline Bar (Desktop: 6 Steps Horizontal / Mobile: Vertical) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SCAM_STAGES.map((st) => {
              const isSelected = selectedStageNumber === st.stage;
              const Icon = st.icon;

              return (
                <button
                  key={st.stage}
                  type="button"
                  onClick={() => setSelectedStageNumber(st.stage)}
                  className={`p-3.5 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center gap-2 cyber-focus-ring ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-500 shadow-xl shadow-amber-950/40 scale-105'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                  aria-label={`Inspect Stage ${st.stage}: ${st.label}`}
                >
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                    STAGE {st.stage}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white leading-tight">
                    {st.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep Dive Inspector */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-800/80 flex items-center justify-center text-amber-400 shrink-0">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                    STAGE {activeStage.stage} OF 6
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mt-0.5">
                    {activeStage.label} ({activeStage.subtitle})
                  </h3>
                </div>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300 self-start sm:self-auto">
                Click any stage button above
              </span>
            </div>

            {/* Psychological Technique & Defensive Intervention */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {/* Psychological Technique */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  Psychological Technique:
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-5 border-l border-amber-800/60">
                  {activeStage.psychologicalTechnique}
                </p>
              </div>

              {/* Defense Counter-Habit */}
              <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/30 border border-emerald-900/60 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  How a Defender Breaks This Stage:
                </span>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium pl-5 border-l border-emerald-800/60">
                  {activeStage.defenseIntervention}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
