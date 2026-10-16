/**
 * Cinema Pro Suite - Extension Main Orchestrator (MAIN WORLD)
 * Modular Architecture v${pkg.version}
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
