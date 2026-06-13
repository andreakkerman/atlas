# Authoring System

This document describes how to author a SvenAdventure level so it works reliably in the current runtime and remains compatible with the future Adventure Factory.

The authoring system is data-first. The runtime should not need per-level code changes.

## Core Idea

A SvenAdventure level is built from six connected parts:

1. world image
2. interactive objects
3. walk graph
4. challenges
5. companion text
6. completion state

These parts must reference each other through stable ids and shared image-pixel coordinates.

The background image coordinate system is the source of truth.

## 1. World Image

The world image is the playable space.

Current level shape:

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

* Use one wide background image per level.
* Save the image inside the level folder.
* Measure the actual image file dimensions after generation.
* Set `world.width` and `world.height` to the actual image dimensions.
* Do not use prompt dimensions or intended export dimensions.

Why this matters:

Every object, walk node, approach node, challenge anchor, and camera position uses the world image coordinate system. If the dimensions are wrong, the level will drift.

## 2. Interactive Objects

Interactive objects are the primary authored entities in a level.

They define what Sven can interact with in the world.

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

The object center drives:

* click circle
* hover and focus circle
* solved glow
* challenge anchor
* label anchor

No other coordinate should be created for those visuals.

## 3. Walk Graph

The walk graph defines where Sven can move.

Example:

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

Rules:

* Nodes use world image pixel coordinates.
* Nodes should sit on the visible painted ground.
* Edges connect walkable path segments.
* Approach nodes should place Sven near an object, not on top of it.
* Stairs and curved paths need multiple nodes.

The runtime projects free clicks onto this graph and routes Sven through connected nodes.

## 4. Challenges

Challenges are attached to interactive objects.

Example:

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

Rules:

* `objectId` must reference an `interactiveObjects` entry.
* Challenge panels use the object center as their anchor.
* Solved effects use the same object center.
* Challenge text must be Dutch and short.

Do not store separate challenge coordinates.

## 5. Companion Text

The companion gives short guidance.

Example:

```js
companion: {
  name: "Runewachter",
  portrait: "Levels/LVL-0001/assets/viking-spirit.png"
}
```

`spiritLines` provide reusable messages:

```js
spiritLines: {
  welcome: "Welkom, Sven. Volg het pad naar de tempel.",
  moving: "Sven loopt erheen...",
  allRunes: "Alle runen gloeien. De tempel wordt wakker!",
  reward: "Goed gedaan, Sven. Jij hebt de Runenpoort geopend."
}
```

Rules:

* Dutch only.
* Short sentences.
* Clear action guidance.
* No long lore dumps.

## 6. Completion State

The reward defines what happens when the level is complete.

Example:

```js
reward: {
  title: "De poort gaat open!",
  badge: "Bewaker van de Runenpoort",
  line: "Sven reisde door het bos en opende de oude Vikingpoort.",
  art: "Levels/LVL-0001/assets/reward.png"
}
```

Rules:

* Completion should feel like an adventure reward.
* Reward art belongs inside the level folder.
* Completion state writes to `storageKey`.
* Learning progress writes to `progressKey`.

## Relationship Between Parts

The dependencies flow in one direction:

```text
world image
  -> measured world dimensions
  -> interactive object centers
  -> walk graph and approach nodes
  -> hotspots and challenges
  -> completion state
```

If a world image changes, object centers and walk nodes must be reviewed.

If an object center changes, click circle, hover, solved glow, label, and challenge anchor move together automatically.

If an approach node changes, Sven's movement and interaction staging change.

## Authoring Checklist

Before a level is playable:

* world image exists
* dimensions match the actual file
* every interactive object has a center and radius
* every object has an approach node
* walk graph follows visible terrain
* all edges reference valid nodes
* every rune references a valid object
* every hotspot references a valid object
* companion text is short Dutch
* reward exists
* `npm run validate:levels` passes
* `node scripts/level-audit.js` has no surprising warnings
* Playwright smoke tests pass

