# Generation Pipeline

This document defines the correct order for creating a SvenAdventure level.

The order matters. Many bugs in adventure levels come from creating data before the image exists, guessing image dimensions, or placing objects in a different coordinate system from the background.

## Required Generation Sequence

### 1. Create Level Concept

Define the adventure idea before generating assets.

The concept should include:

* setting
* player goal
* main mystery or obstacle
* companion role
* educational focus
* reward moment

Example:

```text
Sven enters a Viking forest and opens a rune gate by waking three multiplication runes.
```

Why this comes first:

The concept guides the world image, object placement, path design, and math challenges.

### 2. Generate World Background

Generate one wide background image for the level.

The image should include:

* visible walkable path
* important objects
* clear interaction landmarks
* enough horizontal space for camera movement
* no hidden essential objects behind foreground clutter

Why this comes before level data:

The background image is the world. Every coordinate depends on the final image pixels.

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

Why this is critical:

If the world size is wrong, every hotspot, path node, glow, challenge anchor, and camera position can drift.

### 4. Register Interactive Objects

Create `interactiveObjects` entries for every object Sven can interact with.

For each object, define:

* id
* type
* center pixel coordinate
* radius
* approach node
* label

Example:

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

Why this comes before challenges:

Challenges must attach to real world objects. The object center becomes the shared anchor for click, hover, solved glow, label, and challenge panel.

### 5. Define Walk Graph

Create path nodes and edges that follow the painted path.

Rules:

* nodes use background image pixel coordinates
* nodes should sit on the visible ground
* edges connect walkable segments
* stairs need several nodes
* each interactive object needs a believable approach node

Example:

```js
nodes: [
  { id: "forest-start", x: 170, y: 610 },
  { id: "forest-rune-approach", x: 285, y: 600 }
],
edges: [
  ["forest-start", "forest-rune-approach"]
]
```

Why this follows object registration:

Approach nodes must be placed relative to interactive objects.

### 6. Attach Challenges To Objects

Attach educational content to interactive objects using `objectId`.

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

Why this comes after object registration:

The runtime should never need separate challenge coordinates. Challenge presentation uses the referenced interactive object center.

### 7. Validate Level

Run:

```bash
npm run validate:levels
```

Validation must pass before browser QA.

The validator checks:

* manifest entries
* level scripts
* actual image dimensions
* interactive object structure
* object bounds
* walk graph references
* approach node references
* challenge object references
* local asset paths

Why this comes before Playwright:

Static validation catches content defects quickly and explains them directly.

### 8. Run Playwright Smoke Tests

Run:

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

Why this is still needed:

Validation proves data is structurally valid. Browser tests prove the runtime experience still works.

### 9. Mark Level Playable

A generated level may be marked playable only after:

* level data passes validation
* Playwright smoke tests pass
* human review confirms the adventure makes sense
* Dutch text is appropriate for Sven
* visual alignment is acceptable

## Why This Order Exists

The background image coordinate system is the source of truth.

If a generator writes objects, paths, or challenges before the final image exists, it is guessing. Guessing creates alignment bugs.

Correct order:

```text
image first -> measure image -> place objects -> place paths -> attach challenges -> validate -> test
```

Incorrect order:

```text
invent coordinates -> generate image later -> hope alignment works
```

The incorrect order is not allowed for Adventure Factory output.

