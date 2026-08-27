"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Quote, Star } from "lucide-react";
import { Feedback } from "@/types/database";

interface EditorialFeedbackProps {
  feedbacks: Feedback[];
}

export function EditorialFeedback({ feedbacks }: EditorialFeedbackProps) {
  if (!feedbacks || feedbacks.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-[#f4efe6] hairline-t hairline-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faf6ef] border border-[#e2dbcf] text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>KHOẢNH KHẮC THỰC TẾ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight leading-tight">
              Người ta mang Kiho đi đâu rồi?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-600 font-medium max-w-xl">
              Những khung hình và cảm nhận thật từ khách hàng đã đồng hành cùng Kiho Camera tại Quảng Bình.
            </p>
          </div>

          <Link
            href="/feedback"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-ink-900 hover:text-accent transition-colors shrink-0"
          >
            <span>Xem thêm album & feedback</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Editorial Contact Sheet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {feedbacks.slice(0, 4).map((fb, idx) => (
            <div
              key={fb.id}
              className="bg-white rounded-3xl p-5 border border-[#e5ded2] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Top: Customer Photo with Polaroid Frame Vibe */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#faf8f4] mb-4">
                {fb.image_url ? (
                  <Image
                    src={fb.image_url}
                    alt={fb.customer_name}
                    fill
                    sizes="300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink-400">
                    <Sparkles className="w-8 h-8" />
                  </div>
                )}
                
                {/* 5-Star Tag */}
                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] text-amber-400 font-mono">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-white font-bold">5.0</span>
                </div>
              </div>

              {/* Quote & Content */}
              <div className="space-y-3 flex-grow flex flex-col justify-between">
                <p className="text-xs text-ink-700 leading-relaxed font-medium line-clamp-4 italic">
                  &ldquo;{fb.content}&rdquo;
                </p>

                {/* Customer Meta */}
                <div className="pt-3 border-t border-[#f0eae1] flex items-center justify-between text-[11px] font-mono">
                  <div>
                    <span className="font-bold text-ink-900 block truncate max-w-[150px]">
                      {fb.customer_name.replace(/^Khách hàng demo – /, "")}
                    </span>
                    <span className="text-ink-400 text-[10px]">
                      {fb.feedback_date}
                    </span>
                  </div>

                  <span className="text-[10px] bg-[#f4efe6] text-ink-800 font-bold px-2 py-0.5 rounded-md border border-[#e2dbcf]">
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
