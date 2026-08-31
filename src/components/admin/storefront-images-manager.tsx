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
  AlertTriangle,
  Copy,
  Check,
  Camera,
  Link as LinkIcon,
  Plus,
} from "lucide-react";
import { StorefrontImage } from "@/types/database";

const DEFAULT_SQL_MIGRATION = `-- Chạy câu lệnh này trong Supabase Dashboard -> SQL Editor để tạo bảng storefront_images:
CREATE TABLE IF NOT EXISTS public.storefront_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_cover BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.storefront_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active storefront images" ON public.storefront_images;
CREATE POLICY "Public can view active storefront images"
    ON public.storefront_images
    FOR SELECT
    USING (is_active = true);

DROP POLICY IF EXISTS "Admin full access storefront images" ON public.storefront_images;
CREATE POLICY "Admin full access storefront images"
    ON public.storefront_images
    FOR ALL
    USING (true)
    WITH CHECK (true);
`;

export function StorefrontImagesManager() {
  const [images, setImages] = useState<StorefrontImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "warning" | "error"; text: string } | null>(null);
  const [sqlGuide, setSqlGuide] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  // Manual URL modal / input toggle
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState("");
  const [manualAlt, setManualAlt] = useState("");
  const [submittingUrl, setSubmittingUrl] = useState(false);

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

  const showFeedback = (type: "success" | "warning" | "error", text: string, sql?: string) => {
    setFeedback({ type, text });
    if (sql) setSqlGuide(sql);
    if (type !== "error") {
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  const handleCopySql = () => {
    const textToCopy = sqlGuide || DEFAULT_SQL_MIGRATION;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  // Upload handler (multi-file support)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setFeedback(null);
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
          throw new Error(uploadData.error || `Upload ảnh "${file.name}" thất bại`);
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

        const addData = await addRes.json();
        if (!addRes.ok || !addData.success) {
          if (addData.sqlRequired || addData.error?.includes("storefront_images") || addData.error?.includes("schema cache")) {
            showFeedback(
              "warning",
              "Ảnh đã upload lên Storage thành công, nhưng bảng database 'storefront_images' chưa được tạo trong Supabase. Vui lòng bấm sao chép câu lệnh SQL bên dưới và chạy trong Supabase SQL Editor.",
              addData.sql || DEFAULT_SQL_MIGRATION
            );
            return;
          }
          throw new Error(addData.error || `Không thể lưu thông tin ảnh "${file.name}" vào database`);
        }

        successCount++;
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

  // Manual URL Add Handler
  const handleAddManualUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;

    setSubmittingUrl(true);
    setFeedback(null);

    try {
      const isFirst = images.length === 0;
      const addRes = await fetch("/api/admin/storefront-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: manualUrl.trim(),
          alt_text: manualAlt.trim() || "Mặt tiền Kiho Camera tại 48 Ngô Quyền, Đồng Hới",
          sort_order: images.length,
          is_cover: isFirst,
          is_active: true,
        }),
      });

      const addData = await addRes.json();
      if (!addRes.ok || !addData.success) {
        if (addData.sqlRequired || addData.error?.includes("storefront_images") || addData.error?.includes("schema cache")) {
          showFeedback(
            "warning",
            "Bảng database 'storefront_images' chưa được tạo trong Supabase. Vui lòng bấm sao chép câu lệnh SQL bên dưới và dán vào Supabase SQL Editor.",
            addData.sql || DEFAULT_SQL_MIGRATION
          );
          return;
        }
        throw new Error(addData.error || "Không thể lưu thông tin ảnh");
      }

      showFeedback("success", "Đã thêm ảnh cửa hàng thành công!");
      setManualUrl("");
      setManualAlt("");
      setShowUrlInput(false);
      await fetchImages();
    } catch (err: any) {
      showFeedback("error", err.message || "Lỗi thêm ảnh qua URL");
    } finally {
      setSubmittingUrl(false);
    }
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
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

        {/* Upload & Manual Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors min-h-[40px]"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Thêm bằng URL</span>
          </button>

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
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-black transition-colors cursor-pointer shadow-xs min-h-[40px] ${
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
                <span>Tải ảnh từ máy tính</span>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Manual URL Form */}
      {showUrlInput && (
        <form onSubmit={handleAddManualUrl} className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-orange-500" />
              Thêm ảnh bằng đường dẫn URL trực tiếp
            </span>
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Đóng
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                URL hình ảnh <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                required
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                placeholder="https://example.com/storefront.webp"
                className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Mô tả ảnh (Alt text)
              </label>
              <input
                type="text"
                value={manualAlt}
                onChange={(e) => setManualAlt(e.target.value)}
                placeholder="Ví dụ: Mặt tiền Kiho Camera tại 48 Ngô Quyền"
                className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submittingUrl || !manualUrl.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
            >
              {submittingUrl ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{submittingUrl ? "Đang thêm..." : "Lưu ảnh vào danh sách"}</span>
            </button>
          </div>
        </form>
      )}

      {/* SQL Missing Table Helper Banner */}
      {sqlGuide && (
        <div className="mx-5 sm:mx-6 mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-3">
          <div className="flex items-start gap-2.5 text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-bold">Database Supabase chưa có bảng `storefront_images`</p>
              <p className="text-xs text-amber-800 leading-relaxed">
                Để lưu ảnh vào database, bạn chỉ cần mở <strong>Supabase Dashboard → SQL Editor</strong>, dán câu lệnh bên dưới và nhấn <strong>Run</strong>:
              </p>
            </div>
          </div>

          <div className="relative">
            <pre className="p-3 bg-slate-900 text-slate-200 rounded-lg text-[11px] font-mono overflow-x-auto max-h-36 scrollbar-thin">
              {sqlGuide}
            </pre>
            <button
              type="button"
              onClick={handleCopySql}
              className="absolute top-2 right-2 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold shadow-xs transition-all cursor-pointer"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? "Đã sao chép SQL!" : "Sao chép SQL"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Feedback message */}
      {feedback && (
        <div
          className={`mx-5 sm:mx-6 mt-4 p-3 rounded-lg flex items-center gap-2 text-xs ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : feedback.type === "warning"
              ? "bg-amber-50 text-amber-800 border border-amber-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : feedback.type === "warning" ? (
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
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
