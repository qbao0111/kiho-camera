"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { EquipmentSampleImage } from "@/types/database";

interface SamplePhotoGalleryProps {
  cameraName: string;
  sampleImages?: EquipmentSampleImage[];
}

export function SamplePhotoGallery({ cameraName, sampleImages = [] }: SamplePhotoGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const activeImages = sampleImages.filter((img) => img.is_active);

  // Lock body scroll and listen for ESC / arrow keys
  useEffect(() => {
    if (selectedIdx === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIdx(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedIdx((prev) => (prev! > 0 ? prev! - 1 : activeImages.length - 1));
      } else if (e.key === "ArrowRight") {
        setSelectedIdx((prev) => (prev! < activeImages.length - 1 ? prev! + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIdx, activeImages.length]);

  if (!sampleImages || sampleImages.length === 0 || activeImages.length === 0) {
    return null;
  }

  return (
    <section className="pt-12 sm:pt-16 hairline-t">
      {/* Section Title */}
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0eae1] border border-[#e2dbcf] text-xs font-mono font-bold uppercase tracking-wider text-ink-700">
          <Camera className="w-3.5 h-3.5 text-accent" />
          <span>ẢNH CHỤP THỰC TẾ</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-ink-900 tracking-tight font-mono uppercase">
          Màu ảnh thực tế từ {cameraName}
        </h2>
        <p className="text-xs sm:text-sm text-ink-600 font-medium max-w-2xl">
          Không filter quảng cáo — đây là chất lượng ảnh, màu da và độ chi tiết bạn có thể kỳ vọng khi mang chiếc máy này đi chơi.
        </p>
      </div>

      {/* Masonry / Responsive Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {activeImages.map((sample, idx) => (
          <div
            key={sample.id || idx}
            onClick={() => setSelectedIdx(idx)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#faf8f4] border border-[#e8e2d7] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
          >
            <Image
              src={sample.image_url}
              alt={sample.alt_text || `Ảnh chụp thực tế từ ${cameraName}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay Gradient & Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
              <div className="self-end p-2 rounded-full bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>

              <div>
                <p className="text-xs font-medium text-white/95 line-clamp-2">
                  {sample.caption || `Chụp bằng ${cameraName}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal (Highest z-index, ESC & click outside to close) */}
      {selectedIdx !== null && (
        <div
          onClick={() => setSelectedIdx(null)}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Top Bar with Counter and Close button */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 left-4 right-4 flex items-center justify-between z-50 text-white/80 font-mono text-xs"
          >
            <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md">
              {selectedIdx + 1} / {activeImages.length}
            </span>

            <button
              onClick={() => setSelectedIdx(null)}
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
              setSelectedIdx((prev) => (prev! > 0 ? prev! - 1 : activeImages.length - 1));
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
              setSelectedIdx((prev) => (prev! < activeImages.length - 1 ? prev! + 1 : 0));
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors z-40"
            aria-label="Ảnh kế"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center max-w-5xl w-full max-h-[85vh] z-30"
          >
            <div className="relative w-full h-[65vh] sm:h-[75vh]">
              <Image
                src={activeImages[selectedIdx].image_url}
                alt={cameraName}
                fill
                sizes="100vw"
                className="object-contain select-none"
              />
            </div>
            {activeImages[selectedIdx].caption && (
              <div className="mt-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-medium text-center max-w-xl font-mono">
                {activeImages[selectedIdx].caption}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
