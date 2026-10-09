import React from 'react';
import { Info } from 'lucide-react';

export const TrustNoticeSection: React.FC = () => {
  return (
    <section className="py-8 relative">
      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 sm:p-6 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-slate-400 leading-relaxed">
            <div className="font-semibold text-slate-200 flex items-center gap-2">
              <span>Educational Platform Disclaimer</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Ethical Learning Scope
              </span>
            </div>
            <p>
              CyberAntigravity is an independent educational cybersecurity platform. Information, calculations, and simulations are provided solely for conceptual learning and threat awareness and do not guarantee protection from real-world cyber incidents or substitute for certified enterprise security audits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
