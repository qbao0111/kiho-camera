"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, ArrowRight, RefreshCw, MessageSquare } from "lucide-react";

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
    initialEquipmentName || (variant === "drawer" && equipmentList.length > 0 ? equipmentList[0].name : "Chưa biết — nhờ Kiho tư vấn")
  );
  const [equipmentId, setEquipmentId] = useState(initialEquipmentId || "");
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
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
    if (returnDate && returnDate < val) {
      setReturnDate(val);
    }
  };

  const handleEquipmentChange = (selectedName: string) => {
    setEquipmentName(selectedName);
    const matched = equipmentList.find((e) => e.name === selectedName);
    setEquipmentId(matched ? matched.id : "");
  };

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
          note: note.trim(),
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
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-ink-200 shadow-xs text-center space-y-5">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-1.5">
          <span className="font-mono text-xs font-medium tracking-wider text-emerald-700 uppercase block">
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
        <div className="p-3.5 rounded-lg bg-canvas-100 border border-ink-200 max-w-md mx-auto text-left space-y-1.5 font-mono text-xs">
          <div className="flex justify-between items-center py-1 border-b border-ink-200">
            <span className="text-ink-500 font-normal">Dòng máy:</span>
            <span className="font-semibold text-ink-900">{successData.equipmentName}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-ink-500 font-normal">Thời gian:</span>
            <span className="font-semibold text-ink-900">
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
            className="inline-flex items-center gap-1.5 bg-ink-900 hover:bg-black text-white text-xs font-sans font-semibold px-5 py-3 rounded-lg transition-colors shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Nhắn Kiho ngay</span>
          </a>

          {variant === "drawer" && onClose ? (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 bg-canvas-200 hover:bg-canvas-300 text-ink-800 text-xs font-sans font-medium px-4 py-3 rounded-lg transition-colors"
            >
              <span>Đóng</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 bg-canvas-200 hover:bg-canvas-300 text-ink-800 text-xs font-sans font-medium px-4 py-3 rounded-lg transition-colors"
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
          className="w-full px-3.5 py-2.5 rounded-lg bg-canvas-50 border border-ink-200 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent focus:bg-white transition-all font-sans"
        />
      </div>

      {/* 2. Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label htmlFor="rentalDate" className="block text-xs font-sans font-semibold text-ink-900">
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
            className="w-full px-3.5 py-2.5 rounded-lg bg-canvas-50 border border-ink-200 text-sm text-ink-900 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent focus:bg-white transition-all font-mono"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="returnDate" className="block text-xs font-sans font-semibold text-ink-900">
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
            className="w-full px-3.5 py-2.5 rounded-lg bg-canvas-50 border border-ink-200 text-sm text-ink-900 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent focus:bg-white transition-all font-mono"
          />
        </div>
      </div>

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
          className="w-full px-3.5 py-2.5 rounded-lg bg-canvas-50 border border-ink-200 text-sm text-ink-900 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent focus:bg-white transition-all font-sans cursor-pointer"
        >
          {variant !== "drawer" && (
            <option value="Chưa biết — nhờ Kiho tư vấn">
              Chưa biết — nhờ Kiho tư vấn máy phù hợp
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
      <div className="space-y-1">
        <label htmlFor="phone" className="block text-xs font-sans font-semibold text-ink-900">
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
          className="w-full px-3.5 py-2.5 rounded-lg bg-canvas-50 border border-ink-200 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent focus:bg-white transition-all font-mono"
        />
      </div>

      {/* 5. Note (Optional) */}
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
          className="w-full px-3.5 py-2 rounded-lg bg-canvas-50 border border-ink-200 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent focus:bg-white transition-all resize-none font-sans"
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
              <span>Gửi yêu cầu thuê máy</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>

        <p className="text-[11px] font-sans text-ink-600 text-center leading-relaxed">
          Kiho chỉ dùng thông tin này để kiểm tra lịch máy và phản hồi cho bạn.
        </p>
      </div>
    </form>
  );
}

