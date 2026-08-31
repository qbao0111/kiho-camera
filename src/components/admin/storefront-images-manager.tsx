"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Trash2,
  Star,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Camera,
  Sparkles,
} from "lucide-react";
import { StorefrontImage } from "@/types/database";

export function StorefrontImagesManager() {
  const [images, setImages] = useState<StorefrontImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/storefront-images");
      if (res.ok) {
        const data = await res.json();
        if (data.images) {
          setImages(data.images);
        }
      }
    } catch (err) {
      console.error("Error fetching storefront images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const showFeedback = (type: "success" | "error", text: string) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Upload handler (multi-file support)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "storefront");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.error || "Upload ảnh thất bại");
        }

        // Add to storefront_images table
        const isFirst = images.length === 0 && i === 0;
        const addRes = await fetch("/api/admin/storefront-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image_url: uploadData.url,
            alt_text: "Mặt tiền Kiho Camera tại 48 Ngô Quyền, Đồng Hới",
            sort_order: images.length + i,
            is_cover: isFirst,
            is_active: true,
          }),
        });

        if (addRes.ok) {
          successCount++;
        }
      } catch (err: any) {
        showFeedback("error", err.message || `Lỗi tải lên ảnh ${file.name}`);
      }
    }

    if (successCount > 0) {
      showFeedback("success", `Đã tải lên thành công ${successCount} ảnh cửa hàng!`);
      await fetchImages();
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Update single field
  const handleUpdate = async (id: string, updates: Partial<StorefrontImage>) => {
    setSavingId(id);
    try {
      const res = await fetch(`/api/admin/storefront-images/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Không thể cập nhật");
      }

      setImages((prev) =>
        prev.map((img) => {
          if (img.id === id) {
            return { ...img, ...updates };
          }
          if (updates.is_cover && img.id !== id) {
            return { ...img, is_cover: false };
          }
          return img;
        })
      );
      showFeedback("success", "Đã lưu thay đổi ảnh!");
    } catch (err: any) {
      showFeedback("error", err.message || "Lỗi cập nhật ảnh");
    } finally {
      setSavingId(null);
    }
  };

  // Reorder up/down
  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;

    setImages(newImages);

    // Persist new sort_order
    try {
      await Promise.all([
        fetch(`/api/admin/storefront-images/${newImages[index].id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sort_order: index }),
        }),
        fetch(`/api/admin/storefront-images/${newImages[targetIndex].id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sort_order: targetIndex }),
        }),
      ]);
    } catch (err) {
      console.error("Reorder error:", err);
    }
  };

  // Delete
  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Bạn có chắc muốn xóa ảnh cửa hàng này không?")) return;

    try {
      const res = await fetch(`/api/admin/storefront-images/${id}?image_url=${encodeURIComponent(imageUrl)}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Lỗi xóa ảnh");
      }

      setImages((prev) => prev.filter((img) => img.id !== id));
      showFeedback("success", "Đã xóa ảnh cửa hàng thành công!");
    } catch (err: any) {
      showFeedback("error", err.message || "Lỗi xóa ảnh");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-orange-500" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Ảnh cửa hàng & Nhận diện địa điểm
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Thêm ảnh mặt tiền, biển hiệu Kiho Camera, cửa ra vào hoặc không gian bên trong để khách dễ nhận diện cửa hàng khi đến nhận máy tại 48 Ngô Quyền, Đồng Hới.
          </p>
        </div>

        {/* Upload Button */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileUpload}
            className="hidden"
            id="storefront-upload-input"
          />
          <label
            htmlFor="storefront-upload-input"
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-black transition-colors cursor-pointer shadow-xs min-h-[42px] ${
              uploading ? "opacity-70 pointer-events-none" : ""
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang tải ảnh lên...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Thêm ảnh cửa hàng</span>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Feedback message */}
      {feedback && (
        <div
          className={`mx-5 sm:mx-6 mt-4 p-3 rounded-lg flex items-center gap-2 text-xs ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Image Grid / List */}
      <div className="p-5 sm:p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-slate-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
            <span className="text-xs">Đang tải danh sách ảnh cửa hàng...</span>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
              <Camera className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-800">Chưa có ảnh cửa hàng nào</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Hãy tải lên từ 1–4 ảnh chụp thực tế mặt tiền 48 Ngô Quyền, biển hiệu Kiho Camera và kệ máy để tạo niềm tin cho khách hàng.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className={`flex flex-col md:flex-row gap-4 p-4 rounded-xl border transition-all ${
                  img.is_cover
                    ? "border-orange-300 bg-orange-50/30 shadow-xs"
                    : img.is_active
                    ? "border-slate-200 bg-white"
                    : "border-slate-200 bg-slate-50 opacity-60"
                }`}
              >
                {/* Image Thumbnail */}
                <div className="relative w-full md:w-44 aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <Image
                    src={img.image_url}
                    alt={img.alt_text || "Ảnh cửa hàng Kiho Camera"}
                    fill
                    sizes="(max-width: 768px) 100vw, 176px"
                    className="object-cover"
                  />

                  {img.is_cover && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      Ảnh chính (Cover)
                    </span>
                  )}
                </div>

                {/* Form Inputs for Metadata */}
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-700">
                        Mô tả ảnh (Alt Text cho SEO & nhận diện)
                      </label>
                      <input
                        type="text"
                        defaultValue={img.alt_text || ""}
                        onBlur={(e) => {
                          if (e.target.value !== img.alt_text) {
                            handleUpdate(img.id, { alt_text: e.target.value });
                          }
                        }}
                        placeholder="Ví dụ: Mặt tiền Kiho Camera tại 48 Ngô Quyền, Đồng Hới"
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-700">
                        Chú thích hiển thị (Caption - Không bắt buộc)
                      </label>
                      <input
                        type="text"
                        defaultValue={img.caption || ""}
                        onBlur={(e) => {
                          if (e.target.value !== img.caption) {
                            handleUpdate(img.id, { caption: e.target.value });
                          }
                        }}
                        placeholder="Ví dụ: Biển hiệu Kiho sáng đèn đón khách nhận máy"
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* Actions & Toggles */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs">
                    {/* Left Actions: Cover, Active, Sort */}
                    <div className="flex items-center gap-2">
                      {/* Set Cover */}
                      <button
                        type="button"
                        onClick={() => handleUpdate(img.id, { is_cover: true })}
                        disabled={img.is_cover || savingId === img.id}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                          img.is_cover
                            ? "text-orange-600 bg-orange-100/80 cursor-default"
                            : "text-slate-600 hover:text-orange-600 hover:bg-orange-50 border border-slate-200"
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${img.is_cover ? "fill-orange-500 text-orange-500" : ""}`} />
                        <span>{img.is_cover ? "Đang là ảnh chính" : "Đặt làm ảnh chính"}</span>
                      </button>

                      {/* Active Toggle */}
                      <button
                        type="button"
                        onClick={() => handleUpdate(img.id, { is_active: !img.is_active })}
                        disabled={savingId === img.id}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium border transition-colors ${
                          img.is_active
                            ? "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
                            : "text-slate-500 bg-slate-100 border-slate-200 hover:bg-slate-200"
                        }`}
                      >
                        {img.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{img.is_active ? "Đang hiển thị" : "Đang ẩn"}</span>
                      </button>
                    </div>

                    {/* Right Actions: Order & Delete */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMove(idx, "up")}
                        disabled={idx === 0}
                        aria-label="Chuyển ảnh lên trên"
                        className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(idx, "down")}
                        disabled={idx === images.length - 1}
                        aria-label="Chuyển ảnh xuống dưới"
                        className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(img.id, img.image_url)}
                        aria-label="Xóa ảnh cửa hàng"
                        className="w-8 h-8 rounded border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center justify-center ml-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
