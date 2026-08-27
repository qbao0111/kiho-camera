import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteSettings } from "@/types/database";

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-[#141413] text-[#faf8f5] pt-20 pb-12 border-t border-[#222220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16">
          {/* Brand & Manifesto (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-black tracking-tight text-[#faf8f5] block font-mono">
                KIHO CAMERA
              </span>
              <span className="text-[10px] font-mono tracking-widest text-ink-400 uppercase mt-0.5 block">
                CHO THUÊ MÁY ẢNH QUẢNG BÌNH
              </span>
            </Link>
            <p className="text-sm text-ink-400 leading-relaxed max-w-sm">
              Dịch vụ cho thuê máy ảnh du lịch uy tín tại TP. Đồng Hới. Trọn bộ phụ kiện đi kèm pin sạc thẻ nhớ túi chống sốc, hỗ trợ giao nhận máy tận nơi tại khách sạn.
            </p>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-ink-400 uppercase block">
              MÁY ẢNH THEO HÃNG
            </span>
            <ul className="space-y-2 text-sm text-ink-300 font-mono">
              <li>
                <Link href="/thiet-bi" className="hover:text-[#faf8f5] transition-colors link-underline">
                  Tất cả 12 dòng máy
                </Link>
              </li>
              <li>
                <Link href="/thiet-bi?brand=Fujifilm" className="hover:text-[#faf8f5] transition-colors link-underline">
                  Máy ảnh Fujifilm (X100VI, X100V, XS10)
                </Link>
              </li>
              <li>
                <Link href="/thiet-bi?brand=Canon" className="hover:text-[#faf8f5] transition-colors link-underline">
                  Máy ảnh Canon (R50, RP, G7X III, M100...)
                </Link>
              </li>
              <li>
                <Link href="/thiet-bi?brand=Sony" className="hover:text-[#faf8f5] transition-colors link-underline">
                  Máy ảnh Sony (ZV1 II, ZV1F)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact (4 cols) */}
          <div className="md:col-span-4 space-y-3 font-mono">
            <span className="text-[11px] font-bold tracking-widest text-ink-400 uppercase block">
              LIÊN HỆ TRỰC TIẾP
            </span>
            <div className="space-y-2 text-sm text-ink-300">
              <p>48 Ngô Quyền, TP. Đồng Hới, Tỉnh Quảng Bình</p>
              <p>Hotline / Zalo: <a href="tel:0387274669" className="hover:text-[#faf8f5] font-bold">0387 274 669</a></p>
              <p>Instagram: <a href="https://www.instagram.com/thuemayanhqbb/" target="_blank" rel="noopener noreferrer" className="hover:text-accent">@thuemayanhqbb</a></p>
              <p className="text-xs text-ink-500">Mở cửa: 07:30 - 21:00 (Tất cả các ngày)</p>
            </div>
            <div className="pt-2">
              <a
                href={settings.messenger_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#faf8f5] hover:text-accent transition-colors"
              >
                <span>Nhắn tin qua Messenger</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* SEO Keywords & Copyright */}
        <div className="pt-8 border-t border-[#222220] space-y-6">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-mono text-ink-500">
            <span>#thuê-máy-ảnh-quảng-bình</span>
            <span>#thuê-máy-ảnh-đồng-hới</span>
            <span>#thuê-canon-r50-quảng-bình</span>
            <span>#thuê-fujifilm-x100vi-quảng-bình</span>
            <span>#thuê-canon-g7x-mark-iii</span>
            <span>#thuê-sony-zv1-quảng-bình</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-500">
            <p>© 2026 Kiho Camera - Dịch vụ cho thuê máy ảnh uy tín tại Quảng Bình.</p>
            <p>DESIGNED FOR TRAVELERS & PHOTOGRAPHY</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
