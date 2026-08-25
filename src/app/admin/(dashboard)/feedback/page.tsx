"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Star, Sparkles, CheckCircle, AlertCircle, Save } from "lucide-react";
import { Feedback } from "@/types/database";
import { MOCK_FEEDBACK } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/client";

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(MOCK_FEEDBACK);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [feedbackDate, setFeedbackDate] = useState(new Date().toISOString().split("T")[0]);
  const [isFeatured, setIsFeatured] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setCustomerName("");
    setContent("");
    setImageUrl("");
    setFeedbackDate(new Date().toISOString().split("T")[0]);
    setIsFeatured(true);
    setIsActive(true);
  };

  const handleEdit = (fb: Feedback) => {
    setIsEditing(true);
    setEditingId(fb.id);
    setCustomerName(fb.customer_name);
    setContent(fb.content);
    setImageUrl(fb.image_url || "");
    setFeedbackDate(fb.feedback_date);
    setIsFeatured(fb.is_featured);
    setIsActive(fb.is_active);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    const payload: Feedback = {
      id: editingId || `fb-${Date.now()}`,
      customer_name: customerName,
      content,
      image_url: imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      equipment_id: null,
      feedback_date: feedbackDate,
      is_featured: isFeatured,
      is_active: isActive,
      sort_order: 1,
    };

    try {
      const supabase = createClient();
      if (supabase) {
        if (editingId) {
          await supabase.from("feedback").update(payload).eq("id", editingId);
        } else {
          await supabase.from("feedback").insert(payload);
        }
      }

      if (editingId) {
        setFeedbacks(feedbacks.map((f) => (f.id === editingId ? payload : f)));
      } else {
        setFeedbacks([...feedbacks, payload]);
      }

      setMsg({ type: "success", text: "Đã lưu đánh giá feedback!" });
      resetForm();
    } catch (err: any) {
      setMsg({ type: "error", text: "Lỗi khi lưu feedback." });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xoá feedback này?")) return;
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.from("feedback").delete().eq("id", id);
      }
      setFeedbacks(feedbacks.filter((f) => f.id !== id));
      setMsg({ type: "success", text: "Đã xoá feedback." });
    } catch (err: any) {
      setMsg({ type: "error", text: "Lỗi xoá feedback." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Quản lý Feedback khách hàng
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Thêm, sửa và ghim các đánh giá & hình ảnh chụp thực tế từ khách thuê máy.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => {
              resetForm();
              setIsEditing(true);
            }}
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm feedback mới</span>
          </button>
        )}
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
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          )}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Editing Form */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-2xl p-6 border-2 border-brand-500 shadow-md space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 text-base">
              {editingId ? "Chỉnh sửa feedback" : "Thêm feedback mới"}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-slate-400 hover:text-slate-700"
            >
              Huỷ bỏ
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên khách hàng / Nickname *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="VD: Hoàng Yến (Hà Nội)"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ngày đánh giá
              </label>
              <input
                type="date"
                value={feedbackDate}
                onChange={(e) => setFeedbackDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nội dung nhận xét *
            </label>
            <textarea
              rows={3}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Cảm nhận của khách khi thuê máy..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              URL ảnh khách chụp / Avatar
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-brand-500 rounded"
                />
                <span className="text-xs font-medium text-slate-700">Hiển thị công khai</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-brand-500 rounded"
                />
                <span className="text-xs font-medium text-slate-700">Ghim trang chủ</span>
              </label>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-brand-500 text-white font-bold text-xs px-5 py-2 rounded-xl hover:bg-brand-600 shadow"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu feedback</span>
            </button>
          </div>
        </form>
      )}

      {/* Feedback Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {fb.is_featured && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Trang chủ
                    </span>
                  )}
                  {fb.is_active ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Hiện
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Ẩn
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 italic">
                "{fb.content}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {fb.image_url && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                    <Image src={fb.image_url} alt={fb.customer_name} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <div className="font-bold text-slate-900 text-xs">{fb.customer_name}</div>
                  <div className="text-[10px] text-slate-400">{fb.feedback_date}</div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(fb)}
                  className="p-1 text-slate-500 hover:text-brand-600 rounded"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(fb.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
