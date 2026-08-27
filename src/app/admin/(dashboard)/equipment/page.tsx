import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Sparkles, Eye, EyeOff } from "lucide-react";
import { getEquipmentList } from "@/lib/services/equipment";
import { getCategories } from "@/lib/services/categories";

export default async function AdminEquipmentPage() {
  const [equipmentList] = await Promise.all([
    getEquipmentList({ onlyActive: false }),
  ]);

  const formatK = (price: number) => {
    if (!price) return "---";
    return `${Math.round(price / 1000)}K`;
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
            Quản lý Máy ảnh & Bảng giá
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-mono">
            Tổng cộng {equipmentList.length} dòng máy ảnh trong cơ sở dữ liệu
          </p>
        </div>

        <Link
          href="/admin/equipment/new"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-accent text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors font-mono uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm máy ảnh mới</span>
        </Link>
      </div>

      {/* Equipment Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-[11px] font-bold font-mono">
              <tr>
                <th className="py-3.5 px-4">Ảnh</th>
                <th className="py-3.5 px-4">Tên máy ảnh</th>
                <th className="py-3.5 px-4">Hãng</th>
                <th className="py-3.5 px-4">1 Buổi</th>
                <th className="py-3.5 px-4">1 Ngày</th>
                <th className="py-3.5 px-4">3 Ngày+</th>
                <th className="py-3.5 px-4 text-center">Nổi bật</th>
                <th className="py-3.5 px-4 text-center">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {equipmentList.map((item) => {
                const cover =
                  item.images?.find((img) => img.is_cover)?.image_url ||
                  item.images?.[0]?.image_url ||
                  `/images/cameras/${item.slug.replace("canon-eos-", "canon-").replace("-kit", "")}.jpg`;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                        <Image src={cover} alt={item.name} fill className="object-contain p-1" sizes="48px" />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <Link
                        href={`/admin/equipment/${item.id}`}
                        className="hover:text-accent transition-colors block"
                      >
                        {item.name}
                      </Link>
                      <span className="text-[11px] text-slate-400 font-normal">
                        /thiet-bi/{item.slug}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-bold">
                      {item.brand}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {formatK(item.price_session)}
                    </td>
                    <td className="py-3 px-4 font-black text-slate-900">
                      {formatK(item.price_per_day)}
                    </td>
                    <td className="py-3 px-4 font-black text-rose-600">
                      {formatK(item.price_three_days)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.is_featured ? (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3" />
                          Pick
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.is_active ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <Eye className="w-3 h-3" />
                          Hiện
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
                          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
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
