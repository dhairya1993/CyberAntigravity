import crypto from 'node:crypto';
import { NextRequest } from 'next/server';
import { findStudentById, DbStudent } from '../db';

const SESSION_SECRET =
  process.env.SESSION_SECRET || 'cyberantigravity_default_secure_session_secret_2026';
const SESSION_EXPIRY_MS = 1000 * 60 * 60 * 24 * 7; // 7 Days

export interface SessionPayload {
  studentId: string;
  email: string;
  role: 'student' | 'admin';
  expiresAt: number;
}

export function createSessionToken(payload: Omit<SessionPayload, 'expiresAt'>): string {
  const fullPayload: SessionPayload = {
    ...payload,
    expiresAt: Date.now() + SESSION_EXPIRY_MS,
  };

  const encodedPayload = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [encodedPayload, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(encodedPayload)
      .digest('base64url');

    const expectedBuffer = Buffer.from(expectedSignature);
    const actualBuffer = Buffer.from(signature);

    if (
      expectedBuffer.length !== actualBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, actualBuffer)
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf-8')
    ) as SessionPayload;

    if (Date.now() > payload.expiresAt) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getAuthenticatedStudent(
  req: NextRequest
): Promise<DbStudent | null> {
  // 1. Try reading cookie
  let token = req.cookies.get('cyber_session')?.value;

  // 2. Try Authorization header (Bearer token)
  if (!token) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  if (!token) return null;

  const session = verifySessionToken(token);
  if (!session) return null;

  return await findStudentById(session.studentId);
}
