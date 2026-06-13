# Preproduction

This document defines how to explore level mockups and external sprite work before anything enters the playable runtime.

Preproduction exists to keep experimentation separate from validated gameplay.

## Principles

* Mockups are not playable levels.
* Sprite experiments are not runtime assets.
* `Levels/manifest.js` should contain only playable, validated level areas.
* Shared Sven sprite assets live in `assets/characters/sven/` only after approval.
* A new background image means a new level area package.

## Level Mockups

Use mockups to explore visual direction before creating metadata or `level.js`.

Mockups may represent:

* a new standalone adventure level
* a connected area in an existing adventure
* an interior entered from an exterior
* alternate visual directions for the same concept

Example folder:

```text
Preproduction/
  level-mockups/
    2026-06-rune-temple-inside/
      brief.md
      mockup-01.png
      mockup-02.png
      mockup-03.png
      notes.md
```

Mockup folders should clearly state the intended type:

```text
Type: New level
```

or:

```text
Type: Connected area for LVL-0001
```

## Mockup Evaluation

Judge mockups on:

* adventure appeal
* clear walkable path
* readable interactive objects
* enough horizontal travel space
* child-friendly mood
* whether Sven would understand where to go
* whether the image can support object centers and approach nodes

Do not generate final coordinates before the chosen world image exists.

## Promotion To Playable Level Area

After a mockup is approved, promote it into a playable level area.

New level example:

```text
Preproduction/level-mockups/2026-06-ice-cave/
-> Levels/LVL-0002/
```

Connected area example:

```text
Preproduction/level-mockups/2026-06-rune-temple-inside/
-> Levels/LVL-0002/
```

For the current adventure, a temple interior should be modeled as a new connected level area:

```text
LVL-0001: Forest + temple exterior
LVL-0002: Temple inside
```

The transition can be simple:

```text
solve three runes -> gate opens -> click gate -> Sven walks to gate -> fade out -> load LVL-0002 -> fade in
```

Do not merge different background images into one coordinate system.

## Connected Area Rule

If it uses a new background image, it becomes a new level area package.

Each area needs its own:

* world image
* measured dimensions
* metadata
* interactiveObjects
* sparse walkPath
* approach nodes
* challenges
* start position
* validation/audit/report/Playwright coverage

The previous area may unlock the next area, but the areas do not share world coordinates.

## Sprite Work

Sprite creation and sprite experiments may happen outside this project.

Only approved final gameplay frames should be imported into:

```text
assets/
  characters/
    sven/
      idle-right/
      walk-right/
      interact-right/
```

Do not place sprite experiments inside level folders.

Do not place unapproved sprite experiments inside `assets/characters/sven/`.

## Sven Sprite Intake Specs

Current Sven gameplay frames use this standard:

```text
Canvas size: 360 x 440 px
Format: PNG
Background: transparent
Direction: right-facing source frames
Color: sRGB
```

Required folders:

```text
assets/characters/sven/
  idle-right/
    frame-01.png ... frame-12.png
  walk-right/
    frame-01.png ... frame-24.png
  interact-right/
    frame-01.png ... frame-12.png
```

Required frame counts:

* `idle-right`: 12 frames
* `walk-right`: 24 frames
* `interact-right`: 12 frames

Naming:

```text
frame-01.png
frame-02.png
...
```

Use two digits.

## Sprite Anchor

Every Sven gameplay frame must use the same bottom-center foot anchor.

For a `360 x 440 px` frame:

```text
bottom-center x: 180
foot baseline: consistent near the bottom of the canvas
```

The exact visible foot pixels may vary by pose, but the character must not appear to jump, sink, grow, shrink, or slide because the canvas anchor moved.

## Sprite Visual Requirements

Maintain Sven's design:

* blond hair
* blue eyes
* red adventure jacket
* blue hoodie
* backpack
* child explorer personality

All frames must have:

* identical canvas size
* identical character scale
* consistent proportions
* consistent lighting
* consistent backpack size
* no cropped hair, hands, backpack, or feet
* no frame-to-frame body scale jitter

Animation expectations:

* idle should feel alive without body shake
* walk should loop smoothly
* interact may be non-looping
* right-facing frames are flipped by the runtime for left-facing movement

## Sprite Import Checklist

Before replacing runtime sprites:

* verify every PNG is `360 x 440 px`
* verify every required frame exists
* verify transparent backgrounds
* verify feet stay anchored
* verify walk loop does not slide
* verify idle does not shake
* verify interact reads clearly
* run Playwright after import because shared sprites affect all levels

If externally generated source art is larger, crop and export final gameplay frames to `360 x 440 px` before importing.
