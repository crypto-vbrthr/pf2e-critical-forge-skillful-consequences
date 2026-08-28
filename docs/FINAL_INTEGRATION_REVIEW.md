# Release Candidate & Final Integration Review

Review target: **PF2E Critical Forge: Skillful Consequences 0.1.0-rc.1**

Integration baseline: **PF2E Critical Forge 1.0.1-rc.6.1**, public API **0.9.7**, extension contract **1**, card schema **1**, card-pack schema **1**, Pathfinder 2e **8.1.2+**, Foundry VTT **14**.

## Review result

The add-on is suitable for release-candidate testing. No card-content, action-density, localization, or pack-topology changes were required after the dev.14 completeness review.

The final integration pass concentrated on the real Critical Forge registration and matching pipeline rather than another prose review.

## Extension contract

Skillful Consequences binds through the top-level Critical Forge extension controller and requires:

- `moduleVersion >=1.0.1-rc.6.1`
- `apiVersion >=0.9.7`
- `extensionContractVersion >=1`
- `cardSchemaVersion >=1`
- `cardPackSchemaVersion >=1`
- `cards.multiDeckPacks`
- `extensions.contracts`
- `extensions.registrationDiagnostics`
- `cards.skillCheckCriticals`

The current Critical Forge baseline satisfies every requirement. Registration through `extensions.forModule()` succeeds without compatibility or ownership errors.

## Registration and pack topology

All four packs register transactionally through the real extension controller:

| Pack | Cards | Enabled by default |
| --- | ---: | --- |
| Physical Actions | 56 | yes |
| Social Actions | 50 | yes |
| Subterfuge Actions | 38 | yes |
| Knowledge & Utility | 74 | yes |
| **Total** | **218** | |

All four remain specialized `skill` decks. Pack ownership is stamped to `pf2e-critical-forge-skillful-consequences` by Critical Forge's extension service.

## Matching smoke test

The cross-repository smoke test exercised the current Critical Forge PF2e context adapter and selector with the registered release-candidate packs.

Results:

- **50 supported action slugs** were discovered from the registered cards.
- **132 representative contexts** were evaluated across critical success and critical failure, including multi-skill actions and skill-agnostic actions.
- Every context produced exactly the expected Skillful Consequences candidates for its action, skill family, and category.
- No action leaked cards from another Skillful Consequences mini-deck.
- Both `skillCheckCriticalSuccess` and `skillCheckCriticalFailure` resolved to the specialized `skill` deck as expected.

Representative normalization variants were also exercised for Pick a Lock, Treat Wounds, Administer First Aid, Create a Diversion, Make an Impression, Command an Animal, Learn a Spell, Earn Income, Force Open, and Create Forgery.

## Settings and live replacement

The four world settings remain independent. The integration test disabled Social Actions, refreshed the extension packs with `{ replace: true }`, and confirmed that:

- the Social Actions pack remained registered but disabled;
- Social cards ceased to be eligible;
- the other three packs remained intact;
- re-enabling Social Actions restored its candidates;
- no orphaned cards or ownership conflicts were produced.

This validates the intended settings workflow without requiring a world reload.

## Secret-check visibility

The current Critical Forge baseline defaults card visibility to **GM Blind**, which is appropriate for Skillful Consequences' secret-check cards.

The review also confirmed an important boundary: `secret-check` and `gm-facing` are card metadata, not a per-card visibility override in Critical Forge 1.0.1-rc.6.1. If a world deliberately changes Critical Forge card visibility to `public` or `self`, secret skill consequences can become visible as well.

Release-candidate guidance is therefore:

- keep Critical Forge visibility on **GM Blind** or **GM Only** when secret skill actions are in use;
- do not assume the `gm-facing` tag can override a more permissive global visibility setting.

This is a documented configuration boundary, not a release blocker, because the current Critical Forge default is already safe.

## Borrow an Arcane Spell boundary

Borrow an Arcane Spell remains deliberately excluded.

Critical Forge 1.0.1-rc.6.1 currently normalizes these representations correctly:

- `Borrow an Arcane Spell`
- `borrowAnArcaneSpell`
- `borrow-an-arcane-spell`

The compact form `borrowanarcanespell` is not mapped back to the canonical kebab-case slug. Since Critical Forge explicitly maintains a canonical action map for compact identifiers, Skillful Consequences should not add this action until the same reliability exists for every representation likely to arrive from PF2e chat context.

## Quality gates

The dependency baseline passes its own quality suite:

- Critical Forge: **355 / 355 tests passed**
- Critical Forge release-specific checks passed
- Critical Forge JavaScript syntax checks passed

Skillful Consequences: **56 / 56 tests passed**. The release candidate adds dedicated runtime contract tests for:

- missing extension-contract rejection;
- exact compatibility requirements;
- four-pack initial registration;
- module API exposure;
- independent settings and replacement refresh;
- diagnostics passthrough.

The module's normal content, density, metadata, localization-parity, settings, and archive checks remain in place.

## Release recommendation

Promote the add-on to **0.1.0-rc.1** with the existing 218-card catalog unchanged.

The remaining work before stable 0.1.0 is live Foundry smoke testing rather than another content expansion. In particular, verify one public skill critical, one GM-facing secret skill critical, one pack toggle, and one world reload with both modules enabled.
