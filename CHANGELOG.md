# Changelog

## 0.1.0-rc.1 - Release Candidate & Final Integration Review

- Promoted the completed 218-card, 50-action catalog to release-candidate status without changing card content or density.
- Validated the add-on against PF2E Critical Forge 1.0.1-rc.6.1, public API 0.9.7, extension contract 1, card schema 1, and card-pack schema 1.
- Ran a cross-repository integration smoke test that registered all four packs through the real Critical Forge extension controller and verified exact matching across 132 representative skill/action/category contexts.
- Verified all 50 supported action slugs against the current PF2e context adapter and exercised normalization variants for key multi-word actions.
- Verified independent pack settings can disable and re-enable a pack through ownership-safe `{ replace: true }` registration without leaving orphaned cards or damaging neighboring packs.
- Verified extension registration diagnostics remain free of errors.
- Added dedicated runtime contract tests covering compatibility negotiation, initial registration, pack refresh behavior, module API exposure, and diagnostics passthrough; the add-on suite now passes 56 / 56 tests.
- Marked all four pack metadata records as `release-candidate`.
- Confirmed the current Critical Forge baseline passes its own 355-test quality suite.
- Kept Borrow an Arcane Spell deferred: the current Critical Forge normalizer handles spaced, kebab-case, and camelCase forms, but not the compact `borrowanarcanespell` form, so the dev.14 infrastructure boundary remains prudent.

## 0.1.0-dev.14 - Action Completeness & Density Review

- Completed the full action-completeness and density review for all 218 cards and 50 supported action slugs.
- Confirmed the reviewed density split at 14 frequent actions (3 + 3), 31 regular actions (2 + 2), and 5 narrow actions (1 + 1).
- Kept the total card count at 218; no density padding was warranted.
- Added `docs/ACTION_COMPLETENESS_DENSITY_REVIEW.md` with completeness boundaries, borderline density decisions, and the remaining Borrow an Arcane Spell infrastructure dependency.
- Hardened secret-check presentation for Lie and Impersonate by tagging all of their cards `secret-check` and `gm-facing`.
- Hardened Gather Information by marking all six cards `gm-facing`, not only the critical-failure half.
- Added cross-pack completeness tests for the exact 50-action surface, reviewed tier membership, total density math, and social secret-check visibility.

## 0.1.0-dev.13 - Remaining Core Actions I

- Added 20 cards across five remaining core skill actions.
- Added Force Open (2 critical successes + 2 critical failures).
- Added Command an Animal (2 + 2).
- Added Learn a Spell (2 + 2).
- Added Create Forgery (2 + 2) with GM-facing secret-check handling.
- Added Earn Income (2 + 2) with skill-agnostic action matching.
- Added `docs/REMAINING_ACTION_REVIEW.md` documenting deliberate exclusions for Perception-based actions and the Borrow an Arcane Spell infrastructure follow-up.
- Total card count is now 218.

## 0.1.0-dev.12

### Performance & Utility I

- Added 12 cards, bringing the module to 198 cards total.
- Added Perform with 3 critical-success and 3 critical-failure cards in Social Actions.
- Added Aid with 3 critical-success and 3 critical-failure cards in Knowledge & Utility.
- Kept Perform consequences focused on audience response, follow-up performances, shared spotlight, and memorable fictional fallout without automatically changing attitudes.
- Kept Aid consequences skill-agnostic so any skill-based Aid check can use the same cooperation deck.
- Added German and English localization for all new cards.

### Quality

- Added density and exact-filter coverage for Performance and Aid.
- Added a generic-utility filter boundary requiring Aid to match by action slug without imposing a particular skill.
- Expanded release checks to cover 198 cards, 50 Social cards, and 62 Knowledge & Utility cards.
- Updated the roadmap, design guide, README, and overlap review for Performance and Aid.

## 0.1.0-dev.11

### Survival & Exploration I

- Added 18 Knowledge & Utility cards, bringing the module to 186 cards total.
- Added Track with 3 critical-success and 3 critical-failure cards.
- Added Sense Direction with 2 + 2 cards and explicit GM-facing secret-check handling.
- Added Subsist with 2 + 2 cards, matching both Survival and Society variants of the generic action.
- Added Cover Tracks with 2 + 2 cards.
- Added follow-up tracking/navigation bonuses, environmental clues, route and evidence consequences, resource assumptions, and restrained narrative failures without replacing normal PF2e outcomes.
- Added German and English localization for all new cards.

### Quality

- Expanded action-density tests for frequent and regular Survival/exploration actions.
- Added exact filter tests for Survival actions and the multi-skill Subsist boundary.
- Added explicit secret-check safety tests for Sense Direction.
- Expanded release checks to cover 186 cards and 56 Knowledge & Utility cards.
- Updated README, roadmap, design guide, and overlap review for the new Survival block.

## 0.1.0-dev.10

### Knowledge Actions I

- Added 18 Knowledge & Utility cards, bringing the module to 168 cards total.
- Added Recall Knowledge with 3 critical-success and 3 critical-failure cards.
- Added Identify Magic, Identify Alchemy, and Decipher Writing with 2 + 2 cards each.
- Marked every new knowledge-action card as `secret-check` and `gm-facing`.
- Kept critical-failure cards compatible with PF2e hidden misinformation and misidentification by never revealing that the normal result was wrong.
- Added action-first matching for Recall Knowledge, multi-skill matching for Identify Magic and Decipher Writing, and Crafting matching for Identify Alchemy.
- Added German and English localization for all new cards.

### Quality

- Expanded action-density and exact-filter tests for the first knowledge-action block.
- Added secret-check safety tests for all 18 knowledge cards.
- Expanded release checks to cover 168 cards and 38 Knowledge & Utility cards.
- Updated the design guide, roadmap, README, and overlap review for secret knowledge checks.

## 0.1.0-dev.9

### Medicine & Crafting I

- Added the first Knowledge & Utility content block with 20 cards, bringing the module to 150 cards total.
- Added Treat Wounds with 2 critical-success and 2 critical-failure cards.
- Added Administer First Aid with 2 + 2 cards.
- Added Treat Disease and Treat Poison with 1 + 1 cards each.
- Added Repair and Craft with 2 + 2 cards each.
- Kept Medicine consequences restrained because their normal PF2e critical failures can already be dangerous.
- Kept Repair and Craft action-centered, with damage patterns, process knowledge, and follow-up attempts rather than equipment malfunctions.
- Knowledge & Utility is now visible in module settings and enabled by default.
- Added German and English localization for all new cards.

### Quality

- Added exact Medicine and Crafting skill/action-family validation.
- Added action-density tests for regular and narrow Medicine/Crafting actions.
- Added explicit Goblin Engineering overlap boundaries for equipment-centered incidents.
- Expanded release checks to cover 150 cards across four active packs.
- Updated the design guide, roadmap, and overlap review for Medicine and Crafting.

## 0.1.0-dev.8

### Thievery I

- Added 18 Subterfuge Actions cards, bringing the module to 130 cards total.
- Added Pick a Lock with 2 critical-success and 2 critical-failure cards.
- Added Disable a Device with 3 critical-success and 3 critical-failure cards.
- Added Palm an Object with 2 critical-success and 2 critical-failure cards.
- Added Steal with 2 critical-success and 2 critical-failure cards.
- Kept the Thievery block focused on locks, devices, witnesses, carried objects, and action aftermath rather than equipment malfunctions.
- Added German and English localization for all new cards.

### Quality

- Expanded action-density tests for frequent and regular Thievery actions.
- Added exact Thievery skill/action-family validation for all 18 new cards.
- Expanded overlap checks against Goblin Engineering Equipment Incidents.
- Expanded release checks to cover 130 cards and the dev.8 Subterfuge topology.
- Updated the design guide, roadmap, and overlap review for Thievery.

## 0.1.0-dev.7

### Stealth I

- Added the first Subterfuge Actions content block with 16 Stealth cards, bringing the module to 112 cards total.
- Added Hide with 3 critical-success and 3 critical-failure cards.
- Added Sneak with 3 critical-success and 3 critical-failure cards.
- Added Conceal an Object with 2 critical-success and 2 critical-failure cards.
- Added stealth follow-through for routes, shared blind spots, cover, traces, observer awareness, and transitions between Hide and Sneak without replacing PF2e's normal detection results.
- Marked every Stealth card as `secret-check` and `gm-facing` so Critical Forge can keep hidden degrees of success from leaking through card presentation.
- Subterfuge Actions is now visible in module settings and enabled by default.
- Added German and English localization for all new cards.

### Quality

- Expanded action-density tests for frequent and regular Stealth actions.
- Added exact Stealth skill/action-family validation for all 16 Subterfuge cards.
- Added a release-check boundary for secret Stealth consequences.
- Expanded release checks to cover 112 total cards and the dev.7 pack topology.
- Updated the design guide, roadmap, and overlap review for secret Stealth checks.

## 0.1.0-dev.6

### Diplomacy & Intimidation

- Added 24 Social Actions cards, bringing the module to 96 cards total.
- Added Make an Impression with 2 critical-success and 2 critical-failure cards.
- Added Request with 2 critical-success and 2 critical-failure cards.
- Added Gather Information with 3 critical-success and 3 critical-failure cards.
- Added Demoralize with 3 critical-success and 3 critical-failure cards.
- Added Coerce with 2 critical-success and 2 critical-failure cards.
- Added social follow-through for contacts, leads, observers, conversational momentum, revealed priorities, fear, and reputation without changing PF2e attitude steps or replacing normal action outcomes.
- Marked Gather Information cards as secret-check content and kept critical-failure consequences explicitly GM-facing so they do not expose the action's hidden misinformation result.
- Added German and English localization for all new cards.

### Quality

- Expanded action-density tests for Diplomacy and Intimidation.
- Expanded exact skill/action-family validation to all 44 Social Actions cards.
- Expanded release checks to cover 96 total cards and the dev.6 density profile.
- Updated the design guide, roadmap, and overlap review for secret social checks and the new action families.

## 0.1.0-dev.5

### Deception I

- Added the first Social Actions content pack with 20 Deception cards.
- Added Feint with 3 critical-success and 3 critical-failure cards.
- Added Create a Diversion with 2 critical-success and 2 critical-failure cards.
- Added Lie with 3 critical-success and 3 critical-failure cards.
- Added Impersonate with 2 critical-success and 2 critical-failure cards.
- Added tactical Feint follow-through, shared distractions, maintained-story consequences, suspicion outcomes, and assumed-identity follow-through without replacing PF2e's normal degree-of-success results.
- Social Actions is now visible in module settings and enabled by default.
- Added German and English localization for all new cards.

### Quality

- Expanded action-density tests for frequent and regular Deception actions.
- Expanded release checks to cover 72 total cards across Physical and Social Actions.
- Added exact Deception skill/action-filter checks and pack-topology checks.
- Updated the design guide, roadmap, and overlap review for social consequences.

## 0.1.0-dev.4

### Acrobatics I

- Added 16 new Acrobatics cards, bringing Physical Actions to 52 cards.
- Added Balance with 2 critical-success and 2 critical-failure cards.
- Added Tumble Through with 3 critical-success and 3 critical-failure cards.
- Added Maneuver in Flight with 2 critical-success and 2 critical-failure cards.
- Added Squeeze with 1 critical-success and 1 critical-failure card.
- Kept Balance, Maneuver in Flight, and Squeeze critical-failure additions restrained because their normal PF2e outcomes can already include falling, hazardous flight consequences, or becoming stuck.
- Added German and English localization for all new cards.

### Quality

- Expanded action-density tests to cover Acrobatics frequency tiers.
- Expanded release checks to require 52 unique Physical Actions cards and the dev.4 Athletics/Acrobatics density profile.
- Updated the overlap review and roadmap for the first Acrobatics block.

## 0.1.0-dev.3

### Athletics III

- Added 12 new Athletics cards, bringing Physical Actions to 36 cards.
- Added Climb with 2 critical-success and 2 critical-failure cards.
- Added Swim with 2 critical-success and 2 critical-failure cards.
- Added High Jump with 1 critical-success and 1 critical-failure card.
- Added Long Jump with 1 critical-success and 1 critical-failure card.
- Kept jump critical failures deliberately light because their normal PF2e outcomes can already be punishing.
- Added German and English localization for all new cards.

### Quality

- Expanded action-density tests to cover regular and narrow Athletics actions.
- Expanded release checks to require 36 unique Physical Actions cards and the dev.3 density profile.
- Updated the overlap review and roadmap for the completed Athletics movement block.

## 0.1.0-dev.2

### Athletics II

- Added 12 new Athletics cards, bringing Physical Actions to 24 cards.
- Added Shove with 2 critical-success and 2 critical-failure cards.
- Added Reposition with 2 critical-success and 2 critical-failure cards.
- Added Disarm with 2 critical-success and 2 critical-failure cards.
- Added new action-specific consequences covering forced-movement recovery, counterforce, positional leverage, item placement, and exposed grips.
- Preserved the normal PF2e critical result on every new card.
- Added German and English localization for all new cards.

### Quality

- Expanded action-density tests for frequent and regular Athletics actions.
- Expanded release checks to require 24 unique Physical Actions cards and the dev.2 action-density profile.
- Updated the overlap review and roadmap for the expanded Athletics scope.

## 0.1.0-dev.1

### Action framework

- Added the initial Skillful Consequences extension structure for Critical Forge skill-check criticals.
- Added separate planned pack families for Physical Actions, Social Actions, Subterfuge Actions, and Knowledge & Utility.
- Added per-pack world settings that remain hidden until a pack contains cards.
- Requires Critical Forge 1.0.1-rc.6.1 / API 0.9.7 and the `cards.skillCheckCriticals` capability.

### Physical Actions I

- Added 12 Athletics cards.
- Grapple now has 3 critical-success and 3 critical-failure cards.
- Trip now has 3 critical-success and 3 critical-failure cards.
- All cards explicitly preserve the normal PF2e critical result before applying their additional consequence.
- Added German and English localization.

### Quality

- Added content, action-density, metadata, settings, localization, and release-quality tests.
- Added Critical Forge schema validation and action-filter integration checks to the development verification workflow.
