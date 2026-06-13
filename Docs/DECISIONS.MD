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

Out of scope for the current runtime:

* backend
* database
* accounts
* cloud services
* runtime AI calls

Reason:

The experience should be deterministic, safe, and easy to run.

## D005 - AI Generates Before Gameplay

AI may assist with level creation, but generated content is stored locally and reviewed before play.

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

No duplicate solved-marker coordinates are allowed.

Reason:

If the rune center changes, every related visual and interaction must move together.

## D010 - Interaction Circles Are True Circles

Interactive object circles use:

* `center: { x, y }`
* `radius`

They must render as true circles on desktop, iPad landscape, and iPad portrait.

Reason:

Oval hit areas are a visible sign that world coordinates are being mixed with responsive CSS sizing.

## D011 - Movement Uses A Data-Driven Walk Graph

Walk path nodes and edges live in level data.

The runtime performs generic routing:

* project free click to nearest walk segment
* route through graph nodes
* move Sven along the route

Reason:

Future generated levels need reusable movement behavior without hardcoded per-level movement logic.

## D012 - Sven Follows The Walk Graph

Sven should stay on the painted path or steps.

Approach nodes should place Sven at believable interaction positions.

Reason:

Floating, walking through rocks, or climbing invisible terrain breaks the adventure illusion.

## D013 - Contextual Interaction Replaces Verb Buttons

The runtime does not show `Kijk`, `Praat`, or `Activeer` command buttons.

The clicked object determines the action.

Reason:

This is simpler for Sven and keeps the world as the primary interface.

## D014 - Move To -> Arrive -> Action

Object interaction follows:

1. click/tap object
2. Sven walks to the approach node
3. Sven faces the object
4. Sven performs an action animation
5. the result happens

Reason:

This makes Sven feel like an actor in the world.

## D015 - Shared Assets Stay Global

Shared Sven character assets stay outside level folders.

Current shared asset area:

* `assets/characters/sven/`
* `assets/sven.png`
* `assets/sven-stage.png`

Reason:

Sven is reusable across adventures.

## D016 - Level Assets Stay Inside Level Folders

Level-specific assets stay inside the owning level folder.

Example:

* `Levels/LVL-0001/assets/level-1-wide-world.png`
* `Levels/LVL-0001/assets/viking-spirit.png`
* `Levels/LVL-0001/assets/reward.png`

Reason:

Generated levels should be portable, reviewable, and removable as discrete artifacts.

## D017 - Levels Are Registered Through The Manifest

Available levels are listed in `Levels/manifest.js`.

Reason:

The main menu should discover levels without hardcoding level scripts in `index.html`.

## D018 - Validate Before Play

Every level must pass validation before it is considered playable.

Validation must catch:

* missing level files
* incorrect world dimensions
* invalid interactive objects
* broken walk graph references
* invalid approach nodes
* missing assets
* invalid challenge/object references

Reason:

Generated levels must work correctly on the first attempt as often as possible.

## D019 - Browser QA Remains Required

Playwright smoke tests are required for runtime confidence.

Reason:

Static validation catches invalid data. Browser QA catches flow, interaction, persistence, and layout regressions.

