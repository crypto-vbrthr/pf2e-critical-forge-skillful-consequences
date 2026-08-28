# Skillful Consequences Card Roadmap

Skillful Consequences uses an **action-density model** rather than a fixed final card count. A supported action should feel like a small deck of its own.

## Density targets

| Action frequency | Critical success | Critical failure | Typical total |
| --- | ---: | ---: | ---: |
| Frequent | 3 | 3 | 6 |
| Regular | 2 | 2 | 4 |
| Narrow but useful | 1 | 1 | 2 |

These are targets, not quotas. An action is not added merely to fill a table. Density reflects both expected table frequency and the amount of safe consequence space left after the normal PF2e critical result resolves.

## Development sequence

### 0.1.0-dev.1 - Action Framework & Athletics I

- Grapple: 3 success + 3 failure
- Trip: 3 success + 3 failure
- Total after block: **12 cards**

### 0.1.0-dev.2 - Athletics II

- Shove: 2 success + 2 failure
- Reposition: 2 success + 2 failure
- Disarm: 2 success + 2 failure
- Total after block: **24 cards**

### 0.1.0-dev.3 - Athletics III

- Climb: 2 success + 2 failure
- Swim: 2 success + 2 failure
- High Jump: 1 success + 1 failure
- Long Jump: 1 success + 1 failure
- Total after block: **36 cards**

### 0.1.0-dev.4 - Acrobatics I

- Balance: 2 success + 2 failure
- Tumble Through: 3 success + 3 failure
- Maneuver in Flight: 2 success + 2 failure
- Squeeze: 1 success + 1 failure
- Total after block: **52 cards**

### 0.1.0-dev.5 - Deception I

- Feint: 3 success + 3 failure
- Create a Diversion: 2 success + 2 failure
- Lie: 3 success + 3 failure
- Impersonate: 2 success + 2 failure
- Total after block: **72 cards**

### 0.1.0-dev.6 - Diplomacy & Intimidation

- Make an Impression: 2 success + 2 failure
- Request: 2 success + 2 failure
- Gather Information: 3 success + 3 failure
- Demoralize: 3 success + 3 failure
- Coerce: 2 success + 2 failure
- Total after block: **96 cards**

### 0.1.0-dev.7 - Stealth I

- Hide: 3 success + 3 failure
- Sneak: 3 success + 3 failure
- Conceal an Object: 2 success + 2 failure
- Total after block: **112 cards**

### 0.1.0-dev.8 - Thievery I

- Pick a Lock: 2 success + 2 failure
- Disable a Device: 3 success + 3 failure
- Palm an Object: 2 success + 2 failure
- Steal: 2 success + 2 failure
- Total after block: **130 cards**

### 0.1.0-dev.9 - Medicine & Crafting I

- Treat Wounds: 2 success + 2 failure
- Administer First Aid: 2 success + 2 failure
- Treat Disease: 1 success + 1 failure
- Treat Poison: 1 success + 1 failure
- Repair: 2 success + 2 failure
- Craft: 2 success + 2 failure
- Total after block: **150 cards**

### 0.1.0-dev.10 - Knowledge Actions I

- Recall Knowledge: 3 success + 3 failure
- Identify Magic: 2 success + 2 failure
- Identify Alchemy: 2 success + 2 failure
- Decipher Writing: 2 success + 2 failure
- All four actions are handled as GM-facing secret-check content.
- Total after block: **168 cards**


### 0.1.0-dev.11 - Survival & Exploration I

- Track: 3 success + 3 failure
- Sense Direction: 2 success + 2 failure, GM-facing secret-check handling
- Subsist: 2 success + 2 failure, matching Survival or Society
- Cover Tracks: 2 success + 2 failure
- Total after block: **186 cards**

### 0.1.0-dev.12 - Performance & Utility I

- Perform: 3 success + 3 failure
- Aid: 3 success + 3 failure, action-first and skill-agnostic
- Total after block: **198 cards**

### 0.1.0-dev.13 - Remaining Core Actions I

- Force Open: 2 success + 2 failure
- Command an Animal: 2 + 2
- Learn a Spell: 2 + 2
- Create Forgery: 2 + 2, GM-facing secret-check handling
- Earn Income: 2 + 2, action-first and skill-agnostic
- Total after block: **218 cards**

### 0.1.0-dev.14 - Action Completeness & Density Review

- Revalidated the complete 50-action supported surface.
- Confirmed 14 frequent, 31 regular, and 5 narrow action mini-decks.
- Kept the total at **218 cards** with no padding increase.
- Hardened secret-check presentation for Lie, Impersonate, and Gather Information.
- Documented Borrow an Arcane Spell as infrastructure-blocked rather than silently missing.

### 0.1.0-rc.1 - Release Candidate & Final Integration Review

- Validated against Critical Forge 1.0.1-rc.6.1 / API 0.9.7 and extension contract 1.
- Registered all four packs through the live extension controller with 218 cards intact.
- Exercised all 50 supported action slugs across 132 representative matching contexts.
- Verified independent pack refresh and ownership-safe replacement.
- Added runtime contract tests and release-candidate pack metadata.
- No content-density changes were required.

### Planned next block

- 0.1.0 stable release after final live Foundry smoke testing

## Completeness review

The dev.14 review checked every supported action for:

1. success/failure symmetry appropriate to its frequency;
2. repeated mechanics or near-duplicate prose;
3. overlap with PF2e's normal degree-of-success result;
4. overlap with other Critical Forge expansions;
5. action-filter reliability in real PF2e chat contexts;
6. secret-check presentation where a visible card could reveal a hidden result.
