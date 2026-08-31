-- ==============================================================================
-- KIHO CAMERA - MIGRATION: ADD STOREFRONT_IMAGES TABLE & POLICIES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.storefront_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_cover BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_storefront_images_active_sort
    ON public.storefront_images (is_active, sort_order ASC, created_at DESC);

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS tr_storefront_images_updated_at ON public.storefront_images;
CREATE TRIGGER tr_storefront_images_updated_at
    BEFORE UPDATE ON public.storefront_images
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- Enable RLS
ALTER TABLE public.storefront_images ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public SELECT only active images
DROP POLICY IF EXISTS "Public can view active storefront images" ON public.storefront_images;
CREATE POLICY "Public can view active storefront images"
    ON public.storefront_images
    FOR SELECT
    USING (is_active = true);

-- Policy 2: Authenticated/Service Role can CRUD
DROP POLICY IF EXISTS "Authenticated admin full access to storefront images" ON public.storefront_images;
CREATE POLICY "Authenticated admin full access to storefront images"
    ON public.storefront_images
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
