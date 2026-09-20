# Atlas level contract

This is the current level-data and interaction contract. Implementation authorities are [the validator](../scripts/validate-levels.js), [runtime normalization and progression](../src/app.js), [world configuration](../src/atlas-world.js), and the existing level definitions. This document describes supported data, not a future metadata compiler.

Learning authoring belongs to [Learning Content Rules](ATLAS_LEARNING_CONTENT_RULES.md); editing/persistence to [Dev Tools](DEV_TOOLS.md); optional visual tooling to [Editor and Effects](EDITOR_AND_EFFECTS.md); rendering policy to [Renderer Specification](renderer-current-spec.md).

## Registration and ownership

`Levels/manifest.js` registers entries with `id`, `title`, `script` and menu information. Entries may be connected/hidden from the main menu; developer-only fixtures are not ordinary adventure entries. Each level script registers its definition in `window.SVEN_LEVEL_DEFINITIONS[id]`. IDs must agree with the manifest. Load level scripts through the existing loader rather than copying definitions into runtime code.

`Levels/LVL-xxxx/level.js` owns authored level content. `Levels/world-config.js` owns adventure ordering/visibility and level presentation/tuning overrides through the shared resolver. Shared characters, ambient libraries and audio configuration live outside individual levels. Normal gameplay does not write these source files.

## Definition structure

| Fields | Current role |
| --- | --- |
| `id`, `title`, `description`, `storageKey`, `progressKey` | Identity, display and local gameplay/learning storage keys; validated nonempty strings. |
| `subtitle`, `menu` | Additional presentation, alongside manifest menu metadata. |
| `world` | Measured `width`, `height`, `background`; optional `aspectRatio` and artwork-sized `depthmap`. |
| `player` | `startNode` and world-pixel `start`; start coordinates must match the authored start node. Optional `characterId` selects the default playable sprite set (`sven` or `sven_arc`); omitted means `sven`. |
| `walkPath` or `walkGraph` | Authored route or legacy explicit graph; do not author both. |
| `interactiveObjects` | Nonempty object registry: unique `id`, `type`, `label`, `center`, positive `radius`, valid `approachNode`. |
| `hotspots`, `runes` | Interaction bindings to object IDs; runes remain the compatibility/progression container for challenge objects, including non-rune stories. |
| `learningChallenges` | Optional authored challenge registry linked from runes; preferred for authored learning content. |
| `challengeCharacter`, `guides` | Challenge presentation identity and guide configuration where used. Guide `portrait` is level-specific; optional `blink: false` keeps custom portraits static when no matching blink art exists, without changing guide identity, hints or interactions. Omitted `blink` preserves default animation. |
| `companion`, `challengeArt`, `spiritName`, `spiritLines` | Existing compatibility/presentation fields; these are still validated, not permission to remove them. `spiritLines` requires welcome/moving/allRunes/reward strings. |
| `intro`, `areas`, `reward` | Nonempty introduction and area arrays; reward requires title, line and art. |
| `levelSemantics`, `companionMoments` | Authored narrative context and event-driven companion dialogue. |
| `ambientAnimals`, `ambientFlybys`, `sceneEffects`, `sceneEffectGroups` | Optional reusable systems; omission must remain supported. |

A hotspot has `id`, `objectId`, `type`, `name`, and `defaultAction`. A rune has `id`, `objectId`, `name`, `defaultAction`, `intro`, and `solved`, plus its challenge binding. References must resolve within the owning level. Asset paths are repository-relative; level artwork belongs with that level, shared libraries in `assets/`.

Keep source data distinct from runtime normalization: the app derives a graph and applies world-setting overrides in memory. Do not persist that derived graph alongside its source path. General editor Apply also synchronizes player start and legacy interaction geometry; effect-only Apply preserves unrelated source sections.

Playable selection is per level, never per world. Editor selection persists as `Levels/world-config.js` → `levels[id].mainCharacter`, overriding `player.characterId`. `mainCharacterSettings[characterId]` holds each sprite set's per-level scale, movement speed, level animation-speed multiplier and existing `sven*` appearance keys. Flat legacy presentation tuning remains standard Sven's fallback. Shared route/start coordinates, background appearance and all scene/Cinematic character lighting and shadows remain level settings. Only Player Locomotion is global per character: `characterLocomotion.sven` / `.sven_arc` in the same world-config file. The resolver reads the selected ID's global profile directly; stale per-level `locomotion` fields are ignored. Legacy top-level `locomotion` is imported for Sven only when its global profile is absent; saving writes the canonical character profiles. Registry defaults match the calibrated profiles (ARC From Idle Movement 25%, blink 1000–5000 ms), never the obsolete bootstrap profile.

## Coordinates, path and interaction geometry

The painted background's actual pixel dimensions define the 2D coordinate system. Measure the image; do not infer dimensions from a screenshot, viewport or historical level. A replacement image with different coordinates needs intentional reauthoring, not silently reused hit geometry. Depth maps must match the artwork dimensions.

Use world coordinates for player feet, path points, object centers, approach positions and editor overlays. Convert pointer coordinates through the shared camera/world scale once. Keep x/y scaling uniform so circular interaction regions remain circles on desktop and iPad. CSS viewport coordinates and 3D world units are not interchangeable with artwork pixels.

`walkPath` accepts an ordered point array, or the supported `{ main: [...] }` form. Normalization accepts point objects and legacy coordinate pairs; new authored points should have stable IDs with x/y. The runtime densifies the sparse path into a connected movement graph. Author only meaningful bends and interaction/start locations, on visible walkable ground. Do not add dense hand-maintained samples merely to imitate the runtime graph.

Explicit legacy `walkGraph` definitions contain nodes and `[fromId, toId]` edges. Nodes must be unique and references valid. A path/graph must contain a traversable route. Player start and all object approach nodes must resolve into it.

An object's `center` marks the painted interactive feature; `radius` defines its circular interaction region. Its `approachNode` is where Sven stands to act. They are separate concepts: never move the feature center to Sven's feet to repair an approach. Hotspots/runes reference this shared object geometry instead of maintaining independent hit areas. Keep click, hover/focus, solved indicators and editor guides aligned to the same data.

Ordinary 2D interaction follows **Move To -> Arrive -> Action**. Preserve contextual actions, path constraints and pending-action cancellation. Editor actions consume input without initiating walking. Renderer-specific presentation must reuse the same challenge/progression state.

## Authored learning challenges

An authored challenge contains `id`, `anchorId`, `challengeCharacterId`, optional boolean `active`, and `questions`. `anchorId` resolves to an interactive object; the validator requires `challengeCharacterId` to match the level's challenge character ID. Additional presentation/prerequisite settings use existing runtime fields rather than a new challenge engine.

Each authored challenge has exactly four question slots, each with an `id` and exactly two `variants`. Slot IDs are unique within a challenge; variant IDs are unique across that challenge. IDs can recur in different levels: audits and edits must use the level/challenge context, not a global variant-ID lookup.

Each variant provides `id`, `domain: "math"`, `schoolBand: "E5-intended"`, `family`, `presentation` (`bare` or `story`), `answerMode` (`open` or `multipleChoice`), `prompt`, `answer`, `hintMinnie`, `hintMoose`, and `explanation`. Optional `visual` currently supports `{ type: "clock", hour, minute }`. Multiple choice must include the exact answer and nonduplicate choices. See the learning contract for validation details and editorial guidance.

A rune may reference a single `challengeId`, or the supported `challengeIds` list, whose anchors must match its `objectId`. Legacy `rune.questions` with a/b multiplication pairs remain supported when no authored binding exists. Do not convert legacy content incidentally during another task.

Variant selection is retained for the question attempt; wrong answers, hints and UI redraws must not choose a new variant. Persist completion/learning evidence through the existing storage handlers, not through editor drafts.

## Active challenges and progression

Omitted `active` means active; only explicit `false` disables an authored challenge. A rune with one binding follows that challenge; a multi-binding rune is active if any linked challenge is active. Legacy runes remain active.

Inactive challenges remain authored and editable, but do not appear as playable challenge targets/cues or contribute to active menu counts and required progression. Do not delete their variants or pretend they were solved. Existing completion records must not bypass a changed active set.

Exit readiness uses the existing active-rune calculation. If any active rune's selected challenge explicitly sets `unlocksLevelProgression: true`, all such runes must be completed; otherwise all active runes are required. Prerequisite locking and renderer cues project this state rather than implementing a separate completion rule. See [active challenge regressions](../tests/challenge-active.spec.js).

ARC Atlas follows Dam Battlegrounds → Buried City → Riven Tides → Stella Montis (`LVL-0032`–`LVL-0035`). Stella Montis is the current final level and uses the normal final reward with no next-level target. Its terminal/math, round-container/clock and crate/math challenges each contain four slots with two variants. The supplied level-local scene, depth and Valente assets use the standard loading/editor paths. `player.characterId: "sven_arc"` selects the existing global ARC Sven locomotion profile; no level-local locomotion copy is authored. Its Minnie opening line uses the ordinary `LEVEL_ENTER` moment.

## Authored Nieuw status

In `Levels/world-config.js`, `worlds[rootId].isNew: true` marks an adventure as Nieuw; its member levels inherit through the existing `connectedFrom` root resolver. Optional `levels[levelId].isNew` is a boolean override (false opts out); absent flags resolve to false. ARC Atlas currently authors only the world flag. Current level IDs each identify one playable scene; the world association is the shared parent boundary, with no separate scene flags or ARC ID list.

`worldResolver.isNew(levelId)` is the effective replay policy. Nieuw levels bypass only the two-other-level replay cooldown. Plays remain recorded, and disabling/removing Nieuw immediately restores normal eligibility using that history. There is no first-seen timestamp or 72-hour expiry; any old browser timestamp is unused and needs no migration. Progression, exit requirements and saved completion are unchanged.

The carousel represents worlds, not individual connected scenes. Its existing persistent card grid contains every enabled world once in authored order, independently of hero selection. A fresh menu selects the first enabled Nieuw world in that order; while any exists, automatic hero rotation is disabled. Manual arrows/dots retain the chosen hero for that menu session, including index zero, without snapping back. Returning to a fresh menu or reloading reapplies the default. With no Nieuw worlds, index zero and the existing automatic rotation behavior remain unchanged. There is no capacity limit or recommendation eviction. A world card shows Nieuw when any enabled member is effectively new; removing the status removes the badge and leaves ordinary carousel behavior. Do not add a second pinned-card list or launch a locked child directly. ARC Minnie intros continue using normal `companionMoments` / `LEVEL_ENTER` events.

## Characters and shared asset discovery

[Sven locomotion](../src/locomotion.js) owns Sven's animation configuration and `frame_001.png`-style numbered paths. Its ten current animation folders contain 143 required 432x528 PNG frames, including `idle/frame_001.png`. The removed legacy sprite folders are not runtime inputs; use the controller's `ANIMATIONS` map and `allFrameUrls()` for the current frame inventory.

[Character manifest generation](../scripts/generate-character-manifest.js) scans character directories. A discoverable NPC needs `portrait.png` and nonempty `idle` frames. It discovers numbered `idle_animation_N` folders in numeric order and optional `idle_to_pass`; supported images are PNG/JPEG/WebP, numerically sorted and content-versioned. The generated [manifest](../assets/characters/manifest.js) is not hand-maintained. Missing optional animations use existing runtime fallbacks.

The character editor assigns discovered assets through existing NPC/challenge data. Preserve separation between challenge identity, selected character art and Minnie/Moose narrative roles. General/Visual controls reuse [shared appearance definitions](../src/character-appearance.js); do not fork settings by renderer. Keep anchor positions and animation-frame readiness stable during appearance changes.

## Optional systems and renderer integration

Ambient instances reuse central asset libraries; configured instances may share assets. Effects use versioned preset IDs plus authored geometry/overrides. Audio is shared configuration rather than a second per-level playback engine. Narrative moments use authored event records; [Companion Guide](COMPANION_AUTHORING_GUIDE.md) owns dialogue tone and allowed events.

Ambient animals carry unique instance IDs, type/optional label, world x/y, positive scale, open/closed frame paths, sound and blink/cooldown settings. Appearance/mirroring fields use the existing normalizers. Flybys carry unique instance IDs, frameA/frameB, optional sound, path points, scale, speed, flap frequency, facing/mirroring, interval bounds and optional `syncKey`/`startDelayMs`; supported motion-profile controls extend that same instance. Their off-world path points are intentional, unlike ordinary walking-path points. The dev server validates these payloads; do not assume the level CLI duplicates every endpoint check. Effect instance/group schema and geometry are owned by [Editor and Effects](EDITOR_AND_EFFECTS.md#procedural-scene-effects).

Illustrated and Cinematic use the same level coordinates and gameplay. Cinematic may use optional authored depth and lighting settings; it does not own an alternate route. Voxel likewise projects the existing adventure. Real/Atlas 3D use explicitly mapped assets and route data for supported levels; unsupported levels retain Illustrated fallback. Never infer 3D support from the presence of ordinary 2D artwork or persist 3D lane offsets into the 2D path.

## Validation

Run `npm.cmd run validate:levels` for schema/reference/asset checks after intentional content changes, then applicable audit/report and browser tests described in [Dev Tools](DEV_TOOLS.md). Structural validation is not proof of narrative quality, accurate artistic placement or full runtime behavior. Preserve existing authored content in editor regression fixtures and inspect the final diff.

`challengeArt`, `companion.portrait` and `challengeCharacter.portrait` accept existing level-local files or the portrait of a shared character recognized by the same discovery function used to generate the NPC manifest. Shared characters must have their portrait and discoverable idle frames; arbitrary library files, missing files and directories are not valid portrait references. The validator checks current assets rather than trusting a stale generated manifest. World backgrounds, menu illustrations and reward artwork retain their level-local checks. See [shared character asset regressions](../tests/level-character-assets.spec.js).
