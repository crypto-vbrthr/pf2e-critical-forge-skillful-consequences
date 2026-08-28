import test from "node:test";
import assert from "node:assert/strict";
import { PACK_IDS } from "../scripts/constants.js";
import { PHYSICAL_ACTION_CARDS } from "../scripts/data/cards/physical-actions.js";
import { buildSkillfulConsequencePacks } from "../scripts/data/packs.js";

const forAction = (slug) => PHYSICAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes(slug));
const forOutcome = (cards, category) => cards.filter((card) => card.category === category);

test("dev.3 contains thirty-six unique Physical Actions cards", () => {
  assert.equal(PHYSICAL_ACTION_CARDS.length, 36);
  assert.equal(new Set(PHYSICAL_ACTION_CARDS.map((card) => card.id)).size, 36);
  assert.equal(new Set(PHYSICAL_ACTION_CARDS.map((card) => card.fallbackTitle)).size, 36);
});

test("frequent and regular Athletics actions meet their intended mini-deck density", () => {
  for (const slug of ["grapple", "trip"]) {
    const cards = forAction(slug);
    assert.equal(cards.length, 6, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 3, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 3, `${slug} failure`);
  }
  for (const slug of ["shove", "reposition", "disarm", "climb", "swim"]) {
    const cards = forAction(slug);
    assert.equal(cards.length, 4, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 2, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 2, `${slug} failure`);
  }
  for (const slug of ["high-jump", "long-jump"]) {
    const cards = forAction(slug);
    assert.equal(cards.length, 2, slug);
    assert.equal(forOutcome(cards, "skillCheckCriticalSuccess").length, 1, `${slug} success`);
    assert.equal(forOutcome(cards, "skillCheckCriticalFailure").length, 1, `${slug} failure`);
  }
});

test("all current cards are Athletics skill-deck cards with exact action filters", () => {
  for (const card of PHYSICAL_ACTION_CARDS) {
    assert.equal(card.packId, PACK_IDS.PHYSICAL_ACTIONS);
    assert.equal(card.deckType, "skill");
    assert.deepEqual(card.filters.skillTypes, ["athletics"], card.id);
    assert.equal(card.filters.actionSlugs.length, 1, card.id);
    assert.equal(["grapple", "trip", "shove", "reposition", "disarm", "climb", "swim", "high-jump", "long-jump"].includes(card.filters.actionSlugs[0]), true, card.id);
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

test("the current physical blocks avoid strong consequences", () => {
  assert.equal(PHYSICAL_ACTION_CARDS.some((card) => card.impact === "strong"), false);
  assert.ok(PHYSICAL_ACTION_CARDS.filter((card) => card.impact === "narrative").length >= 9);
});

test("pack topology reserves future families while only Physical Actions is enabled", () => {
  const packs = buildSkillfulConsequencePacks();
  assert.equal(packs.length, 4);
  assert.equal(packs[0].enabled, true);
  assert.equal(packs[0].decks.skill.cards.length, 36);
  for (const pack of packs.slice(1)) {
    assert.equal(pack.enabled, false);
    assert.equal(pack.decks.skill.cards.length, 0);
  }
});
