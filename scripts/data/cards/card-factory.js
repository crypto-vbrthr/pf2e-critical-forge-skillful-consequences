import { MODULE_ID } from "../../constants.js";

const FILTER_KEYS = Object.freeze([
  "damageTypes",
  "weaponGroups",
  "attackTraits",
  "excludedAttackTraits",
  "saveTypes",
  "skillTypes",
  "actionSlugs",
  "itemTypes",
  "itemTraits",
  "excludedItemTraits",
  "spellTraditions",
  "spellTraits",
  "sourceTraits",
  "targetTraits",
  "excludedSourceTraits",
  "excludedTargetTraits"
]);

function unique(values = []) {
  return [...new Set(values.map((value) => String(value).trim()).filter(Boolean))];
}

function freezeFilters(filters = {}) {
  return Object.freeze(Object.fromEntries(
    FILTER_KEYS.map((key) => [key, Object.freeze(unique(filters[key] ?? []))])
  ));
}

export function defineSkillActionCard({
  id,
  packId,
  collection,
  localizationKey,
  category,
  tone = "neutral",
  impact = "light",
  fallbackTitle,
  fallbackDescription,
  weight = 1,
  tags = [],
  filters = {},
  contentBatch = 1,
  actionFamily = null
}) {
  if (!["skillCheckCriticalSuccess", "skillCheckCriticalFailure"].includes(category)) {
    throw new TypeError(`Unsupported skill action category: ${category}`);
  }
  const outcomeTag = category === "skillCheckCriticalSuccess" ? "critical-success" : "critical-failure";
  return Object.freeze({
    schemaVersion: 1,
    id: `${MODULE_ID}.${collection}.${id}`,
    packId,
    category,
    deckType: "skill",
    tone,
    impact,
    titleKey: `PF2E_SKILLFUL_CONSEQUENCES.Cards.${localizationKey}.Title`,
    descriptionKey: `PF2E_SKILLFUL_CONSEQUENCES.Cards.${localizationKey}.Description`,
    fallbackTitle,
    fallbackDescription,
    weight,
    tags: Object.freeze(["skillful-consequences", collection, "skill-check", outcomeTag, ...unique(tags)]),
    filters: freezeFilters(filters),
    conditions: null,
    effect: null,
    metadata: Object.freeze({
      collection,
      contentBatch,
      actionFamily,
      resolution: "manual",
      preservesCoreOutcome: true
    })
  });
}
