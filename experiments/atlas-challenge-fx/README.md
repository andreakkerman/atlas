# Atlas Challenge FX Lab

An independent visual study. Nothing imports Atlas application code, changes level data, registers a worker, or writes game progress. All four supplied reference assets are copied into this folder without redesigning them.

## Run

From the repository root:

```powershell
node experiments/atlas-challenge-fx/serve.cjs
```

Open http://127.0.0.1:4187. The read-only server serves only this directory. `PORT` can override its port. No build or dependencies are needed to run the lab.

## Use

**FX renderer**, above the scene, switches between **Canvas 2D · living particles** and **WebGPU · living stardust**. Canvas remains the default and retains the chosen settings baseline. Its challenge is now a breathing field of cyan/gold motes with no center dot, outline, ring or spot glow. Its exit is a gold-dominant enchanted cloud. Canvas transfer ribbons and Sven absorb graphics remain unchanged. WebGPU uses particles throughout: breathing lobes of cyan and gold fireflies, a directional swarm of luminous motes, and broad gold orbital/spiral eddies. The transfer finishes at Sven without a separate absorb animation. There are no WebGPU strokes, glyph outlines, ribbon meshes or traced rings. Forms emerge from filled, irregular particle volumes. There is no central spot glow or underlying mist/cloud sprite: all light comes from individual motes and their bloom. Fine dust, bright pinprick cores and a few softer foreground motes create depth. The background and Sven image are unchanged.

Both renderers consume the same anchors, settings, clock, completion set, moving chest endpoint and audio owner. Switch while paused to compare the exact same moment; switching never restarts a sequence or audio. Renderer selection lives in `settings.renderer.mode` (`canvas` / `webgpu`), and uses the existing persistence/export/import mechanism. Old exports default to Canvas. Restore defaults restores Canvas. Earlier `renderer.filaments` values migrate to `renderer.richness`. Shared controls use labels appropriate to each renderer. Obsolete Canvas ring/spiral controls are hidden, with their values retained for WebGPU comparison and JSON compatibility.

**08 · Particle finish** provides independent **Cyan particle amount** and **Gold particle amount**, particle bloom, exposure, richness, mote size and particle depth. The color amounts live in `renderer.cyanParticles` and `renderer.goldParticles` (0–3, default 1 each) and multiply separate populations across all WebGPU effects, and Canvas challenge/exit particles. Canvas transfer and absorb retain their existing controls and visuals. Setting one to 0 removes that species; setting both to 0 removes every WebGPU effect pixel, including bloom. Counts remain bounded at high density settings. The default mix retains cyan-heavy knowledge effects and gold-heavy exits. Existing cyan/gold intensity controls remain brightness controls and are labeled accordingly in WebGPU mode. All controls use the existing persistence/export/import and defaults path.

WebGPU requires a secure origin (localhost works) and a compatible browser/device. The status line reports initialization, active GPU rendering or Canvas fallback explicitly. Unsupported adapters, shader/device errors and device loss leave Canvas usable while retaining the selected preference. Switching back to Canvas releases the device and GPU surfaces; selecting WebGPU again retries initialization. The lab creates no Atlas resources or imports.

### Native WebGPU pipeline

`gpu-particles.js` generates up to 25,200 round particle sprites procedurally in WGSL, with bounded populations per phase. Integer hashing avoids lattice-like particle placement; depth changes brightness and sprite softness. One particle draw renders into an additive `rgba16float` surface. `gpu-shaders.js` supplies two quarter-resolution separable bloom passes and a premultiplied transparent presentation pass. No ribbon/line pipeline exists. No Canvas image is uploaded to WebGPU, and original CPU effect drawing is skipped while GPU rendering is active.

One scheduler supplies both renderers. DPR is capped at 2, the full-resolution GPU surface at 4 million pixels and the adapter's texture limit; three HDR targets use approximately 9 bytes per full-resolution pixel including bloom (at most about 36 MB). Geometry and particle instance counts are bounded. Resize destroys old surfaces; async initialization is generation guarded; visibility pauses animation/audio and GPU submission; page exit releases resources. The shared world endpoint remains exact even though WebGPU adds a more fluid interior carrier shape.

`gpu.spec.cjs` checks native GPU color readback, independently increasing/decreasing each color population, zero residual glow with both populations off, export/import/persistence/defaults and screenshots across idle, early/late transfer, no residual particles after arrival, both exit styles, live renderer switching without clock/audio drift, moving Sven, three-distinct-completion unlock, resize bounds and repeated GPU cleanup. WebKit tests the explicit unsupported fallback and the complete Canvas workflows. Native GPU tests run only in Chromium because this Windows WebKit build has no WebGPU. This does not certify physical iPad Safari GPU performance.

Click one of the three vessels or its Challenge button. The mockup opens immediately (50 ms at baseline) and waits indefinitely for **Complete & release**. Completion starts its closing animation directly; the transfer starts on the exact closing boundary. There is no separate release pause. The receive pulse begins at arrival and fades completely; the optional gate response follows. Play all and Demo loop explicitly auto-complete after the Auto preview hold setting.

Replay repeats the last challenge. Play all runs 1–3; Demo loop repeats that order. Pause freezes the effect clock, including idle markers. The timeline scrubs the complete sequence and pauses. Reset scene clears playback and the demo queue while preserving tuning; Restore defaults resets tuning. Hide editor enlarges the scene.

In both renderers, completing a challenge sends its original seeded idle motes along the shared transfer path to Sven's live chest position. Departures are staggered and the entire swarm converges at arrival; the source does not continue emitting an idle marker. The challenge motes disappear on arrival. WebGPU ends there; Canvas retains its separate approved Sven absorb animation. The existing settling/completion timing remains shared with Canvas; Canvas-only absorb visual controls are hidden in WebGPU mode. Consumed challenges remain visually empty while other challenges retain their idle particles, including after switching renderers. This is derived from the existing sequence clock and completion set. Explicit replay/scrubbing can preview the selected challenge again; Reset Scene restores all three. Canvas motes use cached soft sprites and stable seeds; the old idle marker is never redrawn over an in-flight or consumed challenge.

Eight control groups: Challenge marker, Challenge screen, Transfer flow, Sven absorb, Exit response, Global timing, Layout / anchors, Particle finish. Sliders and numeric inputs share the same state, with generous ranges. Global timing repeats the existing screen/transfer/exit values as aliases rather than separate settings. Total sequence scales the preview; 0 uses the natural sum of the phases. Individual challenges still wait for completion. Absorb duration plus settle determines the receive envelope after arrival. Legacy marker/release/transfer-delay/absorb-overlap and completion/release-delay keys remain in JSON for compatibility, but do not delay playback and are omitted from controls.

**Move Sven** moves him horizontally; **Move Sven During Transfer** starts a completion/transfer test and begins movement as the popup finishes closing. During an already-running transfer it moves Sven without restarting the stream. Movement alternates left/right within the scene and writes the same layout settings as manual input. Dragging or entering Sven coordinates overrides a movement test. The supplied sprite remains a still image, not a walk cycle.

The rendered actor eases toward the desired editor position. Every ribbon, filament and particle samples one carrier whose endpoint is the rendered actor's live upper-chest anchor. A slower interior bend follows that motion with inertia, while all offsets taper to zero at the live destination. No fixed target is captured, and movement does not reset the transfer clock. Absorption uses the same live chest anchor, including if Sven continues moving during reception.

Transfer audio uses the supplied `assets/audio/sfx/magical-knowledge-transfer.mp3`, copied unchanged into the lab's own `assets/` to keep its server isolated. A single Web Audio voice (with native audio fallback when Web Audio is unavailable) starts at the close-to-transfer boundary, follows the existing sequence clock, pauses/resumes at the corresponding clip offset, and stops on arrival, reset, replay or page hiding. Scrubbing while paused is silent. The clip plays once at its original speed; a shorter flow trims it with a brief fade, while a longer flow does not loop it. Pointer/keyboard interaction enables browser audio; loading/decoding failures show a status message. Challenge popup and independent exit previews do not play this sound. No production audio configuration is changed.

The exit unlocks only after **all three distinct challenges** have completed their transfer and absorption. Repeating a challenge does not add another completion. After the final gate delay, the selected gold-dominant exit style remains continuously visible with gentle breathing; it never fades to zero or restarts between cycles. Opening duration controls the initial appearance, not its lifetime. The cyan rune in the supplied background remains unchanged.

**Exit style** retains `exit.style: "orbital"` (default) or `"spiral"`. Canvas labels these **Enchanted cloud** and **Wandering embers**; WebGPU retains Orbital Halo and Spiral Vortex. Switching updates the current effect immediately without resetting preview/unlock clocks. The existing storage/export/import mechanism saves the selection and all exit tuning. Older settings without these fields receive the new exit defaults; all existing challenge settings are preserved. Restore defaults selects the first style; Reset Scene clears unlock/preview state while retaining tuning, as before.

- **Canvas Enchanted cloud:** independently drifting warm motes fill a softly breathing volume. No ring, galaxy, drawn outline or anchor-wide aura. Cached particle sprites provide individual luminous cores and halos.
- **Canvas Wandering embers:** a similarly filled magical cloud with gently rising/falling particles and soft edge fade. The same existing style key selects this alternative without spiral arms. Canvas controls expose drift speed, wandering amount, cloud drift, radius and ellipse; line, secondary loop, counter-rotation and spiral turns remain hidden.
- **WebGPU exits:** filled orbital clouds and diffuse spiral particle arms, with no continuous rings, wisps or aura sprites.
- **Shared tuning:** radius, ellipse ratio, signed rotation speed, particle density, gold intensity, cyan accent, aura strength, pulse, opening duration and unlock delay. Broad ranges allow exaggerated studies. Neither variant draws arches, vertical pillars or architectural outlines.

**Play Exit** and **Replay Exit** independently preview the same continuous indicator without granting challenge completions. **Reset Exit** stops that preview; it cannot hide an exit already earned by completing all three challenges. **Reset Scene** clears completion state and the unlocked indicator. Completion state is session-only, separate from persisted graphics settings. Pause freezes the animation while preserving visibility. The Exit response checkbox can hide the earned indicator for tuning.

Enable **Drag anchors in scene** to move Sven, all three vessels and the gate using pointer/touch dragging. Percentage coordinate inputs provide precise placement. Popup placement and Sven scale also have numeric controls. Sven Y denotes the bottom of the supplied sprite image; transparent padding is preserved.

The supplied graphics values are the exact defaults in `baseline.js`, including the retained legacy timing values. Edits persist in localStorage under `atlas-challenge-fx-lab-v2`. The old v1 storage entry is preserved but is not loaded, so the first visit after this update uses the requested baseline. Export format remains `atlas-challenge-fx/v1`. Copy JSON uses the clipboard; Export downloads a versioned JSON file; Import validates and clamps that format against the control schema. If storage/clipboard access is unavailable, a visible status directs you to Export. Settings never enter Atlas storage or level drafts.

## Architecture and visual references

- `index.html`, `lab.css`: responsive scene, mockup and accessible HTML controls.
- `baseline.js`, `settings.js`: chosen defaults, range metadata, validation and shared phase schedule.
- `lab.js`: deterministic Canvas 2D sheet meshes, additive glow, filaments, dust, receive/gate effects; one clock and settings object; pointer editing and persistence.
- `transfer-audio.js`: gesture-enabled MP3 playback, Web Audio/native audio compatibility, and a single sequence-synchronized sound voice.
- `canvas-particles.js`: bounded seeded challenge motes, cached luminous sprites and particle convergence along the existing live carrier.
- `exit-visuals.js`: bounded Canvas 2D drawing for Enchanted cloud and Wandering embers; challenge, transfer, audio, receive and unlock logic remain owned by their existing systems.
- `serve.cjs`: standalone read-only local server.
- `assets/`: Runenpoort, Sven, challenge mockup and magic reference.
- `lab.spec.cjs`, `playwright.config.cjs`: isolated desktop Chromium and iPad WebKit emulation checks.

The technical/art reference is `src/intro/renderer.js` (`path`, `makeRibbons`, `makeParticles`) and `src/intro/shaders.js`: a coherent curved carrier shared by layered translucent sheets, filaments, bright nodes and restrained gold dust. This study adapts that structure to a single in-world destination using Canvas 2D, without production imports. The supplied magic image guides sheet width, transparent overlap and cyan/gold balance; it is also available inside the editor reference drawer.

## Validation

```powershell
npx.cmd playwright test --config experiments/atlas-challenge-fx/playwright.config.cjs
```

Coverage: Canvas particle identity through departure and convergence, zero pixels at consumed anchors, no strokes or broad fill glows in idle/exit drawing, independent color removal, exact graphics baseline, direct popup opening, indefinite manual hold, immediate close-to-transfer boundary, stationary and moving reception, per-frame endpoint/chest agreement, continuous stream clock and bend motion, independent gold-dominant exit/replay/reset, three-unique-completion unlock and continuous visibility across cycles for both styles, live switching, style export/import/persistence/default restoration, real MP3 decoding and sound timing/pause/resume/reset, pause, scene reset, pixels drawn, asset isolation, viewport overflow, shared timing fields, persistence, export, anchor dragging, editor toggle and sequential playback. Canvas and WebGPU/fallback tests run across desktop Chromium and iPad WebKit landscape/portrait. Screenshots include early/late moving transfer, reception at the new location and the independent exit, in `test-results/challenge-fx/`.

Visual iteration widened the initial overly faint transfer sheets, corrected leading-edge arrival relative to absorption, and moved the second label away from Sven. Endpoint regression checks exposed slider step/floating-point disagreement; the scrubber now snaps its final half-step to the exact sequence end.

Canvas limitations: 2D sheets do not have the intro's texture-sampled volumetric detail or HDR bloom, and do not occlude behind painted objects. Sven remains the supplied still sprite; reception uses an aura and inward dust rather than a new pose. Marker labels are lab annotations. Very high particle/ribbon settings may be CPU intensive. Browser-emulated iPad coverage does not certify physical iPad Safari performance. No production renderer or resources changed, so the production 3D acceptance gate is not applicable.
