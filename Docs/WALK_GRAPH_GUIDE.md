# Walk Graph Guide

The walk graph tells the runtime where Sven can walk.

It is level-specific data. It lives in the level definition, not in runtime code.

## Structure

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

## Nodes

A node is a named point on walkable ground.

Fields:

* `id`
* `x`
* `y`

Coordinates are background image pixel coordinates.

Good nodes:

* sit on the painted path
* follow curves
* mark changes in height
* mark approach positions near objects
* keep Sven's feet grounded

Bad nodes:

* float above the path
* cut through rocks or walls
* skip over stairs
* sit inside an object
* use viewport or CSS coordinates

## Edges

An edge connects two walkable nodes.

```js
["forest-start", "forest-rune-approach"]
```

Rules:

* both ids must reference valid nodes
* edges should follow visible ground
* long curved paths should be split into multiple edges
* edges should not cross non-walkable art

## Approach Nodes

Approach nodes are normal walk graph nodes used by interactive objects.

Example interactive object:

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

Matching walk node:

```js
{ id: "sun-rune-approach", x: 1365, y: 468 }
```

The approach node should answer:

Where should Sven stand to interact with this object?

It should not answer:

Where is the object's visual center?

Those are different concepts.

## Path Projection

When the player clicks walkable ground, the runtime projects that click onto the nearest walk graph segment.

Then Sven routes along the graph.

This means:

* free clicks do not need to land exactly on a node
* the graph still controls where Sven can walk
* bad graph placement creates bad movement

The graph should be dense enough that projected movement feels like it follows the painted path.

## LVL-0001 Example

LVL-0001 uses a single wide forest-to-temple background.

The path begins on the lower forest path:

```js
{ id: "forest-start", x: 170, y: 610 },
{ id: "forest-rune-approach", x: 285, y: 600 },
{ id: "forest-path-low", x: 430, y: 594 }
```

It rises toward the temple:

```js
{ id: "trail-rise-1", x: 1080, y: 560 },
{ id: "trail-rise-2", x: 1210, y: 510 },
{ id: "sun-rune-approach", x: 1365, y: 468 }
```

And it includes separate temple step nodes:

```js
{ id: "gate-step-low", x: 1680, y: 548 },
{ id: "gate-step-mid-1", x: 1765, y: 526 },
{ id: "gate-step-mid-2", x: 1838, y: 503 },
{ id: "gate-step-upper", x: 1860, y: 476 },
{ id: "gate-step-center", x: 1935, y: 510 }
```

## Temple Steps Special Case

Steps need extra care.

If one edge jumps from the bottom of a staircase to the top, Sven appears to float or slide through the air.

Instead:

* add multiple step nodes
* keep y-values changing gradually
* place nodes where Sven's feet should land
* connect the nodes in stair order

Good:

```js
["gate-step-low", "gate-step-mid-1"],
["gate-step-mid-1", "gate-step-mid-2"],
["gate-step-mid-2", "gate-step-upper"]
```

Bad:

```js
["gate-step-low", "gate-step-upper"]
```

## Authoring Checklist

For each walk graph:

* nodes are inside world bounds
* node ids are unique
* edges reference valid nodes
* graph is connected enough for the level
* each interactive object has a reachable approach node
* curves are split into enough nodes
* stairs are split into several nodes
* Sven's feet stay on the visible path

