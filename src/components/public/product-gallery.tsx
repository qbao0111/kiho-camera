"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EquipmentImage } from "@/types/database";

interface ProductGalleryProps {
  images?: EquipmentImage[];
  productName: string;
}

export function ProductGallery({ images = [], productName }: ProductGalleryProps) {
  const defaultImage =
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80";

  const imageList =
    images.length > 0
      ? images.map((img) => img.image_url)
      : [defaultImage];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Large Photography */}
      <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden bg-[#f3efe9]">
        <Image
          src={imageList[activeIndex] || defaultImage}
          alt={`${productName} - ảnh ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Discreet Thumbnails List */}
      {imageList.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {imageList.map((url, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative w-20 h-16 rounded-sm overflow-hidden bg-[#f3efe9] transition-all shrink-0 ${
                activeIndex === index
                  ? "ring-2 ring-ink-900 opacity-100"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={url}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
