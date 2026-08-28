# Action Completeness & Density Review

Review target: **PF2E Critical Forge: Skillful Consequences 0.1.0-dev.14**

## Executive verdict

**PASS. No card-count increase is recommended.**

The current module contains **218 cards** across **50 supported action slugs**. Every currently supported action has symmetrical critical-success and critical-failure coverage, and every action meets its reviewed density tier.

The review classifies the current surface as:

- **14 frequent actions** at 3 critical-success + 3 critical-failure cards each: 84 cards.
- **31 regular actions** at 2 + 2 each: 124 cards.
- **5 narrow but useful actions** at 1 + 1 each: 10 cards.
- **Total: 218 cards.**

The action-density model is therefore retained unchanged.

## Completeness boundary

### Complete for the current Critical Forge skill-check surface

Skillful Consequences now covers the action slugs that Critical Forge can currently normalize reliably and that fit the module's skill-check scope.

Two Player Core utility actions remain deliberately outside this expansion:

- **Seek** uses Perception rather than a skill check.
- **Sense Motive** uses a secret Perception check rather than a skill check.

They belong to a future Perception-critical surface rather than to Skillful Consequences.

### Infrastructure-blocked action

**Borrow an Arcane Spell** remains the one legitimate skill use identified by the review that is not yet safe to ship here. It is an Arcana exploration activity, but Critical Forge does not currently normalize its action slug reliably enough for exact card matching. It should be added only after the core exposes a stable canonical slug in PF2e chat context.

This is an infrastructure boundary, not a missing-card oversight.

## Density model

Density is based on two factors rather than raw table frequency alone:

1. **How often the action is expected to generate critical checks in play.**
2. **How much safe consequence bandwidth remains after the normal PF2e critical result has already resolved.**

An action can therefore be common at the table and still remain a regular 2 + 2 mini-deck if additional consequences would quickly become repetitive, intrusive, or stronger than the base result warrants.

### Frequent: 3 + 3

- Aid
- Demoralize
- Disable a Device
- Feint
- Gather Information
- Grapple
- Hide
- Lie
- Perform
- Recall Knowledge
- Sneak
- Track
- Trip
- Tumble Through

These actions either occur frequently, support several distinct aftermath patterns, or have enough tactical/narrative breadth to sustain six cards without padding.

### Regular: 2 + 2

- Administer First Aid
- Balance
- Climb
- Coerce
- Command an Animal
- Conceal an Object
- Cover Tracks
- Craft
- Create a Diversion
- Create Forgery
- Decipher Writing
- Disarm
- Earn Income
- Force Open
- Identify Alchemy
- Identify Magic
- Impersonate
- Learn a Spell
- Make an Impression
- Maneuver in Flight
- Palm an Object
- Pick a Lock
- Repair
- Reposition
- Request
- Sense Direction
- Shove
- Steal
- Subsist
- Swim
- Treat Wounds

These actions have useful consequence space, but four cards are sufficient to avoid repetition or over-amplifying a critical result.

### Narrow but useful: 1 + 1

- High Jump
- Long Jump
- Squeeze
- Treat Disease
- Treat Poison

Each still benefits from action-specific texture, but expanding them further would presently create more repetition than value.

## Borderline density decisions

### Treat Wounds remains regular

Treat Wounds is common in many campaigns, but its normal critical result is already substantial and the action has strong feat and immunity interactions. Extra cards should not become a parallel healing subsystem. The current 2 + 2 set provides follow-up and narrative texture without crowding the base Medicine rules.

### Pick a Lock remains regular

Pick a Lock can involve repeated checks, but the safe aftermath space is comparatively narrow: progress, evidence, mechanism knowledge, and the normal broken-tool consequences. A 3 + 3 deck would risk repeating the same ideas or drifting into equipment-malfunction territory reserved for Goblin Engineering.

### Create a Diversion remains regular

The normal action already carries observer-specific tactical consequences and often sits inside Hide/Sneak sequences. Four cards are enough to provide teamwork and follow-through without layering too much additional Stealth machinery onto one Deception check.

### Command an Animal remains regular

The action only produces a relevant skill critical when PF2e actually calls for the Nature check. Cases that bypass the check do not trigger this deck. Its 2 + 2 density is therefore appropriate even though animal-focused characters may use the action often.

### Aid and Perform remain frequent

Aid is deliberately skill-agnostic and can represent a very broad range of fictional assistance, giving it unusually large consequence bandwidth. Perform likewise spans many performance types, audiences, and narrative contexts. Both can sustain 3 + 3 without needing duplicate mechanics.

## Secret-check presentation review

The review found one real presentation hardening issue: the social secret-check surface was inconsistent.

- **Lie** was not tagged as a secret check.
- **Impersonate** was not tagged as a secret check.
- **Gather Information** had `secret-check` on all cards, but only its critical-failure cards were explicitly `gm-facing`.

In dev.14, every card for **Lie**, **Impersonate**, and **Gather Information** is tagged both `secret-check` and `gm-facing`. This aligns them with the existing treatment of secret Stealth, knowledge, navigation, and forgery checks and prevents consequence presentation from unnecessarily exposing a hidden degree of success.

No card text or mechanical outcome needed to change for this fix.

## Overlap review

No density increase is recommended to solve thematic variety. Existing boundaries remain sound:

- Skillful Consequences focuses on the **action and its aftermath**.
- Goblin Engineering owns **equipment incidents and malfunctions**.
- Attack-focused Critical Forge expansions own **Strike and spell-attack criticals**.
- The normal PF2e critical success or critical failure always resolves first.

The current card set does not need additional cards merely to make the total larger.

## Release recommendation

Treat **0.1.0-dev.14** as the completed action-catalog and density baseline.

The next useful step is a release-candidate hardening pass focused on real Critical Forge matching, visibility, settings, localization, and live Foundry integration rather than another broad content expansion.
