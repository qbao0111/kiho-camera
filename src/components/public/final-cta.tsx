"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown, Phone, Instagram, MapPin } from "lucide-react";

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
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#171716] text-[#faf8f4]">
      {/* Background Editorial Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/landing/hero-quang-binh.webp"
          alt="Quảng Bình sunset trip"
          fill
          className="object-cover opacity-25 filter grayscale contrast-125"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171716] via-[#171716]/90 to-[#171716]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-8">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-mono font-bold uppercase tracking-wider border border-white/10 backdrop-blur-md">
            <span>KIHO CAMERA · ĐỒNG HÀNH CÙNG CHUYẾN ĐI</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-white">
            Chuyến đi tới <br />
            <span className="text-[#e9b85a]">mang máy nào đây?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-ink-300 leading-relaxed max-w-2xl font-medium">
            Nhắn Kiho để được gợi ý máy phù hợp. Thuê nhanh, không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-mono font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-colors group cursor-pointer"
            >
              <span>Nhắn Kiho tư vấn ngay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={scrollToPricing}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-mono font-bold uppercase tracking-wider px-6 py-4 rounded-xl border border-white/20 backdrop-blur-sm transition-colors cursor-pointer"
            >
              <span>Xem bảng giá</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Store Quick Info Footer */}
          <div className="pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono text-ink-300">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span>{address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-accent shrink-0" />
              <a href="tel:0387274669" className="hover:text-white transition-colors">
                {phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Instagram className="w-4 h-4 text-accent shrink-0" />
              <a
                href="https://www.instagram.com/thuemayanhqbb/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
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
