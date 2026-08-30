"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Phone, MessageCircle, MapPin } from "lucide-react";
import { SiteSettings } from "@/types/database";
import { normalizePhoneNumber, buildZaloUrl } from "@/lib/utils";
import {
  trackMessengerContact,
  trackZaloContact,
  trackHotlineContact,
} from "@/lib/analytics";

interface HeaderProps {
  settings: SiteSettings;
}

export function Header({ settings }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const scrollPosRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Passive header scroll listener with boolean thresholding to prevent unnecessary re-renders
  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 15;
          if (scrolled !== lastScrolled) {
            lastScrolled = scrolled;
            setIsScrolled(scrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer immediately upon route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Robust iOS-safe fixed-body background scroll-lock & exact scroll position restoration
  useEffect(() => {
    if (!isOpen) return;

    // 1. Capture exact document scroll position at moment of opening
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    scrollPosRef.current = scrollY;

    // 2. Cache previous body styles
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;
    const prevOverflow = document.body.style.overflow;

    // 3. Lock background in place without jumping to top
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    // 4. Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // 5. Restore previous body styles and exact scroll position
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      document.body.style.overflow = prevOverflow;
      window.scrollTo(0, scrollPosRef.current);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/thiet-bi", label: "Máy ảnh" },
    { href: "/#bang-gia", label: "Bảng giá" },
    { href: "/huong-dan-thue", label: "Hướng dẫn thuê" },
    { href: "/lien-he", label: "Liên hệ" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-[110] transition-all duration-200 ${
          isScrolled
            ? "bg-[#faf8f5]/95 backdrop-blur-md border-b border-ink-200 py-2.5 sm:py-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
            : "bg-[#faf8f5] border-b border-ink-200/80 py-3 sm:py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 sm:h-12">
            
            {/* Brand Logo */}
            <Link
              href="/"
              className="group inline-flex items-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-sm shrink-0"
              aria-label="Kiho Camera - Trang chủ"
            >
              <Image
                src="/brand/kiho-logo-header-transparent.png"
                alt="Kiho Camera"
                width={160}
                height={128}
                priority
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-7 text-sm font-sans font-medium">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/thiet-bi"
                    ? pathname.startsWith("/thiet-bi")
                    : pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`link-underline transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1 ${
                      isActive
                        ? "text-ink-900 font-semibold"
                        : "text-ink-600 hover:text-ink-900"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="ml-1.5 inline-block w-1 h-1 rounded-full bg-accent" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right CTA & Contact Info */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${normalizePhoneNumber(settings.phone)}`}
                onClick={() => trackHotlineContact({ placement: "header_desktop" })}
                className="inline-flex items-center gap-1.5 text-xs font-sans text-ink-700 hover:text-accent transition-colors py-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              >
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span className="font-mono font-medium">{settings.phone}</span>
              </a>

              <a
                href={buildZaloUrl(settings.phone)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackZaloContact({ placement: "header_desktop" })}
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-ink-800 hover:text-accent bg-white hover:bg-canvas-100 border border-ink-300 hover:border-accent px-3 py-2 rounded-md transition-colors shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Chat Zalo</span>
              </a>

              <a
                href={settings.messenger_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMessengerContact({ placement: "header_desktop" })}
                className="group inline-flex items-center gap-1.5 text-xs font-sans font-semibold bg-ink-900 hover:bg-black text-white px-3.5 py-2 rounded-md transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <MessageCircle className="w-3.5 h-3.5 text-accent group-hover:text-white transition-colors" />
                <span>Nhắn tư vấn</span>
                <ArrowUpRight className="w-3 h-3 text-white/70 group-hover:text-white transition-all" />
              </a>
            </div>

            {/* Mobile Right Action & Menu Button (All touch targets >= 40-44px) */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:hidden">
              <a
                href={`tel:${normalizePhoneNumber(settings.phone)}`}
                onClick={() => trackHotlineContact({ placement: "header_mobile" })}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-ink-700 hover:text-accent rounded-md border border-ink-200 bg-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={`Gọi hotline ${settings.phone}`}
              >
                <Phone className="w-4 h-4 text-accent" />
              </a>

              <a
                href={settings.messenger_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMessengerContact({ placement: "header_mobile" })}
                className="min-h-[40px] inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-white bg-ink-900 hover:bg-black px-3 sm:px-3.5 rounded-md transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-accent" />
                <span>Nhắn tin</span>
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-ink-900 hover:text-accent transition-colors rounded-md border border-ink-200 bg-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                aria-label={isOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-drawer"
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-ink-900" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Viewport-Anchored React Portal Mobile Navigation Drawer */}
      {mounted && isOpen && createPortal(
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Điều hướng chính"
          className="md:hidden fixed inset-0 z-[100] pointer-events-none"
        >
          {/* Semi-transparent Backdrop (tap to close) */}
          <div
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200 pointer-events-auto animate-in fade-in"
          />

          {/* Drawer Panel: Anchored directly below mobile header, sized to exactly 100dvh */}
          <div
            className="fixed inset-x-0 top-[56px] sm:top-[64px] bottom-0 h-[calc(100dvh-56px)] sm:h-[calc(100dvh-64px)] max-h-[calc(100dvh-56px)] sm:max-h-[calc(100dvh-64px)] bg-[#faf8f5] border-t border-ink-200/90 shadow-2xl flex flex-col justify-between overflow-y-auto overscroll-contain px-5 sm:px-6 py-5 sm:py-7 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200 motion-reduce:transition-none"
            style={{
              paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))",
            }}
          >
            {/* Navigation List */}
            <nav className="space-y-4" aria-label="Menu điều hướng di động">
              <div className="flex items-center justify-between pb-1 border-b border-ink-200/60">
                <span className="font-mono text-[10px] font-semibold text-ink-600 uppercase tracking-widest">
                  ĐIỀU HƯỚNG
                </span>
                <span className="text-[11px] font-mono text-ink-500">
                  Kiho Camera Đồng Hới
                </span>
              </div>

              <div className="flex flex-col divide-y divide-ink-200/60">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={`font-display text-2xl font-bold py-3 flex items-center justify-between min-h-[48px] transition-colors ${
                    pathname === "/" ? "text-accent" : "text-ink-900 hover:text-accent"
                  }`}
                >
                  <span>Trang chủ</span>
                  <span className="font-sans text-xs font-semibold text-ink-600">→</span>
                </Link>

                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/thiet-bi"
                      ? pathname.startsWith("/thiet-bi")
                      : pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`font-display text-2xl font-bold py-3 flex items-center justify-between min-h-[48px] transition-colors ${
                        isActive ? "text-accent" : "text-ink-900 hover:text-accent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{link.label}</span>
                        {link.href === "/thiet-bi" && (
                          <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-canvas-200 text-ink-700 rounded-sm">
                            12 máy
                          </span>
                        )}
                      </div>
                      <span className="font-sans text-xs font-semibold text-ink-600">→</span>
                    </Link>
                  );
                })}

                {/* Contextual Tourism Link */}
                <Link
                  href="/thue-may-anh-phong-nha"
                  onClick={() => setIsOpen(false)}
                  className={`font-display text-2xl font-bold py-3 flex items-center justify-between min-h-[48px] transition-colors ${
                    pathname === "/thue-may-anh-phong-nha"
                      ? "text-accent"
                      : "text-ink-900 hover:text-accent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>Thuê máy đi Phong Nha</span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-forest-100 text-forest-800 rounded-sm">
                      Cẩm nang
                    </span>
                  </div>
                  <span className="font-sans text-xs font-semibold text-ink-600">→</span>
                </Link>

                <Link
                  href="/feedback"
                  onClick={() => setIsOpen(false)}
                  className={`font-display text-2xl font-bold py-3 flex items-center justify-between min-h-[48px] transition-colors ${
                    pathname === "/feedback"
                      ? "text-accent"
                      : "text-ink-900 hover:text-accent"
                  }`}
                >
                  <span>Feedback & Ảnh khách</span>
                  <span className="font-sans text-xs font-semibold text-ink-600">→</span>
                </Link>
              </div>
            </nav>

            {/* Direct Contact & Address Section */}
            <div className="pt-5 border-t border-ink-200 space-y-3 mt-4">
              <div>
                <span className="font-mono text-[10px] font-semibold text-ink-600 uppercase tracking-wider block mb-2">
                  LIÊN HỆ TRỰC TIẾP
                </span>

                {/* Primary Messenger Action (Full Width, >=48px) */}
                <a
                  href={settings.messenger_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setIsOpen(false);
                    trackMessengerContact({ placement: "header_mobile_drawer" });
                  }}
                  className="w-full inline-flex items-center justify-between min-h-[48px] py-3 px-4 bg-ink-900 text-white rounded-lg font-sans font-semibold text-sm hover:bg-black transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.99]"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4 text-accent shrink-0" />
                    <span>Nhắn tư vấn qua Messenger</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-white/70" />
                </a>
              </div>

              {/* 2-Column Direct Zalo and Hotline Actions (>=48px touch targets) */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={buildZaloUrl(settings.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setIsOpen(false);
                    trackZaloContact({ placement: "header_mobile_drawer" });
                  }}
                  className="min-h-[48px] py-2.5 px-3 bg-white border border-ink-300 hover:border-accent text-ink-900 hover:text-accent rounded-lg font-sans font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs text-center"
                >
                  <span>Chat Zalo</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-400 shrink-0" />
                </a>

                <a
                  href={`tel:${normalizePhoneNumber(settings.phone)}`}
                  onClick={() => {
                    setIsOpen(false);
                    trackHotlineContact({ placement: "header_mobile_drawer" });
                  }}
                  className="min-h-[48px] py-2.5 px-3 bg-white border border-ink-300 hover:border-accent text-ink-900 hover:text-accent rounded-lg font-sans font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="font-mono">{settings.phone}</span>
                </a>
              </div>

              {/* Address & Store Info */}
              <div className="flex items-start gap-2 text-xs text-ink-600 bg-canvas-200/80 p-3 rounded-lg border border-ink-200 font-sans">
                <MapPin className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                <span className="leading-snug">{settings.address || "48 Ngô Quyền, TP. Đồng Hới, Quảng Bình"}</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
