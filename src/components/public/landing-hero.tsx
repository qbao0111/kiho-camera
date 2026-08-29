import React from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ShieldCheck, MapPin, PackageCheck, Camera } from "lucide-react";
import { HeroCameraShowcase } from "@/components/public/hero-camera-showcase";

interface LandingHeroProps {
  messengerUrl?: string;
  phone?: string;
}

export function LandingHero({}: LandingHeroProps = {}) {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:min-h-[78vh] flex items-center bg-[#faf8f5]">
      {/* Subtle Background Paper Grain Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT EDITORIAL COLUMN (Server-rendered, zero hydration cost) */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Metadata Eyebrow */}
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-ink-600 uppercase">
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

            {/* Editorial Trust Line */}
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
              <a
                href="#bang-gia"
                className="bg-ink-900 hover:bg-black text-white px-5 py-3 rounded-lg text-sm font-sans font-semibold transition-colors duration-200 flex items-center gap-2 group cursor-pointer shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Xem bảng giá thuê</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <Link
                href="/thiet-bi"
                className="bg-white hover:bg-canvas-200 text-ink-900 hover:text-accent border border-ink-300 px-5 py-3 rounded-lg text-sm font-sans font-medium transition-colors duration-200 flex items-center gap-2 group cursor-pointer shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Khám phá 12 dòng máy</span>
                <ArrowRight className="w-4 h-4 text-ink-600 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>

            {/* Clean Editorial Metadata Line */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-ink-600 font-sans pt-1 border-t border-ink-200/80">
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-accent" />
                <span>Từ <strong className="font-mono font-bold text-ink-900">80.000₫</strong> / buổi</span>
              </span>
              <span className="text-ink-300">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-ink-600" />
                <span>48 Ngô Quyền, Đồng Hới</span>
              </span>
              <span className="text-ink-300">·</span>
              <span className="flex items-center gap-1.5">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Kèm 2 pin · sạc · thẻ 64GB</span>
              </span>
            </div>

          </div>

          {/* RIGHT VISUAL COLUMN (Client interactive showcase) */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            <HeroCameraShowcase />
          </div>

        </div>
      </div>
    </section>
  );
}
