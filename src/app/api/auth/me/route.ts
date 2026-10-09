import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedStudent } from '@/lib/auth/session';
import { getStudentGamificationData } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const student = await getAuthenticatedStudent(req);
    if (!student) {
      return NextResponse.json({ user: null, profile: null });
    }

    const gamification = await getStudentGamificationData(student.id);

    return NextResponse.json({
      user: {
        id: student.id,
        email: student.email,
        displayName: student.display_name,
        avatarUrl: student.avatar_url,
        role: student.role,
      },
      profile: {
        ...gamification.profile,
        studentId: gamification.profile.student_id,
        totalXp: gamification.profile.total_xp,
        currentLevel: gamification.profile.current_level,
        currentStreak: gamification.profile.current_streak,
        longestStreak: gamification.profile.longest_streak,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to retrieve session.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
