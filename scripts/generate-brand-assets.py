"""Generate the OstseeBit wave assets from vector geometry (requires Pillow).

Original continuation artwork, 2026-10-03. Distributed under the repository GPLv3.
Run from any directory; files are written relative to this script's repository.
"""
from pathlib import Path
import math
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
BLUE = '#075985'
CYAN = '#38bdf8'
MARK = '<path d="M24 51 C40 29 56 29 72 51 S104 73 120 51 M24 77 C40 55 56 55 72 77 S104 99 120 77" fill="none" stroke="white" stroke-width="9" stroke-linecap="round"/>'

def icon_svg():
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144"><rect width="144" height="144" rx="30" fill="{BLUE}"/>{MARK}</svg>\n'

def logo_svg(color):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 144" role="img" aria-labelledby="title">
  <title id="title">OstseeBit Tools</title>
  <rect width="144" height="144" rx="30" fill="{BLUE}"/>
  {MARK}
  <text x="176" y="71" fill="{color}" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="700">OstseeBit</text>
  <text x="178" y="113" fill="{color}" font-family="Segoe UI, Arial, sans-serif" font-size="29" letter-spacing="4">TOOLS</text>
</svg>\n'''

def icon(size, opaque=False):
    scale = 4
    canvas = Image.new('RGBA', (size * scale, size * scale), BLUE if opaque else (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((0, 0, size * scale - 1, size * scale - 1), radius=size * scale * .21, fill=BLUE)
    # Mark geometry stays within the central maskable safe area.
    for baseline in (51, 77):
        points = []
        for x in range(24, 121):
            y = baseline - 16.5 * math.sin((x - 24) * math.pi / 48)
            points.append((x * size * scale / 144, y * size * scale / 144))
        width = max(1, round(9 * size * scale / 144))
        draw.line(points, fill='white', width=width, joint='curve')
        radius = width / 2
        for x, y in points:
            draw.ellipse((x-radius, y-radius, x+radius, y+radius), fill='white')
    return canvas.resize((size, size), Image.Resampling.LANCZOS)

def font(size, bold=False):
    candidates = [Path('C:/Windows/Fonts') / ('segoeuib.ttf' if bold else 'segoeui.ttf'), Path('/usr/share/fonts/truetype/dejavu') / ('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf')]
    for path in candidates:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    raise RuntimeError('Install Segoe UI or DejaVu Sans to generate wordmark PNGs.')

(ROOT / 'public/brand-mark.svg').write_text(icon_svg(), encoding='utf-8')
for flavor, color in [('dark', '#0c4a6e'), ('white', '#f8fafc')]:
    (ROOT / f'.github/logo-{flavor}.svg').write_text(logo_svg(color), encoding='utf-8')
    logo = Image.new('RGBA', (720, 144), (0, 0, 0, 0))
    logo.alpha_composite(icon(144), (0, 0))
    draw = ImageDraw.Draw(logo)
    draw.text((176, 10), 'OstseeBit', font=font(48, True), fill=color)
    draw.text((178, 78), 'TOOLS', font=font(29), fill=color)
    logo.save(ROOT / f'.github/logo-{flavor}.png')

for name, size in [('favicon-16x16.png', 16), ('favicon-32x32.png', 32), ('apple-touch-icon.png', 180), ('android-chrome-192x192.png', 192), ('android-chrome-512x512.png', 512), ('mstile-70x70.png', 70), ('mstile-144x144.png', 144), ('mstile-150x150.png', 150), ('mstile-310x310.png', 310)]:
    icon(size, opaque=name.startswith(('android', 'apple'))).save(ROOT / 'public' / name)
tile = Image.new('RGBA', (310, 150), BLUE)
tile.alpha_composite(icon(144), (83, 3))
tile.save(ROOT / 'public/mstile-310x150.png')
icon(64).save(ROOT / 'public/favicon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
pinned = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">' + MARK.replace('white', 'black') + '</svg>\n'
(ROOT / 'public/safari-pinned-tab.svg').write_text(pinned, encoding='utf-8')

banner = Image.new('RGB', (1200, 630), '#082f49')
draw = ImageDraw.Draw(banner)
banner.paste(icon(160, True), (80, 125))
draw.text((280, 128), 'OstseeBit', font=font(82, True), fill='#f8fafc')
draw.text((284, 242), 'TOOLS', font=font(44), fill=CYAN)
draw.text((80, 392), 'Handy tools for developers', font=font(40), fill='#e0f2fe')
draw.text((80, 450), 'and IT professionals.', font=font(40), fill='#e0f2fe')
banner.save(ROOT / 'public/banner.png')
print('Generated logo, favicon, PWA and tile assets from original wave geometry.')
