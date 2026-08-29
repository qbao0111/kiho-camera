"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

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

export function HeroCameraShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [pauseUntil, setPauseUntil] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Smooth throttled Parallax on fine pointer devices only, without React state updates
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (backdropRef.current) {
            backdropRef.current.style.transform = `translate3d(${targetX * -2}px, ${targetY * -2}px, 0)`;
          }
          if (containerRef.current) {
            containerRef.current.style.setProperty("--parallax-x", `${targetX}`);
            containerRef.current.style.setProperty("--parallax-y", `${targetY}`);
          }
          rafId = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Robust Autoplay with user-interaction pause
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

  const activeCamera = HERO_CAMERAS[activeIdx];

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Visual Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[500px] aspect-[4/3] sm:aspect-[16/11]"
        style={{ "--parallax-x": 0, "--parallax-y": 0 } as React.CSSProperties}
      >
        {/* Layer 1: Travel Landscape Backdrop */}
        <div
          ref={backdropRef}
          className="absolute inset-0 rounded-lg overflow-hidden border border-ink-200 shadow-xs bg-canvas-200 will-change-transform"
        >
          <Image
            src="/images/landing/hero-quang-binh.webp"
            alt="Hoàng hôn Quảng Bình - Kiho Camera"
            fill
            priority
            className="object-cover filter saturate-[1.08] contrast-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 500px, 500px"
          />

          {/* Soft Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 3 Interactive Layered Cameras with Hardware-Accelerated CSS Transitions */}
        {HERO_CAMERAS.map((cam, idx) => {
          const isCenter = idx === activeIdx;
          let targetPos = POSITIONS.center;

          if (idx === (activeIdx + 2) % 3) {
            targetPos = POSITIONS.leftBack;
          } else if (idx === (activeIdx + 1) % 3) {
            targetPos = POSITIONS.rightBack;
          }

          return (
            <div
              key={cam.id}
              onClick={() => handleSelectCamera(idx)}
              className={`absolute aspect-square transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isCenter ? "cursor-default" : "cursor-pointer group"
              }`}
              style={{
                top: targetPos.top,
                left: targetPos.left,
                width: targetPos.width,
                height: targetPos.height,
                zIndex: targetPos.zIndex,
                opacity: targetPos.opacity,
                transform: `rotate(${targetPos.rotate}deg) translate3d(calc(var(--parallax-x) * ${
                  isCenter ? "4px" : "2px"
                }), calc(var(--parallax-y) * ${isCenter ? "4px" : "2px"}), 0)`,
              }}
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
            </div>
          );
        })}
      </div>

      {/* Photographic Editorial Caption */}
      <div className="w-full max-w-[500px] mt-2.5 pt-2 border-t border-ink-200/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-accent font-medium">0{activeIdx + 1}</span>
          <span className="text-ink-300 font-mono">/</span>
          <span className="font-sans font-semibold text-ink-900 tracking-tight">
            {activeCamera.name}
          </span>
        </div>
        <span className="font-mono text-[10px] text-ink-500 uppercase tracking-wider">
          {activeCamera.spec}
        </span>
      </div>
    </div>
  );
}
