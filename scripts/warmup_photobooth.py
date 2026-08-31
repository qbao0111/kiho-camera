import urllib.request
import time

print("Warming up /photobooth...")
start = time.time()
try:
    resp = urllib.request.urlopen("http://localhost:3000/photobooth", timeout=30)
    html = resp.read().decode("utf-8")
    elapsed = time.time() - start
    print(f"Status: {resp.status} in {elapsed:.2f}s, length: {len(html)}")
    print("Has 'Bộ Khung Ảnh Du Lịch':", "Bộ Khung Ảnh Du Lịch" in html)
except Exception as e:
    print("Error:", e)
