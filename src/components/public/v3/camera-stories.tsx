"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";

interface LifestyleStory {
  id: string;
  num: string;
  tag: string;
  title: string;
  subtitle: string;
  recommended: string;
  image: string;
  href: string;
}

const LIFESTYLE_STORIES: LifestyleStory[] = [
  {
    id: "sunset-beach",
    num: "01",
    tag: "BIỂN & HOÀNG HÔN",
    title: "Hoàng Hôn & Biển",
    subtitle: "Biển Nhật Lệ, Bảo Ninh, outfit nhẹ và những buổi chiều vàng.",
    recommended: "Canon R50 · G7X III · Fuji X100V",
    image: "/images/landing/themes/theme-01-sunset-beach.webp",
    href: "/thiet-bi?cat=may-anh",
  },
  {
    id: "cafe-street",
    num: "02",
    tag: "CAFE & CHECK-IN",
    title: "Cafe & Check-in",
    subtitle: "Tone màu trong trẻo, nhỏ gọn bỏ túi cho những buổi cafe xinh.",
    recommended: "Fujifilm X100VI · G7X III · Canon M100",
    image: "/images/landing/themes/theme-02-cafe-street.webp",
    href: "/thiet-bi/fujifilm-x100vi",
  },
  {
    id: "couple-dating",
    num: "03",
    tag: "HẸN HÒ & KỶ NIỆM",
    title: "Hẹn Hò & Kỷ Niệm",
    subtitle: "Màu ảnh mềm mại, bắt trọn từng nụ cười tự nhiên của hai người.",
    recommended: "Fujifilm X100VI · Canon RP · Canon R50",
    image: "/images/landing/themes/theme-03-couple-dating.webp",
    href: "/thiet-bi/fujifilm-x100vi",
  },
  {
    id: "birthday-party",
    num: "04",
    tag: "SINH NHẬT & PARTY",
    title: "Sinh Nhật & Party",
    subtitle: "Tone da trắng hồng, bắt sáng lung linh dưới ánh đèn tiệc.",
    recommended: "Fujifilm X100V · Canon G7X III · Fuji X100VI",
    image: "/images/landing/themes/theme-04-vlog-content.webp",
    href: "/thiet-bi/fujifilm-x100v",
  },
];

export function CameraStories() {
  const featured = LIFESTYLE_STORIES[0];
  const sideStory = LIFESTYLE_STORIES[1];
  const bottomStories = [LIFESTYLE_STORIES[2], LIFESTYLE_STORIES[3]];

  return (
    <section className="py-16 sm:py-24 bg-[#fbf9f6] border-t border-ink-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-ink-500 uppercase">
              <span className="text-accent font-bold">05 / CAMERA STORIES</span>
              <span className="text-ink-300">·</span>
              <span>GỢI Ý THEO GU DU LỊCH</span>
            </div>

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
            className="group inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-ink-900 hover:text-accent bg-white hover:bg-canvas-200 border border-ink-300 px-4 py-2.5 rounded-lg transition-colors shadow-xs shrink-0 self-start md:self-end"
          >
            <span>Xem tất cả 12 dòng máy</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ink-400 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* ASYMMETRIC EDITORIAL PHOTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* 1. LARGE HERO STORY (7 cols) */}
          <Link
            href={featured.href}
            className="lg:col-span-7 group flex flex-col justify-between rounded-xl bg-white border border-ink-200 p-4 sm:p-5 shadow-xs hover:border-ink-300 hover:shadow-md transition-all duration-200"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-lg overflow-hidden bg-canvas-200 border border-ink-100">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-3 left-3">
                <span className="font-mono text-[10px] text-white bg-ink-900/80 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  {featured.num} · {featured.tag}
                </span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-ink-900 group-hover:text-accent tracking-tight transition-colors">
                  {featured.title}
                </h3>
                <span className="font-mono text-xs text-accent font-semibold flex items-center gap-1 shrink-0">
                  <span>Khám phá</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>

              <p className="font-sans text-sm text-ink-600 font-normal leading-relaxed">
                {featured.subtitle}
              </p>

              <div className="pt-2 border-t border-ink-200 flex items-center gap-2 text-xs font-mono text-ink-500">
                <span className="text-ink-400 font-sans text-[11px]">Dòng máy phù hợp:</span>
                <span className="font-medium text-ink-800">{featured.recommended}</span>
              </div>
            </div>
          </Link>

          {/* 2. RIGHT 3 STORIES COLUMN (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Top Side Story (Cafe & Check-in) */}
            <Link
              href={sideStory.href}
              className="group flex flex-col justify-between rounded-xl bg-white border border-ink-200 p-4 shadow-xs hover:border-ink-300 hover:shadow-md transition-all duration-200 flex-1"
            >
              <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-canvas-200 border border-ink-100">
                <Image
                  src={sideStory.image}
                  alt={sideStory.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute top-2.5 left-2.5">
                  <span className="font-mono text-[10px] text-white bg-ink-900/80 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    {sideStory.num} · {sideStory.tag}
                  </span>
                </div>
              </div>

              <div className="pt-3 space-y-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-sans text-base sm:text-lg font-bold text-ink-900 group-hover:text-accent tracking-tight transition-colors">
                    {sideStory.title}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-400 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </div>
                <p className="font-sans text-xs text-ink-600 font-normal leading-snug">
                  {sideStory.subtitle}
                </p>
                <div className="pt-1.5 text-[11px] font-mono text-ink-700">
                  <span className="text-ink-400 font-sans">Máy gợi ý: </span>
                  <span>{sideStory.recommended}</span>
                </div>
              </div>
            </Link>

            {/* Bottom 2 Split Stories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bottomStories.map((story) => (
                <Link
                  key={story.id}
                  href={story.href}
                  className="group flex flex-col justify-between rounded-xl bg-white border border-ink-200 p-3.5 shadow-xs hover:border-ink-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-canvas-200 border border-ink-100">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute top-2 left-2">
                      <span className="font-mono text-[9px] text-white bg-ink-900/80 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                        {story.num}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2.5 space-y-1">
                    <div className="flex items-baseline justify-between gap-1">
                      <h4 className="font-sans text-sm font-bold text-ink-900 group-hover:text-accent tracking-tight transition-colors truncate">
                        {story.title}
                      </h4>
                      <ArrowUpRight className="w-3 h-3 text-ink-400 group-hover:text-accent shrink-0" />
                    </div>
                    <p className="font-sans text-[11px] text-ink-600 font-normal leading-snug line-clamp-1">
                      {story.subtitle}
                    </p>
                    <div className="text-[10px] font-mono text-ink-700 truncate pt-0.5">
                      {story.recommended}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
