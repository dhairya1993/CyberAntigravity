import { NextRequest, NextResponse } from 'next/server';
import { createStudent, findStudentByEmail } from '@/lib/db';
import { createSessionToken } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, displayName } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    const existing = await findStudentByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address already exists. Please log in.' },
        { status: 409 }
      );
    }

    const student = await createStudent({
      email,
      password,
      displayName: displayName || email.split('@')[0],
    });

    const token = createSessionToken({
      studentId: student.id,
      email: student.email,
      role: student.role,
    });

    const res = NextResponse.json({
      success: true,
      user: {
        id: student.id,
        email: student.email,
        displayName: student.display_name,
        role: student.role,
      },
    });

    res.cookies.set('cyber_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Registration failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
