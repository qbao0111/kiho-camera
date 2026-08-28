"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Clock, Calendar, Tag, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Equipment } from "@/types/database";

interface CameraPricingSliderProps {
  equipment?: Equipment[];
  messengerUrl?: string;
}

export function CameraPricingSlider({
  equipment = [],
}: CameraPricingSliderProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const manualPauseUntilRef = useRef<number>(0);
  const isDragIntentRef = useRef(false);
  const dragStartRef = useRef<{ startX: number; startScrollLeft: number; hasMoved: boolean }>({
    startX: 0,
    startScrollLeft: 0,
    hasMoved: false,
  });

  const cameraItems = equipment.length > 0 ? equipment : [];

  const filteredCameras = cameraItems.filter(
    (c) => selectedBrand === "all" || c.brand.toLowerCase() === selectedBrand.toLowerCase()
  );

  // Duplicated list for seamless looping
  const displayItems = [...filteredCameras, ...filteredCameras];

  const pauseManual = useCallback((ms = 3500) => {
    manualPauseUntilRef.current = Date.now() + ms;
  }, []);

  // Measure dynamic card scroll step (card width + gap)
  const getCardScrollStep = () => {
    const slider = sliderRef.current;
    if (!slider) return 330;
    const firstCard = slider.firstElementChild as HTMLElement | null;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const style = window.getComputedStyle(slider);
      const gap = parseFloat(style.columnGap || style.gap) || 24;
      return cardWidth + gap;
    }
    return 330;
  };

  // Normalize boundary without visible jump
  const normalizeScrollPosition = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const halfWidth = slider.scrollWidth / 2;
    if (halfWidth <= 0) return;

    if (slider.scrollLeft >= halfWidth) {
      slider.scrollLeft -= halfWidth;
    } else if (slider.scrollLeft <= 0) {
      slider.scrollLeft += halfWidth;
    }
  };

  // Continuous Autoplay loop (Clean state separation)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || filteredCameras.length === 0) return;

    let animationFrameId: number;
    const scrollSpeed = 0.75;

    const step = () => {
      const now = Date.now();
      const isPaused = isHovered || isDragging || now < manualPauseUntilRef.current;

      if (!isPaused && slider) {
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
  }, [isHovered, isDragging, filteredCameras.length]);

  // Arrow buttons manual navigation
  const scrollLeft = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    pauseManual(3500);
    normalizeScrollPosition();

    const step = getCardScrollStep();
    slider.scrollBy({
      left: -step,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    pauseManual(3500);
    normalizeScrollPosition();

    const step = getCardScrollStep();
    slider.scrollBy({
      left: step,
      behavior: "smooth",
    });
  };

  // Desktop Pointer Drag (Mouse/Pen)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || e.button !== 0) return;

    const slider = sliderRef.current;
    if (!slider) return;

    dragStartRef.current = {
      startX: e.clientX,
      startScrollLeft: slider.scrollLeft,
      hasMoved: false,
    };
    isDragIntentRef.current = true;
    pauseManual(3500);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragIntentRef.current) return;
    const slider = sliderRef.current;
    if (!slider) return;

    const deltaX = e.clientX - dragStartRef.current.startX;

    // 6px threshold to distinguish click vs drag
    if (!dragStartRef.current.hasMoved && Math.abs(deltaX) > 6) {
      dragStartRef.current.hasMoved = true;
      setIsDragging(true);
      try {
        slider.setPointerCapture(e.pointerId);
      } catch (_) {}
    }

    if (dragStartRef.current.hasMoved) {
      slider.scrollLeft = dragStartRef.current.startScrollLeft - deltaX;
      normalizeScrollPosition();
      pauseManual(3500);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragIntentRef.current) return;
    isDragIntentRef.current = false;

    const slider = sliderRef.current;
    if (slider && dragStartRef.current.hasMoved) {
      try {
        slider.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }

    // Brief timeout so link click is suppressed if moved
    setTimeout(() => {
      setIsDragging(false);
      dragStartRef.current.hasMoved = false;
    }, 60);

    pauseManual(3500);
  };

  const handlePointerCancel = () => {
    isDragIntentRef.current = false;
    setIsDragging(false);
    dragStartRef.current.hasMoved = false;
    pauseManual(2000);
  };

  // Prevent accidental link navigation on drag
  const handleCardClick = (e: React.MouseEvent) => {
    if (dragStartRef.current.hasMoved || isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Reset scroll on brand filter change
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
    pauseManual(2500);
  };

  const fujiCount = cameraItems.filter((c) => c.brand.toLowerCase() === "fujifilm").length;
  const canonCount = cameraItems.filter((c) => c.brand.toLowerCase() === "canon").length;
  const sonyCount = cameraItems.filter((c) => c.brand.toLowerCase() === "sony").length;

  return (
    <section id="bang-gia" className="py-20 sm:py-28 bg-[#faf8f4] overflow-hidden border-t border-[#e8e2d7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0eae1] border border-[#e2dbcf] text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>BẢNG GIÁ NIÊM YẾT · ĐỒNG HỚI</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight leading-tight font-mono">
              Bảng Giá Thuê Máy Ảnh Kiho
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-600 font-medium max-w-xl leading-relaxed">
              Máy chuẩn, giá niêm yết rõ ràng, trọn bộ phụ kiện đi kèm — nhận máy là chụp đẹp ngay.
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
                  onClick={() => handleBrandChange(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
                    selectedBrand === tab.key
                      ? "bg-white text-ink-900 shadow-xs"
                      : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Next / Prev Buttons (Smooth manual navigation with autoplay pause) */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={scrollLeft}
                className="w-9 h-9 rounded-xl bg-white border border-[#e0d6c7] hover:bg-ink-900 hover:text-white text-ink-800 flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Xem dòng máy trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                className="w-9 h-9 rounded-xl bg-white border border-[#e0d6c7] hover:bg-ink-900 hover:text-white text-ink-800 flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Xem dòng máy tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Track with Real Pointer Drag & Isolated Autoplay */}
        <div
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onTouchStart={() => pauseManual(4000)}
          onTouchEnd={() => pauseManual(3000)}
          className={`flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none pb-6 pt-2 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            touchAction: "pan-y",
          }}
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
                className="w-[280px] sm:w-[310px] shrink-0 bg-white rounded-3xl p-5 border border-[#e8e2d7]/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-ink-900/30 transition-all duration-300 flex flex-col justify-between group relative"
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
                  onClick={handleCardClick}
                  draggable={false}
                  className="relative aspect-square w-full my-1 flex items-center justify-center p-2 rounded-2xl bg-[#faf8f4] block focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Image
                    src={coverImg}
                    alt={item.name}
                    fill
                    sizes="310px"
                    draggable={false}
                    className="object-contain p-2 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] group-hover:scale-[1.03] transition-transform duration-300 ease-out select-none"
                  />
                </Link>

                {/* Model Info */}
                <div className="mt-2 mb-3">
                  <Link href={`/thiet-bi/${item.slug}`} onClick={handleCardClick} draggable={false}>
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
                    onClick={handleCardClick}
                    draggable={false}
                    className="w-full bg-ink-900 hover:bg-accent text-white text-xs font-mono font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <span>Xem chi tiết máy</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Full Equipment Catalog & Subtle Trust Chip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/thiet-bi"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-ink-900 text-ink-900 hover:text-white border border-[#e0d6c7] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-xs group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>Xem toàn bộ 12 dòng máy ảnh</span>
            <ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-white transition-colors" />
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0eae1] border border-[#e2dbcf] text-xs font-mono text-ink-700">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span>Kèm trọn bộ 2 pin, sạc đôi & thẻ nhớ</span>
          </div>
        </div>

      </div>
    </section>
  );
}
