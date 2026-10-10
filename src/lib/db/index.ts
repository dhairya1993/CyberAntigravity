import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';
import { isSupabaseServerConfigured, getSupabaseServerClient } from '../supabase/server';
import { isPostgresConfigured, getPostgresClient, ensurePostgresSchema } from '../postgres/client';
import { getLevelInfo, calculateStreak, getLocalDateString } from '../../data/gamification';

export interface DbStudent {
  id: string;
  email: string;
  password_hash: string;
  display_name: string;
  avatar_url?: string;
  role: 'student' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface DbStudentProfile {
  id: string;
  student_id: string;
  total_xp: number;
  current_level: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date?: string;
  created_at: string;
  updated_at: string;
}

export interface DbQuizCompletion {
  id: string;
  student_id: string;
  session_token: string;
  quiz_id: string;
  category: string;
  score: number;
  total_questions: number;
  score_percentage: number;
  base_xp: number;
  high_score_bonus: number;
  perfect_score_bonus: number;
  xp_earned: number;
  completed_at: string;
}

export interface DbModuleCompletion {
  id: string;
  student_id: string;
  session_token: string;
  module_id: string;
  xp_earned: number;
  completed_at: string;
}

export interface DbStudentBadge {
  id: string;
  student_id: string;
  badge_id: string;
  unlocked_at: string;
}

export interface DbStudentActivity {
  id: string;
  student_id: string;
  activity_type: 'quiz_completed' | 'module_completed' | 'badge_unlocked' | 'streak_achieved';
  title: string;
  xp_earned: number;
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface DbPasswordResetToken {
  token: string;
  email: string;
  expires_at: number;
}

interface DatabaseSchema {
  students: DbStudent[];
  student_profiles: DbStudentProfile[];
  quiz_completions: DbQuizCompletion[];
  module_completions: DbModuleCompletion[];
  student_badges: DbStudentBadge[];
  student_activities: DbStudentActivity[];
  password_reset_tokens: DbPasswordResetToken[];
}

let memoryDb: DatabaseSchema | null = null;

function emptySchema(): DatabaseSchema {
  return {
    students: [],
    student_profiles: [],
    quiz_completions: [],
    module_completions: [],
    student_badges: [],
    student_activities: [],
    password_reset_tokens: [],
  };
}

function getDatabasePaths(): { dataDir: string; dbPath: string } {
  // If running in Vercel or other serverless environment where process.cwd() is read-only
  const isServerless = Boolean(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.LAMBDA_TASK_ROOT ||
    (process.env.NODE_ENV === 'production' && !fs.existsSync(path.join(process.cwd(), '.git')))
  );

  if (isServerless) {
    const tmpDataDir = path.join(os.tmpdir(), 'cyberantigravity-data');
    return { dataDir: tmpDataDir, dbPath: path.join(tmpDataDir, 'db.json') };
  }

  const localDataDir = path.join(process.cwd(), '.data');
  return { dataDir: localDataDir, dbPath: path.join(localDataDir, 'db.json') };
}

function initializeLocalDb(): DatabaseSchema {
  if (memoryDb) {
    return memoryDb;
  }

  const { dataDir, dbPath } = getDatabasePaths();

  try {
    if (!fs.existsSync(/*turbopackIgnore: true*/ dataDir)) {
      fs.mkdirSync(/*turbopackIgnore: true*/ dataDir, { recursive: true });
    }

    if (!fs.existsSync(/*turbopackIgnore: true*/ dbPath)) {
      const initialData = emptySchema();
      try {
        fs.writeFileSync(/*turbopackIgnore: true*/ dbPath, JSON.stringify(initialData, null, 2), 'utf-8');
      } catch (writeErr) {
        console.warn('Could not write initial db file, using in-memory:', writeErr);
      }
      memoryDb = initialData;
      return initialData;
    }

    const raw = fs.readFileSync(/*turbopackIgnore: true*/ dbPath, 'utf-8');
    const parsed = JSON.parse(raw) as DatabaseSchema;
    memoryDb = parsed;
    return parsed;
  } catch (fsErr) {
    console.warn('Primary database directory access failed:', fsErr);

    // Fallback: Try temporary directory (/tmp) if primary was not already in os.tmpdir()
    if (!dataDir.startsWith(os.tmpdir())) {
      try {
        const tmpDir = path.join(os.tmpdir(), 'cyberantigravity-data');
        const tmpDbPath = path.join(tmpDir, 'db.json');
        if (!fs.existsSync(/*turbopackIgnore: true*/ tmpDir)) {
          fs.mkdirSync(/*turbopackIgnore: true*/ tmpDir, { recursive: true });
        }
        if (fs.existsSync(/*turbopackIgnore: true*/ tmpDbPath)) {
          const raw = fs.readFileSync(/*turbopackIgnore: true*/ tmpDbPath, 'utf-8');
          memoryDb = JSON.parse(raw) as DatabaseSchema;
          return memoryDb;
        }
        const initialData = emptySchema();
        fs.writeFileSync(/*turbopackIgnore: true*/ tmpDbPath, JSON.stringify(initialData, null, 2), 'utf-8');
        memoryDb = initialData;
        return initialData;
      } catch (tmpErr) {
        console.warn('Fallback /tmp database directory access failed:', tmpErr);
      }
    }

    // Final fallback: in-memory schema
    memoryDb = emptySchema();
    return memoryDb;
  }
}

function saveLocalDb(data: DatabaseSchema): void {
  memoryDb = data;

  const { dataDir, dbPath } = getDatabasePaths();

  try {
    if (!fs.existsSync(/*turbopackIgnore: true*/ dataDir)) {
      fs.mkdirSync(/*turbopackIgnore: true*/ dataDir, { recursive: true });
    }
    const tempPath = `${dbPath}.${Date.now()}.${Math.random().toString(36).slice(2, 6)}.tmp`;
    fs.writeFileSync(/*turbopackIgnore: true*/ tempPath, JSON.stringify(data, null, 2), 'utf-8');
    try {
      fs.renameSync(/*turbopackIgnore: true*/ tempPath, dbPath);
    } catch {
      fs.copyFileSync(/*turbopackIgnore: true*/ tempPath, dbPath);
      try {
        fs.unlinkSync(/*turbopackIgnore: true*/ tempPath);
      } catch {
        // Ignore unlink error
      }
    }
  } catch (err) {
    console.warn('Failed to save database to disk, falling back to /tmp or memory:', err);

    if (!dataDir.startsWith(os.tmpdir())) {
      try {
        const tmpDir = path.join(os.tmpdir(), 'cyberantigravity-data');
        const tmpDbPath = path.join(tmpDir, 'db.json');
        if (!fs.existsSync(/*turbopackIgnore: true*/ tmpDir)) {
          fs.mkdirSync(/*turbopackIgnore: true*/ tmpDir, { recursive: true });
        }
        const tempPath = `${tmpDbPath}.${Date.now()}.${Math.random().toString(36).slice(2, 6)}.tmp`;
        fs.writeFileSync(/*turbopackIgnore: true*/ tempPath, JSON.stringify(data, null, 2), 'utf-8');
        try {
          fs.renameSync(/*turbopackIgnore: true*/ tempPath, tmpDbPath);
        } catch {
          fs.copyFileSync(/*turbopackIgnore: true*/ tempPath, tmpDbPath);
          try {
            fs.unlinkSync(/*turbopackIgnore: true*/ tempPath);
          } catch {
            // Ignore unlink error
          }
        }
      } catch (tmpSaveErr) {
        console.warn('Secondary /tmp save failed, data safely preserved in memory:', tmpSaveErr);
      }
    }
  }
}

// ----------------------------------------------------------------------------
// Password Security (Scrypt Hashing with Salt)
// ----------------------------------------------------------------------------
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

// ----------------------------------------------------------------------------
// Student Account Operations
// ----------------------------------------------------------------------------
export async function findStudentByEmail(email: string): Promise<DbStudent | null> {
  const normalized = email.trim().toLowerCase();

  if (isPostgresConfigured()) {
    try {
      await ensurePostgresSchema();
      const sql = getPostgresClient();
      if (sql) {
        const rows = await sql`SELECT * FROM students WHERE LOWER(email) = ${normalized} LIMIT 1`;
        if (rows.length > 0) return rows[0] as DbStudent;
      }
    } catch (err) {
      console.warn('Postgres findStudentByEmail failed, checking fallbacks:', err);
    }
  }

  if (isSupabaseServerConfigured()) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data } = await supabase
        .from('students')
        .select('*')
        .eq('email', normalized)
        .maybeSingle();
      if (data) return data as DbStudent;
    }
  }

  const db = initializeLocalDb();
  return db.students.find((s) => s.email.toLowerCase() === normalized) || null;
}

export async function findStudentById(id: string): Promise<DbStudent | null> {
  if (isPostgresConfigured()) {
    try {
      await ensurePostgresSchema();
      const sql = getPostgresClient();
      if (sql) {
        const rows = await sql`SELECT * FROM students WHERE id = ${id} LIMIT 1`;
        if (rows.length > 0) return rows[0] as DbStudent;
      }
    } catch (err) {
      console.warn('Postgres findStudentById failed, checking fallbacks:', err);
    }
  }

  if (isSupabaseServerConfigured()) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data } = await supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (data) return data as DbStudent;
    }
  }

  const db = initializeLocalDb();
  return db.students.find((s) => s.id === id) || null;
}

export async function createStudent(params: {
  email: string;
  password: string;
  displayName: string;
}): Promise<DbStudent> {
  const normalizedEmail = params.email.trim().toLowerCase();
  const existing = await findStudentByEmail(normalizedEmail);
  if (existing) {
    throw new Error('An account with this email address already exists.');
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const passwordHash = hashPassword(params.password);

  const newStudent: DbStudent = {
    id,
    email: normalizedEmail,
    password_hash: passwordHash,
    display_name: params.displayName.trim() || normalizedEmail.split('@')[0],
    role: 'student',
    created_at: now,
    updated_at: now,
  };

  const initialProfile: DbStudentProfile = {
    id: crypto.randomUUID(),
    student_id: id,
    total_xp: 0,
    current_level: 1,
    current_streak: 0,
    longest_streak: 0,
    created_at: now,
    updated_at: now,
  };

  if (isPostgresConfigured()) {
    try {
      await ensurePostgresSchema();
      const sql = getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO students (id, email, password_hash, display_name, role, created_at, updated_at)
          VALUES (${newStudent.id}, ${newStudent.email}, ${newStudent.password_hash}, ${newStudent.display_name}, ${newStudent.role}, ${newStudent.created_at}, ${newStudent.updated_at})
        `;
        await sql`
          INSERT INTO student_profiles (id, student_id, total_xp, current_level, current_streak, longest_streak, created_at, updated_at)
          VALUES (${initialProfile.id}, ${initialProfile.student_id}, ${initialProfile.total_xp}, ${initialProfile.current_level}, ${initialProfile.current_streak}, ${initialProfile.longest_streak}, ${initialProfile.created_at}, ${initialProfile.updated_at})
        `;
      }
    } catch (pgErr) {
      console.warn('Postgres student insert failed, local fallback active:', pgErr);
    }
  }

  if (isSupabaseServerConfigured()) {
    try {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        // Create user in Supabase auth and profile tables
        await supabase.from('students').insert({
          id: newStudent.id,
          email: newStudent.email,
          password_hash: newStudent.password_hash,
          display_name: newStudent.display_name,
          role: newStudent.role,
          created_at: newStudent.created_at,
          updated_at: newStudent.updated_at,
        });
        await supabase.from('student_profiles').insert(initialProfile);
      }
    } catch (sbErr) {
      console.warn('Supabase insert failed, continuing with local store:', sbErr);
    }
  }

  const db = initializeLocalDb();
  db.students.push(newStudent);
  db.student_profiles.push(initialProfile);
  saveLocalDb(db);

  return newStudent;
}

// ----------------------------------------------------------------------------
// Password Recovery Flow
// ----------------------------------------------------------------------------
export async function createPasswordResetToken(email: string): Promise<string | null> {
  const student = await findStudentByEmail(email);
  if (!student) {
    // Return null silently to avoid leaking email enumeration
    return null;
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 1000 * 60 * 60; // 1 hour validity

  const db = initializeLocalDb();
  db.password_reset_tokens = db.password_reset_tokens.filter((t) => t.email !== student.email);
  db.password_reset_tokens.push({
    token,
    email: student.email,
    expires_at: expiresAt,
  });
  saveLocalDb(db);

  return token;
}

export async function resetPasswordWithToken(token: string, newPassword: string): Promise<boolean> {
  const db = initializeLocalDb();
  const entry = db.password_reset_tokens.find(
    (t) => t.token === token && t.expires_at > Date.now()
  );
  if (!entry) return false;

  const student = db.students.find((s) => s.email === entry.email);
  if (!student) return false;

  student.password_hash = hashPassword(newPassword);
  student.updated_at = new Date().toISOString();

  // Clear token
  db.password_reset_tokens = db.password_reset_tokens.filter((t) => t.token !== token);
  saveLocalDb(db);
  return true;
}

// ----------------------------------------------------------------------------
// Gamification Progress Queries
// ----------------------------------------------------------------------------
export async function getStudentGamificationData(studentId: string): Promise<{
  profile: DbStudentProfile;
  quizCompletions: DbQuizCompletion[];
  moduleCompletions: DbModuleCompletion[];
  badges: DbStudentBadge[];
  activities: DbStudentActivity[];
}> {
  if (isPostgresConfigured()) {
    try {
      await ensurePostgresSchema();
      const sql = getPostgresClient();
      if (sql) {
        const [profiles, quizzes, modules, badges, activities] = await Promise.all([
          sql`SELECT * FROM student_profiles WHERE student_id = ${studentId} LIMIT 1`,
          sql`SELECT * FROM quiz_completions WHERE student_id = ${studentId}`,
          sql`SELECT * FROM module_completions WHERE student_id = ${studentId}`,
          sql`SELECT * FROM student_badges WHERE student_id = ${studentId}`,
          sql`SELECT * FROM student_activities WHERE student_id = ${studentId} ORDER BY timestamp DESC LIMIT 25`,
        ]);

        let profile = profiles[0] as DbStudentProfile;
        if (!profile) {
          const now = new Date().toISOString();
          const newProfId = crypto.randomUUID();
          await sql`
            INSERT INTO student_profiles (id, student_id, total_xp, current_level, current_streak, longest_streak, created_at, updated_at)
            VALUES (${newProfId}, ${studentId}, 0, 1, 0, 0, ${now}, ${now})
          `;
          profile = {
            id: newProfId,
            student_id: studentId,
            total_xp: 0,
            current_level: 1,
            current_streak: 0,
            longest_streak: 0,
            created_at: now,
            updated_at: now,
          };
        }

        return {
          profile,
          quizCompletions: quizzes as DbQuizCompletion[],
          moduleCompletions: modules as DbModuleCompletion[],
          badges: badges as DbStudentBadge[],
          activities: activities as DbStudentActivity[],
        };
      }
    } catch (err) {
      console.warn('Postgres gamification data fetch failed, checking fallbacks:', err);
    }
  }

  if (isSupabaseServerConfigured()) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const [pRes, qRes, mRes, bRes, aRes] = await Promise.all([
        supabase.from('student_profiles').select('*').eq('student_id', studentId).single(),
        supabase.from('quiz_completions').select('*').eq('student_id', studentId),
        supabase.from('module_completions').select('*').eq('student_id', studentId),
        supabase.from('student_badges').select('*').eq('student_id', studentId),
        supabase.from('student_activities').select('*').eq('student_id', studentId).order('timestamp', { ascending: false }).limit(20),
      ]);

      if (pRes.data) {
        return {
          profile: pRes.data as DbStudentProfile,
          quizCompletions: (qRes.data || []) as DbQuizCompletion[],
          moduleCompletions: (mRes.data || []) as DbModuleCompletion[],
          badges: (bRes.data || []) as DbStudentBadge[],
          activities: (aRes.data || []) as DbStudentActivity[],
        };
      }
    }
  }

  const db = initializeLocalDb();
  let profile = db.student_profiles.find((p) => p.student_id === studentId);
  if (!profile) {
    const now = new Date().toISOString();
    profile = {
      id: crypto.randomUUID(),
      student_id: studentId,
      total_xp: 0,
      current_level: 1,
      current_streak: 0,
      longest_streak: 0,
      created_at: now,
      updated_at: now,
    };
    db.student_profiles.push(profile);
    saveLocalDb(db);
  }

  const quizCompletions = db.quiz_completions.filter((q) => q.student_id === studentId);
  const moduleCompletions = db.module_completions.filter((m) => m.student_id === studentId);
  const badges = db.student_badges.filter((b) => b.student_id === studentId);
  const activities = db.student_activities
    .filter((a) => a.student_id === studentId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 25);

  return { profile, quizCompletions, moduleCompletions, badges, activities };
}

// ----------------------------------------------------------------------------
// Atomic Quiz Completion & XP Awarding
// ----------------------------------------------------------------------------
export async function recordQuizCompletionAtomic(params: {
  studentId: string;
  sessionToken: string;
  quizId: string;
  category: string;
  score: number;
  totalQuestions: number;
  scorePercentage: number;
  baseXp: number;
  highScoreBonus: number;
  perfectScoreBonus: number;
  xpEarned: number;
  newlyUnlockedBadges: string[];
}): Promise<{
  isDuplicate: boolean;
  profile: DbStudentProfile;
  awardedXp: number;
  newBadges: string[];
}> {
  const db = initializeLocalDb();
  const { studentId, sessionToken } = params;

  // 1. Idempotency Check: prevent duplicate submission rewards
  const existingCompletion = db.quiz_completions.find(
    (q) => q.student_id === studentId && q.session_token === sessionToken
  );
  if (existingCompletion) {
    const profile = db.student_profiles.find((p) => p.student_id === studentId)!;
    return {
      isDuplicate: true,
      profile,
      awardedXp: 0,
      newBadges: [],
    };
  }

  const now = new Date();
  const nowIso = now.toISOString();
  const todayStr = getLocalDateString(now.getTime());

  // 2. Insert Quiz Completion Record
  const newCompletion: DbQuizCompletion = {
    id: crypto.randomUUID(),
    student_id: studentId,
    session_token: sessionToken,
    quiz_id: params.quizId,
    category: params.category,
    score: params.score,
    total_questions: params.totalQuestions,
    score_percentage: params.scorePercentage,
    base_xp: params.baseXp,
    high_score_bonus: params.highScoreBonus,
    perfect_score_bonus: params.perfectScoreBonus,
    xp_earned: params.xpEarned,
    completed_at: nowIso,
  };
  db.quiz_completions.push(newCompletion);

  // 3. Compute Streak updates
  const allStudentDates = [
    ...db.quiz_completions.filter((q) => q.student_id === studentId).map((q) => getLocalDateString(new Date(q.completed_at).getTime())),
    ...db.module_completions.filter((m) => m.student_id === studentId).map((m) => getLocalDateString(new Date(m.completed_at).getTime())),
  ];
  const streakCalc = calculateStreak(allStudentDates, now.getTime());

  // 4. Update Profile XP & Level
  let profile = db.student_profiles.find((p) => p.student_id === studentId);
  if (!profile) {
    profile = {
      id: crypto.randomUUID(),
      student_id: studentId,
      total_xp: 0,
      current_level: 1,
      current_streak: 0,
      longest_streak: 0,
      created_at: nowIso,
      updated_at: nowIso,
    };
    db.student_profiles.push(profile);
  }

  profile.total_xp += params.xpEarned;
  profile.current_level = getLevelInfo(profile.total_xp).currentLevel;
  profile.current_streak = streakCalc.currentStreak;
  profile.longest_streak = Math.max(profile.longest_streak, streakCalc.longestStreak);
  profile.last_activity_date = todayStr;
  profile.updated_at = nowIso;

  // 5. Award Badges (Ensuring unique constraint)
  const newlyEarnedBadges: string[] = [];
  for (const badgeId of params.newlyUnlockedBadges) {
    const alreadyHasBadge = db.student_badges.some(
      (b) => b.student_id === studentId && b.badge_id === badgeId
    );
    if (!alreadyHasBadge) {
      db.student_badges.push({
        id: crypto.randomUUID(),
        student_id: studentId,
        badge_id: badgeId,
        unlocked_at: nowIso,
      });
      newlyEarnedBadges.push(badgeId);

      db.student_activities.push({
        id: crypto.randomUUID(),
        student_id: studentId,
        activity_type: 'badge_unlocked',
        title: `Achievement Unlocked: ${badgeId}`,
        xp_earned: 0,
        details: { badgeId },
        timestamp: nowIso,
      });
    }
  }

  // 6. Record Activity Log
  db.student_activities.push({
    id: crypto.randomUUID(),
    student_id: studentId,
    activity_type: 'quiz_completed',
    title: `Completed ${params.category} Quiz (${params.score}/${params.totalQuestions})`,
    xp_earned: params.xpEarned,
    details: {
      quizId: params.quizId,
      scorePercentage: params.scorePercentage,
      baseXp: params.baseXp,
      highScoreBonus: params.highScoreBonus,
      perfectScoreBonus: params.perfectScoreBonus,
    },
    timestamp: nowIso,
  });

  saveLocalDb(db);

  if (isPostgresConfigured()) {
    try {
      await ensurePostgresSchema();
      const sql = getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO quiz_completions (id, student_id, session_token, quiz_id, category, score, total_questions, score_percentage, base_xp, high_score_bonus, perfect_score_bonus, xp_earned, completed_at)
          VALUES (${newCompletion.id}, ${newCompletion.student_id}, ${newCompletion.session_token}, ${newCompletion.quiz_id}, ${newCompletion.category}, ${newCompletion.score}, ${newCompletion.total_questions}, ${newCompletion.score_percentage}, ${newCompletion.base_xp}, ${newCompletion.high_score_bonus}, ${newCompletion.perfect_score_bonus}, ${newCompletion.xp_earned}, ${newCompletion.completed_at})
        `;
        await sql`
          UPDATE student_profiles
          SET total_xp = ${profile.total_xp},
              current_level = ${profile.current_level},
              current_streak = ${profile.current_streak},
              longest_streak = ${profile.longest_streak},
              last_activity_date = ${profile.last_activity_date},
              updated_at = ${profile.updated_at}
          WHERE student_id = ${studentId}
        `;
        for (const bId of newlyEarnedBadges) {
          await sql`
            INSERT INTO student_badges (id, student_id, badge_id, unlocked_at)
            VALUES (${crypto.randomUUID()}, ${studentId}, ${bId}, ${nowIso})
            ON CONFLICT DO NOTHING
          `;
        }
        await sql`
          INSERT INTO student_activities (id, student_id, activity_type, title, xp_earned, details, timestamp)
          VALUES (${crypto.randomUUID()}, ${studentId}, 'quiz_completed', ${`Completed ${params.category} Quiz (${params.score}/${params.totalQuestions})`}, ${params.xpEarned}, ${JSON.stringify({
            quizId: params.quizId,
            scorePercentage: params.scorePercentage,
            baseXp: params.baseXp,
            highScoreBonus: params.highScoreBonus,
            perfectScoreBonus: params.perfectScoreBonus,
          })}, ${nowIso})
        `;
      }
    } catch (pgErr) {
      console.warn('Postgres quiz completion sync failed:', pgErr);
    }
  }

  if (isSupabaseServerConfigured()) {
    try {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        await supabase.from('quiz_completions').insert(newCompletion);
        await supabase
          .from('student_profiles')
          .update({
            total_xp: profile.total_xp,
            current_level: profile.current_level,
            current_streak: profile.current_streak,
            longest_streak: profile.longest_streak,
            last_activity_date: profile.last_activity_date,
            updated_at: profile.updated_at,
          })
          .eq('student_id', studentId);

        if (newlyEarnedBadges.length > 0) {
          await supabase.from('student_badges').insert(
            newlyEarnedBadges.map((badgeId) => ({
              id: crypto.randomUUID(),
              student_id: studentId,
              badge_id: badgeId,
              unlocked_at: nowIso,
            }))
          );
        }

        await supabase.from('student_activities').insert({
          id: crypto.randomUUID(),
          student_id: studentId,
          activity_type: 'quiz_completed',
          title: `Completed ${params.category} Quiz (${params.score}/${params.totalQuestions})`,
          xp_earned: params.xpEarned,
          details: {
            quizId: params.quizId,
            scorePercentage: params.scorePercentage,
            baseXp: params.baseXp,
            highScoreBonus: params.highScoreBonus,
            perfectScoreBonus: params.perfectScoreBonus,
          },
          timestamp: nowIso,
        });
      }
    } catch (sbErr) {
      console.warn('Supabase sync for quiz completion failed:', sbErr);
    }
  }

  return {
    isDuplicate: false,
    profile,
    awardedXp: params.xpEarned,
    newBadges: newlyEarnedBadges,
  };
}

// ----------------------------------------------------------------------------
// Atomic Module Completion & XP Awarding
// ----------------------------------------------------------------------------
export async function recordModuleCompletionAtomic(params: {
  studentId: string;
  sessionToken: string;
  moduleId: string;
  xpEarned: number;
  newlyUnlockedBadges: string[];
}): Promise<{
  isDuplicate: boolean;
  profile: DbStudentProfile;
  awardedXp: number;
  newBadges: string[];
}> {
  const db = initializeLocalDb();
  const { studentId, moduleId } = params;

  // Check if module already completed
  const alreadyCompleted = db.module_completions.some(
    (m) => m.student_id === studentId && m.module_id === moduleId
  );
  if (alreadyCompleted) {
    const profile = db.student_profiles.find((p) => p.student_id === studentId)!;
    return {
      isDuplicate: true,
      profile,
      awardedXp: 0,
      newBadges: [],
    };
  }

  const now = new Date();
  const nowIso = now.toISOString();
  const todayStr = getLocalDateString(now.getTime());

  // Record completion
  db.module_completions.push({
    id: crypto.randomUUID(),
    student_id: studentId,
    session_token: params.sessionToken,
    module_id: moduleId,
    xp_earned: params.xpEarned,
    completed_at: nowIso,
  });

  // Calculate Streak
  const allStudentDates = [
    ...db.quiz_completions.filter((q) => q.student_id === studentId).map((q) => getLocalDateString(new Date(q.completed_at).getTime())),
    ...db.module_completions.filter((m) => m.student_id === studentId).map((m) => getLocalDateString(new Date(m.completed_at).getTime())),
  ];
  const streakCalc = calculateStreak(allStudentDates, now.getTime());

  // Update Profile
  let profile = db.student_profiles.find((p) => p.student_id === studentId);
  if (!profile) {
    profile = {
      id: crypto.randomUUID(),
      student_id: studentId,
      total_xp: 0,
      current_level: 1,
      current_streak: 0,
      longest_streak: 0,
      created_at: nowIso,
      updated_at: nowIso,
    };
    db.student_profiles.push(profile);
  }

  profile.total_xp += params.xpEarned;
  profile.current_level = getLevelInfo(profile.total_xp).currentLevel;
  profile.current_streak = streakCalc.currentStreak;
  profile.longest_streak = Math.max(profile.longest_streak, streakCalc.longestStreak);
  profile.last_activity_date = todayStr;
  profile.updated_at = nowIso;

  // Add Badges
  const newlyEarnedBadges: string[] = [];
  for (const badgeId of params.newlyUnlockedBadges) {
    const hasBadge = db.student_badges.some(
      (b) => b.student_id === studentId && b.badge_id === badgeId
    );
    if (!hasBadge) {
      db.student_badges.push({
        id: crypto.randomUUID(),
        student_id: studentId,
        badge_id: badgeId,
        unlocked_at: nowIso,
      });
      newlyEarnedBadges.push(badgeId);
    }
  }

  // Record Activity
  db.student_activities.push({
    id: crypto.randomUUID(),
    student_id: studentId,
    activity_type: 'module_completed',
    title: `Completed Module: ${moduleId}`,
    xp_earned: params.xpEarned,
    details: { moduleId },
    timestamp: nowIso,
  });

  saveLocalDb(db);

  if (isPostgresConfigured()) {
    try {
      await ensurePostgresSchema();
      const sql = getPostgresClient();
      if (sql) {
        await sql`
          INSERT INTO module_completions (id, student_id, session_token, module_id, xp_earned, completed_at)
          VALUES (${crypto.randomUUID()}, ${studentId}, ${params.sessionToken}, ${moduleId}, ${params.xpEarned}, ${nowIso})
        `;
        await sql`
          UPDATE student_profiles
          SET total_xp = ${profile.total_xp},
              current_level = ${profile.current_level},
              current_streak = ${profile.current_streak},
              longest_streak = ${profile.longest_streak},
              last_activity_date = ${profile.last_activity_date},
              updated_at = ${profile.updated_at}
          WHERE student_id = ${studentId}
        `;
        for (const bId of newlyEarnedBadges) {
          await sql`
            INSERT INTO student_badges (id, student_id, badge_id, unlocked_at)
            VALUES (${crypto.randomUUID()}, ${studentId}, ${bId}, ${nowIso})
            ON CONFLICT DO NOTHING
          `;
        }
        await sql`
          INSERT INTO student_activities (id, student_id, activity_type, title, xp_earned, details, timestamp)
          VALUES (${crypto.randomUUID()}, ${studentId}, 'module_completed', ${`Completed Module: ${moduleId}`}, ${params.xpEarned}, ${JSON.stringify({ moduleId })}, ${nowIso})
        `;
      }
    } catch (pgErr) {
      console.warn('Postgres module completion sync failed:', pgErr);
    }
  }

  if (isSupabaseServerConfigured()) {
    try {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        await supabase.from('module_completions').insert({
          id: crypto.randomUUID(),
          student_id: studentId,
          session_token: params.sessionToken,
          module_id: moduleId,
          xp_earned: params.xpEarned,
          completed_at: nowIso,
        });
        await supabase
          .from('student_profiles')
          .update({
            total_xp: profile.total_xp,
            current_level: profile.current_level,
            current_streak: profile.current_streak,
            longest_streak: profile.longest_streak,
            last_activity_date: profile.last_activity_date,
            updated_at: profile.updated_at,
          })
          .eq('student_id', studentId);

        if (newlyEarnedBadges.length > 0) {
          await supabase.from('student_badges').insert(
            newlyEarnedBadges.map((badgeId) => ({
              id: crypto.randomUUID(),
              student_id: studentId,
              badge_id: badgeId,
              unlocked_at: nowIso,
            }))
          );
        }

        await supabase.from('student_activities').insert({
          id: crypto.randomUUID(),
          student_id: studentId,
          activity_type: 'module_completed',
          title: `Completed Module: ${moduleId}`,
          xp_earned: params.xpEarned,
          details: { moduleId },
          timestamp: nowIso,
        });
      }
    } catch (sbErr) {
      console.warn('Supabase sync for module completion failed:', sbErr);
    }
  }

  return {
    isDuplicate: false,
    profile,
    awardedXp: params.xpEarned,
    newBadges: newlyEarnedBadges,
  };
}

// ----------------------------------------------------------------------------
// Reset All Test Data (For Development Testing Only)
// ----------------------------------------------------------------------------
export function resetTestDatabase(): void {
  memoryDb = null;
  const initialData: DatabaseSchema = {
    students: [],
    student_profiles: [],
    quiz_completions: [],
    module_completions: [],
    student_badges: [],
    student_activities: [],
    password_reset_tokens: [],
  };
  saveLocalDb(initialData);
}
