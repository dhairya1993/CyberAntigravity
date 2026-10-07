'use client';

import React, { useState } from 'react';
import {
  Eye,
  Hand,
  MousePointerClick,
  CheckCircle,
  KeyRound,
  Megaphone,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface Step {
  id: number;
  code: string;
  title: string;
  headline: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
  borderColor: string;
  textColor: string;
  summary: string;
  detailedAction: string;
  proTip: string;
}

const FLOW_STEPS: Step[] = [
  {
    id: 1,
    code: 'STEP 01',
    title: 'SPOT',
    headline: 'Recognize the Warning Signs',
    icon: Eye,
    accentColor: 'from-cyan-500 to-blue-500',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    borderColor: 'hover:border-cyan-500/50',
    textColor: 'text-cyan-400',
    summary: 'Spot the initial hook: urgency, artificial fear, unsolicited contact, or mismatched sender addresses.',
    detailedAction: 'Scan incoming communications for high-pressure language ("Account suspension in 30 minutes!"), unrequested OTPs, or suspicious domains before reacting.',
    proTip: 'Look at the sender address or URL bar first, not the scary message body.',
  },
  {
    id: 2,
    code: 'STEP 02',
    title: 'STOP',
    headline: 'Pause Before Responding',
    icon: Hand,
    accentColor: 'from-amber-500 to-yellow-500',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    borderColor: 'hover:border-amber-500/50',
    textColor: 'text-amber-400',
    summary: 'Pause before responding. Take a breath and break the scammer’s psychological momentum.',
    detailedAction: 'Scammers design threats to trigger fight-or-flight adrenaline. Stepping away for even 60 seconds lets rational critical thinking regain control.',
    proTip: 'No legitimate financial or governmental institution requires compliance within 15 minutes.',
  },
  {
    id: 3,
    code: 'STEP 03',
    title: "DON'T CLICK",
    headline: 'Keep Hands Off Unverified Links',
    icon: MousePointerClick,
    accentColor: 'from-rose-500 to-red-500',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    borderColor: 'hover:border-rose-500/50',
    textColor: 'text-rose-400',
    summary: 'Never tap hyperlinks, download unsolicited email attachments, or call phone numbers printed in the alert.',
    detailedAction: 'Malicious links route you to spoofed credential-harvesting portals or trigger automated token-stealing payloads. Never submit passwords or 2FA codes.',
    proTip: 'If on desktop, hover without clicking to inspect the real destination domain.',
  },
  {
    id: 4,
    code: 'STEP 04',
    title: 'VERIFY',
    headline: 'Use Independent Known Channels',
    icon: CheckCircle,
    accentColor: 'from-emerald-500 to-teal-500',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    borderColor: 'hover:border-emerald-500/50',
    textColor: 'text-emerald-400',
    summary: 'Use an official website, app, or known contact method completely outside the message.',
    detailedAction: 'Open a fresh browser window, type the official address yourself (e.g., your bank’s known URL), or dial the number embossed on the back of your physical payment card.',
    proTip: 'Never call back the number that just called or texted you.',
  },
  {
    id: 5,
    code: 'STEP 05',
    title: 'SECURE',
    headline: 'Contain Compromise Immediately',
    icon: KeyRound,
    accentColor: 'from-purple-500 to-violet-500',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    borderColor: 'hover:border-purple-500/50',
    textColor: 'text-purple-400',
    summary: 'If credentials or card numbers were entered, lock the card, reset passwords, and revoke active sessions.',
    detailedAction: 'Freeze affected credit/debit cards instantly in your bank app. Change primary passwords from a separate clean device and enable passkeys or hardware MFA.',
    proTip: 'Sign out of all existing device sessions across account security settings.',
  },
  {
    id: 6,
    code: 'STEP 06',
    title: 'REPORT',
    headline: 'Alert Authorities & Protect Others',
    icon: Megaphone,
    accentColor: 'from-sky-500 to-indigo-500',
    badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    borderColor: 'hover:border-sky-500/50',
    textColor: 'text-sky-400',
    summary: 'Submit the threat to your IT security team, carrier spam-reporting system, and official national cyber centers.',
    detailedAction: 'Forward malicious SMS to 7726 (SPAM) in many regions, report phishing URLs to Google Safe Browsing / Microsoft SmartScreen, and notify internal IT if targeted at work.',
    proTip: 'Your report helps security providers update threat telemetry, protecting millions worldwide.',
  },
];

export function ScamEmergencyFlow() {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const activeStep = FLOW_STEPS.find((s) => s.id === activeStepId) || FLOW_STEPS[0];

  return (
    <section id="scam-response-flow" className="py-16 md:py-24 bg-slate-900/40 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium tracking-wide uppercase mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            Defensive Protocol
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Scam Response Flow: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-300">6 Critical Actions</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            A battle-tested emergency sequence when confronting suspicious messages, calls, or unrequested payment prompts.
          </p>
        </div>

        {/* 6 Flow Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mb-10">
          {FLOW_STEPS.map((step, idx) => {
            const isCurrent = step.id === activeStepId;
            const StepIcon = step.icon;

            return (
              <div key={step.id} className="relative flex flex-col">
                <button
                  onClick={() => setActiveStepId(step.id)}
                  className={`flex-1 p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                    isCurrent
                      ? 'bg-slate-900 border-cyan-500/70 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500/30'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                  aria-label={`Step ${step.id}: ${step.title}`}
                >
                  <div>
                    {/* Step Code & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${step.badgeBg}`}>
                        {step.code}
                      </span>
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isCurrent
                            ? 'bg-cyan-500/20 text-cyan-300'
                            : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        <StepIcon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className={`text-base font-extrabold tracking-tight ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {step.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className={isCurrent ? step.textColor : 'text-slate-500'}>
                      {isCurrent ? 'Viewing details' : 'Click to inspect'}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isCurrent ? 'translate-x-0.5 text-cyan-400' : 'text-slate-600'}`} />
                  </div>
                </button>

                {/* Desktop connector arrow between steps */}
                {idx < FLOW_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-slate-600">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Deep Dive Active Step Panel */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <activeStep.icon className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${activeStep.badgeBg}`}>
                    {activeStep.code}
                  </span>
                  <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">
                    Defensive Milestone
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {activeStep.title}: <span className="text-slate-300 font-semibold">{activeStep.headline}</span>
                </h3>
                <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {activeStep.detailedAction}
                </p>
              </div>
            </div>

            {/* Pro Tip Box */}
            <div className="w-full lg:w-80 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex-shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Defensive Pro-Tip
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeStep.proTip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
