"use client";

import React, { useState } from "react";
import { Send, MessageSquare, ShieldCheck, ArrowUpRight, ArrowRight } from "lucide-react";
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
      {/* Action Buttons: Primary Form Request + Secondary Messenger */}
      <div className="space-y-2.5">
        {/* Primary CTA: Open Lead Form Drawer */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="w-full inline-flex items-center justify-center gap-2.5 bg-ink-900 hover:bg-accent text-white font-mono font-bold py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-sm sm:text-base group cursor-pointer"
        >
          <Send className="w-4 h-4 text-accent group-hover:text-white transition-colors" />
          <span>Gửi yêu cầu thuê {equipment.name}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Secondary CTA: Message Messenger */}
        <div className="flex items-center justify-between px-1 text-xs font-mono">
          <a
            href={messengerChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-ink-700 hover:text-ink-900 font-bold transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-accent" />
            <span>Hoặc nhắn Kiho tư vấn ngay</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ink-400" />
          </a>

          <a href="tel:0387274669" className="text-ink-400 hover:text-ink-900 transition-colors">
            Hotline: 0387 274 669
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
