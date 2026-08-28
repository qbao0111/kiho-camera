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
    <div className="space-y-3.5">
      {/* Main Showcase Image */}
      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-white p-5 border border-ink-200 shadow-xs group">
        <Image
          src={imageList[activeIndex]?.url || imageList[0].url}
          alt={`${productName} - ảnh ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-4 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)] cursor-zoom-in group-hover:scale-[1.01] transition-transform duration-200"
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Zoom In Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-3 right-3 p-2 rounded-md bg-white/95 text-ink-900 border border-ink-200 hover:bg-ink-900 hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-xs cursor-pointer"
          aria-label="Phóng to ảnh"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        {/* Index indicator */}
        {imageList.length > 1 && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 rounded-sm bg-canvas-200 text-ink-700 text-[10px] font-mono font-medium tracking-wider uppercase border border-ink-200">
              {activeIndex + 1} / {imageList.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {imageList.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {imageList.map((img, index) => {
            const isSelected = activeIndex === index;

            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative w-18 h-18 rounded-lg overflow-hidden bg-white p-1.5 border transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "border-ink-900 ring-1 ring-ink-900 opacity-100 shadow-xs"
                    : "border-ink-200 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  sizes="72px"
                  className="object-contain p-1"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
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
