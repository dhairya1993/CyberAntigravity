'use client';

import React, { useState } from 'react';
import {
  LifeBuoy,
  ExternalLink,
  Phone,
  Globe,
  ShieldAlert,
} from 'lucide-react';
import { WHAT_TO_DO_STEPS, REGIONAL_REPORTING_AUTHORITIES } from '@/data/scamAwarenessData';

export const ScamResponseSteps: React.FC = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');

  const selectedAuthority =
    REGIONAL_REPORTING_AUTHORITIES.find((a) => a.code === selectedCountryCode) ||
    REGIONAL_REPORTING_AUTHORITIES[0];

  return (
    <section id="what-to-do" className="py-16 sm:py-20 relative bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-xs font-mono text-cyan-400 font-semibold mb-3">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Emergency Action Protocol</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Think You’ve Encountered a Scam?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Follow this clear 8-step containment protocol immediately. Speed and emotional restraint prevent initial contact from turning into financial loss.
          </p>
        </div>

        {/* 8 Practical Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHAT_TO_DO_STEPS.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
            >
              <div>
                <span className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center mb-4">
                  0{step.step}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{step.action}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 leading-normal">
                {step.details}
              </div>
            </div>
          ))}
        </div>

        {/* Anti-Recovery Scam Warning Callout */}
        <div className="p-5 sm:p-6 rounded-2xl border border-rose-900/60 bg-rose-950/20 text-rose-200 text-xs sm:text-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-rose-300">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>CRITICAL WARNING: Beware of Secondary &quot;Asset Recovery&quot; Scams</span>
          </div>
          <p className="leading-relaxed">
            If you recently lost funds to a scam, you may receive messages from self-proclaimed &quot;ethical hackers,&quot; &quot;recovery agents,&quot; or private investigators claiming they can retrieve your stolen money or cryptocurrency for a fee. <strong>These are 100% fraudulent secondary scams.</strong> Private individuals cannot legally or technically reverse cryptocurrency transactions or remote wire transfers. Never pay anyone to recover stolen funds.
          </p>
        </div>

        {/* Official Country Reporting Authorities Architecture */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
                Official Government Reporting Channels
              </span>
              <h3 className="text-xl font-bold text-white">Where to Report Scams by Country</h3>
            </div>

            {/* Country Selector Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
              {REGIONAL_REPORTING_AUTHORITIES.map((auth) => (
                <button
                  key={auth.code}
                  type="button"
                  onClick={() => setSelectedCountryCode(auth.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all shrink-0 ${
                    selectedCountryCode === auth.code
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {auth.country}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Authority Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{selectedAuthority.agencyName}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800 bg-slate-950 text-slate-400">
                  {selectedAuthority.code}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedAuthority.notes}
              </p>
              {selectedAuthority.phone && (
                <div className="flex items-center gap-2 text-xs text-amber-400 font-mono font-medium">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Official Helpline: {selectedAuthority.phone}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-4 flex md:justify-end">
              <a
                href={selectedAuthority.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors shadow-md shadow-cyan-950 w-full md:w-auto justify-center"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Official Reporting Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
