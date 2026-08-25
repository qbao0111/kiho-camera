"use client";

import React, { useState } from "react";
import { Save, CheckCircle, AlertCircle, Phone, MapPin, Globe, Image as ImageIcon, MessageCircle } from "lucide-react";
import { SiteSettings } from "@/types/database";
import { MOCK_SITE_SETTINGS } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/client";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(MOCK_SITE_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const supabase = createClient();
      if (supabase) {
        const { error } = await supabase
          .from("site_settings")
          .upsert({ id: 1, ...settings, updated_at: new Date().toISOString() });
        if (error) throw error;
      }

      setMsg({ type: "success", text: "Đã lưu thông tin cấu hình website thành công!" });
    } catch (err: any) {
      setMsg({ type: "error", text: err.message || "Lỗi lưu cấu hình" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Cài đặt nội dung Website & Liên hệ
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Tùy chỉnh thông tin liên hệ, hotline, link Messenger Fanpage, tiêu đề Hero và SEO chung.
        </p>
      </div>

      {msg && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-2 text-sm ${
            msg.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {msg.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600" />
          )}
          <span>{msg.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Liên hệ & Mạng xã hội */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-brand-500" />
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
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
                placeholder="0912 345 678"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
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
                placeholder="07:30 - 21:00 (Hàng ngày)"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Địa chỉ cửa hàng (Đồng Hới, Quảng Bình) *
              </label>
              <input
                type="text"
                required
                value={settings.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Thành phố Đồng Hới, Tỉnh Quảng Bình"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Link Google Maps
              </label>
              <input
                type="text"
                value={settings.maps_url}
                onChange={(e) => handleChange("maps_url", e.target.value)}
                placeholder="https://maps.google.com/?q=..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Hero Section Trang Chủ */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-brand-500" />
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold text-sm px-7 py-3 rounded-xl shadow transition-all active:scale-[0.98]"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Đang lưu cấu hình..." : "Lưu tất cả cài đặt"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
