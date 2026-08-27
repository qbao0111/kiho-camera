"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, Play, ArrowUpRight, Camera, Film, Sliders, Aperture, Sun, Sparkles } from "lucide-react";
import { VideoModal } from "./video-modal";

interface ReferenceHeroProps {
  messengerUrl?: string;
  onSearch?: (query: string, category: string) => void;
}

export function ReferenceHero({
  messengerUrl = "https://m.me/kihocameradonghoi",
  onSearch,
}: ReferenceHeroProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="w-full py-2 sm:py-4 px-2 sm:px-4 lg:px-6 max-w-[1440px] mx-auto select-none">
      {/* 1. MAIN CARD CANVAS (Warm Vintage Cream #f4efe6) */}
      <div
        className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-[#f4efe6] text-ink-900 border border-[#e5ded2] shadow-2xl p-6 sm:p-8 lg:p-12"
        style={{
          boxShadow: "0 30px 70px -15px rgba(60, 50, 40, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.8)",
        }}
      >
        {/* Subtle Paper Grain / Dust Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* 2. TOP NAVIGATION HEADER (Matching Reference) */}
        <header className="relative z-20 flex items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#e2dbcf]">
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="group flex items-baseline">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-ink-900 uppercase font-mono">
                KIHO CAMERA
              </span>
            </Link>
          </div>

          {/* Center Category Links with Vertical Dividers */}
          <nav className="hidden md:flex items-center space-x-6 text-xs lg:text-sm font-semibold tracking-wide text-ink-700">
            <Link href="/thiet-bi?cat=may-anh" className="hover:text-ink-900 transition-colors py-1">
              Camera
            </Link>
            <span className="text-[#c8c0b2] text-xs">|</span>
            <Link href="/thiet-bi?cat=lens" className="hover:text-ink-900 transition-colors py-1">
              Films & Lens
            </Link>
            <span className="text-[#c8c0b2] text-xs">|</span>
            <Link href="/thiet-bi?cat=may-quay" className="hover:text-ink-900 transition-colors py-1">
              Pocket & Action
            </Link>
            <span className="text-[#c8c0b2] text-xs">|</span>
            <Link href="/huong-dan-thue" className="hover:text-ink-900 transition-colors py-1">
              FAQ
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-xs font-semibold text-ink-800">
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block hover:text-ink-900 transition-colors font-mono"
            >
              Liên hệ thuê
            </a>
            <span className="hidden sm:inline text-[#c8c0b2]">|</span>

            {/* Search Icon */}
            <Link
              href="/thiet-bi"
              className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors text-ink-800"
              aria-label="Tìm kiếm"
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Bag Icon */}
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors text-ink-800 relative"
              aria-label="Giỏ thuê"
            >
              <ShoppingBag className="w-4 h-4" />
            </a>

            {/* Mobile Menu Icon */}
            <Link
              href="/thiet-bi"
              className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors text-ink-800 md:hidden"
              aria-label="Menu"
            >
              <Menu className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* 3. MAIN HERO GRID (Left Viewfinder Frame + Right Split Camera Block) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-8 sm:pt-10 items-center">
          
          {/* LEFT FOCUS BOX (Viewfinder Frame with Corner Marks) */}
          <div className="lg:col-span-6 relative p-6 sm:p-8 lg:p-10 border border-[#e2dbcf] rounded-2xl bg-[#faf6ef]/70 backdrop-blur-sm">
            {/* 4 Viewfinder Crop Marks */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-ink-900 pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-ink-900 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-ink-900 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-ink-900 pointer-events-none" />

            {/* Pinned Polaroid Instant Photos at Top-Right */}
            <div className="absolute -top-4 -right-2 sm:-top-5 sm:right-4 z-20 rotate-6 hover:rotate-0 transition-transform duration-300 pointer-events-none">
              <div className="bg-white p-1.5 pb-4 shadow-xl rounded-sm border border-black/10 w-16 sm:w-20">
                <div className="aspect-square bg-ink-200 relative overflow-hidden rounded-xs">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                    alt="Sample snapshot"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Giant Stamp Headline */}
            <div className="relative pt-2 pb-6 space-y-2">
              {/* Hand-drawn Oval Accent around "CAPTURE HAPPY" */}
              <div className="relative inline-block">
                <svg
                  className="absolute -inset-x-3 -inset-y-2 w-[115%] h-[135%] text-[#e6a84d] pointer-events-none stroke-current fill-none opacity-80"
                  viewBox="0 0 300 80"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 15,40 C 20,15 150,8 285,25 C 295,45 270,72 140,75 C 25,75 10,55 20,40"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-ink-900 tracking-tight leading-[1.05] uppercase font-mono">
                  CAPTURE HAPPY
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-ink-900 tracking-tight leading-[1.05] uppercase font-mono">
                  MEMORIES FOR THE
                </h2>
                {/* Sunburst Star Doodle */}
                <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 text-[#e6a84d] animate-spin-slow shrink-0" />
              </div>

              <div className="flex items-center gap-3">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-ink-900 tracking-tight leading-[1.05] uppercase font-mono">
                  FUTURE
                </h2>
                <span className="text-2xl sm:text-3xl text-ink-900 font-mono">✦</span>
              </div>
            </div>

            {/* 2 Feature Columns (STILL PHOTOGRAPHY & CINEMATOGRAPH) */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 pb-8 border-t border-[#e8e2d7]">
              {/* Pillar 1 */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-ink-900">
                  <Camera className="w-3.5 h-3.5 text-[#e6a84d]" />
                  <span>STILL PHOTOGRAPHY</span>
                </div>
                <p className="text-xs text-ink-600 leading-relaxed">
                  Máy ảnh màu da trắng hồng trứ danh, bắt nét mắt siêu nhanh đi du lịch Phong Nha & biển Nhật Lệ.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="space-y-1.5 border-l border-[#e8e2d7] pl-4 sm:pl-6">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-ink-900">
                  <Film className="w-3.5 h-3.5 text-[#e6a84d]" />
                  <span>CINEMATOGRAPH</span>
                </div>
                <p className="text-xs text-ink-600 leading-relaxed">
                  Quay phim 4K 60p, chống rung quang học mượt mà cho vlog và lưu giữ kỷ niệm không rung lắc.
                </p>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                {/* Solid Black Button */}
                <a
                  href={messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ink-900 hover:bg-black text-white px-6 py-3 rounded-md text-xs font-mono font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  Thuê máy ngay
                </a>

                {/* Watch Video Button */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-md text-xs font-mono font-bold uppercase tracking-wider text-ink-800 hover:bg-black/5 border border-[#dcd4c6] transition-colors"
                >
                  <Play className="w-3 h-3 fill-current text-ink-900" />
                  <span>Watch video</span>
                </button>
              </div>

              {/* Circular Rotating Stamp Badge */}
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 rounded-full border border-ink-900 flex items-center justify-center hover:bg-ink-900 hover:text-white transition-colors"
                title="Nhắn Kiho tư vấn nhanh"
              >
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* RIGHT SPLIT BLOCK (Warm Yellow Rectangle & Seamless Integrated Camera) */}
          <div className="lg:col-span-6 relative flex flex-col justify-between space-y-6">
            
            {/* Top Subtitle & Store Ranking */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#b8802a] uppercase tracking-wider block">
                  #1 RENTAL SERVICE
                </span>
                <h3 className="text-sm sm:text-base font-bold text-ink-900 uppercase font-mono tracking-tight">
                  CHO THUÊ MÁY ẢNH DU LỊCH TẠI QUẢNG BÌNH
                </h3>
                <p className="text-xs text-ink-500 mt-0.5">
                  Thiết bị tuyển chọn kỹ càng, kèm trọn bộ phụ kiện cao cấp nhận máy là chụp đẹp ngay.
                </p>
              </div>
            </div>

            {/* SEAMLESS CAMERA SHOWCASE CONTAINER */}
            <div className="relative w-full min-h-[300px] sm:min-h-[360px] flex items-center justify-center">
              {/* Pastel Ochre Geometric Background Block (Matching Reference) */}
              <div className="absolute right-0 top-0 w-[85%] h-full bg-[#f6d58e] rounded-3xl -z-0 shadow-inner" />

              {/* The Camera Image: Sits perfectly on top of the division line with soft natural contact shadow */}
              <div className="relative z-10 w-full max-w-[480px] aspect-[16/10] flex items-center justify-center transition-transform duration-500 ease-out hover:scale-105">
                <Image
                  src="/images/hero-camera-vintage.png"
                  alt="Kiho Camera Vintage Lens"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain filter drop-shadow-[0_25px_35px_rgba(40,30,20,0.38)] select-none pointer-events-none"
                />
              </div>
            </div>

            {/* Monochromatic Brand Logos Bar (Canon | FUJIFILM | SONY | Leica) */}
            <div className="relative z-10 flex items-center justify-around gap-6 pt-4 border-t border-[#e2dbcf] text-ink-800">
              <span className="font-serif font-black text-sm sm:text-base tracking-widest uppercase">
                Canon
              </span>
              <span className="text-[#c8c0b2] text-xs">•</span>
              <span className="font-mono font-black text-xs sm:text-sm tracking-widest uppercase">
                FUJIFILM
              </span>
              <span className="text-[#c8c0b2] text-xs">•</span>
              <span className="font-sans font-black text-sm sm:text-base tracking-widest uppercase">
                SONY
              </span>
              <span className="text-[#c8c0b2] text-xs">•</span>
              <span className="font-serif font-bold text-xs sm:text-sm tracking-widest uppercase">
                DJI
              </span>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM FEATURE STRIP (4 Technical Spec Pillars Matching Reference) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-10 mt-10 border-t border-[#e2dbcf]">
          {/* Item 1 */}
          <div className="flex items-start gap-3">
            <Aperture className="w-5 h-5 text-[#b8802a] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-900">
                APERTURE PRIORITY
              </h4>
              <p className="text-[11px] text-ink-500 mt-1 leading-snug">
                Khẩu lớn f/1.4 - f/2.8 xoá phông mịt mù và chụp đêm lung linh không nhiễu hạt.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3">
            <Sliders className="w-5 h-5 text-[#b8802a] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-900">
                FOCUSING MODES
              </h4>
              <p className="text-[11px] text-ink-500 mt-1 leading-snug">
                Lấy nét nhận diện ánh mắt người thông minh, chủ thể luôn sắc nét trong từng bức hình.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-3">
            <Camera className="w-5 h-5 text-[#b8802a] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-900">
                EXPOSURE CONTROL
              </h4>
              <p className="text-[11px] text-ink-500 mt-1 leading-snug">
                Giao diện thân thiện, có sẵn chế độ chụp tự động giúp bạn nhận máy là chụp đẹp ngay.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-start gap-3">
            <Sun className="w-5 h-5 text-[#b8802a] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-900">
                CUSTOM FILM TONE
              </h4>
              <p className="text-[11px] text-ink-500 mt-1 leading-snug">
                Bộ giả lập màu film hoài niệm độc quyền, da người trắng hồng không cần chỉnh sửa.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Video trải nghiệm máy ảnh du lịch tại Kiho Camera"
      />
    </div>
  );
}
