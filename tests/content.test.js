import test from "node:test";
import assert from "node:assert/strict";
import { PACK_IDS } from "../scripts/constants.js";
import { PHYSICAL_ACTION_CARDS } from "../scripts/data/cards/physical-actions.js";
import { SOCIAL_ACTION_CARDS } from "../scripts/data/cards/social-actions.js";
import { SUBTERFUGE_ACTION_CARDS } from "../scripts/data/cards/subterfuge-actions.js";
import { buildSkillfulConsequencePacks } from "../scripts/data/packs.js";

const ATHLETICS_ACTIONS = new Set(["grapple", "trip", "shove", "reposition", "disarm", "climb", "swim", "high-jump", "long-jump"]);
const ACROBATICS_ACTIONS = new Set(["balance", "tumble-through", "maneuver-in-flight", "squeeze"]);
const PHYSICAL_ACTIONS = new Set([...ATHLETICS_ACTIONS, ...ACROBATICS_ACTIONS]);
const DECEPTION_ACTIONS = new Set(["feint", "create-a-diversion", "lie", "impersonate"]);
const DIPLOMACY_ACTIONS = new Set(["make-an-impression", "request", "gather-information"]);
const INTIMIDATION_ACTIONS = new Set(["demoralize", "coerce"]);
const SOCIAL_ACTIONS = new Set([...DECEPTION_ACTIONS, ...DIPLOMACY_ACTIONS, ...INTIMIDATION_ACTIONS]);
const ALL_CARDS = [...PHYSICAL_ACTION_CARDS, ...SOCIAL_ACTION_CARDS, ...SUBTERFUGE_ACTION_CARDS];

const forAction = (cards, slug) => cards.filter((card) => card.filters.actionSlugs.includes(slug));
const forOutcome = (cards, category) => cards.filter((card) => card.category === category);

test("dev.7 contains one hundred twelve unique cards across Physical, Social, and Subterfuge Actions", () => {
  assert.equal(PHYSICAL_ACTION_CARDS.length, 52);
  assert.equal(SOCIAL_ACTION_CARDS.length, 44);
  assert.equal(SUBTERFUGE_ACTION_CARDS.length, 16);
  assert.equal(ALL_CARDS.length, 112);
  assert.equal(new Set(ALL_CARDS.map((card) => card.id)).size, 112);
  assert.equal(new Set(ALL_CARDS.map((card) => card.fallbackTitle)).size, 112);
});

test("physical actions retain their intended mini-deck density", () => {
  for (const slug of ["grapple", "trip", "tumble-through"]) {
    const cards = forAction(PHYSICAL_ACTION_CARDS, slug);
    assert.equal(cards.length, 6, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 3, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 3, `${slug} failure`);
  }
  for (const slug of ["shove", "reposition", "disarm", "climb", "swim", "balance", "maneuver-in-flight"]) {
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
  for (const slug of ["feint", "lie", "gather-information", "demoralize"]) {
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
    const expectedSkill = DECEPTION_ACTIONS.has(action) ? "deception" : DIPLOMACY_ACTIONS.has(action) ? "diplomacy" : "intimidation";
    assert.deepEqual(card.filters.skillTypes, [expectedSkill], card.id);
    assert.equal(card.metadata.actionFamily, expectedSkill, card.id);
    assert.equal(card.effect, null, card.id);
    assert.equal(card.metadata.resolution, "manual", card.id);
    assert.equal(card.metadata.preservesCoreOutcome, true, card.id);
  }
});



test("subterfuge actions use exact Stealth action filters and preserve secret-check presentation", () => {
  const supported = new Set(["hide", "sneak", "conceal-an-object"]);
  for (const card of SUBTERFUGE_ACTION_CARDS) {
    assert.equal(card.packId, PACK_IDS.SUBTERFUGE_ACTIONS);
    assert.equal(card.deckType, "skill");
    assert.equal(card.filters.actionSlugs.length, 1, card.id);
    assert.equal(supported.has(card.filters.actionSlugs[0]), true, card.id);
    assert.deepEqual(card.filters.skillTypes, ["stealth"], card.id);
    assert.equal(card.metadata.actionFamily, "stealth", card.id);
    assert.equal(card.tags.includes("secret-check"), true, card.id);
    assert.equal(card.tags.includes("gm-facing"), true, card.id);
    assert.equal(card.effect, null, card.id);
    assert.equal(card.metadata.resolution, "manual", card.id);
    assert.equal(card.metadata.preservesCoreOutcome, true, card.id);
  }
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

test("Gather Information failure cards remain GM-facing secret-check narrative tools", () => {
  const cards = forAction(SOCIAL_ACTION_CARDS, "gather-information");
  assert.equal(cards.length, 6);
  for (const card of cards) assert.equal(card.tags.includes("secret-check"), true, card.id);
  const failures = forOutcome(cards, "skillCheckCriticalFailure");
  assert.equal(failures.length, 3);
  for (const card of failures) {
    assert.equal(card.impact, "narrative", card.id);
    assert.equal(card.tags.includes("gm-facing"), true, card.id);
    assert.equal(card.tags.includes("no-mechanical-effect"), true, card.id);
  }
});

test("pack topology exposes Physical, Social, and Subterfuge Actions while Knowledge & Utility stays reserved", () => {
  const packs = buildSkillfulConsequencePacks();
  assert.equal(packs.length, 4);
  assert.equal(packs[0].enabled, true);
  assert.equal(packs[0].decks.skill.cards.length, 52);
  assert.equal(packs[1].enabled, true);
  assert.equal(packs[1].decks.skill.cards.length, 44);
  assert.equal(packs[2].enabled, true);
  assert.equal(packs[2].decks.skill.cards.length, 16);
  assert.equal(packs[3].enabled, false);
  assert.equal(packs[3].decks.skill.cards.length, 0);
});
