# Level Metadata

This document defines the target source format for future Adventure Factory generated levels.

Current playable levels use `level.js`. Future generated levels should be created from:

```text
world.png
+
world-metadata.json
```

The metadata is the authoring source. `level.js` is the current runtime format.

## Why This Exists

Editing `level.js` directly worked for LVL-0001, but it is not the right long-term authoring model.

Future generated levels need a simpler source of truth that Codex can generate, validate, audit, fix, and transform into the playable runtime format.

The metadata model should make it clear which data is generated directly and which data is derived automatically.

## Source Artifacts

A generated level should start with:

```text
Levels/
  LVL-0002/
    world.png
    world-metadata.json
    assets/
      reward.png
      companion.png
```

The exact folder shape may evolve, but the conceptual source artifacts should remain:

* one world image
* one metadata file
* level-specific assets

## Generated Directly

Codex should generate these directly:

* level concept
* story goal
* world image
* measured world dimensions
* interactive objects
* object centers
* object radii
* sparse walk path
* approach nodes
* hotspots
* rune/challenge references
* Dutch companion text
* reward state

## Derived Automatically

The tooling/runtime should derive these automatically:

* `walkGraph`
* routing details
* click circles
* hover/focus circles
* solved glows
* challenge anchors
* label anchors
* camera coordinates
* debug overlay positions
* report summaries

Do not duplicate derived coordinates in metadata.

## Example Metadata

Example shape:

```json
{
  "id": "LVL-0001",
  "title": "Sven en de Runenpoort",
  "description": "Sven reist door een oud bos naar een Vikingtempel.",
  "world": {
    "image": "world.png",
    "width": 2172,
    "height": 724
  },
  "interactiveObjects": [
    {
      "id": "zon",
      "type": "rune",
      "center": { "x": 1384, "y": 160 },
      "radius": 46,
      "approachNode": "sun-rune-approach",
      "label": "Zonrune"
    }
  ],
  "walkPath": [
    { "id": "forest-start", "x": 170, "y": 626 },
    { "id": "center-trail", "x": 590, "y": 634 },
    { "id": "sun-rune-approach", "x": 1308, "y": 547, "role": "approach" }
  ],
  "hotspots": [],
  "runes": [
    {
      "id": "zon",
      "objectId": "zon",
      "name": "Zonrune",
      "questions": [
        { "a": 3, "b": 4 }
      ]
    }
  ],
  "reward": {
    "title": "De poort gaat open!",
    "badge": "Bewaker van de Runenpoort",
    "line": "Sven opende de oude poort.",
    "art": "assets/reward.png"
  }
}
```

This example is illustrative. `LEVEL_CONTRACT.md` owns the current runtime field requirements.

## World Image Rules

The world image must:

* be the actual playable world
* be wide enough for horizontal camera movement
* include visible walkable terrain
* include visible interactive objects
* avoid hiding essential objects behind foreground clutter
* have measured dimensions stored in metadata

Never use prompt dimensions as metadata dimensions. Measure the saved image file.

## Interactive Object Metadata

Interactive objects are primary metadata entities.

Each object should include:

* `id`
* `type`
* `center`
* `radius`
* `approachNode`
* `label`

The center is the visual center of the object in `world.png`.

The radius is the touch/click interaction area in world pixels.

The approach node is where Sven stands before acting.

## Object Center Is Not Approach Node

This distinction is non-negotiable.

Object center:

* anchors the visible object
* drives click/hover/focus/glow/challenge/label placement
* may be high on a wall, behind plants, or inside a door

Approach node:

* sits on walkable ground
* places Sven's feet believably
* may be far from the object center
* should not move just to make a radius warning disappear

Example:

The wind rune in LVL-0001 is partly hidden by vegetation. The object center stays on the visible rune. The approach node stays on the furthest believable point on the visible path. The path must not enter the plants just to get closer.

## Sparse walkPath Metadata

`walkPath` should express authoring intent.

Good sparse path points:

* left forest path
* central path
* trail rise
* temple approach
* temple steps
* wind-side approach

Bad sparse path points:

* dozens of near-duplicate points
* points added only to compensate for runtime behavior
* points inside plants or rocks
* points at object centers instead of foot positions

The runtime/tooling may derive denser graph points internally.

## Temple Steps And Elevation

Stairs are a special case.

The sparse path must include enough authored points to express the stair climb. Derived graph interpolation cannot infer a staircase if the authored points skip from bottom to top.

For stairs:

* place points where Sven's feet should land
* change y-values gradually
* avoid diagonal cuts through stonework
* test with the debug overlay

## Connected Areas

A connected area uses the same metadata model as a normal level.

Example:

```text
LVL-0001: Forest + temple exterior
LVL-0002: Temple inside
```

If an area uses a new background image, it should have its own:

* world image
* measured dimensions
* metadata
* interactive objects
* sparse walkPath
* approach nodes
* challenges
* reward or exit state

The previous area may unlock or transition to the next area.

Example flow:

```text
solve three runes -> gate opens -> click gate -> Sven walks to gate -> fade out -> load temple interior -> fade in
```

Do not share world coordinates across different background images.

## Metadata To Runtime Transformation

The eventual transformation should:

1. read `world-metadata.json`
2. verify `world.png` dimensions
3. normalize asset paths
4. copy metadata fields into runtime level structure
5. derive `walkGraph` from `walkPath`
6. attach challenges to object ids
7. generate or update manifest entries
8. run validate/audit/report/Playwright gates

The transformation should not invent duplicate object coordinates.

## Metadata Quality Gates

Generated metadata must pass:

* structural validation
* image-dimension validation
* object reference validation
* path connectivity audit
* object overlap audit
* approach distance audit
* Playwright smoke tests
* debug overlay inspection when needed

Codex should fix metadata and rerun gates before requesting human approval.
