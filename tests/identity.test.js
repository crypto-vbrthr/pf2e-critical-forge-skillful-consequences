import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PHYSICAL_ACTION_CARDS } from "../scripts/data/cards/physical-actions.js";
import { SOCIAL_ACTION_CARDS } from "../scripts/data/cards/social-actions.js";
import { SUBTERFUGE_ACTION_CARDS } from "../scripts/data/cards/subterfuge-actions.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const KNOWN_NEIGHBOR_TITLES = new Set([
  "Weapon Jolt", "Tangled Feet", "Open Flank", "Wild Swing", "Grand Gesture",
  "Slippery Grip", "Weapon Out of Line", "Awkward Regrip", "Forced Reset", "Lost Rhythm",
  "Broken Pick Requests Promotion", "Lock Profile Accidentally Saved", "Safety Flag Deploys",
  "Probe Locks Fully Extended", "Tension Wrench Starts Counting", "Magnetic Organizer Finds the Lock",
  "Continuity Tester Announces Everything", "Inspection Lamp Performs a Flash Test"
]);

test("current Skillful Consequences titles do not duplicate known supplied neighboring cards", () => {
  for (const card of [...PHYSICAL_ACTION_CARDS, ...SOCIAL_ACTION_CARDS, ...SUBTERFUGE_ACTION_CARDS]) {
    assert.equal(KNOWN_NEIGHBOR_TITLES.has(card.fallbackTitle), false, card.fallbackTitle);
  }
});

test("overlap review records the physical, social, and extension boundaries", () => {
  const review = fs.readFileSync(path.join(root, "docs/OVERLAP_REVIEW.md"), "utf8");
  for (const phrase of [
    "Critical Forge Core", "Goblin Engineering", "Martial Consequences",
    "Grapple", "Trip", "Tumble Through", "Feint", "Create a Diversion", "Lie", "Impersonate", "Make an Impression", "Request", "Gather Information", "Demoralize", "Coerce", "Hide", "Sneak", "Conceal an Object", "Pick a Lock", "Disable a Device", "Palm an Object", "Steal",
    "skillCheckCriticalSuccess", "skillCheckCriticalFailure"
  ]) {
    assert.match(review, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
});
