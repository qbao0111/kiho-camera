"use client";

import React, { useEffect } from "react";
import { X, Play, ShieldCheck, Zap, Sparkles } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function VideoModal({ isOpen, onClose, title = "Khám phá Canon EOS R50 cùng Kiho Camera" }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#1c1b1a] text-[#faf8f5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs font-bold">
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </span>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-ink-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Visual Showcase Player */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          {/* Fallback & Video Mockup */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
          
          <iframe
            className="w-full h-full object-cover"
            src="https://www.youtube-nocookie.com/embed/S2pEw_L7z5w?autoplay=1&mute=1&loop=1&playlist=S2pEw_L7z5w&controls=1"
            title="Canon EOS R50 Video Showcase"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer Quick Info */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#141413] border-t border-white/10 text-xs">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Màu da trắng hồng</span>
              <span className="text-ink-400">Tone màu độc quyền của Canon, chụp xong xuất file dùng ngay không cần chỉnh sửa.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Lấy nét tự động Dual Pixel II</span>
              <span className="text-ink-400">Bắt nét ánh mắt thần tốc, phù hợp cả người mới chưa từng cầm máy.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Trọn bộ phụ kiện khi thuê</span>
              <span className="text-ink-400">Kèm 2 pin + dock sạc + thẻ nhớ tốc độ cao + túi đựng & đầu đọc ảnh cho iPhone.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
