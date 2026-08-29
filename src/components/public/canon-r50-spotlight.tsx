"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Eye, ShieldCheck } from "lucide-react";

interface CanonR50SpotlightProps {
  messengerUrl?: string;
}

export function CanonR50Spotlight({}: CanonR50SpotlightProps = {}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="py-14 sm:py-20 bg-canvas-200/50 border-t border-b border-ink-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-2xl border border-ink-200 p-6 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT: Spatial Floating 3D Canon R50 on Editorial Backdrop */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative w-full aspect-square max-w-[420px] bg-gradient-to-b from-canvas-100 to-canvas-200/70 rounded-2xl p-6 flex items-center justify-center border border-ink-200 overflow-hidden cursor-crosshair group shadow-inner"
            >
              {/* Glassmorphism Refractive Glow */}
              <div
                className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${50 + mousePos.x * 30}% ${50 + mousePos.y * 30}%, rgba(217,93,57,0.15) 0%, transparent 60%)`,
                }}
              />

              {/* Spatial Floating Cutout */}
              <div
                className="relative w-full h-full transition-transform duration-300 ease-out"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg) scale(${isHovered ? 1.04 : 1})`,
                }}
              >
                <Image
                  src="/images/landing/cutouts/canon-r50.png"
                  alt="Canon EOS R50 Showcase"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-contain filter drop-shadow-[0_20px_30px_rgba(20,15,10,0.22)] select-none"
                />
              </div>

              {/* Top Right Live 3D Badge */}
              <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-xs text-ink-700 text-[10px] font-mono font-medium px-2 py-0.5 rounded border border-ink-200 flex items-center gap-1 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                <span>3D TILT VIEW</span>
              </div>

              {/* Lens Kit Tag */}
              <div className="absolute bottom-3.5 left-3.5 bg-ink-900 text-white text-[10px] font-mono font-medium px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-accent" />
                <span>KÈM LENS RF-S 18-45MM STM</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Feature Story & Specs */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-ink-500 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>KIHO PICK · KHUYÊN DÙNG CHO NGƯỜI MỚI</span>
            </div>

            {/* Title & Copy */}
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
                Canon EOS R50
              </h2>
              <p className="font-sans text-base text-ink-600 leading-relaxed font-normal">
                Nhẹ, dễ dùng, lên màu da trắng hồng đẹp tự nhiên — chiếc máy Kiho khuyên dùng nhất cho các bạn nữ, couple và người lần đầu cầm máy ảnh đi du lịch Quảng Bình.
              </p>
            </div>

            {/* 3 Key Specs with Interactive Glow */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-canvas-100 border border-ink-200 hover:border-ink-400 transition-colors shadow-2xs">
                <span className="text-xl sm:text-2xl font-bold font-mono text-ink-900 block">
                  24.2 MP
                </span>
                <span className="text-[11px] text-ink-500 font-sans block mt-0.5">
                  Cảm biến chi tiết cao
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-canvas-100 border border-ink-200 hover:border-ink-400 transition-colors shadow-2xs">
                <span className="text-xl sm:text-2xl font-bold font-mono text-accent block">
                  375g
                </span>
                <span className="text-[11px] text-ink-500 font-sans block mt-0.5">
                  Siêu nhẹ bỏ túi
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-canvas-100 border border-ink-200 hover:border-ink-400 transition-colors shadow-2xs">
                <span className="text-xl sm:text-2xl font-bold font-mono text-ink-900 block">
                  Dual Pixel
                </span>
                <span className="text-[11px] text-ink-500 font-sans block mt-0.5">
                  Lấy nét mắt thông minh
                </span>
              </div>
            </div>

            {/* Price Row & Action */}
            <div className="pt-4 border-t border-ink-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-ink-400 font-medium block">
                  GIÁ THUÊ NIÊM YẾT
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-bold font-mono text-ink-900">
                    150K
                  </span>
                  <span className="text-xs text-ink-500 font-mono">/ buổi</span>
                  <span className="text-xs text-ink-300">·</span>
                  <span className="text-xl font-bold font-mono text-accent">
                    250K
                  </span>
                  <span className="text-xs text-ink-500 font-mono">/ ngày</span>
                </div>
              </div>

              <div>
                <Link
                  href="/thiet-bi/canon-eos-r50"
                  className="bg-ink-900 hover:bg-black text-white px-5 py-3 rounded-lg text-xs font-sans font-semibold transition-all shadow-xs flex items-center gap-2 group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
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
