'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileWarning
} from 'lucide-react';

interface RedFlag {
  id: string;
  title: string;
  type: string;
  description: string;
  marker: string;
}

const RED_FLAGS: RedFlag[] = [
  {
    id: 'sender',
    title: 'Suspicious Sender Domain',
    type: 'Spoofed Address',
    description: 'The display name says "Security Team", but the actual email address is "support@paypa1-security-notice.net" rather than the official domain.',
    marker: 'Flag 1',
  },
  {
    id: 'urgency',
    title: 'Manufactured Urgency',
    type: 'Psychological Coercion',
    description: '"Account suspended in 24 hours!" Attacker creates panic to suppress your critical thinking and prompt hasty action.',
    marker: 'Flag 2',
  },
  {
    id: 'link',
    title: 'Deceptive Lookalike Link',
    type: 'Typosquatted URL',
    description: 'The button text says "Secure Account Now", but hovering reveals the destination is "https://login.auth-verify-portal.top/signin".',
    marker: 'Flag 3',
  },
  {
    id: 'attachment',
    title: 'Unsolicited Attachment',
    type: 'Malicious Payload',
    description: 'Contains "Invoice_Overdue_Statement.html.zip" — archived executables or credential harvesting web forms masquerading as invoices.',
    marker: 'Flag 4',
  },
  {
    id: 'credentials',
    title: 'Direct Credential / MFA Request',
    type: 'Credential Harvesting',
    description: 'Asks you to verify your full password and current one-time authenticator passcode to "restore access". Legitimate providers never ask for OTPs.',
    marker: 'Flag 5',
  },
];

export const PhishingVisual: React.FC = () => {
  const [activeFlag, setActiveFlag] = useState<RedFlag>(RED_FLAGS[0]);
  const [viewMode, setViewMode] = useState<'anatomy' | 'comparison'>('anatomy');

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold block">
            Educational Threat Breakdown
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Anatomy of a Phishing Message
          </h3>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setViewMode('anatomy')}
            className={`px-3 py-1 rounded font-medium transition-colors ${
              viewMode === 'anatomy'
                ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Red Flag Anatomy
          </button>
          <button
            type="button"
            onClick={() => setViewMode('comparison')}
            className={`px-3 py-1 rounded font-medium transition-colors ${
              viewMode === 'comparison'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Side-by-Side Comparison
          </button>
        </div>
      </div>

      {viewMode === 'anatomy' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-start">
          {/* Simulated Email Card with Interactive Hotspots */}
          <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl text-left">
            {/* Email Header Bar */}
            <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-rose-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                SIMULATED MALICIOUS EMAIL (EDUCATIONAL PREVIEW)
              </span>
              <span className="text-[11px] text-slate-500">Inbox Preview</span>
            </div>

            {/* Email Metadata Fields */}
            <div className="p-4 space-y-2 border-b border-slate-800/80 text-xs bg-slate-900/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono">From:</span>
                  <span className="text-slate-200 font-semibold">Security Alert</span>
                  <span className="text-rose-400 font-mono text-[11px] underline decoration-rose-500/50">
                    &lt;support@paypa1-security-notice.net&gt;
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveFlag(RED_FLAGS[0])}
                  className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold border border-rose-500/40 hover:bg-rose-500/30 animate-pulse"
                >
                  Flag 1: Sender
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono">Subject:</span>
                  <span className="text-rose-300 font-bold">
                    [URGENT] Immediate Verification Needed: Account Restricted in 24h
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveFlag(RED_FLAGS[1])}
                  className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold border border-rose-500/40 hover:bg-rose-500/30"
                >
                  Flag 2: Urgency
                </button>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-5 space-y-4 text-xs text-slate-300 leading-relaxed">
              <p>Dear Valued Customer,</p>
              <p>
                We recently detected unauthorized sign-in attempts originating from an unrecognized IP address. To prevent permanent closure of your digital wallet, you must complete your security re-verification immediately.
              </p>

              {/* Call to Action Button in Email */}
              <div className="py-2 text-center">
                <button
                  type="button"
                  onClick={() => setActiveFlag(RED_FLAGS[2])}
                  className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950 transition-all inline-flex items-center gap-2 relative group"
                >
                  <span>Verify Identity & Restore Access</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="absolute -top-2.5 -right-2.5 px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-mono font-black">
                    Flag 3
                  </span>
                </button>
                <div className="mt-1.5 text-[10px] text-slate-500 font-mono">
                  Hovering displays: <span className="text-rose-400">https://login.auth-verify-portal.top/signin</span>
                </div>
              </div>

              {/* Attachment Flag */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <FileWarning className="w-4 h-4 text-amber-400" />
                  <span>Attachment: <code className="text-rose-300 font-mono">Account_Hold_Notice.html.zip</code></span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveFlag(RED_FLAGS[3])}
                  className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/40 hover:bg-amber-500/30"
                >
                  Flag 4: Attachment
                </button>
              </div>

              {/* Bottom OTP Request Warning */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-900">
                <span>Requests current 6-digit one-time passcode on landing page.</span>
                <button
                  type="button"
                  onClick={() => setActiveFlag(RED_FLAGS[4])}
                  className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold border border-rose-500/40"
                >
                  Flag 5: Credentials
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Flag Explanation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                  {activeFlag.marker} • {activeFlag.type}
                </span>
                <span className="text-xs text-slate-400 font-mono">Click tags to switch</span>
              </div>

              <h4 className="text-lg font-bold text-white">
                {activeFlag.title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {activeFlag.description}
              </p>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <span className="text-emerald-400 font-bold font-mono text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  DEFENSIVE HABIT:
                </span>
                <p className="text-slate-400">
                  {activeFlag.id === 'sender' && 'Always inspect the exact characters after the @ symbol, not just the display name.'}
                  {activeFlag.id === 'urgency' && 'Pause when an email triggers panic. Legitimate services do not delete accounts on 24-hour notice without multiple notices.'}
                  {activeFlag.id === 'link' && 'Never click links inside unverified emails. Type the known official URL directly into your browser bookmark.'}
                  {activeFlag.id === 'attachment' && 'Do not open unexpected attachments containing .zip, .iso, .html, or .exe extensions.'}
                  {activeFlag.id === 'credentials' && 'Legitimate support teams never require your password or MFA code to troubleshoot your account.'}
                </p>
              </div>
            </div>

            {/* Quick Flag Selector Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              {RED_FLAGS.map((flag) => (
                <button
                  key={flag.id}
                  type="button"
                  onClick={() => setActiveFlag(flag)}
                  className={`p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer ${
                    activeFlag.id === flag.id
                      ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <span className="font-semibold truncate">{flag.title}</span>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-1">{flag.marker}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Side-by-Side Comparison Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 text-left">
          {/* Legitimate Message */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-emerald-900/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>LEGITIMATE PROVIDER NOTIFICATION</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 text-xs font-mono text-slate-400 space-y-1">
              <div>From: notify@officialbank.com</div>
              <div>Subject: Monthly Account Statement Ready</div>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>Greets user by verified name or last 4 digits of account.</li>
              <li>Instructs user to log in via official app or bookmark.</li>
              <li>Contains no high-pressure countdowns or urgent threats.</li>
              <li>Does not include direct credential harvesting links.</li>
            </ul>
          </div>

          {/* Phishing Message */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-rose-900/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>PHISHING DECEPTION ATTEMPT</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 text-xs font-mono text-slate-400 space-y-1">
              <div>From: alerts@official-security-dept.cc</div>
              <div>Subject: URGENT: Complete KYC Now or Loss of Funds</div>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>Generic greeting: &ldquo;Dear User&rdquo; or &ldquo;Customer&rdquo;.</li>
              <li>Creates artificial panic with imminent penalties or suspension.</li>
              <li>Embeds direct links to unverified external domains.</li>
              <li>Demands passwords, PINs, or one-time authenticator codes.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Educational Footer */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Fictional Educational Examples Only</span>
        <span className="text-rose-400">Zero Real Malicious Infrastructure</span>
      </div>
    </div>
  );
};
