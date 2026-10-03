# Batch 4, Stage 2: neutral Illustrated parity

Neutral ownership parity passes the existing whole-scene mean-error bound of 1/255 at DPR 1 and DPR 2 in LVL-0004 and LVL-0001. Stage 1 reductions remain intact. No Scene Depth optimization, defaults change, authored retuning, or Cinematic visual change was introduced.

## Method and corrected baseline

`layers.cjs` captures frozen production producers, fixed particle time and a fixed idle sprite through the existing locomotion blink-delay hook. It uses actual 1180x734 browser contexts at DPR 1 and 2, neutral grading, Area Directional Lights off and Scene Depth off. Each isolated case captures OFF → ON → OFF. All 40 final cases restore with exactly zero mean difference. UI and unrelated ambient actors are excluded from isolated attribution; the permanent tests also compare unmasked production scenes.

The initial investigation's screenshots were contaminated by enabling Global Lighting without running the normal DOM render gate: emissiveGlow remained visible when production would hide it. `before/layers.json` is the corrected pre-fix baseline. Root-level `layers.json` and earlier Stage 1 parity figures must not be used as its baseline. Earlier `after/` captures had occasional idle-blink drift; `final-layers/` supersedes them. Actual browser contexts also replace an earlier CDP viewport override that Playwright screenshots reset.

## Scene-layer inventory and causes

| Layer (normal DOM order) | Normal Illustrated semantics | Previous full-scene behavior / correction |
| --- | --- | --- |
| Background artwork, z10 | CSS appearance, opaque sRGB artwork | Base transfer already matched within one channel value. Preserve it; use encoded sRGB for layer composition. |
| emissiveGlow, z10 | Canvas with `plus-lighter`; hidden by the production Global Lighting gate in this configuration | Not a missing visible contribution in this neutral configuration. No change. |
| forestMist, z10 | Two CSS gradients, vertical below horizontal, source-over in artwork coordinates | Entirely omitted. Reproduce these fixed scene-only gradients in the artwork draw, with the existing colours, alpha and coordinates. No arbitrary DOM/UI capture. |
| Background atmosphere, z15 | Transparent legacy Canvas, browser sRGB source-over | Imported already; this producer is empty in both sampled scenes. Active uploads retain Stage 1 metadata gating. |
| Flybys z20, animals z30 | Image sprites, existing opacity/order | Existing imports retained; no audio, scheduling or ownership change. |
| World atmosphere, z25 | Transparent legacy Canvas, browser sRGB source-over | Imported already; empty in these sampled scenes. |
| worldLight, z35 | Canvas sun rays; internal Canvas blending baked into its pixels, then browser source-over | Linear-light source-over made the result substantially brighter. Encode the computed colour before premultiplied source-over. This is the dominant measured cause. |
| NPCs z38; character shadows z39; Sven z40 | Image/owner CSS filters, including drop shadows; GPU grounding-shadow overlay; browser composition | Sprite CSS drop shadows were omitted. Rasterize only the known decoded character image and existing filters at display DPR, cache it, and use existing disposal. Match NPC → grounding shadows → Sven order and the lightweight shadow's artwork-only receiver. |
| Foreground atmosphere, z45 | Transparent Canvas, sRGB source-over | Same composition-space correction as worldLight. |
| Particle fields, z46 | Existing WebGPU particle implementation adds into an unorm8 canvas; the browser screen-blends that whole canvas | Same particles were directly added into the linear scene. Reuse the existing first scene target for the additive group, reproduce unorm8 contribution quantization, then screen-blend the group once in sRGB. No particle colour/opacity retuning. |
| Challenge effect z47, interaction indicators z50, HUD | Separate interaction/UI ownership | Remain separate. No rasterization of challenge UI or controls. Active challenge effects were not included in this neutral-scene comparison. |
| Presentation | Browser's encoded-sRGB composition | Keep Illustrated intermediate composition encoded; decode at field/finish calculation boundaries and use the existing final transfer. Cinematic remains linear. |

External image uploads continue requesting straight alpha (`premultipliedAlpha:false`). Sprite shaders multiply by effective alpha once; the existing blend factors remain `one`, `one-minus-src-alpha` for source-over. Canvas internal premultiplication is resolved by the upload API. Changing the upload flag indiscriminately would not fix the measured colour-space problem. Character owner opacity is applied once; existing image and owner filters are reproduced in their order. Particle accumulation keeps `one/one` RGB and unchanged destination alpha, followed by group screen blend `P + C * (1-P)`.

The diagnostic inventories direct scene children and computed styles in JSON; ownership and isolation can affect recorded visibility, so the inventory is interpreted alongside source order and OFF captures, not as proof that every listed node is visible simultaneously.

## Measured attribution

RGB mean absolute error, channel scale 0–255. Each isolated probe compares the same base plus the named contribution; errors overlap and are **not an additive budget**.

| DPR 1 probe | LVL-0004 before → final | LVL-0001 before → final |
| --- | ---: | ---: |
| Base artwork | 0.0108 → 0.0069 | 0.0130 → 0.0114 |
| CSS mist | 2.0025 → 0.2062 | 2.5295 → 0.2162 |
| worldLight | 8.3173 → 0.2096 | 3.8122 → 0.1475 |
| Foreground Canvas | 0.1046 → 0.0119 | 0.2322 → 0.0162 |
| Sven including CSS filter | 0.1141 → 0.0657 | 0.1181 → 0.0748 |
| Sven plus grounding shadow | 0.1148 → 0.0666 | 0.1182 → 0.0750 |
| Particles | 0.0161 → 0.0069 | 0.0257 → 0.0115 |

Particle-only final maximum channel difference is 1 at DPR 1, independently confirming that their implementations need not be replaced or retuned. The CSS sprite-shadow regression measures the effect of removing the actual filter: DOM impact 0.1787/0.1789 versus full-scene 0.1864/0.1859 at DPR 1/2; previously the full-scene impact was zero.

| Combined isolated scene | Corrected before | Final |
| --- | ---: | ---: |
| LVL-0004 DPR 1 | 10.2939 | 0.4121 |
| LVL-0004 DPR 2 | 10.2783 | 0.4278 |
| LVL-0001 DPR 1 | 6.4993 | 0.3754 |
| LVL-0001 DPR 2 | 6.5020 | 0.3972 |

Final unmasked production mean errors are **0.4332, 0.4502, 0.3270, 0.3469**, respectively. Actor-region means are **1.2478, 1.5059, 1.7331, 2.2368**, below the additional 4/255 regional guard. The original whole-scene <1 and roundtrip <0.1 assertions were not relaxed. Representative production and isolated PNG pairs were visually inspected, including strong rays, particles, Sven/character shadow and foreground effects. PNG suffix `0` is normal ownership; `1` is full-scene ownership.

Residual error is concentrated at resampled high-contrast sprite edges and low-amplitude gradient/8-bit versus float rounding. This is not a claim of per-pixel equality: isolated combined maxima reach 118 at sparse DPR-2 sprite edges, while only about 0.2–0.3% of channels differ by more than 8. Pre-transform raster and high-quality smoothing experiments did not consistently improve parity and were removed.

LVL-0004 also exposes an existing broken optional NPC image placeholder in the normal DOM capture. The GPU path omits undecoded imagery. A browser's broken-image glyph is not intended scene artwork and is not synthesized into the compositor; the asset/recovery system was not changed. Loaded NPC-specific parity, active challenge effects, nonneutral authored appearance combinations, moving-sprite raster cost, and physical iPad Safari WebGPU remain outside the conclusive evidence here.

## Validation and resources

- Chromium sequential combined run: **12 passed** (`chromium.log`): Illustrated compositor, Cinematic sharpness, Cinematic route overlays, and the required real-WebGPU tablet acceptance suite (including 1770x1101 preparation and tablet configurations).
- Final focused run after the decoded-resource guard and deterministic blink hook: **4 passed** (`final-regression.log`), including native DPR 1/2 parity and CSS sprite-shadow coverage.
- WebKit iPad landscape fallback: **8 passed, 3 expected native-WebGPU skips** (`webkit.log`), covering producer behavior, navigation overlays and graphics play-session behavior. This does not establish native Safari GPU or physical-iPad parity.
- Frozen diagnostic: **40 cases**, each exact OFF → ON → OFF restoration (`final-layers/layers.json`).
- Syntax checks and `git diff --check` pass.

The full Illustrated path still uses **5 passes, 8 draws, 2 animated legacy Canvas uploads, 0 unchanged frozen-producer uploads, and 2 HDR scene targets**. Particle grouping adds no target/pass. The sampled full scene now retains 9 textures rather than Stage 1's 8 because Sven's filtered display image has one cached texture; 11 buffers remain. Repeated equivalent recipes remain stable; menu teardown returns tracked textures/buffers to zero with no scheduled frame. The final regression covers producer restart/clear, ownership toggles, level transitions and recreation.

Short stationary CPU submission samples were 0.36–0.39 ms baseline and 0.47–0.60 ms full-scene, with about 57–59 FPS. These are not GPU timings or a physical-device performance claim.

## Exact scope and next step

This Stage 2 changed `src/cinematic-renderer.js`, `src/cinematic-shaders.js`, `tests/illustrated-compositor.spec.js`, `Docs/renderer-current-spec.md`, and this evidence directory. Existing dirty work from earlier batches remains intact. No authored level/assets, gameplay/progression, asset/audio recovery, service-worker behavior, graphics defaults or Scene Depth formula/optimization was changed by this stage.

The compositor is ready for a **separate Scene Depth optimization investigation within the validated scope**. Stage 3 has not started. Any later work must retain these neutral comparisons, Stage 1 counters and resource ownership checks.
