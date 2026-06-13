# SvenAdventure Current-State Handoff Package

Date: 2026-06-13

Audience: ChatGPT or a future coding/design agent taking over SvenAdventure.

## Quick Summary

SvenAdventure is a local-first browser adventure game for Sven, an 8-year-old Dutch child. The current playable level is `LVL-0001`, "Sven en de Runenpoort".

The game is adventure-first and learning-second. Multiplication practice is embedded into a world interaction: Sven travels through a Viking forest, reaches a temple, activates rune objects, answers multiplication questions, opens the Runenpoort, and receives a reward.

Current status:

* One playable level.
* Plain HTML/CSS/JavaScript.
* No backend, database, accounts, cloud services, React, Phaser, or runtime AI.
* Level-specific content lives in `Levels/LVL-0001`.
* Shared Sven character assets live in global `assets/`.
* Level generation foundations now exist: docs, validation, report, and audit scripts.
* Latest QA: `18 passed` Playwright tests.

## Current Architecture Summary

### Runtime

Entry point:

* `index.html`
* loads `Levels/manifest.js`
* loads `src/app.js`

The runtime:

* displays a main menu from `Levels/manifest.js`
* lazy-loads a selected level script
* renders the level detail screen
* starts the fullscreen adventure scene
* handles click-to-walk, object interactions, rune challenges, reward, and localStorage progress

### Level Loading

`Levels/manifest.js` lists available levels.

Each level script registers itself:

```js
window.SVEN_LEVEL_DEFINITIONS["LVL-0001"] = { ... };
```

The app loads the selected level script and then creates level state from the level definition.

### World Model

The background image pixel coordinate system is the single source of truth.

For `LVL-0001`:

* world image: `Levels/LVL-0001/assets/level-1-wide-world.png`
* actual dimensions: `2172x724`
* declared dimensions: `2172x724`

World coordinates drive:

* camera
* Sven position
* walk graph
* approach nodes
* interactive object centers
* click circles
* hover/focus circles
* solved glows
* challenge anchors

### Interaction Model

There are no `Kijk`, `Praat`, or `Activeer` command buttons.

Interaction is contextual:

* click walkable ground -> Sven walks there
* click a rune -> Sven walks to its approach node, interacts, challenge opens
* click a gate -> Sven walks to the gate approach node and tries to open it
* click an inspectable object -> Sven walks to it and looks

Flow:

```text
click object -> route to approach node -> arrive -> face object -> interact -> result
```

### Movement Model

Movement uses a level-authored walk graph:

* `walkGraph.nodes`
* `walkGraph.edges`
* `interactiveObjects[].approachNode`

Free clicks project to the nearest valid walk graph segment. Sven routes through the graph. There is no A* library or physics engine.

### Actor System

Sven uses global sprite assets:

* `assets/characters/sven/idle-right/`
* `assets/characters/sven/walk-right/`
* `assets/characters/sven/interact-right/`

Runtime animation uses `requestAnimationFrame`.

States:

* `idle`
* `walk`
* `interact`

Facing is handled by CSS horizontal flip.

## Latest Version History From v0.7 Onward

### v0.7 Runtime Correctness Pass

Main objective: make the coordinate system coherent.

Changes:

* Hotspots, solved glows, path nodes, camera, and Sven position were aligned around world coordinates.
* Added explicit temple stair walk nodes.
* Added approach-node routing.
* Added a small in-level `Menu` return button.
* Fixed moonwalking by updating actor facing during movement.
* Added stronger Playwright coverage for:
  * coordinate alignment
  * free click projection
  * stair movement
  * camera reversal
  * facing left/right
  * return-to-menu
  * reward and persistence

Outcome:

* Playwright passed: `18 passed`.

### v0.7.1 Pixel-Accurate Object Alignment

Main objective: fix object alignment once and for all.

Critical discovery:

* The background image was actually `2172x724`.
* Earlier world data assumed `3000x1000`.
* That mismatch caused persistent alignment drift.

Changes:

* Updated `world.width` and `world.height` to `2172x724`.
* Added authoritative `interactiveObjects`.
* Tuned centers/radii for:
  * `forestRune`
  * `zon`
  * `steen`
  * `wind`
  * `templeGate`
* Added shared `worldToScreen()` conversion.
* Click circle, hover/focus circle, solved glow, and challenge anchor now derive from the same object center.
* Simplified menu flow:
  * main menu tile -> level detail -> `Start avontuur` -> immediately start level
* Retuned walk graph to real image pixels.

Outcome:

* Playwright passed: `18 passed`.
* Manual screenshots captured for object alignment.

### v0.8 Architecture, Documentation, Validation

Main objective: turn lessons learned into explicit project rules.

Changes:

* Updated:
  * `docs/VISION.md`
  * `docs/DECISIONS.md`
* Added:
  * `docs/LEVEL_CONTRACT.md`
  * `docs/GENERATION_PIPELINE.md`
* Added validator:
  * `scripts/validate-levels.js`
* Added package script:
  * `npm run validate:levels`
* Added `description` and explicit `objectId` references to LVL-0001.

Validator checks:

* manifest structure
* level script loading
* image dimensions vs declared world dimensions
* interactive object structure
* object bounds
* radius validity
* walk graph node/edge references
* approach node references
* hotspot/rune object references
* level asset locality

Outcome:

* `npm.cmd run validate:levels`: passed
* Playwright passed: `18 passed`

### v0.9 Adventure Factory Authoring System

Main objective: document and support future level authoring.

Changes:

* Added:
  * `docs/AUTHORING_SYSTEM.md`
  * `docs/INTERACTIVE_OBJECT_GUIDE.md`
  * `docs/WALK_GRAPH_GUIDE.md`
  * `docs/FUTURE_LEVEL_GENERATION.md`
* Added:
  * `scripts/level-utils.js`
  * `scripts/level-report.js`
  * `scripts/level-audit.js`
* Added package scripts:
  * `npm run report:levels`
  * `npm run audit:levels`

Report output summarizes:

* world image and dimensions
* interactive object counts, ids, types
* walk graph node/edge counts
* challenge counts
* warnings

Audit output warns about:

* close objects
* unusual object radii
* isolated or disconnected walk graph nodes
* unreachable approach nodes
* challenge objects with no approach node

Outcome:

* `npm.cmd run report:levels`: passed
* `npm.cmd run audit:levels`: passed with 1 warning
* `npm.cmd run validate:levels`: passed
* Playwright passed: `18 passed`

## Current Runtime Flow

1. Browser opens `index.html`.
2. `Levels/manifest.js` loads level catalog.
3. `src/app.js` renders main menu.
4. Player selects "Sven en de Runenpoort".
5. Runtime lazy-loads `Levels/LVL-0001/level.js`.
6. Level detail screen appears.
7. Player taps `Start avontuur`.
8. Fullscreen world scene starts.
9. Player taps ground or objects.
10. Runtime projects walk clicks to the walk graph.
11. Sven walks with camera follow.
12. Object click routes Sven to the object's `approachNode`.
13. Sven arrives, faces object, plays interaction animation.
14. Rune challenge appears anchored to the rune object's center.
15. Player answers multiplication questions.
16. Correct answers activate rune visuals.
17. After all runes are solved, gate reward can open.
18. Reward screen stores completion and progress in localStorage.

## Level Contract Summary

Required level fields:

* `id`
* `title`
* `description`
* `storageKey`
* `progressKey`
* `menu`
* `companion`
* `world`
* `challengeArt`
* `player`
* `interactiveObjects`
* `walkGraph`
* `intro`
* `spiritName`
* `spiritLines`
* `areas`
* `hotspots`
* `runes`
* `reward`

Core invariants:

* Actual image dimensions equal `world.width` and `world.height`.
* All world coordinates are background image pixel coordinates.
* `interactiveObjects` is authoritative for world objects.
* Object center drives click, hover, solved glow, label, and challenge anchor.
* No duplicate solved/challenge coordinates.
* Walk graph nodes live in level data.
* Edges reference valid nodes.
* Every `approachNode` references a valid walk graph node.
* Runes and hotspots reference objects through `objectId`.
* Shared Sven assets stay global.
* Level-specific assets stay inside level folders.

## Key Data Structures

### Manifest Entry

```js
{
  id: "LVL-0001",
  title: "Sven en de Runenpoort",
  subtitle: "Een Vikingtempel vol runen en keersommen.",
  script: "Levels/LVL-0001/level.js",
  menu: {
    illustration: "Levels/LVL-0001/assets/level-1-wide-world.png",
    badge: "Eerste avontuur",
    detail: "Bos, tempel en drie magische runen"
  }
}
```

### World

```js
world: {
  width: 2172,
  height: 724,
  aspectRatio: 3,
  viewportWidth: 1000,
  background: "Levels/LVL-0001/assets/level-1-wide-world.png"
}
```

### Interactive Object

```js
{
  id: "zon",
  type: "rune",
  center: { x: 1384, y: 172 },
  radius: 46,
  approachNode: "sun-rune-approach",
  label: "Zonrune"
}
```

### Walk Graph

```js
walkGraph: {
  nodes: [
    { id: "forest-start", x: 170, y: 610 }
  ],
  edges: [
    ["forest-start", "forest-rune-approach"]
  ]
}
```

### Rune Challenge

```js
{
  id: "zon",
  objectId: "zon",
  name: "Zonrune",
  defaultAction: "activate",
  intro: "De Zonrune voelt warm aan.",
  solved: "Goed zo! De Zonrune gloeit.",
  questions: [
    { a: 3, b: 4 }
  ]
}
```

## File Tree

Important current project tree:

```text
SvenAdventure/
  index.html
  package.json
  playwright.config.js
  assets/
    sven.png
    sven-stage.png
    characters/
      sven/
        idle-right/
        walk-right/
        interact-right/
  docs/
    AUTHORING_SYSTEM.md
    DECISIONS.md
    FUTURE_LEVEL_GENERATION.md
    GENERATION_PIPELINE.md
    INTERACTIVE_OBJECT_GUIDE.md
    LEVEL_CONTRACT.md
    VISION.md
    WALK_GRAPH_GUIDE.md
  Levels/
    manifest.js
    LVL-0001/
      level.js
      assets/
        level-1-wide-world.png
        reward.png
        rune-stones.png
        viking-spirit.png
        forest-path.png
        temple-gate.png
        viking-temple.png
  scripts/
    level-audit.js
    level-report.js
    level-utils.js
    validate-levels.js
  src/
    app.js
    styles.css
  tests/
    runenpoort.spec.js
  qa-screenshots/
    many historical QA screenshots
```

## QA Outcomes

Latest commands run on 2026-06-13:

```text
npm.cmd run validate:levels
```

Result:

```text
Level validation passed for 1 level(s).
```

```text
npm.cmd run report:levels
```

Result:

```text
Level: LVL-0001
Title: Sven en de Runenpoort

World:
* image: Levels/LVL-0001/assets/level-1-wide-world.png
* declared dimensions: 2172x724
* actual dimensions: 2172x724 (png)

Interactive Objects:
* count: 5
* ids: forestRune, zon, steen, wind, templeGate
* types: object=1, rune=3, gate=1

Walk Graph:
* node count: 17
* edge count: 16

Challenges:
* rune count: 3
* question count: 12

Warnings:
* none

Reported 1 level.
```

```text
npm.cmd run audit:levels
```

Result:

```text
Level Audit

Warnings: 1
* [LVL-0001] objects "steen" and "templeGate" are extremely close (0px apart).
```

This warning is expected: the stone rune and gate share the same visible door symbol center.

```text
npx.cmd playwright test
```

Result:

```text
18 passed
```

Covered:

* desktop Chromium
* iPad landscape
* iPad portrait
* menu loading
* level start
* interactive object registry
* round world-aligned circles
* actor animation
* free click movement
* facing left/right
* object interaction flow
* rune challenge flow
* wrong-answer retry
* full reward completion
* localStorage persistence
* return-to-menu

## Known Limitations

* Only one level exists.
* No visual editor exists for placing object centers, radii, walk nodes, or edges.
* `interactiveObjects` are manually tuned.
* Walk graph quality still requires human visual review.
* Audit detects suspicious data, but not true visual correctness.
* Generated levels do not yet get generated Playwright tests.
* Dutch text quality is not automatically validated.
* Learning model is simple and localStorage-based.
* No inventory, dialog trees, or multiple scene interiors yet.
* Adventure Factory is documented but not implemented.
* The audit warning for `steen` and `templeGate` needs either an accepted-warning mechanism or authoring metadata for intentional overlaps.

## Next-Step Candidates

Highest-value next steps:

1. Build a simple visual level authoring tool.
   * Load world image.
   * Click to place `interactiveObjects`.
   * Drag radius.
   * Place walk nodes.
   * Connect edges.
   * Export `level.js` data.

2. Add accepted audit warning metadata.
   * Example: allow `steen` and `templeGate` to intentionally share a center.

3. Parameterize Playwright smoke tests for future levels.
   * Start selected level.
   * Walk to first object.
   * Open first challenge.
   * Complete level with generated answers.

4. Add language/readability checks.
   * Dutch-only text.
   * max sentence length.
   * missing text fields.

5. Split reusable level loading logic.
   * Runtime currently loads levels directly.
   * Scripts have their own loader in `scripts/level-utils.js`.
   * Future cleanup could share schema concepts, not runtime code.

6. Add JSON Schema or TypeScript definitions for level data.

7. Create an Adventure Factory dry-run command.
   * generate package skeleton
   * validate
   * audit
   * report
   * optionally create smoke test draft

## Full Contents Of Key Files

The requested key files are included as exact snapshots in:

```text
handoff/key-files/
  Levels/
    manifest.js
    LVL-0001/
      level.js
  src/
    app.js
  tests/
    runenpoort.spec.js
  scripts/
    validate-levels.js
    level-audit.js
```

Files included:

* `handoff/key-files/Levels/manifest.js`
* `handoff/key-files/Levels/LVL-0001/level.js`
* `handoff/key-files/src/app.js`
* `handoff/key-files/tests/runenpoort.spec.js`
* `handoff/key-files/scripts/validate-levels.js`
* `handoff/key-files/scripts/level-audit.js`

Use those files when a receiving ChatGPT session needs the complete current source contents.

