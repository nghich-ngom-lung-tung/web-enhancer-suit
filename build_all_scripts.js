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
 * 1. Root UserScripts (.user.js) for seamless Tampermonkey updates & audit harness
 * 2. Categorized UserScripts under scripts/ (anime/, movies/, tv/, embeds/)
 * 3. Master Suite (cinema-pro-all.user.js) & core.js
 */

const fs = require("fs");
const path = require("path");

const SITE_DEFINITIONS = require("./src/config/sites");
const { generateUserscript } = require("./src/template");

console.log("═══════════════════════════════════════════════════════════════");
console.log("🎬 COMPILING CINEMA PRO SUITE (MODULAR PIPELINE)");
console.log("═══════════════════════════════════════════════════════════════\n");

// Ensure categorized output folders under scripts/
const categories = ["movies", "anime", "tv", "embeds"];
categories.forEach(cat => {
  fs.mkdirSync(path.join(__dirname, "scripts", cat), { recursive: true });
});

let individualBuilt = 0;

// 1. Compile all individual site scripts
SITE_DEFINITIONS.forEach(site => {
  const code = generateUserscript(site, false, SITE_DEFINITIONS);
  
  // Write to root (preserves Tampermonkey downloadURL/updateURL & test harness)
  fs.writeFileSync(path.join(__dirname, site.file), code, "utf8");
  
  // Write to categorized scripts folder
  const cat = site.category || "movies";
  fs.writeFileSync(path.join(__dirname, "scripts", cat, site.file), code, "utf8");

  individualBuilt++;
  console.log(`  ✓ Built [${cat.toUpperCase()}]: ${site.file}`);

  if (site.id === "rophim") {
    // Legacy alias tampermonkey.user.js
    fs.writeFileSync(path.join(__dirname, "tampermonkey.user.js"), code, "utf8");
    fs.writeFileSync(path.join(__dirname, "scripts", "movies", "tampermonkey.user.js"), code, "utf8");
    console.log(`  ✓ Built alias: tampermonkey.user.js`);
  }
});

// 2. Compile Master All-In-One script
const masterCode = generateUserscript(SITE_DEFINITIONS[0], true, SITE_DEFINITIONS);
fs.writeFileSync(path.join(__dirname, "cinema-pro-all.user.js"), masterCode, "utf8");
fs.writeFileSync(path.join(__dirname, "scripts", "cinema-pro-all.user.js"), masterCode, "utf8");
console.log(`\n  ⭐ Built Master Suite: cinema-pro-all.user.js`);

// 3. Compile core.js (pure JS without userscript metadata for direct embedding/console)
const coreJsCode = masterCode.split("// ==/UserScript==\n\n")[1];
fs.writeFileSync(path.join(__dirname, "core.js"), coreJsCode, "utf8");
console.log(`  ⭐ Built Core: core.js`);

console.log(`\n===============================================================`);
console.log(`✅ Build Complete: ${individualBuilt} sites + Master Suite + core.js`);
console.log(`   Grouped into: scripts/movies, scripts/anime, scripts/tv, scripts/embeds`);
console.log(`===============================================================\n`);
