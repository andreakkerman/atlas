# SvenAdventure Decisions

This document records product and architecture decisions that future implementation and generation work must respect.

## D001 - Sven Is The Player Character

Sven is the protagonist.

Reason:

Personalization is central to engagement. Sven should feel that the adventure was made for him.

## D002 - Adventure First

The game should feel like a modern child-friendly adventure game inspired by classic point-and-click adventures.

Reason:

Exploration, mystery, movement, characters, and puzzles create motivation. Multiplication practice works best when it supports that motivation.

## D003 - Dutch Player-Facing Text

All dialogue, buttons, hints, feedback, and explanations must be Dutch.

Reason:

Sven does not read English fluently. Text must be short and suitable for a Dutch child of about 8-9 years old.

## D004 - Runtime Is Local-First

The game runs locally in the browser.

Current stack:

* HTML
* CSS
* JavaScript
* local assets
* localStorage

Out of scope for normal gameplay:

* backend
* database
* accounts
* cloud services
* runtime AI calls

Reason:

The experience should be deterministic, safe, and easy to run.

## D005 - AI Generates Before Gameplay

AI may assist with level creation, but generated content is stored locally, validated, audited, tested, and approved before play.

Reason:

Sven should never receive unreviewed runtime-generated content.

## D006 - One Wide Background Image Per Level

Each level uses one horizontally wide background image as the playable world.

Reason:

A single world image makes camera movement, object placement, pathing, and validation easier to reason about.

## D007 - Actual Image Dimensions Are World Dimensions

The actual pixel dimensions of the background image are the level's world dimensions.

Dimensions must be measured from the image file. They must never be assumed from a prompt, design target, or previous level.

Reason:

LVL-0001 exposed a major alignment risk: the level once assumed `3000x1000`, while the real image was `2172x724`. That caused object, path, and camera alignment drift.

## D008 - One Coordinate System

The background image pixel coordinate system is the single source of truth for:

* interactive object coordinates
* walk path coordinates
* approach nodes
* solved glow coordinates
* challenge anchor coordinates
* camera coordinates

World objects must not be stored in viewport percentages, CSS percentages, cropped-image coordinates, or screen coordinates.

Reason:

Duplicate coordinate systems cause subtle alignment bugs that are hard to fix later.

## D009 - interactiveObjects Registry Is Authoritative

Every interactive world object must be registered in `interactiveObjects`.

The object center drives:

* click circle
* hover/focus circle
* solved glow
* challenge anchor
* label anchor

No duplicate solved-marker or challenge-anchor coordinates are allowed.

Reason:

If the object center changes, every related visual and interaction must move together.

## D010 - Interaction Circles Are True Circles

Interactive object circles use:

* `center: { x, y }`
* `radius`

They must render as true circles on desktop, iPad landscape, and iPad portrait.

Reason:

Oval hit areas are a visible sign that world coordinates are being mixed with responsive CSS sizing.

## D011 - Object Center And Approach Node Are Different Concepts

Object center means where the object exists in the artwork.

Approach node means where Sven can believably stand before interacting.

Reason:

Some objects are high on a wall, hidden in vegetation, or embedded in a gate. Sven should not walk to the visual center of those objects.

## D012 - Authored Movement Uses Sparse walkPath

The preferred authored movement source is a sparse `walkPath`.

The path should express intent:

* main route
* meaningful turns
* elevation changes
* steps
* approach points

It should not contain excessive execution-detail points.

Reason:

Sparse paths are easier for Codex to generate, audit, tune, and reason about.

## D013 - Runtime Derives Movement Detail

The runtime derives a denser `walkGraph` from `walkPath`.

Runtime routing:

* projects free clicks to valid path segments
* routes through graph nodes
* moves Sven along the route

Reason:

Generated levels should author simple intent while the runtime handles execution detail.

## D014 - Sven Follows The Visible Ground

Sven's feet should stay on the painted path or steps.

Approach nodes should place Sven at believable interaction positions.

Reason:

Floating, walking through plants, or cutting across rocks breaks the adventure illusion.

## D015 - Contextual Interaction Replaces Verb Buttons

The runtime does not show `Kijk`, `Praat`, or `Activeer` command buttons.

The clicked object determines the action.

Reason:

This is simpler for Sven and keeps the world as the primary interface.

## D016 - Move To -> Arrive -> Action

Object interaction follows:

1. click/tap object
2. Sven walks to the approach node
3. Sven settles and faces the object
4. Sven performs an action animation
5. the result happens

Reason:

This makes Sven feel like an actor in the world.

## D017 - Shared Assets Stay Global

Shared Sven character assets stay outside level folders.

Current shared asset area:

* `assets/characters/sven/`
* `assets/sven.png`
* `assets/sven-stage.png`

Reason:

Sven is reusable across adventures.

## D018 - Level Assets Stay Inside Level Folders

Level-specific assets stay inside the owning level folder.

Example:

* `Levels/LVL-0001/assets/level-1-wide-world.png`
* `Levels/LVL-0001/assets/viking-spirit.png`
* `Levels/LVL-0001/assets/reward.png`

Reason:

Generated levels should be portable, reviewable, and removable as discrete artifacts.

## D019 - Levels Are Registered Through The Manifest

Available levels are listed in `Levels/manifest.js`.

Reason:

The main menu should discover levels without hardcoding level scripts in `index.html`.

## D020 - Validate Before Play

Every level must pass validation before it is considered playable.

Validation must catch:

* missing level files
* incorrect world dimensions
* invalid interactive objects
* broken path references
* invalid approach nodes
* missing assets
* invalid challenge/object references

Reason:

Generated levels must work correctly on the first attempt as often as possible.

## D021 - Audit And Report Are Required Gates

Every generated or changed level should run audit and report scripts.

The audit catches suspicious-but-structurally-valid data. The report gives a quick human-readable summary.

Reason:

Validation proves correctness. Audit and report support quality review and Codex repair loops.

## D022 - Browser QA Remains Required

Playwright smoke tests are required for runtime confidence.

Reason:

Static validation catches invalid data. Browser QA catches flow, interaction, persistence, and layout regressions.

## D023 - Debug Overlay Is Required Developer Infrastructure

The runtime includes a developer overlay toggled with `Ctrl+Shift+D`.

It shows:

* authored walk path points
* derived/reviewable path edges
* approach nodes
* interactive object centers
* object radii

Reason:

Generated levels cannot be trusted without fast visual inspection tools.

## D024 - WalkPath Tuning Is Developer-Only

WalkPath editing is available only through the local developer workflow:

```text
npm run dev:walkpath
http://127.0.0.1:4173/?dev=walkpath
Ctrl+Shift+D
```

The real level file changes only when `Apply` is pressed.

Reason:

Path tuning must be safe and reversible. Normal gameplay must never expose editing controls.

## D025 - New Background Image Means New Level Area

A connected area such as `Temple Inside` should be a separate level package with its own world image, metadata, walkPath, interactiveObjects, challenges, and start position.

Example:

```text
LVL-0001: Forest + temple exterior
LVL-0002: Temple inside
```

The connection between areas is progression/navigation, not shared world coordinates.

Fade out/in transitions are acceptable between separate level areas.

Reason:

Each background image has its own pixel coordinate system. Keeping areas separate avoids mixing coordinates and makes generated areas easier to validate, audit, tune, and test.
