import { MODULE_ID, MODULE_VERSION, PACK_IDS, SETTING_KEYS } from "../constants.js";
import { PHYSICAL_ACTION_CARDS } from "./cards/physical-actions.js";
import { SOCIAL_ACTION_CARDS } from "./cards/social-actions.js";
import { SUBTERFUGE_ACTION_CARDS } from "./cards/subterfuge-actions.js";
import { KNOWLEDGE_UTILITY_CARDS } from "./cards/knowledge-utility-actions.js";

export const SKILLFUL_PACK_CONFIGS = Object.freeze([
  Object.freeze({
    settingKey: SETTING_KEYS.PHYSICAL_ACTIONS,
    settingToken: "PhysicalActions",
    id: PACK_IDS.PHYSICAL_ACTIONS,
    fallbackTitle: "Skillful Consequences: Physical Actions",
    fallbackDescription: "Action-specific critical successes and critical failures for Athletics and Acrobatics, including Force Open, with the normal PF2e result always resolved first.",
    cards: PHYSICAL_ACTION_CARDS,
    defaultEnabled: true,
    metadata: Object.freeze({
      theme: "skillful-consequences",
      family: "skillful-consequences",
      category: "physical-actions",
      scope: "athletics-acrobatics-action-critical-results",
      contentStatus: "stable",
      supportedActions: Object.freeze(["grapple", "trip", "shove", "reposition", "disarm", "climb", "swim", "high-jump", "long-jump", "balance", "tumble-through", "maneuver-in-flight", "squeeze", "force-open"]),
      implementedCards: 56
    })
  }),
  Object.freeze({
    settingKey: SETTING_KEYS.SOCIAL_ACTIONS,
    settingToken: "SocialActions",
    id: PACK_IDS.SOCIAL_ACTIONS,
    fallbackTitle: "Skillful Consequences: Social Actions",
    fallbackDescription: "Action-specific critical successes and critical failures for supported Deception, Diplomacy, Intimidation, and Performance actions, with the normal PF2e result always resolved first.",
    cards: SOCIAL_ACTION_CARDS,
    defaultEnabled: true,
    metadata: Object.freeze({
      theme: "skillful-consequences",
      family: "skillful-consequences",
      category: "social-actions",
      scope: "social-skill-action-critical-results",
      contentStatus: "stable",
      supportedActions: Object.freeze(["feint", "create-a-diversion", "lie", "impersonate", "make-an-impression", "request", "gather-information", "demoralize", "coerce", "perform"]),
      implementedCards: 50
    })
  }),
  Object.freeze({
    settingKey: SETTING_KEYS.SUBTERFUGE_ACTIONS,
    settingToken: "SubterfugeActions",
    id: PACK_IDS.SUBTERFUGE_ACTIONS,
    fallbackTitle: "Skillful Consequences: Subterfuge Actions",
    fallbackDescription: "Action-specific critical successes and critical failures for supported Stealth, Thievery, and Society forgery actions, with the normal PF2e result always resolved first.",
    cards: SUBTERFUGE_ACTION_CARDS,
    defaultEnabled: true,
    metadata: Object.freeze({
      theme: "skillful-consequences",
      family: "skillful-consequences",
      category: "subterfuge-actions",
      scope: "stealth-thievery-forgery-action-critical-results",
      contentStatus: "stable",
      supportedActions: Object.freeze(["hide", "sneak", "conceal-an-object", "pick-a-lock", "disable-a-device", "palm-an-object", "steal", "create-forgery"]),
      implementedCards: 38
    })
  }),
  Object.freeze({
    settingKey: SETTING_KEYS.KNOWLEDGE_UTILITY,
    settingToken: "KnowledgeUtility",
    id: PACK_IDS.KNOWLEDGE_UTILITY,
    fallbackTitle: "Skillful Consequences: Knowledge & Utility",
    fallbackDescription: "Action-specific critical successes and critical failures for supported Medicine, Crafting, knowledge, Nature, Survival, magic-learning, downtime, and general utility actions, with the normal PF2e result always resolved first.",
    cards: KNOWLEDGE_UTILITY_CARDS,
    defaultEnabled: true,
    metadata: Object.freeze({
      theme: "skillful-consequences",
      family: "skillful-consequences",
      category: "knowledge-utility",
      scope: "knowledge-utility-action-critical-results",
      contentStatus: "stable",
      supportedActions: Object.freeze(["treat-wounds", "administer-first-aid", "treat-disease", "treat-poison", "repair", "craft", "recall-knowledge", "identify-magic", "identify-alchemy", "decipher-writing", "track", "sense-direction", "subsist", "cover-tracks", "aid", "command-an-animal", "learn-a-spell", "earn-income"]),
      implementedCards: 74
    })
  })
]);

export function buildSkillfulConsequencePacks(settings = {}) {
  return SKILLFUL_PACK_CONFIGS.map((config) => Object.freeze({
    schemaVersion: 1,
    id: config.id,
    titleKey: `PF2E_SKILLFUL_CONSEQUENCES.Packs.${config.settingToken}.Title`,
    descriptionKey: `PF2E_SKILLFUL_CONSEQUENCES.Packs.${config.settingToken}.Description`,
    fallbackTitle: config.fallbackTitle,
    fallbackDescription: config.fallbackDescription,
    version: MODULE_VERSION,
    sourceModule: MODULE_ID,
    priority: 20,
    enabled: config.cards.length > 0 && (settings[config.settingKey] ?? config.defaultEnabled) !== false,
    metadata: config.metadata,
    decks: Object.freeze({
      skill: Object.freeze({ cards: config.cards })
    })
  }));
}
