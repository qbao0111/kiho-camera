"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Aperture, Camera, Sparkles, Sliders, Check } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

const F_STOPS = [
  { value: 1.4, label: "f/1.4", blur: "blur-xl", desc: "Xoá phông cực đại, bokeh tròn lung linh, cực đẹp cho chân dung nghệ thuật", badge: "Chân dung Bokeh" },
  { value: 2.8, label: "f/2.8", blur: "blur-md", desc: "Độ nét hoàn hảo, hậu cảnh tách bạch tự nhiên, màu da mịn màng", badge: "Du lịch & Check-in" },
  { value: 5.6, label: "f/5.6", blur: "blur-sm", desc: "Cân bằng giữa chủ thể và cảnh nền, chụp ảnh nhóm kỷ yếu bạn bè", badge: "Ảnh nhóm & Kỷ yếu" },
  { value: 11, label: "f/11", blur: "blur-none", desc: "Độ sâu trường ảnh tối đa, sắc nét toàn dải từ tiền cảnh đến dãy núi Phong Nha", badge: "Phong cảnh đại ngàn" },
];

export function Interactive3dAperture() {
  const [activeFStop, setActiveFStop] = useState(1); // Default f/2.8
  const [isShutterActive, setIsShutterActive] = useState(false);

  const current = F_STOPS[activeFStop];

  const handleShutterClick = () => {
    setIsShutterActive(true);
    setTimeout(() => setIsShutterActive(false), 200);
  };

  // Aperture opening scale calculation: larger f-number = smaller hole
  const apertureRadiusPercent = Math.max(15, Math.min(85, 95 - (activeFStop * 24)));

  return (
    <section className="py-20 sm:py-28 bg-[#141413] text-white relative overflow-hidden">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Shutter Flash Animation Overlay */}
      {isShutterActive && (
        <div className="fixed inset-0 z-50 bg-white opacity-80 pointer-events-none transition-opacity duration-150 animate-out fade-out" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <FadeIn className="max-w-3xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-3 border border-white/10">
            <Aperture className="w-3.5 h-3.5 text-accent animate-spin-slow" />
            3D Lens & Khẩu độ Simulator
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Trải nghiệm xoá phông quang học chân thực cùng Canon R50.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ink-300 max-w-2xl leading-relaxed">
            Kéo chỉnh khẩu độ (f-stop) để xem sự thay đổi trực quan của lá khẩu 3D và hiệu ứng độ sâu trường ảnh (Depth of Field) ngay trên màn hình.
          </p>
        </FadeIn>

        {/* Interactive 3D Aperture & Viewfinder Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Interactive 3D Lens Aperture Iris Simulator */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-[#1e1c1a] border-8 border-[#322e2b] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center p-4 group select-none">
              {/* Outer Lens Knurling Texture */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/20 pointer-events-none animate-[spin_60s_linear_infinite]" />

              {/* Lens Optical Barrel Rings */}
              <div className="relative w-full h-full rounded-full bg-black/90 border border-white/20 overflow-hidden flex items-center justify-center shadow-inner">
                {/* 3D Glass Reflection Highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-amber-500/15 pointer-events-none rounded-full" />

                {/* 9 Mechanical Aperture Iris Blades */}
                <div
                  className="relative transition-all duration-500 ease-out flex items-center justify-center rounded-full bg-gradient-to-br from-amber-400/20 to-cyan-400/20 border-2 border-accent/60 shadow-[0_0_30px_rgba(224,88,34,0.3)]"
                  style={{
                    width: `${apertureRadiusPercent}%`,
                    height: `${apertureRadiusPercent}%`,
                  }}
                >
                  {/* Center Optical Core */}
                  <span className="text-[11px] font-mono font-bold text-white/90 drop-shadow">
                    {current.label}
                  </span>
                </div>
              </div>

              {/* Shutter Button Widget */}
              <button
                onClick={handleShutterClick}
                className="absolute -bottom-4 bg-accent hover:bg-accent-hover text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg border border-white/20 flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Bấm chụp thử</span>
              </button>
            </div>

            {/* F-Stop Selector Control Bar */}
            <div className="mt-8 flex items-center gap-2 bg-[#1e1c1a] p-1.5 rounded-xl border border-white/10">
              {F_STOPS.map((stop, idx) => (
                <button
                  key={stop.value}
                  onClick={() => setActiveFStop(idx)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    activeFStop === idx
                      ? "bg-accent text-white shadow-md scale-105"
                      : "text-ink-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {stop.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Simulated 3D Camera Viewfinder Display */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
              {/* Background Photo with Dynamic Depth of Field Blur */}
              <div className="relative w-full h-full">
                {/* Background Layer (Blur changes with aperture) */}
                <Image
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80"
                  alt="Background Quang Binh Landscape"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className={`object-cover transition-all duration-700 ease-out ${current.blur}`}
                />

                {/* Foreground Sharp Focus Subject */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Camera Electronic Viewfinder (EVF) Overlay UI */}
                  <div className="w-[85%] h-[80%] border border-white/30 rounded-lg relative flex flex-col justify-between p-3 sm:p-4">
                    {/* Top EVF info */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                      <span>[ AF-C ] [ RAW+L ]</span>
                      <span className="text-white font-bold">{current.badge}</span>
                      <span>ISO 100</span>
                    </div>

                    {/* Center Dual Pixel AF II Box Target */}
                    <div className="absolute inset-0 m-auto w-24 h-24 border-2 border-emerald-400/80 rounded-md flex items-center justify-center animate-pulse">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    </div>

                    {/* Bottom EVF Exposure values */}
                    <div className="flex items-center justify-between text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                      <span>1/500s</span>
                      <span className="text-accent font-bold text-sm">{current.label}</span>
                      <span>+0.0 EV</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanatory Info Card */}
            <div className="bg-[#1c1b1a] p-5 rounded-xl border border-white/10 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">
                  Đặc tính khẩu độ {current.label} trên Canon EOS R50:
                </h4>
                <p className="text-xs sm:text-sm text-ink-300 mt-1 leading-relaxed">
                  {current.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
