import { PACK_IDS } from "../../constants.js";
import { defineSkillActionCard } from "./card-factory.js";

const KNOWLEDGE_UTILITY_PACK = PACK_IDS.KNOWLEDGE_UTILITY;
const MEDICINE = Object.freeze({ skillTypes: ["medicine"] });
const CRAFTING = Object.freeze({ skillTypes: ["crafting"] });
const SURVIVAL = Object.freeze({ skillTypes: ["survival"] });

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

function defineSurvival(options) {
  return defineSkillActionCard({
    ...options,
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "survival",
    filters: {
      ...SURVIVAL,
      ...(options.filters ?? {})
    }
  });
}

function defineKnowledge(options) {
  return defineSkillActionCard({
    ...options,
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "knowledge",
    filters: {
      ...(options.filters ?? {})
    }
  });
}

function defineUtility(options) {
  return defineSkillActionCard({
    ...options,
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "utility",
    filters: {
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
,

  defineKnowledge({
    id: "recall-knowledge-success-001-connecting-principle",
    localizationKey: "ConnectingPrinciple",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Connecting Principle",
    fallbackDescription: "Resolve the normal critical success for Recall Knowledge first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. If the subject supports it, the GM points out one useful connection between the facts learned and a related creature, place, event, tradition, or phenomenon that the character could reasonably infer.",
    tags: ["knowledge", "recall-knowledge", "secret-check", "gm-facing", "connection", "information", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["recall-knowledge"] },
    contentBatch: 10
  }),
  defineKnowledge({
    id: "recall-knowledge-success-002-corroborating-detail",
    localizationKey: "CorroboratingDetail",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Corroborating Detail",
    fallbackDescription: "Resolve the normal critical success for Recall Knowledge first. Keep this consequence GM-facing for the secret check. The GM may secretly grant a +1 circumstance bonus to your next Recall Knowledge check before the end of the next day about the same subject or a closely related subject. The bonus then ends.",
    tags: ["knowledge", "recall-knowledge", "secret-check", "gm-facing", "follow-up", "same-subject", "one-use"],
    filters: { actionSlugs: ["recall-knowledge"] },
    contentBatch: 10
  }),
  defineKnowledge({
    id: "recall-knowledge-success-003-next-question-revealed",
    localizationKey: "NextQuestionRevealed",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Next Question Revealed",
    fallbackDescription: "Resolve the normal critical success for Recall Knowledge first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. The GM identifies one narrow follow-up question, source, or line of inquiry that would be especially productive next, without answering that question for free.",
    tags: ["knowledge", "recall-knowledge", "secret-check", "gm-facing", "lead", "research", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["recall-knowledge"] },
    contentBatch: 10
  }),
  defineKnowledge({
    id: "recall-knowledge-failure-001-false-pattern-locks-in",
    localizationKey: "FalsePatternLocksIn",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "False Pattern Locks In",
    fallbackDescription: "Resolve the normal critical failure for Recall Knowledge first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. If useful, the GM frames the erroneous information as part of a coherent pattern and may let one harmless true detail appear to support it. Do not reveal that the conclusion is wrong.",
    tags: ["knowledge", "recall-knowledge", "secret-check", "gm-facing", "misinformation", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["recall-knowledge"] },
    contentBatch: 10
  }),
  defineKnowledge({
    id: "recall-knowledge-failure-002-right-detail-wrong-conclusion",
    localizationKey: "RightDetailWrongConclusion",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Right Detail, Wrong Conclusion",
    fallbackDescription: "Resolve the normal critical failure for Recall Knowledge first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. The GM may attach one true peripheral detail to the erroneous conclusion, provided the detail does not itself expose the mistake. The false information remains the normal result of the check.",
    tags: ["knowledge", "recall-knowledge", "secret-check", "gm-facing", "misinformation", "true-detail", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["recall-knowledge"] },
    contentBatch: 10
  }),
  defineKnowledge({
    id: "recall-knowledge-failure-003-authority-misremembered",
    localizationKey: "AuthorityMisremembered",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Authority Misremembered",
    fallbackDescription: "Resolve the normal critical failure for Recall Knowledge first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. The GM may give the erroneous recollection a plausible remembered source, teacher, text, rumor, or tradition, adding narrative texture without confirming whether that source was ever reliable.",
    tags: ["knowledge", "recall-knowledge", "secret-check", "gm-facing", "misinformation", "source", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["recall-knowledge"] },
    contentBatch: 10
  }),

  defineKnowledge({
    id: "identify-magic-success-001-resonance-fingerprint",
    localizationKey: "ResonanceFingerprint",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Resonance Fingerprint",
    fallbackDescription: "Resolve the normal critical success for Identify Magic first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. If the magical signature supports it, the GM points out one contextual clue about origin, creator, repeated use, or a relationship to another magical effect already encountered.",
    tags: ["knowledge", "identify-magic", "secret-check", "gm-facing", "magic", "information", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["arcana", "nature", "occultism", "religion"], actionSlugs: ["identify-magic"] },
    contentBatch: 10
  }),
  defineKnowledge({
    id: "identify-magic-success-002-related-working-recognized",
    localizationKey: "RelatedWorkingRecognized",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Related Working Recognized",
    fallbackDescription: "Resolve the normal critical success for Identify Magic first. Keep this consequence GM-facing for the secret check. The GM may secretly grant a +1 circumstance bonus to your next Identify Magic check within 24 hours on the same item, effect, creator's work, or a closely related magical working. The bonus then ends.",
    tags: ["knowledge", "identify-magic", "secret-check", "gm-facing", "magic", "follow-up", "one-use"],
    filters: { skillTypes: ["arcana", "nature", "occultism", "religion"], actionSlugs: ["identify-magic"] },
    contentBatch: 10
  }),
  defineKnowledge({
    id: "identify-magic-failure-001-familiar-signature-wrong-source",
    localizationKey: "FamiliarSignatureWrongSource",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Familiar Signature, Wrong Source",
    fallbackDescription: "Resolve the normal critical failure for Identify Magic first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. The GM may present the mistaken identification as a convincing resemblance to a familiar magical source or effect. Do not reveal that the identification is incorrect.",
    tags: ["knowledge", "identify-magic", "secret-check", "gm-facing", "magic", "misidentification", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["arcana", "nature", "occultism", "religion"], actionSlugs: ["identify-magic"] },
    contentBatch: 10
  }),
  defineKnowledge({
    id: "identify-magic-failure-002-misleading-resonance",
    localizationKey: "MisleadingResonance",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Misleading Resonance",
    fallbackDescription: "Resolve the normal critical failure for Identify Magic first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. The GM may include one genuine observable magical trait, sensation, or resonance that seems to support the mistaken identification without actually confirming it.",
    tags: ["knowledge", "identify-magic", "secret-check", "gm-facing", "magic", "misidentification", "true-detail", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["arcana", "nature", "occultism", "religion"], actionSlugs: ["identify-magic"] },
    contentBatch: 10
  }),

  defineKnowledge({
    id: "identify-alchemy-success-001-batch-signature",
    localizationKey: "BatchSignature",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Batch Signature",
    fallbackDescription: "Resolve the normal critical success for Identify Alchemy first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. If the item permits the inference, the GM points out one clue that could link it to a batch, maker, workshop, formula tradition, or production method.",
    tags: ["knowledge", "identify-alchemy", "secret-check", "gm-facing", "alchemy", "information", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["crafting"], actionSlugs: ["identify-alchemy"] },
    contentBatch: 10
  }),
  defineKnowledge({
    id: "identify-alchemy-success-002-process-trace",
    localizationKey: "ProcessTrace",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Process Trace",
    fallbackDescription: "Resolve the normal critical success for Identify Alchemy first. Keep this consequence GM-facing for the secret check. The GM may secretly grant a +1 circumstance bonus to your next Identify Alchemy check within 1 week on an item from the same batch, formula, maker, or clearly related process. The bonus then ends.",
    tags: ["knowledge", "identify-alchemy", "secret-check", "gm-facing", "alchemy", "follow-up", "one-use"],
    filters: { skillTypes: ["crafting"], actionSlugs: ["identify-alchemy"] },
    contentBatch: 10
  }),
  defineKnowledge({
    id: "identify-alchemy-failure-001-contaminant-red-herring",
    localizationKey: "ContaminantRedHerring",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Contaminant Red Herring",
    fallbackDescription: "Resolve the normal critical failure for Identify Alchemy first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. The GM may frame the mistaken identification around a plausible residue, contaminant, color, odor, or processing mark that appears to explain the item. Do not reveal the mistake.",
    tags: ["knowledge", "identify-alchemy", "secret-check", "gm-facing", "alchemy", "misidentification", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["crafting"], actionSlugs: ["identify-alchemy"] },
    contentBatch: 10
  }),
  defineKnowledge({
    id: "identify-alchemy-failure-002-correct-method-wrong-mixture",
    localizationKey: "CorrectMethodWrongMixture",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Correct Method, Wrong Mixture",
    fallbackDescription: "Resolve the normal critical failure for Identify Alchemy first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. The GM may pair the mistaken identification with one true clue about how the substance was prepared, stabilized, bottled, or processed, provided that clue does not expose the actual item.",
    tags: ["knowledge", "identify-alchemy", "secret-check", "gm-facing", "alchemy", "misidentification", "true-detail", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["crafting"], actionSlugs: ["identify-alchemy"] },
    contentBatch: 10
  }),

  defineKnowledge({
    id: "decipher-writing-success-001-authorial-habit",
    localizationKey: "AuthorialHabit",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Authorial Habit",
    fallbackDescription: "Resolve the normal critical success for Decipher Writing first. Keep this consequence GM-facing for the secret check. The GM may secretly grant a +1 circumstance bonus to your next Decipher Writing check within 1 week involving the same author, script, cipher, notation system, or closely related body of writing. The bonus then ends.",
    tags: ["knowledge", "decipher-writing", "secret-check", "gm-facing", "writing", "follow-up", "one-use"],
    filters: { skillTypes: ["arcana", "society", "occultism", "religion"], actionSlugs: ["decipher-writing"] },
    contentBatch: 10
  }),
  defineKnowledge({
    id: "decipher-writing-success-002-structure-behind-the-text",
    localizationKey: "StructureBehindTheText",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Structure Behind the Text",
    fallbackDescription: "Resolve the normal critical success for Decipher Writing first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. If the document supports it, the GM identifies one useful structural clue such as intended audience, document type, repeated notation, editorial layer, or how different sections relate, without translating additional hidden content for free.",
    tags: ["knowledge", "decipher-writing", "secret-check", "gm-facing", "writing", "information", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["arcana", "society", "occultism", "religion"], actionSlugs: ["decipher-writing"] },
    contentBatch: 10
  }),
  defineKnowledge({
    id: "decipher-writing-failure-001-false-friend",
    localizationKey: "FalseFriend",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "False Friend",
    fallbackDescription: "Resolve the normal critical failure for Decipher Writing first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. A familiar-looking word, symbol, phrase, or convention appears to support the mistaken interpretation. Do not reveal that the reading is wrong.",
    tags: ["knowledge", "decipher-writing", "secret-check", "gm-facing", "writing", "misinterpretation", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["arcana", "society", "occultism", "religion"], actionSlugs: ["decipher-writing"] },
    contentBatch: 10
  }),
  defineKnowledge({
    id: "decipher-writing-failure-002-reading-order-misjudged",
    localizationKey: "ReadingOrderMisjudged",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Reading Order Misjudged",
    fallbackDescription: "Resolve the normal critical failure for Decipher Writing first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. The GM may let a heading, annotation, marginal mark, repeated symbol, or section boundary be interpreted in a way that reinforces the normal erroneous reading without exposing the error.",
    tags: ["knowledge", "decipher-writing", "secret-check", "gm-facing", "writing", "misinterpretation", "structure", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["arcana", "society", "occultism", "religion"], actionSlugs: ["decipher-writing"] },
    contentBatch: 10
  })

,

  // 0.1.0-dev.11 - Survival & Exploration I
  defineSurvival({
    id: "track-success-001-trail-rhythm-recognized",
    localizationKey: "TrailRhythmRecognized",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Trail Rhythm Recognized",
    fallbackDescription: "Resolve the normal critical success for Track first. Your next Track check on the same trail within 1 hour gains a +1 circumstance bonus because you have learned the quarry's pace and sign pattern. The bonus then ends.",
    tags: ["survival", "track", "same-trail", "follow-up", "one-use"],
    filters: { actionSlugs: ["track"] },
    contentBatch: 11
  }),
  defineSurvival({
    id: "track-success-002-more-than-footprints",
    localizationKey: "MoreThanFootprints",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "More Than Footprints",
    fallbackDescription: "Resolve the normal critical success for Track first. There is no additional mechanical effect. If the trail can support the inference, the GM points out one useful incidental clue about the quarry's pace, condition, burden, numbers, behavior, or recent passage.",
    tags: ["survival", "track", "information", "trail", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["track"] },
    contentBatch: 11
  }),
  defineSurvival({
    id: "track-success-003-trail-shared",
    localizationKey: "TrailShared",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Trail Shared",
    fallbackDescription: "Resolve the normal critical success for Track first. The first ally who attempts to Track the same trail within the next 10 minutes gains a +1 circumstance bonus to that check from the signs and route you point out. The bonus then ends.",
    tags: ["survival", "track", "same-trail", "teamwork", "ally", "one-use"],
    filters: { actionSlugs: ["track"] },
    contentBatch: 11
  }),
  defineSurvival({
    id: "track-failure-001-sign-overread",
    localizationKey: "SignOverread",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Sign Overread",
    fallbackDescription: "Resolve the normal critical failure for Track first. If you attempt to Track the same trail again within 1 hour, that next check takes a -1 circumstance penalty as you struggle to discard the pattern you misread. The penalty then ends.",
    tags: ["survival", "track", "same-trail", "brief-setback", "one-use"],
    filters: { actionSlugs: ["track"] },
    contentBatch: 11
  }),
  defineSurvival({
    id: "track-failure-002-false-branch-feels-certain",
    localizationKey: "FalseBranchFeelsCertain",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "False Branch Feels Certain",
    fallbackDescription: "Resolve the normal critical failure for Track first. There is no additional mechanical effect. If a false branch, overlapping trail, weathered mark, or disturbed patch could explain the mistake, the GM describes the misleading sign that drew your attention.",
    tags: ["survival", "track", "misread-sign", "trail", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["track"] },
    contentBatch: 11
  }),
  defineSurvival({
    id: "track-failure-003-search-pattern-exposed",
    localizationKey: "SearchPatternExposed",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.05,
    fallbackTitle: "Search Pattern Exposed",
    fallbackDescription: "Resolve the normal critical failure for Track first. There is no additional mechanical effect. Your search leaves a noticeable pattern of pauses, doubled-back steps, disturbed vegetation, or other signs that can reveal to a later observer that someone was actively trying to follow this trail.",
    tags: ["survival", "track", "evidence", "observer", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["track"] },
    contentBatch: 11
  }),

  defineSurvival({
    id: "sense-direction-success-001-landmark-chain",
    localizationKey: "LandmarkChain",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Landmark Chain",
    fallbackDescription: "Resolve the normal critical success for Sense Direction first. Keep this consequence GM-facing for the secret check. The GM may secretly grant a +1 circumstance bonus to your next Sense Direction check in the same region within 24 hours because you have established a reliable chain of bearings. The bonus then ends.",
    tags: ["survival", "sense-direction", "secret-check", "gm-facing", "navigation", "follow-up", "one-use"],
    filters: { actionSlugs: ["sense-direction"] },
    contentBatch: 11
  }),
  defineSurvival({
    id: "sense-direction-success-002-reliable-anchor",
    localizationKey: "ReliableAnchor",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Reliable Anchor",
    fallbackDescription: "Resolve the normal critical success for Sense Direction first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. If the environment supports it, the GM identifies one reliable landmark, celestial cue, slope, current, wind pattern, or other navigational anchor the character can now use in this area.",
    tags: ["survival", "sense-direction", "secret-check", "gm-facing", "navigation", "information", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["sense-direction"] },
    contentBatch: 11
  }),
  defineSurvival({
    id: "sense-direction-failure-001-convincing-wrong-bearing",
    localizationKey: "ConvincingWrongBearing",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Convincing Wrong Bearing",
    fallbackDescription: "Resolve the normal critical failure for Sense Direction first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. The GM may frame the mistaken bearing around a plausible environmental cue so the hidden error remains convincing without adding a second mechanical penalty.",
    tags: ["survival", "sense-direction", "secret-check", "gm-facing", "navigation", "misdirection", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["sense-direction"] },
    contentBatch: 11
  }),
  defineSurvival({
    id: "sense-direction-failure-002-true-landmark-false-bearing",
    localizationKey: "TrueLandmarkFalseBearing",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "True Landmark, False Bearing",
    fallbackDescription: "Resolve the normal critical failure for Sense Direction first. There is no additional mechanical effect. Keep this consequence GM-facing for the secret check. The GM may let one genuine landmark or natural feature appear to support the mistaken direction, provided it does not reveal that the normal result is wrong.",
    tags: ["survival", "sense-direction", "secret-check", "gm-facing", "navigation", "misdirection", "true-detail", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["sense-direction"] },
    contentBatch: 11
  }),

  defineSurvival({
    id: "subsist-success-001-sustainable-source",
    localizationKey: "SustainableSource",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Sustainable Source",
    fallbackDescription: "Resolve the normal critical success for Subsist first. Your next Subsist check in the same settlement, district, or wilderness area within 1 week gains a +1 circumstance bonus because you have identified a dependable local source or routine. The bonus then ends.",
    tags: ["subsist", "survival", "society", "same-area", "follow-up", "one-use"],
    filters: { skillTypes: ["survival", "society"], actionSlugs: ["subsist"] },
    contentBatch: 11
  }),
  defineSurvival({
    id: "subsist-success-002-useful-local-routine",
    localizationKey: "UsefulLocalRoutine",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Useful Local Routine",
    fallbackDescription: "Resolve the normal critical success for Subsist first. There is no additional mechanical effect. If appropriate, the GM points out one useful local routine or resource tied to obtaining food and shelter, such as a reliable water source, dry camp, market rhythm, charitable custom, safe foraging patch, or similar practical detail.",
    tags: ["subsist", "survival", "society", "information", "resource", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["survival", "society"], actionSlugs: ["subsist"] },
    contentBatch: 11
  }),
  defineSurvival({
    id: "subsist-failure-001-resource-assumption-breaks",
    localizationKey: "ResourceAssumptionBreaks",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Resource Assumption Breaks",
    fallbackDescription: "Resolve the normal critical failure for Subsist first. Your next Subsist check in the same settlement, district, or wilderness area within 24 hours takes a -1 circumstance penalty because the failed attempt has left you relying on a poor source, route, contact, or timing assumption. The penalty then ends.",
    tags: ["subsist", "survival", "society", "same-area", "brief-setback", "one-use"],
    filters: { skillTypes: ["survival", "society"], actionSlugs: ["subsist"] },
    contentBatch: 11
  }),
  defineSurvival({
    id: "subsist-failure-002-what-was-missing",
    localizationKey: "WhatWasMissing",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "What Was Missing",
    fallbackDescription: "Resolve the normal critical failure for Subsist first. There is no additional mechanical effect. If the situation makes it apparent, the GM identifies one practical reason the attempt failed, such as scarcity, contamination, poor timing, local custom, weather, competition, or a mistaken assumption about available shelter.",
    tags: ["subsist", "survival", "society", "information", "scarcity", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["survival", "society"], actionSlugs: ["subsist"] },
    contentBatch: 11
  }),

  defineSurvival({
    id: "cover-tracks-success-001-best-ground-chosen",
    localizationKey: "BestGroundChosen",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Best Ground Chosen",
    fallbackDescription: "Resolve the normal critical success for Cover Tracks first. Your next Cover Tracks check in the same kind of terrain within 1 hour gains a +1 circumstance bonus because you have identified which surfaces and routes hide passage most effectively. The bonus then ends.",
    tags: ["survival", "cover-tracks", "same-terrain", "follow-up", "one-use"],
    filters: { actionSlugs: ["cover-tracks"] },
    contentBatch: 11
  }),
  defineSurvival({
    id: "cover-tracks-success-002-misdirection-without-delay",
    localizationKey: "MisdirectionWithoutDelay",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Misdirection Without Delay",
    fallbackDescription: "Resolve the normal critical success for Cover Tracks first. There is no additional mechanical effect. If plausible, the GM describes one misleading sign, false continuation, or route choice your careful passage naturally creates without changing the normal tracking difficulty again.",
    tags: ["survival", "cover-tracks", "misdirection", "trail", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["cover-tracks"] },
    contentBatch: 11
  }),
  defineSurvival({
    id: "cover-tracks-failure-001-repeated-habit",
    localizationKey: "RepeatedHabit",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Repeated Habit",
    fallbackDescription: "Resolve the normal critical failure for Cover Tracks first. Your next Cover Tracks check within 1 hour takes a -1 circumstance penalty because you keep repeating the same concealment habit. The penalty then ends.",
    tags: ["survival", "cover-tracks", "brief-setback", "one-use"],
    filters: { actionSlugs: ["cover-tracks"] },
    contentBatch: 11
  }),
  defineSurvival({
    id: "cover-tracks-failure-002-telltale-sign",
    localizationKey: "TelltaleSign",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Telltale Sign",
    fallbackDescription: "Resolve the normal critical failure for Cover Tracks first. There is no additional mechanical effect. The GM may describe one kind of sign your attempt leaves behind, such as displaced debris, repeated brush marks, an unnatural absence of tracks, or another clue that explains why the trail is easier to read than intended.",
    tags: ["survival", "cover-tracks", "evidence", "trail", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["cover-tracks"] },
    contentBatch: 11
  }),

  defineUtility({
    id: "aid-success-001-shared-method",
    localizationKey: "SharedMethod",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Shared Method",
    fallbackDescription: "Resolve the normal critical success for Aid first. The ally you aided gains a +1 circumstance bonus to the next skill check they make to Aid you within 10 minutes. The bonus then ends.",
    tags: ["utility", "aid", "teamwork", "same-ally", "reciprocal", "one-use"],
    filters: { actionSlugs: ["aid"] },
    contentBatch: 12
  }),
  defineUtility({
    id: "aid-success-002-clean-handoff",
    localizationKey: "CleanHandoff",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Clean Handoff",
    fallbackDescription: "Resolve the normal critical success for Aid first. Your next skill check to Aid the same ally within 1 minute gains a +1 circumstance bonus because the two of you have established a clean working rhythm. The bonus then ends.",
    tags: ["utility", "aid", "teamwork", "same-ally", "follow-up", "one-use"],
    filters: { actionSlugs: ["aid"] },
    contentBatch: 12
  }),
  defineUtility({
    id: "aid-success-003-why-it-worked",
    localizationKey: "WhyItWorked",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Why It Worked",
    fallbackDescription: "Resolve the normal critical success for Aid first. There is no additional mechanical effect. If the cooperation makes it apparent, the GM describes one practical detail in timing, positioning, communication, or technique that made your help especially effective.",
    tags: ["utility", "aid", "teamwork", "information", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["aid"] },
    contentBatch: 12
  }),
  defineUtility({
    id: "aid-failure-001-crossed-signals",
    localizationKey: "CrossedSignals",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Crossed Signals",
    fallbackDescription: "Resolve the normal critical failure for Aid first. Your next skill check to Aid the same ally within 1 minute takes a -1 circumstance penalty while you both reset your coordination. The penalty then ends.",
    tags: ["utility", "aid", "teamwork", "same-ally", "brief-setback", "one-use"],
    filters: { actionSlugs: ["aid"] },
    contentBatch: 12
  }),
  defineUtility({
    id: "aid-failure-002-approaches-collide",
    localizationKey: "ApproachesCollide",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Approaches Collide",
    fallbackDescription: "Resolve the normal critical failure for Aid first. There is no additional mechanical effect. The failed attempt makes one conflict between your method and the ally's approach obvious, such as timing, positioning, instructions, or competing assumptions.",
    tags: ["utility", "aid", "teamwork", "coordination", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["aid"] },
    contentBatch: 12
  }),
  defineUtility({
    id: "aid-failure-003-mutual-hesitation",
    localizationKey: "MutualHesitation",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Mutual Hesitation",
    fallbackDescription: "Resolve the normal critical failure for Aid first. The ally you attempted to aid takes a -1 circumstance penalty to the next skill check they make to Aid you within 1 minute because the failed coordination has made the handoff uncertain. The penalty then ends.",
    tags: ["utility", "aid", "teamwork", "same-ally", "reciprocal", "brief-setback", "one-use"],
    filters: { actionSlugs: ["aid"] },
    contentBatch: 12
  }),


  defineSkillActionCard({
    id: "command-an-animal-success-001-clear-signal",
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "nature",
    localizationKey: "ClearSignal",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Clear Signal",
    fallbackDescription: "Resolve the normal critical success for Command an Animal first. Your next Command an Animal check against the same animal within 1 minute gains a +1 circumstance bonus because your cues are especially clear. The bonus then ends.",
    tags: ["nature", "command-an-animal", "same-animal", "follow-up", "one-use"],
    filters: { skillTypes: ["nature"], actionSlugs: ["command-an-animal"] },
    contentBatch: 13
  }),
  defineSkillActionCard({
    id: "command-an-animal-success-002-animal-reads-the-mood",
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "nature",
    localizationKey: "AnimalReadsTheMood",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Animal Reads the Mood",
    fallbackDescription: "Resolve the normal critical success for Command an Animal first. There is no additional mechanical effect. If useful, the GM describes one cue in the animal's response that reveals an obvious preference, fear, distraction, or sign of trust relevant to handling it.",
    tags: ["nature", "command-an-animal", "same-animal", "behavioral-tell", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["nature"], actionSlugs: ["command-an-animal"] },
    contentBatch: 13
  }),
  defineSkillActionCard({
    id: "command-an-animal-failure-001-conflicting-cue",
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "nature",
    localizationKey: "ConflictingCue",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Conflicting Cue",
    fallbackDescription: "Resolve the normal critical failure for Command an Animal first, including whatever misbehavior or misunderstanding the GM determines. Your next Command an Animal check against the same animal within 1 minute takes a -1 circumstance penalty while you re-establish clear cues. The penalty then ends.",
    tags: ["nature", "command-an-animal", "same-animal", "brief-setback", "one-use"],
    filters: { skillTypes: ["nature"], actionSlugs: ["command-an-animal"] },
    contentBatch: 13
  }),
  defineSkillActionCard({
    id: "command-an-animal-failure-002-misunderstanding-revealed",
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "nature",
    localizationKey: "MisunderstandingRevealed",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.15,
    fallbackTitle: "Misunderstanding Revealed",
    fallbackDescription: "Resolve the normal critical failure for Command an Animal first, including the animal's normal misbehavior. There is no additional mechanical effect. Afterward, its response makes one part of your cue, tone, gesture, or intended direction especially easy to identify as the source of the misunderstanding.",
    tags: ["nature", "command-an-animal", "same-animal", "behavioral-tell", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["nature"], actionSlugs: ["command-an-animal"] },
    contentBatch: 13
  }),

  defineSkillActionCard({
    id: "learn-a-spell-success-001-theory-locks-in",
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "magic-learning",
    localizationKey: "TheoryLocksIn",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Theory Locks In",
    fallbackDescription: "Resolve the normal critical success for Learn a Spell first. Your next Recall Knowledge or Identify Magic check within 1 week concerning the same spell or a directly related magical effect gains a +1 circumstance bonus. The bonus then ends.",
    tags: ["magic", "learn-a-spell", "learning", "follow-up", "one-use"],
    filters: { skillTypes: ["arcana", "nature", "occultism", "religion"], actionSlugs: ["learn-a-spell"] },
    contentBatch: 13
  }),
  defineSkillActionCard({
    id: "learn-a-spell-success-002-reusable-notation",
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "magic-learning",
    localizationKey: "ReusableNotation",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Reusable Notation",
    fallbackDescription: "Resolve the normal critical success for Learn a Spell first. There is no additional mechanical effect. Your notes preserve one useful mnemonic, notation habit, ritual cue, or conceptual shortcut that explains why this spell's structure finally made sense, without reducing the cost or time of another Learn a Spell activity.",
    tags: ["magic", "learn-a-spell", "learning", "notes", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["arcana", "nature", "occultism", "religion"], actionSlugs: ["learn-a-spell"] },
    contentBatch: 13
  }),
  defineSkillActionCard({
    id: "learn-a-spell-failure-001-bad-assumption-persists",
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "magic-learning",
    localizationKey: "BadAssumptionPersists",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Bad Assumption Persists",
    fallbackDescription: "Resolve the normal critical failure for Learn a Spell first, including the normal material expenditure and restriction on trying that spell again. Your next Recall Knowledge or Identify Magic check within 24 hours concerning that same spell takes a -1 circumstance penalty because the failed model is still coloring your interpretation. The penalty then ends.",
    tags: ["magic", "learn-a-spell", "misconception", "brief-setback", "one-use"],
    filters: { skillTypes: ["arcana", "nature", "occultism", "religion"], actionSlugs: ["learn-a-spell"] },
    contentBatch: 13
  }),
  defineSkillActionCard({
    id: "learn-a-spell-failure-002-failure-is-specific",
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "magic-learning",
    localizationKey: "FailureIsSpecific",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.15,
    fallbackTitle: "Failure Is Specific",
    fallbackDescription: "Resolve the normal critical failure for Learn a Spell first. There is no additional mechanical effect. The failed study makes one broad obstacle clear, such as a notation convention, pronunciation, magical principle, missing prerequisite concept, or mismatch between source and tradition, without granting the spell or refunding any materials.",
    tags: ["magic", "learn-a-spell", "learning", "information", "narrative", "no-mechanical-effect"],
    filters: { skillTypes: ["arcana", "nature", "occultism", "religion"], actionSlugs: ["learn-a-spell"] },
    contentBatch: 13
  }),

  defineSkillActionCard({
    id: "earn-income-success-001-repeat-business",
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "downtime",
    localizationKey: "RepeatBusiness",
    category: "skillCheckCriticalSuccess",
    impact: "light",
    fallbackTitle: "Repeat Business",
    fallbackDescription: "Resolve the normal critical success for Earn Income first. Your next Earn Income check in the same community and the same general line of work within 1 month gains a +1 circumstance bonus because your work left a strong impression. The bonus then ends.",
    tags: ["downtime", "earn-income", "same-community", "reputation", "follow-up", "one-use"],
    filters: { actionSlugs: ["earn-income"] },
    contentBatch: 13
  }),
  defineSkillActionCard({
    id: "earn-income-success-002-professional-contact",
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "downtime",
    localizationKey: "ProfessionalContact",
    category: "skillCheckCriticalSuccess",
    tone: "serious",
    impact: "narrative",
    weight: 1.1,
    fallbackTitle: "Professional Contact",
    fallbackDescription: "Resolve the normal critical success for Earn Income first. There is no additional mechanical effect or extra payment. If appropriate, the GM may establish one client, coworker, patron, supervisor, or regular customer who remembers the quality of your work and can plausibly reappear later.",
    tags: ["downtime", "earn-income", "contact", "reputation", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["earn-income"] },
    contentBatch: 13
  }),
  defineSkillActionCard({
    id: "earn-income-failure-001-burned-reference",
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "downtime",
    localizationKey: "BurnedReference",
    category: "skillCheckCriticalFailure",
    impact: "light",
    fallbackTitle: "Burned Reference",
    fallbackDescription: "Resolve the normal critical failure for Earn Income first, including earning nothing, losing the job, and any normal reputation consequences. Your next Earn Income check in the same community within 1 week takes a -1 circumstance penalty as word of the failed job lingers. The penalty then ends.",
    tags: ["downtime", "earn-income", "same-community", "reputation", "brief-setback", "one-use"],
    filters: { actionSlugs: ["earn-income"] },
    contentBatch: 13
  }),
  defineSkillActionCard({
    id: "earn-income-failure-002-useful-postmortem",
    packId: KNOWLEDGE_UTILITY_PACK,
    collection: "knowledge-utility",
    actionFamily: "downtime",
    localizationKey: "UsefulPostmortem",
    category: "skillCheckCriticalFailure",
    tone: "serious",
    impact: "narrative",
    weight: 1.15,
    fallbackTitle: "Useful Postmortem",
    fallbackDescription: "Resolve the normal critical failure for Earn Income first. There is no additional mechanical effect. The failure makes one mismatch in expectations, pace, local practice, professional etiquette, or job requirements especially clear, giving the setback a concrete fictional cause without restoring the lost income or position.",
    tags: ["downtime", "earn-income", "learning", "reputation", "narrative", "no-mechanical-effect"],
    filters: { actionSlugs: ["earn-income"] },
    contentBatch: 13
  }),
]);
