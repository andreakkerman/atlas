# Interactive Object Guide

Interactive objects are the primary level entities in SvenAdventure.

They represent the things Sven can notice, approach, inspect, activate, talk to, or solve.

## Object Structure

Every interactive object uses this structure:

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

Fields:

* `id`: stable identifier used by hotspots, runes, tests, and authoring tools
* `type`: object category
* `center`: pixel coordinate in the world background image
* `radius`: interaction circle radius in world pixels
* `approachNode`: walk graph node Sven walks to before acting
* `label`: Dutch accessible label

## Center Is The Anchor

The object center is the single source of truth for:

* click circle
* hover circle
* focus circle
* solved glow
* challenge anchor
* label anchor

Do not create separate coordinates for these behaviors.

If the center is wrong, fix the object center. Do not compensate in CSS or runtime code.

## Radius

`radius` controls the circular interaction area.

Guidelines:

* small object: `30-45`
* normal rune: `45-70`
* large door or gate: `80-120`

The circle should be large enough for touch but not so large that it covers unrelated art.

All circles must remain true circles across desktop, iPad landscape, and iPad portrait.

## Approach Node

`approachNode` tells Sven where to stand before interacting.

The approach node should:

* exist in `walkGraph.nodes`
* sit on visible ground
* place Sven near the object
* avoid overlapping the object
* make Sven face the object naturally

Approach nodes belong to the walk graph, not the object itself.

## Object Types

### Rune Objects

Rune objects attach to multiplication challenges.

Example:

```js
{
  id: "steen",
  type: "rune",
  center: { x: 1849, y: 343 },
  radius: 70,
  approachNode: "gate-step-upper",
  label: "Steenrune"
}
```

Rune challenge:

```js
{
  id: "steen",
  objectId: "steen",
  name: "Steenrune",
  defaultAction: "activate",
  intro: "De Steenrune bromt zacht.",
  solved: "Sterk! De Steenrune is wakker.",
  questions: [
    { a: 6, b: 4 }
  ]
}
```

Rules:

* `objectId` must match the rune object's `id`.
* The solved glow uses the rune object's center.
* The challenge panel uses the rune object's center.

### Clue Objects

Clue objects give information or point Sven toward the next action.

Example:

```js
{
  id: "brokenMap",
  type: "clue",
  center: { x: 520, y: 430 },
  radius: 42,
  approachNode: "map-approach",
  label: "Gescheurde kaart"
}
```

Hotspot:

```js
{
  id: "brokenMap",
  objectId: "brokenMap",
  type: "clue",
  name: "Gescheurde kaart",
  defaultAction: "look",
  look: "Er staat een kruis bij de oude brug."
}
```

### Inspect Objects

Inspect objects are optional world details that reward curiosity.

Example:

```js
{
  id: "oldHelmet",
  type: "inspect",
  center: { x: 870, y: 520 },
  radius: 38,
  approachNode: "helmet-approach",
  label: "Oude helm"
}
```

Use inspect objects sparingly. They should add adventure feeling without distracting from the main goal.

### Door Objects

Door objects block or complete progression.

Example:

```js
{
  id: "templeGate",
  type: "gate",
  center: { x: 1849, y: 343 },
  radius: 104,
  approachNode: "gate-step-upper",
  label: "Runenpoort"
}
```

Hotspot:

```js
{
  id: "templeGate",
  objectId: "templeGate",
  type: "gate",
  name: "Runenpoort",
  defaultAction: "activate",
  look: "De poort zit dicht. Drie runen houden hem vast.",
  activate: "De poort wacht op drie wakkere runen."
}
```

Door objects may appear only after prerequisites are complete if the runtime supports that flow.

### Talk Objects

Talk objects represent characters in the world.

Example:

```js
{
  id: "bridgeGuard",
  type: "talk",
  center: { x: 1200, y: 500 },
  radius: 55,
  approachNode: "guard-approach",
  label: "Brugwachter"
}
```

Hotspot:

```js
{
  id: "bridgeGuard",
  objectId: "bridgeGuard",
  type: "character",
  name: "Brugwachter",
  defaultAction: "talk",
  talk: "Alleen wie de tafel van 6 kent, mag verder."
}
```

Use talk objects when the character is visibly present in the world. If the character is only a helper overlay, do not place an in-world object.

## Common Mistakes

Avoid:

* storing `x` and `y` on runes for visual placement
* storing solved glow coordinates separately
* using CSS percentages in level data
* using screenshot coordinates instead of image pixel coordinates
* creating huge circles that overlap other objects
* placing approach nodes behind objects or off the path
* attaching a challenge to an object without an approach node

