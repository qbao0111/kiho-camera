import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "product";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Try Supabase Storage first if configured
    try {
      const supabase = await createClient();
      if (supabase && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const fileExt = file.name.split(".").pop() || "jpg";
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

    // Local Storage Fallback: save directly to public/uploads/[folder]/
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await mkdir(uploadDir, { recursive: true });

    const fileExt = path.extname(file.name) || ".jpg";
    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${fileExt}`;
    const filePath = path.join(uploadDir, cleanFileName);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${folder}/${cleanFileName}`;
    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload image" }, { status: 500 });
  }
}
