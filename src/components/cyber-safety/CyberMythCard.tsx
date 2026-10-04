import React from 'react';
import { XCircle, CheckCircle2, Lightbulb } from 'lucide-react';
import { CyberMythItem } from '@/types';

interface CyberMythCardProps {
  item: CyberMythItem;
}

export const CyberMythCard: React.FC<CyberMythCardProps> = ({ item }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg">
      <div className="space-y-4">
        {/* Myth Banner */}
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/50 space-y-1.5">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <XCircle className="w-4 h-4 shrink-0" />
            <span>Common Myth</span>
          </div>
          <p className="text-sm font-semibold text-rose-100 leading-snug">
            &ldquo;{item.myth}&rdquo;
          </p>
        </div>

        {/* Fact Banner */}
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>The Reality</span>
          </div>
          <p className="text-sm font-semibold text-emerald-100 leading-snug">
            {item.reality}
          </p>
        </div>

        {/* Explanation */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
          {item.explanation}
        </p>
      </div>

      {/* Practical Takeaway */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-start gap-2 text-xs text-cyan-300">
        <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <span className="leading-snug">
          <strong className="text-white font-semibold">Practical Takeaway:</strong> {item.takeaway}
        </span>
      </div>
    </div>
  );
};
