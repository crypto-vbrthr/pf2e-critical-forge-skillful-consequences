import test from "node:test";
import assert from "node:assert/strict";
import { PACK_IDS } from "../scripts/constants.js";
import { PHYSICAL_ACTION_CARDS } from "../scripts/data/cards/physical-actions.js";
import { buildSkillfulConsequencePacks } from "../scripts/data/packs.js";

const ATHLETICS_ACTIONS = new Set(["grapple", "trip", "shove", "reposition", "disarm", "climb", "swim", "high-jump", "long-jump"]);
const ACROBATICS_ACTIONS = new Set(["balance", "tumble-through", "maneuver-in-flight", "squeeze"]);
const ALL_ACTIONS = new Set([...ATHLETICS_ACTIONS, ...ACROBATICS_ACTIONS]);

const forAction = (slug) => PHYSICAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes(slug));
const forOutcome = (cards, category) => cards.filter((card) => card.category === category);

test("dev.4 contains fifty-two unique Physical Actions cards", () => {
  assert.equal(PHYSICAL_ACTION_CARDS.length, 52);
  assert.equal(new Set(PHYSICAL_ACTION_CARDS.map((card) => card.id)).size, 52);
  assert.equal(new Set(PHYSICAL_ACTION_CARDS.map((card) => card.fallbackTitle)).size, 52);
});

test("frequent, regular, and narrow physical actions meet their intended mini-deck density", () => {
  for (const slug of ["grapple", "trip", "tumble-through"]) {
    const cards = forAction(slug);
    assert.equal(cards.length, 6, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 3, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 3, `${slug} failure`);
  }
  for (const slug of ["shove", "reposition", "disarm", "climb", "swim", "balance", "maneuver-in-flight"]) {
    const cards = forAction(slug);
    assert.equal(cards.length, 4, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 2, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 2, `${slug} failure`);
  }
  for (const slug of ["high-jump", "long-jump", "squeeze"]) {
    const cards = forAction(slug);
    assert.equal(cards.length, 2, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 1, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 1, `${slug} failure`);
  }
});

test("all current cards are exact Physical Actions skill-deck cards", () => {
  for (const card of PHYSICAL_ACTION_CARDS) {
    assert.equal(card.packId, PACK_IDS.PHYSICAL_ACTIONS);
    assert.equal(card.deckType, "skill");
    assert.equal(card.filters.actionSlugs.length, 1, card.id);
    const action = card.filters.actionSlugs[0];
    assert.equal(ALL_ACTIONS.has(action), true, card.id);
    const expectedSkill = ATHLETICS_ACTIONS.has(action) ? "athletics" : "acrobatics";
    assert.deepEqual(card.filters.skillTypes, [expectedSkill], card.id);
    assert.equal(card.metadata.actionFamily, expectedSkill, card.id);
    assert.equal(card.effect, null, card.id);
    assert.equal(card.metadata.resolution, "manual", card.id);
    assert.equal(card.metadata.preservesCoreOutcome, true, card.id);
  }
});

test("every card explicitly preserves the normal PF2e critical result", () => {
  for (const card of PHYSICAL_ACTION_CARDS) {
    if (card.category === "skillCheckCriticalSuccess") {
      assert.match(card.fallbackDescription, /^Resolve the normal critical success/i, card.id);
    } else {
      assert.match(card.fallbackDescription, /^Resolve the normal critical failure/i, card.id);
    }
  }
});

test("the current physical blocks avoid strong consequences and retain narrative breathing room", () => {
  assert.equal(PHYSICAL_ACTION_CARDS.some((card) => card.impact === "strong"), false);
  assert.ok(PHYSICAL_ACTION_CARDS.filter((card) => card.impact === "narrative").length >= 13);
});

test("pack topology reserves future families while only Physical Actions is enabled", () => {
  const packs = buildSkillfulConsequencePacks();
  assert.equal(packs.length, 4);
  assert.equal(packs[0].enabled, true);
  assert.equal(packs[0].decks.skill.cards.length, 52);
  for (const pack of packs.slice(1)) {
    assert.equal(pack.enabled, false);
    assert.equal(pack.decks.skill.cards.length, 0);
  }
});
