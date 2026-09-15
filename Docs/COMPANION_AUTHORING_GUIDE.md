# Companion Authoring Guide

Atlas ambient/narrative companion dialogue is authored before runtime. The game engine does not generate it.

This guide covers `companionMoments`. Minnie/Moose challenge hints (`hintMinnie`, `hintMoose`) may intentionally teach strategies and explain answers; [Learning Content Rules](ATLAS_LEARNING_CONTENT_RULES.md) owns that separate role. [Level Contract](LEVEL_CONTRACT.md) owns schema and references.

Runtime only receives events, queues authored moments, plays moments, and applies interruption rules. It must never generate companion dialogue.

## Companion Roles

Minnie and Moose are Sven's travel companions. They react to the world as characters, not as UI help.

Minnie:
* curious
* observant
* playful
* notices details
* asks smart questions

Moose:
* calm
* practical
* protective
* dry humor
* notices risks

They are not:
* status narrators
* tutorial systems
* challenge characters
* math teachers
* button-label explainers

Forbidden companion lines:
* walking commentary
* mechanics explanations
* generic praise
* "Sven loopt"
* "Klik op..."
* "Je moet..."

## Allowed Events

The current validator allows these event names:

* `LEVEL_ENTER`
* `OBJECT_FIRST_LOOK`
* `AMBIENT_ATTENTION`
* `AMBIENT_ATTENTION_FIRST`
* `HOTSPOT_ATTENTION_FIRST`
* `LEVEL_PROGRESS_MILESTONE`
* `EXIT_BLOCKED`
* `CHALLENGE_OPEN`
* `CHALLENGE_FAIL_1`
* `CHALLENGE_FAIL_2`
* `CHALLENGE_SUCCESS`
* `PATH_UNLOCKED`
* `ADVENTURE_COMPLETE`
* `COMPANION_CONVERSATION`

## Level Fields

Each level should define `levelSemantics` and `companionMoments`.

Example:

```js
levelSemantics: {
  setting: "vergeten Vikingbos",
  mood: "mysterieus en warm",
  companionFocus: {
    minnie: "glimmende runen en verborgen tekens",
    moose: "oude stenen, veilige routes en poorten"
  }
}
```

Example:

```js
companionMoments: [
  {
    id: "forest-enter",
    event: "LEVEL_ENTER",
    speaker: "minnie",
    text: "Oeh, dit bos bewaart duidelijk een geheim."
  },
  {
    id: "forest-gate-ready",
    event: "PATH_UNLOCKED",
    speaker: "moose",
    text: "Alle runen gloeien. Nu voorzichtig naar de poort.",
    bridge: "Even opletten."
  }
]
```

## References

Use references only when the line is truly about a specific object or challenge.

* `objectId` references `interactiveObjects[].id`
* `challengeId` references `runes[].id`

Example:

```js
{
  id: "sun-open",
  event: "CHALLENGE_OPEN",
  challengeId: "zon",
  speaker: "minnie",
  text: "Die Zonrune voelt warm. Alsof hij wacht op het juiste patroon."
}
```

## Runtime Rules

The runtime:

* does not start new companion dialogue while Sven is walking
* allows existing dialogue to remain visible while Sven moves
* never auto-dismisses dialogue
* advances queued dialogue when the player taps/clicks the Adventure Team Card
* allows higher-priority authored events to interrupt lower-priority moments
* may show an authored bridge line before an interruption, such as "O, wacht..." or "Even opletten."

## Authoring Checklist

For each level:

* write 4-6 companion moments as an editorial target; the validator accepts 4-12
* include at least one `LEVEL_ENTER`
* include one completion-oriented moment, usually `PATH_UNLOCKED` or `ADVENTURE_COMPLETE`
* keep every line short and Dutch
* keep Minnie curious and Moose grounded
* avoid teaching the UI
* avoid repeating what the player can already see
* keep challenge characters separate from Minnie and Moose
