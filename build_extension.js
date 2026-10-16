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
 * └── content/
 *     ├── core/ (icons.js, bridge.js, content.js)
 *     ├── features/ (ad-nuker.js, sniffer.js, player-controls.js, hub-ui.js)
 *     ├── vip/ (vip-engine.js, cinema.js, anime.js, sports.js, comics.js, auth.js)
 *     └── styles.css
 */

const fs = require("fs");
const path = require("path");
const pkg = require("./package.json");

const SITE_DEFINITIONS = require("./src/config/sites");
const COMMON_EMBED_MATCHES = require("./src/config/embeds");
const { generateAllIcons } = require("./src/build/generate_png_icons");
const icons = require("./src/modules/icons");
const { getSnifferCode } = require("./src/modules/sniffer");
const adNukerCode = require("./src/modules/ad-nuker");
const playerControlsCode = require("./src/modules/player-controls");
const { getHubUiCode } = require("./src/modules/hub-ui");

// Import modular VIP handlers from src/modules/vip/
const film4kCode = require("./src/modules/vip/film4k");
const motchillCode = require("./src/modules/vip/motchill");
const sportsCode = require("./src/modules/vip/sports");
const comicsCode = require("./src/modules/vip/comics");
const firebaseCode = require("./src/modules/vip/firebase");
const rophimCode = require("./src/modules/vip/rophim");
const chophimCode = require("./src/modules/vip/chophim");
const mephimCode = require("./src/modules/vip/mephim");

console.log("═══════════════════════════════════════════════════════════════");
console.log("🎬 COMPILING BROWSER EXTENSION (MANIFEST V3 -> extension/)");
console.log("═══════════════════════════════════════════════════════════════\n");

const EXT_DIR = path.join(__dirname, "extension");
const ICONS_DIR = path.join(EXT_DIR, "icons");
const CONTENT_DIR = path.join(EXT_DIR, "content");
const CORE_DIR = path.join(CONTENT_DIR, "core");
const FEATURES_DIR = path.join(CONTENT_DIR, "features");
const VIP_DIR = path.join(CONTENT_DIR, "vip");
const POPUP_DIR = path.join(EXT_DIR, "popup");

// 1. Ensure all directories exist
[EXT_DIR, ICONS_DIR, CONTENT_DIR, CORE_DIR, FEATURES_DIR, VIP_DIR, POPUP_DIR].forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

// 2. Generate PNG Icons (16x16, 48x48, 128x128)
console.log("  🎨 Checking & Generating Extension Icons...");
generateAllIcons(ICONS_DIR);

// 3. Normalize match patterns strictly according to Chrome Extension MV3 Spec
function getCompactManifestMatches(patterns) {
  const result = new Set();
  const commonTlds = ["com", "net", "org", "cc", "me", "tv", "vip", "xyz", "site", "top", "live", "club", "vn", "to", "pro", "ws", "work", "cfd"];
  const chromeValidRegex = /^(\*|https?):\/\/(\*|\*\.[a-z0-9\-]+(\.[a-z0-9\-]+)+|[a-z0-9\-]+(\.[a-z0-9\-]+)+)\/.*$/i;

  const addPattern = (p) => {
    if (!p) return;
    const clean = p.trim();
    if (!chromeValidRegex.test(clean)) return;
    result.add(clean);

    // Chrome MV3 requires BOTH root domain AND subdomain wildcard to match both:
    if (clean.includes("://*.")) {
      const rootP = clean.replace("://*.", "://");
      if (chromeValidRegex.test(rootP)) result.add(rootP);
    } else if (clean.includes("://") && !clean.includes("://*")) {
      const subP = clean.replace("://", "://*.");
      if (chromeValidRegex.test(subP)) result.add(subP);
    }
  };

  patterns.forEach(p => {
    let clean = (p || "").trim();
    if (!clean) return;

    // Normalize prefix e.g. live*.foo.com -> *.foo.com
    clean = clean.replace(/:\/\/[a-z0-9_-]+\*\./gi, "://*.");

    // Expand wildcard TLD e.g. *.domain.*/*
    if (clean.includes(".*/*")) {
      commonTlds.forEach(tld => {
        addPattern(clean.replace(".*/*", "." + tld + "/*"));
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
          addPattern("*://*." + base + v + suffix + "." + tld + "/*");
        });
        return;
      }
    }

    addPattern(clean);
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
console.log("  🧩 Compiling modular content scripts (Industry-Standard Architecture)...");

// 5.1 core/icons.js
const iconsJs = `/**
 * Cinema Pro Suite - Inline SVG Icons Dictionary (Zero Emojis)
 */
(() => {
  "use strict";
  window.RO_ICONS = ${JSON.stringify(icons, null, 2)};
})();
`;
fs.writeFileSync(path.join(CORE_DIR, "icons.js"), iconsJs, "utf8");
console.log(`  ✓ Compiled content/core/icons.js (${(iconsJs.length / 1024).toFixed(1)} KB)`);

// 5.2 core/bridge.js
const bridgeJs = `/**
 * Cinema Pro Suite - Content Bridge Script (Isolated World)
 * Bridges MAIN world with Extension Runtime & Background Service Worker
 */
(function () {
  "use strict";

  // Listen for messages emitted from MAIN world
  window.addEventListener("message", (event) => {
    if (event.source !== window || !event.data || typeof event.data !== "object") return;

    if (event.data.type === "CINEMA_PRO_STREAM_FOUND" || event.data.type === "RO_STREAM_FOUND") {
      const streamUrl = event.data.url || event.data.streamUrl;
      if (streamUrl) {
        try {
          chrome.runtime.sendMessage({
            action: "STREAM_DETECTED",
            url: streamUrl,
            title: event.data.title || document.title
          });
        } catch (e) {}
      }
    }
  });

  // Listen for commands dispatched from Popup or Background
  chrome.runtime.onMessage.addListener((cmd, sender, sendResponse) => {
    try {
      window.postMessage(cmd, "*");
      sendResponse({ status: "forwarded_to_main_world" });
    } catch (e) {
      sendResponse({ status: "error", error: e.message });
    }
    return false;
  });
})();
`;
fs.writeFileSync(path.join(CORE_DIR, "bridge.js"), bridgeJs, "utf8");
console.log(`  ✓ Compiled content/core/bridge.js (${(bridgeJs.length / 1024).toFixed(1)} KB)`);

// 5.3 features/ad-nuker.js
const adNukerJs = `/**
 * Cinema Pro Suite - Ad & Popup Nuker Feature
 */
(() => {
  "use strict";
${adNukerCode}

  // Export to window for modular extension architecture
  window.isAdApi = typeof isAdApi === "function" ? isAdApi : undefined;
  window.nukeAdElements = typeof nukeAdElements === "function" ? nukeAdElements : undefined;
})();
`;
fs.writeFileSync(path.join(FEATURES_DIR, "ad-nuker.js"), adNukerJs, "utf8");
console.log(`  ✓ Compiled content/features/ad-nuker.js (${(adNukerJs.length / 1024).toFixed(1)} KB)`);

// 5.4 features/sniffer.js
const snifferJs = `/**
 * Cinema Pro Suite - Stream Sniffer & Anti-Referer Hook Feature
 */
(() => {
  "use strict";
${getSnifferCode(true)}

  // Export to window for modular extension architecture
  window.unwrapStreamUrl = typeof unwrapStreamUrl === "function" ? unwrapStreamUrl : undefined;
  window.ensureStreamUrl = typeof ensureStreamUrl === "function" ? ensureStreamUrl : undefined;
  window.isNoRefererCdn = typeof isNoRefererCdn === "function" ? isNoRefererCdn : undefined;
  window.capturedStreamUrl = typeof capturedStreamUrl !== "undefined" ? capturedStreamUrl : "";
  window.getCapturedStreamUrl = typeof getCapturedStreamUrl === "function" ? getCapturedStreamUrl : () => window.capturedStreamUrl || "";
})();
`;
fs.writeFileSync(path.join(FEATURES_DIR, "sniffer.js"), snifferJs, "utf8");
console.log(`  ✓ Compiled content/features/sniffer.js (${(snifferJs.length / 1024).toFixed(1)} KB)`);

// 5.5 features/player-controls.js
const playerControlsJs = `/**
 * Cinema Pro Suite - Player Controls & Keyboard Shortcuts Feature
 */
(() => {
  "use strict";
${playerControlsCode}

  // Export to window for modular extension architecture
  window.sendCommandToPlayer = typeof sendCommandToPlayer === "function" ? sendCommandToPlayer : undefined;
  window.copyM3u8 = typeof copyM3u8 === "function" ? copyM3u8 : undefined;
  window.openPotPlayer = typeof openPotPlayer === "function" ? openPotPlayer : undefined;
  window.openVlcPlayer = typeof openVlcPlayer === "function" ? openVlcPlayer : undefined;
  window.downloadM3uFile = typeof downloadM3uFile === "function" ? downloadM3uFile : undefined;
  window.skipIntro = typeof skipIntro === "function" ? skipIntro : undefined;
  window.toggleFullscreen = typeof toggleFullscreen === "function" ? toggleFullscreen : undefined;
  window.toggleHdr = typeof toggleHdr === "function" ? toggleHdr : undefined;
  window.toggleTheater = typeof toggleTheater === "function" ? toggleTheater : undefined;
  window.adjustVolume = typeof adjustVolume === "function" ? adjustVolume : undefined;
  window.adjustSpeed = typeof adjustSpeed === "function" ? adjustSpeed : undefined;
  window.isComicPage = typeof isComicPage === "function" ? isComicPage : undefined;
  window.navigateComicChapter = typeof navigateComicChapter === "function" ? navigateComicChapter : undefined;
})();
`;
fs.writeFileSync(path.join(FEATURES_DIR, "player-controls.js"), playerControlsJs, "utf8");
console.log(`  ✓ Compiled content/features/player-controls.js (${(playerControlsJs.length / 1024).toFixed(1)} KB)`);

// 5.6 features/hub-ui.js
const hubUiJs = `/**
 * Cinema Pro Suite - VIP Control Hub & Toast Notifications Feature
 */
(() => {
  "use strict";
${getHubUiCode(icons, "Web Enhancer Suite", pkg.version)}

  // Export to window for modular extension architecture
  window.showToast = typeof showToast === "function" ? showToast : undefined;
  window.initVipHub = typeof initVipHub === "function" ? initVipHub : undefined;
})();
`;
fs.writeFileSync(path.join(FEATURES_DIR, "hub-ui.js"), hubUiJs, "utf8");
console.log(`  ✓ Compiled content/features/hub-ui.js (${(hubUiJs.length / 1024).toFixed(1)} KB)`);

// 5.7 vip/vip-engine.js (Core Network Interceptor Router & DOM Mutation Guard)
const vipEngineJs = `/**
 * Cinema Pro Suite - VIP Core Engine (Unified Network Interceptor)
 * Modular Architecture v${pkg.version}
 */
(() => {
  "use strict";

  // 1. React DOM mutation guard (absorb NotFoundError on hydration / unmount)
  try {
    if (typeof Node !== "undefined" && Node.prototype && !Node.prototype._cpro_guarded) {
      Node.prototype._cpro_guarded = true;
      const origRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function (child) {
        try {
          return origRemoveChild.call(this, child);
        } catch (err) {
          if (err && (err.name === "NotFoundError" || (err.message && err.message.includes("not a child")))) {
            try {
              if (child && child.parentNode && typeof child.parentNode.removeChild === "function") {
                return child.parentNode.removeChild(child);
              }
            } catch (e) {}
            return child;
          }
          throw err;
        }
      };

      const origInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function (newNode, refNode) {
        try {
          return origInsertBefore.call(this, newNode, refNode);
        } catch (err) {
          if (err && (err.name === "NotFoundError" || (err.message && err.message.includes("not a child")))) {
            return this.appendChild(newNode);
          }
          throw err;
        }
      };
    }
  } catch (e) {}

  // 2. Global VIP Constants
  const VIP_EXPIRY_DATE = new Date(2099, 6, 18, 0, 0, 0);
  const VIP_EXPIRY_TIMESTAMP = Math.floor(VIP_EXPIRY_DATE.getTime() / 1000);
  const COIN_BALANCE = 999999999;

  // 3. Global VIP Registry
  const registry = {
    VIP_EXPIRY_DATE,
    VIP_EXPIRY_TIMESTAMP,
    COIN_BALANCE,
    mockHandlers: [],
    responsePatchers: [],
    registerMock(fn) {
      if (typeof fn === "function") this.mockHandlers.push(fn);
    },
    registerPatcher(fn) {
      if (typeof fn === "function") this.responsePatchers.push(fn);
    },
    getMockResponse(url, init) {
      if (!url || typeof url !== "string") return null;
      if (init && init.headers) {
        const h = init.headers;
        const isInternal = (typeof h.get === "function" ? (h.get("X-Cinema-Pro-Internal") || h.get("x-cinema-pro-internal")) : (h["X-Cinema-Pro-Internal"] || h["x-cinema-pro-internal"]));
        if (isInternal) return null;
      }
      for (const h of this.mockHandlers) {
        try {
          const res = h(url, init);
          if (res !== null && res !== undefined) return res;
        } catch (e) {}
      }
      return null;
    },
    patchData(data, url) {
      if (!data || typeof data !== "object") return data;
      let cur = data;
      for (const p of this.responsePatchers) {
        try {
          cur = p(cur, url);
        } catch (e) {}
      }
      return cur;
    }
  };

  window.VIP_REGISTRY = registry;

  // 4. Fetch & XHR Proxy Interception
  function interceptFetch(url, init) {
    const mock = registry.getMockResponse(url, init);
    if (mock !== null) {
      if (typeof mock === "string") {
        return new Response(mock, {
          status: 200,
          headers: { "Content-Type": "application/json; charset=utf-8" }
        });
      }
      if (mock instanceof Response) return mock;
    }
    return null;
  }

  // Hook window.fetch
  if (typeof window !== "undefined" && window.fetch && !window.fetch._cpro_vip_hooked) {
    const rawFetch = window.fetch;
    const fetchProxy = function (input, init) {
      let url = "";
      if (typeof input === "string") url = input;
      else if (input && typeof input.url === "string") url = input.url;

      const mockRes = interceptFetch(url, init);
      if (mockRes) return Promise.resolve(mockRes);

      return rawFetch.apply(this, arguments).then(async (response) => {
        try {
          const ctype = response.headers ? response.headers.get("content-type") : "";
          if (ctype && ctype.includes("application/json")) {
            const clone = response.clone();
            const text = await clone.text();
            if (text && text.trim().length > 0) {
              const data = JSON.parse(text);
              if (typeof window.extractStreamFromObject === "function") window.extractStreamFromObject(data);
              const patched = registry.patchData(data, url);
              if (patched !== data) {
                return new Response(JSON.stringify(patched), {
                  status: response.status,
                  statusText: response.statusText,
                  headers: response.headers
                });
              }
            }
          }
        } catch (e) {}
        return response;
      });
    };
    fetchProxy._cpro_vip_hooked = true;
    window.fetch = fetchProxy;
  }

  // Hook XMLHttpRequest
  if (typeof window !== "undefined" && window.XMLHttpRequest && !window.XMLHttpRequest.prototype._cpro_vip_hooked) {
    const origOpen = window.XMLHttpRequest.prototype.open;
    const origSend = window.XMLHttpRequest.prototype.send;

    window.XMLHttpRequest.prototype.open = function (method, url) {
      this._cpro_url = url;
      this._cpro_method = method;
      return origOpen.apply(this, arguments);
    };

    window.XMLHttpRequest.prototype.send = function (body) {
      const url = this._cpro_url;
      const mockStr = registry.getMockResponse(url, { method: this._cpro_method, body });
      if (mockStr !== null) {
        let textPayload = typeof mockStr === "string" ? mockStr : "";
        let parsedObj = null;
        if (typeof mockStr === "string") {
          try { parsedObj = JSON.parse(mockStr); } catch (e) {}
        } else {
          parsedObj = mockStr;
          try { textPayload = JSON.stringify(mockStr); } catch (e) {}
        }
        Object.defineProperty(this, "readyState", { writable: true, value: 4 });
        Object.defineProperty(this, "status", { writable: true, value: 200 });
        Object.defineProperty(this, "statusText", { writable: true, value: "OK" });
        Object.defineProperty(this, "responseText", { writable: true, value: textPayload });
        Object.defineProperty(this, "response", {
          get: function () {
            if (this.responseType === "json") return parsedObj;
            if (this.responseType === "text") return textPayload;
            return parsedObj !== null ? parsedObj : textPayload;
          },
          configurable: true
        });
        this.getAllResponseHeaders = function () {
          return "content-type: application/json; charset=utf-8";
        };
        this.getResponseHeader = function (h) {
          if (h && h.toLowerCase() === "content-type") return "application/json; charset=utf-8";
          return null;
        };
        setTimeout(() => {
          if (typeof this.onreadystatechange === "function") this.onreadystatechange();
          if (typeof this.onload === "function") this.onload();
        }, 1);
        return;
      }

      this.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status === 200) {
          try {
            const text = this.responseText;
            if (text && (text.startsWith("{") || text.startsWith("["))) {
              const data = JSON.parse(text);
              if (typeof window.extractStreamFromObject === "function") window.extractStreamFromObject(data);
              const patched = registry.patchData(data, this._cpro_url);
              if (patched !== data) {
                const newText = JSON.stringify(patched);
                Object.defineProperty(this, "responseText", { writable: true, value: newText });
                Object.defineProperty(this, "response", {
                  get: function () {
                    if (this.responseType === "json") return patched;
                    if (this.responseType === "text") return newText;
                    return patched || newText;
                  },
                  configurable: true
                });
              }
            }
          } catch (e) {}
        }
      });

      return origSend.apply(this, arguments);
    };

    window.XMLHttpRequest.prototype._cpro_vip_hooked = true;
  }

  // Backward compatibility exports on window
  window.getRophimMockResponse = (url, init) => {
    const mock = registry.getMockResponse(url, init);
    if (!mock) return null;
    if (typeof mock === "string") {
      return new Response(mock, {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }
    if (mock instanceof Response) return mock;
    return new Response(JSON.stringify(mock), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  };
  window.getRophimMockXhr = (url, body) => {
    const mock = registry.getMockResponse(url, { body });
    if (!mock) return null;
    return typeof mock === "string" ? mock : JSON.stringify(mock);
  };
  window.handleRophimFetchResponse = async (resPromise, url, init) => {
    const mock = window.getRophimMockResponse(url, init);
    if (mock) return mock;
    return await resPromise;
  };
  window.handleRophimXhrResponse = () => {};
})();
`;
fs.writeFileSync(path.join(VIP_DIR, "vip-engine.js"), vipEngineJs, "utf8");
console.log(`  ✓ Compiled content/vip/vip-engine.js (${(vipEngineJs.length / 1024).toFixed(1)} KB)`);

// 5.8 vip/cinema.js (RoPhim, CoBePhim, MovieHDThai, ChoPhim, MotChill, Film4k, MePhim)
const cinemaJs = `/**
 * Cinema Pro Suite - Cinema & Movies VIP Module
 * Covers: RoPhim, CoBePhim, MovieHDThai, ChoPhim, MotChill, Film4k, MePhim
 */
(() => {
  "use strict";
  const VIP = window.VIP_REGISTRY || { registerMock: () => {}, registerPatcher: () => {} };
  const VIP_EXPIRY_DATE = VIP.VIP_EXPIRY_DATE || new Date(2099, 6, 18, 0, 0, 0);
  const VIP_EXPIRY_TIMESTAMP = VIP.VIP_EXPIRY_TIMESTAMP || Math.floor(VIP_EXPIRY_DATE.getTime() / 1000);
  const COIN_BALANCE = VIP.COIN_BALANCE || 999999999;

${film4kCode}

${motchillCode}

${rophimCode}

${chophimCode}

${mephimCode}

  function patchRophimData(data, url) {
    if (!data || typeof data !== "object") return data;
    if (url && (url.includes("/watch/") || url.includes("/title/") || url.includes("/api/watch") || url.includes("/api/title"))) {
      if (data && typeof data === "object") {
        data.signedIn = true;
        if (data.user === null || !data.user) {
          data.user = typeof getFilm4kVipUser === "function" ? getFilm4kVipUser() : (typeof getMotchillVipUser === "function" ? getMotchillVipUser() : null);
        }
      }
      return data;
    }
    if (url && (url.includes("/ads") || url.includes("/banner") || url.includes("/advertising") || url.includes("sspp"))) {
      if (Array.isArray(data)) return [];
      if (data && typeof data === "object") {
        if (Array.isArray(data.data)) data.data = [];
        if (Array.isArray(data.items)) data.items = [];
        if (Array.isArray(data.banners)) data.banners = [];
        if (Array.isArray(data.result)) data.result = [];
      }
      return data;
    }
    if (typeof getLocalComments === "function" && url && url.includes("/comments/movie/") && !url.includes("/reactions")) {
      const mMatch = url.match(new RegExp("/comments/movie/([0-9]+)"));
      const movieId = mMatch ? mMatch[1] : 0;
      const localComments = getLocalComments(movieId);
      if (localComments.length > 0) {
        let serverList = [];
        if (data && Array.isArray(data.data)) serverList = data.data;
        else if (Array.isArray(data)) serverList = data;
        else if (data && data.items && Array.isArray(data.items)) serverList = data.items;

        const filteredLocal = localComments.filter(lc => !serverList.some(sd => String(sd.id) === String(lc.id) || (sd.content && lc.content && String(sd.content).trim() === String(lc.content).trim())));
        const merged = [...filteredLocal, ...serverList];
        if (data && typeof data === "object") {
          data.data = merged;
          if (data.meta) {
            data.meta.total = (data.meta.total || 0) + filteredLocal.length;
          }
        }
      }
      return data;
    }
    if (url && (url.includes("/bookmarks") || url.includes("bookmarks"))) {
      const bookmarkData = {
        movieIds: (data && Array.isArray(data.movieIds)) ? data.movieIds : ((data && data.data && Array.isArray(data.data.movieIds)) ? data.data.movieIds : []),
        actorIds: (data && Array.isArray(data.actorIds)) ? data.actorIds : ((data && data.data && Array.isArray(data.data.actorIds)) ? data.data.actorIds : []),
        items: (data && Array.isArray(data.items)) ? data.items : ((data && data.data && Array.isArray(data.data.items)) ? data.data.items : [])
      };
      if (data && typeof data === "object") {
        data.data = bookmarkData;
        data.status = true;
        data.code = 200;
      }
      return data;
    }
    if (url && (url.includes("/notification") || url.includes("notification"))) {
      if (data && typeof data === "object") {
        if (!Array.isArray(data.notificationsMovie)) data.notificationsMovie = [];
        if (!Array.isArray(data.notificationsOther)) data.notificationsOther = [];
        if (typeof data.unreadCountMovie !== "number") data.unreadCountMovie = 0;
        if (typeof data.unreadCountOther !== "number") data.unreadCountOther = 0;
        if (data.data && typeof data.data === "object") {
          if (!Array.isArray(data.data.notificationsMovie)) data.data.notificationsMovie = [];
          if (!Array.isArray(data.data.notificationsOther)) data.data.notificationsOther = [];
          if (typeof data.data.unreadCountMovie !== "number") data.data.unreadCountMovie = 0;
          if (typeof data.data.unreadCountOther !== "number") data.data.unreadCountOther = 0;
        }
      }
      return data;
    }
    if (url && (url.includes("checkWatchlist") || url.includes("ckWatchlist") || (url.includes("watchlist") && !url.includes("addWatchlist")))) {
      if (data && typeof data === "object") {
        const defaultWatchlist = [
          { id: 1, name: "Xem sau", check: false },
          { id: 2, name: "Phim yêu thích", check: false }
        ];
        if (!Array.isArray(data.data)) {
          data.data = defaultWatchlist;
        }
        if (!Array.isArray(data.items)) {
          data.items = defaultWatchlist;
        }
        data.status = true;
        data.code = 200;
      }
      return data;
    }
    const recurse = obj => {
      if (!obj || typeof obj !== "object") return;
      if ("is_vip" in obj || "vip_expires_at" in obj || "coin_balance" in obj || "thungBalance" in obj) {
        obj.is_vip = true;
        obj.is_premium = true;
        obj.vip_expires_at = VIP_EXPIRY_TIMESTAMP;
        obj.coin_balance = COIN_BALANCE;
        obj.thungBalance = COIN_BALANCE;
        if (!obj.roles || !Array.isArray(obj.roles) || obj.roles.length === 0) {
          obj.roles = [
            { id: 1, name: "admin" },
            { id: 2, name: "vip" },
            { id: 3, name: "premium" }
          ];
        }
        if (!obj.permissions) obj.permissions = ["admin", "vip", "premium", "superadmin"];
      }
      if (obj.result) recurse(obj.result);
      if (obj.user) recurse(obj.user);
      if (obj.data) recurse(obj.data);
    };
    recurse(data);
    return data;
  }

  // Register Cinema Mocks
  if (VIP.registerMock) {
    if (typeof handleFilm4kMock === "function") VIP.registerMock(handleFilm4kMock);
    if (typeof handleMotchillMock === "function") VIP.registerMock(handleMotchillMock);
    if (typeof handleRophimMock === "function") VIP.registerMock(handleRophimMock);
    if (typeof handleChophimMock === "function") VIP.registerMock(handleChophimMock);
    if (typeof handleMephimMock === "function") VIP.registerMock(handleMephimMock);
  }

  // Register Cinema Patchers
  if (VIP.registerPatcher) {
    VIP.registerPatcher(patchRophimData);
  }

  // Export to window for testing / audit compatibility
  window.handleRophimMock = typeof handleRophimMock === "function" ? handleRophimMock : undefined;
  window.handleChophimMock = typeof handleChophimMock === "function" ? handleChophimMock : undefined;
  window.handleMotchillMock = typeof handleMotchillMock === "function" ? handleMotchillMock : undefined;
  window.handleFilm4kMock = typeof handleFilm4kMock === "function" ? handleFilm4kMock : undefined;
  window.handleMephimMock = typeof handleMephimMock === "function" ? handleMephimMock : undefined;
  window.patchRophimData = patchRophimData;
})();
`;
fs.writeFileSync(path.join(VIP_DIR, "cinema.js"), cinemaJs, "utf8");
console.log(`  ✓ Compiled content/vip/cinema.js (${(cinemaJs.length / 1024).toFixed(1)} KB)`);

// 5.9 vip/sports.js (Chuối Chiên TV, Xôi Lạc TV)
const sportsJs = `/**
 * Cinema Pro Suite - Sports & Live Football VIP Module
 * Covers: Chuối Chiên TV, Xôi Lạc TV, Giờ Vàng TV
 */
(() => {
  "use strict";
  const VIP = window.VIP_REGISTRY || { registerMock: () => {}, registerPatcher: () => {} };
  const VIP_EXPIRY_DATE = VIP.VIP_EXPIRY_DATE || new Date(2099, 6, 18, 0, 0, 0);
  const VIP_EXPIRY_TIMESTAMP = VIP.VIP_EXPIRY_TIMESTAMP || Math.floor(VIP_EXPIRY_DATE.getTime() / 1000);
  const COIN_BALANCE = VIP.COIN_BALANCE || 999999999;

${sportsCode}

  if (VIP.registerMock && typeof handleSportsMock === "function") {
    VIP.registerMock(handleSportsMock);
  }

  window.handleSportsMock = typeof handleSportsMock === "function" ? handleSportsMock : undefined;
})();
`;
fs.writeFileSync(path.join(VIP_DIR, "sports.js"), sportsJs, "utf8");
console.log(`  ✓ Compiled content/vip/sports.js (${(sportsJs.length / 1024).toFixed(1)} KB)`);

// 5.10 vip/comics.js (TopTruyen, ZetTruyen)
const comicsJs = `/**
 * Cinema Pro Suite - Comics & Manga VIP Reader Module
 * Covers: TopTruyen, ZetTruyen, NetTruyen
 */
(() => {
  "use strict";
  const VIP = window.VIP_REGISTRY || { registerMock: () => {}, registerPatcher: () => {} };
  const VIP_EXPIRY_DATE = VIP.VIP_EXPIRY_DATE || new Date(2099, 6, 18, 0, 0, 0);
  const VIP_EXPIRY_TIMESTAMP = VIP.VIP_EXPIRY_TIMESTAMP || Math.floor(VIP_EXPIRY_DATE.getTime() / 1000);
  const COIN_BALANCE = VIP.COIN_BALANCE || 999999999;

${comicsCode}

  if (VIP.registerMock) {
    VIP.registerMock((url, init) => {
      if (url && (url.includes("/header-login") || url.includes("header-login")) && typeof getTopTruyenVipHeaderHtml === "function") {
        const html = getTopTruyenVipHeaderHtml();
        return new Response(html, {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" }
        });
      }
      if (typeof handleComicsMock === "function") return handleComicsMock(url, init);
      return null;
    });
  }

  window.handleComicsMock = typeof handleComicsMock === "function" ? handleComicsMock : undefined;
  window.getTopTruyenVipHeaderHtml = typeof getTopTruyenVipHeaderHtml === "function" ? getTopTruyenVipHeaderHtml : undefined;
})();
`;
fs.writeFileSync(path.join(VIP_DIR, "comics.js"), comicsJs, "utf8");
console.log(`  ✓ Compiled content/vip/comics.js (${(comicsJs.length / 1024).toFixed(1)} KB)`);

// 5.11 vip/anime.js (NetAnime, Hoạt Hình 3D)
const animeJs = `/**
 * Cinema Pro Suite - Anime & Animation VIP Module
 * Covers: NetAnime, Hoạt Hình 3D, AnimeHay, VuiGhe
 */
(() => {
  "use strict";
  const VIP = window.VIP_REGISTRY || { registerMock: () => {}, registerPatcher: () => {} };

  if (VIP.registerPatcher) {
    VIP.registerPatcher((data, url) => {
      if (url && (url.includes("netanime") || (typeof location !== "undefined" && location.hostname && location.hostname.includes("netanime")))) {
        if (data && typeof data === "object") {
          data.is_vip = true;
          data.is_premium = true;
          data.coin_balance = 999999999;
          data.thungBalance = 999999999;
        }
      }
      return data;
    });
  }
})();
`;
fs.writeFileSync(path.join(VIP_DIR, "anime.js"), animeJs, "utf8");
console.log(`  ✓ Compiled content/vip/anime.js (${(animeJs.length / 1024).toFixed(1)} KB)`);

// 5.12 vip/auth.js (Firebase & Global Tokens)
const authJs = `/**
 * Cinema Pro Suite - Identity & Auth Tokens Module
 * Covers: Firebase Auth & Session Credentials
 */
(() => {
  "use strict";
  const VIP = window.VIP_REGISTRY || { registerMock: () => {}, registerPatcher: () => {} };
  const VIP_EXPIRY_DATE = VIP.VIP_EXPIRY_DATE || new Date(2099, 6, 18, 0, 0, 0);
  const VIP_EXPIRY_TIMESTAMP = VIP.VIP_EXPIRY_TIMESTAMP || Math.floor(VIP_EXPIRY_DATE.getTime() / 1000);
  const COIN_BALANCE = VIP.COIN_BALANCE || 999999999;

${firebaseCode}

  if (VIP.registerMock && typeof handleFirebaseMock === "function") {
    VIP.registerMock(handleFirebaseMock);
  }

  window.handleFirebaseMock = typeof handleFirebaseMock === "function" ? handleFirebaseMock : undefined;
})();
`;
fs.writeFileSync(path.join(VIP_DIR, "auth.js"), authJs, "utf8");
console.log(`  ✓ Compiled content/vip/auth.js (${(authJs.length / 1024).toFixed(1)} KB)`);

// 5.13 core/content.js (Main Orchestrator Entrypoint)
const contentJs = `/**
 * Cinema Pro Suite - Extension Main Orchestrator (MAIN WORLD)
 * Modular Architecture v\${pkg.version}
 */
(() => {
  "use strict";

  // 1. Initialize VIP Control Hub safely (delay 400ms to allow React / Next.js SSR hydration to settle)
  const startHub = () => {
    setTimeout(() => {
      if (typeof window.initVipHub === "function") window.initVipHub();
    }, 400);
  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    startHub();
  } else {
    document.addEventListener("DOMContentLoaded", startHub, { once: true });
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
fs.writeFileSync(path.join(CORE_DIR, "content.js"), contentJs, "utf8");
console.log(`  ✓ Compiled content/core/content.js (${(contentJs.length / 1024).toFixed(1)} KB)`);

// 6. Generate manifest.json (Manifest V3 - Strict Modular File Loading)
const manifest = {
  manifest_version: 3,
  name: "Web Enhancer Suite (Cinema Pro VIP)",
  version: pkg.version,
  author: "Sfrank1e",
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
    "declarativeNetRequest",
    "activeTab",
    "tabs"
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
        "content/core/icons.js",
        "content/features/ad-nuker.js",
        "content/features/sniffer.js",
        "content/features/player-controls.js",
        "content/features/hub-ui.js",
        "content/vip/vip-engine.js",
        "content/vip/auth.js",
        "content/vip/cinema.js",
        "content/vip/anime.js",
        "content/vip/sports.js",
        "content/vip/comics.js",
        "content/core/content.js"
      ],
      css: ["content/styles.css"],
      run_at: "document_start",
      all_frames: true,
      world: "MAIN"
    },
    {
      matches: manifestMatches,
      js: ["content/core/bridge.js"],
      run_at: "document_start",
      all_frames: true
    }
  ]
};

fs.writeFileSync(path.join(EXT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
console.log(`  ✓ Generated extension/manifest.json (Manifest V3)`);

// Clean up legacy flat files from extension/content/ if they exist
const legacyFlatFiles = [
  path.join(CONTENT_DIR, "icons.js"),
  path.join(CONTENT_DIR, "bridge.js"),
  path.join(CONTENT_DIR, "ad-nuker.js"),
  path.join(CONTENT_DIR, "sniffer.js"),
  path.join(CONTENT_DIR, "player-controls.js"),
  path.join(CONTENT_DIR, "hub-ui.js"),
  path.join(CONTENT_DIR, "content.js"),
  path.join(CONTENT_DIR, "vip-patcher.js")
];
legacyFlatFiles.forEach(f => {
  if (fs.existsSync(f)) {
    try { fs.unlinkSync(f); } catch (_) {}
  }
});

console.log(`\n===============================================================`);
console.log(`✅ Extension Build Complete: Standalone Manifest V3 Ready!`);
console.log(`   Location: ${EXT_DIR}`);
console.log(`===============================================================\n`);
