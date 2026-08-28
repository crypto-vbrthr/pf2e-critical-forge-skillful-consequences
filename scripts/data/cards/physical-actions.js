import { PACK_IDS } from "../../constants.js";
import { defineSkillActionCard } from "./card-factory.js";

const PHYSICAL_PACK = PACK_IDS.PHYSICAL_ACTIONS;
const ATHLETICS = Object.freeze({ skillTypes: ["athletics"] });

function defineAthletics(options) {
  return defineSkillActionCard({
    ...options,
    packId: PHYSICAL_PACK,
    collection: "physical-actions",
    actionFamily: "athletics",
    filters: {
      ...ATHLETICS,
      ...(options.filters ?? {})
    }
  });
}

export const PHYSICAL_ACTION_CARDS = Object.freeze([
  defineAthletics({
    id: "grapple-success-001-read-the-struggle",
    localizationKey: "ReadTheStruggle",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Read the Struggle",
    fallbackDescription: "Resolve the normal critical success for Grapple first. If the same target Escapes before the end of your next turn, your next Grapple check against that target before the end of your next turn gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["athletics", "grapple", "same-target", "one-use"],
    filters: { actionSlugs: ["grapple"] }
  }),
  defineAthletics({
    id: "grapple-success-002-locked-in-leverage",
    localizationKey: "LockedInLeverage",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Locked-In Leverage",
    fallbackDescription: "Resolve the normal critical success for Grapple first. Until the start of your next turn, you gain a +1 circumstance bonus to your Fortitude and Reflex DCs against attempts by that target to Shove, Reposition, or Trip you.",
    tags: ["athletics", "grapple", "defense", "same-target"],
    filters: { actionSlugs: ["grapple"] }
  }),
  defineAthletics({
    id: "grapple-success-003-opening-for-the-team",
    localizationKey: "OpeningForTheTeam",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    weight: 0.8,
    fallbackTitle: "Opening for the Team",
    fallbackDescription: "Resolve the normal critical success for Grapple first. The first ally other than you who attempts to Grapple, Reposition, Shove, or Trip the same target before the start of your next turn gains a +1 circumstance bonus to that check. The bonus then ends.",
    tags: ["athletics", "grapple", "teamwork", "same-target", "one-use"],
    filters: { actionSlugs: ["grapple"] }
  }),
  defineAthletics({
    id: "grapple-failure-001-overcommitted-hold",
    localizationKey: "OvercommittedHold",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Overcommitted Hold",
    fallbackDescription: "Resolve the normal critical failure for Grapple first. Your next Athletics check before the end of your next turn takes a -1 circumstance penalty. The penalty then ends.",
    tags: ["athletics", "grapple", "setback", "one-use"],
    filters: { actionSlugs: ["grapple"] }
  }),
  defineAthletics({
    id: "grapple-failure-002-breath-lost-in-the-clinch",
    localizationKey: "BreathLostInTheClinch",
    category: "skillCheckCriticalFailure",
    impact: "moderate",
    weight: 0.75,
    fallbackTitle: "Breath Lost in the Clinch",
    fallbackDescription: "Resolve the normal critical failure for Grapple first. The failed clinch leaves you committed for a heartbeat; you can't use reactions until the start of your next turn.",
    tags: ["athletics", "grapple", "reactions", "brief-setback"],
    filters: { actionSlugs: ["grapple"] }
  }),
  defineAthletics({
    id: "grapple-failure-003-technique-laid-bare",
    localizationKey: "TechniqueLaidBare",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.25,
    fallbackTitle: "Technique Laid Bare",
    fallbackDescription: "Resolve the normal critical failure for Grapple first. There is no additional mechanical effect. The target and anyone closely observing the exchange can clearly see how you tried to enter the hold and where your leverage failed.",
    tags: ["athletics", "grapple", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["grapple"] }
  }),
  defineAthletics({
    id: "trip-success-001-clean-follow-through",
    localizationKey: "CleanFollowThrough",
    category: "skillCheckCriticalSuccess",
    impact: "moderate",
    weight: 0.65,
    fallbackTitle: "Clean Follow-Through",
    fallbackDescription: "Resolve the normal critical success for Trip first. You may immediately Step up to 5 feet as a free action, but you must end this Step adjacent to the target.",
    tags: ["athletics", "trip", "movement", "step", "same-target"],
    filters: { actionSlugs: ["trip"] }
  }),
  defineAthletics({
    id: "trip-success-002-grounded-advantage",
    localizationKey: "GroundedAdvantage",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Grounded Advantage",
    fallbackDescription: "Resolve the normal critical success for Trip first. Your next Grapple or Reposition check against the same target before the end of your next turn gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["athletics", "trip", "follow-up", "same-target", "one-use"],
    filters: { actionSlugs: ["trip"] }
  }),
  defineAthletics({
    id: "trip-success-003-footwork-intact",
    localizationKey: "FootworkIntact",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Footwork Intact",
    fallbackDescription: "Resolve the normal critical success for Trip first. Until the start of your next turn, you gain a +1 circumstance bonus to your Reflex DC against attempts to Trip or Reposition you.",
    tags: ["athletics", "trip", "defense", "footwork"],
    filters: { actionSlugs: ["trip"] }
  }),
  defineAthletics({
    id: "trip-failure-001-stance-collapses",
    localizationKey: "StanceCollapses",
    category: "skillCheckCriticalFailure",
    impact: "moderate",
    weight: 0.75,
    fallbackTitle: "Stance Collapses",
    fallbackDescription: "Resolve the normal critical failure for Trip first. Until the start of your next turn, you take a -1 circumstance penalty to Reflex saves and Reflex DC.",
    tags: ["athletics", "trip", "reflex", "brief-setback"],
    filters: { actionSlugs: ["trip"] }
  }),
  defineAthletics({
    id: "trip-failure-002-recovery-out-of-sequence",
    localizationKey: "RecoveryOutOfSequence",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Recovery Out of Sequence",
    fallbackDescription: "Resolve the normal critical failure for Trip first. If you Stand before the end of your next turn, your Speed is reduced by 5 feet until the end of the turn in which you Stand. If you don't Stand before then, this consequence ends with no additional effect.",
    tags: ["athletics", "trip", "recovery", "speed", "brief-setback"],
    filters: { actionSlugs: ["trip"] }
  }),
  defineAthletics({
    id: "trip-failure-003-setup-telegraphs-itself",
    localizationKey: "SetupTelegraphsItself",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.25,
    fallbackTitle: "Setup Telegraphs Itself",
    fallbackDescription: "Resolve the normal critical failure for Trip first. There is no additional mechanical effect. Anyone closely watching the exchange can tell exactly how you tried to take the target's footing and where the setup became obvious.",
    tags: ["athletics", "trip", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["trip"] }
  }),
  defineAthletics({
    id: "shove-success-001-momentum-carries",
    localizationKey: "MomentumCarries",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Momentum Carries",
    fallbackDescription: "Resolve the normal critical success for Shove first. The target's Speed is reduced by 5 feet until the start of your next turn as it recovers from the forced movement.",
    tags: ["athletics", "shove", "speed", "same-target", "brief-advantage"],
    filters: { actionSlugs: ["shove"] },
    contentBatch: 2
  }),
  defineAthletics({
    id: "shove-success-002-broken-line",
    localizationKey: "BrokenLine",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Broken Line",
    fallbackDescription: "Resolve the normal critical success for Shove first. The first ally other than you who attempts to Grapple, Reposition, or Trip the same target before the start of your next turn gains a +1 circumstance bonus to that check. The bonus then ends.",
    tags: ["athletics", "shove", "teamwork", "same-target", "one-use"],
    filters: { actionSlugs: ["shove"] },
    contentBatch: 2
  }),
  defineAthletics({
    id: "shove-failure-001-open-to-counterforce",
    localizationKey: "OpenToCounterforce",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Open to Counterforce",
    fallbackDescription: "Resolve the normal critical failure for Shove first. The first creature that attempts to Shove or Reposition you before the start of your next turn gains a +1 circumstance bonus to that check. The bonus then ends.",
    tags: ["athletics", "shove", "defense", "brief-setback", "one-use"],
    filters: { actionSlugs: ["shove"] },
    contentBatch: 2
  }),
  defineAthletics({
    id: "shove-failure-002-committed-direction",
    localizationKey: "CommittedDirection",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.2,
    fallbackTitle: "Committed Direction",
    fallbackDescription: "Resolve the normal critical failure for Shove first. There is no additional mechanical effect. The target and nearby observers can plainly read the direction of force you committed to and where your push lost its line.",
    tags: ["athletics", "shove", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["shove"] },
    contentBatch: 2
  }),
  defineAthletics({
    id: "reposition-success-001-controlled-rotation",
    localizationKey: "ControlledRotation",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Controlled Rotation",
    fallbackDescription: "Resolve the normal critical success for Reposition first. The first ally other than you who attempts to Trip or Disarm the same target before the start of your next turn gains a +1 circumstance bonus to that check. The bonus then ends.",
    tags: ["athletics", "reposition", "teamwork", "same-target", "one-use"],
    filters: { actionSlugs: ["reposition"] },
    contentBatch: 2
  }),
  defineAthletics({
    id: "reposition-success-002-base-kept-under-you",
    localizationKey: "BaseKeptUnderYou",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Base Kept Under You",
    fallbackDescription: "Resolve the normal critical success for Reposition first. Until the start of your next turn, you gain a +1 circumstance bonus to your Reflex DC against attempts by that target to Reposition, Shove, or Trip you.",
    tags: ["athletics", "reposition", "defense", "same-target"],
    filters: { actionSlugs: ["reposition"] },
    contentBatch: 2
  }),
  defineAthletics({
    id: "reposition-failure-001-feet-crossed",
    localizationKey: "FeetCrossed",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Feet Crossed",
    fallbackDescription: "Resolve the normal critical failure for Reposition first. Your Speed is reduced by 5 feet until the end of your next turn while you recover your stance.",
    tags: ["athletics", "reposition", "speed", "brief-setback"],
    filters: { actionSlugs: ["reposition"] },
    contentBatch: 2
  }),
  defineAthletics({
    id: "reposition-failure-002-intended-path-revealed",
    localizationKey: "IntendedPathRevealed",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.2,
    fallbackTitle: "Intended Path Revealed",
    fallbackDescription: "Resolve the normal critical failure for Reposition first. There is no additional mechanical effect. The target and close observers can tell exactly where you meant to put the target and which piece of leverage failed.",
    tags: ["athletics", "reposition", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["reposition"] },
    contentBatch: 2
  }),
  defineAthletics({
    id: "disarm-success-001-sent-clear",
    localizationKey: "SentClear",
    category: "skillCheckCriticalSuccess",
    impact: "moderate",
    weight: 0.75,
    fallbackTitle: "Sent Clear",
    fallbackDescription: "Resolve the normal critical success for Disarm first. If the target drops the item because of that result, you may choose an unoccupied legal space adjacent to the target for the item to land in. If no such space is available, it lands normally.",
    tags: ["athletics", "disarm", "item", "positioning", "same-target"],
    filters: { actionSlugs: ["disarm"] },
    contentBatch: 2
  }),
  defineAthletics({
    id: "disarm-success-002-hands-free-to-follow",
    localizationKey: "HandsFreeToFollow",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Hands Free to Follow",
    fallbackDescription: "Resolve the normal critical success for Disarm first. Your next Grapple or Shove check against the same target before the end of your next turn gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["athletics", "disarm", "follow-up", "same-target", "one-use"],
    filters: { actionSlugs: ["disarm"] },
    contentBatch: 2
  }),
  defineAthletics({
    id: "disarm-failure-001-grip-opened-instead",
    localizationKey: "GripOpenedInstead",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Grip Opened Instead",
    fallbackDescription: "Resolve the normal critical failure for Disarm first. The first creature that attempts to Disarm you before the start of your next turn gains a +1 circumstance bonus to that check. The bonus then ends.",
    tags: ["athletics", "disarm", "defense", "brief-setback", "one-use"],
    filters: { actionSlugs: ["disarm"] },
    contentBatch: 2
  }),
  defineAthletics({
    id: "disarm-failure-002-intent-telegraphed",
    localizationKey: "IntentTelegraphed",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.2,
    fallbackTitle: "Intent Telegraphed",
    fallbackDescription: "Resolve the normal critical failure for Disarm first. There is no additional mechanical effect. The target and anyone watching closely can see which item, hand, or grip you were trying to attack and how you meant to strip it away.",
    tags: ["athletics", "disarm", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["disarm"] },
    contentBatch: 2

  }),
  defineAthletics({
    id: "climb-success-001-route-locked-in",
    localizationKey: "RouteLockedIn",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Route Locked In",
    fallbackDescription: "Resolve the normal critical success for Climb first. Your next Climb check on the same surface before the end of your next turn gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["athletics", "climb", "same-surface", "follow-up", "one-use"],
    filters: { actionSlugs: ["climb"] },
    contentBatch: 3
  }),
  defineAthletics({
    id: "climb-success-002-handhold-for-the-next",
    localizationKey: "HandholdForTheNext",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Handhold for the Next",
    fallbackDescription: "Resolve the normal critical success for Climb first. The first ally who follows your route on the same surface before the start of your next turn gains a +1 circumstance bonus to their next Climb check there. The bonus then ends.",
    tags: ["athletics", "climb", "teamwork", "same-surface", "one-use"],
    filters: { actionSlugs: ["climb"] },
    contentBatch: 3
  }),
  defineAthletics({
    id: "climb-failure-001-forearms-flooded",
    localizationKey: "ForearmsFlooded",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Forearms Flooded",
    fallbackDescription: "Resolve the normal critical failure for Climb first. Your next Athletics check before the end of your next turn takes a -1 circumstance penalty as you recover your grip and breathing. The penalty then ends.",
    tags: ["athletics", "climb", "fatigue", "brief-setback", "one-use"],
    filters: { actionSlugs: ["climb"] },
    contentBatch: 3
  }),
  defineAthletics({
    id: "climb-failure-002-bad-route-exposed",
    localizationKey: "BadRouteExposed",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.25,
    fallbackTitle: "Bad Route Exposed",
    fallbackDescription: "Resolve the normal critical failure for Climb first. There is no additional mechanical effect. Your failed route makes the weak holds, awkward angle, or unstable section you trusted plainly visible to anyone watching.",
    tags: ["athletics", "climb", "narrative", "route", "no-mechanical-effect"],
    filters: { actionSlugs: ["climb"] },
    contentBatch: 3
  }),
  defineAthletics({
    id: "swim-success-001-efficient-stroke",
    localizationKey: "EfficientStroke",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Efficient Stroke",
    fallbackDescription: "Resolve the normal critical success for Swim first. On your next successful Swim before the end of your next turn, you may move 5 feet farther than that result would normally allow, if the route is legal. This benefit then ends.",
    tags: ["athletics", "swim", "movement", "follow-up", "one-use"],
    filters: { actionSlugs: ["swim"] },
    contentBatch: 3
  }),
  defineAthletics({
    id: "swim-success-002-wake-to-follow",
    localizationKey: "WakeToFollow",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Wake to Follow",
    fallbackDescription: "Resolve the normal critical success for Swim first. The first ally who follows roughly the same route through the water before the start of your next turn gains a +1 circumstance bonus to their next Swim check. The bonus then ends.",
    tags: ["athletics", "swim", "teamwork", "route", "one-use"],
    filters: { actionSlugs: ["swim"] },
    contentBatch: 3
  }),
  defineAthletics({
    id: "swim-failure-001-recovery-stroke",
    localizationKey: "RecoveryStroke",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Recovery Stroke",
    fallbackDescription: "Resolve the normal critical failure for Swim first. Before your next Swim check before the end of your next turn, you may spend 1 action steadying your breathing and stroke. If you do not, that Swim check takes a -1 circumstance penalty. This consequence then ends.",
    tags: ["athletics", "swim", "recovery", "action-choice", "brief-setback"],
    filters: { actionSlugs: ["swim"] },
    contentBatch: 3
  }),
  defineAthletics({
    id: "swim-failure-002-surface-gives-you-away",
    localizationKey: "SurfaceGivesYouAway",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.25,
    fallbackTitle: "Surface Gives You Away",
    fallbackDescription: "Resolve the normal critical failure for Swim first. There is no additional mechanical effect. The churn, splash, or disturbed water makes the line you tried to take conspicuous to anyone able to observe the surface.",
    tags: ["athletics", "swim", "narrative", "visibility", "no-mechanical-effect"],
    filters: { actionSlugs: ["swim"] },
    contentBatch: 3
  }),
  defineAthletics({
    id: "high-jump-success-001-landing-window",
    localizationKey: "LandingWindow",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Landing Window",
    fallbackDescription: "Resolve the normal critical success for High Jump first. If you finish the jump standing on a legal surface, you may immediately Step up to 5 feet as a free action.",
    tags: ["athletics", "high-jump", "movement", "landing"],
    filters: { actionSlugs: ["high-jump"] },
    contentBatch: 3
  }),
  defineAthletics({
    id: "high-jump-failure-001-takeoff-mistimed",
    localizationKey: "TakeoffMistimed",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.35,
    fallbackTitle: "Takeoff Mistimed",
    fallbackDescription: "Resolve the normal critical failure for High Jump first. There is no additional mechanical effect. Your takeoff makes it obvious whether the problem was footing, timing, or a badly judged launch point.",
    tags: ["athletics", "high-jump", "narrative", "takeoff", "no-mechanical-effect"],
    filters: { actionSlugs: ["high-jump"] },
    contentBatch: 3
  }),
  defineAthletics({
    id: "long-jump-success-001-flow-through-landing",
    localizationKey: "FlowThroughLanding",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Flow Through the Landing",
    fallbackDescription: "Resolve the normal critical success for Long Jump first. Your next Balance or Tumble Through check before the end of your next turn gains a +1 circumstance bonus as you carry the landing into controlled footwork. The bonus then ends.",
    tags: ["athletics", "long-jump", "acrobatics", "follow-up", "one-use"],
    filters: { actionSlugs: ["long-jump"] },
    contentBatch: 3
  }),
  defineAthletics({
    id: "long-jump-failure-001-landing-line-revealed",
    localizationKey: "LandingLineRevealed",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.35,
    fallbackTitle: "Landing Line Revealed",
    fallbackDescription: "Resolve the normal critical failure for Long Jump first. There is no additional mechanical effect. The failed jump clearly reveals where you meant to land and how your momentum carried away from that line.",
    tags: ["athletics", "long-jump", "narrative", "landing", "no-mechanical-effect"],
    filters: { actionSlugs: ["long-jump"] },
    contentBatch: 3
  })

]);
