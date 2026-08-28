import { PACK_IDS } from "../../constants.js";
import { defineSkillActionCard } from "./card-factory.js";

const SOCIAL_PACK = PACK_IDS.SOCIAL_ACTIONS;
const DECEPTION = Object.freeze({ skillTypes: ["deception"] });

function defineDeception(options) {
  return defineSkillActionCard({
    ...options,
    packId: SOCIAL_PACK,
    collection: "social-actions",
    actionFamily: "deception",
    filters: {
      ...DECEPTION,
      ...(options.filters ?? {})
    }
  });
}

export const SOCIAL_ACTION_CARDS = Object.freeze([
  defineDeception({
    id: "feint-success-001-shared-opening",
    localizationKey: "SharedOpening",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Shared Opening",
    fallbackDescription: "Resolve the normal critical success for Feint first. The first ally other than you who makes a melee Strike against the same target before the start of your next turn gains a +1 circumstance bonus to that attack roll. The bonus then ends.",
    tags: ["deception", "feint", "teamwork", "same-target", "one-use"],
    filters: { actionSlugs: ["feint"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "feint-success-002-clean-pivot",
    localizationKey: "CleanPivot",
    category: "skillCheckCriticalSuccess",
    impact: "moderate",
    weight: 0.7,
    fallbackTitle: "Clean Pivot",
    fallbackDescription: "Resolve the normal critical success for Feint first. You may immediately Step up to 5 feet as a free action. This movement must leave you able to perceive the target and does not change the normal duration of the Feint result.",
    tags: ["deception", "feint", "movement", "step", "same-target"],
    filters: { actionSlugs: ["feint"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "feint-success-003-read-the-guard",
    localizationKey: "ReadTheGuard",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Read the Guard",
    fallbackDescription: "Resolve the normal critical success for Feint first. Your next Feint check against the same target before the end of your next turn gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["deception", "feint", "follow-up", "same-target", "one-use"],
    filters: { actionSlugs: ["feint"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "feint-failure-001-tell-spotted",
    localizationKey: "TellSpotted",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Tell Spotted",
    fallbackDescription: "Resolve the normal critical failure for Feint first. The target gains a +1 circumstance bonus to its Perception DC against your next Feint before the end of your next turn. The bonus then ends.",
    tags: ["deception", "feint", "perception-dc", "same-target", "brief-setback"],
    filters: { actionSlugs: ["feint"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "feint-failure-002-attention-snagged",
    localizationKey: "AttentionSnagged",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Attention Snagged",
    fallbackDescription: "Resolve the normal critical failure for Feint first. Your next Create a Diversion or Hide check before the end of your next turn takes a -1 circumstance penalty because your failed deception has drawn attention to your movements. The penalty then ends.",
    tags: ["deception", "feint", "attention", "follow-up", "brief-setback"],
    filters: { actionSlugs: ["feint"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "feint-failure-003-wrong-audience",
    localizationKey: "WrongAudience",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.2,
    fallbackTitle: "Wrong Audience",
    fallbackDescription: "Resolve the normal critical failure for Feint first. There is no additional mechanical effect. Someone other than the target who can observe the exchange notices the tell, rhythm, or body language behind your deception and now knows what you were trying to sell.",
    tags: ["deception", "feint", "narrative", "observers", "no-mechanical-effect"],
    filters: { actionSlugs: ["feint"] },
    contentBatch: 5
  }),

  defineDeception({
    id: "create-a-diversion-success-001-shared-distraction",
    localizationKey: "SharedDistraction",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Shared Distraction",
    fallbackDescription: "Resolve the normal critical success for Create a Diversion first. The first ally who attempts to Hide before the start of your next turn and can plausibly exploit the same diversion gains a +1 circumstance bonus to that check. The bonus then ends.",
    tags: ["deception", "create-a-diversion", "teamwork", "hide", "one-use"],
    filters: { actionSlugs: ["create-a-diversion"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "create-a-diversion-success-002-exit-cue",
    localizationKey: "ExitCue",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Exit Cue",
    fallbackDescription: "Resolve the normal critical success for Create a Diversion first. If you use the diversion to become Hidden, your first Sneak check before the end of your next turn gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["deception", "create-a-diversion", "stealth", "sneak", "one-use"],
    filters: { actionSlugs: ["create-a-diversion"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "create-a-diversion-failure-001-story-too-specific",
    localizationKey: "StoryTooSpecific",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Story Too Specific",
    fallbackDescription: "Resolve the normal critical failure for Create a Diversion first. Your next Create a Diversion check against any of the same observers within 10 minutes takes a -1 circumstance penalty. The penalty then ends.",
    tags: ["deception", "create-a-diversion", "same-observers", "brief-setback", "one-use"],
    filters: { actionSlugs: ["create-a-diversion"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "create-a-diversion-failure-002-attention-redirected",
    localizationKey: "AttentionRedirected",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.2,
    fallbackTitle: "Attention Redirected",
    fallbackDescription: "Resolve the normal critical failure for Create a Diversion first. There is no additional mechanical effect. The failed distraction makes the observers fixate on an unintended detail, person, sound, or part of the scene chosen by the GM; it does not undo the normal critical-failure result.",
    tags: ["deception", "create-a-diversion", "narrative", "observers", "no-mechanical-effect"],
    filters: { actionSlugs: ["create-a-diversion"] },
    contentBatch: 5
  }),

  defineDeception({
    id: "lie-success-001-consistent-detail",
    localizationKey: "ConsistentDetail",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Consistent Detail",
    fallbackDescription: "Resolve the normal critical success for Lie first. Your next Deception check within 10 minutes to maintain, clarify, or extend the same lie gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["deception", "lie", "follow-up", "same-story", "one-use"],
    filters: { actionSlugs: ["lie"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "lie-success-002-borrowed-credibility",
    localizationKey: "BorrowedCredibility",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Borrowed Credibility",
    fallbackDescription: "Resolve the normal critical success for Lie first. The first ally who makes a Deception check within 10 minutes to reinforce the same story gains a +1 circumstance bonus to that check. The bonus then ends.",
    tags: ["deception", "lie", "teamwork", "same-story", "one-use"],
    filters: { actionSlugs: ["lie"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "lie-success-003-second-order-belief",
    localizationKey: "SecondOrderBelief",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Second-Order Belief",
    fallbackDescription: "Resolve the normal critical success for Lie first. There is no additional mechanical effect. The target draws one plausible additional conclusion from the lie beyond the exact statement you made. The GM chooses a conclusion consistent with what the target already knows; it may create an opportunity or a complication.",
    tags: ["deception", "lie", "narrative", "same-target", "no-mechanical-effect"],
    filters: { actionSlugs: ["lie"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "lie-failure-001-loose-thread",
    localizationKey: "LooseThread",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Loose Thread",
    fallbackDescription: "Resolve the normal critical failure for Lie first. There is no additional mechanical effect. The target catches one specific inconsistency, omission, or detail that made the story fail. The GM should identify the point of suspicion without revealing information the target could not reasonably know.",
    tags: ["deception", "lie", "narrative", "same-target", "no-mechanical-effect"],
    filters: { actionSlugs: ["lie"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "lie-failure-002-contradiction-cascade",
    localizationKey: "ContradictionCascade",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Contradiction Cascade",
    fallbackDescription: "Resolve the normal critical failure for Lie first. Your next attempt to Lie to the same target about the same topic within 10 minutes takes a -1 circumstance penalty. The penalty then ends.",
    tags: ["deception", "lie", "same-target", "same-topic", "brief-setback", "one-use"],
    filters: { actionSlugs: ["lie"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "lie-failure-003-suspicion-spreads",
    localizationKey: "SuspicionSpreads",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.0,
    fallbackTitle: "Suspicion Spreads",
    fallbackDescription: "Resolve the normal critical failure for Lie first. There is no additional mechanical effect. One nearby observer who can follow the conversation picks up on the target's skepticism and becomes wary of the same claim. This does not automatically change attitudes or impose a rules condition.",
    tags: ["deception", "lie", "narrative", "observers", "no-mechanical-effect"],
    filters: { actionSlugs: ["lie"] },
    contentBatch: 5
  }),

  defineDeception({
    id: "impersonate-success-001-mannerism-locked-in",
    localizationKey: "MannerismLockedIn",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Mannerism Locked In",
    fallbackDescription: "Resolve the normal critical success for Impersonate first. Your next Impersonate or Deception check within 10 minutes to maintain the same identity gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["deception", "impersonate", "same-identity", "follow-up", "one-use"],
    filters: { actionSlugs: ["impersonate"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "impersonate-success-002-believable-routine",
    localizationKey: "BelievableRoutine",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Believable Routine",
    fallbackDescription: "Resolve the normal critical success for Impersonate first. There is no additional mechanical effect. An observer treats your assumed role as ordinary enough to volunteer a minor contextual detail, expectation, name, or routine that someone in that role would plausibly know.",
    tags: ["deception", "impersonate", "narrative", "information", "no-mechanical-effect"],
    filters: { actionSlugs: ["impersonate"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "impersonate-failure-001-detail-out-of-place",
    localizationKey: "DetailOutOfPlace",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Detail Out of Place",
    fallbackDescription: "Resolve the normal critical failure for Impersonate first. There is no additional mechanical effect. The observer notices one concrete mismatch in voice, posture, clothing, manner, terminology, or local custom. The GM should reveal what looked wrong if the observer could reasonably make that judgment.",
    tags: ["deception", "impersonate", "narrative", "observers", "no-mechanical-effect"],
    filters: { actionSlugs: ["impersonate"] },
    contentBatch: 5
  }),
  defineDeception({
    id: "impersonate-failure-002-role-drift",
    localizationKey: "RoleDrift",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Role Drift",
    fallbackDescription: "Resolve the normal critical failure for Impersonate first. Your next Impersonate check using the same assumed identity within 10 minutes takes a -1 circumstance penalty unless you first spend 1 minute correcting the disguise, mannerisms, or story. After either event, this consequence ends.",
    tags: ["deception", "impersonate", "same-identity", "recovery", "brief-setback"],
    filters: { actionSlugs: ["impersonate"] },
    contentBatch: 5
  })
]);
