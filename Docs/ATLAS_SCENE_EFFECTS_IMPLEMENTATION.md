# Atlas Procedural Scene Effects

This document records the implementation contract for
`ATLAS_PROCEDURAL_SCENE_EFFECTS_AND_EDITOR_SPEC_v2.md`.

## Runtime architecture

`src/scene-effects.js` owns:

- the versioned preset registry;
- preset and group resolving;
- schema and range validation;
- deterministic seeded variation;
- geometry containment and bounds helpers;
- independent source geometry and visibility-mask helpers;
- one coordinated Canvas2D animation scheduler;
- quality-tier and reduced-motion resolving;
- the renderer families used by runtime and editor preview.

The runtime creates at most one canvas for each semantic effect slot, not one
canvas or animation loop per effect. A level change disposes the scheduler and
the new level prepares a fresh resolved effect list.

Every preset records complete defaults, hard and recommended parameter ranges,
a recommended particle budget, a preset hard cap, quality scaling and
preset-specific reduced-motion scaling.

Renderer families:

- `glowField`
- `particleField`
- `fogField`
- `plumeEmitter`
- `lightBeam`
- `surfaceShimmer`
- `surfaceGlint`

Smoke and steam use `plumeEmitter`, never the broad-zone `fogField`.

## Semantic layer map

The fixed world stack is:

| Surface | CSS variable | Value |
| --- | --- | ---: |
| Background | `--layer-background` | 10 |
| Background atmosphere | `--layer-effects-background` | 15 |
| Ambient flybys | `--layer-ambient-flybys` | 20 |
| World atmosphere | `--layer-effects-world` | 25 |
| Ambient animals | `--layer-ambient-animals` | 30 |
| World light | `--layer-effects-light` | 35 |
| Sven | `--layer-sven` | 40 |
| Foreground atmosphere | `--layer-effects-foreground` | 45 |
| Markers and world UI | `--layer-world-ui` | 50 |
| Companion bar and modals | `--layer-overlays` | 60 |
| Editor workspace | `--layer-editor-world` | 70 |
| Editor controls | `--layer-editor-controls` | 80 |
| Transitions | `--layer-transition` | 90 |

Gameplay canvases always use `pointer-events: none`.

## Optional level data

Levels may omit both fields:

```js
sceneEffectGroups: [
  {
    id: "harbor-water",
    label: "Harbor water",
    sharedProperties: ["primaryColor", "speed", "intensity"],
    overrides: {
      primaryColor: "#A7C8D8",
      speed: 0.85,
      intensity: 0.72
    }
  }
],
sceneEffects: [
  {
    id: "harbor-water-left",
    label: "Harbor water left",
    presetId: "water-surface",
    variantId: "harbor-water",
    presetVersion: 1,
    enabled: true,
    seed: 18427,
    layerSlot: "worldAtmosphere",
    groupId: "harbor-water",
    geometry: {
      type: "polygon",
      points: [
        { x: 120, y: 440 },
        { x: 580, y: 430 },
        { x: 620, y: 610 },
        { x: 90, y: 620 }
      ],
      cutouts: []
    },
    mask: {
      includes: [
        [
          { x: 120, y: 440 },
          { x: 580, y: 430 },
          { x: 620, y: 610 },
          { x: 90, y: 620 }
        ]
      ],
      cutouts: []
    },
    overrides: {
      edgeFeatherPx: 18
    }
  }
]
```

`geometry` is the source or emitter definition. Optional `mask.includes` and
`mask.cutouts` are independent render-visibility polygons. Phase 1 uses that
mask for render clipping and particle spawn containment where practical; the
schema intentionally leaves room for separate `spawnMask` and `renderMask`
fields later.

`edgeFeatherPx` controls mask feathering. `0` gives hard clipping. Runtime and
editor preview use the same mask and feather behavior.

Group sharing is explicit: only fields named in `sharedProperties` inherit from
the group's `overrides`, and a local instance override wins.

## Performance behavior

- High: full recommended counts and 60 Hz target.
- Balanced: default iPad tier; reduced particles, fog layers, blur and shimmer
  segments with a 40 Hz target.
- Reduced: stronger count and complexity reductions with a 24 Hz target.

`prefers-reduced-motion` additionally applies preset-specific speed, amount,
pulse and flicker scaling. Static visual presence remains.

The editor displays a Balanced-tier iPad estimate from configured caps, density
and preset scaling.
It warns at medium and high aggregate budgets without changing authored
geometry or gameplay.

## Authoring workflow

1. Run `npm.cmd run dev:editor`.
2. Open `http://127.0.0.1:4173/?dev=editor`.
3. Start the target level and press `Ctrl+Shift+D`.
4. Choose **Effects**.
5. Add a preset and variant from the user-facing library.
6. Use Quick controls first, then Advanced or Expert where needed.
7. Drag the selected world guide directly, or select **Edit geometry** for the
   full source/mask/cutout workspace.
8. Use **Source**, **Mask** and **Cutout** modes to move source geometry,
   include polygons and exclusion polygons independently. Enable linked movement
   only when source and mask should translate together.
9. Draw polygons by clicking/tapping points, close with the first point or
   Enter, cancel with Escape, or remove the latest uncommitted point with
   Backspace.
10. Use Preview controls to pause, restart, isolate, hide or generate a new
   deterministic seed.
11. Add a group when separated regions should share selected visual properties.
12. Test the scene at desktop and both iPad orientations.
13. Press **Apply** only when the authored result is ready.
