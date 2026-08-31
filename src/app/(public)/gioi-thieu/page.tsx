import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Camera,
  Navigation,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Sparkles,
  PackageCheck,
} from "lucide-react";
import { getSiteSettings } from "@/lib/services/settings";
import { getStorefrontImages } from "@/lib/services/storefront";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/public/json-ld";
import { normalizePhoneNumber, buildZaloUrl } from "@/lib/utils";
import { TrackedOutboundLink } from "@/components/analytics/tracked-outbound-link";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Giới thiệu Kiho Camera — Cửa hàng thuê máy ảnh tại Đồng Hới",
  description:
    "Kiho Camera là dịch vụ cho thuê máy ảnh du lịch tại 48 Ngô Quyền, Đồng Hới, Quảng Bình. Cung cấp Canon, Fujifilm, Sony kèm 2 pin, sạc và thẻ nhớ 64GB.",
  alternates: {
    canonical: "/gioi-thieu",
  },
};

export default async function AboutPage() {
  const [settings, storefrontImages] = await Promise.all([
    getSiteSettings(),
    getStorefrontImages({ onlyActive: true }),
  ]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";
  const address = settings.address || "48 Ngô Quyền, TP. Đồng Hới, Tỉnh Quảng Bình";
  const phone = settings.phone || "0387 274 669";
  const mapUrl = settings.maps_url || "https://maps.app.goo.gl/3Hh3G8uLymxQn6r98";

  const primaryCover = storefrontImages.find((img) => img.is_cover) || storefrontImages[0];

  return (
    <div className="bg-[#faf8f5] min-h-screen py-10 sm:py-16">
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Giới thiệu", url: "/gioi-thieu" },
        ]}
        siteUrl={siteUrl}
      />
      <ArticleJsonLd
        title="Giới thiệu Kiho Camera — Cửa hàng thuê máy ảnh tại Đồng Hới"
        description="Kiho Camera là dịch vụ cho thuê máy ảnh du lịch tại 48 Ngô Quyền, TP. Đồng Hới, Quảng Bình."
        url="/gioi-thieu"
        siteUrl={siteUrl}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header Eyebrow & Title */}
        <header className="space-y-3 border-b border-ink-200 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-ink-600 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>VỀ CHÚNG TÔI · ABOUT KIHO CAMERA</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink-900 tracking-tight leading-[1.15]">
            Đồng hành cùng mọi chuyến đi tại Quảng Bình
          </h1>
          <p className="font-sans text-base sm:text-lg text-ink-600 leading-relaxed font-normal pt-1">
            Kiho Camera là dịch vụ cho thuê máy ảnh tại <strong className="text-ink-900 font-semibold">{address}</strong>, mang đến cho bạn những thiết bị chụp ảnh du lịch chất lượng cao, dễ dùng và trọn gói phụ kiện.
          </p>
        </header>

        {/* Storefront Visual Showcase */}
        {primaryCover && (
          <figure className="space-y-2.5">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-canvas-200 border border-ink-200/80 shadow-xs">
              <Image
                src={primaryCover.image_url}
                alt={primaryCover.alt_text || `Cửa hàng Kiho Camera tại ${address}`}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 bg-ink-900/85 backdrop-blur-xs text-white text-[11px] font-mono font-medium px-3 py-1 rounded-md border border-white/20 flex items-center gap-1.5 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>48 NGÔ QUYỀN, ĐỒNG HỚI</span>
              </div>
            </div>
            {primaryCover.caption && (
              <figcaption className="text-xs font-sans text-ink-500 text-center italic">
                {primaryCover.caption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Editorial Content Blocks */}
        <section className="space-y-8 font-sans text-ink-800 leading-relaxed text-sm sm:text-base">
          
          <div className="space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">
              Câu chuyện & Định hướng của Kiho Camera
            </h2>
            <p className="text-ink-700 leading-relaxed">
              Quảng Bình sở hữu cảnh sắc thiên nhiên độc đáo — từ làn nước xanh ngọc của suối Nước Moọc, vẻ tráng lệ kỳ ảo của động Phong Nha và Thiên Đường, đến những đồi cát trắng trải dài ở Quang Phú hay hoàng hôn yên bình trên biển Nhật Lệ. Tuy nhiên, điện thoại thông thường thường gặp khó khăn khi chụp thiếu sáng trong hang hoặc cần bắt trọn chiều sâu quang học của phong cảnh.
            </p>
            <p className="text-ink-700 leading-relaxed">
              Kiho Camera ra đời với mong muốn giúp mọi du khách, nhóm bạn và gia đình khi đặt chân đến Đồng Hới đều có thể dễ dàng tiếp cận những dòng máy ảnh du lịch tốt nhất như <strong className="text-ink-900 font-semibold">Fujifilm X100VI, Canon EOS R50, Sony ZV-1 II</strong> mà không cần đầu tư chi phí mua máy đắt đỏ.
            </p>
          </div>

          {/* 3 Core Guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-canvas-100 rounded-xl p-5 border border-ink-200/80 space-y-2 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-accent/15 text-accent flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-ink-900">
                Không giữ tiền cọc máy
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                Tạo điều kiện tối đa cho khách du lịch. Bạn chỉ cần xuất trình CCCD hoặc VNeID chính chủ để làm hợp đồng bàn giao.
              </p>
            </div>

            <div className="bg-canvas-100 rounded-xl p-5 border border-ink-200/80 space-y-2 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-accent/15 text-accent flex items-center justify-center font-bold">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-ink-900">
                Trọn gói phụ kiện đi kèm
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                Mỗi máy giao đều kèm sẵn 2 pin chính hãng, sạc, thẻ nhớ 64GB tốc độ cao, túi chống sốc và dây đeo máy chắc chắn.
              </p>
            </div>

            <div className="bg-canvas-100 rounded-xl p-5 border border-ink-200/80 space-y-2 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-accent/15 text-accent flex items-center justify-center font-bold">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-ink-900">
                Hướng dẫn tận tình 1-1
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                Dù bạn chưa từng dùng máy ảnh cơ, Kiho sẽ cài đặt sẵn chế độ chụp tối ưu và hướng dẫn thao tác cơ bản chỉ trong 5 phút.
              </p>
            </div>
          </div>

          {/* Store Information Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ink-200 shadow-xs space-y-5">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-900">
              Thông tin cửa hàng & Liên hệ trực tiếp
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-ink-700">
              <div className="space-y-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink-500 block">Địa chỉ</span>
                <p className="font-bold text-ink-900">{address}</p>
                <p className="text-ink-500">Mặt tiền trung tâm TP. Đồng Hới, dễ tìm và đậu xe</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink-500 block">Giờ mở cửa</span>
                <p className="font-bold text-ink-900">{settings.opening_hours || "07:30 – 21:00"}</p>
                <p className="text-ink-500">Mở cửa đón khách tất cả các ngày trong tuần</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink-500 block">Hotline & Zalo</span>
                <p className="font-mono font-bold text-base text-accent">{phone}</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink-500 block">Dịch vụ giao máy</span>
                <p className="font-bold text-ink-900">Giao tận nơi theo yêu cầu</p>
                <p className="text-ink-500">Hỗ trợ giao tại khách sạn, ga Đồng Hới, sân bay</p>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3 border-t border-ink-100">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink-900 hover:bg-black text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
              >
                <Navigation className="w-4 h-4 text-accent" />
                <span>Chỉ đường trên Google Maps ↗</span>
              </a>

              <Link
                href="/thiet-bi"
                className="inline-flex items-center gap-2 bg-white hover:bg-canvas-200 text-ink-900 border border-ink-300 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-2xs"
              >
                <Camera className="w-4 h-4 text-accent" />
                <span>Xem danh sách 12 dòng máy</span>
              </Link>
            </div>
          </div>

        </section>

      </article>
    </div>
  );
}
