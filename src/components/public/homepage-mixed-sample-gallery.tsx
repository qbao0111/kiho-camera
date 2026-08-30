import React from "react";
import { Camera } from "lucide-react";
import { Equipment } from "@/types/database";
import {
  HomepageSampleGalleryClient,
  HomepageSampleItem,
} from "./homepage-sample-gallery-client";

interface HomepageMixedSampleGalleryProps {
  equipmentList: Equipment[];
}

/**
 * Extracts and interleaves all active sample photos from all active cameras
 * in a deterministic round-robin pattern (Camera A1, Camera B1, Camera C1, Camera A2...).
 */
export function buildHomepageMixedSampleItems(
  equipmentList: Equipment[]
): HomepageSampleItem[] {
  const cameraQueues: HomepageSampleItem[][] = [];

  for (const eq of equipmentList) {
    if (!eq.is_active) continue;
    const activeSamples = (eq.sample_images || [])
      .filter((s) => s.is_active)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

    if (activeSamples.length === 0) continue;

    const items: HomepageSampleItem[] = activeSamples.map((s) => ({
      id: s.id,
      imageUrl: s.image_url,
      altText:
        s.alt_text || `Ảnh chụp thực tế từ ${eq.name} tại Kiho Camera`,
      caption: s.caption || null,
      cameraName: eq.name,
      cameraSlug: eq.slug,
      brand: eq.brand,
      sortOrder: s.sort_order ?? 0,
    }));

    cameraQueues.push(items);
  }

  const mixed: HomepageSampleItem[] = [];
  let hasMore = true;
  let round = 0;

  while (hasMore) {
    hasMore = false;
    for (const queue of cameraQueues) {
      if (round < queue.length) {
        mixed.push(queue[round]);
        if (round + 1 < queue.length) {
          hasMore = true;
        }
      }
    }
    round++;
  }

  return mixed;
}

export function HomepageMixedSampleGallery({
  equipmentList,
}: HomepageMixedSampleGalleryProps) {
  const sampleItems = buildHomepageMixedSampleItems(equipmentList);

  if (!sampleItems || sampleItems.length === 0) {
    return null;
  }

  return (
    <section
      id="anh-chup-thuc-te"
      aria-labelledby="homepage-sample-photos-heading"
      className="py-14 sm:py-20 bg-canvas-100 border-t border-ink-200 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 space-y-2.5">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-ink-600 uppercase">
          <Camera className="w-3.5 h-3.5 text-accent" />
          <span>ẢNH CHỤP THỰC TẾ · REAL SAMPLE SHOTS</span>
        </div>

        {/* Heading */}
        <h2
          id="homepage-sample-photos-heading"
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-tight"
        >
          Xem ảnh thật từ những chiếc máy{" "}
          <br className="hidden sm:inline" />
          <span className="italic text-accent font-normal">tại Kiho Camera</span>
        </h2>

        {/* Editorial Subtitle */}
        <p className="text-sm sm:text-base text-ink-600 font-sans font-normal max-w-3xl leading-relaxed pt-1">
          Không chỉ xem tên máy hay thông số kỹ thuật. Đây là những khoảnh khắc thực tế được lưu lại theo từng dòng máy, giúp bạn dễ hình dung chất màu, độ nét và cảm giác ảnh trước khi quyết định chọn chiếc máy đồng hành.
        </p>

        {/* Transparency note */}
        <p className="text-[11px] sm:text-xs text-ink-400 font-sans italic pt-0.5">
          * Màu ảnh thực tế có thể thay đổi theo điều kiện ánh sáng, bối cảnh chuyến đi và thiết lập máy của người chụp.
        </p>
      </div>

      {/* Interactive Photo Rail & Lightbox Showcase */}
      <HomepageSampleGalleryClient items={sampleItems} />
    </section>
  );
}
