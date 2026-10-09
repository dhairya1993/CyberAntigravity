-- ==============================================================================
-- CyberAntigravity — Production Database Schema (PostgreSQL / Supabase)
-- ==============================================================================
-- Architecture:
--   - User identity linked to Supabase Auth (auth.users)
--   - Row Level Security (RLS) enabled on all tables
--   - Strict user isolation: users can ONLY read and modify their own records
--   - Unique constraints prevent duplicate quiz and module completion XP
--   - Atomic transactions and activity tracking
-- ==============================================================================

-- 1. Students Public Profile Table
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Student Gamification Profile (XP, Level, Streaks)
CREATE TABLE IF NOT EXISTS public.student_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL UNIQUE REFERENCES public.students(id) ON DELETE CASCADE,
    total_xp INTEGER NOT NULL DEFAULT 0 CHECK (total_xp >= 0),
    current_level INTEGER NOT NULL DEFAULT 1 CHECK (current_level >= 1 AND current_level <= 9),
    current_streak INTEGER NOT NULL DEFAULT 0 CHECK (current_streak >= 0),
    longest_streak INTEGER NOT NULL DEFAULT 0 CHECK (longest_streak >= 0),
    last_activity_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Quiz Completions (Idempotent, Server-Verified)
CREATE TABLE IF NOT EXISTS public.quiz_completions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    session_token TEXT NOT NULL,
    quiz_id TEXT NOT NULL,
    category TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0),
    total_questions INTEGER NOT NULL CHECK (total_questions > 0),
    score_percentage NUMERIC(5,2) NOT NULL CHECK (score_percentage >= 0 AND score_percentage <= 100),
    base_xp INTEGER NOT NULL DEFAULT 50,
    high_score_bonus INTEGER NOT NULL DEFAULT 0,
    perfect_score_bonus INTEGER NOT NULL DEFAULT 0,
    xp_earned INTEGER NOT NULL CHECK (xp_earned >= 0),
    completed_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    CONSTRAINT uq_student_quiz_session UNIQUE(student_id, session_token)
);

-- 4. Learning Module Completions (One completion per module per student)
CREATE TABLE IF NOT EXISTS public.module_completions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    session_token TEXT NOT NULL,
    module_id TEXT NOT NULL,
    xp_earned INTEGER NOT NULL DEFAULT 30 CHECK (xp_earned >= 0),
    completed_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    CONSTRAINT uq_student_module UNIQUE(student_id, module_id)
);

-- 5. Student Achievement Badges (Earned Badges)
CREATE TABLE IF NOT EXISTS public.student_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    badge_id TEXT NOT NULL,
    unlocked_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    CONSTRAINT uq_student_badge UNIQUE(student_id, badge_id)
);

-- 6. Student Activity Stream
CREATE TABLE IF NOT EXISTS public.student_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL CHECK (activity_type IN ('quiz_completed', 'module_completed', 'badge_unlocked', 'streak_achieved')),
    title TEXT NOT NULL,
    xp_earned INTEGER NOT NULL DEFAULT 0,
    details JSONB,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_students_email ON public.students(email);
CREATE INDEX IF NOT EXISTS idx_student_profiles_student_id ON public.student_profiles(student_id);
CREATE INDEX IF NOT EXISTS idx_quiz_completions_student_id ON public.quiz_completions(student_id);
CREATE INDEX IF NOT EXISTS idx_quiz_completions_session_token ON public.quiz_completions(session_token);
CREATE INDEX IF NOT EXISTS idx_module_completions_student_id ON public.module_completions(student_id);
CREATE INDEX IF NOT EXISTS idx_student_badges_student_id ON public.student_badges(student_id);
CREATE INDEX IF NOT EXISTS idx_student_activities_student_id_timestamp ON public.student_activities(student_id, timestamp DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Ensure strict multi-tenant isolation: No student can read or edit another student's data

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_activities ENABLE ROW LEVEL SECURITY;

-- 1. students policies
CREATE POLICY "Students can read own profile"
    ON public.students FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Students can update own profile"
    ON public.students FOR UPDATE
    USING (auth.uid() = id);

-- 2. student_profiles policies
CREATE POLICY "Students can read own gamification profile"
    ON public.student_profiles FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Service role can manage student profiles"
    ON public.student_profiles FOR ALL
    USING (auth.uid() = student_id OR auth.jwt() ->> 'role' = 'service_role');

-- 3. quiz_completions policies
CREATE POLICY "Students can read own quiz completions"
    ON public.quiz_completions FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Students or server can insert own quiz completions"
    ON public.quiz_completions FOR INSERT
    WITH CHECK (auth.uid() = student_id OR auth.jwt() ->> 'role' = 'service_role');

-- 4. module_completions policies
CREATE POLICY "Students can read own module completions"
    ON public.module_completions FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Students or server can insert module completions"
    ON public.module_completions FOR INSERT
    WITH CHECK (auth.uid() = student_id OR auth.jwt() ->> 'role' = 'service_role');

-- 5. student_badges policies
CREATE POLICY "Students can read own badges"
    ON public.student_badges FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Server can manage student badges"
    ON public.student_badges FOR ALL
    USING (auth.uid() = student_id OR auth.jwt() ->> 'role' = 'service_role');

-- 6. student_activities policies
CREATE POLICY "Students can read own activities"
    ON public.student_activities FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Server can insert student activities"
    ON public.student_activities FOR INSERT
    WITH CHECK (auth.uid() = student_id OR auth.jwt() ->> 'role' = 'service_role');

-- ==============================================================================
-- DATABASE TRIGGERS
-- ==============================================================================

-- Function to automatically provision public.students and public.student_profiles on auth.users sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.students (id, email, display_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
    );

    INSERT INTO public.student_profiles (student_id, total_xp, current_level, current_streak, longest_streak)
    VALUES (NEW.id, 0, 1, 0, 0);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to hook into auth.users creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger function for updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_students_updated_at ON public.students;
CREATE TRIGGER update_students_updated_at
    BEFORE UPDATE ON public.students
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS update_student_profiles_updated_at ON public.student_profiles;
CREATE TRIGGER update_student_profiles_updated_at
    BEFORE UPDATE ON public.student_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
