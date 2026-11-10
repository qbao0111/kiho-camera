import React from "react";
import Link from "next/link";
import Image from "@/components/ui/source-image";
import { Plus, Edit, Sparkles, Eye, EyeOff, ExternalLink } from "lucide-react";
import { getEquipmentList } from "@/lib/services/equipment";
import { getEquipmentCoverImage } from "@/lib/equipment-images";

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
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight font-mono">
            Quản lý Máy ảnh & Bảng giá
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-mono">
            Tổng cộng {equipmentList.length} dòng máy ảnh trong cơ sở dữ liệu
          </p>
        </div>

        <Link
          href="/admin/equipment/new"
          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-accent text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-xs transition-colors font-mono uppercase tracking-wider w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm máy ảnh mới</span>
        </Link>
      </div>

      {/* 1. MOBILE EQUIPMENT CARDS LIST (< sm) */}
      <div className="block sm:hidden space-y-3">
        {equipmentList.map((item) => {
          const cover = getEquipmentCoverImage(item);

          return (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="relative w-14 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shrink-0">
                  <Image
                    src={cover}
                    alt={item.name}
                    fill
                    className="object-contain p-1"
                    sizes="56px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                      {item.brand}
                    </span>
                    {item.is_featured && (
                      <span className="inline-flex items-center gap-0.5 bg-amber-100 text-amber-800 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                        <Sparkles className="w-2.5 h-2.5" />
                        Pick
                      </span>
                    )}
                    {item.is_active ? (
                      <span className="inline-flex items-center gap-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                        <Eye className="w-2.5 h-2.5" />
                        Hiện
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 bg-slate-100 text-slate-500 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                        <EyeOff className="w-2.5 h-2.5" />
                        Ẩn
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/admin/equipment/${item.id}`}
                    className="font-bold text-sm text-slate-900 hover:text-accent transition-colors block mt-1 truncate"
                  >
                    {item.name}
                  </Link>
                </div>
              </div>

              {/* Price Row */}
              <div className="grid grid-cols-3 gap-1 py-2 px-2.5 bg-slate-50 rounded-lg text-center font-mono border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block">1 buổi</span>
                  <span className="text-xs font-semibold text-slate-700">
                    {formatK(item.price_session)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">1 ngày</span>
                  <span className="text-xs font-bold text-accent">
                    {formatK(item.price_per_day)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">3 ngày+</span>
                  <span className="text-xs font-semibold text-rose-600">
                    {formatK(item.price_three_days)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                <Link
                  href={`/thiet-bi/${item.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Xem public</span>
                </Link>

                <Link
                  href={`/admin/equipment/${item.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors font-mono"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Chỉnh sửa</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. DESKTOP/TABLET EQUIPMENT TABLE (sm:+) */}
      <div className="hidden sm:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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
                const cover = getEquipmentCoverImage(item);

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
