import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface VibeTheme {
  id: string;
  tag: string;
  title: string;
  emotionalLine: string;
  recommended: string;
  image: string;
  href: string;
}

const VIBE_THEMES: VibeTheme[] = [
  {
    id: "sunset-beach",
    tag: "BIỂN & HOÀNG HÔN",
    title: "Hoàng Hôn & Biển",
    emotionalLine: "Biển Nhật Lệ, outfit nhẹ và những buổi chiều vàng.",
    recommended: "Canon R50 · G7X III · X100V",
    image: "/images/landing/themes/theme-01-sunset-beach.webp",
    href: "/thiet-bi?cat=may-anh",
  },
  {
    id: "cafe-street",
    tag: "CAFE & CHECK-IN",
    title: "Cafe & Check-in",
    emotionalLine: "Tone màu trong trẻo, nhỏ gọn bỏ túi cho những buổi cafe xinh.",
    recommended: "Fujifilm X100VI · G7X III · Canon M100",
    image: "/images/landing/themes/theme-02-cafe-street.webp",
    href: "/thiet-bi/fujifilm-x100vi",
  },
  {
    id: "couple-dating",
    tag: "HẸN HÒ & KỶ NIỆM",
    title: "Hẹn Hò & Kỷ Niệm",
    emotionalLine: "Màu ảnh mềm mại, bắt trọn từng nụ cười tự nhiên của hai người.",
    recommended: "Fujifilm X100VI · Canon RP · Canon R50",
    image: "/images/landing/themes/theme-03-couple-dating.webp",
    href: "/thiet-bi/fujifilm-x100vi",
  },
  {
    id: "birthday-party",
    tag: "SINH NHẬT & PARTY",
    title: "Sinh Nhật & Party",
    emotionalLine: "Tone da trắng hồng, bắt sáng lung linh dưới ánh đèn tiệc.",
    recommended: "Fujifilm X100V · Canon G7X III · Fuji X100VI",
    image: "/images/landing/themes/theme-04-vlog-content.webp",
    href: "/thiet-bi/fujifilm-x100v",
  },
];

export function UseCaseSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#faf8f5] border-t border-ink-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-sans font-semibold text-accent uppercase tracking-wider">
              Gợi ý theo lịch trình
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
              Chọn vibe chuyến đi <br className="hidden sm:inline" />
              <span className="italic text-accent font-normal">của bạn tại Quảng Bình</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-ink-600 font-normal leading-relaxed">
              Từ biển chiều, cafe chill đến tiệc kỷ niệm lung linh — Kiho gợi ý dòng máy chuẩn gu nhất cho khoảnh khắc của bạn.
            </p>
          </div>

          <Link
            href="/thiet-bi"
            className="group inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-ink-900 hover:text-accent bg-white hover:bg-canvas-200 border border-ink-300 px-4 py-2.5 rounded-lg transition-colors shadow-xs shrink-0 self-start md:self-end focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>Xem tất cả 12 dòng máy</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ink-600 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4-COLUMN RESTRAINED EDITORIAL PHOTOGRAPHIC GRID (Native 4:5 Aspect Ratio for Sharpness) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIBE_THEMES.map((theme) => (
            <Link
              key={theme.id}
              href={theme.href}
              className="group flex flex-col justify-between rounded-xl bg-white border border-ink-200/80 p-3.5 sm:p-4 shadow-2xs hover:shadow-md hover:border-ink-300 transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              {/* Photo Viewport: Fixed 4:5 native aspect ratio */}
              <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-canvas-200">
                <Image
                  src={theme.image}
                  alt={theme.title}
                  fill
                  quality={82}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                
                {/* Subtle Gradient for Bottom Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Clean Corner Tag (No artificial 01/02 step numbers) */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="font-sans text-[10px] text-white bg-ink-900/90 px-2 py-0.5 rounded uppercase tracking-wider font-medium shadow-xs">
                    {theme.tag}
                  </span>
                </div>
              </div>

              {/* Editorial Text Block (No long paragraph, plain text metadata) */}
              <div className="pt-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between gap-1">
                    <h3 className="font-sans text-base sm:text-lg font-bold text-ink-900 group-hover:text-accent tracking-tight transition-colors">
                      {theme.title}
                    </h3>
                    <ArrowUpRight className="w-3.5 h-3.5 text-ink-600 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                  </div>
                  <p className="font-sans text-xs text-ink-600 font-normal leading-relaxed line-clamp-2">
                    {theme.emotionalLine}
                  </p>
                </div>

                {/* Subtle Camera Metadata */}
                <div className="pt-2 border-t border-ink-200/80 text-[11px] font-mono text-ink-700 truncate">
                  <span className="text-ink-600 font-sans text-[10px]">Máy gợi ý: </span>
                  <span className="font-medium">{theme.recommended}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>


      </div>
    </section>
  );
}
