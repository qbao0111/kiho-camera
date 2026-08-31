import os
import shutil
import subprocess

artifact_dir = r"C:\Users\THIS PC\.gemini\antigravity\brain\cbd1b928-b5ba-4e24-b422-2751f8ed1c15"
os.makedirs(artifact_dir, exist_ok=True)

# 1. Copy the 4 primary mockups (9:16)
mockup_files = [
    "phong-nha-9x16-mockup.png",
    "dong-hoi-sunset-9x16-mockup.png",
    "cafe-chill-9x16-mockup.png",
    "y2k-flash-9x16-mockup.png",
    "phong-nha-4x5-mockup.png",
    "dong-hoi-sunset-4x5-mockup.png",
    "cafe-chill-4x5-mockup.png",
    "y2k-flash-4x5-mockup.png"
]

for mf in mockup_files:
    src = os.path.join("public/photobooth/mockups", mf)
    dst = os.path.join(artifact_dir, mf)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"Copied {mf} to artifacts directory")

# 2. Capture a screenshot of the local web gallery
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
out_gallery_png = os.path.join(artifact_dir, "photobooth-gallery-preview.png")

cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--window-size=1400,900",
    f"--screenshot={out_gallery_png}",
    "http://localhost:3000/photobooth"
]
subprocess.run(cmd, check=True)
print("Captured photobooth-gallery-preview.png successfully!")
