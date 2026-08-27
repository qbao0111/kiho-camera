"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles, ShieldCheck, MapPin } from "lucide-react";

interface LandingHeroProps {
  messengerUrl?: string;
  phone?: string;
}

export function LandingHero({
  messengerUrl = "https://m.me/kihocameradonghoi",
  phone = "0387 274 669",
}: LandingHeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById("bang-gia");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-20 lg:min-h-[82vh] flex items-center bg-[#faf8f4]">
      {/* Subtle Background Paper Grain Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT EDITORIAL COLUMN (Hero Copy & CTAs) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0eae1] border border-[#e2dbcf] text-xs font-mono font-bold tracking-wider text-ink-800">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>KIHO CAMERA · ĐỒNG HỚI, QUẢNG BÌNH</span>
            </div>

            {/* Main H1 Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black text-ink-900 tracking-tight leading-[1.08]">
                Thuê một chiếc máy. <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-accent">Mang về cả</span>
                  {/* Subtle Yellow Brush Stroke Underline */}
                  <svg
                    className="absolute -bottom-2 -inset-x-2 w-[110%] h-4 text-[#e9b85a] pointer-events-none opacity-80"
                    viewBox="0 0 200 16"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 5,10 Q 95,2 195,8"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>{" "}
                chuyến đi.
              </h1>
            </div>

            {/* SEO & Contextual Description */}
            <p className="text-base sm:text-lg text-ink-600 leading-relaxed max-w-xl font-medium">
              Cho thuê máy ảnh tại Quảng Bình — <strong className="text-ink-900 font-semibold">Canon, Fujifilm, Sony</strong> sẵn sàng cho các chuyến du lịch Phong Nha, check-in biển Nhật Lệ, chụp ảnh couple và quay vlog sắc nét.
            </p>

            {/* CTA Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Primary CTA: Scroll to Pricing */}
              <button
                onClick={scrollToPricing}
                className="bg-ink-900 hover:bg-accent text-white px-7 py-3.5 rounded-xl text-sm font-mono font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2.5 group"
              >
                <span>Xem bảng giá</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>

              {/* Secondary CTA: Message Kiho */}
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#f0eae1] text-ink-900 px-6 py-3.5 rounded-xl text-sm font-mono font-bold uppercase tracking-wider border border-[#e0d6c7] shadow-xs transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Nhắn Kiho</span>
                <ArrowUpRight className="w-4 h-4 text-ink-500 group-hover:text-ink-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            {/* Microcopy Trust Badges */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-ink-500 font-mono pt-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Giá từ 80K / buổi
              </span>
              <span className="text-ink-300">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-ink-600" />
                48 Ngô Quyền, Đồng Hới
              </span>
              <span className="text-ink-300">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Thủ tục nhanh 5 phút
              </span>
            </div>
          </div>

          {/* RIGHT VISUAL COLUMN (Multilayer Depth Composition with Real Cutouts & Landscape Backdrop) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-[540px] aspect-[4/3] sm:aspect-[16/11]">
              
              {/* Layer 1: Travel Landscape Backdrop Card with Editorial Mask */}
              <div
                className="absolute inset-0 rounded-[32px] sm:rounded-[40px] overflow-hidden border border-[#e8e0d4] shadow-xl bg-[#f4efe6] transition-transform duration-300 ease-out"
                style={{
                  transform: `translate3d(${mousePos.x * -4}px, ${mousePos.y * -4}px, 0)`,
                }}
              >
                <Image
                  src="/images/landing/hero-quang-binh.webp"
                  alt="Quảng Bình landscape"
                  fill
                  priority
                  className="object-cover opacity-90 filter saturate-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 540px"
                />
                
                {/* Soft Warm Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f4]/80 via-transparent to-black/10 pointer-events-none" />
                
                {/* Location Badge */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-[10px] font-mono font-bold tracking-wider text-ink-900 uppercase shadow-xs">
                  ✦ QUẢNG BÌNH SUNSET
                </div>
              </div>

              {/* Layer 2: Fujifilm X100V (Back Left Layer with Parallax) */}
              <div
                className="absolute -top-4 -left-4 sm:-top-8 sm:-left-6 w-[45%] aspect-square z-20 transition-transform duration-300 ease-out"
                style={{
                  transform: `translate3d(${mousePos.x * 5}px, ${mousePos.y * 5}px, 0) rotate(-4deg)`,
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/landing/cutouts/fujifilm-x100v.png"
                    alt="Fujifilm X100V"
                    fill
                    sizes="240px"
                    className="object-contain filter drop-shadow-[0_16px_24px_rgba(30,20,10,0.3)]"
                  />
                  <span className="absolute bottom-2 left-2 bg-[#2c2621]/90 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded shadow">
                    FUJIFILM X100V
                  </span>
                </div>
              </div>

              {/* Layer 3: Canon G7X Mark III (Top Right Layer) */}
              <div
                className="absolute -top-6 -right-2 sm:-top-10 sm:right-2 w-[40%] aspect-square z-20 transition-transform duration-300 ease-out"
                style={{
                  transform: `translate3d(${mousePos.x * -6}px, ${mousePos.y * -6}px, 0) rotate(6deg)`,
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/landing/cutouts/canon-g7x-mark3.png"
                    alt="Canon G7X Mark III"
                    fill
                    sizes="200px"
                    className="object-contain filter drop-shadow-[0_14px_20px_rgba(30,20,10,0.28)]"
                  />
                  <span className="absolute bottom-2 right-2 bg-white/95 text-ink-900 text-[9px] font-mono font-bold px-2 py-0.5 rounded shadow border border-black/10">
                    G7X MARK III
                  </span>
                </div>
              </div>

              {/* Layer 4: Canon EOS R50 Foreground Flagship (Center Hero Cutout) */}
              <div
                className="absolute -bottom-6 sm:-bottom-10 left-1/2 -translate-x-1/2 w-[72%] sm:w-[68%] aspect-square z-30 transition-transform duration-300 ease-out"
                style={{
                  transform: `translate3d(calc(-50% + ${mousePos.x * 8}px), ${mousePos.y * 8}px, 0)`,
                }}
              >
                <div className="relative w-full h-full group">
                  <Image
                    src="/images/landing/cutouts/canon-r50.png"
                    alt="Canon EOS R50"
                    fill
                    priority
                    sizes="380px"
                    className="object-contain filter drop-shadow-[0_28px_40px_rgba(20,15,10,0.45)] group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Flagship Tag */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-accent text-white text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full shadow-lg border border-white/20">
                    ★ CANON R50 · TOP PICK 2026
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
