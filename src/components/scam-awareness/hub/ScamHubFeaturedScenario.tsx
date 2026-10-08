'use client';

import React from 'react';
import {
  AlertTriangle,
  Clock,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  UserX,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ScamHubFeaturedScenario: React.FC = () => {
  return (
    <section
      className="py-14 sm:py-20 bg-gradient-to-b from-[#07090e] via-[#0a0e1a] to-[#07090e] border-b border-slate-800/80 relative overflow-hidden"
      aria-labelledby="featured-practice-heading"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-amber-500/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-800/60 bg-amber-950/40 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
            FEATURED PRACTICE
          </div>
          <h2 id="featured-practice-heading" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Can You Spot the Scam?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Inspect this realistic mock message. Notice how psychological manipulation and deceptive signals work together.
          </p>
        </div>

        {/* 2-Column Showcase: Mockup on Left/Center, 3 Warning Indicators on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Realistic Mobile Messaging Mockup */}
          <div className="lg:col-span-6 w-full">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5 shadow-2xl overflow-hidden">
              {/* Simulated Scenario Disclaimer Ribbon */}
              <div className="mb-4 flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-amber-950/50 border border-amber-800/60 text-amber-300">
                <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wide uppercase">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                  SIMULATED EDUCATIONAL SCENARIO
                </span>
                <span className="text-[10px] text-amber-400/80 font-mono hidden sm:inline">
                  FICTIONAL DATA
                </span>
              </div>

              {/* Chat Window Frame */}
              <div className="rounded-xl border border-slate-800/90 bg-[#0d121d] overflow-hidden">
                {/* Chat Top Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                      <UserX className="w-4 h-4 text-amber-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">
                        +1 (800) 555-0142
                      </p>
                      <p className="text-[10px] text-amber-400/90 font-mono">
                        Unknown Sender &bull; Not Verified
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Today 10:14 AM</span>
                </div>

                {/* Chat Body */}
                <div className="p-4 sm:p-5 space-y-3 bg-[radial-gradient(#1e293b20_1px,transparent_1px)] bg-[size:16px_16px]">
                  {/* Chat Message Bubble */}
                  <div className="max-w-md rounded-2xl rounded-tl-sm bg-slate-900 border border-amber-500/40 p-4 shadow-lg space-y-2.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-400 font-mono uppercase">
                      <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                      URGENT SECURITY ALERT
                    </div>

                    <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                      URGENT: Your bank account will be suspended today. Verify your account immediately using the link below:
                    </p>

                    {/* Malicious Link Mockup */}
                    <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/40 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Lock className="w-3.5 h-3.5 text-rose-400 shrink-0" aria-hidden="true" />
                        <span className="text-xs font-mono text-rose-300 truncate underline">
                          https://security-verify-bank-alert.xyz/auth
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-rose-400 shrink-0" aria-hidden="true" />
                    </div>

                    <div className="flex justify-end pt-1">
                      <span className="text-[10px] text-slate-400 font-mono">10:14 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Visible Warning Indicators (Right Column) */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              3 Critical Red Flags In This Message
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Threat actors combine psychological pressure with spoofed infrastructure. Look for these three clear warning signals:
            </p>

            <div className="space-y-3 pt-1">
              {/* Indicator 1: URGENCY */}
              <div className="rounded-xl border border-amber-900/50 bg-slate-950/70 p-4 backdrop-blur-sm transition-all hover:border-amber-500/60">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-950/60 border border-amber-800/80 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950 border border-amber-800/80 text-amber-300 uppercase">
                        INDICATOR 01
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        URGENCY
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      Imposes an artificial deadline (&quot;today&quot;, &quot;immediately&quot;) to trigger fear and prevent you from pausing to verify the sender through trusted channels.
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicator 2: SUSPICIOUS LINK */}
              <div className="rounded-xl border border-rose-900/50 bg-slate-950/70 p-4 backdrop-blur-sm transition-all hover:border-rose-500/60">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-rose-950/60 border border-rose-800/80 flex items-center justify-center shrink-0 text-rose-400 mt-0.5">
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-950 border border-rose-800/80 text-rose-300 uppercase">
                        INDICATOR 02
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        SUSPICIOUS LINK
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      Uses an unverified domain (<code className="text-rose-300 font-mono text-[11px]">.xyz</code>) masquerading as a bank portal, designed to harvest banking credentials and 2FA codes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicator 3: THREAT OF ACCOUNT LOSS */}
              <div className="rounded-xl border border-purple-900/50 bg-slate-950/70 p-4 backdrop-blur-sm transition-all hover:border-purple-500/60">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-950/60 border border-purple-800/80 flex items-center justify-center shrink-0 text-purple-400 mt-0.5">
                    <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-950 border border-purple-800/80 text-purple-300 uppercase">
                        INDICATOR 03
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        THREAT OF ACCOUNT LOSS
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      Weaponizes loss aversion and coercive pressure to provoke impulsive compliance without consulting the bank&apos;s official support line.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-3">
              <Button
                asLink
                href="/scam-awareness/red-flags"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5 text-slate-950" aria-hidden="true" />}
                iconPosition="right"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-bold shadow-lg shadow-amber-950/30 cyber-focus-ring"
              >
                Analyze This Scenario &rarr;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
