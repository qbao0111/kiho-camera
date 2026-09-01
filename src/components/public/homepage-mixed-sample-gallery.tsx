import React from "react";
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
      altText: s.alt_text || `Ảnh chụp thực tế từ ${eq.name} tại Kiho Camera`,
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
  const allSampleItems = buildHomepageMixedSampleItems(equipmentList);

  if (!allSampleItems || allSampleItems.length === 0) {
    return null;
  }

  // Cap initial SSR/hydration to 10 representative photos (1 per camera first, then 2nd round)
  // to materially reduce DOM element count and initial HTML size
  const initialItems = allSampleItems.slice(0, 10);

  return (
    <section
      id="anh-chup-thuc-te"
      aria-labelledby="homepage-sample-photos-heading"
      className="py-14 sm:py-20 bg-canvas-100 border-t border-ink-200 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 space-y-2.5">
        {/* Context Label */}
        <span className="text-xs font-sans font-semibold text-accent uppercase tracking-wider">
          Ảnh chụp thực tế
        </span>

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
          Không chỉ xem thông số kỹ thuật. Đây là những khoảnh khắc thực tế được chụp từ các dòng máy Canon, Fujifilm và Sony tại Kiho Camera, giúp bạn dễ hình dung chất màu và độ nét trước chuyến đi.
        </p>
      </div>

      {/* Optimized Client Gallery with Initial 10 items + On-demand Full View */}
      <HomepageSampleGalleryClient
        initialItems={initialItems}
        allItems={allSampleItems}
      />
    </section>
  );
}
