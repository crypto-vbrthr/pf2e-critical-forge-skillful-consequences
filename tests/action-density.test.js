import test from "node:test";
import assert from "node:assert/strict";
import { PHYSICAL_ACTION_CARDS } from "../scripts/data/cards/physical-actions.js";

function count(action, category) {
  return PHYSICAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes(action) && card.category === category).length;
}

test("frequent actions keep six-card density", () => {
  for (const action of ["grapple", "trip"]) {
    assert.equal(count(action, "skillCheckCriticalSuccess"), 3, `${action} success density`);
    assert.equal(count(action, "skillCheckCriticalFailure"), 3, `${action} failure density`);
  }
});

test("regular Athletics actions begin at four-card density", () => {
  for (const action of ["shove", "reposition", "disarm"]) {
    assert.equal(count(action, "skillCheckCriticalSuccess"), 2, `${action} success density`);
    assert.equal(count(action, "skillCheckCriticalFailure"), 2, `${action} failure density`);
  }
});

test("each supported action has more than one consequence mode", () => {
  const byAction = (action) => PHYSICAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes(action));
  assert.equal(byAction("grapple").some((card) => card.tags.includes("teamwork")), true);
  assert.equal(byAction("grapple").some((card) => card.tags.includes("narrative")), true);
  assert.equal(byAction("trip").some((card) => card.tags.includes("movement")), true);
  assert.equal(byAction("trip").some((card) => card.tags.includes("narrative")), true);
  assert.equal(byAction("shove").some((card) => card.tags.includes("speed")), true);
  assert.equal(byAction("shove").some((card) => card.tags.includes("narrative")), true);
  assert.equal(byAction("reposition").some((card) => card.tags.includes("defense")), true);
  assert.equal(byAction("reposition").some((card) => card.tags.includes("narrative")), true);
  assert.equal(byAction("disarm").some((card) => card.tags.includes("positioning")), true);
  assert.equal(byAction("disarm").some((card) => card.tags.includes("narrative")), true);
});
