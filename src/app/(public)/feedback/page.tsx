import React from "react";
import { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getFeedbackList } from "@/lib/services/feedback";
import { getSiteSettings } from "@/lib/services/settings";
import { FeedbackCard } from "@/components/public/feedback-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Feedback & Ảnh chụp thực tế của khách | Kiho Camera Quảng Bình",
  description:
    "Cảm nhận và hình ảnh check-in thực tế của khách du lịch, thợ ảnh khi thuê máy ảnh Canon, Sony, Fujifilm tại Kiho Camera Đồng Hới.",
};

export default async function FeedbackPage() {
  const [feedbacks, settings] = await Promise.all([
    getFeedbackList(true),
    getSiteSettings(),
  ]);

  return (
    <div className="bg-[#faf8f5] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <FadeIn className="space-y-3 pb-8 hairline-b">
          <span className="text-[11px] font-mono font-semibold tracking-widest text-ink-400 uppercase">
            KIHO CAMERA STORIES
          </span>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h1 className="text-4xl sm:text-6xl font-black text-ink-900 tracking-tight">
              Feedback & Ảnh khách chụp
            </h1>
            <span className="text-sm font-mono text-ink-500">
              500+ chuyến đi cùng Kiho Camera
            </span>
          </div>
        </FadeIn>

        {/* Feedback List Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
          {feedbacks.map((fb) => (
            <StaggerItem key={fb.id}>
              <FeedbackCard feedback={fb} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <FadeIn className="py-16 sm:py-20 hairline-t text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-ink-900 tracking-tight">
            Ghi lại chuyến đi của bạn cùng Kiho Camera.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Nhắn cho tụi mình mẫu máy bạn muốn thuê để nhận tư vấn và giữ lịch sớm nhất.
          </p>
          <div className="pt-2">
            <a
              href={settings.messenger_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink-900 hover:bg-accent text-[#faf8f5] font-bold text-sm px-8 py-3.5 rounded-sm shadow-sm transition-colors"
            >
              <span>Nhắn qua Facebook Messenger</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
