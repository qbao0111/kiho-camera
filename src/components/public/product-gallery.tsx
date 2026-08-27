"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { EquipmentImage } from "@/types/database";

interface ProductGalleryProps {
  images?: EquipmentImage[];
  pricePosterUrl?: string | null;
  productName: string;
}

export function ProductGallery({ images = [], pricePosterUrl, productName }: ProductGalleryProps) {
  // Assemble full image list (product images + price poster if available)
  const imageList: string[] = [];

  if (images.length > 0) {
    images.forEach((img) => imageList.push(img.image_url));
  }

  if (pricePosterUrl && !imageList.includes(pricePosterUrl)) {
    imageList.push(pricePosterUrl);
  }

  if (imageList.length === 0) {
    imageList.push("/images/cameras/canon-r50.jpg");
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Lock body scroll and listen for ESC / arrow keys
  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, imageList.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-4">
      {/* Main Showcase Image */}
      <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-white p-6 border border-[#e8e2d7] shadow-[0_4px_20px_rgba(0,0,0,0.04)] group">
        <Image
          src={imageList[activeIndex]}
          alt={`${productName} - ảnh ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-4 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] cursor-pointer group-hover:scale-[1.02] transition-transform duration-300"
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Zoom In Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-ink-900 border border-black/5 hover:bg-ink-900 hover:text-white transition-colors shadow-xs"
          aria-label="Phóng to ảnh"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Index indicator */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-[#f0eae1] text-ink-800 text-[10px] font-mono font-bold tracking-wider uppercase">
            {activeIndex + 1} / {imageList.length}
          </span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {imageList.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {imageList.map((url, index) => {
            const isPoster = url.includes("price-posters");
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-white p-2 border transition-all shrink-0 ${
                  activeIndex === index
                    ? "border-ink-900 ring-2 ring-ink-900 shadow-xs scale-105"
                    : "border-[#e0d6c7] opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                />
                {isPoster && (
                  <span className="absolute bottom-1 right-1 bg-accent text-white text-[8px] font-mono px-1 rounded-xs">
                    Bảng giá
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal (z-[9999], ESC & backdrop click to close) */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Top Bar with Counter and Close button */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 left-4 right-4 flex items-center justify-between z-50 text-white/80 font-mono text-xs"
          >
            <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md">
              {activeIndex + 1} / {imageList.length}
            </span>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-black transition-colors flex items-center gap-1.5 px-4 font-bold"
              aria-label="Đóng (ESC)"
            >
              <X className="w-5 h-5" />
              <span className="hidden sm:inline text-xs uppercase tracking-wider">Đóng (ESC)</span>
            </button>
          </div>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors z-40"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors z-40"
            aria-label="Ảnh kế"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Modal Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] w-full h-[70vh] sm:h-[80vh] z-30"
          >
            <Image
              src={imageList[activeIndex]}
              alt={productName}
              fill
              sizes="100vw"
              className="object-contain select-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
