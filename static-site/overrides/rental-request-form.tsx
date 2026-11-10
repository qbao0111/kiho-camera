"use client";
import { TrackedOutboundLink } from "@/components/analytics/tracked-outbound-link";
import data from "@/data/public-catalog.json";
export interface EquipmentOption { id: string; name: string; brand: string; }
interface Props {
  equipmentList?: EquipmentOption[]; initialEquipmentId?: string; initialEquipmentName?: string;
  source?: string; onSuccess?: () => void; onClose?: () => void; messengerUrl?: string; variant?: "section" | "drawer";
}
export function RentalRequestForm({ initialEquipmentName, source = "static_contact", messengerUrl = data.settings.messenger_url, onClose }: Props) {
  const phone = data.settings.phone.replace(/[^+\d]/g, "");
  const zaloPhone = phone.replace(/^\+84/, "0");
  const links = [
    { href: messengerUrl, label: "Nhắn Kiho qua Messenger", event: "contact_messenger" as const },
    { href: `https://zalo.me/${zaloPhone}`, label: "Tư vấn qua Zalo", event: "contact_zalo" as const },
    { href: `tel:${phone}`, label: `Gọi ${data.settings.phone}`, event: "contact_hotline" as const },
  ];
  return <div className="space-y-4 text-left" data-static-contact>
    <h3 className="font-display text-2xl font-bold text-ink-900">Liên hệ Kiho để giữ máy</h3>
    <p className="text-sm text-ink-600 leading-relaxed">{initialEquipmentName ? `Bạn quan tâm ${initialEquipmentName}? ` : ""}Nhắn dòng máy và ngày thuê qua Messenger hoặc Zalo. Kiho sẽ kiểm tra lịch và xác nhận trực tiếp với bạn.</p>
    <div className="grid gap-3">{links.map((link,i)=><TrackedOutboundLink key={link.event} href={link.href} eventName={link.event} placement={source} eventParams={{ camera_name: initialEquipmentName }} target={i<2 ? "_blank" : undefined} rel={i<2 ? "noopener noreferrer" : undefined} className={i===0 ? "block text-center rounded-lg bg-ink-900 text-white py-3.5 px-5 font-semibold text-sm hover:bg-black" : "block text-center rounded-lg border border-ink-200 bg-canvas-50 py-3 px-5 font-semibold text-sm text-ink-900 hover:bg-canvas-200"}>{link.label}</TrackedOutboundLink>)}</div>
    <p className="text-xs text-ink-500">Lịch thuê được xác nhận khi Kiho phản hồi tin nhắn hoặc cuộc gọi của bạn.</p>
    {onClose && <button type="button" onClick={onClose} className="text-sm underline text-ink-600">Đóng</button>}
  </div>;
}
