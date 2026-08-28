# PF2E Critical Forge: Skillful Consequences

Version **0.1.0-dev.6**

Skillful Consequences is an action-focused card expansion for **PF2E Critical Forge**. It adds additional consequences to critical successes and critical failures on selected Pathfinder 2e skill actions.

The design goal is not to replace or rewrite the PF2e result. Every card starts from the same rule:

> Resolve the normal PF2e critical success or critical failure first. The card then adds a short tactical or narrative consequence.

This makes the deck suitable for actions whose critical result already matters, while still giving repeated rolls more texture than a single generic success or failure card.

## Current content

`0.1.0-dev.6` contains **96 cards** across two active packs.

### Physical Actions - 52 cards

Athletics:

- Grapple: 3 critical-success + 3 critical-failure cards
- Trip: 3 + 3
- Shove: 2 + 2
- Reposition: 2 + 2
- Disarm: 2 + 2
- Climb: 2 + 2
- Swim: 2 + 2
- High Jump: 1 + 1
- Long Jump: 1 + 1

Acrobatics:

- Balance: 2 + 2
- Tumble Through: 3 + 3
- Maneuver in Flight: 2 + 2
- Squeeze: 1 + 1

### Social Actions - 44 cards

Deception:

- Feint: 3 critical-success + 3 critical-failure cards
- Create a Diversion: 2 + 2
- Lie: 3 + 3
- Impersonate: 2 + 2

Diplomacy:

- Make an Impression: 2 + 2
- Request: 2 + 2
- Gather Information: 3 + 3

Intimidation:

- Demoralize: 3 + 3
- Coerce: 2 + 2

The Social Actions pack now covers Deception, Diplomacy, and Intimidation. Frequent actions such as Feint, Lie, Gather Information, and Demoralize receive six-card mini-decks, while the regular social actions receive four cards each. The consequences emphasize conversational momentum, observers, useful follow-up, revealed priorities, rumors, fear, and reputation without replacing the normal degree-of-success result.

**Gather Information is a Secret action.** Its critical-failure cards are deliberately GM-facing and tagged `secret-check`. Critical Forge defaults to GM Blind card visibility; keeping a GM-only visibility mode is recommended whenever a secret action could otherwise reveal the hidden degree of success.

## Planned action density

Skillful Consequences is action-density driven rather than built around a fixed final card count.

- Frequent actions should normally receive 3 critical-success and 3 critical-failure cards.
- Regular actions should normally receive at least 2 + 2 cards.
- Narrow but worthwhile actions should receive at least 1 + 1 card.
- Actions are only added when their critical result can support a meaningful additional consequence.

Planned families include Diplomacy, Intimidation, Performance, Stealth, Thievery, Medicine, Crafting, knowledge actions, Survival, and selected utility actions.

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

Only packs that currently contain cards appear in Foundry's module settings. In this development release, **Physical Actions** and **Social Actions** are visible and enabled by default.

## Design boundaries

- Normal PF2e critical outcomes are never canceled.
- The cards avoid replacing the base degree-of-success rules.
- Repeated numeric modifiers are kept small and short-lived.
- Narrative cards remain part of the mix so every draw does not become another modifier.
- Action filters are specific. A Feint card cannot appear for a generic Deception check or a Lie.
- Social cards do not automatically change NPC attitudes, create conditions, or reveal knowledge an observer could not plausibly possess.
- Equipment-centered failures remain the domain of Goblin Engineering where appropriate.

See `docs/CARD_ROADMAP.md` and `docs/DESIGN_GUIDE.md` for the development plan.
