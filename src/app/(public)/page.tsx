import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getSiteSettings } from "@/lib/services/settings";
import { getEquipmentList } from "@/lib/services/equipment";
import { getCategories } from "@/lib/services/categories";
import { getFeaturedFeedback } from "@/lib/services/feedback";
import { ReferenceHero } from "@/components/public/reference-hero";
import { CameraPricingSlider } from "@/components/public/camera-pricing-slider";
import { CanonR50Spotlight } from "@/components/public/canon-r50-spotlight";
import { InteractiveCatalog } from "@/components/public/interactive-catalog";
import { UseCaseSection } from "@/components/public/use-case-section";
import { FeedbackCard } from "@/components/public/feedback-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default async function HomePage() {
  const [settings, allEquipment, categories, feedbacks] = await Promise.all([
    getSiteSettings(),
    getEquipmentList({ onlyActive: true }),
    getCategories(),
    getFeaturedFeedback(),
  ]);

  return (
    <div className="bg-[#faf8f5]">
      {/* 1. REFERENCE HERO SECTION */}
      <section className="pt-2 pb-6 sm:pt-4 sm:pb-10 overflow-hidden">
        <ReferenceHero messengerUrl={settings.messenger_url} />
      </section>

      {/* 2. BẢNG GIÁ THUÊ MÁY ẢNH AUTO-SLIDING CAROUSEL (12 Cameras from Flyer) */}
      <CameraPricingSlider messengerUrl={settings.messenger_url} />

      {/* 3. CANON EOS R50 FLAGSHIP SPOTLIGHT */}
      <CanonR50Spotlight messengerUrl={settings.messenger_url} />

      {/* 3. CATEGORY / USE CASE ("Bạn định mang máy đi đâu?") */}
      <UseCaseSection />

      {/* 4. INTERACTIVE CATALOG & INSTANT FILTER */}
      <InteractiveCatalog
        initialEquipment={allEquipment}
        categories={categories}
      />

      {/* 5. PHOTOGRAPHY & CUSTOMER WORK (Ảnh thực tế từ khách của Kiho) */}
      {feedbacks.length > 0 && (
        <section className="py-20 sm:py-28 bg-[#f3efe9] hairline-t hairline-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
              <div>
                <span className="text-[11px] font-bold text-ink-400 uppercase tracking-widest block mb-2">
                  KHOẢNH KHẮC THỰC TẾ
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight">
                  Ảnh chụp từ khách của Kiho.
                </h2>
              </div>
              <Link
                href="/feedback"
                className="group inline-flex items-center gap-1.5 text-sm font-bold text-ink-900 hover:text-accent transition-colors shrink-0"
              >
                <span className="link-underline">Xem thêm cảm nhận & ảnh feedback</span>
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

      {/* 6. RENTAL PROCESS (3 Bước thuê máy đơn giản) */}
      <section className="py-20 sm:py-28 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14 sm:mb-20">
            <span className="text-[11px] font-bold text-ink-400 uppercase tracking-widest block mb-2">
              QUY TRÌNH ĐƠN GIẢN
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

      {/* 7. EDITORIAL FULL-WIDTH DARK CONTACT CTA */}
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
              Đừng để những cảnh đẹp ở Quảng Bình trôi qua chỉ bằng camera điện thoại. Nhắn Kiho Camera để giữ chiếc Canon R50 hoặc dòng máy ưng ý nhất.
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
