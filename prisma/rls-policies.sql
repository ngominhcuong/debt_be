-- =============================================================================
-- Supabase Row Level Security (RLS) Policies
-- Run this SQL in: Supabase Dashboard → SQL Editor → New Query
-- =============================================================================

-- ============================================================
-- 1. HELPER FUNCTION (avoids RLS recursion when querying role)
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role::text FROM public.user_profiles WHERE id = auth.uid();
$$;

-- ============================================================
-- 2. user_profiles TABLE
-- ============================================================
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON public.user_profiles;
DROP POLICY IF EXISTS "profiles_select_chief" ON public.user_profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.user_profiles;
DROP POLICY IF EXISTS "profiles_update_chief" ON public.user_profiles;

-- Allow the backend (service_role) to do anything — implicit, no policy needed.
-- Anonymous / authenticated:

-- Users can read their own profile
CREATE POLICY "profiles_select_own"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Chief accountants can read ALL profiles
CREATE POLICY "profiles_select_chief"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (public.get_my_role() = 'CHIEF_ACCOUNTANT');

-- Users can update their own profile (except role — the app backend controls that)
CREATE POLICY "profiles_update_own"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid()
    -- Prevent users from upgrading their own role
    AND role = (SELECT role FROM public.user_profiles WHERE id = auth.uid())
  );

-- Chief accountants can update any profile (e.g., assign roles)
CREATE POLICY "profiles_update_chief"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (public.get_my_role() = 'CHIEF_ACCOUNTANT');

-- ============================================================
-- 3. auth_audit_logs TABLE
-- ============================================================
ALTER TABLE public.auth_audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "audit_select_own" ON public.auth_audit_logs;
DROP POLICY IF EXISTS "audit_select_chief" ON public.auth_audit_logs;

-- Users can view their own audit logs
CREATE POLICY "audit_select_own"
  ON public.auth_audit_logs
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Chief accountants can view all audit logs
CREATE POLICY "audit_select_chief"
  ON public.auth_audit_logs
  FOR SELECT
  TO authenticated
  USING (public.get_my_role() = 'CHIEF_ACCOUNTANT');

-- Only the service_role backend can INSERT / UPDATE / DELETE audit logs
-- (No explicit policies needed — service_role bypasses RLS)

-- ============================================================
-- 4. VERIFY (optional, run after applying policies)
-- ============================================================
-- ============================================================
-- 5. MASTER CATALOG TABLES (backend-only access via service_role)
-- ============================================================
-- These tables are managed by backend APIs using service_role.
-- We enable RLS and intentionally do not add authenticated policies here.
-- Result: direct client-side PostgREST access is blocked by default.
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.debt_reminder_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.debt_reminder_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 6. VERIFY (optional, run after applying policies)
-- ============================================================
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies
-- WHERE tablename IN ('user_profiles', 'auth_audit_logs')
-- ORDER BY tablename, policyname;
