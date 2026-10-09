import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedStudent } from '@/lib/auth/session';
import { getStudentGamificationData, recordQuizCompletionAtomic } from '@/lib/db';
import { evaluateQuizSubmission } from '@/lib/gamification/serverEvaluator';
import { getLevelInfo } from '@/data/gamification';

export async function POST(req: NextRequest) {
  try {
    const student = await getAuthenticatedStudent(req);
    if (!student) {
      return NextResponse.json(
        {
          error: 'Authentication required to save quiz XP and badges.',
          requiresAuth: true,
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { quizId, category, answers, sessionToken } = body;

    if (!category || !answers || typeof answers !== 'object' || !sessionToken) {
      return NextResponse.json(
        { error: 'Missing quiz submission data.' },
        { status: 400 }
      );
    }

    // 1. Fetch current student history from database
    const currentData = await getStudentGamificationData(student.id);
    const existingBadges = currentData.badges.map((b) => b.badge_id);

    // 2. Authoritative server evaluation of submitted answers
    const evaluation = evaluateQuizSubmission(
      category,
      answers,
      currentData.quizCompletions,
      currentData.moduleCompletions,
      existingBadges,
      currentData.profile.total_xp,
      currentData.profile.current_streak
    );

    // 3. Atomically record completion and prevent duplicate rewards
    const recordResult = await recordQuizCompletionAtomic({
      studentId: student.id,
      sessionToken: String(sessionToken),
      quizId: quizId || `quiz-${category}-${Date.now()}`,
      category,
      score: evaluation.score,
      totalQuestions: evaluation.totalQuestions,
      scorePercentage: evaluation.scorePercentage,
      baseXp: evaluation.baseXp,
      highScoreBonus: evaluation.highScoreBonus,
      perfectScoreBonus: evaluation.perfectScoreBonus,
      xpEarned: evaluation.xpEarned,
      newlyUnlockedBadges: evaluation.newlyUnlockedBadges,
    });

    const levelInfo = getLevelInfo(recordResult.profile.total_xp);

    return NextResponse.json({
      success: true,
      isDuplicate: recordResult.isDuplicate,
      verifiedXp: recordResult.awardedXp,
      totalXp: recordResult.profile.total_xp,
      levelInfo,
      currentStreak: recordResult.profile.current_streak,
      score: evaluation.score,
      totalQuestions: evaluation.totalQuestions,
      scorePercentage: evaluation.scorePercentage,
      breakdown: evaluation.breakdown,
      newlyUnlockedBadges: recordResult.newBadges,
      message: recordResult.isDuplicate
        ? 'Quiz completion was already verified and recorded.'
        : `Verified: +${recordResult.awardedXp} XP successfully awarded!`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error recording quiz completion.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
