import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        
        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
          
          {/* 1. Brand & Description (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="inline-block group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
              <Image
                src="/brand/kiho-logo-master-transparent.png"
                alt="Kiho Camera"
                width={180}
                height={147}
                className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>
            <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed max-w-sm font-normal">
              Dịch vụ cho thuê máy ảnh du lịch tại TP. Đồng Hới. Trọn bộ phụ kiện đi kèm pin sạc thẻ nhớ túi chống sốc, hỗ trợ giao nhận máy tận nơi tại khách sạn & homestay.
            </p>
          </div>


          {/* 2. Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-[11px] font-mono font-medium tracking-wider text-ink-500 uppercase block">
              Máy ảnh & Cẩm nang
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
                  href="/thue-may-anh-phong-nha"
                  className="text-ink-600 hover:text-accent transition-colors inline-flex items-center gap-1.5 font-medium"
                >
                  <Camera className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Thuê máy đi Phong Nha</span>
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
                  <span>Sony (ZV-1 II, ZV-1F)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Column (4 cols) */}
          <div className="md:col-span-4 space-y-3 font-sans">
            <span className="text-[11px] font-mono font-medium tracking-wider text-ink-500 uppercase block">
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
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-ink-900 hover:text-accent bg-white hover:bg-canvas-100 border border-ink-300 px-3.5 py-2 rounded-md transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-accent" />
                <span>Nhắn tin tư vấn qua Messenger</span>
              </a>
            </div>
          </div>
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
