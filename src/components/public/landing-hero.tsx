"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, ShieldCheck, MapPin, PackageCheck, Camera } from "lucide-react";

interface LandingHeroProps {
  messengerUrl?: string;
  phone?: string;
}

const HERO_CAMERAS = [
  {
    id: "r50",
    name: "Canon EOS R50",
    badge: "CANON EOS R50 · MIRRORLESS",
    image: "/images/landing/cutouts/canon-r50.png",
    subName: "CANON R50",
    alt: "Canon EOS R50 Mirrorless",
  },
  {
    id: "x100v",
    name: "Fujifilm X100V",
    badge: "FUJIFILM X100V · FILM RECIPE",
    image: "/images/landing/cutouts/fujifilm-x100v.png",
    subName: "FUJIFILM X100V",
    alt: "Fujifilm X100V Retro Camera",
  },
  {
    id: "g7x3",
    name: "Canon G7X Mark III",
    badge: "CANON G7X MARK III · COMPACT VLOG",
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
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
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
      if (now < pauseUntil) return;
      setActiveIdx((prev) => (prev + 1) % HERO_CAMERAS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [pauseUntil]);

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
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:min-h-[80vh] flex items-center bg-[#faf8f5]">
      {/* Subtle Background Paper Grain Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT EDITORIAL COLUMN (Hero Copy & CTAs) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Metadata Eyebrow */}
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-ink-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>KIHO CAMERA · ĐỒNG HỚI, QUẢNG BÌNH</span>
            </div>

            {/* Main Editorial H1 Headline */}
            <div className="space-y-1">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] font-bold text-ink-900 tracking-tight leading-[1.12]">
                Thuê một chiếc máy. <br />
                <span className="italic text-accent font-normal">Mang về cả</span> chuyến đi.
              </h1>
            </div>

            {/* Contextual Editorial Description */}
            <p className="font-sans text-base sm:text-lg text-ink-600 leading-relaxed max-w-xl font-normal">
              Dịch vụ cho thuê máy ảnh du lịch tại TP. Đồng Hới — <strong className="text-ink-900 font-semibold">Canon, Fujifilm, Sony</strong> trọn bộ pin sạc thẻ nhớ, hỗ trợ bạn ghi lại từng khoảnh khắc đẹp nhất tại Quảng Bình.
            </p>

            {/* USP Highlight: No Deposit */}
            <div className="py-3 px-4 rounded-lg bg-canvas-200/80 border border-ink-200 flex items-center gap-3.5 max-w-lg">
              <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
              <div className="space-y-0.5">
                <p className="font-sans text-xs sm:text-sm text-ink-700">
                  <strong className="text-ink-900 font-semibold">Không cần cọc tiền máy</strong> — Xác thực nhanh chóng qua CCCD hoặc VNeID.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={scrollToPricing}
                className="bg-ink-900 hover:bg-black text-white px-6 py-3.5 rounded-lg text-sm font-sans font-semibold transition-all duration-200 flex items-center gap-2 group cursor-pointer shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Xem bảng giá thuê</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <Link
                href="/thiet-bi"
                className="bg-white hover:bg-canvas-200 text-ink-900 border border-ink-300 px-5 py-3.5 rounded-lg text-sm font-sans font-medium transition-all duration-200 flex items-center gap-2 group cursor-pointer shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>12 dòng máy ảnh</span>
                <ArrowRight className="w-4 h-4 text-ink-400 group-hover:text-ink-900 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>

            {/* Microcopy Metadata Strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-ink-500 font-mono font-medium pt-1">
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-accent" />
                Từ 80.000₫ / buổi
              </span>
              <span className="text-ink-300">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-ink-500" />
                48 Ngô Quyền, Đồng Hới
              </span>
              <span className="text-ink-300">·</span>
              <span className="flex items-center gap-1.5">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-700" />
                Kèm 2 pin + sạc + thẻ 64GB
              </span>
            </div>
          </div>

          {/* RIGHT VISUAL COLUMN (Interactive 3-Camera Layered Showcase) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-[520px] aspect-[4/3] sm:aspect-[16/11]">
              
              {/* Layer 1: Travel Landscape Backdrop Card */}
              <div
                className="absolute inset-0 rounded-xl overflow-hidden border border-ink-200 shadow-md bg-[#f4efe6] transition-transform duration-300 ease-out"
                style={{
                  transform: `translate3d(${mousePos.x * -2}px, ${mousePos.y * -2}px, 0)`,
                }}
              >
                <Image
                  src="/images/landing/hero-quang-binh.webp"
                  alt="Hoàng hôn Quảng Bình - Kiho Camera"
                  fill
                  priority
                  className="object-cover filter saturate-[1.1] contrast-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
                
                {/* Soft Warm Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* 3 Interactive Layered Cameras */}
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
                      x: isCenter ? mousePos.x * 5 : mousePos.x * 2.5,
                      y: isCenter ? mousePos.y * 5 : mousePos.y * 2.5,
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
                            ? "drop-shadow-[0_24px_36px_rgba(20,15,10,0.4)]"
                            : "drop-shadow-[0_12px_20px_rgba(20,15,10,0.25)]"
                        }`}
                      />

                      {/* Side Camera Subtle Name Tag */}
                      {!isCenter && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ink-900/90 text-white text-[9px] font-mono font-medium px-2 py-0.5 rounded-sm shadow-xs opacity-90 group-hover:opacity-100 transition-all">
                          {cam.subName}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Dynamic Center Spotlight Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-40">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCamera.id}
                    initial={{ opacity: 0, y: 4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="whitespace-nowrap bg-ink-900 text-white text-[11px] font-mono font-medium px-3.5 py-1 rounded-md shadow-md border border-white/10 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
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
