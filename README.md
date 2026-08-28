# PF2E Critical Forge: Skillful Consequences

Version **0.1.0-dev.7**

Skillful Consequences is an action-focused card expansion for **PF2E Critical Forge**. It adds additional consequences to critical successes and critical failures on selected Pathfinder 2e skill actions.

The design goal is not to replace or rewrite the PF2e result. Every card starts from the same rule:

> Resolve the normal PF2e critical success or critical failure first. The card then adds a short tactical or narrative consequence.

This makes the deck suitable for actions whose critical result already matters, while still giving repeated rolls more texture than a single generic success or failure card.

## Current content

`0.1.0-dev.7` contains **112 cards** across three active packs.

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

### Subterfuge Actions - 16 cards

Stealth:

- Hide: 3 critical-success + 3 critical-failure cards
- Sneak: 3 + 3
- Conceal an Object: 2 + 2

The first Subterfuge block emphasizes routes, cover, shared blind spots, traces, observer awareness, and follow-through between Hide and Sneak. It does not add extra detection beyond PF2e's normal result and it does not turn a failed secret check into public information.

**Hide, Sneak, and Conceal an Object use secret checks.** All current Stealth cards are tagged `secret-check` and `gm-facing`. Critical Forge defaults to GM Blind card visibility; a GM-only visibility mode is strongly recommended so a card does not expose the hidden degree of success. Short modifiers can be tracked by the GM and applied to later secret checks without announcing why.

**Gather Information is also a Secret action.** Its critical-failure cards are deliberately GM-facing and tagged `secret-check` for the same reason.

## Planned action density

Skillful Consequences is action-density driven rather than built around a fixed final card count.

- Frequent actions should normally receive 3 critical-success and 3 critical-failure cards.
- Regular actions should normally receive at least 2 + 2 cards.
- Narrow but worthwhile actions should receive at least 1 + 1 card.
- Actions are only added when their critical result can support a meaningful additional consequence.

Planned families include Thievery, Medicine, Crafting, knowledge actions, Survival, Performance, and selected utility actions.

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

Only packs that currently contain cards appear in Foundry's module settings. In this development release, **Physical Actions**, **Social Actions**, and **Subterfuge Actions** are visible and enabled by default.

## Design boundaries

- Normal PF2e critical outcomes are never canceled.
- The cards avoid replacing the base degree-of-success rules.
- Repeated numeric modifiers are kept small and short-lived.
- Narrative cards remain part of the mix so every draw does not become another modifier.
- Action filters are specific. A Hide card cannot appear for a generic Stealth check or a Sneak.
- Secret actions are written so card presentation does not need to expose the hidden degree of success.
- Social cards do not automatically change NPC attitudes, create conditions, or reveal knowledge an observer could not plausibly possess.
- Equipment-centered failures remain the domain of Goblin Engineering where appropriate.

See `docs/CARD_ROADMAP.md` and `docs/DESIGN_GUIDE.md` for the development plan.
