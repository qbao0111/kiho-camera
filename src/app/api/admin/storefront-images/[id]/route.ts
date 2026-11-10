import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { updateStorefrontImage, deleteStorefrontImage } from "@/lib/services/storefront";
import { isUuid } from "@/lib/security/validation";
import { isRecord, isSameOriginRequest, InvalidRequestBodyError, RequestBodyLimitError, readJsonBody } from "@/lib/security/request";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function unauthorized() {
  return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getAuthenticatedAdmin())) return unauthorized();

  if (!isSameOriginRequest(req)) return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });

  try {
    const { id } = await params;
    if (!isUuid(id)) return NextResponse.json({ success: false, error: "ID ảnh không hợp lệ." }, { status: 400 });
    const body = await readJsonBody<unknown>(req, 32 * 1024);
    if (!isRecord(body)) throw new InvalidRequestBodyError();

    const result = await updateStorefrontImage(id, body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, image: result.data }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof RequestBodyLimitError) return NextResponse.json({ success: false, error: "Dữ liệu gửi lên quá lớn." }, { status: 413 });
    if (err instanceof InvalidRequestBodyError) return NextResponse.json({ success: false, error: "Dữ liệu JSON không hợp lệ." }, { status: 400 });
    return NextResponse.json(
      { success: false, error: "Không thể cập nhật ảnh cửa hàng." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getAuthenticatedAdmin())) return unauthorized();

  if (!isSameOriginRequest(req)) return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });

  try {
    const { id } = await params;
    if (!isUuid(id)) return NextResponse.json({ success: false, error: "ID ảnh không hợp lệ." }, { status: 400 });

    const result = await deleteStorefrontImage(id);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Đã xóa ảnh thành công" }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Không thể xóa ảnh cửa hàng." },
      { status: 500 }
    );
  }
}
