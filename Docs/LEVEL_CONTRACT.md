# Level Contract

This document defines the current playable level contract for SvenAdventure.

It describes the runtime-facing format used by `level.js`. The future generated metadata format is defined in `LEVEL_METADATA.md`.

## Core Rule

The background image pixel coordinate system is the single source of truth.

These all use the same coordinates:

* world dimensions
* Sven position
* camera
* interactive object centers
* object radii
* sparse walk path
* approach nodes
* challenge anchors
* solved glows
* debug overlay

Do not mix world pixels with viewport percentages, CSS percentages, screenshot coordinates, cropped-image coordinates, or prompt dimensions.

## Folder Structure

Each level lives in its own folder:

```text
Levels/
  manifest.js
  LVL-0001/
    level.js
    assets/
      level-1-wide-world.png
      ...
```

Level-specific files belong inside the level folder.

Shared runtime files and Sven character assets do not belong inside level folders.

## Manifest Entry

`Levels/manifest.js` lists available levels.

Example:

```js
window.SVEN_LEVEL_MANIFEST = {
  levels: [
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
  ]
};
```

Required manifest fields:

* `id`
* `title`
* `script`
* `menu.illustration`

The `script` path must point to the level definition.

## Level Definition

A level script registers itself on `window.SVEN_LEVEL_DEFINITIONS`.

Example:

```js
window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0001"] = {
  id: "LVL-0001",
  title: "Sven en de Runenpoort",
  description: "Sven opent een Vikingpoort met magische runen."
};
```

Required top-level fields:

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
* `walkPath`
* `intro`
* `spiritName`
* `spiritLines`
* `areas`
* `hotspots`
* `runes`
* `reward`

`walkGraph` may exist at runtime after derivation, but future authored levels should prefer `walkPath`.

## World

The world is defined by one background image.

Required structure:

```js
world: {
  width: 2172,
  height: 724,
  aspectRatio: 3,
  viewportWidth: 1000,
  background: "Levels/LVL-0001/assets/level-1-wide-world.png"
}
```

Rules:

* `world.background` must exist.
* `world.width` must equal the actual image width in pixels.
* `world.height` must equal the actual image height in pixels.
* `aspectRatio` should match `width / height`.
* All world coordinates use this image pixel coordinate system.

Do not use prompt dimensions, intended dimensions, CSS dimensions, or screenshot dimensions as world dimensions.

## interactiveObjects

`interactiveObjects` is the authoritative registry for every object Sven can interact with in the world.

Required structure:

```js
{
  id: "zon",
  type: "rune",
  center: { x: 1384, y: 160 },
  radius: 46,
  approachNode: "sun-rune-approach",
  label: "Zonrune"
}
```

Required fields:

* `id`
* `type`
* `center.x`
* `center.y`
* `radius`
* `approachNode`
* `label`

Rules:

* `id` must be unique.
* `center.x` and `center.y` must be inside world bounds.
* `radius` must be greater than zero.
* `approachNode` must reference a valid walk path point or derived walk graph node.
* The rendered click area must be a true circle.

The object center drives:

* click circle
* hover circle
* focus circle
* solved glow
* challenge anchor
* label anchor

No other coordinate may be introduced for these visuals.

## Object Center Versus Approach Node

Object center and approach node are different concepts.

Object center answers:

```text
Where does this object exist in the artwork?
```

Approach node answers:

```text
Where can Sven believably stand to interact with it?
```

These are often not close together.

Examples:

* A rune high on a temple wall can have a center far above Sven's feet.
* A rune partly hidden by vegetation should keep its true visual center, while the approach node stays on the visible path.
* A gate can have a center on the door symbol, while the approach node sits on a step.

Do not move object centers to fix movement. Fix the approach node or path instead.

## Object Types

Common object types:

* `rune`: challenge-bearing magical object
* `object`: inspectable clue or story object
* `gate`: progression or reward object
* `talk`: character visible inside the world
* `inspect`: optional detail object

Use `talk` objects only when the character is visibly present in the world. If a character exists only as a companion overlay, do not create an in-world object.

## Radius

`radius` controls the circular interaction area in world pixels.

Guidelines:

* small object: `30-45`
* normal rune: `45-70`
* large door or gate: `80-120`

The circle should be large enough for touch but not so large that it covers unrelated art.

All circles must remain true circles across desktop, iPad landscape, and iPad portrait.

## walkPath

`walkPath` is the preferred authored movement source.

It should be sparse and readable. It expresses path intent, not all execution detail.

Example:

```js
walkPath: [
  { id: "forest-start", x: 170, y: 626 },
  { id: "forest-rune-approach", x: 285, y: 628, role: "approach" },
  { id: "center-trail", x: 590, y: 634 },
  { id: "lower-trail", x: 940, y: 628 },
  { id: "trail-rise-2", x: 1151, y: 569 },
  { id: "trail-top", x: 1235, y: 518 },
  { id: "sun-rune-approach", x: 1308, y: 547, role: "approach" }
]
```

Required fields per point:

* `id`
* `x`
* `y`

Optional fields:

* `role`

Rules:

* point ids must be unique
* coordinates must be inside world bounds
* points should sit where Sven's feet belong
* the path should follow visible walkable ground
* curves need enough points to express intent
* stairs need enough points to express elevation changes
* approach points may be part of the path

Bad path data:

* floats above the painted path
* cuts through rocks, plants, walls, or doors
* uses too many execution-detail points
* uses too few points for stairs or sharp elevation changes
* treats object center as Sven's standing position

## Derived walkGraph

The runtime derives a denser `walkGraph` from `walkPath`.

The derived graph supports:

* free click projection
* route calculation
* smooth walking
* debug overlay review

Generated levels should not manually over-author graph detail unless there is a specific runtime need.

## Player

Required structure:

```js
player: {
  start: { x: 210, y: 610 }
}
```

Rules:

* start coordinates must be inside world bounds
* start should sit on or near the walk path
* start should place Sven's feet on believable ground

## Hotspots

Hotspots define non-rune contextual interactions.

Example:

```js
{
  id: "forestRune",
  objectId: "forestRune",
  type: "object",
  name: "Bosrune",
  defaultAction: "look",
  look: "Een oude steen. Hij wijst naar de tempel."
}
```

Required fields:

* `id`
* `objectId`
* `type`
* `name`
* `defaultAction`

Rules:

* `objectId` must reference a valid `interactiveObjects` entry.
* Object placement must not be duplicated on the hotspot.
* The hotspot uses the referenced object's center and approach node.

## Runes And Challenges

Runes are challenge-bearing interactive objects.

Example:

```js
{
  id: "zon",
  objectId: "zon",
  name: "Zonrune",
  shortName: "Zon",
  defaultAction: "activate",
  intro: "De Zonrune voelt warm aan.",
  solved: "Goed zo! De Zonrune gloeit.",
  questions: [
    { a: 3, b: 4 }
  ]
}
```

Required fields:

* `id`
* `objectId`
* `name`
* `defaultAction`
* `intro`
* `solved`
* `questions`

Rules:

* `objectId` must reference a valid `interactiveObjects` entry.
* `interactiveObjects[objectId].type` should be `rune`.
* Each question must include positive numbers `a` and `b`.
* The challenge anchor must use the interactive object's center.
* Solved visuals must use the same interactive object's center.
* No separate challenge or solved coordinates are allowed.

## Companion Text

The companion helps Sven understand what to do.

Required structure:

```js
companion: {
  name: "Runewachter",
  portrait: "Levels/LVL-0001/assets/viking-spirit.png"
}
```

`spiritLines` should include:

* `welcome`
* `moving`
* `allRunes`
* `reward`

Text rules:

* Dutch only
* short sentences
* clear guidance
* suitable for an 8-9 year old child

## Completion State

Required structure:

```js
reward: {
  title: "De poort gaat open!",
  badge: "Bewaker van de Runenpoort",
  line: "Sven reisde door het bos en opende de oude Vikingpoort.",
  art: "Levels/LVL-0001/assets/reward.png"
}
```

Rules:

* reward art must exist
* completion must write to `storageKey`
* multiplication progress must write to `progressKey`
* reward should feel like an adventure outcome, not a score page

## Asset Rules

Level-specific assets must stay inside the level folder.

Examples:

* world background
* level menu illustration
* companion portrait
* reward art
* level-specific puzzle art

Shared Sven assets must stay outside level folders.

Examples:

* `assets/characters/sven/idle-right/frame-01.png`
* `assets/characters/sven/walk-right/frame-01.png`
* `assets/characters/sven/interact-right/frame-01.png`

## Invariants

These rules must always be true:

* actual image dimensions equal declared world dimensions
* all world object coordinates are image pixel coordinates
* no viewport-relative coordinates are stored in level data
* every interactive object has one center and one radius
* click circle, hover circle, solved glow, challenge anchor, and label anchor derive from the same center
* every approach node represents where Sven can stand, not where the object is
* every challenge references a valid interactive object
* every approach node references a valid path point or derived graph node
* every authored walk path point is inside world bounds
* derived graph detail comes from authored sparse path intent
* level assets are local and inside the level folder
* shared Sven assets are not copied into level folders
