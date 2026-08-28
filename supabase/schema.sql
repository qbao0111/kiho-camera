-- ==============================================================================
-- KIHO CAMERA - SUPABASE DATABASE SCHEMA
-- Cho thuê máy ảnh Quảng Bình
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100) DEFAULT 'Camera',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Equipment Table (12 Camera Models)
CREATE TABLE IF NOT EXISTS public.equipment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    brand VARCHAR(100) NOT NULL DEFAULT 'Canon',
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    short_description TEXT,
    description TEXT,
    price_session NUMERIC(12, 0) NOT NULL DEFAULT 0,
    price_per_day NUMERIC(12, 0) NOT NULL DEFAULT 0,
    price_three_days NUMERIC(12, 0) NOT NULL DEFAULT 0,
    price_poster_url TEXT,
    deposit_note TEXT,
    specifications JSONB DEFAULT '{}'::jsonb,
    included_items TEXT[] DEFAULT '{}',
    use_cases TEXT[] DEFAULT '{}',
    badges TEXT[] DEFAULT '{}',
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Equipment Images Table (Product Gallery)
CREATE TABLE IF NOT EXISTS public.equipment_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    equipment_id UUID NOT NULL REFERENCES public.equipment(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_cover BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Equipment Sample Images Table (Ảnh chụp thực tế từ máy)
CREATE TABLE IF NOT EXISTS public.equipment_sample_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    equipment_id UUID NOT NULL REFERENCES public.equipment(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    alt_text VARCHAR(255),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create Feedback Table (Legacy preserved)
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    equipment_id UUID REFERENCES public.equipment(id) ON DELETE SET NULL,
    feedback_date DATE DEFAULT CURRENT_DATE,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Create Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id INT PRIMARY KEY DEFAULT 1,
    shop_name VARCHAR(255) DEFAULT 'Kiho Camera',
    tagline VARCHAR(255) DEFAULT 'Cho thuê máy ảnh Quảng Bình – Máy xịn, giá rõ ràng, thuê nhanh tại Đồng Hới.',
    address VARCHAR(255) DEFAULT '48 Ngô Quyền, TP. Đồng Hới, Tỉnh Quảng Bình',
    phone VARCHAR(50) DEFAULT '0387 274 669',
    facebook_url VARCHAR(500) DEFAULT 'https://facebook.com/kihocameradonghoi',
    messenger_url VARCHAR(500) DEFAULT 'https://m.me/kihocameradonghoi',
    tiktok_url VARCHAR(500) DEFAULT 'https://tiktok.com/@kihocamera',
    instagram_url VARCHAR(500) DEFAULT 'https://www.instagram.com/thuemayanhqbb/',
    maps_url TEXT DEFAULT 'https://maps.google.com/?q=48+Ngo+Quyen+Dong+Hoi+Quang+Binh',
    opening_hours VARCHAR(255) DEFAULT '07:30 - 21:00 (Tất cả các ngày trong tuần)',
    hero_title VARCHAR(255) DEFAULT 'Cho thuê máy ảnh tại Quảng Bình',
    hero_subtitle TEXT DEFAULT 'Máy đẹp, dễ sử dụng, giá rõ ràng. Thuê máy ảnh du lịch chất lượng cao tại Kiho Camera Đồng Hới.',
    hero_image TEXT DEFAULT '/images/cameras/fujifilm-x100vi.jpg',
    about_text TEXT DEFAULT 'Kiho Camera là địa chỉ cho thuê máy ảnh uy tín hàng đầu tại 48 Ngô Quyền, Đồng Hới, Quảng Bình.',
    footer_text TEXT DEFAULT '© 2026 Kiho Camera - Dịch vụ cho thuê máy ảnh uy tín tại Quảng Bình. Hotline/Zalo: 0387 274 669.',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- Insert Default Site Settings if not exists
INSERT INTO public.site_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- 8. Indexes for Performance & SEO
CREATE INDEX IF NOT EXISTS idx_equipment_slug ON public.equipment(slug);
CREATE INDEX IF NOT EXISTS idx_equipment_brand ON public.equipment(brand);
CREATE INDEX IF NOT EXISTS idx_equipment_category ON public.equipment(category_id);
CREATE INDEX IF NOT EXISTS idx_equipment_active ON public.equipment(is_active);
CREATE INDEX IF NOT EXISTS idx_equipment_featured ON public.equipment(is_featured);
CREATE INDEX IF NOT EXISTS idx_equipment_images_equip ON public.equipment_images(equipment_id);
CREATE INDEX IF NOT EXISTS idx_equipment_sample_images_equip ON public.equipment_sample_images(equipment_id);
CREATE INDEX IF NOT EXISTS idx_equipment_sample_images_active ON public.equipment_sample_images(is_active);
CREATE INDEX IF NOT EXISTS idx_feedback_active ON public.feedback(is_active);

-- 9. Row Level Security (RLS) Setup
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_sample_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 9.1. Public Read Policies
CREATE POLICY "Public can view active categories" 
ON public.categories FOR SELECT 
USING (is_active = true);

CREATE POLICY "Public can view active equipment" 
ON public.equipment FOR SELECT 
USING (is_active = true);

CREATE POLICY "Public can view equipment images" 
ON public.equipment_images FOR SELECT 
USING (true);

CREATE POLICY "Public can view active sample images" 
ON public.equipment_sample_images FOR SELECT 
USING (is_active = true);

CREATE POLICY "Public can view active feedback" 
ON public.feedback FOR SELECT 
USING (is_active = true);

CREATE POLICY "Public can view site settings" 
ON public.site_settings FOR SELECT 
USING (true);

-- 9.2. Authenticated Admin Policies (Full CRUD)
CREATE POLICY "Admin full access on categories" 
ON public.categories FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access on equipment" 
ON public.equipment FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access on equipment_images" 
ON public.equipment_images FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access on equipment_sample_images" 
ON public.equipment_sample_images FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access on feedback" 
ON public.feedback FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access on site_settings" 
ON public.site_settings FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

-- 10. Private integration configuration and rental leads
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
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER integration_settings_set_updated_at
BEFORE UPDATE ON public.integration_settings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER rental_requests_set_updated_at
BEFORE UPDATE ON public.rental_requests
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.integration_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_request_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated admins manage integration settings"
ON public.integration_settings FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated admins read rental requests"
ON public.rental_requests FOR SELECT TO authenticated USING (true);

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

    INSERT INTO public.rental_request_rate_limits AS limits
        (fingerprint, window_started_at, request_count)
    VALUES (p_fingerprint, v_now, 1)
    ON CONFLICT (fingerprint) DO UPDATE SET
        window_started_at = CASE
            WHEN limits.window_started_at <= v_now - make_interval(secs => p_window_seconds)
            THEN v_now ELSE limits.window_started_at END,
        request_count = CASE
            WHEN limits.window_started_at <= v_now - make_interval(secs => p_window_seconds)
            THEN 1 ELSE limits.request_count + 1 END
    RETURNING request_count INTO v_count;

    RETURN v_count <= p_limit;
END;
$$;

REVOKE ALL ON FUNCTION public.check_rental_request_rate_limit(TEXT, INTEGER, INTEGER)
    FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rental_request_rate_limit(TEXT, INTEGER, INTEGER)
    TO service_role;

-- 11. Storage Bucket & RLS Policies for Equipment and Media Uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'equipment-images',
    'equipment-images',
    true,
    10485760,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public Access Equipment Images'
    ) THEN
        CREATE POLICY "Public Access Equipment Images"
        ON storage.objects FOR SELECT
        USING (bucket_id = 'equipment-images');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated Admin Insert Equipment Images'
    ) THEN
        CREATE POLICY "Authenticated Admin Insert Equipment Images"
        ON storage.objects FOR INSERT
        TO authenticated
        WITH CHECK (bucket_id = 'equipment-images');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated Admin Update Equipment Images'
    ) THEN
        CREATE POLICY "Authenticated Admin Update Equipment Images"
        ON storage.objects FOR UPDATE
        TO authenticated
        USING (bucket_id = 'equipment-images')
        WITH CHECK (bucket_id = 'equipment-images');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated Admin Delete Equipment Images'
    ) THEN
        CREATE POLICY "Authenticated Admin Delete Equipment Images"
        ON storage.objects FOR DELETE
        TO authenticated
        USING (bucket_id = 'equipment-images');
    END IF;
END $$;

