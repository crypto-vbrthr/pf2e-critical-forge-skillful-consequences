import test from "node:test";
import assert from "node:assert/strict";
import { PHYSICAL_ACTION_CARDS } from "../scripts/data/cards/physical-actions.js";
import { SOCIAL_ACTION_CARDS } from "../scripts/data/cards/social-actions.js";
import { SUBTERFUGE_ACTION_CARDS } from "../scripts/data/cards/subterfuge-actions.js";

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


test("frequent Stealth actions keep six-card density", () => {
  for (const action of ["hide", "sneak"]) {
    assert.equal(count(SUBTERFUGE_ACTION_CARDS, action, "skillCheckCriticalSuccess"), 3, `${action} success density`);
    assert.equal(count(SUBTERFUGE_ACTION_CARDS, action, "skillCheckCriticalFailure"), 3, `${action} failure density`);
  }
});

test("regular Stealth actions keep four-card density", () => {
  assert.equal(count(SUBTERFUGE_ACTION_CARDS, "conceal-an-object", "skillCheckCriticalSuccess"), 2);
  assert.equal(count(SUBTERFUGE_ACTION_CARDS, "conceal-an-object", "skillCheckCriticalFailure"), 2);
});

test("Stealth cards mix follow-up, teamwork, route, and narrative consequences", () => {
  const byAction = (action) => SUBTERFUGE_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes(action));
  assert.equal(byAction("hide").some((card) => card.tags.includes("teamwork")), true);
  assert.equal(byAction("hide").some((card) => card.tags.includes("narrative")), true);
  assert.equal(byAction("sneak").some((card) => card.tags.includes("route")), true);
  assert.equal(byAction("sneak").some((card) => card.tags.includes("trace")), true);
  assert.equal(byAction("conceal-an-object").some((card) => card.tags.includes("seek")), true);
  assert.equal(byAction("conceal-an-object").some((card) => card.tags.includes("narrative")), true);
});


test("frequent Thievery actions keep six-card density", () => {
  assert.equal(count(SUBTERFUGE_ACTION_CARDS, "disable-a-device", "skillCheckCriticalSuccess"), 3);
  assert.equal(count(SUBTERFUGE_ACTION_CARDS, "disable-a-device", "skillCheckCriticalFailure"), 3);
});

test("regular Thievery actions keep four-card density", () => {
  for (const action of ["pick-a-lock", "palm-an-object", "steal"]) {
    assert.equal(count(SUBTERFUGE_ACTION_CARDS, action, "skillCheckCriticalSuccess"), 2, `${action} success density`);
    assert.equal(count(SUBTERFUGE_ACTION_CARDS, action, "skillCheckCriticalFailure"), 2, `${action} failure density`);
  }
});

test("Thievery consequences stay action-centered rather than equipment-centered", () => {
  const byAction = (action) => SUBTERFUGE_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes(action));
  assert.equal(byAction("pick-a-lock").some((card) => card.tags.includes("same-lock")), true);
  assert.equal(byAction("pick-a-lock").some((card) => card.tags.includes("evidence")), true);
  assert.equal(byAction("disable-a-device").some((card) => card.tags.includes("trigger")), true);
  assert.equal(byAction("disable-a-device").some((card) => card.tags.includes("inspection")), true);
  assert.equal(byAction("palm-an-object").some((card) => card.tags.includes("teamwork")), true);
  assert.equal(byAction("palm-an-object").some((card) => card.tags.includes("same-observers")), true);
  assert.equal(byAction("steal").some((card) => card.tags.includes("same-bearer")), true);
  assert.equal(byAction("steal").some((card) => card.tags.includes("behavioral-tell")), true);
  for (const card of SUBTERFUGE_ACTION_CARDS.filter((card) => card.metadata.actionFamily === "thievery")) {
    assert.equal(card.tags.includes("equipment"), false, card.id);
    assert.equal(card.tags.includes("toolkit"), false, card.id);
  }
});
