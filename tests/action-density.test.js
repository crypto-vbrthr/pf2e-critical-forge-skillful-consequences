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

test("frequent social actions keep six-card density", () => {
  for (const action of ["feint", "lie", "gather-information", "demoralize"]) {
    assert.equal(count(SOCIAL_ACTION_CARDS, action, "skillCheckCriticalSuccess"), 3, `${action} success density`);
    assert.equal(count(SOCIAL_ACTION_CARDS, action, "skillCheckCriticalFailure"), 3, `${action} failure density`);
  }
});

test("regular social actions keep four-card density", () => {
  for (const action of ["create-a-diversion", "impersonate", "make-an-impression", "request", "coerce"]) {
    assert.equal(count(SOCIAL_ACTION_CARDS, action, "skillCheckCriticalSuccess"), 2, `${action} success density`);
    assert.equal(count(SOCIAL_ACTION_CARDS, action, "skillCheckCriticalFailure"), 2, `${action} failure density`);
  }
});

test("Diplomacy and Intimidation use varied consequence modes", () => {
  const byAction = (action) => SOCIAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes(action));
  assert.equal(byAction("make-an-impression").some((card) => card.tags.includes("teamwork")), true);
  assert.equal(byAction("make-an-impression").some((card) => card.tags.includes("narrative")), true);
  assert.equal(byAction("request").some((card) => card.tags.includes("information")), true);
  assert.equal(byAction("request").some((card) => card.tags.includes("teamwork")), true);
  assert.equal(byAction("gather-information").every((card) => card.tags.includes("secret-check")), true);
  assert.equal(byAction("gather-information").some((card) => card.tags.includes("lead")), true);
  assert.equal(byAction("gather-information").some((card) => card.tags.includes("misinformation")), true);
  assert.equal(byAction("demoralize").some((card) => card.tags.includes("momentum")), true);
  assert.equal(byAction("demoralize").some((card) => card.tags.includes("behavioral-tell")), true);
  assert.equal(byAction("demoralize").some((card) => card.tags.includes("coerce")), true);
  assert.equal(byAction("coerce").some((card) => card.tags.includes("information")), true);
  assert.equal(byAction("coerce").some((card) => card.tags.includes("witnesses")), true);
  assert.equal(byAction("coerce").some((card) => card.tags.includes("narrative")), true);
});
