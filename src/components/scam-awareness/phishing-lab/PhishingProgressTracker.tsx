'use client';

import React from 'react';
import { Eye, Search, BookOpen, Award, Check } from 'lucide-react';

export type LabStage = 'see' | 'inspect' | 'learn' | 'test';

interface PhishingProgressTrackerProps {
  currentStage: LabStage;
  onSelectStage?: (stage: LabStage) => void;
  redFlagsCount: number;
  learnCompleted: boolean;
  quizCompleted: boolean;
}

interface StageConfig {
  id: LabStage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  anchor: string;
}

const STAGES: StageConfig[] = [
  { id: 'see', label: 'SEE', icon: Eye, anchor: 'hero-phone-lab' },
  { id: 'inspect', label: 'INSPECT', icon: Search, anchor: 'hero-phone-lab' },
  { id: 'learn', label: 'LEARN', icon: BookOpen, anchor: 'learn-stage-section' },
  { id: 'test', label: 'TEST', icon: Award, anchor: 'quiz-section' },
];

export const PhishingProgressTracker: React.FC<PhishingProgressTrackerProps> = ({
  currentStage,
  onSelectStage,
  redFlagsCount,
  learnCompleted,
  quizCompleted,
}) => {
  const getStageStatus = (stageId: LabStage): 'done' | 'current' | 'todo' => {
    if (stageId === 'see') return 'done';
    if (stageId === 'inspect') {
      return redFlagsCount >= 6 ? 'done' : 'current';
    }
    if (stageId === 'learn') {
      if (redFlagsCount < 6) return 'todo';
      return learnCompleted ? 'done' : 'current';
    }
    if (stageId === 'test') {
      if (!learnCompleted) return 'todo';
      return quizCompleted ? 'done' : 'current';
    }
    return 'todo';
  };

  const handleStageClick = (stage: StageConfig) => {
    if (onSelectStage) {
      onSelectStage(stage.id);
    }
    const elem = document.getElementById(stage.anchor);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-slate-950/90 border-y border-slate-800/80 backdrop-blur-md sticky top-16 z-30">
      {/* 2. DEDICATED MOBILE COMPACT PROGRESS BAR (< 768px) */}
      <div className="md:hidden px-3 py-2 flex items-center justify-between overflow-x-auto no-scrollbar gap-1 text-[11px] font-mono font-bold">
        {STAGES.map((stg, idx) => {
          const status = getStageStatus(stg.id);
          const isCurrent = currentStage === stg.id || status === 'current';

          return (
            <React.Fragment key={stg.id}>
              <button
                type="button"
                onClick={() => handleStageClick(stg)}
                className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors shrink-0 ${
                  status === 'done'
                    ? 'text-emerald-400 bg-emerald-950/40'
                    : isCurrent
                    ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/50'
                    : 'text-slate-400 opacity-60'
                }`}
              >
                <span>
                  {status === 'done' ? '✓' : status === 'current' ? '●' : '○'}
                </span>
                <span>{stg.label}</span>
              </button>

              {idx < STAGES.length - 1 && (
                <span className="text-slate-600 shrink-0 font-normal">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* DESKTOP PROGRESS BAR (>= 768px) */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <nav aria-label="Phishing Lab Progress" className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-1">
          {STAGES.map((stg, idx) => {
            const status = getStageStatus(stg.id);
            const isCurrent = currentStage === stg.id || status === 'current';
            const Icon = stg.icon;

            return (
              <React.Fragment key={stg.id}>
                <button
                  type="button"
                  onClick={() => handleStageClick(stg)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 shrink-0 cyber-focus-ring ${
                    status === 'done'
                      ? 'bg-slate-900/90 border border-emerald-500/50 text-emerald-300 hover:border-emerald-400'
                      : status === 'current'
                      ? 'bg-cyan-950/90 border-2 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950/60 scale-[1.02]'
                      : 'bg-slate-900/40 border border-slate-800/80 text-slate-400 opacity-60 hover:opacity-80'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {/* Status Indicator Icon / Marker */}
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                      status === 'done'
                        ? 'bg-emerald-500 text-slate-950'
                        : status === 'current'
                        ? 'bg-cyan-400 text-slate-950 animate-pulse'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {status === 'done' ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : status === 'current' ? (
                      '●'
                    ) : (
                      '○'
                    )}
                  </span>

                  {/* Stage Label */}
                  <span className="text-xs sm:text-sm font-bold tracking-wider font-mono">
                    {stg.label}
                  </span>

                  <Icon
                    className={`w-3.5 h-3.5 hidden sm:inline-block ${
                      status === 'done'
                        ? 'text-emerald-400'
                        : status === 'current'
                        ? 'text-cyan-400'
                        : 'text-slate-500'
                    }`}
                    aria-hidden={true}
                  />

                  {/* Symbol Badge */}
                  <span className="text-[11px] font-mono font-bold ml-0.5">
                    {status === 'done' ? '✓' : status === 'current' ? '●' : '○'}
                  </span>
                </button>

                {/* Connecting arrow/line */}
                {idx < STAGES.length - 1 && (
                  <div
                    className={`hidden md:block flex-1 h-[2px] min-w-[12px] transition-all duration-300 ${
                      status === 'done' ? 'bg-emerald-500/60' : 'bg-slate-800'
                    }`}
                    aria-hidden={true}
                  />
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
