import test from "node:test";
import assert from "node:assert/strict";
import { PHYSICAL_ACTION_CARDS } from "../scripts/data/cards/physical-actions.js";

function count(action, category) {
  return PHYSICAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes(action) && card.category === category).length;
}

test("frequent actions begin at the intended six-card density", () => {
  for (const action of ["grapple", "trip"]) {
    assert.equal(count(action, "skillCheckCriticalSuccess"), 3, `${action} success density`);
    assert.equal(count(action, "skillCheckCriticalFailure"), 3, `${action} failure density`);
  }
});

test("each action includes distinct consequence modes", () => {
  const grapple = PHYSICAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes("grapple"));
  const trip = PHYSICAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes("trip"));
  assert.equal(grapple.some((card) => card.tags.includes("teamwork")), true);
  assert.equal(grapple.some((card) => card.tags.includes("narrative")), true);
  assert.equal(trip.some((card) => card.tags.includes("movement")), true);
  assert.equal(trip.some((card) => card.tags.includes("narrative")), true);
});
