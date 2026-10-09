import { NextRequest, NextResponse } from 'next/server';
import { resetPasswordWithToken } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Valid reset token required.' }, { status: 400 });
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      return NextResponse.json({ error: 'New password must be at least 8 characters long.' }, { status: 400 });
    }

    const success = await resetPasswordWithToken(token, newPassword);
    if (!success) {
      return NextResponse.json(
        { error: 'Invalid or expired password reset token.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your password has been reset successfully. You may now log in.',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Reset failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
