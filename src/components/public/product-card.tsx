import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Equipment } from "@/types/database";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  equipment: Equipment;
  priority?: boolean;
}

export function ProductCard({ equipment, priority = false }: ProductCardProps) {
  const coverImage =
    equipment.images?.find((img) => img.is_cover)?.image_url ||
    equipment.images?.[0]?.image_url ||
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80";

  return (
    <article className="group flex flex-col justify-between">
      <div>
        {/* Large Photography Container */}
        <Link
          href={`/thiet-bi/${equipment.slug}`}
          className="relative block aspect-[4/3] w-full bg-[#f3efe9] overflow-hidden rounded-md"
        >
          <Image
            src={coverImage}
            alt={equipment.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover img-editorial"
          />

          {/* Minimalist Editorial Highlight (Only 1 discreet tag if featured) */}
          {equipment.is_featured && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-ink-900/90 backdrop-blur-sm text-[#faf8f5] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm">
                Kiho Pick
              </span>
            </div>
          )}
        </Link>

        {/* Metadata & Title */}
        <div className="pt-3.5 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-ink-400 uppercase tracking-wider">
            <span>{equipment.category?.name || "Thiết bị"}</span>
            {equipment.use_cases?.length > 0 && (
              <span className="truncate max-w-[150px] font-normal lowercase">
                {equipment.use_cases.slice(0, 2).join(" · ")}
              </span>
            )}
          </div>

          <Link href={`/thiet-bi/${equipment.slug}`} className="block group-hover:text-accent transition-colors">
            <h3 className="text-base sm:text-lg font-bold text-ink-900 tracking-tight leading-snug">
              {equipment.name}
            </h3>
          </Link>
        </div>
      </div>

      {/* Price & Clean Arrow */}
      <div className="pt-2 flex items-baseline justify-between hairline-t mt-3">
        <div className="flex items-baseline gap-1">
          <span className="text-sm sm:text-base font-extrabold text-ink-900">
            {formatCurrency(equipment.price_per_day)}
          </span>
          <span className="text-[11px] font-normal text-ink-400">/ ngày</span>
        </div>

        <Link
          href={`/thiet-bi/${equipment.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-ink-500 group-hover:text-accent transition-colors"
          aria-label={`Xem chi tiết ${equipment.name}`}
        >
          <span className="hidden sm:inline">Chi tiết</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
