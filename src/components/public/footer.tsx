import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Instagram,
  MessageCircle,
  Clock,
  Camera,
} from "lucide-react";
import { SiteSettings } from "@/types/database";

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-[#EEE8DF] text-[#171716] border-t border-[#DDD5C9]">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-12">
        
        {/* Subtle Editorial Intro Header */}
        <div className="pb-10 mb-12 border-b border-[#DDD5C9] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#E85D2A] uppercase block">
              ✦ KIHO CAMERA · QUẢNG BÌNH
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#171716] tracking-tight font-mono">
              Chuyến đi tới mang máy nào đây?
            </h3>
            <p className="text-xs sm:text-sm text-[#716A62] font-medium leading-relaxed">
              Xem 12 dòng máy có sẵn hoặc để Kiho tư vấn chiếc máy phù hợp cho bạn.
            </p>
          </div>

          <Link
            href="/thiet-bi"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#171716] hover:text-[#E85D2A] bg-white hover:bg-[#FAF8F5] border border-[#D8CEC0] px-4 py-2.5 rounded-xl transition-all shadow-2xs shrink-0 self-start sm:self-auto"
          >
            <span>Xem tất cả 12 dòng máy</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#716A62]" />
          </Link>
        </div>

        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-14">
          
          {/* 1. Brand & Intro (5 cols) */}
          <div className="md:col-span-5 space-y-3.5">
            <Link href="/" className="inline-block group">
              <span className="text-xl font-black tracking-tight text-[#171716] group-hover:text-[#E85D2A] transition-colors block font-mono">
                KIHO CAMERA
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#716A62] uppercase mt-0.5 block">
                Cho thuê máy ảnh du lịch · Quảng Bình
              </span>
            </Link>
            <p className="text-sm text-[#716A62] leading-relaxed max-w-sm font-medium">
              Dịch vụ cho thuê máy ảnh du lịch uy tín tại TP. Đồng Hới. Trọn bộ phụ kiện đi kèm pin sạc thẻ nhớ túi chống sốc, hỗ trợ giao nhận máy tận nơi tại khách sạn.
            </p>
          </div>

          {/* 2. Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#716A62] uppercase block">
              Máy ảnh theo hãng
            </span>
            <ul className="space-y-2 text-sm text-[#171716] font-mono">
              <li>
                <Link
                  href="/thiet-bi"
                  className="text-[#716A62] hover:text-[#E85D2A] transition-colors inline-flex items-center gap-2"
                >
                  <Camera className="w-3.5 h-3.5 text-[#E85D2A]/70 shrink-0" />
                  <span>Tất cả 12 dòng máy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/thiet-bi?brand=Fujifilm"
                  className="text-[#716A62] hover:text-[#E85D2A] transition-colors inline-flex items-center gap-2"
                >
                  <Camera className="w-3.5 h-3.5 text-[#E85D2A]/70 shrink-0" />
                  <span>Fujifilm (X100VI, X100V, XS10)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/thiet-bi?brand=Canon"
                  className="text-[#716A62] hover:text-[#E85D2A] transition-colors inline-flex items-center gap-2"
                >
                  <Camera className="w-3.5 h-3.5 text-[#E85D2A]/70 shrink-0" />
                  <span>Canon (R50, RP, G7X III...)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/thiet-bi?brand=Sony"
                  className="text-[#716A62] hover:text-[#E85D2A] transition-colors inline-flex items-center gap-2"
                >
                  <Camera className="w-3.5 h-3.5 text-[#E85D2A]/70 shrink-0" />
                  <span>Sony (ZV1 II, ZV1F)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Column (4 cols) */}
          <div className="md:col-span-4 space-y-3.5 font-mono">
            <span className="text-[11px] font-bold tracking-widest text-[#716A62] uppercase block">
              Liên hệ trực tiếp
            </span>

            <div className="space-y-2.5 text-sm text-[#171716]">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#5DAEA5]/15 text-[#2A8B80] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="leading-snug text-xs sm:text-sm text-[#716A62]">
                  48 Ngô Quyền, TP. Đồng Hới, Tỉnh Quảng Bình
                </span>
              </div>

              {/* Hotline / Zalo */}
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#E85D2A]/10 text-[#E85D2A] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-[#716A62]">
                  Hotline / Zalo:{" "}
                  <a href="tel:0387274669" className="text-[#171716] hover:text-[#E85D2A] font-bold transition-colors">
                    0387 274 669
                  </a>
                </span>
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#5659C9]/10 text-[#5659C9] flex items-center justify-center shrink-0">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-[#716A62]">
                  Instagram:{" "}
                  <a
                    href="https://www.instagram.com/thuemayanhqbb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#171716] hover:text-[#5659C9] font-bold transition-colors"
                  >
                    @thuemayanhqbb
                  </a>
                </span>
              </div>

              {/* Opening hours */}
              <div className="flex items-center gap-2.5 text-xs text-[#716A62]">
                <div className="w-6 h-6 rounded-md bg-black/5 text-[#716A62] flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>Mở cửa: 07:30 - 21:00 (Tất cả các ngày)</span>
              </div>
            </div>

            {/* Messenger CTA Button */}
            <div className="pt-1.5">
              <a
                href={settings.messenger_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs font-bold text-[#171716] hover:text-[#E85D2A] bg-white hover:bg-[#FAF8F5] border border-[#D8CEC0] px-4 py-2 rounded-xl transition-all shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#E85D2A]" />
                <span>Nhắn tin tư vấn qua Messenger</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#716A62] group-hover:text-[#E85D2A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* SEO Tags */}
        <div className="mt-12 pt-6 border-t border-[#DDD5C9] flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-mono text-[#716A62]">
          <span>#thuê-máy-ảnh-quảng-bình</span>
          <span>#thuê-máy-ảnh-đồng-hới</span>
          <span>#thuê-canon-r50-quảng-bình</span>
          <span>#thuê-fujifilm-x100vi-quảng-bình</span>
          <span>#thuê-canon-g7x-mark-iii</span>
          <span>#thuê-sony-zv1-quảng-bình</span>
        </div>
      </div>

      {/* Subtle Grounding Dark Strip at Bottom */}
      <div className="bg-[#1C1A18] text-[#A8A29E] py-4 px-4 sm:px-6 lg:px-8 border-t border-black/10 text-[11px] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p>© 2026 Kiho Camera · Cho thuê máy ảnh du lịch tại Quảng Bình.</p>
          <p className="text-[#78716C]">DESIGNED FOR TRAVELERS & PHOTOGRAPHY</p>
        </div>
      </div>
    </footer>
  );
}
