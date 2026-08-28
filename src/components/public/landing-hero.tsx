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
    spec: "RF-S 18-45MM · 24.2MP",
    image: "/images/landing/cutouts/canon-r50.png",
    alt: "Canon EOS R50 Mirrorless",
  },
  {
    id: "x100v",
    name: "Fujifilm X100V",
    spec: "23MM F/2 · FILM RECIPE",
    image: "/images/landing/cutouts/fujifilm-x100v.png",
    alt: "Fujifilm X100V Retro Camera",
  },
  {
    id: "g7x3",
    name: "Canon G7X Mark III",
    spec: "24-100MM · COMPACT VLOG",
    image: "/images/landing/cutouts/canon-g7x-mark3.png",
    alt: "Canon PowerShot G7X Mark III",
  },
];

const POSITIONS = {
  center: {
    top: "16%",
    left: "14%",
    width: "72%",
    height: "72%",
    zIndex: 30,
    rotate: 0,
    opacity: 1,
  },
  leftBack: {
    top: "-2%",
    left: "-2%",
    width: "38%",
    height: "38%",
    zIndex: 20,
    rotate: -4,
    opacity: 0.65,
  },
  rightBack: {
    top: "-4%",
    left: "64%",
    width: "38%",
    height: "38%",
    zIndex: 20,
    rotate: 5,
    opacity: 0.65,
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
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:min-h-[78vh] flex items-center bg-[#faf8f5]">
      {/* Subtle Background Paper Grain Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT EDITORIAL COLUMN */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Metadata Eyebrow */}
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-ink-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>KIHO CAMERA · ĐỒNG HỚI, QUẢNG BÌNH</span>
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

            {/* Contextual Editorial Description */}
            <p className="font-sans text-base sm:text-lg text-ink-600 leading-relaxed max-w-xl font-normal">
              Dịch vụ cho thuê máy ảnh du lịch tại TP. Đồng Hới — <strong className="text-ink-900 font-semibold">Canon, Fujifilm, Sony</strong> trọn bộ pin sạc thẻ nhớ, hỗ trợ bạn ghi lại từng khoảnh khắc đẹp nhất tại Quảng Bình.
            </p>

            {/* Editorial Trust Line (Reassurance note, no large card/box) */}
            <div className="flex items-start gap-2.5 pt-0.5 text-ink-700">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <p className="font-sans text-xs sm:text-sm leading-relaxed">
                <strong className="font-semibold text-ink-900">Không cần cọc tiền máy</strong>
                <span className="text-ink-400 mx-1.5">·</span>
                <span className="text-ink-600">Chỉ xác minh CCCD hoặc VNeID khi liên hệ nhận máy.</span>
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

            {/* Clean Editorial Metadata Line */}
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

          {/* RIGHT VISUAL COLUMN (Interactive 3-Camera Layered Showcase) */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-[500px] aspect-[4/3] sm:aspect-[16/11]">
              
              {/* Layer 1: Travel Landscape Backdrop */}
              <div
                className="absolute inset-0 rounded-lg overflow-hidden border border-ink-200 shadow-xs bg-canvas-200 transition-transform duration-300 ease-out"
                style={{
                  transform: `translate3d(${mousePos.x * -2}px, ${mousePos.y * -2}px, 0)`,
                }}
              >
                <Image
                  src="/images/landing/hero-quang-binh.webp"
                  alt="Hoàng hôn Quảng Bình - Kiho Camera"
                  fill
                  priority
                  className="object-cover filter saturate-[1.08] contrast-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                
                {/* Soft Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
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
                      x: isCenter ? mousePos.x * 4 : mousePos.x * 2,
                      y: isCenter ? mousePos.y * 4 : mousePos.y * 2,
                    }}
                    transition={{
                      duration: 0.5,
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
                        sizes="360px"
                        priority={idx === 0}
                        className={`object-contain select-none filter ${
                          isCenter
                            ? "drop-shadow-[0_20px_30px_rgba(20,15,10,0.35)]"
                            : "drop-shadow-[0_8px_16px_rgba(20,15,10,0.18)]"
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Photographic Editorial Caption (Magazine / Contact sheet caption, no floating bubble) */}
            <div className="w-full max-w-[500px] mt-2.5 pt-2 border-t border-ink-200/80 flex items-center justify-between text-xs">
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
