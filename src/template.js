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
const rophimVipCode = require("./modules/rophim-vip");

const adblockCss = fs.readFileSync(path.join(__dirname, "css", "adblock.css"), "utf8");
const theaterCss = fs.readFileSync(path.join(__dirname, "css", "theater.css"), "utf8");
const hubCss = fs.readFileSync(path.join(__dirname, "css", "hub.css"), "utf8");

function generateUserscript(site, isMasterAllInOne = false, allSites = []) {
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

  const fileName = isMasterAllInOne ? "cinema-pro-all.user.js" : site.file;
  const scriptName = isMasterAllInOne
    ? "Cinema Pro Suite (All-In-One) - Kho Phim & Anime Việt Nam"
    : site.name;
  const scriptDesc = isMasterAllInOne
    ? "Bản Master Gộp Tất Cả Trong Một: Mở khóa VIP + Vô hạn Coin + Chặn 100% AdBlock/Stream Guard + M3U8 Sniffer + 1-Click PotPlayer/VLC + Phím tắt Tua 5s/Intro 85s/Volume & Anime HDR trên hơn 37+ website phim, anime, hoạt hình 3D Việt Nam!"
    : site.desc;
  const scriptVersion = isMasterAllInOne ? "5.4.4" : (site.version || "5.4.4");
  const enableRophimVip = isMasterAllInOne || Boolean(site.isRophim);
  const siteTitle = isMasterAllInOne ? "Cinema Pro (All-In-One)" : site.name;

  const snifferCode = getSnifferCode(enableRophimVip);
  const hubUiCode = getHubUiCode(icons, siteTitle, scriptVersion);

  const formattedSiteCss = site.siteCss
    ? (site.siteCss.includes("{") ? site.siteCss : `${site.siteCss} {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}`)
    : "";

  const fullCss = `
${adblockCss}

    ${formattedSiteCss}

${theaterCss}

${hubCss}
  `.trim();

  const cat = site.category || "movies";
  const scriptRelPath = isMasterAllInOne
    ? "scripts/cinema-pro-all.user.js"
    : `scripts/${cat}/${fileName}`;

  return `// ==UserScript==
// @name         ${scriptName}
// @namespace    http://tampermonkey.net/
// @version      ${scriptVersion}
// @description  ${scriptDesc}
// @author       nghich-ngom-lung-tung
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

  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  (document.head || document.documentElement).appendChild(styleEl);

${hubUiCode}

${playerControlsCode}

  if (document.body) initVipHub();
  else document.addEventListener("DOMContentLoaded", initVipHub, { once: true });
  window.addEventListener("DOMContentLoaded", ensureStreamUrl);
  window.addEventListener("load", ensureStreamUrl);

  console.log("%c[Cinema Pro] " + ${JSON.stringify(scriptName)} + " Ready!", "font-size: 13px; font-weight: bold; color: #10b981;");
})();
`;
}

module.exports = { generateUserscript };
