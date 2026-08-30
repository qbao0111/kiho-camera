"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ArrowDown, Phone, Instagram, MapPin, Camera } from "lucide-react";
import { trackMessengerContact, trackHotlineContact } from "@/lib/analytics";
import { normalizePhoneNumber } from "@/lib/utils";

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
    <section className="relative py-16 sm:py-24 overflow-hidden bg-canvas-100 text-ink-900 border-t border-ink-200">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/landing/hero-quang-binh.webp"
          alt="Quảng Bình landscape"
          fill
          className="object-cover object-center opacity-10 filter contrast-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas-100/90 via-canvas-100/95 to-canvas-100" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-6">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-ink-600 uppercase">
            <Camera className="w-3.5 h-3.5 text-accent" />
            <span>KIHO CAMERA · ĐỒNG HÀNH CÙNG CHUYẾN ĐI</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-ink-900">
            Chuyến đi tới <br />
            <span className="italic text-accent font-normal">mang máy nào đây?</span>
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg text-ink-600 leading-relaxed max-w-2xl font-normal">
            Nhắn Kiho để được gợi ý máy phù hợp. Thuê nhanh, không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMessengerContact({ placement: "final_cta" })}
              className="inline-flex items-center gap-2 bg-ink-900 hover:bg-black text-white text-xs sm:text-sm font-sans font-semibold px-6 py-3.5 rounded-lg shadow-xs transition-all group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Nhắn Kiho tư vấn ngay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              onClick={scrollToPricing}
              className="inline-flex items-center gap-2 bg-white hover:bg-canvas-200 text-ink-900 hover:text-accent text-xs sm:text-sm font-sans font-medium px-5 py-3.5 rounded-lg border border-ink-300 shadow-xs transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Xem bảng giá</span>
              <ArrowDown className="w-4 h-4 text-ink-600 group-hover:text-accent" />
            </button>
          </div>


          {/* Store Quick Info Row */}
          <div className="pt-8 border-t border-ink-200 grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs font-sans text-ink-600">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span className="leading-snug">{address}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-accent shrink-0" />
              <a
                href={`tel:${normalizePhoneNumber(phone)}`}
                onClick={() => trackHotlineContact({ placement: "final_cta" })}
                className="text-ink-900 hover:text-accent font-semibold transition-colors font-mono"
              >
                {phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Instagram className="w-4 h-4 text-accent shrink-0" />
              <a
                href="https://www.instagram.com/thuemayanhqbb/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-900 hover:text-accent font-semibold transition-colors font-mono"
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
