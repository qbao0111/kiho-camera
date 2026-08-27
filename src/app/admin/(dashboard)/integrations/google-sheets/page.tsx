"use client";

import React, { useState, useEffect } from "react";
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Eye,
  EyeOff,
  Save,
  Send,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Layers,
  Clock,
  ArrowRight,
  Info,
  Mail,
} from "lucide-react";
import { GoogleSheetsIntegrationConfig } from "@/lib/services/integrations";

export default function GoogleSheetsIntegrationPage() {
  const [config, setConfig] = useState<GoogleSheetsIntegrationConfig>({
    provider: "google_sheets",
    enabled: false,
    google_sheet_id: "",
    google_sheet_name: "Rental Requests",
    notification_email: "kihocameradonghoi@gmail.com",
    apps_script_url: "",
    last_test_status: "untested",
  });

  const [maskedSecret, setMaskedSecret] = useState<string>("••••••••••••••••");
  const [revealedSecret, setRevealedSecret] = useState<string | null>(null);
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [sendingTestLead, setSendingTestLead] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);

  const [feedbackMsg, setFeedbackMsg] = useState<{
    type: "success" | "error" | "info" | "warning";
    text: string;
    details?: {
      sheetName?: string;
      email?: string;
    };
  } | null>(null);

  // Load initial settings from API
  const loadSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/integrations/google-sheets");
      const json = await res.json();

      if (json.success && json.data) {
        setConfig(json.data);
        setMaskedSecret(json.data.masked_secret || "••••••••••••••••");
        setGeneratedScript(json.data.generated_script || "");
      }
    } catch (err) {
      console.error("Error loading integration settings:", err);
      setFeedbackMsg({
        type: "error",
        text: "Không thể tải cấu hình tích hợp. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // Copy helpers
  const handleCopyScript = () => {
    if (!generatedScript) return;
    navigator.clipboard.writeText(generatedScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleCopySecret = async () => {
    let secretToCopy = revealedSecret;
    if (!secretToCopy) {
      try {
        const res = await fetch("/api/admin/integrations/google-sheets?action=reveal_secret");
        const json = await res.json();
        if (json.success) {
          secretToCopy = json.secret;
          setRevealedSecret(json.secret);
        }
      } catch (err) {}
    }

    if (secretToCopy) {
      navigator.clipboard.writeText(secretToCopy);
      setCopiedSecret(true);
      setTimeout(() => setCopiedSecret(false), 2000);
    }
  };

  // Reveal / Hide Secret
  const handleToggleRevealSecret = async () => {
    if (isSecretRevealed) {
      setIsSecretRevealed(false);
      return;
    }

    if (!revealedSecret) {
      try {
        const res = await fetch("/api/admin/integrations/google-sheets?action=reveal_secret");
        const json = await res.json();
        if (json.success) {
          setRevealedSecret(json.secret);
          setIsSecretRevealed(true);
        }
      } catch (err) {
        setFeedbackMsg({ type: "error", text: "Không thể giải mã secret." });
      }
    } else {
      setIsSecretRevealed(true);
    }
  };

  // Regenerate Secret
  const handleRegenerateSecret = async () => {
    const confirm = window.confirm(
      "⚠️ CẢNH BÁO: Khi tạo mã Webhook Secret mới, bạn sẽ cần cập nhật lại mã này vào Apps Script trên Google Sheets để tiếp tục nhận yêu cầu. Bạn có chắc chắn muốn tạo mới?"
    );
    if (!confirm) return;

    try {
      setRegenerating(true);
      setFeedbackMsg(null);

      const res = await fetch("/api/admin/integrations/google-sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate_secret" }),
      });

      const json = await res.json();
      if (json.success) {
        setRevealedSecret(json.secret);
        setMaskedSecret(json.masked_secret);
        setIsSecretRevealed(true);
        setGeneratedScript(json.generated_script);
        setFeedbackMsg({
          type: "success",
          text: "Đã tạo mã Webhook Secret mới! Vui lòng copy và cập nhật vào Apps Script.",
        });
      } else {
        throw new Error(json.error || "Lỗi tạo secret.");
      }
    } catch (err: any) {
      setFeedbackMsg({ type: "error", text: err.message || "Lỗi tạo secret mới." });
    } finally {
      setRegenerating(false);
    }
  };

  // Save Configuration
  const handleSaveConfig = async (e?: React.FormEvent, customConfig?: Partial<GoogleSheetsIntegrationConfig>) => {
    if (e) e.preventDefault();
    setSaving(true);
    setFeedbackMsg(null);

    const merged = { ...config, ...(customConfig || {}) };

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (merged.notification_email && !emailRegex.test(merged.notification_email.trim())) {
      setFeedbackMsg({
        type: "error",
        text: "Địa chỉ email nhận thông báo không hợp lệ. Vui lòng kiểm tra lại.",
      });
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/integrations/google-sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save",
          ...merged,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setConfig(json.data);
        setFeedbackMsg({
          type: "success",
          text: `Đã lưu cấu hình thành công! Email thông báo: "${json.data?.notification_email}" đã được cập nhật.`,
          details: {
            sheetName: json.data?.google_sheet_name,
            email: json.data?.notification_email,
          },
        });
      } else {
        throw new Error(json.error || "Lỗi lưu cấu hình.");
      }
    } catch (err: any) {
      setFeedbackMsg({ type: "error", text: err.message || "Lỗi lưu cấu hình." });
    } finally {
      setSaving(false);
    }
  };

  // Test Connection
  const handleTestConnection = async () => {
    if (!config.apps_script_url) {
      setFeedbackMsg({
        type: "error",
        text: "Vui lòng nhập Apps Script Web App URL trước khi kiểm tra.",
      });
      return;
    }

    setTesting(true);
    setFeedbackMsg(null);

    try {
      const res = await fetch("/api/admin/integrations/google-sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test_connection",
          ...config,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setConfig((prev) => ({
          ...prev,
          last_test_status: "success",
          last_tested_at: json.last_tested_at,
          last_test_error: undefined,
        }));
        setFeedbackMsg({
          type: "success",
          text: `✅ Kết nối thành công! Bảng tính: "${json.spreadsheetName || "Google Spreadsheet"}", Trang tính: "${json.sheetName || config.google_sheet_name}".`,
          details: {
            sheetName: json.sheetName || config.google_sheet_name,
            email: config.notification_email,
          },
        });
      } else {
        setConfig((prev) => ({
          ...prev,
          last_test_status: "error",
          last_tested_at: json.last_tested_at,
          last_test_error: json.error,
        }));
        setFeedbackMsg({
          type: "error",
          text: `❌ Kết nối thất bại: ${json.error}`,
        });
      }
    } catch (err: any) {
      setFeedbackMsg({
        type: "error",
        text: err.message || "Không thể gửi yêu cầu kiểm tra kết nối.",
      });
    } finally {
      setTesting(false);
    }
  };

  // Send Test Lead
  const handleSendTestLead = async () => {
    if (!config.apps_script_url) {
      setFeedbackMsg({
        type: "error",
        text: "Vui lòng nhập Apps Script Web App URL trước khi gửi lead thử.",
      });
      return;
    }

    const cleanEmail = config.notification_email?.trim();
    if (!cleanEmail) {
      setFeedbackMsg({
        type: "error",
        text: "Vui lòng nhập Email nhận thông báo trước khi gửi lead thử.",
      });
      return;
    }

    const confirm = window.confirm(
      `Hành động này sẽ tự động LƯU cấu hình hiện tại, thêm một hàng mới [Khách test Kiho (Admin)] vào Google Sheet và gửi email thử nghiệm tới "${cleanEmail}". Bạn có muốn tiếp tục?`
    );
    if (!confirm) return;

    setSendingTestLead(true);
    setFeedbackMsg(null);

    try {
      const res = await fetch("/api/admin/integrations/google-sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send_test_lead",
          ...config,
          notification_email: cleanEmail,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setFeedbackMsg({
          type: "success",
          text: "✓ Cấu hình đã được lưu và Lead thử nghiệm đã được gửi thành công!",
          details: {
            sheetName: json.sheetName || config.google_sheet_name,
            email: json.notificationEmail || cleanEmail,
          },
        });
      } else {
        if (json.sheetSaved && !json.emailSent) {
          setFeedbackMsg({
            type: "warning",
            text: `⚠️ Lead đã được ghi vào Google Sheet nhưng gửi email thông báo thất bại: ${json.error}`,
            details: {
              sheetName: config.google_sheet_name,
              email: cleanEmail,
            },
          });
        } else {
          throw new Error(json.error || "Gửi lead thử nghiệm thất bại.");
        }
      }
    } catch (err: any) {
      setFeedbackMsg({
        type: "error",
        text: err.message || "Lỗi khi gửi lead thử nghiệm.",
      });
    } finally {
      setSendingTestLead(false);
    }
  };

  // Calculate Progress Checklist
  const calculateProgress = () => {
    let completed = 0;
    if (config.google_sheet_id?.trim()) completed++;
    if (generatedScript) completed++;
    if (config.apps_script_url?.trim()) completed++;
    if (config.notification_email?.trim()) completed++;
    if (config.last_test_status === "success") completed++;
    return completed;
  };

  const progressCount = calculateProgress();

  // Status Badge Helper
  const renderStatusBadge = () => {
    if (!config.apps_script_url) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          Chưa thiết lập
        </span>
      );
    }

    if (config.last_test_status === "success") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          Kết nối thành công
        </span>
      );
    }

    if (config.last_test_status === "error") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-mono font-bold border border-rose-200">
          <span className="w-2 h-2 rounded-full bg-rose-600" />
          Có lỗi kết nối
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold border border-blue-200">
        <span className="w-2 h-2 rounded-full bg-blue-600" />
        Đã cấu hình (Chưa test)
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 space-y-3">
        <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-medium">Đang tải thông tin tích hợp Google Sheets...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Tích hợp Google Sheets
            </h1>
            {renderStatusBadge()}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Lưu tự động yêu cầu thuê máy vào Google Sheets và gửi email thông báo cho Kiho ngay khi có khách mới.
          </p>
        </div>

        {/* Global Save Button */}
        <button
          onClick={() => handleSaveConfig()}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Đang lưu..." : "Lưu tất cả cấu hình"}</span>
        </button>
      </div>

      {/* 2. Feedback Alert Message */}
      {feedbackMsg && (
        <div
          className={`p-4 rounded-2xl flex flex-col gap-2 text-sm animate-fadeIn ${
            feedbackMsg.type === "success"
              ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
              : feedbackMsg.type === "error"
              ? "bg-rose-50 text-rose-900 border border-rose-200"
              : feedbackMsg.type === "warning"
              ? "bg-amber-50 text-amber-900 border border-amber-200"
              : "bg-blue-50 text-blue-900 border border-blue-200"
          }`}
        >
          <div className="flex items-start gap-3">
            {feedbackMsg.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : feedbackMsg.type === "warning" ? (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 font-semibold">{feedbackMsg.text}</div>
          </div>

          {/* Detailed Verification Info */}
          {feedbackMsg.details && (
            <div className="ml-8 p-3 rounded-xl bg-white/80 border border-emerald-200/60 font-mono text-xs space-y-1 text-slate-700">
              {feedbackMsg.details.sheetName && (
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Google Sheet: <strong>{feedbackMsg.details.sheetName}</strong></span>
                </div>
              )}
              {feedbackMsg.details.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Email thông báo hoạt động: <strong>{feedbackMsg.details.email}</strong></span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. Progress Checklist & Architecture Overview */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Layers className="w-4 h-4 text-brand-500" />
            <span>Tiến độ cài đặt ({progressCount}/5 bước hoàn tất)</span>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {progressCount === 5 ? "🎉 Sẵn sàng hoạt động 100%" : "Cần hoàn thiện các bước bên dưới"}
          </span>
        </div>

        {/* 5 Step Progress Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs font-mono">
          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${config.google_sheet_id ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-slate-50 border-slate-200 text-slate-500"}`}>
            {config.google_sheet_id ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">1</span>}
            <span className="truncate">1. Sheet ID</span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${generatedScript ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-slate-50 border-slate-200 text-slate-500"}`}>
            {generatedScript ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">2</span>}
            <span className="truncate">2. Apps Script</span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${config.apps_script_url ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-slate-50 border-slate-200 text-slate-500"}`}>
            {config.apps_script_url ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">3</span>}
            <span className="truncate">3. Web App URL</span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${config.notification_email ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-slate-50 border-slate-200 text-slate-500"}`}>
            {config.notification_email ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">4</span>}
            <span className="truncate">4. Email</span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${config.last_test_status === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-slate-50 border-slate-200 text-slate-500"}`}>
            {config.last_test_status === "success" ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">5</span>}
            <span className="truncate">5. Kết nối test</span>
          </div>
        </div>

        {/* Visual Architecture Flow Diagram */}
        <div className="pt-2 text-xs font-mono text-slate-600 flex flex-wrap items-center justify-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <span className="font-bold text-slate-900">Khách gửi Form</span>
          <span>&rarr;</span>
          <span className="font-bold text-brand-600">Next.js Server (Lấy Email Admin)</span>
          <span>&rarr;</span>
          <span className="font-bold text-amber-700">Apps Script Webhook</span>
          <span>&rarr;</span>
          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Google Sheets</span>
          <span>+</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Email tức thì</span>
        </div>
      </div>

      {/* 4. STEP-BY-STEP SETUP WIZARD */}
      <div className="space-y-6">
        
        {/* ================================================================= */}
        {/* BƯỚC 1: TẠO GOOGLE SHEET & LẤY SHEET ID */}
        {/* ================================================================= */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
              01
            </div>
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Tạo Google Sheet & Nhập Sheet ID
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Mở Google Sheets, tạo một file mới để lưu danh sách yêu cầu thuê máy ảnh.
              </p>
            </div>
          </div>

          {/* Guide Box with Visual URL Breakdown */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-700 space-y-2">
            <p className="font-semibold text-slate-900">
              💡 Cách lấy Sheet ID từ đường dẫn trình duyệt:
            </p>
            <div className="p-3 bg-white border border-slate-200 rounded-lg font-mono text-[11px] break-all leading-relaxed">
              https://docs.google.com/spreadsheets/d/
              <span className="bg-amber-200 text-amber-900 px-1 py-0.5 rounded font-bold border border-amber-300">
                1abcDEFxxxxxxx_SHEET_ID_CUA_BAN
              </span>
              /edit
            </div>
            <p className="text-slate-500 text-[11px]">
              Chỉ copy phần mã ký tự nằm ở giữa <code className="bg-slate-200 px-1 rounded">/d/</code> và <code className="bg-slate-200 px-1 rounded">/edit</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Google Sheet ID *
              </label>
              <input
                type="text"
                value={config.google_sheet_id}
                onChange={(e) => setConfig({ ...config, google_sheet_id: e.target.value })}
                placeholder="Ví dụ: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tên sheet / tab hiển thị
              </label>
              <input
                type="text"
                value={config.google_sheet_name}
                onChange={(e) => setConfig({ ...config, google_sheet_name: e.target.value })}
                placeholder="Rental Requests"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500 font-mono"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                Nếu tab chưa có sẵn, Apps Script sẽ tự động tạo khi có request đầu tiên.
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BƯỚC 2: CÀI GOOGLE APPS SCRIPT */}
        {/* ================================================================= */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
              02
            </div>
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Cài Google Apps Script vào Google Sheets
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Trên Google Sheets của bạn: vào <strong>Tiện ích mở rộng (Extensions) &rarr; Apps Script</strong>, xóa code cũ và dán toàn bộ đoạn mã bên dưới.
              </p>
            </div>
          </div>

          {/* Webhook Secret Management Box */}
          <div className="p-4 rounded-xl bg-[#faf8f4] border border-[#e8e2d7] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-bold text-ink-900 uppercase block">
                  🔒 Mã bảo mật Webhook (Shared Secret)
                </span>
                <span className="text-[11px] text-ink-600">
                  Cài vào <strong>Cài đặt dự án &rarr; Thuộc tính tập lệnh: RENTAL_REQUEST_WEBHOOK_SECRET</strong>.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleRevealSecret}
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg shadow-2xs cursor-pointer"
                >
                  {isSecretRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isSecretRevealed ? "Ẩn" : "Hiện"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySecret}
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg shadow-2xs cursor-pointer"
                >
                  {copiedSecret ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSecret ? "Đã copy" : "Copy"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRegenerateSecret}
                  disabled={regenerating}
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-rose-700 hover:text-rose-900 bg-rose-50 border border-rose-200 px-2.5 py-1.5 rounded-lg shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${regenerating ? "animate-spin" : ""}`} />
                  <span>Tạo mới</span>
                </button>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-[#e2dbcf] font-mono text-xs text-slate-900 select-all">
              {isSecretRevealed && revealedSecret ? revealedSecret : maskedSecret}
            </div>
          </div>

          {/* Generated Code Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                Mã nguồn Apps Script (Đã tối ưu kết nối và xác thực email tự động):
              </span>

              <button
                type="button"
                onClick={handleCopyScript}
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-brand-500 text-white text-xs font-mono font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript ? "ĐÃ SAO CHÉP MÃ ✓" : "SAO CHÉP MÃ APPS SCRIPT"}</span>
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] leading-relaxed max-h-72 overflow-y-auto border border-slate-800 select-all">
                <code>{generatedScript || "// Đang tạo mã Apps Script..."}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BƯỚC 3: TRIỂN KHAI WEB APP & DÁN URL */}
        {/* ================================================================= */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
              03
            </div>
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Triển khai Web App (Deploy) & Nhập Web App URL
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Trên thanh công cụ Apps Script: bấm <strong>Triển khai (Deploy) &rarr; Tùy chọn triển khai mới (New deployment)</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="space-y-1">
              <span className="font-semibold text-slate-900 block">1. Loại triển khai:</span>
              <span className="text-slate-600">Chọn <strong>Ứng dụng web (Web App)</strong></span>
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-slate-900 block">2. Thực thi dưới dạng (Execute as):</span>
              <span className="text-slate-600">Chọn <strong>Tôi (Me)</strong></span>
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-slate-900 block">3. Ai có quyền truy cập (Who has access):</span>
              <span className="text-emerald-700 font-bold">Bắt buộc chọn: Bất kỳ ai (Anyone)</span>
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-slate-900 block">4. Cấp quyền:</span>
              <span className="text-slate-600">Chọn <em>Nâng cao &rarr; Đi tới dự án &rarr; Cho phép</em></span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Apps Script Web App URL *
            </label>
            <input
              type="url"
              value={config.apps_script_url}
              onChange={(e) => setConfig({ ...config, apps_script_url: e.target.value })}
              placeholder="https://script.google.com/macros/s/AKfycbxxxxxxx/exec"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500 font-mono"
            />
            <span className="text-[11px] text-slate-400 block mt-1">
              Dán URL mà Google Apps Script cung cấp sau khi bạn nhấn nút Triển khai.
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BƯỚC 4: EMAIL NHẬN THÔNG BÁO TỨC THÌ */}
        {/* ================================================================= */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
              04
            </div>
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Email Nhận Thông Báo Tức Thì (Single Source of Truth)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Kiho Camera sẽ gửi thông báo lead mới tới email này. <strong>Bạn có thể thay đổi bất cứ lúc nào tại đây mà không cần triển khai lại Apps Script.</strong>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              Địa chỉ Email của Kiho Camera *
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="email"
                required
                value={config.notification_email}
                onChange={(e) => setConfig({ ...config, notification_email: e.target.value })}
                placeholder="hoangquocbao011105@gmail.com"
                className="w-full sm:max-w-md px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500 font-mono"
              />
              <button
                type="button"
                onClick={() => handleSaveConfig(undefined, { notification_email: config.notification_email })}
                disabled={saving}
                className="inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-brand-500 disabled:opacity-50 text-white font-mono font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? "Đang lưu..." : "Lưu Email"}</span>
              </button>
            </div>
            <span className="text-[11px] text-slate-400 block">
              Email nhận tin sẽ có định dạng dễ đọc, kèm nút bấm gọi điện thoại ngay và mở Zalo cho khách.
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BƯỚC 5: KIỂM TRA KẾT NỐI & KÍCH HOẠT */}
        {/* ================================================================= */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
              05
            </div>
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Kiểm Tra Kết Nối & Kích Hoạt Hệ Thống
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Kiểm tra xem website có thể kết nối thông suốt tới Google Sheets và gửi email thông báo hay không.
              </p>
            </div>
          </div>

          {/* Integration Health Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">TRẠNG THÁI TÍCH HỢP:</span>
              {renderStatusBadge()}
            </div>
            <div className="text-slate-600">
              <span>Bảng tính đích: </span>
              <strong>{config.google_sheet_name || "Rental Requests"}</strong>
            </div>
            <div className="text-slate-600">
              <span>Email nhận tin đang lưu: </span>
              <strong className="text-brand-600">{config.notification_email || "Chưa cấu hình"}</strong>
            </div>
            {config.last_tested_at && (
              <div className="text-slate-500 text-[11px]">
                <span>Lần kiểm tra cuối: </span>
                <span>{new Date(config.last_tested_at).toLocaleString("vi-VN")}</span>
              </div>
            )}
            {config.last_test_error && (
              <div className="text-rose-600 text-[11px] p-2 bg-rose-50 rounded border border-rose-200">
                <strong>Chi tiết lỗi:</strong> {config.last_test_error}
              </div>
            )}
          </div>

          {/* Enable Toggle & Test Buttons */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            {/* Toggle switch */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                  Bật nhận yêu cầu thuê qua Google Sheets
                </span>
                <span className="text-slate-500 text-[11px]">
                  Khi bật, form trên website sẽ tự động đẩy dữ liệu sang Google Sheets và gửi email.
                </span>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.enabled}
                  onChange={(e) => {
                    const newEnabled = e.target.checked;
                    setConfig({ ...config, enabled: newEnabled });
                    handleSaveConfig(undefined, { enabled: newEnabled });
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Actions Row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Test Connection Button */}
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testing || saving}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-mono font-bold text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testing ? "animate-spin" : ""}`} />
                <span>{testing ? "ĐANG KIỂM TRA..." : "KIỂM TRA KẾT NỐI"}</span>
              </button>

              {/* Send Test Lead Button */}
              <button
                type="button"
                onClick={handleSendTestLead}
                disabled={sendingTestLead || saving}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 disabled:opacity-50 text-slate-800 border border-slate-300 font-mono font-bold text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-2xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-brand-600" />
                <span>{sendingTestLead ? "ĐANG GỬI LEAD..." : "GỬI LEAD THỬ NGHIỆM"}</span>
              </button>

              {/* Save Configuration Button */}
              <button
                type="button"
                onClick={() => handleSaveConfig()}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-mono font-bold text-xs uppercase px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer ml-auto"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? "ĐANG LƯU..." : "LƯU CẤU HÌNH"}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
