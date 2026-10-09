import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedStudent } from '@/lib/auth/session';
import { getStudentGamificationData, recordModuleCompletionAtomic } from '@/lib/db';
import { evaluateModuleCompletion } from '@/lib/gamification/serverEvaluator';
import { getLevelInfo } from '@/data/gamification';

export async function POST(req: NextRequest) {
  try {
    const student = await getAuthenticatedStudent(req);
    if (!student) {
      return NextResponse.json(
        {
          error: 'Authentication required to save module completion XP.',
          requiresAuth: true,
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { moduleId, sessionToken } = body;

    if (!moduleId || !sessionToken) {
      return NextResponse.json(
        { error: 'Missing moduleId or sessionToken.' },
        { status: 400 }
      );
    }

    // 1. Fetch current student data from database
    const currentData = await getStudentGamificationData(student.id);
    const existingBadges = currentData.badges.map((b) => b.badge_id);

    // 2. Authoritative evaluation
    const evaluation = evaluateModuleCompletion(
      moduleId,
      existingBadges,
      currentData.profile.total_xp
    );

    // 3. Atomically record completion
    const recordResult = await recordModuleCompletionAtomic({
      studentId: student.id,
      sessionToken: String(sessionToken),
      moduleId: String(moduleId),
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
      newlyUnlockedBadges: recordResult.newBadges,
      message: recordResult.isDuplicate
        ? 'Module was already marked as completed.'
        : `Verified: +${recordResult.awardedXp} XP successfully awarded!`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error recording module completion.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
