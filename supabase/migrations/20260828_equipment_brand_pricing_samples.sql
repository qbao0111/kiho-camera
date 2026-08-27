-- ==============================================================================
-- KIHO CAMERA - MIGRATION: BRAND, 3-TIER PRICING, PRICE POSTER & SAMPLE IMAGES
-- ==============================================================================

-- 1. Add columns to equipment table
ALTER TABLE public.equipment 
ADD COLUMN IF NOT EXISTS brand VARCHAR(100) DEFAULT 'Canon',
ADD COLUMN IF NOT EXISTS price_session NUMERIC(12, 0) DEFAULT 0,
ADD COLUMN IF NOT EXISTS price_three_days NUMERIC(12, 0) DEFAULT 0,
ADD COLUMN IF NOT EXISTS price_poster_url TEXT;

-- 2. Create Equipment Sample Images Table
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

-- 3. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_equipment_brand ON public.equipment(brand);
CREATE INDEX IF NOT EXISTS idx_equipment_sample_images_equip ON public.equipment_sample_images(equipment_id);
CREATE INDEX IF NOT EXISTS idx_equipment_sample_images_active ON public.equipment_sample_images(is_active);

-- 4. RLS for equipment_sample_images
ALTER TABLE public.equipment_sample_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active sample images" 
ON public.equipment_sample_images FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admin full access on equipment_sample_images" 
ON public.equipment_sample_images FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);
