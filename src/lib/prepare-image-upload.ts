const MAX_BYTES = 2 * 1024 * 1024;

/** Prepare source images in the admin browser; Storage and Workers never resize them. */
export async function prepareImageUpload(file: File, folder: string): Promise<File> {
  if (file.size > 10 * 1024 * 1024) throw new Error("Ảnh gốc không được vượt quá 10MB.");
  if (file.type === "image/gif") {
    if (file.size > MAX_BYTES) throw new Error("Ảnh GIF không được vượt quá 2MB.");
    return file; // Preserve animation.
  }
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Chỉ chấp nhận JPEG, PNG, WebP hoặc GIF.");
  }
  const image = await createImageBitmap(file);
  try {
    const maxEdge = folder === "poster" ? 2400 : 1600;
    if (image.width * image.height > 64_000_000) throw new Error("Ảnh quá lớn, vui lòng giảm kích thước trước khi tải lên.");
    if (file.type === "image/webp" && file.size <= MAX_BYTES && Math.max(image.width, image.height) <= maxEdge) return file;
    const scale = Math.min(1, maxEdge / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Trình duyệt không thể xử lý ảnh.");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/webp", 0.9));
    if (!blob || blob.type !== "image/webp") throw new Error("Trình duyệt không hỗ trợ xuất WebP. Vui lòng tải ảnh WebP đã tối ưu.");
    if (blob.size > MAX_BYTES) throw new Error("Ảnh sau xử lý vẫn vượt quá 2MB. Vui lòng nén ảnh trước khi tải lên.");
    return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.webp`, { type: blob.type });
  } finally {
    image.close();
  }
}
