import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/ui/source-image";
import {
  Scale,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Camera,
  Layers,
  Zap,
  HelpCircle,
} from "lucide-react";
import { getEquipmentList } from "@/lib/services/equipment";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/public/json-ld";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 120;

import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "So sánh Canon R50 vs Canon G7X Mark III — Nên thuê máy nào?",
  description:
    "So sánh chi tiết Canon EOS R50 và PowerShot G7 X Mark III khi đi du lịch: Cảm biến, khả năng xóa phông, độ tiện dụng bỏ túi và bảng giá thuê tại Kiho Đồng Hới.",
  pathname: "/so-sanh/canon-r50-vs-canon-g7x-mark-iii",
  type: "article",
});

export default async function CanonR50VsG7X3Page() {
  const equipmentList = await getEquipmentList({ onlyActive: true });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";

  const r50 = equipmentList.find((e) => e.slug === "canon-eos-r50");
  const g7x = equipmentList.find((e) => e.slug === "canon-g7x-mark-iii");

  const r50Price = r50 ? r50.price_per_day : null;
  const g7xPrice = g7x ? g7x.price_per_day : null;

  return (
    <div className="bg-[#faf8f5] min-h-screen py-10 sm:py-16">
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "So sánh máy ảnh", url: "/thiet-bi" },
          { name: "Canon R50 vs Canon G7X Mark III", url: "/so-sanh/canon-r50-vs-canon-g7x-mark-iii" },
        ]}
        siteUrl={siteUrl}
      />
      <ArticleJsonLd
        title="So sánh Canon R50 vs Canon G7X Mark III — Nên thuê máy nào đi du lịch?"
        description="Phân tích chi tiết Canon EOS R50 và Canon G7X Mark III cho chuyến đi du lịch Quảng Bình."
        url="/so-sanh/canon-r50-vs-canon-g7x-mark-iii"
        siteUrl={siteUrl}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* Header */}
        <header className="space-y-3 border-b border-ink-200 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-ink-600 uppercase">
            <Scale className="w-3.5 h-3.5 text-accent" />
            <span>SO SÁNH MÁY ẢNH DU LỊCH · CAMERA COMPARISON</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
            Canon R50 vs Canon G7X Mark III: Nên thuê máy nào khi du lịch?
          </h1>
          <p className="font-sans text-base sm:text-lg text-ink-600 leading-relaxed font-normal pt-1">
            Một bên là máy ảnh Mirrorless cảm biến APS-C hiện đại có thể thay ống kính, một bên là máy ảnh compact cao cấp nhỏ gọn bỏ túi. Hãy cùng Kiho Camera tìm ra lựa chọn hoàn hảo nhất cho bạn.
          </p>
        </header>

        {/* Quick Answer Summary Box */}
        <div className="bg-canvas-100 border border-ink-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>TÓM TẮT NHANH ĐỂ CHỌN NGAY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-sans">
            <div className="p-4 bg-white rounded-xl border border-ink-200/80 space-y-2">
              <h3 className="font-display text-base font-bold text-ink-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Nên chọn Canon EOS R50 khi:</span>
              </h3>
              <ul className="text-xs sm:text-sm text-ink-700 space-y-1.5 leading-relaxed">
                <li>· Bạn muốn chụp chân dung xóa phông mịn màng với ống kính chuyên dụng (như 50mm f/1.8).</li>
                <li>· Cần hệ thống lấy nét Dual Pixel AF II bám sát mắt siêu nhanh khi chuyển động.</li>
                <li>· Muốn quay video 4K sắc nét không bị crop khung hình.</li>
              </ul>
              <div className="pt-2 text-xs font-mono font-bold text-accent">
                Giá thuê: từ {r50Price ? `${formatCurrency(r50Price)} / ngày` : "Liên hệ báo giá"}
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-ink-200/80 space-y-2">
              <h3 className="font-display text-base font-bold text-ink-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Nên chọn Canon G7X Mark III khi:</span>
              </h3>
              <ul className="text-xs sm:text-sm text-ink-700 space-y-1.5 leading-relaxed">
                <li>· Bạn ưu tiên máy siêu nhỏ gọn, dễ dàng bỏ túi áo hoặc túi xách nhỏ.</li>
                <li>· Cần ống kính đa dụng zoom quang học 4.2x (tương đương 24-100mm f/1.8-2.8) mà không cần mang theo lens rời.</li>
                <li>· Chụp ảnh tự sướng (selfie) với màn hình lật 180 độ và tone màu da hồng hào nịnh mắt.</li>
              </ul>
              <div className="pt-2 text-xs font-mono font-bold text-accent">
                Giá thuê: từ {g7xPrice ? `${formatCurrency(g7xPrice)} / ngày` : "Liên hệ báo giá"}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink-900">
            Bảng thông số kỹ thuật và so sánh chi tiết
          </h2>

          <div className="overflow-x-auto rounded-xl border border-ink-200 shadow-2xs bg-white">
            <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
              <thead>
                <tr className="bg-canvas-100 border-b border-ink-200 text-ink-900">
                  <th className="py-3 px-4 font-bold">Tiêu chí so sánh</th>
                  <th className="py-3 px-4 font-bold text-accent">Canon EOS R50</th>
                  <th className="py-3 px-4 font-bold text-ink-900">Canon G7X Mark III</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100 text-ink-700">
                <tr>
                  <td className="py-3 px-4 font-semibold text-ink-900">Loại máy ảnh</td>
                  <td className="py-3 px-4">Mirrorless (Thay được lens)</td>
                  <td className="py-3 px-4">Compact (Lens liền thân)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-ink-900">Kích thước cảm biến</td>
                  <td className="py-3 px-4">APS-C CMOS (24.2 MP) — Lớn gấp 3 lần</td>
                  <td className="py-3 px-4">1.0-inch Stacked CMOS (20.1 MP)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-ink-900">Ống kính (Lens)</td>
                  <td className="py-3 px-4">Ngàm RF/RF-S (Đi kèm lens kit / lens fix xóa phông)</td>
                  <td className="py-3 px-4">Zoom quang 4.2x (24-100mm f/1.8-2.8)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-ink-900">Hệ thống lấy nét</td>
                  <td className="py-3 px-4 font-medium text-emerald-800">Dual Pixel CMOS AF II (Bắt nét mắt & khuôn mặt AI)</td>
                  <td className="py-3 px-4">Contrast AF (31 điểm lấy nét)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-ink-900">Màn hình hiển thị</td>
                  <td className="py-3 px-4">Cảm ứng xoay lật đa góc (Vari-angle)</td>
                  <td className="py-3 px-4">Cảm ứng lật 180° lên trên (Tilt)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-ink-900">Trọng lượng thân máy</td>
                  <td className="py-3 px-4">Khoảng 375g (Body)</td>
                  <td className="py-3 px-4 font-medium text-emerald-800">Khoảng 304g (Đã gồm pin & lens)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-ink-900">Tone màu ảnh (Color science)</td>
                  <td className="py-3 px-4">Trong trẻo, chi tiết cao, xử lý ngược sáng tốt</td>
                  <td className="py-3 px-4">Trắng hồng da, mịn tự nhiên, hợp chụp đồ ăn/selfie</td>
                </tr>
                <tr className="bg-canvas-50/70 font-semibold">
                  <td className="py-3.5 px-4 text-ink-900">Giá thuê tại Kiho Camera</td>
                  <td className="py-3.5 px-4 text-accent font-mono">
                    {r50Price !== null ? `${formatCurrency(r50Price)} / ngày` : "Liên hệ báo giá"}
                  </td>
                  <td className="py-3.5 px-4 text-accent font-mono">
                    {g7xPrice !== null ? `${formatCurrency(g7xPrice)} / ngày` : "Liên hệ báo giá"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Practical Travel Scenario Advice */}
        <section className="space-y-4 font-sans text-ink-800 text-sm sm:text-base leading-relaxed">
          <h2 className="font-display text-2xl font-bold text-ink-900">
            Kinh nghiệm thực tế khi đi du lịch tại Quảng Bình
          </h2>
          
          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold text-ink-900">
              1. Khám phá hang động Phong Nha & Suối Nước Moọc:
            </h3>
            <p className="text-ink-700">
              Trong hang động ánh sáng thường yếu, <strong className="text-ink-900 font-semibold">Canon R50</strong> với cảm biến APS-C lớn thu sáng tốt hơn và khử nhiễu ISO hiệu quả hơn. Khi chụp phong cảnh rộng hoặc suối Nước Moọc, R50 cho độ sắc nét và dải màu ấn tượng.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold text-ink-900">
              2. Check-in bãi biển Nhật Lệ, cồn cát Quang Phú & cà phê phố:
            </h3>
            <p className="text-ink-700">
              Nếu bạn chỉ đi dạo phố, chụp ảnh OOTD nhẹ nhàng hoặc quay vlog TikTok ngắn, <strong className="text-ink-900 font-semibold">Canon G7X Mark III</strong> cực kỳ tiện lợi nhờ kích thước nhỏ bỏ túi áo khoác, lấy ra chụp tức thì không gây chú ý.
            </p>
          </div>
        </section>

        {/* CTAs */}
        <div className="pt-6 border-t border-ink-200 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/thiet-bi"
            className="text-xs sm:text-sm font-semibold text-ink-600 hover:text-accent flex items-center gap-1.5"
          >
            <span>← Xem tất cả máy ảnh tại Kiho</span>
          </Link>

          <div className="flex items-center gap-2.5">
            {r50 && (
              <Link
                href={`/thiet-bi/${r50.slug}`}
                className="inline-flex items-center gap-1.5 bg-ink-900 hover:bg-black text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors"
              >
                <span>Thuê Canon R50</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
            {g7x && (
              <Link
                href={`/thiet-bi/${g7x.slug}`}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-canvas-200 text-ink-900 border border-ink-300 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors"
              >
                <span>Thuê Canon G7X III</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

      </article>
    </div>
  );
}
