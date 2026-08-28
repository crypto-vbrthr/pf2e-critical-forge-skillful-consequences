import {
  API_VERSION,
  MODULE_ID,
  MODULE_VERSION,
  REQUIRED_CRITICAL_FORGE_API_VERSION,
  REQUIRED_CRITICAL_FORGE_VERSION,
  REQUIRED_EXTENSION_CONTRACT_VERSION
} from "./constants.js";
import { buildSkillfulConsequencePacks } from "./data/packs.js";
import { readPackSettings } from "./settings.js";

let activeRuntime = null;

export function initializeSkillfulConsequences(forge, { gameRef = globalThis.game } = {}) {
  if (!forge?.extensions?.forModule) {
    throw new TypeError("PF2E Critical Forge: Skillful Consequences requires the Critical Forge public extension API.");
  }

  const extension = forge.extensions.forModule(MODULE_ID, {
    version: MODULE_VERSION,
    requirements: {
      moduleVersion: REQUIRED_CRITICAL_FORGE_VERSION,
      apiVersion: REQUIRED_CRITICAL_FORGE_API_VERSION,
      extensionContractVersion: REQUIRED_EXTENSION_CONTRACT_VERSION,
      cardSchemaVersion: ">=1",
      cardPackSchemaVersion: ">=1",
      capabilities: [
        "cards.multiDeckPacks",
        "extensions.contracts",
        "extensions.registrationDiagnostics",
        "cards.skillCheckCriticals"
      ]
    }
  });

  extension.assertCompatible();
  registerCurrentPacks(extension, gameRef);

  const runtime = Object.freeze({
    version: API_VERSION,
    moduleVersion: MODULE_VERSION,
    extension,
    listPacks: () => extension.listPacks(),
    refresh: () => refreshSkillfulConsequencesPacks({ gameRef }),
    diagnostics: extension.diagnostics
  });

  activeRuntime = runtime;
  const module = gameRef?.modules?.get?.(MODULE_ID);
  if (module) module.api = runtime;
  return runtime;
}

export function refreshSkillfulConsequencesPacks({ gameRef = globalThis.game } = {}) {
  if (!activeRuntime?.extension) return null;
  return registerCurrentPacks(activeRuntime.extension, gameRef, { replace: true });
}

export function getSkillfulConsequencesRuntime() {
  return activeRuntime;
}

function registerCurrentPacks(extension, gameRef, { replace = false } = {}) {
  const packs = buildSkillfulConsequencePacks(readPackSettings(gameRef));
  return extension.registerPacks(packs, { replace });
}
