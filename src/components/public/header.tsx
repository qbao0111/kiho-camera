"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Phone, MessageCircle, MapPin } from "lucide-react";
import { SiteSettings } from "@/types/database";

interface HeaderProps {
  settings: SiteSettings;
}

export function Header({ settings }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/thiet-bi", label: "Máy ảnh & Bảng giá" },
    { href: "/#bang-gia", label: "Gói thuê theo ngày" },
    { href: "/huong-dan-thue", label: "Hướng dẫn thuê" },
    { href: "/lien-he", label: "Liên hệ" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#faf8f5]/95 backdrop-blur-md border-b border-ink-200 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          : "bg-[#faf8f5] border-b border-ink-200/80 py-3.5 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9 sm:h-10">
          
          {/* Editorial Logo */}
          <Link
            href="/"
            className="group flex flex-col items-start focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink-900 leading-none group-hover:text-accent transition-colors">
              KIHO CAMERA
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] font-medium tracking-widest text-ink-400 uppercase mt-1">
              Đồng Hới · Quảng Bình
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-sans font-medium">
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
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:0387274669"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-ink-700 hover:text-accent transition-colors py-1.5 px-2.5 rounded-md hover:bg-canvas-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>0387 274 669</span>
            </a>

            <a
              href={settings.messenger_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs font-sans font-semibold bg-ink-900 hover:bg-black text-white px-4 py-2.5 rounded-lg transition-all shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              <MessageCircle className="w-3.5 h-3.5 text-accent group-hover:text-white transition-colors" />
              <span>Nhắn Kiho tư vấn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>

          {/* Mobile Right Action & Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="tel:0387274669"
              className="min-w-[38px] min-h-[38px] flex items-center justify-center text-ink-700 hover:text-accent rounded-lg border border-ink-200 bg-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Gọi hotline 0387 274 669"
            >
              <Phone className="w-4 h-4 text-accent" />
            </a>

            <a
              href={settings.messenger_url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[38px] inline-flex items-center gap-1 text-xs font-sans font-semibold text-white bg-ink-900 hover:bg-black px-3 rounded-lg transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-accent" />
              <span>Nhắn tin</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="min-w-[38px] min-h-[38px] flex items-center justify-center text-ink-900 hover:text-accent transition-colors rounded-lg border border-ink-200 bg-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              aria-label={isOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] sm:top-[65px] bottom-0 bg-[#faf8f5] z-40 px-6 py-8 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-150 border-t border-ink-200">
          <nav className="space-y-6">
            <div className="font-mono text-[10px] font-medium text-ink-400 uppercase tracking-widest">
              ĐIỀU HƯỚNG
            </div>
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="font-display text-2xl font-bold text-ink-900 hover:text-accent transition-colors py-1 flex items-center justify-between"
              >
                <span>Trang chủ</span>
                <span className="font-sans text-xs font-normal text-ink-400">→</span>
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display text-2xl font-bold text-ink-900 hover:text-accent transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="font-sans text-xs font-normal text-ink-400">→</span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="pt-8 border-t border-ink-200 space-y-4">
            <div>
              <span className="font-mono text-[10px] font-medium text-ink-400 uppercase tracking-widest block mb-2">
                LIÊN HỆ TRỰC TIẾP
              </span>
              <a
                href={settings.messenger_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between py-3 px-4 bg-ink-900 text-white rounded-lg font-sans font-semibold text-sm hover:bg-black transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-accent" />
                  <span>Nhắn tư vấn qua Messenger</span>
                </div>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-col gap-2 text-xs text-ink-600 bg-canvas-200/70 p-3.5 rounded-lg border border-ink-200">
              <a href="tel:0387274669" className="flex items-center gap-2 font-mono font-medium text-ink-900 hover:text-accent transition-colors">
                <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Hotline: 0387 274 669</span>
              </a>
              <div className="flex items-center gap-2 text-ink-500">
                <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>48 Ngô Quyền, TP. Đồng Hới, Quảng Bình</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
