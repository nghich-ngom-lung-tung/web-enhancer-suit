/**
 * Cinema Pro Suite - Stream Sniffer & Anti-Referer Hook
 */
(() => {
  "use strict";

  function unwrapStreamUrl(url) {
    if (!url || typeof url !== "string") return "";
    let clean = url.trim();
    clean = clean.split("\\/").join("/").replace(/&amp;/g, "&").replace(/\u0026/g, "&");
    if (clean.includes("%3A%2F%2F") || clean.includes("%3a%2f%2f") || clean.includes("%2F") || clean.includes("%2f")) {
      try { clean = decodeURIComponent(clean); } catch (e) {}
    }
    if (clean.startsWith("/") || clean.startsWith("./")) {
      try {
        const baseHref = (typeof location !== "undefined" && location.href) ? location.href : "https://duphim.social";
        clean = new URL(clean, baseHref).href;
      } catch (e) {}
    }
    try {
      const baseHref = (typeof location !== "undefined" && location.href) ? location.href : "https://duphim.social";
      const u = new URL(clean, baseHref);
      for (const [k, val] of u.searchParams.entries()) {
        if (!val || typeof val !== "string") continue;
        let dec = val.trim().replace(/&amp;/g, "&").replace(/\u0026/g, "&");
        try { dec = decodeURIComponent(dec); } catch (e) {}
        if (dec.includes(".m3u8") || dec.includes("/hls/") || dec.includes(".mpd") || dec.includes(".mp4")) {
          if (dec.startsWith("http://") || dec.startsWith("https://") || dec.startsWith("//")) {
            return unwrapStreamUrl(dec);
          }
          if (u.origin && u.origin !== "null") {
            try { return unwrapStreamUrl(new URL(dec, u.origin).href); } catch (e) {}
          }
        }
        if (dec.length > 20 && !dec.includes("http") && !dec.includes("/")) {
          try {
            const b64 = atob(dec);
            if (b64.includes(".m3u8") || b64.includes(".mp4")) {
              if (b64.startsWith("http://") || b64.startsWith("https://") || b64.startsWith("//")) {
                return unwrapStreamUrl(b64);
              }
              if (u.origin && u.origin !== "null") {
                try { return unwrapStreamUrl(new URL(b64, u.origin).href); } catch (e) {}
              }
            }
          } catch (e) {}
        }
      }
    } catch (e) {}
    clean = clean.replace(new RegExp("\\.m3u8/+$", "i"), ".m3u8");
    clean = clean.replace(new RegExp("\\.mp4/+$", "i"), ".mp4");
    clean = clean.replace(new RegExp("\\.mpd/+$", "i"), ".mpd");
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
    host.includes("doubok") ||
    host.includes("salesperyear") ||
    host.includes("clubc") ||
    host.includes("darkbytes") ||
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
    embedStyle.textContent = `
      #stream-guard, #stream-guard-card, .stream-guard, div[id*="stream-guard"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      video.ro-enhanced-hdr {
        filter: contrast(1.10) saturate(1.25) brightness(1.04) !important;
      }
    `;
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
        (u.includes(".mp4") && !u.includes("preview") && !u.includes("trailer") && !u.includes("tvc") && !u.includes("ad-site"))
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
      if (typeof window.jwplayer === "function") {
        try {
          const inst = window.jwplayer();
          if (inst && typeof inst.getPlaylistItem === "function") {
            const item = inst.getPlaylistItem();
            if (item && item.file) notifyStream(item.file);
          }
        } catch (e) {}
      }
      if (typeof window.file === "string" && window.file) {
        notifyStream(window.file);
      }
      if (window.sources) {
        if (Array.isArray(window.sources)) {
          window.sources.forEach(s => { if (typeof s === "string") notifyStream(s); });
        } else if (typeof window.sources === "string") {
          notifyStream(window.sources);
        }
      }
      if (window.playlist) {
        if (Array.isArray(window.playlist)) {
          window.playlist.forEach(s => { if (typeof s === "string") notifyStream(s); });
        } else if (typeof window.playlist === "string") {
          notifyStream(window.playlist);
        }
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
              if (
                nl.includes(".m3u8") ||
                nl.includes("master") ||
                nl.includes("playlist") ||
                nl.includes(".mpd") ||
                (nl.includes(".mp4") && !nl.includes("preview") && !nl.includes("trailer") && !nl.includes("tvc") && !nl.includes("ad-site"))
              ) {
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
        var re = new RegExp("https?://[^\\s\"'<>,;)\\]]+", "g");
        var match;
        while ((match = re.exec(str)) !== null) {
          var url = match[0];
          var lower = url.toLowerCase();
          if (
            lower.includes(".m3u8") ||
            lower.includes("/hls/") ||
            lower.includes("master.") ||
            lower.includes("playlist.") ||
            lower.includes(".mpd") ||
            (lower.includes(".mp4") && !lower.includes("preview") && !lower.includes("trailer") && !lower.includes("tvc") && !lower.includes("ad-site"))
          ) {
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
  var capturedStreamUrl = (typeof window !== "undefined" && window.capturedStreamUrl) || "";
  var currentSpeed = 1.0;
  var currentVolume = 1.0;
  var isHdrEnabled = false;
  var isTheaterMode = false;

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
    localStorage.removeItem("RO_CAPTURED_STREAM");
    window.addEventListener("storage", function (e) {
      if (e.key === "RO_CAPTURED_STREAM" && e.newValue) {
        checkAndCaptureUrl(e.newValue);
      }
    });
  } catch (e) {}

  try {
    const origSrcDescTop = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "src");
    if (origSrcDescTop && origSrcDescTop.set) {
      const origSetTop = origSrcDescTop.set;
      Object.defineProperty(HTMLMediaElement.prototype, "src", {
        set: function (val) {
          try {
            if (val && typeof val === "string" && !val.includes("tvc") && !val.includes("video-premium")) {
              checkAndCaptureUrl(String(val));
            }
          } catch (e) {}
          return origSetTop.call(this, val);
        },
        get: origSrcDescTop.get,
        configurable: true
      });
    }
  } catch (e) {}

  try {
    function hookHlsProtoTop(HlsClass) {
      if (HlsClass && HlsClass.prototype && !HlsClass._roHookedTop) {
        HlsClass._roHookedTop = true;
        const origLoad = HlsClass.prototype.loadSource;
        HlsClass.prototype.loadSource = function (url) {
          try {
            if (url && typeof url === "string" && !url.includes("tvc")) {
              checkAndCaptureUrl(String(url));
            }
          } catch (e) {}
          return origLoad.apply(this, arguments);
        };
      }
    }
    if (window.Hls) hookHlsProtoTop(window.Hls);
    let _curHlsTop = window.Hls;
    try {
      Object.defineProperty(window, "Hls", {
        configurable: true,
        enumerable: true,
        get: () => _curHlsTop,
        set: (v) => {
          _curHlsTop = v;
          try { hookHlsProtoTop(v); } catch (e) {}
        }
      });
    } catch (e) {}
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
      (u.includes(".mp4") && !u.includes("trailer") && !u.includes("preview") && !u.includes("ad_") && !u.includes("tvc") && !u.includes("ad-site"))
    ) {
      capturedStreamUrl = clean;
      if (typeof window !== "undefined") window.capturedStreamUrl = clean;
      try { localStorage.setItem("RO_CAPTURED_STREAM", clean); } catch (e) {}
      try {
        if (typeof window !== "undefined" && window.postMessage) {
          window.postMessage({ type: "CINEMA_PRO_STREAM_FOUND", url: clean, title: (typeof document !== "undefined" ? document.title : "") }, "*");
        }
      } catch (e) {}
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
            if (kl.includes("file") || kl.includes("url") || kl.includes("stream") || kl.includes("link") || kl.includes("m3u8") || kl.includes("src") || kl.includes("hls") || kl.includes("video") || kl.includes("play")) {
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

    if (window.sources) {
      if (Array.isArray(window.sources)) {
        window.sources.forEach(s => { if (typeof s === "string") checkAndCaptureUrl(s); else if (typeof s === "object") extractStreamFromObject(s); });
      } else if (typeof window.sources === "string") {
        checkAndCaptureUrl(window.sources);
      } else if (typeof window.sources === "object") {
        extractStreamFromObject(window.sources);
      }
    }
    if (window.playlist) {
      if (Array.isArray(window.playlist)) {
        window.playlist.forEach(s => { if (typeof s === "string") checkAndCaptureUrl(s); else if (typeof s === "object") extractStreamFromObject(s); });
      } else if (typeof window.playlist === "string") {
        checkAndCaptureUrl(window.playlist);
      } else if (typeof window.playlist === "object") {
        extractStreamFromObject(window.playlist);
      }
    }

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
            (n.includes(".mp4") && !n.includes("preview") && !n.includes("trailer") && !n.includes("tvc") && !n.includes("ad-site"))
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
    const tokens = str.split(/[\s"'<>{}()[\]\x60]+/);
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
        t.startsWith("https:\\/\\/") ||
        t.startsWith("http:\\/\\/")
      ) {
        if (t.includes(".m3u8") || t.includes("/hls/") || t.includes(".mpd") || t.includes(".mp4")) {
          t = t.replace(/[\\,;)]+$/, "");
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
      const elements = document.querySelectorAll(
        "[data-src*='.m3u8'], [data-url*='.m3u8'], [src*='.m3u8'], [href*='.m3u8'], [data-value*='.m3u8'], [data-link*='.m3u8'], [data-file*='.m3u8'], [data-stream*='.m3u8'], " +
        "[data-src*='/hls/'], [src*='/hls/'], [data-value*='/hls/'], [data-link*='/hls/'], " +
        "[data-src*='.mp4'], [data-url*='.mp4'], [src*='.mp4'], [href*='.mp4'], [data-value*='.mp4'], [data-link*='.mp4'], [data-file*='.mp4']"
      );
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const val = el.getAttribute("data-value") || el.getAttribute("data-src") || el.getAttribute("data-url") || el.getAttribute("src") || el.getAttribute("href") || el.getAttribute("data-link") || el.getAttribute("data-file") || el.getAttribute("data-stream") || "";
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

    // GhienPhim, CoiPhim & DuPhim In-Memory Playlist & Player Sniffing
    try {
      if (window._memPlaylist && window._memPlaylist[0]) {
        const s = window._memPlaylist[0].source;
        if (s && typeof s === "string") checkAndCaptureUrl(s);
        if (Array.isArray(window._memPlaylist[0].fallback)) {
          window._memPlaylist[0].fallback.forEach(f => {
            if (f && typeof f === "string") checkAndCaptureUrl(f);
          });
        }
      }
      if (window._player) {
        if (window._player.source && typeof window._player.source === "string") checkAndCaptureUrl(window._player.source);
        if (window._player.currentSrc) checkAndCaptureUrl(window._player.currentSrc);
      }
      document.querySelectorAll(".btn-link-play, [data-play]").forEach(b => {
        const dp = b.getAttribute("data-play");
        if (dp) checkAndCaptureUrl(dp);
      });
    } catch (e) {}

    function safeSendCommandToPlayer(cmd) {
      try {
        if (typeof sendCommandToPlayer === "function") {
          sendCommandToPlayer(cmd);
          return;
        }
        if (typeof window !== "undefined" && typeof window.sendCommandToPlayer === "function") {
          window.sendCommandToPlayer(cmd);
          return;
        }
        document.querySelectorAll("iframe").forEach(f => {
          try { f.contentWindow.postMessage(cmd, "*"); } catch (e) {}
        });
      } catch (e) {}
    }

    scanIframesForStreams();
    if (capturedStreamUrl) return capturedStreamUrl;
    scanPerformanceResources();
    if (capturedStreamUrl) return capturedStreamUrl;
    scanPageScriptsAndDom();
    if (!capturedStreamUrl) {
      safeSendCommandToPlayer({ type: "RO_STREAM_PING" });
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

  try {
    document.addEventListener("click", function (e) {
      const btn = e.target && e.target.closest && e.target.closest("[data-play], .btn-link-play, .flim-extend .btn-custom");
      if (btn) {
        const dp = btn.getAttribute("data-play");
        if (dp) checkAndCaptureUrl(dp);
        setTimeout(ensureStreamUrl, 200);
      }
    }, true);
  } catch (e) {}

  // ─── SAFE AD API CHECKER (NEVER THROWS REFERENCE ERROR) ───
  function safeIsAdApi(url) {
    if (!url || typeof url !== "string") return false;
    const u = url.toLowerCase();
    if (u.includes(".m3u8") || u.includes(".mp4") || u.includes(".ts") || u.includes(".m4s")) return false;

    // Chặn triệt để các mạng quảng cáo và tracker rác (tránh ERR_BLOCKED_BY_CLIENT)
    if (
      u.includes("sharethis.com") ||
      u.includes("driverhugoverblown.com") ||
      u.includes("vhyohxarqz.in") ||
      u.includes("mayhapmonisms.com") ||
      u.includes("cloudflareinsights.com") ||
      u.includes("acscdn.com") ||
      u.includes("yougetwhatyoupayfor.net") ||
      u.includes("chaseherbalpasty.com") ||
      u.includes("streamxx.net/storage/embed_ads") ||
      u.includes("streamxx.net/ads") ||
      u.includes("streamxx.net/api/t/") ||
      u.includes("embed_ads") ||
      u.includes("pause_ads") ||
      u.includes("bom88") ||
      u.includes("tin888") ||
      u.includes("net88") ||
      u.includes("gem88") ||
      u.includes("tvc_") ||
      u.includes("/assets/tvc/") ||
      u.includes("tvc-pre-roll")
    ) {
      return true;
    }

    if (u.includes("_rsc") || u.includes(".rsc") || u.includes("_next/") || u.includes(".js")) return false;
    try {
      if (typeof isAdApi === "function") return isAdApi(url);
      if (typeof window !== "undefined" && typeof window.isAdApi === "function") return window.isAdApi(url);
    } catch (e) {}

    return (
      u.includes("/ads") ||
      u.includes("/banners") ||
      u.includes("/banner/") ||
      u.includes("/api/widget/data")
    );
  }

  // ─── HOOK FETCH TRÊN TRANG CHÍNH & CHẶN API BANNER ───
  const origFetchMain = window.fetch;
  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input?.url || "";
    if (safeIsAdApi(url)) {
      console.log("[Web Enhancer] Đã chặn triệt để API banner:", url);
      const emptyPayload = JSON.stringify({
        status: 200,
        success: true,
        version: 1,
        items: [],
        data: [],
        banners: [],
        result: [],
        notificationsMovie: [],
        notificationsOther: [],
        unreadCountMovie: 0,
        unreadCountOther: 0
      });
      if (typeof Response !== "undefined") {
        return new Response(emptyPayload, {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
      return {
        status: 200,
        ok: true,
        headers: { get: (h) => (h && h.toLowerCase() === "content-type" ? "application/json" : null) },
        json: async () => JSON.parse(emptyPayload),
        text: async () => emptyPayload,
        clone: function () { return this; }
      };
    }
    try {
      const mockRes = typeof getRophimMockResponse === "function"
        ? getRophimMockResponse(url, init)
        : (typeof window !== "undefined" && typeof window.getRophimMockResponse === "function" ? window.getRophimMockResponse(url, init) : null);
      if (mockRes) return mockRes;
    } catch (e) {}
    try {
      if (init && init.headers) {
        if (typeof init.headers.get === "function") {
          const a = init.headers.get("Authorization") || init.headers.get("authorization");
          if (a && a.includes("cinema-pro-vip")) {
            const realTok = typeof window !== "undefined" && window.localStorage ? window.localStorage.getItem("guestAccessToken") : null;
            if (realTok && !realTok.includes("cinema-pro-vip")) {
              init.headers.set("Authorization", "Bearer " + realTok);
            } else if (typeof init.headers.delete === "function") {
              init.headers.delete("Authorization");
              init.headers.delete("authorization");
            } else {
              init.headers.set("Authorization", "");
            }
          }
        } else if (typeof init.headers === "object") {
          const a = init.headers.Authorization || init.headers.authorization;
          if (a && String(a).includes("cinema-pro-vip")) {
            const realTok = typeof window !== "undefined" && window.localStorage ? window.localStorage.getItem("guestAccessToken") : null;
            if (realTok && !realTok.includes("cinema-pro-vip")) {
              init.headers.Authorization = "Bearer " + realTok;
            } else {
              delete init.headers.Authorization;
              delete init.headers.authorization;
            }
          }
        }
      }
    } catch (e) {}
    try {
      const isFetchCommentSubmit = url && (typeof url === "string") && (url.includes("/comments") || url.includes("/api/v1/comments")) &&
        !url.includes("/comments/movie/") && !url.includes("/reactions") && !url.includes("/like") &&
        !url.includes("/get-child-comments") && !url.includes("/report") &&
        (Boolean(init && init.body) || (init && init.method && init.method.toUpperCase() === "POST"));
      
      if (isFetchCommentSubmit) {
        let realTok = "";
        let realUserId = null;
        try {
          if (typeof window !== "undefined" && window.localStorage) {
            const h = window.location.hostname || "";
            const cached = window.localStorage.getItem("cinema_pro_real_user_" + h) || window.localStorage.getItem("cinema_pro_real_user");
            if (cached) {
              const u = JSON.parse(cached);
              if (u && u.access_token) {
                realTok = u.access_token;
                realUserId = u.id;
              }
            }
            if (!realTok) realTok = window.localStorage.getItem("guestAccessToken") || "";
          }
        } catch(e) {}

        if (init && typeof init === "object") {
          init.headers = init.headers || {};
          if (realTok && !realTok.includes("cinema-pro-vip")) {
            if (typeof init.headers.set === "function") {
              init.headers.set("Authorization", "Bearer " + realTok);
            } else if (typeof init.headers === "object") {
              init.headers["Authorization"] = "Bearer " + realTok;
            }
          }
          if (init.body && typeof init.body === "string" && realUserId) {
            try {
              const parsed = JSON.parse(init.body);
              if (parsed && typeof parsed === "object") {
                parsed.userId = realUserId;
                init.body = JSON.stringify(parsed);
              }
            } catch(e) {}
          }
        }
      }
    } catch(e) {}
    checkAndCaptureUrl(url);
    const fetchPromise = origFetchMain.apply(this, arguments);
    try {
      fetchPromise.then(res => {
        try {
          const clone = res.clone();
          clone.text().then(txt => {
            if (txt && (txt.includes(".m3u8") || txt.includes("/hls/") || txt.includes(".mpd") || txt.includes(".mp4"))) {
              const found = findStreamMatches(txt);
              found.forEach(u => checkAndCaptureUrl(u));
            }
          }).catch(() => {});
        } catch (e) {}
      }).catch(() => {});
    } catch (e) {}
    try {
      if (typeof handleRophimFetchResponse === "function") {
        return handleRophimFetchResponse(fetchPromise, url, init);
      }
      if (typeof window !== "undefined" && typeof window.handleRophimFetchResponse === "function") {
        return window.handleRophimFetchResponse(fetchPromise, url, init);
      }
    } catch (e) {}
    return fetchPromise;
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

    const origSetRequestHeader = xhr.setRequestHeader;
    xhr.setRequestHeader = function (header, value) {
      try {
        if (header && typeof header === "string" && header.toLowerCase() === "authorization") {
          if (value && typeof value === "string" && value.includes("cinema-pro-vip")) {
            const realTok = typeof window !== "undefined" && window.localStorage ? window.localStorage.getItem("guestAccessToken") : null;
            if (realTok && !realTok.includes("cinema-pro-vip")) {
              value = "Bearer " + realTok;
            } else {
              return;
            }
          }
        }
      } catch (e) {}
      if (origSetRequestHeader) return origSetRequestHeader.apply(this, arguments);
    };
    
    const origSend = xhr.send;
    xhr.send = function (body) {
      if (safeIsAdApi(targetUrl)) {
        try {
          Object.defineProperty(xhr, "status", { value: 200, writable: false });
          Object.defineProperty(xhr, "responseText", { value: "{}", writable: false });
        } catch (e) {}
        return;
      }
      try {
        const isCommentSubmit = targetUrl && (targetUrl.includes("/comments") || targetUrl.includes("/api/v1/comments")) &&
          !targetUrl.includes("/comments/movie/") && !targetUrl.includes("/reactions") && !targetUrl.includes("/like") &&
          !targetUrl.includes("/get-child-comments") && !targetUrl.includes("/report");
        
        if (isCommentSubmit) {
          xhr._cpro_sent_body = body;
          xhr._cpro_target_url = targetUrl;

          let realTok = "";
          let realUserId = null;
          try {
            if (typeof window !== "undefined" && window.localStorage) {
              const h = window.location.hostname || "";
              const cached = window.localStorage.getItem("cinema_pro_real_user_" + h) || window.localStorage.getItem("cinema_pro_real_user");
              if (cached) {
                const u = JSON.parse(cached);
                if (u && u.access_token) {
                  realTok = u.access_token;
                  realUserId = u.id;
                }
              }
              if (!realTok) realTok = window.localStorage.getItem("guestAccessToken") || "";
            }
          } catch(e) {}

          if (realTok && !realTok.includes("cinema-pro-vip") && origSetRequestHeader) {
            try {
              origSetRequestHeader.call(xhr, "Authorization", "Bearer " + realTok);
            } catch (e) {}
          }

          if (body && typeof body === "string") {
            try {
              const parsed = JSON.parse(body);
              if (parsed && typeof parsed === "object") {
                if (realUserId) parsed.userId = realUserId;
                body = JSON.stringify(parsed);
                xhr._cpro_parsed_body = parsed;
              }
            } catch(e) {}
          }
        }
      } catch(e) {}
      try {
        const mockStr = typeof getRophimMockXhr === "function"
          ? getRophimMockXhr(targetUrl, body)
          : (typeof window !== "undefined" && typeof window.getRophimMockXhr === "function" ? window.getRophimMockXhr(targetUrl, body) : null);
        if (mockStr) {
          try {
            let parsedObj = null;
            try { parsedObj = JSON.parse(mockStr); } catch (e) {}
            Object.defineProperty(xhr, "readyState", { value: 4, configurable: true, writable: true });
            Object.defineProperty(xhr, "status", { value: 200, configurable: true, writable: true });
            Object.defineProperty(xhr, "statusText", { value: "OK", configurable: true, writable: true });
            Object.defineProperty(xhr, "responseText", { value: mockStr, configurable: true, writable: true });
            Object.defineProperty(xhr, "responseURL", { value: targetUrl, configurable: true, writable: true });
            Object.defineProperty(xhr, "response", {
              get: function () {
                if (this.responseType === "json") return parsedObj;
                if (this.responseType === "text") return mockStr;
                return parsedObj !== null ? parsedObj : mockStr;
              },
              configurable: true
            });
            xhr.getAllResponseHeaders = function () {
              return "content-type: application/json; charset=utf-8";
            };
            xhr.getResponseHeader = function (h) {
              if (h && h.toLowerCase() === "content-type") return "application/json; charset=utf-8";
              return null;
            };
            setTimeout(() => {
              if (typeof xhr.onreadystatechange === "function") {
                try { xhr.onreadystatechange(new Event("readystatechange")); } catch (e) {}
              }
              xhr.dispatchEvent(new Event("readystatechange"));
              if (typeof xhr.onload === "function") {
                try { xhr.onload(new Event("load")); } catch (e) {}
              }
              xhr.dispatchEvent(new Event("load"));
              if (typeof xhr.onloadend === "function") {
                try { xhr.onloadend(new Event("loadend")); } catch (e) {}
              }
              xhr.dispatchEvent(new Event("loadend"));
            }, 5);
          } catch (e) {}
          return;
        }
      } catch (e) {}
      xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
          try {
            if (typeof handleRophimXhrResponse === "function") {
              handleRophimXhrResponse(xhr, targetUrl);
            } else if (typeof window !== "undefined" && typeof window.handleRophimXhrResponse === "function") {
              window.handleRophimXhrResponse(xhr, targetUrl);
            }
          } catch (e) {}
        }
      });
      xhr.addEventListener("load", function () {
        try {
          if (xhr.responseText && (xhr.responseText.includes(".m3u8") || xhr.responseText.includes("/hls/") || xhr.responseText.includes(".mpd") || xhr.responseText.includes(".mp4"))) {
            const found = findStreamMatches(xhr.responseText);
            found.forEach(u => checkAndCaptureUrl(u));
          }
        } catch (e) {}
        try {
          if (typeof handleRophimXhrResponse === "function") {
            handleRophimXhrResponse(xhr, targetUrl);
          } else if (typeof window !== "undefined" && typeof window.handleRophimXhrResponse === "function") {
            window.handleRophimXhrResponse(xhr, targetUrl);
          }
        } catch (e) {}
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

  if (typeof window !== "undefined") {
    window.unwrapStreamUrl = typeof unwrapStreamUrl === "function" ? unwrapStreamUrl : undefined;
    window.ensureStreamUrl = typeof ensureStreamUrl === "function" ? ensureStreamUrl : undefined;
    window.isNoRefererCdn = typeof isNoRefererCdn === "function" ? isNoRefererCdn : undefined;
    window.capturedStreamUrl = typeof capturedStreamUrl !== "undefined" ? capturedStreamUrl : "";
    window.getCapturedStreamUrl = () => (typeof capturedStreamUrl !== "undefined" && capturedStreamUrl) || (typeof window !== "undefined" && window.capturedStreamUrl) || "";
  }


  // Export to window for modular extension architecture
  window.unwrapStreamUrl = typeof unwrapStreamUrl === "function" ? unwrapStreamUrl : undefined;
  window.ensureStreamUrl = typeof ensureStreamUrl === "function" ? ensureStreamUrl : undefined;
  window.isNoRefererCdn = typeof isNoRefererCdn === "function" ? isNoRefererCdn : undefined;
  window.capturedStreamUrl = typeof capturedStreamUrl !== "undefined" ? capturedStreamUrl : "";
  window.getCapturedStreamUrl = typeof getCapturedStreamUrl === "function" ? getCapturedStreamUrl : () => window.capturedStreamUrl || "";
})();
