import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { isLocalDataFallbackEnabled } from "@/lib/environment";
import { isSameOriginRequest, isRecord, InvalidRequestBodyError, RequestBodyLimitError, readJsonBody } from "@/lib/security/request";
import { isSafeStoragePath } from "@/lib/security/validation";

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};
const MAX_UPLOAD_BYTES = 2 * 1024 * 1024; // 2 MB prepared source asset

function hasValidImageSignature(buffer: Buffer, mimeType: string): boolean {
  if (mimeType === "image/jpeg") return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (mimeType === "image/png") return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (mimeType === "image/webp") return buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP";
  if (mimeType === "image/gif") return buffer.toString("ascii", 0, 6) === "GIF87a" || buffer.toString("ascii", 0, 6) === "GIF89a";
  return false;
}

function mapStorageErrorMessage(errorMessage: string): string {
  const msg = errorMessage.toLowerCase();
  if (msg.includes("bucket") && (msg.includes("not found") || msg.includes("does not exist") || msg.includes("not_found"))) {
    return "Storage bucket equipment-images chưa được cấu hình.";
  }
  if (msg.includes("row-level security") || msg.includes("permission") || msg.includes("unauthorized") || msg.includes("not allowed")) {
    return "Không có quyền upload vào Supabase Storage.";
  }
  if (msg.includes("payload too large") || msg.includes("file size") || msg.includes("too large")) {
    return "Dung lượng ảnh vượt quá giới hạn 2MB.";
  }
  if (msg.includes("mime") || msg.includes("invalidmimetype") || msg.includes("type")) {
    return "Định dạng ảnh không được hỗ trợ (chỉ nhận JPG, PNG, WebP, GIF).";
  }
  return "Upload lên Supabase Storage thất bại.";
}

export async function POST(req: NextRequest) {
  // 1. Enforce strict server-side admin authentication
  const adminUser = await getAuthenticatedAdmin();
  if (!adminUser) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!isSameOriginRequest(req)) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  const declaredLength = Number(req.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_UPLOAD_BYTES + 256 * 1024) {
    return NextResponse.json({ success: false, error: "Dung lượng yêu cầu vượt quá giới hạn." }, { status: 413 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folderValue = formData.get("folder");
    const rawFolder = (typeof folderValue === "string" ? folderValue : "product").toLowerCase().trim();
    
    // Normalize folder name
    let folder = "product";
    if (rawFolder === "sample" || rawFolder === "samples") {
      folder = "sample";
    } else if (rawFolder === "poster" || rawFolder === "posters") {
      folder = "poster";
    } else if (rawFolder === "feedback") {
      folder = "feedback";
    } else if (rawFolder === "storefront" || rawFolder === "store") {
      folder = "storefront";
    }

    if (!file || typeof file.arrayBuffer !== "function" || typeof file.type !== "string") {
      return NextResponse.json(
        { success: false, error: "Vui lòng chọn file ảnh để tải lên." },
        { status: 400 }
      );
    }

    const fileExt = ALLOWED_IMAGE_TYPES[file.type];
    if (!fileExt) {
      return NextResponse.json(
        { success: false, error: "Định dạng ảnh không được hỗ trợ. Chỉ chấp nhận JPEG, PNG, WebP hoặc GIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { success: false, error: "Dung lượng ảnh vượt quá giới hạn 2MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    if (buffer.length > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { success: false, error: "Dung lượng ảnh vượt quá giới hạn 2MB." },
        { status: 413 }
      );
    }
    if (!hasValidImageSignature(buffer, file.type)) {
      return NextResponse.json(
        { success: false, error: "Nội dung file không khớp định dạng ảnh." },
        { status: 400 }
      );
    }
    const fileName = `${folder}/${randomUUID()}.${fileExt}`;

    // 2. Try Supabase Storage
    try {
      // Use authenticated session client first, fallback to server admin client
      let supabase = await createClient();
      let uploadResult = null;
      let uploadError = null;

      if (supabase && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const res = await supabase.storage
          .from("equipment-images")
          .upload(fileName, buffer, {
            contentType: file.type,
            upsert: false,
          });
        uploadResult = res.data;
        uploadError = res.error;
      }

      // If user client hit RLS or failed but service role is available on server
      if (uploadError) {
        const adminClient = createAdminClient();
        if (adminClient) {
          const res = await adminClient.storage
            .from("equipment-images")
            .upload(fileName, buffer, {
              contentType: file.type,
              upsert: false,
            });
          uploadResult = res.data;
          uploadError = res.error;
        }
      }

      if (uploadResult && !uploadError) {
        const activeClient = (await createClient()) || createAdminClient();
        const { data: publicUrlData } = activeClient!.storage
          .from("equipment-images")
          .getPublicUrl(uploadResult.path);

        return NextResponse.json({
          success: true,
          url: publicUrlData.publicUrl,
        });
      }

      if (uploadError) {
        console.error(
          "[Upload] Supabase Storage upload failed:",
          uploadError.message
        );

        if (!isLocalDataFallbackEnabled()) {
          return NextResponse.json(
            { success: false, error: mapStorageErrorMessage(uploadError.message) },
            { status: 500 }
          );
        }
      }
    } catch (supabaseErr: any) {
      console.error(
        "[Upload] Supabase Storage exception:",
        supabaseErr?.message || "Storage unavailable"
      );

      if (!isLocalDataFallbackEnabled()) {
        return NextResponse.json(
          { success: false, error: "Upload lên Supabase Storage thất bại." },
          { status: 503 }
        );
      }
    }

    if (!isLocalDataFallbackEnabled()) {
      return NextResponse.json(
        { success: false, error: "Supabase storage is unavailable." },
        { status: 503 }
      );
    }

    // 3. Explicit development-only fallback: public/uploads/[folder]/
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await mkdir(uploadDir, { recursive: true });

    const cleanFileName = `${randomUUID()}.${fileExt}`;
    const filePath = path.join(uploadDir, cleanFileName);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${folder}/${cleanFileName}`;
    return NextResponse.json({ success: true, url: publicUrl }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof RequestBodyLimitError) return NextResponse.json({ success: false, error: "Dữ liệu gửi lên quá lớn." }, { status: 413 });
    if (error instanceof InvalidRequestBodyError) return NextResponse.json({ success: false, error: "Dữ liệu không hợp lệ." }, { status: 400 });
    console.error(
      "[Upload] Upload API error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { success: false, error: "Failed to upload image." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const adminUser = await getAuthenticatedAdmin();
  if (!adminUser) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!isSameOriginRequest(req)) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await readJsonBody<unknown>(req, 32 * 1024);
    if (!isRecord(body)) throw new InvalidRequestBodyError();
    const { url, path: objectPath } = body;
    let targetPath = typeof objectPath === "string" ? objectPath : undefined;

    if (!targetPath && url && typeof url === "string") {
      try {
        const parsed = new URL(url);
        const configuredHost = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : "";
        const prefix = "/storage/v1/object/public/equipment-images/";
        if (parsed.protocol === "https:" && parsed.hostname === configuredHost && parsed.pathname.startsWith(prefix)) {
          targetPath = decodeURIComponent(parsed.pathname.slice(prefix.length));
        }
      } catch {
        targetPath = undefined;
      }
    }

    if (!targetPath || !isSafeStoragePath(targetPath, ["product", "sample", "poster", "feedback", "storefront"])) {
      return NextResponse.json(
        { success: false, error: "Yêu cầu đường dẫn ảnh hợp lệ để xóa." },
        { status: 400 }
      );
    }

    // Never delete static theme assets from public repository
    if (targetPath.startsWith("/images/") || targetPath.startsWith("images/")) {
      return NextResponse.json(
        { success: false, error: "Không thể xóa ảnh tĩnh hệ thống." },
        { status: 403 }
      );
    }

    const client = createAdminClient() || (await createClient());
    if (!client) {
      return NextResponse.json(
        { success: false, error: "Supabase Storage chưa được cấu hình." },
        { status: 503 }
      );
    }

    const { error } = await client.storage
      .from("equipment-images")
      .remove([targetPath]);

    if (error) {
      console.error("[Upload] Supabase Storage delete failed:", error.message);
      return NextResponse.json(
        { success: false, error: "Xóa ảnh từ Supabase Storage thất bại." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof RequestBodyLimitError) return NextResponse.json({ success: false, error: "Dữ liệu gửi lên quá lớn." }, { status: 413 });
    if (err instanceof InvalidRequestBodyError) return NextResponse.json({ success: false, error: "Dữ liệu JSON không hợp lệ." }, { status: 400 });
    console.error("[Upload] Delete API error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json(
      { success: false, error: "Xảy ra lỗi khi xóa ảnh." },
      { status: 500 }
    );
  }
}
