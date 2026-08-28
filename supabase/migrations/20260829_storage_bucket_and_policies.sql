-- ==============================================================================
-- KIHO CAMERA - SUPABASE STORAGE BUCKET & RLS POLICIES
-- Migration: 20260829_storage_bucket_and_policies.sql
-- ==============================================================================

-- 1. Ensure the 'equipment-images' bucket exists, is public, has 10MB limit and allows images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'equipment-images',
  'equipment-images',
  true,
  10485760, -- 10MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- 2. Storage RLS Policies on storage.objects

-- Allow public read access to equipment-images bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public Access Equipment Images'
  ) THEN
    CREATE POLICY "Public Access Equipment Images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'equipment-images');
  END IF;
END $$;

-- Allow authenticated admin users to insert objects into equipment-images bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated Admin Insert Equipment Images'
  ) THEN
    CREATE POLICY "Authenticated Admin Insert Equipment Images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'equipment-images');
  END IF;
END $$;

-- Allow authenticated admin users to update objects in equipment-images bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated Admin Update Equipment Images'
  ) THEN
    CREATE POLICY "Authenticated Admin Update Equipment Images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'equipment-images')
    WITH CHECK (bucket_id = 'equipment-images');
  END IF;
END $$;

-- Allow authenticated admin users to delete objects in equipment-images bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated Admin Delete Equipment Images'
  ) THEN
    CREATE POLICY "Authenticated Admin Delete Equipment Images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'equipment-images');
  END IF;
END $$;
