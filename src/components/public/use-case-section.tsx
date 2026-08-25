import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { USE_CASE_LIST } from "@/lib/mock-data";
import { FadeIn } from "@/components/ui/motion";

export function UseCaseSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#faf8f5] hairline-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[11px] font-bold text-ink-400 uppercase tracking-widest block mb-2">
              Lựa chọn theo nhu cầu
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight">
              Bạn định mang máy đi đâu?
            </h2>
          </div>
          <p className="text-sm sm:text-base text-ink-500 max-w-md leading-relaxed">
            Chọn chuyến đi của bạn. Kiho Camera đã chuẩn bị sẵn những combo máy, lens và phụ kiện tối ưu nhất.
          </p>
        </FadeIn>

        {/* Editorial Grid / Asymmetric List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e7e4dc] border border-[#e7e4dc] rounded-md overflow-hidden">
          {USE_CASE_LIST.map((item, idx) => (
            <Link
              key={idx}
              href={`/thiet-bi?useCase=${encodeURIComponent(item.tag)}`}
              className="group bg-[#faf8f5] hover:bg-[#f3efe9] p-8 sm:p-10 flex flex-col justify-between transition-colors duration-300 min-h-[220px]"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-ink-400 block group-hover:text-accent transition-colors">
                  0{idx + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-500 leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between text-xs font-bold text-ink-900 group-hover:text-accent transition-colors">
                <span>Xem thiết bị phù hợp</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
