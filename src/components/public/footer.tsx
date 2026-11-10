import React from "react";
import Link from "next/link";
import Image from "@/components/ui/source-image";
import {
  MapPin,
  Phone,
  Instagram,
  MessageCircle,
  Clock,
  Camera,
  ArrowUpRight,
} from "lucide-react";
import { SiteSettings } from "@/types/database";
import { normalizePhoneNumber, buildZaloUrl } from "@/lib/utils";
import { TrackedOutboundLink } from "@/components/analytics/tracked-outbound-link";

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
            <span className="text-[11px] font-mono font-semibold tracking-wider text-ink-600 uppercase block">
              Thông tin & Cẩm nang
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm font-sans">
              <li>
                <Link
                  href="/gioi-thieu"
                  className="text-ink-600 hover:text-accent transition-colors inline-flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
                >
                  <Camera className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Về Kiho Camera</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-thue"
                  className="text-ink-600 hover:text-accent transition-colors inline-flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
                >
                  <Camera className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Chính sách & Thủ tục thuê</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/gia-thue-may-anh-dong-hoi"
                  className="text-ink-600 hover:text-accent transition-colors inline-flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
                >
                  <Camera className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Bảng giá thuê tại Đồng Hới</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/thue-may-anh-phong-nha"
                  className="text-ink-600 hover:text-accent transition-colors inline-flex items-center gap-1.5 font-medium focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
                >
                  <Camera className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Thuê máy đi Phong Nha</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/so-sanh/canon-r50-vs-canon-g7x-mark-iii"
                  className="text-ink-600 hover:text-accent transition-colors inline-flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
                >
                  <Camera className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>So sánh R50 vs G7X III</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/so-sanh/fujifilm-x100v-vs-x100vi"
                  className="text-ink-600 hover:text-accent transition-colors inline-flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
                >
                  <Camera className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>So sánh X100V vs X100VI</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Column (4 cols) */}
          <div className="md:col-span-4 space-y-3 font-sans">
            <span className="text-[11px] font-mono font-semibold tracking-wider text-ink-600 uppercase block">
              Liên hệ trực tiếp
            </span>

            <div className="space-y-2 text-xs sm:text-sm text-ink-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {settings.address || "48 Ngô Quyền, TP. Đồng Hới, Tỉnh Quảng Bình"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>
                  Hotline / Zalo:{" "}
                  <TrackedOutboundLink
                    href={`tel:${normalizePhoneNumber(settings.phone)}`}
                    eventName="contact_hotline"
                    placement="footer"
                    className="text-ink-900 hover:text-accent font-semibold transition-colors font-mono"
                  >
                    {settings.phone}
                  </TrackedOutboundLink>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-accent shrink-0" />
                <span>
                  Instagram:{" "}
                  <a
                    href={settings.instagram_url || "https://www.instagram.com/thuemayanhqbb/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-900 hover:text-accent font-semibold transition-colors font-mono"
                  >
                    @thuemayanhqbb
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-ink-600">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span>Mở cửa: {settings.opening_hours || "07:30 – 21:00 (Tất cả các ngày)"}</span>
              </div>
            </div>

            {/* Direct Contact CTAs: Messenger & Zalo */}
            <div className="pt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <TrackedOutboundLink
                href={settings.messenger_url}
                eventName="contact_messenger"
                placement="footer"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-ink-900 hover:bg-black px-3.5 py-2.5 rounded-md transition-colors shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <MessageCircle className="w-3.5 h-3.5 text-accent" />
                <span>Nhắn Messenger</span>
              </TrackedOutboundLink>

              <TrackedOutboundLink
                href={buildZaloUrl(settings.phone)}
                eventName="contact_zalo"
                placement="footer"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-ink-900 hover:text-accent bg-white hover:bg-canvas-100 border border-ink-300 hover:border-accent px-3.5 py-2.5 rounded-md transition-colors shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Chat Zalo</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-400 group-hover:text-accent" />
              </TrackedOutboundLink>
            </div>
          </div>
        </div>
      </div>

      {/* Grounding Bottom Bar */}
      <div className="bg-ink-900 text-slate-300 py-3.5 px-4 sm:px-6 lg:px-8 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Kiho Camera · Cho thuê máy ảnh du lịch tại Đồng Hới, Quảng Bình.</p>
          <p className="text-slate-400">ĐỒNG HỚI · QUẢNG BÌNH</p>
        </div>
      </div>
    </footer>
  );
}

