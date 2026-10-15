/**
 * ═══════════════════════════════════════════════════════════════
 * 🎬 CINEMA PRO SUITE - BROWSER EXTENSION BUILDER (MANIFEST V3)
 * ═══════════════════════════════════════════════════════════════
 * Dual-Build Architecture: Compiles from src/ single source of truth
 * into a standalone, zero-dependency Manifest V3 browser extension.
 *
 * Output: extension/
 * ├── manifest.json
 * ├── background.js
 * ├── rules.json
 * ├── icons/ (icon16.png, icon48.png, icon128.png)
 * ├── popup/ (popup.html, popup.css, popup.js)
 * └── content/ (content.js, bridge.js, styles.css)
 */

const fs = require("fs");
const path = require("path");

const SITE_DEFINITIONS = require("./src/config/sites");
const COMMON_EMBED_MATCHES = require("./src/config/embeds");
const { generateUserscript } = require("./src/template");
const { generateAllIcons } = require("./src/build/generate_png_icons");

console.log("═══════════════════════════════════════════════════════════════");
console.log("🎬 COMPILING BROWSER EXTENSION (MANIFEST V3 -> extension/)");
console.log("═══════════════════════════════════════════════════════════════\n");

const EXT_DIR = path.join(__dirname, "extension");
const ICONS_DIR = path.join(EXT_DIR, "icons");
const CONTENT_DIR = path.join(EXT_DIR, "content");
const POPUP_DIR = path.join(EXT_DIR, "popup");

// 1. Ensure directories exist
[EXT_DIR, ICONS_DIR, CONTENT_DIR, POPUP_DIR].forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

// 2. Generate PNG Icons (16x16, 48x48, 128x128)
console.log("  🎨 Checking & Generating Extension Icons...");
generateAllIcons(ICONS_DIR);

// 3. Normalize match patterns strictly according to Chrome Extension MV3 Spec
function getCompactManifestMatches(patterns) {
  const result = new Set();
  const commonTlds = ["com", "net", "org", "cc", "me", "tv", "vip", "xyz", "site", "top", "live", "club", "vn", "to", "pro", "ws"];

  patterns.forEach(p => {
    let clean = (p || "").trim();
    if (!clean) return;

    // Normalize prefix e.g. live*.foo.com -> *.foo.com
    clean = clean.replace(/:\/\/[a-z0-9_-]+\*\./gi, "://*.");
    if (!clean.includes("://*.") && clean.includes("://")) {
      clean = clean.replace(/:\/\/([a-z0-9])/i, "://*.$1");
    }

    // Expand wildcard TLD e.g. *.domain.*/*
    if (clean.includes(".*/*")) {
      commonTlds.forEach(tld => {
        result.add(clean.replace(".*/*", "." + tld + "/*"));
      });
      return;
    }

    // Expand wildcard domain names e.g. nettruyen*.com
    if (/:\/\/\*\.[a-z0-9_-]+\*[a-z0-9_-]*\.[a-z]+/i.test(clean)) {
      const match = clean.match(/:\/\/\*\.([a-z0-9_-]+)\*([a-z0-9_-]*)\.([a-z]+)\/\*/i);
      if (match) {
        const [_, base, suffix, tld] = match;
        const variants = ["", "new", "tv", "viet", "full", "hot", "max", "one", "plus", "pro", "online", "zone", "top", "vip"];
        variants.forEach(v => {
          result.add("*://*." + base + v + suffix + "." + tld + "/*");
        });
        return;
      }
    }

    const chromeValidRegex = /^(\*|https?):\/\/(\*|\*\.[a-z0-9\-]+(\.[a-z0-9\-]+)+|[a-z0-9\-]+(\.[a-z0-9\-]+)+)\/.*$/i;
    if (chromeValidRegex.test(clean)) {
      result.add(clean);
    }
  });

  return Array.from(result).sort();
}

const allRawMatches = [...SITE_DEFINITIONS.flatMap(s => s.domains), ...COMMON_EMBED_MATCHES];
const manifestMatches = getCompactManifestMatches(allRawMatches);
console.log(`  ✓ Compiled ${manifestMatches.length} validated Chrome MV3 match patterns`);

// 4. Compile content/styles.css from src/css
const adblockCss = fs.readFileSync(path.join(__dirname, "src", "css", "adblock.css"), "utf8");
const theaterCss = fs.readFileSync(path.join(__dirname, "src", "css", "theater.css"), "utf8");
const hubCss = fs.readFileSync(path.join(__dirname, "src", "css", "hub.css"), "utf8");

const allCssBlocks = SITE_DEFINITIONS.map(s => s.siteCss).filter(Boolean);
const formattedSiteCss = allCssBlocks.map(cssBlock => {
  const trimmed = (cssBlock || "").trim();
  if (!trimmed) return "";
  return trimmed.includes("{")
    ? trimmed
    : `${trimmed} {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}`;
}).filter(Boolean).join("\n\n");

const fullCss = `${adblockCss}\n\n${formattedSiteCss}\n\n${theaterCss}\n\n${hubCss}`.trim();
fs.writeFileSync(path.join(CONTENT_DIR, "styles.css"), fullCss, "utf8");
console.log(`  ✓ Compiled content/styles.css (${(fullCss.length / 1024).toFixed(1)} KB)`);

// 5. Compile content/content.js from src/
const rawMasterScript = generateUserscript(SITE_DEFINITIONS[0], true, SITE_DEFINITIONS, "web-enhancer-all.user.js");
let coreJs = rawMasterScript.split("// ==/UserScript==\n\n")[1];

// Add extension popup command listener to MAIN world
const extensionCommandBridge = `
  // ─── EXTENSION POPUP COMMAND RECEIVER (MAIN WORLD) ───
  window.addEventListener("message", function (e) {
    if (!e.data || typeof e.data !== "object") return;
    if (e.data.type === "RO_CMD_TOGGLE_HDR") {
      if (typeof toggleHdr === "function") toggleHdr();
    } else if (e.data.type === "RO_CMD_TOGGLE_THEATER") {
      if (typeof toggleTheater === "function") toggleTheater();
    } else if (e.data.type === "RO_CMD_NUKE_ADS") {
      if (typeof nukeAdElements === "function") nukeAdElements(true);
    } else if (e.data.type === "RO_CMD_SKIP_INTRO") {
      if (typeof skipIntro === "function") skipIntro(e.data.seconds || 85);
    }
  });
`;

coreJs = coreJs.replace("})();\n", `${extensionCommandBridge}\n})();\n`);
fs.writeFileSync(path.join(CONTENT_DIR, "content.js"), coreJs, "utf8");
console.log(`  ✓ Compiled content/content.js (${(coreJs.length / 1024).toFixed(1)} KB)`);

// 6. Generate manifest.json (Manifest V3)
const manifest = {
  manifest_version: 3,
  name: "Web Enhancer Suite (Cinema Pro VIP)",
  version: "5.4.9",
  description: "Mở khóa VIP 2099 + Vô hạn Coin + Chặn 100% Ads & Cá cược + Tóm link M3U8 PotPlayer/VLC + Phím tắt Tua 5s/Skip Intro & Bộ lọc OLED HDR trên 53+ website phim, anime, bóng đá và truyện tranh Việt Nam!",
  homepage_url: "https://github.com/nghich-ngom-lung-tung/web-enhancer-suit",
  icons: {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  action: {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    },
    "default_title": "Cinema Pro Suite"
  },
  background: {
    service_worker: "background.js",
    type: "module"
  },
  permissions: [
    "storage",
    "declarativeNetRequest"
  ],
  host_permissions: [
    "<all_urls>"
  ],
  declarative_net_request: {
    rule_resources: [
      {
        id: "adblock_rules",
        enabled: true,
        path: "rules.json"
      }
    ]
  },
  web_accessible_resources: [
    {
      resources: [
        "icons/*",
        "popup/*",
        "content/*"
      ],
      matches: [
        "<all_urls>"
      ]
    }
  ],
  content_scripts: [
    {
      matches: manifestMatches,
      js: ["content/content.js"],
      css: ["content/styles.css"],
      run_at: "document_start",
      all_frames: true,
      world: "MAIN"
    },
    {
      matches: manifestMatches,
      js: ["content/bridge.js"],
      run_at: "document_start",
      all_frames: true
    }
  ]
};

fs.writeFileSync(path.join(EXT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
console.log(`  ✓ Generated extension/manifest.json (Manifest V3)`);

console.log(`\n===============================================================`);
console.log(`✅ Extension Build Complete: Standalone Manifest V3 Ready!`);
console.log(`   Location: ${EXT_DIR}`);
console.log(`===============================================================\n`);
