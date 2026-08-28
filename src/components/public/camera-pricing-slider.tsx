"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Calendar, Tag, ArrowUpRight, ShieldCheck, Camera } from "lucide-react";
import { Equipment } from "@/types/database";
import { getEquipmentCoverImage } from "@/lib/equipment-images";

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

  const displayItems = [...filteredCameras, ...filteredCameras];

  const pauseManual = useCallback((ms = 3500) => {
    manualPauseUntilRef.current = Date.now() + ms;
  }, []);

  const getCardScrollStep = () => {
    const slider = sliderRef.current;
    if (!slider) return 320;
    const firstCard = slider.firstElementChild as HTMLElement | null;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const style = window.getComputedStyle(slider);
      const gap = parseFloat(style.columnGap || style.gap) || 20;
      return cardWidth + gap;
    }
    return 320;
  };

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

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || filteredCameras.length === 0) return;

    let animationFrameId: number;
    const scrollSpeed = 0.65;

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

  const handleCardClick = (e: React.MouseEvent) => {
    if (dragStartRef.current.hasMoved || isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

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
    <section id="bang-gia" className="py-16 sm:py-24 bg-[#faf8f5] overflow-hidden border-t border-ink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-widest text-ink-500 uppercase mb-2">
              <Camera className="w-3.5 h-3.5 text-accent" />
              <span>BẢNG GIÁ NIÊM YẾT · ĐỒNG HỚI</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
              Bảng Giá Thuê Máy Ảnh Kiho
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-600 font-sans font-normal max-w-xl leading-relaxed">
              Máy sẵn tại cửa hàng, giá niêm yết rõ ràng, kèm trọn bộ phụ kiện pin sạc thẻ nhớ.
            </p>
          </div>

          {/* Controls: Brand Filter Tabs & Navigation Arrows */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-canvas-200 p-1 rounded-lg border border-ink-200">
              {[
                { key: "all", label: `Tất cả (${cameraItems.length})` },
                { key: "fujifilm", label: `Fujifilm (${fujiCount})` },
                { key: "canon", label: `Canon (${canonCount})` },
                { key: "sony", label: `Sony (${sonyCount})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleBrandChange(tab.key)}
                  className={`px-3 py-1.5 rounded-md text-xs font-sans font-medium transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
                    selectedBrand === tab.key
                      ? "bg-white text-ink-900 shadow-xs font-semibold"
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
                className="w-8 h-8 rounded-lg bg-white border border-ink-200 hover:bg-ink-900 hover:text-white text-ink-800 flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Xem dòng máy trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                className="w-8 h-8 rounded-lg bg-white border border-ink-200 hover:bg-ink-900 hover:text-white text-ink-800 flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Xem dòng máy tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Track */}
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
          className={`flex gap-5 overflow-x-auto scrollbar-none pb-6 pt-2 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            touchAction: "pan-y",
          }}
        >
          {displayItems.map((item, index) => {
            const coverImg = getEquipmentCoverImage(item);

            const formatK = (price: number) => {
              if (!price) return "---";
              return `${Math.round(price / 1000)}K`;
            };

            const numStr = String(item.sort_order).padStart(2, "0");

            return (
              <div
                key={`${item.id}-${index}`}
                className="w-[280px] sm:w-[300px] shrink-0 bg-white rounded-xl p-4 sm:p-5 border border-ink-200 shadow-xs hover:shadow-md hover:border-ink-300 transition-all duration-200 flex flex-col justify-between group relative"
              >
                {/* Card Top: Number & Badges */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono text-[11px] font-medium text-ink-400">
                    No. {numStr}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {item.is_featured ? (
                      <span className="px-2 py-0.5 rounded-sm bg-ink-900 text-white text-[10px] font-mono font-medium tracking-wide">
                        KIHO PICK
                      </span>
                    ) : item.badges?.[0] ? (
                      <span className="px-2 py-0.5 rounded-sm bg-canvas-200 text-ink-700 text-[10px] font-mono font-medium border border-ink-200">
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
                  className="relative aspect-square w-full my-1 flex items-center justify-center p-2 rounded-lg bg-canvas-100 block border border-ink-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Image
                    src={coverImg}
                    alt={item.name}
                    fill
                    sizes="300px"
                    draggable={false}
                    className="object-contain p-2 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.1)] group-hover:scale-[1.03] transition-transform duration-200 ease-out select-none"
                  />
                </Link>

                {/* Model Info */}
                <div className="mt-2 mb-3">
                  <Link href={`/thiet-bi/${item.slug}`} onClick={handleCardClick} draggable={false}>
                    <h3 className="font-sans text-base font-bold text-ink-900 tracking-tight group-hover:text-accent transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="font-sans text-xs text-ink-500 line-clamp-1 mt-0.5 font-normal">
                    {item.short_description || "Kèm trọn bộ phụ kiện pin sạc thẻ nhớ"}
                  </p>
                </div>

                {/* Price Grid */}
                <div className="space-y-1.5 pt-3 border-t border-ink-200 font-mono text-xs">
                  <div className="flex items-center justify-between text-ink-600">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-ink-400" />
                      1 buổi:
                    </span>
                    <span className="font-semibold text-ink-900">{formatK(item.price_session)}</span>
                  </div>

                  <div className="flex items-center justify-between text-ink-600">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3 h-3 text-ink-400" />
                      1 ngày:
                    </span>
                    <span className="font-bold text-ink-900 text-sm">{formatK(item.price_per_day)}</span>
                  </div>

                  <div className="flex items-center justify-between bg-accent-light text-accent px-2 py-0.5 rounded-sm font-medium mt-1 border border-accent-muted/60">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Tag className="w-3 h-3" />
                      Từ 3 ngày:
                    </span>
                    <span className="text-xs font-bold">{formatK(item.price_three_days)}/ngày</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 mt-2">
                  <Link
                    href={`/thiet-bi/${item.slug}`}
                    onClick={handleCardClick}
                    draggable={false}
                    className="w-full bg-ink-900 hover:bg-black text-white text-xs font-sans font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <span>Xem chi tiết máy</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Full Equipment Catalog */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/thiet-bi"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-canvas-200 text-ink-900 border border-ink-300 text-xs font-sans font-semibold transition-all duration-200 shadow-xs group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>Xem toàn bộ 12 dòng máy ảnh</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ink-400 group-hover:text-ink-900 transition-colors" />
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-canvas-200/80 border border-ink-200 text-xs font-sans text-ink-700">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span>Kèm trọn bộ 2 pin, sạc đôi & thẻ nhớ 64GB</span>
          </div>
        </div>

      </div>
    </section>
  );
}
