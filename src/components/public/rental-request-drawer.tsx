"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, MessageSquare } from "lucide-react";
import { RentalRequestForm, EquipmentOption } from "@/components/public/rental-request-form";

interface RentalRequestDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  equipment?: EquipmentOption;
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
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      {/* Modal / Drawer Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rental-drawer-title"
        className="relative w-full max-w-lg bg-white rounded-xl p-6 sm:p-7 shadow-2xl border border-ink-200 z-10 my-auto animate-scaleUp text-left"
      >
        {/* Close Button (44px touch target) */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-11 h-11 rounded-lg bg-canvas-200 hover:bg-ink-900 hover:text-white text-ink-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Đóng bảng yêu cầu"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Drawer Header */}
        <div className="space-y-1.5 mb-5 pr-8">
          <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-widest text-ink-500 uppercase">
            <MessageSquare className="w-3 h-3 text-accent" />
            <span>KIHO LIÊN HỆ LẠI CHO BẠN</span>
          </div>

          <h3 id="rental-drawer-title" className="font-display text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
            Gửi yêu cầu thuê máy
          </h3>

          <p className="text-xs sm:text-sm text-ink-600 font-sans font-normal leading-relaxed">
            Để lại lịch thuê và số điện thoại, Kiho sẽ kiểm tra lịch máy và phản hồi cho bạn ngay.
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
