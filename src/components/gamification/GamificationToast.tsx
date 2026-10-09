'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Award,
  Trophy,
  X,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { GamificationNotificationEvent } from '@/types/gamification';
import { GAMIFICATION_NOTIFY_EVENT } from '@/hooks/useGamification';

export const GamificationToast: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<GamificationNotificationEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleNotify = (e: Event) => {
      const customEvent = e as CustomEvent<GamificationNotificationEvent>;
      if (!customEvent.detail) return;

      clearTimeout(timeoutId);
      setCurrentNotification(customEvent.detail);
      setIsVisible(true);

      // Auto-dismiss after 4.5 seconds
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 4500);
    };

    window.addEventListener(GAMIFICATION_NOTIFY_EVENT, handleNotify);
    return () => {
      window.removeEventListener(GAMIFICATION_NOTIFY_EVENT, handleNotify);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!currentNotification || !isVisible) {
    return null;
  }

  const isLevelUp = currentNotification.type === 'level_up';
  const isBadge = currentNotification.type === 'badge';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm sm:max-w-md w-full px-4 sm:px-0 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div
        className={`p-4 rounded-2xl shadow-2xl backdrop-blur-md border flex items-start gap-3.5 relative overflow-hidden transition-all ${
          isLevelUp
            ? 'bg-gradient-to-r from-purple-950/90 via-slate-900/95 to-slate-950/95 border-purple-500/50 shadow-purple-500/20'
            : isBadge
            ? 'bg-gradient-to-r from-amber-950/90 via-slate-900/95 to-slate-950/95 border-amber-500/50 shadow-amber-500/20'
            : 'bg-gradient-to-r from-cyan-950/90 via-slate-900/95 to-slate-950/95 border-cyan-500/40 shadow-cyan-500/20'
        }`}
      >
        {/* Glow corner ambient */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Icon Pill */}
        <div
          className={`p-2.5 rounded-xl shrink-0 ${
            isLevelUp
              ? 'bg-purple-900/60 text-purple-300 border border-purple-500/40'
              : isBadge
              ? 'bg-amber-900/60 text-amber-300 border border-amber-500/40'
              : 'bg-cyan-900/60 text-cyan-300 border border-cyan-500/40'
          }`}
        >
          {isLevelUp ? (
            <Trophy className="w-5 h-5 text-purple-400" />
          ) : isBadge ? (
            <Award className="w-5 h-5 text-amber-400" />
          ) : (
            <Sparkles className="w-5 h-5 text-cyan-400" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-1 min-w-0 pr-6">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-mono font-bold tracking-wide uppercase ${
                isLevelUp
                  ? 'text-purple-400'
                  : isBadge
                  ? 'text-amber-400'
                  : 'text-cyan-400'
              }`}
            >
              {isLevelUp ? 'Level Advancement' : isBadge ? 'Achievement Unlocked' : 'XP Awarded'}
            </span>
            {currentNotification.xpEarned && (
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">
                +{currentNotification.xpEarned} XP
              </span>
            )}
          </div>

          <h4 className="text-sm font-bold text-white tracking-tight truncate">
            {currentNotification.title}
          </h4>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {currentNotification.message}
          </p>

          <div className="pt-1.5 flex items-center gap-3 text-[11px] font-mono">
            <Link
              href="/learn/progress"
              onClick={() => setIsVisible(false)}
              className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-semibold transition-colors"
            >
              <span>View Dashboard</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer cyber-focus-ring"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
