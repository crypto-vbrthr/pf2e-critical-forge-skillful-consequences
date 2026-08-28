import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PHYSICAL_ACTION_CARDS } from "../scripts/data/cards/physical-actions.js";
import { SOCIAL_ACTION_CARDS } from "../scripts/data/cards/social-actions.js";
import { SUBTERFUGE_ACTION_CARDS } from "../scripts/data/cards/subterfuge-actions.js";
import { KNOWLEDGE_UTILITY_CARDS } from "../scripts/data/cards/knowledge-utility-actions.js";
import { SKILLFUL_PACK_CONFIGS } from "../scripts/data/packs.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const allCards = [...PHYSICAL_ACTION_CARDS, ...SOCIAL_ACTION_CARDS, ...SUBTERFUGE_ACTION_CARDS, ...KNOWLEDGE_UTILITY_CARDS];

const FREQUENT = Object.freeze([
  "aid", "demoralize", "disable-a-device", "feint", "gather-information", "grapple", "hide",
  "lie", "perform", "recall-knowledge", "sneak", "track", "trip", "tumble-through"
]);
const REGULAR = Object.freeze([
  "administer-first-aid", "balance", "climb", "coerce", "command-an-animal", "conceal-an-object",
  "cover-tracks", "craft", "create-a-diversion", "create-forgery", "decipher-writing", "disarm",
  "earn-income", "force-open", "identify-alchemy", "identify-magic", "impersonate", "learn-a-spell",
  "make-an-impression", "maneuver-in-flight", "palm-an-object", "pick-a-lock", "repair", "reposition",
  "request", "sense-direction", "shove", "steal", "subsist", "swim", "treat-wounds"
]);
const NARROW = Object.freeze(["high-jump", "long-jump", "squeeze", "treat-disease", "treat-poison"]);
const EXPECTED_ACTIONS = Object.freeze([...FREQUENT, ...REGULAR, ...NARROW].sort());

function actionCounts() {
  const result = new Map();
  for (const card of allCards) {
    for (const action of card.filters.actionSlugs ?? []) {
      const count = result.get(action) ?? { success: 0, failure: 0 };
      if (card.category === "skillCheckCriticalSuccess") count.success += 1;
      if (card.category === "skillCheckCriticalFailure") count.failure += 1;
      result.set(action, count);
    }
  }
  return result;
}

test("dev.14 review covers exactly 50 supported action slugs", () => {
  const cardActions = [...actionCounts().keys()].sort();
  const packActions = SKILLFUL_PACK_CONFIGS.flatMap((pack) => pack.metadata.supportedActions).sort();
  assert.equal(EXPECTED_ACTIONS.length, 50);
  assert.deepEqual(cardActions, EXPECTED_ACTIONS);
  assert.deepEqual(packActions, EXPECTED_ACTIONS);
  assert.equal(new Set(packActions).size, 50);
});

test("dev.14 reviewed density tiers are exact and total 218 cards", () => {
  const counts = actionCounts();
  for (const action of FREQUENT) assert.deepEqual(counts.get(action), { success: 3, failure: 3 }, action);
  for (const action of REGULAR) assert.deepEqual(counts.get(action), { success: 2, failure: 2 }, action);
  for (const action of NARROW) assert.deepEqual(counts.get(action), { success: 1, failure: 1 }, action);
  assert.equal(FREQUENT.length, 14);
  assert.equal(REGULAR.length, 31);
  assert.equal(NARROW.length, 5);
  assert.equal((FREQUENT.length * 6) + (REGULAR.length * 4) + (NARROW.length * 2), 218);
  assert.equal(allCards.length, 218);
});

test("social secret checks are consistently GM-facing", () => {
  for (const action of ["lie", "impersonate", "gather-information"]) {
    const cards = SOCIAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes(action));
    assert.ok(cards.length > 0, action);
    assert.equal(cards.every((card) => card.tags.includes("secret-check") && card.tags.includes("gm-facing")), true, action);
  }
});

test("dev.14 review documents deliberate completeness boundaries", () => {
  const review = readFileSync(join(root, "docs/ACTION_COMPLETENESS_DENSITY_REVIEW.md"), "utf8");
  for (const token of ["218 cards", "50 supported action slugs", "14 frequent", "31 regular", "5 narrow", "Borrow an Arcane Spell", "Seek", "Sense Motive"]) {
    assert.match(review, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), token);
  }
});
