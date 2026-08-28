# Overlap Review

## 0.1.0-dev.4 scope

The Physical Actions pack supports **Grapple, Trip, Shove, Reposition, Disarm, Climb, Swim, High Jump, Long Jump, Balance, Tumble Through, Maneuver in Flight, and Squeeze** through Athletics and Acrobatics skill-check criticals.

### Critical Forge Core

Critical Forge Core supplies the skill-critical infrastructure but no action-specific Athletics or Acrobatics consequence cards for these actions. Skillful Consequences therefore occupies the `skillCheckCriticalSuccess` / `skillCheckCriticalFailure` space without replacing Core content.

### Goblin Engineering

Goblin Engineering's skill cards are equipment-centered and target Crafting, Thievery, and Medicine actions such as Repair, Craft, Pick a Lock, Disable a Device, and medical treatment. The current Physical Actions block has no action-filter overlap with those cards.

Disarm can involve a held item, but its cards focus on combat leverage, follow-up pressure, and where an already-dropped item ends up. They do not portray the item itself as malfunctioning.

### Martial Consequences and attack packs

The supported Athletics and Acrobatics actions are skill checks rather than Strike criticals. Skillful Consequences does not reuse weapon-fumble themes such as lost grip, firing rhythm, weapon malfunction, or attack-roll mishaps.

## Design separation inside the block

- **Grapple** focuses on leverage, clinch commitment, follow-up holds, and teamwork around a controlled target.
- **Trip** focuses on footing, follow-through, recovery, and ground-position advantage.
- **Shove** focuses on forced-movement momentum, broken lines, and exposure to counterforce.
- **Reposition** focuses on controlled placement, rotational leverage, stance recovery, and positional follow-through.
- **Disarm** focuses on grip control, follow-up pressure, and placement of an item already dropped by the normal critical result.
- **Climb** focuses on route reading, handholds, grip recovery, and information exposed by a failed route.
- **Swim** focuses on stroke efficiency, following a wake, controlled recovery, and conspicuous disturbance of the water.
- **High Jump** and **Long Jump** stay deliberately narrow; their critical-failure additions are narrative because the base outcome can already be severe.
- **Balance** focuses on stable rhythm, shared footing, and information revealed by a fall without adding another severe consequence.
- **Tumble Through** focuses on exit angles, preserved momentum, teamwork through the same opening, and brief loss of footwork or reactions.
- **Maneuver in Flight** focuses on reading airflow, establishing a route for another flyer, and recovery from failed control inputs. Its failure cards stay restrained because PF2e already lets the GM assign hazardous consequences.
- **Squeeze** stays exploration-focused, rewarding a discovered body angle or turning a stuck result into useful fictional information without worsening the base critical failure.

All cards deliberately resolve the normal PF2e critical success or critical failure first.
