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
import { trackRentalRequestOpen, trackMessengerContact } from "@/lib/analytics";

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

  const handleOpenDrawer = () => {
    trackRentalRequestOpen({
      placement: "product_primary_action",
      camera_slug: equipment.slug,
      camera_name: equipment.name,
    });
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-4 pt-1">
      {/* Dual-CTA Container */}
      <div className="bg-canvas-100 p-4 sm:p-5 rounded-xl border border-ink-200 shadow-xs space-y-3">
        {/* Button 1: Primary Lead Request Drawer */}
        <button
          onClick={handleOpenDrawer}
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
          onClick={() => {
            trackMessengerContact({
              placement: "product_primary_action",
              camera_slug: equipment.slug,
              camera_name: equipment.name,
            });
          }}
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

      {/* Drawer */}
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
