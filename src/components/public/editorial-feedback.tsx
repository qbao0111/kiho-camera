"use client";

import React from "react";
import Image from "@/components/ui/source-image";
import Link from "next/link";
import { ArrowUpRight, Star, Camera } from "lucide-react";
import { Feedback } from "@/types/database";

interface EditorialFeedbackProps {
  feedbacks: Feedback[];
}

export function EditorialFeedback({ feedbacks }: EditorialFeedbackProps) {
  if (!feedbacks || feedbacks.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-canvas-200/50 border-t border-b border-ink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-ink-600 uppercase mb-2">
              <Camera className="w-3.5 h-3.5 text-accent" />
              <span>KHOẢNH KHẮC THỰC TẾ</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
              Người ta mang Kiho đi đâu rồi?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-600 font-sans font-normal max-w-xl">
              Những khung hình và cảm nhận thật từ khách hàng đã đồng hành cùng Kiho Camera tại Quảng Bình.
            </p>
          </div>

          <Link
            href="/feedback"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-ink-900 hover:text-accent transition-colors shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>Xem thêm album & feedback</span>
            <ArrowUpRight className="w-4 h-4 text-ink-600 hover:text-accent" />
          </Link>
        </div>

        {/* Editorial Contact Sheet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {feedbacks.slice(0, 4).map((fb) => (
            <div
              key={fb.id}
              className="bg-white rounded-xl p-4 sm:p-5 border border-ink-200 shadow-xs hover:shadow-md hover:border-ink-300 transition-all duration-200 flex flex-col justify-between group relative"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-canvas-100 mb-3.5 border border-ink-100">
                {fb.image_url ? (
                  <Image
                    src={fb.image_url}
                    alt={fb.customer_name}
                    fill
                    sizes="300px"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink-500">
                    <Camera className="w-6 h-6" />
                  </div>
                )}
                
                {/* 5-Star Tag */}
                <div className="absolute top-2 right-2 bg-ink-900/90 px-2 py-0.5 rounded-sm flex items-center gap-1 text-[10px] text-amber-400 font-mono">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-white font-medium">5.0</span>
                </div>
              </div>

              {/* Quote & Content */}
              <div className="space-y-3 flex-grow flex flex-col justify-between">
                <p className="text-xs text-ink-700 leading-relaxed font-sans font-normal line-clamp-4 italic">
                  &ldquo;{fb.content}&rdquo;
                </p>

                {/* Customer Meta */}
                <div className="pt-3 border-t border-ink-200 flex items-center justify-between text-[11px] font-mono">
                  <div>
                    <span className="font-semibold text-ink-900 block truncate max-w-[140px]">
                      {fb.customer_name.replace(/^Khách hàng demo – /, "")}
                    </span>
                    <span className="text-ink-600 text-[10px] font-medium">
                      {fb.feedback_date}
                    </span>
                  </div>

                  <span className="text-[10px] bg-canvas-200 text-ink-800 font-semibold px-2 py-0.5 rounded-sm border border-ink-200">
                    {fb.equipment ? fb.equipment.name.split(" ")[1] || "Máy ảnh" : "Đã thuê"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
