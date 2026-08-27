"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Phone, Instagram, MapPin, Heart, Clock, Calendar, Tag } from "lucide-react";

export interface CameraPriceItem {
  id: string;
  num: string;
  brand: "fujifilm" | "canon" | "sony" | "compact";
  name: string;
  subtitle?: string;
  image: string;
  priceSession: string; // 1 buổi
  priceDay: string;     // 1 ngày
  price3Days: string;   // 3 ngày
  isTopPick?: boolean;
  badge?: string;
  slug: string;
}

export const KIHO_PRICE_LIST: CameraPriceItem[] = [
  {
    id: "01",
    num: "01",
    brand: "fujifilm",
    name: "FUJIFILM X100VI",
    subtitle: "Flagship giả lập màu film 40MP, chống rung IBIS",
    image: "/images/cameras/fujifilm-x100vi.jpg",
    priceSession: "350K",
    priceDay: "450K",
    price3Days: "420K/ngày",
    badge: "Siêu phẩm 2026",
    slug: "fujifilm-x100vi",
  },
  {
    id: "02",
    num: "02",
    brand: "fujifilm",
    name: "FUJIFILM X100V",
    subtitle: "Huyền thoại màu film hoài niệm, ống kính 23mm f/2",
    image: "/images/cameras/fujifilm-x100v.jpg",
    priceSession: "250K",
    priceDay: "380K",
    price3Days: "350K/ngày",
    badge: "Màu film đẹp",
    slug: "fujifilm-x100v",
  },
  {
    id: "03",
    num: "03",
    brand: "fujifilm",
    name: "FUJIFILM XS10",
    subtitle: "Báng cầm chắc chắn, màn xoay lật, màu film Classic Neg",
    image: "/images/cameras/fujifilm-xs10.jpg",
    priceSession: "230K",
    priceDay: "350K",
    price3Days: "320K/ngày",
    badge: "Quay & Chụp",
    slug: "fujifilm-xs10",
  },
  {
    id: "04",
    num: "04",
    brand: "canon",
    name: "CANON M100",
    subtitle: "Nhỏ gọn màu trắng tinh khôi, màu da trắng hồng",
    image: "/images/cameras/canon-m100.jpg",
    priceSession: "100K",
    priceDay: "180K",
    price3Days: "150K/ngày",
    badge: "Trắng xinh",
    slug: "canon-m100",
  },
  {
    id: "05",
    num: "05",
    brand: "canon",
    name: "CANON RP",
    subtitle: "Full-frame siêu nhẹ, xóa phông mịn màng du lịch",
    image: "/images/cameras/canon-rp.jpg",
    priceSession: "170K",
    priceDay: "280K",
    price3Days: "250K/ngày",
    badge: "Full-Frame giá rẻ",
    slug: "canon-eos-rp",
  },
  {
    id: "06",
    num: "06",
    brand: "canon",
    name: "CANON G7X MARK III",
    subtitle: "Máy compact du lịch quốc dân, màn lật 180° selfie",
    image: "/images/cameras/canon-g7x-mark3.jpg",
    priceSession: "200K",
    priceDay: "320K",
    price3Days: "300K/ngày",
    badge: "Vlog & Selfie",
    slug: "canon-g7x-mark-iii",
  },
  {
    id: "07",
    num: "07",
    brand: "canon",
    name: "CANON R50",
    subtitle: "24.2MP Dual Pixel AF II, màu da đẹp, siêu nhẹ 375g",
    image: "/images/cameras/canon-r50.jpg",
    priceSession: "150K",
    priceDay: "250K",
    price3Days: "230K/ngày",
    isTopPick: true,
    badge: "TOP PICK",
    slug: "canon-eos-r50",
  },
  {
    id: "08",
    num: "08",
    brand: "canon",
    name: "CANON M3",
    subtitle: "Gọn nhẹ kèm kit zoom, thích hợp chụp check-in biển",
    image: "/images/cameras/canon-m3.jpg",
    priceSession: "110K",
    priceDay: "180K",
    price3Days: "150K/ngày",
    badge: "Tiết kiệm",
    slug: "canon-m3",
  },
  {
    id: "09",
    num: "09",
    brand: "sony",
    name: "SONY ZV1 MARK II",
    subtitle: "Ống kính góc siêu rộng 18-50mm, lấy nét nhận diện mặt",
    image: "/images/cameras/sony-zv1-mark2.jpg",
    priceSession: "130K",
    priceDay: "200K",
    price3Days: "180K/ngày",
    isTopPick: true,
    badge: "TOP PICK",
    slug: "sony-zv1-mark-ii",
  },
  {
    id: "10",
    num: "10",
    brand: "sony",
    name: "SONY ZV1F",
    subtitle: "Góc rộng 20mm chụp nhóm, chống rung điện tử mượt mà",
    image: "/images/cameras/sony-zv1f.jpg",
    priceSession: "90K",
    priceDay: "150K",
    price3Days: "130K/ngày",
    badge: "TikTok & Reels",
    slug: "sony-zv1f",
  },
  {
    id: "11",
    num: "11",
    brand: "canon",
    name: "CANON M",
    subtitle: "Thiết kế kim loại đầm tay, giá thuê siêu hạt dẻ",
    image: "/images/cameras/canon-m.jpg",
    priceSession: "90K",
    priceDay: "150K",
    price3Days: "130K/ngày",
    badge: "Giá siêu rẻ",
    slug: "canon-m",
  },
  {
    id: "12",
    num: "12",
    brand: "compact",
    name: "CANON IXY 640",
    subtitle: "Digicam Y2K hoài niệm, màu ảnh vintage cực hot",
    image: "/images/cameras/canon-ixy640.jpg",
    priceSession: "80K",
    priceDay: "120K",
    price3Days: "100K/ngày",
    badge: "Trend Y2K",
    slug: "canon-ixy-640",
  },
];

export function CameraPricingSlider({ messengerUrl = "https://m.me/kihocameradonghoi" }: { messengerUrl?: string }) {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const filteredCameras = KIHO_PRICE_LIST.filter(
    (c) => selectedBrand === "all" || c.brand === selectedBrand
  );

  // Auto-scroll logic
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || isPaused) return;

    const scrollSpeed = 1.2; // Pixels per frame
    let animationFrameId: number;

    const step = () => {
      if (slider) {
        slider.scrollLeft += scrollSpeed;
        // Infinite loop wrap
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 10) {
          slider.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, filteredCameras]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#faf8f5] overflow-hidden hairline-t hairline-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3efe9] border border-[#e4dfd5] text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Bảng Giá Niêm Yết 2026</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight leading-tight">
              Bảng Giá Thuê Máy Ảnh Kiho
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-600 font-medium">
              Cho thuê máy ảnh Quảng Bình – Máy xịn, giá rõ ràng, thuê nhanh tại Đồng Hới.
            </p>
          </div>

          {/* Controls: Brand Filter Tabs & Navigation Arrows */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#f0eae1] p-1 rounded-xl border border-[#e0d6c7]">
              {[
                { key: "all", label: "Tất cả (12)" },
                { key: "fujifilm", label: "Fujifilm (3)" },
                { key: "canon", label: "Canon (6)" },
                { key: "sony", label: "Sony (2)" },
                { key: "compact", label: "Y2K (1)" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedBrand(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    selectedBrand === tab.key
                      ? "bg-white text-ink-900 shadow-sm"
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
          {filteredCameras.map((item) => (
            <div
              key={item.id}
              className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-2xl p-5 border border-[#e8e2d7] shadow-sm hover:shadow-xl hover:border-ink-900/40 transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Card Top: Number & Badges */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-[#f3efe9] text-ink-900 font-mono text-xs font-black flex items-center justify-center border border-[#e4dfd5]">
                  {item.num}
                </span>

                <div className="flex items-center gap-1.5">
                  {item.isTopPick ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs animate-pulse">
                      ★ TOP PICK
                    </span>
                  ) : item.badge ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f4efe6] text-ink-700 text-[10px] font-mono font-bold border border-[#e2dbcf]">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Camera Image Showcase (Clean studio render) */}
              <div className="relative aspect-square w-full my-2 flex items-center justify-center p-2 rounded-xl bg-[#faf8f5]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="320px"
                  className="object-contain p-2 filter drop-shadow-md group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Model Info */}
              <div className="mt-2 mb-4">
                <h3 className="text-base sm:text-lg font-black text-ink-900 tracking-tight uppercase group-hover:text-accent transition-colors font-mono">
                  {item.name}
                </h3>
                <p className="text-xs text-ink-500 line-clamp-1 mt-0.5">
                  {item.subtitle}
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
                  <span className="font-bold text-ink-900">{item.priceSession}</span>
                </div>

                {/* 1 Ngày */}
                <div className="flex items-center justify-between text-ink-600">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3 h-3 text-ink-400" />
                    1 ngày:
                  </span>
                  <span className="font-bold text-ink-900 text-sm">{item.priceDay}</span>
                </div>

                {/* 3 Ngày (Highlighted Badge) */}
                <div className="flex items-center justify-between bg-[#fef2f2] text-[#dc2626] px-2.5 py-1 rounded-md font-bold mt-1">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Tag className="w-3 h-3" />
                    3 ngày:
                  </span>
                  <span className="text-xs">{item.price3Days}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-2">
                <a
                  href={`https://zalo.me/0387274669?text=Chào Kiho, mình muốn thuê máy ${encodeURIComponent(item.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-ink-900 hover:bg-accent text-white text-xs font-mono font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Thuê máy {item.name.split(" ")[1] || ""}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Card (Matching Banner Footer Information) */}
        <div className="mt-12 bg-[#2c2621] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          {/* Subtle Background Glow */}
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
                  href="https://instagram.com/Kiho.thuemayanhqbb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-bold text-white hover:text-[#e6a84d] transition-colors"
                >
                  @Kiho.thuemayanhqbb
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

          {/* Slogan pill in banner */}
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
