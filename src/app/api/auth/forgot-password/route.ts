import { NextRequest, NextResponse } from 'next/server';
import { createPasswordResetToken } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const token = await createPasswordResetToken(email);

    // In a live production environment with SMTP/Resend/SendGrid, an email with a secure link would be sent.
    // For local evaluation and development testing, we also return the token in non-production environments.
    const isDev = process.env.NODE_ENV !== 'production';

    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email address, password reset instructions have been sent.',
      ...(isDev && token ? { devToken: token } : {}),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Password reset failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
