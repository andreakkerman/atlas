# Atlas — The making of a mark

This approved source lab is retained as a visual reference. The production integration lives in [src/intro](../../src/intro/) and [assets/intro](../../assets/intro/), and uses fixed defaults rather than this lab's local tuning. See the [startup contract](../../Docs/DEV_TOOLS.md#production-intro-and-startup).

A standalone, five-second visual lab. Nothing imports Atlas application code, changes startup, touches menus or writes to application storage. All runtime dependencies and artwork live in this directory. The Start button is presentation only.

## Run

From the repository root:

```powershell
node experiments/atlas-logo-reveal/serve.cjs
```

Open **http://127.0.0.1:4186/**. Alternatively, run `npm.cmd start` in this directory. No build, dependency install, CDN or network service is needed. Any static HTTP server can serve the directory. ES modules require HTTP rather than `file://`.

- `/?clean` — completely clean playback, using your current saved tuning.
- `/?edit` — opens the Edit panel. `/?debug` is retained as an alias.
- `/?baseline&clean` — previews the accepted default look without loading saved experiments.
- `/?clean&t=1.65` — deterministic paused formation frame, in seconds on the default timeline.
- `/?clean&t=2.53` — glyph ignition cue.
- `/?clean&t=5` — final composition.
- **E** or **H** shows/hides Edit; **Esc** gives a completely clean presentation; **R** replays; **Space** pauses/resumes; **← / →** scrub 0.1 seconds, or 0.01 seconds with **Shift**. Editing fields retain their normal keyboard behavior. The default page has a visible **Edit** launcher for touch; after hiding everything, reopen with E/H or `/?edit`.
- Reduced-motion preference opens on the finished composition. Replay explicitly opts into this study's animation.

## Edit mode

There are **72 live controls in nine collapsible groups**: Global timing, Magic flow, Gold dust / particles, Logo formation, Glyph, Wordmark, Energy handoff to Start, Start button, and Background / atmosphere. Each has a slider and direct numeric input. Numeric edits apply on Enter or leaving the field. Replay retains your settings; **Restore Defaults** restores the accepted five-second version.

Current now uses the user's approved 27 September settings: immediate arrival, softer ribbons, larger/brighter gold dust, a stronger energy handoff, final glyph brightness 1.3, and Start idle glow 2 with breathing 0.95. All 72 default values match the supplied JSON exactly. Existing saved experiments are retained; choose Current or Restore Defaults to replace them with this approved set.

The underline ornament and its center diamond beneath ATLAS are omitted. The letters are centered vertically in the gap between the emblem's bottom tick and the Start button's top edge, recalculated on resize. Emblem and button placement, letter size, unified fade and the approved settings remain unchanged.

The pinned toolbar provides replay, pause/resume, scrubbing, phase jumps, presets, comparison and export. **Store A** remembers the current settings; after tuning another variation, **Compare A / Return to B** switches between them at the same timeline position. Development presets are Current, More Magic, More Gold, More Cyan and Subtle. They do not change the source defaults.

**Copy Settings** copies versioned JSON for pasting into a conversation. **Export JSON** downloads `atlas-intro-settings.json`. Copy also exposes a selectable JSON field; if clipboard access is unavailable, it focuses that field for manual copying. Values auto-save after edits to the lab-only localStorage key `atlas.intro-lab.settings.v1`, on this browser and origin. This never touches Atlas application storage. Clearing browser data removes the saved experiment. A/B snapshots are session-only. `?baseline` ignores saved values on startup without deleting them.

All accepted values, ranges and group definitions live in **`settings.js`**, which derives the immutable `defaults` object from each control's `value`. The UI, programmatic API, persistence, exports and renderer share the same settings object. `tuning-ui.js` owns the panel and storage plumbing.

Timing controls use seconds. Total duration scales all editable cue times and durations together, within their ranges. Individual cue edits extend the sequence if necessary so the last fade and final hold are not clipped. Arrival cannot precede the empty phase; formation follows arrival; handoff follows formation. The toolbar displays effective arrival, formation start/end and sequence end. Other cue overlaps remain available for experimentation. Formation timing and softness modulate deposition only; the PNG alpha and premultiplied contour path remain intact. Wordmark timing always controls the entire word together.

Flow count, widths, opacity, wisps, hotspots and dust settings operate on the existing field and render passes. Ambient dust remains zero in Current. The approved Start breathing updates only the HTML button during the final hold, without redrawing the settled WebGL scene. Very high ribbon/particle counts can cost more GPU/CPU time; the FPS readout remains available during playback.

## Architecture and reference roles

Dependency-free **WebGL 2**, custom GLSL, procedural ribbon meshes, deterministic particles, and a small HTML presentation/control layer. This is a hybrid 2.5D composition: layers pass behind and in front of the emblem, with soft focus, variable ribbon width and slight camera drift. It is not an extruded, dynamically relit 3D emblem.

| Reference | Responsibility |
| --- | --- |
| A / Photo 1 | Art direction for wrapped energy, deposited gold and the transitional construction state. Preserved in `references/formation-reference-a.jpg`; it is not a runtime background or final frame. |
| Transparent PNG / 27 September | Authoritative emblem silhouette, alpha, metal and central glyph. `assets/atlas-transparent.png` is a byte-identical copy of the supplied `AtlasLogoTransparant.png`. Its emblem is registered uniformly to the established composition; its included wordmark is not used. |
| B / Photo 2 | Retained source for the existing ATLAS wordmark and composition reference. `assets/atlas-reference-b.jpg` is unchanged. Its emblem extraction and background plate are no longer rendered. |
| C / Photo 3 | Magic material. `assets/magic-reference-c.jpg` is an unchanged copy, sampled into moving, warped ribbon surfaces; it is not displayed as a static scene. |

The emblem uses reference-preserving material deposition in `logo-material.js`. The outer ring follows the passing carrier; cardinal points grow from their roots and diagonal points seat independently. Fresh gold cools from a narrow warm construction edge and contracts by at most two CSS pixels into its final seat. Grain is restricted to that active boundary. The central glyph constructs quietly and reaches its ignition cue at 2.53 seconds. The approved peak setting is 1 and final brightness is 1.3, so it finishes brighter than that cue.

Emblem coverage comes directly from the transparent PNG's authored alpha. Upload premultiplies color before mipmap generation and filtering; the shader preserves premultiplication through four-sample contour AA and uses `ONE, ONE_MINUS_SRC_ALPHA` compositing. This avoids invisible RGB bleeding into the edge or multiplying partial coverage twice. No chroma key, luminance mask, JPEG unmatting or reference background plate participates in the emblem. Color and coverage move together during material seating. The central timing transition is smooth, avoiding a synthetic circular cut line, and detached ticks resolve as complete pieces. The existing fine compass guide uses analytic antialiased coverage. The original wordmark keeps its separate source-background correction and one shared opacity envelope, independent of horizontal position.

The ribbon carrier is a continuous incoming cubic curve joined to the compass orbit. It then peels from the lower compass into a quiet cubic path through the wordmark and onto the Start button's centered gold inlay. This reuses the same sheets and particle budget; there is no second emitter or added effect system. Its strength drops before glyph ignition and reaches zero at 4.6 seconds. Animated material coordinates, variable strand widths, foreground/background layers and a filtered emission pass supply depth and wisps. Particle seeds and positions depend on timeline time, not accumulated simulation steps: scrubbing backwards and replaying give the same frame.

The atmosphere is procedural green/teal haze with a vignette and fine texture. Broad atmosphere renders at half resolution; glow is generated and filtered at one-third resolution. The actual logo, wordmark, ribbons and particle detail render at the canvas resolution, up to DPR 2. These are lab-owned resources and are unrelated to Atlas renderer presets.

## Default sequence

| Time | Image |
| --- | --- |
| 0 s | Empty green/teal opening frame; no empty-phase delay |
| 0–1.05 s | Magical material immediately begins entering from the left |
| 1.05–2.35 s | Gold, bezel, quiet glyph and fine orbit are constructed |
| 2.35–3.0 s | Glyph ignites at 2.53 s; emblem settles |
| 3.1–3.6 s | All ATLAS letters fade in together |
| 3.15–4.35 s | Remaining carrier curls through the wordmark toward Start |
| 4.2–4.6 s | Inlaid Start button resolves; residual magic drains away |
| 4.6–5.0 s | Final hold with Start breathing; hold then continues indefinitely |

## Validation and captures

With the local server running, use the repository's existing Playwright installation:

```powershell
npx.cmd playwright test --config experiments/atlas-logo-reveal/playwright.config.cjs --workers=1
```

The suite runs Chromium and WebKit sequentially. It captures every beat plus DPR-1/DPR-2 contour details; verifies the green opening and changing gold/cyan pixel populations; compares glyph brightness before ignition, at its peak and after settling; checks all five letters' midpoint opacity together and the continuation below the wordmark; verifies exact frame repeatability after scrubbing; exercises replay/pause, reduced motion, touch controls, desktop and both tablet orientations; and checks automatic completion at exactly five timeline seconds. A texture-fixture regression checks transparent, half-covered and opaque material against the expected composite, catching discarded alpha or double premultiplication. Edit tests verify live rendering, numeric/slider synchronization, local reload persistence, A/B comparison, exact reset, cue scaling, keyboard isolation while editing, JSON download contents, malformed-storage recovery and clean presentation. GPU/context errors fail validation.

Generated PNGs and measured timing JSON live in `captures/` and are ignored by Git. They are local review evidence, not runtime assets. `window.atlasLab` exposes `seek`, `replay`, `pause`, `set`, `state`, `ready` and `performance` for repeatable review.

## Visual iteration record

1. Corrected source extraction after initial captures lost the fine gold orbit and punched holes in near-white cyan details.
2. Replaced the narrow procedural thread bundle with wider, separated sheets.
3. Replaced repetitive procedural filament shading with animated reference-C material after the former looked synthetic.
4. Reduced emission after captures showed washed-out highlights; fixed the incoming/orbital join that had created a sharp geometry seam.
5. Restored the reference's low-light contact shadows and orbit in the settled frame, then checked portrait and landscape composition.
6. Moved the soft atmosphere and glow work into smaller targets while retaining full-resolution foreground detail.
7. Polish pass: compressed the choreography to five seconds, replaced the sharp matte with continuous unmatted coverage and four-sample filtering, and changed the gold front to piece-specific deposition and seating.
8. Replaced the horizontal wordmark wipe with a unified fade, made ignition the clear center beat, extended the existing carrier to Start, and refined its green enamel / gold inlay treatment.
9. Inspected new formation, ignition, wordmark, continuation, button and settled captures. Removed reference-background patches exposed by the first compositing revision, and bounded cardinal deposition to the actual point silhouette so adjacent arc fragments no longer appear early.
10. Transparent-asset pass: replaced emblem extraction with authored PNG alpha, premultiplied texture filtering and blending. Inspection found and corrected a synthetic inner-circle formation boundary and an early fragment of a detached compass tick. Rechecked formation, completed emblem and final contours in both engines at DPR 1 and 2.
11. Restored a visible Edit entry and exposed 72 controls around the existing renderer. Compared all nine default phase captures against the accepted transparent-asset baseline in both browsers; no default artwork, composition or choreography changes were intended. Corrected exact timeline endpoint rounding and bypassed neutral saturation processing to retain deterministic captures.
12. Adopted the user's exact exported settings as Current and Restore Defaults. Updated opening-frame and glyph-luminance expectations to reflect immediate arrival and a brighter final glyph; retained the renderer, transparent asset, wordmark fade and five-second endpoint.
13. Removed the wordmark underline/diamond and centered the letters between the existing emblem and Start anchors. Only wordmark source sampling and placement changed; the original image assets remain untouched.

See `VALIDATION.md` for measurements and current limits.
