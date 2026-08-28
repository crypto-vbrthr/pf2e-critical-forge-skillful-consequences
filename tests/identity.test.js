import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PHYSICAL_ACTION_CARDS } from "../scripts/data/cards/physical-actions.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const KNOWN_NEIGHBOR_TITLES = new Set([
  "Weapon Jolt", "Tangled Feet", "Open Flank", "Wild Swing", "Grand Gesture",
  "Slippery Grip", "Weapon Out of Line", "Awkward Regrip", "Forced Reset", "Lost Rhythm",
  "Broken Pick Requests Promotion", "Lock Profile Accidentally Saved", "Safety Flag Deploys"
]);

test("Physical Action titles do not duplicate known supplied neighboring cards", () => {
  for (const card of PHYSICAL_ACTION_CARDS) {
    assert.equal(KNOWN_NEIGHBOR_TITLES.has(card.fallbackTitle), false, card.fallbackTitle);
  }
});

test("overlap review records the skill/action boundary", () => {
  const review = fs.readFileSync(path.join(root, "docs/OVERLAP_REVIEW.md"), "utf8");
  for (const phrase of ["Critical Forge Core", "Goblin Engineering", "Martial Consequences", "Grapple", "Trip", "Shove", "Reposition", "Disarm", "skillCheckCriticalSuccess", "skillCheckCriticalFailure"]) {
    assert.match(review, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
});
