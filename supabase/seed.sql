-- ==============================================================================
-- KIHO CAMERA - SEED DEMO DATA (12 CANONICAL CAMERAS)
-- Cho thuê máy ảnh Quảng Bình
-- ==============================================================================

-- 1. Insert Category: Máy ảnh
INSERT INTO public.categories (id, name, slug, description, icon, sort_order, is_active)
VALUES 
('c1111111-1111-1111-1111-111111111111', 'Máy ảnh', 'may-anh', '12 dòng máy ảnh du lịch, mirrorless chụp ảnh & quay phim tuyển chọn', 'Camera', 1, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

-- 2. Insert Equipment (12 Cameras)
INSERT INTO public.equipment (
    id, category_id, brand, name, slug, short_description, description, 
    price_session, price_per_day, price_three_days, price_poster_url,
    deposit_note, specifications, included_items, use_cases, badges, is_featured, is_active, sort_order,
    seo_title, seo_description
) VALUES
(
    'e0000000-0000-0000-0000-000000000001',
    'c1111111-1111-1111-1111-111111111111',
    'Fujifilm',
    'FUJIFILM X100VI',
    'fujifilm-x100vi',
    'Flagship cao cấp cảm biến 40.2MP, chống rung IBIS 6.0 stops, 20 bộ lọc màu film hoài niệm độc quyền.',
    'Fujifilm X100VI là siêu phẩm máy ảnh du lịch được săn đón nhất thế giới hiện nay. Thân máy rangefinder kim loại cổ điển với cảm biến X-Trans CMOS 5 HR 40.2MP kết hợp hệ thống chống rung 5 trục trong thân máy, cho ra những khung hình đậm chất điện ảnh tại Phong Nha và bờ biển Quảng Bình.',
    350000, 450000, 420000,
    '/images/price-posters/fujifilm-x100vi.webp',
    'CCCD gắn chip chính chủ hoặc đặt cọc linh hoạt.',
    '{"cam_bien": "40.2MP X-Trans CMOS 5 HR", "bo_xu_ly": "X-Processor 5", "chong_rung": "IBIS 5 trục 6.0 stops", "ong_kinh": "Fujinon 23mm f/2 II", "gia_lap_film": "20 chế độ Film Simulation", "quay_video": "6.2K 30p, 4K 60p", "trong_luong": "521g"}'::jsonb,
    ARRAY['Thân máy Fujifilm X100VI', 'Ống kính Fujinon 23mm f/2 II', '2 Pin dung lượng cao', 'Dock sạc đôi nhanh', 'Thẻ nhớ 128GB', 'Túi máy ảnh chống sốc', 'Đầu đọc thẻ OTG'],
    ARRAY['Du lịch', 'Chân dung', 'Màu film', 'Streetlife', 'Couple'],
    ARRAY['Siêu phẩm 2026', 'Màu film 40MP', 'Chống rung IBIS'],
    true, true, 1,
    'Thuê máy ảnh Fujifilm X100VI tại Quảng Bình | Kiho Camera',
    'Dịch vụ cho thuê Fujifilm X100VI chính hãng tại Đồng Hới, Quảng Bình. Cảm biến 40.2MP, chống rung IBIS, 20 giả lập film.'
),
(
    'e0000000-0000-0000-0000-000000000007',
    'c1111111-1111-1111-1111-111111111111',
    'Canon',
    'CANON R50',
    'canon-eos-r50',
    'Máy ảnh mirrorless thế hệ mới nhỏ gọn 375g, cảm biến 24.2MP, lấy nét mắt Dual Pixel AF II, quay 4K 30p sắc nét.',
    'Canon EOS R50 là chiếc máy ảnh được Kiho Camera khuyên dùng hàng đầu cho người mới bắt đầu. Thân máy siêu nhẹ 375g, thao tác cảm ứng trực quan như smartphone, lấy nét nhận diện mắt siêu nhanh và màu da hồng hào tuyệt đẹp.',
    150000, 250000, 230000,
    '/images/price-posters/canon-eos-r50.webp',
    'CCCD gắn chip chính chủ hoặc cọc linh hoạt.',
    '{"cam_bien": "APS-C CMOS 24.2 Megapixel", "bo_xu_ly": "DIGIC X", "lay_net": "Dual Pixel CMOS AF II", "man_hinh": "Cảm ứng xoay lật đa góc 3.0 inch", "quay_video": "4K 30p không crop", "trong_luong": "375g siêu nhẹ"}'::jsonb,
    ARRAY['Thân máy Canon EOS R50', 'Lens Canon RF-S 18-45mm STM', '2 Pin Canon LP-E17', 'Dock sạc đôi nhanh', 'Thẻ nhớ SanDisk Extreme 64GB', 'Túi máy ảnh chống sốc', 'Đầu đọc thẻ OTG'],
    ARRAY['Du lịch', 'Chân dung', 'Vlog', 'Selfie', 'Couple', 'Kỷ yếu'],
    ARRAY['TOP PICK 2026', 'Lấy nét Dual Pixel II', 'Màu da đẹp', '375g'],
    true, true, 7,
    'Thuê máy ảnh Canon EOS R50 tại Quảng Bình - Giá tốt nhất | Kiho Camera',
    'Dịch vụ cho thuê máy ảnh Canon EOS R50 kèm lens tại Đồng Hới, Quảng Bình. Cảm biến 24.2MP, quay 4K 30p, bắt nét mắt siêu nhanh.'
)
ON CONFLICT (slug) DO UPDATE SET 
  brand = EXCLUDED.brand,
  price_session = EXCLUDED.price_session,
  price_per_day = EXCLUDED.price_per_day,
  price_three_days = EXCLUDED.price_three_days,
  price_poster_url = EXCLUDED.price_poster_url;
