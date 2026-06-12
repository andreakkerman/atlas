# SvenAdventure

## Vision

Build a browser-based educational adventure game for Sven that helps him master multiplication tables while playing a real adventure game.

The game should be engaging enough that Sven wants to play voluntarily, while containing enough math practice to create measurable learning progress.

The long-term goal is not simply to build a game.

The long-term goal is to build an Adventure Factory that can continuously generate new adventures for Sven through AI-assisted content creation.

---

# Player Identity

The player character is Sven.

The game should be designed so Sven feels that he is the hero of the adventure.

NPCs may reference Sven by name.

Stories may include familiar elements from Sven's real life, such as:

* Moose
* Minnie
* Mom and Dad
* Pirates
* Vikings
* Minecraft-inspired worlds
* Sports
* Real-life interests
* Vacation destinations

The game should feel personal and tailored specifically to Sven.

---

# Product Direction

The game should feel like a modernized version of Indiana Jones and the Fate of Atlantis for children.

The goal is not to recreate a 1992 point-and-click adventure.

The goal is to create a modern educational adventure game inspired by the exploration, mystery and puzzle-solving elements of Fate of Atlantis.

The game should provide:

* Adventure
* Discovery
* Exploration
* Progression
* Rewards
* Learning

The game should not feel like a worksheet disguised as a game.

---

# Adventure Feeling

The game should create a sense of exploration, discovery and curiosity.

Players should feel that they are travelling through a world rather than completing a sequence of exercises.

Learning challenges should unlock:

* locations
* characters
* secrets
* mechanisms
* story progression

The adventure experience is the primary motivation.

Math practice is the mechanism that enables progress.

The player should be curious about what is behind the next door, around the next corner or inside the next temple.

---

# Player Presence

Sven should feel physically present inside the adventure world.

The player character should exist within scenes and interact with the environment.

The game should avoid making Sven feel like a detached UI element.

Even simple movement, interaction and environmental responses can significantly increase immersion.

---

# Companion Characters

Recurring companion characters may accompany Sven throughout multiple adventures.

Preferred companions include:

* Moose
* Minnie

Companions may:

* explain objectives
* provide hints
* celebrate achievements
* help reduce confusion
* introduce new locations or challenges

Companions should support the adventure without overwhelming it.

They should feel like helpful travelling companions rather than tutorial systems.

---

# Visual and Gameplay Inspiration

Primary inspiration:

Indiana Jones and the Fate of Atlantis.

Characteristics:

* Beautiful modern illustrations
* Side-view 2D adventure scenes
* Smooth character movement
* Touch-friendly controls for iPad
* Exploration-focused gameplay
* NPC dialogue
* Interactive objects
* Puzzles and discovery
* Inventory items
* Collectibles
* Integrated educational challenges

The game should feel like:

"Indiana Jones and the Fate of Atlantis reimagined as a modern educational adventure game for an 8-year-old child."

The focus is:

* Exploration
* Discovery
* Dialogue
* Puzzles
* Progression

The focus is not:

* Platforming
* Precision jumping
* Reflex-based gameplay
* Action-heavy combat

---

# Core Gameplay Loop

Explore
→ Discover
→ Interact
→ Solve
→ Progress

Typical activities:

* Explore scenes
* Talk to NPCs
* Find clues
* Collect items
* Unlock areas
* Solve puzzles
* Complete math challenges
* Defeat a boss challenge
* Earn rewards

A typical level should last approximately 15 minutes.

---

# Learning Goal

The primary learning goal is multiplication table mastery.

The system should support:

* Focused table practice
* Mixed table practice
* Difficulty levels
* Replayable levels
* Dynamic math question generation
* Mastery tracking

Math challenges should feel like meaningful game obstacles rather than detached exercises.

The game should contain enough questions to create real learning value.

A typical level should contain approximately 30-50 multiplication questions spread across multiple challenges.

Examples:

* Opening a temple door
* Decoding runes
* Unlocking a treasure chest
* Activating an ancient machine
* Defeating a boss challenge

---

# Progression

Sven should earn:

* Rewards
* Collectibles
* Unlocks
* Adventure achievements

Progression should exist across all adventures.

Progression should primarily be tied to meaningful adventure outcomes rather than abstract points.

Concrete accomplishments are preferred over abstract progression systems.

Examples:

* Opening a hidden chamber
* Restoring an ancient temple
* Finding a legendary treasure
* Unlocking a new adventure

XP may exist, but should not be the primary motivational mechanism.

Player learning progress should be retained across adventures.

The game should gradually build a history of Sven's achievements and multiplication mastery.

---

# Runtime vs Content

The runtime engine should be generic.

The content should be highly customizable.

The long-term goal is:

* Runtime code changes rarely.
* New adventures are mostly content changes.
* AI generates content, not engine behavior.

The runtime should remain stable, predictable and maintainable.

---

# Adventure Factory Vision

The long-term goal is to build an Adventure Factory.

Authoring flow:

1. André provides a creative level brief.
2. AI generates level structure.
3. AI generates scenes, dialogue and puzzles.
4. AI generates math challenge definitions.
5. AI generates asset prompts.
6. Visual assets are generated during level creation.
7. André reviews and edits the level.
8. André publishes the level.
9. Sven plays the published adventure.

AI generation should happen during content creation.

AI should not generate gameplay content during runtime.

Every generated adventure should be reviewable before publication.

---

# Simplicity Principle

The project should remain intentionally simple.

The goal is to create adventures for Sven, not to build a complex software platform.

The preferred solution is always the simplest solution that supports the vision.

Infrastructure, services and frameworks should only be introduced when a clear need exists.

Local-first solutions are preferred over cloud-based solutions whenever possible.

---

# Key Architecture Principles

* New levels should ideally require no code changes.
* Levels should be data-driven.
* Runtime should be stable and deterministic.
* AI generation belongs in the authoring workflow.
* Visual assets are generated before publishing.
* Runtime loads only approved assets.
* Math questions are generated dynamically during gameplay based on challenge definitions.
* Automated browser QA should validate adventures before publication.
* First prove one playable experience before building the full Adventure Factory.

---

# Initial MVP

The first goal is not to build a complete adventure.

The first goal is to create one memorable math-powered adventure moment.

This first experience should validate whether Sven accepts multiplication as part of adventure gameplay.

Only after that validation should larger adventures and generation systems be built.

---

# Success Criteria

The project is successful if:

* Sven voluntarily plays.
* Sven wants to continue or replay.
* Sven completes meaningful multiplication practice.
* The adventure feels like a real game.
* The learning experience feels natural.
* André can see a realistic path toward AI-generated future adventures.

---

# Technical Direction

Preferred characteristics:

* Browser-based web application
* iPad Safari compatible
* Local-first architecture
* Content-driven design
* AI-assisted authoring
* Minimal infrastructure

The first milestone is not the Adventure Factory.

The first milestone is proving that adventure gameplay and multiplication practice can successfully coexist.