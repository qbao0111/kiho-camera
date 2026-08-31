import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { getStorefrontImages, createStorefrontImage } from "@/lib/services/storefront";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function unauthorized() {
  return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!(await getAuthenticatedAdmin())) return unauthorized();

  try {
    const images = await getStorefrontImages({ onlyActive: false });
    return NextResponse.json({ success: true, images });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Lỗi lấy danh sách ảnh cửa hàng" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await getAuthenticatedAdmin())) return unauthorized();

  try {
    const body = await req.json();
    const { image_url, alt_text, caption, sort_order, is_cover, is_active } = body;

    if (!image_url || typeof image_url !== "string") {
      return NextResponse.json(
        { success: false, error: "Đường dẫn ảnh là bắt buộc" },
        { status: 400 }
      );
    }

    const result = await createStorefrontImage({
      image_url: image_url.trim(),
      alt_text: alt_text ? String(alt_text).trim() : null,
      caption: caption ? String(caption).trim() : null,
      sort_order: typeof sort_order === "number" ? sort_order : 0,
      is_cover: Boolean(is_cover),
      is_active: is_active !== undefined ? Boolean(is_active) : true,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, image: result.data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Lỗi tạo ảnh cửa hàng" },
      { status: 500 }
    );
  }
}
