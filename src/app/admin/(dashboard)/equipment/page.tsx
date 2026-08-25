import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Sparkles, Eye, EyeOff, Search } from "lucide-react";
import { getEquipmentList } from "@/lib/services/equipment";
import { getCategories } from "@/lib/services/categories";
import { formatCurrency } from "@/lib/utils";

export default async function AdminEquipmentPage() {
  const [equipmentList, categories] = await Promise.all([
    getEquipmentList({ onlyActive: false }),
    getCategories(false),
  ]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Quản lý thiết bị & Bảng giá
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tổng cộng {equipmentList.length} thiết bị trong cơ sở dữ liệu
          </p>
        </div>

        <Link
          href="/admin/equipment/new"
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm thiết bị mới</span>
        </Link>
      </div>

      {/* Equipment Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-[11px] font-bold">
              <tr>
                <th className="py-3.5 px-4">Ảnh</th>
                <th className="py-3.5 px-4">Tên thiết bị</th>
                <th className="py-3.5 px-4">Danh mục</th>
                <th className="py-3.5 px-4">Giá / ngày</th>
                <th className="py-3.5 px-4 text-center">Nổi bật</th>
                <th className="py-3.5 px-4 text-center">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {equipmentList.map((item) => {
                const cover =
                  item.images?.find((img) => img.is_cover)?.image_url ||
                  item.images?.[0]?.image_url ||
                  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80";

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                        <Image src={cover} alt={item.name} fill className="object-cover" sizes="48px" />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <Link
                        href={`/admin/equipment/${item.id}`}
                        className="hover:text-brand-600 transition-colors block"
                      >
                        {item.name}
                      </Link>
                      <span className="text-[11px] text-slate-400 font-normal">
                        /thiet-bi/{item.slug}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {item.category?.name || "Chưa phân loại"}
                    </td>
                    <td className="py-3 px-4 font-black text-brand-600">
                      {formatCurrency(item.price_per_day)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.is_featured ? (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3" />
                          Nổi bật
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.is_active ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <Eye className="w-3 h-3" />
                          Hiển thị
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <EyeOff className="w-3 h-3" />
                          Ẩn
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/thiet-bi/${item.slug}`}
                          target="_blank"
                          className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg transition-colors"
                          title="Xem trang công khai"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/equipment/${item.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Sửa</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
