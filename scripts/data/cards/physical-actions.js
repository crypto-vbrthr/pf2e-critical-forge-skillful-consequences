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
  })
]);
