"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Equipment } from "@/types/database";
import { getEquipmentCoverImage } from "@/lib/equipment-images";

interface ProductCardProps {
  equipment: Equipment;
  priority?: boolean;
}

export function ProductCard({ equipment, priority = false }: ProductCardProps) {
  const coverImage = getEquipmentCoverImage(equipment);

  const formatK = (price: number) => {
    if (!price) return "---";
    return `${Math.round(price / 1000)}K`;
  };

  return (
    <article className="group bg-white rounded-xl p-4 sm:p-5 border border-ink-200 shadow-xs hover:shadow-md hover:border-ink-300 transition-all duration-200 flex flex-col justify-between h-full">
      <div>
        {/* Camera Photography Container */}
        <Link
          href={`/thiet-bi/${equipment.slug}`}
          className="relative block aspect-[4/3] w-full bg-canvas-100 overflow-hidden rounded-lg p-3 mb-3.5 border border-ink-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Image
            src={coverImage}
            alt={equipment.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.1)] group-hover:scale-[1.03] transition-transform duration-200 ease-out"
          />

          {/* Discreet Kiho Pick Badge */}
          {equipment.is_featured && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="bg-ink-900 text-white text-[10px] font-mono font-medium uppercase px-2 py-0.5 rounded-sm shadow-xs">
                KIHO PICK
              </span>
            </div>
          )}

          {/* Brand Tag Top Right */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="bg-white/95 text-ink-700 text-[10px] font-mono font-medium uppercase px-2 py-0.5 rounded-sm border border-ink-200 shadow-xs">
              {equipment.brand}
            </span>
          </div>
        </Link>

        {/* Model & Metadata */}
        <div className="space-y-1 px-0.5">
          {equipment.use_cases?.length > 0 && (
            <div className="text-[11px] font-mono font-medium text-ink-400 uppercase tracking-wide">
              {equipment.use_cases.slice(0, 2).join(" · ")}
            </div>
          )}

          <Link
            href={`/thiet-bi/${equipment.slug}`}
            className="block group-hover:text-accent transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <h3 className="font-sans text-base sm:text-lg font-bold text-ink-900 tracking-tight leading-snug">
              {equipment.name}
            </h3>
          </Link>

          <p className="font-sans text-xs text-ink-500 line-clamp-2 leading-relaxed font-normal">
            {equipment.short_description || "Kèm trọn bộ 2 pin, sạc, thẻ nhớ 64GB và túi chống sốc"}
          </p>
        </div>
      </div>

      {/* Price Hierarchy & Button */}
      <div className="pt-3.5 mt-3.5 border-t border-ink-200 px-0.5 space-y-2.5">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold font-mono text-ink-900">
                {formatK(equipment.price_per_day)}
              </span>
              <span className="text-xs text-ink-400 font-mono">/ ngày</span>
            </div>
            <div className="text-[11px] text-ink-500 font-mono">
              {formatK(equipment.price_session)} / buổi · {formatK(equipment.price_three_days)} / 3 ngày+
            </div>
          </div>

          <Link
            href={`/thiet-bi/${equipment.slug}`}
            className="inline-flex items-center gap-1.5 bg-canvas-200 group-hover:bg-ink-900 text-ink-900 group-hover:text-white text-xs font-sans font-semibold px-3 py-2 rounded-lg transition-all duration-200 shadow-xs shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`Xem máy ${equipment.name}`}
          >
            <span>Xem máy</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
