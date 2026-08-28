# Overlap Review

## 0.1.0-dev.6 scope

Two packs are currently active.

**Physical Actions** supports Grapple, Trip, Shove, Reposition, Disarm, Climb, Swim, High Jump, Long Jump, Balance, Tumble Through, Maneuver in Flight, and Squeeze.

**Social Actions** supports Deception (Feint, Create a Diversion, Lie, Impersonate), Diplomacy (Make an Impression, Request, Gather Information), and Intimidation (Demoralize, Coerce).

### Critical Forge Core

Critical Forge Core supplies the skill-critical infrastructure but no action-specific consequence cards for these actions. Skillful Consequences therefore occupies the `skillCheckCriticalSuccess` / `skillCheckCriticalFailure` space without replacing Core content.

Critical Forge also controls card visibility. This matters for Gather Information because the PF2e action has the Secret trait. Its critical-failure cards are written as GM-facing narrative consequences and should remain hidden when the roll itself is hidden.

### Goblin Engineering

Goblin Engineering's skill cards are equipment-centered and target Crafting, Thievery, and Medicine actions. The current Social Actions block has no action-filter overlap with Goblin Engineering.

The design distinction remains explicit: Skillful Consequences asks what the **action and its aftermath** create. Goblin Engineering asks what the **equipment** decides to do about the situation.

### Attack-oriented expansions

Martial Consequences, Ranged Mishaps, Arsenal, Arcane Backlash, and other attack packs operate on Strike or spell-attack criticals. Feint and Demoralize can influence later combat rolls, but the Skillful Consequences card is still triggered by the skill check itself and never replaces an attack critical result.

## Social design separation

- **Feint** focuses on read guards, shared openings, positional pivots, exposed tells, and attention drawn by a failed combat deception.
- **Create a Diversion** focuses on shared distractions, transitions into Hide/Sneak, and what observers fixate on when the distraction collapses.
- **Lie** focuses on maintaining a story, shared credibility, secondary conclusions, contradictions, and spreading suspicion. Cards do not automatically change attitudes or force an NPC to believe information beyond the normal PF2e result.
- **Impersonate** focuses on maintaining an assumed identity, learning small contextual details from a convincing performance, and identifying the concrete detail that exposed a failed impersonation.
- **Make an Impression** adds social momentum, shared access, and observable conversational tells without changing the attitude steps produced by the core action.
- **Request** adds useful details, teamwork, and consequences of revealing what the requester needs without forcing extra compliance.
- **Gather Information** adds leads, contacts, rumor structure, and GM-facing complications. Its critical-failure cards never reveal to the player that the gathered information is incorrect.
- **Demoralize** adds intimidation momentum, behavioral tells, and follow-through into Coerce without adding more frightened values.
- **Coerce** adds useful specifics, witnessed reputation, and defiance consequences without changing the target's normal PF2e attitude outcome or duration.

All cards resolve the normal PF2e critical success or critical failure first.
