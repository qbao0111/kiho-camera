"use client";

import React, { useState } from "react";
import {
  Send,
  MessageCircle,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  Phone,
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
    <div className="space-y-5 pt-2">
      {/* Cohesive Dual-CTA Container */}
      <div className="bg-[#faf8f4] p-4 sm:p-5 rounded-3xl border border-[#e8e2d7] shadow-xs space-y-3">
        {/* Button 1: Primary Lead Request Drawer */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="w-full inline-flex items-center justify-center gap-2.5 bg-ink-900 hover:bg-accent text-white font-mono font-bold py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-sm sm:text-base group cursor-pointer"
        >
          <Send className="w-4 h-4 text-accent group-hover:text-white transition-colors shrink-0" />
          <span className="truncate">Gửi yêu cầu thuê {equipment.name}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
        </button>

        {/* Divider: "hoặc" */}
        <div className="relative flex items-center justify-center py-0.5">
          <div className="border-t border-[#e2dbcf] w-full" />
          <span className="bg-[#faf8f4] px-3 text-[11px] font-mono font-semibold text-ink-400 uppercase tracking-widest shrink-0">
            hoặc
          </span>
          <div className="border-t border-[#e2dbcf] w-full" />
        </div>

        {/* Button 2: Secondary Prominent Messenger Consultation */}
        <a
          href={messengerChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2.5 bg-[#f0eae1] hover:bg-[#e4dcce] border border-[#dacfc0] hover:border-[#c8bcab] text-ink-900 hover:text-accent font-mono font-bold py-3.5 sm:py-4 px-6 rounded-2xl transition-all text-sm sm:text-base shadow-2xs group cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-accent shrink-0" />
          <span className="truncate">Nhắn Kiho tư vấn ngay</span>
          <ArrowUpRight className="w-4 h-4 text-ink-500 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
        </a>

        {/* Direct Phone Support Microcopy */}
        <div className="pt-1 text-center">
          <a
            href="tel:0387274669"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-mono text-ink-500 hover:text-ink-900 transition-colors"
          >
            <Phone className="w-3 h-3 text-accent" />
            <span>Cần gấp? Hotline / Zalo: <strong className="text-ink-800 font-bold">0387 274 669</strong></span>
          </a>
        </div>
      </div>

      {/* Subtle Support Note: No Deposit USP */}
      <div className="p-3.5 rounded-2xl bg-[#f0eae1] border border-[#e2dbcf] flex items-center gap-3 text-xs font-mono text-ink-800">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
        <span>
          <strong className="text-ink-900 font-bold">Không cần cọc tiền máy</strong> · Chỉ cần ảnh CCCD hoặc VNeID để xác minh
        </span>
      </div>

      {/* Sample Photo Discovery Link (Smooth Anchor Jump) */}
      {hasSampleImages && (
        <div className="pt-1">
          <a
            href="#anh-chup-thuc-te"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-ink-700 hover:text-ink-900 transition-colors group cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Xem {sampleImagesCount} ảnh chụp thực tế từ máy này</span>
            <span className="text-accent group-hover:translate-y-0.5 transition-transform font-bold">↓</span>
          </a>
        </div>
      )}

      {/* Drawer / Modal */}
      <RentalRequestDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        equipment={{
          id: equipment.id,
          name: equipment.name,
          brand: equipment.brand,
        }}
        messengerUrl={messengerChatUrl}
      />
    </div>
  );
}
