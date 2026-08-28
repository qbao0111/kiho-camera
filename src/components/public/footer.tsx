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
    <footer className="bg-canvas-200/90 text-ink-900 border-t border-ink-200">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10">
        
        {/* Editorial Intro Banner */}
        <div className="pb-8 mb-10 border-b border-ink-200 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <span className="text-[11px] font-mono font-medium tracking-widest text-accent uppercase block">
              KIHO CAMERA · ĐỒNG HỚI, QUẢNG BÌNH
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
              Chuyến đi tới mang máy nào đây?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-ink-600 font-normal leading-relaxed">
              Xem 12 dòng máy có sẵn hoặc nhắn Kiho để được tư vấn chiếc máy ưng ý nhất cho lịch trình của bạn.
            </p>
          </div>

          <Link
            href="/thiet-bi"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-ink-900 hover:text-accent bg-white hover:bg-canvas-100 border border-ink-300 px-4 py-2.5 rounded-lg transition-all shadow-xs shrink-0 self-start sm:self-auto focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>Xem tất cả 12 dòng máy</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ink-400" />
          </Link>
        </div>

        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
          
          {/* 1. Brand & Intro (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="inline-block group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
              <span className="font-display text-2xl font-bold tracking-tight text-ink-900 group-hover:text-accent transition-colors block">
                KIHO CAMERA
              </span>
              <span className="text-[10px] font-mono font-medium tracking-widest text-ink-400 uppercase mt-0.5 block">
                Cho thuê máy ảnh du lịch · Quảng Bình
              </span>
            </Link>
            <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed max-w-sm font-normal">
              Dịch vụ cho thuê máy ảnh du lịch tại TP. Đồng Hới. Trọn bộ phụ kiện đi kèm pin sạc thẻ nhớ túi chống sốc, hỗ trợ giao nhận máy tận nơi tại khách sạn & homestay.
            </p>
          </div>

          {/* 2. Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-[11px] font-mono font-medium tracking-widest text-ink-500 uppercase block">
              Máy ảnh theo hãng
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm font-sans">
              <li>
                <Link
                  href="/thiet-bi"
                  className="text-ink-600 hover:text-accent transition-colors inline-flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Tất cả 12 dòng máy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/thiet-bi?brand=Fujifilm"
                  className="text-ink-600 hover:text-accent transition-colors inline-flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Fujifilm (X100VI, X100V, XS10)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/thiet-bi?brand=Canon"
                  className="text-ink-600 hover:text-accent transition-colors inline-flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Canon (R50, RP, G7X III...)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/thiet-bi?brand=Sony"
                  className="text-ink-600 hover:text-accent transition-colors inline-flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Sony (ZV1 II, ZV1F)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Column (4 cols) */}
          <div className="md:col-span-4 space-y-3 font-sans">
            <span className="text-[11px] font-mono font-medium tracking-widest text-ink-500 uppercase block">
              Liên hệ trực tiếp
            </span>

            <div className="space-y-2 text-xs sm:text-sm text-ink-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="leading-snug">
                  48 Ngô Quyền, TP. Đồng Hới, Tỉnh Quảng Bình
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>
                  Hotline / Zalo:{" "}
                  <a
                    href="tel:0387274669"
                    className="text-ink-900 hover:text-accent font-semibold transition-colors font-mono"
                  >
                    0387 274 669
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-accent shrink-0" />
                <span>
                  Instagram:{" "}
                  <a
                    href="https://www.instagram.com/thuemayanhqbb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-900 hover:text-accent font-semibold transition-colors font-mono"
                  >
                    @thuemayanhqbb
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-ink-500">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span>Mở cửa: 07:30 – 21:00 (Tất cả các ngày)</span>
              </div>
            </div>

            {/* Messenger CTA */}
            <div className="pt-1">
              <a
                href={settings.messenger_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-ink-900 hover:text-accent bg-white hover:bg-canvas-100 border border-ink-300 px-3.5 py-2 rounded-lg transition-all shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-accent" />
                <span>Nhắn tin tư vấn qua Messenger</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-400 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* SEO Tags */}
        <div className="mt-10 pt-5 border-t border-ink-200 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-mono text-ink-400">
          <span>#thuê-máy-ảnh-quảng-bình</span>
          <span>#thuê-máy-ảnh-đồng-hới</span>
          <span>#thuê-canon-r50-quảng-bình</span>
          <span>#thuê-fujifilm-x100vi-quảng-bình</span>
          <span>#thuê-canon-g7x-mark-iii</span>
          <span>#thuê-sony-zv1-quảng-bình</span>
        </div>
      </div>

      {/* Grounding Bottom Bar */}
      <div className="bg-ink-900 text-ink-400 py-3.5 px-4 sm:px-6 lg:px-8 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Kiho Camera · Cho thuê máy ảnh du lịch tại Đồng Hới, Quảng Bình.</p>
          <p className="text-ink-500">ĐỒNG HỚI · QUẢNG BÌNH</p>
        </div>
      </div>
    </footer>
  );
}
