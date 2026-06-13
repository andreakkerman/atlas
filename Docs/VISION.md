# SvenAdventure Vision

## Mission

SvenAdventure is a personalized educational adventure game for Sven.

The product goal is simple:

1. Sven wants to play because the adventure is exciting.
2. Sven practices multiplication because the adventure needs it.

The game must feel like an adventure first and a learning app second. Multiplication should never feel like a worksheet placed on top of a pretty background.

## Core Product Principles

### Adventure First, Learning Second

The adventure is the motivation. Learning is embedded inside the adventure.

Good multiplication moments:

* open a sealed rune gate
* power an ancient machine
* decode a map
* repair a vehicle
* unlock treasure
* answer a spirit's challenge to continue

Bad multiplication moments:

* a generic quiz screen with adventure art around it
* repeated questions with no world consequence
* scoring systems that feel separate from the story

The player should understand why the math matters in the world.

### Sven Is An Actor In A World

Sven is not a portrait, cursor, token, menu choice, or detached UI element.

Sven is the protagonist inside the world. He should:

* stand on the ground
* walk through locations
* approach objects before acting
* face the thing he interacts with
* react to success and mistakes
* feel present even when idle

The player should feel like they are guiding Sven, not operating a quiz interface.

### The World Is The Primary Interface

The playable world is the main UI.

Players interact by tapping or clicking things in the world:

* walkable ground makes Sven walk
* a rune makes Sven walk to it and activate it
* a character makes Sven walk to it and talk
* a door makes Sven walk to it and try to open it

Traditional command buttons such as `Kijk`, `Praat`, and `Activeer` are intentionally removed. Interaction is contextual. The object decides what happens.

### Movement Creates Adventure Feeling

Movement is part of the game design, not just transportation.

The current runtime uses:

* one wide world image per level
* camera-follow movement
* a data-driven walk graph
* object approach nodes
* Move To -> Arrive -> Action interaction flow

This should remain the default direction for future levels.

### Dutch, Short, Supportive Text

All player-facing text must be Dutch.

Text should be suitable for a Dutch child of about 8-9 years old:

* short sentences
* clear words
* playful but not childish
* no long dialogue
* no complex educational vocabulary

Good:

* `Goed zo! De rune begint te gloeien.`
* `Bijna. Denk aan 6 groepjes van 4.`
* `De poort gaat open!`

Bad:

* `Excellent, you activated the ancient rune mechanism.`
* `Multiplication represents repeated addition across equivalent sets.`

## Learning Philosophy

### Practice Through Purpose

Multiplication should be tied to progression. A correct answer should help Sven do something in the world.

### No Timers

The learning tone should be supportive. Timers, pressure, and punishment are not appropriate for the current product.

### Useful Mistakes

Wrong answers should teach.

Feedback should:

* be short
* stay friendly
* explain one useful idea
* use concrete Dutch wording

Examples:

* `Bijna. Denk aan 6 groepjes van 4.`
* `Bijna. 8 x 6 is hetzelfde als 4 x 6, en dan dubbel.`
* `Bijna. 9 x 7 is 10 x 7 min 7.`

### Persistent Progress

The game should remember multiplication practice locally.

Useful progress data:

* questions asked
* attempts
* mistakes
* first-try correct
* per multiplication table
* adventure completion

For now, browser `localStorage` is sufficient.

## Long-Term Vision: Adventure Factory

The long-term vision is an AI-assisted Adventure Factory.

The Adventure Factory should eventually create personalized adventures from creative briefs. A generated adventure should include:

* concept and story
* world background
* interactive objects
* walk graph
* characters and companion text
* educational challenges
* reward state
* validation results
* Playwright smoke-test results

The runtime should be reusable. New generated levels should ideally require no runtime code changes.

## Authoring Philosophy

Generated content must be created before gameplay, not during gameplay.

Runtime gameplay should be:

* local
* deterministic
* safe
* reviewable
* testable

AI may help generate worlds, puzzles, dialogue, and level data. Human review and automated validation are required before Sven plays a generated level.

## Technical Direction

The project should stay local-first and intentionally simple:

* browser based
* plain HTML/CSS/JavaScript
* local assets
* no backend
* no database
* no authentication
* no cloud dependency during gameplay

Complexity must earn its place. The Adventure Factory should emerge from validated levels, not speculative abstractions.

