/**
 * ═══════════════════════════════════════════════════════════════
 * 🎬 CINEMA PRO SUITE - UNIVERSAL MODULAR BUILDER v5.3
 * ═══════════════════════════════════════════════════════════════
 * Modular compilation pipeline assembling src/ components:
 * - src/sites/ (movies, anime, tv, embeds)
 * - src/css/ (adblock, hub, theater, embed-guard)
 * - src/modules/ (icons, sniffer, player-controls, ad-nuker, hub-ui, rophim-vip)
 *
 * Generates:
 * 1. Categorized UserScripts under scripts/ (anime/, movies/, tv/, embeds/)
 * 2. Master Suite (scripts/cinema-pro-all.user.js) & core.js (scripts/core.js)
 */

const fs = require("fs");
const path = require("path");

const SITE_DEFINITIONS = require("./src/config/sites");
const { generateUserscript } = require("./src/template");

console.log("═══════════════════════════════════════════════════════════════");
console.log("🎬 COMPILING CINEMA PRO SUITE (MODULAR PIPELINE -> scripts/)");
console.log("═══════════════════════════════════════════════════════════════\n");

// Ensure categorized output folders under scripts/
const categories = ["movies", "anime", "tv", "embeds", "sports", "comics"];
categories.forEach(cat => {
  fs.mkdirSync(path.join(__dirname, "scripts", cat), { recursive: true });
});

let individualBuilt = 0;

// 1. Compile all individual site scripts directly into scripts/<category>/
SITE_DEFINITIONS.forEach(site => {
  const code = generateUserscript(site, false, SITE_DEFINITIONS);
  const cat = site.category || "movies";
  fs.writeFileSync(path.join(__dirname, "scripts", cat, site.file), code, "utf8");

  individualBuilt++;
  console.log(`  ✓ Built [${cat.toUpperCase()}]: scripts/${cat}/${site.file}`);

  if (site.id === "rophim") {
    // Legacy alias tampermonkey.user.js
    const aliasCode = code.replace(/rophim\.user\.js/g, "tampermonkey.user.js");
    fs.writeFileSync(path.join(__dirname, "scripts", "movies", "tampermonkey.user.js"), aliasCode, "utf8");
    console.log(`  ✓ Built alias: scripts/movies/tampermonkey.user.js`);
  }
});

// 2. Compile Master All-In-One script
const masterCode = generateUserscript(SITE_DEFINITIONS[0], true, SITE_DEFINITIONS);
fs.writeFileSync(path.join(__dirname, "scripts", "cinema-pro-all.user.js"), masterCode, "utf8");
console.log(`\n  ⭐ Built Master Suite: scripts/cinema-pro-all.user.js`);

// 3. Compile core.js (pure JS without userscript metadata for direct embedding/console)
const coreJsCode = masterCode.split("// ==/UserScript==\n\n")[1];
fs.writeFileSync(path.join(__dirname, "scripts", "core.js"), coreJsCode, "utf8");
console.log(`  ⭐ Built Core: scripts/core.js`);

console.log(`\n===============================================================`);
console.log(`✅ Build Complete: ${individualBuilt} sites + Master Suite + core.js`);
console.log(`   Strictly organized under scripts/ folder!`);
console.log(`===============================================================\n`);
