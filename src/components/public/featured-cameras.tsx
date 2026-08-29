import React from "react";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { Equipment } from "@/types/database";
import { ProductCard } from "@/components/public/product-card";

interface FeaturedCamerasProps {
  equipment: Equipment[];
}

export function FeaturedCameras({ equipment }: FeaturedCamerasProps) {
  // Select top 6 curated cameras (X100VI, X100V, XS10, G7X III, R50, ZV1 Mark II)
  const featuredList = equipment
    .filter((e) =>
      ["fujifilm-x100vi", "fujifilm-x100v", "fujifilm-xs10", "canon-g7x-mark-iii", "canon-eos-r50", "sony-zv1-mark-ii"].includes(e.slug)
    )
    .slice(0, 6);

  const displayList = featuredList.length > 0 ? featuredList : equipment.slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-ink-200">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-widest text-ink-500 uppercase mb-2">
              <Camera className="w-3.5 h-3.5 text-accent" />
              <span>GỢI Ý DU LỊCH</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
              Máy đang có tại Kiho
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-600 font-sans font-normal max-w-xl">
              Những dòng máy được khách thuê nhiều nhất cho các chuyến đi Phong Nha, check-in biển và chụp kỷ niệm.
            </p>
          </div>

          <Link
            href="/thiet-bi"
            className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-ink-900 hover:text-accent transition-colors shrink-0"
          >
            <span>Xem cả 12 máy ảnh</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Curated Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayList.map((camera) => (
            <ProductCard key={camera.id} equipment={camera} priority={false} />
          ))}
        </div>


        {/* Bottom Callout */}
        <div className="text-center pt-2">
          <Link
            href="/thiet-bi"
            className="inline-flex items-center gap-2 bg-white hover:bg-canvas-200 text-ink-900 border border-ink-300 px-6 py-3.5 rounded-lg text-xs font-sans font-semibold transition-all duration-200 shadow-xs group"
          >
            <span>Khám phá toàn bộ 12 dòng máy tại shop</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
