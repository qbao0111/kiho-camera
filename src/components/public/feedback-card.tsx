import React from "react";
import Image from "@/components/ui/source-image";
import { Feedback } from "@/types/database";

interface FeedbackCardProps {
  feedback: Feedback;
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <div className="group flex flex-col justify-between space-y-3.5 bg-white p-5 rounded-xl border border-ink-200 shadow-xs hover:shadow-md transition-all duration-200">
      {/* Real Customer Photography */}
      {feedback.image_url && (
        <div className="relative aspect-[4/3] w-full bg-canvas-100 overflow-hidden rounded-lg border border-ink-100">
          <Image
            src={feedback.image_url}
            alt={`Ảnh chụp từ khách thuê - ${feedback.customer_name}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
          />
        </div>
      )}

      {/* Editorial Quote */}
      <div className="space-y-2">
        <p className="text-xs sm:text-sm text-ink-800 leading-relaxed font-sans font-normal italic">
          &ldquo;{feedback.content}&rdquo;
        </p>

        {/* Customer Attribution */}
        <div className="flex items-baseline justify-between pt-2 border-t border-ink-200">
          <span className="text-xs font-sans font-semibold text-ink-900">
            {feedback.customer_name.replace(/^Khách hàng demo – /, "")}
          </span>
          <span className="text-[11px] font-mono text-ink-600 font-medium">
            {feedback.feedback_date}
          </span>
        </div>
      </div>
    </div>
  );
}

