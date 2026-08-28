import test from "node:test";
import assert from "node:assert/strict";
import { PACK_IDS } from "../scripts/constants.js";
import { PHYSICAL_ACTION_CARDS } from "../scripts/data/cards/physical-actions.js";
import { SOCIAL_ACTION_CARDS } from "../scripts/data/cards/social-actions.js";
import { SUBTERFUGE_ACTION_CARDS } from "../scripts/data/cards/subterfuge-actions.js";
import { KNOWLEDGE_UTILITY_CARDS } from "../scripts/data/cards/knowledge-utility-actions.js";
import { buildSkillfulConsequencePacks } from "../scripts/data/packs.js";

const ATHLETICS_ACTIONS = new Set(["grapple", "trip", "shove", "reposition", "disarm", "climb", "swim", "high-jump", "long-jump", "force-open"]);
const ACROBATICS_ACTIONS = new Set(["balance", "tumble-through", "maneuver-in-flight", "squeeze"]);
const PHYSICAL_ACTIONS = new Set([...ATHLETICS_ACTIONS, ...ACROBATICS_ACTIONS]);
const DECEPTION_ACTIONS = new Set(["feint", "create-a-diversion", "lie", "impersonate"]);
const DIPLOMACY_ACTIONS = new Set(["make-an-impression", "request", "gather-information"]);
const INTIMIDATION_ACTIONS = new Set(["demoralize", "coerce"]);
const PERFORMANCE_ACTIONS = new Set(["perform"]);
const SOCIAL_ACTIONS = new Set([...DECEPTION_ACTIONS, ...DIPLOMACY_ACTIONS, ...INTIMIDATION_ACTIONS, ...PERFORMANCE_ACTIONS]);
const ALL_CARDS = [...PHYSICAL_ACTION_CARDS, ...SOCIAL_ACTION_CARDS, ...SUBTERFUGE_ACTION_CARDS, ...KNOWLEDGE_UTILITY_CARDS];

const forAction = (cards, slug) => cards.filter((card) => card.filters.actionSlugs.includes(slug));
const forOutcome = (cards, category) => cards.filter((card) => card.category === category);

test("release candidate contains two hundred eighteen unique cards across four active packs", () => {
  assert.equal(PHYSICAL_ACTION_CARDS.length, 56);
  assert.equal(SOCIAL_ACTION_CARDS.length, 50);
  assert.equal(SUBTERFUGE_ACTION_CARDS.length, 38);
  assert.equal(KNOWLEDGE_UTILITY_CARDS.length, 74);
  assert.equal(ALL_CARDS.length, 218);
  assert.equal(new Set(ALL_CARDS.map((card) => card.id)).size, 218);
  assert.equal(new Set(ALL_CARDS.map((card) => card.fallbackTitle)).size, 218);
});

test("physical actions retain their intended mini-deck density", () => {
  for (const slug of ["grapple", "trip", "tumble-through"]) {
    const cards = forAction(PHYSICAL_ACTION_CARDS, slug);
    assert.equal(cards.length, 6, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 3, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 3, `${slug} failure`);
  }
  for (const slug of ["shove", "reposition", "disarm", "climb", "swim", "balance", "maneuver-in-flight", "force-open"]) {
    const cards = forAction(PHYSICAL_ACTION_CARDS, slug);
    assert.equal(cards.length, 4, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 2, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 2, `${slug} failure`);
  }
  for (const slug of ["high-jump", "long-jump", "squeeze"]) {
    const cards = forAction(PHYSICAL_ACTION_CARDS, slug);
    assert.equal(cards.length, 2, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 1, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 1, `${slug} failure`);
  }
});

test("social actions follow frequent and regular mini-deck density", () => {
  for (const slug of ["feint", "lie", "gather-information", "demoralize", "perform"]) {
    const cards = forAction(SOCIAL_ACTION_CARDS, slug);
    assert.equal(cards.length, 6, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 3, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 3, `${slug} failure`);
  }
  for (const slug of ["create-a-diversion", "impersonate", "make-an-impression", "request", "coerce"]) {
    const cards = forAction(SOCIAL_ACTION_CARDS, slug);
    assert.equal(cards.length, 4, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 2, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 2, `${slug} failure`);
  }
});

test("all current cards are exact skill-deck cards for their pack and skill family", () => {
  for (const card of PHYSICAL_ACTION_CARDS) {
    assert.equal(card.packId, PACK_IDS.PHYSICAL_ACTIONS);
    assert.equal(card.deckType, "skill");
    assert.equal(card.filters.actionSlugs.length, 1, card.id);
    const action = card.filters.actionSlugs[0];
    assert.equal(PHYSICAL_ACTIONS.has(action), true, card.id);
    const expectedSkill = ATHLETICS_ACTIONS.has(action) ? "athletics" : "acrobatics";
    assert.deepEqual(card.filters.skillTypes, [expectedSkill], card.id);
    assert.equal(card.metadata.actionFamily, expectedSkill, card.id);
    assert.equal(card.effect, null, card.id);
    assert.equal(card.metadata.resolution, "manual", card.id);
    assert.equal(card.metadata.preservesCoreOutcome, true, card.id);
  }
  for (const card of SOCIAL_ACTION_CARDS) {
    assert.equal(card.packId, PACK_IDS.SOCIAL_ACTIONS);
    assert.equal(card.deckType, "skill");
    assert.equal(card.filters.actionSlugs.length, 1, card.id);
    const action = card.filters.actionSlugs[0];
    assert.equal(SOCIAL_ACTIONS.has(action), true, card.id);
    const expectedSkill = DECEPTION_ACTIONS.has(action) ? "deception" : DIPLOMACY_ACTIONS.has(action) ? "diplomacy" : INTIMIDATION_ACTIONS.has(action) ? "intimidation" : PERFORMANCE_ACTIONS.has(action) ? "performance" : null;
    assert.ok(expectedSkill, card.id);
    assert.deepEqual(card.filters.skillTypes, [expectedSkill], card.id);
    assert.equal(card.metadata.actionFamily, expectedSkill, card.id);
    assert.equal(card.effect, null, card.id);
    assert.equal(card.metadata.resolution, "manual", card.id);
    assert.equal(card.metadata.preservesCoreOutcome, true, card.id);
  }
});



test("subterfuge actions use exact Stealth, Thievery, and Society forgery filters", () => {
  const stealth = new Set(["hide", "sneak", "conceal-an-object"]);
  const thievery = new Set(["pick-a-lock", "disable-a-device", "palm-an-object", "steal"]);
  const society = new Set(["create-forgery"]);
  for (const card of SUBTERFUGE_ACTION_CARDS) {
    assert.equal(card.packId, PACK_IDS.SUBTERFUGE_ACTIONS);
    assert.equal(card.deckType, "skill");
    assert.equal(card.filters.actionSlugs.length, 1, card.id);
    const action = card.filters.actionSlugs[0];
    const expectedSkill = stealth.has(action) ? "stealth" : thievery.has(action) ? "thievery" : society.has(action) ? "society" : null;
    assert.ok(expectedSkill, card.id);
    assert.deepEqual(card.filters.skillTypes, [expectedSkill], card.id);
    assert.equal(card.metadata.actionFamily, expectedSkill, card.id);
    if (expectedSkill === "stealth" || expectedSkill === "society") {
      assert.equal(card.tags.includes("secret-check"), true, card.id);
      assert.equal(card.tags.includes("gm-facing"), true, card.id);
    }
    assert.equal(card.effect, null, card.id);
    assert.equal(card.metadata.resolution, "manual", card.id);
    assert.equal(card.metadata.preservesCoreOutcome, true, card.id);
  }
});


test("knowledge and utility actions use deliberate Medicine, Crafting, knowledge, Nature, Survival, magic-learning, downtime, and utility filters", () => {
  const medicine = new Set(["treat-wounds", "administer-first-aid", "treat-disease", "treat-poison"]);
  const crafting = new Set(["repair", "craft"]);
  const knowledge = new Set(["recall-knowledge", "identify-magic", "identify-alchemy", "decipher-writing"]);
  const survival = new Set(["track", "sense-direction", "subsist", "cover-tracks"]);
  const utility = new Set(["aid"]);
  const nature = new Set(["command-an-animal"]);
  const magicLearning = new Set(["learn-a-spell"]);
  const downtime = new Set(["earn-income"]);
  for (const card of KNOWLEDGE_UTILITY_CARDS) {
    assert.equal(card.packId, PACK_IDS.KNOWLEDGE_UTILITY);
    assert.equal(card.deckType, "skill");
    assert.equal(card.filters.actionSlugs.length, 1, card.id);
    const action = card.filters.actionSlugs[0];
    if (medicine.has(action)) {
      assert.deepEqual(card.filters.skillTypes, ["medicine"], card.id);
      assert.equal(card.metadata.actionFamily, "medicine", card.id);
    } else if (crafting.has(action)) {
      assert.deepEqual(card.filters.skillTypes, ["crafting"], card.id);
      assert.equal(card.metadata.actionFamily, "crafting", card.id);
    } else if (knowledge.has(action)) {
      assert.equal(card.metadata.actionFamily, "knowledge", card.id);
      assert.equal(card.tags.includes("secret-check"), true, card.id);
      assert.equal(card.tags.includes("gm-facing"), true, card.id);
      if (action === "recall-knowledge") assert.deepEqual(card.filters.skillTypes, [], card.id);
      if (action === "decipher-writing") assert.deepEqual(card.filters.skillTypes, ["arcana", "society", "occultism", "religion"], card.id);
      if (action === "identify-magic") assert.deepEqual(card.filters.skillTypes, ["arcana", "nature", "occultism", "religion"], card.id);
      if (action === "identify-alchemy") assert.deepEqual(card.filters.skillTypes, ["crafting"], card.id);
    } else if (survival.has(action)) {
      assert.equal(card.metadata.actionFamily, "survival", card.id);
      if (action === "subsist") assert.deepEqual(card.filters.skillTypes, ["survival", "society"], card.id);
      else assert.deepEqual(card.filters.skillTypes, ["survival"], card.id);
      if (action === "sense-direction") {
        assert.equal(card.tags.includes("secret-check"), true, card.id);
        assert.equal(card.tags.includes("gm-facing"), true, card.id);
      }
    } else if (utility.has(action)) {
      assert.equal(card.metadata.actionFamily, "utility", card.id);
      assert.deepEqual(card.filters.skillTypes, [], card.id);
    } else if (nature.has(action)) {
      assert.equal(card.metadata.actionFamily, "nature", card.id);
      assert.deepEqual(card.filters.skillTypes, ["nature"], card.id);
    } else if (magicLearning.has(action)) {
      assert.equal(card.metadata.actionFamily, "magic-learning", card.id);
      assert.deepEqual(card.filters.skillTypes, ["arcana", "nature", "occultism", "religion"], card.id);
    } else if (downtime.has(action)) {
      assert.equal(card.metadata.actionFamily, "downtime", card.id);
      assert.deepEqual(card.filters.skillTypes, [], card.id);
    } else assert.fail(`unexpected Knowledge & Utility action: ${action}`);
    assert.equal(card.effect, null, card.id);
    assert.equal(card.metadata.resolution, "manual", card.id);
    assert.equal(card.metadata.preservesCoreOutcome, true, card.id);
  }
});

test("Medicine and Crafting use the intended first-block density", () => {
  for (const slug of ["treat-wounds", "administer-first-aid", "repair", "craft"]) {
    const cards = forAction(KNOWLEDGE_UTILITY_CARDS, slug);
    assert.equal(cards.length, 4, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 2, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 2, `${slug} failure`);
  }
  for (const slug of ["treat-disease", "treat-poison"]) {
    const cards = forAction(KNOWLEDGE_UTILITY_CARDS, slug);
    assert.equal(cards.length, 2, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 1, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 1, `${slug} failure`);
  }
});


test("knowledge actions use the intended first-block density and secret-check boundary", () => {
  const recall = forAction(KNOWLEDGE_UTILITY_CARDS, "recall-knowledge");
  assert.equal(recall.length, 6);
  assert.equal(forOutcome(recall, "skillCheckCriticalSuccess").length, 3);
  assert.equal(forOutcome(recall, "skillCheckCriticalFailure").length, 3);
  for (const slug of ["identify-magic", "identify-alchemy", "decipher-writing"]) {
    const cards = forAction(KNOWLEDGE_UTILITY_CARDS, slug);
    assert.equal(cards.length, 4, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 2, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 2, `${slug} failure`);
  }
  for (const card of [...recall, ...forAction(KNOWLEDGE_UTILITY_CARDS, "identify-magic"), ...forAction(KNOWLEDGE_UTILITY_CARDS, "identify-alchemy"), ...forAction(KNOWLEDGE_UTILITY_CARDS, "decipher-writing")]) {
    assert.equal(card.tags.includes("secret-check"), true, card.id);
    assert.equal(card.tags.includes("gm-facing"), true, card.id);
  }
  for (const card of KNOWLEDGE_UTILITY_CARDS.filter((card) => card.metadata.actionFamily === "knowledge" && card.category === "skillCheckCriticalFailure")) {
    assert.equal(card.impact, "narrative", card.id);
    assert.equal(card.tags.includes("no-mechanical-effect"), true, card.id);
  }
});



test("Survival and exploration actions use the intended mini-deck density", () => {
  const track = forAction(KNOWLEDGE_UTILITY_CARDS, "track");
  assert.equal(track.length, 6);
  assert.equal(forOutcome(track, "skillCheckCriticalSuccess").length, 3);
  assert.equal(forOutcome(track, "skillCheckCriticalFailure").length, 3);
  for (const slug of ["sense-direction", "subsist", "cover-tracks"]) {
    const cards = forAction(KNOWLEDGE_UTILITY_CARDS, slug);
    assert.equal(cards.length, 4, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 2, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 2, `${slug} failure`);
  }
});

test("Sense Direction preserves secret-check information boundaries and Subsist supports both skills", () => {
  const senseDirection = forAction(KNOWLEDGE_UTILITY_CARDS, "sense-direction");
  assert.equal(senseDirection.every((card) => card.tags.includes("secret-check") && card.tags.includes("gm-facing")), true);
  for (const card of forOutcome(senseDirection, "skillCheckCriticalFailure")) {
    assert.equal(card.impact, "narrative", card.id);
    assert.equal(card.tags.includes("no-mechanical-effect"), true, card.id);
  }
  for (const card of forAction(KNOWLEDGE_UTILITY_CARDS, "subsist")) {
    assert.deepEqual(card.filters.skillTypes, ["survival", "society"], card.id);
  }
});

test("Perform and Aid use frequent-action density with deliberate filter boundaries", () => {
  const perform = forAction(SOCIAL_ACTION_CARDS, "perform");
  assert.equal(perform.length, 6);
  assert.equal(forOutcome(perform, "skillCheckCriticalSuccess").length, 3);
  assert.equal(forOutcome(perform, "skillCheckCriticalFailure").length, 3);
  for (const card of perform) {
    assert.deepEqual(card.filters.skillTypes, ["performance"], card.id);
    assert.equal(card.metadata.actionFamily, "performance", card.id);
  }

  const aid = forAction(KNOWLEDGE_UTILITY_CARDS, "aid");
  assert.equal(aid.length, 6);
  assert.equal(forOutcome(aid, "skillCheckCriticalSuccess").length, 3);
  assert.equal(forOutcome(aid, "skillCheckCriticalFailure").length, 3);
  for (const card of aid) {
    assert.deepEqual(card.filters.skillTypes, [], card.id);
    assert.equal(card.metadata.actionFamily, "utility", card.id);
  }
});

test("remaining supported actions use regular density and preserve their special boundaries", () => {
  for (const slug of ["force-open", "create-forgery", "command-an-animal", "learn-a-spell", "earn-income"]) {
    const source = slug === "force-open" ? PHYSICAL_ACTION_CARDS : slug === "create-forgery" ? SUBTERFUGE_ACTION_CARDS : KNOWLEDGE_UTILITY_CARDS;
    const cards = forAction(source, slug);
    assert.equal(cards.length, 4, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 2, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 2, `${slug} failure`);
  }
  for (const card of forAction(SUBTERFUGE_ACTION_CARDS, "create-forgery")) {
    assert.equal(card.tags.includes("secret-check"), true, card.id);
    assert.equal(card.tags.includes("gm-facing"), true, card.id);
  }
  for (const card of forAction(KNOWLEDGE_UTILITY_CARDS, "earn-income")) {
    assert.deepEqual(card.filters.skillTypes, [], card.id);
  }
});

test("Medicine and Crafting consequences remain action-centered rather than equipment-centered", () => {
  for (const card of KNOWLEDGE_UTILITY_CARDS) {
    assert.equal(card.tags.includes("equipment"), false, card.id);
    assert.equal(card.tags.includes("toolkit"), false, card.id);
    assert.equal(card.tags.includes("malfunction"), false, card.id);
  }
  assert.equal(forAction(KNOWLEDGE_UTILITY_CARDS, "treat-wounds").some((card) => card.tags.includes("diagnosis")), true);
  assert.equal(forAction(KNOWLEDGE_UTILITY_CARDS, "repair").some((card) => card.tags.includes("same-item")), true);
  assert.equal(forAction(KNOWLEDGE_UTILITY_CARDS, "craft").some((card) => card.tags.includes("same-formula")), true);
});

test("every card explicitly preserves the normal PF2e critical result", () => {
  for (const card of ALL_CARDS) {
    if (card.category === "skillCheckCriticalSuccess") {
      assert.match(card.fallbackDescription, /^Resolve the normal critical success/i, card.id);
    } else {
      assert.match(card.fallbackDescription, /^Resolve the normal critical failure/i, card.id);
    }
  }
});

test("social consequences avoid strong results and preserve narrative variety", () => {
  assert.equal(SOCIAL_ACTION_CARDS.some((card) => card.impact === "strong"), false);
  assert.ok(SOCIAL_ACTION_CARDS.filter((card) => card.impact === "narrative").length >= 18);
});

test("Gather Information cards remain GM-facing secret-check tools", () => {
  const cards = forAction(SOCIAL_ACTION_CARDS, "gather-information");
  assert.equal(cards.length, 6);
  for (const card of cards) {
    assert.equal(card.tags.includes("secret-check"), true, card.id);
    assert.equal(card.tags.includes("gm-facing"), true, card.id);
  }
  const failures = forOutcome(cards, "skillCheckCriticalFailure");
  assert.equal(failures.length, 3);
  for (const card of failures) {
    assert.equal(card.impact, "narrative", card.id);
    assert.equal(card.tags.includes("gm-facing"), true, card.id);
    assert.equal(card.tags.includes("no-mechanical-effect"), true, card.id);
  }
});

test("pack topology exposes all four populated action packs", () => {
  const packs = buildSkillfulConsequencePacks();
  assert.equal(packs.length, 4);
  assert.equal(packs[0].enabled, true);
  assert.equal(packs[0].decks.skill.cards.length, 56);
  assert.equal(packs[1].enabled, true);
  assert.equal(packs[1].decks.skill.cards.length, 50);
  assert.equal(packs[2].enabled, true);
  assert.equal(packs[2].decks.skill.cards.length, 38);
  assert.equal(packs[3].enabled, true);
  assert.equal(packs[3].decks.skill.cards.length, 74);
});
