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

  const lightboxImages: LightboxImage[] = activeImages.map((sample) => ({
    url: sample.image_url,
    alt: sample.alt_text || `Ảnh chụp thực tế từ ${cameraName}`,
    caption: sample.caption ? `${cameraName} · ${sample.caption}` : `Màu ảnh thực tế từ ${cameraName}`,
  }));

  return (
    <section id="anh-chup-thuc-te" className="pt-10 sm:pt-14 border-t border-ink-200 scroll-mt-24 sm:scroll-mt-28">
      {/* Section Title */}
      <div className="space-y-2 mb-6 sm:mb-8">
        <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-widest text-ink-500 uppercase">
          <Camera className="w-3.5 h-3.5 text-accent" />
          <span>ẢNH CHỤP THỰC TẾ</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
          Màu ảnh thực tế từ {cameraName}
        </h2>
        <p className="text-xs sm:text-sm text-ink-600 font-sans font-normal max-w-2xl leading-relaxed">
          Xem thử chiếc máy này cho ra màu da, ánh sáng và không khí bức ảnh như thế nào trước khi chọn thuê.
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {activeImages.map((sample, idx) => (
          <div
            key={sample.id || idx}
            onClick={() => setSelectedIdx(idx)}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-canvas-100 border border-ink-200 cursor-zoom-in shadow-xs hover:shadow-md transition-all duration-200"
          >
            <Image
              src={sample.image_url}
              alt={sample.alt_text || `Ảnh chụp thực tế từ ${cameraName}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3.5 text-white">
              <div className="self-end p-1.5 rounded-md bg-black/40">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>

              {sample.caption && (
                <div>
                  <p className="text-xs font-sans font-medium text-white/95 line-clamp-2 drop-shadow-sm">
                    {sample.caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
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
