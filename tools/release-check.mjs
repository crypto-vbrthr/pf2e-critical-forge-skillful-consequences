import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SKILLFUL_PACK_CONFIGS, buildSkillfulConsequencePacks } from "../scripts/data/packs.js";
import { PHYSICAL_ACTION_CARDS } from "../scripts/data/cards/physical-actions.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const allowDev = process.argv.includes("--allow-dev");
const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));
const fail = (message) => { console.error(`RELEASE CHECK FAILED: ${message}`); process.exitCode = 1; };
const pass = (message) => console.log(`✓ ${message}`);

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

if (PHYSICAL_ACTION_CARDS.length === 36) pass("development card inventory is 36");
else fail(`expected 36 development cards, found ${PHYSICAL_ACTION_CARDS.length}`);

if (new Set(PHYSICAL_ACTION_CARDS.map((card) => card.id)).size === 36 && new Set(PHYSICAL_ACTION_CARDS.map((card) => card.fallbackTitle)).size === 36) pass("all development card ids and fallback titles are unique");
else fail("duplicate card id or fallback title detected");

const frequentDensityOk = ["grapple", "trip"].every((action) => {
  const cards = PHYSICAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes(action));
  return cards.filter((card) => card.category === "skillCheckCriticalSuccess").length === 3
    && cards.filter((card) => card.category === "skillCheckCriticalFailure").length === 3;
});
const regularDensityOk = ["shove", "reposition", "disarm", "climb", "swim"].every((action) => {
  const cards = PHYSICAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes(action));
  return cards.filter((card) => card.category === "skillCheckCriticalSuccess").length === 2
    && cards.filter((card) => card.category === "skillCheckCriticalFailure").length === 2;
});
const narrowDensityOk = ["high-jump", "long-jump"].every((action) => {
  const cards = PHYSICAL_ACTION_CARDS.filter((card) => card.filters.actionSlugs.includes(action));
  return cards.filter((card) => card.category === "skillCheckCriticalSuccess").length === 1
    && cards.filter((card) => card.category === "skillCheckCriticalFailure").length === 1;
});
if (frequentDensityOk && regularDensityOk && narrowDensityOk) pass("Athletics action density matches the dev.3 plan");
else fail("action density does not match the dev.3 plan");

if (SKILLFUL_PACK_CONFIGS.length === 4 && SKILLFUL_PACK_CONFIGS[0].metadata.implementedCards === 36 && SKILLFUL_PACK_CONFIGS.slice(1).every((config) => config.metadata.implementedCards === 0)) pass("pack development metadata is consistent");
else fail("pack development metadata is inconsistent");

const built = buildSkillfulConsequencePacks();
if (built.length === 4 && built[0].enabled && built[0].decks?.skill && built.slice(1).every((pack) => !pack.enabled)) pass("pack topology and development defaults are correct");
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
