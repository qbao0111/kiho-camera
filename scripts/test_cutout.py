import subprocess
import os
from PIL import Image

test_svg_html = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 600px;
    height: 800px;
    background: transparent;
    overflow: hidden;
  }
</style>
</head>
<body>
<svg width="600" height="800" viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg">
  <!-- Background with evenodd cutout -->
  <path fill="#FAF8F5" fill-rule="evenodd" d="
    M 0 0 H 600 V 800 H 0 Z
    M 50 150 H 550 V 650 H 50 Z
  "/>
  <!-- Border around cutout -->
  <rect x="50" y="150" width="500" height="500" rx="8" fill="none" stroke="#D95D39" stroke-width="4" stroke-dasharray="8,8"/>
  <text x="300" y="80" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="#141413">KIHO CUTOUT TEST</text>
  <text x="300" y="730" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#888888">Đồng Hới, Quảng Bình</text>
</svg>
</body>
</html>"""

os.makedirs("scratch", exist_ok=True)
with open("scratch/cutout_test.html", "w", encoding="utf-8") as f:
    f.write(test_svg_html)

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
out_png = os.path.abspath("scratch/cutout_test.png")
cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--default-background-color=00000000",
    "--window-size=600,800",
    f"--screenshot={out_png}",
    os.path.abspath("scratch/cutout_test.html")
]
subprocess.run(cmd, check=True)

im = Image.open(out_png)
print("Image size:", im.size, "Mode:", im.mode)
center_pixel = im.getpixel((300, 400))
frame_pixel = im.getpixel((20, 20))
print("Center (cutout) pixel RGBA:", center_pixel)
print("Frame pixel RGBA:", frame_pixel)
