import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Định dạng tiền tệ VNĐ (ví dụ: 300000 -> "300.000đ")
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount)) return "0đ";
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

/**
 * Tạo URL Messenger dẫn thẳng tới fanpage kèm nội dung tin nhắn soạn sẵn
 */
export function buildMessengerUrl(messengerUrl: string, productName?: string): string {
  const cleanUrl = messengerUrl.replace(/\/$/, "");
  if (!productName) return cleanUrl;

  const defaultMsg = `Chào Kiho Camera, mình muốn hỏi thuê ${productName}.`;
  
  // Hỗ trợ link m.me hoặc facebook.com/messages
  if (cleanUrl.includes("m.me")) {
    return `${cleanUrl}?text=${encodeURIComponent(defaultMsg)}`;
  }
  return cleanUrl;
}

/**
 * Chuyển đổi chuỗi tiếng Việt thành slug URL
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
