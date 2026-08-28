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
      setIsScrolled(window.scrollY > 20);
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
    { href: "/thiet-bi", label: "Máy ảnh" },
    { href: "/#bang-gia", label: "Bảng giá" },
    { href: "/huong-dan-thue", label: "Hướng dẫn thuê" },
    { href: "/lien-he", label: "Liên hệ" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-250 ${
        isScrolled
          ? "bg-[#faf8f4]/95 backdrop-blur-md border-b border-[#e8e2d7] py-3 sm:py-3.5 shadow-[0_2px_16px_rgba(0,0,0,0.03)]"
          : "bg-[#faf8f4] border-b border-[#e8e2d7] py-3.5 sm:py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9 sm:h-10">
          
          {/* Editorial Logo */}
          <Link
            href="/"
            className="group flex flex-col items-start focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          >
            <span className="text-lg sm:text-xl font-black tracking-tight text-ink-900 leading-none group-hover:text-accent transition-colors font-mono">
              KIHO CAMERA
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-ink-500 uppercase mt-1">
              Quảng Bình / Rental
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-xs sm:text-sm font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/thiet-bi"
                  ? pathname.startsWith("/thiet-bi")
                  : pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`link-underline transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1.5 py-1 ${
                    isActive
                      ? "text-ink-900 font-bold"
                      : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA & Contact Info */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:0387274669"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink-700 hover:text-accent transition-colors py-1.5 px-3 rounded-xl hover:bg-[#f0eae1] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>0387 274 669</span>
            </a>

            <a
              href={settings.messenger_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-ink-900 hover:bg-accent text-white px-4 py-2.5 rounded-xl transition-all shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <MessageCircle className="w-3.5 h-3.5 text-accent group-hover:text-white transition-colors" />
              <span>Nhắn Kiho Camera</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>

          {/* Mobile Right Action & Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="tel:0387274669"
              className="min-w-[40px] min-h-[40px] flex items-center justify-center text-ink-700 hover:text-accent rounded-xl border border-[#e8e2d7] bg-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Gọi hotline 0387 274 669"
            >
              <Phone className="w-4 h-4 text-accent" />
            </a>

            <a
              href={settings.messenger_url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[40px] inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white bg-ink-900 hover:bg-accent px-3.5 rounded-xl transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              <MessageCircle className="w-3.5 h-3.5 text-accent" />
              <span>Nhắn tin</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center text-ink-900 hover:text-accent transition-colors rounded-xl border border-[#e8e2d7] bg-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
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
        <div className="md:hidden fixed inset-x-0 top-[57px] sm:top-[65px] bottom-0 bg-[#faf8f4] z-40 px-6 py-8 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
          <nav className="space-y-6">
            <div className="text-[10px] font-mono font-bold text-ink-400 uppercase tracking-widest">
              ĐIỀU HƯỚNG
            </div>
            <div className="flex flex-col space-y-4 text-xl font-bold tracking-tight text-ink-900 font-mono">
              <Link
                href="/"
                className="hover:text-accent transition-colors py-1 flex items-center justify-between"
              >
                <span>Trang chủ</span>
                <span className="text-xs font-normal text-ink-400">→</span>
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-accent transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-normal text-ink-400">→</span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="pt-8 border-t border-[#e8e2d7] space-y-4 font-mono">
            <div>
              <span className="text-[10px] font-bold text-ink-400 uppercase tracking-widest block mb-2">
                LIÊN HỆ TRỰC TIẾP
              </span>
              <a
                href={settings.messenger_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between py-3.5 px-4 bg-ink-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-accent transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-accent" />
                  <span>Nhắn tư vấn qua Messenger</span>
                </div>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-col gap-2 text-xs text-ink-600 pt-2 bg-[#f0eae1] p-3.5 rounded-2xl border border-[#e2dbcf]">
              <a href="tel:0387274669" className="flex items-center gap-2 font-bold text-ink-900 hover:text-accent transition-colors">
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
