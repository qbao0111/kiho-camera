"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  MessageSquare,
  Calculator,
  ShieldCheck,
  BadgePercent,
} from "lucide-react";

export interface EquipmentOption {
  id: string;
  name: string;
  brand: string;
  slug?: string;
  price_session?: number;
  price_per_day?: number;
  price_three_days?: number;
  included_items?: string[];
}

interface RentalRequestFormProps {
  equipmentList?: EquipmentOption[];
  initialEquipmentId?: string;
  initialEquipmentName?: string;
  source?: string;
  onSuccess?: () => void;
  onClose?: () => void;
  messengerUrl?: string;
  variant?: "section" | "drawer";
}

export function RentalRequestForm({
  equipmentList = [],
  initialEquipmentId,
  initialEquipmentName,
  source = "website",
  onSuccess,
  onClose,
  messengerUrl = "https://m.me/kihocameradonghoi",
  variant = "section",
}: RentalRequestFormProps) {
  const getTodayStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayStr = getTodayStr();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [equipmentName, setEquipmentName] = useState(
    initialEquipmentName ||
      (variant === "drawer" && equipmentList.length > 0
        ? equipmentList[0].name
        : "Chưa biết — nhờ Kiho tư vấn")
  );
  const [equipmentId, setEquipmentId] = useState(initialEquipmentId || "");
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isSingleSession, setIsSingleSession] = useState(false);
  const [note, setNote] = useState("");
  const [hpWebsite, setHpWebsite] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    customerName: string;
    equipmentName: string;
    rentalDate: string;
    returnDate: string;
    estimatedPrice?: number;
  } | null>(null);

  useEffect(() => {
    if (initialEquipmentName) {
      setEquipmentName(initialEquipmentName);
    }
    if (initialEquipmentId) {
      setEquipmentId(initialEquipmentId);
    }
  }, [initialEquipmentName, initialEquipmentId]);

  const handleRentalDateChange = (val: string) => {
    setRentalDate(val);
    if (!returnDate || returnDate < val) {
      setReturnDate(val);
    }
  };

  const handleEquipmentChange = (selectedName: string) => {
    setEquipmentName(selectedName);
    const matched = equipmentList.find((e) => e.name === selectedName);
    setEquipmentId(matched ? matched.id : "");
  };

  // Phone auto-format: 0912 345 678
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d+]/g, "");
    if (raw.length <= 11) {
      if (raw.length <= 4) {
        setPhone(raw);
      } else if (raw.length <= 7) {
        setPhone(`${raw.slice(0, 4)} ${raw.slice(4)}`);
      } else {
        setPhone(`${raw.slice(0, 4)} ${raw.slice(4, 7)} ${raw.slice(7, 11)}`);
      }
    }
  };

  // Selected Equipment Entity
  const selectedEquipment = useMemo(() => {
    return (
      equipmentList.find((e) => e.id === equipmentId || e.name === equipmentName) ||
      (equipmentList.length === 1 ? equipmentList[0] : null)
    );
  }, [equipmentList, equipmentId, equipmentName]);

  // Live Price Calculation
  const priceEstimation = useMemo(() => {
    if (!rentalDate || !returnDate || !selectedEquipment || !selectedEquipment.price_per_day) {
      return null;
    }

    const d1 = new Date(rentalDate);
    const d2 = new Date(returnDate);
    const diffTime = d2.getTime() - d1.getTime();
    const days = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1);

    const isSameDay = rentalDate === returnDate;

    if (isSameDay && isSingleSession && selectedEquipment.price_session) {
      return {
        days: 1,
        isSession: true,
        isTierDiscount: false,
        unitPrice: selectedEquipment.price_session,
        total: selectedEquipment.price_session,
        savings: (selectedEquipment.price_per_day || 0) - selectedEquipment.price_session,
        label: "1 buổi (4 – 5 tiếng)",
      };
    }

    if (days >= 3 && selectedEquipment.price_three_days) {
      const standardTotal = days * selectedEquipment.price_per_day;
      const discountedTotal = days * selectedEquipment.price_three_days;
      const savings = standardTotal - discountedTotal;

      return {
        days,
        isSession: false,
        isTierDiscount: true,
        unitPrice: selectedEquipment.price_three_days,
        total: discountedTotal,
        savings,
        label: `${days} ngày (Giá ưu đãi từ 3 ngày)`,
      };
    }

    return {
      days,
      isSession: false,
      isTierDiscount: false,
      unitPrice: selectedEquipment.price_per_day,
      total: days * selectedEquipment.price_per_day,
      savings: 0,
      label: `${days} ngày (24 tiếng / ngày)`,
    };
  }, [rentalDate, returnDate, selectedEquipment, isSingleSession]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = customerName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage("Kiho cần biết họ tên của bạn để tiện xưng hô nha.");
      return;
    }

    const cleanPhone = phone.replace(/[\s.-]/g, "");
    const vietnamesePhoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!vietnamesePhoneRegex.test(cleanPhone)) {
      setErrorMessage("Kiho cần số điện thoại hợp lệ (10 số) để liên hệ bạn nha.");
      return;
    }

    if (!rentalDate) {
      setErrorMessage("Vui lòng chọn ngày nhận máy.");
      return;
    }

    if (!returnDate) {
      setErrorMessage("Vui lòng chọn ngày trả máy.");
      return;
    }

    if (returnDate < rentalDate) {
      setErrorMessage("Ngày trả không thể trước ngày nhận máy.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/rental-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: trimmedName,
          phone: cleanPhone,
          equipmentId: equipmentId || undefined,
          equipmentName: equipmentName || "Chưa biết — nhờ Kiho tư vấn",
          rentalDate,
          returnDate,
          note: `${note.trim()}${
            priceEstimation
              ? ` [Tạm tính: ${priceEstimation.total.toLocaleString("vi-VN")}₫ · ${priceEstimation.label}]`
              : ""
          }`,
          source: source || (variant === "drawer" ? "product_detail" : "homepage_section"),
          hp_website: hpWebsite,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Chưa gửi được yêu cầu. Bạn thử lại một lần nữa nha.");
      }

      setIsSuccess(true);
      setSuccessData({
        customerName: trimmedName,
        equipmentName: equipmentName || "Chưa biết — nhờ Kiho tư vấn",
        rentalDate,
        returnDate,
        estimatedPrice: priceEstimation?.total,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Chưa gửi được yêu cầu. Bạn thử lại hoặc nhắn Kiho trực tiếp nhé.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSuccessData(null);
    setCustomerName("");
    setPhone("");
    setRentalDate("");
    setReturnDate("");
    setIsSingleSession(false);
    setNote("");
    setErrorMessage(null);
  };

  const formatDateDisplay = (dStr: string) => {
    if (!dStr) return "";
    const [y, m, d] = dStr.split("-");
    return `${d}/${m}/${y}`;
  };

  // SUCCESS STATE VIEW
  if (isSuccess && successData) {
    return (
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-ink-200 shadow-xs text-center space-y-5">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-1.5">
          <span className="font-mono text-xs font-semibold tracking-wider text-emerald-700 uppercase block">
            GỬI YÊU CẦU THÀNH CÔNG
          </span>
          <h3 className="font-display text-2xl font-bold text-ink-900 tracking-tight">
            Đã nhận thông tin thuê máy
          </h3>
          <p className="font-sans text-xs sm:text-sm text-ink-600 font-normal max-w-md mx-auto leading-relaxed">
            Cảm ơn <strong>{successData.customerName}</strong>! Kiho Camera sẽ kiểm tra lịch máy và liên hệ lại cho bạn qua SĐT <strong>{phone}</strong> sớm nhất nha.
          </p>
        </div>

        {/* Summary Card */}
        <div className="p-4 rounded-lg bg-canvas-100 border border-ink-200 max-w-md mx-auto text-left space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center py-1 border-b border-ink-200">
            <span className="text-ink-500 font-normal">Dòng máy:</span>
            <span className="font-semibold text-ink-900">{successData.equipmentName}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-ink-200">
            <span className="text-ink-500 font-normal">Thời gian:</span>
            <span className="font-semibold text-ink-900">
              {formatDateDisplay(successData.rentalDate)} → {formatDateDisplay(successData.returnDate)}
            </span>
          </div>
          {successData.estimatedPrice ? (
            <div className="flex justify-between items-center py-1 text-ink-900 font-bold">
              <span className="text-ink-600 font-normal">Tạm tính:</span>
              <span className="text-accent text-sm">
                {successData.estimatedPrice.toLocaleString("vi-VN")}₫
              </span>
            </div>
          ) : null}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href={messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-ink-900 hover:bg-black text-white text-xs font-sans font-semibold px-5 py-3 rounded-lg transition-colors shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Nhắn Kiho ngay</span>
          </a>

          {variant === "drawer" && onClose ? (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 bg-canvas-200 hover:bg-canvas-300 text-ink-800 text-xs font-sans font-medium px-4 py-3 rounded-lg transition-colors cursor-pointer"
            >
              <span>Đóng</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 bg-canvas-200 hover:bg-canvas-300 text-ink-800 text-xs font-sans font-medium px-4 py-3 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Gửi yêu cầu khác</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // ACTIVE FORM VIEW
  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <input
        type="text"
        name="hp_website"
        value={hpWebsite}
        onChange={(e) => setHpWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {errorMessage && (
        <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800 font-sans">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p>{errorMessage}</p>
            <p className="text-[11px] text-rose-600">
              Hoặc bạn có thể{" "}
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                nhắn Kiho trực tiếp qua Messenger ↗
              </a>
            </p>
          </div>
        </div>
      )}

      {/* 1. Customer Name */}
      <div className="space-y-1">
        <label htmlFor="customerName" className="block text-xs font-sans font-semibold text-ink-900">
          Họ và tên <span className="text-accent">*</span>
        </label>
        <input
          id="customerName"
          type="text"
          required
          disabled={isSubmitting}
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Ví dụ: Nguyễn Minh Anh"
          className="w-full px-3.5 py-2.5 rounded-lg bg-canvas-50 border border-ink-200 text-base sm:text-sm text-ink-900 placeholder:text-ink-500 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent focus:bg-white transition-all font-sans"
        />
      </div>

      {/* 2. Date Range & Quick Presets */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-sans font-semibold text-ink-900">
            Thời gian thuê máy <span className="text-accent">*</span>
          </label>
          <span className="text-[10px] text-ink-500 font-mono">Nhận 07:30 · Trả 21:00</span>
        </div>

        {/* Quick Presets for Tourist Itineraries */}
        <div className="flex flex-wrap items-center gap-1.5 pb-1">
          <span className="text-[11px] font-sans text-ink-600 mr-0.5 font-medium">Chọn nhanh:</span>
          {[
            { label: "1 Buổi (4-5h)", days: 1, isSession: true },
            { label: "1 Ngày (24h)", days: 1, isSession: false },
            { label: "2N1Đ (Cuối tuần)", days: 2, isSession: false },
            { label: "3N2Đ (Tour Phong Nha)", days: 3, isSession: false },
          ].map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                const now = new Date();
                const start = new Date();
                if (now.getHours() >= 17) {
                  start.setDate(start.getDate() + 1);
                }
                const end = new Date(start);
                end.setDate(start.getDate() + (preset.days - 1));

                const startStr = start.toISOString().split("T")[0];
                const endStr = end.toISOString().split("T")[0];

                setRentalDate(startStr);
                setReturnDate(endStr);
                setIsSingleSession(preset.isSession);
              }}
              className="px-2.5 py-1 rounded-md text-[11px] font-sans font-medium bg-canvas-100 hover:bg-ink-900 hover:text-white text-ink-700 border border-ink-200 transition-all cursor-pointer shadow-2xs"
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label htmlFor="rentalDate" className="block text-[11px] font-sans font-medium text-ink-700">
              Ngày nhận máy
            </label>
            <input
              id="rentalDate"
              type="date"
              required
              min={todayStr}
              disabled={isSubmitting}
              value={rentalDate}
              onChange={(e) => handleRentalDateChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-canvas-50 border border-ink-200 text-base sm:text-sm text-ink-900 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent focus:bg-white transition-all font-mono cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="returnDate" className="block text-[11px] font-sans font-medium text-ink-700">
              Ngày trả máy
            </label>
            <input
              id="returnDate"
              type="date"
              required
              min={rentalDate || todayStr}
              disabled={isSubmitting}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-canvas-50 border border-ink-200 text-base sm:text-sm text-ink-900 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent focus:bg-white transition-all font-mono cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Same-day Option Toggle (Buổi vs Ngày) */}
      {rentalDate && returnDate && rentalDate === returnDate && selectedEquipment?.price_session ? (
        <div className="flex items-center gap-2 p-2.5 bg-canvas-100 rounded-lg border border-ink-200 text-xs font-sans">
          <span className="text-ink-600 font-medium shrink-0">Hình thức thuê:</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsSingleSession(false)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                !isSingleSession
                  ? "bg-ink-900 text-white shadow-2xs"
                  : "bg-white text-ink-700 border border-ink-200 hover:bg-canvas-200"
              }`}
            >
              1 Ngày (24h) · {selectedEquipment.price_per_day ? `${Math.round(selectedEquipment.price_per_day / 1000)}K` : ""}
            </button>
            <button
              type="button"
              onClick={() => setIsSingleSession(true)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                isSingleSession
                  ? "bg-ink-900 text-white shadow-2xs"
                  : "bg-white text-ink-700 border border-ink-200 hover:bg-canvas-200"
              }`}
            >
              1 Buổi (4-5h) · {selectedEquipment.price_session ? `${Math.round(selectedEquipment.price_session / 1000)}K` : ""}
            </button>
          </div>
        </div>
      ) : null}

      {/* 3. Camera Selection Dropdown */}
      <div className="space-y-1">
        <label htmlFor="equipmentSelect" className="block text-xs font-sans font-semibold text-ink-900">
          Dòng máy quan tâm <span className="text-accent">*</span>
        </label>
        <select
          id="equipmentSelect"
          disabled={isSubmitting}
          value={equipmentName}
          onChange={(e) => handleEquipmentChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg bg-canvas-50 border border-ink-200 text-base sm:text-sm text-ink-900 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent focus:bg-white transition-all font-sans cursor-pointer"
        >
          {variant !== "drawer" && (
            <option value="Chưa biết — nhờ Kiho tư vấn">
              Chưa biết — nhờ Kiho tư vấn máy phù hợp
            </option>
          )}
          {equipmentList.map((eq) => (
            <option key={eq.id} value={eq.name}>
              {eq.brand} · {eq.name} {eq.price_per_day ? `(${Math.round(eq.price_per_day / 1000)}K/ngày)` : ""}
            </option>
          ))}
          {equipmentList.length === 0 && initialEquipmentName && (
            <option value={initialEquipmentName}>{initialEquipmentName}</option>
          )}
        </select>
      </div>

      {/* 4. LIVE PRICE ESTIMATOR & SUMMARY CARD */}
      {priceEstimation && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-canvas-100 border border-ink-200 shadow-2xs space-y-2.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-ink-200/80 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-ink-700 uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5 text-accent" />
              <span>TẠM TÍNH CHI PHÍ</span>
            </div>
            {priceEstimation.isTierDiscount && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full border border-rose-200">
                <BadgePercent className="w-3 h-3" />
                Tiết kiệm {priceEstimation.savings.toLocaleString("vi-VN")}₫
              </span>
            )}
          </div>

          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-xs text-ink-700 font-sans block font-medium">
                {selectedEquipment?.name} · {priceEstimation.label}
              </span>
              <span className="text-[11px] text-ink-500 font-mono">
                {formatDateDisplay(rentalDate)} → {formatDateDisplay(returnDate)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-bold font-mono text-accent">
                {priceEstimation.total.toLocaleString("vi-VN")}₫
              </span>
            </div>
          </div>

          {/* Included Free Items Reminder */}
          <div className="pt-2 border-t border-ink-200/70 grid grid-cols-2 gap-1.5 text-[11px] font-sans text-ink-700">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>2 Pin + Sạc nhanh đôi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>Thẻ nhớ 64GB tốc độ cao</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>Đầu đọc thẻ OTG (iPhone/Type-C)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>Túi chống sốc du lịch</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-sans text-emerald-700 bg-emerald-50/80 px-2.5 py-1.5 rounded-md border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span><strong>Không cần cọc tiền máy</strong> · Chỉ thanh toán khi nhận máy</span>
          </div>
        </div>
      )}

      {/* 5. Phone Number with inputmode=tel */}
      <div className="space-y-1">
        <label htmlFor="phone" className="block text-xs font-sans font-semibold text-ink-900">
          Số điện thoại (Zalo) <span className="text-accent">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          disabled={isSubmitting}
          value={phone}
          onChange={handlePhoneChange}
          placeholder="0912 345 678"
          className="w-full px-3.5 py-2.5 rounded-lg bg-canvas-50 border border-ink-200 text-base sm:text-sm text-ink-900 placeholder:text-ink-500 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent focus:bg-white transition-all font-mono"
        />
      </div>

      {/* 6. Note (Optional) */}
      <div className="space-y-1">
        <label htmlFor="note" className="block text-xs font-sans font-semibold text-ink-900">
          Ghi chú thêm <span className="text-ink-600 font-normal">(không bắt buộc)</span>
        </label>
        <textarea
          id="note"
          rows={2}
          disabled={isSubmitting}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Bạn định đi Phong Nha, check-in biển hay quay vlog..."
          className="w-full px-3.5 py-2 rounded-lg bg-canvas-50 border border-ink-200 text-base sm:text-sm text-ink-900 placeholder:text-ink-500 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent focus:bg-white transition-all resize-none font-sans"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2 space-y-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-ink-900 hover:bg-black text-white py-3.5 px-6 rounded-lg font-sans font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Đang gửi thông tin...</span>
            </>
          ) : (
            <>
              <span>
                {priceEstimation ? `Gửi yêu cầu thuê máy (${priceEstimation.total.toLocaleString("vi-VN")}₫)` : "Gửi yêu cầu thuê máy"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>

        <p className="text-[11px] font-sans text-ink-600 text-center leading-relaxed">
          Kiho sẽ gọi hoặc nhắn Zalo xác nhận lịch máy cho bạn trong vòng 5 – 10 phút.
        </p>
      </div>
    </form>
  );
}
