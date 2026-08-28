import React from "react";
import { Metadata } from "next";
import { ArrowUpRight, Camera } from "lucide-react";
import { getFeedbackList } from "@/lib/services/feedback";
import { getSiteSettings } from "@/lib/services/settings";
import { FeedbackCard } from "@/components/public/feedback-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Feedback & Cảm nhận khách hàng | Kiho Camera",
  description:
    "Cảm nhận và hình ảnh check-in thực tế của khách du lịch khi thuê máy ảnh Canon, Sony, Fujifilm tại Kiho Camera Đồng Hới.",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function FeedbackPage() {
  const [feedbacks, settings] = await Promise.all([
    getFeedbackList(true),
    getSiteSettings(),
  ]);

  return (
    <div className="bg-[#faf8f5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Page Header */}
        <FadeIn className="space-y-2 pb-6 border-b border-ink-200">
          <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wider text-ink-500 uppercase">
            <Camera className="w-3.5 h-3.5 text-accent" />
            <span>KIHO CAMERA STORIES</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink-900 tracking-tight">
              Feedback & Ảnh khách chụp
            </h1>
            <span className="text-xs sm:text-sm font-sans text-ink-500">
              Khoảnh khắc thực tế từ khách hàng
            </span>
          </div>
        </FadeIn>

        {/* Feedback List Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {feedbacks.map((item) => (
            <StaggerItem key={item.id}>
              <FeedbackCard feedback={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom Link */}
        <FadeIn className="pt-8 text-center">
          <a
            href={settings.messenger_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-ink-900 hover:text-accent bg-white border border-ink-300 px-6 py-3.5 rounded-lg transition-all shadow-xs"
          >
            <span>Nhắn Kiho tư vấn dòng máy phù hợp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </FadeIn>
      </div>
    </div>
  );
}
