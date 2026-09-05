import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { getStorefrontImages, createStorefrontImage } from "@/lib/services/storefront";
import { optionalText, isSafeImageUrl } from "@/lib/security/validation";
import { isRecord, isSameOriginRequest, InvalidRequestBodyError, RequestBodyLimitError, readJsonBody } from "@/lib/security/request";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function unauthorized() {
  return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!(await getAuthenticatedAdmin())) return unauthorized();

  try {
    const images = await getStorefrontImages({ onlyActive: false });
    return NextResponse.json({ success: true, images }, { headers: { "Cache-Control": "no-store" } });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Lỗi lấy danh sách ảnh cửa hàng" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await getAuthenticatedAdmin())) return unauthorized();

  if (!isSameOriginRequest(req)) return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });

  try {
    const body = await readJsonBody<unknown>(req, 64 * 1024);
    if (!isRecord(body)) throw new InvalidRequestBodyError();
    const { image_url, alt_text, caption, sort_order, is_cover, is_active } = body;

    if (!isSafeImageUrl(image_url)) {
      return NextResponse.json(
        { success: false, error: "Đường dẫn ảnh là bắt buộc" },
        { status: 400 }
      );
    }

    const cleanAlt = optionalText(alt_text, 255);
    const cleanCaption = optionalText(caption, 1000);
    if ((alt_text !== undefined && cleanAlt === undefined) || (caption !== undefined && cleanCaption === undefined)) {
      return NextResponse.json({ success: false, error: "Mô tả ảnh không hợp lệ." }, { status: 400 });
    }
    if (sort_order !== undefined && (typeof sort_order !== "number" || !Number.isInteger(sort_order) || sort_order < 0 || sort_order > 10000)) {
      return NextResponse.json({ success: false, error: "Thứ tự ảnh không hợp lệ." }, { status: 400 });
    }
    if ((is_cover !== undefined && typeof is_cover !== "boolean") || (is_active !== undefined && typeof is_active !== "boolean")) {
      return NextResponse.json({ success: false, error: "Trạng thái ảnh không hợp lệ." }, { status: 400 });
    }

    const result = await createStorefrontImage({
      image_url: image_url.trim(),
      alt_text: cleanAlt,
      caption: cleanCaption,
      sort_order: typeof sort_order === "number" ? sort_order : 0,
      is_cover: is_cover === true,
      is_active: is_active !== false,
    });

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error,
        sqlRequired: result.sqlRequired,
        sql: result.sql,
      }, { status: 400 });
    }

    return NextResponse.json({ success: true, image: result.data }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof RequestBodyLimitError) return NextResponse.json({ success: false, error: "Dữ liệu gửi lên quá lớn." }, { status: 413 });
    if (err instanceof InvalidRequestBodyError) return NextResponse.json({ success: false, error: "Dữ liệu JSON không hợp lệ." }, { status: 400 });
    return NextResponse.json(
      { success: false, error: "Không thể tạo ảnh cửa hàng." },
      { status: 500 }
    );
  }
}
