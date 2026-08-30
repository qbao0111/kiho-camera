"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Aperture,
  Camera,
  Sparkles,
  Rotate3d,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

interface FStopConfig {
  value: number;
  label: string;
  shutter: string;
  iso: string;
  apertureSizePercent: number; // 82% at f/1.4 down to 18% at f/11
  bladeRotationDeg: number;
  bokehRadiusPx: number;
  blurClass: string;
  badge: string;
  badgeColor: string;
  sceneTitle: string;
  desc: string;
  recommendedSubject: string;
}

const F_STOPS: FStopConfig[] = [
  {
    value: 1.4,
    label: "f/1.4",
    shutter: "1/4000s",
    iso: "ISO 100",
    apertureSizePercent: 82,
    bladeRotationDeg: 0,
    bokehRadiusPx: 28,
    blurClass: "blur-xl",
    badge: "Xóa phông mạnh & Bokeh lớn",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    sceneTitle: "Chân dung & Thiếu sáng",
    desc: "Khẩu độ mở cực đại thu nhận lượng ánh sáng tối đa, tạo quầng bokeh tròn lung linh, tách chủ thể hoàn toàn khỏi hậu cảnh.",
    recommendedSubject: "Chân dung đơn, couple, biển Nhật Lệ, chụp đêm thiếu sáng",
  },
  {
    value: 2.0,
    label: "f/2.0",
    shutter: "1/2000s",
    iso: "ISO 100",
    apertureSizePercent: 65,
    bladeRotationDeg: 12,
    bokehRadiusPx: 20,
    blurClass: "blur-lg",
    badge: "Tách chủ thể & Không gian",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    sceneTitle: "Quán Cafe & Check-in",
    desc: "Độ nét tại tâm sắc sảo vượt trội, hậu cảnh xoá dịu dàng giữ lại đường nét không gian ấm áp.",
    recommendedSubject: "Check-in cafe, đồ uống, outfit thời trang",
  },
  {
    value: 2.8,
    label: "f/2.8",
    shutter: "1/1000s",
    iso: "ISO 100",
    apertureSizePercent: 50,
    bladeRotationDeg: 24,
    bokehRadiusPx: 14,
    blurClass: "blur-md",
    badge: "Cân bằng Du lịch & Check-in",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    sceneTitle: "Du Lịch & Phố Xá",
    desc: "Khẩu độ vàng cho ảnh du lịch. Chủ thể nổi bật rõ ràng trong khi hậu cảnh địa danh vẫn nhận diện được.",
    recommendedSubject: "Ảnh du lịch, check-in địa danh, ảnh toàn thân",
  },
  {
    value: 5.6,
    label: "f/5.6",
    shutter: "1/250s",
    iso: "ISO 200",
    apertureSizePercent: 32,
    bladeRotationDeg: 40,
    bokehRadiusPx: 6,
    blurClass: "blur-xs",
    badge: "Ảnh nhóm & Gia đình",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    sceneTitle: "Nhóm Bạn & Gia Đình",
    desc: "Độ sâu trường ảnh đủ dày để mọi người trong nhóm từ hàng trước đến hàng sau đều nét căng.",
    recommendedSubject: "Nhóm bạn 3–8 người, gia đình, teambuilding",
  },
  {
    value: 11,
    label: "f/11",
    shutter: "1/60s",
    iso: "ISO 400",
    apertureSizePercent: 18,
    bladeRotationDeg: 62,
    bokehRadiusPx: 0,
    blurClass: "blur-none",
    badge: "Phong Cảnh Đại Ngàn",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    sceneTitle: "Phong Nha & Cồn Cát",
    desc: "Độ sâu trường ảnh tối đa, sắc nét từng nhánh cây, vách đá vôi từ tiền cảnh đến tận chân trời xa.",
    recommendedSubject: "Hang động Phong Nha, sông Son, cồn cát Quang Phú",
  },
];

export function Interactive3dAperture() {
  const [activeFStopIdx, setActiveFStopIdx] = useState(0);
  const [isShutterActive, setIsShutterActive] = useState(false);
  const [isReticlePulsing, setIsReticlePulsing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringLens, setIsHoveringLens] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const targetPosRef = useRef({ x: 0, y: 0 });
  const current = F_STOPS[activeFStopIdx];

  // Throttled Parallax for fine pointer devices (desktop)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetPosRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };

    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(() => {
        setMousePos(targetPosRef.current);
        animFrameRef.current = null;
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHoveringLens(false);
    setMousePos({ x: 0, y: 0 });
  };

  const triggerReticlePulse = () => {
    setIsReticlePulsing(true);
    setTimeout(() => setIsReticlePulsing(false), 220);
  };

  const handleSelectFStop = (idx: number) => {
    setActiveFStopIdx(idx);
    triggerReticlePulse();
  };

  const handleShutterClick = () => {
    setIsShutterActive(true);
    triggerReticlePulse();
    setTimeout(() => setIsShutterActive(false), 140);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Generate 8 realistic iris blades with precise curved SVG geometry
  const numBlades = 8;
  const blades = Array.from({ length: numBlades }).map((_, i) => {
    const baseAngle = (i * 360) / numBlades;
    const rot = baseAngle + current.bladeRotationDeg;
    return { id: i, baseAngle, rot };
  });

  return (
    <section className="py-16 sm:py-24 bg-[#0d0d0e] text-white relative overflow-hidden border-t border-b border-white/10 select-none">
      {/* Optical Multi-coating Background Atmosphere */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Screen Shutter Flash Burst Overlay */}
      {isShutterActive && (
        <div
          className="fixed inset-0 z-[9999] bg-white opacity-90 pointer-events-none transition-opacity duration-100 animate-out fade-out motion-reduce:hidden"
          aria-hidden="true"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-accent uppercase">
            <Aperture className="w-4 h-4 animate-spin-slow text-accent" />
            <span>MÔ PHỎNG ỐNG KÍNH QUANG HỌC · OPTICAL BOKEH SIMULATOR</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Trải nghiệm xoá phông <br className="hidden sm:inline" />
            <span className="italic text-accent font-normal">với khẩu độ ống kính thật</span>
          </h2>

          <p className="text-sm sm:text-base text-ink-300 font-sans font-normal leading-relaxed max-w-2xl pt-1">
            Khám phá cách đường kính mở lá khẩu (f-stop) thay đổi độ sâu trường ảnh (depth of field) và tạo bokeh quang học tự nhiên — khác biệt với thuật toán làm mờ hậu kỳ trên smartphone.
          </p>
        </div>

        {/* MAIN SIMULATOR 2-COLUMN DISPLAY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* 1. LEFT: AUTHENTIC 3D OPTICAL LENS BARREL (CANON RF 50MM F/1.4 REPLICA) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* The Lens Chassis Container */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHoveringLens(true)}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-square flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-[#1b1a1c] via-[#0f0e10] to-[#080809] border-2 border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] cursor-crosshair group transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(900px) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg) scale(${
                  isHoveringLens ? 1.02 : 1
                })`,
              }}
            >
              {/* Outer Knurled Grip Ring (Mechanical Grooves) */}
              <div className="absolute inset-0 rounded-full border-[8px] border-[#222124] shadow-inner opacity-90 pointer-events-none" />

              {/* Red / Terracotta Luxury Ring (Canon L-Series Style Accent) */}
              <div className="absolute inset-2.5 rounded-full border-2 border-accent/80 shadow-[0_0_12px_rgba(217,93,57,0.4)] pointer-events-none" />

              {/* Laser Engraving Text Ring */}
              <svg className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] pointer-events-none z-20">
                <defs>
                  <path
                    id="lensTextPath"
                    d="M 158, 158 m -134, 0 a 134,134 0 1,1 268,0 a 134,134 0 1,1 -268,0"
                  />
                </defs>
                <text className="text-[9px] font-mono tracking-[0.22em] fill-white/60 uppercase font-semibold">
                  <textPath href="#lensTextPath" startOffset="0%">
                    CANON LENS RF 50mm F1.4 STM · Ø 58mm · KIHO OPTICAL LAB ·
                  </textPath>
                </text>
              </svg>

              {/* Inner Optical Glass Cavity */}
              <div className="relative w-[76%] h-[76%] rounded-full bg-gradient-to-br from-[#060b14] via-[#090d16] to-[#04060a] border border-white/20 overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] flex items-center justify-center">
                {/* Dynamic Multi-coating Glare Sheen (Cyan + Magenta Reflection) */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-90"
                  style={{
                    background: `radial-gradient(circle at ${50 + mousePos.x * 35}% ${
                      50 + mousePos.y * 35
                    }%, rgba(56, 189, 248, 0.25) 0%, rgba(217, 70, 239, 0.15) 45%, transparent 75%)`,
                  }}
                />

                {/* Concentric Glass Element Rings */}
                <div className="absolute inset-4 rounded-full border border-white/10 pointer-events-none" />
                <div className="absolute inset-8 rounded-full border border-cyan-400/10 pointer-events-none" />

                {/* 2. THE MECHANICAL IRIS APERTURE MECHANISM */}
                <div
                  className="relative w-full h-full flex items-center justify-center transition-all duration-500 ease-out"
                  style={{
                    clipPath: "circle(48% at 50% 50%)",
                  }}
                >
                  {/* Central Light Opening (Through-the-lens illumination) */}
                  <div
                    className="absolute rounded-full transition-all duration-500 ease-out flex items-center justify-center shadow-[0_0_30px_rgba(255,200,120,0.6)]"
                    style={{
                      width: `${current.apertureSizePercent}%`,
                      height: `${current.apertureSizePercent}%`,
                      background:
                        "radial-gradient(circle, rgba(255,245,230,0.95) 0%, rgba(251,191,36,0.5) 40%, rgba(217,93,57,0.2) 80%)",
                    }}
                  >
                    {/* Anamorphic core flare dot */}
                    <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
                  </div>

                  {/* 8 Interlocking Titanium Iris Blades */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2a292d" />
                        <stop offset="50%" stopColor="#18171a" />
                        <stop offset="100%" stopColor="#0c0b0d" />
                      </linearGradient>
                      <linearGradient id="bladeEdge" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#403e45" />
                        <stop offset="100%" stopColor="#151417" />
                      </linearGradient>
                    </defs>

                    {blades.map((blade) => {
                      const t = activeFStopIdx / (F_STOPS.length - 1);
                      const pivotDist = 70 - t * 38;

                      return (
                        <g
                          key={blade.id}
                          style={{
                            transformOrigin: "center center",
                            transform: `rotate(${blade.rot}deg)`,
                            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                        >
                          <path
                            d={`M 130,${130 - pivotDist} Q 190,${80 - pivotDist * 0.5} 240,130 Q 180,180 130,${130 - pivotDist}`}
                            fill="url(#bladeGrad)"
                            stroke="url(#bladeEdge)"
                            strokeWidth="1.2"
                            opacity={activeFStopIdx === 0 ? 0.25 : 0.95}
                            style={{
                              transition: "opacity 0.4s ease, d 0.5s ease",
                              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
                            }}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Front Element Glass Highlight Arc */}
                <div className="absolute top-2 left-6 w-28 h-12 rounded-[50%] border-t-2 border-white/30 -rotate-12 pointer-events-none blur-[0.5px]" />
              </div>

              {/* Status HUD Tags */}
              <div className="absolute top-3.5 right-4 bg-black/70 backdrop-blur-xs text-ink-300 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-md">
                <Rotate3d className="w-3 h-3 text-accent" />
                <span>3D OPTICAL VIEW</span>
              </div>

              <div className="absolute bottom-3.5 left-4 flex items-center gap-2 font-mono text-xs">
                <span className="text-white font-bold bg-ink-900/90 px-3 py-1 rounded-md border border-white/20 shadow-md">
                  {current.label}
                </span>
                <span className="text-accent text-[11px] font-semibold">
                  {current.shutter}
                </span>
              </div>
            </div>

            {/* F-STOP SELECTOR BUTTONS */}
            <div className="mt-6 w-full max-w-[340px] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-ink-400 px-1">
                <span>VÒNG KHẨU ĐỘ (F-STOP)</span>
                <span className="text-accent font-bold">{current.label}</span>
              </div>

              <div
                role="radiogroup"
                aria-label="Chọn nấc khẩu độ thử nghiệm"
                className="grid grid-cols-5 gap-1.5 p-1.5 rounded-xl bg-ink-900/90 border border-white/15 backdrop-blur-xs shadow-inner"
              >
                {F_STOPS.map((stop, idx) => (
                  <button
                    key={stop.value}
                    role="radio"
                    aria-checked={activeFStopIdx === idx}
                    onClick={() => handleSelectFStop(idx)}
                    className={`py-2 px-1 min-h-[44px] rounded-lg text-xs font-mono font-bold transition-all duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
                      activeFStopIdx === idx
                        ? "bg-accent text-white shadow-md scale-105"
                        : "text-ink-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {stop.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tactile Shutter Trigger */}
            <div className="mt-4">
              <button
                onClick={handleShutterClick}
                aria-label="Chụp thử để xem hiệu ứng bắt nét và phơi sáng"
                className="bg-accent hover:bg-accent-hover text-white text-xs font-sans font-semibold py-2.5 px-6 min-h-[44px] rounded-lg shadow-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer group border border-white/20 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Camera className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Bấm chụp thử khoảnh khắc này</span>
              </button>
            </div>
          </div>

          {/* 2. RIGHT: PHOTOGRAPHIC VIEWFINDER SIMULATOR */}
          <div className="lg:col-span-7 space-y-4">
            {/* Viewfinder Monitor Screen */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 border-white/20 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.9)] group">
              {/* Background Photo with Dynamic Optical Depth of Field */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/landing/hero-quang-binh.webp"
                  alt="Mô phỏng độ sâu trường ảnh tại Quảng Bình"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className={`object-cover transition-all duration-500 ease-out filter ${current.blurClass} brightness-[0.88] contrast-[1.05] pointer-events-none`}
                />

                {/* Circular Bokeh Highlight Orbs */}
                {current.bokehRadiusPx > 10 && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                    <div
                      className="absolute top-10 left-16 rounded-full bg-amber-300/35 blur-[1.5px] border border-amber-200/50 animate-pulse"
                      style={{
                        width: current.bokehRadiusPx * 2.8,
                        height: current.bokehRadiusPx * 2.8,
                      }}
                    />
                    <div
                      className="absolute bottom-16 right-20 rounded-full bg-cyan-300/30 blur-[1.5px] border border-cyan-200/50"
                      style={{
                        width: current.bokehRadiusPx * 3.2,
                        height: current.bokehRadiusPx * 3.2,
                      }}
                    />
                    <div
                      className="absolute top-1/3 right-1/4 rounded-full bg-rose-300/30 blur-[1.5px] border border-rose-200/50"
                      style={{
                        width: current.bokehRadiusPx * 2.2,
                        height: current.bokehRadiusPx * 2.2,
                      }}
                    />
                  </div>
                )}

                {/* Foreground Subject Layer with Strictly Centered Lens Reticle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative aspect-[783/628] w-60 sm:w-72 max-w-full">
                    <Image
                      src="/images/landing/cutouts/canon-r50.png"
                      alt="Canon EOS R50 trong mô phỏng độ sâu trường ảnh"
                      fill
                      sizes="(max-width: 640px) 240px, 288px"
                      className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] pointer-events-none"
                    />

                    {/* FIXED AF RETICLE */}
                    <div
                      className="absolute pointer-events-none transition-all duration-200 ease-out"
                      style={{
                        left: "54.3%",
                        top: "61.3%",
                        transform: "translate(-50%, -50%)",
                      }}
                      aria-hidden="true"
                    >
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 border border-emerald-400/90 rounded-md flex items-center justify-center transition-all duration-200 ${
                          isReticlePulsing
                            ? "scale-105 opacity-100 shadow-[0_0_12px_rgba(52,211,153,0.6)]"
                            : "scale-100 opacity-85"
                        }`}
                      >
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" />
                        <div className="absolute -top-1 w-2.5 h-0.5 bg-emerald-400" />
                        <div className="absolute -bottom-1 w-2.5 h-0.5 bg-emerald-400" />
                        <div className="absolute -left-1 w-0.5 h-2.5 bg-emerald-400" />
                        <div className="absolute -right-1 w-0.5 h-2.5 bg-emerald-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Camera Viewfinder HUD Overlay */}
                <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-between pointer-events-none select-none">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-emerald-400 bg-black/50 backdrop-blur-xs px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>[ DUAL PIXEL AF ] [ EYE TRACKING ]</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${current.badgeColor}`}
                    >
                      {current.badge}
                    </span>
                    <span className="text-white font-medium">{current.iso}</span>
                  </div>

                  {/* Bottom Bar: Exposure Indicator */}
                  <div className="flex items-center justify-between font-mono text-xs text-white bg-black/60 backdrop-blur-md px-3 sm:px-3.5 py-2 rounded-lg border border-white/15">
                    <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
                      <span>
                        Tốc: <strong className="text-white">{current.shutter}</strong>
                      </span>
                      <span className="text-ink-400">·</span>
                      <span>
                        Khẩu: <strong className="text-accent font-bold">{current.label}</strong>
                      </span>
                    </div>
                    <div className="text-emerald-400 text-[10px] sm:text-[11px] font-semibold">
                      ● KHOÁ NÉT QUANG HỌC
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Lens Context & Advice Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-ink-900/90 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-white">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>Đặc tính quang học tại {current.label}:</span>
                </div>
                <span className="text-[11px] font-mono text-ink-400 uppercase">
                  {current.sceneTitle}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-ink-300 font-sans font-normal leading-relaxed">
                {current.desc}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-sans border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="text-ink-400 font-medium">Gợi ý bối cảnh:</span>
                  <span className="text-amber-300 font-medium">{current.recommendedSubject}</span>
                </div>

                <Link
                  href="/thiet-bi/canon-eos-r50"
                  className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>Xem Canon R50 tại Kiho</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 3. COMPACT EDUCATIONAL SEO CONTENT & INTERNAL LINKS */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-ink-400 uppercase">
              <HelpCircle className="w-3.5 h-3.5 text-accent" />
              <span>KIẾN THỨC NHIẾP ẢNH CĂN BẢN</span>
            </div>
            <p className="text-xs sm:text-sm text-ink-300 font-sans leading-relaxed">
              Khẩu độ máy ảnh (ký hiệu bằng f-stop như f/1.4, f/2.8, f/5.6...) biểu thị độ mở của các lá khẩu kim loại bên trong ống kính. Số f càng nhỏ thì khẩu độ mở càng lớn, cho phép ánh sáng đi vào cảm biến nhiều hơn và tạo ra <strong>độ sâu trường ảnh (depth of field)</strong> mỏng hơn, giúp tách biệt chủ thể nổi bật trên nền <strong>bokeh xóa phông</strong> quang học tự nhiên. Khi khép khẩu lên số f lớn (f/8, f/11), vùng nét dày hơn, rất phù hợp chụp phong cảnh sông Son, động Phong Nha hay ảnh nhóm bạn.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5 justify-end">
            <Link
              href="/thiet-bi/canon-eos-r50"
              className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans font-semibold text-white transition-colors group"
            >
              <span>Xem chi tiết Canon R50</span>
              <ArrowRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/#bang-gia"
              className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans font-semibold text-white transition-colors group"
            >
              <span>Xem bảng giá 12 dòng máy</span>
              <ArrowRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
