import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Scale,
  Sparkles,
  ArrowRight,
  Camera,
  CheckCircle2,
} from "lucide-react";
import { getEquipmentList } from "@/lib/services/equipment";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/public/json-ld";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 120;

import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "So sánh Fujifilm X100V vs Fujifilm X100VI — Nên thuê máy nào?",
  description:
    "So sánh chi tiết Fujifilm X100V và Fujifilm X100VI: Cảm biến 40MP vs 26MP, chống rung IBIS 6-stop, giả lập màu Reala Ace và giá thuê tại Kiho Camera Đồng Hới.",
  pathname: "/so-sanh/fujifilm-x100v-vs-x100vi",
  type: "article",
});

export default async function FujifilmX100VVsX100VI() {
  const equipmentList = await getEquipmentList({ onlyActive: true });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";

  const x100vi = equipmentList.find((e) => e.slug === "fujifilm-x100vi");
  const x100v = equipmentList.find((e) => e.slug === "fujifilm-x100v");

  const x100viPrice = x100vi ? x100vi.price_per_day : null;
  const x100vPrice = x100v ? x100v.price_per_day : null;

  return (
    <div className="bg-[#faf8f5] min-h-screen py-10 sm:py-16">
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "So sánh máy ảnh", url: "/thiet-bi" },
          { name: "Fujifilm X100V vs Fujifilm X100VI", url: "/so-sanh/fujifilm-x100v-vs-x100vi" },
        ]}
        siteUrl={siteUrl}
      />
      <ArticleJsonLd
        title="So sánh Fujifilm X100V vs Fujifilm X100VI — Nên thuê dòng máy nào?"
        description="Phân tích điểm khác biệt giữa Fujifilm X100V và Fujifilm X100VI khi thuê máy du lịch tại Quảng Bình."
        url="/so-sanh/fujifilm-x100v-vs-x100vi"
        siteUrl={siteUrl}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* Header */}
        <header className="space-y-3 border-b border-ink-200 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-ink-600 uppercase">
            <Scale className="w-3.5 h-3.5 text-accent" />
            <span>SO SÁNH MÁY ẢNH CAO CẤP · FUJIFILM SERIES</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
            Fujifilm X100V vs Fujifilm X100VI: Trải nghiệm thực tế khác gì nhau?
          </h1>
          <p className="font-sans text-base sm:text-lg text-ink-600 leading-relaxed font-normal pt-1">
            Fujifilm X100VI là bản nâng cấp đáng giá với cảm biến 40MP và chống rung thân máy IBIS 6-stop. Nhưng liệu bạn có cần trả thêm chi phí hay X100V đã đủ đáp ứng trọn vẹn chuyến đi?
          </p>
        </header>

        {/* Quick Answer Summary Box */}
        <div className="bg-canvas-100 border border-ink-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>TÓM TẮT NHANH ĐỂ CHỌN MÁY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-sans">
            <div className="p-4 bg-white rounded-xl border border-ink-200/80 space-y-2">
              <h3 className="font-display text-base font-bold text-ink-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Nên chọn Fujifilm X100VI khi:</span>
              </h3>
              <ul className="text-xs sm:text-sm text-ink-700 space-y-1.5 leading-relaxed">
                <li>· Bạn muốn độ phân giải khủng 40.2MP để thoải mái crop ảnh mà không giảm độ nét.</li>
                <li>· Cần chống rung thân máy (IBIS 6-stop) để chụp đêm hoặc chụp thiếu sáng cầm tay không lo rung nhòe.</li>
                <li>· Muốn trải nghiệm giả lập màu phim mới nhất: <strong>Reala Ace</strong>.</li>
              </ul>
              <div className="pt-2 text-xs font-mono font-bold text-accent">
                Giá thuê: từ {x100viPrice ? `${formatCurrency(x100viPrice)} / ngày` : "Liên hệ báo giá"}
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-ink-200/80 space-y-2">
              <h3 className="font-display text-base font-bold text-ink-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Nên chọn Fujifilm X100V khi:</span>
              </h3>
              <ul className="text-xs sm:text-sm text-ink-700 space-y-1.5 leading-relaxed">
                <li>· Bạn muốn tiết kiệm từ 30–40% chi phí thuê nhưng vẫn có chất ảnh film vintage đỉnh cao.</li>
                <li>· Cảm biến 26.1MP X-Trans 4 đã hoàn toàn dư thừa cho đăng ảnh Facebook, Instagram.</li>
                <li>· Trọng lượng nhẹ hơn một chút, thao tác vòng xoay cơ học tương tự 100%.</li>
              </ul>
              <div className="pt-2 text-xs font-mono font-bold text-accent">
                Giá thuê: từ {x100vPrice ? `${formatCurrency(x100vPrice)} / ngày` : "Liên hệ báo giá"}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink-900">
            Bảng thông số kỹ thuật chi tiết
          </h2>

          <div className="overflow-x-auto rounded-xl border border-ink-200 shadow-2xs bg-white">
            <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
              <thead>
                <tr className="bg-canvas-100 border-b border-ink-200 text-ink-900">
                  <th className="py-3 px-4 font-bold">Thông số & Tính năng</th>
                  <th className="py-3 px-4 font-bold text-accent">Fujifilm X100VI (Mới nhất)</th>
                  <th className="py-3 px-4 font-bold text-ink-900">Fujifilm X100V</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100 text-ink-700">
                <tr>
                  <td className="py-3 px-4 font-semibold text-ink-900">Cảm biến hình ảnh</td>
                  <td className="py-3 px-4 font-medium text-accent">40.2 MP X-Trans CMOS 5 HR</td>
                  <td className="py-3 px-4">26.1 MP X-Trans CMOS 4</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-ink-900">Bộ xử lý hình ảnh</td>
                  <td className="py-3 px-4">X-Processor 5 (AI Subject Tracking)</td>
                  <td className="py-3 px-4">X-Processor 4</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-ink-900">Chống rung thân máy (IBIS)</td>
                  <td className="py-3 px-4 font-medium text-emerald-800">Có (5 trục, lên đến 6.0 stop)</td>
                  <td className="py-3 px-4 text-ink-400">Không có chống rung IBIS</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-ink-900">Số lượng Giả lập màu phim (Film Sims)</td>
                  <td className="py-3 px-4">20 chế độ (Bao gồm Reala Ace, Nostalgic Neg)</td>
                  <td className="py-3 px-4">17 chế độ (Classic Chrome, Classic Neg...)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-ink-900">Quay Video</td>
                  <td className="py-3 px-4">6.2K 30p, 4K 60p 10-bit</td>
                  <td className="py-3 px-4">4K 30p 8-bit</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-ink-900">Trọng lượng</td>
                  <td className="py-3 px-4">Khoảng 521g</td>
                  <td className="py-3 px-4 font-medium text-emerald-800">Khoảng 478g (Nhẹ hơn 43g)</td>
                </tr>
                <tr className="bg-canvas-50/70 font-semibold">
                  <td className="py-3.5 px-4 text-ink-900">Giá thuê tại Kiho Camera</td>
                  <td className="py-3.5 px-4 text-accent font-mono">
                    {x100viPrice !== null ? `${formatCurrency(x100viPrice)} / ngày` : "Liên hệ báo giá"}
                  </td>
                  <td className="py-3.5 px-4 text-accent font-mono">
                    {x100vPrice !== null ? `${formatCurrency(x100vPrice)} / ngày` : "Liên hệ báo giá"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Practical Conclusion */}
        <section className="space-y-3 font-sans text-ink-800 text-sm sm:text-base leading-relaxed">
          <h2 className="font-display text-2xl font-bold text-ink-900">
            Lời khuyên từ Kiho Camera
          </h2>
          <p className="text-ink-700">
            Cả hai chiếc máy đều mang lại cảm xúc chụp ảnh tuyệt vời nhờ thiết kế retro kim loại sang trọng, kính ngắm lai OVF/EVF và chất ảnh film chụp xong dùng được ngay mà không cần qua chỉnh sửa Photoshop hay Lightroom.
          </p>
          <p className="text-ink-700">
            Nếu bạn là người yêu công nghệ mới, thích chụp ảnh thiếu sáng khi dạo phố đêm Đồng Hới, hãy chọn <strong className="text-ink-900 font-semibold">X100VI</strong>. Nếu bạn muốn một chiếc máy gọn gàng, chất ảnh cổ điển tuyệt đẹp với mức giá thuê hợp lý nhất, <strong className="text-ink-900 font-semibold">X100V</strong> là sự lựa chọn không thể đánh bại.
          </p>
        </section>

        {/* CTAs */}
        <div className="pt-6 border-t border-ink-200 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/thiet-bi?brand=Fujifilm"
            className="text-xs sm:text-sm font-semibold text-ink-600 hover:text-accent flex items-center gap-1.5"
          >
            <span>← Xem tất cả dòng máy Fujifilm</span>
          </Link>

          <div className="flex items-center gap-2.5">
            {x100vi && (
              <Link
                href={`/thiet-bi/${x100vi.slug}`}
                className="inline-flex items-center gap-1.5 bg-ink-900 hover:bg-black text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors"
              >
                <span>Thuê X100VI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
            {x100v && (
              <Link
                href={`/thiet-bi/${x100v.slug}`}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-canvas-200 text-ink-900 border border-ink-300 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors"
              >
                <span>Thuê X100V</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

      </article>
    </div>
  );
}
