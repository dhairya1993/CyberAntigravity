'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ScamHubSafetyNotice: React.FC = () => {
  return (
    <section className="py-8 sm:py-10 bg-[#05070c] border-t border-slate-800/60" aria-label="Educational Safety Disclaimer">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 sm:p-5 backdrop-blur-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-amber-950/40 border border-amber-800/60 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              <p className="font-semibold text-slate-200">
                Educational Guidance Notice
              </p>
              <p>
                CyberAntigravity provides educational scam-awareness information and simulated scenarios. No scenario or checklist can guarantee that a message, website, person, or transaction is safe. Always independently verify important requests through official channels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
