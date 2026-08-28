# Overlap Review

## 0.1.0-dev.7 scope

Three packs are currently active.

**Physical Actions** supports Grapple, Trip, Shove, Reposition, Disarm, Climb, Swim, High Jump, Long Jump, Balance, Tumble Through, Maneuver in Flight, and Squeeze.

**Social Actions** supports Deception (Feint, Create a Diversion, Lie, Impersonate), Diplomacy (Make an Impression, Request, Gather Information), and Intimidation (Demoralize, Coerce).

**Subterfuge Actions** now supports Stealth (Hide, Sneak, Conceal an Object). Thievery remains planned for a later block.

### Critical Forge Core

Critical Forge Core supplies the skill-critical infrastructure but no action-specific consequence cards for these actions. Skillful Consequences therefore occupies the `skillCheckCriticalSuccess` / `skillCheckCriticalFailure` space without replacing Core content.

Critical Forge also controls card visibility. This matters for Gather Information, Hide, Sneak, and Conceal an Object because their hidden or secret resolution can be compromised if the consequence card exposes the degree of success. Current Stealth cards are all tagged `secret-check` and `gm-facing`, and GM Blind visibility is recommended.

### Goblin Engineering

Goblin Engineering's skill cards are equipment-centered and already touch Pick a Lock, Disable a Device, Crafting, Repair, and Medicine. The current Stealth block has no action-filter overlap with Goblin Engineering.

The design distinction remains explicit: Skillful Consequences asks what the **action and its aftermath** create. Goblin Engineering asks what the **equipment** decides to do about the situation.

This distinction will matter even more when Thievery is added. A future Skillful Consequences Pick a Lock card should focus on the lock, timing, discovered mechanism, access, noise, or tactical aftermath, while Goblin Engineering remains about picks, cases, gauges, or other equipment behaving strangely.

### Martial Consequences and attack-oriented expansions

Martial Consequences, Ranged Mishaps, Arsenal, Arcane Backlash, and other attack packs operate on Strike or spell-attack criticals. Some skill cards can create brief follow-up advantages, but the Skillful Consequences card is still triggered by the skill check itself and never replaces an attack critical result.

## Stealth design separation

- **Hide** focuses on blind spots, cover, concealment, observers, and setting up a later Sneak.
- **Sneak** focuses on routes, movement rhythm, traces, direction, teamwork, and setting up a later Hide.
- **Conceal an Object** focuses on hiding opportunities, search misdirection, observer habits, and suspicious hiding places.
- None of the cards grant additional hidden/undetected states beyond the normal PF2e result.
- Critical-failure cards do not add extra automatic detection beyond the normal result.
- All current Stealth cards are GM-facing so a visible card does not need to reveal a secret check's outcome.

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
