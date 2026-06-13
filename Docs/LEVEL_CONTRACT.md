# Level Contract

This document defines what a valid SvenAdventure level must contain.

The contract is written for future generated levels. A level that satisfies this document should load through the menu, render correctly, allow Sven to walk and interact, and be testable by the validator and Playwright smoke tests.

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
  description: "Sven opent een Vikingpoort met magische runen.",
  // ...
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
* `walkGraph`
* `intro`
* `spiritName`
* `spiritLines`
* `areas`
* `hotspots`
* `runes`
* `reward`

## World

The world is defined by one background image.

Required fields:

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
  center: { x: 1384, y: 172 },
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
* `approachNode` must reference a valid walk graph node.
* The rendered click area must be a true circle.

The object center drives:

* click circle
* hover/focus circle
* solved glow
* challenge anchor
* label anchor

No other coordinate may be introduced for these visuals.

## Walk Graph

The walk graph defines where Sven can walk.

Required structure:

```js
walkGraph: {
  nodes: [
    { id: "forest-start", x: 170, y: 610 },
    { id: "forest-rune-approach", x: 285, y: 600 }
  ],
  edges: [
    ["forest-start", "forest-rune-approach"]
  ]
}
```

Required node fields:

* `id`
* `x`
* `y`

Required edge structure:

* two node ids: `[fromId, toId]`

Rules:

* node ids must be unique.
* node coordinates must be inside world bounds.
* every edge must reference existing nodes.
* every `interactiveObjects[].approachNode` must reference an existing node.
* path nodes should follow the visible painted ground path.
* stairs require multiple nodes so Sven appears to climb.

## Player

Required structure:

```js
player: {
  start: { x: 210, y: 610 }
}
```

Rules:

* start coordinates must be inside world bounds.
* start should sit on or near the walk graph.

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
* object placement must not be duplicated on the hotspot.
* if an object should open the reward, it must reference the correct gate object.

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
* each question must include positive numbers `a` and `b`.
* the challenge anchor must use the interactive object's center.
* solved visuals must use the same interactive object's center.

## Companion Text

The companion helps Sven understand what to do.

Required fields:

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

* Dutch only.
* Short sentences.
* Suitable for an 8-9 year old child.

## Completion State

Required fields:

```js
reward: {
  title: "De poort gaat open!",
  badge: "Bewaker van de Runenpoort",
  line: "Sven reisde door het bos en opende de oude Vikingpoort.",
  art: "Levels/LVL-0001/assets/reward.png"
}
```

Rules:

* reward art must exist.
* completion must write to `storageKey`.
* multiplication progress must write to `progressKey`.

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
* every challenge references a valid interactive object
* every approach node references a valid walk graph node
* all walk graph edges reference valid nodes
* level assets are local and inside the level folder
* shared Sven assets are not copied into level folders

