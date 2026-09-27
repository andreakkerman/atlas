"""Regenerate the opaque Atlas icon family from app-icon-source.png.

Requires Pillow. The master is the supplied AtlasTeal.png, flattened to RGB
without changing its dimensions or artwork. Never derive icons from small icons.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BRANDING = ROOT / "assets" / "branding"
master = Image.open(BRANDING / "app-icon-source.png").convert("RGB")
assert master.width == master.height and master.width >= 1024
for size in (32, 64, 180, 192, 512):
    master.resize((size, size), Image.Resampling.LANCZOS).save(
        BRANDING / f"icon-{size}.png", optimize=True
    )

# Reduce the entire approved composition to 440/512. The outermost compass
# ticks then lie inside radius 0.38, with margin inside the maskable 0.40 zone.
# Extend the source's teal edge pixels, avoiding a flat-color square seam.
inner = master.resize((440, 440), Image.Resampling.LANCZOS)
maskable = Image.new("RGB", (512, 512))
maskable.paste(inner, (36, 36))
for box, target, size in (
    ((0, 0, 440, 1), (36, 0), (440, 36)),
    ((0, 439, 440, 440), (36, 476), (440, 36)),
    ((0, 0, 1, 440), (0, 36), (36, 440)),
    ((439, 0, 440, 440), (476, 36), (36, 440)),
):
    maskable.paste(inner.crop(box).resize(size), target)
for x in (0, 476):
    for y in (0, 476):
        color = inner.getpixel((0 if x == 0 else 439, 0 if y == 0 else 439))
        maskable.paste(color, (x, y, x + 36, y + 36))
maskable.save(BRANDING / "icon-maskable-512.png", optimize=True)
print("Generated six icons directly from the Atlas master.")
