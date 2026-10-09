import { NextRequest, NextResponse } from 'next/server';
import { findStudentByEmail, verifyPassword } from '@/lib/db';
import { createSessionToken } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const student = await findStudentByEmail(email);
    if (!student) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, student.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

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
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Login failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
