import test from "node:test";
import assert from "node:assert/strict";
import { MODULE_ID, SETTING_KEYS } from "../scripts/constants.js";
import { buildSkillfulConsequencePacks } from "../scripts/data/packs.js";
import { readPackSettings, registerSettings } from "../scripts/settings.js";

test("registers four pack settings and only exposes packs that contain cards", () => {
  const registrations = [];
  const gameRef = { settings: { register: (moduleId, key, config) => registrations.push({ moduleId, key, config }) } };
  assert.equal(registerSettings(gameRef), true);
  assert.deepEqual(registrations.map((entry) => entry.key), [
    SETTING_KEYS.PHYSICAL_ACTIONS,
    SETTING_KEYS.SOCIAL_ACTIONS,
    SETTING_KEYS.SUBTERFUGE_ACTIONS,
    SETTING_KEYS.KNOWLEDGE_UTILITY
  ]);
  assert.deepEqual(registrations.map((entry) => entry.config.config), [true, true, true, true]);
  assert.deepEqual(registrations.map((entry) => entry.config.default), [true, true, true, true]);
  for (const entry of registrations) {
    assert.equal(entry.moduleId, MODULE_ID);
    assert.equal(entry.config.scope, "world");
    assert.equal(entry.config.type, Boolean);
  }
});

test("reads independent pack settings and falls back to configured defaults", () => {
  const values = new Map([
    [SETTING_KEYS.PHYSICAL_ACTIONS, false],
    [SETTING_KEYS.SOCIAL_ACTIONS, true],
    [SETTING_KEYS.SUBTERFUGE_ACTIONS, false],
    [SETTING_KEYS.KNOWLEDGE_UTILITY, true]
  ]);
  const gameRef = { settings: { get: (_moduleId, key) => values.get(key) } };
  assert.deepEqual(readPackSettings(gameRef), Object.fromEntries(values));

  const fallback = readPackSettings({ settings: { get: () => { throw new Error("not ready"); } } });
  assert.equal(fallback[SETTING_KEYS.PHYSICAL_ACTIONS], true);
  assert.equal(fallback[SETTING_KEYS.SOCIAL_ACTIONS], true);
  assert.equal(fallback[SETTING_KEYS.SUBTERFUGE_ACTIONS], true);
  assert.equal(fallback[SETTING_KEYS.KNOWLEDGE_UTILITY], true);
});

test("all active packs honor independent settings", () => {
  const packs = buildSkillfulConsequencePacks({
    [SETTING_KEYS.PHYSICAL_ACTIONS]: true,
    [SETTING_KEYS.SOCIAL_ACTIONS]: true,
    [SETTING_KEYS.SUBTERFUGE_ACTIONS]: true,
    [SETTING_KEYS.KNOWLEDGE_UTILITY]: true
  });
  assert.equal(packs[0].enabled, true);
  assert.equal(packs[1].enabled, true);
  assert.equal(packs[2].enabled, true);
  assert.equal(packs[3].enabled, true);
});
