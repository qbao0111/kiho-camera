-- Kiho Camera production persistence and server-side rate limiting.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.integration_settings (
    provider TEXT PRIMARY KEY,
    enabled BOOLEAN NOT NULL DEFAULT false,
    google_sheet_id TEXT NOT NULL DEFAULT '',
    google_sheet_name TEXT NOT NULL DEFAULT 'Rental Requests',
    notification_email TEXT NOT NULL DEFAULT '',
    apps_script_url TEXT NOT NULL DEFAULT '',
    encrypted_webhook_secret TEXT,
    last_tested_at TIMESTAMPTZ,
    last_test_status TEXT NOT NULL DEFAULT 'untested'
        CHECK (last_test_status IN ('success', 'error', 'untested')),
    last_test_error TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.rental_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL CHECK (char_length(customer_name) BETWEEN 2 AND 100),
    phone TEXT NOT NULL,
    equipment_id UUID REFERENCES public.equipment(id) ON DELETE SET NULL,
    equipment_name TEXT NOT NULL,
    equipment_brand TEXT,
    rental_date DATE NOT NULL,
    return_date DATE NOT NULL CHECK (return_date >= rental_date),
    note TEXT CHECK (note IS NULL OR char_length(note) <= 500),
    source TEXT NOT NULL DEFAULT 'website',
    status TEXT NOT NULL DEFAULT 'new'
        CHECK (status IN ('new', 'contacted', 'confirmed', 'cancelled', 'closed')),
    integration_status TEXT NOT NULL DEFAULT 'pending'
        CHECK (integration_status IN ('pending', 'sent', 'failed', 'disabled')),
    integration_error TEXT,
    integration_sent_at TIMESTAMPTZ,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rental_requests_submitted_at
    ON public.rental_requests (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_rental_requests_status
    ON public.rental_requests (status);
CREATE INDEX IF NOT EXISTS idx_rental_requests_equipment
    ON public.rental_requests (equipment_id);

CREATE TABLE IF NOT EXISTS public.rental_request_rate_limits (
    fingerprint TEXT PRIMARY KEY,
    window_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    request_count INTEGER NOT NULL DEFAULT 1 CHECK (request_count > 0)
);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS integration_settings_set_updated_at
    ON public.integration_settings;
CREATE TRIGGER integration_settings_set_updated_at
BEFORE UPDATE ON public.integration_settings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS rental_requests_set_updated_at
    ON public.rental_requests;
CREATE TRIGGER rental_requests_set_updated_at
BEFORE UPDATE ON public.rental_requests
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.integration_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_request_rate_limits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated admins manage integration settings"
    ON public.integration_settings;
CREATE POLICY "Authenticated admins manage integration settings"
ON public.integration_settings FOR ALL TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated admins read rental requests"
    ON public.rental_requests;
CREATE POLICY "Authenticated admins read rental requests"
ON public.rental_requests FOR SELECT TO authenticated
USING (true);

DROP POLICY IF EXISTS "Authenticated admins update rental requests"
    ON public.rental_requests;
CREATE POLICY "Authenticated admins update rental requests"
ON public.rental_requests FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.check_rental_request_rate_limit(
    p_fingerprint TEXT,
    p_limit INTEGER DEFAULT 5,
    p_window_seconds INTEGER DEFAULT 600
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_now TIMESTAMPTZ := NOW();
    v_count INTEGER;
BEGIN
    IF p_fingerprint IS NULL OR p_fingerprint = '' OR p_limit < 1 OR p_window_seconds < 1 THEN
        RETURN false;
    END IF;

    INSERT INTO public.rental_request_rate_limits AS limits (
        fingerprint,
        window_started_at,
        request_count
    ) VALUES (
        p_fingerprint,
        v_now,
        1
    )
    ON CONFLICT (fingerprint) DO UPDATE SET
        window_started_at = CASE
            WHEN limits.window_started_at <= v_now - make_interval(secs => p_window_seconds)
            THEN v_now
            ELSE limits.window_started_at
        END,
        request_count = CASE
            WHEN limits.window_started_at <= v_now - make_interval(secs => p_window_seconds)
            THEN 1
            ELSE limits.request_count + 1
        END
    RETURNING request_count INTO v_count;

    RETURN v_count <= p_limit;
END;
$$;

REVOKE ALL ON FUNCTION public.check_rental_request_rate_limit(TEXT, INTEGER, INTEGER)
    FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rental_request_rate_limit(TEXT, INTEGER, INTEGER)
    TO service_role;
