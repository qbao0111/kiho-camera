-- ==============================================================================
-- KIHO CAMERA - MIGRATION: ADD MAPS_EMBED_URL TO SITE_SETTINGS
-- ==============================================================================

ALTER TABLE public.site_settings
ADD COLUMN IF NOT EXISTS maps_embed_url TEXT DEFAULT '';
