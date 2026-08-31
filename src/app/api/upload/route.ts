import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { isLocalDataFallbackEnabled } from "@/lib/environment";

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

function mapStorageErrorMessage(errorMessage: string): string {
  const msg = errorMessage.toLowerCase();
  if (msg.includes("bucket") && (msg.includes("not found") || msg.includes("does not exist") || msg.includes("not_found"))) {
    return "Storage bucket equipment-images chưa được cấu hình.";
  }
  if (msg.includes("row-level security") || msg.includes("permission") || msg.includes("unauthorized") || msg.includes("not allowed")) {
    return "Không có quyền upload vào Supabase Storage.";
  }
  if (msg.includes("payload too large") || msg.includes("file size") || msg.includes("too large")) {
    return "Dung lượng ảnh vượt quá giới hạn 10MB.";
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

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const rawFolder = ((formData.get("folder") as string) || "product").toLowerCase().trim();
    
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

    if (!file) {
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
        { success: false, error: "Dung lượng ảnh vượt quá giới hạn 10MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

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

    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = path.join(uploadDir, cleanFileName);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${folder}/${cleanFileName}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
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

  try {
    const { url, path: objectPath } = await req.json();
    let targetPath = objectPath;

    if (!targetPath && url && typeof url === "string") {
      const match = url.match(/\/storage\/v1\/object\/public\/equipment-images\/(.+)$/);
      if (match) {
        targetPath = match[1];
      }
    }

    if (!targetPath || typeof targetPath !== "string") {
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
    if (client) {
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
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[Upload] Delete API error:", err?.message || "Unknown error");
    return NextResponse.json(
      { success: false, error: "Xảy ra lỗi khi xóa ảnh." },
      { status: 500 }
    );
  }
}
