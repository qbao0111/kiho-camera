import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";

interface CanonR50SpotlightProps {
  messengerUrl?: string;
}


export function CanonR50Spotlight({}: CanonR50SpotlightProps = {}) {
  return (
    <section className="py-14 sm:py-20 bg-canvas-200/50 border-t border-b border-ink-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-xl border border-ink-200 p-6 sm:p-10 lg:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Cutout Canon R50 on Editorial Backdrop */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[420px] bg-canvas-50 rounded-lg p-6 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/images/landing/cutouts/canon-r50.png"
                  alt="Canon EOS R50 Showcase"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-contain filter drop-shadow-[0_16px_24px_rgba(20,15,10,0.18)] hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Lens Kit Tag */}
              <div className="absolute bottom-3 left-3 bg-ink-900 text-white text-[10px] font-sans font-medium px-2.5 py-0.5 rounded shadow-xs tracking-wider">
                KÈM LENS RF-S 18-45MM STM
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Feature Story & Practical Benefits */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Context Label */}
            <span className="text-xs font-sans font-semibold text-accent uppercase tracking-wider">
              Dòng máy gợi ý
            </span>

            {/* Title & Copy */}
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
                Canon EOS R50
              </h2>
              <p className="font-sans text-base text-ink-600 leading-relaxed font-normal">
                Gọn nhẹ, lấy nét nhanh và dễ thao tác — chiếc máy được nhiều bạn trẻ và các cặp đôi lựa chọn nhất khi cần máy ảnh dễ chụp cho chuyến đi Quảng Bình.
              </p>
            </div>

            {/* 3 Practical Benefits (Humanized, not SaaS metric cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-ink-800 text-xs sm:text-sm font-sans">
              <div className="p-3.5 rounded-lg bg-canvas-100/90 border border-ink-200/70">
                <span className="font-semibold text-ink-900 block mb-1">Dễ chụp</span>
                <span className="text-ink-600 text-xs leading-relaxed block">Dễ có ảnh đẹp ngay từ lần đầu cầm máy ảnh</span>
              </div>
              <div className="p-3.5 rounded-lg bg-canvas-100/90 border border-ink-200/70">
                <span className="font-semibold text-ink-900 block mb-1">Nhẹ 375g</span>
                <span className="text-ink-600 text-xs leading-relaxed block">Tiện mang theo khi đi chơi cả ngày không mỏi</span>
              </div>
              <div className="p-3.5 rounded-lg bg-canvas-100/90 border border-ink-200/70">
                <span className="font-semibold text-ink-900 block mb-1">Màn hình lật</span>
                <span className="text-ink-600 text-xs leading-relaxed block">Tiện chụp selfie, cặp đôi và quay vlog du lịch</span>
              </div>
            </div>

            {/* Price Row & Action */}
            <div className="pt-4 border-t border-ink-200/70 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-sans uppercase text-ink-500 font-semibold block tracking-wider">
                  Giá thuê niêm yết
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-bold font-mono text-ink-900">
                    150K
                  </span>
                  <span className="text-xs text-ink-600 font-mono font-medium">/ buổi</span>
                  <span className="text-xs text-ink-300">·</span>
                  <span className="text-lg font-bold font-mono text-accent">
                    250K
                  </span>
                  <span className="text-xs text-ink-600 font-mono font-medium">/ ngày</span>
                </div>
              </div>

              <div>
                <Link
                  href="/thiet-bi/canon-eos-r50"
                  className="bg-ink-900 hover:bg-black text-white px-5 py-3 rounded-lg text-xs font-sans font-semibold transition-all shadow-xs flex items-center gap-2 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                >
                  <span>Xem máy Canon R50</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>


          </div>

        </div>
      </div>
    </section>
  );
}
