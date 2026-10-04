'use client';

import React, { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Smartphone,
  Mail,
  PhoneCall,
  MessageSquare,
  Award,
} from 'lucide-react';
import { SCAM_QUIZ_SCENARIOS } from '@/data/scamAwarenessData';
import { ScamQuizQuestion } from '@/types';

export const ScamQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Record<string, { choice: 'A' | 'B' | 'C'; isCorrect: boolean }>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentScenario: ScamQuizQuestion = SCAM_QUIZ_SCENARIOS[currentIndex];

  const handleSelectOption = (key: 'A' | 'B' | 'C') => {
    if (revealed) return; // Prevent changing after revelation
    setSelectedOption(key);
    setRevealed(true);

    const isCorrect = key === currentScenario.correctAnswer;
    setAnswers((prev) => ({
      ...prev,
      [currentScenario.id]: { choice: key, isCorrect },
    }));
  };

  const handleNext = () => {
    if (currentIndex < SCAM_QUIZ_SCENARIOS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setRevealed(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setRevealed(false);
    setAnswers({});
    setIsFinished(false);
  };

  // Calculate score
  const totalScore = Object.values(answers).filter((a) => a.isCorrect).length;
  const totalQuestions = SCAM_QUIZ_SCENARIOS.length;

  const getScoreVerdict = (score: number) => {
    if (score <= 2) {
      return {
        title: 'Keep Learning',
        color: 'text-amber-400',
        badge: 'border-amber-700 bg-amber-950/60 text-amber-300',
        description:
          'Modern social engineering can trick anyone. Review the common scam warning signals and practice checking URLs before reacting.',
      };
    } else if (score <= 4) {
      return {
        title: 'Good Awareness',
        color: 'text-cyan-400',
        badge: 'border-cyan-700 bg-cyan-950/60 text-cyan-300',
        description:
          'You spotted most deceptive tactics! Continue enforcing the habit of pausing and verifying out-of-band on critical alerts.',
      };
    } else {
      return {
        title: 'Strong Scam Awareness',
        color: 'text-emerald-400',
        badge: 'border-emerald-700 bg-emerald-950/60 text-emerald-300',
        description:
          'Outstanding instincts! You recognized artificial urgency, spoofed domains, and off-platform recruitment lures with high accuracy.',
      };
    }
  };

  const verdict = getScoreVerdict(totalScore);

  const renderChannelIcon = (channel: string) => {
    switch (channel) {
      case 'SMS Text':
        return <Smartphone className="w-4 h-4 text-cyan-400" />;
      case 'Email':
        return <Mail className="w-4 h-4 text-blue-400" />;
      case 'Voice Call':
        return <PhoneCall className="w-4 h-4 text-amber-400" />;
      default:
        return <MessageSquare className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <section id="scam-quiz" className="py-16 sm:py-20 relative bg-[#070b14] border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/80 bg-cyan-950/50 text-xs font-mono text-cyan-300 font-semibold mb-3">
            <Brain className="w-3.5 h-3.5" />
            <span>Interactive Scam IQ Challenge</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Can You Spot the Scam?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Test your digital judgment against realistic communication scenarios. Identify legitimate notifications, suspicious messages, and outright scams.
          </p>
        </div>

        {!isFinished ? (
          /* Active Question Card */
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
            {/* Header: Progress & Channel */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Scenario {currentIndex + 1} of {totalQuestions}
                </span>
                <span className="text-slate-600">&bull;</span>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                  {renderChannelIcon(currentScenario.channel)}
                  <span>{currentScenario.channel}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full sm:w-36 h-2 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Scenario Title & Simulation Notice */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-amber-900/80 bg-amber-950/40 text-amber-300 font-semibold">
                  SIMULATED SCENARIO
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {currentScenario.scenarioTitle}
              </h3>
            </div>

            {/* Simulated Message Bubble */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-2">
              <div className="text-xs text-slate-400 flex items-center justify-between pb-2 border-b border-slate-900">
                <span className="font-mono text-slate-300">From: {currentScenario.senderDisplay}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-line pt-1">
                {currentScenario.messageContent}
              </p>
              {currentScenario.contextNote && (
                <div className="pt-2 text-[11px] text-slate-400 italic">
                  Context: {currentScenario.contextNote}
                </div>
              )}
            </div>

            {/* 3 Answer Options */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-slate-300 block uppercase tracking-wider font-mono">
                Select Your Verdict:
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {currentScenario.options.map((opt) => {
                  const isChosen = selectedOption === opt.key;
                  const isCorrectAnswer = opt.key === currentScenario.correctAnswer;

                  let buttonStyles =
                    'border-slate-800 bg-slate-950/70 text-slate-200 hover:border-slate-700 hover:bg-slate-900';

                  if (revealed) {
                    if (isCorrectAnswer) {
                      buttonStyles =
                        'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 shadow-md shadow-emerald-950/40';
                    } else if (isChosen && !isCorrectAnswer) {
                      buttonStyles =
                        'border-rose-500/80 bg-rose-950/40 text-rose-200 shadow-md shadow-rose-950/40';
                    } else {
                      buttonStyles = 'border-slate-900 bg-slate-950/40 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      disabled={revealed}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`p-4 rounded-xl border text-left transition-all duration-150 flex items-start gap-3.5 group ${buttonStyles}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 border ${
                          revealed && isCorrectAnswer
                            ? 'bg-emerald-900 border-emerald-500 text-emerald-200'
                            : revealed && isChosen && !isCorrectAnswer
                            ? 'bg-rose-900 border-rose-500 text-rose-200'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <div className="flex-1">
                        <span className="text-xs sm:text-sm font-medium block leading-snug">{opt.label}</span>
                      </div>
                      {revealed && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 self-center" />
                      )}
                      {revealed && isChosen && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 self-center" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Revealed Feedback & Explanation */}
            {revealed && (
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 animate-in fade-in duration-200 text-xs">
                {/* Result banner */}
                <div className="flex items-center gap-2">
                  {selectedOption === currentScenario.correctAnswer ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4" /> Correct Analysis!
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                      <XCircle className="w-4 h-4" /> Not Quite — Review the Warning Signs
                    </div>
                  )}
                </div>

                {/* Explanation */}
                <p className="text-slate-300 leading-relaxed sm:text-sm">{currentScenario.explanation}</p>

                {/* Identified Red Flags */}
                {currentScenario.redFlagsIdentified.length > 0 && (
                  <div>
                    <strong className="text-amber-400 font-mono text-[11px] uppercase tracking-wider block mb-1.5">
                      Key Warning Indicators:
                    </strong>
                    <ul className="space-y-1 text-slate-300">
                      {currentScenario.redFlagsIdentified.map((flag, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400">&bull;</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Takeaway */}
                <div className="pt-2 border-t border-slate-800/80 text-cyan-300 font-medium">
                  <strong>Takeaway:</strong> {currentScenario.takeaway}
                </div>

                {/* Next button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors shadow-md shadow-cyan-950"
                  >
                    <span>{currentIndex < totalQuestions - 1 ? 'Next Scenario' : 'View Final Results'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Finished Scorecard View */
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-8 sm:p-10 backdrop-blur-md text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-8 h-8 text-cyan-400" />
            </div>

            <div>
              <span className={`text-xs font-mono uppercase px-3 py-1 rounded-full border font-bold ${verdict.badge}`}>
                {verdict.title}
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Your Score: {totalScore} / {totalQuestions}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto mt-3 leading-relaxed">
                {verdict.description}
              </p>
            </div>

            {/* Mandatory Educational Disclaimer */}
            <div className="max-w-xl mx-auto p-4 rounded-xl border border-amber-900/60 bg-amber-950/30 text-amber-200/90 text-xs text-left space-y-1">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Educational Game Notice</span>
              </div>
              <p>
                This score is an educational exercise designed to build general digital skepticism. It is not an official cybersecurity certification or guarantee against real-world fraud. No scores are transmitted or stored on any server.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 font-semibold text-xs transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>Retake Quiz</span>
              </button>
              <a
                href="#scam-categories"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors shadow-md shadow-cyan-950"
              >
                <span>Explore All 16 Scam Categories</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
