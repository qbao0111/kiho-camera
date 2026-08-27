"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
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
    <section className="py-16 sm:py-24 bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 hairline-b">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0eae1] border border-[#e2dbcf] text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>GỢI Ý DU LỊCH</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight leading-tight">
              Máy đang có tại Kiho
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-600 font-medium max-w-xl">
              Những dòng máy được khách thuê nhiều nhất cho các chuyến đi Phong Nha, check-in biển và chụp kỷ yếu.
            </p>
          </div>

          <Link
            href="/thiet-bi"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-ink-900 hover:text-accent transition-colors shrink-0"
          >
            <span>Xem cả 12 máy ảnh</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Curated Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayList.map((camera, idx) => (
            <ProductCard key={camera.id} equipment={camera} priority={idx < 3} />
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="text-center pt-4">
          <Link
            href="/thiet-bi"
            className="inline-flex items-center gap-2 bg-white hover:bg-ink-900 text-ink-900 hover:text-white border border-[#e0d6c7] px-8 py-4 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-xs group"
          >
            <span>Khám phá toàn bộ 12 dòng máy tại shop</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
