import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedStudent } from '@/lib/auth/session';
import { getStudentGamificationData } from '@/lib/db';
import { getLevelInfo, calculateStreak } from '@/data/gamification';

export async function GET(req: NextRequest) {
  try {
    const student = await getAuthenticatedStudent(req);
    if (!student) {
      return NextResponse.json(
        { error: 'Authentication required to access learning progress.' },
        { status: 401 }
      );
    }

    const data = await getStudentGamificationData(student.id);

    // Calculate live streak and level info
    const toDateStr = (val: string | Date | undefined): string => {
      if (!val) return '';
      if (typeof val === 'string') return val.split('T')[0];
      if (val instanceof Date) return val.toISOString().split('T')[0];
      return String(val).split('T')[0];
    };

    const levelInfo = getLevelInfo(data.profile.total_xp);
    const activityDates = [
      ...data.quizCompletions.map((q) => toDateStr(q.completed_at)),
      ...data.moduleCompletions.map((m) => toDateStr(m.completed_at)),
    ];
    const streakInfo = calculateStreak(activityDates);

    // Build category breakdown
    const categoryStats: Record<string, { quizzesTaken: number; bestScorePercentage: number }> = {};
    for (const q of data.quizCompletions) {
      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { quizzesTaken: 0, bestScorePercentage: 0 };
      }
      categoryStats[q.category].quizzesTaken += 1;
      categoryStats[q.category].bestScorePercentage = Math.max(
        categoryStats[q.category].bestScorePercentage,
        Number(q.score_percentage)
      );
    }

    return NextResponse.json({
      success: true,
      profile: {
        studentId: student.id,
        email: student.email,
        displayName: student.display_name,
        totalXp: data.profile.total_xp,
        currentLevel: levelInfo.currentLevel,
        levelInfo,
        currentStreak: streakInfo.currentStreak,
        longestStreak: Math.max(data.profile.longest_streak, streakInfo.longestStreak),
        streakInfo,
        totalQuizzes: data.quizCompletions.length,
        totalModulesCompleted: data.moduleCompletions.length,
        completedModuleIds: data.moduleCompletions.map((m) => m.module_id),
        completedModules: data.moduleCompletions,
        quizHistory: data.quizCompletions,
        unlockedBadges: data.badges.map((b) => b.badge_id),
        categoryStats,
        recentActivities: data.activities,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch progress.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
