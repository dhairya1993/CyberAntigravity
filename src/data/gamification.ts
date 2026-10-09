import type {
  LevelDefinition,
  LevelInfo,
  AchievementBadge,
  StreakData,
} from '../types/gamification';

// ============================================================================
// 1. XP RULES CONFIGURATION
// ============================================================================

export const XP_RULES = {
  QUIZ_COMPLETION: 50,
  QUIZ_HIGH_SCORE_BONUS: 25, // Score >= 80%
  QUIZ_PERFECT_SCORE_BONUS: 20, // Score === 100%
  MODULE_COMPLETION: 30,
} as const;

export function calculateQuizXp(scorePercentage: number): {
  baseXp: number;
  highScoreBonus: number;
  perfectScoreBonus: number;
  totalXp: number;
  breakdown: string[];
} {
  const baseXp = XP_RULES.QUIZ_COMPLETION;
  const highScoreBonus = scorePercentage >= 80 ? XP_RULES.QUIZ_HIGH_SCORE_BONUS : 0;
  const perfectScoreBonus = scorePercentage === 100 ? XP_RULES.QUIZ_PERFECT_SCORE_BONUS : 0;
  const totalXp = baseXp + highScoreBonus + perfectScoreBonus;

  const breakdown: string[] = [`+${baseXp} XP: Quiz Completed`];
  if (highScoreBonus > 0) {
    breakdown.push(`+${highScoreBonus} XP: 80%+ High Score Bonus`);
  }
  if (perfectScoreBonus > 0) {
    breakdown.push(`+${perfectScoreBonus} XP: 100% Perfect Score Bonus`);
  }

  return {
    baseXp,
    highScoreBonus,
    perfectScoreBonus,
    totalXp,
    breakdown,
  };
}

// ============================================================================
// 2. REUSABLE 9-LEVEL PROGRESSION SYSTEM
// ============================================================================

export const STUDENT_LEVELS: LevelDefinition[] = [
  {
    levelNumber: 1,
    title: 'Cyber Curious',
    minXp: 0,
    maxXp: 99,
    badgeColor: 'bg-slate-800 text-slate-300',
    textColor: 'text-slate-300',
    borderColor: 'border-slate-700',
    description: 'Beginning to explore digital safety principles and examine suspicious lures.',
  },
  {
    levelNumber: 2,
    title: 'Cyber Aware',
    minXp: 100,
    maxXp: 249,
    badgeColor: 'bg-amber-950/80 text-amber-300',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-800',
    description: 'Spots artificial urgency, inspects sender headers, and avoids deception traps.',
  },
  {
    levelNumber: 3,
    title: 'Cyber Smart',
    minXp: 250,
    maxXp: 449,
    badgeColor: 'bg-cyan-950/80 text-cyan-300',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-800',
    description: 'Practices multi-factor authentication, leverages password vaults, and verifies domains.',
  },
  {
    levelNumber: 4,
    title: 'Defensive Thinker',
    minXp: 450,
    maxXp: 699,
    badgeColor: 'bg-teal-950/80 text-teal-300',
    textColor: 'text-teal-400',
    borderColor: 'border-teal-800',
    description: 'Understands multi-stage attack chains, least privilege, and blast radius reduction.',
  },
  {
    levelNumber: 5,
    title: 'Security Mindset',
    minXp: 700,
    maxXp: 1049,
    badgeColor: 'bg-emerald-950/80 text-emerald-300',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-800',
    description: 'Instinctively practices zero-trust principles, cryptographic awareness, and threat modeling.',
  },
  {
    levelNumber: 6,
    title: 'Threat Analyst',
    minXp: 1050,
    maxXp: 1499,
    badgeColor: 'bg-sky-950/80 text-sky-300',
    textColor: 'text-sky-400',
    borderColor: 'border-sky-800',
    description: 'Deconstructs web vulnerabilities, headers, TLS handshakes, and reconnaissance tactics.',
  },
  {
    levelNumber: 7,
    title: 'SOC Sentinel',
    minXp: 1500,
    maxXp: 2099,
    badgeColor: 'bg-indigo-950/80 text-indigo-300',
    textColor: 'text-indigo-400',
    borderColor: 'border-indigo-800',
    description: 'Monitors event logs, telemetry indicators, triage workflows, and incident containment.',
  },
  {
    levelNumber: 8,
    title: 'Zero-Trust Architect',
    minXp: 2100,
    maxXp: 2799,
    badgeColor: 'bg-purple-950/80 text-purple-300',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-800',
    description: 'Designs resilient defense-in-depth perimeters, network segmentation, and identity boundaries.',
  },
  {
    levelNumber: 9,
    title: 'Master Defender',
    minXp: 2800,
    maxXp: 999999,
    badgeColor: 'bg-rose-950/80 text-rose-300',
    textColor: 'text-rose-400',
    borderColor: 'border-rose-800',
    description: 'Demonstrated mastery across all defensive categories, ethical hacking concepts, and AI security.',
  },
];

export function getLevelInfo(xp: number): LevelInfo {
  const safeXp = Math.max(0, xp);

  let currentDef = STUDENT_LEVELS[0];
  for (let i = STUDENT_LEVELS.length - 1; i >= 0; i--) {
    if (safeXp >= STUDENT_LEVELS[i].minXp) {
      currentDef = STUDENT_LEVELS[i];
      break;
    }
  }

  const isMaxLevel = currentDef.levelNumber === STUDENT_LEVELS.length;
  const nextLevel = isMaxLevel ? null : STUDENT_LEVELS[currentDef.levelNumber];

  let progressPercent = 100;
  let xpRemaining = 0;

  if (nextLevel) {
    const range = nextLevel.minXp - currentDef.minXp;
    const gainedInRange = safeXp - currentDef.minXp;
    progressPercent = Math.min(100, Math.max(0, Math.round((gainedInRange / range) * 100)));
    xpRemaining = Math.max(0, nextLevel.minXp - safeXp);
  }

  return {
    currentLevel: currentDef.levelNumber,
    title: currentDef.title,
    description: currentDef.description,
    minXp: currentDef.minXp,
    maxXp: currentDef.maxXp,
    currentXp: safeXp,
    progressPercent,
    xpRemaining,
    badgeColor: currentDef.badgeColor,
    textColor: currentDef.textColor,
    borderColor: currentDef.borderColor,
    isMaxLevel,
  };
}

// ============================================================================
// 3. DATE & STREAK UTILITIES
// ============================================================================

export function getLocalDateString(timestamp: number = Date.now()): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function calculateDaysDifference(dateStrA: string, dateStrB: string): number {
  const [y1, m1, d1] = dateStrA.split('-').map(Number);
  const [y2, m2, d2] = dateStrB.split('-').map(Number);
  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);
  return Math.round((utc2 - utc1) / 86400000);
}

export function calculateStreak(activityDates: string[], nowTimestamp: number = Date.now()): StreakData {
  if (!activityDates || activityDates.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      isActiveToday: false,
      isMaintainedFromYesterday: false,
      lastActiveDate: null,
      activityDates: [],
    };
  }

  // Deduplicate and sort chronologically (oldest to newest)
  const sortedDates = Array.from(new Set(activityDates)).sort();
  const todayStr = getLocalDateString(nowTimestamp);
  const yesterdayStr = getLocalDateString(nowTimestamp - 86400000);

  const isActiveToday = sortedDates.includes(todayStr);
  const isMaintainedFromYesterday = sortedDates.includes(yesterdayStr);

  // 1. Compute Longest Streak across all historical dates
  let maxStreak = 1;
  let currentRun = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const diff = calculateDaysDifference(sortedDates[i - 1], sortedDates[i]);
    if (diff === 1) {
      currentRun += 1;
      if (currentRun > maxStreak) {
        maxStreak = currentRun;
      }
    } else if (diff > 1) {
      currentRun = 1;
    }
  }

  // 2. Compute Current Active Streak
  // Start from reference date: either today (if active today) or yesterday (if active yesterday)
  let currentStreak = 0;
  let anchorDateStr: string | null = null;

  if (isActiveToday) {
    anchorDateStr = todayStr;
  } else if (isMaintainedFromYesterday) {
    anchorDateStr = yesterdayStr;
  }

  if (anchorDateStr) {
    currentStreak = 1;
    let expectedPrevious = anchorDateStr;

    // Count backwards day by day
    while (true) {
      const prevDate = new Date(parseLocalDate(expectedPrevious).getTime() - 86400000);
      const prevDateStr = getLocalDateString(prevDate.getTime());
      if (sortedDates.includes(prevDateStr)) {
        currentStreak += 1;
        expectedPrevious = prevDateStr;
      } else {
        break;
      }
    }
  }

  return {
    currentStreak,
    longestStreak: Math.max(maxStreak, currentStreak),
    isActiveToday,
    isMaintainedFromYesterday,
    lastActiveDate: sortedDates[sortedDates.length - 1],
    activityDates: sortedDates,
  };
}

// ============================================================================
// 4. ACHIEVEMENT BADGES SPECIFICATION
// ============================================================================

export const ACHIEVEMENT_BADGES: AchievementBadge[] = [
  {
    id: 'badge-first-quiz',
    name: 'First Steps',
    description: 'Completed your very first challenge in the Cyber IQ Quiz Arena.',
    iconName: 'Sparkles',
    category: 'starter',
    conditionDescription: 'Complete 1 quiz in any category',
    actionLink: '/cyber-iq',
    actionText: 'Take First Quiz',
    checkUnlocked: (profile) => profile.totalQuizzes >= 1,
  },
  {
    id: 'badge-phishing-sleuth',
    name: 'Phishing Detective',
    description: 'Completed a phishing awareness quiz to spot deceptive lures and forged headers.',
    iconName: 'MailCheck',
    category: 'quiz',
    conditionDescription: 'Complete a Phishing Detection quiz in the Arena',
    actionLink: '/cyber-iq',
    actionText: 'Launch Phishing Quiz',
    checkUnlocked: (profile) => (profile.categoryStats?.phishing?.quizzesTaken || 0) >= 1,
  },
  {
    id: 'badge-flawless',
    name: 'Perfect Score',
    description: 'Achieved 100% accuracy on a quiz without a single incorrect decision.',
    iconName: 'CheckCircle2',
    category: 'quiz',
    conditionDescription: 'Score 100% on any quiz challenge',
    actionLink: '/cyber-iq',
    actionText: 'Challenge a Quiz',
    checkUnlocked: (profile) =>
      profile.history.some((attempt) => attempt.scorePercentage === 100) ||
      Object.values(profile.categoryStats || {}).some((cat) => cat.bestScorePercentage === 100),
  },
  {
    id: 'badge-knowledge-explorer',
    name: 'Knowledge Explorer',
    description: 'Expanded defensive horizons by completing quizzes across at least 3 distinct topics.',
    iconName: 'Compass',
    category: 'quiz',
    conditionDescription: 'Complete quizzes across 3 different categories',
    actionLink: '/cyber-iq',
    actionText: 'Explore Categories',
    checkUnlocked: (profile) => {
      const attemptedCategories = Object.values(profile.categoryStats || {}).filter(
        (cat) => cat.quizzesTaken > 0
      );
      return attemptedCategories.length >= 3;
    },
  },
  {
    id: 'badge-learning-consistency',
    name: 'Learning Consistency',
    description: 'Completed qualifying learning activities across three consecutive calendar days.',
    iconName: 'Flame',
    category: 'streak',
    conditionDescription: 'Maintain a 3-day continuous learning streak',
    actionLink: '/learn/progress',
    actionText: 'View Daily Streak',
    checkUnlocked: (profile) => profile.longestStreak >= 3 || profile.currentStreak >= 3,
  },
  {
    id: 'badge-theory-explorer',
    name: 'Theory & Practice',
    description: 'Completed a structured defensive security module in the Learning Hub.',
    iconName: 'BookOpen',
    category: 'modules',
    conditionDescription: 'Complete 1 learning module in the Roadmap',
    actionLink: '/learn/cybersecurity-fundamentals',
    actionText: 'Study Fundamentals',
    checkUnlocked: (profile) => profile.totalModulesCompleted >= 1,
  },
  {
    id: 'badge-password-guardian',
    name: 'Password Guardian',
    description: 'Mastered entropy and authentication best practices with 80%+ quiz score.',
    iconName: 'KeyRound',
    category: 'quiz',
    conditionDescription: 'Score 80%+ in Password Security challenge',
    actionLink: '/cyber-iq',
    actionText: 'Password Quiz',
    checkUnlocked: (profile) =>
      (profile.categoryStats?.passwords?.bestScorePercentage || 0) >= 80,
  },
  {
    id: 'badge-scam-shield',
    name: 'Scam Interceptor',
    description: 'Successfully identified manipulative social engineering tactics with 80%+ score.',
    iconName: 'AlertTriangle',
    category: 'quiz',
    conditionDescription: 'Score 80%+ in Online Scam Awareness',
    actionLink: '/cyber-iq',
    actionText: 'Scam Awareness Quiz',
    checkUnlocked: (profile) =>
      (profile.categoryStats?.scams?.bestScorePercentage || 0) >= 80,
  },
  {
    id: 'badge-privacy-sentinel',
    name: 'Privacy Sentinel',
    description: 'Guarded digital boundaries, device permissions, and tracking defenses with 80%+ score.',
    iconName: 'EyeOff',
    category: 'quiz',
    conditionDescription: 'Score 80%+ in Privacy & Digital Safety',
    actionLink: '/cyber-iq',
    actionText: 'Privacy Quiz',
    checkUnlocked: (profile) =>
      (profile.categoryStats?.privacy?.bestScorePercentage || 0) >= 80,
  },
  {
    id: 'badge-network-scout',
    name: 'Network Scout',
    description: 'Understands packets, encryption, and public Wi-Fi hygiene with 80%+ score.',
    iconName: 'Wifi',
    category: 'quiz',
    conditionDescription: 'Score 80%+ in Networking Basics',
    actionLink: '/cyber-iq',
    actionText: 'Networking Quiz',
    checkUnlocked: (profile) =>
      (profile.categoryStats?.networking?.bestScorePercentage || 0) >= 80,
  },
  {
    id: 'badge-ethical-mindset',
    name: 'Ethical Thinker',
    description: 'Recognizes authorization, responsible disclosure, and defensive principles with 80%+ score.',
    iconName: 'Terminal',
    category: 'quiz',
    conditionDescription: 'Score 80%+ in Ethical Hacking Fundamentals',
    actionLink: '/cyber-iq',
    actionText: 'Ethical Hacking Quiz',
    checkUnlocked: (profile) =>
      (profile.categoryStats?.['ethical-hacking']?.bestScorePercentage || 0) >= 80,
  },
  {
    id: 'badge-xp-500',
    name: 'Cyber Prodigy',
    description: 'Earned 500+ XP across your defensive learning and quiz milestones.',
    iconName: 'Award',
    category: 'mastery',
    conditionDescription: 'Accumulate 500 total XP',
    actionLink: '/cyber-iq',
    actionText: 'Earn More XP',
    checkUnlocked: (profile) => profile.totalXp >= 500,
  },
  {
    id: 'badge-streak-champion',
    name: 'Streak Champion',
    description: 'Maintained a disciplined 5-day cybersecurity learning habit.',
    iconName: 'Zap',
    category: 'streak',
    conditionDescription: 'Maintain a 5-day continuous learning streak',
    actionLink: '/learn/progress',
    actionText: 'Check Streak',
    checkUnlocked: (profile) => profile.longestStreak >= 5 || profile.currentStreak >= 5,
  },
  {
    id: 'badge-security-mindset',
    name: 'Security Mindset',
    description: 'Advanced to Level 5, demonstrating deep defensive thinking and zero-trust instincts.',
    iconName: 'ShieldCheck',
    category: 'mastery',
    conditionDescription: 'Reach Student Level 5 (700+ XP)',
    actionLink: '/learn/progress',
    actionText: 'View Level Roadmap',
    checkUnlocked: (profile) => profile.totalXp >= 700,
  },
];
