"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

const USE_CASE_TILES = [
  {
    id: "travel",
    title: "Du Lịch & Check-in",
    subtitle: "Khám phá Phong Nha, Suối Moọc & Biển Nhật Lệ",
    description: "Máy nhỏ gọn, pin trâu kèm 2 pin, da người trắng sáng chụp dưới nắng hè.",
    image: "/images/landing/use-cases/usecase-travel.webp",
    recommended: "Canon R50 / G7X III",
    href: "/thiet-bi?cat=may-anh",
  },
  {
    id: "couple",
    title: "Couple & Hẹn Hò",
    subtitle: "Khoảnh khắc ngọt ngào bên nhau",
    description: "Màu film hoài niệm, xoá phông mịn màng cho những khung hình đôi lãng mạn.",
    image: "/images/landing/use-cases/usecase-couple.webp",
    recommended: "Fujifilm X100V / Canon RP",
    href: "/thiet-bi?cat=may-anh",
  },
  {
    id: "vlog",
    title: "Vlog & Sáng Tạo",
    subtitle: "Lưu giữ hành trình chuyển động mượt mà",
    description: "Quay 4K 60p, màn hình xoay lật, mic thu âm lọc gió rõ tiếng.",
    image: "/images/landing/use-cases/usecase-vlog.webp",
    recommended: "Sony ZV-1 II / DJI Pocket 3",
    href: "/thiet-bi?cat=may-quay",
  },
  {
    id: "y2k",
    title: "Y2K & Digicam",
    subtitle: "Màu ảnh flash vintage hoài niệm hot trend",
    description: "Chụp đêm đánh flash cực nghệ, chất ảnh retro vintage không đụng hàng.",
    image: "/images/landing/use-cases/usecase-y2k.webp",
    recommended: "Canon IXY 640 / Fuji X-T30 II",
    href: "/thiet-bi?cat=may-anh",
  },
];

export function UseCaseSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0eae1] border border-[#e2dbcf] text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>GỢI Ý THEO NHU CẦU</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight leading-tight">
              Bạn định mang máy đi đâu?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-600 font-medium max-w-xl">
              Không cần rành thông số kỹ thuật. Chỉ cần chọn kiểu ảnh bạn thích, Kiho sẽ gợi ý chiếc máy phù hợp nhất.
            </p>
          </div>

          <Link
            href="/thiet-bi"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-ink-900 hover:text-accent transition-colors shrink-0"
          >
            <span>Xem tất cả phân loại</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Visual Storytelling Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {USE_CASE_TILES.map((tile) => (
            <Link
              key={tile.id}
              href={tile.href}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#e8e2d7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Showcase Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f0eae1]">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Recommended Badge on Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold bg-white/90 backdrop-blur-md text-ink-900 px-2.5 py-1 rounded-full shadow-xs">
                    ✦ {tile.recommended}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-ink-900 group-hover:bg-accent group-hover:text-white transition-colors shadow-xs">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Text Card Content */}
              <div className="p-5 sm:p-6 space-y-2 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-ink-900 tracking-tight group-hover:text-accent transition-colors font-mono uppercase">
                    {tile.title}
                  </h3>
                  <p className="text-xs text-ink-500 font-semibold mt-0.5">
                    {tile.subtitle}
                  </p>
                  <p className="text-xs text-ink-600 leading-relaxed mt-2 line-clamp-2">
                    {tile.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
