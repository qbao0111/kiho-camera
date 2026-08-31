import subprocess
import os
from PIL import Image

test_mask_svg = """<!DOCTYPE html>
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
  <defs>
    <mask id="cutout-mask">
      <rect width="600" height="800" fill="white"/>
      <rect x="50" y="150" width="500" height="500" rx="24" ry="24" fill="black"/>
    </mask>
  </defs>
  <rect width="600" height="800" fill="#FAF8F5" mask="url(#cutout-mask)"/>
  <rect x="50" y="150" width="500" height="500" rx="24" ry="24" fill="none" stroke="#D95D39" stroke-width="4"/>
</svg>
</body>
</html>"""

with open("scratch/mask_test.html", "w", encoding="utf-8") as f:
    f.write(test_mask_svg)

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
out_png = os.path.abspath("scratch/mask_test.png")
cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--default-background-color=00000000",
    "--window-size=600,800",
    f"--screenshot={out_png}",
    os.path.abspath("scratch/mask_test.html")
]
subprocess.run(cmd, check=True)

im = Image.open(out_png)
print("Center pixel RGBA:", im.getpixel((300, 400)))
print("Outside corner pixel RGBA:", im.getpixel((20, 20)))
print("Cutout inner corner (55, 155) RGBA:", im.getpixel((55, 155)))
