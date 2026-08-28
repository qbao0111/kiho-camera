"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";

interface EditorialTheme {
  id: string;
  tag: string;
  title: string;
  supportingLine: string;
  description: string;
  recommended: string;
  image: string;
  href: string;
}

const EDITORIAL_THEMES: EditorialTheme[] = [
  {
    id: "sunset-beach",
    tag: "01 · BIỂN & HOÀNG HÔN",
    title: "Hoàng Hôn & Biển",
    supportingLine: "Những buổi chiều vàng ở Nhật Lệ, Bảo Ninh hay một chuyến đi biển thật nhẹ và đẹp.",
    description: "Dễ chụp cảnh biển, outfit, chân dung và khoảnh khắc chill cuối ngày với màu ảnh sáng, trong và nịnh da.",
    recommended: "Canon R50 · G7X III · Fuji X100V",
    image: "/images/landing/themes/theme-01-sunset-beach.webp",
    href: "/thiet-bi?cat=may-anh",
  },
  {
    id: "cafe-street",
    tag: "02 · CAFE & PHỐ NHỎ",
    title: "Cafe & Check-in",
    supportingLine: "Những buổi ngồi quán xinh, thưởng thức ly nước mát và chụp outfit thật tự nhiên.",
    description: "Màu ảnh trong trẻo, nhỏ gọn dễ mang theo, giơ máy lên là có ngay ảnh đẹp chuẩn gu từ Fujifilm X100VI.",
    recommended: "Fujifilm X100VI · Canon G7X III · Canon M100",
    image: "/images/landing/themes/theme-02-cafe-street.webp",
    href: "/thiet-bi/fujifilm-x100vi",
  },
  {
    id: "couple-dating",
    tag: "03 · HẸN HÒ & KỶ NIỆM",
    title: "Hẹn Hò & Kỷ Niệm",
    supportingLine: "Lưu lại những khoảnh khắc đi chơi cùng người thương theo cách ngọt ngào và tự nhiên nhất.",
    description: "Màu ảnh mềm mại, bắt trọn từng nụ cười và cảm xúc chân thật cho những buổi hẹn hò cùng Fujifilm X100VI.",
    recommended: "Fujifilm X100VI · Canon RP · Canon R50",
    image: "/images/landing/themes/theme-03-couple-dating.webp",
    href: "/thiet-bi/fujifilm-x100vi",
  },
  {
    id: "birthday-party",
    tag: "04 · SINH NHẬT & PARTY",
    title: "Sinh Nhật & Party",
    supportingLine: "Lưu giữ trọn vẹn vẻ đẹp lung linh trong tiệc sinh nhật, kỷ niệm và sự kiện đặc biệt.",
    description: "Tone da trắng hồng nịnh mắt, bắt sáng cực xinh dưới ánh đèn tiệc và hoa nến lung linh — chuẩn màu film từ Fujifilm X100V.",
    recommended: "Fujifilm X100V · Canon G7X III · Fuji X100VI",
    image: "/images/landing/themes/theme-04-vlog-content.webp",
    href: "/thiet-bi/fujifilm-x100v",
  },
];

export function UseCaseSection() {
  return (
    <section className="py-16 sm:py-24 bg-canvas-100 border-t border-ink-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-widest text-ink-500 uppercase">
              <Camera className="w-3.5 h-3.5 text-accent" />
              <span>GỢI Ý THEO GU DU LỊCH</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
              Chọn vibe chuyến đi <br className="hidden sm:inline" />
              <span className="italic text-accent font-normal">của bạn tại Quảng Bình</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-ink-600 font-normal leading-relaxed">
              Từ biển chiều, cafe chill đến tiệc sinh nhật lung linh — Kiho gợi ý dòng máy hợp nhất cho cách bạn muốn lưu lại khoảnh khắc.
            </p>
          </div>

          <Link
            href="/thiet-bi"
            className="group inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-ink-900 hover:text-accent bg-white hover:bg-canvas-200 border border-ink-300 px-4 py-2.5 rounded-lg transition-all shadow-xs shrink-0 self-start md:self-end"
          >
            <span>Xem tất cả 12 dòng máy</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ink-400 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Editorial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EDITORIAL_THEMES.map((theme) => (
            <Link
              key={theme.id}
              href={theme.href}
              className="group flex flex-col rounded-xl bg-white border border-ink-200 shadow-xs hover:shadow-md hover:border-ink-300 transition-all duration-200 overflow-hidden"
            >
              {/* Photo Showcase */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-canvas-200">
                <Image
                  src={theme.image}
                  alt={theme.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

                {/* Top Theme Tag */}
                <div className="absolute top-3 left-3">
                  <span className="inline-block bg-ink-900/80 text-white text-[10px] font-mono font-medium uppercase tracking-widest px-2 py-0.5 rounded-sm shadow-xs">
                    {theme.tag}
                  </span>
                </div>

                {/* Bottom Recommended Camera Tag */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <div className="bg-white/95 p-2 rounded-md border border-white/40 shadow-xs flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span className="text-[11px] font-mono font-medium text-ink-900 truncate">
                      {theme.recommended}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Text */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-ink-900 group-hover:text-accent tracking-tight transition-colors">
                    {theme.title}
                  </h3>

                  <p className="font-sans text-xs text-ink-700 font-medium leading-snug">
                    {theme.supportingLine}
                  </p>

                  <p className="font-sans text-xs text-ink-500 leading-relaxed font-normal line-clamp-2">
                    {theme.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="pt-2 border-t border-ink-200 flex items-center justify-between text-xs font-sans">
                  <span className="font-semibold text-ink-900 group-hover:text-accent transition-colors">
                    Xem dòng máy phù hợp
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-400 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
