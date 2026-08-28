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
const allowDev = process.argv.includes("--allow-dev");
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
else if (allowDev) pass("prerelease suffix accepted for quality check");
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

if (PHYSICAL_ACTION_CARDS.length === 52 && SOCIAL_ACTION_CARDS.length === 44 && SUBTERFUGE_ACTION_CARDS.length === 34 && KNOWLEDGE_UTILITY_CARDS.length === 56 && allCards.length === 186) pass("development card inventory is 186 (52 physical + 44 social + 34 subterfuge + 56 knowledge/utility)");
else fail(`expected 52 physical + 44 social + 34 subterfuge + 56 knowledge/utility cards, found ${PHYSICAL_ACTION_CARDS.length} + ${SOCIAL_ACTION_CARDS.length} + ${SUBTERFUGE_ACTION_CARDS.length} + ${KNOWLEDGE_UTILITY_CARDS.length}`);

if (new Set(allCards.map((card) => card.id)).size === 186 && new Set(allCards.map((card) => card.fallbackTitle)).size === 186) pass("all development card ids and fallback titles are unique");
else fail("duplicate card id or fallback title detected");

const densityMatches = (cards, actions, successCount, failureCount) => actions.every((action) => {
  const matches = cards.filter((card) => card.filters.actionSlugs.includes(action));
  return matches.filter((card) => card.category === "skillCheckCriticalSuccess").length === successCount
    && matches.filter((card) => card.category === "skillCheckCriticalFailure").length === failureCount;
});
const physicalDensityOk = densityMatches(PHYSICAL_ACTION_CARDS, ["grapple", "trip", "tumble-through"], 3, 3)
  && densityMatches(PHYSICAL_ACTION_CARDS, ["shove", "reposition", "disarm", "climb", "swim", "balance", "maneuver-in-flight"], 2, 2)
  && densityMatches(PHYSICAL_ACTION_CARDS, ["high-jump", "long-jump", "squeeze"], 1, 1);
const socialDensityOk = densityMatches(SOCIAL_ACTION_CARDS, ["feint", "lie", "gather-information", "demoralize"], 3, 3)
  && densityMatches(SOCIAL_ACTION_CARDS, ["create-a-diversion", "impersonate", "make-an-impression", "request", "coerce"], 2, 2);
const subterfugeDensityOk = densityMatches(SUBTERFUGE_ACTION_CARDS, ["hide", "sneak", "disable-a-device"], 3, 3)
  && densityMatches(SUBTERFUGE_ACTION_CARDS, ["conceal-an-object", "pick-a-lock", "palm-an-object", "steal"], 2, 2);
const knowledgeUtilityDensityOk = densityMatches(KNOWLEDGE_UTILITY_CARDS, ["treat-wounds", "administer-first-aid", "repair", "craft", "identify-magic", "identify-alchemy", "decipher-writing", "sense-direction", "subsist", "cover-tracks"], 2, 2)
  && densityMatches(KNOWLEDGE_UTILITY_CARDS, ["treat-disease", "treat-poison"], 1, 1)
  && densityMatches(KNOWLEDGE_UTILITY_CARDS, ["recall-knowledge", "track"], 3, 3);
if (physicalDensityOk && socialDensityOk && subterfugeDensityOk && knowledgeUtilityDensityOk) pass("all four action packs match the dev.11 density plan");
else fail("action density does not match the dev.11 plan");

const athleticsActions = new Set(["grapple", "trip", "shove", "reposition", "disarm", "climb", "swim", "high-jump", "long-jump"]);
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
const socialFiltersOk = SOCIAL_ACTION_CARDS.every((card) => {
  const action = card.filters.actionSlugs?.[0];
  const expectedSkill = deceptionActions.has(action) ? "deception" : diplomacyActions.has(action) ? "diplomacy" : intimidationActions.has(action) ? "intimidation" : null;
  return expectedSkill
    && card.filters.skillTypes?.length === 1
    && card.filters.skillTypes[0] === expectedSkill
    && card.metadata.actionFamily === expectedSkill;
});
const stealthActions = new Set(["hide", "sneak", "conceal-an-object"]);
const thieveryActions = new Set(["pick-a-lock", "disable-a-device", "palm-an-object", "steal"]);
const subterfugeFiltersOk = SUBTERFUGE_ACTION_CARDS.every((card) => {
  const action = card.filters.actionSlugs?.[0];
  const expectedSkill = stealthActions.has(action) ? "stealth" : thieveryActions.has(action) ? "thievery" : null;
  if (!expectedSkill || card.filters.skillTypes?.length !== 1 || card.filters.skillTypes[0] !== expectedSkill || card.metadata.actionFamily !== expectedSkill) return false;
  return expectedSkill !== "stealth" || (card.tags.includes("secret-check") && card.tags.includes("gm-facing"));
});
const medicineActions = new Set(["treat-wounds", "administer-first-aid", "treat-disease", "treat-poison"]);
const craftingActions = new Set(["repair", "craft"]);
const knowledgeActions = new Set(["recall-knowledge", "identify-magic", "identify-alchemy", "decipher-writing"]);
const survivalActions = new Set(["track", "sense-direction", "subsist", "cover-tracks"]);
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
  && gatherCards.every((card) => card.tags.includes("secret-check"))
  && gatherFailures.length === 3
  && gatherFailures.every((card) => card.impact === "narrative" && card.tags.includes("gm-facing") && card.tags.includes("no-mechanical-effect"))) {
  pass("Gather Information secret-check boundary is explicit");
} else fail("Gather Information secret-check boundary is incomplete");

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

if (allCards.every((card) => card.metadata.preservesCoreOutcome === true && card.effect === null && card.metadata.resolution === "manual")) pass("all cards preserve PF2e core outcomes and use manual resolution");
else fail("a card violates the core-outcome or manual-resolution boundary");

if (SKILLFUL_PACK_CONFIGS.length === 4
  && SKILLFUL_PACK_CONFIGS[0].metadata.implementedCards === 52
  && SKILLFUL_PACK_CONFIGS[1].metadata.implementedCards === 44
  && SKILLFUL_PACK_CONFIGS[2].metadata.implementedCards === 34
  && SKILLFUL_PACK_CONFIGS[3].metadata.implementedCards === 56) pass("pack development metadata is consistent");
else fail("pack development metadata is inconsistent");

const built = buildSkillfulConsequencePacks();
if (built.length === 4 && built[0].enabled && built[1].enabled && built[2].enabled && built[3].enabled
  && built[0].decks?.skill?.cards.length === 52 && built[1].decks?.skill?.cards.length === 44 && built[2].decks?.skill?.cards.length === 34 && built[3].decks?.skill?.cards.length === 56) pass("pack topology and development defaults are correct");
else fail("pack topology or development defaults are incorrect");

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

if (process.exitCode) process.exit(process.exitCode);
console.log("Skillful Consequences release-specific checks passed.");
