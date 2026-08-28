# Overlap Review

## 0.1.0-dev.12 scope

Four packs are currently active.

**Physical Actions** supports Grapple, Trip, Shove, Reposition, Disarm, Climb, Swim, High Jump, Long Jump, Balance, Tumble Through, Maneuver in Flight, and Squeeze.

**Social Actions** now also supports Perform. Existing coverage supports Deception (Feint, Create a Diversion, Lie, Impersonate), Diplomacy (Make an Impression, Request, Gather Information), and Intimidation (Demoralize, Coerce).

**Subterfuge Actions** supports Stealth (Hide, Sneak, Conceal an Object) and Thievery (Pick a Lock, Disable a Device, Palm an Object, Steal).

**Knowledge & Utility** now also supports skill-based Aid. Existing coverage includes Medicine, Crafting, knowledge, and Survival/exploration actions.

### Critical Forge Core

Critical Forge Core supplies the skill-critical infrastructure but no action-specific consequence cards for these actions. Skillful Consequences therefore occupies the `skillCheckCriticalSuccess` / `skillCheckCriticalFailure` space without replacing Core content.

Critical Forge also controls card visibility. This matters for Gather Information, Hide, Sneak, and Conceal an Object because their hidden or secret resolution can be compromised if the consequence card exposes the degree of success. Current Stealth cards are all tagged `secret-check` and `gm-facing`, and GM Blind visibility is recommended.

### Goblin Engineering

Goblin Engineering's skill cards are equipment-centered and already touch Pick a Lock, Disable a Device, Crafting, Repair, and Medicine. The Thievery block intentionally shares the `pick-a-lock` and `disable-a-device` action filters with Goblin Engineering Equipment Incidents, so the content boundary is semantic rather than filter-based.

The design distinction remains explicit: Skillful Consequences asks what the **action and its aftermath** create. Goblin Engineering asks what the **equipment** decides to do about the situation.

In dev.8 that distinction is enforced directly. Skillful Consequences Pick a Lock cards focus on the lock, evidence, learned mechanism, or future access. Disable a Device cards focus on trigger sequences, visible tampering, inspection, and what the triggered device reveals. Goblin Engineering remains about picks, cases, gauges, probes, lamps, organizers, and other equipment behaving strangely.

### Martial Consequences and attack-oriented expansions

Martial Consequences, Ranged Mishaps, Arsenal, Arcane Backlash, and other attack packs operate on Strike or spell-attack criticals. Some skill cards can create brief follow-up advantages, but the Skillful Consequences card is still triggered by the skill check itself and never replaces an attack critical result.

## Stealth design separation

- **Hide** focuses on blind spots, cover, concealment, observers, and setting up a later Sneak.
- **Sneak** focuses on routes, movement rhythm, traces, direction, teamwork, and setting up a later Hide.
- **Conceal an Object** focuses on hiding opportunities, search misdirection, observer habits, and suspicious hiding places.
- None of the cards grant additional hidden/undetected states beyond the normal PF2e result.
- Critical-failure cards do not add extra automatic detection beyond the normal result.
- All current Stealth cards are GM-facing so a visible card does not need to reveal a secret check's outcome.

## Thievery design separation

- **Pick a Lock** focuses on the lock itself, evidence of tampering, remembered mechanisms, and the aftermath of the normal broken-tool result.
- **Disable a Device** focuses on trigger sequences, inspection, reset knowledge, visible tampering, and information exposed when a device triggers. Critical-failure additions remain light because the PF2e result can already trigger a hazard.
- **Palm an Object** focuses on observer attention, hand movement, teamwork, and short-lived sleight-of-hand momentum.
- **Steal** focuses on the bearer, carried containers, concealment follow-through, and behavioral tells after a failed attempt.
- No Thievery card creates equipment malfunctions, strange tool behavior, or repairs broken thieves' tools. Those remain Goblin Engineering themes.

## Existing social design separation

- **Feint** focuses on read guards, shared openings, positional pivots, exposed tells, and attention drawn by a failed combat deception.
- **Create a Diversion** focuses on shared distractions, transitions into Hide/Sneak, and what observers fixate on when the distraction collapses.
- **Lie** focuses on maintaining a story, shared credibility, secondary conclusions, contradictions, and spreading suspicion.
- **Impersonate** focuses on maintaining an assumed identity, learning small contextual details from a convincing performance, and identifying the concrete detail that exposed a failed impersonation.
- **Make an Impression** adds social momentum, shared access, and observable conversational tells without changing PF2e attitude steps.
- **Request** adds useful details, teamwork, and consequences of revealing what the requester needs without forcing extra compliance.
- **Gather Information** adds leads, contacts, rumor structure, and GM-facing complications without revealing false information as false.
- **Demoralize** adds intimidation momentum, behavioral tells, and follow-through into Coerce without adding more frightened values.
- **Coerce** adds useful specifics, witnessed reputation, and defiance consequences without changing the target's normal PF2e attitude outcome or duration.

All cards resolve the normal PF2e critical success or critical failure first.


## Medicine & Crafting I

The Knowledge & Utility pack now supports **Treat Wounds**, **Administer First Aid**, **Treat Disease**, **Treat Poison**, **Repair**, and **Craft**. Every card uses `skillCheckCriticalSuccess` or `skillCheckCriticalFailure` with an exact action slug and the corresponding Medicine or Crafting skill filter.

The main neighboring expansion is **Goblin Engineering**, especially Equipment Incidents. The separation is explicit:

- Skillful Consequences focuses on patient response, diagnosis, treatment timing, damage patterns, repair understanding, manufacturing process, and lessons carried into a later attempt.
- Goblin Engineering focuses on healer's tools, repair kits, gauges, trays, locks, and other equipment behaving unpredictably.
- No current Medicine or Crafting card in Skillful Consequences is tagged `equipment`, `toolkit`, or `malfunction`.
- **Repair** cards concern the damaged item being repaired, not the repair kit.
- **Craft** cards concern process knowledge, formula repetition, and visible failure points, not runaway workshop devices.

Critical failures in Medicine can already be dangerous, so the added consequences stay light or narrative. Critical failures in Crafting retain all normal material and downtime costs before any additional card text is applied.


## Knowledge Actions I

The dev.10 block adds Recall Knowledge, Identify Magic, Identify Alchemy, and Decipher Writing. These cards remain distinct from Critical Forge Core because Core supplies the skill-critical trigger and matching infrastructure, while Skillful Consequences supplies action-specific follow-through.

The knowledge block also avoids Goblin Engineering's equipment-centered identity. Identify Alchemy cards concern interpretation, batch/process clues, and misidentification rather than tools or apparatus malfunctioning. Identify Magic does not duplicate Arcane Backlash because it reacts to a skill check used to understand magic, not to casting or spell-attack failures.

All four supported knowledge actions are secret checks. Failure cards are GM-facing narrative consequences that preserve PF2e misinformation, misidentification, or mistaken interpretation without revealing the hidden degree of success.

Supported actions in this block: Recall Knowledge, Identify Magic, Identify Alchemy, Decipher Writing.


### Survival & exploration boundary

`0.1.0-dev.11` adds Track, Sense Direction, Subsist, and Cover Tracks to Knowledge & Utility. These cards remain action-centered: they modify follow-up tracking/navigation/subsistence attempts, expose plausible environmental information, or add narrative evidence and misdirection. They do not create weather, travel, or resource-generation subsystems of their own.

Sense Direction is treated as a GM-facing secret check so a critical-failure card never exposes a hidden wrong bearing. Subsist deliberately accepts both Survival and Society because PF2e presents it as a generic multi-skill action.

The block remains distinct from **Goblin Engineering** because no card introduces malfunctioning compasses, survival kits, tools, or other equipment incidents.

## dev.12 Performance and Aid boundary

**Perform** stays in Social Actions and focuses on audience response, follow-up performances, teamwork between performers, and remembered fictional details. It does not silently alter attitudes or duplicate Make an Impression.

**Aid** stays in Knowledge & Utility and matches the `aid` action without a fixed `skillTypes` filter. This is intentional: the consequences describe coordination and handoff quality rather than the subject matter of the skill used to help. The normal Aid critical-success bonus or critical-failure penalty is always resolved first.

