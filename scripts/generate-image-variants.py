"""Regenerate committed responsive WebP assets. Requires Pillow >= 10; no hosting service."""
import hashlib
import json
import subprocess
import sys
import urllib.request
from urllib.parse import urlparse
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
OUTPUT = PUBLIC / 'image-variants'
OUTPUT.mkdir(exist_ok=True)
sources = sorted((PUBLIC / 'images').rglob('*'))
sources += [PUBLIC / 'brand' / name for name in (
    'kiho-logo-header-transparent.png', 'kiho-logo-master-transparent.png')]
sources += sorted((PUBLIC / 'photobooth' / 'mockups').glob('*.webp'))
sources += sorted((PUBLIC / 'photobooth' / 'frames').glob('*.png'))
# Only repository assets are published; never turn private, ignored dev uploads into variants.
sources += [ROOT / name for name in subprocess.check_output(['git', 'ls-files', 'public/uploads'], cwd=ROOT, text=True).splitlines()]
inputs = [('/' + source.relative_to(PUBLIC).as_posix(), source) for source in sources if source.suffix.lower() in ('.jpg', '.jpeg', '.png', '.webp', '.avif')]
# Explicit reviewed public URLs only. No runtime transform, proxy or Storage writes.
remote_list = ROOT / 'scripts' / 'remote-image-sources.json'
if remote_list.exists():
    cache = ROOT / 'scratch' / 'remote-image-originals'
    cache.mkdir(parents=True, exist_ok=True)
    for entry in json.loads(remote_list.read_text(encoding='utf-8')):
        url = urlparse(entry['url'])
        assert url.scheme == 'https' and url.hostname == 'hykuvvhxepijndqxrcke.supabase.co'
        assert not url.username and not url.password
        assert url.path.startswith('/storage/v1/object/public/') and not url.query and not url.fragment
        assert len(entry['sha256']) == 64 and all(c in '0123456789abcdef' for c in entry['sha256'])
        source = cache / entry['sha256']
        if not source.exists() and '--fetch-remote' in sys.argv:
            request = urllib.request.Request(entry['url'], headers={'User-Agent': 'Kiho-offline-asset-build/1.0'})
            with urllib.request.urlopen(request, timeout=25) as response:
                assert response.headers.get_content_type().startswith('image/')
                data = response.read(10 * 1024 * 1024 + 1)
            assert len(data) <= 10 * 1024 * 1024
            assert hashlib.sha256(data).hexdigest() == entry['sha256'], 'Remote original changed; review snapshot first'
            source.write_bytes(data)
        if not source.exists():
            raise RuntimeError('Missing reviewed remote original; regenerate with --fetch-remote')
        assert hashlib.sha256(source.read_bytes()).hexdigest() == entry['sha256']
        inputs.append((entry['url'], source))
manifest = {}
for source_url, source in inputs:
    original = source.read_bytes()
    digest = hashlib.sha256(original + b'kiho-webp-v1-q86').hexdigest()[:16]
    with Image.open(source) as raw:
        if getattr(raw, 'is_animated', False):
            continue  # Keep animations delivered from their original URL.
        image = ImageOps.exif_transpose(raw).convert('RGBA' if 'A' in raw.getbands() else 'RGB')
        width, height = image.size
        max_width = max(1, round(width * min(1, 1600 / max(width, height))))
        variants = []
        for target in sorted({min(w, max_width) for w in (96, 320, 640, 960, 1600)}):
            resized = image.resize((target, max(1, round(height * target / width))), Image.Resampling.LANCZOS)
            name = f'{digest}-{target}.webp'
            if not (OUTPUT / name).exists():
                resized.save(OUTPUT / name, 'WEBP', quality=86, method=6)
            with Image.open(OUTPUT / name) as check:
                assert check.size == resized.size
            variants.append({'src': '/image-variants/' + name, 'width': target, 'height': resized.height, 'bytes': (OUTPUT / name).stat().st_size})
        manifest[source_url] = {'width': width, 'height': height, 'originalBytes': len(original), 'variants': variants}
(ROOT / 'src' / 'data' / 'image-variants.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'{len(manifest)} sources; {len(list(OUTPUT.glob("*.webp")))} WebP files; {sum(p.stat().st_size for p in OUTPUT.glob("*.webp")):,} bytes')
