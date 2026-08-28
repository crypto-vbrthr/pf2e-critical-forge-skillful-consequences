import { PACK_IDS } from "../../constants.js";
import { defineSkillActionCard } from "./card-factory.js";

const KNOWLEDGE_UTILITY_PACK = PACK_IDS.KNOWLEDGE_UTILITY;
const MEDICINE = Object.freeze({ skillTypes: ["medicine"] });
const CRAFTING = Object.freeze({ skillTypes: ["crafting"] });

function defineMedicine(options) {
  return defineSkillActionCard({
    ...options,
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "medicine",
    filters: {
      ...MEDICINE,
      ...(options.filters ?? {})
    }
  });
}

function defineCrafting(options) {
  return defineSkillActionCard({
    ...options,
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "crafting",
    filters: {
      ...CRAFTING,
      ...(options.filters ?? {})
    }
  });
}

export const KNOWLEDGE_UTILITY_CARDS = Object.freeze([
  defineMedicine({
    id: "treat-wounds-success-001-treatment-pattern-recognized",
    localizationKey: "TreatmentPatternRecognized",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Treatment Pattern Recognized",
    fallbackDescription: "Resolve the normal critical success for Treat Wounds first. After the target's Treat Wounds immunity from this treatment has ended, your next Treat Wounds check on the same target within 24 hours gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["medicine", "treat-wounds", "same-target", "follow-up", "one-use"],
    filters: { actionSlugs: ["treat-wounds"] },
    contentBatch: 9
  }),
  defineMedicine({
    id: "treat-wounds-success-002-useful-diagnosis",
    localizationKey: "UsefulDiagnosis",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Useful Diagnosis",
    fallbackDescription: "Resolve the normal critical success for Treat Wounds first. There is no additional mechanical effect. If the injury offers a visible or medically plausible clue, the GM points out one useful detail about the wound, its cause, or the way the target responded to treatment.",
    tags: ["medicine", "treat-wounds", "diagnosis", "information", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["treat-wounds"] },
    contentBatch: 9
  }),
  defineMedicine({
    id: "treat-wounds-failure-001-aftercare-complication",
    localizationKey: "AftercareComplication",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Aftercare Complication",
    fallbackDescription: "Resolve the normal critical failure for Treat Wounds first. Your next Treat Wounds check on the same target within 24 hours takes a -1 circumstance penalty because the failed treatment has complicated your read of the injury. The penalty then ends.",
    tags: ["medicine", "treat-wounds", "same-target", "brief-setback", "one-use"],
    filters: { actionSlugs: ["treat-wounds"] },
    contentBatch: 9
  }),
  defineMedicine({
    id: "treat-wounds-failure-002-pain-response-misread",
    localizationKey: "PainResponseMisread",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Pain Response Misread",
    fallbackDescription: "Resolve the normal critical failure for Treat Wounds first. There is no additional mechanical effect. The target's reaction makes it clear which sign, movement, or symptom you misread during the treatment, without undoing any consequence of the failed check.",
    tags: ["medicine", "treat-wounds", "diagnosis", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["treat-wounds"] },
    contentBatch: 9
  }),

  defineMedicine({
    id: "administer-first-aid-success-001-crisis-rhythm",
    localizationKey: "CrisisRhythm",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Crisis Rhythm",
    fallbackDescription: "Resolve the normal critical success for Administer First Aid first. Your next Treat Wounds check on the same target within 1 hour gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["medicine", "administer-first-aid", "treat-wounds", "same-target", "follow-up", "one-use"],
    filters: { actionSlugs: ["administer-first-aid"] },
    contentBatch: 9
  }),
  defineMedicine({
    id: "administer-first-aid-success-002-immediate-cause-read",
    localizationKey: "ImmediateCauseRead",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Immediate Cause Read",
    fallbackDescription: "Resolve the normal critical success for Administer First Aid first. There is no additional mechanical effect. If the scene makes it observable, the GM identifies one useful detail about the immediate cause, direction, severity, or pattern of the crisis you just treated.",
    tags: ["medicine", "administer-first-aid", "information", "diagnosis", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["administer-first-aid"] },
    contentBatch: 9
  }),
  defineMedicine({
    id: "administer-first-aid-failure-001-hands-out-of-sequence",
    localizationKey: "HandsOutOfSequence",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Hands Out of Sequence",
    fallbackDescription: "Resolve the normal critical failure for Administer First Aid first. Your next Administer First Aid check on the same target before the end of your next turn takes a -1 circumstance penalty while you reset your approach. The penalty then ends.",
    tags: ["medicine", "administer-first-aid", "same-target", "brief-setback", "one-use"],
    filters: { actionSlugs: ["administer-first-aid"] },
    contentBatch: 9
  }),
  defineMedicine({
    id: "administer-first-aid-failure-002-intervention-reveals-the-problem",
    localizationKey: "InterventionRevealsTheProblem",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Intervention Reveals the Problem",
    fallbackDescription: "Resolve the normal critical failure for Administer First Aid first. There is no additional mechanical effect. The failed intervention exposes one visible complication, obstruction, or response that explains why the emergency was harder to control than expected, if such a detail is plausible.",
    tags: ["medicine", "administer-first-aid", "complication", "information", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["administer-first-aid"] },
    contentBatch: 9
  }),

  defineMedicine({
    id: "treat-disease-success-001-symptom-map",
    localizationKey: "SymptomMap",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Symptom Map",
    fallbackDescription: "Resolve the normal critical success for Treat Disease first. Your next Treat Disease check on the same target against the same disease within 48 hours gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["medicine", "treat-disease", "same-target", "same-disease", "follow-up", "one-use"],
    filters: { actionSlugs: ["treat-disease"] },
    contentBatch: 9
  }),
  defineMedicine({
    id: "treat-disease-failure-001-misleading-symptom",
    localizationKey: "MisleadingSymptom",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Misleading Symptom",
    fallbackDescription: "Resolve the normal critical failure for Treat Disease first. There is no additional mechanical effect. One symptom, sign, or response proves less reliable than it appeared during treatment. The GM may describe what misled you without revealing information the character could not plausibly learn from the attempt.",
    tags: ["medicine", "treat-disease", "symptom", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["treat-disease"] },
    contentBatch: 9
  }),

  defineMedicine({
    id: "treat-poison-success-001-toxin-response-mapped",
    localizationKey: "ToxinResponseMapped",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Toxin Response Mapped",
    fallbackDescription: "Resolve the normal critical success for Treat Poison first. Your next Treat Poison check on the same target against the same poison within 1 hour gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["medicine", "treat-poison", "same-target", "same-poison", "follow-up", "one-use"],
    filters: { actionSlugs: ["treat-poison"] },
    contentBatch: 9
  }),
  defineMedicine({
    id: "treat-poison-failure-001-countermeasure-window-missed",
    localizationKey: "CountermeasureWindowMissed",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Countermeasure Window Missed",
    fallbackDescription: "Resolve the normal critical failure for Treat Poison first. There is no additional mechanical effect. The attempt makes it clear that one timing cue, symptom change, or physiological response was handled too early or too late, if that is something the character could plausibly observe.",
    tags: ["medicine", "treat-poison", "timing", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["treat-poison"] },
    contentBatch: 9
  }),

  defineCrafting({
    id: "repair-success-001-fault-line-mapped",
    localizationKey: "FaultLineMapped",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Fault Line Mapped",
    fallbackDescription: "Resolve the normal critical success for Repair first. Your next Repair check on the same item within 24 hours gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["crafting", "repair", "same-item", "follow-up", "one-use"],
    filters: { actionSlugs: ["repair"] },
    contentBatch: 9
  }),
  defineCrafting({
    id: "repair-success-002-weak-point-understood",
    localizationKey: "WeakPointUnderstood",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Weak Point Understood",
    fallbackDescription: "Resolve the normal critical success for Repair first. There is no additional mechanical effect. If the item's construction makes it apparent, the GM points out the component, join, material, or stress point that was most important to the damage you just repaired.",
    tags: ["crafting", "repair", "same-item", "information", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["repair"] },
    contentBatch: 9
  }),
  defineCrafting({
    id: "repair-failure-001-correction-gets-harder",
    localizationKey: "CorrectionGetsHarder",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Correction Gets Harder",
    fallbackDescription: "Resolve the normal critical failure for Repair first. Your next Repair check on the same item within 10 minutes takes a -1 circumstance penalty because the failed work has made the damage harder for you to read. The penalty then ends.",
    tags: ["crafting", "repair", "same-item", "brief-setback", "one-use"],
    filters: { actionSlugs: ["repair"] },
    contentBatch: 9
  }),
  defineCrafting({
    id: "repair-failure-002-damage-pattern-exposed",
    localizationKey: "DamagePatternExposed",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Damage Pattern Exposed",
    fallbackDescription: "Resolve the normal critical failure for Repair first. There is no additional mechanical effect. The failed repair makes one aspect of the existing damage pattern easier to understand, such as where stress is traveling or which component failed first, if that can be inferred from the item.",
    tags: ["crafting", "repair", "same-item", "information", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["repair"] },
    contentBatch: 9
  }),

  defineCrafting({
    id: "craft-success-001-repeatable-process",
    localizationKey: "RepeatableProcess",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Repeatable Process",
    fallbackDescription: "Resolve the normal critical success for Craft first. Your next Craft check within 1 week to create the same item or use the same formula gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["crafting", "craft", "same-formula", "follow-up", "one-use"],
    filters: { actionSlugs: ["craft"] },
    contentBatch: 9
  }),
  defineCrafting({
    id: "craft-success-002-clean-documentation",
    localizationKey: "CleanDocumentation",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Clean Documentation",
    fallbackDescription: "Resolve the normal critical success for Craft first. The first ally you directly advise within 1 week gains a +1 circumstance bonus to a Craft check to create the same item or use the same formula, provided your notes or explanation are available. The bonus then ends.",
    tags: ["crafting", "craft", "same-formula", "teamwork", "one-use"],
    filters: { actionSlugs: ["craft"] },
    contentBatch: 9
  }),
  defineCrafting({
    id: "craft-failure-001-failure-teaches-the-sequence",
    localizationKey: "FailureTeachesTheSequence",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Failure Teaches the Sequence",
    fallbackDescription: "Resolve the normal critical failure for Craft first, including all normal costs and consequences. Your next Craft check within 1 week to create the same item or use the same formula gains a +1 circumstance bonus from what the failure taught you. The bonus then ends.",
    tags: ["crafting", "craft", "same-formula", "learning", "one-use"],
    filters: { actionSlugs: ["craft"] },
    contentBatch: 9
  }),
  defineCrafting({
    id: "craft-failure-002-visible-point-of-failure",
    localizationKey: "VisiblePointOfFailure",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Visible Point of Failure",
    fallbackDescription: "Resolve the normal critical failure for Craft first. There is no additional mechanical effect. If the failed project makes it possible to tell, the GM identifies the stage, material interaction, fitting, or process step where the work first visibly went wrong. This does not refund materials or other costs.",
    tags: ["crafting", "craft", "process", "information", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["craft"] },
    contentBatch: 9
  })
]);
