'use client';

import React, { useState } from 'react';
import {
  UserCheck,
  Zap,
  Building2,
  MousePointerClick,
  ExternalLink,
  AlertOctagon,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Layers,
  ArrowDown,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface LearnConceptCard {
  id: string;
  number: string;
  title: string;
  explanation: string;
  defensiveAction: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const LEARN_CARDS: LearnConceptCard[] = [
  {
    id: 'impersonation',
    number: '01',
    title: 'IMPERSONATION',
    explanation:
      'The attacker pretends to represent a trusted organization, using spoofed caller names and branding to inherit the victim\'s implicit trust.',
    defensiveAction: 'Verify incoming contacts independently through official apps or directories.',
    icon: UserCheck,
    accentColor: 'border-cyan-500/50 text-cyan-300 bg-cyan-950/40',
  },
  {
    id: 'urgency',
    number: '02',
    title: 'URGENCY',
    explanation:
      'A short deadline pressures the victim to act quickly, deliberately bypassing rational skepticism and careful inspection.',
    defensiveAction: 'Pause and take 5 minutes. Legitimate institutions do not demand split-second verification.',
    icon: Zap,
    accentColor: 'border-rose-500/50 text-rose-300 bg-rose-950/40',
  },
  {
    id: 'authority',
    number: '03',
    title: 'AUTHORITY',
    explanation:
      'The message creates the impression that ignoring it has immediate institutional consequences, leveraging compliance reflexes.',
    defensiveAction: 'Recognize institutional intimidation; always seek independent secondary validation.',
    icon: Building2,
    accentColor: 'border-purple-500/50 text-purple-300 bg-purple-950/40',
  },
  {
    id: 'action-request',
    number: '04',
    title: 'ACTION REQUEST',
    explanation:
      'The victim is pushed toward clicking a link or providing verification codes before they can investigate the message source.',
    defensiveAction: 'Never click unprompted action links; open official services manually.',
    icon: MousePointerClick,
    accentColor: 'border-amber-500/50 text-amber-300 bg-amber-950/40',
  },
  {
    id: 'deceptive-destination',
    number: '05',
    title: 'DECEPTIVE DESTINATION',
    explanation:
      'The link attempts to move the victim to an untrusted destination hosted on a deceptive domain designed to capture credentials.',
    defensiveAction: 'Inspect full URLs and actual root domains carefully before submitting information.',
    icon: ExternalLink,
    accentColor: 'border-blue-500/50 text-blue-300 bg-blue-950/40',
  },
  {
    id: 'consequence-threat',
    number: '06',
    title: 'CONSEQUENCE THREAT',
    explanation:
      'The attacker suggests account loss, suspension, financial loss, or another negative outcome to induce psychological panic.',
    defensiveAction: 'Treat drastic penalty threats as strong evidence of social engineering.',
    icon: AlertOctagon,
    accentColor: 'border-rose-600/50 text-rose-300 bg-rose-950/40',
  },
];

const ATTACK_FLOW_NODES = [
  { id: 'trust', label: 'TRUST', desc: 'Pre-existing institutional confidence' },
  { id: 'urgency', label: 'URGENCY', desc: 'Artificial countdown introduced' },
  { id: 'reaction', label: 'EMOTIONAL REACTION', desc: 'Panic bypasses analytical thought' },
  { id: 'click', label: 'CLICK', desc: 'Adversary link engaged' },
  { id: 'destination', label: 'FAKE DESTINATION', desc: 'Harvesting replica loaded' },
  { id: 'risk', label: 'DATA / MONEY / ACCOUNT RISK', desc: 'Account takeover executed' },
];

export type InterruptionPoint = 'pause' | 'verify' | 'inspect' | 'official';

interface PhishingLearnStageProps {
  onLearnCompleted: () => void;
  onStartTest: () => void;
  isTestUnlocked: boolean;
}

export const PhishingLearnStage: React.FC<PhishingLearnStageProps> = ({
  onLearnCompleted,
  onStartTest,
  isTestUnlocked,
}) => {
  const [interruptedPoint, setInterruptedPoint] = useState<InterruptionPoint | null>(null);

  const handleDefensiveInterruption = (action: InterruptionPoint) => {
    setInterruptedPoint(action);
  };

  return (
    <section id="learn-stage-section" className="py-16 sm:py-20 bg-[#07090e] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 6. LEARN STAGE HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/80 bg-cyan-950/40 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            STAGE 03 • PSYCHOLOGICAL DECONSTRUCTION
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Did This Phishing Message Work?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Understanding the attacker&apos;s psychology helps you recognize similar attacks in the future.
          </p>
        </div>

        {/* SIX EDUCATIONAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEAR_CARDS_MAP(LEARN_CARDS)}
        </div>

        {/* 7. ATTACK FLOW GRAPHIC: CYBERSECURITY ANALYST VISUALIZATION */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 sm:p-10 backdrop-blur-md space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                TELEMETRY DIAGRAM
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                Anatomy of the Phishing Exploitation Chain
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
              LINEAR VECTOR MAPPING
            </span>
          </div>

          {/* Connected Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 relative">
            {ATTACK_FLOW_NODES.map((node, idx) => (
              <div key={node.id} className="relative flex flex-col items-center">
                <div className="w-full p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-1.5 hover:border-cyan-500/60 transition-colors">
                  <span className="text-[9px] font-mono text-cyan-400 font-bold">
                    VECTOR 0{idx + 1}
                  </span>
                  <div className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                    {node.label}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-snug">
                    {node.desc}
                  </div>
                </div>

                {/* Vector arrow right on desktop */}
                {idx < ATTACK_FLOW_NODES.length - 1 && (
                  <div
                    className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-cyan-500/80 font-mono text-xs font-bold"
                    aria-hidden={true}
                  >
                    →
                  </div>
                )}
                {/* Arrow down on mobile */}
                {idx < ATTACK_FLOW_NODES.length - 1 && (
                  <div
                    className="md:hidden flex justify-center py-1 text-cyan-500/80"
                    aria-hidden={true}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 8. BREAK THE CHAIN INTERACTION */}
        <div className="rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-b from-slate-950 via-[#070d19] to-slate-950 p-6 sm:p-10 backdrop-blur-md shadow-2xl space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-800 bg-emerald-950/60 text-emerald-300 text-xs font-mono uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              INTERACTIVE DEFENSE DRILL
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              Break the Attack Chain
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Click any defensive habit below to see where and how you can interrupt the exploitation sequence:
            </p>
          </div>

          {/* Defensive Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => handleDefensiveInterruption('pause')}
              className={`p-3.5 rounded-xl border text-center transition-all cyber-focus-ring cursor-pointer ${
                interruptedPoint === 'pause'
                  ? 'border-emerald-400 bg-emerald-950/70 text-emerald-200 shadow-md shadow-emerald-950/50 scale-105'
                  : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-cyan-400'
              }`}
            >
              <div className="text-xs font-mono font-bold">PAUSE</div>
              <span className="text-[10px] text-slate-400">At Urgency</span>
            </button>

            <button
              type="button"
              onClick={() => handleDefensiveInterruption('verify')}
              className={`p-3.5 rounded-xl border text-center transition-all cyber-focus-ring cursor-pointer ${
                interruptedPoint === 'verify'
                  ? 'border-emerald-400 bg-emerald-950/70 text-emerald-200 shadow-md shadow-emerald-950/50 scale-105'
                  : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-cyan-400'
              }`}
            >
              <div className="text-xs font-mono font-bold">VERIFY</div>
              <span className="text-[10px] text-slate-400">At Reaction</span>
            </button>

            <button
              type="button"
              onClick={() => handleDefensiveInterruption('inspect')}
              className={`p-3.5 rounded-xl border text-center transition-all cyber-focus-ring cursor-pointer ${
                interruptedPoint === 'inspect'
                  ? 'border-emerald-400 bg-emerald-950/70 text-emerald-200 shadow-md shadow-emerald-950/50 scale-105'
                  : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-cyan-400'
              }`}
            >
              <div className="text-xs font-mono font-bold">INSPECT DOMAIN</div>
              <span className="text-[10px] text-slate-400">At Click / Link</span>
            </button>

            <button
              type="button"
              onClick={() => handleDefensiveInterruption('official')}
              className={`p-3.5 rounded-xl border text-center transition-all cyber-focus-ring cursor-pointer ${
                interruptedPoint === 'official'
                  ? 'border-emerald-400 bg-emerald-950/70 text-emerald-200 shadow-md shadow-emerald-950/50 scale-105'
                  : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-cyan-400'
              }`}
            >
              <div className="text-xs font-mono font-bold">OFFICIAL CHANNEL</div>
              <span className="text-[10px] text-slate-400">At Destination</span>
            </button>
          </div>

          {/* Chain Interruption Visual Feedback */}
          {interruptedPoint ? (
            <div className="p-5 sm:p-6 rounded-2xl border-2 border-emerald-500/70 bg-emerald-950/40 text-emerald-100 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                Attack chain interrupted.
              </div>

              <div className="text-sm sm:text-base font-bold text-white">
                {interruptedPoint === 'pause' && 'URGENCY → PAUSE → ✕ ATTACK INTERRUPTED'}
                {interruptedPoint === 'verify' && 'EMOTION → INDEPENDENT VERIFICATION → ✕ ATTACK INTERRUPTED'}
                {interruptedPoint === 'inspect' && 'LINK → ROOT DOMAIN INSPECTION → ✕ ATTACK INTERRUPTED'}
                {interruptedPoint === 'official' && 'FAKE FORM → OFFICIAL BOOKMARKED APP → ✕ ATTACK INTERRUPTED'}
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Taking time to verify independently prevents the attacker from controlling the next step. By stepping outside the attacker&apos;s lure, the threat is safely nullified.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 text-center text-xs font-mono text-slate-400">
              Select any defensive action above to test how defensive habits neutralize the exploitation pipeline.
            </div>
          )}
        </div>

        {/* 9. LEARN COMPLETION & 10. TEST STAGE PREPARATION */}
        <div className="space-y-8 pt-4">
          {/* Learn Completion Badge & Button */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                06
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                  KNOWLEDGE ACQUIRED
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  6 / 6 concepts understood
                </h4>
              </div>
            </div>

            {!isTestUnlocked ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={onLearnCompleted}
                icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
                iconPosition="right"
                className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold cyber-focus-ring cursor-pointer"
              >
                Continue to Test &rarr;
              </Button>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Stage 03 Complete
              </span>
            )}
          </div>

          {/* 10. TEST STAGE PREPARATION PREVIEW CARD (Visible after learn completion) */}
          {isTestUnlocked && (
            <div className="p-6 sm:p-8 rounded-3xl border-2 border-cyan-500/50 bg-gradient-to-r from-slate-950 via-[#070f1e] to-slate-950 shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
                  FINAL BENCHMARK PREPARATION
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Ready for the Test?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Now that you understand the warning signs, test your defensive decision-making in our scenario-based knowledge check.
                </p>
              </div>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                  <div className="text-base sm:text-lg font-mono font-bold text-cyan-300">5</div>
                  <div className="text-[11px] font-mono text-slate-400">Questions</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                  <div className="text-base sm:text-lg font-mono font-bold text-white">1</div>
                  <div className="text-[11px] font-mono text-slate-400">Scenario</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                  <div className="text-base sm:text-lg font-mono font-bold text-emerald-400">Instant</div>
                  <div className="text-[11px] font-mono text-slate-400">Feedback</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                  <div className="text-base sm:text-lg font-mono font-bold text-purple-400">Defense</div>
                  <div className="text-[11px] font-mono text-slate-400">Score Audit</div>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={onStartTest}
                  icon={<ArrowRight className="w-5 h-5 text-slate-950" />}
                  iconPosition="right"
                  className="bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 text-slate-950 font-bold shadow-lg shadow-cyan-950/50 cyber-focus-ring cursor-pointer"
                >
                  Start Phishing Test &rarr;
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

function LEAR_CARDS_MAP(cards: LearnConceptCard[]) {
  return cards.map((card) => {
    const Icon = card.icon;
    return (
      <div
        key={card.id}
        className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 backdrop-blur-sm space-y-4 hover:border-slate-700 transition-colors flex flex-col justify-between"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400">
              {card.number}
            </span>
            <div className={`p-2.5 rounded-xl border ${card.accentColor}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>

          <h3 className="text-base font-bold text-white tracking-wide">
            {card.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {card.explanation}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-800/80 space-y-1">
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            DEFENSIVE ACTION:
          </span>
          <p className="text-xs text-emerald-300 leading-relaxed font-medium">
            {card.defensiveAction}
          </p>
        </div>
      </div>
    );
  });
}
