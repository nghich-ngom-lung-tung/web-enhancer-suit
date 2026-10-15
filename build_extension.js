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
const icons = require("./src/modules/icons");
const { getSnifferCode } = require("./src/modules/sniffer");
const adNukerCode = require("./src/modules/ad-nuker");
const playerControlsCode = require("./src/modules/player-controls");
const { getHubUiCode } = require("./src/modules/hub-ui");
const rophimVipCode = require("./src/modules/rophim-vip");

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
  const commonTlds = ["com", "net", "org", "cc", "me", "tv", "vip", "xyz", "site", "top", "live", "club", "vn", "to", "pro", "ws", "work", "cfd"];

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

// 5. Compile modular content scripts into extension/content/
console.log("  🧩 Compiling modular content scripts (Zero Bloat Architecture)...");

// 5.1 icons.js
const iconsJs = `/**
 * Cinema Pro Suite - Inline SVG Icons Dictionary (Zero Emojis)
 */
(() => {
  "use strict";
  window.RO_ICONS = ${JSON.stringify(icons, null, 2)};
})();
`;
fs.writeFileSync(path.join(CONTENT_DIR, "icons.js"), iconsJs, "utf8");
console.log(`  ✓ Compiled content/icons.js (${(iconsJs.length / 1024).toFixed(1)} KB)`);

// 5.2 vip-patcher.js
const vipPatcherJs = `/**
 * Cinema Pro Suite - VIP 2099 & Unlimited Coins Backend Patcher
 */
(() => {
  "use strict";
${rophimVipCode}

  // Export to window for modular extension architecture
  window.getRophimMockResponse = typeof getRophimMockResponse === "function" ? getRophimMockResponse : undefined;
  window.handleRophimFetchResponse = typeof handleRophimFetchResponse === "function" ? handleRophimFetchResponse : undefined;
  window.getRophimMockXhr = typeof getRophimMockXhr === "function" ? getRophimMockXhr : undefined;
  window.handleRophimXhrResponse = typeof handleRophimXhrResponse === "function" ? handleRophimXhrResponse : undefined;
})();
`;
fs.writeFileSync(path.join(CONTENT_DIR, "vip-patcher.js"), vipPatcherJs, "utf8");
console.log(`  ✓ Compiled content/vip-patcher.js (${(vipPatcherJs.length / 1024).toFixed(1)} KB)`);

// 5.3 sniffer.js
const snifferJs = `/**
 * Cinema Pro Suite - Stream Sniffer & Anti-Referer Hook
 */
(() => {
  "use strict";
${getSnifferCode(true)}

  // Export to window for modular extension architecture
  window.unwrapStreamUrl = typeof unwrapStreamUrl === "function" ? unwrapStreamUrl : undefined;
  window.ensureStreamUrl = typeof ensureStreamUrl === "function" ? ensureStreamUrl : undefined;
  window.isNoRefererCdn = typeof isNoRefererCdn === "function" ? isNoRefererCdn : undefined;
})();
`;
fs.writeFileSync(path.join(CONTENT_DIR, "sniffer.js"), snifferJs, "utf8");
console.log(`  ✓ Compiled content/sniffer.js (${(snifferJs.length / 1024).toFixed(1)} KB)`);

// 5.4 ad-nuker.js
const adNukerJs = `/**
 * Cinema Pro Suite - Ad & Popup Nuker Module
 */
(() => {
  "use strict";
${adNukerCode}

  // Export to window for modular extension architecture
  window.nukeAdElements = typeof nukeAdElements === "function" ? nukeAdElements : undefined;
})();
`;
fs.writeFileSync(path.join(CONTENT_DIR, "ad-nuker.js"), adNukerJs, "utf8");
console.log(`  ✓ Compiled content/ad-nuker.js (${(adNukerJs.length / 1024).toFixed(1)} KB)`);

// 5.5 hub-ui.js
const hubUiJs = `/**
 * Cinema Pro Suite - VIP Control Hub & Toast Notifications
 */
(() => {
  "use strict";
${getHubUiCode(icons, "Web Enhancer Suite", "5.4.9")}

  // Export to window for modular extension architecture
  window.showToast = typeof showToast === "function" ? showToast : undefined;
  window.initVipHub = typeof initVipHub === "function" ? initVipHub : undefined;
})();
`;
fs.writeFileSync(path.join(CONTENT_DIR, "hub-ui.js"), hubUiJs, "utf8");
console.log(`  ✓ Compiled content/hub-ui.js (${(hubUiJs.length / 1024).toFixed(1)} KB)`);

// 5.6 player-controls.js
const playerControlsJs = `/**
 * Cinema Pro Suite - Player Controls & Keyboard Shortcuts
 */
(() => {
  "use strict";
${playerControlsCode}

  // Export to window for modular extension architecture
  window.toggleHdr = typeof toggleHdr === "function" ? toggleHdr : undefined;
  window.toggleTheater = typeof toggleTheater === "function" ? toggleTheater : undefined;
  window.skipIntro = typeof skipIntro === "function" ? skipIntro : undefined;
})();
`;
fs.writeFileSync(path.join(CONTENT_DIR, "player-controls.js"), playerControlsJs, "utf8");
console.log(`  ✓ Compiled content/player-controls.js (${(playerControlsJs.length / 1024).toFixed(1)} KB)`);

// 5.7 content.js (Main Orchestrator Entrypoint)
const contentJs = `/**
 * Cinema Pro Suite - Extension Main Orchestrator (MAIN WORLD)
 * Modular Architecture v5.4.9
 */
(() => {
  "use strict";

  // 1. Initialize VIP Control Hub
  if (document.body) {
    if (typeof window.initVipHub === "function") window.initVipHub();
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      if (typeof window.initVipHub === "function") window.initVipHub();
    }, { once: true });
  }

  // 2. Hook Stream Sniffer on DOM ready & full load
  if (typeof window.ensureStreamUrl === "function") {
    window.addEventListener("DOMContentLoaded", window.ensureStreamUrl);
    window.addEventListener("load", window.ensureStreamUrl);
  }

  // 3. Extension Popup Command Listener (via bridge.js)
  window.addEventListener("message", function (e) {
    if (!e.data || typeof e.data !== "object") return;
    if (e.data.type === "RO_CMD_TOGGLE_HDR") {
      if (typeof window.toggleHdr === "function") window.toggleHdr();
    } else if (e.data.type === "RO_CMD_TOGGLE_THEATER") {
      if (typeof window.toggleTheater === "function") window.toggleTheater();
    } else if (e.data.type === "RO_CMD_NUKE_ADS") {
      if (typeof window.nukeAdElements === "function") window.nukeAdElements(true);
    } else if (e.data.type === "RO_CMD_SKIP_INTRO") {
      if (typeof window.skipIntro === "function") window.skipIntro(e.data.seconds || 85);
    }
  });

  console.log("%c[Cinema Pro] Web Enhancer Suite Ready (Modular Manifest V3)!", "font-size: 13px; font-weight: bold; color: #ffb627;");
})();
`;
fs.writeFileSync(path.join(CONTENT_DIR, "content.js"), contentJs, "utf8");
console.log(`  ✓ Compiled content/content.js (${(contentJs.length / 1024).toFixed(1)} KB)`);

// 6. Generate manifest.json (Manifest V3)
const manifest = {
  manifest_version: 3,
  name: "Web Enhancer Suite (Cinema Pro VIP)",
  version: "5.4.9",
  description: "Tối ưu trải nghiệm xem phim, anime & truyện tranh: Chặn quảng cáo, lọc màu OLED HDR, phím tắt điều khiển và phát qua PotPlayer/VLC.",
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
      js: [
        "content/icons.js",
        "content/vip-patcher.js",
        "content/sniffer.js",
        "content/ad-nuker.js",
        "content/hub-ui.js",
        "content/player-controls.js",
        "content/content.js"
      ],
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
