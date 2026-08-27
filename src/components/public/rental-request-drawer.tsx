"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles, ShieldCheck } from "lucide-react";
import { RentalRequestForm, EquipmentOption } from "@/components/public/rental-request-form";

interface RentalRequestDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  equipment?: {
    id: string;
    name: string;
    brand: string;
  };
  equipmentList?: EquipmentOption[];
  messengerUrl?: string;
}

export function RentalRequestDrawer({
  isOpen,
  onClose,
  equipment,
  equipmentList = [],
  messengerUrl = "https://m.me/kihocameradonghoi",
}: RentalRequestDrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock & ESC key listener
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 w-screen h-[100dvh] top-0 left-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      {/* Modal / Drawer Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rental-drawer-title"
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#e8e2d7] z-10 my-auto animate-scaleUp text-left"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#f4efe6] hover:bg-ink-900 hover:text-white text-ink-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
          aria-label="Đóng bảng yêu cầu"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Drawer Header */}
        <div className="space-y-2 mb-6 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0eae1] border border-[#e2dbcf] text-[11px] font-mono font-bold uppercase tracking-wider text-ink-700">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>KIHO LIÊN HỆ LẠI CHO BẠN</span>
          </div>

          <h3 id="rental-drawer-title" className="text-2xl sm:text-3xl font-black text-ink-900 tracking-tight font-mono">
            Gửi yêu cầu thuê máy
          </h3>

          <p className="text-xs sm:text-sm text-ink-600 font-medium leading-relaxed">
            Để lại lịch thuê và SĐT, tụi mình kiểm tra máy rồi liên hệ tư vấn ngay.
          </p>
        </div>

        {/* Form Body */}
        <RentalRequestForm
          equipmentList={equipmentList.length > 0 ? equipmentList : equipment ? [equipment] : []}
          initialEquipmentId={equipment?.id}
          initialEquipmentName={equipment?.name}
          source={`product_detail_${equipment?.name || "unknown"}`}
          onClose={onClose}
          messengerUrl={messengerUrl}
          variant="drawer"
        />
      </div>
    </div>,
    document.body
  );
}
