"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, FolderTree, CheckCircle, AlertCircle, Save } from "lucide-react";
import { Category } from "@/types/database";
import { MOCK_CATEGORIES } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setName("");
    setSlug("");
    setDescription("");
    setSortOrder(categories.length + 1);
    setIsActive(true);
  };

  const handleEdit = (cat: Category) => {
    setIsEditing(true);
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || "");
    setSortOrder(cat.sort_order);
    setIsActive(cat.is_active);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    const payload: Category = {
      id: editingId || `cat-${Date.now()}`,
      name,
      slug: slug || slugify(name),
      description,
      icon: "Camera",
      sort_order: Number(sortOrder),
      is_active: isActive,
    };

    try {
      const supabase = createClient();
      if (supabase) {
        if (editingId) {
          await supabase.from("categories").update(payload).eq("id", editingId);
        } else {
          await supabase.from("categories").insert(payload);
        }
      }

      if (editingId) {
        setCategories(categories.map((c) => (c.id === editingId ? payload : c)));
      } else {
        setCategories([...categories, payload]);
      }

      setMsg({ type: "success", text: "Đã lưu danh mục thành công!" });
      resetForm();
    } catch (err: any) {
      setMsg({ type: "error", text: err.message || "Lỗi khi lưu danh mục" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xoá danh mục này?")) return;
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.from("categories").delete().eq("id", id);
      }
      setCategories(categories.filter((c) => c.id !== id));
      setMsg({ type: "success", text: "Đã xoá danh mục." });
    } catch (err: any) {
      setMsg({ type: "error", text: "Lỗi xoá danh mục." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Quản lý danh mục thiết bị
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Cấu hình phân loại máy ảnh, ống kính, máy quay, gimbal và phụ kiện.
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
            <span>Thêm danh mục</span>
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

      {/* Editing Form Modal / Inline Box */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-2xl p-6 border-2 border-brand-500 shadow-md space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 text-base">
              {editingId ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-slate-400 hover:text-slate-700"
            >
              Huỷ bỏ
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên danh mục *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!editingId) setSlug(slugify(e.target.value));
                }}
                placeholder="VD: Máy ảnh"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Đường dẫn (Slug) *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="may-anh"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Thứ tự
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mô tả ngắn
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả tóm tắt..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-brand-500 rounded border-slate-300"
              />
              <span className="text-xs font-medium text-slate-700">Đang hoạt động (Hiển thị)</span>
            </label>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-brand-500 text-white font-bold text-xs px-5 py-2 rounded-xl hover:bg-brand-600 shadow"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu danh mục</span>
            </button>
          </div>
        </form>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-[11px] font-bold">
            <tr>
              <th className="py-3 px-4">Thứ tự</th>
              <th className="py-3 px-4">Tên danh mục</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Mô tả</th>
              <th className="py-3 px-4 text-center">Trạng thái</th>
              <th className="py-3 px-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-400">#{cat.sort_order}</td>
                <td className="py-3 px-4 font-bold text-slate-900">{cat.name}</td>
                <td className="py-3 px-4 text-slate-500 font-mono text-xs">{cat.slug}</td>
                <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                  {cat.description || "—"}
                </td>
                <td className="py-3 px-4 text-center">
                  {cat.is_active ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Hoạt động
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                      Ẩn
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="p-1.5 text-slate-600 hover:text-brand-600 rounded-lg hover:bg-slate-100"
                      title="Sửa"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                      title="Xoá"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
