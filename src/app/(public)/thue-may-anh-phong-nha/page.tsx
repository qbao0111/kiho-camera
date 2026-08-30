import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Camera,
  MapPin,
  Shield,
  Compass,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { getSiteSettings } from "@/lib/services/settings";
import { getEquipmentList } from "@/lib/services/equipment";
import { BreadcrumbJsonLd } from "@/components/public/json-ld";
import { FadeIn } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Thuê máy ảnh đi Phong Nha: Gợi ý chọn máy & Kinh nghiệm",
  description:
    "Kinh nghiệm thuê máy ảnh du lịch đi Phong Nha - Kẻ Bàng: Gợi ý chọn dòng máy phù hợp cho Động Thiên Đường, Sông Son, Suối Moọc. Kèm 2 pin, thẻ nhớ và đầu đọc OTG.",
  alternates: {
    canonical: "/thue-may-anh-phong-nha",
  },
  openGraph: {
    title: "Thuê máy ảnh đi Phong Nha: Gợi ý chọn máy & Kinh nghiệm | Kiho Camera",
    description:
      "Gợi ý chọn dòng máy ảnh du lịch Canon, Fujifilm, Sony phù hợp cho chuyến đi Phong Nha - Kẻ Bàng. Nhận máy tại Đồng Hới, kèm 2 pin, sạc và thẻ nhớ.",
    url: "/thue-may-anh-phong-nha",
    type: "article",
    images: [
      {
        url: "/images/landing/hero-quang-binh.webp",
        width: 1200,
        height: 630,
        alt: "Thuê máy ảnh du lịch đi Phong Nha - Kiho Camera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thuê máy ảnh đi Phong Nha: Gợi ý chọn máy & Kinh nghiệm",
    description:
      "Kinh nghiệm chọn máy ảnh du lịch Canon, Fujifilm, Sony cho chuyến đi Phong Nha, Động Thiên Đường, Suối Moọc.",
  },
};

interface RecommendedModelMeta {
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  badge: string;
  highlights: string[];
  bestFor: string;
}

const RECOMMENDED_MODELS: RecommendedModelMeta[] = [
  {
    slug: "canon-eos-r50",
    name: "Canon EOS R50",
    brand: "Canon",
    tagline: "Thân máy mirrorless nhỏ gọn, thao tác cảm ứng trực quan",
    badge: "Phổ biến nhất",
    highlights: [
      "Lấy nét tự động Dual Pixel CMOS AF II nhận diện người, khuôn mặt và mắt",
      "Tông màu ảnh tươi tắn, thân thiện và dễ làm quen cho người mới",
      "Kèm ống kính zoom Canon RF-S 18-45mm IS STM hỗ trợ chống rung quang học",
    ],
    bestFor: "Chụp gia đình, cặp đôi, nhóm bạn đi Động Thiên Đường, Phong Nha",
  },
  {
    slug: "fujifilm-x100v",
    name: "Fujifilm X100V",
    brand: "Fujifilm",
    tagline: "Thiết kế rangefinder gọn nhẹ, màu ảnh JPEG và Film Simulation đặc trưng",
    badge: "Màu Film",
    highlights: [
      "Bộ giả lập màu Film Simulation của Fujifilm, nổi bật với Classic Negative",
      "Thiết kế rangefinder kim loại cổ điển, kính ngắm lai OVF/EVF",
      "Ống kính cố định Fujinon 23mm f/2 (tương đương 35mm trên Full-Frame)",
    ],
    bestFor: "Dạo chơi Phong Nha, cafe ngắm Sông Son, ảnh đời thường và streetlife",
  },
  {
    slug: "canon-g7x-mark-iii",
    name: "Canon G7 X Mark III",
    brand: "Canon",
    tagline: "Máy compact bỏ túi, zoom linh hoạt cho ảnh check-in và clip ngắn",
    badge: "Bỏ túi",
    highlights: [
      "Ống kính zoom 24-100mm f/1.8-2.8 tích hợp chống rung quang học",
      "Màn hình cảm ứng lật 180 độ hỗ trợ selfie và bố cục linh hoạt",
      "Thiết kế bỏ túi gọn nhẹ (khoảng 304g), hỗ trợ quay video 4K",
    ],
    bestFor: "Người thích máy nhỏ gọn, chụp check-in nhanh, quay clip du lịch ngắn",
  },
  {
    slug: "sony-zv1-mark-ii",
    name: "Sony ZV-1 Mark II",
    brand: "Sony",
    tagline: "Máy quay vlog nhỏ gọn với góc rộng 18mm và micro 3 capsule kèm windscreen",
    badge: "Quay Vlog",
    highlights: [
      "Ống kính góc rộng 18-50mm thuận tiện tự quay vlog cầm tay",
      "Micro 3 capsule định hướng kèm bông lọc gió (windscreen) hỗ trợ ngoài trời",
      "Màn hình xoay lật đa góc và tính năng Creative Look tùy chỉnh tông màu",
    ],
    bestFor: "Quay vlog hành trình trên thuyền Sông Son, review du lịch",
  },
  {
    slug: "fujifilm-xs10",
    name: "Fujifilm X-S10",
    brand: "Fujifilm",
    tagline: "Báng cầm chắc chắn, chống rung IBIS và 18 Film Simulation",
    badge: "Trekking & Cảnh quan",
    highlights: [
      "Hệ thống chống rung cảm biến IBIS 5 trục hỗ trợ chụp thiếu sáng",
      "Báng cầm tay sâu công thái học đầm chắc khi di chuyển",
      "Màn hình xoay lật đa góc và 18 chế độ Film Simulation của Fujifilm",
    ],
    bestFor: "Tour khám phá thiên nhiên, trekking Vườn quốc gia Phong Nha",
  },
];

const FAQS = [
  {
    q: "Thuê máy ảnh tại Đồng Hới mang lên Phong Nha có tiện lợi không?",
    a: "Rất tiện lợi. TP. Đồng Hới là trung tâm giao thông chính (sân bay, ga tàu, bến xe) trước khi du khách di chuyển lên Phong Nha (khoảng 45km, mất 45–50 phút đi xe). Bạn có thể nhận máy tại cửa hàng 48 Ngô Quyền hoặc hẹn Kiho giao máy tận khách sạn/ga tàu từ sáng sớm để sẵn sàng cho chuyến đi cả ngày.",
  },
  {
    q: "Chụp ảnh trong Động Thiên Đường hoặc Động Phong Nha có bị tối không?",
    a: "Bên trong các hang động có hệ thống đèn chiếu sáng điểm nhưng tổng thể vẫn là môi trường thiếu sáng. Để có ảnh rõ nét, bạn nên giữ chắc tay khi bấm chụp, tăng nhẹ ISO (lên 800 - 1600) hoặc chọn các dòng máy có chống rung cảm biến như Fujifilm X-S10 hay ống kính chống rung quang học như Canon R50 (RF-S 18-45mm IS STM). Đội ngũ Kiho sẽ hướng dẫn bạn cài đặt thông số cơ bản trước khi nhận máy.",
  },
  {
    q: "Đi Suối Nước Moọc hoặc Sông Chày - Hang Tối cần lưu ý gì để bảo quản máy?",
    a: "Các dòng máy ảnh du lịch không chống nước ngâm chìm. Khi tham gia các hoạt động chèo thuyền kayak, đu zipline hoặc tắm suối, bạn hãy cất máy trong túi chống sốc kèm túi chống nước chuyên dụng, chỉ mang máy ra chụp khi đã đứng vững ở vị trí khô ráo an toàn trên bờ.",
  },
  {
    q: "Thủ tục thuê máy tại Kiho Camera có cần đặt cọc tiền không?",
    a: "Kiho áp dụng chính sách không yêu cầu đặt cọc tiền máy. Khi thuê, bạn chỉ cần liên hệ và xác minh thông tin qua ảnh CCCD gắn chip chính chủ hoặc tài khoản định danh điện tử VNeID.",
  },
  {
    q: "Làm thế nào để lấy ảnh từ máy ảnh sang điện thoại ngay trong chuyến đi?",
    a: "Trọn bộ thuê máy tại Kiho luôn đi kèm đầu đọc thẻ nhớ OTG hỗ trợ kết nối trực tiếp với điện thoại (cổng Lightning cho iPhone và cổng Type-C cho Android / iPhone 15 trở lên). Bạn chỉ cần cắm thẻ nhớ vào đầu đọc và kết nối với điện thoại là có thể xem và lưu ảnh về máy nhanh chóng.",
  },
];

export default async function PhongNhaGuidePage() {
  const settings = await getSiteSettings();
  const allEquipment = await getEquipmentList({ onlyActive: true });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";

  // Map database equipment by slug for dynamic pricing
  const equipmentMap = new Map(allEquipment.map((e) => [e.slug, e]));

  return (
    <div className="bg-[#faf8f5] text-ink-900 min-h-screen py-8 pb-24 md:pb-16">
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Thuê máy ảnh Phong Nha", url: "/thue-may-anh-phong-nha" },
        ]}
        siteUrl={siteUrl}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Bar */}
        <FadeIn direction="none" className="flex items-center gap-2 text-xs font-sans text-ink-600">
          <Link href="/" className="hover:text-ink-900 transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-ink-900 font-semibold">Thuê máy ảnh Phong Nha</span>
        </FadeIn>

        {/* HERO SECTION */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-200 text-forest-700 text-xs font-semibold tracking-wide">
            <Compass className="w-3.5 h-3.5" />
            <span>Cẩm nang du lịch & thiết bị Quảng Bình</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink-950 leading-[1.2]">
            Thuê máy ảnh đi Phong Nha: Chọn máy nào phù hợp cho chuyến đi?
          </h1>

          <p className="font-sans text-base sm:text-lg text-ink-600 leading-relaxed">
            Vườn quốc gia Phong Nha - Kẻ Bàng với những hang động kỳ vĩ, dòng sông Son xanh ngọc bích và rừng nguyên sinh bạt ngàn là điểm đến không thể bỏ qua khi tới Quảng Bình. Để lưu giữ trọn vẹn vẻ đẹp này, một chiếc máy ảnh du lịch chuyên dụng sẽ giúp bạn bắt trọn từng khoảnh khắc với độ chi tiết và màu sắc tự nhiên cho chuyến đi.
          </p>
        </div>

        {/* SECTION 1: LỘ TRÌNH & THỰC TẾ DI CHUYỂN */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-sand-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink-900">
              Nhận máy tại Đồng Hới trước khi lên Phong Nha
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-ink-600 leading-relaxed">
            Khoảng cách từ trung tâm TP. Đồng Hới lên thị trấn Phong Nha là khoảng <strong>45 km</strong> (mất chừng 45–50 phút đi xe máy hoặc taxi/ô tô theo đường mòn Hồ Chí Minh). Việc nhận máy ảnh tại Đồng Hới mang lại nhiều lợi thế:
          </p>
          <ul className="space-y-2.5 font-sans text-sm sm:text-base text-ink-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-forest-600 mt-1 flex-shrink-0" />
              <span><strong>Chủ động thời gian:</strong> Nhận máy từ sáng sớm để kịp khởi hành các tour tham quan hang động lúc trời còn mát mẻ.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-forest-600 mt-1 flex-shrink-0" />
              <span><strong>Được kiểm tra máy và hướng dẫn chu đáo:</strong> Nhân viên Kiho sẽ kiểm tra pin, thẻ nhớ và hướng dẫn bạn các thao tác cơ bản trước khi lên đường.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-forest-600 mt-1 flex-shrink-0" />
              <span><strong>Hỗ trợ giao nhận tận nơi:</strong> Giao máy trực tiếp tại khách sạn, homestay hoặc ga tàu Đồng Hới theo lịch hẹn của bạn.</span>
            </li>
          </ul>
        </section>

        {/* SECTION 2: GỢI Ý MÁY CHO TỪNG ĐIỂM ĐẾN PHONG NHA */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">
              Gợi ý các dòng máy ảnh phù hợp cho chuyến đi Phong Nha
            </h2>
            <p className="font-sans text-sm sm:text-base text-ink-600">
              Dưới đây là các mẫu máy ảnh thực tế đang có sẵn tại Kiho Camera, được phân loại theo từng nhu cầu trải nghiệm:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {RECOMMENDED_MODELS.map((model) => {
              const eq = equipmentMap.get(model.slug);
              const priceText = eq?.price_session
                ? `Từ ${Math.round(eq.price_session / 1000)}K / buổi`
                : eq?.price_per_day
                ? `Từ ${Math.round(eq.price_per_day / 1000)}K / ngày`
                : null;

              return (
                <div
                  key={model.slug}
                  className="bg-white rounded-2xl p-6 border border-sand-200 shadow-sm hover:border-sand-300 transition-all space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-display text-lg sm:text-xl font-bold text-ink-950">
                          {model.name}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-sand-100 text-ink-700 text-xs font-medium">
                          {model.badge}
                        </span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-ink-600 mt-0.5">
                        {model.tagline}
                      </p>
                    </div>
                    {priceText && (
                      <div className="text-right">
                        <span className="font-mono text-sm font-semibold text-accent">
                          {priceText}
                        </span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-1.5 font-sans text-xs sm:text-sm text-ink-600">
                    {model.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-sand-100 flex flex-wrap items-center justify-between gap-3">
                    <p className="font-sans text-xs text-ink-600 italic">
                      <strong>Phù hợp nhất:</strong> {model.bestFor}
                    </p>
                    <Link
                      href={`/thiet-bi/${model.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <span>Xem chi tiết máy</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* SECTION 3: KINH NGHIỆM CHỤP & BẢO QUẢN MÁY TẠI PHONG NHA */}
        <section className="bg-sand-50 rounded-2xl p-6 sm:p-8 border border-sand-200 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-forest-100 flex items-center justify-center text-forest-700">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink-900">
              Lưu ý quan trọng khi mang máy ảnh đi Phong Nha
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-xl border border-sand-200/80 space-y-2">
              <h3 className="font-sans text-sm font-bold text-ink-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-forest-600" />
                Chụp trong Hang Động (Thiên Đường, Phong Nha)
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed">
                Độ ẩm trong hang rất cao. Bạn <strong>không nên tháo đổi ống kính</strong> khi đang ở bên trong hang để tránh hơi ẩm bám vào cảm biến. Hãy giữ chắc hai tay khi chụp hoặc tựa nhẹ vào lan can gỗ để giảm thiểu rung máy.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-sand-200/80 space-y-2">
              <h3 className="font-sans text-sm font-bold text-ink-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Đi Suối Nước Moọc & Sông Chày
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed">
                Khi tham gia chèo kayak, bơi lội hoặc đi thuyền, luôn để máy trong túi chống sốc và bảo quản trong túi chống nước (dry-bag). Tuyệt đối không để máy tiếp xúc trực tiếp với nước suối.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-sand-200/80 space-y-2">
              <h3 className="font-sans text-sm font-bold text-ink-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-forest-600" />
                Chuẩn bị Pin và Sạc
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed">
                Chuyến đi Phong Nha thường kéo dài cả ngày. Kiho luôn chuẩn bị sẵn <strong>2 pin kèm sạc</strong> để bạn yên tâm sử dụng trong suốt chuyến tham quan trong ngày.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-sand-200/80 space-y-2">
              <h3 className="font-sans text-sm font-bold text-ink-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Lấy ảnh sang điện thoại tiện lợi
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed">
                Sau khi kết thúc buổi tham quan, bạn có thể dùng đầu đọc thẻ OTG kèm theo túi máy cắm trực tiếp vào điện thoại để xem và lưu ảnh về máy nhanh chóng.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: FAQS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sand-200 flex items-center justify-center text-ink-700">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">
              Câu hỏi thường gặp khi thuê máy ảnh đi Phong Nha
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-sand-200 space-y-2"
              >
                <h3 className="font-sans text-sm sm:text-base font-bold text-ink-900">
                  {faq.q}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: CTA BANNER */}
        <section className="bg-ink-950 text-sand-50 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Kiho Camera • Đồng Hới, Quảng Bình
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-sand-100">
              Sẵn sàng cho chuyến đi Phong Nha trọn vẹn?
            </h2>
            <p className="font-sans text-sm sm:text-base text-sand-400">
              Liên hệ với Kiho để nhận tư vấn chọn máy ảnh phù hợp nhất với lịch trình du lịch và sở thích chụp ảnh của bạn.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/thiet-bi"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-sans text-sm font-semibold hover:bg-accent-hover transition-all shadow-md"
            >
              <Camera className="w-4 h-4" />
              <span>Xem danh sách 12 máy ảnh</span>
            </Link>

            <a
              href={settings.messenger_url || "https://m.me/kihocameradonghoi"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-sand-100 font-sans text-sm font-semibold hover:bg-white/20 transition-all border border-white/15"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Nhắn tin tư vấn giữ máy</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
