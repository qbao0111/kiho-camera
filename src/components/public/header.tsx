"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
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
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/thiet-bi", label: "Thiết bị" },
    { href: "/feedback", label: "Feedback & Ảnh" },
    { href: "/huong-dan-thue", label: "Hướng dẫn thuê" },
    { href: "/lien-he", label: "Liên hệ" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#faf8f5]/90 backdrop-blur-md hairline-b py-3.5 shadow-[0_1px_8px_rgba(0,0,0,0.03)]"
          : "bg-[#faf8f5] hairline-b py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Editorial Logo */}
          <Link href="/" className="group flex flex-col items-start">
            <span className="text-lg sm:text-xl font-black tracking-tight text-ink-900 leading-none group-hover:text-accent transition-colors">
              KIHO CAMERA
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-ink-500 uppercase mt-1">
              Quảng Bình / Rental
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-xs sm:text-sm font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href === "/thiet-bi" && pathname.startsWith("/thiet-bi/"));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`link-underline transition-colors ${
                    isActive
                      ? "text-ink-900 font-bold"
                      : "text-ink-500 hover:text-ink-900"
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

          {/* Desktop Right CTA: Minimalist Editorial Link */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, "")}`}
              className="text-xs font-semibold text-ink-500 hover:text-ink-900 transition-colors"
            >
              {settings.phone}
            </a>

            <a
              href={settings.messenger_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-ink-900 hover:text-accent py-2 transition-colors"
            >
              <span>Nhắn Kiho Camera</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-ink-400 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>

          {/* Mobile Right Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href={settings.messenger_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-ink-900 hover:text-accent px-2.5 py-1.5 hairline-b border-ink-900"
            >
              Nhắn tin →
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-ink-900 hover:text-accent transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bottom-0 bg-[#faf8f5] z-40 px-6 py-8 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
          <nav className="space-y-6">
            <div className="text-[10px] font-bold text-ink-400 uppercase tracking-widest">
              Điều hướng
            </div>
            <div className="flex flex-col space-y-4 text-xl font-bold tracking-tight text-ink-900">
              <Link
                href="/"
                className="hover:text-accent transition-colors"
              >
                Trang chủ
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-accent transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-normal text-ink-400">→</span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="pt-8 hairline-t space-y-4">
            <div>
              <span className="text-[10px] font-bold text-ink-400 uppercase tracking-widest block mb-1">
                Liên hệ nhanh
              </span>
              <a
                href={settings.messenger_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between py-3 px-4 bg-ink-900 text-white rounded-md font-semibold text-sm hover:bg-accent transition-colors"
              >
                <span>Nhắn tư vấn qua Messenger</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center justify-between text-xs text-ink-500 pt-2">
              <span>Hotline: {settings.phone}</span>
              <span>Đồng Hới, Quảng Bình</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
