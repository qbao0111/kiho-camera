import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { getSiteSettings } from "@/lib/services/settings";
import { getFeaturedEquipment } from "@/lib/services/equipment";
import { getFeaturedFeedback } from "@/lib/services/feedback";
import { ProductCard } from "@/components/public/product-card";
import { UseCaseSection } from "@/components/public/use-case-section";
import { FeedbackCard } from "@/components/public/feedback-card";
import { FadeIn, ImageReveal, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default async function HomePage() {
  const [settings, featuredEquipment, feedbacks] = await Promise.all([
    getSiteSettings(),
    getFeaturedEquipment(),
    getFeaturedFeedback(),
  ]);

  return (
    <div>
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="pt-10 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Metadata Eyebrow */}
          <FadeIn direction="none" duration={0.5} className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono font-semibold tracking-widest text-ink-500 uppercase pb-8 sm:pb-12 hairline-b">
            <span>KIHO CAMERA · ĐỒNG HỚI, QUẢNG BÌNH</span>
            <span>CHO THUÊ MÁY ẢNH & THIẾT BỊ DU LỊCH</span>
          </FadeIn>

          {/* Editorial Headline & Asymmetric Layout */}
          <div className="pt-10 sm:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            {/* Left: Huge Editorial Statement */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <FadeIn delay={0.1} duration={0.7}>
                <h1 className="sr-only">
                  {settings.hero_title || "Cho thuê máy ảnh tại Quảng Bình"}
                </h1>
                <div className="text-4xl sm:text-6xl lg:text-7xl font-black text-ink-900 tracking-tighter leading-[1.02]">
                  Mang máy đi.<br />
                  <span className="text-ink-400 font-light italic">Mang ảnh về.</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} duration={0.6}>
                <p className="text-base sm:text-lg text-ink-700 max-w-xl leading-relaxed">
                  {settings.hero_subtitle ||
                    "Máy đẹp, đủ phụ kiện, giá niêm yết rõ ràng. Cho thuê máy ảnh du lịch, lens chân dung và máy quay bỏ túi tại Đồng Hới, Quảng Bình."}
                </p>
              </FadeIn>

              {/* Minimalist CTAs */}
              <FadeIn delay={0.3} duration={0.6} className="pt-2 flex flex-wrap items-center gap-6">
                <Link
                  href="/thiet-bi"
                  className="inline-flex items-center gap-2 bg-ink-900 hover:bg-accent text-[#faf8f5] text-sm font-bold px-7 py-3.5 rounded-sm shadow-sm transition-colors duration-200"
                >
                  <span>Xem danh sách máy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={settings.messenger_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-bold text-ink-900 hover:text-accent transition-colors"
                >
                  <span className="link-underline">Nhắn Kiho Camera</span>
                  <ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </FadeIn>
            </div>

            {/* Right: Large Photography Crop with Caption */}
            <div className="lg:col-span-5">
              <ImageReveal delay={0.2} className="space-y-2.5">
                <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full rounded-md overflow-hidden bg-[#f3efe9]">
                  <Image
                    src={settings.hero_image}
                    alt="Cho thuê máy ảnh du lịch tại Quảng Bình"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-ink-400">
                  <span>CANON G7X III / SONY A7 IV</span>
                  <span>ĐỒNG HỚI · PHONG NHA</span>
                </div>
              </ImageReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY / USE CASE ("Bạn định mang máy đi đâu?") */}
      <UseCaseSection />

      {/* 3. FEATURED EQUIPMENT ("Những chiếc máy hay được mang đi nhất") */}
      <section className="py-20 sm:py-28 bg-[#faf8f5] hairline-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <span className="text-[11px] font-bold text-ink-400 uppercase tracking-widest block mb-2">
                Thiết bị tuyển chọn
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight">
                Những chiếc máy hay được mang đi nhất.
              </h2>
            </div>

            <Link
              href="/thiet-bi"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-ink-900 hover:text-accent transition-colors shrink-0"
            >
              <span className="link-underline">Xem tất cả 30+ thiết bị</span>
              <ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </FadeIn>

          {/* Product Cards Grid with Photography Focus */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {featuredEquipment.map((item, idx) => (
              <StaggerItem key={item.id}>
                <ProductCard equipment={item} priority={idx < 2} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. PHOTOGRAPHY & CUSTOMER WORK */}
      {feedbacks.length > 0 && (
        <section className="py-20 sm:py-28 bg-[#f3efe9] hairline-t hairline-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
              <div>
                <span className="text-[11px] font-bold text-ink-400 uppercase tracking-widest block mb-2">
                  Khoảnh khắc thực tế
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight">
                  Ảnh chụp từ khách của Kiho.
                </h2>
              </div>
              <Link
                href="/feedback"
                className="group inline-flex items-center gap-1.5 text-sm font-bold text-ink-900 hover:text-accent transition-colors shrink-0"
              >
                <span className="link-underline">Xem thêm cảm nhận</span>
                <ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {feedbacks.slice(0, 4).map((fb) => (
                <StaggerItem key={fb.id}>
                  <FeedbackCard feedback={fb} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* 5. RENTAL PROCESS (Typography & Spacing first) */}
      <section className="py-20 sm:py-28 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14 sm:mb-20">
            <span className="text-[11px] font-bold text-ink-400 uppercase tracking-widest block mb-2">
              Quy trình đơn giản
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight">
              Thủ tục gọn nhẹ trong 3 bước.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
            <FadeIn delay={0.1} className="space-y-3 hairline-t pt-6">
              <span className="font-mono text-xs font-bold text-accent">01</span>
              <h3 className="text-2xl font-bold text-ink-900 tracking-tight">
                Chọn máy phù hợp
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed">
                Xem bảng giá và thông số trên website. Tụi mình luôn ghi rõ bộ phụ kiện đi kèm từng máy.
              </p>
            </FadeIn>

            <FadeIn delay={0.2} className="space-y-3 hairline-t pt-6">
              <span className="font-mono text-xs font-bold text-accent">02</span>
              <h3 className="text-2xl font-bold text-ink-900 tracking-tight">
                Nhắn tụi mình chốt lịch
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed">
                Nhắn qua Messenger để báo ngày nhận và trả. Kiho sẽ giữ máy và setup sẵn thông số đẹp nhất.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="space-y-3 hairline-t pt-6">
              <span className="font-mono text-xs font-bold text-accent">03</span>
              <h3 className="text-2xl font-bold text-ink-900 tracking-tight">
                Nhận máy và đi chụp
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed">
                Nhận máy tại Đồng Hới hoặc giao tận khách sạn. Hỗ trợ test máy và hướng dẫn sử dụng 1:1.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 6. EDITORIAL FULL-WIDTH DARK CONTACT CTA */}
      <section className="py-24 sm:py-32 bg-[#141413] text-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl space-y-8">
            <span className="text-[11px] font-mono font-semibold tracking-widest text-ink-400 uppercase block">
              KIHO CAMERA · QUẢNG BÌNH
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-[#faf8f5]">
              Chuyến đi tới có cần một chiếc máy không?
            </h2>
            <p className="text-base sm:text-lg text-ink-300 leading-relaxed max-w-xl">
              Đừng để những cảnh đẹp ở Quảng Bình trôi qua chỉ bằng camera điện thoại. Nhắn Kiho Camera để giữ chiếc máy ưng ý nhất.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-6">
              <a
                href={settings.messenger_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-bold px-8 py-4 rounded-sm transition-colors"
              >
                <span>Nhắn Kiho Camera để thuê máy</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/huong-dan-thue"
                className="text-sm font-bold text-ink-300 hover:text-white link-underline"
              >
                Xem quy trình & cọc CCCD →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
