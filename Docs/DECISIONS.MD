# Decisions

## D001

Player character is Sven.

Reason:

Personal engagement is a core product goal.

---

## D002

Gameplay style is a modernized Indiana Jones and the Fate of Atlantis style adventure.

Reason:

Exploration, dialogue and puzzles are more AI-content-friendly than platforming.

---

## D003

AI is used during content creation, not during gameplay.

Reason:

Predictability, safety and maintainability.

---

## D004

First milestone is a single playable adventure.

Reason:

Validate engagement before building the Adventure Factory.

---

## D005

The game should be playable in a standard browser.

Reason:

Zero-install experiences reduce friction for Sven and simplify development.

---

## D006

The technology stack should remain simple.

Reason:

Complexity should be justified by product value.

Preferred stack:

* HTML
* CSS
* JavaScript
* Local assets

Avoid unnecessary frameworks unless clearly needed.

---

## D007

The first version should optimize for fun and learning rather than architectural flexibility.

Reason:

We must first prove that Sven enjoys the experience.

---

## D008

Levels should be stored as separate content artifacts.

Reason:

The long-term goal is AI-assisted level generation and publishing.

Naming convention:

LVL-XXXX-descriptive-name

Example:

LVL-0001-runenpoort

---

## D009

The game should feel like a real adventure, not a worksheet disguised as a game.

Reason:

Adventure motivation should drive learning engagement.

---

## D010

Math challenges should be integrated into the world.

Reason:

Learning should support progression rather than interrupt it.

---

## D011

No backend is required for the MVP.

Reason:

Reduce complexity and accelerate iteration.

---

## D012

Concrete adventure progress is more important than XP systems.

Reason:

Opening gates, unlocking locations and completing adventures are more meaningful than abstract rewards.

---

## D013

The first adventures should be highly authored.

Reason:

The Adventure Factory should emerge from successful adventures, not from speculation.

---

## D014

All player-facing text should be Dutch.

Reason:

Sven is a Dutch-speaking child.

---

## D015

Reading burden should remain low.

Reason:

The focus should be adventure and learning, not large amounts of text.

---

## D016

The MVP may contain hardcoded gameplay behavior.

Reason:

Learning what works is more important than early abstraction.

---

## D017

Databases, accounts and cloud infrastructure are out of scope for the MVP.

Reason:

Keep the project lightweight and maintainable.

---

## D018

Adventure content should be generated before publication, not during gameplay.

Reason:

Generated content should be reviewed and validated before Sven sees it.

---

## D019

Visual assets should be generated during the authoring process and stored locally with the project.

Reason:

Runtime should remain simple and deterministic.

---

## D020

The long-term goal is an Adventure Factory capable of producing many adventures from AI-assisted prompts.

Reason:

Scalable content creation is a strategic objective.

---

## D021

The player character should exist inside the game world.

Reason:

The adventure feels more immersive when Sven is physically present within the scene rather than represented as a detached UI element.

---

## D022

Companion characters may provide guidance and hints.

Reason:

Young players benefit from contextual guidance.

Preferred companion characters:

* Moose
* Minnie

Companions may:

* explain objectives
* provide hints
* celebrate achievements
* reduce confusion

---

## D023

Player learning progress should be recorded across play sessions.

Reason:

The project aims to improve multiplication mastery over time.

Progress data may include:

* completed adventures
* play sessions
* accuracy
* mistakes
* response attempts
* per-table performance

Local storage is sufficient for the MVP.

---

## D024

Automated browser QA is required.

Reason:

Visual quality and gameplay flow are core product requirements.

Playwright is the preferred QA solution.

---

## D025

The player must immediately understand what action to take.

Reason:

Children should never be confused about how to start progressing.

Objectives should be communicated through:

* visual cues
* companion guidance
* environmental storytelling
* concise instructions

---

## D026

The first screen should establish adventure context within a few seconds.

Reason:

Players should quickly understand where they are, what the goal is and why it matters.

---

## D027

All adventures should be testable through automated playthroughs.

Reason:

Future content generation requires scalable validation and regression testing.

---

## D028

Every generated adventure must be reviewable before publication.

Reason:

AI-generated content should never be published directly without human review.

---

## D029

The first playable version should prioritize a memorable adventure moment over system completeness.

Reason:

A magical experience teaches more than a complete architecture.

---

## D030

The player should feel agency inside the adventure world.

Reason:

The player should not feel like they are operating a menu.

Even simple actions such as walking, approaching objects, activating mechanisms and interacting with characters increase immersion.

---

## D031

Every published adventure should exist as a discrete level artifact.

Reason:

The Adventure Factory should produce content that can be managed, reviewed, tested and published independently.

Each adventure should have:

* a unique level identifier
* its own content file(s)
* its own assets
* its own QA validation
* its own publication status

## D032

Math feedback should use multiple learning strategies.

Reason:

Different multiplication facts are easier to understand through different explanation strategies such as:

repeated addition
doubling
near-ten reasoning
factor swapping
skip counting

The game should gradually choose the most appropriate explanation for each multiplication fact.

## D033

Sven should behave as an actor, not as a visual marker.

Reason:

The player should experience Sven as a character who moves, looks, talks, uses objects and reacts to the world.

---

## D034

World interaction should follow a MoveTo → Action pattern.

Reason:

Clicking or tapping a world object should first move Sven toward the object and then perform the intended interaction.

This creates a stronger sense of agency and presence.

---

## D035

The game should support multiple connected scenes.

Reason:

Adventure feeling increases when Sven travels through locations rather than solving everything on one static screen.

---

## D036

Adjacent scene transitions should prefer spatial movement over generic fades.

Reason:

When locations are physically connected, the transition should feel like movement through a world.

Fades are acceptable for large location changes or interior/exterior transitions.

---

## D037

Puzzles may use different presentation modes.

Reason:

Some puzzles should happen directly in the world, while others may need close-up or full-screen views.

The runtime should eventually support both.