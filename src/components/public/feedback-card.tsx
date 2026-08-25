import React from "react";
import Image from "next/image";
import { Feedback } from "@/types/database";

interface FeedbackCardProps {
  feedback: Feedback;
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <div className="group flex flex-col justify-between space-y-4">
      {/* Real Customer Photography */}
      {feedback.image_url && (
        <div className="relative aspect-[4/3] w-full bg-[#f3efe9] overflow-hidden rounded-md">
          <Image
            src={feedback.image_url}
            alt={`Ảnh chụp từ khách thuê - ${feedback.customer_name}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover img-editorial"
          />
        </div>
      )}

      {/* Editorial Quote */}
      <div className="space-y-2">
        <p className="text-sm sm:text-base text-ink-900 leading-relaxed font-normal">
          "{feedback.content}"
        </p>

        {/* Customer Attribution */}
        <div className="flex items-baseline justify-between pt-1">
          <span className="text-xs font-bold text-ink-700">
            {feedback.customer_name}
          </span>
          <span className="text-[11px] font-mono text-ink-400">
            {feedback.feedback_date}
          </span>
        </div>
      </div>
    </div>
  );
}
