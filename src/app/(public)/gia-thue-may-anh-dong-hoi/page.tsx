import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  DollarSign,
  Tag,
  ShieldCheck,
  PackageCheck,
  Clock,
  ArrowRight,
  Sparkles,
  Camera,
  CheckCircle2,
} from "lucide-react";
import { getEquipmentList } from "@/lib/services/equipment";
import { getSiteSettings } from "@/lib/services/settings";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/public/json-ld";
import { formatCurrency, normalizePhoneNumber } from "@/lib/utils";
import { TrackedOutboundLink } from "@/components/analytics/tracked-outbound-link";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const revalidate = 120;

export const metadata: Metadata = buildPageMetadata({
  title: "Bảng giá thuê máy ảnh tại Đồng Hới mới nhất",
  description:
    "Bảng giá thuê máy ảnh du lịch tại TP. Đồng Hới, Quảng Bình từ 80.000₫/buổi đến 450.000₫/ngày. Trọn bộ Canon, Fujifilm, Sony kèm 2 pin, sạc, thẻ nhớ 64GB.",
  pathname: "/gia-thue-may-anh-dong-hoi",
  image: "/images/landing/hero-quang-binh.webp",
  imageAlt: "Bảng giá thuê máy ảnh tại Đồng Hới, Quảng Bình - Kiho Camera",
});

export default async function PriceGuidePage() {
  const [equipmentList, settings] = await Promise.all([
    getEquipmentList({ onlyActive: true }),
    getSiteSettings(),
  ]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";
  const phone = settings.phone || "0387 274 669";

  const minSessionPrice =
    equipmentList.length > 0 ? Math.min(...equipmentList.map((e) => e.price_session)) : 80000;
  const minDayPrice =
    equipmentList.length > 0 ? Math.min(...equipmentList.map((e) => e.price_per_day)) : 120000;
  const maxDayPrice =
    equipmentList.length > 0 ? Math.max(...equipmentList.map((e) => e.price_per_day)) : 450000;

  return (
    <div className="bg-[#faf8f5] min-h-screen py-10 sm:py-16">
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Bảng giá thuê máy ảnh Đồng Hới", url: "/gia-thue-may-anh-dong-hoi" },
        ]}
        siteUrl={siteUrl}
      />
      <ArticleJsonLd
        title="Bảng giá thuê máy ảnh tại Đồng Hới mới nhất — Kiho Camera"
        description="Tổng hợp bảng giá thuê máy ảnh Canon, Fujifilm, Sony tại TP. Đồng Hới, Quảng Bình."
        url="/gia-thue-may-anh-dong-hoi"
        siteUrl={siteUrl}
      />

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* Header */}
        <header className="space-y-3 border-b border-ink-200 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-ink-600 uppercase">
            <DollarSign className="w-3.5 h-3.5 text-accent" />
            <span>BẢNG GIÁ NIÊM YẾT · RENTAL PRICING GUIDE</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
            Giá thuê máy ảnh ở Đồng Hới, Quảng Bình bao nhiêu?
          </h1>
          <p className="font-sans text-base sm:text-lg text-ink-600 leading-relaxed font-normal pt-1">
            Giá thuê máy ảnh tại TP. Đồng Hới dao động từ <strong className="text-ink-900 font-semibold">{formatCurrency(minSessionPrice)}/buổi</strong> đến <strong className="text-ink-900 font-semibold">{formatCurrency(maxDayPrice)}/ngày</strong> tùy theo thương hiệu (Canon, Fujifilm, Sony) và phân khúc thiết bị. Tất cả máy thuê tại Kiho Camera đều được trang bị sẵn 2 pin chính hãng, dock sạc, thẻ nhớ 64GB tốc độ cao và túi chống sốc mà không phát sinh thêm bất kỳ phụ phí nào.
          </p>
        </header>

        {/* 3 Price Packages Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-canvas-100 rounded-xl p-5 border border-ink-200/80 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-accent uppercase">Gói 1 Buổi (Nửa ngày)</span>
              <Clock className="w-4 h-4 text-ink-500" />
            </div>
            <p className="font-display text-2xl font-bold text-ink-900">
              Từ {formatCurrency(minSessionPrice)} <span className="text-xs font-sans text-ink-500 font-normal">/ buổi</span>
            </p>
            <p className="text-xs text-ink-600 leading-relaxed">
              Dành cho nhu cầu chụp ảnh nhanh theo buổi: Sáng (07:30 – 13:00) hoặc Chiều (13:30 – 19:30). Thích hợp chụp cồn cát, cà phê phố hoặc dạo biển chiều.
            </p>
          </div>

          <div className="bg-canvas-100 rounded-xl p-5 border border-ink-200/80 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase">Gói 1 Ngày (24 Tiếng)</span>
              <Clock className="w-4 h-4 text-ink-500" />
            </div>
            <p className="font-display text-2xl font-bold text-ink-900">
              Từ {formatCurrency(minDayPrice)} <span className="text-xs font-sans text-ink-500 font-normal">/ ngày</span>
            </p>
            <p className="text-xs text-ink-600 leading-relaxed">
              Tính trọn vẹn 24h từ thời điểm nhận máy. Thoải mái đi tour Phong Nha — Suối Moọc — Động Thiên Đường mà không lo trễ giờ trả máy.
            </p>
          </div>

          <div className="bg-canvas-100 rounded-xl p-5 border border-ink-200/80 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-700 uppercase">Thuê Từ 3 Ngày Trở Lên</span>
              <Tag className="w-4 h-4 text-ink-500" />
            </div>
            <p className="font-display text-2xl font-bold text-ink-900">
              Giảm 15% – 25%
            </p>
            <p className="text-xs text-ink-600 leading-relaxed">
              Ưu đãi đặc quyền cho các chuyến đi du lịch dài ngày khám phá trọn vẹn Quảng Bình hoặc các tỉnh miền Trung lân cận.
            </p>
          </div>
        </div>

        {/* Live Equipment Price Table */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-ink-900">
              Bảng giá chi tiết từng dòng máy tại Kiho Camera
            </h2>
            <span className="text-xs font-mono text-ink-500">
              Cập nhật trực tiếp từ hệ thống
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-ink-200 shadow-2xs bg-white">
            <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
              <thead>
                <tr className="bg-canvas-100 border-b border-ink-200 text-ink-900">
                  <th className="py-3 px-4 font-bold">Dòng máy ảnh</th>
                  <th className="py-3 px-4 font-bold">Hãng</th>
                  <th className="py-3 px-4 font-bold text-accent">Giá 1 buổi</th>
                  <th className="py-3 px-4 font-bold text-ink-900">Giá 1 ngày (24h)</th>
                  <th className="py-3 px-4 font-bold text-emerald-800">Giá từ 3 ngày</th>
                  <th className="py-3 px-4 font-bold text-right">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100 text-ink-700">
                {equipmentList.map((eq) => (
                  <tr key={eq.id} className="hover:bg-canvas-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-ink-900">
                      <Link href={`/thiet-bi/${eq.slug}`} className="hover:text-accent transition-colors">
                        {eq.name}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-ink-600">
                      {eq.brand}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-accent">
                      {formatCurrency(eq.price_session)}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-ink-900">
                      {formatCurrency(eq.price_per_day)}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-emerald-800">
                      {formatCurrency(eq.price_three_days)} / ngày
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/thiet-bi/${eq.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                      >
                        <span>Xem máy</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Inclusive Accessories Guarantee */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-ink-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider font-mono">
            <PackageCheck className="w-4 h-4 text-accent" />
            <span>CAM KẾT MINH BẠCH</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink-900">
            Giá thuê đã bao gồm trọn bộ phụ kiện — Không phí ẩn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-ink-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>02 Pin chính hãng (đã sạc đầy 100%)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>01 Dock sạc / dây cáp sạc</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>01 Thẻ nhớ SD 64GB tốc độ cao</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>01 Túi đựng chống sốc + dây đeo máy</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <span>Không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Hỗ trợ hướng dẫn sử dụng 1-1 trước khi nhận</span>
            </div>
          </div>
        </section>

        {/* Direct CTA */}
        <div className="pt-4 border-t border-ink-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-ink-600">
            Cần đặt giữ lịch máy trước cho chuyến đi? Hotline/Zalo:{" "}
            <TrackedOutboundLink
              href={`tel:${normalizePhoneNumber(phone)}`}
              eventName="contact_hotline"
              placement="price_guide_page"
              className="font-mono font-bold text-ink-900 hover:text-accent"
            >
              {phone}
            </TrackedOutboundLink>
          </div>

          <Link
            href="/#bang-gia"
            className="inline-flex items-center gap-2 bg-ink-900 hover:bg-black text-white px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-xs"
          >
            <span>Đặt thuê máy ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </article>
    </div>
  );
}
