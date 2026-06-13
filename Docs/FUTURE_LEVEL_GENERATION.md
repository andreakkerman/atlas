# Future Level Generation

This document describes the long-term Adventure Factory generation pipeline.

The goal is to generate new personalized adventures that work correctly on the first attempt as often as possible.

Generated levels must still be validated, tested, and reviewed before Sven plays them.

## Recommended Pipeline

### 1. Create Level Concept

Automatable: mostly yes.

Human review: yes.

The generator creates:

* setting
* adventure theme
* learning focus
* main obstacle
* reward idea

Example:

```text
Sven explores an ice cave and opens a frozen bridge by solving multiplication crystal puzzles.
```

Human review should check:

* age appropriateness
* personal relevance
* adventure appeal
* no scary or confusing premise

### 2. Create Story Goal

Automatable: mostly yes.

Human review: yes.

The goal should be concrete:

* open the gate
* repair the ship
* unlock the map
* wake the ancient machine
* rescue a friendly creature

Avoid abstract goals like:

* earn points
* finish quiz
* complete worksheet

### 3. Generate World Image

Automatable: yes.

Human review: yes.

The image must include:

* clear walkable terrain
* visible interaction objects
* readable foreground/midground separation
* enough horizontal travel space
* no essential objects hidden by clutter

Human review should check:

* visual charm
* object readability
* child-friendly tone
* path clarity

### 4. Detect Actual Dimensions

Automatable: yes.

Human review: not usually.

Read the image dimensions from the saved file. Store them in:

```js
world.width
world.height
```

This step must never be skipped.

### 5. Place Interactive Objects

Automatable: partially.

Human review: yes.

The generator or authoring tool places:

* object id
* object type
* center
* radius
* approach node reference
* label

Computer vision may help find glowing symbols or objects, but human review is still needed because gameplay intent matters.

### 6. Create Walk Graph

Automatable: partially.

Human review: yes.

The generator creates:

* path nodes
* path edges
* approach nodes

Automation can propose a path from the visible ground. Human review should check that Sven will not float, cut through rocks, or skip stairs.

### 7. Attach Challenges

Automatable: yes.

Human review: yes.

Challenges attach to objects through `objectId`.

The generator should choose multiplication facts based on learning goals and previous progress when available.

Human review should check:

* difficulty
* Dutch wording
* hint quality
* challenge count
* whether the math feels purposeful

### 8. Run Validator

Automatable: yes.

Human review: only if it fails.

Command:

```bash
npm run validate:levels
```

The validator checks structural correctness.

Generated levels cannot be marked playable if validation fails.

### 9. Run Audit

Automatable: yes.

Human review: yes.

Command:

```bash
node scripts/level-audit.js
```

The audit reports quality warnings:

* objects too close together
* radius too large or too small
* isolated walk nodes
* unreachable approach nodes
* challenge objects without approach nodes

Warnings do not always mean the level is invalid. They mean a human should inspect the level.

### 10. Run Playwright Smoke Tests

Automatable: yes.

Human review: only if it fails.

Command:

```bash
npm run test:e2e
```

Future generated levels should also receive generated smoke tests that:

* select the level
* start the adventure
* walk to key objects
* activate a challenge
* finish the level
* verify persistence

### 11. Human Review

Automatable: no.

Human review is required.

Review:

* visual quality
* object alignment
* path believability
* Dutch text
* learning appropriateness
* emotional tone
* whether Sven would understand what to do

### 12. Publish

Automatable: partially.

Human approval required.

A level can be published only after:

* validator passes
* audit warnings are accepted or fixed
* Playwright smoke tests pass
* human review approves the level

## What Can Be Automated

Good automation candidates:

* manifest updates
* image dimension detection
* initial object proposals
* initial walk graph proposals
* multiplication question generation
* static validation
* audit report generation
* smoke test generation

## What Requires Human Review

Human review remains necessary for:

* whether the adventure is fun
* whether the world is visually clear
* whether object placement feels right
* whether Sven's path looks believable
* whether Dutch text is appropriate
* whether math feels integrated instead of pasted on
* whether the reward feels meaningful

## Adventure Factory Rule

The Adventure Factory should generate levels, not runtime exceptions.

Generated output should be:

* local
* inspectable
* validated
* auditable
* smoke-tested
* human-approved

