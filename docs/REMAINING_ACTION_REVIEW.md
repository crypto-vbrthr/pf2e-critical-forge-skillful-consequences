# Remaining Action Review

Review target: Pathfinder 2e core action slugs currently recognized by Critical Forge but not yet represented by Skillful Consequences after dev.12.

**dev.14 revalidation:** The Action Completeness & Density Review confirms this boundary remains current. The 50 supported action slugs are fully represented; Seek and Sense Motive remain Perception-based exclusions, and Borrow an Arcane Spell remains infrastructure-blocked pending reliable Critical Forge normalization.

**rc.1 integration revalidation:** Critical Forge 1.0.1-rc.6.1 canonicalizes spaced, kebab-case, and camelCase Borrow an Arcane Spell identifiers, but still leaves compact `borrowanarcanespell` unexpanded. The release candidate therefore keeps the action deferred rather than depending on a representation that is not yet fully canonical.

## Added in dev.13

- **Force Open** - clear critical-success and critical-failure follow-through; added at 2 + 2.
- **Command an Animal** - useful handling consequences when a Nature check is actually rolled; added at 2 + 2.
- **Learn a Spell** - meaningful material/learning critical outcomes with room for study follow-through; added at 2 + 2.
- **Create Forgery** - worthwhile secret-check consequences around later examination and document flaws; added at 2 + 2, all GM-facing.
- **Earn Income** - downtime consequences can create reputation and professional follow-through without changing the normal payout; added at 2 + 2 and kept skill-agnostic.

## Deliberately not added

- **Seek** - uses Perception rather than a skill. Critical Forge's current skill-check feature deliberately excludes Perception.
- **Sense Motive** - also uses a secret Perception check and therefore belongs to a future Perception-critical extension rather than this skill deck.

## Infrastructure follow-up candidate

- **Borrow an Arcane Spell** is a legitimate Arcana exploration activity, but it is not currently part of Critical Forge's canonical core action-slug normalizer. It should only be added after the core can normalize and reliably expose that action slug in PF2e chat context.

This review favors action reliability over card count. Skillful Consequences should not register cards for a roll context that Critical Forge cannot identify consistently.
