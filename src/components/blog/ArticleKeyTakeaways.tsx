import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ArticleKeyTakeawaysProps {
  takeaways: string[];
}

export const ArticleKeyTakeaways: React.FC<ArticleKeyTakeawaysProps> = ({ takeaways }) => {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-5 sm:p-7 shadow-sm shadow-cyan-500/5 my-8 space-y-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-cyan-400" />
        <h3 className="text-sm sm:text-base font-mono font-bold text-white uppercase tracking-wider">
          Key Defensive Takeaways
        </h3>
      </div>

      <ul className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
        {takeaways.map((takeaway, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{takeaway}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
