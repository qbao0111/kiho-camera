"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowRight, ShieldCheck, MapPin, PackageCheck, Camera } from "lucide-react";

// Dynamic import of the 3D Stage (SSR false for performance)
const Hero3DStage = dynamic(
  () => import("@/components/public/v3/hero-3d-stage").then((mod) => mod.Hero3DStage),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center animate-pulse bg-canvas-200/30 rounded-xl" />
    ),
  }
);

const HERO_CAMERAS = [
  {
    id: "r50",
    name: "Canon EOS R50",
    shortName: "R50",
    spec: "RF-S 18-45MM · 24.2MP · 375G",
    image: "/images/landing/cutouts/canon-r50.png",
    alt: "Canon EOS R50 Mirrorless",
    price: "150K / buổi · 250K / ngày",
  },
  {
    id: "x100v",
    name: "Fujifilm X100V",
    shortName: "X100V",
    spec: "23MM F/2 · FILM RECIPES · 478G",
    image: "/images/landing/cutouts/fujifilm-x100v.png",
    alt: "Fujifilm X100V Retro Camera",
    price: "250K / buổi · 380K / ngày",
  },
  {
    id: "g7x3",
    name: "Canon G7X Mark III",
    shortName: "G7X III",
    spec: "24-100MM F/1.8-2.8 · 4K VLOG · 304G",
    image: "/images/landing/cutouts/canon-g7x-mark3.png",
    alt: "Canon PowerShot G7X Mark III",
    price: "120K / buổi · 200K / ngày",
  },
];

export function V3Hero() {
  const [activeId, setActiveId] = useState("r50");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activeCamera = HERO_CAMERAS.find((c) => c.id === activeId) || HERO_CAMERAS[0];
  const activeIdx = HERO_CAMERAS.findIndex((c) => c.id === activeId);

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById("bang-gia");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-14 sm:pt-10 sm:pb-20 lg:min-h-[82vh] flex items-center bg-[#faf8f5]">
      {/* Subtle Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT EDITORIAL COLUMN */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Chapter Indicator & Metadata */}
            <div className="flex items-center gap-2.5 text-xs font-mono font-medium tracking-wider text-ink-500 uppercase">
              <span className="text-accent font-bold">01 / ARRIVAL</span>
              <span className="text-ink-300">·</span>
              <span>ĐỒNG HỚI, QUẢNG BÌNH</span>
            </div>

            {/* Main Editorial H1 Headline */}
            <div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-bold text-ink-900 tracking-tight leading-[1.14]">
                <span className="block">Thuê một chiếc máy.</span>
                <span className="block mt-1">
                  <span className="italic text-accent font-normal">Mang về cả</span>{" "}
                  <span className="whitespace-nowrap">chuyến đi.</span>
                </span>
              </h1>
            </div>

            {/* Contextual Description */}
            <p className="font-sans text-base sm:text-lg text-ink-600 leading-relaxed max-w-xl font-normal">
              Dịch vụ cho thuê máy ảnh du lịch tại TP. Đồng Hới — <strong className="text-ink-900 font-semibold">Canon, Fujifilm, Sony</strong> trọn bộ pin sạc thẻ nhớ, hỗ trợ bạn ghi lại từng khoảnh khắc đẹp nhất tại Quảng Bình.
            </p>

            {/* Editorial Trust Line (Reassurance note) */}
            <div className="flex items-start gap-2.5 pt-0.5 text-ink-700">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <p className="font-sans text-xs sm:text-sm leading-relaxed">
                <strong className="font-semibold text-ink-900">Không cần cọc tiền máy</strong>
                <span className="text-ink-400 mx-1.5">·</span>
                <span className="text-ink-600">Chỉ xác minh CCCD hoặc VNeID khi nhận máy.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={scrollToPricing}
                className="bg-ink-900 hover:bg-black text-white px-5 py-3 rounded-lg text-sm font-sans font-semibold transition-colors duration-200 flex items-center gap-2 group cursor-pointer shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Xem bảng giá thuê</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <Link
                href="/thiet-bi"
                className="bg-white hover:bg-canvas-200 text-ink-900 border border-ink-300 px-5 py-3 rounded-lg text-sm font-sans font-medium transition-colors duration-200 flex items-center gap-2 group cursor-pointer shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Khám phá 12 dòng máy</span>
                <ArrowRight className="w-4 h-4 text-ink-400 group-hover:text-ink-900 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>

            {/* Clean Metadata Line */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-ink-500 font-sans pt-1 border-t border-ink-200/70">
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-accent" />
                <span>Từ <strong className="font-mono font-bold text-ink-800">80.000₫</strong> / buổi</span>
              </span>
              <span className="text-ink-300">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-ink-400" />
                <span>48 Ngô Quyền, Đồng Hới</span>
              </span>
              <span className="text-ink-300">·</span>
              <span className="flex items-center gap-1.5">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Kèm 2 pin · sạc · thẻ 64GB</span>
              </span>
            </div>
          </div>

          {/* RIGHT VISUAL COLUMN (Immersive 3D Camera Showcase & Minimal Model Selector) */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            {/* Minimal Model Selector (01 R50 · 02 X100V · 03 G7X III) */}
            <div className="w-full max-w-[480px] flex items-center justify-between mb-2 text-xs font-mono border-b border-ink-200/80 pb-2">
              <span className="text-ink-400 uppercase tracking-wider text-[10px]">
                CHỌN DÒNG MÁY KHÁM PHÁ
              </span>
              
              <div className="flex items-center gap-4">
                {HERO_CAMERAS.map((cam, idx) => {
                  const isSelected = cam.id === activeId;
                  return (
                    <button
                      key={cam.id}
                      onClick={() => setActiveId(cam.id)}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent ${
                        isSelected
                          ? "text-ink-900 font-bold"
                          : "text-ink-400 hover:text-ink-700"
                      }`}
                    >
                      <span className={`text-[10px] ${isSelected ? "text-accent" : "text-ink-400"}`}>
                        0{idx + 1}
                      </span>
                      <span>{cam.shortName}</span>
                      {isSelected && <span className="w-1 h-1 rounded-full bg-accent ml-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3D Stage / Mobile Fallback Viewport */}
            <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[16/12] rounded-xl bg-radial from-[#ffffff] via-[#f5efe6] to-[#ece5d8] border border-ink-200 overflow-hidden shadow-2xs flex items-center justify-center">
              
              {/* Landscape Background Silhouette Subtle Watermark */}
              <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply">
                <Image
                  src="/images/landing/hero-quang-binh.webp"
                  alt="Quang Binh Backdrop"
                  fill
                  className="object-cover filter grayscale"
                  sizes="480px"
                />
              </div>

              {/* 3D WebGL Canvas for Desktop / Tablet */}
              {!isMobile ? (
                <Hero3DStage
                  activeCameraId={activeId}
                  cameras={HERO_CAMERAS}
                  onCameraSelect={setActiveId}
                />
              ) : (
                /* Crisp Image Fallback on Small Mobile */
                <div className="relative w-full h-full p-6 flex items-center justify-center">
                  <Image
                    src={activeCamera.image}
                    alt={activeCamera.alt}
                    fill
                    priority
                    sizes="480px"
                    className="object-contain filter drop-shadow-[0_16px_24px_rgba(20,15,10,0.3)] transition-all duration-300"
                  />
                </div>
              )}
            </div>

            {/* Photographic Editorial Caption */}
            <div className="w-full max-w-[480px] mt-2.5 pt-2 border-t border-ink-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-accent font-medium">0{activeIdx + 1}</span>
                <span className="text-ink-300 font-mono">/</span>
                <span className="font-sans font-semibold text-ink-900 tracking-tight">{activeCamera.name}</span>
              </div>
              <span className="font-mono text-[10px] text-ink-500 uppercase tracking-wider">
                {activeCamera.spec}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
