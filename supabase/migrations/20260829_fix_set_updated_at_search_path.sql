-- ==============================================================================
-- KIHO CAMERA - MIGRATION: HARDEN FUNCTION SEARCH_PATH
-- Description: Fix Supabase Security Advisor warning 'function_search_path_mutable'
--              by locking the search_path of public.set_updated_at() to public, pg_temp.
-- Target: Function public.set_updated_at()
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

ALTER FUNCTION public.set_updated_at() SET search_path = public, pg_temp;
