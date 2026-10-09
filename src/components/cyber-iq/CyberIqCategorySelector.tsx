'use client';

import React, { useState } from 'react';
import {
  Shield,
  MailCheck,
  KeyRound,
  AlertTriangle,
  EyeOff,
  Wifi,
  Terminal,
  Layers,
  ArrowRight,
  Info,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { CyberIqCategoryId, CyberIqDifficulty } from '@/types/cyberIq';
import { CYBER_IQ_CATEGORIES } from '@/data/cyberIqQuestions';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  MailCheck,
  KeyRound,
  AlertTriangle,
  EyeOff,
  Wifi,
  Terminal,
  Layers,
};

interface CyberIqCategorySelectorProps {
  initialCategoryId?: CyberIqCategoryId | 'all';
  onStartQuiz: (categoryId: CyberIqCategoryId | 'all', difficulty: CyberIqDifficulty | 'All', questionCount: number) => void;
}

export const CyberIqCategorySelector: React.FC<CyberIqCategorySelectorProps> = ({
  initialCategoryId = 'all',
  onStartQuiz,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CyberIqCategoryId | 'all'>(initialCategoryId);
  const [selectedDifficulty, setSelectedDifficulty] = useState<CyberIqDifficulty | 'All'>('All');
  const [questionCount, setQuestionCount] = useState<number>(10);

  const handleLaunch = () => {
    onStartQuiz(selectedCategory, selectedDifficulty, questionCount);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Configuration Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Sliders className="w-6 h-6 text-cyan-400" />
          <span>Configure Your Arena Challenge</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          Select a targeted cybersecurity topic, tune your difficulty tier, and test your defensive instincts.
        </p>
      </div>

      {/* Difficulty & Length Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl">
        {/* Control 1: Difficulty Level */}
        <div className="space-y-3">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span>Difficulty Level:</span>
            <span className="text-cyan-400 font-normal lowercase">
              {selectedDifficulty === 'All' ? 'adaptive mix' : selectedDifficulty.toLowerCase()}
            </span>
          </label>

          <div className="grid grid-cols-4 gap-2">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer border text-center ${
                  selectedDifficulty === diff
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {selectedDifficulty === 'Advanced' ? (
                <strong className="text-amber-300">Advanced Note:</strong>
              ) : null}{' '}
              {selectedDifficulty === 'Advanced'
                ? 'Advanced challenges explore technical zero-trust models, protocol attacks (AitM, homoglyphs, DMARC), and defensive software architecture.'
                : selectedDifficulty === 'Beginner'
                ? 'Beginner challenges focus on everyday habits, spotting urgency cues, and essential password/scam recognition.'
                : selectedDifficulty === 'Intermediate'
                ? 'Intermediate challenges cover real-world attack scenarios, credential stuffing, and practical defense trade-offs.'
                : 'Adaptive mix challenges feature questions from all levels for a balanced evaluation.'}
            </p>
          </div>
        </div>

        {/* Control 2: Question Count */}
        <div className="space-y-3">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span>Challenge Length:</span>
            <span className="text-cyan-400 font-normal">{questionCount} questions</span>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setQuestionCount(5)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                questionCount === 5
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-sm text-white">5 Questions</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">Quick Sprint (~3 mins)</div>
            </button>

            <button
              type="button"
              onClick={() => setQuestionCount(10)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                questionCount === 10
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-sm text-white">10 Questions</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">Standard Arena (~6 mins)</div>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Points: +25 to +75 XP per correct prompt</span>
            <span>Zero timer penalties</span>
          </div>
        </div>
      </div>

      {/* Category Selection Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center justify-between">
          <span>Choose a Topic Arena</span>
          <span className="text-xs font-mono text-slate-400 font-normal">
            8 Options Available
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 0: All Categories / Grand Arena */}
          <div
            onClick={() => setSelectedCategory('all')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 group relative overflow-hidden ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-br from-cyan-950/70 via-slate-900 to-slate-950 border-cyan-400 shadow-xl shadow-cyan-500/10 scale-[1.02]'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-400">
                  <Layers className="w-5 h-5" />
                </div>
                {selectedCategory === 'all' && (
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                  Grand Arena (Mixed)
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Comprehensive evaluation spanning all 7 categories. The ultimate test of balanced defensive agility.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-cyan-400">
              <span>All 70+ Questions</span>
              <span>Full Arena</span>
            </div>
          </div>

          {/* 7 Standard Category Cards */}
          {CYBER_IQ_CATEGORIES.map((cat) => {
            const IconComponent = CATEGORY_ICONS[cat.iconName] || Shield;
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 group relative overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-400 shadow-xl shadow-cyan-500/10 scale-[1.02]`
                    : `bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60`
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {cat.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>10 Questions</span>
                  <span className={`px-2 py-0.5 rounded-full border text-[10px] ${cat.badgeColor}`}>
                    Active
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start Button Fixed / Full Width CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <div className="text-sm font-bold text-white">
            Ready to Begin?
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Selected: {selectedCategory === 'all' ? 'Grand Arena (Mixed)' : CYBER_IQ_CATEGORIES.find((c) => c.id === selectedCategory)?.title} • {questionCount} Questions • {selectedDifficulty} Difficulty
          </div>
        </div>

        <button
          type="button"
          onClick={handleLaunch}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 text-sm font-bold shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer cyber-focus-ring"
        >
          <span>Start Quiz Challenge</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
