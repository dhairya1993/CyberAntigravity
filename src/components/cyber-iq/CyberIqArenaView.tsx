'use client';

import React, { useState, useEffect } from 'react';
import {
  CyberIqCategoryId,
  CyberIqDifficulty,
  CyberIqQuestion,
  CyberIqBadge,
  UserQuizAttempt,
} from '@/types/cyberIq';
import {
  CYBER_IQ_CATEGORIES,
  CYBER_IQ_QUESTIONS,
  CYBER_IQ_BADGES,
} from '@/data/cyberIqQuestions';
import { calculateQuizXp } from '@/data/gamification';
import { useCyberIqStorage } from '@/hooks/useCyberIqStorage';
import { CyberIqHeader } from './CyberIqHeader';
import { CyberIqDashboard } from './CyberIqDashboard';
import { CyberIqCategorySelector } from './CyberIqCategorySelector';
import { CyberIqQuestionCard } from './CyberIqQuestionCard';
import { CyberIqResultsView } from './CyberIqResultsView';
import { CyberIqAnswerReview, AnsweredQuestionState } from './CyberIqAnswerReview';
import { CyberIqBadgesModal } from './CyberIqBadgesModal';
import { Sliders, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const CyberIqArenaView: React.FC = () => {
  const {
    profile,
    overallAccuracy,
    currentRank,
    recordQuizResult,
    resetProfile,
  } = useCyberIqStorage();

  // Navigation / View State
  const [activeView, setActiveView] = useState<'dashboard' | 'select' | 'quiz' | 'results' | 'review'>('select');

  // Quiz Configuration State
  const [activeCategoryId, setActiveCategoryId] = useState<CyberIqCategoryId | 'all'>('all');
  const [activeDifficulty, setActiveDifficulty] = useState<CyberIqDifficulty | 'All'>('All');
  const [activeQuestions, setActiveQuestions] = useState<CyberIqQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestionState[]>([]);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [lastAttempt, setLastAttempt] = useState<UserQuizAttempt | null>(null);
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<CyberIqBadge[]>([]);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const [answersMap, setAnswersMap] = useState<Record<string, string>>({});
  const [isPersisted, setIsPersisted] = useState<boolean>(false);

  // Live Timer while in quiz
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeView === 'quiz') {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeView]);

  // Start Quiz Handler
  const handleStartQuiz = (
    categoryId: CyberIqCategoryId | 'all' = 'all',
    difficulty: CyberIqDifficulty | 'All' = 'All',
    questionCount: number = 10
  ) => {
    setActiveCategoryId(categoryId);
    setActiveDifficulty(difficulty);

    // Filter questions
    let candidateQuestions = CYBER_IQ_QUESTIONS.filter((q) => {
      const matchesCategory = categoryId === 'all' || q.categoryId === categoryId;
      const matchesDifficulty = difficulty === 'All' || q.difficulty === difficulty;
      return matchesCategory && matchesDifficulty;
    });

    // Fallback: If filtered by specific difficulty returned fewer than requested count, include all difficulties for this category
    if (candidateQuestions.length < questionCount) {
      candidateQuestions = CYBER_IQ_QUESTIONS.filter(
        (q) => categoryId === 'all' || q.categoryId === categoryId
      );
    }

    // Deterministic pseudo-random shuffle
    const shuffled = [...candidateQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, questionCount);

    setActiveQuestions(selected);
    setCurrentQuestionIndex(0);
    setAnsweredQuestions([]);
    setCurrentScore(0);
    setElapsedSeconds(0);
    setNewlyUnlockedBadges([]);
    setActiveView('quiz');
  };

  // Answer handler
  const handleAnswerQuestion = (optionId: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => {
    const currentQ = activeQuestions[currentQuestionIndex];
    if (!currentQ) return;

    let pointsAwarded = 0;
    if (isCorrect) {
      pointsAwarded = currentQ.difficulty === 'Beginner' ? 25 : currentQ.difficulty === 'Intermediate' ? 50 : 75;
      setCurrentScore((prev) => prev + pointsAwarded);
    }

    setAnsweredQuestions((prev) => [
      ...prev,
      {
        question: currentQ,
        selectedOptionId: optionId,
        isCorrect,
      },
    ]);
  };

  // Next Question / Complete Quiz
  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Quiz complete: calculate score & record
      const totalCount = activeQuestions.length;
      const correctCount = answeredQuestions.filter((a) => a.isCorrect).length;
      const scorePercent = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

      const categoryObj = CYBER_IQ_CATEGORIES.find((c) => c.id === activeCategoryId);
      const catTitle = activeCategoryId === 'all' ? 'Grand Arena (Mixed)' : categoryObj?.title || 'Cyber IQ Arena';

      // Transparent XP calculation (50 Base + 25 if >=80% + 20 if 100%)
      const xpCalc = calculateQuizXp(scorePercent);
      const sessionKey = `quiz_${activeCategoryId}_${Date.now()}`;

      const attemptData: Omit<UserQuizAttempt, 'quizId' | 'timestamp'> & { sessionToken?: string } = {
        categoryId: activeCategoryId === 'all' ? 'mixed' : activeCategoryId,
        categoryTitle: catTitle,
        difficulty: activeDifficulty === 'All' ? 'Mixed' : activeDifficulty,
        totalQuestions: totalCount,
        correctAnswers: correctCount,
        scorePercentage: scorePercent,
        xpEarned: xpCalc.totalXp,
        timeSpentSeconds: elapsedSeconds,
        sessionToken: sessionKey,
      };

      // Record locally for immediate UI reactivity
      const result = recordQuizResult(attemptData);
      setNewlyUnlockedBadges(result.newlyUnlocked);

      // Build answers map for server-side evaluation
      const answers: Record<string, string> = {};
      for (const a of answeredQuestions) {
        answers[a.question.id] = a.selectedOptionId;
      }
      setAnswersMap(answers);

      if (user) {
        // Authenticated student: Send answers to trusted server endpoint
        fetch('/api/gamification/complete-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quizId: sessionKey,
            category: activeCategoryId === 'all' ? 'fundamentals' : activeCategoryId,
            answers,
            sessionToken: sessionKey,
          }),
        })
          .then((res) => {
            if (res.ok) {
              setIsPersisted(true);
            }
          })
          .catch(() => {});
      } else {
        setIsPersisted(false);
      }

      setLastAttempt({
        ...attemptData,
        quizId: sessionKey,
        timestamp: Date.now(),
      });

      setActiveView('results');
    }
  };

  const activeCategoryObj = CYBER_IQ_CATEGORIES.find((c) => c.id === activeCategoryId);
  const activeCategoryTitle =
    activeCategoryId === 'all' ? 'Grand Arena' : activeCategoryObj?.title || 'Cyber IQ';

  return (
    <div className="space-y-10">
      {/* Top Header & Breadcrumb */}
      <CyberIqHeader
        currentView={activeView}
        onNavigateHome={() => setActiveView('select')}
        onOpenBadges={() => setIsBadgesModalOpen(true)}
        unlockedBadgeCount={profile.unlockedBadgeIds.length}
        totalBadgeCount={CYBER_IQ_BADGES.length}
      />

      {/* Main Tab Navigation (Only visible when not actively taking a quiz) */}
      {(activeView === 'select' || activeView === 'dashboard') && (
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            type="button"
            onClick={() => setActiveView('select')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm font-mono flex items-center gap-2 transition-all cursor-pointer ${
              activeView === 'select'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Start Challenge</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('dashboard')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm font-mono flex items-center gap-2 transition-all cursor-pointer ${
              activeView === 'dashboard'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Learning Dashboard</span>
            {profile.totalQuizzes > 0 && (
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            )}
          </button>
        </div>
      )}

      {/* VIEW 1: Dashboard View */}
      {activeView === 'dashboard' && (
        <CyberIqDashboard
          profile={profile}
          currentRank={currentRank}
          overallAccuracy={overallAccuracy}
          onStartQuiz={(catId) => {
            if (catId) {
              handleStartQuiz(catId, 'All', 10);
            } else {
              setActiveView('select');
            }
          }}
          onOpenBadges={() => setIsBadgesModalOpen(true)}
          onResetProgress={resetProfile}
        />
      )}

      {/* VIEW 2: Category & Difficulty Selection View */}
      {activeView === 'select' && (
        <CyberIqCategorySelector
          initialCategoryId={activeCategoryId}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {/* VIEW 3: Active Question Card View */}
      {activeView === 'quiz' && activeQuestions.length > 0 && (
        <CyberIqQuestionCard
          key={`${activeQuestions[currentQuestionIndex].id}-${currentQuestionIndex}`}
          question={activeQuestions[currentQuestionIndex]}
          categoryTitle={activeCategoryTitle}
          questionIndex={currentQuestionIndex}
          totalQuestions={activeQuestions.length}
          elapsedSeconds={elapsedSeconds}
          currentScore={currentScore}
          onAnswer={handleAnswerQuestion}
          onNext={handleNextQuestion}
          isLastQuestion={currentQuestionIndex === activeQuestions.length - 1}
        />
      )}

      {/* VIEW 4: Results Screen View */}
      {activeView === 'results' && lastAttempt && (
        <CyberIqResultsView
          attempt={lastAttempt}
          newlyUnlockedBadges={newlyUnlockedBadges}
          onReviewAnswers={() => setActiveView('review')}
          onRetake={() => handleStartQuiz(activeCategoryId, activeDifficulty, activeQuestions.length)}
          onChooseNewCategory={() => setActiveView('select')}
          answersMap={answersMap}
          isPersisted={isPersisted}
          onPersistedSuccess={() => setIsPersisted(true)}
        />
      )}

      {/* VIEW 5: Answer Review View */}
      {activeView === 'review' && (
        <CyberIqAnswerReview
          answeredQuestions={answeredQuestions}
          onBackToResults={() => setActiveView('results')}
          onRetake={() => handleStartQuiz(activeCategoryId, activeDifficulty, activeQuestions.length)}
        />
      )}

      {/* Badges Showcase Modal */}
      <CyberIqBadgesModal
        isOpen={isBadgesModalOpen}
        onClose={() => setIsBadgesModalOpen(false)}
        unlockedBadgeIds={profile.unlockedBadgeIds}
      />
    </div>
  );
};
