import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  FileCheck2,
  PackageCheck,
  Clock,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Camera,
  MapPin,
} from "lucide-react";
import { getSiteSettings } from "@/lib/services/settings";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/public/json-ld";
import { normalizePhoneNumber } from "@/lib/utils";
import { TrackedOutboundLink } from "@/components/analytics/tracked-outbound-link";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Chính sách & Thủ tục thuê máy ảnh — Kiho Camera",
  description:
    "Chính sách thuê máy ảnh tại Kiho Camera Đồng Hới: Không cần cọc tiền mặt, thủ tục CCCD/VNeID đơn giản trong 5 phút, phụ kiện đầy đủ 2 pin sạc thẻ nhớ.",
  alternates: {
    canonical: "/chinh-sach-thue",
  },
};

export default async function RentalPolicyPage() {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";
  const address = settings.address || "48 Ngô Quyền, TP. Đồng Hới, Tỉnh Quảng Bình";
  const phone = settings.phone || "0387 274 669";

  return (
    <div className="bg-[#faf8f5] min-h-screen py-10 sm:py-16">
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Chính sách thuê máy", url: "/chinh-sach-thue" },
        ]}
        siteUrl={siteUrl}
      />
      <ArticleJsonLd
        title="Chính sách & Thủ tục thuê máy ảnh — Kiho Camera"
        description="Chính sách thuê máy ảnh tại Kiho Camera Đồng Hới: Không cần cọc tiền mặt, thủ tục CCCD/VNeID đơn giản."
        url="/chinh-sach-thue"
        siteUrl={siteUrl}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* Header */}
        <header className="space-y-3 border-b border-ink-200 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-ink-600 uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span>THỦ TỤC & QUY ĐỊNH · RENTAL POLICY</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
            Chính sách thuê máy ảnh minh bạch tại Kiho
          </h1>
          <p className="font-sans text-base sm:text-lg text-ink-600 leading-relaxed font-normal pt-1">
            Kiho Camera áp dụng chính sách thuê máy không giữ tiền cọc đối với khách du lịch, quy trình bàn giao rõ ràng và bảo vệ tối đa quyền lợi của khách hàng.
          </p>
        </header>

        {/* Highlight Banner: 0đ tiền cọc */}
        <div className="bg-canvas-100 border border-ink-200/90 rounded-2xl p-6 sm:p-8 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-wider font-mono">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <span>CHÍNH SÁCH CỌC MÁY ĐẶC BIỆT</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink-900">
            Không cần đặt cọc tiền mặt đối với khách du lịch
          </h2>
          <p className="text-sm sm:text-base text-ink-700 leading-relaxed">
            Để bạn thoải mái chi tiêu cho chuyến du lịch Quảng Bình, Kiho <strong className="text-ink-900 font-semibold">không giữ tiền mặt cọc giá trị máy</strong> (vốn có thể lên tới 15–30 triệu đồng). Thay vào đó, bạn chỉ cần xuất trình căn cước công dân (CCCD) hoặc định danh điện tử VNeID chính chủ khi nhận máy.
          </p>
        </div>

        {/* 4 Steps Policy Breakdown */}
        <div className="space-y-8 font-sans text-ink-800 text-sm sm:text-base">
          
          {/* 1. Thủ tục xác minh */}
          <section className="space-y-3 border-l-2 border-accent pl-4 sm:pl-6">
            <h3 className="font-display text-lg sm:text-xl font-bold text-ink-900">
              1. Giấy tờ & Thủ tục xác minh khi nhận máy
            </h3>
            <p className="text-ink-700 leading-relaxed">
              Khi nhận máy tại cửa hàng (48 Ngô Quyền) hoặc tại điểm giao nhận (khách sạn, homestay, ga tàu), bạn vui lòng chuẩn bị:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-ink-700 pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>CCCD bản gốc</strong> hoặc thông tin tài khoản <strong>VNeID mức 2</strong> chính chủ.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Số điện thoại đang hoạt động (có kết nối Zalo để gửi hướng dẫn & hỗ trợ kỹ thuật).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Ký biên bản bàn giao thiết bị sau khi đã kiểm tra máy hoạt động hoàn hảo.</span>
              </li>
            </ul>
          </section>

          {/* 2. Trọn bộ phụ kiện */}
          <section className="space-y-3 border-l-2 border-accent pl-4 sm:pl-6">
            <h3 className="font-display text-lg sm:text-xl font-bold text-ink-900">
              2. Tiêu chuẩn phụ kiện giao kèm mỗi máy
            </h3>
            <p className="text-ink-700 leading-relaxed">
              Mỗi bộ máy ảnh cho thuê tại Kiho đều được kiểm tra kỹ thuật, vệ sinh quang học và đi kèm đầy đủ:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-ink-700 pt-1">
              <div className="p-3 bg-white rounded-lg border border-ink-200 flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-accent shrink-0" />
                <span>02 Pin chính hãng (đã sạc đầy 100%)</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-ink-200 flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-accent shrink-0" />
                <span>01 Bộ dock sạc / dây sạc Type-C</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-ink-200 flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-accent shrink-0" />
                <span>01 Thẻ nhớ SD SanDisk/Kingston 64GB 100MB/s</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-ink-200 flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-accent shrink-0" />
                <span>01 Túi đựng chống sốc + dây đeo cổ máy</span>
              </div>
            </div>
          </section>

          {/* 3. Thời gian tính buổi & ngày */}
          <section className="space-y-3 border-l-2 border-accent pl-4 sm:pl-6">
            <h3 className="font-display text-lg sm:text-xl font-bold text-ink-900">
              3. Cách tính thời gian thuê linh hoạt
            </h3>
            <p className="text-ink-700 leading-relaxed">
              Để phù hợp với lịch trình di chuyển của bạn, Kiho chia thời gian thuê như sau:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-ink-700 pt-1">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span><strong>Thuê theo Buổi (nửa ngày):</strong> Sáng (07:30 – 13:00) hoặc Chiều (13:30 – 19:30). Thích hợp đi check-in cồn cát hoặc cà phê phố.</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span><strong>Thuê theo Ngày (24 giờ):</strong> Tính trọn vẹn 24 tiếng từ thời điểm nhận máy (ví dụ nhận 08:00 sáng hôm nay trả 08:00 sáng hôm sau).</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span><strong>Thuê từ 3 ngày trở lên:</strong> Áp dụng mức giá ưu đãi giảm từ 15–25% theo bảng giá niêm yết.</span>
              </li>
            </ul>
          </section>

          {/* 4. Bảo quản thiết bị */}
          <section className="space-y-3 border-l-2 border-amber-500 pl-4 sm:pl-6">
            <h3 className="font-display text-lg sm:text-xl font-bold text-ink-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>4. Lưu ý bảo quản khi đi biển và hang động</span>
            </h3>
            <p className="text-ink-700 leading-relaxed">
              Khí hậu Quảng Bình có nắng, gió biển và độ ẩm cao trong hang động. Bạn vui lòng lưu ý:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-ink-700 pt-1">
              <li>· Luôn đeo dây máy vào cổ hoặc cổ tay khi chụp trên thuyền, cầu gỗ hoặc mỏm đá.</li>
              <li>· Tránh để máy tiếp xúc trực tiếp với nước biển, cát mịn trên đồi cát hoặc mưa lớn.</li>
              <li>· Khi không chụp, cất máy vào túi chống sốc kèm gói hút ẩm mà Kiho chuẩn bị sẵn.</li>
            </ul>
          </section>

        </div>

        {/* Direct CTA */}
        <div className="pt-4 border-t border-ink-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-ink-600">
            Cần tư vấn thêm về thủ tục? Gọi ngay Hotline:{" "}
            <TrackedOutboundLink
              href={`tel:${normalizePhoneNumber(phone)}`}
              eventName="contact_hotline"
              placement="rental_policy_page"
              className="font-mono font-bold text-ink-900 hover:text-accent"
            >
              {phone}
            </TrackedOutboundLink>
          </div>

          <Link
            href="/thiet-bi"
            className="inline-flex items-center gap-2 bg-ink-900 hover:bg-black text-white px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-xs"
          >
            <span>Chọn máy ảnh phù hợp</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </article>
    </div>
  );
}
