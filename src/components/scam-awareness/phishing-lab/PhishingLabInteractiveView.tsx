'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  PhishingHeroPhoneVisual,
  PhishingRedFlagId,
  NeutralElementId,
} from './PhishingHeroPhoneVisual';
import { PhishingProgressTracker, LabStage } from './PhishingProgressTracker';
import {
  PhishingInspectionHUD,
  InspectionDetail,
  RED_FLAG_FEEDBACK_DATA,
  NEUTRAL_FEEDBACK_DATA,
} from './PhishingInspectionHUD';
import { PhishingBottomSheet } from './PhishingBottomSheet';
import { PhishingLearnStage } from './PhishingLearnStage';
import { PhishingDecisionChallenge } from './PhishingDecisionChallenge';
import { PhishingKnowledgeQuiz } from './PhishingKnowledgeQuiz';
import { PhishingChecklistCards } from './PhishingChecklistCards';
import { PhishingNextLessons } from './PhishingNextLessons';
import { PhishingNextStepsCTA } from './PhishingNextStepsCTA';
import { TrustDisclaimer } from '@/components/scam-awareness/TrustDisclaimer';

const HINT_CLUES = [
  'Look for pressure, requests for action, and where the link actually leads.',
  'Focus on the sender and the destination domain.',
  'Ask yourself: Would a legitimate organization normally demand immediate action this way?',
];

export const PhishingLabInteractiveView: React.FC = () => {
  // Game & Lab State
  const [discoveredFlags, setDiscoveredFlags] = useState<PhishingRedFlagId[]>([]);
  const [activeElementId, setActiveElementId] = useState<string | null>(null);
  const [activeDetail, setActiveDetail] = useState<InspectionDetail | null>(null);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [activeHintText, setActiveHintText] = useState<string | null>(null);
  const [unnecessaryClicks, setUnnecessaryClicks] = useState<number>(0);
  const [isMobileBottomSheetOpen, setIsMobileBottomSheetOpen] = useState<boolean>(false);

  // Progressive Stage Locks
  const [learnUnlocked, setLearnUnlocked] = useState<boolean>(false);
  const [learnCompleted, setLearnCompleted] = useState<boolean>(false);
  const [testUnlocked, setTestUnlocked] = useState<boolean>(false);
  const [selectedDecision, setSelectedDecision] = useState<'A' | 'B' | 'C' | null>(null);
  const [decisionWrong, setDecisionWrong] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Handle Red Flag Click on Phone
  const handleRedFlagClick = (id: PhishingRedFlagId) => {
    setActiveElementId(id);
    const feedback = RED_FLAG_FEEDBACK_DATA[id];
    setActiveDetail(feedback);
    setIsMobileBottomSheetOpen(true);

    if (!discoveredFlags.includes(id)) {
      const nextFlags = [...discoveredFlags, id];
      setDiscoveredFlags(nextFlags);
    }
  };

  // Re-open explanation from Discovered List
  const handleSelectDiscoveredFlag = (id: PhishingRedFlagId) => {
    setActiveElementId(id);
    const feedback = RED_FLAG_FEEDBACK_DATA[id];
    setActiveDetail(feedback);
    setIsMobileBottomSheetOpen(true);
  };

  // Close mobile bottom sheet
  const handleCloseBottomSheet = () => {
    setIsMobileBottomSheetOpen(false);
  };

  // Handle Neutral Click on Phone (Requirement 4)
  const handleNeutralClick = (id: NeutralElementId) => {
    setActiveElementId(id);
    const feedback = NEUTRAL_FEEDBACK_DATA[id];
    setActiveDetail(feedback);
    setUnnecessaryClicks((prev) => prev + 1);
    setIsMobileBottomSheetOpen(true);
  };

  // Handle Hint System (Requirement 5)
  const handleUseHint = () => {
    if (hintsUsed < 3) {
      const hint = HINT_CLUES[hintsUsed];
      setActiveHintText(hint);
      setHintsUsed((prev) => prev + 1);
    }
  };

  // Unlock Learn Stage (Requirement 5 & 6)
  const handleContinueToLearn = () => {
    setLearnUnlocked(true);
    setTimeout(() => {
      const elem = document.getElementById('learn-stage-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Complete Learn Stage & Activate Test Prep (Requirement 9 & 10)
  const handleLearnCompleted = () => {
    setLearnCompleted(true);
    setTestUnlocked(true);
  };

  // Start Test Section
  const handleStartTest = () => {
    setTimeout(() => {
      const elem = document.getElementById('decision-challenge-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Handle Decision Selection
  const handleDecisionSubmit = (choice: 'A' | 'B' | 'C', isCorrect: boolean) => {
    setSelectedDecision(choice);
    if (!isCorrect) {
      setDecisionWrong(true);
    }
  };

  // Handle Quiz Completion
  const handleQuizComplete = () => {
    setQuizCompleted(true);
  };

  // Determine current active stage for tracker
  const getCurrentStage = (): LabStage => {
    if (quizCompleted) return 'test';
    if (testUnlocked) return 'test';
    if (learnUnlocked) return 'learn';
    return 'inspect';
  };

  return (
    <div className="space-y-0">
      {/* 1. PAGE HERO */}
      <section className="relative pt-6 sm:pt-8 pb-8 sm:pb-12 md:pb-16 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#070b14] to-[#05080e] overflow-hidden">
        {/* Subtle Cyber Grid Matrix */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#0e1726_1px,transparent_1px),linear-gradient(to_bottom,#0e1726_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8">
          {/* Breadcrumb Navigation: Home > Scam Awareness > Scam Types > Phishing */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden={true} />
            <Link href="/scam-awareness" className="hover:text-cyan-400 transition-colors">
              Scam Awareness
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden={true} />
            <Link href="/scam-awareness/types" className="hover:text-cyan-400 transition-colors">
              Scam Types
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden={true} />
            <span className="text-cyan-400 font-medium" aria-current="page">
              Phishing
            </span>
          </nav>

          {/* Hero Titles & Meta Badges */}
          <div className="space-y-3.5 sm:space-y-4 max-w-3xl">
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/80 bg-cyan-950/50 text-cyan-300 text-xs font-mono uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" aria-hidden={true} />
                SCAM AWARENESS • INTERACTIVE LAB
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-800/80 bg-amber-950/60 text-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden={true} />
                SIMULATION ONLY
              </span>
            </div>

            <h1 className="text-[38px] sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Can You Spot <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200">
                the Phish?
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
              Real phishing attacks often look convincing. Learn to identify the warning signs before clicking through this hands-on interactive training simulation.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ACTIVE PROGRESS TRACKER (SEE ✓ INSPECT ●/✓ LEARN ○/●/✓ TEST ○/●/✓) */}
      <PhishingProgressTracker
        currentStage={getCurrentStage()}
        redFlagsCount={discoveredFlags.length}
        learnCompleted={learnCompleted}
        quizCompleted={quizCompleted}
      />

      {/* 1, 2, 3, 4, 5. INTERACTIVE PHONE SIMULATION LAB WITH COMPACT HUD */}
      <section id="hero-phone-lab" className="py-6 sm:py-10 md:py-16 bg-[#07090e] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6 md:space-y-8">
          {/* Mobile Scenario Header with Compact Spacing and Typography */}
          <div className="max-w-3xl space-y-1 sm:space-y-2">
            <span className="text-[10px] sm:text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              STAGE 01 • REAL-TIME INSPECTION LAB
            </span>
            <h2 className="text-[22px] sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Scenario 01 — Suspicious Account Alert
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              You receive the following message. Tap suspicious elements inside the phone to discover the six major red flags.
            </p>
          </div>

          {/* DESKTOP LAYOUT (min-width: 768px):
              Requirement 16: Keep existing desktop layout unchanged (HUD on left, Phone on right) */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-8 lg:gap-12 items-start">
            {/* Desktop Left Column: HUD (7 cols) */}
            <div className="md:col-span-7 space-y-6">
              <PhishingInspectionHUD
                discoveredFlags={discoveredFlags}
                activeDetail={activeDetail}
                hintsRemaining={3 - hintsUsed}
                hintsUsed={hintsUsed}
                activeHintText={activeHintText}
                onUseHint={handleUseHint}
                onSelectDiscoveredFlag={handleSelectDiscoveredFlag}
                onContinueToLearn={handleContinueToLearn}
                mode="desktop"
              />
            </div>

            {/* Desktop Right Column: Phone Simulation (5 cols) */}
            <div className="md:col-span-5 flex justify-center">
              <PhishingHeroPhoneVisual
                discoveredFlags={discoveredFlags}
                activeElementId={activeElementId}
                onRedFlagClick={handleRedFlagClick}
                onNeutralClick={handleNeutralClick}
                isCompleted={discoveredFlags.length === 6}
              />
            </div>
          </div>

          {/* MOBILE LAYOUT (< 768px):
              Requirements 1, 4, 5, 6, 8, 12: Dedicated Mobile Simulator Layout
              Order: Phone Simulation -> Completion Panel (if 6/6) -> Compact HUD -> Discovered Red Flags */}
          <div className="md:hidden space-y-4">
            {/* 1. Phone Simulation (Centered horizontally, width min(88vw, 380px)) */}
            <div className="flex justify-center">
              <PhishingHeroPhoneVisual
                discoveredFlags={discoveredFlags}
                activeElementId={activeElementId}
                onRedFlagClick={handleRedFlagClick}
                onNeutralClick={handleNeutralClick}
                isCompleted={discoveredFlags.length === 6}
              />
            </div>

            {/* 2. Completion State (Directly below phone when 6/6 discovered) */}
            {discoveredFlags.length === 6 && (
              <div className="w-full max-w-[380px] mx-auto p-4 rounded-2xl border-2 border-emerald-500/80 bg-gradient-to-r from-emerald-950/90 via-slate-950 to-teal-950/70 shadow-xl space-y-2.5 animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      INSPECTION COMPLETE
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-white">
                      6 / 6 RED FLAGS FOUND
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  Excellent. You identified the major warning signals.
                </p>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight className="w-3.5 h-3.5 text-slate-950" />}
                  iconPosition="right"
                  onClick={handleContinueToLearn}
                  className="w-full bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 font-bold text-xs py-2.5 shadow-md shadow-emerald-950/40 cursor-pointer"
                >
                  Continue to Learn &rarr;
                </Button>
              </div>
            )}

            {/* 3. Compact Inspection HUD & Discovered Flags Section */}
            <div className="w-full max-w-[380px] mx-auto">
              <PhishingInspectionHUD
                discoveredFlags={discoveredFlags}
                activeDetail={activeDetail}
                hintsRemaining={3 - hintsUsed}
                hintsUsed={hintsUsed}
                activeHintText={activeHintText}
                onUseHint={handleUseHint}
                onSelectDiscoveredFlag={handleSelectDiscoveredFlag}
                onContinueToLearn={handleContinueToLearn}
                mode="mobile"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9 & 10. MOBILE BOTTOM SHEET (Interactive slide-up explanation for phone elements) */}
      <PhishingBottomSheet
        isOpen={isMobileBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        detail={activeDetail}
      />

      {/* 6, 7, 8, 9, 10. LEARN STAGE (UNLOCKED AFTER INSPECT STAGE 6/6) */}
      {learnUnlocked && (
        <PhishingLearnStage
          onLearnCompleted={handleLearnCompleted}
          onStartTest={handleStartTest}
          isTestUnlocked={testUnlocked}
        />
      )}

      {/* DECISION CHALLENGE & KNOWLEDGE CHECK (UNLOCKED AFTER LEARN STAGE) */}
      {testUnlocked && (
        <>
          <PhishingDecisionChallenge
            onDecisionSubmit={handleDecisionSubmit}
            onProceedToSummary={() => {
              const elem = document.getElementById('quiz-section');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            selectedChoice={selectedDecision}
          />

          <PhishingKnowledgeQuiz
            onQuizComplete={handleQuizComplete}
            redFlagsCount={discoveredFlags.length}
            hintsUsed={hintsUsed}
            unnecessaryClicks={unnecessaryClicks}
            decisionWrong={decisionWrong}
          />

          <PhishingChecklistCards />
          <PhishingNextLessons />
          <PhishingNextStepsCTA />
        </>
      )}

      {/* Trust & Safety Disclaimer */}
      <div className="py-8 bg-[#07090e]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustDisclaimer />
        </div>
      </div>
    </div>
  );
};
