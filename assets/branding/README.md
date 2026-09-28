# Atlas application icons

`app-icon-source.png` is the user-supplied **AtlasTeal.png** (1265×1265), stored
as opaque RGB without changing its artwork. It is the icon-family master.
The supplied transparent emblem was a geometry reference; no extraction,
redrawing or generative image processing was necessary. Intro assets are separate.

Regenerate with Python and Pillow:

```powershell
python scripts/generate-app-icons.py
```

Every output is resampled directly from the master with Lanczos filtering:

| File | Use |
| --- | --- |
| `icon-32.png`, `icon-64.png` | Browser favicon |
| `icon-180.png` | Explicit Apple touch / iPad home-screen icon |
| `icon-192.png`, `icon-512.png` | Manifest icons, purpose `any` |
| `icon-maskable-512.png` | Separate manifest icon, purpose `maskable` |

The maskable composition is reduced to 440 pixels within the 512-pixel canvas.
The source's teal edge pixels extend to the edges. The compass, including its
outer ticks, remains inside the central circle of radius 40% specified by the
[Web App Manifest safe zone](https://www.w3.org/TR/appmanifest/#icon-masks).
All PNGs are opaque, square, and retain the supplied emblem proportions.

HTML and manifest icon URLs use `?v=atlas-compass-1`; the service worker precaches
those exact URLs (introduced in cache v217; see `service-worker.js` for the current version). Replacing the seven
existing PNGs removes the old illustrated icon without leaving duplicate assets.
`launch-hero.png` is separate legacy artwork, not an application-icon reference.

QA (2026-09-27): inspected all six sizes, magnified 32/64-pixel output, circle and
rounded-square crops. The furthest bright emblem detail in the maskable image
is radius 190.54px, inside the 204.8px safe radius. The master RGB pixels match
AtlasTeal exactly. Browser tests verify HTML metadata, manifest purpose, exact
served icon bytes, dimensions, MIME type and offline availability after cache
upgrade, plus unchanged intro completion and Start handoff. Native installation
and existing home-screen icon refresh on a physical iPad require device validation;
browser automation does not prove the operating system has refreshed its icon.
