"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Image as ImageIcon,
  Sparkles,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Category, Equipment } from "@/types/database";
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

  // Form states
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [categoryId, setCategoryId] = useState(initialData?.category_id || categories[0]?.id || "");
  const [pricePerDay, setPricePerDay] = useState(initialData?.price_per_day || 300000);
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
      : ["Body máy", "2 Pin", "Sạc đôi", "Thẻ nhớ 64GB", "Túi chống sốc"]
  );

  // Image list (URLs)
  const [images, setImages] = useState<string[]>(
    initialData?.images?.length
      ? initialData.images.map((img) => img.image_url)
      : ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"]
  );
  const [newImageUrl, setNewImageUrl] = useState("");

  // Auto slug from name
  const handleNameChange = (val: string) => {
    setName(val);
    if (!initialData) {
      setSlug(slugify(val));
    }
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const payload = {
        name,
        slug: slug || slugify(name),
        category_id: categoryId || null,
        price_per_day: Number(pricePerDay),
        deposit_note: depositNote,
        short_description: shortDescription,
        description,
        is_featured: isFeatured,
        is_active: isActive,
        sort_order: Number(sortOrder),
        use_cases: useCases,
        badges,
        included_items: includedItems,
        seo_title: seoTitle || `${name} - Cho thuê máy ảnh Quảng Bình`,
        seo_description: seoDescription || shortDescription,
      };

      const supabase = createClient();
      if (supabase) {
        if (initialData?.id) {
          // Update
          const { error } = await supabase
            .from("equipment")
            .update(payload)
            .eq("id", initialData.id);
          if (error) throw error;
        } else {
          // Insert
          const { data: newEquip, error } = await supabase
            .from("equipment")
            .insert(payload)
            .select()
            .single();
          if (error) throw error;

          // Insert images
          if (newEquip && images.length > 0) {
            const imagePayloads = images.map((url, idx) => ({
              equipment_id: newEquip.id,
              image_url: url,
              is_cover: idx === 0,
              sort_order: idx + 1,
            }));
            await supabase.from("equipment_images").insert(imagePayloads);
          }
        }
      }

      setStatusMsg({
        type: "success",
        text: initialData ? "Cập nhật thiết bị thành công!" : "Tạo thiết bị mới thành công!",
      });

      setTimeout(() => {
        router.push("/admin/equipment");
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setStatusMsg({
        type: "error",
        text: err.message || "Đã xảy ra lỗi khi lưu thiết bị.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow transition-all active:scale-[0.98]"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Đang lưu..." : "Lưu thiết bị"}</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-sm ${
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Basic Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">Thông tin cơ bản</h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên thiết bị *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="VD: Canon PowerShot G7X Mark III"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Đường dẫn (Slug URL) *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="canon-g7x-mark-iii"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Danh mục
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Giá thuê / ngày (VNĐ) *
                </label>
                <input
                  type="number"
                  step="10000"
                  required
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-brand-600 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Thứ tự sắp xếp
                </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mô tả ngắn (Hiển thị ngoài card sản phẩm)
              </label>
              <textarea
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Mô tả tóm tắt nổi bật về tính năng, ứng dụng..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mô tả chi tiết & Đánh giá
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Chi tiết trải nghiệm, cảm biến, các điểm mạnh khi dùng du lịch Quảng Bình..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lưu ý đặt cọc & Giấy tờ
              </label>
              <input
                type="text"
                value={depositNote}
                onChange={(e) => setDepositNote(e.target.value)}
                placeholder="CCCD gắn chip chính chủ hoặc đặt cọc theo quy định."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Included Items & Badges */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">Phụ kiện kèm theo & Nhãn gắn</h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bộ thuê gồm những gì (Phân tách bằng dấu phẩy)
              </label>
              <input
                type="text"
                value={includedItems.join(", ")}
                onChange={(e) =>
                  setIncludedItems(
                    e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                  )
                }
                placeholder="Thân máy, 2 Pin, Dock sạc, Thẻ 64GB, Túi đựng"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mục đích sử dụng (Use Cases)
                </label>
                <input
                  type="text"
                  value={useCases.join(", ")}
                  onChange={(e) =>
                    setUseCases(
                      e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  placeholder="Du lịch, Selfie, Vlog, Concert"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Badges nổi bật
                </label>
                <input
                  type="text"
                  value={badges.join(", ")}
                  onChange={(e) =>
                    setBadges(
                      e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  placeholder="Hot, Màu đẹp, Dễ dùng"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Images, Status & SEO (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status & Featured Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900">Trạng thái & Hiển thị</h2>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-brand-500 rounded border-slate-300 focus:ring-brand-500"
              />
              <span className="text-xs font-medium text-slate-700">
                Hiển thị công khai trên website
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-brand-500 rounded border-slate-300 focus:ring-brand-500"
              />
              <span className="text-xs font-medium text-slate-700">
                Ghim sản phẩm nổi bật (Trang chủ)
              </span>
            </label>
          </div>

          {/* Product Images Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>Hình ảnh thiết bị ({images.length})</span>
              <ImageIcon className="w-4 h-4 text-slate-400" />
            </h2>

            {/* Existing images list */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {images.map((imgUrl, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-100 bg-slate-50"
                >
                  <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0">
                    <Image src={imgUrl} alt={`Ảnh ${index + 1}`} fill className="object-cover" />
                  </div>
                  <span className="text-[11px] text-slate-500 truncate flex-grow">
                    {index === 0 ? "Ảnh bìa chính" : `Ảnh phụ ${index + 1}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Image URL */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="block text-[11px] font-semibold text-slate-600">
                Thêm URL ảnh mới (hoặc Unsplash / Storage)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-brand-500"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-brand-500 transition-colors shrink-0"
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>

          {/* SEO Metadata Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900">SEO Onpage</h2>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Tiêu đề SEO (Title Tag)
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Thuê máy ảnh [Tên] tại Quảng Bình - Kiho Camera"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Meta Description
              </label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Mô tả SEO tóm tắt khoảng 150 ký tự..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
