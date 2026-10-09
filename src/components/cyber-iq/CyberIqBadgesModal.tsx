'use client';

import React, { useEffect } from 'react';
import {
  X,
  Award,
  Lock,
  CheckCircle2,
  Sparkles,
  Trophy,
  MailCheck,
  KeyRound,
  AlertTriangle,
  EyeOff,
  Wifi,
  Terminal,
} from 'lucide-react';
import { CYBER_IQ_BADGES } from '@/data/cyberIqQuestions';

const BADGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  CheckCircle2,
  MailCheck,
  KeyRound,
  AlertTriangle,
  EyeOff,
  Wifi,
  Terminal,
  Award,
};

interface CyberIqBadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedBadgeIds: string[];
}

export const CyberIqBadgesModal: React.FC<CyberIqBadgesModalProps> = ({
  isOpen,
  onClose,
  unlockedBadgeIds,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unlockedCount = unlockedBadgeIds.length;
  const totalCount = CYBER_IQ_BADGES.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="badges-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-800 text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 id="badges-modal-title" className="text-lg font-bold text-white">
                Arena Achievement Badges
              </h3>
              <p className="text-xs text-slate-400">
                {unlockedCount} of {totalCount} Badges Unlocked
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close badges modal"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CYBER_IQ_BADGES.map((badge) => {
              const isUnlocked = unlockedBadgeIds.includes(badge.id);
              const IconComp = BADGE_ICONS[badge.iconName] || Trophy;

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    isUnlocked
                      ? 'bg-slate-900/90 border-purple-500/40 shadow-lg shadow-purple-950/20'
                      : 'bg-slate-950/60 border-slate-900 opacity-60'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                      isUnlocked
                        ? 'bg-purple-950/80 text-purple-300 border-purple-700'
                        : 'bg-slate-900 text-slate-600 border-slate-800'
                    }`}
                  >
                    {isUnlocked ? (
                      <IconComp className="w-5 h-5" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-600" />
                    )}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4
                        className={`text-xs font-bold ${
                          isUnlocked ? 'text-white' : 'text-slate-400'
                        }`}
                      >
                        {badge.title}
                      </h4>
                      {isUnlocked && (
                        <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Unlocked</span>
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 leading-tight">
                      {badge.description}
                    </p>

                    <div className="pt-1 text-[10px] font-mono text-cyan-400/90">
                      Requirement: {badge.conditionDescription}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Stored locally in this browser</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
