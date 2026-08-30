"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Camera,
  ArrowRight,
} from "lucide-react";
import { ImageLightbox, LightboxImage } from "@/components/ui/image-lightbox";

export interface HomepageSampleItem {
  id: string;
  imageUrl: string;
  altText: string;
  caption: string | null;
  cameraName: string;
  cameraSlug: string;
  brand: string;
  sortOrder: number;
}

interface HomepageSampleGalleryClientProps {
  items: HomepageSampleItem[];
}

export function HomepageSampleGalleryClient({
  items,
}: HomepageSampleGalleryClientProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const railRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Update scroll indicator and active index on scroll
  const handleScroll = useCallback(() => {
    if (!railRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = railRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Approximate current visible index
    const firstChild = railRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth + 16 : 300;
    const activeIdx = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(Math.max(0, activeIdx), items.length - 1));
  }, [items.length]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    rail.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => rail.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Desktop mouse drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !railRef.current) return;
    isMouseDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - railRef.current.offsetLeft;
    scrollLeftRef.current = railRef.current.scrollLeft;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current || !railRef.current) return;
    e.preventDefault();
    const x = e.pageX - railRef.current.offsetLeft;
    const distance = x - startXRef.current;
    if (Math.abs(distance) > 6) {
      hasDraggedRef.current = true;
    }
    railRef.current.scrollLeft = scrollLeftRef.current - distance;
  };

  const handleMouseUpOrLeave = () => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    setIsDragging(false);
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 60);
  };

  const handleCardClick = (idx: number) => {
    if (hasDraggedRef.current) return;
    setSelectedIdx(idx);
  };

  // Desktop manual navigation buttons
  const scrollPrev = () => {
    if (!railRef.current) return;
    const firstChild = railRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth + 16 : 320;
    railRef.current.scrollBy({ left: -cardWidth * 1.5, behavior: "smooth" });
  };

  const scrollNext = () => {
    if (!railRef.current) return;
    const firstChild = railRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth + 16 : 320;
    railRef.current.scrollBy({ left: cardWidth * 1.5, behavior: "smooth" });
  };

  // Prepare lightbox data
  const lightboxImages: LightboxImage[] = items.map((item) => ({
    url: item.imageUrl,
    alt: item.altText,
    caption: item.caption
      ? `${item.cameraName} · ${item.caption}`
      : `Ảnh chụp thực tế từ ${item.cameraName} tại Kiho Camera`,
  }));

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Top Controls Bar: Counter & Desktop Prev/Next Buttons */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-canvas-200 text-ink-700 border border-ink-300/80 shadow-2xs">
            <span className="text-ink-900 font-bold">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-1 text-ink-400">/</span>
            <span>{String(items.length).padStart(2, "0")}</span>
            <span className="ml-1.5 text-[11px] text-ink-500 font-sans hidden xs:inline">
              khoảnh khắc
            </span>
          </span>
          <span className="text-xs text-ink-500 font-sans hidden sm:inline">
            · Kéo chuột hoặc vuốt để xem ảnh · Bấm để phóng to
          </span>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            aria-label="Xem ảnh phía trước"
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
              canScrollLeft
                ? "bg-white border-ink-300 text-ink-800 hover:bg-canvas-200 hover:text-ink-900 shadow-2xs"
                : "bg-canvas-200/50 border-ink-200 text-ink-400 cursor-not-allowed opacity-60"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollRight}
            aria-label="Xem ảnh tiếp theo"
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
              canScrollRight
                ? "bg-white border-ink-300 text-ink-800 hover:bg-canvas-200 hover:text-ink-900 shadow-2xs"
                : "bg-canvas-200/50 border-ink-200 text-ink-400 cursor-not-allowed opacity-60"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Horizontal Photo Rail with Mouse Drag and Touch Support */}
      <div
        ref={railRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none px-4 sm:px-6 lg:px-8 pb-4 pt-1 -mx-0 overscroll-x-contain select-none cursor-grab ${
          isDragging
            ? "snap-none cursor-grabbing"
            : "snap-x snap-mandatory scroll-smooth"
        }`}
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((item, idx) => (
          <figure
            key={item.id || idx}
            className="w-[82vw] xs:w-[75vw] sm:w-[320px] md:w-[300px] lg:w-[280px] shrink-0 snap-start flex flex-col group select-none"
          >
            {/* Clickable Image Box with Zoom Interaction */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(idx);
                }
              }}
              aria-label={`Xem ảnh chụp từ ${item.cameraName}: ${
                item.caption || item.altText
              }`}
              className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-canvas-200 border border-ink-200/80 shadow-2xs hover:shadow-md transition-all duration-300 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent select-none"
            >
              <Image
                src={item.imageUrl}
                alt={item.altText}
                fill
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 320px, 280px"
                quality={80}
                draggable={false}
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out pointer-events-none select-none"
              />

              {/* Camera Model Badge Overlay (Top-Left) */}
              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <div className="bg-ink-900/85 backdrop-blur-xs text-white text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 animate-pulse" />
                  <span className="tracking-wide">{item.cameraName}</span>
                </div>
              </div>

              {/* Subtle Zoom Indicator (Top-Right on hover/focus) */}
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="w-7 h-7 rounded-md bg-black/50 backdrop-blur-xs text-white flex items-center justify-center border border-white/20 shadow-sm">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom Gradient Sheen for Photo Depth */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity" />
            </div>

            {/* Figcaption & Metadata underneath */}
            <figcaption className="mt-2.5 px-0.5 space-y-1 flex-1 flex flex-col justify-between">
              {item.caption ? (
                <p className="text-xs font-sans text-ink-700 line-clamp-2 leading-relaxed font-normal">
                  {item.caption}
                </p>
              ) : (
                <p className="text-xs font-sans text-ink-500 italic leading-relaxed">
                  Ảnh chụp thực tế
                </p>
              )}

              {/* Camera Product Link */}
              <div className="pt-0.5">
                <Link
                  href={`/thiet-bi/${item.cameraSlug}`}
                  className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-accent hover:underline group-hover:text-accent-hover transition-colors"
                >
                  <span>Xem máy {item.cameraName}</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Bottom Editorial Callout & Discovery Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-ink-200/80 text-xs font-sans text-ink-600">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Camera className="w-4 h-4 text-accent shrink-0" />
            <span>
              Thấy đúng chất ảnh bạn yêu thích? Khám phá trọn bộ 12 dòng máy du lịch tại Kiho.
            </span>
          </div>

          <Link
            href="/thiet-bi"
            className="inline-flex items-center gap-1.5 font-semibold text-ink-900 hover:text-accent bg-white hover:bg-canvas-200 border border-ink-300 px-4 py-2 rounded-lg transition-colors shadow-2xs shrink-0"
          >
            <span>Xem tất cả 12 dòng máy</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent" />
          </Link>
        </div>
      </div>

      {/* Shared Lightbox Component */}
      <ImageLightbox
        images={lightboxImages}
        activeIndex={selectedIdx !== null ? selectedIdx : 0}
        open={selectedIdx !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedIdx(null);
        }}
        onIndexChange={(idx) => setSelectedIdx(idx)}
      />
    </div>
  );
}
