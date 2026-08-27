"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, Zap } from "lucide-react";

interface CanonR50SpotlightProps {
  messengerUrl?: string;
}

export function CanonR50Spotlight({
  messengerUrl = "https://m.me/kihocameradonghoi",
}: CanonR50SpotlightProps) {
  return (
    <section className="py-16 sm:py-24 bg-[#f4efe6] hairline-t hairline-b overflow-hidden relative">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#e9b85a]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-[#e5ded2] p-8 sm:p-12 lg:p-16 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: Large Transparent Cutout Canon R50 on Editorial Backdrop */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Warm Ochre Rounded Background Platform */}
            <div className="relative w-full aspect-square max-w-[440px] bg-[#faf6ef] rounded-3xl p-6 flex items-center justify-center border border-[#e8e2d7] shadow-inner">
              
              {/* Star doodle */}
              <div className="absolute top-4 right-4 text-[#e6a84d]">
                <Sparkles className="w-6 h-6" />
              </div>

              {/* High-res Cutout Camera */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/landing/cutouts/canon-r50.png"
                  alt="Canon EOS R50 Showcase"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-contain filter drop-shadow-[0_24px_36px_rgba(30,20,10,0.35)] hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Bottom Badge */}
              <div className="absolute bottom-4 left-4 bg-ink-900 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full shadow-md">
                KÈM LENS RF-S 18-45MM STM
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Feature Story & Specs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4efe6] text-ink-800 text-xs font-mono font-bold uppercase tracking-wider border border-[#e2dbcf]">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>KIHO PICK / 07 · KHUYÊN DÙNG CHO NGƯỜI MỚI</span>
            </div>

            {/* Title & Copy */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-900 tracking-tight leading-tight">
                Canon EOS R50
              </h2>
              <p className="text-base sm:text-lg text-ink-600 leading-relaxed font-medium">
                Nhẹ, dễ dùng, lên màu da trắng hồng đẹp tự nhiên — đây là chiếc máy tụi mình hay recommend nhất cho các bạn nữ, couple và người lần đầu cầm máy ảnh đi du lịch Quảng Bình.
              </p>
            </div>

            {/* 3 Short Key Specs */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#faf8f4] border border-[#e8e2d7]">
                <span className="text-lg sm:text-2xl font-black font-mono text-ink-900 block">
                  24.2 MP
                </span>
                <span className="text-[11px] text-ink-500 font-medium leading-tight block mt-1">
                  Cảm biến chi tiết cao
                </span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[#faf8f4] border border-[#e8e2d7]">
                <span className="text-lg sm:text-2xl font-black font-mono text-accent block">
                  375g
                </span>
                <span className="text-[11px] text-ink-500 font-medium leading-tight block mt-1">
                  Siêu nhẹ bỏ túi
                </span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[#faf8f4] border border-[#e8e2d7]">
                <span className="text-lg sm:text-2xl font-black font-mono text-ink-900 block">
                  Dual Pixel II
                </span>
                <span className="text-[11px] text-ink-500 font-medium leading-tight block mt-1">
                  Lấy nét nhận diện mắt
                </span>
              </div>
            </div>

            {/* Price Row & Action */}
            <div className="pt-4 border-t border-[#f0eae1] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-ink-400 font-bold block">
                  GIÁ THUÊ NIÊM YẾT
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-ink-900">
                    150K
                  </span>
                  <span className="text-xs text-ink-500 font-mono">/ buổi</span>
                  <span className="text-xs text-ink-300">•</span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-accent">
                    250K
                  </span>
                  <span className="text-xs text-ink-500 font-mono">/ ngày</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/thiet-bi/canon-eos-r50"
                  className="px-4 py-3 rounded-xl border border-[#e0d6c7] text-xs font-mono font-bold uppercase tracking-wider text-ink-800 hover:bg-[#faf8f4] transition-colors"
                >
                  Xem chi tiết
                </Link>

                <a
                  href={`https://zalo.me/0387274669?text=Chào Kiho, mình muốn thuê máy Canon EOS R50`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ink-900 hover:bg-accent text-white px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 group"
                >
                  <span>Thuê R50 ngay</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
