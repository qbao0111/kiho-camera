import { Category, Equipment, Feedback, SiteSettings } from "@/types/database";

export const MOCK_SITE_SETTINGS: SiteSettings = {
  id: 1,
  shop_name: "Kiho Camera",
  tagline: "Cho thuê máy ảnh Quảng Bình – Máy xịn, giá rõ ràng, thuê nhanh tại Đồng Hới.",
  address: "48 Ngô Quyền, TP. Đồng Hới, Tỉnh Quảng Bình",
  phone: "0387 274 669",
  facebook_url: "https://facebook.com/kihocameradonghoi",
  messenger_url: "https://m.me/kihocameradonghoi",
  tiktok_url: "https://tiktok.com/@kihocamera",
  instagram_url: "https://instagram.com/Kiho.thuemayanhqbb",
  maps_url: "https://maps.google.com/?q=48+Ngo+Quyen+Dong+Hoi+Quang+Binh",
  opening_hours: "07:30 - 21:00 (Tất cả các ngày trong tuần)",
  hero_title: "Cho thuê máy ảnh tại Quảng Bình",
  hero_subtitle: "Máy đẹp, dễ sử dụng, giá rõ ràng. Thuê máy ảnh, lens và phụ kiện du lịch chất lượng cao tại Kiho Camera Đồng Hới.",
  hero_image: "/images/cameras/fujifilm-x100vi.jpg",
  about_text: "Kiho Camera là địa chỉ cho thuê máy ảnh, lens và thiết bị quay chụp uy tín hàng đầu tại 48 Ngô Quyền, Đồng Hới, Quảng Bình. Dù bạn đi du lịch Phong Nha - Kẻ Bàng, chụp ảnh kỷ yếu, sự kiện hay quay vlog, Kiho Camera luôn sẵn sàng hỗ trợ máy chất lượng cao cùng phụ kiện đầy đủ nhất.",
  footer_text: "© 2026 Kiho Camera - Dịch vụ cho thuê máy ảnh uy tín tại Quảng Bình. Hotline/Zalo: 0387 274 669. Hỗ trợ giao máy tận nơi khu vực Đồng Hới.",
};

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "c1111111-1111-1111-1111-111111111111",
    name: "Máy ảnh",
    slug: "may-anh",
    description: "Máy ảnh compact du lịch, mirrorless chụp ảnh & quay phim chuyên nghiệp",
    icon: "Camera",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "c2222222-2222-2222-2222-222222222222",
    name: "Lens / Ống kính",
    slug: "lens",
    description: "Ống kính chân dung, góc rộng phong cảnh, tele cho Sony, Canon, Fujifilm",
    icon: "Aperture",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "c3333333-3333-3333-3333-333333333333",
    name: "Máy quay & Action Cam",
    slug: "may-quay",
    description: "Thiết bị quay vlog du lịch, action cam nhỏ gọn chống rung",
    icon: "Video",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "c4444444-4444-4444-4444-444444444444",
    name: "Gimbal chống rung",
    slug: "gimbal",
    description: "Tay cầm chống rung chuyên nghiệp cho điện thoại, máy ảnh mirrorless",
    icon: "Move",
    sort_order: 4,
    is_active: true,
  },
  {
    id: "c5555555-5555-5555-5555-555555555555",
    name: "Phụ kiện nhiếp ảnh",
    slug: "phu-kien",
    description: "Micro thu âm không dây, đèn flash, chân máy tripod, thẻ nhớ tốc độ cao",
    icon: "Sliders",
    sort_order: 5,
    is_active: true,
  },
];

export const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: "e0000000-0000-0000-0000-000000000000",
    category_id: "c1111111-1111-1111-1111-111111111111",
    name: "Canon EOS R50 + Kit RF-S 18-45mm STM",
    slug: "canon-eos-r50",
    short_description: "Máy ảnh mirrorless thế hệ mới nhỏ gọn nhất hệ RF, cảm biến 24.2MP, lấy nét Dual Pixel AF II nhận diện thông minh, quay 4K 30p 6K oversampled tuyệt đẹp.",
    description: "Canon EOS R50 là chiếc máy ảnh mirrorless 'chân ái' dành cho các bạn trẻ mê du lịch, sáng tạo nội dung và chụp ảnh chân dung ngoại cảnh tại Quảng Bình. Với trọng lượng siêu nhẹ chỉ 375g cùng bộ xử lý DIGIC X mạnh mẽ và hệ thống lấy nét Dual Pixel CMOS AF II nhận diện ánh mắt chính xác, Canon R50 mang đến chất lượng hình ảnh xuất sắc, màu da người trắng hồng đặc trưng của Canon mà bất kỳ ai cũng có thể làm quen ngay trong 5 phút.",
    price_per_day: 320000,
    deposit_note: "CCCD gắn chip chính chủ hoặc đặt cọc linh hoạt.",
    specifications: {
      "Cảm biến": "APS-C CMOS 24.2 Megapixel",
      "Bộ xử lý": "DIGIC X thế hệ mới siêu tốc",
      "Lấy nét": "Dual Pixel CMOS AF II (651 vùng nhận diện người/mắt/động vật)",
      "Màn hình": "Cảm ứng xoay lật đa góc 3.0 inch 1.04 triệu điểm ảnh",
      "Quay video": "4K UHD 30p (Oversampling từ 6K) không crop, Full HD 120p",
      "Chụp liên tiếp": "Lên đến 15 fps (màn trập điện tử)",
      "Kết nối": "Wi-Fi & Bluetooth truyền ảnh tức thì sang smartphone qua app Canon Camera Connect",
      "Trọng lượng": "375g (siêu gọn nhẹ bỏ túi)"
    },
    included_items: [
      "Thân máy Canon EOS R50 (Chính hãng)",
      "Ống kính Canon RF-S 18-45mm f/4.5-6.3 IS STM",
      "2 Pin Canon LP-E17 dung lượng cao",
      "Dock sạc nhanh kép",
      "Thẻ nhớ SanDisk Extreme Pro 64GB / 128GB",
      "Túi máy ảnh thời trang chống sốc cao cấp",
      "Dây đeo cổ thao tác nhanh",
      "Đầu đọc thẻ nhớ đa năng OTG cho iPhone & Android Type-C"
    ],
    use_cases: ["Du lịch", "Chụp chân dung", "Vlog", "Selfie", "Máy nhỏ gọn", "Kỷ yếu"],
    badges: ["Flagship Hot", "Lấy nét Dual Pixel II", "Màu da đẹp", "Siêu nhẹ 375g"],
    is_featured: true,
    is_active: true,
    sort_order: 0,
    seo_title: "Thuê máy ảnh Canon EOS R50 tại Quảng Bình - Giá tốt nhất | Kiho Camera",
    seo_description: "Dịch vụ cho thuê máy ảnh Canon EOS R50 kèm lens tại Đồng Hới, Quảng Bình. Cảm biến 24.2MP, quay 4K 30p, bắt nét mắt siêu nhanh, máy gọn nhẹ du lịch.",
    images: [
      {
        id: "img-0-1",
        equipment_id: "e0000000-0000-0000-0000-000000000000",
        image_url: "/images/canon-r50/canon-r50-front.jpg",
        alt_text: "Canon EOS R50 kèm lens RF-S 18-45mm IS STM góc chính diện",
        is_cover: true,
        sort_order: 1,
      },
      {
        id: "img-0-2",
        equipment_id: "e0000000-0000-0000-0000-000000000000",
        image_url: "/images/canon-r50/canon-r50-top.jpg",
        alt_text: "Canon EOS R50 góc nhìn đỉnh máy và phím bấm",
        is_cover: false,
        sort_order: 2,
      },
      {
        id: "img-0-3",
        equipment_id: "e0000000-0000-0000-0000-000000000000",
        image_url: "/images/canon-r50/canon-r50-back.webp",
        alt_text: "Canon EOS R50 góc nhìn mặt sau màn hình xoay lật",
        is_cover: false,
        sort_order: 3,
      }
    ]
  },
  {
    id: "e1111111-1111-1111-1111-111111111111",
    category_id: "c1111111-1111-1111-1111-111111111111",
    name: "Canon PowerShot G7X Mark III",
    slug: "canon-g7x-mark-iii",
    short_description: "Máy ảnh compact du lịch quốc dân với màn hình lật 180 độ, màu da tươi sáng tự nhiên, nhỏ gọn đút túi.",
    description: "Canon PowerShot G7X Mark III là chiếc máy ảnh được yêu thích hàng đầu cho nhu cầu đi du lịch, quay vlog và chụp selfie. Cảm biến 1-inch 20.1 MP cùng ống kính khẩu độ lớn f/1.8-2.8 cho khả năng chụp thiếu sáng tốt, màu da người (skin tone) hồng hào đặc trưng của Canon mà không cần hậu kỳ phức tạp.",
    price_per_day: 300000,
    deposit_note: "CCCD gắn chip chính chủ hoặc đặt cọc linh hoạt theo thoả thuận.",
    specifications: {
      "Cảm biến": "1.0-type stacked CMOS 20.1MP",
      "Ống kính": "24-100mm f/1.8-2.8 (Zoom quang 4.2x)",
      "Màn hình": "Cảm ứng 3.0 inch lật 180 độ selfie",
      "Quay video": "4K 30p, Full HD 120p không crop",
      "Kết nối": "Wi-Fi, Bluetooth chuyển ảnh sang điện thoại",
      "Trọng lượng": "304g (kèm pin & thẻ nhớ)"
    },
    included_items: [
      "Thân máy Canon G7X Mark III",
      "2 Pin dung lượng cao",
      "Sạc pin chính hãng",
      "Thẻ nhớ SanDisk Extreme 64GB",
      "Bao da / túi chống sốc",
      "Dây đeo tay",
      "Đầu đọc thẻ nhớ cho iPhone / Type-C"
    ],
    use_cases: ["Du lịch", "Selfie", "Vlog", "Máy nhỏ gọn", "Concert"],
    badges: ["Hot", "Dễ sử dụng", "Màu da đẹp"],
    is_featured: true,
    is_active: true,
    sort_order: 1,
    seo_title: "Thuê máy ảnh Canon G7X Mark III Quảng Bình - Giá tốt nhất | Kiho Camera",
    seo_description: "Cho thuê máy ảnh du lịch Canon G7X Mark III tại Đồng Hới Quảng Bình. Máy compact nhỏ gọn, màn lật selfie, màu da đẹp. Kèm 2 pin + thẻ 64GB.",
    images: [
      {
        id: "img-1-1",
        equipment_id: "e1111111-1111-1111-1111-111111111111",
        image_url: "/images/cameras/canon-g7x-mark3.jpg",
        alt_text: "Canon PowerShot G7X Mark III mặt trước",
        is_cover: true,
        sort_order: 1,
      }
    ]
  },
  {
    id: "e2222222-2222-2222-2222-222222222222",
    category_id: "c1111111-1111-1111-1111-111111111111",
    name: "Fujifilm X-T30 II + Kit 15-45mm",
    slug: "fujifilm-x-t30-ii",
    short_description: "Chiếc máy ảnh mang đậm phong cách vintage với bộ giả lập màu film trứ danh của Fujifilm.",
    description: "Fujifilm X-T30 II mang đến trải nghiệm chụp ảnh đậm chất hoài niệm với 18 bộ lọc giả lập màu film trứ danh (Classic Chrome, Classic Neg, Astia...). Máy cực kỳ phù hợp cho các chuyến du lịch trải nghiệm, chụp ảnh nghệ thuật, kỷ yếu tại các điểm check-in nổi tiếng của Quảng Bình.",
    price_per_day: 350000,
    deposit_note: "CCCD gắn chip chính chủ hoặc đặt cọc theo quy định của shop.",
    specifications: {
      "Cảm biến": "APS-C X-Trans CMOS 4 26.1MP",
      "Bộ xử lý": "X-Processor 4 tốc độ cao",
      "Giả lập film": "18 chế độ Film Simulation (Classic Chrome, Nostalgic Neg...)",
      "Lấy nét": "425 điểm AF theo pha, nhận diện mắt/mặt",
      "Quay video": "4K 30p DCI, Full HD 240p",
      "Trọng lượng": "378g (chưa gồm lens)"
    },
    included_items: [
      "Body máy ảnh Fujifilm X-T30 II",
      "Lens Fujinon XC 15-45mm OIS PZ",
      "2 Pin dung lượng cao & Dock sạc đôi",
      "Thẻ nhớ tốc độ cao 64GB",
      "Túi máy ảnh thời trang chống sốc",
      "Dây đeo phong cách vintage"
    ],
    use_cases: ["Du lịch", "Chụp chân dung", "Kỷ yếu", "Máy nhỏ gọn"],
    badges: ["Màu film retro", "Chụp nghệ thuật"],
    is_featured: true,
    is_active: true,
    sort_order: 2,
    seo_title: "Thuê máy ảnh Fujifilm X-T30 II màu film vintage tại Quảng Bình | Kiho Camera",
    seo_description: "Cho thuê Fujifilm X-T30 II giá rẻ tại Quảng Bình. Giả lập màu film cổ điển không cần chỉnh sửa ảnh, máy nhẹ đẹp thời trang.",
    images: [
      {
        id: "img-2-1",
        equipment_id: "e2222222-2222-2222-2222-222222222222",
        image_url: "/images/cameras/fujifilm-x100vi.jpg",
        alt_text: "Fujifilm phong cách vintage",
        is_cover: true,
        sort_order: 1,
      }
    ]
  },
  {
    id: "e3333333-3333-3333-3333-333333333333",
    category_id: "c1111111-1111-1111-1111-111111111111",
    name: "Sony Alpha A7 IV (Body)",
    slug: "sony-alpha-a7-iv",
    short_description: "Máy ảnh Full-frame hybrid đỉnh cao cho chụp ảnh thương mại, sự kiện và quay phim 4K 10-bit chuyên nghiệp.",
    description: "Sony A7 IV là sự lựa chọn số 1 cho các thợ chụp sự kiện, kỷ yếu, phóng sự cưới hoặc quay video du lịch chất lượng điện ảnh tại Quảng Bình. Cảm biến 33MP Exmor R cùng hệ thống lấy nét Real-time Eye AF thông minh bắt trọn từng khoảnh khắc.",
    price_per_day: 600000,
    deposit_note: "Yêu cầu CCCD gắn chip và giấy tờ tuỳ thân chính chủ.",
    specifications: {
      "Cảm biến": "Full-Frame Exmor R BSI CMOS 33MP",
      "Bộ xử lý": "BIONZ XR thế hệ mới",
      "Chống rung": "IBIS 5 trục trong thân máy (5.5 stops)",
      "Quay video": "4K 60p 10-bit 4:2:2, cấu hình màu S-Cinetone / S-Log3",
      "Lấy nét": "759 điểm AF theo pha phủ 94% khung hình",
      "Khe thẻ": "2 khe cắm thẻ nhớ SD UHS-II / CFexpress Type A"
    },
    included_items: [
      "Body Sony Alpha A7 IV",
      "2 Pin Sony FZ100 chính hãng",
      "Sạc đôi nhanh Kingma",
      "Thẻ nhớ SDXC V60 128GB tốc độ cao",
      "Túi đựng máy ảnh chuyên dụng",
      "Dây đeo thao tác nhanh Peak Design"
    ],
    use_cases: ["Chụp chân dung", "Kỷ yếu", "Sự kiện", "Quay phim"],
    badges: ["Full-frame", "Chuyên nghiệp", "Lấy nét siêu nhanh"],
    is_featured: true,
    is_active: true,
    sort_order: 3,
    seo_title: "Thuê máy ảnh Full-Frame Sony A7 IV tại Quảng Bình | Kiho Camera",
    seo_description: "Dịch vụ cho thuê body Sony Alpha A7 IV tại Đồng Hới Quảng Bình. Thiết bị chuyên nghiệp quay 4K 10-bit, chụp 33MP sắc nét.",
    images: [
      {
        id: "img-3-1",
        equipment_id: "e3333333-3333-3333-3333-333333333333",
        image_url: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=1000&q=80",
        alt_text: "Sony Alpha A7 IV Full-frame chuyên nghiệp",
        is_cover: true,
        sort_order: 1,
      },
      {
        id: "img-3-2",
        equipment_id: "e3333333-3333-3333-3333-333333333333",
        image_url: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=1000&q=80",
        alt_text: "Sony A7 IV góc nghiêng ngàm lens",
        is_cover: false,
        sort_order: 2,
      }
    ]
  },
  {
    id: "e4444444-4444-4444-4444-444444444444",
    category_id: "c3333333-3333-3333-3333-333333333333",
    name: "DJI Osmo Pocket 3 Creator Combo",
    slug: "dji-osmo-pocket-3-creator-combo",
    short_description: "Máy quay bỏ túi cảm biến 1-inch, gimbal 3 trục mượt như phim, màn hình xoay 2 inch độc đáo.",
    description: "DJI Osmo Pocket 3 là trợ thủ đắc lực của mọi tín đồ du lịch khi đến Quảng Bình. Thỏa sức quay cảnh động Phong Nha, bãi biển Nhật Lệ hay đồi cát Quang Phú mà không lo rung lắc. Bản Creator Combo kèm mic thu âm không dây DJI Mic 2 chống ồn lọc gió cực đỉnh.",
    price_per_day: 350000,
    deposit_note: "CCCD gắn chip hoặc đặt cọc linh hoạt.",
    specifications: {
      "Cảm biến": "CMOS 1-inch quay 4K/120fps",
      "Màn hình": "OLED cảm ứng 2.0 inch xoay ngang/dọc",
      "Chống rung": "Gimbal cơ học 3 trục vật lý",
      "Theo dõi chủ thể": "ActiveTrack 6.0 thông minh",
      "Microphone": "Micro không dây DJI Mic 2 truyền tín hiệu số",
      "Trọng lượng": "179g siêu gọn nhẹ"
    },
    included_items: [
      "Thân máy DJI Pocket 3",
      "Micro không dây DJI Mic 2 + Bông lọc gió",
      "Cán pin mở rộng Battery Handle",
      "Chân Tripod mini",
      "Thẻ nhớ SanDisk Extreme Pro 128GB",
      "Hộp bảo vệ chống sốc chính hãng DJI"
    ],
    use_cases: ["Du lịch", "Vlog", "Concert", "Máy nhỏ gọn", "Sự kiện"],
    badges: ["Chống rung đỉnh cao", "Kèm Mic xịn", "Bỏ túi"],
    is_featured: true,
    is_active: true,
    sort_order: 4,
    seo_title: "Thuê DJI Pocket 3 Creator Combo tại Quảng Bình | Kiho Camera",
    seo_description: "Cho thuê máy quay bỏ túi DJI Osmo Pocket 3 tại Đồng Hới Quảng Bình. Chống rung mượt mà, kèm mic không dây DJI Mic 2.",
    images: [
      {
        id: "img-4-1",
        equipment_id: "e4444444-4444-4444-4444-444444444444",
        image_url: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=1000&q=80",
        alt_text: "DJI Osmo Pocket 3 Creator Combo nhỏ gọn",
        is_cover: true,
        sort_order: 1,
      }
    ]
  },
  {
    id: "e5555555-5555-5555-5555-555555555555",
    category_id: "c1111111-1111-1111-1111-111111111111",
    name: "Sony Alpha A6400 + Lens 16-50mm",
    slug: "sony-a6400-kit",
    short_description: "Máy ảnh mirrorless quốc dân cho người mới bắt đầu, màn hình lật chụp selfie, bắt nét ánh mắt cực nhạy.",
    description: "Sony A6400 là sự kết hợp hoàn hảo giữa độ nhỏ gọn và hiệu năng lấy nét siêu tốc độ. Máy hỗ trợ màn hình lật 180 độ hỗ trợ tự chụp ảnh nhóm, selfie du lịch cùng bạn bè gia đình tại Quảng Bình.",
    price_per_day: 280000,
    deposit_note: "CCCD gắn chip chính chủ.",
    specifications: {
      "Cảm biến": "APS-C Exmor CMOS 24.2MP",
      "Lấy nét": "425 điểm AF theo pha, tốc độ lấy nét 0.02s",
      "Màn hình": "Cảm ứng 3.0 inch lật 180 độ",
      "Quay video": "4K 30p HDR (HLG), S-Log3",
      "Trọng lượng": "403g"
    },
    included_items: [
      "Body Sony A6400",
      "Lens Sony E 16-50mm f/3.5-5.6 OSS",
      "2 Pin + Sạc đôi nhanh",
      "Thẻ nhớ tốc độ cao 64GB",
      "Túi đựng chống sốc"
    ],
    use_cases: ["Du lịch", "Selfie", "Vlog", "Kỷ yếu", "Máy nhỏ gọn"],
    badges: ["Tiết kiệm", "Lấy nét nhanh"],
    is_featured: true,
    is_active: true,
    sort_order: 5,
    seo_title: "Thuê máy ảnh Sony A6400 giá rẻ Quảng Bình | Kiho Camera",
    seo_description: "Cho thuê máy ảnh Sony A6400 kèm lens tại Đồng Hới Quảng Bình. Giá sinh viên, chụp đẹp, lấy nét cực nhanh.",
    images: [
      {
        id: "img-5-1",
        equipment_id: "e5555555-5555-5555-5555-555555555555",
        image_url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80",
        alt_text: "Sony Alpha A6400 kèm lens kit",
        is_cover: true,
        sort_order: 1,
      }
    ]
  },
  {
    id: "e6666666-6666-6666-6666-666666666666",
    category_id: "c2222222-2222-2222-2222-222222222222",
    name: "Sony FE 85mm F1.4 GM (G Master)",
    slug: "sony-fe-85mm-f1-4-gm",
    short_description: "Ống kính chân dung huyền thoại của Sony với độ nét tuyệt hảo và hiệu ứng xoá phông bồng bềnh.",
    description: "Sony 85mm f/1.4 GM là sự lựa chọn số 1 cho các buổi chụp ảnh chân dung ngoại cảnh, chụp áo dài bên sông Nhật Lệ hay kỷ yếu học sinh, sinh viên tại Quảng Bình.",
    price_per_day: 250000,
    deposit_note: "Thuê kèm body hoặc cọc CCCD.",
    specifications: {
      "Ngàm": "Sony E-mount (Full-frame)",
      "Khẩu độ": "f/1.4 - f/16 (11 lá khẩu tròn)",
      "Cấu trúc thấu kính": "11 thấu kính trong 8 nhóm",
      "Trọng lượng": "820g"
    },
    included_items: [
      "Ống kính Sony 85mm f/1.4 GM",
      "Hood che nắng chính hãng",
      "Nắp trước & nắp sau",
      "Filter bảo vệ UV",
      "Túi đựng lens chống sốc"
    ],
    use_cases: ["Chụp chân dung", "Kỷ yếu", "Sự kiện"],
    badges: ["Xoá phông mù mịt", "Dòng cao cấp GM"],
    is_featured: false,
    is_active: true,
    sort_order: 6,
    seo_title: "Thuê lens chân dung Sony 85mm F1.4 GM tại Quảng Bình | Kiho Camera",
    seo_description: "Cho thuê ống kính Sony 85mm F1.4 G Master tại Đồng Hới Quảng Bình. Chuyên trị chân dung xoá phông cao cấp.",
    images: [
      {
        id: "img-6-1",
        equipment_id: "e6666666-6666-6666-6666-666666666666",
        image_url: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=1000&q=80",
        alt_text: "Lens Sony FE 85mm F1.4 G Master",
        is_cover: true,
        sort_order: 1,
      }
    ]
  },
  {
    id: "e7777777-7777-7777-7777-777777777777",
    category_id: "c2222222-2222-2222-2222-222222222222",
    name: "Sony FE 24-70mm F2.8 GM II",
    slug: "sony-fe-24-70mm-f2-8-gm-ii",
    short_description: "Ống kính zoom tiêu chuẩn đa dụng cao cấp thế hệ 2, siêu nét, siêu nhẹ cho mọi thể loại chụp.",
    description: "Được mệnh danh là lens 'vạn năng', Sony 24-70mm GM II đáp ứng hoàn hảo từ phong cảnh góc rộng, chân dung bán thân đến sự kiện và quay phim chuyên nghiệp.",
    price_per_day: 320000,
    deposit_note: "Thuê kèm body hoặc cọc CCCD.",
    specifications: {
      "Ngàm": "Sony E-mount (Full-frame)",
      "Khẩu độ": "f/2.8 toàn dải zoom",
      "Trọng lượng": "695g (nhẹ hơn 22% so với đời 1)",
      "Lấy nét": "4 động cơ XD Linear tốc độ cao"
    },
    included_items: [
      "Ống kính Sony 24-70mm f/2.8 GM II",
      "Hood chống loá",
      "Nắp trước & nắp sau",
      "Filter B+W Nano xịn",
      "Túi đựng lens"
    ],
    use_cases: ["Du lịch", "Sự kiện", "Kỷ yếu", "Chụp chân dung"],
    badges: ["Đa dụng cao cấp", "Thế hệ 2 siêu nhẹ"],
    is_featured: false,
    is_active: true,
    sort_order: 7,
    seo_title: "Thuê lens Sony 24-70mm F2.8 GM II tại Quảng Bình | Kiho Camera",
    seo_description: "Cho thuê ống kính đa dụng Sony 24-70mm f2.8 G Master II tại Đồng Hới Quảng Bình.",
    images: [
      {
        id: "img-7-1",
        equipment_id: "e7777777-7777-7777-7777-777777777777",
        image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80",
        alt_text: "Lens Sony FE 24-70mm F2.8 GM II",
        is_cover: true,
        sort_order: 1,
      }
    ]
  },
  {
    id: "e8888888-8888-8888-8888-888888888888",
    category_id: "c4444444-4444-4444-4444-444444444444",
    name: "DJI RS 3 Mini Gimbal",
    slug: "dji-rs-3-mini",
    short_description: "Tay cầm chống rung siêu nhẹ cho máy ảnh mirrorless, hỗ trợ quay khung dọc TikTok / Reels mượt mà.",
    description: "DJI RS 3 Mini là gimbal chống rung chuyên biệt cho dòng máy mirrorless nhẹ (Sony A7, A6400, Fujifilm). Trọng lượng chỉ 795g nhưng tải trọng lên đến 2kg, quay mượt mà cả ngày dài.",
    price_per_day: 150000,
    deposit_note: "CCCD hoặc cọc theo quy định.",
    specifications: {
      "Tải trọng": "Lên đến 2.0 kg",
      "Trọng lượng": "795g (chế độ dọc) / 850g (chế độ ngang)",
      "Thời lượng pin": "Lên đến 10 tiếng liên tục",
      "Màn hình": "Cảm ứng màu 1.4 inch"
    },
    included_items: [
      "Gimbal DJI RS 3 Mini",
      "Đế tháo nhanh Quick-Release",
      "Chân Tripod mini",
      "Cáp điều khiển máy ảnh",
      "Cáp sạc Type-C"
    ],
    use_cases: ["Vlog", "Du lịch", "Sự kiện", "Kỷ yếu"],
    badges: ["Nhẹ gọn", "Quay dọc TikTok"],
    is_featured: false,
    is_active: true,
    sort_order: 8,
    seo_title: "Thuê Gimbal DJI RS 3 Mini tại Quảng Bình | Kiho Camera",
    seo_description: "Cho thuê tay cầm chống rung DJI RS 3 Mini tại Đồng Hới Quảng Bình. Nhẹ 795g, pin 10 tiếng, quay video mượt mà.",
    images: [
      {
        id: "img-8-1",
        equipment_id: "e8888888-8888-8888-8888-888888888888",
        image_url: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=1000&q=80",
        alt_text: "Gimbal chống rung DJI RS 3 Mini",
        is_cover: true,
        sort_order: 1,
      }
    ]
  }
];

export const MOCK_FEEDBACK: Feedback[] = [
  {
    id: "f1111111-1111-1111-1111-111111111111",
    customer_name: "Khách hàng demo – Hoàng Yến (Hà Nội)",
    content: "Tụi mình đi du lịch Phong Nha 3 ngày, thuê chiếc Canon G7X Mark III của shop chụp da trắng hồng xinh xỉu. Anh chủ hướng dẫn cài đặt rất tận tình, pin kèm theo dùng tẹt ga!",
    image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    equipment_id: "e1111111-1111-1111-1111-111111111111",
    feedback_date: "2026-08-20",
    is_featured: true,
    is_active: true,
    sort_order: 1,
  },
  {
    id: "f2222222-2222-2222-2222-222222222222",
    customer_name: "Khách hàng demo – Minh Quân (Đồng Hới)",
    content: "Nhóm mình chụp kỷ yếu thuê Fujifilm X-T30 II màu film lên ảnh cổ điển không cần blend màu lại luôn. Giao máy đúng giờ tại trung tâm Đồng Hới.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    equipment_id: "e2222222-2222-2222-2222-222222222222",
    feedback_date: "2026-08-16",
    is_featured: true,
    is_active: true,
    sort_order: 2,
  },
  {
    id: "f3333333-3333-3333-3333-333333333333",
    customer_name: "Khách hàng demo – Thùy Trang (Đà Nẵng)",
    content: "Lần đầu thuê DJI Pocket 3 đi động Thiên Đường và sông Chày hang Tối, quay video mượt dã man, mic kèm theo nói rõ ràng không bị tạp âm. 10 điểm cho Kiho Camera!",
    image_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    equipment_id: "e4444444-4444-4444-4444-444444444444",
    feedback_date: "2026-08-10",
    is_featured: true,
    is_active: true,
    sort_order: 3,
  },
  {
    id: "f4444444-4444-4444-4444-444444444444",
    customer_name: "Khách hàng demo – Đức Trọng (Nhiếp ảnh gia)",
    content: "Cần máy backup gấp cho đám cưới khách ở Đồng Hới, liên hệ Kiho lấy ngay Sony A7 IV và lens 85mm GM trong 15 phút. Thiết bị mới tinh, hoạt động hoàn hảo.",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    equipment_id: "e3333333-3333-3333-3333-333333333333",
    feedback_date: "2026-08-05",
    is_featured: true,
    is_active: true,
    sort_order: 4,
  }
];

export const USE_CASE_LIST = [
  {
    title: "Du lịch & Check-in",
    tag: "Du lịch",
    icon: "Palmtree",
    desc: "Máy gọn nhẹ, pin trâu, màu da tươi tắn khi đi động Thiên Đường, bãi đá Nhảy...",
  },
  {
    title: "Chân dung & Xoá phông",
    tag: "Chụp chân dung",
    icon: "User",
    desc: "Cảm biến lớn, lens khẩu f/1.4 - f/2.8 xoá phông mù mịt, tôn vẻ đẹp tự nhiên.",
  },
  {
    title: "Kỷ yếu & Sự kiện",
    tag: "Kỷ yếu",
    icon: "GraduationCap",
    desc: "Thiết bị chuyên nghiệp chụp tập thể, sắc nét từng chi tiết, hoạt động bền bỉ.",
  },
  {
    title: "Vlog & TikTok",
    tag: "Vlog",
    icon: "Video",
    desc: "Màn hình lật xoay, chống rung mượt mà, hỗ trợ mic thu âm chống gió tốt.",
  },
  {
    title: "Concert & Sân khấu",
    tag: "Concert",
    icon: "Music",
    desc: "Zoom xa sắc nét, chụp thiếu sáng đỉnh cao bắt trọn thần tượng.",
  },
  {
    title: "Máy nhỏ bỏ túi",
    tag: "Máy nhỏ gọn",
    icon: "Sparkles",
    desc: "Kích thước mini, dễ dàng cất túi áo hoặc túi xách khi di chuyển cả ngày.",
  }
];
