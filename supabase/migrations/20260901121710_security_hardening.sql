-- KIHO CAMERA - SECURITY HARDENING
--
-- This migration is intentionally repository-only. Apply it to a local/staging
-- database first, then to production only after an admin app_metadata role has
-- been assigned. It never changes catalog data.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = pg_catalog, public
AS $$
  SELECT COALESCE((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
  NEW.updated_at = pg_catalog.now();
  RETURN NEW;
END;
$$;

-- Remove legacy policies. Several older policies granted access to every
-- authenticated user; one storefront policy accidentally granted it to public.
DROP POLICY IF EXISTS "Public can view active categories" ON public.categories;
DROP POLICY IF EXISTS "Admin full access on categories" ON public.categories;
DROP POLICY IF EXISTS "Public can view active equipment" ON public.equipment;
DROP POLICY IF EXISTS "Admin full access on equipment" ON public.equipment;
DROP POLICY IF EXISTS "Public can view equipment images" ON public.equipment_images;
DROP POLICY IF EXISTS "Admin full access on equipment_images" ON public.equipment_images;
DROP POLICY IF EXISTS "Public can view active sample images" ON public.equipment_sample_images;
DROP POLICY IF EXISTS "Admin full access on equipment_sample_images" ON public.equipment_sample_images;
DROP POLICY IF EXISTS "Public can view active feedback" ON public.feedback;
DROP POLICY IF EXISTS "Admin full access on feedback" ON public.feedback;
DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin full access on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Authenticated admins manage integration settings" ON public.integration_settings;
DROP POLICY IF EXISTS "Authenticated admins read rental requests" ON public.rental_requests;
DROP POLICY IF EXISTS "Authenticated admins update rental requests" ON public.rental_requests;
DROP POLICY IF EXISTS "Public can view active storefront images" ON public.storefront_images;
DROP POLICY IF EXISTS "Authenticated admin full access to storefront images" ON public.storefront_images;
DROP POLICY IF EXISTS "Admin full access storefront images" ON public.storefront_images;

-- Also drop the hardened names so this file remains safe to re-run in a
-- local/staging database or after a partially applied deployment.
DROP POLICY IF EXISTS "Public read active categories" ON public.categories;
DROP POLICY IF EXISTS "Admins manage categories" ON public.categories;
DROP POLICY IF EXISTS "Public read active equipment" ON public.equipment;
DROP POLICY IF EXISTS "Admins manage equipment" ON public.equipment;
DROP POLICY IF EXISTS "Public read visible equipment images" ON public.equipment_images;
DROP POLICY IF EXISTS "Admins manage equipment images" ON public.equipment_images;
DROP POLICY IF EXISTS "Public read active sample images" ON public.equipment_sample_images;
DROP POLICY IF EXISTS "Admins manage equipment sample images" ON public.equipment_sample_images;
DROP POLICY IF EXISTS "Public read active feedback" ON public.feedback;
DROP POLICY IF EXISTS "Admins manage feedback" ON public.feedback;
DROP POLICY IF EXISTS "Public read site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins manage site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins manage integration settings" ON public.integration_settings;
DROP POLICY IF EXISTS "Admins read rental requests" ON public.rental_requests;
DROP POLICY IF EXISTS "Admins update rental requests" ON public.rental_requests;
DROP POLICY IF EXISTS "Public read active storefront images" ON public.storefront_images;
DROP POLICY IF EXISTS "Admins manage storefront images" ON public.storefront_images;

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_sample_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integration_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_request_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.storefront_images ENABLE ROW LEVEL SECURITY;

-- Public reads expose only active catalog/content. Administrators can inspect
-- inactive rows while authenticated with app_metadata.role = 'admin'.
CREATE POLICY "Public read active categories"
ON public.categories FOR SELECT TO anon, authenticated
USING (is_active = true OR (select public.is_admin()));

CREATE POLICY "Public read active equipment"
ON public.equipment FOR SELECT TO anon, authenticated
USING (is_active = true OR (select public.is_admin()));

CREATE POLICY "Public read visible equipment images"
ON public.equipment_images FOR SELECT TO anon, authenticated
USING (
  (select public.is_admin()) OR EXISTS (
    SELECT 1 FROM public.equipment e
    WHERE e.id = equipment_images.equipment_id AND e.is_active = true
  )
);

CREATE POLICY "Public read active sample images"
ON public.equipment_sample_images FOR SELECT TO anon, authenticated
USING (
  (select public.is_admin()) OR (
    is_active = true AND EXISTS (
      SELECT 1 FROM public.equipment e
      WHERE e.id = equipment_sample_images.equipment_id AND e.is_active = true
    )
  )
);

CREATE POLICY "Public read active feedback"
ON public.feedback FOR SELECT TO anon, authenticated
USING (is_active = true OR (select public.is_admin()));

CREATE POLICY "Public read site settings"
ON public.site_settings FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Public read active storefront images"
ON public.storefront_images FOR SELECT TO anon, authenticated
USING (is_active = true OR (select public.is_admin()));

-- Admin writes are explicit and role-gated. No user-controlled metadata is
-- consulted, and every UPDATE has a WITH CHECK guard against privilege drift.
CREATE POLICY "Admins manage categories"
ON public.categories FOR ALL TO authenticated
USING ((select public.is_admin()))
WITH CHECK ((select public.is_admin()));

CREATE POLICY "Admins manage equipment"
ON public.equipment FOR ALL TO authenticated
USING ((select public.is_admin()))
WITH CHECK ((select public.is_admin()));

CREATE POLICY "Admins manage equipment images"
ON public.equipment_images FOR ALL TO authenticated
USING ((select public.is_admin()))
WITH CHECK ((select public.is_admin()));

CREATE POLICY "Admins manage equipment sample images"
ON public.equipment_sample_images FOR ALL TO authenticated
USING ((select public.is_admin()))
WITH CHECK ((select public.is_admin()));

CREATE POLICY "Admins manage feedback"
ON public.feedback FOR ALL TO authenticated
USING ((select public.is_admin()))
WITH CHECK ((select public.is_admin()));

CREATE POLICY "Admins manage site settings"
ON public.site_settings FOR ALL TO authenticated
USING ((select public.is_admin()))
WITH CHECK ((select public.is_admin()));

CREATE POLICY "Admins manage integration settings"
ON public.integration_settings FOR ALL TO authenticated
USING ((select public.is_admin()))
WITH CHECK ((select public.is_admin()));

CREATE POLICY "Admins read rental requests"
ON public.rental_requests FOR SELECT TO authenticated
USING ((select public.is_admin()));

CREATE POLICY "Admins update rental requests"
ON public.rental_requests FOR UPDATE TO authenticated
USING ((select public.is_admin()))
WITH CHECK ((select public.is_admin()));

CREATE POLICY "Admins manage storefront images"
ON public.storefront_images FOR ALL TO authenticated
USING ((select public.is_admin()))
WITH CHECK ((select public.is_admin()));

-- The rate-limit table is deliberately deny-all to client roles. The
-- SECURITY DEFINER RPC remains the only access path for the application.
REVOKE ALL ON TABLE public.rental_request_rate_limits FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.check_rental_request_rate_limit(
  p_fingerprint TEXT,
  p_limit INTEGER DEFAULT 5,
  p_window_seconds INTEGER DEFAULT 600
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
  v_now TIMESTAMPTZ := pg_catalog.now();
  v_count INTEGER;
BEGIN
  IF p_fingerprint IS NULL OR p_fingerprint = '' OR p_limit < 1 OR p_window_seconds < 1 THEN
    RETURN false;
  END IF;

  INSERT INTO public.rental_request_rate_limits AS limits
    (fingerprint, window_started_at, request_count)
  VALUES (p_fingerprint, v_now, 1)
  ON CONFLICT (fingerprint) DO UPDATE SET
    window_started_at = CASE
      WHEN limits.window_started_at <= v_now - pg_catalog.make_interval(secs => p_window_seconds)
      THEN v_now ELSE limits.window_started_at END,
    request_count = CASE
      WHEN limits.window_started_at <= v_now - pg_catalog.make_interval(secs => p_window_seconds)
      THEN 1 ELSE limits.request_count + 1 END
  RETURNING request_count INTO v_count;

  RETURN v_count <= p_limit;
END;
$$;

REVOKE ALL ON FUNCTION public.check_rental_request_rate_limit(TEXT, INTEGER, INTEGER)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rental_request_rate_limit(TEXT, INTEGER, INTEGER)
  TO service_role;

-- Storage remains publicly readable because product image URLs are public, but
-- every write now requires the same server-controlled admin role.
DROP POLICY IF EXISTS "Public Access Equipment Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Admin Insert Equipment Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Admin Update Equipment Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Admin Delete Equipment Images" ON storage.objects;
DROP POLICY IF EXISTS "Public read equipment images" ON storage.objects;
DROP POLICY IF EXISTS "Admins insert equipment images" ON storage.objects;
DROP POLICY IF EXISTS "Admins update equipment images" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete equipment images" ON storage.objects;

CREATE POLICY "Public read equipment images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'equipment-images');

CREATE POLICY "Admins insert equipment images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'equipment-images' AND (select public.is_admin()));

CREATE POLICY "Admins update equipment images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'equipment-images' AND (select public.is_admin()))
WITH CHECK (bucket_id = 'equipment-images' AND (select public.is_admin()));

CREATE POLICY "Admins delete equipment images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'equipment-images' AND (select public.is_admin()));
