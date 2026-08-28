import { PACK_IDS } from "../../constants.js";
import { defineSkillActionCard } from "./card-factory.js";

const SOCIAL_PACK = PACK_IDS.SOCIAL_ACTIONS;
const DECEPTION = Object.freeze({ skillTypes: ["deception"] });
const DIPLOMACY = Object.freeze({ skillTypes: ["diplomacy"] });
const INTIMIDATION = Object.freeze({ skillTypes: ["intimidation"] });
const PERFORMANCE = Object.freeze({ skillTypes: ["performance"] });

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

function defineDiplomacy(options) {
  return defineSkillActionCard({
    ...options,
    packId: SOCIAL_PACK,
    collection: "social-actions",
    actionFamily: "diplomacy",
    filters: {
      ...DIPLOMACY,
      ...(options.filters ?? {})
    }
  });
}

function defineIntimidation(options) {
  return defineSkillActionCard({
    ...options,
    packId: SOCIAL_PACK,
    collection: "social-actions",
    actionFamily: "intimidation",
    filters: {
      ...INTIMIDATION,
      ...(options.filters ?? {})
    }
  });
}

function definePerformance(options) {
  return defineSkillActionCard({
    ...options,
    packId: SOCIAL_PACK,
    collection: "social-actions",
    actionFamily: "performance",
    filters: {
      ...PERFORMANCE,
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
  }),

  defineDiplomacy({
    id: "make-an-impression-success-001-warm-introduction",
    localizationKey: "WarmIntroduction",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Warm Introduction",
    fallbackDescription: "Resolve the normal critical success for Make an Impression first. The first ally other than you who makes a Request of the same target during the current social interaction gains a +1 circumstance bonus to that check. The bonus then ends.",
    tags: ["diplomacy", "make-an-impression", "teamwork", "request", "same-target", "one-use"],
    filters: { actionSlugs: ["make-an-impression"] },
    contentBatch: 6
  }),
  defineDiplomacy({
    id: "make-an-impression-success-002-common-ground",
    localizationKey: "CommonGround",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.15,
    fallbackTitle: "Common Ground",
    fallbackDescription: "Resolve the normal critical success for Make an Impression first. There is no additional mechanical effect. The GM identifies one minor preference, priority, concern, or conversational subject that genuinely helped the target warm to you, provided that detail could reasonably be inferred from the exchange.",
    tags: ["diplomacy", "make-an-impression", "narrative", "social-read", "no-mechanical-effect"],
    filters: { actionSlugs: ["make-an-impression"] },
    contentBatch: 6
  }),
  defineDiplomacy({
    id: "make-an-impression-failure-001-bad-first-read",
    localizationKey: "BadFirstRead",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Bad First Read",
    fallbackDescription: "Resolve the normal critical failure for Make an Impression first. Your next Make an Impression check against the same target during the current social interaction takes a -1 circumstance penalty. The penalty then ends.",
    tags: ["diplomacy", "make-an-impression", "same-target", "brief-setback", "one-use"],
    filters: { actionSlugs: ["make-an-impression"] },
    contentBatch: 6
  }),
  defineDiplomacy({
    id: "make-an-impression-failure-002-the-room-notices",
    localizationKey: "TheRoomNotices",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.15,
    fallbackTitle: "The Room Notices",
    fallbackDescription: "Resolve the normal critical failure for Make an Impression first. There is no additional mechanical effect. If another creature can meaningfully observe the interaction, it notices the moment the exchange turns against you. This does not automatically change that observer's attitude.",
    tags: ["diplomacy", "make-an-impression", "narrative", "observers", "no-mechanical-effect"],
    filters: { actionSlugs: ["make-an-impression"] },
    contentBatch: 6
  }),

  defineDiplomacy({
    id: "request-success-001-unasked-detail",
    localizationKey: "UnaskedDetail",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Unasked Detail",
    fallbackDescription: "Resolve the normal critical success for Request first. There is no additional mechanical effect. The target volunteers one minor practical detail, schedule, contact, limitation, or useful instruction relevant to fulfilling the request, if such a detail plausibly exists.",
    tags: ["diplomacy", "request", "narrative", "information", "same-target", "no-mechanical-effect"],
    filters: { actionSlugs: ["request"] },
    contentBatch: 6
  }),
  defineDiplomacy({
    id: "request-success-002-favorable-momentum",
    localizationKey: "FavorableMomentum",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Favorable Momentum",
    fallbackDescription: "Resolve the normal critical success for Request first. The first ally other than you who makes a related Request of the same target within 10 minutes gains a +1 circumstance bonus to that check. The bonus then ends.",
    tags: ["diplomacy", "request", "teamwork", "same-target", "related-request", "one-use"],
    filters: { actionSlugs: ["request"] },
    contentBatch: 6
  }),
  defineDiplomacy({
    id: "request-failure-001-price-of-asking",
    localizationKey: "PriceOfAsking",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Price of Asking",
    fallbackDescription: "Resolve the normal critical failure for Request first. There is no additional mechanical effect. Your request makes one of your immediate priorities, needs, or pressures obvious to the target. The target can use that knowledge naturally, but gains no automatic attitude change or rules bonus from this card.",
    tags: ["diplomacy", "request", "narrative", "revealed-priority", "same-target", "no-mechanical-effect"],
    filters: { actionSlugs: ["request"] },
    contentBatch: 6
  }),
  defineDiplomacy({
    id: "request-failure-002-ask-again-later",
    localizationKey: "AskAgainLater",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Ask Again Later",
    fallbackDescription: "Resolve the normal critical failure for Request first. Your next Request check against the same target within 1 hour takes a -1 circumstance penalty. The penalty then ends.",
    tags: ["diplomacy", "request", "same-target", "brief-setback", "one-use"],
    filters: { actionSlugs: ["request"] },
    contentBatch: 6
  }),

  defineDiplomacy({
    id: "gather-information-success-001-best-lead-first",
    localizationKey: "BestLeadFirst",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    fallbackTitle: "Best Lead First",
    fallbackDescription: "Resolve the normal critical success for Gather Information first. There is no additional mechanical effect. Alongside the information normally gained, the GM identifies one promising person, place, group, or source that would be a sensible next lead, if the investigation has one.",
    tags: ["diplomacy", "gather-information", "narrative", "information", "lead", "secret-check", "no-mechanical-effect"],
    filters: { actionSlugs: ["gather-information"] },
    contentBatch: 6
  }),
  defineDiplomacy({
    id: "gather-information-success-002-pattern-in-the-rumors",
    localizationKey: "PatternInTheRumors",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    fallbackTitle: "Pattern in the Rumors",
    fallbackDescription: "Resolve the normal critical success for Gather Information first. There is no additional mechanical effect. If plausible, the GM points out one connection, recurring detail, or meaningful contradiction between what you learned and information the group already possesses.",
    tags: ["diplomacy", "gather-information", "narrative", "information", "connection", "secret-check", "no-mechanical-effect"],
    filters: { actionSlugs: ["gather-information"] },
    contentBatch: 6
  }),
  defineDiplomacy({
    id: "gather-information-success-003-familiar-face",
    localizationKey: "FamiliarFace",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Familiar Face",
    fallbackDescription: "Resolve the normal critical success for Gather Information first. There is no additional mechanical effect. One minor source involved in the search remembers you favorably enough to be approachable again later, subject to the fiction and the GM's judgment. This does not automatically improve an attitude step.",
    tags: ["diplomacy", "gather-information", "narrative", "contact", "secret-check", "no-mechanical-effect"],
    filters: { actionSlugs: ["gather-information"] },
    contentBatch: 6
  }),
  defineDiplomacy({
    id: "gather-information-failure-001-questions-leave-a-wake",
    localizationKey: "QuestionsLeaveAWake",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    fallbackTitle: "Questions Leave a Wake",
    fallbackDescription: "Resolve the normal critical failure for Gather Information first. There is no additional mechanical effect. The GM may decide that someone connected to the subject learns that questions are being asked. This consequence should remain GM-facing when Gather Information is rolled secretly and does not reveal whether any information gathered was true or false.",
    tags: ["diplomacy", "gather-information", "narrative", "attention", "secret-check", "gm-facing", "no-mechanical-effect"],
    filters: { actionSlugs: ["gather-information"] },
    contentBatch: 6
  }),
  defineDiplomacy({
    id: "gather-information-failure-002-echo-chamber",
    localizationKey: "EchoChamber",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    fallbackTitle: "Echo Chamber",
    fallbackDescription: "Resolve the normal critical failure for Gather Information first. There is no additional mechanical effect. When presenting the incorrect information required by the normal result, the GM may have a second plausible source repeat or reinforce one part of it. Keep this consequence GM-facing for a secret check.",
    tags: ["diplomacy", "gather-information", "narrative", "misinformation", "secret-check", "gm-facing", "no-mechanical-effect"],
    filters: { actionSlugs: ["gather-information"] },
    contentBatch: 6
  }),
  defineDiplomacy({
    id: "gather-information-failure-003-wrong-thread-real-detail",
    localizationKey: "WrongThreadRealDetail",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 0.9,
    fallbackTitle: "Wrong Thread, Real Detail",
    fallbackDescription: "Resolve the normal critical failure for Gather Information first. There is no additional mechanical effect. The GM may embed one incidental true name, place, custom, or background detail inside the incorrect information, provided it does not expose the misinformation or negate the normal critical failure. Keep this consequence GM-facing for a secret check.",
    tags: ["diplomacy", "gather-information", "narrative", "misinformation", "incidental-truth", "secret-check", "gm-facing", "no-mechanical-effect"],
    filters: { actionSlugs: ["gather-information"] },
    contentBatch: 6
  }),

  defineIntimidation({
    id: "demoralize-success-001-voice-carries",
    localizationKey: "VoiceCarries",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Voice Carries",
    fallbackDescription: "Resolve the normal critical success for Demoralize first. Your next Demoralize check against a different creature before the end of your next turn gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["intimidation", "demoralize", "momentum", "different-target", "one-use"],
    filters: { actionSlugs: ["demoralize"] },
    contentBatch: 6
  }),
  defineIntimidation({
    id: "demoralize-success-002-panic-tells",
    localizationKey: "PanicTells",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Panic Tells",
    fallbackDescription: "Resolve the normal critical success for Demoralize first. There is no additional mechanical effect. If the target's behavior makes it plausible, the GM identifies one immediate thing it instinctively looks toward, guards, backs away from, or treats as a source of safety when fear takes hold.",
    tags: ["intimidation", "demoralize", "narrative", "behavioral-tell", "same-target", "no-mechanical-effect"],
    filters: { actionSlugs: ["demoralize"] },
    contentBatch: 6
  }),
  defineIntimidation({
    id: "demoralize-success-003-controlled-threat",
    localizationKey: "ControlledThreat",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Controlled Threat",
    fallbackDescription: "Resolve the normal critical success for Demoralize first. If you later attempt to Coerce the same target within 10 minutes and the circumstances allow a Coerce check, you gain a +1 circumstance bonus to that check. The bonus then ends.",
    tags: ["intimidation", "demoralize", "coerce", "same-target", "follow-up", "one-use"],
    filters: { actionSlugs: ["demoralize"] },
    contentBatch: 6
  }),
  defineIntimidation({
    id: "demoralize-failure-001-voice-cracks-at-the-edge",
    localizationKey: "VoiceCracksAtTheEdge",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Voice Cracks at the Edge",
    fallbackDescription: "Resolve the normal critical failure for Demoralize first. Your next Demoralize check against a different creature before the end of your next turn takes a -1 circumstance penalty. The penalty then ends.",
    tags: ["intimidation", "demoralize", "different-target", "brief-setback", "one-use"],
    filters: { actionSlugs: ["demoralize"] },
    contentBatch: 6
  }),
  defineIntimidation({
    id: "demoralize-failure-002-measure-taken",
    localizationKey: "MeasureTaken",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Measure Taken",
    fallbackDescription: "Resolve the normal critical failure for Demoralize first. The target gains a +1 circumstance bonus to its Will DC against your next Coerce check within 10 minutes. The bonus then ends.",
    tags: ["intimidation", "demoralize", "coerce", "same-target", "brief-setback", "one-use"],
    filters: { actionSlugs: ["demoralize"] },
    contentBatch: 6
  }),
  defineIntimidation({
    id: "demoralize-failure-003-threat-reveals-priority",
    localizationKey: "ThreatRevealsPriority",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Threat Reveals Priority",
    fallbackDescription: "Resolve the normal critical failure for Demoralize first. There is no additional mechanical effect. The target learns something about what you want, fear, protect, or consider important from the threat you chose to make. It gains no automatic rules bonus from this knowledge.",
    tags: ["intimidation", "demoralize", "narrative", "revealed-priority", "same-target", "no-mechanical-effect"],
    filters: { actionSlugs: ["demoralize"] },
    contentBatch: 6
  }),

  defineIntimidation({
    id: "coerce-success-001-useful-specifics",
    localizationKey: "UsefulSpecifics",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    fallbackTitle: "Useful Specifics",
    fallbackDescription: "Resolve the normal critical success for Coerce first. There is no additional mechanical effect. If plausible, the target volunteers one minor practical detail, warning, route, schedule, or limitation that makes following your demand easier or less ambiguous.",
    tags: ["intimidation", "coerce", "narrative", "information", "same-target", "no-mechanical-effect"],
    filters: { actionSlugs: ["coerce"] },
    contentBatch: 6
  }),
  defineIntimidation({
    id: "coerce-success-002-reputation-precedes-you",
    localizationKey: "ReputationPrecedesYou",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Reputation Precedes You",
    fallbackDescription: "Resolve the normal critical success for Coerce first. The first Coerce check you make within 10 minutes against a different creature that meaningfully witnessed this exchange gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["intimidation", "coerce", "witnesses", "different-target", "one-use"],
    filters: { actionSlugs: ["coerce"] },
    contentBatch: 6
  }),
  defineIntimidation({
    id: "coerce-failure-001-threat-catalogued",
    localizationKey: "ThreatCatalogued",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Threat Catalogued",
    fallbackDescription: "Resolve the normal critical failure for Coerce first. There is no additional mechanical effect. The target can now describe the substance, style, and apparent intent of your threat with unusual clarity to anyone it later speaks with. This does not automatically change another creature's attitude.",
    tags: ["intimidation", "coerce", "narrative", "reputation", "same-target", "no-mechanical-effect"],
    filters: { actionSlugs: ["coerce"] },
    contentBatch: 6
  }),
  defineIntimidation({
    id: "coerce-failure-002-witnessed-defiance",
    localizationKey: "WitnessedDefiance",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Witnessed Defiance",
    fallbackDescription: "Resolve the normal critical failure for Coerce first. Your next Coerce check within 10 minutes against a different creature that meaningfully witnessed the failed attempt takes a -1 circumstance penalty. The penalty then ends.",
    tags: ["intimidation", "coerce", "witnesses", "different-target", "brief-setback", "one-use"],
    filters: { actionSlugs: ["coerce"] },
    contentBatch: 6
  }),

  definePerformance({
    id: "perform-success-001-encore-momentum",
    localizationKey: "EncoreMomentum",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Encore Momentum",
    fallbackDescription: "Resolve the normal critical success for Perform first. Your next Perform check before substantially the same audience within 10 minutes gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["performance", "perform", "same-audience", "follow-up", "one-use"],
    filters: { actionSlugs: ["perform"] },
    contentBatch: 12
  }),
  definePerformance({
    id: "perform-success-002-shared-spotlight",
    localizationKey: "SharedSpotlight",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Shared Spotlight",
    fallbackDescription: "Resolve the normal critical success for Perform first. The first ally who attempts to Perform before substantially the same audience within 10 minutes and meaningfully builds on your performance gains a +1 circumstance bonus to that check. The bonus then ends.",
    tags: ["performance", "perform", "teamwork", "same-audience", "one-use"],
    filters: { actionSlugs: ["perform"] },
    contentBatch: 12
  }),
  definePerformance({
    id: "perform-success-003-audience-read",
    localizationKey: "AudienceRead",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Audience Read",
    fallbackDescription: "Resolve the normal critical success for Perform first. There is no additional mechanical effect. If the audience gives visible or audible feedback, the GM identifies one theme, technique, subject, or moment that clearly resonated most strongly.",
    tags: ["performance", "perform", "audience", "information", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["perform"] },
    contentBatch: 12
  }),
  definePerformance({
    id: "perform-failure-001-rhythm-broken",
    localizationKey: "RhythmBroken",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Rhythm Broken",
    fallbackDescription: "Resolve the normal critical failure for Perform first. Your next Perform check before substantially the same audience within 10 minutes takes a -1 circumstance penalty while you work past the failed rhythm. The penalty then ends.",
    tags: ["performance", "perform", "same-audience", "brief-setback", "one-use"],
    filters: { actionSlugs: ["perform"] },
    contentBatch: 12
  }),
  definePerformance({
    id: "perform-failure-002-audience-tells",
    localizationKey: "AudienceTells",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Audience Tells",
    fallbackDescription: "Resolve the normal critical failure for Perform first. There is no additional mechanical effect. If the audience reacts visibly or audibly, the GM points out one part of the performance that lost attention, clashed with expectations, or landed particularly poorly.",
    tags: ["performance", "perform", "audience", "information", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["perform"] },
    contentBatch: 12
  }),
  definePerformance({
    id: "perform-failure-003-memorable-misstep",
    localizationKey: "MemorableMisstep",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.2,
    fallbackTitle: "Memorable Misstep",
    fallbackDescription: "Resolve the normal critical failure for Perform first. There is no additional mechanical effect. Observers remember one specific mistake, awkward choice, or failed flourish from the performance. This memory does not automatically change anyone's attitude or grant a rules modifier.",
    tags: ["performance", "perform", "audience", "reputation", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["perform"] },
    contentBatch: 12
  })

]);
