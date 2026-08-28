"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, Check } from "lucide-react";
import { Equipment } from "@/types/database";
import { getEquipmentCoverImage } from "@/lib/equipment-images";

interface RentalPriceIndexProps {
  equipment?: Equipment[];
  messengerUrl?: string;
}

export function RentalPriceIndex({
  equipment = [],
  messengerUrl = "https://m.me/kihocameradonghoi",
}: RentalPriceIndexProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [hoveredCameraId, setHoveredCameraId] = useState<string | null>(
    equipment[0]?.id || null
  );

  const filteredCameras = equipment.filter(
    (c) => selectedBrand === "all" || c.brand.toLowerCase() === selectedBrand.toLowerCase()
  );

  const activeCamera =
    equipment.find((c) => c.id === hoveredCameraId) ||
    filteredCameras[0] ||
    equipment[0];

  const formatK = (price: number) => {
    if (!price) return "---";
    return `${Math.round(price / 1000)}K`;
  };

  const fujiCount = equipment.filter((c) => c.brand.toLowerCase() === "fujifilm").length;
  const canonCount = equipment.filter((c) => c.brand.toLowerCase() === "canon").length;
  const sonyCount = equipment.filter((c) => c.brand.toLowerCase() === "sony").length;

  return (
    <section id="bang-gia" className="py-16 sm:py-24 bg-[#faf8f5] border-t border-ink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wider text-ink-500 uppercase">
              <Camera className="w-3.5 h-3.5 text-accent" />
              <span>BẢNG GIÁ NIÊM YẾT · ĐỒNG HỚI</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
              Bảng Giá Thuê Máy Ảnh Kiho
            </h2>
            <p className="text-sm sm:text-base text-ink-600 font-sans font-normal max-w-xl leading-relaxed">
              Tất cả 12 dòng máy có sẵn tại 48 Ngô Quyền, trọn bộ phụ kiện pin sạc thẻ nhớ túi chống sốc.
            </p>
          </div>

          {/* Brand Filter Tabs */}
          <div className="flex items-center gap-1 bg-canvas-200 p-1 rounded-lg border border-ink-200 self-start md:self-end">
            {[
              { key: "all", label: `Tất cả (${equipment.length})` },
              { key: "fujifilm", label: `Fujifilm (${fujiCount})` },
              { key: "canon", label: `Canon (${canonCount})` },
              { key: "sony", label: `Sony (${sonyCount})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedBrand(tab.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-sans font-medium transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent ${
                  selectedBrand === tab.key
                    ? "bg-white text-ink-900 shadow-xs font-semibold"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-COLUMN EDITORIAL LAYOUT (Left: Index Table, Right: Side Preview Dock) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. LEFT: EDITORIAL PRICE TABLE (8 cols on desktop) */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-ink-200 overflow-hidden shadow-2xs">
            
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-ink-200 bg-canvas-100/80 text-[11px] font-mono text-ink-500 uppercase tracking-wider">
                    <th className="py-3 px-4 w-12 text-center">STT</th>
                    <th className="py-3 px-4">DÒNG MÁY</th>
                    <th className="py-3 px-3 text-right">1 BUỔI</th>
                    <th className="py-3 px-3 text-right">1 NGÀY</th>
                    <th className="py-3 px-3 text-right">TỪ 3 NGÀY</th>
                    <th className="py-3 px-4 text-center w-24">CHI TIẾT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100 font-sans text-sm">
                  {filteredCameras.map((item, idx) => {
                    const isSelected = activeCamera?.id === item.id;
                    const numStr = String(idx + 1).padStart(2, "0");

                    return (
                      <tr
                        key={item.id}
                        onMouseEnter={() => setHoveredCameraId(item.id)}
                        className={`transition-colors cursor-pointer group ${
                          isSelected
                            ? "bg-canvas-200/90 font-medium"
                            : "hover:bg-canvas-100/60"
                        }`}
                      >
                        <td className="py-3.5 px-4 text-center font-mono text-xs text-ink-400">
                          {numStr}
                        </td>
                        <td className="py-3.5 px-4">
                          <Link
                            href={`/thiet-bi/${item.slug}`}
                            className="flex flex-col group-hover:text-accent transition-colors"
                          >
                            <span className="font-semibold text-ink-900 tracking-tight">
                              {item.name}
                            </span>
                            <span className="text-xs text-ink-500 font-normal line-clamp-1">
                              {item.brand} · {item.use_cases?.[0] || "Du lịch & Check-in"}
                            </span>
                          </Link>
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono text-xs text-ink-700">
                          {formatK(item.price_session)}
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono text-sm font-bold text-ink-900">
                          {formatK(item.price_per_day)}
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono text-xs font-bold text-accent">
                          {formatK(item.price_three_days)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <Link
                            href={`/thiet-bi/${item.slug}`}
                            className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-ink-200 bg-white group-hover:bg-ink-900 group-hover:text-white text-ink-700 transition-colors shadow-2xs"
                            title={`Xem ${item.name}`}
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Compact Rows with Dividers */}
            <div className="sm:hidden divide-y divide-ink-200">
              {filteredCameras.map((item, idx) => {
                const coverImg = getEquipmentCoverImage(item);
                const numStr = String(idx + 1).padStart(2, "0");

                return (
                  <div
                    key={item.id}
                    className="p-4 flex flex-col gap-3 bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 bg-canvas-100 rounded-md border border-ink-100 p-1 shrink-0 flex items-center justify-center">
                          <Image
                            src={coverImg}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-contain p-0.5"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-ink-400">
                            <span>{numStr}</span>
                            <span>·</span>
                            <span>{item.brand}</span>
                          </div>
                          <h3 className="font-sans text-sm font-bold text-ink-900">
                            {item.name}
                          </h3>
                        </div>
                      </div>

                      <Link
                        href={`/thiet-bi/${item.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-ink-900 hover:text-accent px-2.5 py-1 rounded bg-canvas-100 border border-ink-200"
                      >
                        <span>Xem máy</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* Compact Price Tier Strip */}
                    <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-canvas-100/70 rounded-md border border-ink-100 text-center font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-ink-400 block font-sans">Buổi</span>
                        <span className="font-medium text-ink-700">{formatK(item.price_session)}</span>
                      </div>
                      <div className="border-x border-ink-200">
                        <span className="text-[10px] text-ink-400 block font-sans">1 Ngày</span>
                        <span className="font-bold text-ink-900">{formatK(item.price_per_day)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-accent block font-sans">3 Ngày+</span>
                        <span className="font-bold text-accent">{formatK(item.price_three_days)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* 2. RIGHT: SIDE PREVIEW DOCK (4 cols, Sticky on Desktop) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24 bg-white rounded-xl border border-ink-200 p-5 shadow-xs space-y-4">
            {activeCamera ? (
              <>
                <div className="flex items-center justify-between border-b border-ink-200/80 pb-2.5 text-xs">
                  <span className="font-mono text-ink-400 uppercase text-[10px] tracking-wider">
                    PREVIEW DÒNG MÁY
                  </span>
                  <span className="font-mono text-xs font-medium text-accent">
                    {activeCamera.brand}
                  </span>
                </div>

                {/* Camera Image */}
                <div className="relative aspect-square w-full rounded-lg bg-canvas-100 border border-ink-100 p-4 flex items-center justify-center">
                  <Image
                    src={getEquipmentCoverImage(activeCamera)}
                    alt={activeCamera.name}
                    fill
                    sizes="340px"
                    className="object-contain p-2 filter drop-shadow-[0_10px_20px_rgba(20,15,10,0.15)] transition-all duration-300"
                  />
                  {activeCamera.is_featured && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-ink-900 text-white text-[9px] font-mono px-2 py-0.5 rounded-sm">
                        KIHO PICK
                      </span>
                    </div>
                  )}
                </div>

                {/* Model Info */}
                <div className="space-y-1">
                  <h3 className="font-sans text-lg font-bold text-ink-900 tracking-tight">
                    {activeCamera.name}
                  </h3>
                  <p className="font-sans text-xs text-ink-600 line-clamp-2 leading-relaxed">
                    {activeCamera.short_description ||
                      "Trọn bộ kèm 2 pin, sạc đôi, thẻ nhớ tốc độ cao 64GB và túi chống sốc."}
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="p-3 bg-canvas-100 rounded-lg border border-ink-200 grid grid-cols-3 gap-2 text-center font-mono">
                  <div>
                    <span className="text-[10px] text-ink-400 block uppercase">1 Buổi</span>
                    <span className="text-xs font-bold text-ink-800">
                      {formatK(activeCamera.price_session)}
                    </span>
                  </div>
                  <div className="border-x border-ink-200">
                    <span className="text-[10px] text-ink-400 block uppercase">1 Ngày</span>
                    <span className="text-sm font-extrabold text-ink-900">
                      {formatK(activeCamera.price_per_day)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-accent block uppercase">Từ 3N</span>
                    <span className="text-xs font-bold text-accent">
                      {formatK(activeCamera.price_three_days)}
                    </span>
                  </div>
                </div>

                {/* Quick Guarantees */}
                <div className="space-y-1.5 text-xs font-sans text-ink-600 pt-1">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Không cần cọc tiền máy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Kèm trọn bộ 2 pin + sạc + thẻ 64GB</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <Link
                    href={`/thiet-bi/${activeCamera.slug}`}
                    className="w-full text-center bg-ink-900 hover:bg-black text-white text-xs font-sans font-semibold py-2.5 rounded-lg transition-colors shadow-xs"
                  >
                    Xem chi tiết máy
                  </Link>

                  <a
                    href={messengerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-white hover:bg-canvas-200 text-ink-900 border border-ink-300 text-xs font-sans font-medium py-2.5 rounded-lg transition-colors"
                  >
                    Nhắn tư vấn
                  </a>
                </div>
              </>
            ) : null}
          </div>

        </div>

      </div>
    </section>
  );
}
