/**
 * Cinema Pro Suite - M3U8 Sniffer & Stream Guard Defuser Module
 */
function getSnifferCode(enableRophimVip) {
  return `
  function unwrapStreamUrl(url) {
    if (!url || typeof url !== "string") return "";
    let clean = url.trim();
    clean = clean.split("\\\\/").join("/").replace(/&amp;/g, "&");
    if (clean.includes("%3A%2F%2F") || clean.includes("%3a%2f%2f") || clean.includes("%2F") || clean.includes("%2f")) {
      try { clean = decodeURIComponent(clean); } catch (e) {}
    }
    if (clean.startsWith("/") || clean.startsWith("./")) {
      try { clean = new URL(clean, location.href).href; } catch (e) {}
    }
    try {
      const u = new URL(clean);
      for (const [k, val] of u.searchParams.entries()) {
        if (!val || typeof val !== "string") continue;
        let dec = val.trim();
        try { dec = decodeURIComponent(dec); } catch (e) {}
        if (dec.includes(".m3u8") || dec.includes("/hls/") || dec.includes(".mpd") || dec.includes(".mp4")) {
          return unwrapStreamUrl(dec);
        }
        if (dec.length > 20 && !dec.includes("http") && !dec.includes("/")) {
          try {
            const b64 = atob(dec);
            if (b64.includes(".m3u8") || b64.includes(".mp4")) return unwrapStreamUrl(b64);
          } catch (e) {}
        }
      }
    } catch (e) {}
    clean = clean.replace(new RegExp("\\\\.m3u8/+$", "i"), ".m3u8");
    clean = clean.replace(new RegExp("\\\\.mp4/+$", "i"), ".mp4");
    clean = clean.replace(new RegExp("\\\\.mpd/+$", "i"), ".mpd");
    while (clean.endsWith("/") && (clean.includes(".m3u8/") || clean.includes(".mp4/") || clean.includes(".mpd/"))) {
      clean = clean.slice(0, -1);
    }
    return clean;
  }

  const host = location.hostname || "";
  const path = location.pathname || "";
  const isEmbedPlayer =
    window.self !== window.top ||
    host.includes("streamc") ||
    host.includes("streamvsmov") ||
    host.includes("vsmov") ||
    host.includes("embed") ||
    host.includes("goatembed") ||
    host.includes("nguonc") ||
    host.includes("phimapi") ||
    host.includes("emturbovid") ||
    host.includes("turboviplay") ||
    host.includes("dood") ||
    host.includes("streamtape") ||
    host.includes("streamwish") ||
    host.includes("filelions") ||
    host.includes("vidcdn") ||
    host.includes("vidembed") ||
    path.includes("embed") ||
    path.includes("/v/") ||
    path.includes("/video/");

  // ═══════════════════════════════════════════════════════════════
  // 1. IFRAME EMBED PLAYER GUARD KILLER & STREAM SNIFFER
  // ═══════════════════════════════════════════════════════════════
  if (isEmbedPlayer) {
    let activePlayer = null;
    const dummyGuard = {
      version: "guard-25",
      status: () => ({ blocked: false, antiAdblock: false, action: "none" }),
      ready: Promise.resolve(),
      isBlocked: () => false,
      reportAdResource: () => {},
      waitForAccess: () => Promise.resolve(),
      registerPlayer: (player) => {
        activePlayer = player;
        if (player && typeof player.play === "function") {
          setTimeout(() => {
            try { player.play(); } catch (e) {}
          }, 300);
        }
      }
    };

    try {
      Object.defineProperty(window, "streamGuard", {
        value: dummyGuard,
        writable: false,
        configurable: false
      });
    } catch (e) {
      window.streamGuard = dummyGuard;
    }

    try {
      const origPause = HTMLMediaElement.prototype.pause;
      HTMLMediaElement.prototype.pause = function () {
        const stack = new Error().stack || "";
        if (
          stack.includes("stream-guard") ||
          stack.includes("guard-25") ||
          stack.includes("stopPlayback") ||
          stack.includes("adError")
        ) {
          return;
        }
        return origPause.apply(this, arguments);
      };
    } catch (e) {}

    // Auto-skip video pre-roll ad in player iframe
    setInterval(() => {
      const video = document.querySelector("video");
      const adNotice = document.querySelector(
        ".jw-ad-notice, .jw-ad-countdown, [class*='ad-countdown'], .ad-showing"
      );
      if (adNotice && video && video.duration > 0 && video.duration < 90) {
        video.currentTime = video.duration || 999;
      }
      const skipBtn = document.querySelector(
        ".jw-skip, .videoAdUiSkipButton, .ytp-ad-skip-button, .skip-ad, button[class*='skip'], .ad-skip"
      );
      if (skipBtn && typeof skipBtn.click === "function") {
        try { skipBtn.click(); } catch (e) {}
      }
    }, 500);

    const embedStyle = document.createElement("style");
    embedStyle.textContent = \`
      #stream-guard, #stream-guard-card, .stream-guard, div[id*="stream-guard"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      video.ro-enhanced-hdr {
        filter: contrast(1.10) saturate(1.25) brightness(1.04) !important;
      }
    \`;
    (document.head || document.documentElement).appendChild(embedStyle);

    let lastNotifiedStream = "";
    function notifyStream(url) {
      if (!url || typeof url !== "string") return;
      if (url.startsWith("blob:") || url.startsWith("data:")) return;
      const clean = unwrapStreamUrl(url);
      if (!clean || clean === lastNotifiedStream) return;
      const u = clean.toLowerCase();
      if (
        u.includes(".m3u8") ||
        u.includes("/hls/") ||
        u.includes("master") ||
        u.includes("playlist") ||
        u.includes(".mpd") ||
        (u.includes(".mp4") && !u.includes("preview") && !u.includes("trailer") && !u.includes("tvc"))
      ) {
        lastNotifiedStream = clean;
        try { localStorage.setItem("RO_CAPTURED_STREAM", clean); } catch (e) {}
        try {
          window.parent.postMessage({ type: "RO_STREAM_FOUND", streamUrl: clean }, "*");
        } catch (e) {}
        try {
          if (window.top && window.top !== window.parent) {
            window.top.postMessage({ type: "RO_STREAM_FOUND", streamUrl: clean }, "*");
          }
        } catch (e) {}
      }
    }

    function checkGlobals() {
      try {
        const cur = new URL(location.href);
        for (const [k, val] of cur.searchParams.entries()) {
          if (!val || typeof val !== "string") continue;
          if (val.includes(".m3u8") || val.includes(".mp4") || val.includes("/hls/")) {
            notifyStream(val);
          }
        }
      } catch (e) {}
      if (typeof window.videoSrc === "string" && window.videoSrc) notifyStream(window.videoSrc);
      if (typeof window.playerSource === "string" && window.playerSource) notifyStream(window.playerSource);
      if (window.playerOptions && typeof window.playerOptions.signedMasterUrl === "string" && window.playerOptions.signedMasterUrl) {
        notifyStream(window.playerOptions.signedMasterUrl);
      }
      if (typeof window.__V_DATA__ === "string" && window.__V_DATA__) {
        try {
          const parsed = JSON.parse(atob(window.__V_DATA__));
          if (parsed.m) {
            const u = atob(parsed.m);
            if (u.includes(".m3u8") || u.includes(".mp4")) notifyStream(u);
          }
          if (parsed.rm) {
            const ru = atob(parsed.rm);
            if (ru.includes(".m3u8") || ru.includes(".mp4")) notifyStream(ru);
          }
        } catch (e) {}
      }
    }

    checkGlobals();
    setInterval(checkGlobals, 800);

    setInterval(() => {
      checkGlobals();
      const v = document.querySelector("video");
      if (v) {
        if (v.currentSrc) notifyStream(v.currentSrc);
        if (v.src) notifyStream(v.src);
      }
      document.querySelectorAll("video source").forEach(s => {
        if (s.src) notifyStream(s.src);
      });
      if (typeof performance !== "undefined" && performance.getEntriesByType) {
        try {
          const entries = performance.getEntriesByType("resource");
          for (let i = entries.length - 1; i >= 0; i--) {
            const n = entries[i].name;
            if (n && typeof n === "string") {
              const nl = n.toLowerCase();
              if (nl.includes(".m3u8") || nl.includes("master") || nl.includes("playlist")) {
                notifyStream(n);
                break;
              }
            }
          }
        } catch (e) {}
      }
    }, 1000);

    try {
      const origEval = window.eval;
      window.eval = function (code) {
        if (typeof code === "string") {
          try { extractUrlsFromString(code); } catch (e) {}
        }
        return origEval.apply(this, arguments);
      };
    } catch (e) {}

    try {
      const OrigFunc = Function;
      window.Function = function () {
        const lastArg = arguments[arguments.length - 1];
        if (typeof lastArg === "string") {
          try { extractUrlsFromString(lastArg); } catch (e) {}
        }
        return OrigFunc.apply(this, arguments);
      };
      window.Function.prototype = OrigFunc.prototype;
    } catch (e) {}

    function extractUrlsFromString(str) {
      if (!str || typeof str !== "string") return;
      if (!str.includes("http")) return;
      try {
        var re = new RegExp("https?://[^\\\\s\\\"'<>,;)\\\\]]+", "g");
        var match;
        while ((match = re.exec(str)) !== null) {
          var url = match[0];
          var lower = url.toLowerCase();
          if (lower.includes(".m3u8") || lower.includes("/hls/") || lower.includes("master.") || lower.includes("playlist.") || lower.includes(".mpd")) {
            notifyStream(url);
          }
        }
      } catch (e) {}
    }

    try {
      const origFetch = window.fetch;
      window.fetch = async function (input, init) {
        try {
          const url = typeof input === "string" ? input : input?.url || input?.href || "";
          if (url) notifyStream(url);
        } catch (e) {}
        return origFetch.apply(this, arguments);
      };
    } catch (e) {}

    try {
      const origXhrOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function (m, u) {
        try {
          if (u) notifyStream(String(u));
        } catch (e) {}
        return origXhrOpen.apply(this, arguments);
      };
    } catch (e) {}

    try {
      const origSrcDesc = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "src");
      if (origSrcDesc && origSrcDesc.set) {
        const origSet = origSrcDesc.set;
        Object.defineProperty(HTMLMediaElement.prototype, "src", {
          set: function (val) {
            try { if (val) notifyStream(String(val)); } catch (e) {}
            return origSet.call(this, val);
          },
          get: origSrcDesc.get,
          configurable: true
        });
      }
    } catch (e) {}

    try {
      function hookHlsProto(HlsClass) {
        if (HlsClass && HlsClass.prototype && !HlsClass._roHooked) {
          HlsClass._roHooked = true;
          const origLoad = HlsClass.prototype.loadSource;
          HlsClass.prototype.loadSource = function (url) {
            try { if (url) notifyStream(String(url)); } catch (e) {}
            return origLoad.apply(this, arguments);
          };
        }
      }
      if (window.Hls) hookHlsProto(window.Hls);
      let _curHls = window.Hls;
      try {
        Object.defineProperty(window, "Hls", {
          configurable: true,
          enumerable: true,
          get: () => _curHls,
          set: (v) => {
            _curHls = v;
            try { hookHlsProto(v); } catch (e) {}
          }
        });
      } catch (e) {}
    } catch (e) {}

    function scanEmbedDom() {
      try {
        const scripts = document.querySelectorAll("script");
        for (let i = 0; i < scripts.length; i++) {
          const text = scripts[i].textContent || "";
          if (text.length > 10) extractUrlsFromString(text);
        }
      } catch (e) {}
      try {
        const html = document.documentElement ? document.documentElement.innerHTML : "";
        extractUrlsFromString(html);
      } catch (e) {}
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", scanEmbedDom);
    } else {
      scanEmbedDom();
    }
    window.addEventListener("load", scanEmbedDom);

    window.addEventListener("message", function (e) {
      if (!e.data || typeof e.data !== "object") return;
      const video = document.querySelector("video");

      if (e.data.type === "RO_STREAM_PING") {
        checkGlobals();
        const v = document.querySelector("video");
        if (v && v.currentSrc) notifyStream(v.currentSrc);
        else if (v && v.src) notifyStream(v.src);
      } else if (e.data.type === "RO_CMD_SKIP_INTRO") {
        const sec = e.data.seconds || 85;
        if (video) video.currentTime = Math.min(video.duration || Infinity, video.currentTime + sec);
        else if (activePlayer?.seek) {
          const cur = activePlayer.getPosition ? activePlayer.getPosition() : 0;
          activePlayer.seek(cur + sec);
        }
      } else if (e.data.type === "RO_CMD_SEEK") {
        const delta = e.data.delta || 0;
        if (video) video.currentTime = Math.max(0, Math.min(video.duration || Infinity, video.currentTime + delta));
        else if (activePlayer?.seek) {
          const cur = activePlayer.getPosition ? activePlayer.getPosition() : 0;
          activePlayer.seek(Math.max(0, cur + delta));
        }
      } else if (e.data.type === "RO_CMD_SEEK_PERCENT") {
        const pct = Math.max(0, Math.min(100, e.data.percent || 0));
        if (video && video.duration) {
          video.currentTime = (video.duration * pct) / 100;
        } else if (activePlayer?.seek && activePlayer?.getDuration) {
          activePlayer.seek((activePlayer.getDuration() * pct) / 100);
        }
      } else if (e.data.type === "RO_CMD_VOLUME") {
        const vol = Math.max(0, Math.min(1, e.data.volume !== undefined ? e.data.volume : 1));
        if (video) video.volume = vol;
        else if (activePlayer?.setVolume) activePlayer.setVolume(Math.round(vol * 100));
      } else if (e.data.type === "RO_CMD_SET_SPEED") {
        const speed = e.data.speed || 1;
        if (video) video.playbackRate = speed;
        else if (activePlayer?.setPlaybackRate) activePlayer.setPlaybackRate(speed);
      } else if (e.data.type === "RO_CMD_TOGGLE_HDR") {
        if (video) video.classList.toggle("ro-enhanced-hdr");
      } else if (e.data.type === "RO_CMD_TOGGLE_PLAY") {
        if (video) {
          if (video.paused) video.play().catch(() => {});
          else video.pause();
        } else if (activePlayer?.play && activePlayer?.pause) {
          if (activePlayer.getState && activePlayer.getState() === "playing") activePlayer.pause();
          else activePlayer.play();
        }
      } else if (e.data.type === "RO_CMD_MUTE") {
        if (video) video.muted = !video.muted;
        else if (activePlayer?.setMute) activePlayer.setMute(!activePlayer.getMute());
      } else if (e.data.type === "RO_CMD_FULLSCREEN") {
        if (document.fullscreenElement) {
          try { document.exitFullscreen().catch(() => {}); } catch (err) {}
        } else {
          const target = video || document.body;
          if (target && target.requestFullscreen) {
            try { target.requestFullscreen().catch(() => {}); } catch (err) {}
          } else if (activePlayer?.setFullscreen) {
            activePlayer.setFullscreen(true);
          }
        }
      }
    });

    return;
  }

  // ═══════════════════════════════════════════════════════════════
  // 2. TOP WINDOW M3U8 SNIFFER & POSTMESSAGE BRIDGE
  // ═══════════════════════════════════════════════════════════════
  let capturedStreamUrl = "";
  let currentSpeed = 1.0;
  let currentVolume = 1.0;
  let isHdrEnabled = false;
  let isTheaterMode = false;

  window.addEventListener("message", function (event) {
    if (event.data && event.data.type === "stream-guard-hello") {
      try {
        event.source.postMessage({
          type: "stream-parent-state",
          version: event.data.version || 25,
          id: event.data.id,
          helperVersion: "guard-5",
          hasAdblock: false,
          key: "ok"
        }, "*");
      } catch (err) {}
    } else if (event.data && event.data.type === "RO_STREAM_FOUND") {
      checkAndCaptureUrl(event.data.streamUrl);
    }
  });

  try {
    window.addEventListener("storage", function (e) {
      if (e.key === "RO_CAPTURED_STREAM" && e.newValue) {
        checkAndCaptureUrl(e.newValue);
      }
    });
    const stored = localStorage.getItem("RO_CAPTURED_STREAM");
    if (stored) checkAndCaptureUrl(stored);
  } catch (e) {}

  function checkAndCaptureUrl(url) {
    if (!url || typeof url !== "string") return false;
    const clean = unwrapStreamUrl(url);
    if (!clean) return false;
    const u = clean.toLowerCase();
    if (
      u.includes(".m3u8") ||
      u.includes("/hls/") ||
      u.includes("master") ||
      u.includes("playlist") ||
      u.includes(".mpd") ||
      (u.includes(".mp4") && !u.includes("trailer") && !u.includes("preview") && !u.includes("ad_") && !u.includes("tvc"))
    ) {
      capturedStreamUrl = clean;
      try { localStorage.setItem("RO_CAPTURED_STREAM", clean); } catch (e) {}
      const preview = document.getElementById("ro-stream-preview");
      if (preview) {
        preview.style.display = "block";
        preview.innerHTML = '<span class="ro-dot"></span>' + (u.length > 38 ? u.slice(0, 35) + "..." : u);
      }
      return true;
    }
    return false;
  }

  function extractStreamFromObject(obj) {
    if (!obj || typeof obj !== "object") return;
    try {
      const seen = new Set();
      function deepScan(target, depth = 0) {
        if (!target || depth > 5 || seen.has(target)) return;
        if (typeof target === "object") seen.add(target);
        if (typeof target === "string") {
          checkAndCaptureUrl(target);
          return;
        }
        if (Array.isArray(target)) {
          for (let i = 0; i < target.length; i++) deepScan(target[i], depth + 1);
          return;
        }
        for (const k of Object.keys(target)) {
          const val = target[k];
          if (typeof val === "string") {
            const kl = k.toLowerCase();
            if (kl.includes("file") || kl.includes("url") || kl.includes("stream") || kl.includes("link") || kl.includes("m3u8") || kl.includes("src") || kl.includes("hls")) {
              checkAndCaptureUrl(val);
            } else {
              checkAndCaptureUrl(val);
            }
          } else if (typeof val === "object" && val !== null) {
            deepScan(val, depth + 1);
          }
        }
      }
      deepScan(obj);
    } catch (e) {}
  }

  function scanIframesForStreams() {
    try {
      const cur = new URL(location.href);
      for (const [k, val] of cur.searchParams.entries()) {
        if (!val || typeof val !== "string") continue;
        if (val.includes(".m3u8") || val.includes(".mp4") || val.includes("/hls/")) {
          checkAndCaptureUrl(val);
        }
      }
    } catch (e) {}

    if (typeof window.__V_DATA__ === "string" && window.__V_DATA__) {
      try {
        const parsed = JSON.parse(atob(window.__V_DATA__));
        if (parsed.m) {
          const u = atob(parsed.m);
          if (u.includes(".m3u8") || u.includes(".mp4")) checkAndCaptureUrl(u);
        }
        if (parsed.rm) {
          const ru = atob(parsed.rm);
          if (ru.includes(".m3u8") || ru.includes(".mp4")) checkAndCaptureUrl(ru);
        }
      } catch (e) {}
    }

    document.querySelectorAll("iframe").forEach(f => {
      const src = f.src || f.getAttribute("src") || f.getAttribute("data-src") || "";
      if (!src) return;
      
      if (src.includes("vsmov") && src.includes("/video/")) {
        const parts = src.split("/video/");
        if (parts.length === 2) {
          const origin = parts[0];
          const hash = parts[1].split("?")[0].split("#")[0].split("/")[0].trim();
          if (hash) {
            checkAndCaptureUrl(origin + "/stream/" + hash + "/master.m3u8");
            return;
          }
        }
      }
      
      const unwrapped = unwrapStreamUrl(src);
      if (unwrapped && checkAndCaptureUrl(unwrapped)) return;

      try {
        const u = new URL(src, location.href);
        for (const [k, val] of u.searchParams.entries()) {
          if (!val || typeof val !== "string") continue;
          const uVal = unwrapStreamUrl(val);
          if (uVal && checkAndCaptureUrl(uVal)) return;
        }
        if (u.pathname.includes(".m3u8") || u.pathname.includes(".mp4")) {
          checkAndCaptureUrl(u.href);
        }
      } catch (e) {}
    });
  }

  function scanPerformanceResources() {
    if (typeof performance === "undefined" || !performance.getEntriesByType) return;
    try {
      const entries = performance.getEntriesByType("resource");
      for (let i = entries.length - 1; i >= 0; i--) {
        const name = entries[i].name;
        if (name && typeof name === "string") {
          const n = name.toLowerCase();
          if (
            n.includes(".m3u8") ||
            n.includes("/hls/") ||
            n.includes("master") ||
            n.includes("playlist") ||
            n.includes(".mpd") ||
            (n.includes(".mp4") && !n.includes("preview") && !n.includes("trailer") && !n.includes("tvc"))
          ) {
            if (checkAndCaptureUrl(name)) break;
          }
        }
      }
    } catch (e) {}
  }

  function findStreamMatches(str) {
    if (!str || typeof str !== "string") return [];
    if (!str.includes(".m3u8") && !str.includes("/hls/") && !str.includes(".mpd") && !str.includes(".mp4")) return [];
    const results = [];
    const tokens = str.split(/[\\s"'<>{}()[\\]\\x60]+/);
    for (let i = 0; i < tokens.length; i++) {
      let t = tokens[i];
      if (
        t.startsWith("http://") ||
        t.startsWith("https://") ||
        t.startsWith("//") ||
        t.startsWith("http%3A") ||
        t.startsWith("https%3A") ||
        t.startsWith("http%3a") ||
        t.startsWith("https%3a") ||
        t.startsWith("https:\\\\/\\\\/") ||
        t.startsWith("http:\\\\/\\\\/")
      ) {
        if (t.includes(".m3u8") || t.includes("/hls/") || t.includes(".mpd") || t.includes(".mp4")) {
          t = t.replace(/[\\\\,;)]+$/, "");
          results.push(t);
        }
      }
    }
    return results;
  }

  function scanPageScriptsAndDom() {
    if (capturedStreamUrl) return capturedStreamUrl;
    try {
      const scripts = document.querySelectorAll("script");
      for (let i = 0; i < scripts.length; i++) {
        const text = scripts[i].textContent;
        const matches = findStreamMatches(text);
        for (let j = 0; j < matches.length; j++) {
          const unwrapped = unwrapStreamUrl(matches[j]);
          if (unwrapped && checkAndCaptureUrl(unwrapped)) return unwrapped;
        }
      }
    } catch (e) {}

    try {
      const elements = document.querySelectorAll("[data-src*='.m3u8'], [data-url*='.m3u8'], [src*='.m3u8'], [href*='.m3u8'], [data-src*='/hls/'], [src*='/hls/']");
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const val = el.getAttribute("data-src") || el.getAttribute("data-url") || el.getAttribute("src") || el.getAttribute("href") || "";
        if (val) {
          const unwrapped = unwrapStreamUrl(val);
          if (unwrapped && checkAndCaptureUrl(unwrapped)) return unwrapped;
        }
      }
    } catch (e) {}

    try {
      const html = (document.body ? document.body.innerHTML : "") || (document.documentElement ? document.documentElement.innerHTML : "");
      const matches = findStreamMatches(html);
      for (let j = 0; j < matches.length; j++) {
        const unwrapped = unwrapStreamUrl(matches[j]);
        if (unwrapped && checkAndCaptureUrl(unwrapped)) return unwrapped;
      }
    } catch (e) {}

    return "";
  }

  function ensureStreamUrl() {
    if (capturedStreamUrl) return capturedStreamUrl;
    try {
      const stored = localStorage.getItem("RO_CAPTURED_STREAM");
      if (stored && checkAndCaptureUrl(stored)) return capturedStreamUrl;
    } catch (e) {}
    scanIframesForStreams();
    if (capturedStreamUrl) return capturedStreamUrl;
    scanPerformanceResources();
    if (capturedStreamUrl) return capturedStreamUrl;
    scanPageScriptsAndDom();
    if (!capturedStreamUrl) {
      sendCommandToPlayer({ type: "RO_STREAM_PING" });
    }
    return capturedStreamUrl;
  }

  setInterval(() => {
    ensureStreamUrl();
    const v = document.querySelector("video");
    if (v) {
      if (v.currentSrc) checkAndCaptureUrl(v.currentSrc);
      if (v.src) checkAndCaptureUrl(v.src);
    }
    document.querySelectorAll("video source").forEach(s => {
      if (s.src) checkAndCaptureUrl(s.src);
    });
  }, 800);

  // ─── HOOK FETCH TRÊN TRANG CHÍNH & CHẶN API BANNER ───
  const origFetchMain = window.fetch;
  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input?.url || "";
    if (isAdApi(url)) {
      console.log("[Web Enhancer] Đã chặn triệt để API banner:", url);
      return new Response(JSON.stringify({ status: 200, success: true, data: [], items: [], banners: [], result: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    checkAndCaptureUrl(url);
    ${enableRophimVip ? "return handleRophimFetchResponse(origFetchMain.apply(this, arguments), url);" : "return origFetchMain.apply(this, arguments);"}
  };

  // ─── HOOK XHR TRÊN TRANG CHÍNH ───
  const origXhrMain = window.XMLHttpRequest;
  window.XMLHttpRequest = function () {
    const xhr = new origXhrMain();
    const origOpen = xhr.open;
    let targetUrl = "";
    xhr.open = function (m, u) {
      targetUrl = u || "";
      checkAndCaptureUrl(targetUrl);
      if (origOpen) return origOpen.apply(this, arguments);
    };
    
    const origSend = xhr.send;
    xhr.send = function () {
      if (isAdApi(targetUrl)) {
        try {
          Object.defineProperty(xhr, "status", { value: 200, writable: false });
          Object.defineProperty(xhr, "responseText", { value: "{}", writable: false });
        } catch (e) {}
        return;
      }
      xhr.addEventListener("load", function () {
        ${enableRophimVip ? "handleRophimXhrResponse(xhr, targetUrl);" : ""}
      });
      if (origSend) return origSend.apply(this, arguments);
    };

    return xhr;
  };

  try {
    Object.keys(origXhrMain).forEach(k => {
      try { window.XMLHttpRequest[k] = origXhrMain[k]; } catch (e) {}
    });
  } catch (e) {}
`;
}

module.exports = { getSnifferCode };
