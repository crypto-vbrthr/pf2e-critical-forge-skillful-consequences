import { MODULE_ID } from "./constants.js";
import { initializeSkillfulConsequences, refreshSkillfulConsequencesPacks } from "./runtime.js";
import { bindSettingsRefresh, registerSettings } from "./settings.js";

if (globalThis.Hooks?.once) {
  Hooks.once("init", () => {
    registerSettings();
    bindSettingsRefresh(() => {
      const result = refreshSkillfulConsequencesPacks();
      if (result && globalThis.game?.user?.isGM) {
        const message = globalThis.game?.i18n?.localize?.("PF2E_SKILLFUL_CONSEQUENCES.Notifications.PackSelectionUpdated")
          ?? "Skillful Consequences pack selection updated.";
        globalThis.ui?.notifications?.info?.(message);
      }
    });
  });

  Hooks.once("pf2eCriticalForgeReady", (forge) => {
    try {
      initializeSkillfulConsequences(forge);
      console.info(`${MODULE_ID} | Registered Skillful Consequences with Critical Forge.`);
    } catch (error) {
      console.error(`${MODULE_ID} | Registration failed.`, error);
      const message = globalThis.game?.i18n?.localize?.("PF2E_SKILLFUL_CONSEQUENCES.Notifications.RegistrationFailed")
        ?? "PF2E Critical Forge: Skillful Consequences could not register with Critical Forge.";
      globalThis.ui?.notifications?.error?.(message);
    }
  });
}
