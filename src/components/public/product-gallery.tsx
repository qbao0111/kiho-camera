"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { EquipmentImage } from "@/types/database";
import { ImageLightbox, LightboxImage } from "@/components/ui/image-lightbox";

interface ProductGalleryProps {
  images?: EquipmentImage[];
  productName: string;
}

export function ProductGallery({ images = [], productName }: ProductGalleryProps) {
  // Assemble product-only image list (No price poster in gallery)
  const imageList: LightboxImage[] = [];

  if (images && images.length > 0) {
    images.forEach((img) =>
      imageList.push({
        url: img.image_url,
        alt: `${productName} - ảnh chi tiết`,
      })
    );
  }

  if (imageList.length === 0) {
    imageList.push({
      url: "/images/cameras/canon-r50.jpg",
      alt: productName,
    });
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Main Showcase Image */}
      <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-white p-6 border border-[#e8e2d7] shadow-[0_4px_20px_rgba(0,0,0,0.04)] group">
        <Image
          src={imageList[activeIndex]?.url || imageList[0].url}
          alt={`${productName} - ảnh ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-4 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] cursor-zoom-in group-hover:scale-[1.01] transition-transform duration-300"
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Subtle Zoom In Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-white/90 text-ink-900 border border-black/5 hover:bg-ink-900 hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-xs cursor-pointer"
          aria-label="Phóng to ảnh"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        {/* Index indicator (only shown if multiple images) */}
        {imageList.length > 1 && (
          <div className="absolute top-4 left-4">
            <span className="px-2.5 py-1 rounded-full bg-[#f0eae1] text-ink-700 text-[10px] font-mono font-bold tracking-wider uppercase">
              {activeIndex + 1} / {imageList.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails Row (only rendered if >= 2 images) */}
      {imageList.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {imageList.map((img, index) => {
            const isSelected = activeIndex === index;

            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-white p-2 border transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "border-ink-900 ring-1 ring-ink-900 opacity-100 shadow-xs"
                    : "border-[#e8e2d7] opacity-65 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Shared Unified Lightbox */}
      <ImageLightbox
        images={imageList}
        activeIndex={activeIndex}
        open={isLightboxOpen}
        onOpenChange={setIsLightboxOpen}
        onIndexChange={setActiveIndex}
      />
    </div>
  );
}
