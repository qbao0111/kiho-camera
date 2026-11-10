"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "@/components/ui/source-image";
import { prepareImageUpload } from "@/lib/prepare-image-upload";
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Image as ImageIcon,
  Sparkles,
  AlertCircle,
  CheckCircle,
  UploadCloud,
  FileImage,
  Layers,
  Tag,
  Eye,
} from "lucide-react";
import { Category, Equipment, EquipmentImage, EquipmentSampleImage } from "@/types/database";
import { EQUIPMENT_IMAGE_FALLBACK } from "@/lib/equipment-images";
import { slugify } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface EquipmentFormProps {
  initialData?: Equipment | null;
  categories: Category[];
}

export function EquipmentForm({ initialData, categories }: EquipmentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeMediaTab, setActiveMediaTab] = useState<"product" | "poster" | "samples">("product");

  // Form states
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [brand, setBrand] = useState<string>(initialData?.brand || "Canon");
  const [categoryId, setCategoryId] = useState(initialData?.category_id || categories[0]?.id || "");
  
  // 3-Tier Prices
  const [priceSession, setPriceSession] = useState(initialData?.price_session || 150000);
  const [pricePerDay, setPricePerDay] = useState(initialData?.price_per_day || 250000);
  const [priceThreeDays, setPriceThreeDays] = useState(initialData?.price_three_days || 230000);

  const [depositNote, setDepositNote] = useState(initialData?.deposit_note || "");
  const [shortDescription, setShortDescription] = useState(initialData?.short_description || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured || false);
  const [isActive, setIsActive] = useState(initialData?.is_active !== undefined ? initialData.is_active : true);
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order || 1);
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seo_description || "");

  // Array states
  const [useCases, setUseCases] = useState<string[]>(
    initialData?.use_cases?.length ? initialData.use_cases : ["Du lịch", "Vlog"]
  );
  const [badges, setBadges] = useState<string[]>(
    initialData?.badges?.length ? initialData.badges : ["Hot"]
  );
  const [includedItems, setIncludedItems] = useState<string[]>(
    initialData?.included_items?.length
      ? initialData.included_items
      : ["Thân máy & Lens", "2 Pin dung lượng cao", "Sạc pin", "Thẻ nhớ 64GB", "Túi chống sốc", "Đầu đọc thẻ OTG"]
  );

  // Specifications
  const [specs, setSpecs] = useState<{ key: string; val: string }[]>(
    initialData?.specifications && Object.keys(initialData.specifications).length > 0
      ? Object.entries(initialData.specifications).map(([key, val]) => ({ key, val }))
      : [
          { key: "cam_bien", val: "24.2 Megapixel APS-C" },
          { key: "trong_luong", val: "375g" },
        ]
  );

  // 1. Product Images state
  const [productImages, setProductImages] = useState<{ url: string; isCover: boolean }[]>(
    initialData?.images?.length
      ? initialData.images.map((img) => ({ url: img.image_url, isCover: img.is_cover }))
      : [{ url: EQUIPMENT_IMAGE_FALLBACK, isCover: true }]
  );
  const [newProductUrl, setNewProductUrl] = useState("");
  const [uploadingProduct, setUploadingProduct] = useState(false);

  // 2. Price Poster state
  const [pricePosterUrl, setPricePosterUrl] = useState<string>(
    initialData?.price_poster_url || `/images/price-posters/${initialData?.slug || "canon-eos-r50"}.webp`
  );
  const [uploadingPoster, setUploadingPoster] = useState(false);

  // 3. Sample Photos state
  const [samplePhotos, setSamplePhotos] = useState<
    { id?: string; image_url: string; caption: string; is_active: boolean }[]
  >(
    initialData?.sample_images?.length
      ? initialData.sample_images.map((s) => ({
          id: s.id,
          image_url: s.image_url,
          caption: s.caption || "",
          is_active: s.is_active,
        }))
      : []
  );
  const [newSampleUrl, setNewSampleUrl] = useState("");
  const [newSampleCaption, setNewSampleCaption] = useState("");
  const [uploadingSample, setUploadingSample] = useState(false);

  // Auto slug
  const handleNameChange = (val: string) => {
    setName(val);
    if (!initialData) {
      setSlug(slugify(val));
    }
  };

  // Helper for Upload via API
  const uploadFileToStorage = async (file: File, folder: "product" | "poster" | "samples"): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", await prepareImageUpload(file, folder));
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Upload failed with status ${res.status}`);
      }

      const data = await res.json();
      return data.url || null;
    } catch (err: any) {
      console.error("Storage upload error:", err);
      setStatusMsg({
        type: "error",
        text: `Lỗi upload ảnh: ${err.message || "Không thể tải ảnh lên"}`,
      });
      return null;
    }
  };

  // Direct file handlers
  const handleProductFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingProduct(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const url = await uploadFileToStorage(files[i], "product");
        if (url) {
          setProductImages((prev) => [...prev, { url, isCover: prev.length === 0 }]);
        }
      }
    } finally {
      setUploadingProduct(false);
      e.target.value = "";
    }
  };

  const handlePosterFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPoster(true);
    try {
      const url = await uploadFileToStorage(file, "poster");
      if (url) {
        setPricePosterUrl(url);
      }
    } finally {
      setUploadingPoster(false);
      e.target.value = "";
    }
  };

  const handleSampleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingSample(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const url = await uploadFileToStorage(files[i], "samples");
        if (url) {
          setSamplePhotos((prev) => [
            ...prev,
            { image_url: url, caption: "Ảnh chụp thực tế tại Quảng Bình", is_active: true },
          ]);
        }
      }
    } finally {
      setUploadingSample(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const specsObj: Record<string, string> = {};
      specs.forEach((s) => {
        if (s.key.trim() && s.val.trim()) {
          specsObj[s.key.trim()] = s.val.trim();
        }
      });

      const payload = {
        name,
        slug: slug || slugify(name),
        brand,
        category_id: categoryId || null,
        price_session: Number(priceSession),
        price_per_day: Number(pricePerDay),
        price_three_days: Number(priceThreeDays),
        price_poster_url: pricePosterUrl || null,
        deposit_note: depositNote,
        short_description: shortDescription,
        description,
        specifications: specsObj,
        is_featured: isFeatured,
        is_active: isActive,
        sort_order: Number(sortOrder),
        use_cases: useCases,
        badges,
        included_items: includedItems,
        seo_title: seoTitle || `Thuê máy ảnh ${name} tại Quảng Bình`,
        seo_description: seoDescription || shortDescription,
      };

      const res = await fetch("/api/equipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: initialData?.id,
          payload,
          productImages,
          samplePhotos,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Không thể lưu dữ liệu máy ảnh");
      }

      setStatusMsg({
        type: "success",
        text: initialData ? "Cập nhật máy ảnh thành công!" : "Tạo máy ảnh mới thành công!",
      });

      setTimeout(() => {
        router.push("/admin/equipment");
        router.refresh();
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setStatusMsg({
        type: "error",
        text: err?.message || "Có lỗi xảy ra khi lưu dữ liệu!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl pb-16 font-sans">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-ink-900 hover:bg-accent text-white px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Đang lưu..." : "Lưu máy ảnh"}</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            statusMsg.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {statusMsg.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* 1. Basic Information */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <h3 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wider pb-3 border-b border-slate-100">
          1. Thông tin máy ảnh
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
              Tên máy ảnh *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="VD: Canon EOS R50"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
              Hãng sản xuất (Brand) *
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="Fujifilm">Fujifilm</option>
              <option value="Canon">Canon</option>
              <option value="Sony">Sony</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
              Slug URL
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="canon-eos-r50"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
              Thứ tự hiển thị
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
            Mô tả ngắn (1 line tóm tắt)
          </label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="24.2MP Dual Pixel AF II · Siêu nhẹ 375g · Màu da đẹp"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
            Mô tả chi tiết trải nghiệm
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả kỹ hơn về đặc điểm nổi bật..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* 2. 3-Tier Pricing Hierarchy */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <h3 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
          <Tag className="w-4 h-4 text-accent" />
          <span>2. Bảng giá 3 mức thuê niêm yết (VNĐ)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
              1. Giá 1 buổi (4-5 tiếng)
            </label>
            <input
              type="number"
              step={10000}
              value={priceSession}
              onChange={(e) => setPriceSession(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm font-mono font-bold text-slate-900"
            />
            <span className="text-[10px] text-slate-400 font-mono">VD: 150000 (150K)</span>
          </div>

          <div className="space-y-1.5 bg-[#fefce8] p-4 rounded-xl border border-[#fef08a]">
            <label className="block text-xs font-mono font-bold text-amber-800 uppercase">
              2. Giá 1 ngày (24 tiếng)
            </label>
            <input
              type="number"
              step={10000}
              value={pricePerDay}
              onChange={(e) => setPricePerDay(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-lg border border-amber-300 text-sm font-mono font-black text-amber-900"
            />
            <span className="text-[10px] text-amber-700 font-mono">VD: 250000 (250K)</span>
          </div>

          <div className="space-y-1.5 bg-[#fef2f2] p-4 rounded-xl border border-[#fecaca]">
            <label className="block text-xs font-mono font-bold text-rose-800 uppercase">
              3. Giá từ 3 ngày (giá / ngày)
            </label>
            <input
              type="number"
              step={10000}
              value={priceThreeDays}
              onChange={(e) => setPriceThreeDays(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-lg border border-rose-300 text-sm font-mono font-black text-rose-900"
            />
            <span className="text-[10px] text-rose-700 font-mono">VD: 230000 (230K/ngày)</span>
          </div>
        </div>
      </div>

      {/* 3. Media Manager with 3 Tabs */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wider flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-accent" />
            <span>3. Quản lý Ảnh & Bảng giá Poster</span>
          </h3>

          {/* Media Sub-tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl font-mono text-xs flex-wrap font-bold">
            <button
              type="button"
              onClick={() => setActiveMediaTab("product")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeMediaTab === "product" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Ảnh máy ({productImages.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveMediaTab("poster")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeMediaTab === "poster" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Bảng giá (Poster)
            </button>
            <button
              type="button"
              onClick={() => setActiveMediaTab("samples")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeMediaTab === "samples" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Ảnh chụp thực tế ({samplePhotos.length})
            </button>
          </div>
        </div>

        {/* TAB 1: PRODUCT GALLERY */}
        {activeMediaTab === "product" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 font-medium">
                Ảnh thân máy, góc nghiêng, phụ kiện trong gallery.
              </span>
              <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-900 hover:bg-accent text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors">
                <UploadCloud className="w-3.5 h-3.5" />
                <span>{uploadingProduct ? "Đang upload..." : "Upload file ảnh"}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleProductFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Product Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {productImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative aspect-square rounded-xl overflow-hidden border p-2 bg-slate-50 flex flex-col justify-between group ${
                    img.isCover ? "border-accent ring-2 ring-accent/30" : "border-slate-200"
                  }`}
                >
                  <div className="relative flex-grow w-full">
                    <Image src={img.url} alt="Ảnh máy" fill className="object-contain p-2" />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() =>
                        setProductImages(
                          productImages.map((p, i) => ({ ...p, isCover: i === idx }))
                        )
                      }
                      className={`font-bold ${img.isCover ? "text-accent" : "text-slate-400 hover:text-slate-700"}`}
                    >
                      {img.isCover ? "★ Ảnh bìa" : "Đặt làm bìa"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductImages(productImages.filter((_, i) => i !== idx))}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Paste URL option */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Hoặc dán URL ảnh trực tiếp..."
                value={newProductUrl}
                onChange={(e) => setNewProductUrl(e.target.value)}
                className="flex-grow px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => {
                  if (newProductUrl.trim()) {
                    setProductImages([
                      ...productImages,
                      { url: newProductUrl.trim(), isCover: productImages.length === 0 },
                    ]);
                    setNewProductUrl("");
                  }
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-mono font-bold"
              >
                Thêm URL
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PRICE POSTER */}
        {activeMediaTab === "poster" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 font-medium">
                Bảng giá visual square (1200x1200) của dòng máy này.
              </span>
              <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-900 hover:bg-accent text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors">
                <UploadCloud className="w-3.5 h-3.5" />
                <span>{uploadingPoster ? "Đang upload..." : "Thay thế Poster"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePosterFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {pricePosterUrl ? (
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="relative w-48 h-48 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                  <Image src={pricePosterUrl} alt="Bảng giá poster" fill className="object-contain" />
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <p className="font-bold text-slate-900">Bảng giá Visual hiện tại:</p>
                  <p className="text-slate-500 truncate max-w-md">{pricePosterUrl}</p>
                  <button
                    type="button"
                    onClick={() => setPricePosterUrl("")}
                    className="text-rose-600 hover:text-rose-800 font-bold"
                  >
                    Xóa poster này
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl space-y-2 font-mono text-xs text-slate-400">
                <p>Chưa có bảng giá poster visual cho dòng máy này.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAMPLE PHOTOS */}
        {activeMediaTab === "samples" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 font-medium">
                Ảnh chụp thực tế từ máy để khách tham khảo màu da, màu film.
              </span>
              <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-900 hover:bg-accent text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors">
                <UploadCloud className="w-3.5 h-3.5" />
                <span>{uploadingSample ? "Đang upload..." : "Upload ảnh thực tế"}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleSampleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Sample Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {samplePhotos.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2.5 font-mono text-xs"
                >
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-200">
                    <Image src={s.image_url} alt="Ảnh thực tế" fill className="object-cover" />
                  </div>
                  <input
                    type="text"
                    placeholder="Chú thích (VD: Chân dung tại Phong Nha)"
                    value={s.caption}
                    onChange={(e) => {
                      const updated = [...samplePhotos];
                      updated[idx].caption = e.target.value;
                      setSamplePhotos(updated);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs bg-white"
                  />
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-1 text-[11px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={s.is_active}
                        onChange={(e) => {
                          const updated = [...samplePhotos];
                          updated[idx].is_active = e.target.checked;
                          setSamplePhotos(updated);
                        }}
                      />
                      <span>Hiển thị</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setSamplePhotos(samplePhotos.filter((_, i) => i !== idx))}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Paste URL for Sample */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="URL ảnh thực tế..."
                value={newSampleUrl}
                onChange={(e) => setNewSampleUrl(e.target.value)}
                className="flex-grow px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono"
              />
              <input
                type="text"
                placeholder="Chú thích..."
                value={newSampleCaption}
                onChange={(e) => setNewSampleCaption(e.target.value)}
                className="w-48 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => {
                  if (newSampleUrl.trim()) {
                    setSamplePhotos([
                      ...samplePhotos,
                      {
                        image_url: newSampleUrl.trim(),
                        caption: newSampleCaption.trim() || "Ảnh chụp thực tế",
                        is_active: true,
                      },
                    ]);
                    setNewSampleUrl("");
                    setNewSampleCaption("");
                  }
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-mono font-bold"
              >
                Thêm ảnh
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Included Package Items */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wider pb-3 border-b border-slate-100">
          4. Bộ thuê gồm (Phụ kiện đi kèm)
        </h3>
        <p className="text-xs text-slate-500 font-mono">
          Các phụ kiện đi kèm theo máy (không phải sản phẩm cho thuê riêng).
        </p>

        <div className="space-y-2">
          {includedItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const copy = [...includedItems];
                  copy[idx] = e.target.value;
                  setIncludedItems(copy);
                }}
                className="flex-grow px-3.5 py-1.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <button
                type="button"
                onClick={() => setIncludedItems(includedItems.filter((_, i) => i !== idx))}
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setIncludedItems([...includedItems, ""])}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors mt-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm phụ kiện đi kèm</span>
          </button>
        </div>
      </div>

      {/* 5. Useful Specifications */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wider pb-3 border-b border-slate-100">
          5. Thông số kỹ thuật hữu ích
        </h3>

        <div className="space-y-2">
          {specs.map((s, idx) => (
            <div key={idx} className="flex items-center gap-2 font-mono">
              <input
                type="text"
                placeholder="Tên thông số (VD: Cảm biến)"
                value={s.key}
                onChange={(e) => {
                  const copy = [...specs];
                  copy[idx].key = e.target.value;
                  setSpecs(copy);
                }}
                className="w-1/3 px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
              />
              <input
                type="text"
                placeholder="Giá trị (VD: 24.2MP)"
                value={s.val}
                onChange={(e) => {
                  const copy = [...specs];
                  copy[idx].val = e.target.value;
                  setSpecs(copy);
                }}
                className="flex-grow px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
              />
              <button
                type="button"
                onClick={() => setSpecs(specs.filter((_, i) => i !== idx))}
                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setSpecs([...specs, { key: "", val: "" }])}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 hover:text-slate-900 bg-slate-100 px-3 py-2 rounded-xl mt-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm thông số</span>
          </button>
        </div>
      </div>

      {/* 6. Settings & Visibility */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wider pb-3 border-b border-slate-100">
          6. Trạng thái & Hiển thị
        </h3>

        <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-accent"
            />
            <span className="font-bold text-slate-900">★ Đánh dấu Kiho Pick (Nổi bật)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-accent"
            />
            <span className="font-bold text-slate-900">Hiển thị trên website</span>
          </label>
        </div>
      </div>

      {/* Bottom Save Button */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ink-900 hover:bg-accent text-white px-8 py-3.5 rounded-2xl font-mono text-sm font-bold uppercase tracking-wider shadow-md transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? "Đang lưu..." : "Lưu máy ảnh"}</span>
        </button>
      </div>


    </form>
  );
}
