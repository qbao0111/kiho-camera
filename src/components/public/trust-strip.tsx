import React from "react";

const TRUST_ITEMS = [
  "KHÔNG CẦN CỌC TIỀN MÁY",
  "CHỈ CẦN CCCD HOẶC VNEID XÁC THỰC",
  "KÈM TRỌN BỘ 2 PIN + THẺ NHỚ",
  "HƯỚNG DẪN 5 PHÚT TRƯỚC KHI NHẬN",
  "GIAO MÁY TẬN NƠI TẠI ĐỒNG HỚI",
];

export function TrustStrip() {
  const renderStripContent = (copy: string) =>
    TRUST_ITEMS.map((item) => (
      <div key={`${copy}-${item}`} className="trust-strip-item">
        <span>{item}</span>
        <span className="trust-strip-dot" aria-hidden="true">
          ·
        </span>
      </div>
    ));

  return (
    <section
      className="trust-strip w-full bg-canvas-200/90 border-y border-ink-200 py-2.5 overflow-hidden select-none"
      aria-label="Thông tin thuê máy Kiho Camera"
    >
      <p className="sr-only">{TRUST_ITEMS.join(". ")}</p>
      <div className="trust-strip-viewport" aria-hidden="true">
        <div className="trust-strip-track">
          <div className="trust-strip-set">{renderStripContent("a")}</div>
          <div className="trust-strip-set">{renderStripContent("b")}</div>
        </div>
      </div>
    </section>
  );
}
