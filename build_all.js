/**
 * ═══════════════════════════════════════════════════════════════
 * 🎬 CINEMA PRO SUITE - UNIFIED DUAL-BUILD ENGINE
 * ═══════════════════════════════════════════════════════════════
 * Builds both:
 * 1. Option 1: Modular UserScripts under scripts/ (Tampermonkey / Violentmonkey)
 * 2. Option 2: Standalone Browser Extension under extension/ (Manifest V3)
 */

console.log("===============================================================");
console.log("🚀 STARTING UNIFIED DUAL-BUILD PIPELINE");
console.log("===============================================================\n");

// 1. Build Userscripts
require("./build_all_scripts.js");

// 2. Build Browser Extension
require("./build_extension.js");

console.log("===============================================================");
console.log("🎉 ALL BUILDS COMPLETED SUCCESSFULLY (USERSCRIPTS & EXTENSION)!");
console.log("===============================================================\n");
