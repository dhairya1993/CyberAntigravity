'use client';

import React, { useState } from 'react';
import {
  Smartphone,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface SimulatedRedFlag {
  id: string;
  name: string;
  highlightText: string;
  threatIndicator: string;
  whyItMatters: string;
  saferResponse: string;
}

const RED_FLAGS_DATA: SimulatedRedFlag[] = [
  {
    id: 'unknown-sender',
    name: 'UNKNOWN SENDER',
    highlightText: '+1 (555) 019-8432',
    threatIndicator: 'Unverified sender address or generic number masquerading as a trusted institution.',
    whyItMatters: 'Scammers use spoofed numbers or throwaway VoIP lines to send mass fraud alerts to arbitrary phone numbers.',
    saferResponse: 'Never trust sender display names on incoming texts. Banks and legitimate services communicate via dedicated verified channels or authenticated in-app notifications.',
  },
  {
    id: 'urgent-language',
    name: 'URGENT LANGUAGE',
    highlightText: 'URGENT: Your account requires immediate verification.',
    threatIndicator: 'High-pressure wording designed to trigger emotional panic over calm rationality.',
    whyItMatters: 'Scammers often create artificial deadlines to reduce careful thinking and push targets into hasty, unverified decisions.',
    saferResponse: 'Deliberately slow down. Step away from the screen. Legitimate organizations provide reasonable windows and will not freeze accounts without verified procedure.',
  },
  {
    id: 'threat-loss',
    name: 'THREAT OF ACCOUNT LOSS',
    highlightText: 'Failure to verify within 30 minutes may result in permanent suspension.',
    threatIndicator: 'Manufactured consequence designed to bypass critical verification.',
    whyItMatters: 'Fear of financial loss or digital disconnection causes victims to comply before sanity-checking the premise.',
    saferResponse: 'Recognize artificial ultimatums as a signature red flag of fraud. Legitimate account locks occur through formal in-app dashboards, never sudden countdown threats.',
  },
  {
    id: 'sensitive-info',
    name: 'REQUEST FOR SENSITIVE INFORMATION',
    highlightText: 're-confirm your login credentials and temporary security code',
    threatIndicator: 'Soliciting passwords, OTPs, or master security answers.',
    whyItMatters: 'OTPs and passwords are authentication secrets. Handing them over allows the attacker to finalize unauthorized fund transfers or reset your account.',
    saferResponse: 'Never disclose passwords or one-time passcodes over chat or SMS. Customer support desks never require you to reveal temporary codes.',
  },
  {
    id: 'suspicious-link',
    name: 'SUSPICIOUS LINK',
    highlightText: 'http://secure-account-auth-verify89.xyz/portal',
    threatIndicator: 'Mismatched root domain with hyphenated brand keywords and unfamiliar top-level domain (.xyz).',
    whyItMatters: 'The link leads to an exact graphical clone of a login portal engineered to harvest submitted credentials in real time.',
    saferResponse: 'Do not click the link. Inspect the actual domain from right to left before the first single slash, or open the official portal directly via your browser bookmarks.',
  },
];

interface DecisionChoice {
  id: 'A' | 'B' | 'C' | 'D';
  label: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

const DECISION_CHOICES: DecisionChoice[] = [
  {
    id: 'A',
    label: 'A',
    text: 'Click the link immediately to prevent suspension.',
    isCorrect: false,
    explanation: 'Dangerous: Clicking urgent links lands you on a credential-stealing clone site where passwords and session cookies are captured.',
  },
  {
    id: 'B',
    label: 'B',
    text: 'Reply to the sender asking if the alert is real.',
    isCorrect: false,
    explanation: 'Risky: Replying confirms your phone number is monitored by an active user, resulting in aggressive follow-up scam calls and spam.',
  },
  {
    id: 'C',
    label: 'C',
    text: 'Verify through the official website/app independently.',
    isCorrect: true,
    explanation: 'Correct & Safest Choice! Navigate directly to the verified service using your existing app or bookmarked URL. Never use links provided in unexpected messages.',
  },
  {
    id: 'D',
    label: 'D',
    text: 'Forward it to someone else to click and check.',
    isCorrect: false,
    explanation: 'Risky: Forwarding malicious links distributes phishing traps to colleagues or family members who might click by mistake.',
  },
];

export const ScamDetectionLab: React.FC = () => {
  const [discoveredIds, setDiscoveredIds] = useState<Set<string>>(new Set(['urgent-language']));
  const [activeFlagId, setActiveFlagId] = useState<string>('urgent-language');
  const [selectedDecision, setSelectedDecision] = useState<'A' | 'B' | 'C' | 'D' | null>(null);

  const handleFlagClick = (id: string) => {
    setActiveFlagId(id);
    setDiscoveredIds((prev) => new Set([...prev, id]));
  };

  const handleResetLab = () => {
    setDiscoveredIds(new Set(['urgent-language']));
    setActiveFlagId('urgent-language');
    setSelectedDecision(null);
  };

  const activeFlag = RED_FLAGS_DATA.find((f) => f.id === activeFlagId) || RED_FLAGS_DATA[0];
  const discoveredCount = discoveredIds.size;
  const totalFlags = RED_FLAGS_DATA.length;
  const isComplete = discoveredCount === totalFlags;

  const currentDecisionChoice = DECISION_CHOICES.find((c) => c.id === selectedDecision);

  return (
    <section id="scam-detection-lab" className="py-16 sm:py-24 relative bg-[#06080e] border-t border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/80 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Scam Detection Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Can You Spot the Red Flags?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Inspect the simulated alert below. Click each highlighted phrase inside the message to reveal how social engineering manipulates human psychology, then make your defensive decision.
          </p>
        </div>

        {/* Main Grid: Smartphone Simulator Left, Inspection & Score Panel Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Simulated Smartphone Interface Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Mandatory Simulation Warning Badge */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-amber-800/80 bg-amber-950/40 text-amber-300 text-xs font-semibold font-mono">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="tracking-wide">SIMULATED MESSAGE — FICTIONAL DEMONSTRATION</span>
              </div>
              <span className="text-[10px] text-slate-400 hidden sm:inline">No real brands or data</span>
            </div>

            {/* Smartphone Enclosure */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-7 shadow-2xl relative overflow-hidden cyber-card-glow">
              {/* Phone Status Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-white font-semibold block text-xs">
                      Sender:{' '}
                      <button
                        type="button"
                        onClick={() => handleFlagClick('unknown-sender')}
                        className={`font-mono text-xs underline decoration-dotted transition-colors ${
                          activeFlagId === 'unknown-sender'
                            ? 'text-amber-300 bg-amber-950/70 px-1 rounded'
                            : 'text-slate-300 hover:text-amber-400'
                        }`}
                        title="Click to inspect Unknown Sender flag"
                      >
                        +1 (555) 019-8432
                      </button>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">SMS Notification • Fictional Route</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-500">10:42 AM</span>
              </div>

              {/* Message Bubble with Interactive Highlights */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm leading-relaxed text-slate-200 space-y-3 shadow-inner">
                <p className="text-slate-200">
                  <button
                    type="button"
                    onClick={() => handleFlagClick('urgent-language')}
                    className={`font-bold transition-all px-1.5 py-0.5 rounded underline decoration-wavy ${
                      activeFlagId === 'urgent-language'
                        ? 'bg-amber-500/30 text-amber-200 decoration-amber-400'
                        : 'text-amber-300 decoration-amber-500/70 hover:bg-amber-950/50'
                    }`}
                  >
                    URGENT: Your account requires immediate verification.
                  </button>
                </p>

                <p className="text-slate-300">
                  <button
                    type="button"
                    onClick={() => handleFlagClick('threat-loss')}
                    className={`transition-all px-1.5 py-0.5 rounded underline decoration-wavy ${
                      activeFlagId === 'threat-loss'
                        ? 'bg-rose-500/30 text-rose-200 decoration-rose-400'
                        : 'text-rose-300 decoration-rose-500/70 hover:bg-rose-950/50'
                    }`}
                  >
                    Failure to verify within 30 minutes may result in permanent suspension.
                  </button>
                </p>

                <p className="text-slate-300">
                  Please{' '}
                  <button
                    type="button"
                    onClick={() => handleFlagClick('sensitive-info')}
                    className={`transition-all px-1.5 py-0.5 rounded underline decoration-wavy ${
                      activeFlagId === 'sensitive-info'
                        ? 'bg-purple-500/30 text-purple-200 decoration-purple-400'
                        : 'text-purple-300 decoration-purple-500/70 hover:bg-purple-950/50'
                    }`}
                  >
                    re-confirm your login credentials and temporary security code
                  </button>{' '}
                  via the portal link:
                </p>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-rose-900/60 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => handleFlagClick('suspicious-link')}
                    className={`break-all underline transition-all ${
                      activeFlagId === 'suspicious-link'
                        ? 'text-cyan-300 bg-cyan-950/80 px-1 rounded font-bold'
                        : 'text-cyan-400 hover:text-cyan-200'
                    }`}
                  >
                    http://secure-account-auth-verify89.xyz/portal
                  </button>
                </div>
              </div>

              {/* Red Flag Navigation Chips */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                {RED_FLAGS_DATA.map((rf) => {
                  const isSelected = activeFlagId === rf.id;
                  const isDiscovered = discoveredIds.has(rf.id);
                  return (
                    <button
                      key={rf.id}
                      type="button"
                      onClick={() => handleFlagClick(rf.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 cyber-focus-ring ${
                        isSelected
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60 shadow-sm'
                          : isDiscovered
                          ? 'bg-slate-900 border border-slate-800 text-emerald-300 hover:border-slate-700'
                          : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isDiscovered ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                      )}
                      <span>{rf.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Inspection Details, Scam Score & Decision Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* 1. SCAM SCORE CARD */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Scam Score Meter
                </span>
                <button
                  type="button"
                  onClick={handleResetLab}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="py-4 text-center">
                <span className="text-3xl font-extrabold text-white font-mono">
                  {discoveredCount} / {totalFlags}
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">Red Flags Identified</span>

                <div className="mt-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                      isComplete
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                        : 'bg-amber-950 text-amber-300 border-amber-800'
                    }`}
                  >
                    {isComplete ? (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Excellent Scam Detection</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>Keep Practicing ({discoveredCount}/{totalFlags})</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300 rounded-full"
                  style={{ width: `${(discoveredCount / totalFlags) * 100}%` }}
                />
              </div>

              <p className="text-[10px] text-slate-500 text-center mt-2.5 font-mono">
                This is an educational score only. Do not imply real-world fraud detection accuracy.
              </p>
            </div>

            {/* 2. ACTIVE RED FLAG ANALYSIS CARD */}
            <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-slate-900/90 to-slate-950 p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-amber-800 bg-amber-950/70 text-amber-300 font-bold uppercase">
                  Flag Inspector
                </span>
                <span className="text-xs font-mono text-slate-400 truncate">
                  &ldquo;{activeFlag.highlightText}&rdquo;
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                {activeFlag.name}
              </h3>

              {/* Threat Indicator */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                <span className="font-semibold text-rose-300 flex items-center gap-1.5 mb-1 font-mono">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  Threat Indicator:
                </span>
                <p className="text-slate-300 pl-5 border-l border-rose-800/60 leading-relaxed">
                  {activeFlag.threatIndicator}
                </p>
              </div>

              {/* Why it Matters */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                <span className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1 font-mono">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  Why It Matters:
                </span>
                <p className="text-slate-300 pl-5 border-l border-amber-800/60 leading-relaxed">
                  {activeFlag.whyItMatters}
                </p>
              </div>

              {/* Safer Response */}
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/60 text-xs">
                <span className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Safer Response:
                </span>
                <p className="text-emerald-100/90 pl-5 border-l border-emerald-800/60 leading-relaxed font-medium">
                  {activeFlag.saferResponse}
                </p>
              </div>
            </div>

            {/* 3. SCAM DECISION SYSTEM: "What would you do?" */}
            <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-slate-900/90 to-slate-950 p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-800 bg-cyan-950/70 text-cyan-300 font-bold uppercase">
                  Decision Check
                </span>
                <h4 className="text-sm font-bold text-white">What would you do?</h4>
              </div>

              <div className="space-y-2">
                {DECISION_CHOICES.map((choice) => {
                  const isSelected = selectedDecision === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => setSelectedDecision(choice.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 cyber-focus-ring ${
                        isSelected
                          ? choice.isCorrect
                            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/50 border-rose-500 text-rose-200'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {choice.label}
                      </span>
                      <span className="leading-snug">{choice.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Decision Feedback */}
              {currentDecisionChoice && (
                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
                    currentDecisionChoice.isCorrect
                      ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200'
                      : 'bg-amber-950/40 border-amber-600/60 text-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1 font-mono">
                    {currentDecisionChoice.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Recommended Defensive Choice</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Vulnerability Risk Identified</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300">{currentDecisionChoice.explanation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
