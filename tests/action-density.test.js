import test from "node:test";
import assert from "node:assert/strict";
import { PHYSICAL_ACTION_CARDS } from "../scripts/data/cards/physical-actions.js";
import { SOCIAL_ACTION_CARDS } from "../scripts/data/cards/social-actions.js";
import { SUBTERFUGE_ACTION_CARDS } from "../scripts/data/cards/subterfuge-actions.js";
import { KNOWLEDGE_UTILITY_CARDS } from "../scripts/data/cards/knowledge-utility-actions.js";

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
  for (const action of ["feint", "lie", "gather-information", "demoralize", "perform"]) {
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


test("regular Medicine and Crafting actions keep four-card density", () => {
  for (const action of ["treat-wounds", "administer-first-aid", "repair", "craft"]) {
    assert.equal(count(KNOWLEDGE_UTILITY_CARDS, action, "skillCheckCriticalSuccess"), 2, `${action} success density`);
    assert.equal(count(KNOWLEDGE_UTILITY_CARDS, action, "skillCheckCriticalFailure"), 2, `${action} failure density`);
  }
});

test("narrow Medicine actions keep two-card density", () => {
  for (const action of ["treat-disease", "treat-poison"]) {
    assert.equal(count(KNOWLEDGE_UTILITY_CARDS, action, "skillCheckCriticalSuccess"), 1, `${action} success density`);
    assert.equal(count(KNOWLEDGE_UTILITY_CARDS, action, "skillCheckCriticalFailure"), 1, `${action} failure density`);
  }
});

test("Medicine and Crafting mix follow-up and narrative consequences", () => {
  const byAction = (action) => KNOWLEDGE_UTILITY_CARDS.filter((card) => card.filters.actionSlugs.includes(action));
  assert.equal(byAction("treat-wounds").some((card) => card.tags.includes("follow-up")), true);
  assert.equal(byAction("treat-wounds").some((card) => card.tags.includes("narrative")), true);
  assert.equal(byAction("administer-first-aid").some((card) => card.tags.includes("diagnosis")), true);
  assert.equal(byAction("repair").some((card) => card.tags.includes("information")), true);
  assert.equal(byAction("craft").some((card) => card.tags.includes("teamwork")), true);
  assert.equal(byAction("craft").some((card) => card.tags.includes("learning")), true);
});


test("knowledge actions keep frequent and regular mini-deck density", () => {
  assert.equal(count(KNOWLEDGE_UTILITY_CARDS, "recall-knowledge", "skillCheckCriticalSuccess"), 3);
  assert.equal(count(KNOWLEDGE_UTILITY_CARDS, "recall-knowledge", "skillCheckCriticalFailure"), 3);
  for (const action of ["identify-magic", "identify-alchemy", "decipher-writing"]) {
    assert.equal(count(KNOWLEDGE_UTILITY_CARDS, action, "skillCheckCriticalSuccess"), 2, `${action} success density`);
    assert.equal(count(KNOWLEDGE_UTILITY_CARDS, action, "skillCheckCriticalFailure"), 2, `${action} failure density`);
  }
});

test("knowledge actions remain GM-facing and preserve hidden misinformation", () => {
  const actions = ["recall-knowledge", "identify-magic", "identify-alchemy", "decipher-writing"];
  for (const action of actions) {
    const cards = KNOWLEDGE_UTILITY_CARDS.filter((card) => card.filters.actionSlugs.includes(action));
    assert.ok(cards.length >= 4, action);
    assert.equal(cards.every((card) => card.tags.includes("secret-check") && card.tags.includes("gm-facing")), true, action);
    const failures = cards.filter((card) => card.category === "skillCheckCriticalFailure");
    assert.equal(failures.every((card) => card.impact === "narrative" && card.tags.includes("no-mechanical-effect")), true, action);
  }
});

test("knowledge actions use intended skill-filter breadth", () => {
  const recall = KNOWLEDGE_UTILITY_CARDS.filter((card) => card.filters.actionSlugs.includes("recall-knowledge"));
  const decipher = KNOWLEDGE_UTILITY_CARDS.filter((card) => card.filters.actionSlugs.includes("decipher-writing"));
  const magic = KNOWLEDGE_UTILITY_CARDS.filter((card) => card.filters.actionSlugs.includes("identify-magic"));
  const alchemy = KNOWLEDGE_UTILITY_CARDS.filter((card) => card.filters.actionSlugs.includes("identify-alchemy"));
  assert.equal(recall.every((card) => card.filters.skillTypes.length === 0), true);
  assert.equal(decipher.every((card) => ["arcana", "society", "occultism", "religion"].every((skill) => card.filters.skillTypes.includes(skill))), true);
  assert.equal(magic.every((card) => ["arcana", "nature", "occultism", "religion"].every((skill) => card.filters.skillTypes.includes(skill))), true);
  assert.equal(alchemy.every((card) => card.filters.skillTypes.length === 1 && card.filters.skillTypes[0] === "crafting"), true);
});


test("Survival actions keep frequent and regular mini-deck density", () => {
  assert.equal(count(KNOWLEDGE_UTILITY_CARDS, "track", "skillCheckCriticalSuccess"), 3);
  assert.equal(count(KNOWLEDGE_UTILITY_CARDS, "track", "skillCheckCriticalFailure"), 3);
  for (const action of ["sense-direction", "subsist", "cover-tracks"]) {
    assert.equal(count(KNOWLEDGE_UTILITY_CARDS, action, "skillCheckCriticalSuccess"), 2, `${action} success density`);
    assert.equal(count(KNOWLEDGE_UTILITY_CARDS, action, "skillCheckCriticalFailure"), 2, `${action} failure density`);
  }
});

test("Survival consequences mix route, information, teamwork, and secret navigation", () => {
  const byAction = (action) => KNOWLEDGE_UTILITY_CARDS.filter((card) => card.filters.actionSlugs.includes(action));
  assert.equal(byAction("track").some((card) => card.tags.includes("teamwork")), true);
  assert.equal(byAction("track").some((card) => card.tags.includes("information")), true);
  assert.equal(byAction("sense-direction").every((card) => card.tags.includes("secret-check") && card.tags.includes("gm-facing")), true);
  assert.equal(byAction("subsist").some((card) => card.tags.includes("resource")), true);
  assert.equal(byAction("cover-tracks").some((card) => card.tags.includes("misdirection")), true);
});

test("Performance and Aid use full six-card mini-decks", () => {
  assert.equal(count(SOCIAL_ACTION_CARDS, "perform", "skillCheckCriticalSuccess"), 3);
  assert.equal(count(SOCIAL_ACTION_CARDS, "perform", "skillCheckCriticalFailure"), 3);
  assert.equal(count(KNOWLEDGE_UTILITY_CARDS, "aid", "skillCheckCriticalSuccess"), 3);
  assert.equal(count(KNOWLEDGE_UTILITY_CARDS, "aid", "skillCheckCriticalFailure"), 3);
});

test("Performance and Aid mix teamwork, follow-up, and narrative consequences", () => {
  const perform = SOCIAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes("perform"));
  const aid = KNOWLEDGE_UTILITY_CARDS.filter((card) => card.filters.actionSlugs.includes("aid"));
  assert.equal(perform.some((card) => card.tags.includes("teamwork")), true);
  assert.equal(perform.some((card) => card.tags.includes("narrative")), true);
  assert.equal(aid.some((card) => card.tags.includes("reciprocal")), true);
  assert.equal(aid.some((card) => card.tags.includes("narrative")), true);
});

