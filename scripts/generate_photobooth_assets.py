import os
import subprocess
from PIL import Image, ImageOps

os.makedirs("public/photobooth/frames", exist_ok=True)
os.makedirs("public/photobooth/mockups", exist_ok=True)
os.makedirs("scratch/frames_html", exist_ok=True)

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

def get_kiho_logo_svg(color="#141413", inner_color="#FAF8F5", scale=0.6):
    return f"""
    <svg viewBox="0 0 355 175" width="{355 * scale}" height="{175 * scale}">
      <g transform="translate(-10, 0)">
        <rect x="28" y="20" width="22" height="100" rx="4" fill="{color}"/>
        <path d="M 48 72 L 87 21 C 89 18.5 92 18.5 94.5 20.5 L 104 27.5 C 106.5 29.5 106.5 32.5 104.5 35 L 68 76 Z" fill="{color}"/>
        <path d="M 58 68 L 97 113.5 C 99 116 102 116.5 104.5 114.5 L 112 108 C 114.5 106 114.5 103 112.5 100.5 L 75 58 Z" fill="{color}"/>
        <circle cx="131" cy="30" r="11" fill="{color}"/>
        <rect x="120" y="50" width="22" height="70" rx="4" fill="{color}"/>
        <rect x="156" y="20" width="22" height="100" rx="4" fill="{color}"/>
        <path d="M 178 72 C 188 56 203 50 217 50 C 232 50 239 60 239 76 L 239 120 L 217 120 L 217 78 C 217 70 212 67 204 67 C 194 67 178 74 178 88 L 178 120 L 156 120" fill="{color}"/>
        <circle cx="290" cy="85" r="37" fill="{color}"/>
        <circle cx="290" cy="85" r="21.5" fill="{inner_color}"/>
        <circle cx="290" cy="85" r="14" fill="{color}"/>
        <circle cx="285" cy="80" r="4.5" fill="{inner_color}"/>
        <text x="178" y="156" font-family="'Be Vietnam Pro', sans-serif" font-size="14" font-weight="700" fill="{color}" letter-spacing="8" text-anchor="middle">CAMERA</text>
      </g>
    </svg>
    """

# -------------------------------------------------------------
# 1. PHONG NHA ADVENTURE HTML/SVG GENERATOR
# -------------------------------------------------------------
def get_phong_nha_html(width=1080, height=1920, is_story=True):
    if is_story:
        cx, cy, cw, ch = 70, 360, 940, 1150
        logo_y = 1760
    else:
        cx, cy, cw, ch = 70, 230, 940, 810
        logo_y = 1200

    logo_svg = get_kiho_logo_svg(color="#1B3B2B", inner_color="#F8F5EE", scale=0.55)

    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=JetBrains+Mono:wght@500;700&display=swap">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{
    width: {width}px;
    height: {height}px;
    background: transparent;
    overflow: hidden;
    font-family: 'Be Vietnam Pro', sans-serif;
  }}
  .canvas {{
    width: {width}px;
    height: {height}px;
    position: relative;
  }}
</style>
</head>
<body>
<div class="canvas">
  <svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Mask punches transparent photo hole -->
      <mask id="cutout-hole">
        <rect width="{width}" height="{height}" fill="white"/>
        <rect x="{cx}" y="{cy}" width="{cw}" height="{ch}" rx="24" ry="24" fill="black"/>
      </mask>
      <!-- Topo line pattern -->
      <pattern id="topo-lines" width="200" height="200" patternUnits="userSpaceOnUse">
        <path d="M 0 50 Q 50 20 100 60 T 200 40 M 0 120 Q 60 160 120 110 T 200 130 M 0 180 Q 70 140 140 190 T 200 170" fill="none" stroke="#2E7D73" stroke-width="1.2" stroke-opacity="0.12"/>
      </pattern>
      <!-- Linear gradient for badge -->
      <linearGradient id="stamp-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#D95D39"/>
        <stop offset="100%" stop-color="#BF4622"/>
      </linearGradient>
    </defs>

    <!-- Base Canvas with Cutout -->
    <rect width="{width}" height="{height}" fill="#F8F5EE" mask="url(#cutout-hole)"/>
    <!-- Topo background accent on outer area -->
    <rect width="{width}" height="{height}" fill="url(#topo-lines)" mask="url(#cutout-hole)"/>

    <!-- Decorative Top Edge Border -->
    <rect x="30" y="30" width="{width - 60}" height="{height - 60}" rx="32" ry="32" fill="none" stroke="#1B3B2B" stroke-width="3" stroke-opacity="0.85" mask="url(#cutout-hole)"/>
    <rect x="38" y="38" width="{width - 76}" height="{height - 76}" rx="26" ry="26" fill="none" stroke="#D95D39" stroke-width="1" stroke-dasharray="8 6" stroke-opacity="0.6" mask="url(#cutout-hole)"/>

    <!-- Corner Accents for Outer Card -->
    <circle cx="50" cy="50" r="4" fill="#1B3B2B"/>
    <circle cx="{width - 50}" cy="50" r="4" fill="#1B3B2B"/>
    <circle cx="50" cy="{height - 50}" r="4" fill="#1B3B2B"/>
    <circle cx="{width - 50}" cy="{height - 50}" r="4" fill="#1B3B2B"/>

    <!-- ================= HEADER SECTION ================= -->
    <g transform="translate(0, {40 if is_story else 25})">
      <!-- Top Tag / Pill -->
      <g transform="translate({width // 2}, 35)">
        <rect x="-240" y="0" width="480" height="34" rx="17" fill="#1B3B2B"/>
        <text x="0" y="22" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12.5" font-weight="700" fill="#F8F5EE" letter-spacing="3.5">QUẢNG BÌNH // VIỆT NAM • UNESCO SITE</text>
      </g>

      <!-- Main Display Title -->
      <g transform="translate({width // 2}, 130)">
        <text x="0" y="0" text-anchor="middle" font-family="'Playfair Display', serif" font-size="{74 if is_story else 62}" font-weight="900" fill="#1B3B2B" letter-spacing="6">PHONG NHA</text>
        <text x="240" y="-12" font-family="'Playfair Display', serif" font-style="italic" font-size="{40 if is_story else 34}" font-weight="700" fill="#D95D39">Adventure</text>
      </g>

      <!-- Subtitle -->
      <g transform="translate({width // 2}, 180)">
        <text x="0" y="0" text-anchor="middle" font-family="'Be Vietnam Pro', sans-serif" font-size="{16 if is_story else 14}" font-weight="700" fill="#4B6354" letter-spacing="4">HÀNH TRÌNH CHẠM VÀO KỲ QUAN TRIỆU NĂM</text>
        <!-- Mountain Doodle Line under subtitle -->
        <path d="M -160 16 L -100 16 L -70 4 L -40 16 L 0 8 L 40 16 L 70 4 L 100 16 L 160 16" fill="none" stroke="#D95D39" stroke-width="2" stroke-linecap="round"/>
      </g>

      <!-- Expedition Stamp (Top Right) -->
      <g transform="translate({width - 150}, 85) rotate(12)">
        <circle cx="0" cy="0" r="48" fill="none" stroke="#D95D39" stroke-width="2.5" stroke-dasharray="5 3"/>
        <circle cx="0" cy="0" r="41" fill="none" stroke="#D95D39" stroke-width="1.2"/>
        <path id="curve-pn" d="M -34,0 A 34,34 0 0,1 34,0" fill="none"/>
        <text font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="700" fill="#D95D39" letter-spacing="2">
          <textPath href="#curve-pn" startOffset="50%" text-anchor="middle">KIHO EXPEDITION</textPath>
        </text>
        <text x="0" y="4" text-anchor="middle" font-family="'Playfair Display', serif" font-size="14" font-weight="900" fill="#D95D39">17°32'N</text>
        <text x="0" y="18" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" fill="#D95D39">QUẢNG BÌNH</text>
      </g>

      <!-- Postcard Airmail Hatching Accent (Top Left) -->
      <g transform="translate(65, 55)">
        <line x1="0" y1="0" x2="20" y2="40" stroke="#D95D39" stroke-width="4"/>
        <line x1="16" y1="0" x2="36" y2="40" stroke="#1B3B2B" stroke-width="4"/>
        <line x1="32" y1="0" x2="52" y2="40" stroke="#D95D39" stroke-width="4"/>
        <line x1="48" y1="0" x2="68" y2="40" stroke="#1B3B2B" stroke-width="4"/>
      </g>
    </g>

    <!-- ================= PHOTO WINDOW FRAMING ================= -->
    <!-- Outer Border of Photo Cutout -->
    <rect x="{cx}" y="{cy}" width="{cw}" height="{ch}" rx="24" ry="24" fill="none" stroke="#1B3B2B" stroke-width="4"/>
    <rect x="{cx + 6}" y="{cy + 6}" width="{cw - 12}" height="{ch - 12}" rx="18" ry="18" fill="none" stroke="#E5A93C" stroke-width="1.5" stroke-opacity="0.7"/>

    <!-- Photo Corner Mounting Brackets -->
    <!-- Top-Left -->
    <path d="M {cx - 4} {cy + 34} L {cx - 4} {cy - 4} L {cx + 34} {cy - 4}" fill="none" stroke="#D95D39" stroke-width="5" stroke-linecap="round"/>
    <!-- Top-Right -->
    <path d="M {cx + cw + 4} {cy + 34} L {cx + cw + 4} {cy - 4} L {cx + cw - 34} {cy - 4}" fill="none" stroke="#D95D39" stroke-width="5" stroke-linecap="round"/>
    <!-- Bottom-Left -->
    <path d="M {cx - 4} {cy + ch - 34} L {cx - 4} {cy + ch + 4} L {cx + 34} {cy + ch + 4}" fill="none" stroke="#D95D39" stroke-width="5" stroke-linecap="round"/>
    <!-- Bottom-Right -->
    <path d="M {cx + cw + 4} {cy + ch - 34} L {cx + cw + 4} {cy + ch + 4} L {cx + cw - 34} {cy + ch + 4}" fill="none" stroke="#D95D39" stroke-width="5" stroke-linecap="round"/>

    <!-- Ticket Notches on Left and Right of Photo Window -->
    <circle cx="{cx}" cy="{cy + ch // 2}" r="14" fill="#F8F5EE" stroke="#1B3B2B" stroke-width="3"/>
    <circle cx="{cx + cw}" cy="{cy + ch // 2}" r="14" fill="#F8F5EE" stroke="#1B3B2B" stroke-width="3"/>

    <!-- Small Film Frame Label on Photo Edge -->
    <g transform="translate({cx + 25}, {cy + 25})">
      <rect x="0" y="0" width="130" height="22" rx="4" fill="#1B3B2B" fill-opacity="0.85"/>
      <text x="65" y="15" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#F8F5EE" letter-spacing="2">FRAME #01-PN</text>
    </g>

    <!-- ================= FOOTER SECTION ================= -->
    <g transform="translate(0, {cy + ch + (35 if is_story else 20)})">
      <!-- 3 Story Highlight Pills (Modernized from reference) -->
      <g transform="translate({width // 2}, 0)">
        <!-- Badge 1: Sông Son -->
        <g transform="translate(-300, 0)">
          <rect x="-135" y="0" width="270" height="{62 if is_story else 48}" rx="12" fill="#FFFFFF" stroke="#1B3B2B" stroke-width="1.5"/>
          <circle cx="-100" cy="{31 if is_story else 24}" r="14" fill="#2E7D73"/>
          <text x="-100" y="{36 if is_story else 28}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#FFFFFF">01</text>
          <text x="-70" y="{26 if is_story else 21}" font-family="'Be Vietnam Pro', sans-serif" font-size="13" font-weight="800" fill="#1B3B2B">SÔNG SON</text>
          <text x="-70" y="{45 if is_story else 37}" font-family="'Be Vietnam Pro', sans-serif" font-size="{11 if is_story else 9.5}" font-weight="600" fill="#2E7D73">Dòng xanh ngọc bích</text>
        </g>

        <!-- Badge 2: Kỳ Quan Động -->
        <g transform="translate(0, 0)">
          <rect x="-135" y="0" width="270" height="{62 if is_story else 48}" rx="12" fill="#FFFFFF" stroke="#1B3B2B" stroke-width="1.5"/>
          <circle cx="-100" cy="{31 if is_story else 24}" r="14" fill="#D95D39"/>
          <text x="-100" y="{36 if is_story else 28}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#FFFFFF">02</text>
          <text x="-70" y="{26 if is_story else 21}" font-family="'Be Vietnam Pro', sans-serif" font-size="13" font-weight="800" fill="#1B3B2B">KỲ QUAN ĐỘNG</text>
          <text x="-70" y="{45 if is_story else 37}" font-family="'Be Vietnam Pro', sans-serif" font-size="{11 if is_story else 9.5}" font-weight="600" fill="#D95D39">Thạch nhũ triệu năm</text>
        </g>

        <!-- Badge 3: Tuổi Trẻ -->
        <g transform="translate(300, 0)">
          <rect x="-135" y="0" width="270" height="{62 if is_story else 48}" rx="12" fill="#FFFFFF" stroke="#1B3B2B" stroke-width="1.5"/>
          <circle cx="-100" cy="{31 if is_story else 24}" r="14" fill="#1B3B2B"/>
          <text x="-100" y="{36 if is_story else 28}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#FFFFFF">03</text>
          <text x="-70" y="{26 if is_story else 21}" font-family="'Be Vietnam Pro', sans-serif" font-size="13" font-weight="800" fill="#1B3B2B">DẤU ẤN BẠN BÈ</text>
          <text x="-70" y="{45 if is_story else 37}" font-family="'Be Vietnam Pro', sans-serif" font-size="{11 if is_story else 9.5}" font-weight="600" fill="#1B3B2B">Thanh xuân ghi dấu</text>
        </g>
      </g>

      <!-- Subtle Divider Line -->
      <line x1="80" y1="{90 if is_story else 68}" x2="{width - 80}" y2="{90 if is_story else 68}" stroke="#1B3B2B" stroke-width="1.2" stroke-dasharray="6 4" stroke-opacity="0.4"/>

      <!-- Brand Footer Row -->
      <g transform="translate(0, {110 if is_story else 80})">
        <!-- Kiho Logo (Left) -->
        <g transform="translate(75, 5)">
          {logo_svg}
        </g>

        <!-- Center Metadata -->
        <g transform="translate({width // 2}, 38)">
          <text x="0" y="0" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#1B3B2B" letter-spacing="2">TRAVEL PHOTOBOOTH • QUẢNG BÌNH</text>
          <text x="0" y="20" text-anchor="middle" font-family="'Be Vietnam Pro', sans-serif" font-size="12" font-weight="600" fill="#6B7D73">Lưu giữ từng khoảnh khắc khám phá di sản</text>
        </g>

        <!-- Right Barcode & GPS -->
        <g transform="translate({width - 240}, 15)">
          <!-- Barcode simulation -->
          <g fill="#1B3B2B">
            <rect x="0" y="0" width="3" height="28"/>
            <rect x="5" y="0" width="1.5" height="28"/>
            <rect x="9" y="0" width="4" height="28"/>
            <rect x="16" y="0" width="2" height="28"/>
            <rect x="21" y="0" width="5" height="28"/>
            <rect x="29" y="0" width="1.5" height="28"/>
            <rect x="33" y="0" width="3" height="28"/>
            <rect x="39" y="0" width="6" height="28"/>
            <rect x="48" y="0" width="2" height="28"/>
            <rect x="53" y="0" width="4" height="28"/>
            <rect x="60" y="0" width="2" height="28"/>
            <rect x="65" y="0" width="5" height="28"/>
            <rect x="73" y="0" width="2" height="28"/>
            <rect x="78" y="0" width="4" height="28"/>
            <rect x="85" y="0" width="2" height="28"/>
            <rect x="90" y="0" width="5" height="28"/>
            <rect x="98" y="0" width="2" height="28"/>
            <rect x="103" y="0" width="4" height="28"/>
            <rect x="110" y="0" width="6" height="28"/>
            <rect x="120" y="0" width="2" height="28"/>
            <rect x="125" y="0" width="4" height="28"/>
            <rect x="132" y="0" width="3" height="28"/>
            <rect x="138" y="0" width="2" height="28"/>
            <rect x="143" y="0" width="5" height="28"/>
          </g>
          <text x="75" y="42" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#1B3B2B" letter-spacing="2">KIHO-PN-2026</text>
        </g>
      </g>
    </g>
  </svg>
</div>
</body>
</html>"""

# -------------------------------------------------------------
# 2. ĐỒNG HỚI BEACH & SUNSET HTML/SVG GENERATOR
# -------------------------------------------------------------
def get_dong_hoi_sunset_html(width=1080, height=1920, is_story=True):
    if is_story:
        cx, cy, cw, ch = 70, 360, 940, 1150
    else:
        cx, cy, cw, ch = 70, 230, 940, 810

    logo_svg = get_kiho_logo_svg(color="#D95D39", inner_color="#FDF7F2", scale=0.55)

    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600;1,700&family=JetBrains+Mono:wght@500;700&display=swap">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{
    width: {width}px;
    height: {height}px;
    background: transparent;
    overflow: hidden;
    font-family: 'Be Vietnam Pro', sans-serif;
  }}
  .canvas {{
    width: {width}px;
    height: {height}px;
    position: relative;
  }}
</style>
</head>
<body>
<div class="canvas">
  <svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <mask id="cutout-sunset">
        <rect width="{width}" height="{height}" fill="white"/>
        <rect x="{cx}" y="{cy}" width="{cw}" height="{ch}" rx="20" ry="20" fill="black"/>
      </mask>
      <linearGradient id="sunset-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FDF8F4"/>
        <stop offset="60%" stop-color="#FCF3EC"/>
        <stop offset="100%" stop-color="#F7E6D7"/>
      </linearGradient>
      <linearGradient id="gold-sunset" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D95D39"/>
        <stop offset="50%" stop-color="#F29C38"/>
        <stop offset="100%" stop-color="#D95D39"/>
      </linearGradient>
    </defs>

    <!-- Canvas Background with Cutout -->
    <rect width="{width}" height="{height}" fill="url(#sunset-bg)" mask="url(#cutout-sunset)"/>

    <!-- Subtle Wave & Breeze Line Accents -->
    <g mask="url(#cutout-sunset)" opacity="0.35">
      <path d="M 0 100 Q 270 70 540 100 T 1080 100" fill="none" stroke="#D95D39" stroke-width="1.5"/>
      <path d="M 0 115 Q 270 85 540 115 T 1080 115" fill="none" stroke="#F29C38" stroke-width="1"/>
      <path d="M 0 {height - 100} Q 270 {height - 130} 540 {height - 100} T 1080 {height - 100}" fill="none" stroke="#3D7068" stroke-width="1.5"/>
    </g>

    <!-- Thin Double Border Frame -->
    <rect x="30" y="30" width="{width - 60}" height="{height - 60}" rx="28" ry="28" fill="none" stroke="#D95D39" stroke-width="2" stroke-opacity="0.7" mask="url(#cutout-sunset)"/>
    <rect x="38" y="38" width="{width - 76}" height="{height - 76}" rx="22" ry="22" fill="none" stroke="#F29C38" stroke-width="1" stroke-opacity="0.4" mask="url(#cutout-sunset)"/>

    <!-- ================= HEADER SECTION ================= -->
    <g transform="translate(0, {40 if is_story else 25})">
      <!-- Tag Pill -->
      <g transform="translate({width // 2}, 30)">
        <rect x="-180" y="0" width="360" height="32" rx="16" fill="#D95D39" fill-opacity="0.12"/>
        <rect x="-180" y="0" width="360" height="32" rx="16" fill="none" stroke="#D95D39" stroke-width="1.2"/>
        <text x="0" y="21" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="700" fill="#D95D39" letter-spacing="3.5">NHẬT LỆ • BẢO NINH • GOLDEN HOUR</text>
      </g>

      <!-- Main Display Title -->
      <g transform="translate({width // 2}, 125)">
        <text x="0" y="0" text-anchor="middle" font-family="'Playfair Display', serif" font-size="{70 if is_story else 58}" font-weight="900" fill="#1C1917" letter-spacing="4">ĐỒNG HỚI</text>
        <text x="0" y="{42 if is_story else 38}" text-anchor="middle" font-family="'Playfair Display', serif" font-style="italic" font-size="{34 if is_story else 28}" font-weight="600" fill="#D95D39">Sunset &amp; Sea Breeze</text>
      </g>

      <!-- Poetic Subline -->
      <g transform="translate({width // 2}, {205 if is_story else 185})">
        <text x="0" y="0" text-anchor="middle" font-family="'Be Vietnam Pro', sans-serif" font-size="{15 if is_story else 13}" font-weight="600" fill="#6E5A4E" letter-spacing="3">HOÀNG HÔN NHUỘM VÀNG SÓNG BIỂN MIỀN TRUNG</text>
      </g>

      <!-- Sunburst & Breeze Emblem (Top Right) -->
      <g transform="translate({width - 150}, 85)">
        <circle cx="0" cy="0" r="44" fill="none" stroke="#D95D39" stroke-width="1.5"/>
        <!-- Sun Rays -->
        <g stroke="#D95D39" stroke-width="1.5">
          <line x1="0" y1="-52" x2="0" y2="-44"/>
          <line x1="0" y1="44" x2="0" y2="52"/>
          <line x1="-52" y1="0" x2="-44" y2="0"/>
          <line x1="44" y1="0" x2="52" y2="0"/>
          <line x1="-36" y1="-36" x2="-30" y2="-30"/>
          <line x1="30" y1="30" x2="36" y2="36"/>
          <line x1="-36" y1="36" x2="-30" y2="30"/>
          <line x1="30" y1="-30" x2="36" y2="-36"/>
        </g>
        <text x="0" y="-4" text-anchor="middle" font-family="'Playfair Display', serif" font-size="14" font-weight="700" fill="#D95D39">17:45</text>
        <text x="0" y="14" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700" fill="#6E5A4E">SUNSET</text>
      </g>

      <!-- Minimal Wave Mark (Top Left) -->
      <g transform="translate(70, 70)">
        <path d="M 0 0 C 15 -10 25 10 40 0 C 55 -10 65 10 80 0" fill="none" stroke="#3D7068" stroke-width="2" stroke-linecap="round"/>
        <path d="M 0 12 C 15 2 25 22 40 12 C 55 2 65 22 80 12" fill="none" stroke="#3D7068" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      </g>
    </g>

    <!-- ================= PHOTO WINDOW FRAMING ================= -->
    <rect x="{cx}" y="{cy}" width="{cw}" height="{ch}" rx="20" ry="20" fill="none" stroke="#D95D39" stroke-width="3"/>
    <rect x="{cx + 8}" y="{cy + 8}" width="{cw - 16}" height="{ch - 16}" rx="14" ry="14" fill="none" stroke="#FFFFFF" stroke-width="2"/>

    <!-- Subtle Registration Crosshairs at Corners -->
    <!-- Top-Left -->
    <g transform="translate({cx + 30}, {cy + 30})" stroke="#D95D39" stroke-width="1.8">
      <line x1="-12" y1="0" x2="12" y2="0"/>
      <line x1="0" y1="-12" x2="0" y2="12"/>
      <circle cx="0" cy="0" r="4" fill="none"/>
    </g>
    <!-- Top-Right -->
    <g transform="translate({cx + cw - 30}, {cy + 30})" stroke="#D95D39" stroke-width="1.8">
      <line x1="-12" y1="0" x2="12" y2="0"/>
      <line x1="0" y1="-12" x2="0" y2="12"/>
      <circle cx="0" cy="0" r="4" fill="none"/>
    </g>
    <!-- Bottom-Left -->
    <g transform="translate({cx + 30}, {cy + ch - 30})" stroke="#D95D39" stroke-width="1.8">
      <line x1="-12" y1="0" x2="12" y2="0"/>
      <line x1="0" y1="-12" x2="0" y2="12"/>
      <circle cx="0" cy="0" r="4" fill="none"/>
    </g>
    <!-- Bottom-Right -->
    <g transform="translate({cx + cw - 30}, {cy + ch - 30})" stroke="#D95D39" stroke-width="1.8">
      <line x1="-12" y1="0" x2="12" y2="0"/>
      <line x1="0" y1="-12" x2="0" y2="12"/>
      <circle cx="0" cy="0" r="4" fill="none"/>
    </g>

    <!-- ================= FOOTER SECTION ================= -->
    <g transform="translate(0, {cy + ch + (35 if is_story else 22)})">
      <!-- Poetic Caption Banner -->
      <g transform="translate({width // 2}, 0)">
        <text x="0" y="0" text-anchor="middle" font-family="'Playfair Display', serif" font-style="italic" font-size="{20 if is_story else 16}" font-weight="600" fill="#1C1917">
          “Gió biển mát rượi, sóng vỗ bờ cát trắng — Giữ lại những ngày thanh xuân rực rỡ.”
        </text>
      </g>

      <!-- Contact Sheet Film Metadata Strip -->
      <g transform="translate({width // 2}, {50 if is_story else 38})">
        <rect x="-420" y="0" width="840" height="{42 if is_story else 34}" rx="8" fill="#FFFFFF" stroke="#D95D39" stroke-width="1" stroke-opacity="0.5"/>
        <text x="0" y="{26 if is_story else 21}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="{12 if is_story else 10.5}" font-weight="700" fill="#D95D39" letter-spacing="3">
          ROLL #04 // CANON R50 • 35MM F/1.8 • GOLDEN HOUR • ĐỒNG HỚI COAST
        </text>
      </g>

      <!-- Brand Footer Row -->
      <g transform="translate(0, {115 if is_story else 85})">
        <g transform="translate(75, 0)">
          {logo_svg}
        </g>
        <g transform="translate({width // 2}, 32)">
          <text x="0" y="0" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#D95D39" letter-spacing="3">KIHO PHOTOBOOTH // MEMORY ARCHIVE</text>
          <text x="0" y="20" text-anchor="middle" font-family="'Be Vietnam Pro', sans-serif" font-size="12" font-weight="500" fill="#6E5A4E">Boutique Camera Rental • Đồng Hới, Quảng Bình</text>
        </g>
        <!-- Coordinates Badge -->
        <g transform="translate({width - 240}, 15)">
          <rect x="0" y="0" width="165" height="38" rx="19" fill="#1C1917"/>
          <text x="82.5" y="23" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#FDF8F4" letter-spacing="1.5">17°28'N 106°36'E</text>
        </g>
      </g>
    </g>
  </svg>
</div>
</body>
</html>"""

# -------------------------------------------------------------
# 3. CAFE CHECK-IN / CITY CHILL HTML/SVG GENERATOR
# -------------------------------------------------------------
def get_cafe_chill_html(width=1080, height=1920, is_story=True):
    if is_story:
        cx, cy, cw, ch = 70, 360, 940, 1150
    else:
        cx, cy, cw, ch = 70, 230, 940, 810

    logo_svg = get_kiho_logo_svg(color="#141414", inner_color="#F8F7F4", scale=0.55)

    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=JetBrains+Mono:wght@500;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{
    width: {width}px;
    height: {height}px;
    background: transparent;
    overflow: hidden;
    font-family: 'Be Vietnam Pro', sans-serif;
  }}
  .canvas {{
    width: {width}px;
    height: {height}px;
    position: relative;
  }}
</style>
</head>
<body>
<div class="canvas">
  <svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <mask id="cutout-cafe">
        <rect width="{width}" height="{height}" fill="white"/>
        <rect x="{cx}" y="{cy}" width="{cw}" height="{ch}" rx="14" ry="14" fill="black"/>
      </mask>
      <pattern id="dot-grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#141414" fill-opacity="0.08"/>
      </pattern>
    </defs>

    <!-- Canvas Background with Cutout -->
    <rect width="{width}" height="{height}" fill="#F8F7F4" mask="url(#cutout-cafe)"/>
    <!-- Subtle Dot Grid in Background -->
    <rect width="{width}" height="{height}" fill="url(#dot-grid)" mask="url(#cutout-cafe)"/>

    <!-- Editorial Outer Frame Rule -->
    <rect x="35" y="35" width="{width - 70}" height="{height - 70}" rx="20" ry="20" fill="none" stroke="#141414" stroke-width="1.8" mask="url(#cutout-cafe)"/>

    <!-- ================= HEADER SECTION ================= -->
    <g transform="translate(0, {40 if is_story else 25})">
      <!-- Editorial Issue & Vol Label -->
      <g transform="translate(70, 30)">
        <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#141414" letter-spacing="3">ISSUE 03 // CITY LIFESTYLE EDIT</text>
      </g>
      <g transform="translate({width - 70}, 30)">
        <text x="0" y="0" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#A88B74" letter-spacing="2">ĐỒNG HỚI • 2026</text>
      </g>

      <!-- Main Headline -->
      <g transform="translate(70, 115)">
        <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="{68 if is_story else 56}" font-weight="800" fill="#141414" letter-spacing="-1">CITY CHILL</text>
        <text x="360" y="-12" font-family="'Playfair Display', serif" font-style="italic" font-size="{34 if is_story else 28}" font-weight="600" fill="#D95D39">&amp; Cafe Hopping</text>
      </g>

      <!-- Subtitle -->
      <g transform="translate(72, {165 if is_story else 150})">
        <text x="0" y="0" font-family="'Be Vietnam Pro', sans-serif" font-size="{15 if is_story else 13}" font-weight="600" fill="#55534E" letter-spacing="2">
          NHỮNG GÓC PHỐ ĐỒNG HỚI BÌNH YÊN • TÁCH CÀ PHÊ &amp; CUỐN PHIM THANH XUÂN
        </text>
      </g>

      <!-- Washi Tape Accent on Top Right (Tilted 4deg) -->
      <g transform="translate({width - 210}, 65) rotate(4)">
        <rect x="0" y="0" width="145" height="38" rx="3" fill="#E5DCCE" fill-opacity="0.85" stroke="#C8BCAB" stroke-width="1"/>
        <!-- Jagged tape edges -->
        <line x1="0" y1="0" x2="0" y2="38" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="3 3"/>
        <line x1="145" y1="0" x2="145" y2="38" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="3 3"/>
        <text x="72.5" y="24" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#141414" letter-spacing="2">KIHO CHECK-IN ☕</text>
      </g>
    </g>

    <!-- ================= PHOTO WINDOW FRAMING ================= -->
    <rect x="{cx}" y="{cy}" width="{cw}" height="{ch}" rx="14" ry="14" fill="none" stroke="#141414" stroke-width="2.5"/>
    <rect x="{cx + 6}" y="{cy + 6}" width="{cw - 12}" height="{ch - 12}" rx="10" ry="10" fill="none" stroke="#A88B74" stroke-width="1" stroke-opacity="0.6"/>

    <!-- Subtle Viewfinder Target Mark in Center -->
    <g transform="translate({cx + cw // 2}, {cy + ch // 2})" stroke="#FFFFFF" stroke-width="1.8" opacity="0.8">
      <circle cx="0" cy="0" r="16" fill="none"/>
      <circle cx="0" cy="0" r="3" fill="#FFFFFF"/>
      <line x1="-24" y1="0" x2="-10" y2="0"/>
      <line x1="10" y1="0" x2="24" y2="0"/>
      <line x1="0" y1="-24" x2="0" y2="-10"/>
      <line x1="0" y1="10" x2="0" y2="24"/>
    </g>

    <!-- Corner Tag: 1/250s f/2.0 -->
    <g transform="translate({cx + cw - 160}, {cy + 25})">
      <rect x="0" y="0" width="135" height="24" rx="4" fill="#141414" fill-opacity="0.8"/>
      <text x="67.5" y="16" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#FFFFFF" letter-spacing="1.5">FUJI X100V • 23MM</text>
    </g>

    <!-- ================= FOOTER SECTION ================= -->
    <g transform="translate(0, {cy + ch + (30 if is_story else 18)})">
      <!-- Audio Track Player Bar (Chic Gen Z / Instagram trend element) -->
      <g transform="translate(70, 0)">
        <rect x="0" y="0" width="{cw}" height="{52 if is_story else 42}" rx="10" fill="#FFFFFF" stroke="#141414" stroke-width="1.5"/>
        <!-- Play icon -->
        <polygon points="25,{26 if is_story else 21} 37,{33 if is_story else 27} 25,{40 if is_story else 33}" fill="#141414"/>
        <text x="50" y="{32 if is_story else 26}" font-family="'Be Vietnam Pro', sans-serif" font-size="{13 if is_story else 11.5}" font-weight="700" fill="#141414">
          Đồng Hới Chiều Mưa Bay — Acoustic Chill
        </text>
        <!-- Progress Bar -->
        <g transform="translate({420 if is_story else 360}, {26 if is_story else 21})">
          <line x1="0" y1="0" x2="{360 if is_story else 320}" y2="0" stroke="#E5DCCE" stroke-width="4" stroke-linecap="round"/>
          <line x1="0" y1="0" x2="{140 if is_story else 120}" y2="0" stroke="#D95D39" stroke-width="4" stroke-linecap="round"/>
          <circle cx="{140 if is_story else 120}" cy="0" r="6" fill="#D95D39"/>
        </g>
        <text x="{cw - 20}" y="{32 if is_story else 26}" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="{11 if is_story else 10}" font-weight="700" fill="#55534E">
          02:14 / 03:45
        </text>
      </g>

      <!-- Memo Note & Date Blank -->
      <g transform="translate(70, {68 if is_story else 52})">
        <text x="0" y="16" font-family="'Playfair Display', serif" font-style="italic" font-size="{17 if is_story else 14}" font-weight="600" fill="#141414">
          “Góc cà phê nhỏ, tiếng trò chuyện rôm rả và những khung hình không cần vội vã.”
        </text>
      </g>

      <!-- Brand Footer Row -->
      <g transform="translate(0, {110 if is_story else 80})">
        <g transform="translate(70, 0)">
          {logo_svg}
        </g>
        <g transform="translate({width // 2}, 30)">
          <text x="0" y="0" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#141414" letter-spacing="3">KIHO CAMERA LIFESTYLE // ĐỒNG HỚI</text>
          <text x="0" y="20" text-anchor="middle" font-family="'Be Vietnam Pro', sans-serif" font-size="11.5" font-weight="500" fill="#6E6C67">Dịch vụ cho thuê máy ảnh du lịch • Quảng Bình</text>
        </g>
        <!-- Date Stamp Box -->
        <g transform="translate({width - 240}, 10)">
          <rect x="0" y="0" width="165" height="42" rx="6" fill="#FFFFFF" stroke="#141414" stroke-width="1.5"/>
          <text x="82.5" y="18" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#6E6C67">DATE / MEMORY</text>
          <text x="82.5" y="34" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#D95D39">2026 . 08 . 29</text>
        </g>
      </g>
    </g>
  </svg>
</div>
</body>
</html>"""

# -------------------------------------------------------------
# 4. Y2K / FLASH MEMORY HTML/SVG GENERATOR
# -------------------------------------------------------------
def get_y2k_flash_html(width=1080, height=1920, is_story=True):
    if is_story:
        cx, cy, cw, ch = 70, 360, 940, 1150
    else:
        cx, cy, cw, ch = 70, 230, 940, 810

    logo_svg = get_kiho_logo_svg(color="#FFFFFF", inner_color="#0E1017", scale=0.55)

    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Playfair+Display:ital,wght@0,700;1,700&family=JetBrains+Mono:wght@500;700;800&family=Plus+Jakarta+Sans:wght@800;900&display=swap">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{
    width: {width}px;
    height: {height}px;
    background: transparent;
    overflow: hidden;
    font-family: 'JetBrains Mono', monospace;
  }}
  .canvas {{
    width: {width}px;
    height: {height}px;
    position: relative;
  }}
</style>
</head>
<body>
<div class="canvas">
  <svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <mask id="cutout-y2k">
        <rect width="{width}" height="{height}" fill="white"/>
        <rect x="{cx}" y="{cy}" width="{cw}" height="{ch}" rx="24" ry="24" fill="black"/>
      </mask>
      <linearGradient id="cyber-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F111A"/>
        <stop offset="50%" stop-color="#151824"/>
        <stop offset="100%" stop-color="#0B0C12"/>
      </linearGradient>
      <linearGradient id="chrome-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="25%" stop-color="#C5CCD9"/>
        <stop offset="50%" stop-color="#FFFFFF"/>
        <stop offset="75%" stop-color="#8E9AA8"/>
        <stop offset="100%" stop-color="#E2E8F0"/>
      </linearGradient>
      <linearGradient id="hologram-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="50%" stop-color="#C084FC"/>
        <stop offset="100%" stop-color="#F472B6"/>
      </linearGradient>
    </defs>

    <!-- Dark Titanium Cyber Canvas with Cutout -->
    <rect width="{width}" height="{height}" fill="url(#cyber-bg)" mask="url(#cutout-y2k)"/>

    <!-- Subtle Y2K Grid -->
    <g stroke="#38BDF8" stroke-width="1" stroke-opacity="0.08" mask="url(#cutout-y2k)">
      <line x1="0" y1="120" x2="{width}" y2="120"/>
      <line x1="0" y1="240" x2="{width}" y2="240"/>
      <line x1="0" y1="{height - 120}" x2="{width}" y2="{height - 120}"/>
      <line x1="160" y1="0" x2="160" y2="{height}"/>
      <line x1="{width - 160}" y1="0" x2="{width - 160}" y2="{height}"/>
    </g>

    <!-- Outer Chrome Metallic Border -->
    <rect x="30" y="30" width="{width - 60}" height="{height - 60}" rx="28" ry="28" fill="none" stroke="url(#chrome-grad)" stroke-width="2.5" stroke-opacity="0.75" mask="url(#cutout-y2k)"/>

    <!-- Decorative Chrome Starbursts (✦ ✧) -->
    <g fill="url(#chrome-grad)" mask="url(#cutout-y2k)">
      <!-- Top Left Star -->
      <path d="M 65 75 Q 85 75 85 55 Q 85 75 105 75 Q 85 75 85 95 Q 85 75 65 75 Z"/>
      <!-- Top Right Star -->
      <path d="M {width - 95} 85 Q {width - 75} 85 {width - 75} 65 Q {width - 75} 85 {width - 55} 85 Q {width - 75} 85 {width - 75} 105 Q {width - 75} 85 {width - 95} 85 Z"/>
      <!-- Bottom Left Star -->
      <path d="M 65 {height - 85} Q 85 {height - 85} 85 {height - 105} Q 85 {height - 85} 105 {height - 85} Q 85 {height - 85} 85 {height - 65} Q 85 {height - 85} 65 {height - 85} Z"/>
    </g>

    <!-- ================= HEADER SECTION ================= -->
    <g transform="translate(0, {40 if is_story else 25})">
      <!-- Digicam OSD / HUD Status Bar -->
      <g transform="translate({width // 2}, 30)">
        <rect x="-420" y="0" width="840" height="34" rx="8" fill="#1E2333" stroke="#38BDF8" stroke-width="1" stroke-opacity="0.4"/>
        <!-- Flashing Red REC Dot -->
        <circle cx="-385" cy="17" r="6" fill="#EF4444"/>
        <text x="-365" y="22" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#EF4444">REC [SP]</text>
        <text x="-260" y="22" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#FFFFFF">00:24:18</text>

        <!-- Battery Indicator -->
        <g transform="translate(180, 10)">
          <rect x="0" y="0" width="36" height="14" rx="2" fill="none" stroke="#38BDF8" stroke-width="1.5"/>
          <rect x="36" y="3" width="3" height="8" rx="1" fill="#38BDF8"/>
          <rect x="3" y="3" width="22" height="8" fill="#38BDF8"/>
          <text x="50" y="12" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#38BDF8">95%</text>
        </g>
        <text x="320" y="22" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#F59E0B">⚡ FLASH: ON</text>
      </g>

      <!-- Main Display Title -->
      <g transform="translate({width // 2}, 125)">
        <text x="0" y="0" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="{70 if is_story else 58}" font-weight="900" fill="url(#chrome-grad)" letter-spacing="4">
          FLASH MEMORY
        </text>
      </g>

      <!-- Subtitle -->
      <g transform="translate({width // 2}, {180 if is_story else 165})">
        <text x="0" y="0" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="{13 if is_story else 11.5}" font-weight="700" fill="#38BDF8" letter-spacing="4">
          ★ KIHO DIGICAM PHOTOBOOTH • CYBER RETRO 2000s ★
        </text>
      </g>
    </g>

    <!-- ================= PHOTO WINDOW FRAMING ================= -->
    <!-- Metallic Viewfinder Border -->
    <rect x="{cx}" y="{cy}" width="{cw}" height="{ch}" rx="24" ry="24" fill="none" stroke="url(#chrome-grad)" stroke-width="4"/>
    <rect x="{cx + 6}" y="{cy + 6}" width="{cw - 12}" height="{ch - 12}" rx="18" ry="18" fill="none" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.6"/>

    <!-- Autofocus Target Brackets in Viewfinder -->
    <!-- Top-Left Bracket -->
    <path d="M {cx + 35} {cy + 75} L {cx + 35} {cy + 35} L {cx + 75} {cy + 35}" fill="none" stroke="#FFFFFF" stroke-width="3"/>
    <!-- Top-Right Bracket -->
    <path d="M {cx + cw - 35} {cy + 75} L {cx + cw - 35} {cy + 35} L {cx + cw - 75} {cy + 35}" fill="none" stroke="#FFFFFF" stroke-width="3"/>
    <!-- Bottom-Left Bracket -->
    <path d="M {cx + 35} {cy + ch - 75} L {cx + 35} {cy + ch - 35} L {cx + 75} {cy + ch - 35}" fill="none" stroke="#FFFFFF" stroke-width="3"/>
    <!-- Bottom-Right Bracket -->
    <path d="M {cx + cw - 35} {cy + ch - 75} L {cx + cw - 35} {cy + ch - 35} L {cx + cw - 75} {cy + ch - 35}" fill="none" stroke="#FFFFFF" stroke-width="3"/>

    <!-- Central Focus Crosshair -->
    <g transform="translate({cx + cw // 2}, {cy + ch // 2})" stroke="#38BDF8" stroke-width="2">
      <line x1="-20" y1="0" x2="-8" y2="0"/>
      <line x1="8" y1="0" x2="20" y2="0"/>
      <line x1="0" y1="-20" x2="0" y2="-8"/>
      <line x1="0" y1="8" x2="0" y2="20"/>
      <circle cx="0" cy="0" r="3" fill="#38BDF8"/>
    </g>

    <!-- Digicam Bottom OSD Overlay on Photo Edge -->
    <g transform="translate({cx + 35}, {cy + ch - 35})">
      <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#FFFFFF" fill-opacity="0.9" letter-spacing="2">
        ISO 400 • F/2.8 • 1/125s • AWB • [AF-C]
      </text>
    </g>

    <!-- ================= FOOTER SECTION ================= -->
    <g transform="translate(0, {cy + ch + (35 if is_story else 20)})">
      <!-- Iconic Vintage 7-Segment Digital Orange Date Stamp + Hologram Badges -->
      <g transform="translate({width // 2}, 0)">
        <!-- Digital Orange Date Stamp -->
        <g transform="translate(-250, 0)">
          <rect x="-140" y="0" width="280" height="{56 if is_story else 44}" rx="10" fill="#000000" stroke="#FF6B00" stroke-width="2"/>
          <text x="0" y="{38 if is_story else 30}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="{28 if is_story else 22}" font-weight="800" fill="#FF6B00" letter-spacing="4">
            ’26 08 29
          </text>
        </g>

        <!-- Holographic Pop Sticker: PURE MEMORY -->
        <g transform="translate(80, 0)">
          <rect x="-90" y="0" width="180" height="{56 if is_story else 44}" rx="10" fill="url(#hologram-grad)"/>
          <text x="0" y="{35 if is_story else 28}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="{13 if is_story else 11.5}" font-weight="900" fill="#000000" letter-spacing="1">
            ★ PURE MEMORY ★
          </text>
        </g>

        <!-- Holographic Pop Sticker: SMILE! -->
        <g transform="translate(290, 0)">
          <rect x="-90" y="0" width="180" height="{56 if is_story else 44}" rx="10" fill="#FFFFFF" stroke="#38BDF8" stroke-width="2"/>
          <text x="0" y="{35 if is_story else 28}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="{13 if is_story else 11.5}" font-weight="800" fill="#0E1017" letter-spacing="1">
            SMILE &amp; FLASH 📸
          </text>
        </g>
      </g>

      <!-- Brand Footer Row -->
      <g transform="translate(0, {95 if is_story else 70})">
        <g transform="translate(70, 0)">
          {logo_svg}
        </g>
        <g transform="translate({width // 2}, 30)">
          <text x="0" y="0" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12.5" font-weight="700" fill="url(#chrome-grad)" letter-spacing="3">KIHO DIGITAL CAMERA CLUB // FLASH EDITION</text>
          <text x="0" y="20" text-anchor="middle" font-family="'Be Vietnam Pro', sans-serif" font-size="11.5" font-weight="500" fill="#94A3B8">Đồng Hới, Quảng Bình • Tag @kihocamera to get featured</text>
        </g>
        <!-- SD Card Icon / Badge -->
        <g transform="translate({width - 240}, 10)">
          <rect x="0" y="0" width="165" height="40" rx="8" fill="#1E2333" stroke="#38BDF8" stroke-width="1.5"/>
          <text x="82.5" y="25" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#38BDF8" letter-spacing="2">SD: 128GB OK</text>
        </g>
      </g>
    </g>
  </svg>
</div>
</body>
</html>"""

# -------------------------------------------------------------
# EXECUTION: RENDER ALL 8 FRAMES (9:16 and 4:5)
# -------------------------------------------------------------
frames = [
    ("phong-nha", get_phong_nha_html, "sample-fuji-2.webp"),
    ("dong-hoi-sunset", get_dong_hoi_sunset_html, "sample-r50-1.webp"),
    ("cafe-chill", get_cafe_chill_html, "sample-g7x-1.webp"),
    ("y2k-flash", get_y2k_flash_html, "sample-y2k-1.webp")
]

for name, generator, sample_name in frames:
    # 1. Generate 9:16 (1080x1920)
    html_9x16 = generator(1080, 1920, is_story=True)
    html_path_9x16 = f"scratch/frames_html/{name}-9x16.html"
    with open(html_path_9x16, "w", encoding="utf-8") as f:
        f.write(html_9x16)

    png_out_9x16 = os.path.abspath(f"public/photobooth/frames/{name}-9x16.png")
    cmd_9x16 = [
        EDGE_PATH,
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        "--default-background-color=00000000",
        "--window-size=1080,1920",
        f"--screenshot={png_out_9x16}",
        os.path.abspath(html_path_9x16)
    ]
    print(f"Rendering {name}-9x16.png...")
    subprocess.run(cmd_9x16, check=True)

    # 2. Generate 4:5 (1080x1350)
    html_4x5 = generator(1080, 1350, is_story=False)
    html_path_4x5 = f"scratch/frames_html/{name}-4x5.html"
    with open(html_path_4x5, "w", encoding="utf-8") as f:
        f.write(html_4x5)

    png_out_4x5 = os.path.abspath(f"public/photobooth/frames/{name}-4x5.png")
    cmd_4x5 = [
        EDGE_PATH,
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        "--default-background-color=00000000",
        "--window-size=1080,1350",
        f"--screenshot={png_out_4x5}",
        os.path.abspath(html_path_4x5)
    ]
    print(f"Rendering {name}-4x5.png...")
    subprocess.run(cmd_4x5, check=True)

    # 3. Export standalone SVG files
    # Extract the SVG portion from HTML
    svg_start = html_9x16.find("<svg")
    svg_end = html_9x16.find("</svg>") + 6
    if svg_start != -1 and svg_end != -1:
        svg_9x16 = html_9x16[svg_start:svg_end]
        with open(f"public/photobooth/frames/{name}-9x16.svg", "w", encoding="utf-8") as f:
            f.write(svg_9x16)

    svg_start_45 = html_4x5.find("<svg")
    svg_end_45 = html_4x5.find("</svg>") + 6
    if svg_start_45 != -1 and svg_end_45 != -1:
        svg_4x5 = html_4x5[svg_start_45:svg_end_45]
        with open(f"public/photobooth/frames/{name}-4x5.svg", "w", encoding="utf-8") as f:
            f.write(svg_4x5)

    # 4. Generate composite mockups with sample photo behind the frame!
    sample_path = os.path.join("public/images/samples", sample_name)
    if os.path.exists(sample_path):
        sample_img = Image.open(sample_path).convert("RGBA")

        # Mockup 9:16
        frame_9x16 = Image.open(png_out_9x16).convert("RGBA")
        mock_9x16 = Image.new("RGBA", (1080, 1920), (250, 248, 245, 255))
        # Cutout dimensions for 9:16
        cx, cy, cw, ch = 70, 360, 940, 1150
        # Resize & crop sample to fit cutout generously
        fitted_sample = ImageOps.fit(sample_img, (cw + 20, ch + 20), method=Image.Resampling.LANCZOS)
        mock_9x16.paste(fitted_sample, (cx - 10, cy - 10))
        mock_9x16.paste(frame_9x16, (0, 0), frame_9x16)
        mock_9x16.save(f"public/photobooth/mockups/{name}-9x16-mockup.png", "PNG")
        mock_9x16.convert("RGB").save(f"public/photobooth/mockups/{name}-9x16-mockup.webp", "WEBP", quality=90)

        # Mockup 4:5
        frame_4x5 = Image.open(png_out_4x5).convert("RGBA")
        mock_4x5 = Image.new("RGBA", (1080, 1350), (250, 248, 245, 255))
        # Cutout dimensions for 4:5
        cx, cy, cw, ch = 70, 230, 940, 810
        fitted_sample_45 = ImageOps.fit(sample_img, (cw + 20, ch + 20), method=Image.Resampling.LANCZOS)
        mock_4x5.paste(fitted_sample_45, (cx - 10, cy - 10))
        mock_4x5.paste(frame_4x5, (0, 0), frame_4x5)
        mock_4x5.save(f"public/photobooth/mockups/{name}-4x5-mockup.png", "PNG")
        mock_4x5.convert("RGB").save(f"public/photobooth/mockups/{name}-4x5-mockup.webp", "WEBP", quality=90)

print("\n--- ALL PHOTOBOOTH FRAMES & MOCKUPS GENERATED SUCCESSFULLY! ---")
