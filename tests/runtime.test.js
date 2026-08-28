import test from "node:test";
import assert from "node:assert/strict";
import {
  MODULE_ID,
  MODULE_VERSION,
  REQUIRED_CRITICAL_FORGE_API_VERSION,
  REQUIRED_CRITICAL_FORGE_VERSION,
  REQUIRED_EXTENSION_CONTRACT_VERSION,
  SETTING_KEYS
} from "../scripts/constants.js";
import {
  getSkillfulConsequencesRuntime,
  initializeSkillfulConsequences,
  refreshSkillfulConsequencesPacks
} from "../scripts/runtime.js";

function gameRef(values = {}) {
  const module = { id: MODULE_ID, api: null };
  return {
    module,
    game: {
      modules: new Map([[MODULE_ID, module]]),
      settings: {
        get(_moduleId, key) {
          return Object.hasOwn(values, key) ? values[key] : true;
        }
      }
    }
  };
}

function forgeHarness() {
  const calls = [];
  let registered = [];
  const diagnostics = Object.freeze({
    list: () => [],
    clear: () => 0
  });
  const extension = Object.freeze({
    sourceModule: MODULE_ID,
    checkCompatibility: () => Object.freeze({ compatible: true, errors: [], warnings: [] }),
    assertCompatible: () => {
      calls.push({ type: "assertCompatible" });
      return Object.freeze({ compatible: true, errors: [], warnings: [] });
    },
    registerPacks: (packs, options = {}) => {
      registered = packs;
      calls.push({ type: "registerPacks", packs, options });
      return Object.freeze({ packs: registered });
    },
    listPacks: () => registered,
    diagnostics
  });
  const forge = {
    extensions: {
      forModule(moduleId, options = {}) {
        calls.push({ type: "forModule", moduleId, options });
        return extension;
      }
    }
  };
  return { forge, extension, calls, registered: () => registered };
}

test("runtime rejects a Critical Forge object without the public extension contract", () => {
  const { game } = gameRef();
  assert.throws(
    () => initializeSkillfulConsequences({}, { gameRef: game }),
    /public extension API/
  );
});

test("runtime negotiates the rc.6.1 / API 0.9.7 contract and registers all four packs", () => {
  const harness = forgeHarness();
  const { game, module } = gameRef();
  const runtime = initializeSkillfulConsequences(harness.forge, { gameRef: game });

  const binding = harness.calls.find((entry) => entry.type === "forModule");
  assert.equal(binding.moduleId, MODULE_ID);
  assert.equal(binding.options.version, MODULE_VERSION);
  assert.deepEqual(binding.options.requirements, {
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
  });
  assert.equal(harness.calls.some((entry) => entry.type === "assertCompatible"), true);

  const registration = harness.calls.find((entry) => entry.type === "registerPacks");
  assert.equal(registration.options.replace, false);
  assert.equal(registration.packs.length, 4);
  assert.deepEqual(registration.packs.map((pack) => pack.decks.skill.cards.length), [56, 50, 38, 74]);
  assert.equal(registration.packs.every((pack) => pack.enabled), true);
  assert.equal(registration.packs.every((pack) => pack.metadata.contentStatus === "release-candidate"), true);
  assert.equal(runtime.listPacks().length, 4);
  assert.equal(module.api, runtime);
  assert.equal(getSkillfulConsequencesRuntime(), runtime);
});

test("runtime refresh performs ownership-safe replacement and honors independent pack settings", () => {
  const harness = forgeHarness();
  const values = {
    [SETTING_KEYS.PHYSICAL_ACTIONS]: true,
    [SETTING_KEYS.SOCIAL_ACTIONS]: false,
    [SETTING_KEYS.SUBTERFUGE_ACTIONS]: true,
    [SETTING_KEYS.KNOWLEDGE_UTILITY]: false
  };
  const { game } = gameRef(values);
  initializeSkillfulConsequences(harness.forge, { gameRef: game });

  let packs = harness.registered();
  assert.deepEqual(packs.map((pack) => pack.enabled), [true, false, true, false]);

  values[SETTING_KEYS.SOCIAL_ACTIONS] = true;
  values[SETTING_KEYS.KNOWLEDGE_UTILITY] = true;
  const result = refreshSkillfulConsequencesPacks({ gameRef: game });
  const refreshCall = harness.calls.filter((entry) => entry.type === "registerPacks").at(-1);
  assert.equal(refreshCall.options.replace, true);
  assert.deepEqual(refreshCall.packs.map((pack) => pack.enabled), [true, true, true, true]);
  assert.deepEqual(result.packs.map((pack) => pack.enabled), [true, true, true, true]);
});

test("public add-on runtime exposes extension diagnostics without wrapping or mutating them", () => {
  const harness = forgeHarness();
  const { game } = gameRef();
  const runtime = initializeSkillfulConsequences(harness.forge, { gameRef: game });
  assert.equal(runtime.extension, harness.extension);
  assert.equal(runtime.diagnostics, harness.extension.diagnostics);
  assert.deepEqual(runtime.diagnostics.list(), []);
  assert.equal(Object.isFrozen(runtime), true);
});
