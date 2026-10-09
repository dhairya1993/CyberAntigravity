import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedStudent } from '@/lib/auth/session';
import { recordModuleCompletionAtomic, getStudentGamificationData } from '@/lib/db';
import { getLevelInfo } from '@/data/gamification';

export async function POST(req: NextRequest) {
  try {
    const student = await getAuthenticatedStudent(req);
    if (!student) {
      return NextResponse.json(
        { error: 'Authentication required to migrate legacy progress.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { legacyData } = body;

    if (!legacyData || typeof legacyData !== 'object') {
      return NextResponse.json(
        { error: 'Valid legacy progress data required.' },
        { status: 400 }
      );
    }

    let migratedModulesCount = 0;
    const completedModuleIds = Array.isArray(legacyData.completedModuleIds)
      ? legacyData.completedModuleIds
      : [];

    for (const modId of completedModuleIds) {
      if (typeof modId === 'string' && modId.length > 0) {
        const res = await recordModuleCompletionAtomic({
          studentId: student.id,
          sessionToken: `legacy-migration-${modId}`,
          moduleId: modId,
          xpEarned: 30,
          newlyUnlockedBadges: ['badge-theory-explorer'],
        });
        if (!res.isDuplicate) {
          migratedModulesCount++;
        }
      }
    }

    const updatedData = await getStudentGamificationData(student.id);
    const levelInfo = getLevelInfo(updatedData.profile.total_xp);

    return NextResponse.json({
      success: true,
      migratedModules: migratedModulesCount,
      totalXp: updatedData.profile.total_xp,
      levelInfo,
      message: `Successfully migrated ${migratedModulesCount} learning module completions to your persistent account.`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Legacy migration failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
