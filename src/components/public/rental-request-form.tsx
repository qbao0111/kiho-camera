"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Sparkles, Send, RefreshCw, MessageSquare } from "lucide-react";

export interface EquipmentOption {
  id: string;
  name: string;
  brand: string;
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
  // Format today's date in YYYY-MM-DD
  const getTodayStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayStr = getTodayStr();

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [equipmentName, setEquipmentName] = useState(
    initialEquipmentName || (variant === "drawer" && equipmentList.length > 0 ? equipmentList[0].name : "Chưa biết — nhờ Kiho tư vấn")
  );
  const [equipmentId, setEquipmentId] = useState(initialEquipmentId || "");
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [note, setNote] = useState("");
  const [hpWebsite, setHpWebsite] = useState(""); // Honeypot

  // UI Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    customerName: string;
    equipmentName: string;
    rentalDate: string;
    returnDate: string;
  } | null>(null);

  // Sync initial equipment if changed
  useEffect(() => {
    if (initialEquipmentName) {
      setEquipmentName(initialEquipmentName);
    }
    if (initialEquipmentId) {
      setEquipmentId(initialEquipmentId);
    }
  }, [initialEquipmentName, initialEquipmentId]);

  // Handle Rental Date Change (auto fix return date if earlier)
  const handleRentalDateChange = (val: string) => {
    setRentalDate(val);
    if (returnDate && returnDate < val) {
      setReturnDate(val);
    }
  };

  // Handle Equipment Select Change
  const handleEquipmentChange = (selectedName: string) => {
    setEquipmentName(selectedName);
    const matched = equipmentList.find((e) => e.name === selectedName);
    setEquipmentId(matched ? matched.id : "");
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Client Validation
    const trimmedName = customerName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage("Kiho cần biết họ tên của bạn để tiện xưng hô nha.");
      return;
    }

    const cleanPhone = phone.replace(/[\s.-]/g, "");
    const vietnamesePhoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!vietnamesePhoneRegex.test(cleanPhone)) {
      setErrorMessage("Kiho cần SĐT (10 số) để liên hệ bạn nha.");
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
          note: note.trim(),
          source: source || (variant === "drawer" ? "product_detail" : "homepage_section"),
          hp_website: hpWebsite,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Chưa gửi được yêu cầu. Bạn thử lại một lần nữa nha.");
      }

      // Success
      setIsSuccess(true);
      setSuccessData({
        customerName: trimmedName,
        equipmentName: equipmentName || "Chưa biết — nhờ Kiho tư vấn",
        rentalDate,
        returnDate,
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
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e8e2d7] shadow-sm text-center space-y-6 animate-fadeIn">
        <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-700 uppercase block">
            GỬI YÊU CẦU THÀNH CÔNG
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-ink-900 tracking-tight font-mono">
            Đã nhận yêu cầu ❤️
          </h3>
          <p className="text-xs sm:text-sm text-ink-600 font-medium max-w-md mx-auto leading-relaxed">
            Cảm ơn <strong>{successData.customerName}</strong>! Kiho Camera sẽ kiểm tra lịch máy và liên hệ lại cho bạn qua SĐT <strong>{phone}</strong> sớm nha.
          </p>
        </div>

        {/* Summary Card */}
        <div className="p-4 rounded-2xl bg-[#faf8f4] border border-[#e8e2d7] max-w-md mx-auto text-left space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center py-1 border-b border-[#f0eae1]">
            <span className="text-ink-500">Dòng máy:</span>
            <span className="font-bold text-ink-900 uppercase">{successData.equipmentName}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-ink-500">Thời gian thuê:</span>
            <span className="font-bold text-ink-900">
              {formatDateDisplay(successData.rentalDate)} → {formatDateDisplay(successData.returnDate)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href={messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ink-900 hover:bg-accent text-white text-xs font-mono font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-colors shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Nhắn Kiho ngay</span>
          </a>

          {variant === "drawer" && onClose ? (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[#f0eae1] hover:bg-[#e8e2d7] text-ink-800 text-xs font-mono font-bold uppercase tracking-wider px-5 py-3.5 rounded-xl transition-colors"
            >
              <span>Đóng</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 bg-[#f0eae1] hover:bg-[#e8e2d7] text-ink-800 text-xs font-mono font-bold uppercase tracking-wider px-5 py-3.5 rounded-xl transition-colors"
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
      {/* Honeypot Bot Trap */}
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

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-800 animate-fadeIn font-medium">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p>{errorMessage}</p>
            <p className="text-[11px] text-rose-600">
              Hoặc bạn có thể{" "}
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline underline-offset-2"
              >
                nhắn Kiho trực tiếp qua Messenger ↗
              </a>
            </p>
          </div>
        </div>
      )}

      {/* 1. Customer Name */}
      <div className="space-y-1.5">
        <label htmlFor="customerName" className="block text-xs font-mono font-bold text-ink-900 uppercase">
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
          className="w-full px-4 py-3 rounded-xl bg-[#faf8f4] border border-[#e8e2d7] text-sm text-ink-900 placeholder:text-ink-400 focus:outline-hidden focus:border-ink-900 focus:bg-white transition-colors"
        />
      </div>

      {/* 2. Date Range: Rental Date & Return Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <label htmlFor="rentalDate" className="block text-xs font-mono font-bold text-ink-900 uppercase">
            Ngày nhận máy <span className="text-accent">*</span>
          </label>
          <input
            id="rentalDate"
            type="date"
            required
            min={todayStr}
            disabled={isSubmitting}
            value={rentalDate}
            onChange={(e) => handleRentalDateChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#faf8f4] border border-[#e8e2d7] text-sm text-ink-900 focus:outline-hidden focus:border-ink-900 focus:bg-white transition-colors font-mono"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="returnDate" className="block text-xs font-mono font-bold text-ink-900 uppercase">
            Ngày trả máy <span className="text-accent">*</span>
          </label>
          <input
            id="returnDate"
            type="date"
            required
            min={rentalDate || todayStr}
            disabled={isSubmitting}
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#faf8f4] border border-[#e8e2d7] text-sm text-ink-900 focus:outline-hidden focus:border-ink-900 focus:bg-white transition-colors font-mono"
          />
        </div>
      </div>

      {/* 3. Camera Selection Dropdown */}
      <div className="space-y-1.5">
        <label htmlFor="equipmentSelect" className="block text-xs font-mono font-bold text-ink-900 uppercase">
          Dòng máy quan tâm <span className="text-accent">*</span>
        </label>
        <select
          id="equipmentSelect"
          disabled={isSubmitting}
          value={equipmentName}
          onChange={(e) => handleEquipmentChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#faf8f4] border border-[#e8e2d7] text-sm text-ink-900 focus:outline-hidden focus:border-ink-900 focus:bg-white transition-colors font-mono cursor-pointer"
        >
          {variant !== "drawer" && (
            <option value="Chưa biết — nhờ Kiho tư vấn">
              ✦ Chưa biết — nhờ Kiho tư vấn máy phù hợp
            </option>
          )}
          {equipmentList.map((eq) => (
            <option key={eq.id} value={eq.name}>
              {eq.brand} · {eq.name}
            </option>
          ))}
          {equipmentList.length === 0 && initialEquipmentName && (
            <option value={initialEquipmentName}>{initialEquipmentName}</option>
          )}
        </select>
      </div>

      {/* 4. Phone Number */}
      <div className="space-y-1.5">
        <label htmlFor="phone" className="block text-xs font-mono font-bold text-ink-900 uppercase">
          Số điện thoại (Zalo) <span className="text-accent">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          required
          disabled={isSubmitting}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0912 345 678"
          className="w-full px-4 py-3 rounded-xl bg-[#faf8f4] border border-[#e8e2d7] text-sm text-ink-900 placeholder:text-ink-400 focus:outline-hidden focus:border-ink-900 focus:bg-white transition-colors font-mono"
        />
      </div>

      {/* 5. Note (Optional) */}
      <div className="space-y-1.5">
        <label htmlFor="note" className="block text-xs font-mono font-bold text-ink-700 uppercase">
          Ghi chú <span className="text-ink-400 font-normal">(không bắt buộc)</span>
        </label>
        <textarea
          id="note"
          rows={2}
          disabled={isSubmitting}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Bạn định đi Phong Nha, check-in biển hay quay vlog..."
          className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f4] border border-[#e8e2d7] text-sm text-ink-900 placeholder:text-ink-400 focus:outline-hidden focus:border-ink-900 focus:bg-white transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2 space-y-2.5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-ink-900 hover:bg-accent text-white py-3.5 px-6 rounded-xl font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>ĐANG GỬI...</span>
            </>
          ) : (
            <>
              <span>GỬI YÊU CẦU THUÊ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Privacy Microcopy & Trust Point */}
        <p className="text-[11px] font-mono text-ink-400 text-center leading-relaxed">
          Kiho chỉ dùng thông tin này để liên hệ về yêu cầu thuê máy của bạn.
        </p>
      </div>
    </form>
  );
}
