'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import { useGamification } from '@/hooks/useGamification';
import { XP_RULES } from '@/data/gamification';
import { useAuth } from '@/contexts/AuthContext';

interface ModuleCompletionCardProps {
  moduleId: string;
  moduleTitle: string;
  topicSlug?: string;
}

export const ModuleCompletionCard: React.FC<ModuleCompletionCardProps> = ({
  moduleId,
  moduleTitle,
  topicSlug,
}) => {
  const { hasCompletedModule, recordModuleCompletion } = useGamification();
  const { user, openAuthModal } = useAuth();
  const [justClaimed, setJustClaimed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCompleted = hasCompletedModule(moduleId) || justClaimed;

  const handleClaim = async () => {
    if (isCompleted || isSubmitting) return;

    if (!user) {
      openAuthModal('login');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Authoritative server persistence
      const res = await fetch('/api/gamification/complete-module', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId,
          sessionToken: `module_${moduleId}`,
        }),
      });

      // 2. Client store sync
      const result = recordModuleCompletion({
        moduleId,
        title: moduleTitle,
        topicSlug,
      });

      if (!result.isDuplicate || res.ok) {
        setJustClaimed(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`rounded-2xl border p-6 sm:p-8 backdrop-blur-md relative overflow-hidden transition-all ${
        isCompleted
          ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-slate-950/80 border-emerald-500/40 shadow-xl shadow-emerald-950/20'
          : 'bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-slate-950/80 border-cyan-500/30 shadow-xl shadow-cyan-950/20'
      }`}
    >
      {/* Ambient background glow */}
      <div
        className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none -z-10 ${
          isCompleted ? 'bg-emerald-500/10' : 'bg-cyan-500/10'
        }`}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono">
            {isCompleted ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>MODULE COMPLETED</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>QUALIFYING LEARNING ACTIVITY</span>
              </span>
            )}
            <span className="text-slate-400">•</span>
            <span className="text-amber-400 font-bold">+{XP_RULES.MODULE_COMPLETION} XP</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {isCompleted ? 'Knowledge Module Verified' : 'Complete Module & Record Progress'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isCompleted
              ? `You successfully completed "${moduleTitle}" and earned +${XP_RULES.MODULE_COMPLETION} XP toward your next security level. Your learning streak has been recorded.`
              : `Finished studying this guide? Mark it complete to earn +${XP_RULES.MODULE_COMPLETION} XP, extend your daily streak, and unlock progress badges.`}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {isCompleted ? (
            <Link
              href="/learn/progress"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-500/50 font-bold text-xs sm:text-sm font-mono transition-all cyber-focus-ring"
            >
              <Award className="w-4 h-4 text-cyan-400" />
              <span>View In Progress Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleClaim}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-xs sm:text-sm font-mono shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer cyber-focus-ring"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete & Claim +{XP_RULES.MODULE_COMPLETION} XP</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
