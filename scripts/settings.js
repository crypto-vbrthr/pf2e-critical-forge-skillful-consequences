import { MODULE_ID, SETTING_KEYS } from "./constants.js";
import { SKILLFUL_PACK_CONFIGS } from "./data/packs.js";

let refreshHandler = null;

export function bindSettingsRefresh(handler) {
  refreshHandler = typeof handler === "function" ? handler : null;
}

export function registerSettings(gameRef = globalThis.game) {
  const settings = gameRef?.settings;
  if (!settings?.register) return false;

  for (const config of SKILLFUL_PACK_CONFIGS) {
    settings.register(MODULE_ID, config.settingKey, {
      name: `PF2E_SKILLFUL_CONSEQUENCES.Settings.${config.settingToken}.Name`,
      hint: `PF2E_SKILLFUL_CONSEQUENCES.Settings.${config.settingToken}.Hint`,
      scope: "world",
      config: config.cards.length > 0,
      type: Boolean,
      default: config.defaultEnabled,
      onChange: requestRefresh
    });
  }

  return true;
}

export function readPackSettings(gameRef = globalThis.game) {
  const result = {};
  for (const config of SKILLFUL_PACK_CONFIGS) {
    try {
      const value = gameRef?.settings?.get?.(MODULE_ID, config.settingKey);
      result[config.settingKey] = value == null ? config.defaultEnabled : Boolean(value);
    } catch {
      result[config.settingKey] = config.defaultEnabled;
    }
  }
  return Object.freeze(result);
}

export function isPackEnabled(settingKey, gameRef = globalThis.game) {
  if (!Object.values(SETTING_KEYS).includes(settingKey)) return false;
  return Boolean(readPackSettings(gameRef)[settingKey]);
}

function requestRefresh() {
  try {
    refreshHandler?.();
  } catch (error) {
    console.error(`${MODULE_ID} | Failed to refresh after a pack setting change.`, error);
  }
}
