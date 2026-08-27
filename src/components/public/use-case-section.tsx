"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Camera } from "lucide-react";

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
    tag: "01 · BEACH SUNSET",
    title: "Hoàng Hôn & Biển",
    supportingLine: "Những buổi chiều vàng ở Nhật Lệ, Bảo Ninh hay một chuyến đi biển thật nhẹ và đẹp.",
    description: "Dễ chụp cảnh biển, outfit, chân dung và khoảnh khắc chill cuối ngày với màu ảnh sáng, trong và nịnh da.",
    recommended: "Canon R50 · G7X III · Fuji X100V",
    image: "/images/landing/themes/theme-01-sunset-beach.webp",
    href: "/thiet-bi?cat=may-anh",
  },
  {
    id: "cafe-street",
    tag: "02 · CAFE & CHILL",
    title: "Cafe & Check-in",
    supportingLine: "Những buổi ngồi quán xinh, thưởng thức ly nước mát và chụp outfit thật tự nhiên.",
    description: "Màu ảnh trong trẻo, nhỏ gọn dễ mang theo, giơ máy lên là có ngay ảnh đẹp chuẩn gu từ Fujifilm X100VI.",
    recommended: "Fujifilm X100VI · Canon G7X III · Canon M100",
    image: "/images/landing/themes/theme-02-cafe-street.webp",
    href: "/thiet-bi/fujifilm-x100vi",
  },
  {
    id: "couple-dating",
    tag: "03 · DATE MEMORIES",
    title: "Hẹn Hò & Kỷ Niệm",
    supportingLine: "Lưu lại những khoảnh khắc đi chơi cùng người thương theo cách ngọt ngào và tự nhiên nhất.",
    description: "Màu ảnh mềm mại, bắt trọn từng nụ cười và cảm xúc chân thật cho những buổi hẹn hò cùng Fujifilm X100VI.",
    recommended: "Fujifilm X100VI · Canon RP · Canon R50",
    image: "/images/landing/themes/theme-03-couple-dating.webp",
    href: "/thiet-bi/fujifilm-x100vi",
  },
  {
    id: "birthday-party",
    tag: "04 · BIRTHDAY & PARTY",
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
    <section className="py-20 sm:py-28 bg-[#F8F4EE] border-t border-[#E8E2D7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Editorial Campaign Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E2DBCF] text-xs font-mono font-bold uppercase tracking-wider text-[#716A62] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E85D2A]" />
              <span>GỢI Ý THEO GU DU LỊCH</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#171716] tracking-tight leading-[1.08] font-mono">
              Chọn vibe chuyến đi <br className="hidden sm:inline" />
              <span className="text-[#E85D2A]">của bạn tại Quảng Bình</span>
            </h2>

            <p className="text-sm sm:text-base text-[#716A62] font-medium leading-relaxed">
              Từ biển chiều, cafe chill đến tiệc sinh nhật lung linh — Kiho gợi ý dòng máy hợp nhất cho cách bạn muốn lưu lại khoảnh khắc.
            </p>
          </div>

          <Link
            href="/thiet-bi"
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#171716] hover:text-[#E85D2A] bg-white hover:bg-[#FAF8F5] border border-[#D8CEC0] px-4 py-2.5 rounded-xl transition-all shadow-2xs shrink-0 self-start md:self-end"
          >
            <span>Xem tất cả 12 dòng máy</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#716A62] group-hover:text-[#E85D2A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Editorial Campaign Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {EDITORIAL_THEMES.map((theme) => (
            <Link
              key={theme.id}
              href={theme.href}
              className="group flex flex-col rounded-[26px] bg-[#FBF8F3] border border-[#E8DED2] hover:border-[#D8CEC0] shadow-xs hover:shadow-lg transition-all duration-400 overflow-hidden"
            >
              {/* Photo Showcase (Portrait 4:5 Aspect Ratio) */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F0E8DE]">
                <Image
                  src={theme.image}
                  alt={theme.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171716]/65 via-transparent to-black/20 pointer-events-none" />

                {/* Top Theme Tag */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-block bg-black/40 backdrop-blur-md text-[#FAF8F4] text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/15 shadow-xs">
                    {theme.tag}
                  </span>
                </div>

                {/* Bottom Recommended Camera Badge on Photo */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-white/40 shadow-xs flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#E85D2A]/10 text-[#E85D2A] flex items-center justify-center shrink-0">
                      <Camera className="w-3 h-3" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#171716] truncate">
                      {theme.recommended}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Text & Recommendation Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#171716] group-hover:text-[#E85D2A] tracking-tight font-mono transition-colors">
                    {theme.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] font-bold text-[#171716] leading-snug">
                    {theme.supportingLine}
                  </p>

                  <p className="text-xs text-[#716A62] leading-relaxed font-medium line-clamp-3">
                    {theme.description}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-2 border-t border-[#EDE4D8] flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#171716] group-hover:text-[#E85D2A] transition-colors">
                    Khám phá dòng máy
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E2DBCF] group-hover:bg-[#E85D2A] group-hover:border-[#E85D2A] flex items-center justify-center text-[#171716] group-hover:text-white transition-all shadow-2xs">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
