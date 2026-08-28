"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb
} from "lucide-react";
import { CameraSeoContent } from "@/lib/content/camera-seo-content";
import { FadeIn } from "@/components/ui/motion";

interface CameraEditorialGuideProps {
  content: CameraSeoContent;
}

export function CameraEditorialGuide({ content }: CameraEditorialGuideProps) {
  const [openFaqIndices, setOpenFaqIndices] = useState<Record<number, boolean>>({
    0: true, // First FAQ open by default
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section className="pt-10 sm:pt-14 border-t border-ink-200 space-y-12 sm:space-y-14">
      
      {/* 1. INTRO & IDENTITY */}
      <FadeIn className="space-y-4">
        <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-widest text-ink-500 uppercase">
          <Compass className="w-3.5 h-3.5 text-accent" />
          <span>GÓC NHÌN & TRẢI NGHIỆM</span>
        </div>
        
        <div className="space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink-900 tracking-tight">
            Về chiếc {content.modelName}
          </h2>
          <p className="text-base sm:text-lg text-ink-800 font-sans font-medium leading-relaxed max-w-3xl">
            {content.tagline}
          </p>
          <p className="text-sm sm:text-base text-ink-600 font-sans font-normal leading-relaxed max-w-3xl pt-1">
            {content.intro}
          </p>
        </div>
      </FadeIn>

      {/* 2. WHO IS THIS CAMERA FOR & WHY RENT (2-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
        
        {/* Left: Who is it for */}
        <FadeIn className="p-5 sm:p-6 rounded-xl bg-white border border-ink-200 shadow-2xs space-y-4 h-full flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-ink-900 uppercase">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>CHIẾC MÁY NÀY HỢP VỚI AI?</span>
            </div>
            
            <ul className="space-y-2.5 text-xs sm:text-sm text-ink-700 font-sans leading-relaxed">
              {content.whoIsItFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Right: Why rent this model */}
        <FadeIn delay={0.1} className="p-5 sm:p-6 rounded-xl bg-white border border-ink-200 shadow-2xs space-y-4 h-full flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-ink-900 uppercase">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>ĐIỂM NỔI BẬT ĐÁNG THUÊ</span>
            </div>
            
            <ul className="space-y-2.5 text-xs sm:text-sm text-ink-700 font-sans leading-relaxed">
              {content.whyRentThis.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink-900 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

      </div>

      {/* 3. RECOMMENDED SCENES IN QUANG BINH */}
      <FadeIn className="space-y-5">
        <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-widest text-ink-500 uppercase">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span>GỢI Ý BỐI CẢNH CHỤP TẠI QUẢNG BÌNH</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {content.recommendedScenes.map((scene, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl bg-white border border-ink-200/90 shadow-2xs space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-semibold text-accent uppercase tracking-wider block">
                  {scene.location}
                </span>
                <h3 className="font-sans font-bold text-sm sm:text-base text-ink-900">
                  {scene.title}
                </h3>
                <p className="text-xs text-ink-600 font-sans leading-relaxed">
                  {scene.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* 4. DECISION HELPER & INTERNAL LINKING */}
      <FadeIn className="space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-widest text-ink-500 uppercase">
            <Compass className="w-3.5 h-3.5 text-accent" />
            <span>SO SÁNH & CÂN NHẮC</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
            Khi nào bạn nên chọn máy khác?
          </h3>
          <p className="text-xs sm:text-sm text-ink-500 font-sans">
            Mỗi chuyến đi có một nhu cầu riêng. Dưới đây là những gợi ý đổi máy phù hợp hơn nếu tiêu chí của bạn thay đổi:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {content.whenToConsiderOthers.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl bg-canvas-200/70 border border-ink-200 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-ink-500 block">
                  NẾU BẠN:
                </span>
                <p className="text-xs sm:text-sm font-sans font-semibold text-ink-900 leading-snug">
                  {item.condition}
                </p>
                <p className="text-xs text-ink-600 font-sans leading-relaxed pt-1">
                  {item.reason}
                </p>
              </div>

              <div className="pt-2 border-t border-ink-200/60">
                <Link
                  href={`/thiet-bi/${item.targetCameraSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-ink-900 hover:text-accent transition-colors group"
                >
                  <span>Xem {item.targetCameraName}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* 5. EXPERIENCE & PRACTICAL TIPS */}
      <FadeIn className="p-5 sm:p-6 rounded-xl bg-canvas-100/90 border border-ink-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-ink-900 uppercase">
          <Lightbulb className="w-4 h-4 text-accent" />
          <span>MẸO NHỎ TỪ KIHO CAMERA</span>
        </div>
        
        <ul className="space-y-2 text-xs sm:text-sm text-ink-700 font-sans leading-relaxed">
          {content.experienceTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </FadeIn>

      {/* 6. UNIQUE FAQs */}
      <FadeIn className="space-y-4 pt-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-widest text-ink-500 uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-accent" />
            <span>HỎI ĐÁP VỀ DÒNG MÁY</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
            Câu hỏi thường gặp về {content.modelName}
          </h3>
        </div>

        <div className="divide-y divide-ink-200 border-y border-ink-200">
          {content.faqs.map((faq, idx) => {
            const isOpen = !!openFaqIndices[idx];

            return (
              <div key={idx} className="py-3.5 sm:py-4">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 font-sans font-semibold text-sm sm:text-base text-ink-900 hover:text-accent transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-ink-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-ink-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <p className="mt-2 text-xs sm:text-sm text-ink-600 font-sans font-normal leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </FadeIn>

    </section>
  );
}
