"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Aperture, Camera, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

const F_STOPS = [
  { value: 1.4, label: "f/1.4", blur: "blur-xl", desc: "Xoá phông cực đại, bokeh tròn lung linh, cực đẹp cho chân dung nghệ thuật", badge: "Chân dung Bokeh" },
  { value: 2.8, label: "f/2.8", blur: "blur-md", desc: "Độ nét hoàn hảo, hậu cảnh tách bạch tự nhiên, màu da mịn màng", badge: "Du lịch & Check-in" },
  { value: 5.6, label: "f/5.6", blur: "blur-sm", desc: "Cân bằng giữa chủ thể và cảnh nền, chụp ảnh nhóm kỷ yếu bạn bè", badge: "Ảnh nhóm & Kỷ yếu" },
  { value: 11, label: "f/11", blur: "blur-none", desc: "Độ sâu trường ảnh tối đa, sắc nét toàn dải từ tiền cảnh đến dãy núi Phong Nha", badge: "Phong cảnh đại ngàn" },
];

export function Interactive3dAperture() {
  const [activeFStop, setActiveFStop] = useState(1);
  const [isShutterActive, setIsShutterActive] = useState(false);

  const current = F_STOPS[activeFStop];

  const handleShutterClick = () => {
    setIsShutterActive(true);
    setTimeout(() => setIsShutterActive(false), 200);
  };

  const apertureRadiusPercent = Math.max(15, Math.min(85, 95 - (activeFStop * 24)));

  return (
    <section className="py-16 sm:py-24 bg-ink-900 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {isShutterActive && (
        <div className="fixed inset-0 z-50 bg-white opacity-80 pointer-events-none transition-opacity duration-150 animate-out fade-out" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <FadeIn className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-widest text-amber-300 uppercase mb-2">
            <Aperture className="w-3.5 h-3.5 text-accent" />
            <span>3D LENS & KHẨU ĐỘ SIMULATOR</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
            Trải nghiệm xoá phông quang học cùng Canon R50.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-300 max-w-2xl font-sans font-normal leading-relaxed">
            Chỉnh khẩu độ (f-stop) để xem sự thay đổi trực quan của lá khẩu và hiệu ứng độ sâu trường ảnh (Depth of Field) ngay trên màn hình.
          </p>
        </FadeIn>

        {/* Interactive Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Iris Simulator */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#1e1c1a] border-6 border-[#322e2b] shadow-xl flex items-center justify-center p-4 group select-none">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20 pointer-events-none" />

              <div className="relative w-full h-full rounded-full bg-black/90 border border-white/20 overflow-hidden flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-amber-500/15 pointer-events-none rounded-full" />

                <div
                  className="relative transition-all duration-500 ease-out flex items-center justify-center rounded-full bg-gradient-to-br from-amber-400/20 to-cyan-400/20 border border-accent/60 shadow-[0_0_20px_rgba(224,88,34,0.3)]"
                  style={{
                    width: `${apertureRadiusPercent}%`,
                    height: `${apertureRadiusPercent}%`,
                  }}
                >
                  <span className="text-[11px] font-mono font-semibold text-white/90 drop-shadow">
                    {current.label}
                  </span>
                </div>
              </div>

              {/* Shutter Button */}
              <button
                onClick={handleShutterClick}
                className="absolute -bottom-3 bg-accent hover:bg-accent-hover text-white text-xs font-sans font-semibold px-4 py-1.5 rounded-md shadow-md border border-white/20 flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Bấm chụp thử</span>
              </button>
            </div>

            {/* F-Stop Selector */}
            <div className="mt-6 flex items-center gap-1.5 bg-[#1e1c1a] p-1 rounded-lg border border-white/10">
              {F_STOPS.map((stop, idx) => (
                <button
                  key={stop.value}
                  onClick={() => setActiveFStop(idx)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                    activeFStop === idx
                      ? "bg-accent text-white shadow-xs"
                      : "text-ink-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {stop.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Viewfinder Display */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/15 bg-black shadow-xl">
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80"
                  alt="Background Quang Binh Landscape"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className={`object-cover transition-all duration-500 ease-out ${current.blur}`}
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[85%] h-[80%] border border-white/30 rounded-lg relative flex flex-col justify-between p-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                      <span>[ AF-C ] [ RAW ]</span>
                      <span className="text-white font-medium">{current.badge}</span>
                      <span>ISO 100</span>
                    </div>

                    <div className="absolute inset-0 m-auto w-20 h-20 border border-emerald-400/80 rounded flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-white/90 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                      <span>1/500s</span>
                      <span className="text-accent font-semibold">{current.label}</span>
                      <span>+0.0 EV</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanatory Info Card */}
            <div className="bg-[#1c1b1a] p-4 rounded-lg border border-white/10 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-sans font-semibold text-white">
                  Đặc tính khẩu độ {current.label} trên Canon EOS R50:
                </h4>
                <p className="text-xs text-ink-300 mt-0.5 leading-relaxed font-sans font-normal">
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
