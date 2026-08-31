import os
import subprocess
from PIL import Image

print("PIL version:", Image.__version__)
edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
print("Edge exists:", os.path.exists(edge_path))

html_content = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 400px;
    height: 400px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card {
    width: 360px;
    height: 360px;
    background: #FAF8F5;
    border: 3px solid #141413;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: sans-serif;
  }
  .cutout {
    width: 100%;
    height: 180px;
    background: transparent;
    border: 2px dashed #D95D39;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #D95D39;
    font-weight: bold;
  }
</style>
</head>
<body>
  <div class="card">
    <div style="font-size: 20px; font-weight: bold; color: #141413;">KIHO CAMERA</div>
    <div class="cutout">PHOTO WINDOW</div>
    <div style="font-size: 12px; color: #666;">Đồng Hới, Quảng Bình</div>
  </div>
</body>
</html>
"""

os.makedirs("scratch", exist_ok=True)
html_file = os.path.abspath("scratch/test.html")
out_png = os.path.abspath("scratch/test.png")

with open(html_file, "w", encoding="utf-8") as f:
    f.write(html_content)

cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--hide-scrollbars",
    "--default-background-color=00000000",
    "--window-size=400,400",
    f"--screenshot={out_png}",
    html_file
]
subprocess.run(cmd, check=True)

if os.path.exists(out_png):
    img = Image.open(out_png)
    print("Rendered successfully! Size:", img.size, "Mode:", img.mode)
    corner_pixel = img.getpixel((5, 5))
    print("Corner pixel RGBA:", corner_pixel)
