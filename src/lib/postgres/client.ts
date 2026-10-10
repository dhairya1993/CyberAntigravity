import { neon } from '@neondatabase/serverless';

function getDatabaseUrl(): string | null {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url || url.includes('your-database-url') || url.includes('placeholder')) {
    return null;
  }
  return url;
}

export function isPostgresConfigured(): boolean {
  return Boolean(getDatabaseUrl());
}

export function getPostgresClient() {
  const url = getDatabaseUrl();
  if (!url) return null;
  return neon(url);
}

let schemaInitialized = false;

export async function ensurePostgresSchema(): Promise<void> {
  if (schemaInitialized) return;
  const sql = getPostgresClient();
  if (!sql) return;

  try {
    // 1. Students Table
    await sql`
      CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        display_name TEXT NOT NULL,
        avatar_url TEXT,
        role TEXT NOT NULL DEFAULT 'student',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;

    // 2. Student Profiles
    await sql`
      CREATE TABLE IF NOT EXISTS student_profiles (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL UNIQUE REFERENCES students(id) ON DELETE CASCADE,
        total_xp INTEGER NOT NULL DEFAULT 0,
        current_level INTEGER NOT NULL DEFAULT 1,
        current_streak INTEGER NOT NULL DEFAULT 0,
        longest_streak INTEGER NOT NULL DEFAULT 0,
        last_activity_date TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;

    // 3. Quiz Completions
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_completions (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        session_token TEXT NOT NULL,
        quiz_id TEXT NOT NULL,
        category TEXT NOT NULL,
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        score_percentage NUMERIC(5,2) NOT NULL,
        base_xp INTEGER NOT NULL DEFAULT 50,
        high_score_bonus INTEGER NOT NULL DEFAULT 0,
        perfect_score_bonus INTEGER NOT NULL DEFAULT 0,
        xp_earned INTEGER NOT NULL,
        completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT uq_student_quiz_session UNIQUE(student_id, session_token)
      );
    `;

    // 4. Module Completions
    await sql`
      CREATE TABLE IF NOT EXISTS module_completions (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        session_token TEXT NOT NULL,
        module_id TEXT NOT NULL,
        xp_earned INTEGER NOT NULL DEFAULT 30,
        completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT uq_student_module UNIQUE(student_id, module_id)
      );
    `;

    // 5. Student Badges
    await sql`
      CREATE TABLE IF NOT EXISTS student_badges (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        badge_id TEXT NOT NULL,
        unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT uq_student_badge UNIQUE(student_id, badge_id)
      );
    `;

    // 6. Student Activities
    await sql`
      CREATE TABLE IF NOT EXISTS student_activities (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        activity_type TEXT NOT NULL,
        title TEXT NOT NULL,
        xp_earned INTEGER NOT NULL DEFAULT 0,
        details JSONB,
        timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;

    // 7. Password Reset Tokens
    await sql`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        token TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        expires_at BIGINT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;

    // Indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_student_profiles_student_id ON student_profiles(student_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_quiz_completions_student_id ON quiz_completions(student_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_module_completions_student_id ON module_completions(student_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_student_badges_student_id ON student_badges(student_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_student_activities_student_id_timestamp ON student_activities(student_id, timestamp DESC);`;

    schemaInitialized = true;
  } catch (err) {
    console.warn('Postgres schema auto-initialization error:', err);
  }
}
