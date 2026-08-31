import { Category, Equipment, Feedback, SiteSettings } from "@/types/database";
import { DEFAULT_MAPS_URL } from "@/lib/constants";

export const MOCK_SITE_SETTINGS: SiteSettings = {
  id: 1,
  shop_name: "Kiho Camera",
  tagline: "Cho thuê máy ảnh Quảng Bình – Máy xịn, giá rõ ràng, thuê nhanh tại Đồng Hới.",
  address: "48 Ngô Quyền, TP. Đồng Hới, Tỉnh Quảng Bình",
  phone: "0387 274 669",
  facebook_url: "https://facebook.com/kihocameradonghoi",
  messenger_url: "https://m.me/kihocameradonghoi",
  tiktok_url: "https://tiktok.com/@kihocamera",
  instagram_url: "https://www.instagram.com/thuemayanhqbb/",
  maps_url: DEFAULT_MAPS_URL,
  maps_embed_url: "",
  opening_hours: "07:30 - 21:00 (Tất cả các ngày trong tuần)",

  hero_title: "Cho thuê máy ảnh tại Quảng Bình",
  hero_subtitle: "Máy đẹp, dễ sử dụng, giá rõ ràng. Thuê máy ảnh du lịch chất lượng cao tại Kiho Camera Đồng Hới.",
  hero_image: "/images/cameras/fujifilm-x100vi.jpg",
  about_text: "Kiho Camera là địa chỉ cho thuê máy ảnh uy tín hàng đầu tại 48 Ngô Quyền, Đồng Hới, Quảng Bình. Dù bạn đi du lịch Phong Nha - Kẻ Bàng, chụp ảnh kỷ yếu, sự kiện hay quay vlog, Kiho Camera luôn sẵn sàng hỗ trợ máy chất lượng cao cùng trọn bộ phụ kiện đầy đủ nhất.",
  footer_text: "© 2026 Kiho Camera - Dịch vụ cho thuê máy ảnh uy tín tại Quảng Bình. Hotline/Zalo: 0387 274 669. Hỗ trợ giao máy tận nơi khu vực Đồng Hới.",
};

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "c1111111-1111-1111-1111-111111111111",
    name: "Máy ảnh",
    slug: "may-anh",
    description: "12 dòng máy ảnh du lịch, mirrorless chụp ảnh & quay phim tuyển chọn tại Đồng Hới",
    icon: "Camera",
    sort_order: 1,
    is_active: true,
  },
];

export const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: "e01",
    category_id: "c1111111-1111-1111-1111-111111111111",
    brand: "Fujifilm",
    name: "FUJIFILM X100VI",
    slug: "fujifilm-x100vi",
    short_description: "Flagship cao cấp cảm biến 40.2MP, chống rung IBIS 6.0 stops, 20 bộ lọc màu film hoài niệm độc quyền.",
    description: "Fujifilm X100VI là siêu phẩm máy ảnh du lịch được săn đón nhất thế giới hiện nay. Thân máy rangefinder kim loại cổ điển với cảm biến X-Trans CMOS 5 HR 40.2MP kết hợp hệ thống chống rung 5 trục trong thân máy, cho ra những khung hình đậm chất điện ảnh tại Phong Nha và bờ biển Quảng Bình mà không cần bất kỳ thao tác hậu kỳ nào.",
    price_session: 350000,
    price_per_day: 450000,
    price_three_days: 420000,
    price_poster_url: "/images/price-posters/fujifilm-x100vi.webp",
    deposit_note: "CCCD gắn chip chính chủ hoặc đặt cọc linh hoạt.",
    specifications: {
      "Cảm biến": "40.2MP X-Trans CMOS 5 HR",
      "Bộ xử lý": "X-Processor 5 siêu tốc",
      "Chống rung": "IBIS 5 trục lên đến 6.0 stops",
      "Ống kính": "Fujinon 23mm f/2 II thế hệ mới siêu nét",
      "Giả lập film": "20 chế độ Film Simulation (Reala Ace, Classic Neg...)",
      "Quay video": "6.2K 30p, 4K 60p 10-bit",
      "Trọng lượng": "521g (kèm pin & thẻ)"
    },
    included_items: [
      "Thân máy Fujifilm X100VI (Bạc / Đen)",
      "Ống kính gắn liền Fujinon 23mm f/2 II",
      "2 Pin Fujifilm dung lượng cao",
      "Dock sạc đôi nhanh",
      "Thẻ nhớ SanDisk Extreme Pro 128GB",
      "Túi máy ảnh thời trang chống sốc",
      "Dây đeo vintage da cao cấp",
      "Đầu đọc thẻ OTG cho iPhone & Type-C"
    ],
    use_cases: ["Du lịch", "Chân dung", "Màu film", "Streetlife", "Couple"],
    badges: ["Siêu phẩm 2026", "Màu film 40MP", "Chống rung IBIS"],
    is_featured: true,
    is_active: true,
    sort_order: 1,
    seo_title: "Thuê máy ảnh Fujifilm X100VI tại Quảng Bình",
    seo_description: "Dịch vụ cho thuê Fujifilm X100VI chính hãng tại Đồng Hới, Quảng Bình. Cảm biến 40.2MP, chống rung IBIS, 20 giả lập film.",
    images: [
      { id: "img-01-1", equipment_id: "e01", image_url: "/images/cameras/fujifilm-x100vi.jpg", alt_text: "Fujifilm X100VI chính diện", is_cover: true, sort_order: 1 },
      { id: "img-01-2", equipment_id: "e01", image_url: "/images/price-posters/fujifilm-x100vi.webp", alt_text: "Bảng giá thuê Fujifilm X100VI", is_cover: false, sort_order: 2 }
    ],
    sample_images: [
      { id: "s-01-1", equipment_id: "e01", image_url: "/images/samples/sample-fuji-1.webp", caption: "Tone màu Reala Ace tại cồn cát Quang Phú", alt_text: "Ảnh chụp bằng Fujifilm X100VI", sort_order: 1, is_active: true },
      { id: "s-01-2", equipment_id: "e01", image_url: "/images/samples/sample-fuji-2.webp", caption: "Chân dung Classic Chrome chiều hoàng hôn", alt_text: "Ảnh chân dung Fujifilm X100VI", sort_order: 2, is_active: true },
      { id: "s-01-3", equipment_id: "e01", image_url: "/images/samples/sample-fuji-3.webp", caption: "Sương sớm sông Son Phong Nha", alt_text: "Phong cảnh Fujifilm X100VI", sort_order: 3, is_active: true }
    ]
  },
  {
    id: "e02",
    category_id: "c1111111-1111-1111-1111-111111111111",
    brand: "Fujifilm",
    name: "FUJIFILM X100V",
    slug: "fujifilm-x100v",
    short_description: "Huyền thoại máy ảnh đường phố với màu film Classic Negative trứ danh và thiết kế rangefinder sang trọng.",
    description: "Fujifilm X100V là chiếc máy ảnh tạo nên cơn sốt toàn cầu nhờ màu ảnh Classic Negative hoài niệm và ống kính 23mm f/2 sắc nét. Thích hợp cho các chuyến du lịch, hẹn hò, check-in quán cafe và dạo biển Đồng Hới.",
    price_session: 250000,
    price_per_day: 380000,
    price_three_days: 350000,
    price_poster_url: "/images/price-posters/fujifilm-x100v.webp",
    deposit_note: "CCCD gắn chip chính chủ hoặc đặt cọc linh hoạt.",
    specifications: {
      "Cảm biến": "26.1MP X-Trans CMOS 4",
      "Bộ xử lý": "X-Processor 4",
      "Ống kính": "Fujinon 23mm f/2 thế hệ II",
      "Màn hình": "Cảm ứng lật 2 chiều",
      "Giả lập film": "17 chế độ (Classic Neg, Eterna, Acros...)",
      "Trọng lượng": "478g"
    },
    included_items: [
      "Thân máy Fujifilm X100V",
      "Ống kính Fujinon 23mm f/2",
      "2 Pin dung lượng cao",
      "Sạc đôi nhanh",
      "Thẻ nhớ SanDisk 64GB",
      "Túi chống sốc",
      "Đầu đọc thẻ OTG"
    ],
    use_cases: ["Du lịch", "Màu film", "Couple", "Check-in", "Streetlife"],
    badges: ["Màu film đẹp", "Classic Neg", "Cổ điển"],
    is_featured: true,
    is_active: true,
    sort_order: 2,
    seo_title: "Thuê máy ảnh Fujifilm X100V màu film tại Quảng Bình",
    seo_description: "Cho thuê máy ảnh Fujifilm X100V giá tốt tại Đồng Hới Quảng Bình. Màu film hoài niệm, ống kính 23mm f2 sắc nét.",
    images: [
      { id: "img-02-1", equipment_id: "e02", image_url: "/images/cameras/fujifilm-x100v.jpg", alt_text: "Fujifilm X100V chính diện", is_cover: true, sort_order: 1 },
      { id: "img-02-2", equipment_id: "e02", image_url: "/images/price-posters/fujifilm-x100v.webp", alt_text: "Bảng giá Fujifilm X100V", is_cover: false, sort_order: 2 }
    ],
    sample_images: [
      { id: "s-02-1", equipment_id: "e02", image_url: "/images/samples/sample-fuji-2.webp", caption: "Màu film Classic Neg hoài niệm", alt_text: "Ảnh chụp Fujifilm X100V", sort_order: 1, is_active: true },
      { id: "s-02-2", equipment_id: "e02", image_url: "/images/samples/sample-fuji-1.webp", caption: "Check-in biển Nhật Lệ rực rỡ", alt_text: "Ảnh biển Fujifilm X100V", sort_order: 2, is_active: true }
    ]
  },
  {
    id: "e03",
    category_id: "c1111111-1111-1111-1111-111111111111",
    brand: "Fujifilm",
    name: "FUJIFILM XS10",
    slug: "fujifilm-xs10",
    short_description: "Báng cầm chắc chắn, màn hình xoay lật đa góc, chống rung IBIS mạnh mẽ chụp và quay video film.",
    description: "Fujifilm X-S10 sở hữu báng tay cầm sâu chống mỏi, màn hình xoay lật 180 độ cùng chống rung cảm biến IBIS 5 trục. Thích hợp vừa chụp ảnh du lịch vừa quay vlog sắc nét mượt mà.",
    price_session: 230000,
    price_per_day: 350000,
    price_three_days: 320000,
    price_poster_url: "/images/price-posters/fujifilm-xs10.webp",
    deposit_note: "CCCD gắn chip chính chủ.",
    specifications: {
      "Cảm biến": "APS-C X-Trans CMOS 4 26.1MP",
      "Chống rung": "IBIS 5 trục trong thân máy",
      "Màn hình": "Xoay lật đa góc cảm ứng",
      "Quay video": "4K 30p, Full HD 240p",
      "Trọng lượng": "465g"
    },
    included_items: [
      "Body Fujifilm X-S10",
      "Lens Fujinon zoom kèm theo",
      "2 Pin + Sạc đôi",
      "Thẻ nhớ tốc độ cao 64GB",
      "Túi máy ảnh chống sốc",
      "Đầu đọc thẻ OTG"
    ],
    use_cases: ["Du lịch", "Vlog", "Chân dung", "Màu film"],
    badges: ["Quay & Chụp", "Chống rung IBIS", "Màn xoay lật"],
    is_featured: false,
    is_active: true,
    sort_order: 3,
    seo_title: "Thuê máy ảnh Fujifilm X-S10 tại Đồng Hới Quảng Bình",
    seo_description: "Dịch vụ cho thuê Fujifilm X-S10 kèm lens tại Quảng Bình. Chống rung IBIS, màn xoay lật tiện quay chụp.",
    images: [
      { id: "img-03-1", equipment_id: "e03", image_url: "/images/cameras/fujifilm-xs10.jpg", alt_text: "Fujifilm X-S10 chính diện", is_cover: true, sort_order: 1 },
      { id: "img-03-2", equipment_id: "e03", image_url: "/images/price-posters/fujifilm-xs10.webp", alt_text: "Bảng giá Fujifilm X-S10", is_cover: false, sort_order: 2 }
    ],
    sample_images: [
      { id: "s-03-1", equipment_id: "e03", image_url: "/images/samples/sample-fuji-3.webp", caption: "Phong cảnh thiên nhiên Phong Nha", alt_text: "Sample Fujifilm XS10", sort_order: 1, is_active: true }
    ]
  },
  {
    id: "e04",
    category_id: "c1111111-1111-1111-1111-111111111111",
    brand: "Canon",
    name: "CANON M100",
    slug: "canon-m100",
    short_description: "Màu trắng tinh khôi, nhỏ gọn đút túi, màn hình lật selfie, màu da trắng hồng nịnh mắt.",
    description: "Canon EOS M100 màu trắng là chiếc máy cực kỳ được các bạn nữ yêu thích nhờ thiết kế thon gọn xinh xắn và khả năng chụp ảnh chân dung với tone da sáng hồng đặc trưng của Canon.",
    price_session: 100000,
    price_per_day: 180000,
    price_three_days: 150000,
    price_poster_url: "/images/price-posters/canon-m100.webp",
    deposit_note: "CCCD gắn chip chính chủ.",
    specifications: {
      "Cảm biến": "APS-C CMOS 24.2MP",
      "Lấy nét": "Dual Pixel CMOS AF",
      "Màn hình": "Cảm ứng lật 180 độ selfie",
      "Trọng lượng": "302g siêu nhẹ"
    },
    included_items: [
      "Body Canon EOS M100 White",
      "Lens Canon EF-M 15-45mm IS STM",
      "2 Pin + Sạc pin",
      "Thẻ nhớ 64GB",
      "Túi máy ảnh thời trang",
      "Đầu đọc thẻ OTG"
    ],
    use_cases: ["Selfie", "Du lịch", "Check-in", "Máy nhỏ gọn"],
    badges: ["Trắng xinh", "Da trắng hồng", "Giá tiết kiệm"],
    is_featured: false,
    is_active: true,
    sort_order: 4,
    seo_title: "Thuê máy ảnh Canon M100 màu trắng tại Quảng Bình",
    seo_description: "Cho thuê Canon M100 màu trắng tại Đồng Hới. Màn lật selfie, màu da trắng hồng, máy nhẹ dễ dùng.",
    images: [
      { id: "img-04-1", equipment_id: "e04", image_url: "/images/cameras/canon-m100.jpg", alt_text: "Canon M100 White chính diện", is_cover: true, sort_order: 1 },
      { id: "img-04-2", equipment_id: "e04", image_url: "/images/price-posters/canon-m100.webp", alt_text: "Bảng giá Canon M100", is_cover: false, sort_order: 2 }
    ],
    sample_images: [
      { id: "s-04-1", equipment_id: "e04", image_url: "/images/samples/sample-r50-1.webp", caption: "Tone da sáng mịn tự nhiên của Canon", alt_text: "Ảnh chụp Canon M100", sort_order: 1, is_active: true }
    ]
  },
  {
    id: "e05",
    category_id: "c1111111-1111-1111-1111-111111111111",
    brand: "Canon",
    name: "CANON RP",
    slug: "canon-eos-rp",
    short_description: "Máy ảnh Full-Frame nhẹ nhất hệ EOS R, xóa phông mịn màng, chụp chân dung và phong cảnh xuất sắc.",
    description: "Canon EOS RP mang cảm biến Full-Frame 26.2MP cao cấp trong một thân máy nhỏ gọn 485g. Xóa phông mịt mù, màu ảnh trong trẻo và khả năng chụp đêm không lo nhiễu hạt.",
    price_session: 170000,
    price_per_day: 280000,
    price_three_days: 250000,
    price_poster_url: "/images/price-posters/canon-eos-rp.webp",
    deposit_note: "CCCD gắn chip chính chủ.",
    specifications: {
      "Cảm biến": "Full-Frame CMOS 26.2MP",
      "Bộ xử lý": "DIGIC 8",
      "Lấy nét": "Dual Pixel AF 4779 điểm",
      "Màn hình": "Xoay lật cảm ứng đa góc",
      "Trọng lượng": "485g"
    },
    included_items: [
      "Body Canon EOS RP",
      "Ống kính Canon RF kèm theo",
      "2 Pin dung lượng cao + Sạc",
      "Thẻ nhớ SanDisk 64GB",
      "Túi máy ảnh chống sốc",
      "Đầu đọc thẻ OTG"
    ],
    use_cases: ["Chân dung", "Du lịch", "Full-frame", "Xoá phông", "Couple"],
    badges: ["Full-Frame", "Xoá phông mịn", "Giá rẻ"],
    is_featured: false,
    is_active: true,
    sort_order: 5,
    seo_title: "Thuê máy ảnh Full-Frame Canon EOS RP tại Quảng Bình",
    seo_description: "Cho thuê máy ảnh Full-Frame Canon RP tại Đồng Hới Quảng Bình. Xóa phông chân dung tuyệt đẹp.",
    images: [
      { id: "img-05-1", equipment_id: "e05", image_url: "/images/cameras/canon-rp.jpg", alt_text: "Canon EOS RP chính diện", is_cover: true, sort_order: 1 },
      { id: "img-05-2", equipment_id: "e05", image_url: "/images/price-posters/canon-eos-rp.webp", alt_text: "Bảng giá Canon RP", is_cover: false, sort_order: 2 }
    ],
    sample_images: [
      { id: "s-05-1", equipment_id: "e05", image_url: "/images/samples/sample-r50-3.webp", caption: "Ảnh đôi xóa phông Full-frame", alt_text: "Sample Canon RP", sort_order: 1, is_active: true }
    ]
  },
  {
    id: "e06",
    category_id: "c1111111-1111-1111-1111-111111111111",
    brand: "Canon",
    name: "CANON G7X MARK III",
    slug: "canon-g7x-mark-iii",
    short_description: "Máy ảnh compact du lịch quốc dân, màn lật 180 độ selfie, ống kính khẩu lớn f/1.8-2.8, màu da tươi sáng.",
    description: "Canon G7X Mark III là lựa chọn số 1 cho các bạn trẻ đi du lịch, quay vlog và chụp selfie. Cảm biến 1-inch 20.1MP cùng màu da tươi tắn không cần chỉnh sửa.",
    price_session: 200000,
    price_per_day: 320000,
    price_three_days: 300000,
    price_poster_url: "/images/price-posters/canon-g7x-mark-iii.webp",
    deposit_note: "CCCD gắn chip chính chủ.",
    specifications: {
      "Cảm biến": "1.0-type stacked CMOS 20.1MP",
      "Ống kính": "24-100mm f/1.8-2.8 (Zoom quang 4.2x)",
      "Màn hình": "Cảm ứng 3.0 inch lật 180 độ selfie",
      "Quay video": "4K 30p, Full HD 120p không crop",
      "Trọng lượng": "304g"
    },
    included_items: [
      "Thân máy Canon G7X Mark III",
      "2 Pin dung lượng cao",
      "Sạc pin chính hãng",
      "Thẻ nhớ SanDisk 64GB",
      "Túi chống sốc / Bao da",
      "Đầu đọc thẻ OTG"
    ],
    use_cases: ["Du lịch", "Selfie", "Vlog", "Máy nhỏ gọn"],
    badges: ["Vlog & Selfie", "Màu da đẹp", "Compact"],
    is_featured: true,
    is_active: true,
    sort_order: 6,
    seo_title: "Thuê máy ảnh Canon G7X Mark III tại Đồng Hới Quảng Bình",
    seo_description: "Cho thuê máy ảnh compact du lịch Canon G7X Mark III tại Quảng Bình. Màn lật selfie, màu da đẹp.",
    images: [
      { id: "img-06-1", equipment_id: "e06", image_url: "/images/cameras/canon-g7x-mark3.jpg", alt_text: "Canon G7X Mark III chính diện", is_cover: true, sort_order: 1 },
      { id: "img-06-2", equipment_id: "e06", image_url: "/images/price-posters/canon-g7x-mark-iii.webp", alt_text: "Bảng giá Canon G7X Mark III", is_cover: false, sort_order: 2 }
    ],
    sample_images: [
      { id: "s-06-1", equipment_id: "e06", image_url: "/images/samples/sample-g7x-1.webp", caption: "Selfie da trắng hồng tự nhiên", alt_text: "Ảnh selfie Canon G7X III", sort_order: 1, is_active: true },
      { id: "s-06-2", equipment_id: "e06", image_url: "/images/samples/sample-g7x-2.webp", caption: "Check-in chuyến đi dã ngoại", alt_text: "Ảnh du lịch Canon G7X III", sort_order: 2, is_active: true }
    ]
  },
  {
    id: "e07",
    category_id: "c1111111-1111-1111-1111-111111111111",
    brand: "Canon",
    name: "CANON R50",
    slug: "canon-eos-r50",
    short_description: "Máy ảnh mirrorless thế hệ mới nhỏ gọn 375g, cảm biến 24.2MP, lấy nét mắt Dual Pixel AF II, quay 4K 30p sắc nét.",
    description: "Canon EOS R50 là chiếc máy ảnh được Kiho Camera khuyên dùng hàng đầu cho người mới bắt đầu. Thân máy siêu nhẹ 375g, thao tác cảm ứng trực quan như smartphone, lấy nét nhận diện mắt siêu nhanh và màu da hồng hào tuyệt đẹp.",
    price_session: 150000,
    price_per_day: 250000,
    price_three_days: 230000,
    price_poster_url: "/images/price-posters/canon-eos-r50.webp",
    deposit_note: "CCCD gắn chip chính chủ hoặc cọc linh hoạt.",
    specifications: {
      "Cảm biến": "APS-C CMOS 24.2 Megapixel",
      "Bộ xử lý": "DIGIC X thế hệ mới",
      "Lấy nét": "Dual Pixel CMOS AF II nhận diện người/mắt",
      "Màn hình": "Cảm ứng xoay lật đa góc 3.0 inch",
      "Quay video": "4K 30p không crop (Oversampled 6K)",
      "Trọng lượng": "375g siêu nhẹ"
    },
    included_items: [
      "Thân máy Canon EOS R50",
      "Lens Canon RF-S 18-45mm f/4.5-6.3 IS STM",
      "2 Pin Canon LP-E17 dung lượng cao",
      "Dock sạc đôi nhanh",
      "Thẻ nhớ SanDisk Extreme 64GB / 128GB",
      "Túi máy ảnh chống sốc xịn",
      "Dây đeo cổ",
      "Đầu đọc thẻ OTG cho iPhone & Type-C"
    ],
    use_cases: ["Du lịch", "Chân dung", "Vlog", "Selfie", "Couple", "Kỷ yếu"],
    badges: ["TOP PICK 2026", "Lấy nét Dual Pixel II", "Màu da đẹp", "375g"],
    is_featured: true,
    is_active: true,
    sort_order: 7,
    seo_title: "Thuê máy ảnh Canon EOS R50 tại Quảng Bình - Giá tốt nhất",
    seo_description: "Dịch vụ cho thuê máy ảnh Canon EOS R50 kèm lens tại Đồng Hới, Quảng Bình. Cảm biến 24.2MP, quay 4K 30p, bắt nét mắt siêu nhanh.",
    images: [
      { id: "img-07-1", equipment_id: "e07", image_url: "/images/cameras/canon-r50.jpg", alt_text: "Canon EOS R50 kèm lens kit", is_cover: true, sort_order: 1 },
      { id: "img-07-2", equipment_id: "e07", image_url: "/images/price-posters/canon-eos-r50.webp", alt_text: "Bảng giá Canon EOS R50", is_cover: false, sort_order: 2 }
    ],
    sample_images: [
      { id: "s-07-1", equipment_id: "e07", image_url: "/images/samples/sample-r50-1.webp", caption: "Màu da trắng hồng tự nhiên tại Phong Nha", alt_text: "Ảnh chụp Canon R50", sort_order: 1, is_active: true },
      { id: "s-07-2", equipment_id: "e07", image_url: "/images/samples/sample-r50-2.webp", caption: "Bãi biển Nhật Lệ dưới nắng hè", alt_text: "Ảnh biển Canon R50", sort_order: 2, is_active: true },
      { id: "s-07-3", equipment_id: "e07", image_url: "/images/samples/sample-r50-3.webp", caption: "Khoảnh khắc hẹn hò couple lãng mạn", alt_text: "Ảnh couple Canon R50", sort_order: 3, is_active: true },
      { id: "s-07-4", equipment_id: "e07", image_url: "/images/samples/sample-r50-4.webp", caption: "Chi tiết phong cảnh suối Nước Moọc", alt_text: "Ảnh thiên nhiên Canon R50", sort_order: 4, is_active: true }
    ]
  },
  {
    id: "e08",
    category_id: "c1111111-1111-1111-1111-111111111111",
    brand: "Canon",
    name: "CANON M3",
    slug: "canon-m3",
    short_description: "Gọn nhẹ kèm lens zoom, báng cầm đầm tay, thích hợp chụp check-in du lịch biển và gia đình.",
    description: "Canon EOS M3 là dòng máy mirrorless nhỏ gọn, trang bị cảm biến 24.2MP và màn hình lật tiện lợi, giá thuê siêu tiết kiệm cho học sinh, sinh viên và khách du lịch.",
    price_session: 110000,
    price_per_day: 180000,
    price_three_days: 150000,
    price_poster_url: "/images/price-posters/canon-m3.webp",
    deposit_note: "CCCD gắn chip chính chủ.",
    specifications: {
      "Cảm biến": "APS-C CMOS 24.2MP",
      "Lấy nét": "Hybrid CMOS AF III 49 điểm",
      "Màn hình": "Cảm ứng lật 180 độ",
      "Trọng lượng": "366g"
    },
    included_items: [
      "Body Canon EOS M3",
      "Lens zoom EF-M",
      "2 Pin + Sạc",
      "Thẻ nhớ 64GB",
      "Túi chống sốc",
      "Đầu đọc thẻ OTG"
    ],
    use_cases: ["Du lịch", "Check-in", "Tiết kiệm"],
    badges: ["Tiết kiệm", "Dễ chụp"],
    is_featured: false,
    is_active: true,
    sort_order: 8,
    seo_title: "Thuê máy ảnh Canon M3 tại Quảng Bình",
    seo_description: "Cho thuê máy ảnh Canon EOS M3 giá rẻ tại Đồng Hới Quảng Bình.",
    images: [
      { id: "img-08-1", equipment_id: "e08", image_url: "/images/cameras/canon-m3.jpg", alt_text: "Canon M3 chính diện", is_cover: true, sort_order: 1 },
      { id: "img-08-2", equipment_id: "e08", image_url: "/images/price-posters/canon-m3.webp", alt_text: "Bảng giá Canon M3", is_cover: false, sort_order: 2 }
    ],
    sample_images: [
      { id: "s-08-1", equipment_id: "e08", image_url: "/images/samples/sample-r50-2.webp", caption: "Ảnh chụp du lịch biển", alt_text: "Sample Canon M3", sort_order: 1, is_active: true }
    ]
  },
  {
    id: "e09",
    category_id: "c1111111-1111-1111-1111-111111111111",
    brand: "Sony",
    name: "SONY ZV1 MARK II",
    slug: "sony-zv1-mark-ii",
    short_description: "Ống kính góc siêu rộng 18-50mm, mic 3 hướng thông minh, lấy nét nhận diện nhiều gương mặt.",
    description: "Sony ZV-1 II là chiếc máy quay vlog du lịch đỉnh cao thế hệ mới. Ống kính góc siêu rộng 18-50mm giúp quay chụp selfie nhóm không bị gò bó, màu da tươi sáng và chống rung mượt mà.",
    price_session: 130000,
    price_per_day: 200000,
    price_three_days: 180000,
    price_poster_url: "/images/price-posters/sony-zv1-mark-ii.webp",
    deposit_note: "CCCD gắn chip chính chủ.",
    specifications: {
      "Cảm biến": "1.0-type Exmor RS CMOS 20.1MP",
      "Ống kính": "ZEISS Vario-Sonnar T* 18-50mm f/1.8-4.0",
      "Màn hình": "Xoay lật cảm ứng đa góc",
      "Âm thanh": "Micro 3 đầu thu định hướng + Lọc gió",
      "Trọng lượng": "292g"
    },
    included_items: [
      "Thân máy Sony ZV-1 II",
      "Bông lọc gió chuyên dụng",
      "2 Pin Sony dung lượng cao",
      "Sạc nhanh Type-C",
      "Thẻ nhớ SanDisk Extreme 64GB",
      "Túi chống sốc",
      "Đầu đọc thẻ OTG"
    ],
    use_cases: ["Vlog", "Du lịch", "Selfie", "TikTok", "Check-in"],
    badges: ["TOP PICK", "Góc rộng 18mm", "Vlog đỉnh cao"],
    is_featured: true,
    is_active: true,
    sort_order: 9,
    seo_title: "Thuê máy ảnh vlog Sony ZV-1 II tại Quảng Bình",
    seo_description: "Cho thuê máy quay vlog Sony ZV-1 Mark II góc rộng 18-50mm tại Đồng Hới Quảng Bình.",
    images: [
      { id: "img-09-1", equipment_id: "e09", image_url: "/images/cameras/sony-zv1-mark2.jpg", alt_text: "Sony ZV-1 II chính diện", is_cover: true, sort_order: 1 },
      { id: "img-09-2", equipment_id: "e09", image_url: "/images/price-posters/sony-zv1-mark-ii.webp", alt_text: "Bảng giá Sony ZV-1 II", is_cover: false, sort_order: 2 }
    ],
    sample_images: [
      { id: "s-09-1", equipment_id: "e09", image_url: "/images/samples/sample-sony-1.webp", caption: "Góc rộng 18mm quay chụp sắc nét", alt_text: "Sample Sony ZV1 II", sort_order: 1, is_active: true },
      { id: "s-09-2", equipment_id: "e09", image_url: "/images/samples/sample-sony-2.webp", caption: "Chi tiết màu da tươi sáng tự nhiên", alt_text: "Portrait Sony ZV1 II", sort_order: 2, is_active: true }
    ]
  },
  {
    id: "e10",
    category_id: "c1111111-1111-1111-1111-111111111111",
    brand: "Sony",
    name: "SONY ZV1F",
    slug: "sony-zv1f",
    short_description: "Thân máy màu trắng thời trang, góc siêu rộng 20mm chụp nhóm, chống rung mượt mà cho TikTok & Reels.",
    description: "Sony ZV-1F màu trắng siêu xinh được tối ưu hóa cho quay video khung dọc TikTok và Reels. Ống kính góc cố định 20mm f/2.0 giúp bạn luôn nổi bật trong khung hình.",
    price_session: 90000,
    price_per_day: 150000,
    price_three_days: 130000,
    price_poster_url: "/images/price-posters/sony-zv1f.webp",
    deposit_note: "CCCD gắn chip chính chủ.",
    specifications: {
      "Cảm biến": "1.0-type Exmor RS CMOS 20.1MP",
      "Ống kính": "Góc siêu rộng 20mm f/2.0",
      "Màn hình": "Xoay lật cảm ứng",
      "Trọng lượng": "256g siêu nhẹ"
    },
    included_items: [
      "Thân máy Sony ZV-1F White",
      "Bông lọc gió",
      "2 Pin + Cáp sạc",
      "Thẻ nhớ 64GB",
      "Túi máy ảnh thời trang",
      "Đầu đọc thẻ OTG"
    ],
    use_cases: ["TikTok", "Vlog", "Selfie", "Máy nhỏ gọn"],
    badges: ["TikTok & Reels", "Màu trắng xinh", "Giá rẻ"],
    is_featured: false,
    is_active: true,
    sort_order: 10,
    seo_title: "Thuê máy ảnh Sony ZV-1F màu trắng tại Quảng Bình",
    seo_description: "Cho thuê máy quay TikTok Sony ZV-1F tại Đồng Hới Quảng Bình. Giá chỉ từ 90K.",
    images: [
      { id: "img-10-1", equipment_id: "e10", image_url: "/images/cameras/sony-zv1f.jpg", alt_text: "Sony ZV-1F White chính diện", is_cover: true, sort_order: 1 },
      { id: "img-10-2", equipment_id: "e10", image_url: "/images/price-posters/sony-zv1f.webp", alt_text: "Bảng giá Sony ZV-1F", is_cover: false, sort_order: 2 }
    ],
    sample_images: [
      { id: "s-10-1", equipment_id: "e10", image_url: "/images/samples/sample-sony-2.webp", caption: "Ảnh chụp góc rộng 20mm", alt_text: "Sample Sony ZV1F", sort_order: 1, is_active: true }
    ]
  },
  {
    id: "e11",
    category_id: "c1111111-1111-1111-1111-111111111111",
    brand: "Canon",
    name: "CANON M",
    slug: "canon-m",
    short_description: "Thân máy kim loại nguyên khối cổ điển, siêu nhỏ gọn bỏ túi, giá thuê siêu hạt dẻ cho người mới.",
    description: "Canon EOS M nguyên bản với cảm biến APS-C 18MP và thiết kế kim loại đầm tay. Lựa chọn tuyệt vời cho các chuyến đi ngắn ngày với chi phí tiết kiệm nhất.",
    price_session: 90000,
    price_per_day: 150000,
    price_three_days: 130000,
    price_poster_url: "/images/price-posters/canon-m.webp",
    deposit_note: "CCCD gắn chip chính chủ.",
    specifications: {
      "Cảm biến": "APS-C CMOS 18.0MP",
      "Lấy nét": "Hybrid CMOS AF",
      "Màn hình": "Cảm ứng Clear View II 3.0 inch",
      "Trọng lượng": "298g"
    },
    included_items: [
      "Body Canon EOS M",
      "Lens pancake EF-M",
      "2 Pin + Sạc",
      "Thẻ nhớ 64GB",
      "Túi chống sốc",
      "Đầu đọc thẻ OTG"
    ],
    use_cases: ["Du lịch", "Check-in", "Tiết kiệm"],
    badges: ["Giá siêu rẻ", "Kim loại cổ điển"],
    is_featured: false,
    is_active: true,
    sort_order: 11,
    seo_title: "Thuê máy ảnh Canon M giá rẻ tại Quảng Bình",
    seo_description: "Cho thuê Canon EOS M tại Đồng Hới Quảng Bình. Giá thuê chỉ từ 90K.",
    images: [
      { id: "img-11-1", equipment_id: "e11", image_url: "/images/cameras/canon-m.jpg", alt_text: "Canon M chính diện", is_cover: true, sort_order: 1 },
      { id: "img-11-2", equipment_id: "e11", image_url: "/images/price-posters/canon-m.webp", alt_text: "Bảng giá Canon M", is_cover: false, sort_order: 2 }
    ],
    sample_images: [
      { id: "s-11-1", equipment_id: "e11", image_url: "/images/samples/sample-r50-4.webp", caption: "Ảnh chụp dã ngoại cuối tuần", alt_text: "Sample Canon M", sort_order: 1, is_active: true }
    ]
  },
  {
    id: "e12",
    category_id: "c1111111-1111-1111-1111-111111111111",
    brand: "Canon",
    name: "CANON IXY 640",
    slug: "canon-ixy-640",
    short_description: "Digicam Y2K hoài niệm, màu ảnh flash đêm nghệ thuật cực hot trend, nhỏ gọn đút vừa túi áo.",
    description: "Canon IXY 640 là chiếc máy ảnh kỹ thuật số cổ điển mang trọn vẹn vibe Y2K hoài niệm. Chụp ảnh đêm đánh flash tạo chất ảnh hạt vintage độc lạ không lẫn vào đâu được.",
    price_session: 80000,
    price_per_day: 120000,
    price_three_days: 100000,
    price_poster_url: "/images/price-posters/canon-ixy-640.webp",
    deposit_note: "CCCD gắn chip chính chủ.",
    specifications: {
      "Cảm biến": "High-Sensitivity CMOS 20.2MP",
      "Ống kính": "Zoom quang học 12x",
      "Đèn Flash": "Flash tích hợp đánh sáng nghệ thuật Y2K",
      "Trọng lượng": "147g siêu nhẹ bỏ túi áo"
    },
    included_items: [
      "Máy ảnh Canon IXY 640 Silver",
      "2 Pin dung lượng cao",
      "Sạc pin",
      "Thẻ nhớ SD tốc độ cao",
      "Bao da mini vintage",
      "Dây đeo tay",
      "Đầu đọc thẻ OTG"
    ],
    use_cases: ["Y2K", "Check-in", "Flash đêm", "Máy nhỏ gọn"],
    badges: ["Trend Y2K", "Flash đêm nghệ", "Nhỏ gọn"],
    is_featured: true,
    is_active: true,
    sort_order: 12,
    seo_title: "Thuê máy ảnh Digicam Y2K Canon IXY 640 tại Quảng Bình",
    seo_description: "Cho thuê máy ảnh vintage Canon IXY 640 tại Đồng Hới Quảng Bình. Màu ảnh flash Y2K siêu hot trend.",
    images: [
      { id: "img-12-1", equipment_id: "e12", image_url: "/images/cameras/canon-ixy640.jpg", alt_text: "Canon IXY 640 Silver chính diện", is_cover: true, sort_order: 1 },
      { id: "img-12-2", equipment_id: "e12", image_url: "/images/price-posters/canon-ixy-640.webp", alt_text: "Bảng giá Canon IXY 640", is_cover: false, sort_order: 2 }
    ],
    sample_images: [
      { id: "s-12-1", equipment_id: "e12", image_url: "/images/samples/sample-y2k-1.webp", caption: "Chụp flash đêm vibe Y2K hoài niệm", alt_text: "Ảnh flash Canon IXY 640", sort_order: 1, is_active: true },
      { id: "s-12-2", equipment_id: "e12", image_url: "/images/samples/sample-y2k-2.webp", caption: "Tone màu vintage không cần chỉnh sửa", alt_text: "Ảnh vintage Canon IXY 640", sort_order: 2, is_active: true }
    ]
  }
];

export const MOCK_FEEDBACK: Feedback[] = [];

export const USE_CASE_LIST = [
  {
    title: "Du lịch & Check-in",
    tag: "Du lịch",
    icon: "Palmtree",
    desc: "Máy gọn nhẹ, pin trâu, màu da tươi tắn khi đi động Thiên Đường, bãi đá Nhảy...",
  },
  {
    title: "Couple & Hẹn hò",
    tag: "Couple",
    icon: "User",
    desc: "Màu film hoài niệm, xoá phông mịn màng cho những khung hình đôi lãng mạn.",
  },
  {
    title: "Vlog & TikTok",
    tag: "Vlog",
    icon: "Video",
    desc: "Màn hình lật xoay, chống rung mượt mà, hỗ trợ mic thu âm chống gió tốt.",
  },
  {
    title: "Y2K & Digicam",
    tag: "Y2K",
    icon: "Sparkles",
    desc: "Chất ảnh flash retro vintage hoài niệm hot trend không đụng hàng.",
  }
];
