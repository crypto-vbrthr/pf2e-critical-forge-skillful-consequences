# PF2E Critical Forge: Skillful Consequences

Version **0.1.0**

Skillful Consequences is an action-focused card expansion for **PF2E Critical Forge**. It adds additional consequences to critical successes and critical failures on selected Pathfinder 2e skill actions.

The design goal is not to replace or rewrite the PF2e result. Every card starts from the same rule:

> Resolve the normal PF2e critical success or critical failure first. The card then adds a short tactical or narrative consequence.

This makes the deck suitable for actions whose critical result already matters, while still giving repeated rolls more texture than a single generic success or failure card.


## Part of the Forge Suite

**Critical Forge: Skillful Consequences** is part of the **Forge Suite**, a growing collection of Foundry VTT modules and add-ons built for the busy Game Master. The suite is designed to reduce preparation and bookkeeping, make common GM tasks easier, and add useful tools that help make running and playing campaigns smoother and more enjoyable.

An overview of the Forge Suite, its modules, add-ons, and shared documentation is available here:

**Forge Suite:** https://github.com/crypto-vbrthr/pf2e-forge-suite


## Current content

`0.1.0` contains **218 cards** across four active packs. The stable catalog is unchanged from the completed dev.14 density baseline and the rc.1 integration candidate.

### Physical Actions - 56 cards

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
- Force Open: 2 + 2

Acrobatics:

- Balance: 2 + 2
- Tumble Through: 3 + 3
- Maneuver in Flight: 2 + 2
- Squeeze: 1 + 1

### Social Actions - 50 cards

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

Performance:

- Perform: 3 critical-success + 3 critical-failure cards

### Subterfuge Actions - 38 cards

Stealth:

- Hide: 3 critical-success + 3 critical-failure cards
- Sneak: 3 + 3
- Conceal an Object: 2 + 2

Thievery:

- Pick a Lock: 2 critical-success + 2 critical-failure cards
- Disable a Device: 3 + 3
- Palm an Object: 2 + 2
- Steal: 2 + 2

Society:

- Create Forgery: 2 critical-success + 2 critical-failure cards (GM-facing secret check)

The Subterfuge pack now covers both stealth and practical larceny. Stealth cards emphasize routes, cover, shared blind spots, traces, observer awareness, and follow-through between Hide and Sneak. Thievery cards focus on locks, device sequences, witnesses, carried objects, and the aftermath of successful or failed manipulation rather than on malfunctioning equipment.

### Knowledge & Utility - 74 cards

Medicine:

- Treat Wounds: 2 critical-success + 2 critical-failure cards
- Administer First Aid: 2 + 2
- Treat Disease: 1 + 1
- Treat Poison: 1 + 1

Crafting:

- Repair: 2 critical-success + 2 critical-failure cards
- Craft: 2 + 2

Knowledge actions:

- Recall Knowledge: 3 critical-success + 3 critical-failure cards
- Identify Magic: 2 + 2
- Identify Alchemy: 2 + 2
- Decipher Writing: 2 + 2

Survival and exploration-facing skill actions:

- Track: 3 critical-success + 3 critical-failure cards
- Sense Direction: 2 + 2
- Subsist: 2 + 2 (supports both Survival and Society variants)
- Cover Tracks: 2 + 2

General utility:

- Aid: 3 critical-success + 3 critical-failure cards
- Command an Animal: 2 + 2
- Learn a Spell: 2 + 2
- Earn Income: 2 + 2

The Knowledge & Utility pack now combines treatment follow-through, repair and crafting process knowledge, secret knowledge-action consequences, Survival/exploration follow-through, and general cooperative utility through Aid. Recall Knowledge, Identify Magic, Identify Alchemy, and Decipher Writing are all written as GM-facing secret-check content so a card never needs to announce that a hidden conclusion or identification was wrong. Critical failures add texture to misinformation or misidentification rather than exposing it.

**Hide, Sneak, and Conceal an Object use secret checks.** All current Stealth cards are tagged `secret-check` and `gm-facing`. Critical Forge defaults to GM Blind card visibility; a GM-only visibility mode is strongly recommended so a card does not expose the hidden degree of success. Short modifiers can be tracked by the GM and applied to later secret checks without announcing why.

**Lie, Impersonate, and Gather Information are secret-check content.** Every card for all three actions is tagged `secret-check` and `gm-facing` so consequence presentation can remain GM-facing.

**Recall Knowledge, Identify Magic, Identify Alchemy, and Decipher Writing are secret checks as well.** Every card for those actions is tagged `secret-check` and `gm-facing`. Their critical-failure cards never state the true answer or otherwise reveal that the normal hidden result was erroneous.

**Sense Direction is a secret check.** All Sense Direction cards are tagged `secret-check` and `gm-facing`; its critical-failure cards remain narrative so a visible consequence never needs to reveal that the hidden bearing was wrong.

**Subsist can use Survival or Society.** The four Subsist cards intentionally match both skill types so the same action receives a consistent consequence deck in wilderness and settlement contexts.

**Perform uses Performance and Aid is skill-agnostic.** Perform lives in Social Actions and receives a full 3 + 3 mini-deck. Aid lives in Knowledge & Utility and intentionally leaves `skillTypes` empty so any skill-based Aid check can receive the same cooperation-focused consequences.
**Create Forgery is a secret check.** All four cards are GM-facing. Its critical-success cards can make a forgery more resilient to later examination, while critical-failure cards add flaws or suspicious conventions without revealing the hidden degree of success.

**Learn a Spell follows all normal material and retry rules.** Its cards add follow-up understanding or a short-lived misconception but never refund materials, reduce learning time, grant the spell on failure, or remove the normal restriction on trying again.

**Command an Animal only applies when PF2e actually rolls a Nature check.** Animal companions and other cases that automatically bypass the normal Command an Animal check do not create a skill critical for this deck.

**Earn Income is action-first and skill-agnostic.** PF2e can use Crafting, Lore, Performance, and in some circumstances other skills for Earn Income, so these four cards intentionally do not restrict `skillTypes`.


## Planned action density

Skillful Consequences is action-density driven rather than built around a fixed final card count. Density reflects both expected table frequency and how much safe consequence space remains after the normal PF2e critical result.

- Frequent actions receive 3 critical-success and 3 critical-failure cards.
- Regular actions receive 2 + 2 cards.
- Narrow but worthwhile actions receive 1 + 1 card.
- Actions are only expanded when their critical result can support distinct follow-through without padding.

The dev.14 completeness review remains the stable content baseline: **14 frequent**, **31 regular**, and **5 narrow** actions across **50 supported action slugs**, for **218 cards** total. See `docs/ACTION_COMPLETENESS_DENSITY_REVIEW.md` for the full tier list and deliberate completeness boundaries.

## Critical Forge requirements

Skillful Consequences requires:

- Foundry VTT 14
- Pathfinder 2e 8.1.2 or newer
- PF2E Critical Forge 1.0.1-rc.6.1 or newer
- Critical Forge public API 0.9.7 or newer
- `cards.skillCheckCriticals`

Critical Forge's **Skill Check Critical Success** and/or **Skill Check Critical Failure** automation settings must be enabled for automatic or prompted draws.

## Stable release integration status

`0.1.0` promotes the successfully smoke-tested rc.1 catalog unchanged. The release candidate was validated directly against **PF2E Critical Forge 1.0.1-rc.6.1**. The review registered all four packs through the real extension contract, verified all 218 cards, exercised all 50 supported action slugs across 132 representative skill/action/category contexts, and tested pack disable/re-enable refresh behavior. No card-content or density changes were required. The stable add-on suite passes **56 / 56 tests**, while the supplied Critical Forge baseline passes **355 / 355**.

The current Critical Forge baseline defaults card visibility to **GM Blind**, which is safe for secret-check cards. The `secret-check` and `gm-facing` tags are content metadata rather than a per-card visibility override, so worlds that deliberately switch Critical Forge visibility to `public` or `self` should change it back to **GM Blind** or **GM Only** when using secret skill consequences.

Borrow an Arcane Spell remains intentionally outside the stable catalog. The current normalizer handles `Borrow an Arcane Spell`, `borrowAnArcaneSpell`, and `borrow-an-arcane-spell`, but the compact `borrowanarcanespell` representation does not canonicalize yet.

## Pack settings

The module reserves four thematic packs:

- Physical Actions
- Social Actions
- Subterfuge Actions
- Knowledge & Utility

Only packs that currently contain cards appear in Foundry's module settings. In the stable release, **Physical Actions**, **Social Actions**, **Subterfuge Actions**, and **Knowledge & Utility** are visible and enabled by default.

## Design boundaries

- Normal PF2e critical outcomes are never canceled.
- The cards avoid replacing the base degree-of-success rules.
- Repeated numeric modifiers are kept small and short-lived.
- Narrative cards remain part of the mix so every draw does not become another modifier.
- Action filters are specific. A Hide card cannot appear for a generic Stealth check or a Sneak.
- Secret actions are written so card presentation does not need to expose the hidden degree of success.
- Social cards do not automatically change NPC attitudes, create conditions, or reveal knowledge an observer could not plausibly possess.
- Equipment-centered failures remain the domain of Goblin Engineering where appropriate.

See `docs/CARD_ROADMAP.md`, `docs/ACTION_COMPLETENESS_DENSITY_REVIEW.md`, `docs/FINAL_INTEGRATION_REVIEW.md`, and `docs/DESIGN_GUIDE.md` for the development plan and review baselines.
