'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Eye,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Lightbulb,
  Sparkles,
  Lock,
  PhoneCall,
  UserX,
  ExternalLink,
  Clock,
  Ban,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface RedFlagItem {
  id: string;
  name: string;
  category: string;
  description: string;
  observationType: 'correct' | 'warning';
  icon: React.ComponentType<{ className?: string }>;
}

export const RED_FLAGS_DATA: Record<string, RedFlagItem> = {
  sender: {
    id: 'sender',
    name: 'Spoofed Caller Identity & Display Name',
    category: 'Impersonation',
    description:
      'Scammers use fake display names like "SecureBank Alerts" and arbitrary VoIP numbers to mimic legitimate fraud-prevention teams.',
    observationType: 'correct',
    icon: UserX,
  },
  urgency: {
    id: 'urgency',
    name: 'Urgency Pressure',
    category: 'Psychological Trigger',
    description:
      'Scammers create artificial deadlines to reduce the time you have to verify the request independently.',
    observationType: 'correct',
    icon: AlertTriangle,
  },
  deadline: {
    id: 'deadline',
    name: 'Artificial 30-Minute Deadline',
    category: 'Panic Induction',
    description:
      'Setting an immediate time crunch (e.g. "within 30 minutes") prevents victims from consulting family, bank branches, or IT security officers.',
    observationType: 'correct',
    icon: Clock,
  },
  verification: {
    id: 'verification',
    name: 'Unsolicited Verification Request',
    category: 'Credential Baiting',
    description:
      'Legitimate financial institutions will never message you unexpectedly demanding that you enter login or authentication credentials via a direct link.',
    observationType: 'correct',
    icon: Lock,
  },
  url: {
    id: 'url',
    name: 'Suspicious / Deceptive URL',
    category: 'Credential Harvesting',
    description:
      'The domain "securebank-verify.example" is not the official institutional banking domain. Scammers register look-alike domains to steal logins.',
    observationType: 'correct',
    icon: ExternalLink,
  },
  threat: {
    id: 'threat',
    name: 'Consequence Threat & Suspension Warning',
    category: 'Fear Manipulation',
    description:
      'Threatening "account suspension" or "limitations" invokes acute fear of financial loss, prompting hasty compliance.',
    observationType: 'correct',
    icon: Ban,
  },
};

interface PhishingSimulationSandboxProps {
  onRedFlagFound?: (foundCount: number, total: number) => void;
  onDecisionMade?: (isCorrect: boolean) => void;
}

export const PhishingSimulationSandbox: React.FC<PhishingSimulationSandboxProps> = ({
  onRedFlagFound,
  onDecisionMade,
}) => {
  const [foundFlags, setFoundFlags] = useState<string[]>([]);
  const [activeFlagId, setActiveFlagId] = useState<string | null>(null);
  const [isInspectionMode, setIsInspectionMode] = useState<boolean>(false);
  const [hintsRemaining, setHintsRemaining] = useState<number>(3);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [selectedDecision, setSelectedDecision] = useState<'A' | 'B' | 'C' | null>(null);

  const totalFlags = Object.keys(RED_FLAGS_DATA).length;

  const handleFlagClick = (flagId: string) => {
    setActiveFlagId(flagId);
    if (!foundFlags.includes(flagId)) {
      const nextFound = [...foundFlags, flagId];
      setFoundFlags(nextFound);
      if (onRedFlagFound) {
        onRedFlagFound(nextFound.length, totalFlags);
      }
    }
  };

  const handleUseHint = () => {
    if (hintsRemaining <= 0) return;

    // Find the first flag not yet found
    const unfound = Object.keys(RED_FLAGS_DATA).find((key) => !foundFlags.includes(key));
    if (unfound) {
      const flag = RED_FLAGS_DATA[unfound];
      setHintMessage(`HINT: Look closely at the ${flag.category.toLowerCase()} area (${flag.name}).`);
      setHintsRemaining((prev) => prev - 1);
      // Auto-focus this element with inspection mode
      setIsInspectionMode(true);
    } else {
      setHintMessage('You have already uncovered all 6 red flags! Great job.');
    }
  };

  const handleDecision = (choice: 'A' | 'B' | 'C') => {
    setSelectedDecision(choice);
    if (onDecisionMade) {
      onDecisionMade(choice === 'B');
    }
  };

  const handleReset = () => {
    setFoundFlags([]);
    setActiveFlagId(null);
    setIsInspectionMode(false);
    setHintsRemaining(3);
    setHintMessage(null);
    setSelectedDecision(null);
    if (onRedFlagFound) {
      onRedFlagFound(0, totalFlags);
    }
  };

  const activeFlag = activeFlagId ? RED_FLAGS_DATA[activeFlagId] : null;

  return (
    <section id="scenario-section" className="py-16 bg-[#07090e] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/80 bg-cyan-950/40 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" aria-hidden={true} />
            INTERACTIVE DEFENSE SANDBOX
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Scenario 01 — Suspicious Account Alert
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            You receive the following message. Inspect it carefully before deciding what to do.
          </p>
        </div>

        {/* Toolbar: Counter, Inspection Mode Toggle, Hint Button, Reset */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-sm">
          {/* Progress Counter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-cyan-800/80 bg-cyan-950/50 font-mono text-sm font-bold text-cyan-300">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Red Flags Found:</span>
              <span className="text-white bg-cyan-900/60 px-2 py-0.5 rounded border border-cyan-700/60">
                {foundFlags.length} / {totalFlags}
              </span>
            </div>
            {foundFlags.length === totalFlags && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                All Signals Identified!
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              type="button"
              variant={isInspectionMode ? 'primary' : 'outline'}
              size="sm"
              icon={<Eye className="w-4 h-4" />}
              onClick={() => setIsInspectionMode(!isInspectionMode)}
              className={
                isInspectionMode
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-lg shadow-cyan-950/50'
                  : 'text-slate-300 border-slate-700 hover:border-cyan-500'
              }
            >
              {isInspectionMode ? 'Inspection Mode Active' : 'Enable Inspection Mode'}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<Lightbulb className="w-4 h-4 text-amber-400" />}
              onClick={handleUseHint}
              disabled={hintsRemaining <= 0 || foundFlags.length === totalFlags}
              className="text-amber-300 border-amber-800/60 hover:bg-amber-950/40 disabled:opacity-50"
            >
              Reveal Remaining Hints ({hintsRemaining})
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              icon={<RefreshCw className="w-3.5 h-3.5 text-slate-400" />}
              onClick={handleReset}
              className="text-slate-400 hover:text-white"
              title="Reset simulation scenario"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Hint Announcement Banner */}
        {hintMessage && (
          <div className="p-3.5 rounded-xl border border-amber-500/40 bg-amber-950/30 text-amber-200 text-xs sm:text-sm font-mono flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{hintMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setHintMessage(null)}
              className="text-amber-400 hover:text-white text-xs underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Core Interactive Grid: Left Phone SMS Box / Right Red Flag Inspector Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Realistic Mobile Message UI (7 Columns on LG) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl border-2 border-slate-800 p-4 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>SECURE MOBILE EMULATOR</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                CLIENT-SIDE SIMULATION
              </span>
            </div>

            {/* Clickable Mobile Message Container */}
            <div className="rounded-2xl bg-[#090e1a] border border-slate-800 p-4 sm:p-6 space-y-4 relative">
              {/* Element A: Sender Header */}
              <div
                onClick={() => handleFlagClick('sender')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleFlagClick('sender');
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Inspect Sender: SecureBank Alerts"
                className={`p-3 rounded-xl border transition-all cursor-pointer select-none cyber-focus-ring ${
                  activeFlagId === 'sender'
                    ? 'border-cyan-400 bg-cyan-950/60 shadow-md shadow-cyan-950/60'
                    : foundFlags.includes('sender')
                    ? 'border-emerald-500/60 bg-emerald-950/30'
                    : isInspectionMode
                    ? 'border-rose-500/70 bg-rose-950/20 animate-pulse'
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                      <PhoneCall className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white">SecureBank Alerts</span>
                        {foundFlags.includes('sender') && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>
                      <span className="text-xs font-mono text-slate-400">+1 (555) 014-0192</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    CLICK TO INSPECT SENDER
                  </span>
                </div>
              </div>

              {/* Chat Message Bubble */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100">
                {/* Element B: URGENT wording */}
                <div
                  onClick={() => handleFlagClick('urgency')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleFlagClick('urgency');
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Inspect URGENT wording"
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer cyber-focus-ring ${
                    activeFlagId === 'urgency'
                      ? 'border-rose-400 bg-rose-950/60'
                      : foundFlags.includes('urgency')
                      ? 'border-emerald-500/60 bg-emerald-950/30'
                      : isInspectionMode
                      ? 'border-rose-500/70 bg-rose-950/30 animate-pulse'
                      : 'border-transparent hover:border-rose-500/40'
                  }`}
                >
                  <p className="text-sm font-bold text-rose-300 flex items-center justify-between">
                    <span>&quot;URGENT: Your account has been temporarily restricted.&quot;</span>
                    {foundFlags.includes('urgency') && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" />
                    )}
                  </p>
                </div>

                {/* Element C & D: Verification request & 30-minute deadline */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div
                    onClick={() => handleFlagClick('verification')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleFlagClick('verification');
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Inspect Verification request"
                    className={`flex-1 p-2 rounded-lg border transition-all cursor-pointer cyber-focus-ring ${
                      activeFlagId === 'verification'
                        ? 'border-cyan-400 bg-cyan-950/60'
                        : foundFlags.includes('verification')
                        ? 'border-emerald-500/60 bg-emerald-950/30'
                        : isInspectionMode
                        ? 'border-cyan-500/70 bg-cyan-950/30 animate-pulse'
                        : 'border-transparent hover:border-cyan-500/40'
                    }`}
                  >
                    <span className="text-xs sm:text-sm text-slate-200">
                      Verify your account{' '}
                      {foundFlags.includes('verification') && (
                        <CheckCircle2 className="inline w-3 h-3 text-emerald-400 ml-1" />
                      )}
                    </span>
                  </div>

                  <div
                    onClick={() => handleFlagClick('deadline')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleFlagClick('deadline');
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Inspect 30-minute deadline"
                    className={`flex-1 p-2 rounded-lg border transition-all cursor-pointer cyber-focus-ring ${
                      activeFlagId === 'deadline'
                        ? 'border-amber-400 bg-amber-950/60'
                        : foundFlags.includes('deadline')
                        ? 'border-emerald-500/60 bg-emerald-950/30'
                        : isInspectionMode
                        ? 'border-amber-500/70 bg-amber-950/30 animate-pulse'
                        : 'border-transparent hover:border-amber-500/40'
                    }`}
                  >
                    <span className="text-xs sm:text-sm text-amber-200 font-bold">
                      within 30 minutes to avoid suspension.{' '}
                      {foundFlags.includes('deadline') && (
                        <CheckCircle2 className="inline w-3 h-3 text-emerald-400 ml-1" />
                      )}
                    </span>
                  </div>
                </div>

                {/* Element E: Suspicious URL */}
                <div
                  onClick={() => handleFlagClick('url')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleFlagClick('url');
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Inspect Suspicious URL"
                  className={`p-3 rounded-xl border transition-all cursor-pointer cyber-focus-ring ${
                    activeFlagId === 'url'
                      ? 'border-cyan-400 bg-cyan-950/80 shadow-md shadow-cyan-950/80'
                      : foundFlags.includes('url')
                      ? 'border-emerald-500/60 bg-emerald-950/40'
                      : isInspectionMode
                      ? 'border-rose-500/70 bg-rose-950/30 animate-pulse'
                      : 'border-slate-800 bg-slate-950/80 hover:border-cyan-500/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs sm:text-sm text-cyan-300 underline underline-offset-4 break-all">
                      https://securebank-verify.example
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {foundFlags.includes('url') ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 block pt-1">
                    ⚠ Deceptive Link Target • Click to inspect URL
                  </span>
                </div>

                {/* Element F: Threat of Account Suspension */}
                <div
                  onClick={() => handleFlagClick('threat')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleFlagClick('threat');
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Inspect Threat of account suspension"
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer cyber-focus-ring ${
                    activeFlagId === 'threat'
                      ? 'border-rose-400 bg-rose-950/60'
                      : foundFlags.includes('threat')
                      ? 'border-emerald-500/60 bg-emerald-950/30'
                      : isInspectionMode
                      ? 'border-rose-500/70 bg-rose-950/30 animate-pulse'
                      : 'border-transparent hover:border-rose-500/40'
                  }`}
                >
                  <p className="text-xs sm:text-sm text-slate-300 flex items-center justify-between">
                    <span>
                      &quot;Failure to verify may result in account limitations.&quot;
                    </span>
                    {foundFlags.includes('threat') && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" />
                    )}
                  </p>
                </div>
              </div>

              {/* Instructional Subtext */}
              <div className="text-center pt-1">
                <span className="text-[11px] font-mono text-slate-400">
                  Tip: Click on each suspicious text segment above to discover its underlying deceptive tactic.
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Red Flag Inspector Panel (5 Columns on LG) */}
          <div id="red-flags-section" className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 sm:p-6 backdrop-blur-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    INSPECTION TELEMETRY
                  </span>
                </div>
                <span className="text-xs font-mono text-cyan-400">
                  {foundFlags.length} of {totalFlags} Discovered
                </span>
              </div>

              {activeFlag ? (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ✓ Correct Observation
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {activeFlag.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                      <activeFlag.icon className="w-5 h-5 text-cyan-400 shrink-0" />
                      {activeFlag.name}
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-200 text-xs sm:text-sm leading-relaxed">
                    {activeFlag.description}
                  </div>

                  <div className="p-3 rounded-lg border border-cyan-800/60 bg-cyan-950/30 text-[11px] font-mono text-cyan-300">
                    Defensive takeaway: Always cross-examine sender headers and domain names using an out-of-band channel before clicking.
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <HelpCircle className="w-10 h-10 text-slate-600 mx-auto stroke-[1.5]" />
                  <h3 className="text-sm font-bold text-white">No Element Selected</h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                    Click any highlighted phrase, sender name, or link inside the simulated message on the left to analyze why it presents a threat.
                  </p>
                </div>
              )}

              {/* Progress Checklist of 6 Elements */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Target Red Flag Checklist:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.values(RED_FLAGS_DATA).map((flag) => {
                    const isFound = foundFlags.includes(flag.id);
                    return (
                      <button
                        key={flag.id}
                        type="button"
                        onClick={() => handleFlagClick(flag.id)}
                        className={`text-left p-2 rounded-lg border transition-all flex items-center justify-between text-[11px] font-mono ${
                          isFound
                            ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                            : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="truncate pr-1">{flag.name.split(' ')[0]}</span>
                        {isFound ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        ) : (
                          <span className="text-[9px] text-slate-600">UNFOUND</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DECISION CHALLENGE: What would you do? */}
        <div className="pt-8 border-t border-slate-800/80 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-950/60 border border-purple-800/80 text-purple-300">
              DECISION CHECKPOINT
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              What would you do?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-normal">
              Select your immediate defensive action in response to this message:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Option A */}
            <button
              type="button"
              onClick={() => handleDecision('A')}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-4 cyber-focus-ring ${
                selectedDecision === 'A'
                  ? 'border-rose-500 bg-rose-950/40 text-rose-100 shadow-lg shadow-rose-950/40'
                  : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 text-slate-200'
              }`}
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  OPTION A
                </span>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  Click the link and verify immediately.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                Choose Action <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Option B (Safest) */}
            <button
              type="button"
              onClick={() => handleDecision('B')}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-4 cyber-focus-ring ${
                selectedDecision === 'B'
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-100 shadow-lg shadow-emerald-950/40'
                  : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 text-slate-200'
              }`}
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  OPTION B
                </span>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  Ignore the message and independently contact the organization using an official channel.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                Choose Action <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Option C */}
            <button
              type="button"
              onClick={() => handleDecision('C')}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-4 cyber-focus-ring ${
                selectedDecision === 'C'
                  ? 'border-amber-500 bg-amber-950/40 text-amber-100 shadow-lg shadow-amber-950/40'
                  : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 text-slate-200'
              }`}
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  OPTION C
                </span>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  Reply to the sender and ask if the message is genuine.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                Choose Action <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* Decision Feedback Explanations */}
          {selectedDecision && (
            <div
              className={`p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                selectedDecision === 'B'
                  ? 'border-emerald-500/80 bg-emerald-950/40 text-emerald-100'
                  : 'border-amber-500/80 bg-amber-950/40 text-amber-100'
              }`}
            >
              <div className="flex items-start gap-3">
                {selectedDecision === 'B' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-white">
                    {selectedDecision === 'B'
                      ? 'Excellent defensive decision.'
                      : 'Not the safest choice.'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedDecision === 'B' &&
                      'Do not use contact information supplied by a suspicious message. Find the organization\'s official website, app, statement, or known phone number independently.'}
                    {selectedDecision === 'A' &&
                      'Clicking the link navigates directly to the adversary\'s credential-harvesting server. Even visiting unfamiliar sites can trigger automated browser fingerprinting or credential capture forms.'}
                    {selectedDecision === 'C' &&
                      'Replying to the sender only engages with the scammer behind the spoofed number. They will eagerly confirm the message is "real" to lure you further into the fraud.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
