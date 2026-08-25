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
              <span className="text-xl font-black tracking-tight text-[#faf8f5] block">
                KIHO CAMERA
              </span>
              <span className="text-[10px] font-mono tracking-widest text-ink-400 uppercase mt-0.5 block">
                CHO THUÊ MÁY ẢNH QUẢNG BÌNH
              </span>
            </Link>
            <p className="text-sm text-ink-400 leading-relaxed max-w-sm">
              Dịch vụ cho thuê máy ảnh, lens và thiết bị du lịch uy tín tại TP. Đồng Hới. Hỗ trợ giao nhận máy tận nơi, sẵn sàng đồng hành cùng chuyến đi của bạn.
            </p>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-ink-400 uppercase block">
              DANH MỤC
            </span>
            <ul className="space-y-2 text-sm text-ink-300">
              <li>
                <Link href="/thiet-bi" className="hover:text-[#faf8f5] transition-colors link-underline">
                  Tất cả thiết bị
                </Link>
              </li>
              <li>
                <Link href="/thiet-bi?category=may-anh" className="hover:text-[#faf8f5] transition-colors link-underline">
                  Máy ảnh compact & mirrorless
                </Link>
              </li>
              <li>
                <Link href="/thiet-bi?category=lens" className="hover:text-[#faf8f5] transition-colors link-underline">
                  Ống kính chân dung & phong cảnh
                </Link>
              </li>
              <li>
                <Link href="/thiet-bi?category=may-quay" className="hover:text-[#faf8f5] transition-colors link-underline">
                  Máy quay & DJI Pocket 3
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-ink-400 uppercase block">
              LIÊN HỆ TRỰC TIẾP
            </span>
            <div className="space-y-2 text-sm text-ink-300">
              <p>{settings.address}</p>
              <p>Hotline: <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="hover:text-[#faf8f5] font-mono">{settings.phone}</a></p>
              <p className="text-xs text-ink-500">{settings.opening_hours}</p>
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
            <span>#thuê-canon-g7x-quảng-bình</span>
            <span>#thuê-fujifilm-quảng-bình</span>
            <span>#thuê-dji-pocket-3</span>
            <span>#thuê-sony-a7-iv</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-500">
            <p>{settings.footer_text}</p>
            <p>DESIGNED FOR PHOTOGRAPHY & TRAVELERS</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
