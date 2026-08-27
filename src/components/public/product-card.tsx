"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Tag } from "lucide-react";
import { Equipment } from "@/types/database";

interface ProductCardProps {
  equipment: Equipment;
  priority?: boolean;
}

export function ProductCard({ equipment, priority = false }: ProductCardProps) {
  const coverImage =
    equipment.images?.find((img) => img.is_cover)?.image_url ||
    equipment.images?.[0]?.image_url ||
    `/images/cameras/${equipment.slug.replace("canon-eos-", "canon-").replace("-kit", "")}.jpg`;

  const formatK = (price: number) => {
    if (!price) return "---";
    return `${Math.round(price / 1000)}K`;
  };

  return (
    <article className="group bg-white rounded-3xl p-5 border border-[#e8e2d7]/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-ink-900/30 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Large Camera Photography Container */}
        <Link
          href={`/thiet-bi/${equipment.slug}`}
          className="relative block aspect-[4/3] w-full bg-[#faf8f4] overflow-hidden rounded-2xl p-4 mb-4"
        >
          <Image
            src={coverImage}
            alt={equipment.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)] group-hover:scale-[1.03] transition-transform duration-300 ease-out"
          />

          {/* Discreet Kiho Pick Badge */}
          {equipment.is_featured && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-ink-900 text-white text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
                ★ Kiho Pick
              </span>
            </div>
          )}

          {/* Brand Tag Top Right */}
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-white/90 backdrop-blur-md text-ink-800 text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border border-black/5 shadow-xs">
              {equipment.brand}
            </span>
          </div>
        </Link>

        {/* Model & Metadata */}
        <div className="space-y-1.5 px-1">
          <div className="flex items-center gap-2 text-[11px] font-mono font-semibold text-ink-400 uppercase tracking-wider">
            {equipment.use_cases?.length > 0 && (
              <span>{equipment.use_cases.slice(0, 2).join(" · ")}</span>
            )}
          </div>

          <Link href={`/thiet-bi/${equipment.slug}`} className="block group-hover:text-accent transition-colors">
            <h3 className="text-lg font-black text-ink-900 tracking-tight leading-snug font-mono uppercase">
              {equipment.name}
            </h3>
          </Link>

          <p className="text-xs text-ink-500 line-clamp-2 leading-relaxed font-medium">
            {equipment.short_description || "Kèm trọn bộ 2 pin, sạc, thẻ nhớ và túi chống sốc"}
          </p>
        </div>
      </div>

      {/* Price Hierarchy & Button */}
      <div className="pt-4 mt-4 border-t border-[#f0eae1] px-1 space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black font-mono text-ink-900">
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
            className="inline-flex items-center gap-1.5 bg-[#f4efe6] group-hover:bg-ink-900 text-ink-900 group-hover:text-white text-xs font-mono font-bold px-3 py-2 rounded-xl transition-all duration-300 shadow-xs shrink-0"
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
