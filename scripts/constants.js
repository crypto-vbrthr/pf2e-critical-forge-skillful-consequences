export const MODULE_ID = "pf2e-critical-forge-skillful-consequences";
export const MODULE_TITLE = "PF2E Critical Forge: Skillful Consequences";
export const MODULE_VERSION = "0.1.0-dev.8";
export const API_VERSION = "0.1.0";

export const REQUIRED_CRITICAL_FORGE_VERSION = ">=1.0.1-rc.6.1";
export const REQUIRED_CRITICAL_FORGE_API_VERSION = ">=0.9.7";
export const REQUIRED_EXTENSION_CONTRACT_VERSION = ">=1";

export const PACK_IDS = Object.freeze({
  PHYSICAL_ACTIONS: `${MODULE_ID}.physical-actions`,
  SOCIAL_ACTIONS: `${MODULE_ID}.social-actions`,
  SUBTERFUGE_ACTIONS: `${MODULE_ID}.subterfuge-actions`,
  KNOWLEDGE_UTILITY: `${MODULE_ID}.knowledge-utility`
});

export const SETTING_KEYS = Object.freeze({
  PHYSICAL_ACTIONS: "enablePhysicalActions",
  SOCIAL_ACTIONS: "enableSocialActions",
  SUBTERFUGE_ACTIONS: "enableSubterfugeActions",
  KNOWLEDGE_UTILITY: "enableKnowledgeUtility"
});
