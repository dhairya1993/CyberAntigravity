import { CYBER_IQ_QUESTIONS } from '@/data/cyberIqQuestions';
import { calculateQuizXp, XP_RULES } from '@/data/gamification';
import { DbQuizCompletion, DbModuleCompletion } from '../db';

export interface EvaluatedQuizResult {
  score: number;
  totalQuestions: number;
  scorePercentage: number;
  baseXp: number;
  highScoreBonus: number;
  perfectScoreBonus: number;
  xpEarned: number;
  breakdown: string[];
  newlyUnlockedBadges: string[];
}

export function evaluateQuizSubmission(
  categoryId: string,
  submittedAnswers: Record<string, string>,
  existingCompletions: DbQuizCompletion[],
  existingModules: DbModuleCompletion[],
  existingBadges: string[],
  currentTotalXp: number,
  currentStreak: number
): EvaluatedQuizResult {
  // 1. Filter authoritative questions for this category
  const categoryQuestions = CYBER_IQ_QUESTIONS.filter((q) => q.categoryId === categoryId);
  const totalQuestions = categoryQuestions.length > 0 ? categoryQuestions.length : Object.keys(submittedAnswers).length;

  let score = 0;
  for (const question of categoryQuestions) {
    const selectedOptionId = submittedAnswers[question.id];
    const correctOption = question.options.find((opt) => opt.isCorrect);
    if (correctOption && selectedOptionId === correctOption.id) {
      score += 1;
    }
  }

  const scorePercentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const xpCalc = calculateQuizXp(scorePercentage);
  const potentialNewTotalXp = currentTotalXp + xpCalc.totalXp;

  // 2. Determine which badges unlock
  const completedCategories = new Set(existingCompletions.map((c) => c.category));
  completedCategories.add(categoryId);

  const potentialBadges: string[] = [];

  // First Steps
  if (!existingBadges.includes('badge-first-quiz')) {
    potentialBadges.push('badge-first-quiz');
  }

  // Perfect score
  if (scorePercentage === 100 && !existingBadges.includes('badge-flawless')) {
    potentialBadges.push('badge-flawless');
  }

  // Category specific badges
  if (categoryId === 'phishing' && !existingBadges.includes('badge-phishing-sleuth')) {
    potentialBadges.push('badge-phishing-sleuth');
  }
  if (categoryId === 'passwords' && scorePercentage >= 80 && !existingBadges.includes('badge-password-guardian')) {
    potentialBadges.push('badge-password-guardian');
  }
  if (categoryId === 'scams' && scorePercentage >= 80 && !existingBadges.includes('badge-scam-shield')) {
    potentialBadges.push('badge-scam-shield');
  }
  if (categoryId === 'privacy' && scorePercentage >= 80 && !existingBadges.includes('badge-privacy-sentinel')) {
    potentialBadges.push('badge-privacy-sentinel');
  }
  if (categoryId === 'networking' && scorePercentage >= 80 && !existingBadges.includes('badge-network-scout')) {
    potentialBadges.push('badge-network-scout');
  }
  if (categoryId === 'ethical-hacking' && scorePercentage >= 80 && !existingBadges.includes('badge-ethical-mindset')) {
    potentialBadges.push('badge-ethical-mindset');
  }

  // Knowledge Explorer: 3 distinct categories
  if (completedCategories.size >= 3 && !existingBadges.includes('badge-knowledge-explorer')) {
    potentialBadges.push('badge-knowledge-explorer');
  }

  // Learning consistency: 3 day streak
  if (currentStreak >= 3 && !existingBadges.includes('badge-learning-consistency')) {
    potentialBadges.push('badge-learning-consistency');
  }

  // XP milestone
  if (potentialNewTotalXp >= 500 && !existingBadges.includes('badge-xp-500')) {
    potentialBadges.push('badge-xp-500');
  }

  return {
    score,
    totalQuestions,
    scorePercentage,
    baseXp: xpCalc.baseXp,
    highScoreBonus: xpCalc.highScoreBonus,
    perfectScoreBonus: xpCalc.perfectScoreBonus,
    xpEarned: xpCalc.totalXp,
    breakdown: xpCalc.breakdown,
    newlyUnlockedBadges: potentialBadges,
  };
}

export function evaluateModuleCompletion(
  moduleId: string,
  existingBadges: string[],
  currentTotalXp: number
): {
  xpEarned: number;
  newlyUnlockedBadges: string[];
} {
  const xpEarned = XP_RULES.MODULE_COMPLETION;
  const potentialBadges: string[] = [];

  if (!existingBadges.includes('badge-theory-explorer')) {
    potentialBadges.push('badge-theory-explorer');
  }

  if (currentTotalXp + xpEarned >= 500 && !existingBadges.includes('badge-xp-500')) {
    potentialBadges.push('badge-xp-500');
  }

  return {
    xpEarned,
    newlyUnlockedBadges: potentialBadges,
  };
}
