import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SKILLFUL_PACK_CONFIGS, buildSkillfulConsequencePacks } from "../scripts/data/packs.js";
import { PHYSICAL_ACTION_CARDS } from "../scripts/data/cards/physical-actions.js";
import { SOCIAL_ACTION_CARDS } from "../scripts/data/cards/social-actions.js";
import { SUBTERFUGE_ACTION_CARDS } from "../scripts/data/cards/subterfuge-actions.js";
import { KNOWLEDGE_UTILITY_CARDS } from "../scripts/data/cards/knowledge-utility-actions.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const allowPrerelease = process.argv.includes("--allow-prerelease") || process.argv.includes("--allow-dev");
const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));
const fail = (message) => { console.error(`RELEASE CHECK FAILED: ${message}`); process.exitCode = 1; };
const pass = (message) => console.log(`✓ ${message}`);
const allCards = [...PHYSICAL_ACTION_CARDS, ...SOCIAL_ACTION_CARDS, ...SUBTERFUGE_ACTION_CARDS, ...KNOWLEDGE_UTILITY_CARDS];

const manifest = readJson("module.json");
const pkg = readJson("package.json");
const constants = readFileSync(join(root, "scripts/constants.js"), "utf8");
const moduleVersion = constants.match(/MODULE_VERSION\s*=\s*"([^"]+)"/)?.[1];
const requiredForge = constants.match(/REQUIRED_CRITICAL_FORGE_VERSION\s*=\s*"([^"]+)"/)?.[1];
const requiredApi = constants.match(/REQUIRED_CRITICAL_FORGE_API_VERSION\s*=\s*"([^"]+)"/)?.[1];

if (manifest.version === pkg.version && pkg.version === moduleVersion) pass(`version metadata agrees on ${manifest.version}`);
else fail(`version mismatch: manifest=${manifest.version}, package=${pkg.version}, constants=${moduleVersion}`);

if (!String(manifest.version).includes("-")) pass("stable release version contains no prerelease suffix");
else if (allowPrerelease) pass("prerelease suffix accepted for quality check");
else fail("release version still contains a prerelease suffix");

if (manifest.compatibility?.minimum === "14" && manifest.compatibility?.verified === "14") pass("Foundry 14 compatibility is explicit");
else fail("Foundry compatibility must declare minimum and verified version 14");

const pf2e = manifest.relationships?.systems?.find((entry) => entry.id === "pf2e");
if (pf2e?.compatibility?.minimum === "8.1.2") pass("PF2e minimum version is 8.1.2");
else fail("PF2e minimum version must be 8.1.2");

const criticalForge = manifest.relationships?.requires?.find((entry) => entry.id === "pf2e-critical-forge");
if (criticalForge?.compatibility?.minimum === "1.0.1-rc.6.1" && requiredForge === ">=1.0.1-rc.6.1" && requiredApi === ">=0.9.7") {
  pass("Critical Forge rc.6.1 / API 0.9.7 baseline is synchronized");
} else fail("Critical Forge dependency or API baseline is out of sync");

const referenced = [
  ...(manifest.esmodules ?? []),
  ...(manifest.languages ?? []).map((entry) => entry.path),
  manifest.license,
  manifest.readme
].filter(Boolean);
for (const path of referenced) if (!existsSync(join(root, path))) fail(`manifest path does not exist: ${path}`);
if (!process.exitCode) pass(`${referenced.length} manifest paths exist`);

const flatten = (value, prefix = "", result = new Set()) => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) flatten(child, prefix ? `${prefix}.${key}` : key, result);
  } else result.add(prefix);
  return result;
};
const deKeys = flatten(readJson("lang/de.json"));
const enKeys = flatten(readJson("lang/en.json"));
const missingDe = [...enKeys].filter((key) => !deKeys.has(key));
const missingEn = [...deKeys].filter((key) => !enKeys.has(key));
if (!missingDe.length && !missingEn.length) pass(`localization parity (${deKeys.size} keys)`);
else fail(`localization mismatch; missing DE: ${missingDe.join(", ") || "none"}; missing EN: ${missingEn.join(", ") || "none"}`);

if (PHYSICAL_ACTION_CARDS.length === 56 && SOCIAL_ACTION_CARDS.length === 50 && SUBTERFUGE_ACTION_CARDS.length === 38 && KNOWLEDGE_UTILITY_CARDS.length === 74 && allCards.length === 218) pass("card inventory is 218 (56 physical + 50 social + 38 subterfuge + 74 knowledge/utility)");
else fail(`expected 56 physical + 50 social + 38 subterfuge + 74 knowledge/utility cards, found ${PHYSICAL_ACTION_CARDS.length} + ${SOCIAL_ACTION_CARDS.length} + ${SUBTERFUGE_ACTION_CARDS.length} + ${KNOWLEDGE_UTILITY_CARDS.length}`);

if (new Set(allCards.map((card) => card.id)).size === 218 && new Set(allCards.map((card) => card.fallbackTitle)).size === 218) pass("all card ids and fallback titles are unique");
else fail("duplicate card id or fallback title detected");

const densityMatches = (cards, actions, successCount, failureCount) => actions.every((action) => {
  const matches = cards.filter((card) => card.filters.actionSlugs.includes(action));
  return matches.filter((card) => card.category === "skillCheckCriticalSuccess").length === successCount
    && matches.filter((card) => card.category === "skillCheckCriticalFailure").length === failureCount;
});
const physicalDensityOk = densityMatches(PHYSICAL_ACTION_CARDS, ["grapple", "trip", "tumble-through"], 3, 3)
  && densityMatches(PHYSICAL_ACTION_CARDS, ["shove", "reposition", "disarm", "climb", "swim", "balance", "maneuver-in-flight", "force-open"], 2, 2)
  && densityMatches(PHYSICAL_ACTION_CARDS, ["high-jump", "long-jump", "squeeze"], 1, 1);
const socialDensityOk = densityMatches(SOCIAL_ACTION_CARDS, ["feint", "lie", "gather-information", "demoralize", "perform"], 3, 3)
  && densityMatches(SOCIAL_ACTION_CARDS, ["create-a-diversion", "impersonate", "make-an-impression", "request", "coerce"], 2, 2);
const subterfugeDensityOk = densityMatches(SUBTERFUGE_ACTION_CARDS, ["hide", "sneak", "disable-a-device"], 3, 3)
  && densityMatches(SUBTERFUGE_ACTION_CARDS, ["conceal-an-object", "pick-a-lock", "palm-an-object", "steal", "create-forgery"], 2, 2);
const knowledgeUtilityDensityOk = densityMatches(KNOWLEDGE_UTILITY_CARDS, ["treat-wounds", "administer-first-aid", "repair", "craft", "identify-magic", "identify-alchemy", "decipher-writing", "sense-direction", "subsist", "cover-tracks"], 2, 2)
  && densityMatches(KNOWLEDGE_UTILITY_CARDS, ["treat-disease", "treat-poison"], 1, 1)
  && densityMatches(KNOWLEDGE_UTILITY_CARDS, ["recall-knowledge", "track", "aid"], 3, 3)
  && densityMatches(KNOWLEDGE_UTILITY_CARDS, ["command-an-animal", "learn-a-spell", "earn-income"], 2, 2);
if (physicalDensityOk && socialDensityOk && subterfugeDensityOk && knowledgeUtilityDensityOk) pass("all four action packs match the reviewed density baseline");
else fail("action density does not match the reviewed density baseline");

const reviewedFrequentActions = Object.freeze(["aid", "demoralize", "disable-a-device", "feint", "gather-information", "grapple", "hide", "lie", "perform", "recall-knowledge", "sneak", "track", "trip", "tumble-through"]);
const reviewedRegularActions = Object.freeze(["administer-first-aid", "balance", "climb", "coerce", "command-an-animal", "conceal-an-object", "cover-tracks", "craft", "create-a-diversion", "create-forgery", "decipher-writing", "disarm", "earn-income", "force-open", "identify-alchemy", "identify-magic", "impersonate", "learn-a-spell", "make-an-impression", "maneuver-in-flight", "palm-an-object", "pick-a-lock", "repair", "reposition", "request", "sense-direction", "shove", "steal", "subsist", "swim", "treat-wounds"]);
const reviewedNarrowActions = Object.freeze(["high-jump", "long-jump", "squeeze", "treat-disease", "treat-poison"]);
const reviewedActions = [...reviewedFrequentActions, ...reviewedRegularActions, ...reviewedNarrowActions].sort();
const cardActions = [...new Set(allCards.flatMap((card) => card.filters.actionSlugs ?? []))].sort();
const configuredActions = SKILLFUL_PACK_CONFIGS.flatMap((config) => config.metadata.supportedActions).sort();
if (reviewedFrequentActions.length === 14 && reviewedRegularActions.length === 31 && reviewedNarrowActions.length === 5
  && (reviewedFrequentActions.length * 6) + (reviewedRegularActions.length * 4) + (reviewedNarrowActions.length * 2) === 218
  && JSON.stringify(cardActions) === JSON.stringify(reviewedActions)
  && JSON.stringify(configuredActions) === JSON.stringify(reviewedActions)
  && new Set(configuredActions).size === 50) {
  pass("completeness baseline confirms 50 actions at 14 frequent / 31 regular / 5 narrow");
} else fail("completeness baseline action surface or tier totals are inconsistent");

const athleticsActions = new Set(["grapple", "trip", "shove", "reposition", "disarm", "climb", "swim", "high-jump", "long-jump", "force-open"]);
const acrobaticsActions = new Set(["balance", "tumble-through", "maneuver-in-flight", "squeeze"]);
const physicalFiltersOk = PHYSICAL_ACTION_CARDS.every((card) => {
  const action = card.filters.actionSlugs?.[0];
  if (athleticsActions.has(action)) return card.filters.skillTypes?.length === 1 && card.filters.skillTypes[0] === "athletics" && card.metadata.actionFamily === "athletics";
  if (acrobaticsActions.has(action)) return card.filters.skillTypes?.length === 1 && card.filters.skillTypes[0] === "acrobatics" && card.metadata.actionFamily === "acrobatics";
  return false;
});
const deceptionActions = new Set(["feint", "create-a-diversion", "lie", "impersonate"]);
const diplomacyActions = new Set(["make-an-impression", "request", "gather-information"]);
const intimidationActions = new Set(["demoralize", "coerce"]);
const performanceActions = new Set(["perform"]);
const socialFiltersOk = SOCIAL_ACTION_CARDS.every((card) => {
  const action = card.filters.actionSlugs?.[0];
  const expectedSkill = deceptionActions.has(action) ? "deception" : diplomacyActions.has(action) ? "diplomacy" : intimidationActions.has(action) ? "intimidation" : performanceActions.has(action) ? "performance" : null;
  return expectedSkill
    && card.filters.skillTypes?.length === 1
    && card.filters.skillTypes[0] === expectedSkill
    && card.metadata.actionFamily === expectedSkill;
});
const stealthActions = new Set(["hide", "sneak", "conceal-an-object"]);
const thieveryActions = new Set(["pick-a-lock", "disable-a-device", "palm-an-object", "steal"]);
const forgeryActions = new Set(["create-forgery"]);
const subterfugeFiltersOk = SUBTERFUGE_ACTION_CARDS.every((card) => {
  const action = card.filters.actionSlugs?.[0];
  const expectedSkill = stealthActions.has(action) ? "stealth" : thieveryActions.has(action) ? "thievery" : forgeryActions.has(action) ? "society" : null;
  if (!expectedSkill || card.filters.skillTypes?.length !== 1 || card.filters.skillTypes[0] !== expectedSkill || card.metadata.actionFamily !== expectedSkill) return false;
  return !["stealth", "society"].includes(expectedSkill) || (card.tags.includes("secret-check") && card.tags.includes("gm-facing"));
});
const medicineActions = new Set(["treat-wounds", "administer-first-aid", "treat-disease", "treat-poison"]);
const craftingActions = new Set(["repair", "craft"]);
const knowledgeActions = new Set(["recall-knowledge", "identify-magic", "identify-alchemy", "decipher-writing"]);
const survivalActions = new Set(["track", "sense-direction", "subsist", "cover-tracks"]);
const utilityActions = new Set(["aid"]);
const natureActions = new Set(["command-an-animal"]);
const magicLearningActions = new Set(["learn-a-spell"]);
const downtimeActions = new Set(["earn-income"]);
const knowledgeUtilityFiltersOk = KNOWLEDGE_UTILITY_CARDS.every((card) => {
  const action = card.filters.actionSlugs?.[0];
  if (medicineActions.has(action)) return card.filters.skillTypes?.length === 1 && card.filters.skillTypes[0] === "medicine" && card.metadata.actionFamily === "medicine";
  if (craftingActions.has(action)) return card.filters.skillTypes?.length === 1 && card.filters.skillTypes[0] === "crafting" && card.metadata.actionFamily === "crafting";
  if (survivalActions.has(action)) {
    if (card.metadata.actionFamily !== "survival") return false;
    if (action === "subsist") return JSON.stringify(card.filters.skillTypes) === JSON.stringify(["survival", "society"]);
    if (JSON.stringify(card.filters.skillTypes) !== JSON.stringify(["survival"])) return false;
    return action !== "sense-direction" || (card.tags.includes("secret-check") && card.tags.includes("gm-facing"));
  }
  if (utilityActions.has(action)) return card.metadata.actionFamily === "utility" && card.filters.skillTypes?.length === 0;
  if (natureActions.has(action)) return card.metadata.actionFamily === "nature" && JSON.stringify(card.filters.skillTypes) === JSON.stringify(["nature"]);
  if (magicLearningActions.has(action)) return card.metadata.actionFamily === "magic-learning" && JSON.stringify(card.filters.skillTypes) === JSON.stringify(["arcana", "nature", "occultism", "religion"]);
  if (downtimeActions.has(action)) return card.metadata.actionFamily === "downtime" && card.filters.skillTypes?.length === 0;
  if (!knowledgeActions.has(action) || card.metadata.actionFamily !== "knowledge" || !card.tags.includes("secret-check") || !card.tags.includes("gm-facing")) return false;
  if (action === "recall-knowledge") return card.filters.skillTypes?.length === 0;
  if (action === "decipher-writing") return JSON.stringify(card.filters.skillTypes) === JSON.stringify(["arcana", "society", "occultism", "religion"]);
  if (action === "identify-magic") return JSON.stringify(card.filters.skillTypes) === JSON.stringify(["arcana", "nature", "occultism", "religion"]);
  if (action === "identify-alchemy") return JSON.stringify(card.filters.skillTypes) === JSON.stringify(["crafting"]);
  return false;
});
if (physicalFiltersOk && socialFiltersOk && subterfugeFiltersOk && knowledgeUtilityFiltersOk) pass("all four packs use exact skill/action filters");
else fail("skill or action-family filter mismatch detected");

const gatherCards = SOCIAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs?.includes("gather-information"));
const gatherFailures = gatherCards.filter((card) => card.category === "skillCheckCriticalFailure");
if (gatherCards.length === 6
  && gatherCards.every((card) => card.tags.includes("secret-check") && card.tags.includes("gm-facing"))
  && gatherFailures.length === 3
  && gatherFailures.every((card) => card.impact === "narrative" && card.tags.includes("gm-facing") && card.tags.includes("no-mechanical-effect"))) {
  pass("Gather Information secret-check boundary is explicit");
} else fail("Gather Information secret-check boundary is incomplete");

const secretSocialActions = ["lie", "impersonate", "gather-information"];
if (secretSocialActions.every((action) => {
  const cards = SOCIAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs?.includes(action));
  return cards.length > 0 && cards.every((card) => card.tags.includes("secret-check") && card.tags.includes("gm-facing"));
})) pass("Lie, Impersonate, and Gather Information use consistent GM-facing secret-check presentation");
else fail("social secret-check presentation is inconsistent");

const stealthCards = SUBTERFUGE_ACTION_CARDS.filter((card) => card.metadata.actionFamily === "stealth");
const stealthFailures = stealthCards.filter((card) => card.category === "skillCheckCriticalFailure");
if (stealthCards.length === 16
  && stealthCards.every((card) => card.tags.includes("secret-check") && card.tags.includes("gm-facing"))
  && stealthFailures.length === 8
  && stealthFailures.every((card) => /Keep this consequence GM-facing|Keep this consequence GM-facing for a secret check/i.test(card.fallbackDescription))) {
  pass("Stealth secret-check presentation boundary is explicit");
} else fail("Stealth secret-check presentation boundary is incomplete");

const thieveryCards = SUBTERFUGE_ACTION_CARDS.filter((card) => card.metadata.actionFamily === "thievery");
if (thieveryCards.length === 18
  && densityMatches(thieveryCards, ["disable-a-device"], 3, 3)
  && densityMatches(thieveryCards, ["pick-a-lock", "palm-an-object", "steal"], 2, 2)
  && thieveryCards.every((card) => !card.tags.includes("equipment") && !card.tags.includes("toolkit"))) {
  pass("Thievery density and Goblin Engineering separation are explicit");
} else fail("Thievery density or equipment-separation boundary is incomplete");

const medicineCards = KNOWLEDGE_UTILITY_CARDS.filter((card) => card.metadata.actionFamily === "medicine");
const craftingCards = KNOWLEDGE_UTILITY_CARDS.filter((card) => card.metadata.actionFamily === "crafting");
if (medicineCards.length === 12
  && craftingCards.length === 8
  && KNOWLEDGE_UTILITY_CARDS.every((card) => !card.tags.includes("equipment") && !card.tags.includes("toolkit") && !card.tags.includes("malfunction"))
  && densityMatches(medicineCards, ["treat-wounds", "administer-first-aid"], 2, 2)
  && densityMatches(medicineCards, ["treat-disease", "treat-poison"], 1, 1)
  && densityMatches(craftingCards, ["repair", "craft"], 2, 2)) {
  pass("Medicine/Crafting density and Goblin Engineering separation are explicit");
} else fail("Medicine/Crafting density or equipment-separation boundary is incomplete");

const knowledgeCards = KNOWLEDGE_UTILITY_CARDS.filter((card) => card.metadata.actionFamily === "knowledge");
const knowledgeFailures = knowledgeCards.filter((card) => card.category === "skillCheckCriticalFailure");
if (knowledgeCards.length === 18
  && densityMatches(knowledgeCards, ["recall-knowledge"], 3, 3)
  && densityMatches(knowledgeCards, ["identify-magic", "identify-alchemy", "decipher-writing"], 2, 2)
  && knowledgeCards.every((card) => card.tags.includes("secret-check") && card.tags.includes("gm-facing"))
  && knowledgeFailures.length === 9
  && knowledgeFailures.every((card) => card.impact === "narrative" && card.tags.includes("no-mechanical-effect"))) {
  pass("Knowledge-action density and secret-check safety are explicit");
} else fail("Knowledge-action density or secret-check safety is incomplete");

const survivalCards = KNOWLEDGE_UTILITY_CARDS.filter((card) => card.metadata.actionFamily === "survival");
const senseDirectionCards = survivalCards.filter((card) => card.filters.actionSlugs.includes("sense-direction"));
const senseDirectionFailures = senseDirectionCards.filter((card) => card.category === "skillCheckCriticalFailure");
const subsistCards = survivalCards.filter((card) => card.filters.actionSlugs.includes("subsist"));
if (survivalCards.length === 18
  && densityMatches(survivalCards, ["track"], 3, 3)
  && densityMatches(survivalCards, ["sense-direction", "subsist", "cover-tracks"], 2, 2)
  && senseDirectionCards.every((card) => card.tags.includes("secret-check") && card.tags.includes("gm-facing"))
  && senseDirectionFailures.every((card) => card.impact === "narrative" && card.tags.includes("no-mechanical-effect"))
  && subsistCards.every((card) => JSON.stringify(card.filters.skillTypes) === JSON.stringify(["survival", "society"]))) {
  pass("Survival density, secret navigation, and multi-skill Subsist boundary are explicit");
} else fail("Survival density or filter/secret boundary is incomplete");

const performanceCards = SOCIAL_ACTION_CARDS.filter((card) => card.metadata.actionFamily === "performance");
const aidCards = KNOWLEDGE_UTILITY_CARDS.filter((card) => card.metadata.actionFamily === "utility" && card.filters.actionSlugs.includes("aid"));
if (performanceCards.length === 6
  && densityMatches(performanceCards, ["perform"], 3, 3)
  && performanceCards.every((card) => JSON.stringify(card.filters.skillTypes) === JSON.stringify(["performance"]))
  && aidCards.length === 6
  && densityMatches(aidCards, ["aid"], 3, 3)
  && aidCards.every((card) => card.filters.skillTypes?.length === 0)) {
  pass("Performance and skill-agnostic Aid density/filter boundaries are explicit");
} else fail("Performance or Aid density/filter boundary is incomplete");

const forgeryCards = SUBTERFUGE_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes("create-forgery"));
const commandAnimalCards = KNOWLEDGE_UTILITY_CARDS.filter((card) => card.filters.actionSlugs.includes("command-an-animal"));
const learnSpellCards = KNOWLEDGE_UTILITY_CARDS.filter((card) => card.filters.actionSlugs.includes("learn-a-spell"));
const earnIncomeCards = KNOWLEDGE_UTILITY_CARDS.filter((card) => card.filters.actionSlugs.includes("earn-income"));
if (forgeryCards.length === 4
  && forgeryCards.every((card) => card.tags.includes("secret-check") && card.tags.includes("gm-facing") && JSON.stringify(card.filters.skillTypes) === JSON.stringify(["society"]))
  && commandAnimalCards.length === 4 && commandAnimalCards.every((card) => card.metadata.actionFamily === "nature" && JSON.stringify(card.filters.skillTypes) === JSON.stringify(["nature"]))
  && learnSpellCards.length === 4 && learnSpellCards.every((card) => card.metadata.actionFamily === "magic-learning" && JSON.stringify(card.filters.skillTypes) === JSON.stringify(["arcana", "nature", "occultism", "religion"]))
  && earnIncomeCards.length === 4 && earnIncomeCards.every((card) => card.metadata.actionFamily === "downtime" && card.filters.skillTypes?.length === 0)) {
  pass("remaining-action review filter and secret-check boundaries are explicit");
} else fail("remaining-action review filter or secret-check boundary is incomplete");

if (allCards.every((card) => card.metadata.preservesCoreOutcome === true && card.effect === null && card.metadata.resolution === "manual")) pass("all cards preserve PF2e core outcomes and use manual resolution");
else fail("a card violates the core-outcome or manual-resolution boundary");

const expectedContentStatus = String(manifest.version).includes("-rc.")
  ? "release-candidate"
  : String(manifest.version).includes("-dev.")
    ? "development"
    : "stable";
if (SKILLFUL_PACK_CONFIGS.length === 4
  && SKILLFUL_PACK_CONFIGS[0].metadata.implementedCards === 56
  && SKILLFUL_PACK_CONFIGS[1].metadata.implementedCards === 50
  && SKILLFUL_PACK_CONFIGS[2].metadata.implementedCards === 38
  && SKILLFUL_PACK_CONFIGS[3].metadata.implementedCards === 74
  && SKILLFUL_PACK_CONFIGS.every((config) => config.metadata.contentStatus === expectedContentStatus)) pass(`pack metadata is consistent for ${expectedContentStatus}`);
else fail(`pack metadata is inconsistent for ${expectedContentStatus}`);

const built = buildSkillfulConsequencePacks();
if (built.length === 4 && built[0].enabled && built[1].enabled && built[2].enabled && built[3].enabled
  && built[0].decks?.skill?.cards.length === 56 && built[1].decks?.skill?.cards.length === 50 && built[2].decks?.skill?.cards.length === 38 && built[3].decks?.skill?.cards.length === 74) pass("pack topology and defaults are correct");
else fail("pack topology or defaults are incorrect");

const forbiddenNames = new Set([".DS_Store", "Thumbs.db", ".env"]);
const skippedRootDirs = new Set([".git", "node_modules", "coverage"]);
const forbiddenDirs = new Set([".git", "node_modules", "coverage"]);
const allFiles = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = relative(root, full);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (dir === root && skippedRootDirs.has(name)) continue;
      if (forbiddenDirs.has(name)) fail(`forbidden release directory: ${rel}`);
      else walk(full);
    } else {
      allFiles.push(rel);
      if (forbiddenNames.has(name)) fail(`forbidden release file: ${rel}`);
    }
  }
}
walk(root);
if (!process.exitCode) pass(`archive hygiene (${allFiles.length} files checked)`);

for (const file of allFiles.filter((path) => path.endsWith(".js") || path.endsWith(".mjs"))) {
  try { execFileSync(process.execPath, ["--check", join(root, file)], { stdio: "pipe" }); }
  catch (error) { fail(`JavaScript syntax error in ${file}: ${error.stderr?.toString() ?? error.message}`); }
}
if (!process.exitCode) pass("all JavaScript files pass node --check");

const readme = readFileSync(join(root, "README.md"), "utf8");
const changelog = readFileSync(join(root, "CHANGELOG.md"), "utf8");
if (readme.includes(`Version **${manifest.version}**`) && changelog.includes(`## ${manifest.version}`)) pass("README and changelog identify the current version");
else fail("README or changelog does not identify the current version");

const completenessReview = readFileSync(join(root, "docs/ACTION_COMPLETENESS_DENSITY_REVIEW.md"), "utf8");
if (["218 cards", "50 supported action slugs", "14 frequent", "31 regular", "5 narrow", "Borrow an Arcane Spell", "Seek", "Sense Motive"].every((token) => completenessReview.toLowerCase().includes(token.toLowerCase()))) {
  pass("completeness and density review document records the audited boundaries");
} else fail("completeness and density review document is missing an audited boundary");

const finalIntegrationReview = readFileSync(join(root, "docs/FINAL_INTEGRATION_REVIEW.md"), "utf8");
if (["1.0.1-rc.6.1", "0.9.7", "218", "50 supported action slugs", "132 representative contexts", "355 / 355", "GM Blind", "borrowanarcanespell"].every((token) => finalIntegrationReview.toLowerCase().includes(token.toLowerCase()))) {
  pass("release-candidate final integration review records the audited runtime boundaries");
} else fail("release-candidate final integration review is missing an audited runtime boundary");

if (process.exitCode) process.exit(process.exitCode);
console.log("Skillful Consequences release-specific checks passed.");
