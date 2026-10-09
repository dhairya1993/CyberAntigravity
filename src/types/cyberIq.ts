export type CyberIqDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type CyberIqCategoryId =
  | 'fundamentals'
  | 'phishing'
  | 'passwords'
  | 'scams'
  | 'privacy'
  | 'networking'
  | 'ethical-hacking';

export interface CyberIqCategory {
  id: CyberIqCategoryId;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  gradient: string;
  borderAccent: string;
  badgeColor: string;
  recommendedAudience: string;
}

export interface CyberIqOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface CyberIqQuestion {
  id: string;
  categoryId: CyberIqCategoryId;
  difficulty: CyberIqDifficulty;
  question: string;
  scenario?: string;
  options: CyberIqOption[];
  securityPrinciple: string;
  whyOthersWrong?: string;
}

export interface CyberIqBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  categoryRequirement?: CyberIqCategoryId;
  xpRequirement?: number;
  conditionDescription: string;
}

export interface UserQuizAttempt {
  quizId: string;
  categoryId: CyberIqCategoryId | 'mixed';
  categoryTitle: string;
  difficulty: CyberIqDifficulty | 'Mixed';
  timestamp: number;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  xpEarned: number;
  timeSpentSeconds: number;
}

export interface UserCyberIqProfile {
  totalQuizzes: number;
  totalXp: number;
  totalAnswered: number;
  totalCorrect: number;
  unlockedBadgeIds: string[];
  categoryStats: Record<
    CyberIqCategoryId,
    {
      quizzesTaken: number;
      correctAnswers: number;
      totalAnswered: number;
      bestScorePercentage: number;
    }
  >;
  history: UserQuizAttempt[];
  lastActiveTimestamp: number;
}
