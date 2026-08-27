"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, ZoomIn } from "lucide-react";
import { EquipmentSampleImage } from "@/types/database";
import { ImageLightbox, LightboxImage } from "@/components/ui/image-lightbox";

interface SamplePhotoGalleryProps {
  cameraName: string;
  sampleImages?: EquipmentSampleImage[];
}

export function SamplePhotoGallery({ cameraName, sampleImages = [] }: SamplePhotoGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const activeImages = sampleImages.filter((img) => img.is_active);

  if (!sampleImages || sampleImages.length === 0 || activeImages.length === 0) {
    return null;
  }

  // Format images for shared lightbox
  const lightboxImages: LightboxImage[] = activeImages.map((sample) => ({
    url: sample.image_url,
    alt: sample.alt_text || `Ảnh chụp thực tế từ ${cameraName}`,
    caption: sample.caption ? `${cameraName} · ${sample.caption}` : `Màu ảnh thực tế từ ${cameraName}`,
  }));

  return (
    <section id="anh-chup-thuc-te" className="pt-12 sm:pt-16 hairline-t scroll-mt-24 sm:scroll-mt-28">
      {/* Section Title */}
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0eae1] border border-[#e2dbcf] text-xs font-mono font-bold uppercase tracking-wider text-ink-700">
          <Camera className="w-3.5 h-3.5 text-accent" />
          <span>ẢNH CHỤP THỰC TẾ</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-ink-900 tracking-tight font-mono uppercase">
          Màu ảnh thực tế từ {cameraName}
        </h2>
        <p className="text-xs sm:text-sm text-ink-600 font-medium max-w-2xl leading-relaxed">
          Xem thử chiếc máy này cho ra màu da, ánh sáng và không khí bức ảnh như thế nào trước khi chọn thuê.
        </p>
      </div>

      {/* Photography-first Responsive Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {activeImages.map((sample, idx) => (
          <div
            key={sample.id || idx}
            onClick={() => setSelectedIdx(idx)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#faf8f4] border border-[#e8e2d7] cursor-zoom-in shadow-xs hover:shadow-md transition-all duration-300"
          >
            <Image
              src={sample.image_url}
              alt={sample.alt_text || `Ảnh chụp thực tế từ ${cameraName}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />

            {/* Subtle Hover Overlay (Photography-first: light gradient on hover only) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
              <div className="self-end p-2 rounded-full bg-black/30 backdrop-blur-xs">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>

              {sample.caption && (
                <div>
                  <p className="text-xs font-medium text-white/95 line-clamp-2 drop-shadow-sm">
                    {sample.caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Shared Unified Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        activeIndex={selectedIdx !== null ? selectedIdx : 0}
        open={selectedIdx !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedIdx(null);
        }}
        onIndexChange={(idx) => setSelectedIdx(idx)}
      />
    </section>
  );
}
