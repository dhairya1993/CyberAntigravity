import { CyberIqCategoryId, CyberIqDifficulty, UserQuizAttempt } from './cyberIq';

export type ActivityType = 'quiz' | 'module';

export interface CompletedActivityRecord {
  id: string; // Unique deduplication key e.g. "quiz:attempt-123", "module:cybersecurity-fundamentals"
  type: ActivityType;
  title: string;
  category?: CyberIqCategoryId | string;
  difficulty?: CyberIqDifficulty | string;
  xpEarned: number;
  completedAt: number; // Unix timestamp ms
  dateStr: string; // Local YYYY-MM-DD
  scorePercentage?: number;
}

export interface LevelDefinition {
  levelNumber: number;
  title: string;
  minXp: number;
  maxXp: number;
  badgeColor: string;
  textColor: string;
  borderColor: string;
  description: string;
}

export interface LevelInfo {
  currentLevel: number;
  title: string;
  description: string;
  minXp: number;
  maxXp: number;
  currentXp: number;
  progressPercent: number;
  xpRemaining: number;
  badgeColor: string;
  textColor: string;
  borderColor: string;
  isMaxLevel: boolean;
}

export type BadgeCategory = 'starter' | 'quiz' | 'streak' | 'modules' | 'mastery';

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: BadgeCategory;
  conditionDescription: string;
  actionLink: string;
  actionText: string;
  checkUnlocked: (profile: StudentGamificationProfile) => boolean;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  isActiveToday: boolean;
  isMaintainedFromYesterday: boolean;
  lastActiveDate: string | null;
  activityDates: string[]; // List of unique YYYY-MM-DD strings
}

export interface StudentGamificationProfile {
  totalXp: number;
  totalQuizzes: number;
  totalModulesCompleted: number;
  totalAnswered: number;
  totalCorrect: number;
  unlockedBadgeIds: string[];
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  activityDates: string[];
  completedActivityIds: string[];
  completedActivities: CompletedActivityRecord[];
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
  createdAt: number;
}

export interface XpAwardResult {
  xpAwarded: number;
  xpBreakdown: string[];
  newlyUnlockedBadges: AchievementBadge[];
  levelUp: { from: number; to: number; newTitle: string } | null;
  isDuplicate: boolean;
  alreadyCompleted?: boolean;
}

export interface GamificationNotificationEvent {
  id: string;
  type: 'xp' | 'badge' | 'level_up' | 'streak';
  title: string;
  message: string;
  xpEarned?: number;
  badgeName?: string;
  levelNumber?: number;
}
