"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Phone, Instagram, MapPin, Heart, Clock, Calendar, Tag, ArrowUpRight } from "lucide-react";
import { Equipment } from "@/types/database";
import { formatCurrency } from "@/lib/utils";

interface CameraPricingSliderProps {
  equipment?: Equipment[];
  messengerUrl?: string;
}

export function CameraPricingSlider({
  equipment = [],
  messengerUrl = "https://m.me/kihocameradonghoi",
}: CameraPricingSliderProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const cameraItems = equipment.length > 0 ? equipment : [];

  const filteredCameras = cameraItems.filter(
    (c) => selectedBrand === "all" || c.brand.toLowerCase() === selectedBrand.toLowerCase()
  );

  // Duplicated list for seamless looping
  const displayItems = [...filteredCameras, ...filteredCameras];

  // Auto-scroll logic with seamless wrap
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || isPaused || filteredCameras.length === 0) return;

    const scrollSpeed = 0.8;
    let animationFrameId: number;

    const step = () => {
      if (slider) {
        slider.scrollLeft += scrollSpeed;
        const halfWidth = slider.scrollWidth / 2;
        if (slider.scrollLeft >= halfWidth) {
          slider.scrollLeft -= halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, filteredCameras]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  const fujiCount = cameraItems.filter((c) => c.brand.toLowerCase() === "fujifilm").length;
  const canonCount = cameraItems.filter((c) => c.brand.toLowerCase() === "canon").length;
  const sonyCount = cameraItems.filter((c) => c.brand.toLowerCase() === "sony").length;

  return (
    <section id="bang-gia" className="py-16 sm:py-24 bg-[#faf8f4] overflow-hidden hairline-t hairline-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0eae1] border border-[#e2dbcf] text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>BẢNG GIÁ NIÊM YẾT · ĐỒNG HỚI</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight leading-tight">
              Bảng Giá Thuê Máy Ảnh Kiho
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-600 font-medium">
              Máy xịn, giá rõ ràng, trọn bộ phụ kiện đi kèm — nhận máy là chụp đẹp ngay.
            </p>
          </div>

          {/* Controls: Brand Filter Tabs & Navigation Arrows */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#f0eae1] p-1 rounded-xl border border-[#e0d6c7]">
              {[
                { key: "all", label: `Tất cả (${cameraItems.length})` },
                { key: "fujifilm", label: `Fujifilm (${fujiCount})` },
                { key: "canon", label: `Canon (${canonCount})` },
                { key: "sony", label: `Sony (${sonyCount})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedBrand(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    selectedBrand === tab.key
                      ? "bg-white text-ink-900 shadow-xs"
                      : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Next / Prev Buttons */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={scrollLeft}
                className="w-9 h-9 rounded-xl bg-white border border-[#e0d6c7] hover:bg-ink-900 hover:text-white text-ink-800 flex items-center justify-center transition-colors shadow-xs"
                aria-label="Xem lùi"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                className="w-9 h-9 rounded-xl bg-white border border-[#e0d6c7] hover:bg-ink-900 hover:text-white text-ink-800 flex items-center justify-center transition-colors shadow-xs"
                aria-label="Xem tiếp"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Auto-sliding Carousel Track */}
        <div
          ref={sliderRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none pb-6 pt-2 select-none scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayItems.map((item, index) => {
            const coverImg =
              item.images?.find((img) => img.is_cover)?.image_url ||
              item.images?.[0]?.image_url ||
              `/images/cameras/${item.slug.replace("canon-eos-", "canon-").replace("-kit", "")}.jpg`;

            const formatK = (price: number) => {
              if (!price) return "---";
              return `${Math.round(price / 1000)}K`;
            };

            const numStr = String(item.sort_order).padStart(2, "0");

            return (
              <div
                key={`${item.id}-${index}`}
                className="w-[280px] sm:w-[310px] shrink-0 bg-white rounded-2xl p-5 border border-[#e8e2d7]/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-ink-900/30 transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Card Top: Number & Badges */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="w-7 h-7 rounded-full bg-[#f4efe6] text-ink-900 font-mono text-xs font-black flex items-center justify-center border border-[#e2dbcf]">
                    {numStr}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {item.is_featured ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-ink-900 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                        ★ TOP PICK
                      </span>
                    ) : item.badges?.[0] ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#f4efe6] text-ink-700 text-[10px] font-mono font-bold border border-[#e2dbcf]">
                        {item.badges[0]}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Camera Image Showcase */}
                <Link
                  href={`/thiet-bi/${item.slug}`}
                  className="relative aspect-square w-full my-1 flex items-center justify-center p-2 rounded-xl bg-[#faf8f4] block"
                >
                  <Image
                    src={coverImg}
                    alt={item.name}
                    fill
                    sizes="310px"
                    className="object-contain p-2 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                  />
                </Link>

                {/* Model Info */}
                <div className="mt-2 mb-3">
                  <Link href={`/thiet-bi/${item.slug}`}>
                    <h3 className="text-base sm:text-lg font-black text-ink-900 tracking-tight uppercase group-hover:text-accent transition-colors font-mono">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-ink-500 line-clamp-1 mt-0.5 font-medium">
                    {item.short_description || "Kèm trọn bộ phụ kiện pin sạc thẻ nhớ"}
                  </p>
                </div>

                {/* Price Grid (1 Buổi | 1 Ngày | 3 Ngày) */}
                <div className="space-y-1.5 pt-3 border-t border-[#f0eae1] font-mono text-xs">
                  {/* 1 Buổi */}
                  <div className="flex items-center justify-between text-ink-600">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-ink-400" />
                      1 buổi:
                    </span>
                    <span className="font-bold text-ink-900">{formatK(item.price_session)}</span>
                  </div>

                  {/* 1 Ngày */}
                  <div className="flex items-center justify-between text-ink-600">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3 h-3 text-ink-400" />
                      1 ngày:
                    </span>
                    <span className="font-bold text-ink-900 text-sm">{formatK(item.price_per_day)}</span>
                  </div>

                  {/* 3 Ngày (Highlighted Badge) */}
                  <div className="flex items-center justify-between bg-[#fef2f2] text-[#dc2626] px-2.5 py-1 rounded-md font-bold mt-1">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Tag className="w-3 h-3" />
                      3 ngày:
                    </span>
                    <span className="text-xs">{formatK(item.price_three_days)}/ngày</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 mt-2">
                  <Link
                    href={`/thiet-bi/${item.slug}`}
                    className="w-full bg-ink-900 hover:bg-accent text-white text-xs font-mono font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>Xem máy {item.name.split(" ")[1] || ""}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Full Equipment Catalog */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/thiet-bi"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-ink-900 text-ink-900 hover:text-white border border-[#e0d6c7] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-xs group"
          >
            <span>Xem toàn bộ 12 dòng máy ảnh</span>
            <ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-white transition-colors" />
          </Link>
        </div>

        {/* Bottom Contact Card Banner */}
        <div className="mt-12 bg-[#2c2621] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#e6a84d]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-xs font-mono">
            {/* Phone / Zalo */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#e6a84d]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-white/60 block text-[10px] uppercase tracking-wider">
                  SĐT / ZALO TƯ VẤN
                </span>
                <a
                  href="tel:0387274669"
                  className="text-base sm:text-lg font-black text-white hover:text-[#e6a84d] transition-colors"
                >
                  0387 274 669
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#e6a84d]">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <span className="text-white/60 block text-[10px] uppercase tracking-wider">
                  INSTAGRAM CHÍNH THỨC
                </span>
                <a
                  href="https://www.instagram.com/thuemayanhqbb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-bold text-white hover:text-[#e6a84d] transition-colors"
                >
                  @thuemayanhqbb
                </a>
              </div>
            </div>

            {/* Store Address */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#e6a84d]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-white/60 block text-[10px] uppercase tracking-wider">
                  ĐỊA CHỈ NHẬN MÁY
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  48 Ngô Quyền, Đồng Hới, Quảng Bình
                </span>
              </div>
            </div>
          </div>

          {/* Slogan */}
          <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex items-center justify-center text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent-light text-xs font-mono font-bold tracking-wide">
              <Heart className="w-3.5 h-3.5 fill-current text-accent" />
              TRỌN MỌI KHOẢNH KHẮC – ĐỒNG HÀNH CÙNG HÀNH TRÌNH CỦA BẠN!
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
