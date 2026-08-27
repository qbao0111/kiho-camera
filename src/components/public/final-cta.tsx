"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ArrowDown, Phone, Instagram, MapPin, Sparkles } from "lucide-react";

interface FinalCtaProps {
  messengerUrl?: string;
  phone?: string;
  address?: string;
}

export function FinalCta({
  messengerUrl = "https://m.me/kihocameradonghoi",
  phone = "0387 274 669",
  address = "48 Ngô Quyền, Đồng Hới, Quảng Bình",
}: FinalCtaProps) {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById("bang-gia");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#F8F4EE] text-[#171716] border-t border-[#E8E2D7]">
      {/* Background Scenic Overlay with soft warm wash */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/landing/hero-quang-binh.webp"
          alt="Quảng Bình landscape"
          fill
          className="object-cover object-center opacity-15 filter contrast-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F4EE]/90 via-[#F8F4EE]/95 to-[#F8F4EE]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-7">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] text-[#716A62] text-xs font-mono font-bold uppercase tracking-wider border border-[#E2DBCF] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E85D2A]" />
            <span>KIHO CAMERA · ĐỒNG HÀNH CÙNG CHUYẾN ĐI</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-[#171716] font-mono">
            Chuyến đi tới <br />
            <span className="text-[#E85D2A]">mang máy nào đây?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#716A62] leading-relaxed max-w-2xl font-medium">
            Nhắn Kiho để được gợi ý máy phù hợp. Thuê nhanh, không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            {/* Primary CTA (Coral / Orange) */}
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#E85D2A] hover:bg-[#d64e1c] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider px-7 py-4 rounded-2xl shadow-sm transition-all group cursor-pointer"
            >
              <span>Nhắn Kiho tư vấn ngay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary CTA (Light Beige Outline) */}
            <button
              onClick={scrollToPricing}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F0E8DE] text-[#171716] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider px-6 py-4 rounded-2xl border border-[#D8CEC0] shadow-2xs transition-all cursor-pointer"
            >
              <span>Xem bảng giá</span>
              <ArrowDown className="w-4 h-4 text-[#716A62]" />
            </button>
          </div>

          {/* Store Quick Info Row */}
          <div className="pt-8 border-t border-[#E8E2D7] grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs font-mono text-[#716A62]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#5DAEA5]/15 text-[#2A8B80] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[#171716] font-medium leading-snug">{address}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E85D2A]/10 text-[#E85D2A] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <a href="tel:0387274669" className="text-[#171716] hover:text-[#E85D2A] font-bold transition-colors">
                {phone}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#5659C9]/10 text-[#5659C9] flex items-center justify-center shrink-0">
                <Instagram className="w-4 h-4" />
              </div>
              <a
                href="https://www.instagram.com/thuemayanhqbb/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#171716] hover:text-[#5659C9] font-bold transition-colors"
              >
                @thuemayanhqbb
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
