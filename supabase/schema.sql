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
