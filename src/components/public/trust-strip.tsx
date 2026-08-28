"use client";

import React from "react";

const TRUST_ITEMS = [
  "KHÔNG CẦN CỌC TIỀN MÁY",
  "CHỈ CẦN CCCD / VNEID XÁC THỰC",
  "KÈM TRỌN BỘ 2 PIN + THẺ NHỚ",
  "HƯỚNG DẪN 5 PHÚT TRƯỚC KHI NHẬN",
  "GIAO MÁY TẬN NƠI TẠI ĐỒNG HỚI",
];

export function TrustStrip() {
  return (
    <div className="w-full bg-canvas-200/90 border-y border-ink-200 py-2.5 overflow-hidden select-none">
      <div className="flex items-center space-x-8 animate-marquee whitespace-nowrap">
        {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, idx) => (
          <div key={idx} className="inline-flex items-center space-x-8 shrink-0">
            <span className="text-[11px] font-mono font-medium tracking-widest text-ink-700 uppercase">
              {item}
            </span>
            <span className="text-accent text-xs">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
