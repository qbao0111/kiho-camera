-- ==============================================================================
-- KIHO CAMERA - SEED DEMO DATA
-- Cho thuê máy ảnh Quảng Bình
-- ==============================================================================

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description, icon, sort_order, is_active)
VALUES 
('c1111111-1111-1111-1111-111111111111', 'Máy ảnh', 'may-anh', 'Máy ảnh compact du lịch, mirrorless chụp ảnh & quay phim chuyên nghiệp', 'Camera', 1, true),
('c2222222-2222-2222-2222-222222222222', 'Lens / Ống kính', 'lens', 'Ống kính chân dung, góc rộng phong cảnh, tele thể thao cho Sony, Canon, Fujifilm', 'Aperture', 2, true),
('c3333333-3333-3333-3333-333333333333', 'Máy quay & Action Cam', 'may-quay', 'Thiết bị quay vlog du lịch, action cam nhỏ gọn chống nước', 'Video', 3, true),
('c4444444-4444-4444-4444-444444444444', 'Gimbal chống rung', 'gimbal', 'Tay cầm chống rung chuyên nghiệp cho điện thoại, máy ảnh mirrorless', 'Move', 4, true),
('c5555555-5555-5555-5555-555555555555', 'Phụ kiện nhiếp ảnh', 'phu-kien', 'Micro thu âm không dây, đèn flash, đèn led, chân máy tripod, thẻ nhớ tốc độ cao', 'Sliders', 5, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

-- 2. Insert Equipment
INSERT INTO public.equipment (
    id, category_id, name, slug, short_description, description, price_per_day, deposit_note,
    specifications, included_items, use_cases, badges, is_featured, is_active, sort_order,
    seo_title, seo_description
) VALUES
(
    'e1111111-1111-1111-1111-111111111111',
    'c1111111-1111-1111-1111-111111111111',
    'Canon PowerShot G7X Mark III',
    'canon-g7x-mark-iii',
    'Máy ảnh compact du lịch quốc dân với màn hình lật 180 độ, màu da tươi sáng tự nhiên, nhỏ gọn đút túi.',
    'Canon PowerShot G7X Mark III là chiếc máy ảnh được yêu thích hàng đầu cho nhu cầu đi du lịch, quay vlog và chụp selfie. Cảm biến 1-inch 20.1 MP cùng ống kính khẩu độ lớn f/1.8-2.8 cho khả năng chụp thiếu sáng tốt, màu da người (skin tone) hồng hào đặc trưng của Canon mà không cần hậu kỳ phức tạp.',
    300000,
    'CCCD gắn chip chính chủ hoặc tiền cọc theo thoả thuận.',
    '{"cam_bien": "1.0-type stacked CMOS 20.1MP", "ong_kinh": "24-100mm f/1.8-2.8 (Zoom quang 4.2x)", "man_hinh": "Cảm ứng 3.0 inch lật 180 độ", "quay_video": "4K 30p, Full HD 120p không crop", "ket_noi": "Wi-Fi, Bluetooth, Micro-HDMI, USB-C", "trong_luong": "304g (kèm pin và thẻ nhớ)"}'::jsonb,
    ARRAY['Thân máy Canon G7X Mark III', '2 Pin dung lượng cao', 'Sạc pin chính hãng', 'Thẻ nhớ SanDisk Extreme 64GB', 'Bao da / túi chống sốc', 'Dây đeo tay'],
    ARRAY['Du lịch', 'Selfie', 'Vlog', 'Máy nhỏ gọn', 'Concert'],
    ARRAY['Hot', 'Dễ sử dụng', 'Màu da đẹp'],
    true, true, 1,
    'Thuê máy ảnh Canon G7X Mark III Quảng Bình - Giá tốt nhất | Kiho Camera',
    'Cho thuê máy ảnh du lịch Canon G7X Mark III tại Đồng Hới Quảng Bình. Máy compact nhỏ gọn, màn lật selfie, màu da đẹp. Kèm 2 pin + thẻ 64GB.'
),
(
    'e2222222-2222-2222-2222-222222222222',
    'c1111111-1111-1111-1111-111111111111',
    'Fujifilm X-T30 II + Kit 15-45mm',
    'fujifilm-x-t30-ii',
    'Chiếc máy ảnh mang đậm phong cách vintage với bộ giả lập màu film nổi tiếng của Fujifilm.',
    'Fujifilm X-T30 II mang đến trải nghiệm chụp ảnh đậm chất hoài niệm với 18 bộ lọc giả lập màu film trứ danh (Classic Chrome, Classic Neg, Astia...). Máy cực kỳ phù hợp cho các chuyến du lịch trải nghiệm, chụp ảnh nghệ thuật, kỷ yếu tại các điểm check-in nổi tiếng của Quảng Bình.',
    350000,
    'CCCD gắn chip chính chủ hoặc đặt cọc theo quy định của shop.',
    '{"cam_bien": "APS-C X-Trans CMOS 4 26.1MP", "bo_xu_ly": "X-Processor 4", "lay_net": "Lấy nét theo pha 425 điểm, nhận diện mắt/mặt", "quay_video": "4K 30p DCI, Full HD 240p", "trong_luong": "378g (chưa gồm lens)", "gia_lap_film": "18 chế độ Film Simulation"}'::jsonb,
    ARRAY['Body máy ảnh Fujifilm X-T30 II', 'Lens Fujinon XC 15-45mm OIS PZ', '2 Pin & Dock sạc đôi', 'Thẻ nhớ tốc độ cao 64GB', 'Túi máy ảnh thời trang', 'Dây đeo vintage'],
    ARRAY['Du lịch', 'Chụp chân dung', 'Kỷ yếu', 'Máy nhỏ gọn'],
    ARRAY['Màu film retro', 'Chụp nghệ thuật'],
    true, true, 2,
    'Thuê máy ảnh Fujifilm X-T30 II màu film vintage tại Quảng Bình | Kiho Camera',
    'Cho thuê Fujifilm X-T30 II giá rẻ tại Quảng Bình. Giả lập màu film cổ điển không cần chỉnh sửa ảnh, máy nhẹ đẹp thời trang.'
),
(
    'e3333333-3333-3333-3333-333333333333',
    'c1111111-1111-1111-1111-111111111111',
    'Sony Alpha A7 IV (Body)',
    'sony-alpha-a7-iv',
    'Máy ảnh Full-frame hybrid đỉnh cao cho chụp ảnh thương mại, sự kiện và quay phim 4K 10-bit chuyên nghiệp.',
    'Sony A7 IV là sự lựa chọn số 1 cho các thợ chụp sự kiện, kỷ yếu, phóng sự cưới hoặc quay video du lịch chất lượng điện ảnh tại Quảng Bình. Cảm biến 33MP Exmor R cùng hệ thống lấy nét Real-time Eye AF thông minh bắt trọn từng khoảnh khắc.',
    600000,
    'Yêu cầu CCCD gắn chip và giấy tờ tuỳ thân chính chủ.',
    '{"cam_bien": "Full-Frame Exmor R BSI CMOS 33MP", "bo_xu_ly": "BIONZ XR tiên tiến", "chong_rung": "Ổn định hình ảnh 5 trục IBIS 5.5 stops", "quay_video": "4K 60p 10-bit 4:2:2, S-Cinetone", "lay_net": "759 điểm AF theo pha phủ 94% khung hình", "the_nho": "2 khe thẻ CFexpress Type A / SD UHS-II"}'::jsonb,
    ARRAY['Body Sony A7 IV', '2 Pin Sony FZ100 chính hãng', 'Sạc đôi nhanh', 'Thẻ nhớ SDXC V60 128GB', 'Túi đựng chuyên dụng', 'Dây đeo thao tác nhanh Peak Design'],
    ARRAY['Chụp chân dung', 'Kỷ yếu', 'Sự kiện', 'Quay phim'],
    ARRAY['Full-frame', 'Chuyên nghiệp', 'Lấy nét siêu nhanh'],
    true, true, 3,
    'Thuê máy ảnh Full-Frame Sony A7 IV tại Quảng Bình | Kiho Camera',
    'Dịch vụ cho thuê body Sony Alpha A7 IV tại Đồng Hới Quảng Bình. Thiết bị chuyên nghiệp quay 4K 10-bit, chụp 33MP sắc nét.'
),
(
    'e4444444-4444-4444-4444-444444444444',
    'c3333333-3333-3333-3333-333333333333',
    'DJI Osmo Pocket 3 Creator Combo',
    'dji-osmo-pocket-3-creator-combo',
    'Máy quay bỏ túi cảm biến 1-inch, gimbal xoay 3 trục mượt như phim, màn hình xoay 2 inch độc đáo.',
    'DJI Osmo Pocket 3 là "vũ khí bí mật" của mọi nhà sáng tạo nội dung khi đến Quảng Bình. Thỏa sức quay cảnh động Phong Nha, bãi biển Nhật Lệ hay đồi cát Quang Phú mà không lo rung lắc. Bản Creator Combo gồm mic thu âm không dây DJI Mic 2 chống ồn lọc gió cực đỉnh.',
    350000,
    'CCCD hoặc cọc linh hoạt.',
    '{"cam_bien": "CMOS 1-inch quay 4K/120fps", "man_hinh": "OLED cảm ứng 2.0 inch xoay ngang/dọc", "chong_rung": "Gimbal cơ học 3 trục", "theo_doi_chu_the": "ActiveTrack 6.0 thông minh", "am_thanh": "Microphone DJI Mic 2 truyền tín hiệu số", "trong_luong": "179g"}'::jsonb,
    ARRAY['Thân máy DJI Pocket 3', 'Micro không dây DJI Mic 2 + Bông lọc gió', 'Cán pin mở rộng Battery Handle', 'Chân Tripod mini', 'Thẻ nhớ SanDisk Extreme Pro 128GB', 'Túi cứng chống sốc DJI'],
    ARRAY['Du lịch', 'Vlog', 'Concert', 'Máy nhỏ gọn', 'Sự kiện'],
    ARRAY['Chống rung đỉnh cao', 'Kèm Mic xịn', 'Bỏ túi'],
    true, true, 4,
    'Thuê DJI Pocket 3 Creator Combo tại Quảng Bình | Kiho Camera',
    'Cho thuê máy quay bỏ túi DJI Osmo Pocket 3 tại Đồng Hới Quảng Bình. Chống rung mượt mà, kèm mic không dây DJI Mic 2.'
),
(
    'e5555555-5555-5555-5555-555555555555',
    'c1111111-1111-1111-1111-111111111111',
    'Sony Alpha A6400 + Lens 16-50mm',
    'sony-a6400-kit',
    'Máy ảnh mirrorless quốc dân cho người mới bắt đầu, màn hình lật chụp selfie, bắt nét ánh mắt cực nhạy.',
    'Sony A6400 là sự kết hợp hoàn hảo giữa độ nhỏ gọn và hiệu năng lấy nét siêu tốc độ. Máy hỗ trợ màn hình lật 180 độ hỗ trợ tự chụp ảnh nhóm, selfie du lịch cùng bạn bè gia đình tại Quảng Bình.',
    280000,
    'CCCD gắn chip chính chủ.',
    '{"cam_bien": "APS-C Exmor CMOS 24.2MP", "lay_net": "425 điểm AF theo pha, tốc độ lấy nét 0.02s", "man_hinh": "Cảm ứng 3.0 inch lật 180 độ", "quay_video": "4K 30p HDR (HLG), S-Log3", "trong_luong": "403g"}'::jsonb,
    ARRAY['Body Sony A6400', 'Lens Sony E 16-50mm f/3.5-5.6 OSS', '2 Pin + Sạc đôi', 'Thẻ nhớ 64GB', 'Túi đựng chống sốc'],
    ARRAY['Du lịch', 'Selfie', 'Vlog', 'Kỷ yếu', 'Máy nhỏ gọn'],
    ARRAY['Tiết kiệm', 'Lấy nét nhanh'],
    true, true, 5,
    'Thuê máy ảnh Sony A6400 giá rẻ Quảng Bình | Kiho Camera',
    'Cho thuê máy ảnh Sony A6400 kèm lens tại Đồng Hới Quảng Bình. Giá sinh viên, chụp đẹp, lấy nét cực nhanh.'
),
(
    'e6666666-6666-6666-6666-666666666666',
    'c2222222-2222-2222-2222-222222222222',
    'Sony FE 85mm F1.4 GM (G Master)',
    'sony-fe-85mm-f1-4-gm',
    'Ống kính chân dung huyền thoại của Sony với độ nét tuyệt hảo và hiệu ứng xoá phông bồng bềnh.',
    'Sony 85mm f/1.4 GM là sự lựa chọn số 1 cho các buổi chụp ảnh chân dung ngoại cảnh, chụp áo dài bên sông Nhật Lệ hay kỷ yếu học sinh, sinh viên tại Quảng Bình.',
    250000,
    'Thuê kèm body hoặc cọc CCCD.',
    '{"ngam": "Sony E-mount (Full-frame)", "khau_do": "f/1.4 - f/16 (11 lá khẩu tròn)", "cau_truc": "11 thấu kính trong 8 nhóm", "khoang_cach_lay_net_gan_nhat": "0.85m", "trong_luong": "820g"}'::jsonb,
    ARRAY['Ống kính Sony 85mm f/1.4 GM', 'Hood che nắng chính hãng', 'Nắp trước & nắp sau', 'Filter bảo vệ UV', 'Túi đựng lens'],
    ARRAY['Chụp chân dung', 'Kỷ yếu', 'Sự kiện'],
    ARRAY['Xoá phông mù mịt', 'Dòng cao cấp GM'],
    false, true, 6,
    'Thuê lens chân dung Sony 85mm F1.4 GM tại Quảng Bình | Kiho Camera',
    'Cho thuê ống kính Sony 85mm F1.4 G Master tại Đồng Hới Quảng Bình. Chuyên trị chân dung xoá phông cao cấp.'
),
(
    'e7777777-7777-7777-7777-777777777777',
    'c2222222-2222-2222-2222-222222222222',
    'Sony FE 24-70mm F2.8 GM II',
    'sony-fe-24-70mm-f2-8-gm-ii',
    'Ống kính zoom tiêu chuẩn đa dụng cao cấp thế hệ 2, siêu nét, siêu nhẹ cho mọi thể loại chụp.',
    'Được mệnh danh là lens "vạn năng", Sony 24-70mm GM II đáp ứng hoàn hảo từ phong cảnh góc rộng, chân dung bán thân đến sự kiện và quay phim chuyên nghiệp.',
    320000,
    'Thuê kèm body hoặc cọc CCCD.',
    '{"ngam": "Sony E-mount (Full-frame)", "khau_do": "f/2.8 toàn dải", "trong_luong": "695g (nhẹ hơn 22% so với đời 1)", "dong_co_af": "4 động cơ tuyến tính XD siêu êm"}'::jsonb,
    ARRAY['Ống kính Sony 24-70mm f/2.8 GM II', 'Hood chống loá', 'Nắp trước & nắp sau', 'Filter B+W Nano', 'Túi đựng lens'],
    ARRAY['Du lịch', 'Sự kiện', 'Kỷ yếu', 'Chụp chân dung'],
    ARRAY['Đa dụng cao cấp', 'Thế hệ 2 siêu nhẹ'],
    false, true, 7,
    'Thuê lens Sony 24-70mm F2.8 GM II tại Quảng Bình | Kiho Camera',
    'Cho thuê ống kính đa dụng Sony 24-70mm f2.8 G Master II tại Đồng Hới Quảng Bình.'
),
(
    'e8888888-8888-8888-8888-888888888888',
    'c4444444-4444-4444-4444-444444444444',
    'DJI RS 3 Mini Gimbal',
    'dji-rs-3-mini',
    'Tay cầm chống rung siêu nhẹ cho máy ảnh mirrorless, hỗ trợ quay khung dọc TikTok / Reels mượt mà.',
    'DJI RS 3 Mini là gimbal chống rung chuyên biệt cho dòng máy mirrorless nhẹ (Sony A7, A6400, Fujifilm). Trọng lượng chỉ 795g nhưng tải trọng lên đến 2kg, quay mượt mà cả ngày dài.',
    150000,
    'CCCD hoặc cọc theo quy định.',
    '{"tai_trong": "Lên đến 2.0 kg", "trong_luong": "795g (chế độ dọc) / 850g (chế độ ngang)", "thoi_luong_pin": "Lên đến 10 tiếng", "man_hinh": "Cảm ứng màu 1.4 inch"}'::jsonb,
    ARRAY['Gimbal DJI RS 3 Mini', 'Đế tháo nhanh Quick-Release', 'Chân Tripod mini', 'Cáp điều khiển máy ảnh', 'Cáp sạc Type-C'],
    ARRAY['Vlog', 'Du lịch', 'Sự kiện', 'Kỷ yếu'],
    ARRAY['Nhẹ gọn', 'Quay dọc TikTok'],
    false, true, 8,
    'Thuê Gimbal DJI RS 3 Mini tại Quảng Bình | Kiho Camera',
    'Cho thuê tay cầm chống rung DJI RS 3 Mini tại Đồng Hới Quảng Bình. Nhẹ 795g, pin 10 tiếng, quay video mượt mà.'
);

-- 3. Insert Equipment Images
INSERT INTO public.equipment_images (equipment_id, image_url, alt_text, is_cover, sort_order) VALUES
-- Canon G7X Mark III
('e1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80', 'Canon PowerShot G7X Mark III mặt trước', true, 1),
('e1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80', 'Canon G7X Mark III chụp chi tiết', false, 2),

-- Fujifilm X-T30 II
('e2222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80', 'Fujifilm X-T30 II phong cách vintage', true, 1),
('e2222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80', 'Fujifilm X-T30 II góc chụp trên cao', false, 2),

-- Sony A7 IV
('e3333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=800&q=80', 'Sony Alpha A7 IV Full-frame chuyên nghiệp', true, 1),
('e3333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=800&q=80', 'Sony A7 IV góc nghiêng ngàm lens', false, 2),

-- DJI Pocket 3
('e4444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=800&q=80', 'DJI Osmo Pocket 3 Creator Combo nhỏ gọn', true, 1),

-- Sony A6400
('e5555555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80', 'Sony Alpha A6400 kèm lens', true, 1),

-- Sony 85mm F1.4 GM
('e6666666-6666-6666-6666-666666666666', 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=800&q=80', 'Lens Sony FE 85mm F1.4 G Master', true, 1),

-- Sony 24-70mm F2.8 GM II
('e7777777-7777-7777-7777-777777777777', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80', 'Lens Sony FE 24-70mm F2.8 GM II', true, 1),

-- DJI RS 3 Mini
('e8888888-8888-8888-8888-888888888888', 'https://images.unsplash.com/photo-1589872510926-24e58b87d6cf?auto=format&fit=crop&w=800&q=80', 'Gimbal chống rung DJI RS 3 Mini', true, 1);

-- 4. Insert Feedback (Mock demo rõ ràng)
INSERT INTO public.feedback (customer_name, content, image_url, equipment_id, feedback_date, is_featured, is_active, sort_order)
VALUES
(
    'Khách hàng demo – Hoàng Yến (Hà Nội)',
    'Tụi mình đi du lịch Phong Nha 3 ngày, thuê chiếc Canon G7X Mark III của shop chụp da trắng hồng xinh xỉu. Anh chủ hướng dẫn cài đặt rất tận tình, pin kèm theo dùng tẹt ga!',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'e1111111-1111-1111-1111-111111111111',
    CURRENT_DATE - INTERVAL '3 days',
    true, true, 1
),
(
    'Khách hàng demo – Minh Quân (Đồng Hới)',
    'Nhóm mình chụp kỷ yếu thuê Fujifilm X-T30 II màu film lên ảnh cổ điển không cần blend màu lại luôn. Giao máy đúng giờ tại trung tâm Đồng Hới.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'e2222222-2222-2222-2222-222222222222',
    CURRENT_DATE - INTERVAL '7 days',
    true, true, 2
),
(
    'Khách hàng demo – Thùy Trang (Đà Nẵng)',
    'Lần đầu thuê DJI Pocket 3 đi động Thiên Đường và sông Chày hang Tối, quay video mượt dã man, mic kèm theo nói rõ ràng không bị tạp âm. 10 điểm cho Kiho Camera!',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'e4444444-4444-4444-4444-444444444444',
    CURRENT_DATE - INTERVAL '12 days',
    true, true, 3
),
(
    'Khách hàng demo – Đức Trọng (Nhiếp ảnh gia)',
    'Cần máy backup gấp cho đám cưới khách ở Đồng Hới, liên hệ Kiho lấy ngay Sony A7 IV và lens 85mm GM trong 15 phút. Thiết bị mới tinh, hoạt động hoàn hảo.',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    'e3333333-3333-3333-3333-333333333333',
    CURRENT_DATE - INTERVAL '18 days',
    true, true, 4
);
