'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Gauge,
  ChevronRight,
  Shield,
} from 'lucide-react';

interface ScenarioOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface Scenario {
  id: number;
  topic: string;
  question: string;
  options: ScenarioOption[];
  correctFeedback: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    topic: 'Phishing & Artificial Urgency',
    question:
      'You receive an unexpected message saying your account will be suspended in 30 minutes. What should you do first?',
    options: [
      {
        id: 'A',
        text: 'Click the link immediately to prevent the suspension',
        isCorrect: false,
        explanation:
          'Security Principle: Urgency is weaponized by attackers to force hasty decisions. Clicking the embedded link directly routes you to a credential-harvesting trap.',
      },
      {
        id: 'B',
        text: 'Reply to the sender with your password to prove ownership',
        isCorrect: false,
        explanation:
          'Security Principle: Legitimate services never request credentials via reply email or SMS. Replying exposes secrets directly to the attacker.',
      },
      {
        id: 'C',
        text: 'Verify through the official website or app in a separate window',
        isCorrect: true,
        explanation:
          'Correct — Independent verification is a strong defense against social engineering.',
      },
      {
        id: 'D',
        text: 'Forward the message to friends or coworkers to ask their opinion',
        isCorrect: false,
        explanation:
          'Security Principle: Forwarding unverified phishing lures amplifies the attack blast radius and endangers others who might click inadvertently.',
      },
    ],
    correctFeedback:
      'Correct — Independent verification is a strong defense against social engineering.',
  },
  {
    id: 2,
    topic: 'Fake Support Call & Impersonation',
    question:
      'A caller claiming to be from "IT Support" states your laptop is infected with malware and demands remote desktop access right now. What should you do?',
    options: [
      {
        id: 'A',
        text: 'Grant remote access immediately so they can clean the machine',
        isCorrect: false,
        explanation:
          'Security Principle: Granting unverified remote access gives adversaries full administrative control of your operating system and private files.',
      },
      {
        id: 'B',
        text: 'Hang up and verify through your organization\'s official directory',
        isCorrect: true,
        explanation:
          'Correct — Independent verification protects against voice phishing (vishing). Legitimate support teams encourage verifying through established internal channels.',
      },
      {
        id: 'C',
        text: 'Provide your login password so they can run diagnostics remotely',
        isCorrect: false,
        explanation:
          'Security Principle: Legitimate technicians never ask for your private passwords. Passwords must remain confidential to the account holder.',
      },
      {
        id: 'D',
        text: 'Ask the caller to prove identity by reading back your employee ID',
        isCorrect: false,
        explanation:
          'Security Principle: Stolen directories and public data dumps often contain basic employee IDs, so reciting an ID does not authenticate a caller.',
      },
    ],
    correctFeedback:
      'Correct — Independent verification protects against voice phishing (vishing). Never grant remote access to unsolicited callers.',
  },
  {
    id: 3,
    topic: 'Suspicious Login Alert & 2FA',
    question:
      'You receive an unexpected two-factor authentication (2FA) prompt on your phone for an account you are not currently logging into. What should you do?',
    options: [
      {
        id: 'A',
        text: 'Approve the prompt so you stop receiving annoying alert sounds',
        isCorrect: false,
        explanation:
          'Security Principle: MFA push fatigue attacks rely on victims approving prompts out of annoyance or confusion, instantly granting the attacker access.',
      },
      {
        id: 'B',
        text: 'Ignore the prompt and do nothing because MFA successfully blocked it',
        isCorrect: false,
        explanation:
          'Security Principle: While the prompt prevented entry, the attacker already has your valid password. If left unchanged, they will attempt other bypasses.',
      },
      {
        id: 'C',
        text: 'Deny the login, change your password via official settings, and end active sessions',
        isCorrect: true,
        explanation:
          'Correct — Denying the prompt halts the immediate breach, and immediately updating your password eliminates the credential leak.',
      },
      {
        id: 'D',
        text: 'Reply to the notification text asking who is trying to log in',
        isCorrect: false,
        explanation:
          'Security Principle: Push verification alerts are automated systems and cannot receive inquiries. Delays in resetting your password create vulnerability.',
      },
    ],
    correctFeedback:
      'Correct — Denying unauthorized MFA requests and promptly updating passwords shuts down active credential attacks.',
  },
];

const SKILL_METER_LEVELS = [
  {
    level: '01',
    name: 'Cyber Curious',
    desc: 'Begins exploring digital safety concepts and questioning unsolicited requests.',
    color: 'border-slate-700 bg-slate-900/60 text-slate-300',
    badgeColor: 'bg-slate-800 text-slate-300',
  },
  {
    level: '02',
    name: 'Cyber Aware',
    desc: 'Identifies artificial urgency, checks sender headers, and avoids obvious lures.',
    color: 'border-amber-800/60 bg-amber-950/30 text-amber-300',
    badgeColor: 'bg-amber-950 text-amber-300',
  },
  {
    level: '03',
    name: 'Cyber Smart',
    desc: 'Employs password managers, activates MFA, and verifies URLs out-of-band.',
    color: 'border-cyan-800/60 bg-cyan-950/30 text-cyan-300',
    badgeColor: 'bg-cyan-950 text-cyan-300',
  },
  {
    level: '04',
    name: 'Defensive Thinker',
    desc: 'Understands multi-stage attack chains and evaluates blast radius of actions.',
    color: 'border-emerald-800/60 bg-emerald-950/30 text-emerald-300',
    badgeColor: 'bg-emerald-950 text-emerald-300',
  },
  {
    level: '05',
    name: 'Security Mindset',
    desc: 'Instinctively practices zero-trust principles, layered defense, and cyber resilience.',
    color: 'border-purple-800/60 bg-purple-950/30 text-purple-300',
    badgeColor: 'bg-purple-950 text-purple-300',
  },
];

export const CyberIQPreviewSection: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  const scenario = SCENARIOS[currentScenarioIndex];
  const chosenOption = scenario.options.find((opt) => opt.id === selectedOptionId);

  const handleSelectOption = (id: 'A' | 'B' | 'C' | 'D') => {
    setSelectedOptionId(id);
    setHasAnswered(true);
  };

  const handleNextScenario = () => {
    setSelectedOptionId(null);
    setHasAnswered(false);
    setCurrentScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
  };

  const handleResetCurrent = () => {
    setSelectedOptionId(null);
    setHasAnswered(false);
  };

  return (
    <section id="cyber-iq" className="py-20 md:py-28 relative border-t border-slate-800/80 bg-slate-950/70 scroll-mt-20 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-950/20 via-purple-950/15 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
            <span>CYBER IQ CHALLENGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Think Like a <span className="text-cyan-400">Defender.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Test your real-time defensive instincts against simulated social engineering scenarios.
          </p>
        </div>

        {/* =========================================================================
            SECTION 7: SECURITY SKILL METER (Progression Continuum)
            Cyber Curious -> Cyber Aware -> Cyber Smart -> Defensive Thinker -> Security Mindset
            ========================================================================= */}
        <div className="max-w-5xl mx-auto p-6 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-white">
              <Gauge className="w-4 h-4 text-cyan-400" />
              <span>Cyber Skill Progression Continuum</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
              Conceptual educational model • Zero personal telemetry collected
            </span>
          </div>

          {/* 5 Levels Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {SKILL_METER_LEVELS.map((item, idx) => (
              <div
                key={item.name}
                className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 transition-all ${item.color}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase opacity-75">
                      Level {item.level}
                    </span>
                    {idx < SKILL_METER_LEVELS.length - 1 && (
                      <span className="text-xs font-mono text-slate-500 hidden sm:inline">→</span>
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold font-mono tracking-tight mt-1">
                    {item.name}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            SECTION 6: INTERACTIVE MINI CHALLENGE (3 Scenarios with "Next Scenario ->")
            ========================================================================= */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl shadow-cyan-950/30 backdrop-blur-md overflow-hidden">
            {/* Scenario Header Bar */}
            <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-mono text-sm font-bold">
                  0{scenario.id}
                </span>
                <div>
                  <span className="text-xs uppercase tracking-wider font-mono text-cyan-400 font-bold block">
                    Scenario {scenario.id} of {SCENARIOS.length}
                  </span>
                  <div className="text-xs text-slate-400">{scenario.topic}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
                  Interactive Judgment
                </span>
                {hasAnswered && (
                  <button
                    onClick={handleResetCurrent}
                    type="button"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs cursor-pointer cyber-focus-ring"
                    aria-label="Try scenario again"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Scenario Question & Options Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  SCENARIO DECISION POINT
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {scenario.question}
                </h3>
              </div>

              {/* Options List */}
              <div className="space-y-3" role="radiogroup" aria-label={`Options for scenario ${scenario.id}`}>
                {scenario.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  let optionStyles = 'border-slate-800 bg-slate-950/50 hover:bg-slate-800/60 hover:border-slate-700 text-slate-200';

                  if (hasAnswered) {
                    if (option.isCorrect) {
                      optionStyles = 'border-emerald-500/70 bg-emerald-950/40 text-emerald-100 shadow-md shadow-emerald-950/40';
                    } else if (isSelected && !option.isCorrect) {
                      optionStyles = 'border-amber-500/70 bg-amber-950/40 text-amber-100 shadow-md shadow-amber-950/40';
                    } else {
                      optionStyles = 'border-slate-800/60 bg-slate-950/20 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyles = 'border-cyan-500 bg-cyan-950/40 text-white';
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 cursor-pointer cyber-focus-ring ${optionStyles}`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 border ${
                          hasAnswered && option.isCorrect
                            ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                            : hasAnswered && isSelected && !option.isCorrect
                            ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {option.id}
                      </span>
                      <div className="flex-1 text-sm font-medium leading-relaxed">
                        {option.text}
                      </div>
                      {hasAnswered && option.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {hasAnswered && isSelected && !option.isCorrect && (
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation: Explaining Security Principle */}
              {hasAnswered && chosenOption && (
                <div
                  className={`p-5 rounded-xl border animate-in fade-in duration-200 space-y-2 ${
                    chosenOption.isCorrect
                      ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-100'
                      : 'bg-amber-950/50 border-amber-500/60 text-amber-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {chosenOption.isCorrect ? (
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1 flex-1">
                      <div className="text-sm font-bold flex items-center gap-2">
                        {chosenOption.isCorrect ? 'Correct Decision!' : 'Security Principle Analysis'}
                        <span className="text-xs font-mono font-normal opacity-85">
                          (Recommended: Option C)
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                        {chosenOption.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Actions: Next Scenario Button & Links */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>3 Scenarios: Phishing • Fake Support • Login Alerts</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {hasAnswered ? (
                    <button
                      type="button"
                      onClick={handleNextScenario}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer cyber-focus-ring"
                    >
                      <span>Next Scenario →</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      href="/scam-awareness#scam-quiz"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors cyber-focus-ring"
                    >
                      <Shield className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Take Full Scam Quiz</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
