import test from "node:test";
import assert from "node:assert/strict";
import { PHYSICAL_ACTION_CARDS } from "../scripts/data/cards/physical-actions.js";
import { SOCIAL_ACTION_CARDS } from "../scripts/data/cards/social-actions.js";

function count(cards, action, category) {
  return cards.filter((card) => card.filters.actionSlugs.includes(action) && card.category === category).length;
}

test("frequent physical actions keep six-card density", () => {
  for (const action of ["grapple", "trip", "tumble-through"]) {
    assert.equal(count(PHYSICAL_ACTION_CARDS, action, "skillCheckCriticalSuccess"), 3, `${action} success density`);
    assert.equal(count(PHYSICAL_ACTION_CARDS, action, "skillCheckCriticalFailure"), 3, `${action} failure density`);
  }
});

test("regular physical actions keep four-card density", () => {
  for (const action of ["shove", "reposition", "disarm", "climb", "swim", "balance", "maneuver-in-flight"]) {
    assert.equal(count(PHYSICAL_ACTION_CARDS, action, "skillCheckCriticalSuccess"), 2, `${action} success density`);
    assert.equal(count(PHYSICAL_ACTION_CARDS, action, "skillCheckCriticalFailure"), 2, `${action} failure density`);
  }
});

test("narrow physical actions keep two-card density", () => {
  for (const action of ["high-jump", "long-jump", "squeeze"]) {
    assert.equal(count(PHYSICAL_ACTION_CARDS, action, "skillCheckCriticalSuccess"), 1, `${action} success density`);
    assert.equal(count(PHYSICAL_ACTION_CARDS, action, "skillCheckCriticalFailure"), 1, `${action} failure density`);
  }
});

test("Deception I follows six-card frequent and four-card regular density", () => {
  for (const action of ["feint", "lie"]) {
    assert.equal(count(SOCIAL_ACTION_CARDS, action, "skillCheckCriticalSuccess"), 3, `${action} success density`);
    assert.equal(count(SOCIAL_ACTION_CARDS, action, "skillCheckCriticalFailure"), 3, `${action} failure density`);
  }
  for (const action of ["create-a-diversion", "impersonate"]) {
    assert.equal(count(SOCIAL_ACTION_CARDS, action, "skillCheckCriticalSuccess"), 2, `${action} success density`);
    assert.equal(count(SOCIAL_ACTION_CARDS, action, "skillCheckCriticalFailure"), 2, `${action} failure density`);
  }
});

test("Deception actions use varied consequence modes", () => {
  const byAction = (action) => SOCIAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes(action));
  assert.equal(byAction("feint").some((card) => card.tags.includes("teamwork")), true);
  assert.equal(byAction("feint").some((card) => card.tags.includes("movement")), true);
  assert.equal(byAction("feint").some((card) => card.tags.includes("narrative")), true);
  assert.equal(byAction("create-a-diversion").some((card) => card.tags.includes("teamwork")), true);
  assert.equal(byAction("create-a-diversion").some((card) => card.tags.includes("stealth")), true);
  assert.equal(byAction("create-a-diversion").some((card) => card.tags.includes("narrative")), true);
  assert.equal(byAction("lie").some((card) => card.tags.includes("teamwork")), true);
  assert.equal(byAction("lie").some((card) => card.tags.includes("same-story")), true);
  assert.equal(byAction("lie").some((card) => card.tags.includes("narrative")), true);
  assert.equal(byAction("impersonate").some((card) => card.tags.includes("information")), true);
  assert.equal(byAction("impersonate").some((card) => card.tags.includes("recovery")), true);
  assert.equal(byAction("impersonate").some((card) => card.tags.includes("narrative")), true);
});
