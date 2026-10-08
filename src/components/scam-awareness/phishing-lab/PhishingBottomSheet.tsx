'use client';

import React, { useEffect, useRef } from 'react';
import {
  X,
  AlertTriangle,
  Info,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { InspectionDetail } from './PhishingInspectionHUD';

interface PhishingBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  detail: InspectionDetail | null;
}

export const PhishingBottomSheet: React.FC<PhishingBottomSheetProps> = ({
  isOpen,
  onClose,
  detail,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const gotItButtonRef = useRef<HTMLButtonElement>(null);
  const [touchStartY, setTouchStartY] = React.useState<number | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Auto-focus "Got It" button when sheet opens for keyboard accessibility
      setTimeout(() => {
        gotItButtonRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Touch gesture support: swipe down to dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY !== null) {
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      if (deltaY > 50) {
        onClose();
      }
      setTouchStartY(null);
    }
  };

  if (!isOpen || !detail) return null;

  const isRedFlag = detail.id !== 'neutral';

  return (
    <div
      className="fixed inset-0 z-50 md:hidden flex flex-col justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bottom-sheet-title"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-Up Bottom Sheet Panel */}
      <div
        ref={sheetRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 w-full max-h-[50vh] overflow-y-auto bg-[#0b1120] border-t-2 border-x border-slate-700/90 rounded-t-3xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-300 text-slate-100"
      >
        {/* Top Centered Drag Handle Pill */}
        <div className="flex justify-center -mt-1 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-slate-700/80" aria-hidden="true" />
        </div>

        {/* Header: Badge & Close Button */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${
                isRedFlag
                  ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              {isRedFlag ? (
                <AlertTriangle className="w-3 h-3 text-rose-400" />
              ) : (
                <Info className="w-3 h-3 text-slate-400" />
              )}
              {isRedFlag ? 'RED FLAG DETECTED' : detail.title}
            </span>

            {detail.risk && (
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  detail.risk === 'High'
                    ? 'border-rose-800 bg-rose-950/60 text-rose-300'
                    : 'border-amber-800 bg-amber-950/60 text-amber-300'
                }`}
              >
                RISK: {detail.risk}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close explanation"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div>
          <h3
            id="bottom-sheet-title"
            className="text-base sm:text-lg font-extrabold text-white tracking-wide"
          >
            {detail.name}
          </h3>
        </div>

        {/* Short Explanation / Why it matters */}
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
            Why it matters:
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            &quot;{detail.whyItMatters}&quot;
          </p>
        </div>

        {/* Attack Pattern & Defensive Action */}
        <div className="grid grid-cols-1 gap-2 pt-1">
          {detail.attackPattern && (
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 uppercase text-[10px]">ATTACK PATTERN:</span>
              <span className="font-bold text-white">{detail.attackPattern}</span>
            </div>
          )}

          {detail.defensiveAction && (
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 space-y-0.5">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                DEFENSIVE ACTION:
              </span>
              <p className="text-xs text-emerald-200 font-medium">
                {detail.defensiveAction}
              </p>
            </div>
          )}
        </div>

        {/* Primary "Got It" Button */}
        <div className="pt-2">
          <button
            ref={gotItButtonRef}
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all cyber-focus-ring cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
            <span>Got It</span>
          </button>
        </div>
      </div>
    </div>
  );
};
