"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  url: string;
  alt?: string;
  caption?: string;
}

interface ImageLightboxProps {
  images: (string | LightboxImage)[];
  activeIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange?: (index: number) => void;
}

export function ImageLightbox({
  images = [],
  activeIndex = 0,
  open = false,
  onOpenChange,
  onIndexChange,
}: ImageLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(activeIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  // Mount detection for React Portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Sync external index
  useEffect(() => {
    setIndex(activeIndex);
  }, [activeIndex]);

  const total = images.length;
  const currentItem = images[index];
  const currentUrl = typeof currentItem === "string" ? currentItem : currentItem?.url || "";
  const currentAlt = typeof currentItem === "string" ? "Ảnh phóng to" : currentItem?.alt || "Ảnh phóng to";
  const currentCaption = typeof currentItem === "string" ? undefined : currentItem?.caption;

  const handleIndexChange = useCallback(
    (newIndex: number) => {
      setIsZoomed(false);
      setIndex(newIndex);
      onIndexChange?.(newIndex);
    },
    [onIndexChange]
  );

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    const newIdx = index > 0 ? index - 1 : total - 1;
    handleIndexChange(newIdx);
  }, [index, total, handleIndexChange]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    const newIdx = index < total - 1 ? index + 1 : 0;
    handleIndexChange(newIdx);
  }, [index, total, handleIndexChange]);

  const handleClose = useCallback(() => {
    setIsZoomed(false);
    onOpenChange(false);
  }, [onOpenChange]);

  // Lock body scroll & listen for keyboard events
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleClose, handlePrev, handleNext]);

  // Reset zoom on close
  useEffect(() => {
    if (!open) {
      setIsZoomed(false);
    }
  }, [open]);

  if (!mounted || !open || total === 0 || !currentUrl) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh phóng to"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onClick={handleClose}
          className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-[100dvh] z-[10000] bg-[#0a0a0a]/90 flex items-center justify-center p-4 sm:p-8 select-none"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100dvh",
            paddingTop: "calc(env(safe-area-inset-top, 16px) + 16px)",
            paddingBottom: "calc(env(safe-area-inset-bottom, 16px) + 16px)",
          }}
        >
          {/* Top Bar: Counter (Left) & Close Button (Right) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-50 pointer-events-auto text-white/70 font-mono text-xs"
          >
            {/* Counter */}
            {total > 1 ? (
              <span className="text-white/60 tracking-wider">
                {index + 1} / {total}
              </span>
            ) : (
              <span />
            )}

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Đóng ảnh"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Prev Button */}
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white items-center justify-center transition-all z-40 cursor-pointer pointer-events-auto"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Desktop Next Button */}
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white items-center justify-center transition-all z-40 cursor-pointer pointer-events-auto"
              aria-label="Ảnh tiếp theo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Main Image Container & Gesture Handler */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center justify-center max-w-full max-h-full z-30"
          >
            <motion.div
              key={currentUrl}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{
                opacity: 1,
                scale: isZoomed ? 1.8 : 1,
              }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              drag={isZoomed ? true : total > 1 ? "x" : false}
              dragConstraints={isZoomed ? { left: -300, right: 300, top: -200, bottom: 200 } : { left: 0, right: 0 }}
              dragElastic={isZoomed ? 0.2 : 0.15}
              onDragEnd={(_, info) => {
                if (!isZoomed && total > 1) {
                  if (info.offset.x < -50) {
                    handleNext();
                  } else if (info.offset.x > 50) {
                    handlePrev();
                  }
                }
              }}
              onClick={() => setIsZoomed((prev) => !prev)}
              className={`flex items-center justify-center ${
                isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
            >
              {/* Native responsive img tag for perfect intrinsic aspect ratio without fixed-box artificial frames */}
              <img
                src={currentUrl}
                alt={currentAlt}
                draggable={false}
                className="max-w-[calc(100vw-32px)] sm:max-w-[calc(100vw-120px)] max-h-[calc(100dvh-80px)] sm:max-h-[calc(100dvh-120px)] w-auto h-auto object-contain rounded-md shadow-2xl transition-transform duration-200"
              />
            </motion.div>

            {/* Caption underneath */}
            {currentCaption && !isZoomed && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xs text-white/90 text-xs sm:text-sm font-medium text-center max-w-xl font-mono tracking-wide"
              >
                {currentCaption}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
