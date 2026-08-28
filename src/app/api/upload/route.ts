import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { isLocalDataFallbackEnabled } from "@/lib/environment";

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export async function POST(req: NextRequest) {
  if (!(await getAuthenticatedAdmin())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const requestedFolder = (formData.get("folder") as string) || "product";
    const folder = ["product", "sample", "feedback"].includes(requestedFolder)
      ? requestedFolder
      : "product";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileExt = ALLOWED_IMAGE_TYPES[file.type];
    if (!fileExt || file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { success: false, error: "Only JPEG, PNG, WebP, or GIF images up to 10 MB are allowed." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Try Supabase Storage first if configured
    try {
      const supabase = await createClient();
      if (supabase && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from("equipment-images")
          .upload(fileName, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage
            .from("equipment-images")
            .getPublicUrl(data.path);
          return NextResponse.json({ url: publicUrlData.publicUrl });
        }
      }
    } catch (supabaseErr) {
      console.warn("Supabase storage not available, falling back to local storage:", supabaseErr);
    }

    if (!isLocalDataFallbackEnabled()) {
      return NextResponse.json(
        { success: false, error: "Supabase storage is unavailable." },
        { status: 503 }
      );
    }

    // Explicit development-only fallback: public/uploads/[folder]/
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await mkdir(uploadDir, { recursive: true });

    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = path.join(uploadDir, cleanFileName);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${folder}/${cleanFileName}`;
    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error(
      "Upload API error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { success: false, error: "Failed to upload image." },
      { status: 500 }
    );
  }
}
