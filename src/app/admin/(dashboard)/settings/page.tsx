"use client";

import React, { useState, useEffect } from "react";
import { Save, CheckCircle, AlertCircle, Phone, MapPin, Globe, Image as ImageIcon, MessageCircle, Loader2 } from "lucide-react";
import { SiteSettings } from "@/types/database";
import { MOCK_SITE_SETTINGS } from "@/lib/mock-data";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(MOCK_SITE_SETTINGS);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            setSettings(data.settings);
          }
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setInitialLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Không thể lưu cài đặt");
      }

      setMsg({ type: "success", text: "Đã lưu thông tin cấu hình website thành công!" });
      setTimeout(() => {
        setMsg(null);
      }, 5000);
    } catch (err: any) {
      setMsg({ type: "error", text: err.message || "Lỗi lưu cấu hình" });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-slate-500 gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
        <span className="text-sm font-medium">Đang tải cài đặt website...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      {/* Top Header with Prominent Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            Cài đặt nội dung Website & Liên hệ
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tùy chỉnh thông tin liên hệ, hotline, link Messenger Fanpage, tiêu đề Hero và SEO chung.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleSave()}
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-all shrink-0 cursor-pointer"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{loading ? "Đang lưu..." : "Lưu tất cả cài đặt"}</span>
        </button>
      </div>

      {msg && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-2 text-sm transition-all ${
            msg.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {msg.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span className="font-medium">{msg.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Liên hệ & Mạng xã hội */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-orange-500" />
            <span>Kênh liên hệ & Chốt đơn</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Link Messenger (CTA chính) *
              </label>
              <input
                type="url"
                required
                value={settings.messenger_url}
                onChange={(e) => handleChange("messenger_url", e.target.value)}
                placeholder="https://m.me/kihocameradonghoi"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Link Facebook Fanpage
              </label>
              <input
                type="url"
                required
                value={settings.facebook_url}
                onChange={(e) => handleChange("facebook_url", e.target.value)}
                placeholder="https://facebook.com/kihocameradonghoi"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Số điện thoại Hotline *
              </label>
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="0387 274 669"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Giờ mở cửa phục vụ
              </label>
              <input
                type="text"
                value={settings.opening_hours}
                onChange={(e) => handleChange("opening_hours", e.target.value)}
                placeholder="07:30 – 21:00 (Tất cả các ngày trong tuần)"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Địa chỉ cửa hàng (Đồng Hới, Quảng Bình) *
              </label>
              <input
                type="text"
                required
                value={settings.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="48 Ngô Quyền, TP. Đồng Hới, Tỉnh Quảng Bình"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Link Google Maps (Nút mở ngoài)
              </label>
              <input
                type="text"
                value={settings.maps_url}
                onChange={(e) => handleChange("maps_url", e.target.value)}
                placeholder="https://maps.app.goo.gl/... hoặc https://maps.google.com/?q=..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors font-mono"
              />
              <span className="text-[11px] text-slate-500 block">
                Link chia sẻ trang doanh nghiệp Kiho Camera trên Google Maps, dùng cho nút bấm &quot;Mở trong Google Maps&quot;.
              </span>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Link Google Maps Embed (Bản đồ nhúng iframe)
              </label>
              <input
                type="text"
                value={settings.maps_embed_url || ""}
                onChange={(e) => handleChange("maps_embed_url", e.target.value)}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors font-mono"
              />
              <span className="text-[11px] text-slate-500 block leading-relaxed">
                💡 <strong>Cách lấy link:</strong> Mở Google Maps → Tìm Kiho Camera → Chọn Chia sẻ (Share) → Nhúng bản đồ (Embed a map) → Sao chép đường dẫn trong <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">src=&quot;...&quot;</code> của thẻ iframe dán vào đây (hoặc dán cả thẻ iframe, hệ thống sẽ tự trích xuất). Nếu để trống, hệ thống sẽ tự động tìm kiếm theo địa chỉ cửa hàng.
              </span>
            </div>
          </div>
        </div>


        {/* 2. Hero Section Trang Chủ */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-orange-500" />
            <span>Hero Section & Trang chủ</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tiêu đề Hero chính (H1 SEO) *
              </label>
              <input
                type="text"
                required
                value={settings.hero_title}
                onChange={(e) => handleChange("hero_title", e.target.value)}
                placeholder="Cho thuê máy ảnh tại Quảng Bình"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mô tả phụ Hero (Subheadline)
              </label>
              <textarea
                rows={2}
                value={settings.hero_subtitle}
                onChange={(e) => handleChange("hero_subtitle", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                URL ảnh bìa Hero
              </label>
              <input
                type="text"
                value={settings.hero_image}
                onChange={(e) => handleChange("hero_image", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nội dung Giới thiệu (About text)
              </label>
              <textarea
                rows={3}
                value={settings.about_text}
                onChange={(e) => handleChange("about_text", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Văn bản chân trang (Footer Text)
              </label>
              <input
                type="text"
                value={settings.footer_text}
                onChange={(e) => handleChange("footer_text", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <span className="text-xs text-slate-500">Mọi thay đổi sẽ cập nhật trực tiếp lên website chính.</span>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{loading ? "Đang lưu cấu hình..." : "Lưu tất cả cài đặt"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
