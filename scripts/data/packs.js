import { MODULE_ID, MODULE_VERSION, PACK_IDS, SETTING_KEYS } from "../constants.js";
import { PHYSICAL_ACTION_CARDS } from "./cards/physical-actions.js";
import { SOCIAL_ACTION_CARDS } from "./cards/social-actions.js";
import { SUBTERFUGE_ACTION_CARDS } from "./cards/subterfuge-actions.js";

const EMPTY = Object.freeze([]);

export const SKILLFUL_PACK_CONFIGS = Object.freeze([
  Object.freeze({
    settingKey: SETTING_KEYS.PHYSICAL_ACTIONS,
    settingToken: "PhysicalActions",
    id: PACK_IDS.PHYSICAL_ACTIONS,
    fallbackTitle: "Skillful Consequences: Physical Actions",
    fallbackDescription: "Action-specific critical successes and critical failures for Athletics and Acrobatics, with the normal PF2e result always resolved first.",
    cards: PHYSICAL_ACTION_CARDS,
    defaultEnabled: true,
    metadata: Object.freeze({
      theme: "skillful-consequences",
      family: "skillful-consequences",
      category: "physical-actions",
      scope: "athletics-acrobatics-action-critical-results",
      contentStatus: "development",
      supportedActions: Object.freeze(["grapple", "trip", "shove", "reposition", "disarm", "climb", "swim", "high-jump", "long-jump", "balance", "tumble-through", "maneuver-in-flight", "squeeze"]),
      implementedCards: 52
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
      contentStatus: "development",
      supportedActions: Object.freeze(["feint", "create-a-diversion", "lie", "impersonate", "make-an-impression", "request", "gather-information", "demoralize", "coerce"]),
      implementedCards: 44
    })
  }),
  Object.freeze({
    settingKey: SETTING_KEYS.SUBTERFUGE_ACTIONS,
    settingToken: "SubterfugeActions",
    id: PACK_IDS.SUBTERFUGE_ACTIONS,
    fallbackTitle: "Skillful Consequences: Subterfuge Actions",
    fallbackDescription: "Action-specific critical successes and critical failures for supported Stealth and Thievery actions, with the normal PF2e result always resolved first.",
    cards: SUBTERFUGE_ACTION_CARDS,
    defaultEnabled: true,
    metadata: Object.freeze({
      theme: "skillful-consequences",
      family: "skillful-consequences",
      category: "subterfuge-actions",
      scope: "stealth-thievery-action-critical-results",
      contentStatus: "development",
      supportedActions: Object.freeze(["hide", "sneak", "conceal-an-object"]),
      implementedCards: 16
    })
  }),
  Object.freeze({
    settingKey: SETTING_KEYS.KNOWLEDGE_UTILITY,
    settingToken: "KnowledgeUtility",
    id: PACK_IDS.KNOWLEDGE_UTILITY,
    fallbackTitle: "Skillful Consequences: Knowledge & Utility",
    fallbackDescription: "Reserved for knowledge, medicine, crafting, survival, and other utility actions that benefit from action-specific critical follow-through.",
    cards: EMPTY,
    defaultEnabled: false,
    metadata: Object.freeze({
      theme: "skillful-consequences",
      family: "skillful-consequences",
      category: "knowledge-utility",
      scope: "knowledge-utility-action-critical-results",
      contentStatus: "planned",
      supportedActions: Object.freeze([]),
      implementedCards: 0
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
