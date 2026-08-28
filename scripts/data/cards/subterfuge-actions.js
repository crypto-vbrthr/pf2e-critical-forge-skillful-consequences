import { PACK_IDS } from "../../constants.js";
import { defineSkillActionCard } from "./card-factory.js";

const SUBTERFUGE_PACK = PACK_IDS.SUBTERFUGE_ACTIONS;
const STEALTH = Object.freeze({ skillTypes: ["stealth"] });

function defineStealth(options) {
  return defineSkillActionCard({
    ...options,
    packId: SUBTERFUGE_PACK,
    collection: "subterfuge-actions",
    actionFamily: "stealth",
    filters: {
      ...STEALTH,
      ...(options.filters ?? {})
    }
  });
}

export const SUBTERFUGE_ACTION_CARDS = Object.freeze([
  defineStealth({
    id: "hide-success-001-shadowed-exit",
    localizationKey: "ShadowedExit",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Shadowed Exit",
    fallbackDescription: "Resolve the normal critical success for Hide first. Your next Sneak check before the end of your next turn gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["stealth", "hide", "sneak", "follow-up", "secret-check", "gm-facing", "one-use"],
    filters: { actionSlugs: ["hide"] },
    contentBatch: 7
  }),
  defineStealth({
    id: "hide-success-002-shared-blind-spot",
    localizationKey: "SharedBlindSpot",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Shared Blind Spot",
    fallbackDescription: "Resolve the normal critical success for Hide first. The first ally who attempts to Hide before the start of your next turn and can plausibly use the same cover, concealment, or distraction gains a +1 circumstance bonus to that check. The bonus then ends.",
    tags: ["stealth", "hide", "teamwork", "cover", "concealment", "secret-check", "gm-facing", "one-use"],
    filters: { actionSlugs: ["hide"] },
    contentBatch: 7
  }),
  defineStealth({
    id: "hide-success-003-escape-route-read",
    localizationKey: "EscapeRouteRead",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Escape Route Read",
    fallbackDescription: "Resolve the normal critical success for Hide first. There is no additional mechanical effect. If the immediate scene offers one, the GM points out a nearby piece of cover, concealment, shadow, crowd movement, or similar feature that could plausibly support your next attempt to remain unseen.",
    tags: ["stealth", "hide", "narrative", "route", "environment", "secret-check", "gm-facing", "no-mechanical-effect"],
    filters: { actionSlugs: ["hide"] },
    contentBatch: 7
  }),
  defineStealth({
    id: "hide-failure-001-cover-gives-you-away",
    localizationKey: "CoverGivesYouAway",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Cover Gives You Away",
    fallbackDescription: "Resolve the normal critical failure for Hide first. There is no additional mechanical effect. One relevant observer notices the angle, silhouette, movement, reflection, or disturbed feature that betrayed the hiding attempt. Keep this consequence GM-facing when Hide is rolled secretly.",
    tags: ["stealth", "hide", "narrative", "observer", "secret-check", "gm-facing", "no-mechanical-effect"],
    filters: { actionSlugs: ["hide"] },
    contentBatch: 7
  }),
  defineStealth({
    id: "hide-failure-002-movement-before-stillness",
    localizationKey: "MovementBeforeStillness",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Movement Before Stillness",
    fallbackDescription: "Resolve the normal critical failure for Hide first. Your next Sneak check before the end of your next turn takes a -1 circumstance penalty because the failed setup has made your movement easier to anticipate. The penalty then ends. Keep this consequence GM-facing when the check is secret.",
    tags: ["stealth", "hide", "sneak", "follow-up", "secret-check", "gm-facing", "brief-setback", "one-use"],
    filters: { actionSlugs: ["hide"] },
    contentBatch: 7
  }),
  defineStealth({
    id: "hide-failure-003-hiding-habit-spotted",
    localizationKey: "HidingHabitSpotted",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Hiding Habit Spotted",
    fallbackDescription: "Resolve the normal critical failure for Hide first. Your next Hide check within 10 minutes against any of the same relevant observers takes a -1 circumstance penalty. The penalty then ends. Keep this consequence GM-facing when the check is secret.",
    tags: ["stealth", "hide", "same-observers", "secret-check", "gm-facing", "brief-setback", "one-use"],
    filters: { actionSlugs: ["hide"] },
    contentBatch: 7
  }),

  defineStealth({
    id: "sneak-success-001-quiet-rhythm",
    localizationKey: "QuietRhythm",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Quiet Rhythm",
    fallbackDescription: "Resolve the normal critical success for Sneak first. Your next Sneak check before the end of your next turn gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["stealth", "sneak", "momentum", "secret-check", "gm-facing", "one-use"],
    filters: { actionSlugs: ["sneak"] },
    contentBatch: 7
  }),
  defineStealth({
    id: "sneak-success-002-path-for-another",
    localizationKey: "PathForAnother",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Path for Another",
    fallbackDescription: "Resolve the normal critical success for Sneak first. The first ally who attempts to Sneak before the start of your next turn along substantially the same route gains a +1 circumstance bonus if the route and observers are still relevant. The bonus then ends.",
    tags: ["stealth", "sneak", "teamwork", "route", "secret-check", "gm-facing", "one-use"],
    filters: { actionSlugs: ["sneak"] },
    contentBatch: 7
  }),
  defineStealth({
    id: "sneak-success-003-position-unread",
    localizationKey: "PositionUnread",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Position Unread",
    fallbackDescription: "Resolve the normal critical success for Sneak first. Your next Hide check before the end of your next turn gains a +1 circumstance bonus if you can still use your new position to break observation. The bonus then ends.",
    tags: ["stealth", "sneak", "hide", "follow-up", "secret-check", "gm-facing", "one-use"],
    filters: { actionSlugs: ["sneak"] },
    contentBatch: 7
  }),
  defineStealth({
    id: "sneak-failure-001-route-burned",
    localizationKey: "RouteBurned",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Route Burned",
    fallbackDescription: "Resolve the normal critical failure for Sneak first. Your next Sneak check within 1 minute along substantially the same route against any of the same relevant observers takes a -1 circumstance penalty. The penalty then ends. Keep this consequence GM-facing when the check is secret.",
    tags: ["stealth", "sneak", "route", "same-observers", "secret-check", "gm-facing", "brief-setback", "one-use"],
    filters: { actionSlugs: ["sneak"] },
    contentBatch: 7
  }),
  defineStealth({
    id: "sneak-failure-002-sound-carries-ahead",
    localizationKey: "SoundCarriesAhead",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    fallbackTitle: "Sound Carries Ahead",
    fallbackDescription: "Resolve the normal critical failure for Sneak first. There is no additional mechanical effect. A relevant observer can infer something plausible about your direction of travel from the sound, vibration, displaced material, or movement that exposed you. Keep this consequence GM-facing when Sneak is rolled secretly.",
    tags: ["stealth", "sneak", "narrative", "direction", "observer", "secret-check", "gm-facing", "no-mechanical-effect"],
    filters: { actionSlugs: ["sneak"] },
    contentBatch: 7
  }),
  defineStealth({
    id: "sneak-failure-003-trail-tells-a-story",
    localizationKey: "TrailTellsAStory",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Trail Tells a Story",
    fallbackDescription: "Resolve the normal critical failure for Sneak first. There is no additional mechanical effect. Your movement leaves a minor but plausible clue such as disturbed dust, a shifted object, a scuff, a scent, or a snagged thread. It does not automatically reveal more than the normal critical failure already does. Keep this consequence GM-facing for a secret check.",
    tags: ["stealth", "sneak", "narrative", "trace", "secret-check", "gm-facing", "no-mechanical-effect"],
    filters: { actionSlugs: ["sneak"] },
    contentBatch: 7
  }),

  defineStealth({
    id: "conceal-an-object-success-001-natural-hiding-place",
    localizationKey: "NaturalHidingPlace",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Natural Hiding Place",
    fallbackDescription: "Resolve the normal critical success for Conceal an Object first. Your next Conceal an Object check within 10 minutes in the same immediate area gains a +1 circumstance bonus if the surroundings still provide similar hiding opportunities. The bonus then ends.",
    tags: ["stealth", "conceal-an-object", "environment", "follow-up", "secret-check", "gm-facing", "one-use"],
    filters: { actionSlugs: ["conceal-an-object"] },
    contentBatch: 7
  }),
  defineStealth({
    id: "conceal-an-object-success-002-misdirection-layer",
    localizationKey: "MisdirectionLayer",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Misdirection Layer",
    fallbackDescription: "Resolve the normal critical success for Conceal an Object first. If a creature that was relevant to the original check specifically Seeks the same object before it is moved, its first such Seek check takes a -1 circumstance penalty if your placement can plausibly misdirect the search. The penalty then ends.",
    tags: ["stealth", "conceal-an-object", "seek", "same-object", "secret-check", "gm-facing", "one-use"],
    filters: { actionSlugs: ["conceal-an-object"] },
    contentBatch: 7
  }),
  defineStealth({
    id: "conceal-an-object-failure-001-concealment-habit-exposed",
    localizationKey: "ConcealmentHabitExposed",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Concealment Habit Exposed",
    fallbackDescription: "Resolve the normal critical failure for Conceal an Object first. Your next Conceal an Object check within 10 minutes against any of the same relevant observers takes a -1 circumstance penalty. The penalty then ends. Keep this consequence GM-facing when the check is secret.",
    tags: ["stealth", "conceal-an-object", "same-observers", "secret-check", "gm-facing", "brief-setback", "one-use"],
    filters: { actionSlugs: ["conceal-an-object"] },
    contentBatch: 7
  }),
  defineStealth({
    id: "conceal-an-object-failure-002-hiding-place-draws-the-eye",
    localizationKey: "HidingPlaceDrawsTheEye",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Hiding Place Draws the Eye",
    fallbackDescription: "Resolve the normal critical failure for Conceal an Object first. There is no additional mechanical effect. The failed attempt makes one nearby hiding feature, container, fold, pocket, or piece of scenery look suspicious to a relevant observer. This does not create additional detection beyond the normal result. Keep this consequence GM-facing for a secret check.",
    tags: ["stealth", "conceal-an-object", "narrative", "observer", "secret-check", "gm-facing", "no-mechanical-effect"],
    filters: { actionSlugs: ["conceal-an-object"] },
    contentBatch: 7
  })
]);
