'use client';

import React from 'react';
import {
  Sparkles,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  Zap,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PhishingRedFlagId } from './PhishingHeroPhoneVisual';

export interface InspectionDetail {
  id: PhishingRedFlagId | 'neutral';
  title: string;
  name: string;
  whyItMatters: string;
  attackPattern?: string;
  risk?: 'High' | 'Medium' | 'Low';
  defensiveAction?: string;
}

export const RED_FLAG_FEEDBACK_DATA: Record<PhishingRedFlagId, InspectionDetail> = {
  urgency: {
    id: 'urgency',
    title: 'RED FLAG DETECTED',
    name: 'ARTIFICIAL URGENCY',
    whyItMatters:
      'Attackers often create artificial deadlines to pressure victims into acting before they verify the request.',
    attackPattern: 'Social Engineering',
    risk: 'High',
    defensiveAction: 'Pause and verify independently.',
  },
  url: {
    id: 'url',
    title: 'RED FLAG DETECTED',
    name: 'SUSPICIOUS DESTINATION DOMAIN',
    whyItMatters:
      'Do not assume a familiar-looking service name makes a domain trustworthy. Inspect the actual registered domain.',
    attackPattern: 'URL Deception',
    risk: 'High',
    defensiveAction: 'Manually check the root domain before clicking.',
  },
  sender: {
    id: 'sender',
    title: 'RED FLAG DETECTED',
    name: 'UNVERIFIED SPOOFED SENDER',
    whyItMatters:
      'An unexpected sender identity or number should be verified through an independent official channel.',
    attackPattern: 'Impersonation',
    risk: 'Medium',
    defensiveAction:
      'Call back using official numbers from physical cards or account statements.',
  },
  deadline: {
    id: 'deadline',
    title: 'RED FLAG DETECTED',
    name: 'ARTIFICIAL 30-MINUTE DEADLINE',
    whyItMatters:
      'Short ticking timers panic victims into acting before consulting family or support.',
    attackPattern: 'Social Engineering',
    risk: 'High',
    defensiveAction:
      'Take a 5-minute break. Real banks do not freeze accounts in minutes.',
  },
  verification: {
    id: 'verification',
    title: 'RED FLAG DETECTED',
    name: 'UNSOLICITED VERIFICATION REQUEST',
    whyItMatters:
      'Legitimate banks do not text demanding immediate password or code entry via links.',
    attackPattern: 'Credential Harvesting',
    risk: 'High',
    defensiveAction: 'Log in only via official bookmarked apps or websites.',
  },
  threat: {
    id: 'threat',
    title: 'RED FLAG DETECTED',
    name: 'ACCOUNT SUSPENSION THREAT',
    whyItMatters:
      'Threatening severe penalties triggers fear to short-circuit critical evaluation.',
    attackPattern: 'Fear Induction',
    risk: 'High',
    defensiveAction:
      'Recognize catastrophic threats as a hallmark of scam lures.',
  },
};

export const NEUTRAL_FEEDBACK_DATA: Record<string, InspectionDetail> = {
  timestamp: {
    id: 'neutral',
    title: 'NEUTRAL DETAIL',
    name: 'MESSAGE TIMESTAMP',
    whyItMatters:
      'This timestamp does not prove whether the message is legitimate.',
    attackPattern: 'Standard Telemetry',
    risk: 'Low',
    defensiveAction:
      'Do not use normal formatting to assume authenticity.',
  },
  lock: {
    id: 'neutral',
    title: 'NEUTRAL DETAIL',
    name: 'APP SECURITY ICON',
    whyItMatters:
      'Mobile operating system icons reflect messaging app features, not the trustworthiness of the sender.',
    attackPattern: 'OS Interface',
    risk: 'Low',
    defensiveAction: 'Distinguish operating system UI from message origin.',
  },
  'status-bar': {
    id: 'neutral',
    title: 'NEUTRAL DETAIL',
    name: 'DEVICE TELEMETRY',
    whyItMatters:
      'Hardware battery, signal, and Wi-Fi indicators provide no evidence regarding whether a message is fraudulent.',
    attackPattern: 'Hardware Metrics',
    risk: 'Low',
    defensiveAction: 'Always evaluate message intent, not device status.',
  },
};

const ALL_RED_FLAGS: { id: PhishingRedFlagId; label: string }[] = [
  { id: 'urgency', label: 'Artificial urgency' },
  { id: 'sender', label: 'Suspicious sender' },
  { id: 'deadline', label: '30-minute deadline' },
  { id: 'verification', label: 'Verification request' },
  { id: 'url', label: 'Suspicious URL' },
  { id: 'threat', label: 'Account suspension threat' },
];

interface PhishingInspectionHUDProps {
  discoveredFlags: PhishingRedFlagId[];
  activeDetail: InspectionDetail | null;
  hintsRemaining: number;
  hintsUsed: number;
  activeHintText: string | null;
  onUseHint: () => void;
  onSelectDiscoveredFlag: (id: PhishingRedFlagId) => void;
  onContinueToLearn: () => void;
  mode?: 'all' | 'desktop' | 'mobile';
}

export const PhishingInspectionHUD: React.FC<PhishingInspectionHUDProps> = ({
  discoveredFlags,
  activeDetail,
  hintsRemaining,
  hintsUsed,
  activeHintText,
  onUseHint,
  onSelectDiscoveredFlag,
  onContinueToLearn,
  mode = 'all',
}) => {
  const totalFlags = 6;
  const count = discoveredFlags.length;
  const progressPercent = Math.round((count / totalFlags) * 100);
  const isAllDiscovered = count === totalFlags;

  const showDesktop = mode === 'all' || mode === 'desktop';
  const showMobile = mode === 'all' || mode === 'mobile';

  return (
    <div className="w-full">
      {/* ========================================================
          MOBILE COMPACT HUD & DISCOVERED SECTION (< 768px)
          Requirement 6, 7, 8:
          - Equal-width compact segments (🚩 0/6 Red Flags | 💡 3 Hints | 📊 0%)
          - Maximum height approx 70px
          - Progress bar directly underneath
          - RED FLAGS FOUND 0/6 with discovered items only or initial prompt
         ======================================================== */}
      {showMobile && (
        <div className={`${mode === 'all' ? 'md:hidden' : ''} space-y-3.5 w-full`}>
          {/* Compact Horizontal HUD */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/95 p-2.5 backdrop-blur-md shadow-lg space-y-2">
            {/* Equal-Width 3 Compact Segments (approx 44-50px) */}
            <div className="grid grid-cols-3 gap-2 text-center items-center">
              {/* Segment 1: Red Flags */}
              <div className="py-1.5 px-1 rounded-xl bg-slate-900/90 border border-slate-800/80 flex flex-col items-center justify-center">
                <span className="text-[10px] font-mono text-slate-400 leading-none">RED FLAGS</span>
                <span className="text-xs sm:text-sm font-mono font-bold text-cyan-300 flex items-center gap-1 mt-0.5">
                  <span aria-hidden="true">🚩</span>
                  <span>{count}/{totalFlags}</span>
                </span>
              </div>

              {/* Segment 2: Hints */}
              <button
                type="button"
                onClick={onUseHint}
                disabled={hintsRemaining <= 0 || isAllDiscovered}
                title={hintsRemaining > 0 ? 'Tap for a hint clue' : 'No hints remaining'}
                className="py-1.5 px-1 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-amber-500/60 transition-colors disabled:opacity-50 cursor-pointer flex flex-col items-center justify-center text-center"
              >
                <span className="text-[10px] font-mono text-slate-400 leading-none">HINTS</span>
                <span className="text-xs sm:text-sm font-mono font-bold text-amber-400 flex items-center gap-1 mt-0.5">
                  <span aria-hidden="true">💡</span>
                  <span>{hintsRemaining} Left</span>
                </span>
              </button>

              {/* Segment 3: Progress % */}
              <div className="py-1.5 px-1 rounded-xl bg-slate-900/90 border border-slate-800/80 flex flex-col items-center justify-center">
                <span className="text-[10px] font-mono text-slate-400 leading-none">PROGRESS</span>
                <span className="text-xs sm:text-sm font-mono font-bold text-white flex items-center gap-1 mt-0.5">
                  <span aria-hidden="true">📊</span>
                  <span>{progressPercent}%</span>
                </span>
              </div>
            </div>

            {/* Smooth Progress Bar Underneath */}
            <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <div
                className={`h-full transition-all duration-500 ease-out rounded-full ${
                  isAllDiscovered
                    ? 'bg-gradient-to-r from-teal-400 to-emerald-400'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Active Hint Clue (if unlocked) */}
          {activeHintText && (
            <div className="p-2.5 rounded-xl border border-amber-500/40 bg-amber-950/40 text-xs font-mono text-amber-200 flex items-start gap-2 animate-in fade-in duration-200">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-snug">
                <span className="font-bold text-amber-300">CLUE: </span>
                <span>{activeHintText}</span>
              </div>
            </div>
          )}

          {/* Section 8: RED FLAGS DISCOVERED SECTION (Mobile) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-3 backdrop-blur-md space-y-2 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
                  RED FLAGS FOUND {count}/{totalFlags}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {count === totalFlags ? 'COMPLETE' : `${totalFlags - count} REMAINING`}
              </span>
            </div>

            {count === 0 ? (
              <p className="text-xs font-mono text-slate-400 italic py-1">
                Tap suspicious elements inside the message.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {ALL_RED_FLAGS.filter((item) => discoveredFlags.includes(item.id)).map(
                  (item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectDiscoveredFlag(item.id)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-500/50 bg-emerald-950/30 text-emerald-300 text-xs font-mono font-medium hover:border-cyan-400 hover:text-cyan-200 transition-colors cursor-pointer cyber-focus-ring"
                    >
                      <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                      <span>{item.label}</span>
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          DESKTOP FULL INSPECTION HUD (>= 768px)
          Requirement 16:
          Keep existing desktop layout substantially unchanged.
         ======================================================== */}
      {showDesktop && (
        <div className={`${mode === 'all' ? 'hidden md:block' : ''} space-y-4 w-full`}>
      {/* 2. COMPACT LEARNING HUD */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 sm:p-5 backdrop-blur-md space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              PHISHING INSPECTION
            </span>
          </div>

          <span className="text-xs font-mono text-cyan-400 font-bold">
            Inspection Progress: {progressPercent}%
          </span>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-3 gap-3 text-center">
          {/* Red Flags Found */}
          <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">
              Red Flags Found
            </div>
            <div className="text-base sm:text-xl font-mono font-extrabold text-cyan-300">
              {count} / {totalFlags}
            </div>
          </div>

          {/* Hints Available */}
          <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">
              Hints
            </div>
            <div className="text-base sm:text-xl font-mono font-extrabold text-amber-400">
              {hintsRemaining}
            </div>
          </div>

          {/* Inspection Progress */}
          <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">
              Progress
            </div>
            <div className="text-base sm:text-xl font-mono font-extrabold text-white">
              {progressPercent}%
            </div>
          </div>
        </div>

        {/* Animated Smooth Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-500 ease-out rounded-full ${
                isAllDiscovered
                  ? 'bg-gradient-to-r from-teal-400 to-emerald-400'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Hint Trigger Button */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={onUseHint}
            disabled={hintsRemaining <= 0 || isAllDiscovered}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 hover:text-amber-200 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Need a Hint? ({hintsRemaining} left)</span>
          </button>

          {hintsUsed > 0 && (
            <span className="text-[10px] font-mono text-slate-400">
              (-5 pts per hint)
            </span>
          )}
        </div>

        {/* Active Hint Card */}
        {activeHintText && (
          <div className="p-3 rounded-xl border border-amber-500/40 bg-amber-950/30 text-xs font-mono text-amber-200 flex items-start gap-2 animate-in fade-in duration-200">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-amber-300">CLUE: </span>
              <span>{activeHintText}</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. DISCOVERED RED FLAG LIST PANEL */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 sm:p-5 backdrop-blur-md space-y-3 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              RED FLAGS DISCOVERED
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {count} of {totalFlags}
          </span>
        </div>

        {count === 0 ? (
          <p className="text-xs font-mono text-slate-400 italic py-2">
            No red flags discovered yet. Tap suspicious elements in the phone message.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {ALL_RED_FLAGS.filter((item) => discoveredFlags.includes(item.id)).map(
              (item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectDiscoveredFlag(item.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between text-xs font-mono cyber-focus-ring cursor-pointer ${
                    activeDetail?.id === item.id
                      ? 'border-cyan-400 bg-cyan-950/70 text-cyan-200 shadow-sm'
                      : 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300 hover:border-emerald-400'
                  }`}
                >
                  <span className="flex items-center gap-1.5 font-bold truncate">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[3]" />
                    {item.label}
                  </span>
                  <span className="text-[10px] text-cyan-400 uppercase tracking-wider shrink-0 ml-1">
                    VIEW
                  </span>
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* 4. RED FLAG EXPLANATION PANEL */}
      {activeDetail ? (
        <div
          className={`p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 animate-in fade-in duration-200 space-y-3.5 ${
            activeDetail.id !== 'neutral'
              ? 'border-cyan-500/60 bg-slate-950/95 shadow-xl shadow-cyan-950/40'
              : 'border-slate-700 bg-slate-950/80'
          }`}
        >
          {/* Header Badge & Title */}
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800/80 pb-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${
                activeDetail.id !== 'neutral'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              {activeDetail.id !== 'neutral' ? (
                <AlertTriangle className="w-3 h-3 text-rose-400" />
              ) : (
                <Info className="w-3 h-3 text-slate-400" />
              )}
              {activeDetail.title}
            </span>

            {activeDetail.risk && (
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  activeDetail.risk === 'High'
                    ? 'border-rose-800 bg-rose-950/60 text-rose-300'
                    : 'border-amber-800 bg-amber-950/60 text-amber-300'
                }`}
              >
                RISK: {activeDetail.risk}
              </span>
            )}
          </div>

          <div>
            <h4 className="text-base font-extrabold text-white tracking-wide">
              {activeDetail.name}
            </h4>
          </div>

          {/* Why it matters */}
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-cyan-400 uppercase font-bold">
              Why it matters:
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              &quot;{activeDetail.whyItMatters}&quot;
            </p>
          </div>

          {/* Attack Pattern & Defensive Action */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-800/80">
            {activeDetail.attackPattern && (
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  ATTACK PATTERN:
                </span>
                <div className="text-xs font-mono font-bold text-white">
                  {activeDetail.attackPattern}
                </div>
              </div>
            )}

            {activeDetail.defensiveAction && (
              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/60 space-y-0.5">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  DEFENSIVE ACTION:
                </span>
                <div className="text-xs text-emerald-200 font-medium">
                  {activeDetail.defensiveAction}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 text-center text-xs text-slate-400 font-mono">
          Tap elements inside the phone screen to inspect them.
        </div>
      )}

      {/* 5. COMPLETION OF INSPECT STAGE & CONTINUE TO LEARN UNLOCK */}
      {isAllDiscovered && (
        <div className="p-6 rounded-2xl border-2 border-emerald-500/80 bg-gradient-to-r from-emerald-950/70 via-slate-950 to-teal-950/60 shadow-2xl space-y-4 animate-in zoom-in-95 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Inspection Complete
              </div>
              <h4 className="text-lg font-extrabold text-white">
                6 / 6 RED FLAGS FOUND
              </h4>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            Excellent. You identified the major warning signals in this simulated phishing message.
          </p>

          <Button
            type="button"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
            iconPosition="right"
            onClick={onContinueToLearn}
            className="w-full bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 font-bold shadow-lg shadow-emerald-950/50 cyber-focus-ring cursor-pointer"
          >
            Continue to Learn &rarr;
          </Button>
        </div>
      )}
        </div>
      )}
    </div>
  );
};
