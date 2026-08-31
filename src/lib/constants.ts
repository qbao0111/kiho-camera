export const DEFAULT_MAPS_URL = "https://maps.app.goo.gl/g8zpfJM5h8mHrZ5J9?g_st=ic";

export interface GuideLink {
  href: string;
  label: string;
  fullLabel: string;
}

export const GUIDE_LINKS: GuideLink[] = [
  {
    href: "/gia-thue-may-anh-dong-hoi",
    label: "Giá thuê Đồng Hới",
    fullLabel: "Giá thuê tại Đồng Hới",
  },
  {
    href: "/thue-may-anh-phong-nha",
    label: "Phong Nha",
    fullLabel: "Thuê máy đi Phong Nha",
  },
  {
    href: "/so-sanh/canon-r50-vs-canon-g7x-mark-iii",
    label: "R50 vs G7X III",
    fullLabel: "R50 vs G7X III",
  },
  {
    href: "/so-sanh/fujifilm-x100v-vs-x100vi",
    label: "X100V vs X100VI",
    fullLabel: "X100V vs X100VI",
  },
];
