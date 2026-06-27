# Atlas Ambient Flyby and Editor Specification

## 1. Purpose

Implement a complete, reusable ambient-object extension for Atlas in one Codex run.

Required scope:

1. Generic ambient flybys.
2. A common-swift pilot in Italy level `LVL-0016`.
3. Self-service creation of ambient animals and flybys through the local editor.
4. Reuse and duplication of ambient assets and configured instances.
5. Optional synchronized timing for separate flyby instances.
6. Automatic preloading, decoding and caching of configured assets.
7. Smooth, time-based flyby rendering.
8. Optional Minnie and Moose blink animations.
9. A scrollable, collapsible and usable editor.
10. A scrolling fix for the `Voortgang` session-report screen.
11. Focused regression coverage for desktop and iPad layouts.

This specification is the source of truth for the run.

---

## 2. Existing systems to inspect and preserve

Before changing code, inspect and reuse the existing implementations for:

- ambient animals;
- owl, raven and seagull blink behavior;
- ambient-animal audio;
- mirror controls;
- level editor;
- editor Draft/Apply persistence;
- local editor development server;
- Sven path editor;
- camera and world-coordinate handling;
- companion bar;
- Minnie and Moose portraits;
- session tracking and the `Voortgang` screen;
- service worker and offline behavior;
- Playwright test structure.

Preserve:

- all existing levels;
- all current ambient animals;
- existing blink timing and audio behavior;
- learning content and evidence;
- session-report data;
- challenges and progression;
- companion dialogue and purr behavior;
- service-worker behavior;
- existing editor tools;
- published GitHub Pages runtime.

Do not create level-specific runtime logic where a generic system is appropriate.

---

## 3. Mandatory editor usability

Editor usability is a **MUST**, not a secondary refinement.

Required behavior:

- the editor panel itself is vertically scrollable;
- no control may become unreachable below the viewport;
- scrolling works with mouse wheel, trackpad and touch;
- support desktop, iPad landscape and iPad portrait;
- clearly separate `Ambient animals` and `Ambient flybys`;
- only show controls relevant to the selected object type;
- use collapsible sections;
- keep common controls visible;
- keep advanced controls collapsed by default;
- avoid one long uncontrolled list;
- edit one configured object at a time;
- editor controls consume their events and do not trigger ground clicks or move Sven;
- add/delete/duplicate/preview actions remain reachable;
- Draft/Apply feedback remains clear;
- entering special edit modes does not break ordinary editor navigation;
- closing the editor or edit mode restores normal page behavior.

Suggested flyby sections:

- Assets
- Path
- Animation
- Timing
- Audio
- Advanced

---

## 4. Generic ambient flyby model

Add a generic level property such as:

```js
ambientFlybys: []
```

Each configured flyby instance should support:

```js
{
  id,
  label,

  frameA,
  frameB,
  sound,

  path,

  scale,
  speed,
  flapFrequencyHz,

  faceFlightDirection,
  mirrorX,

  intervalMinMs,
  intervalMaxMs,

  syncKey,
  startDelayMs,

  softness,
  saturation,

  soundVolume,

  rotateAlongPath,
  maxRotationDeg,

  motionProfile,
  wobble,
  speedVariation,
  flutterFrequency
}
```

No `soundChance` field.

When a valid sound is configured, every passage plays that sound.

When no sound is configured or loading fails, the bird still flies silently.

---

## 5. Italy pilot: LVL-0016

Use `LVL-0016` as the first flyby pilot.

Assets already exist at:

```text
assets/ambient/flybys/common-swift/common-swift-a.png
assets/ambient/flybys/common-swift/common-swift-b.png
assets/ambient/flybys/common-swift/common-swift-call.mp3
```

Use exact case-sensitive paths.

Create one common-swift flyby with:

- a high curved route;
- start outside the left side;
- gentle descent toward the upper center;
- rise toward the right;
- exit outside the right side;
- fast but readable speed;
- natural rapid flap frequency;
- `intervalMinMs: 18000`;
- `intervalMaxMs: 35000`;
- automatic facing enabled;
- subtle path rotation;
- sound on every passage;
- automatic volume fade-in and fade-out.

The initial coordinates do not need to be perfect. They must be editable through the editor.

---

## 6. Flyby movement and curve generation

The editor stores authored control points. The **engine** generates and renders the smooth curve.

Requirements:

- use world coordinates;
- minimum 2 path points;
- new flybys receive a default 3-point path;
- typical paths use approximately 3–6 points;
- allow more points where needed;
- generate a smooth, predictable curve;
- avoid unexpected spline overshoot;
- keep the rendered route reasonably close to authored points;
- use the same curve implementation in editor preview and runtime;
- calculate path length from the smoothed route;
- move by travelled distance, not raw point index;
- maintain consistent configured speed over the full path.

Do not implement complex Bézier handles, speed per segment, scale per segment, rotation curves or formation templates.

---

Optional motion profiles:

- `motionProfile: "smooth"` is the default and preserves the existing smoothed route behavior.
- `motionProfile: "organic"` adds deterministic irregularity for bats, butterflies and similar flyers.
- Organic profiles may use `wobble` in world pixels, `speedVariation` from `0` to `0.45`, and `flutterFrequency` in cycles per second.
- The same two-frame sprite convention still applies; no runtime AI, physics engine or flock model is involved.

## 7. Flight-path editor mode

Add an explicit `Edit flight path` mode.

Outside this mode, flight paths and handles remain hidden.

Required controls:

- Add point
- Delete selected point
- Reverse path
- Preview flyby
- Fit flight path
- Fit level
- Done

Point behavior:

- every point is selectable and draggable;
- every point has editable numeric X and Y values;
- distinguish start, intermediate and end points;
- show point numbers;
- update the curve immediately after dragging, numeric changes, adding, deleting or reversing;
- prevent deletion below 2 points;
- preserve exact authored coordinates through Draft/Apply and reload.

Preferred Add point workflow:

1. Choose `Add point`.
2. Click the desired location in the path workspace.
3. Insert the point in the appropriate path order.
4. Rebuild the curve immediately.

---

## 8. Editing off-screen path points

Start and end points may be outside the playable level bounds.

All off-screen points must remain visible and editable in path-edit mode.

While path-edit mode is active:

- show a temporary editable margin around the level;
- suggested margin:
  - 200–300 world pixels left;
  - 200–300 world pixels right;
  - 150–250 world pixels above;
  - smaller optional margin below;
- clearly show the real level boundary;
- visually dim or shade the off-screen workspace;
- allow negative coordinates;
- allow coordinates beyond level width and height;
- do not clamp path points to level bounds;
- allow panning;
- keep all points selectable;
- `Fit flight path` frames all authored points;
- `Fit level` returns to normal framing.

This workspace exists only in path-edit mode and must not affect gameplay or ordinary editor coordinates.

---

## 9. Direction and mirroring

A flyby may travel left-to-right or right-to-left.

Direction is determined by path order. `Reverse path` reverses the complete path.

Add `Face flight direction`, enabled by default.

When enabled:

- automatically face the sprite toward the overall horizontal travel direction;
- do not rapidly flip based on small local curve changes;
- determine facing from the stable overall path direction.

When disabled, use manual `mirrorX`.

Preview and runtime must behave identically.

---

## 10. Wing animation

Use the two provided frames as a repeated flap animation.

Requirements:

- frame switching is time-based;
- use `flapFrequencyHz`;
- do not depend on browser frame rate;
- do not use accumulating flap timers;
- both frames share one fixed-size container, transform, anchor, scale and path position;
- frame switching does not move the body, anchor or layout;
- no crossfade;
- no DOM recreation during frame switching;
- no layout changes when changing frames.

If frame B fails:

- keep showing frame A;
- disable only the flap animation;
- warn in development;
- do not break the level.

---

## 11. Smooth flyby rendering and performance

Use one shared `requestAnimationFrame` loop for all active flybys.

Requirements:

- movement is based on high-resolution elapsed time;
- speed is world pixels per second;
- do not move a fixed number of pixels per frame;
- clamp unusually large delta-time jumps;
- use compositor-friendly transforms only: `translate3d`, subtle `rotate`, configured `scale`;
- do not animate `left`, `top`, width, height or margins;
- use `will-change: transform` only while active;
- remove `will-change` after completion;
- do not keep the flyby RAF loop running when no flyby is active.

Path cache:

- sample the smooth curve;
- calculate cumulative segment lengths and total length;
- cache these values;
- map travelled distance to position using the cache;
- do not recompute full curve geometry every frame;
- invalidate the cache when editor path points change.

Stop and clean up timers, active flybys, audio, animation state and RAF state when leaving a level, entering a menu, starting a transition or hiding the document.

On resume, schedule a fresh delay and do not process a backlog.

Respect `prefers-reduced-motion` by disabling automatic passages or otherwise suppressing flyby motion.

---

## 12. Flyby timing

Expose in the editor:

- Minimum interval
- Maximum interval

Display values in seconds and store them as `intervalMinMs` and `intervalMaxMs`.

Rules:

- suggested editor range: 5–120 seconds;
- step: 1 second;
- prevent or automatically correct minimum > maximum;
- after a flyby completes, choose the next delay randomly within the configured range;
- do not schedule overlap with the same flyby;
- do not trigger an immediate automatic flyby when entering the level;
- Preview flyby starts immediately without changing the normal runtime schedule.

Italy defaults:

```js
intervalMinMs: 18000,
intervalMaxMs: 35000
```

---

## 13. Synchronized flyby timing

Do not create a separate group object model.

Keep every bird as an independent `ambientFlybys` entry.

Add optional:

```js
syncKey
startDelayMs
```

Behavior:

- flybys with the same non-empty `syncKey` share one scheduler;
- they start from the same trigger;
- `startDelayMs: 0` means exact simultaneous start;
- a positive delay creates a slight stagger;
- synchronized flybys do not also run independent schedules;
- the synchronized set does not restart until all members finish;
- flybys without `syncKey` remain independent;
- removing `syncKey` restores independent scheduling.

Flybys in the same synchronization set must use the same min/max interval. Changing shared interval values through one member updates all members with the same `syncKey`.

The editor should:

- allow choosing an existing synchronization ID;
- allow entering a new one;
- show which flybys share it;
- expose `startDelayMs`;
- provide `Preview synchronized flybys`.

Audio rules:

- each flyby may reference its own sound;
- if synchronized members reference the same sound path, play it once using the highest configured sound volume;
- if sound paths differ, each may play;
- avoid unintended loud stacking.

---

## 14. Flyby audio

No random sound chance.

When a valid sound is configured:

- every passage plays it;
- Preview uses the same behavior.

Use an automatic volume envelope based on normalized path progress:

```text
silence → configured maximum → silence
```

Requirements:

- fade in as the bird enters;
- remain near configured maximum through the central part;
- fade out as the bird exits;
- use smooth easing;
- avoid audible volume steps;
- use path progress, not distance to Sven;
- no stereo panning;
- no Doppler effect;
- no camera-distance simulation.

The editor exposes only Sound and Sound volume.

The player starts levels through the menu, so do not introduce a new audio-unlock subsystem. Reuse existing Atlas audio handling.

A missing or failed sound must not block the flyby.

---

## 15. Self-service ambient asset discovery

The user must be able to add new ambient animals and flybys without manually editing code and without another Codex run.

The user places assets in:

```text
assets/ambient/animals/
assets/ambient/flybys/
```

Then starts:

```text
npm run dev:editor
```

and opens:

```text
http://127.0.0.1:4173/?dev=editor
```

Add a safe editor-only local-server endpoint that lists supported files in the central shared `assets/ambient` directory.

Supported images:

- `.png`
- `.jpg`
- `.jpeg`
- `.webp`

Supported audio:

- `.mp3`
- `.ogg`
- `.wav`

Requirements:

- only scan `assets/ambient/animals/` and `assets/ambient/flybys/`;
- reject path traversal;
- no arbitrary filesystem access;
- return browser-safe relative paths;
- sort filenames predictably;
- handle missing or empty folders cleanly;
- report complete two-frame asset sets and non-blocking warnings for incomplete folders;
- endpoint is editor-only;
- normal published runtime never calls it.

Current central naming convention:

```text
assets/ambient/animals/<name>/<name>-open.png
assets/ambient/animals/<name>/<name>-closed.png
assets/ambient/animals/<name>/<name>-call.mp3

assets/ambient/flybys/<name>/<name>-a.png
assets/ambient/flybys/<name>/<name>-b.png
assets/ambient/flybys/<name>/<name>-call.mp3
```

Images may use `.png`, `.jpg`, `.jpeg` or `.webp`. Audio may use `.mp3`, `.ogg` or `.wav` and is optional. Animal image roles may also be expressed as `frame-a`/`frame-b`; flyby image roles may be `a`/`b` or `frame-a`/`frame-b`.

Add `Refresh assets` without reloading the full editor.

---

## 16. Add ambient animal workflow

Add `Add ambient animal`.

The user selects:

- open frame;
- closed frame;
- optional sound.

The user enters:

- label;
- unique ID.

Create a new `ambientAnimals` entry with sensible defaults.

The new instance immediately supports existing controls for:

- x;
- y;
- drag placement;
- scale;
- mirror;
- softness;
- saturation;
- sound volume;
- blink preview;
- sound preview;
- delete;
- Draft/Apply persistence.

---

## 17. Add ambient flyby workflow

Add `Add ambient flyby`.

The user selects:

- frame A;
- frame B;
- sound.

The user enters:

- label;
- unique ID.

Create a new `ambientFlybys` entry with sensible defaults and a default 3-point path.

The new instance immediately supports editing of:

- path;
- scale;
- speed;
- flap frequency;
- direction;
- mirror;
- interval;
- syncKey;
- start delay;
- visual properties;
- sound volume;
- preview;
- delete;
- Draft/Apply persistence.

---

## 18. Asset validation

Do not impose fixed image dimensions, canvas sizes or aspect ratios.

The user controls rendered size through Scale.

Rules:

- different source resolutions are allowed;
- preserve source aspect ratio;
- do not resize, crop, rewrite or normalize source files;
- the same assets may be selected by multiple instances.

For two-frame animations:

- compare intrinsic frame dimensions;
- if dimensions differ, show a non-blocking warning;
- allow the user to continue;
- explain that differing dimensions may cause visible alignment movement.

Blocking errors:

- missing file;
- unsupported extension;
- invalid path;
- duplicate configured-instance ID.

Do not create broken partial entries.

---

## 19. Multiple configured instances and asset reuse

Treat assets and configured instances as separate concepts.

Requirements:

- multiple ambient animals may reference the same image and audio paths;
- multiple flybys may reference the same image and audio paths;
- only configured-instance IDs must be unique;
- deleting an instance never deletes source files;
- editing one instance does not modify another;
- runtime state remains independent per instance.

---

## 20. Duplicate selected

Add `Duplicate selected` for ambient animals and flybys.

Behavior:

- copy the selected configuration;
- reuse the same source assets;
- generate a valid unique ID;
- create a sensible copied label;
- immediately select the new copy.

For ambient animals, offset position slightly.

For flybys, duplicate the full path and settings, including `syncKey`.

Draft/Apply/reload must persist all copies.

---

## 21. Draft/Apply persistence

The full self-service workflow must be:

```text
place files
→ discover files
→ add object
→ configure object
→ Draft
→ Apply
→ physically persist level configuration
```

No manual JavaScript edit may be required after Apply.

Requirements:

- reuse existing editor save/API architecture;
- create `ambientAnimals` or `ambientFlybys` arrays if absent;
- preserve empty arrays correctly;
- preserve unknown or unrelated level fields;
- do not rewrite or delete source asset files;
- reload restores exact configuration;
- negative and out-of-bounds path coordinates survive exactly;
- changed asset selections persist;
- duplicated instances persist;
- sync settings persist.

---

## 22. Automatic preload, decode and cache

All configured assets preload automatically when their level loads.

Asset discovery is only for editor selection. Normal runtime reads persisted asset paths from level configuration.

Cache assets by normalized path. Multiple instances using the same file must reuse the cached resource.

Apply this to:

- ambient-animal open frames;
- ambient-animal closed frames;
- ambient-animal audio;
- flyby frame A;
- flyby frame B;
- flyby audio;
- Minnie blink frame;
- Moose blink frame.

Ambient animals:

- decode normal and blink frames;
- keep normal frame visible until blink frame is ready;
- do not enable blink until alternate frame is decoded;
- preload configured audio;
- no missing-image flash.

Flybys:

- decode frame A and frame B before first passage;
- preload configured audio;
- postpone only that flyby's first passage until required frames are ready;
- do not block level rendering, Sven, challenges or other objects.

Failure behavior:

- one failed asset does not break the level;
- development warning identifies level ID, object ID and failed path;
- disable only the affected behavior.

After editor Apply:

- invalidate stale object readiness;
- preload newly selected paths;
- do not keep old readiness state.

---

## 23. Existing ambient-animal preload regression

Preserve the existing fixes that prevent blink/preload flashes for owl, raven and seagulls.

Do not regress:

- first blink;
- first sound;
- mirror behavior;
- shared transforms;
- frame geometry;
- event isolation.

Newly added ambient animals must use the same stable approach.

---

## 24. Minnie and Moose blink animation

The user may later add:

```text
assets/guides/minnie_blink.png
assets/guides/moose_blink.png
```

These files may not exist during this Codex run.

Implement optional automatic detection and activation.

Behavior:

- existing guide portraits remain the open-eye frames;
- blink files are closed-eye frames;
- when a blink file exists, preload/decode it and enable blinking automatically;
- when absent, continue showing the normal portrait;
- no broken-image flash;
- no player-facing error;
- optional development warning only.

No editor configuration is required.

When the user adds the files later and republishes, Atlas automatically uses them on the next start without another code change.

Blink timing:

- independent Minnie and Moose timers;
- random interval approximately 4–9 seconds;
- eyes closed approximately 90–120 ms;
- retain small chance of double blink;
- do not synchronize Minnie and Moose;
- do not reset timers on ordinary UI rerenders;
- pause/clean up while portraits or page are hidden;
- restart with a fresh random delay when visible again.

Preserve portrait frames, active-speaker glow, companion dialogue, purr click/audio, hint behavior, responsive layouts and visibility rules.

Frame switching must not alter geometry or layout.

---

## 25. Service worker and offline behavior

Inspect the current service-worker strategy.

Ensure newly configured ambient assets can load and be cached correctly after publication.

Requirements:

- do not require a manually maintained hardcoded asset list for every new ambient file;
- runtime-referenced ambient files are compatible with current runtime caching;
- updating asset paths does not leave permanently stale content;
- preserve current offline behavior;
- normal runtime does not depend on editor-only asset discovery.

Document any unavoidable service-worker limitation.

---

## 26. Voortgang screen scrolling fix

The `Voortgang` session-report screen currently allows content longer than the viewport but is not reliably scrollable.

Fix it generically.

Requirements:

- full report vertically scrollable;
- mouse wheel;
- trackpad;
- touch;
- desktop;
- iPad landscape;
- iPad portrait;
- mobile viewport changes;
- no content clipped below viewport;
- expanded details reachable;
- category details reachable;
- delete controls and confirmations reachable;
- header/navigation remain usable;
- avoid competing nested scroll containers;
- use one clear primary scroll container where practical;
- account for dynamic viewport height;
- opening the report does not make gameplay or main menu scrollable;
- closing the report restores normal overflow behavior;
- preserve Atlas visual design;
- use sensible scroll position behavior when opening or returning.

Investigate root causes such as fixed heights, `overflow: hidden`, missing `overflow-y: auto`, flex children without `min-height: 0`, and modal or viewport sizing problems.

This fix is mandatory.

---

## 27. Editor scrolling and responsive behavior

The expanded editor must remain usable after all new controls are added.

Mandatory requirements:

- editor panel scrolls independently and reliably;
- controls remain reachable;
- collapsible sections work;
- selected-object panel remains understandable;
- asset picker remains compact;
- path mode remains navigable;
- touch scrolling works;
- no accidental stage interaction;
- no horizontal overflow that hides controls;
- desktop;
- iPad landscape;
- iPad portrait.

Test editor scrollability with enough controls and content to exceed the viewport.

---

## 28. Interaction isolation

Ambient flybys:

- never clickable;
- no pointer interception;
- no ground-click blocking;
- no challenge behavior;
- no learning evidence;
- no session-report evidence.

Editor controls:

- consume pointer/touch/click events;
- do not move Sven;
- do not trigger stage interactions.

Preview controls:

- repeated clicks cancel and restart cleanly;
- no overlapping preview loops;
- no orphaned audio.

---

## 29. Runtime visibility rules

Flybys must not remain active during menus, level transitions or hidden document state.

At minimum:

- no stale flyby after changing levels;
- no stale audio;
- no stale scheduler;
- no hidden-tab backlog.

Follow existing architecture consistently for overlays and challenges.

---

## 30. Testing requirements

Add focused tests for:

### Flyby runtime

- LVL-0016 renders the swift flyby;
- frame geometry remains stable during flap switching;
- first passage has no missing-image flash;
- path is smooth;
- start and end are outside the playable scene;
- configured speed affects travel time;
- flap frequency affects frame switching;
- automatic facing works both directions;
- Reverse path reverses direction;
- subtle rotation remains within configured maximum;
- no click interception;
- no learning evidence;
- no session evidence;
- no overlap with itself;
- reduced-motion behavior;
- cleanup after level exit;
- no orphaned RAF;
- no orphaned audio.

### Frame-rate consistency

Verify approximate speed consistency at simulated 30, 60 and 120 fps. Temporary frame drops must not permanently slow the passage.

### Path editor

- default 3-point path;
- drag every point;
- numeric X/Y editing;
- negative coordinates;
- points beyond level bounds;
- add point;
- delete point;
- minimum 2 points;
- reverse path;
- Fit flight path;
- Fit level;
- Draft/Apply/reload persistence;
- path cache invalidation after edits;
- editor controls do not trigger ground clicks.

### Asset discovery

- list files in ambient directory;
- missing directory;
- empty directory;
- supported file classification;
- sorted results;
- refresh assets;
- path traversal rejection;
- normal runtime does not call editor endpoint.

### Self-service add flows

- add ambient animal from discovered assets;
- add flyby from discovered assets;
- unique ID validation;
- duplicate ID rejection;
- non-blocking dimension warning;
- Draft/Apply/reload persistence;
- delete configuration without deleting files.

### Multiple instances

- several animals using same assets;
- several flybys using same assets;
- independent positions;
- independent paths;
- independent settings;
- duplicated instance;
- deleting one does not affect another;
- cached assets reused.

### Synchronization

- exact simultaneous starts;
- delayed starts;
- one scheduler per syncKey;
- no independent scheduling for synchronized members;
- no restart until all members finish;
- shared interval edits;
- removing syncKey restores independent timing;
- identical sound does not stack;
- persistence.

### Ambient-animal regressions

- owl blink;
- raven blink;
- seagull blink;
- first blink has no flash;
- mirror behavior;
- audio behavior;
- event isolation.

### Minnie and Moose

- no failure when blink files are absent;
- automatic blink activation when files are present;
- open → closed → open;
- independent timing;
- no layout movement;
- active speaker styling unchanged;
- purr clicks unchanged;
- cleanup when hidden;
- desktop and iPad.

### Voortgang scrolling

- report longer than viewport;
- scroll to actual bottom;
- mouse wheel;
- touch;
- expanded detail reachable;
- delete action reachable;
- desktop;
- iPad landscape;
- iPad portrait;
- main menu does not gain page scroll;
- gameplay does not gain page scroll;
- overflow restored after closing.

### Editor usability

- editor panel scrolls to all controls;
- collapsible sections;
- touch scrolling;
- path-mode navigation;
- no stage interaction;
- desktop;
- iPad landscape;
- iPad portrait.

---

## 31. Validation commands

Run:

- Node syntax checks;
- `git diff --check`;
- `level-audit.js`;
- `level-report.js`;
- `validate-levels.js`;
- targeted Playwright tests;
- relevant ambient-animal regressions;
- session-report regressions;
- Italy regressions;
- editor regressions;
- desktop and iPad profiles.

Known pre-existing unrelated validation issues may remain, but must be reported clearly and not expanded.

---

## 32. Out of scope

Do not implement:

- separate flock/group object model;
- browser-based file upload;
- deleting source files from the editor;
- stereo panning;
- Doppler effects;
- distance-to-Sven audio;
- complex Bézier handles;
- speed per path segment;
- scale per path segment;
- rotation curves;
- formation templates;
- runtime directory scanning;
- fixed image pixel requirements;
- automatic image resizing or normalization.

---

## 33. Completion requirements

Do not stop after scaffolding.

Complete the feature end-to-end as far as technically possible in this single run.

Do not commit or push.

At the end, report:

- completed scope;
- anything not completed;
- architecture;
- schemas;
- changed files;
- Italy pilot configuration;
- self-service editor workflow;
- preload/cache behavior;
- service-worker behavior;
- Minnie/Moose fallback behavior;
- editor usability changes;
- `Voortgang` scrolling root cause and fix;
- exact tests and results;
- remaining limitations;
- any manual steps still required.
