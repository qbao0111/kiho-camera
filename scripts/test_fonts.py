import subprocess
import os

test_html = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap">
<style>
  body { margin: 0; background: #faf8f5; width: 600px; height: 300px; padding: 40px; font-family: 'Be Vietnam Pro', sans-serif; }
  h1 { font-family: 'Playfair Display', serif; font-style: italic; color: #d95d39; font-size: 36px; margin: 0 0 10px 0; }
  p { font-size: 18px; color: #141413; font-weight: 700; }
</style>
</head>
<body>
  <h1>Đồng Hới Sunset & Breeze</h1>
  <p>Khám phá vẻ đẹp kỳ quan Quảng Bình</p>
</body>
</html>"""

os.makedirs("scratch", exist_ok=True)
with open("scratch/font_test.html", "w", encoding="utf-8") as f:
    f.write(test_html)

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
out_png = os.path.abspath("scratch/font_test.png")
cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--window-size=600,300",
    f"--screenshot={out_png}",
    os.path.abspath("scratch/font_test.html")
]
subprocess.run(cmd, check=True)
print("Font test rendered! File size:", os.path.getsize(out_png))
