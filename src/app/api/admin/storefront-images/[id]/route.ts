import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { updateStorefrontImage, deleteStorefrontImage } from "@/lib/services/storefront";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function unauthorized() {
  return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await getAuthenticatedAdmin())) return unauthorized();

  try {
    const { id } = params;
    const body = await req.json();

    const result = await updateStorefrontImage(id, body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, image: result.data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Lỗi cập nhật ảnh cửa hàng" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await getAuthenticatedAdmin())) return unauthorized();

  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get("image_url") || undefined;

    const result = await deleteStorefrontImage(id, imageUrl);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Đã xóa ảnh thành công" });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Lỗi xóa ảnh" },
      { status: 500 }
    );
  }
}
