"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles, ShieldCheck, MapPin, PackageCheck } from "lucide-react";

interface LandingHeroProps {
  messengerUrl?: string;
  phone?: string;
}

const HERO_CAMERAS = [
  {
    id: "r50",
    name: "Canon EOS R50",
    badge: "KIHO PICK · CANON R50",
    image: "/images/landing/cutouts/canon-r50.png",
    subName: "CANON R50",
    alt: "Canon EOS R50 Mirrorless",
  },
  {
    id: "x100v",
    name: "Fujifilm X100V",
    badge: "FUJIFILM X100V · CHECK-IN FAVORITE",
    image: "/images/landing/cutouts/fujifilm-x100v.png",
    subName: "FUJIFILM X100V",
    alt: "Fujifilm X100V Retro Camera",
  },
  {
    id: "g7x3",
    name: "Canon G7X Mark III",
    badge: "CANON G7X III · VLOG & SELFIE",
    image: "/images/landing/cutouts/canon-g7x-mark3.png",
    subName: "G7X MARK III",
    alt: "Canon PowerShot G7X Mark III",
  },
];

const POSITIONS = {
  center: {
    top: "20%",
    left: "15%",
    width: "70%",
    height: "70%",
    zIndex: 30,
    rotate: 0,
    opacity: 1,
  },
  leftBack: {
    top: "-6%",
    left: "-4%",
    width: "46%",
    height: "46%",
    zIndex: 20,
    rotate: -5,
    opacity: 0.92,
  },
  rightBack: {
    top: "-8%",
    left: "58%",
    width: "44%",
    height: "44%",
    zIndex: 20,
    rotate: 6,
    opacity: 0.92,
  },
};

export function LandingHero({}: LandingHeroProps = {}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [pauseUntil, setPauseUntil] = useState<number>(0);
  const rafRef = useRef<number | null>(null);

  // Smooth throttled Parallax on fine pointer devices only
  useEffect(() => {
    // Only track if fine pointer and no reduced motion preference
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      targetY = (e.clientY / innerHeight - 0.5) * 2;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMousePos({ x: targetX, y: targetY });
          rafRef.current = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Robust Autoplay with user-interaction priority
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now < pauseUntil) return; // Paused after manual interaction
      setActiveIdx((prev) => (prev + 1) % HERO_CAMERAS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [pauseUntil]);

  // Immediate Click Handler (Instant priority + 6s autoplay pause)
  const handleSelectCamera = (index: number) => {
    setActiveIdx(index);
    setPauseUntil(Date.now() + 6000);
  };

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById("bang-gia");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeCamera = HERO_CAMERAS[activeIdx];

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-20 lg:min-h-[82vh] flex items-center bg-[#faf8f4]">
      {/* Subtle Background Paper Grain Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT EDITORIAL COLUMN (Hero Copy & CTAs) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0eae1] border border-[#e2dbcf] text-xs font-mono font-bold tracking-wider text-ink-800">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>KIHO CAMERA · ĐỒNG HỚI, QUẢNG BÌNH</span>
            </div>

            {/* Main H1 Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black text-ink-900 tracking-tight leading-[1.08] font-mono">
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

            {/* USP Highlight Card: No Deposit */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#e8e2d7] shadow-xs flex items-center gap-3.5 max-w-lg">
              <div className="p-2 rounded-xl bg-[#f0eae1] text-accent shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-900">
                  Thuê dễ dàng hơn bạn nghĩ
                </h4>
                <p className="text-xs text-ink-600 font-medium">
                  <strong className="text-ink-900 font-semibold">Không cần cọc tiền máy</strong> — chỉ cần ảnh CCCD hoặc VNeID để xác minh.
                </p>
              </div>
            </div>

            {/* CTA Row */}
            <div className="pt-1 flex flex-wrap items-center gap-4">
              {/* Primary CTA: Scroll to Pricing */}
              <button
                onClick={scrollToPricing}
                className="bg-ink-900 hover:bg-accent text-white px-7 py-3.5 rounded-xl text-sm font-mono font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2.5 group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <span>Xem bảng giá</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>

              {/* Secondary CTA: Explore 12 Models */}
              <Link
                href="/thiet-bi"
                className="bg-white hover:bg-[#f0eae1] text-ink-900 px-6 py-3.5 rounded-xl text-sm font-mono font-bold uppercase tracking-wider border border-[#e0d6c7] shadow-xs transition-all duration-300 flex items-center gap-2 group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <span>Xem 12 dòng máy</span>
                <ArrowRight className="w-4 h-4 text-ink-500 group-hover:text-ink-900 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Microcopy Metadata Under CTA (Readable, non-duplicated) */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-[13px] text-ink-600 font-mono font-medium pt-1">
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
                <PackageCheck className="w-3.5 h-3.5 text-emerald-700" />
                Kèm trọn bộ pin + thẻ
              </span>
            </div>
          </div>

          {/* RIGHT VISUAL COLUMN (Dynamic Interactive 3-Camera Layered Showcase) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-[540px] aspect-[4/3] sm:aspect-[16/11]">
              
              {/* Layer 1: Travel Landscape Backdrop Card */}
              <div
                className="absolute inset-0 rounded-[32px] sm:rounded-[40px] overflow-hidden border border-[#e8e0d4] shadow-xl bg-[#f4efe6] transition-transform duration-300 ease-out"
                style={{
                  transform: `translate3d(${mousePos.x * -3}px, ${mousePos.y * -3}px, 0)`,
                }}
              >
                <Image
                  src="/images/landing/hero-quang-binh.webp"
                  alt="Hoàng hôn Quảng Bình"
                  fill
                  priority
                  className="object-cover opacity-90 filter saturate-[1.15] contrast-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 540px"
                />
                
                {/* Soft Warm Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* 3 Interactive Layered Cameras (Direct Coordinate System - Cannot collapse) */}
              {HERO_CAMERAS.map((cam, idx) => {
                const isCenter = idx === activeIdx;
                let targetPos = POSITIONS.center;

                if (idx === (activeIdx + 2) % 3) {
                  targetPos = POSITIONS.leftBack;
                } else if (idx === (activeIdx + 1) % 3) {
                  targetPos = POSITIONS.rightBack;
                }

                return (
                  <motion.div
                    key={cam.id}
                    animate={{
                      top: targetPos.top,
                      left: targetPos.left,
                      width: targetPos.width,
                      height: targetPos.height,
                      rotate: targetPos.rotate,
                      opacity: targetPos.opacity,
                      x: isCenter ? mousePos.x * 6 : mousePos.x * 3,
                      y: isCenter ? mousePos.y * 6 : mousePos.y * 3,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => handleSelectCamera(idx)}
                    className={`absolute aspect-square ${
                      isCenter ? "cursor-default" : "cursor-pointer group"
                    }`}
                    style={{ zIndex: targetPos.zIndex }}
                  >
                    <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={cam.image}
                        alt={cam.alt}
                        fill
                        sizes="380px"
                        priority={idx === 0}
                        className={`object-contain select-none filter ${
                          isCenter
                            ? "drop-shadow-[0_28px_40px_rgba(20,15,10,0.45)]"
                            : "drop-shadow-[0_14px_22px_rgba(20,15,10,0.28)]"
                        }`}
                      />

                      {/* Side Camera Subtle Name Pill */}
                      {!isCenter && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#2c2621]/90 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm shadow-xs opacity-90 group-hover:opacity-100 group-hover:bg-[#171716] transition-all">
                          {cam.subName}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Dynamic Center Spotlight Badge (Bottom Center) */}
              <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 z-40">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCamera.id}
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="whitespace-nowrap bg-ink-900/95 backdrop-blur-md text-white text-[11px] sm:text-xs font-mono font-bold px-4 py-1.5 rounded-full shadow-xl border border-white/20 tracking-wide flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span>{activeCamera.badge}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
