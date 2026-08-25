import React from "react";
import Link from "next/link";
import {
  Camera,
  FolderTree,
  MessageSquareQuote,
  Sparkles,
  ArrowUpRight,
  Plus,
  Settings,
} from "lucide-react";
import { getEquipmentList } from "@/lib/services/equipment";
import { getCategories } from "@/lib/services/categories";
import { getFeedbackList } from "@/lib/services/feedback";
import { formatCurrency } from "@/lib/utils";

export default async function AdminDashboardOverview() {
  const [equipmentList, categories, feedbacks] = await Promise.all([
    getEquipmentList({ onlyActive: false }),
    getCategories(false),
    getFeedbackList(false),
  ]);

  const activeCount = equipmentList.filter((e) => e.is_active).length;
  const featuredCount = equipmentList.filter((e) => e.is_featured).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Bảng điều khiển quản trị
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chào mừng trở lại! Xem nhanh các chỉ số và quản lý nội dung Kiho Camera.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/equipment/new"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm thiết bị mới</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Equipment */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Tổng thiết bị</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {equipmentList.length}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">
              {activeCount} đang hiển thị công khai
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Camera className="w-6 h-6" />
          </div>
        </div>

        {/* Featured Items */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Máy nổi bật</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {featuredCount}
            </div>
            <span className="text-[11px] text-brand-600 font-medium">
              Ghim trang chủ
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Danh mục</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {categories.length}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Máy ảnh, Lens, Gimbal...
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FolderTree className="w-6 h-6" />
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Feedback</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {feedbacks.length}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">
              Đánh giá từ khách hàng
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Equipment Table Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Thiết bị gần đây
            </h2>
            <p className="text-xs text-slate-500">
              Danh sách thiết bị và giá cho thuê hiện tại
            </p>
          </div>
          <Link
            href="/admin/equipment"
            className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
          >
            <span>Quản lý toàn bộ</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase text-[11px] font-semibold">
              <tr>
                <th className="py-3 px-4">Tên thiết bị</th>
                <th className="py-3 px-4">Danh mục</th>
                <th className="py-3 px-4">Giá thuê / ngày</th>
                <th className="py-3 px-4 text-center">Nổi bật</th>
                <th className="py-3 px-4 text-center">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {equipmentList.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {item.category?.name || "—"}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-brand-600">
                    {formatCurrency(item.price_per_day)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {item.is_featured ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        Nổi bật
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {item.is_active ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Hiển thị
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                        Ẩn
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/admin/equipment/${item.id}`}
                      className="text-xs font-semibold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      Sửa
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
