import React from "react";
import { getCategories } from "@/lib/services/categories";
import { EquipmentForm } from "@/components/admin/equipment-form";

export default async function NewEquipmentPage() {
  const categories = await getCategories(false);

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Thêm thiết bị mới
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Nhập thông tin máy ảnh, giá thuê và phụ kiện đi kèm để hiển thị lên website.
        </p>
      </div>

      <EquipmentForm categories={categories} />
    </div>
  );
}
