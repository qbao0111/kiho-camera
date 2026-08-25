import React from "react";
import { getEquipmentList } from "@/lib/services/equipment";
import { getCategories } from "@/lib/services/categories";
import { EquipmentForm } from "@/components/admin/equipment-form";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditEquipmentPage({ params }: PageProps) {
  const [allEquipment, categories] = await Promise.all([
    getEquipmentList({ onlyActive: false }),
    getCategories(false),
  ]);

  const equipment = allEquipment.find((e) => e.id === params.id || e.slug === params.id);

  if (!equipment) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Chỉnh sửa: {equipment.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Cập nhật thông tin chi tiết, giá thuê hoặc ảnh thiết bị.
        </p>
      </div>

      <EquipmentForm initialData={equipment} categories={categories} />
    </div>
  );
}
