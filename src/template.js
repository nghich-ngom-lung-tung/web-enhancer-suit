/**
 * Cinema Pro Suite - UserScript Generator Template
 * Assembles modular components into standalone, zero-dependency UserScripts.
 */
const fs = require("fs");
const path = require("path");

const COMMON_EMBED_MATCHES = require("./config/embeds");
const icons = require("./modules/icons");
const { getSnifferCode } = require("./modules/sniffer");
const adNukerCode = require("./modules/ad-nuker");
const playerControlsCode = require("./modules/player-controls");
const { getHubUiCode } = require("./modules/hub-ui");
const { getVipCode } = require("./modules/vip");

const adblockCss = fs.readFileSync(path.join(__dirname, "css", "adblock.css"), "utf8");
const theaterCss = fs.readFileSync(path.join(__dirname, "css", "theater.css"), "utf8");
const hubCss = fs.readFileSync(path.join(__dirname, "css", "hub.css"), "utf8");

function generateUserscript(site, isMasterAllInOne = false, allSites = [], customMasterFileName = "web-enhancer-all.user.js") {
  const sitesList = allSites.length > 0 ? allSites : [site];
  const rawMatches = isMasterAllInOne
    ? Array.from(new Set([...sitesList.flatMap(s => s.domains), ...COMMON_EMBED_MATCHES]))
    : Array.from(new Set([...site.domains, ...COMMON_EMBED_MATCHES]));

  const rawIncludes = isMasterAllInOne
    ? Array.from(new Set(sitesList.flatMap(s => s.includes || [])))
    : Array.from(new Set(site.includes || []));

  const expanded = [];
  rawMatches.forEach(m => {
    expanded.push(m);
    if (m.startsWith("*://*.")) {
      expanded.push("*://" + m.slice(6));
    }
  });

  const validMatches = [];
  const allIncludes = [...rawIncludes];
  expanded.forEach(m => {
    const hostMatch = m.match(/^\*:\/\/([^\/]+)\//);
    if (hostMatch) {
      const h = hostMatch[1];
      if (h !== "*" && h.includes("*") && !h.startsWith("*.")) {
        allIncludes.push(m);
        return;
      }
    }
    validMatches.push(m);
  });

  const matches = Array.from(new Set(validMatches));
  const includes = Array.from(new Set(allIncludes));

  const matchHeaders = matches.map(m => `// @match        ${m}`).join("\n");
  const includeHeaders = includes.length > 0
    ? "\n" + includes.map(inc => `// @include      ${inc}`).join("\n")
    : "";

  const fileName = isMasterAllInOne ? customMasterFileName : site.file;
  const scriptName = isMasterAllInOne
    ? "Web Enhancer Suite (All-In-One) - Phim, Anime, Bóng Đá & Truyện Tranh"
    : site.name;
  const scriptDesc = isMasterAllInOne
    ? "Bản Master: Tối ưu trải nghiệm xem phim, anime, bóng đá và truyện tranh. Chặn quảng cáo thông minh, phím tắt điều khiển, bộ lọc OLED HDR và hỗ trợ phát PotPlayer/VLC trên 50+ website tại Việt Nam."
    : site.desc;
  const scriptVersion = isMasterAllInOne ? "5.4.9" : (site.version || "5.4.9");
  const vipModuleType = isMasterAllInOne ? "all" : (site.vipModule || (site.isRophim ? "rophim" : null));
  const enableRophimVip = Boolean(vipModuleType);
  const rophimVipCode = enableRophimVip ? getVipCode(vipModuleType) : "";
  const siteTitle = isMasterAllInOne ? "Web Enhancer (All-In-One)" : site.name;

  const snifferCode = getSnifferCode(enableRophimVip);
  const hubUiCode = getHubUiCode(icons, siteTitle, scriptVersion);

  const allCssBlocks = isMasterAllInOne
    ? sitesList.map(s => s.siteCss).filter(Boolean)
    : (site.siteCss ? [site.siteCss] : []);

  const formattedSiteCss = allCssBlocks.map(cssBlock => {
    const trimmed = (cssBlock || "").trim();
    if (!trimmed) return "";
    return trimmed.includes("{")
      ? trimmed
      : `${trimmed} {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}`;
  }).filter(Boolean).join("\n\n");

  const fullCss = `
${adblockCss}

    ${formattedSiteCss}

${theaterCss}

${hubCss}
  `.trim();

  const cat = site.category || "movies";
  const scriptRelPath = isMasterAllInOne
    ? `scripts/${customMasterFileName}`
    : `scripts/${cat}/${fileName}`;

  return `// ==UserScript==
// @name         ${scriptName}
// @namespace    http://tampermonkey.net/
// @version      ${scriptVersion}
// @description  ${scriptDesc}
// @author       Sfrank1e
${matchHeaders}${includeHeaders}
// @allFrames    true
// @run-at       document-start
// @grant        none
// @license      MIT
// @icon         https://rophim1.vip/apple-icon.png
// @homepageURL  https://github.com/nghich-ngom-lung-tung/web-enhancer-suit
// @downloadURL  https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/${scriptRelPath}
// @updateURL    https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/${scriptRelPath}
// ==/UserScript==

(function () {
  "use strict";

${enableRophimVip ? rophimVipCode : ""}

${snifferCode}

${adNukerCode}

  // ═══════════════════════════════════════════════════════════════
  // 3. CSS STYLING & THEATER MODE INJECTION
  // ═══════════════════════════════════════════════════════════════
  const css = ${JSON.stringify(fullCss)};

  function injectCinemaProStyles() {
    if (typeof document === "undefined") return;
    const root = document.head || document.documentElement;
    if (!root) return;
    let s = document.getElementById("cinema-pro-suite-styles");
    if (!s) {
      s = document.createElement("style");
      s.id = "cinema-pro-suite-styles";
      s.textContent = css;
      root.appendChild(s);
    } else if (document.head && s.parentNode !== document.head) {
      document.head.appendChild(s);
    }
  }
  injectCinemaProStyles();
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", injectCinemaProStyles);
    }
    window.addEventListener("load", injectCinemaProStyles);
  }

${hubUiCode}

${playerControlsCode}

  if (document.body) initVipHub();
  else document.addEventListener("DOMContentLoaded", initVipHub, { once: true });
  window.addEventListener("DOMContentLoaded", ensureStreamUrl);
  window.addEventListener("load", ensureStreamUrl);

  const brandTag = ${isMasterAllInOne ? '"[Web Enhancer]"' : '"[Cinema Pro]"'};
  console.log("%c" + brandTag + " " + ${JSON.stringify(scriptName)} + " Ready!", "font-size: 13px; font-weight: bold; color: #10b981;");
})();
`;
}

module.exports = { generateUserscript };
