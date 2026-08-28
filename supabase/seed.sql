-- ==============================================================================
-- KIHO CAMERA - REPRODUCIBLE SEED DATA (12 CANONICAL CAMERAS)
-- Local/fresh database seed only. Production data is managed separately.
-- ==============================================================================

-- One canonical rental category. Relationships below resolve this row by slug,
-- so the seed also works when an existing row has a different UUID.
INSERT INTO public.categories (id, name, slug, description, icon, sort_order, is_active)
VALUES (
  'c1111111-1111-1111-1111-111111111111',
  'Máy ảnh',
  'may-anh',
  '12 dòng máy ảnh du lịch, mirrorless chụp ảnh và quay phim tuyển chọn tại Đồng Hới',
  'Camera',
  1,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

INSERT INTO public.equipment (
  id, category_id, brand, name, slug, short_description, description,
  price_session, price_per_day, price_three_days, price_poster_url,
  deposit_note, specifications, included_items, use_cases, badges,
  is_featured, is_active, sort_order, seo_title, seo_description
)
VALUES
(
  'e0000000-0000-0000-0000-000000000001',
  (SELECT id FROM public.categories WHERE slug = 'may-anh'),
  'Fujifilm', 'FUJIFILM X100VI', 'fujifilm-x100vi',
  'Flagship 40.2MP với chống rung IBIS và màu film đặc trưng của Fujifilm.',
  'Fujifilm X100VI có thiết kế rangefinder nhỏ gọn, cảm biến 40.2MP và chống rung 5 trục, phù hợp chụp du lịch, chân dung và đường phố.',
  350000, 450000, 420000, '/images/price-posters/fujifilm-x100vi.webp',
  'Không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.',
  '{"Cảm biến":"40.2MP X-Trans CMOS 5 HR","Chống rung":"IBIS 5 trục","Ống kính":"Fujinon 23mm f/2 II","Video":"6.2K 30p, 4K 60p"}'::jsonb,
  ARRAY['Thân máy Fujifilm X100VI', 'Ống kính Fujinon 23mm f/2 II', '2 pin', 'Dock sạc đôi', 'Thẻ nhớ 128GB', 'Túi chống sốc', 'Đầu đọc thẻ OTG'],
  ARRAY['Du lịch', 'Chân dung', 'Màu film', 'Streetlife', 'Couple'],
  ARRAY['40.2MP', 'Màu film', 'Chống rung IBIS'],
  true, true, 1,
  'Thuê Fujifilm X100VI tại Quảng Bình',
  'Thuê Fujifilm X100VI tại Đồng Hới, Quảng Bình cho chuyến du lịch, chụp chân dung và ảnh đường phố.'
),
(
  'e0000000-0000-0000-0000-000000000002',
  (SELECT id FROM public.categories WHERE slug = 'may-anh'),
  'Fujifilm', 'FUJIFILM X100V', 'fujifilm-x100v',
  'Máy ảnh đường phố nhỏ gọn với màu film Classic Negative và ống kính 23mm f/2.',
  'Fujifilm X100V mang thiết kế cổ điển, màu film hoài niệm và tiêu cự linh hoạt cho du lịch, check-in và chụp đường phố.',
  250000, 380000, 350000, '/images/price-posters/fujifilm-x100v.webp',
  'Không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.',
  '{"Cảm biến":"26.1MP X-Trans CMOS 4","Ống kính":"Fujinon 23mm f/2","Màn hình":"Cảm ứng lật 2 chiều","Màu film":"17 chế độ Film Simulation"}'::jsonb,
  ARRAY['Thân máy Fujifilm X100V', 'Ống kính Fujinon 23mm f/2', '2 pin', 'Sạc đôi', 'Thẻ nhớ 64GB', 'Túi chống sốc', 'Đầu đọc thẻ OTG'],
  ARRAY['Du lịch', 'Màu film', 'Couple', 'Check-in', 'Streetlife'],
  ARRAY['Classic Negative', 'Thiết kế cổ điển'],
  true, true, 2,
  'Thuê Fujifilm X100V tại Quảng Bình',
  'Thuê Fujifilm X100V tại Đồng Hới, Quảng Bình để chụp du lịch, check-in và ảnh đường phố với màu film đặc trưng.'
),
(
  'e0000000-0000-0000-0000-000000000003',
  (SELECT id FROM public.categories WHERE slug = 'may-anh'),
  'Fujifilm', 'FUJIFILM X-S10', 'fujifilm-xs10',
  'Máy ảnh đa dụng có chống rung IBIS, báng cầm chắc và màn hình xoay lật.',
  'Fujifilm X-S10 cân bằng tốt giữa chụp ảnh và quay vlog, với chống rung trong thân máy và màn hình xoay lật tiện dụng.',
  230000, 350000, 320000, '/images/price-posters/fujifilm-xs10.webp',
  'Không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.',
  '{"Cảm biến":"26.1MP X-Trans CMOS 4","Chống rung":"IBIS 5 trục","Màn hình":"Xoay lật cảm ứng","Video":"4K 30p"}'::jsonb,
  ARRAY['Thân máy Fujifilm X-S10', 'Ống kính zoom Fujinon', '2 pin', 'Sạc đôi', 'Thẻ nhớ 64GB', 'Túi chống sốc', 'Đầu đọc thẻ OTG'],
  ARRAY['Du lịch', 'Vlog', 'Chân dung', 'Màu film'],
  ARRAY['Quay và chụp', 'Chống rung IBIS', 'Màn hình xoay lật'],
  false, true, 3,
  'Thuê Fujifilm X-S10 tại Quảng Bình',
  'Thuê Fujifilm X-S10 tại Đồng Hới, Quảng Bình để chụp du lịch, chân dung hoặc quay vlog ổn định.'
),
(
  'e0000000-0000-0000-0000-000000000004',
  (SELECT id FROM public.categories WHERE slug = 'may-anh'),
  'Canon', 'CANON M100', 'canon-m100',
  'Máy ảnh nhỏ gọn, màn hình lật selfie và màu da Canon tự nhiên.',
  'Canon EOS M100 nhẹ, dễ sử dụng và phù hợp cho người mới cần chụp selfie, check-in hoặc du lịch.',
  100000, 180000, 150000, '/images/price-posters/canon-m100.webp',
  'Không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.',
  '{"Cảm biến":"APS-C CMOS 24.2MP","Lấy nét":"Dual Pixel CMOS AF","Màn hình":"Cảm ứng lật 180 độ","Trọng lượng":"302g"}'::jsonb,
  ARRAY['Thân máy Canon EOS M100', 'Ống kính Canon EF-M 15-45mm', '2 pin', 'Sạc pin', 'Thẻ nhớ 64GB', 'Túi máy ảnh', 'Đầu đọc thẻ OTG'],
  ARRAY['Selfie', 'Du lịch', 'Check-in', 'Máy nhỏ gọn'],
  ARRAY['Nhỏ gọn', 'Màn hình selfie', 'Dễ sử dụng'],
  false, true, 4,
  'Thuê Canon M100 tại Quảng Bình',
  'Thuê Canon M100 tại Đồng Hới, Quảng Bình cho nhu cầu selfie, check-in và chụp ảnh du lịch.'
),
(
  'e0000000-0000-0000-0000-000000000005',
  (SELECT id FROM public.categories WHERE slug = 'may-anh'),
  'Canon', 'CANON EOS RP', 'canon-eos-rp',
  'Máy ảnh full-frame nhỏ nhẹ, phù hợp chụp chân dung và phong cảnh.',
  'Canon EOS RP sở hữu cảm biến full-frame 26.2MP trong thân máy gọn nhẹ, cho khả năng xóa phông và chụp thiếu sáng tốt.',
  170000, 280000, 250000, '/images/price-posters/canon-eos-rp.webp',
  'Không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.',
  '{"Cảm biến":"Full-frame CMOS 26.2MP","Bộ xử lý":"DIGIC 8","Lấy nét":"Dual Pixel AF","Màn hình":"Xoay lật cảm ứng"}'::jsonb,
  ARRAY['Thân máy Canon EOS RP', 'Ống kính Canon RF', '2 pin', 'Sạc pin', 'Thẻ nhớ 64GB', 'Túi chống sốc', 'Đầu đọc thẻ OTG'],
  ARRAY['Chân dung', 'Du lịch', 'Full-frame', 'Xóa phông', 'Couple'],
  ARRAY['Full-frame', 'Xóa phông', 'Nhỏ nhẹ'],
  false, true, 5,
  'Thuê Canon EOS RP tại Quảng Bình',
  'Thuê Canon EOS RP full-frame tại Đồng Hới, Quảng Bình để chụp chân dung, phong cảnh và ảnh du lịch.'
),
(
  'e0000000-0000-0000-0000-000000000006',
  (SELECT id FROM public.categories WHERE slug = 'may-anh'),
  'Canon', 'CANON G7X MARK III', 'canon-g7x-mark-iii',
  'Máy ảnh compact có màn hình lật, ống kính khẩu lớn và khả năng quay vlog.',
  'Canon G7X Mark III là lựa chọn gọn nhẹ cho du lịch, selfie và vlog nhờ ống kính sáng cùng màn hình lật 180 độ.',
  200000, 320000, 300000, '/images/price-posters/canon-g7x-mark-iii.webp',
  'Không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.',
  '{"Cảm biến":"1-inch CMOS 20.1MP","Ống kính":"24-100mm f/1.8-2.8","Màn hình":"Cảm ứng lật 180 độ","Video":"4K 30p"}'::jsonb,
  ARRAY['Thân máy Canon G7X Mark III', '2 pin', 'Sạc pin', 'Thẻ nhớ 64GB', 'Túi chống sốc', 'Đầu đọc thẻ OTG'],
  ARRAY['Du lịch', 'Selfie', 'Vlog', 'Máy nhỏ gọn'],
  ARRAY['Compact', 'Vlog', 'Màn hình selfie'],
  true, true, 6,
  'Thuê Canon G7X Mark III tại Quảng Bình',
  'Thuê Canon G7X Mark III tại Đồng Hới, Quảng Bình để quay vlog, selfie và chụp ảnh du lịch.'
),
(
  'e0000000-0000-0000-0000-000000000007',
  (SELECT id FROM public.categories WHERE slug = 'may-anh'),
  'Canon', 'CANON EOS R50', 'canon-eos-r50',
  'Máy ảnh mirrorless nhỏ gọn với lấy nét Dual Pixel AF II và video 4K.',
  'Canon EOS R50 nhẹ, dễ thao tác và lấy nét nhanh, phù hợp với người mới chụp chân dung, du lịch hoặc quay vlog.',
  150000, 250000, 230000, '/images/price-posters/canon-eos-r50.webp',
  'Không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.',
  '{"Cảm biến":"APS-C CMOS 24.2MP","Bộ xử lý":"DIGIC X","Lấy nét":"Dual Pixel CMOS AF II","Video":"4K 30p"}'::jsonb,
  ARRAY['Thân máy Canon EOS R50', 'Ống kính Canon RF-S 18-45mm', '2 pin', 'Dock sạc đôi', 'Thẻ nhớ 64GB', 'Túi chống sốc', 'Đầu đọc thẻ OTG'],
  ARRAY['Du lịch', 'Chân dung', 'Vlog', 'Selfie', 'Couple', 'Kỷ yếu'],
  ARRAY['Dual Pixel AF II', 'Màu da đẹp', 'Nhỏ nhẹ'],
  true, true, 7,
  'Thuê Canon EOS R50 tại Quảng Bình',
  'Thuê Canon EOS R50 tại Đồng Hới, Quảng Bình để chụp chân dung, du lịch hoặc quay vlog 4K.'
),
(
  'e0000000-0000-0000-0000-000000000008',
  (SELECT id FROM public.categories WHERE slug = 'may-anh'),
  'Canon', 'CANON M3', 'canon-m3',
  'Máy ảnh mirrorless gọn nhẹ, màn hình lật và mức giá dễ tiếp cận.',
  'Canon EOS M3 có cảm biến 24.2MP, màn hình lật và thao tác đơn giản, phù hợp cho du lịch, gia đình và check-in.',
  110000, 180000, 150000, '/images/price-posters/canon-m3.webp',
  'Không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.',
  '{"Cảm biến":"APS-C CMOS 24.2MP","Lấy nét":"Hybrid CMOS AF III","Màn hình":"Cảm ứng lật 180 độ","Trọng lượng":"366g"}'::jsonb,
  ARRAY['Thân máy Canon EOS M3', 'Ống kính zoom EF-M', '2 pin', 'Sạc pin', 'Thẻ nhớ 64GB', 'Túi chống sốc', 'Đầu đọc thẻ OTG'],
  ARRAY['Du lịch', 'Check-in', 'Gia đình'],
  ARRAY['Tiết kiệm', 'Dễ chụp', 'Màn hình lật'],
  false, true, 8,
  'Thuê Canon M3 tại Quảng Bình',
  'Thuê Canon M3 tại Đồng Hới, Quảng Bình cho chuyến du lịch, chụp gia đình và check-in.'
),
(
  'e0000000-0000-0000-0000-000000000009',
  (SELECT id FROM public.categories WHERE slug = 'may-anh'),
  'Sony', 'SONY ZV-1 MARK II', 'sony-zv1-mark-ii',
  'Máy quay vlog compact với góc rộng 18mm, màn hình xoay lật và mic định hướng.',
  'Sony ZV-1 Mark II có góc rộng phù hợp selfie nhóm, khả năng lấy nét nhanh và thiết kế nhỏ nhẹ cho các chuyến đi.',
  130000, 200000, 180000, '/images/price-posters/sony-zv1-mark-ii.webp',
  'Không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.',
  '{"Cảm biến":"1-inch Exmor RS CMOS 20.1MP","Ống kính":"18-50mm f/1.8-4.0","Màn hình":"Xoay lật cảm ứng","Âm thanh":"Micro 3 hướng"}'::jsonb,
  ARRAY['Thân máy Sony ZV-1 Mark II', 'Bông lọc gió', '2 pin', 'Cáp sạc Type-C', 'Thẻ nhớ 64GB', 'Túi chống sốc', 'Đầu đọc thẻ OTG'],
  ARRAY['Vlog', 'Du lịch', 'Selfie', 'TikTok', 'Check-in'],
  ARRAY['Góc rộng 18mm', 'Vlog', 'Nhỏ nhẹ'],
  true, true, 9,
  'Thuê Sony ZV-1 Mark II tại Quảng Bình',
  'Thuê Sony ZV-1 Mark II tại Đồng Hới, Quảng Bình để quay vlog, selfie nhóm và ghi lại chuyến du lịch.'
),
(
  'e0000000-0000-0000-0000-000000000010',
  (SELECT id FROM public.categories WHERE slug = 'may-anh'),
  'Sony', 'SONY ZV-1F', 'sony-zv1f',
  'Máy quay vlog nhỏ nhẹ với ống kính góc rộng 20mm và màn hình xoay lật.',
  'Sony ZV-1F được tối ưu cho video dọc, selfie và vlog nhờ góc rộng 20mm, thao tác đơn giản và thân máy gọn nhẹ.',
  90000, 150000, 130000, '/images/price-posters/sony-zv1f.webp',
  'Không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.',
  '{"Cảm biến":"1-inch CMOS 20.1MP","Ống kính":"20mm f/2.0","Màn hình":"Xoay lật cảm ứng","Trọng lượng":"256g"}'::jsonb,
  ARRAY['Thân máy Sony ZV-1F', 'Bông lọc gió', '2 pin', 'Cáp sạc', 'Thẻ nhớ 64GB', 'Túi máy ảnh', 'Đầu đọc thẻ OTG'],
  ARRAY['TikTok', 'Vlog', 'Selfie', 'Máy nhỏ gọn'],
  ARRAY['Góc rộng 20mm', 'Video dọc', 'Nhỏ nhẹ'],
  false, true, 10,
  'Thuê Sony ZV-1F tại Quảng Bình',
  'Thuê Sony ZV-1F tại Đồng Hới, Quảng Bình để quay TikTok, vlog và selfie trong chuyến du lịch.'
),
(
  'e0000000-0000-0000-0000-000000000011',
  (SELECT id FROM public.categories WHERE slug = 'may-anh'),
  'Canon', 'CANON M', 'canon-m',
  'Máy ảnh mirrorless thân kim loại nhỏ gọn, phù hợp người mới và chuyến đi ngắn.',
  'Canon EOS M mang cảm biến APS-C trong thân máy nhỏ, thao tác đơn giản và chi phí thuê tiết kiệm.',
  90000, 150000, 130000, '/images/price-posters/canon-m.webp',
  'Không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.',
  '{"Cảm biến":"APS-C CMOS 18MP","Lấy nét":"Hybrid CMOS AF","Màn hình":"Cảm ứng 3 inch","Trọng lượng":"298g"}'::jsonb,
  ARRAY['Thân máy Canon EOS M', 'Ống kính pancake EF-M', '2 pin', 'Sạc pin', 'Thẻ nhớ 64GB', 'Túi chống sốc', 'Đầu đọc thẻ OTG'],
  ARRAY['Du lịch', 'Check-in', 'Tiết kiệm'],
  ARRAY['Giá tiết kiệm', 'Thân kim loại', 'Nhỏ gọn'],
  false, true, 11,
  'Thuê Canon M tại Quảng Bình',
  'Thuê Canon EOS M tại Đồng Hới, Quảng Bình cho nhu cầu chụp ảnh du lịch và check-in tiết kiệm.'
),
(
  'e0000000-0000-0000-0000-000000000012',
  (SELECT id FROM public.categories WHERE slug = 'may-anh'),
  'Canon', 'CANON IXY 640', 'canon-ixy-640',
  'Máy ảnh compact phong cách Y2K, có zoom quang và flash tích hợp.',
  'Canon IXY 640 là máy ảnh compact bỏ túi phù hợp chụp check-in, ảnh flash đêm và phong cách Y2K hoài niệm.',
  80000, 120000, 100000, '/images/price-posters/canon-ixy-640.webp',
  'Không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.',
  '{"Cảm biến":"CMOS 20.2MP","Ống kính":"Zoom quang 12x","Đèn flash":"Tích hợp","Trọng lượng":"147g"}'::jsonb,
  ARRAY['Máy ảnh Canon IXY 640', '2 pin', 'Sạc pin', 'Thẻ nhớ SD', 'Bao da mini', 'Dây đeo tay', 'Đầu đọc thẻ OTG'],
  ARRAY['Y2K', 'Check-in', 'Flash đêm', 'Máy nhỏ gọn'],
  ARRAY['Y2K', 'Flash đêm', 'Nhỏ gọn'],
  true, true, 12,
  'Thuê Canon IXY 640 tại Quảng Bình',
  'Thuê Canon IXY 640 tại Đồng Hới, Quảng Bình để chụp ảnh flash đêm, check-in và phong cách Y2K.'
)
ON CONFLICT (slug) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  brand = EXCLUDED.brand,
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  price_session = EXCLUDED.price_session,
  price_per_day = EXCLUDED.price_per_day,
  price_three_days = EXCLUDED.price_three_days,
  price_poster_url = EXCLUDED.price_poster_url,
  deposit_note = EXCLUDED.deposit_note,
  specifications = EXCLUDED.specifications,
  included_items = EXCLUDED.included_items,
  use_cases = EXCLUDED.use_cases,
  badges = EXCLUDED.badges,
  is_featured = EXCLUDED.is_featured,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  updated_at = NOW();

-- One real camera/product cover per model. Price posters remain exclusively in
-- equipment.price_poster_url.
INSERT INTO public.equipment_images (
  id, equipment_id, image_url, alt_text, is_cover, sort_order
)
SELECT image.id::uuid, equipment.id, image.image_url, image.alt_text, true, 1
FROM (VALUES
  ('a0000000-0000-0000-0000-000000000001', 'fujifilm-x100vi', '/images/cameras/fujifilm-x100vi.jpg', 'Fujifilm X100VI'),
  ('a0000000-0000-0000-0000-000000000002', 'fujifilm-x100v', '/images/cameras/fujifilm-x100v.jpg', 'Fujifilm X100V'),
  ('a0000000-0000-0000-0000-000000000003', 'fujifilm-xs10', '/images/cameras/fujifilm-xs10.jpg', 'Fujifilm X-S10'),
  ('a0000000-0000-0000-0000-000000000004', 'canon-m100', '/images/cameras/canon-m100.jpg', 'Canon M100'),
  ('a0000000-0000-0000-0000-000000000005', 'canon-eos-rp', '/images/cameras/canon-rp.jpg', 'Canon EOS RP'),
  ('a0000000-0000-0000-0000-000000000006', 'canon-g7x-mark-iii', '/images/cameras/canon-g7x-mark3.jpg', 'Canon G7X Mark III'),
  ('a0000000-0000-0000-0000-000000000007', 'canon-eos-r50', '/images/cameras/canon-r50.jpg', 'Canon EOS R50'),
  ('a0000000-0000-0000-0000-000000000008', 'canon-m3', '/images/cameras/canon-m3.jpg', 'Canon M3'),
  ('a0000000-0000-0000-0000-000000000009', 'sony-zv1-mark-ii', '/images/cameras/sony-zv1-mark2.jpg', 'Sony ZV-1 Mark II'),
  ('a0000000-0000-0000-0000-000000000010', 'sony-zv1f', '/images/cameras/sony-zv1f.jpg', 'Sony ZV-1F'),
  ('a0000000-0000-0000-0000-000000000011', 'canon-m', '/images/cameras/canon-m.jpg', 'Canon M'),
  ('a0000000-0000-0000-0000-000000000012', 'canon-ixy-640', '/images/cameras/canon-ixy640.jpg', 'Canon IXY 640')
) AS image(id, equipment_slug, image_url, alt_text)
JOIN public.equipment AS equipment ON equipment.slug = image.equipment_slug
ON CONFLICT (id) DO UPDATE SET
  equipment_id = EXCLUDED.equipment_id,
  image_url = EXCLUDED.image_url,
  alt_text = EXCLUDED.alt_text,
  is_cover = EXCLUDED.is_cover,
  sort_order = EXCLUDED.sort_order;

-- Real, model-appropriate sample photos are admin-managed and intentionally not
-- seeded merely to fill the gallery.

-- Ensure the one default settings row on a fresh database without overwriting
-- any values already managed by an administrator.
INSERT INTO public.site_settings (id, shop_name, address, phone, instagram_url)
VALUES (
  1,
  'Kiho Camera',
  '48 Ngô Quyền, TP. Đồng Hới, Tỉnh Quảng Bình',
  '0387 274 669',
  'https://www.instagram.com/thuemayanhqbb/'
)
ON CONFLICT (id) DO NOTHING;
