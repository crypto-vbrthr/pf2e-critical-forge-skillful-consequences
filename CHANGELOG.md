# Changelog

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
