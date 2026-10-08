'use client';

import React from 'react';
import {
  Wifi,
  Battery,
  Lock,
  ChevronLeft,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export type PhishingRedFlagId =
  | 'sender'
  | 'urgency'
  | 'deadline'
  | 'threat'
  | 'verification'
  | 'url';

export type NeutralElementId = 'timestamp' | 'lock' | 'status-bar';

interface PhishingHeroPhoneVisualProps {
  discoveredFlags: PhishingRedFlagId[];
  activeElementId: string | null;
  onRedFlagClick: (id: PhishingRedFlagId) => void;
  onNeutralClick: (id: NeutralElementId) => void;
  isCompleted?: boolean;
}

export const PhishingHeroPhoneVisual: React.FC<PhishingHeroPhoneVisualProps> = ({
  discoveredFlags,
  activeElementId,
  onRedFlagClick,
  onNeutralClick,
  isCompleted = false,
}) => {
  return (
    <div className="relative w-full max-w-md mx-auto lg:max-w-none flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Ambient Cyber Backlight */}
      <div
        className={`absolute -inset-4 rounded-3xl blur-2xl opacity-60 pointer-events-none transition-all duration-700 ${
          isCompleted
            ? 'bg-gradient-to-tr from-emerald-500/25 via-cyan-500/20 to-teal-500/25'
            : 'bg-gradient-to-tr from-cyan-500/20 via-rose-500/15 to-amber-500/20'
        }`}
        aria-hidden="true"
      />

      {/* Interactive Guidance Pill */}
      <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/60 bg-cyan-950/80 text-cyan-200 text-xs font-mono font-semibold shadow-md shadow-cyan-950/40">
        <span aria-hidden="true">🔍</span>
        <span>Tap suspicious elements</span>
      </div>

      {/* Smartphone Chassis - width: min(88vw, 380px) on mobile, centered horizontally */}
      <div
        className={`relative w-[min(88vw,380px)] sm:w-full sm:max-w-[430px] lg:max-w-[450px] mx-auto bg-slate-950 rounded-[44px] sm:rounded-[48px] p-3.5 sm:p-4.5 border-2 shadow-2xl backdrop-blur-md transition-all duration-500 ${
          isCompleted
            ? 'border-emerald-500/70 shadow-emerald-950/50'
            : 'border-slate-700/80 shadow-cyan-950/50'
        }`}
      >
        {/* Subtle Outer Bezel Light */}
        <div
          className={`absolute inset-0 rounded-[46px] border pointer-events-none transition-colors ${
            isCompleted ? 'border-emerald-500/40' : 'border-cyan-500/30'
          }`}
        />

        {/* Dynamic Island / Top Speaker & Camera Notch */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-slate-900 rounded-full flex items-center justify-center gap-2 border border-slate-800 z-30">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800" />
          <div
            className={`w-2 h-2 rounded-full border animate-pulse ${
              isCompleted
                ? 'bg-emerald-950 border-emerald-500'
                : 'bg-cyan-950 border-cyan-800'
            }`}
          />
        </div>

        {/* Inner Phone Screen Container */}
        <div className="relative rounded-[38px] bg-[#070b14] border border-slate-800/90 overflow-hidden pt-9 pb-6 px-4 sm:px-5 text-slate-100 flex flex-col justify-between min-h-[570px]">
          {/* Subtle Grid Matrix in Screen Background */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#0e1726_1px,transparent_1px),linear-gradient(to_bottom,#0e1726_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 pointer-events-none"
            aria-hidden="true"
          />

          {/* Top Status Bar (Interactive Neutral Target) */}
          <button
            type="button"
            onClick={() => onNeutralClick('status-bar')}
            title="Inspect status bar"
            className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-800/60 px-1 w-full text-left rounded hover:bg-slate-900/50 transition-colors"
          >
            <span className="font-bold text-slate-300">09:41 AM</span>
            <div className="flex items-center gap-2 text-slate-400">
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded border font-mono font-bold ${
                  isCompleted
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80'
                    : 'bg-rose-950/80 text-rose-300 border-rose-800/80'
                }`}
              >
                {isCompleted ? 'VERIFIED' : 'SIM LAB'}
              </span>
              <Wifi className="w-3.5 h-3.5" aria-hidden={true} />
              <Battery className="w-4 h-4" aria-hidden={true} />
            </div>
          </button>

          {/* Messaging App Top Navigation */}
          <div className="relative z-10 py-3 flex items-center justify-between border-b border-slate-800/80 gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-slate-900 text-slate-400">
                <ChevronLeft className="w-4 h-4" />
              </div>

              {/* Element 1: SENDER (Clickable Red Flag) with 3 Distinct States */}
              <button
                type="button"
                onClick={() => onRedFlagClick('sender')}
                className={`text-left p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer cyber-focus-ring ${
                  activeElementId === 'sender'
                    ? 'border-cyan-400 bg-cyan-950/80 shadow-md shadow-cyan-950/80 scale-[1.01]'
                    : discoveredFlags.includes('sender')
                    ? 'border-emerald-500/70 bg-emerald-950/30 text-emerald-200'
                    : 'border-slate-800 bg-slate-900/40 hover:border-cyan-400 hover:bg-slate-900/80 hover:shadow-sm hover:shadow-cyan-950/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    SecureBank Alerts
                  </span>
                  {discoveredFlags.includes('sender') ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  )}
                </div>
                <div className="text-[11px] font-mono text-slate-400">+1 (555) 014-0192</div>
              </button>
            </div>

            {/* Neutral Lock Icon */}
            <button
              type="button"
              onClick={() => onNeutralClick('lock')}
              title="Inspect security icon"
              className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Lock className="w-4 h-4" aria-hidden={true} />
            </button>
          </div>

          {/* Message Content with Interactive Suspicious and Neutral Elements */}
          <div className="relative z-10 py-3.5 space-y-3">
            {/* Timestamp (Clickable Neutral Detail) */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => onNeutralClick('timestamp')}
                className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-md border transition-all duration-200 cursor-pointer cyber-focus-ring ${
                  activeElementId === 'timestamp'
                    ? 'border-cyan-400 bg-cyan-950/70 text-cyan-300'
                    : 'text-slate-500 bg-slate-900/90 border-slate-800 hover:border-cyan-400 hover:text-slate-200'
                }`}
              >
                Today 09:38 AM • SMS
              </button>
            </div>

            {/* Chat Bubble Container with Clickable Elements */}
            <div className="relative rounded-2xl bg-slate-900/95 border-2 border-slate-700/80 p-4 sm:p-5 shadow-lg space-y-3">
              {/* Element 2: Urgent wording */}
              <button
                type="button"
                onClick={() => onRedFlagClick('urgency')}
                className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all duration-200 cursor-pointer cyber-focus-ring ${
                  activeElementId === 'urgency'
                    ? 'border-rose-400 bg-rose-950/80 shadow-md shadow-rose-950/80 scale-[1.01]'
                    : discoveredFlags.includes('urgency')
                    ? 'border-emerald-500/70 bg-emerald-950/30'
                    : 'border-slate-800 bg-rose-950/20 hover:border-cyan-400 hover:bg-rose-950/40 hover:shadow-sm hover:shadow-cyan-950/40'
                }`}
              >
                <div className="flex items-center justify-between pb-0.5">
                  <span className="text-[10px] font-mono uppercase text-rose-300 font-bold tracking-wider">
                    {discoveredFlags.includes('urgency') ? '✓ FLAGGED' : 'TAP TO INSPECT'}
                  </span>
                  {discoveredFlags.includes('urgency') && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </div>
                <p className="text-xs sm:text-sm font-bold text-rose-200 leading-snug">
                  URGENT: Your account has been temporarily restricted.
                </p>
              </button>

              {/* Elements 3 & 5: Verification request & 30-minute deadline */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                {/* Element 5: Verification request */}
                <button
                  type="button"
                  onClick={() => onRedFlagClick('verification')}
                  className={`flex-1 text-left p-2.5 rounded-xl border transition-all duration-200 cursor-pointer cyber-focus-ring ${
                    activeElementId === 'verification'
                      ? 'border-cyan-400 bg-cyan-950/80 shadow-md scale-[1.01]'
                      : discoveredFlags.includes('verification')
                      ? 'border-emerald-500/70 bg-emerald-950/30'
                      : 'border-slate-800 bg-slate-950/70 hover:border-cyan-400 hover:bg-cyan-950/30 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                      ACTION
                    </span>
                    {discoveredFlags.includes('verification') && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                    Verify your account
                  </span>
                </button>

                {/* Element 3: 30-minute deadline */}
                <button
                  type="button"
                  onClick={() => onRedFlagClick('deadline')}
                  className={`flex-1 text-left p-2.5 rounded-xl border transition-all duration-200 cursor-pointer cyber-focus-ring ${
                    activeElementId === 'deadline'
                      ? 'border-amber-400 bg-amber-950/80 shadow-md scale-[1.01]'
                      : discoveredFlags.includes('deadline')
                      ? 'border-emerald-500/70 bg-emerald-950/30'
                      : 'border-slate-800 bg-amber-950/20 hover:border-cyan-400 hover:bg-amber-950/40 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">
                      DEADLINE
                    </span>
                    {discoveredFlags.includes('deadline') && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-amber-200 font-bold leading-snug">
                    within 30 minutes
                  </span>
                </button>
              </div>

              {/* Element 6: Suspicious URL */}
              <button
                type="button"
                onClick={() => onRedFlagClick('url')}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer cyber-focus-ring ${
                  activeElementId === 'url'
                    ? 'border-cyan-400 bg-cyan-950/90 shadow-lg shadow-cyan-950/80 scale-[1.01]'
                    : discoveredFlags.includes('url')
                    ? 'border-emerald-500/70 bg-emerald-950/40'
                    : 'border-slate-800 bg-cyan-950/30 hover:border-cyan-400 hover:bg-cyan-950/50 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider font-bold">
                    DESTINATION LINK
                  </span>
                  <div className="flex items-center gap-1.5">
                    {discoveredFlags.includes('url') ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                  </div>
                </div>
                <div className="font-mono text-xs sm:text-sm text-cyan-200 underline underline-offset-4 break-all font-semibold">
                  https://securebank-verify.example
                </div>
              </button>

              {/* Element 4: Account suspension threat */}
              <button
                type="button"
                onClick={() => onRedFlagClick('threat')}
                className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all duration-200 cursor-pointer cyber-focus-ring ${
                  activeElementId === 'threat'
                    ? 'border-rose-400 bg-rose-950/80 shadow-md scale-[1.01]'
                    : discoveredFlags.includes('threat')
                    ? 'border-emerald-500/70 bg-emerald-950/30'
                    : 'border-slate-800 bg-slate-950/70 hover:border-cyan-400 hover:bg-slate-900/80 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[10px] font-mono text-rose-300 uppercase font-semibold">
                    CONSEQUENCE
                  </span>
                  {discoveredFlags.includes('threat') && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-snug">
                  Failure to verify may result in account limitations.
                </p>
              </button>
            </div>

            {/* Helper instructions text */}
            <div className="text-center pt-1">
              <span className="text-[11px] font-mono text-slate-400">
                Tap each phrase or header inside the message to analyze threats
              </span>
            </div>
          </div>

          {/* Bottom Telemetry HUD Bar */}
          <div className="relative z-10 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              SIMULATOR ACTIVE
            </span>
            <span className="text-emerald-400 font-bold">
              {discoveredFlags.length} / 6 DETECTED
            </span>
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
        </div>
      </div>
    </div>
  );
};
