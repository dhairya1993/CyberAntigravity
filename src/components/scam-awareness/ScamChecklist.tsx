'use client';

import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Copy,
  Printer,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { SCAM_WARNING_CHECKLIST_ITEMS } from '@/data/scamAwarenessData';

export const ScamChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [copySuccess, setCopySuccess] = useState(false);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleReset = () => {
    setCheckedIds(new Set());
  };

  const handleCopy = () => {
    const text = [
      'CYBERANTIGRAVITY — SCAM WARNING CHECKLIST',
      'Before responding to any unexpected message, ask yourself:',
      ...SCAM_WARNING_CHECKLIST_ITEMS.map((item) => {
        const isChecked = checkedIds.has(item.id);
        return `[${isChecked ? 'X' : ' '}] ${item.text}`;
      }),
      '',
      'Source: https://cyberantigravity.com/scam-awareness',
    ].join('\n');

    const performFallback = () => {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2500);
        }
      } catch {
        // Fallback error handling
      }
    };

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2500);
        })
        .catch(() => performFallback());
    } else {
      performFallback();
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <section id="scam-checklist" className="py-16 sm:py-20 relative bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/80 bg-cyan-950/50 text-xs font-mono text-cyan-300 font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Quick Verification Tool</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                Scam Warning Checklist
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Before responding to an unexpected message, email, or call, run through these 8 critical verification questions:
              </p>
            </div>

            {/* Actions: Copy & Print */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Copy checklist to clipboard"
              >
                {copySuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Copy Checklist</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Print or save checklist"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-2.5">
            {SCAM_WARNING_CHECKLIST_ITEMS.map((item) => {
              const isChecked = checkedIds.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheck(item.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all duration-150 flex items-center gap-3.5 group ${
                    isChecked
                      ? 'border-cyan-500/50 bg-cyan-950/20 text-cyan-200'
                      : 'border-slate-800/80 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                  aria-pressed={isChecked}
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-cyan-400 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-500 group-hover:text-slate-400 shrink-0" />
                  )}
                  <span className="text-xs sm:text-sm font-medium leading-relaxed select-none">
                    {item.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Progress / Reset Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Verified: <strong className="text-cyan-400 font-mono">{checkedIds.size} of 8</strong> items checked
            </span>
            {checkedIds.size > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3 h-3 text-slate-500" />
                <span>Clear All Checks</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
