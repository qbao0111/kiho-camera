"use client";

import React, { useState } from "react";
import {
  Send,
  MessageCircle,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { Equipment } from "@/types/database";
import { RentalRequestDrawer } from "@/components/public/rental-request-drawer";

interface ProductRentalActionProps {
  equipment: Equipment;
  messengerChatUrl: string;
  hasSampleImages?: boolean;
  sampleImagesCount?: number;
}

export function ProductRentalAction({
  equipment,
  messengerChatUrl,
  hasSampleImages,
  sampleImagesCount = 0,
}: ProductRentalActionProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="space-y-4 pt-1">
      {/* Dual-CTA Container */}
      <div className="bg-canvas-100 p-4 sm:p-5 rounded-xl border border-ink-200 shadow-xs space-y-3">
        {/* Button 1: Primary Lead Request Drawer */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="w-full inline-flex items-center justify-center gap-2 bg-ink-900 hover:bg-black text-white font-sans font-semibold py-3.5 px-5 rounded-lg shadow-xs transition-all text-sm group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Send className="w-4 h-4 text-accent group-hover:text-white transition-colors shrink-0" />
          <span className="truncate">Gửi yêu cầu thuê {equipment.name}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center py-0.5">
          <div className="border-t border-ink-200 w-full" />
          <span className="bg-canvas-100 px-3 text-[11px] font-mono text-ink-600 font-semibold uppercase tracking-wider shrink-0">
            hoặc
          </span>
          <div className="border-t border-ink-200 w-full" />
        </div>

        {/* Button 2: Secondary Messenger Consultation */}
        <a
          href={messengerChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-canvas-200 border border-ink-300 text-ink-900 hover:text-accent font-sans font-medium py-3 px-5 rounded-lg transition-all text-sm shadow-xs group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
        >
          <MessageCircle className="w-4 h-4 text-accent shrink-0" />
          <span className="truncate">Nhắn Kiho tư vấn ngay</span>
          <ArrowUpRight className="w-4 h-4 text-ink-600 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
        </a>

      </div>

      {/* Support Note */}
      <div className="p-3 rounded-lg bg-canvas-200/80 border border-ink-200 flex items-center gap-2.5 text-xs font-sans text-ink-700">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
        <span>
          <strong className="text-ink-900 font-semibold">Không cần cọc tiền máy</strong> · Chỉ cần ảnh CCCD hoặc VNeID để xác minh
        </span>
      </div>

      {/* Sample Photo Discovery Link */}
      {hasSampleImages && (
        <div className="pt-0.5">
          <a
            href="#anh-chup-thuc-te"
            className="inline-flex items-center gap-2 text-xs font-sans font-medium text-ink-700 hover:text-ink-900 transition-colors group cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Xem {sampleImagesCount} ảnh chụp thực tế từ máy này</span>
            <span className="text-accent group-hover:translate-y-0.5 transition-transform">↓</span>
          </a>
        </div>
      )}

      {/* Mobile Floating Sticky Split Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-t border-ink-200 px-3 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2 max-w-lg mx-auto">
          {/* Secondary Action: Messenger Chat */}
          <a
            href={messengerChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white hover:bg-canvas-200 border border-ink-300 text-ink-900 font-sans font-medium py-3 px-3 rounded-lg text-xs transition-colors shadow-2xs"
          >
            <MessageCircle className="w-4 h-4 text-accent shrink-0" />
            <span className="truncate">Nhắn tư vấn</span>
          </a>

          {/* Primary Action: Open Booking Drawer */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-ink-900 active:bg-black text-white font-sans font-semibold py-3 px-3 rounded-lg text-xs transition-colors shadow-xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="truncate">Đặt giữ máy</span>
          </button>
        </div>
      </div>

      {/* Drawer */}
      <RentalRequestDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        equipment={{
          id: equipment.id,
          name: equipment.name,
          brand: equipment.brand,
          slug: equipment.slug,
          price_session: equipment.price_session,
          price_per_day: equipment.price_per_day,
          price_three_days: equipment.price_three_days,
          included_items: equipment.included_items,
        }}
        messengerUrl={messengerChatUrl}
      />
    </div>
  );
}
