# Atlas application icons

## Challenge watermark

`atlas-emblem-transparent.png` is the user-supplied `AtlasLogoTransparant.png`, copied
byte-for-byte on 4 October 2026 (SHA-256
`4c3f33c02f5e7280f2e89ce4ac65e7cc3ad65b03fdb974ba5b58ae94039f558a`). It is used
only as a decorative, non-interactive M6 question-panel watermark at 4.5% opacity.
The CSS applies a muted tint; the original PNG is unchanged. It is precached with
the app shell. Notebook rings are a code-native SVG data image in `src/styles.css`;
the separate paper material is documented in [the notebook asset notes](../ui/notebook/README.md).
Both are independent of this logo and the application-icon family.

## Application icon family

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
