# Generation Pipeline

This document defines the Codex-first workflow for creating future SvenAdventure levels.

The pipeline exists to prevent the problems learned from LVL-0001:

* incorrect world dimensions
* hotspot misalignment
* solved-marker misalignment
* duplicated coordinate systems
* over-authored path data
* broken approach positions
* runtime fixes for content-data problems

## Principle

Codex should generate, validate, audit, fix, and retest as much as possible.

Human approval is the final gate before Sven plays a level or before a level becomes a publish candidate. Human approval should not mean manual object placement, manual path authoring, or manual bug chasing unless the tooling cannot solve the problem yet.

## Required Workflow

### Optional Preproduction: Generate Mockups

Before committing to a generated level or connected area, Codex may create several visual mockups.

Mockups can explore:

* a new adventure level
* a connected area such as `Temple Inside`
* an extension path for an existing adventure
* different visual moods or compositions

Mockups are not playable levels. They should not be added to `Levels/manifest.js`, validation, audit, report, or Playwright until one is approved for promotion.

Use `PREPRODUCTION.md` for mockup folder structure and approval rules.

### 1. Generate Level Concept

Codex creates:

* setting
* adventure goal
* main obstacle
* companion role
* educational focus
* reward moment

Example:

```text
Sven enters a Viking forest and opens a rune gate by waking three multiplication runes.
```

The goal must be concrete and adventurous, not abstract scoring.

Good:

* open the gate
* repair the ship
* unlock the map
* wake the ancient machine

Bad:

* earn points
* finish quiz
* complete worksheet

### 2. Generate World Image

Generate one wide background image for the level.

The image should include:

* visible walkable path
* important objects
* clear interaction landmarks
* enough horizontal space for camera movement
* no hidden essential objects behind foreground clutter

The image is the world. Do not create final coordinate data before the final image exists.

### 3. Measure Actual Image Dimensions

Read the actual pixel dimensions from the saved image file.

Do not trust:

* prompt dimensions
* intended dimensions
* design notes
* old level dimensions
* screenshot dimensions

Example:

```text
Actual image size: 2172 x 724
world.width = 2172
world.height = 724
```

If this step is wrong, every object, path node, glow, challenge anchor, and camera position can drift.

### 4. Generate World Metadata

Create the source metadata described in `LEVEL_METADATA.md`.

The target model is:

```text
world.png
+
world-metadata.json
```

Metadata should contain the generated source data. Runtime execution details should be derived.

### 5. Define interactiveObjects

Create `interactiveObjects` entries for every object Sven can interact with.

For each object, define:

* id
* type
* center pixel coordinate
* radius
* approach node
* label

The object center becomes the shared anchor for click, hover, focus, solved glow, label, and challenge panel.

Do not create separate solved or challenge coordinates.

### 6. Define Sparse walkPath

Create a sparse `walkPath` that follows the visible painted path.

The path should include:

* main route
* meaningful turns
* elevation changes
* steps
* approach positions

The path should not include excessive near-duplicate execution points.

Sven's feet are the reference point, not his body center.

### 7. Define Approach Nodes

Approach nodes place Sven where he can believably stand before an action.

Rules:

* approach nodes must be on walkable ground
* approach nodes may be far from object centers
* approach nodes should not enter plants, rocks, or walls
* object centers should not be moved to fix approach problems

### 8. Derive Runtime Graph

Derive `walkGraph` from sparse `walkPath`.

The derived graph handles:

* denser movement detail
* free click projection
* routing
* debug overlay review

If movement looks wrong, fix the source `walkPath` or approach node. Do not compensate with unrelated runtime code.

### 9. Attach Challenges To Objects

Attach educational content to objects using `objectId`.

Example:

```js
{
  id: "zon",
  objectId: "zon",
  name: "Zonrune",
  questions: [
    { a: 3, b: 4 }
  ]
}
```

Challenge presentation uses the referenced interactive object center.

### 10. Validate

Run:

```bash
npm run validate:levels
```

On Windows PowerShell, use this if script execution policy blocks `npm`:

```bash
npm.cmd run validate:levels
```

Validation must pass before browser QA.

### 11. Audit

Run:

```bash
npm run audit:levels
```

Audit warnings are not automatically fatal, but Codex should treat them as repair prompts.

Examples:

* objects extremely close together
* object radius suspiciously large or small
* approach node far from object center
* long graph edge
* steep sudden y jumps
* isolated or disconnected path nodes
* unreachable objects

### 12. Report

Run:

```bash
npm run report:levels
```

The report should help Codex and the human approver quickly understand:

* world dimensions
* object count
* path size
* longest edge
* y-range
* challenge count
* warnings

### 13. Browser Test

Run:

```bash
npx playwright test
```

or:

```bash
npm run test:e2e
```

Smoke tests should verify:

* the level appears in the menu
* the level starts
* Sven walks
* object circles are round
* object anchors align
* a challenge can be completed
* reward screen appears
* progress persists

Future generated levels should receive generated smoke tests.

### 14. Use Debug Overlay And WalkPath Tuning If Needed

Use the developer tools described in `DEV_TOOLS.md`.

Debug overlay:

```text
Ctrl+Shift+D
```

WalkPath tuning:

```text
npm run dev:editor
http://127.0.0.1:4173/?dev=editor
Ctrl+Shift+D
```

Codex should tune source path/object data and rerun gates.

### 15. Re-run Gates

After fixes, rerun:

```bash
npm run validate:levels
npm run audit:levels
npm run report:levels
npx playwright test
```

The level is not ready while any required gate fails.

### 16. Human Approval Gate

Human approval happens after Codex has already generated, validated, audited, fixed, and retested the level.

The human approver checks:

* adventure appeal
* visual charm
* Dutch tone
* child appropriateness
* whether Sven would understand what to do
* whether the level is good enough for Sven to play

### 17. Publish Candidate

A level can become a publish candidate only after:

* validation passes
* audit has no unresolved serious warnings
* report looks sensible
* Playwright passes
* debug overlay issues are fixed or accepted
* human approval is given

## Repair Loop

The normal loop is:

```text
generate -> validate -> audit -> report -> browser test -> fix -> rerun gates -> approval
```

Do not skip directly from generation to human approval.

Do not ask the human to manually place objects or paths when Codex can inspect, adjust, and retest the data.

## Incorrect Workflow

Do not do this:

```text
invent coordinates -> generate image later -> hope alignment works
```

Do not do this:

```text
generate level -> ask human to find all broken coordinates -> patch visually by guessing
```

The correct order is:

```text
image first -> measure image -> generate metadata -> validate -> audit -> test -> fix -> approve
```
