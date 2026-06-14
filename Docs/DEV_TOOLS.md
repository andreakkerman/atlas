# Developer Tools

This document describes SvenAdventure's developer-only tooling and quality gates.

These tools are part of the Adventure Factory foundation. Generated levels must be easy for Codex to inspect, tune, validate, audit, and retest.

## Normal Gameplay Safety

Normal gameplay must remain local-first and deterministic.

Developer tools must not expose editing controls to Sven or normal players.

Normal runtime:

* no path editing
* no Apply/Revert buttons
* no draft writes
* no backend requirement
* no cloud dependency

## Developer Tools Overlay

Shortcut:

```text
Ctrl+Shift+D
```

This opens the Developer Tools overlay.

The overlay should show:

* authored walk path points
* path edges
* approach nodes
* interactive object centers
* object radii

This is the quickest way to inspect whether the level data matches the visible world image.

## Runtime Mode

When the game is not opened with `?dev=editor`, the Developer Tools panel is read-only.

It should show:

```text
Developer Tools
Current Mode: Runtime
WalkPath Editing: Unavailable
Status: Read-only mode
```

It should explain how to enter WalkPath Editing mode.

There must be:

* no drag editing
* no Apply button
* no Revert button

## WalkPath Editing Mode

Start the local developer server:

```bash
npm run dev:editor
```

On Windows PowerShell, use this if script execution policy blocks `npm`:

```bash
npm.cmd run dev:editor
```

Open:

```text
http://127.0.0.1:4173/?dev=editor
```

Start the level, then press:

```text
Ctrl+Shift+D
```

The panel should show:

```text
Developer Tools
Current Mode: WalkPath Editing
Draft Status: Clean
```

Available actions:

* drag walkPath points
* test movement
* Apply
* Revert

## Apply And Revert

Dragging a point updates the current draft in the browser.

The real `level.js` file must not be updated on every drag.

`Apply`:

* writes the current draft walkPath into the selected level file
* clears modified state
* updates status to `Applied`

`Revert`:

* discards the draft
* reloads the saved walkPath
* updates status to `Reverted` or `Clean`

## Draft Status Values

Expected statuses:

* `Clean`
* `Modified`
* `Applied`
* `Reverted`
* `Error`

Status must be visible in the Developer Tools panel.

## What To Inspect

Use the overlay to inspect:

* whether object centers sit on visible objects
* whether radii match touch targets without overlapping unrelated art
* whether solved glows will align with object centers
* whether challenge anchors derive from object centers
* whether walkPath points sit where Sven's feet belong
* whether approach nodes are believable standing positions
* whether stairs have enough path intent
* whether hidden objects avoid pulling Sven into plants or rocks

## Quality Gate Commands

Run validation:

```bash
npm run validate:levels
```

Run audit:

```bash
npm run audit:levels
```

Run report:

```bash
npm run report:levels
```

Run browser QA:

```bash
npx playwright test
```

or:

```bash
npm run test:e2e
```

On Windows PowerShell, `npm.ps1` may be blocked by execution policy. Use `npm.cmd`:

```bash
npm.cmd run validate:levels
npm.cmd run audit:levels
npm.cmd run report:levels
```

## Validation

Validation checks structural correctness.

It should catch:

* missing level files
* missing assets
* incorrect world dimensions
* invalid interactive objects
* invalid object bounds
* invalid radii
* missing or invalid approach nodes
* broken path references
* invalid hotspot references
* invalid rune references
* challenge references to missing objects

Validation failures must be fixed before a level can be playable.

## Audit

Audit checks suspicious authoring quality.

It should warn about:

* objects extremely close together
* object radius too large or too small
* approach node far from object center
* very long path edge
* steep sudden y jump
* isolated nodes
* disconnected graph
* unreachable objects
* suspicious path nodes far above or below neighbors

Audit warnings should trigger a Codex repair attempt. If a warning is intentionally acceptable, the reason should be documented near the level data or in future accepted-warning metadata.

## Report

Report summarizes generated levels for quick review.

It should include:

* level id and title
* world image path
* declared dimensions
* actual dimensions
* interactive object count and ids
* walk node count
* edge count
* longest edge
* y-range
* approach nodes
* challenge count
* warnings

## Playwright

Playwright verifies the runtime experience.

Current coverage should include:

* level loads from menu
* fullscreen world appears
* free walk works
* object circles are round and world-aligned
* Developer Tools overlay toggles
* Runtime mode explains WalkPath Editing
* WalkPath Editing mode exposes Apply/Revert only in dev mode
* Sven faces left/right correctly
* rune challenge opens after interaction flow
* wrong answer feedback works
* reward screen appears
* localStorage persistence works

Future generated levels should receive generated smoke tests instead of relying only on LVL-0001-specific tests.

## Known Environment Issues

Observed local issues:

* PowerShell may block `npm.ps1`; use `npm.cmd`.
* `git` may not be available on PATH in some Codex environments.
* Browser tests can be timing-sensitive under full parallel load; tests should assert behavior rather than arbitrary animation timing when possible.

These are developer environment issues, not gameplay requirements.
