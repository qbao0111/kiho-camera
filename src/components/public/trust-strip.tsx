"use client";

import React from "react";

const TRUST_ITEMS = [
  "KHÔNG CẦN CỌC TIỀN MÁY",
  "CHỈ CẦN ẢNH CCCD / VNEID",
  "KÈM TRỌN BỘ PIN + THẺ NHỚ",
  "HƯỚNG DẪN DÙNG TRƯỚC KHI NHẬN",
  "GIAO MÁY TẬN NƠI ĐỒNG HỚI",
];

export function TrustStrip() {
  return (
    <div className="w-full bg-[#f0eae1] border-y border-[#e2dbcf] py-3 overflow-hidden select-none">
      <div className="flex items-center space-x-8 animate-marquee whitespace-nowrap">
        {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, idx) => (
          <div key={idx} className="inline-flex items-center space-x-8 shrink-0">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-ink-700 uppercase">
              {item}
            </span>
            <span className="text-accent text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
