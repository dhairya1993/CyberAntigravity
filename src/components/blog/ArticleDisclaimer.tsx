import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const ArticleDisclaimer: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5 backdrop-blur-sm flex items-start gap-3.5 text-xs text-slate-400 my-8">
      <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <strong className="text-slate-300 block mb-0.5">Educational Purpose Mandate:</strong>
        CyberAntigravity articles are provided for educational and defensive awareness. Content does not constitute individual legal, financial, or certified security auditing advice. Threats evolve over time, so verify current guidance from trusted official sources. Technical concepts and defensive techniques should only be practiced in authorized, self-contained environments.
      </div>
    </div>
  );
};
