# Cinematic Lighting — visual foundation correction

Current-tree continuation, 2026-08-29. Choose **Graphics → Experimental → Cinematic Lighting**. Author in **Ctrl+Shift+D → Graphics**; only **Apply** writes authored settings. Illustrated remains the default and Voxel remains available.

## 1. Summary

Preserved the shared compositor, depth cache, four layers, presets, editor state and presentation fix. Added a dedicated God Rays primitive, discoverable active-layer markers, gameplay-state cues, directional sprite response, stronger atmospheric participation and correctly sized embers. Rebuilt showcase coverage from an inventory of Illustrated functions.

## 2. Overlay root cause and fix

The Selected only filter removed every unselected instance before generating SVG, including its center marker. It now emits a compact selectable marker for **every authored placeable instance in the active layer**, including disabled instances. Only the selected instance receives full guides. All expands guides within the active layer; Hidden hides them; inactive layers stay hidden. Selection follows marker clicks across systems. Existing focus, scroll, layer, selection and panel preservation remain.

## 3. Dedicated God Rays architecture

`godRays` is a new type in the existing shared GPU effect buffer, not a separate renderer. A source-centered angular field generates an irregular family of rays. Each fragment evaluates only its three neighboring angular cells, independent of ray count. Seeded spacing and width variations, feathered strand profiles and moving longitudinal breakup keep one coherent origin. Existing single shafts remain available for local openings, but are disabled in the forest/harbor showcases.

## 4. God Rays authoring

Origin, direction, spread, ray count, width, width variation, spacing variation, length, intensity, color, softness, end feather, distance falloff, breakup, noise scale/amount/speed, atmosphere response, depth and occlusion softness. Controls have visual help, including hover and tap. Duplicate/Delete use the existing instance workflow and unique IDs. The fan guide's extent follows its authored spread/length.

## 5. Forest tree occlusion

Uses the existing black-far/white-near map, bilinear plus five fixed world-space taps and smooth depth comparison. No jitter, geometry reconstruction, binary masks or CPU readback. The regression isolates the dedicated rays on the real map: 42,941 near-tree pixels retain about **0.74%** ray contribution; 28,768 distant pixels retain **99.71%**. The old shaft regression also remains. Visual inspection checks the upper-left trunk, canopy and middle trees; the fan continues behind their painted silhouettes.

## 6. Moonlight

Harbor moonlight is a broad rotated Area Light with a 3100×1800 world-pixel region, cool color and soft falloff. Its direction also affects sprites. The previous blue cone is disabled, not deleted. Moonlight contributes to atmosphere without requiring a visible beam.

## 7. Illustrated-to-Cinematic inventory

The authored source effects and gameplay logic were inspected before composition changes. Source level files and drafts are preserved.

| Level | Existing function | Cinematic replacement |
| --- | --- | --- |
| Forest | Golden-hour Sun Presence at (163,199) | One dedicated God Rays origin at that position, warm broad light and source spill |
| Forest | Focused Fog around the middle trail | Depth-aware forest atmosphere, with additional distant air and retained pollen quality |
| Forest | Enabled rune glows at (273,467), (1384,153), (1469,316), (1849,355) | Existing three local sources retained; missing carved-gate source added |
| Forest | Disabled rune glow at (2126,407) | Remains disabled; no new source added there |
| Forest | Three challenge cues and Runenpoort readiness | Live cyan/gold challenge cues and amber/green exit cue |
| Temple | Six authored torch/brazier enhancements at x≈70,359,1093,1571,1810,2100 | Six local fire sources, bloom and small source-bound embers; three previously omitted sources restored |
| Temple | Four challenge cues and harbor-door readiness | State-driven GPU cues; existing interaction and completion logic unchanged |
| Harbor | Four wall torches at x≈71,338,1909,2133 | Existing four local fires retained |
| Harbor | Lanterns at (407,420), (1360,443) | Two additional warm local sources |
| Harbor | Enabled rune glows at (692,383), (877,366), (1757,397), narrow door polygon near (1824,383) | Local cyan sources, with an elongated door influence; existing compass source retained |
| Harbor | Disabled glow at (1516,449) | Remains disabled |
| Harbor | Four challenge cues and departure readiness | Live challenge/completion/exit cues |
| Harbor | Additional night atmosphere | Broad moonlight and continuous depth-aware mist; no moon cone |

Water, glints, stars, animals and other explicitly retained Illustrated effect classes are unchanged. Global Illustrated emissive bloom's lighting role is covered by local sources plus Cinematic bloom; it is not copied as a second screen overlay.

## 8. Challenge/exit state plumbing

`cinematicGameplayCues()` projects existing `isRuneActive`, `isChallengePrerequisiteLocked`, `completedRunes`, `isLevelExitReady` and interactive-object geometry. No alternate progression or persistence system. Inactive challenges are omitted. Available challenges breathe cyan; completed challenges remain identifiable in gold; locked states use muted amber; open exits use green. Soft broken rings and local emission are rendered in the shared field, so the canvas cannot obscure them. Their local spill also lights characters. They update only through the existing settings/state-driven buffer refresh. A small Effects control adjusts intensity and character influence.

## 9. Live character lighting

Sven, Freya, Eivar and ambient animals sample current world position, local sources, broad lighting and the actual ray field. Previously sprites never sampled shafts at all. Original sprite art and manual appearance remain the base. Decoded animation textures and last-valid-frame fallback remain unchanged.

## 10. Directional sprite response

A smooth 2D gradient favors the side facing each local source; broad light uses its authored direction. Screen-side response remains correct when sprites face the other way. Colored spill includes a small additive component so cyan can read on darker/red cloth. Highlight-dependent response preserves bright facial detail rather than letting it clip under fire/rays. No normals or PBR. A rendered cyan-source test verifies opposite sprite halves respond when the source moves left/right.

## 11. Character atmosphere/depth

Feet anchor depth independently of animation silhouettes. The front-atmosphere control integrates an authored portion of air between that floor plane and the viewer; haze color and local/ray illumination blend softly into covered sprite pixels. Coverage is bounded to keep sprites readable. This avoids rectangular holes or hard sprite masks. It is a pragmatic 2D approximation, not reconstructed volumetric geometry.

## 12. Depth A/B

With the same scene and shader clock, depth ON separates the forest fan from solid trees, preserves foreground temple floor/columns while enriching rear smoke, and clears harbor masonry/compass structures against distant blue air. Character participation follows its depth and front-air setting. Current mean RGB differences are approximately **19.4 / 4.4 / 17.2** for forest/temple/harbor; these quantify visible change, not quality. Actual screenshots were inspected. Maps still decode/upload once per path/device, survive level/mode changes, and fall back safely when absent or undecodable.

## 13. Ember size root cause

The vertex shader multiplied radius by `(1 + glow)`: the old 1.6 glow enlarged embers 2.6× before streaking. This was not a DPR or world/screen conversion error. Emission now changes brightness only. Source emitters have a distribution favoring tiny particles with a sparse larger tail; Embers uses radius 1.05, strong size variation, upward motion and finite fade. Pollen's authored radius compensates for its former 1.25 glow footprint, preserving its successful appearance. An isolated rendered particle test compares glow 0/3 at two viewport widths: the footprint stays **12×12 pixels** in all four captures.

## 14. Local-light guide radius

The old left-brazier radius really was 520 world pixels, meaning a 1040-pixel diameter; shader and SVG agreed. There was no radius/diameter mismatch. Temple sources now use a more local 330-pixel maximum reach. The selected ring remains geometrically exact but uses a subdued dashed stroke; compact markers stay clear. Tests assert ellipse radii equal authored radius/aspect.

## 15. Forest showcase

A prominent warm family of rays from the authored sun, blocked by near trees, with dark gaps and animated breakup. Pollen remains. Four enabled rune functions are represented. Sven changes smoothly between cyan rune spill, warm rays and middle-distance haze; Freya participates in the scene near the gate.

## 16. Temple showcase

Six correctly positioned warm fire sources, smaller embers, amber smoke toward rear architecture, clear foreground floor and readable carved detail. No outdoor god rays. Warm side lighting is visible near braziers. Challenge cues survive completion; the shield challenge was also answered through the normal UI during manual QA.

## 17. Harbor showcase

Broad cool moonlight contrasts with six warm torch/lantern sources and localized cyan runes. Depth clears foreground structures while distant harbor air accumulates mist. No blue spotlight. Small embers replace floating orbs; Sven/Eivar receive positional light and front-atmosphere integration.

## 18. Performance

No new full-screen pass or draw per ray. Shared effect buffer capacity is bounded at 128 records (up to 72 authored placeables plus 48 gameplay cues). Cached depth, pipelines, bind groups and batched particles remain. The final NVIDIA/Chromium stress case included 12 lights, depth, a 24-ray family, gameplay cues and 40,000 particles: **57.04 FPS**, **0.368 ms measured CPU submission average**, **10 draws**, **895 ms first initialization**, one depth upload and 13 bind groups at frame 79. This is a local laboratory result, not a cross-device guarantee.

## 19. Browser/WebGPU QA

Native Chromium on NVIDIA. Per-system visible off/on/off checks; dedicated tree occlusion; character side response; real walking/reversal/settling; sprite-frame changes, NPC poses and animal rendering; editor markers/guide geometry; Apply/reload; absent/delayed/corrupt depth; resource reuse; device-loss and shader-error recovery; renderer switching; actual depth A/B captures. Final manual smoke rechecked all three showcases after the last test state: coherent forest ray family and clean tree silhouettes, warm temple response without facial clipping, and broad harbor moonlight with readable warm/cool separation. The browser console contained no warnings or errors. The original DOM-readiness flicker regression sampled **272 movement frames, 0 hidden frames and 0 canvas reconfigurations**; no arbitrary waits were added.

## 20. Automated results

Final desktop Chromium/WebGPU suite: **188 passed, 0 failed, 0 skipped** in 7.3 minutes. Focused continuation checks additionally produced **1/1** for the right-edge editor restore, **12/12** across three repeated emissive persistence runs, **4/4** from the recovered clean state, and **1/1** for locomotion persistence. No separate tablet-project run was added in the continuation; the 188-test desktop project itself includes its established iPad landscape/portrait viewport cases. All 31 levels validate. Assertions were not removed or weakened.

The final suite was followed by a byte-level authored-file audit: all three showcase `level.js` files, all three existing `editor.draft.json` files and all three depthmaps matched their starting SHA-256 values. LVL-0021 returned clean, and every non-Cinematic world setting matched the starting snapshot. Persistence tests now hide unrelated real drafts, snapshot every level definition and optional draft per test and per suite, close the browser page before restoration, and restore world configuration through the serialized dev-server endpoint.

## 21. Intentional limits

Experimental 2D rendering with authored depth, not geometric shadows or physically exact transport. No PBR, normals, SSAO/SSR, ray tracing, parallax or full 3D scene graph. No arbitrary sprite-to-sprite depth sorting. The harbor door's source polygon is represented by a local elongated light, not an exact polygon mask. Layer masters may disable authored cue presentation for A/B, but never change gameplay. Physical iPad GPU support/performance is not certified by WebKit layout emulation.

## 22. Known defects / final status

No remaining Cinematic defect was observed in the three authored showcase scenes or the final regression scope. Specifically, the verified scope showed no missing active-layer markers, spotlight-like God Rays, obvious tree-ray leakage, jagged/haloed depth contours, oversized embers, absent challenge/exit cues, character-lighting flicker, canvas hiding, relevant console errors or authored-file drift. This does not certify every possible custom authoring combination, browser/GPU driver or physical tablet. The intentional architectural limits in section 21 remain.
