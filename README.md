# PF2E Critical Forge: Skillful Consequences

Version **0.1.0-dev.3**

Skillful Consequences is an action-focused card expansion for **PF2E Critical Forge**. It adds additional consequences to critical successes and critical failures on selected Pathfinder 2e skill actions.

The design goal is not to replace or rewrite the PF2e result. Every card starts from the same rule:

> Resolve the normal PF2e critical success or critical failure first. The card then adds a short tactical or narrative consequence.

This makes the deck suitable for actions whose critical result already matters, while still giving repeated rolls more texture than a single generic success or failure card.

## Current content

`0.1.0-dev.3` expands the **Physical Actions** pack to **36 Athletics cards**:

- Grapple: 3 critical-success cards and 3 critical-failure cards
- Trip: 3 critical-success cards and 3 critical-failure cards
- Shove: 2 critical-success cards and 2 critical-failure cards
- Reposition: 2 critical-success cards and 2 critical-failure cards
- Disarm: 2 critical-success cards and 2 critical-failure cards
- Climb: 2 critical-success cards and 2 critical-failure cards
- Swim: 2 critical-success cards and 2 critical-failure cards
- High Jump: 1 critical-success card and 1 critical-failure card
- Long Jump: 1 critical-success card and 1 critical-failure card

Frequent actions retain a six-card mini-deck. Regular actions begin with a four-card mini-deck so that every supported action already has multiple possible results on both sides of the degree-of-success line.

## Planned action density

Skillful Consequences is action-density driven rather than built around a fixed final card count.

- Frequent actions should normally receive 3 critical-success and 3 critical-failure cards.
- Regular actions should normally receive at least 2 + 2 cards.
- Narrow but worthwhile actions should receive at least 1 + 1 card.
- Actions are only added when their critical result can support a meaningful additional consequence.

Planned families include Acrobatics, Deception, Diplomacy, Intimidation, Performance, Stealth, Thievery, Medicine, Crafting, knowledge actions, Survival, and selected utility actions.

## Critical Forge requirements

Skillful Consequences requires:

- Foundry VTT 14
- Pathfinder 2e 8.1.2 or newer
- PF2E Critical Forge 1.0.1-rc.6.1 or newer
- Critical Forge public API 0.9.7 or newer
- `cards.skillCheckCriticals`

Critical Forge's **Skill Check Critical Success** and/or **Skill Check Critical Failure** automation settings must be enabled for automatic or prompted draws.

## Pack settings

The module reserves four thematic packs:

- Physical Actions
- Social Actions
- Subterfuge Actions
- Knowledge & Utility

Only packs that currently contain cards appear in Foundry's module settings. In this development release, only **Physical Actions** is visible and enabled by default.

## Design boundaries

- Normal PF2e critical outcomes are never canceled.
- The cards avoid replacing the base degree-of-success rules.
- Repeated numeric modifiers are kept small and short-lived.
- Narrative cards remain part of the mix so every draw does not become another modifier.
- Action filters are specific. A Shove or Disarm card cannot appear for an unrelated Athletics check.
- Equipment-centered failures remain the domain of Goblin Engineering where appropriate.

See `docs/CARD_ROADMAP.md` and `docs/DESIGN_GUIDE.md` for the development plan.
