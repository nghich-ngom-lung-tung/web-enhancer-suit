// ==UserScript==
// @name         BanhTV VIP & Cinema Pro Suite
// @namespace    http://tampermonkey.net/
// @version      5.2
// @description  Chặn quảng cáo Bánh TV + Sniff M3U8 PotPlayer/VLC + Skip Intro 85s + Anime OLED HDR rực rỡ
// @author       nghich-ngom-lung-tung
// @match        *://*.banhtv.net/*
// @match        *://banhtv.net/*
// @match        *://*.banhtv.cc/*
// @match        *://banhtv.cc/*
// @match        *://*.streamvsmov.com/*
// @match        *://streamvsmov.com/*
// @match        *://*.streamvsmov.net/*
// @match        *://streamvsmov.net/*
// @match        *://*.vsmov.com/*
// @match        *://vsmov.com/*
// @match        *://*.vsmov.net/*
// @match        *://vsmov.net/*
// @match        *://*.streamc.xyz/*
// @match        *://streamc.xyz/*
// @match        *://embed*.streamc.xyz/*
// @match        *://*.stream*.xyz/*
// @match        *://stream*.xyz/*
// @match        *://*.stream*.top/*
// @match        *://stream*.top/*
// @match        *://*.stream*.net/*
// @match        *://stream*.net/*
// @match        *://*.stream*.org/*
// @match        *://stream*.org/*
// @match        *://*.stream*.cc/*
// @match        *://stream*.cc/*
// @match        *://*.stream*.co/*
// @match        *://stream*.co/*
// @match        *://*.goatembed.com/*
// @match        *://goatembed.com/*
// @match        *://*.emturbovid.com/*
// @match        *://emturbovid.com/*
// @match        *://*.turboviplay.com/*
// @match        *://turboviplay.com/*
// @match        *://*.streamtape.com/*
// @match        *://streamtape.com/*
// @match        *://*.streamtape.net/*
// @match        *://streamtape.net/*
// @match        *://*.doodstream.com/*
// @match        *://doodstream.com/*
// @match        *://*.dood.*/*
// @match        *://dood.*/*
// @match        *://*.nguonc.com/*
// @match        *://nguonc.com/*
// @match        *://api.nguonc.com/*
// @match        *://*.phimapi.com/*
// @match        *://phimapi.com/*
// @match        *://player.phimapi.com/*
// @match        *://*.2embed.cc/*
// @match        *://2embed.cc/*
// @match        *://*.2embed.to/*
// @match        *://2embed.to/*
// @match        *://*.vidsrc.to/*
// @match        *://vidsrc.to/*
// @match        *://*.vidsrc.me/*
// @match        *://vidsrc.me/*
// @match        *://*.vidsrc.net/*
// @match        *://vidsrc.net/*
// @match        *://*.streamwish.to/*
// @match        *://streamwish.to/*
// @match        *://*.streamwish.com/*
// @match        *://streamwish.com/*
// @match        *://*.filelions.to/*
// @match        *://filelions.to/*
// @match        *://*.filelions.com/*
// @match        *://filelions.com/*
// @match        *://*.vidcdn.pro/*
// @match        *://vidcdn.pro/*
// @match        *://*.vidembed.cc/*
// @match        *://vidembed.cc/*
// @match        *://*.superembed.stream/*
// @match        *://superembed.stream/*
// @match        *://*.streamz.ws/*
// @match        *://streamz.ws/*
// @match        *://*.streamhub.to/*
// @match        *://streamhub.to/*
// @match        *://*.cdnfastter.xyz/*
// @match        *://cdnfastter.xyz/*
// @match        *://livecdn.cdnfastter.xyz/*
// @match        *://live.khoga.space/*
// @match        *://*.khoga.space/*
// @match        *://khoga.space/*
// @match        *://*.vcdn.cloud/*
// @match        *://vcdn.cloud/*
// @match        *://embed.apistatscore.com/*
// @allFrames    true
// @run-at       document-start
// @grant        none
// @license      MIT
// @icon         https://rophim1.vip/apple-icon.png
// @homepageURL  https://github.com/nghich-ngom-lung-tung/web-enhancer-suit
// @downloadURL  https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/banhtv.user.js
// @updateURL    https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/banhtv.user.js
// ==/UserScript==

(function () {
  "use strict";


  function unwrapStreamUrl(url) {
    if (!url || typeof url !== "string") return "";
    let clean = url.trim();
    clean = clean.split("\\/").join("/").replace(/&amp;/g, "&");
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
        var re = new RegExp("https?://[^\\s\"'<>,;)\\]]+", "g");
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
    return origFetchMain.apply(this, arguments);
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



  // ─── ANTI-ADBLOCK PROBE DEFUSER & POPUP NEUTRALIZER ───
  try {
    localStorage.setItem("ro_probe_", "9999999999999");
    localStorage.setItem("popup_last_shown", "9999999999999");
    localStorage.setItem("corner_start_popup_dismissed", "9999999999999");
    localStorage.setItem("popup_shown", "true");
    localStorage.setItem("is_banner_popup", "1");
    localStorage.setItem("giovang_tvc_pre_roll_daily", JSON.stringify({ date: "2099-12-31", count: 99999 }));
    const origSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (
        key === "probe_until" ||
        key === "adblock_detected" ||
        key === "popup_last_shown" ||
        key === "corner_start_popup_dismissed" ||
        key === "giovang_tvc_pre_roll_daily"
      ) return;
      return origSetItem.apply(this, arguments);
    };
    const origGetItem = Storage.prototype.getItem;
    Storage.prototype.getItem = function (key) {
      if (key === "popup_last_shown" || key === "corner_start_popup_dismissed") return "9999999999999";
      if (key === "giovang_tvc_pre_roll_daily") return JSON.stringify({ date: "2099-12-31", count: 99999 });
      return origGetItem.apply(this, arguments);
    };
  } catch (e) {}

  // Unblock right-click and selection blocking scripts
  ["contextmenu", "copy", "cut", "selectstart"].forEach(ev => {
    document.addEventListener(ev, e => e.stopPropagation(), true);
  });

  try {
    const origOpen = window.open;
    window.open = function (url) {
      if (typeof url === "string") {
        const isSafe =
          url.startsWith("/") ||
          url.includes(location.hostname) ||
          url.includes("rophim") ||
          url.includes("motchill") ||
          url.includes("nangcuc") ||
          url.includes("animevietsub") ||
          url.includes("subnhanh") ||
          url.includes("phimmoi") ||
          url.includes("hoathinh3d") ||
          url.includes("dongphim") ||
          url.includes("tvhay") ||
          url.includes("animehay") ||
          url.includes("vuighe") ||
          url.includes("bilutv") ||
          url.includes("motphim") ||
          url.includes("mephim") ||
          url.includes("ghienphim") ||
          url.includes("fullphim") ||
          url.includes("phimhay") ||
          url.includes("animetvn") ||
          url.includes("hhkungfu") ||
          url.includes("hhpanda") ||
          url.includes("vietsubtv") ||
          url.includes("phim247") ||
          url.includes("phimhd") ||
          url.includes("phimbathu") ||
          url.includes("phimvang") ||
          url.includes("banhtv") ||
          url.includes("hdonline") ||
          url.includes("chillhay") ||
          url.includes("xemphimplus") ||
          url.includes("topsub") ||
          url.includes("ssphim") ||
          url.includes("youtube.com") ||
          url.includes("youtu.be");
        if (!isSafe) {
          console.log("[Cinema Pro] Đã chặn popup quảng cáo:", url);
          return null;
        }
      }
      return origOpen.apply(this, arguments);
    };
  } catch (e) {}

  function isAdApi(url) {
    if (!url || typeof url !== "string") return false;
    const u = url.toLowerCase();
    // Chặn tuyệt đối video ads & TVC pre-roll kể cả file .mp4
    if (u.includes("tvc_") || u.includes("/assets/tvc/") || u.includes("tvc-pre-roll") || u.includes("tvc_net88") || u.includes("tvc_gem88")) return true;
    if (u.includes(".m3u8") || u.includes(".mp4") || u.includes(".ts") || u.includes(".m4s")) return false;
    return (
      u.includes("/ads") ||
      u.includes("/banners") ||
      u.includes("/banner/") ||
      u.includes("advertising") ||
      u.includes("sponsor") ||
      u.includes("popunder") ||
      u.includes("catfish") ||
      u.includes("sspp") ||
      u.includes("154.82.") ||
      u.includes("9922") ||
      u.includes("vsbet") ||
      u.includes("megatech.global") ||
      u.includes("gmnc.xyz") ||
      u.includes("ovn-banner") ||
      u.includes("unistar") ||
      u.includes("devqc") ||
      u.includes("hitclub") ||
      u.includes("15.235.211.192") ||
      u.includes("xoilacz") ||
      u.includes("top-nha-cai") ||
      u.includes("/images/company/")
    );
  }

  function nukeAdElements(notify = false) {
    let count = 0;
    const adSelectors = [
      // Catfish & Fixed Ads
      '.catfish', '#catfish', '.catfish-banner', '#catfish-banner', '[class*="catfish"]', '[id*="catfish"]',
      '.sspp-area', '[class*="sspp-area"]', '[class*="sspp_area"]', '[class*="sspp-"]',
      '.display-single', '[class*="display-single"]', '.is-demo', '[class*="is-demo"]',
      '.is-image', 'div[class*="is-image"]',

      // Giovang Popups & Ads
      '#banner_popup', '.banner_popup', '.banner_inner', '.banner_cursor',
      '.grid_banner_devqc', '.devqc-manager-resources', '.w-banner_devqc-bd', '.banner_devqc-bdn-button',
      '.devqc-catfish', '.gvbanner-catfish', '[class*="devqc"], [id*="devqc"]',
      '#banners-bottom-container', '.banners-bottom', '.banners-bottom-grid', '#open-banner-bottom',
      '.popup-menu', '#popupMenu', '.floating-balloon-container', '.popup-anim', '.popup-item', '[class*="popup-item"]',
      '.fixture-banner', '[class*="fixture-banner"]', '.balloon-wrapper', '[class*="balloon-wrapper"]', '.btn-balloon', '[class*="btn-balloon"]', '.balloon-img-box',
      'a[data-brand-id]', 'a.seo4s-resolve-link', 'a[class*="seo4s"]',
      '.bg-modaltrungthuong', '.modal-trungthuong', '.close-modal-trungthuong',
      '.banner-match', '.gv-skeleton-banner', '[class*="gv-skeleton-banner"]',
      'img[src*="giovang-popup"]',
      '.tvc-pre-roll', '.video-wrapper.tvc-pre-roll', '.tvc-pre-roll__video', '.tvc-pre-roll__skip', '.tvc-pre-roll__link-overlay', '[class*="tvc-pre-roll"]',
      'video[src*="tvc_"]', 'video[src*="assets/tvc/"]',

      // ChuoiChien Video Player Banner & Gambling Overlays
      '.banner-player', '.banner-container', '.banner-content', '.banner-image',
      '[class*="banner-player"]', '[class*="banner-container"]', '[class*="banner-content"]', '[class*="banner-image"]',
      '.banner-content.active', '[class*="banner-content"][class*="active"]',
      '.bet-button', '.bet-buttons', '[class*="bet-button"]', '[class*="bet-buttons"]', '[class*="bet-btn"]',
      '[data-v-cede0d5b]',
      'img[src*="banner_player"]', 'img[src*="FB88"]', 'img[src*="fb88"]', 'img[src*="net88"]', 'img[src*="NET88"]', 'img[src*="xBet"]',

      // ThapCam, Khoga Popups, Balloons & Placements
      '#corner-start-popup', '.corner-start-popup', '.corner-start-popup-backdrop', '.corner-start-popup-content', '.corner-start-popup-inner',
      '.corner-popup-wrap', '.corner-popup-box', '[class*="corner-popup"]', '[id*="corner-popup"]',
      '.block-balloon-right', '.block-balloon-left', '.close-balloon-left', '.close-balloon-right', '[class*="balloon-"]',
      '.bookmaker-title', '.tf-section', '.tf-theme-style4', '[class*="tf-s3-"]', '[class*="tf-section"]',
      '.fixed-ads', '.fixed-ads-1', '.block-fixed-ads-1', '[class*="block-fixed-ads"]', '[class*="fixed-ads"]',
      '.live-ads-temp-1', '.live-ads-temp-2', '.live-ads-temp-3', '.live-ads-temp-4', '.live-ads-temp-5', '[class*="live-ads-temp"]',
      '.left-ads', '.right-ads',
      '.adspot-wrap', '.adspot-1', '.adspot-2', '[class*="adspot-"]', '[class*="adspot"]', 'ins[data-revive-id]',
      'img[src*="1280x1280px"]', 'img[src*="balloon_1111"]', 'a[href*="tructiephotlink"]', 'a[href*="branchseo"]', 'a[href*="/mlink/"]', 'a[href*="1-1-1-1"]',
      '[class*="banner-pos-"]', '[class*="ad-strip-pos"]', '[class*="ad-popup-modal"]', '[class*="banner-pos"]', '[id*="banner-pos"]', 'a[href*="fb88.com"]',

      // Xoilac & Betting General
      '.xlz-ads-item', '.block-catfish', '.xlz-btn-8xbet', '[class*="xlz-ads"]',
      '.top-ads', '.ads-728-90',
      '.odds-comp-logo', 'a.odds-comp-logo', '.grid-match__odds',
      '.marquee-container', '.marquee-box', '[class*="marquee-container"]',
      '.odds-button', 'div[class*="odds-button"]', '[class*="odds-button"]',
      '.teambox__odds', '[class*="teambox__odds"]', '.btn-odds', '[class*="btn-odds"]',
      '.match-detail__offer', '.offer__buttons', '.offer__bet__col', '[class*="match-detail__offer"]',
      '.block-int', '.block-k',
      'img[src*="/images/company/"]', 'img[src*="company"]', 'img[src*="21-1.png"]', 'img[alt="company"]',
      'a[href*="15.235.211.192"]', 'a[href*="top-nha-cai"]', 'a[href*="xoilacz"]',
      'img[src*="hit.club"]', 'img[src*="go88"]', 'img[src*="sun.win"]',
      'a[href*="154.82."]', 'a[href*="2138046"]', 'a[href*="9922"]',
      'img[src*="/media/"][src*=".gif"]',
      '[class*="bottom-ads"]', '[class*="bottom_ads"]', '[class*="bottom-banner"]', '[class*="bottom_banner"]',
      '[id*="bottom-ads"]', '[id*="bottom_ads"]', '[id*="bottom-banner"]', '[id*="bottom_banner"]',
      '[class*="footer-ads"]', '[class*="footer_ads"]', '[class*="footer-banner"]', '[class*="footer_banner"]',
      '[class*="floating-banner"]', '[class*="float-ads"]', '[class*="sticky-ads"]', '[class*="sticky-banner"]',
      '[class*="qc-bottom"]', '[id*="qc-bottom"]', '[class*="banner-ads"]', '[id*="banner-ads"]',
      'a[href*="vsbet"]', 'a[href*="bet88"]', 'a[href*="colatv"]', 'a[href*="colascore"]', 'a[href*="kubet"]',
      'a[href*="casino"]', 'a[href*="fun88"]', 'a[href*="w88"]', 'a[href*="fb88"]', 'a[href*="nohu"]',
      'a[href*="taixiu"]', 'a[href*="gamebai"]', 'a[href*="keonhacai"]',
      'a[href*="hitclub"]', 'a[href*="hit.club"]', 'a[href*="go88"]', 'a[href*="sunwin"]'
    ];

    try {
      // Dọn sạch thuộc tính quảng cáo ký sinh trên livestream_widget
      const lw = document.querySelector(".livestream_widget");
      if (lw) {
        if (lw.hasAttribute("data-brand-id")) lw.removeAttribute("data-brand-id");
        if (lw.hasAttribute("data-seo4s-resolve")) lw.removeAttribute("data-seo4s-resolve");
        if (lw.hasAttribute("data-type")) lw.removeAttribute("data-type");
        if (lw.getAttribute("data-button-ads") !== "[]") lw.setAttribute("data-button-ads", "[]");
        if (lw.getAttribute("data-tvc") !== "[]") lw.setAttribute("data-tvc", "[]");
      }

      // Tự động bỏ qua và kết thúc video TVC pre-roll nếu xuất hiện
      const tvcVideo = document.querySelector(".tvc-pre-roll__video, video[src*='tvc_'], video[src*='assets/tvc/']");
      if (tvcVideo) {
        try {
          tvcVideo.muted = true;
          tvcVideo.currentTime = tvcVideo.duration || 999;
          tvcVideo.dispatchEvent(new Event("ended"));
        } catch (e) {}
      }
      const skipBtn = document.querySelector(".tvc-pre-roll__skip button, .tvc-pre-roll__skip, [class*='skip'] button");
      if (skipBtn && typeof skipBtn.click === "function") {
        try { skipBtn.click(); } catch (e) {}
      }

      if (document.querySelectorAll) {
        document.querySelectorAll(adSelectors.join(",")).forEach(el => {
          if (
            el.id === "ro-vip-hub" ||
            (el.closest && el.closest("#ro-vip-hub")) ||
            el.classList.contains("livestream_widget") ||
            el.classList.contains("giovang-fixture-player-mount") ||
            el.classList.contains("giovang-fixture-player-shell") ||
            el.classList.contains("livestream_widget__content")
          ) {
            return;
          }
          // Bảo vệ video stream thể thao không bao giờ bị xóa nhầm
          if (el.tagName === "VIDEO" && !el.classList.contains("tvc-pre-roll__video") && !el.src?.includes("tvc")) {
            return;
          }
          const parent = (el.closest && el.closest('.sspp-area, div[class*="sspp"], div[style*="fixed"]:not(.livestream_widget):not(.giovang-fixture-player-shell), div[style*="sticky"], div[class*="catfish"], #banner_popup, .banner_popup, #corner-start-popup, .corner-start-popup, [class*="devqc"], .banner-player, .banner-container, .banner-content, .bet-button, .bet-buttons, [class*="bet-button"], .corner-popup-wrap, .marquee-container, .fixture-banner, [class*="balloon-wrapper"], [class*="banner-pos-"], [class*="ad-popup-modal"], .match-detail__offer, .teambox__odds')) || el;
          if (parent) {
            if (parent === lw || (lw && parent.contains && parent.contains(lw))) return;
            try {
              parent.style.setProperty("display", "none", "important");
              parent.style.setProperty("visibility", "hidden", "important");
              parent.style.setProperty("height", "0", "important");
            } catch (e) {}
            if (typeof parent.remove === "function") {
              parent.remove();
              count++;
            }
          }
        });
      }

      // Chuối Chiên TV: Quét sạch các nút cược theo nội dung text (Cược FB88, Cược Net-88, Cược xBet79, ĐUA TOP THƯỞNG...)
      if (document.querySelectorAll) {
        document.querySelectorAll("button, div, span, a").forEach(el => {
          const txt = (el.textContent || "").trim();
          if (
            (txt.startsWith("Cược FB88") || txt.startsWith("Cược Net-88") || txt.startsWith("Cược xBet") || txt.includes("Cược 8XBET") || txt.includes("ĐUA TOP THƯỞNG")) &&
            !el.classList.contains("livestream_widget") && !(el.closest && el.closest(".livestream_widget"))
          ) {
            try {
              el.style.setProperty("display", "none", "important");
              const p = (el.closest && el.closest('.bet-button, .bet-buttons, [class*="bet-button"], .banner-content, [class*="banner-content"]')) || el;
              p.style.setProperty("display", "none", "important");
              p.style.setProperty("visibility", "hidden", "important");
              p.style.setProperty("height", "0", "important");
              if (typeof p.remove === "function") {
                p.remove();
                count++;
              }
            } catch (e) {}
          }
        });
      }

      if (document.body) {
        if (document.body.classList.contains("modal-open")) {
          document.body.classList.remove("modal-open");
        }
        if (document.body.classList.contains("corner-start-popup-open")) {
          document.body.classList.remove("corner-start-popup-open");
        }
        if (document.body.style.overflow === "hidden") {
          document.body.style.overflow = "";
        }
      }

      if (typeof window.getComputedStyle === "function" && document.querySelectorAll) {
        document.querySelectorAll("div, footer, section, aside").forEach(el => {
          if (el.id === "ro-vip-hub" || (el.closest && el.closest("#ro-vip-hub"))) return;
          const s = window.getComputedStyle(el);
          if (s && (s.position === "fixed" || s.position === "sticky")) {
            const bottomVal = parseInt(s.bottom, 10);
            if (!isNaN(bottomVal) && bottomVal <= 25 && el.offsetHeight > 20 && el.offsetHeight < 260) {
              const html = (el.innerHTML || "").toLowerCase();
              if (
                el.querySelector && el.querySelector("img, a, iframe") &&
                (html.includes("bet") || html.includes("cola") || html.includes("88") ||
                 html.includes("casino") || html.includes("game") || html.includes("đại lý") ||
                 html.includes("bóng đá") || html.includes("tỷ số") || html.includes("nohu") ||
                 html.includes("taixiu") || html.includes("adv") || html.includes("banner") ||
                 parseInt(s.zIndex, 10) > 1000)
              ) {
                if (typeof el.remove === "function") {
                  el.remove();
                  count++;
                }
              }
            }
          }
        });
      }
    } catch (e) {}

    if (notify && typeof showToast === "function") {
      showToast(count > 0 ? ("Đã quét sạch " + count + " banner quảng cáo!") : "Đã quét sạch banner!");
    }
  }

  // Tự động quét sạch banner quảng cáo ngầm
  try {
    nukeAdElements();
    setInterval(nukeAdElements, 1000);
    if (window.MutationObserver) {
      new MutationObserver(() => nukeAdElements()).observe(document.documentElement || document.body, { childList: true, subtree: true });
    }
  } catch (e) {}


  // ═══════════════════════════════════════════════════════════════
  // 3. CSS STYLING & THEATER MODE INJECTION
  // ═══════════════════════════════════════════════════════════════
  const css = "/* ═══════════════════════════════════════════════════════════════\n   Cinema Pro Suite - Adblock & Anti-Banner CSS\n   Diệt sạch banner catfish, popup, cá cược, video ads\n   ═══════════════════════════════════════════════════════════════ */\n\n/* Xóa sạch mọi container banner quảng cáo */\n.ad-container, .ads-holder, .banner-left, .banner-right,\ndiv[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"],\n.ads-wrapper, #chancoc, .modal-adblock, .adv-holder, .pm-ads,\n.hh3d-ads, .dp-ads, .tvhay-ads, .ah-ads, #box-ads, .ah-banner,\n.bl-ads, .a47-ads, .ophim-ads, .biphim-ads, .dhtv-ads,\n.motphim-ads, .mephim-ads, .ghienphim-ads, .fullphim-ads, .phimhay-ads,\n.atvn-ads, .hhkf-ads, .hhpanda-ads, .vst-ads, .p247-ads, .phd-ads, .pbh-ads,\n.pv-ads, .btv-ads, .hdo-ads, .chay-ads, .xpp-ads, .ts-ads, .ss-ads,\n[class*=\"ad_placement\"], [id*=\"google_ads\"], div[style*=\"z-index: 9999999\"],\ndiv[style*=\"zIndex: 9999999\"], div[style*=\"backdrop-filter: blur(25px)\"],\n\n/* Diệt sạch banner catfish, fixed bottom bar và cá cược */\n.catfish, #catfish, .catfish-banner, #catfish-banner, div[class*=\"catfish\"], div[id*=\"catfish\"],\ndiv[class*=\"bottom-ads\"], div[class*=\"bottom_ads\"], div[class*=\"bottom-banner\"], div[class*=\"bottom_banner\"],\ndiv[id*=\"bottom-ads\"], div[id*=\"bottom_ads\"], div[id*=\"bottom-banner\"], div[id*=\"bottom_banner\"],\ndiv[class*=\"footer-ads\"], div[class*=\"footer_ads\"], div[class*=\"footer-banner\"], div[class*=\"footer_banner\"],\ndiv[class*=\"floating-banner\"], div[class*=\"floating_banner\"], div[class*=\"float-ads\"], div[class*=\"float_ads\"],\ndiv[class*=\"sticky-ads\"], div[class*=\"sticky-banner\"], div[id*=\"sticky-ads\"], div[id*=\"sticky-banner\"],\ndiv[class*=\"qc_bottom\"], div[id*=\"qc_bottom\"], div[class*=\"qc-bottom\"], div[id*=\"qc-bottom\"],\ndiv[id*=\"box-bottom\"], div[class*=\"box-bottom\"], div[id*=\"ads_bottom\"], div[class*=\"ads_bottom\"],\ndiv[class*=\"banner_bottom\"], div[id*=\"banner_bottom\"], div[class*=\"banner-bottom\"], div[id*=\"banner-bottom\"],\ndiv[id*=\"floating_bottom\"], div[class*=\"floating_bottom\"], div[id*=\"float_bottom\"],\n\n/* Diệt tận gốc Banner Rophim, Thể thao, Giovang, Chuoichien & Thapcam */\n.sspp-area, [class*=\"sspp-area\"], [class*=\"sspp_area\"], [class*=\"sspp-\"],\n.display-single, [class*=\"display-single\"], .is-demo, [class*=\"is-demo\"],\n.is-image, div[class*=\"is-image\"],\n#banner_popup, .banner_popup, .banner_inner, .banner_cursor,\n.grid_banner_devqc, .devqc-manager-resources, .w-banner_devqc-bd, .banner_devqc-bdn-button,\n.devqc-catfish, .gvbanner-catfish, [class*=\"devqc\"], [id*=\"devqc\"],\n#banners-bottom-container, .banners-bottom, .banners-bottom-grid, #open-banner-bottom,\n.popup-menu, #popupMenu, .floating-balloon-container, .popup-anim, .popup-item,\na[data-brand-id], a.seo4s-resolve-link, a[class*=\"seo4s\"],\n.bg-modaltrungthuong, .modal-trungthuong, .close-modal-trungthuong,\n.tvc-pre-roll, .video-wrapper.tvc-pre-roll, .tvc-pre-roll__video, .tvc-pre-roll__skip, .tvc-pre-roll__link-overlay, [class*=\"tvc-pre-roll\"],\n.xlz-ads-item, .block-catfish, .xlz-btn-8xbet, [class*=\"xlz-ads\"],\n.odds-comp-logo, a.odds-comp-logo, .grid-match__odds,\n.marquee-container, .marquee-box, [class*=\"marquee-container\"],\n.odds-button, div[class*=\"odds-button\"], [class*=\"odds-button\"],\n.teambox__odds, [class*=\"teambox__odds\"], .btn-odds, [class*=\"btn-odds\"], .match-detail__offer, .offer__buttons, .offer__bet__col, [class*=\"match-detail__offer\"],\n.fixture-banner, [class*=\"fixture-banner\"], [class*=\"balloon-wrapper\"], [class*=\"btn-balloon\"], [class*=\"popup-item\"],\n[class*=\"banner-pos-\"], [class*=\"ad-strip-pos\"], [class*=\"ad-popup-modal\"], [class*=\"banner-pos\"], [id*=\"banner-pos\"],\n.top-ads, .ads-728-90, .adspot-wrap, .adspot-1, .adspot-2, [class*=\"adspot\"], [id*=\"adspot\"], ins[data-revive-id],\n.banner-match, .gv-skeleton-banner, [class*=\"gv-skeleton-banner\"],\n.banner-player, .banner-container, .banner-content, .banner-image,\n[class*=\"banner-player\"], [class*=\"banner-container\"], [class*=\"banner-content\"], [class*=\"banner-image\"],\n.banner-content.active, [class*=\"banner-content\"][class*=\"active\"],\n.bet-button, .bet-buttons, [class*=\"bet-button\"], [class*=\"bet-buttons\"], [class*=\"bet-btn\"],\n[data-v-cede0d5b],\n#corner-start-popup, .corner-start-popup, .corner-start-popup-backdrop, .corner-start-popup-content, .corner-start-popup-inner,\n.corner-popup-wrap, .corner-popup-box, [class*=\"corner-popup\"], [id*=\"corner-popup\"],\n.block-balloon-right, .block-balloon-left, .close-balloon-left, .close-balloon-right, [class*=\"balloon-\"],\n.bookmaker-title, .tf-section, .tf-theme-style4, [class*=\"tf-s3-\"], [class*=\"tf-section\"],\n.fixed-ads, .fixed-ads-1, .block-fixed-ads-1, [class*=\"block-fixed-ads\"], [class*=\"fixed-ads\"],\n.live-ads-temp-1, .live-ads-temp-2, .live-ads-temp-3, .live-ads-temp-4, .live-ads-temp-5, [class*=\"live-ads-temp\"],\n.left-ads, .right-ads,\nimg[src*=\"giovang-popup\"], img[src*=\"hit.club\"], img[src*=\"go88\"], img[src*=\"sun.win\"],\nimg[src*=\"1280x1280px\"], img[src*=\"balloon_1111\"], img[src*=\"FB88\"], img[src*=\"fb88\"], img[src*=\"banner_player\"],\nimg[src*=\"net88\"], img[src*=\"NET88\"], img[src*=\"xBet\"],\nimg[src*=\"/images/company/\"], img[src*=\"company\"], img[src*=\"21-1.png\"], img[alt=\"company\"],\na[href*=\"15.235.211.192\"], a[href*=\"top-nha-cai\"], a[href*=\"xoilacz\"], a[href*=\"fb88.com\"],\na[href*=\"154.82.\"], a[href*=\"2138046\"], a[href*=\"9922\"],\nimg[src*=\"/media/\"][src*=\".gif\"],\ndiv.slide:has(.sspp-area), div.slide:has(.display-single),\ndiv.fluid-gap:has(.sspp-area), div.fluid-gap:has(.display-single),\na[href*=\"vsbet\"], a[href*=\"bet88\"], a[href*=\"colatv\"], a[href*=\"colascore\"], a[href*=\"kubet\"], a[href*=\"fun88\"],\na[href*=\"w88\"], a[href*=\"fb88\"], a[href*=\"bk8\"], a[href*=\"casino\"], a[href*=\"nhacai\"], a[href*=\"nohu\"],\na[href*=\"taixiu\"], a[href*=\"gamebai\"], a[href*=\"keonhacai\"], a[href*=\"bongda\"], a[href*=\"link1s\"],\na[href*=\"tructiephotlink\"], a[href*=\"branchseo\"], a[href*=\"/mlink/\"], a[href*=\"1-1-1-1\"],\ndiv[style*=\"position: fixed\"][style*=\"bottom: 0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell),\ndiv[style*=\"position: fixed\"][style*=\"bottom:0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell),\ndiv[style*=\"position:fixed\"][style*=\"bottom: 0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell),\ndiv[style*=\"position:fixed\"][style*=\"bottom:0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell) {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  max-height: 0 !important;\n  pointer-events: none !important;\n  opacity: 0 !important;\n}\n\n/* Diệt tuyệt đối các Modal Popup & Floating Ads đè trang */\n#banner_popup, #banner_popup.show, div#banner_popup, div#banner_popup.show,\n.banner_popup, .banner_popup.show, div.banner_popup, div.banner_popup.show,\n#corner-start-popup, .corner-start-popup, .corner-start-popup-backdrop, .corner-start-popup-content,\n.corner-popup-wrap, .corner-popup-box,\n.banner-player, .banner-container, .banner-content, .banner-image,\n[class*=\"banner-player\"], [class*=\"banner-container\"], [class*=\"banner-content\"], [class*=\"banner-image\"],\n.banner-content.active, [class*=\"banner-content\"][class*=\"active\"],\n.bet-button, .bet-buttons, [class*=\"bet-button\"], [class*=\"bet-buttons\"], [class*=\"bet-btn\"],\n[data-v-cede0d5b],\n.modal-backdrop, .bg-modaltrungthuong, .modal-trungthuong,\n.floating-balloon-container, #popupMenu, .popup-menu, .popup-item, [class*=\"popup-item\"],\n.fixture-banner, [class*=\"fixture-banner\"], .balloon-wrapper, [class*=\"balloon-wrapper\"], .btn-balloon, [class*=\"btn-balloon\"],\n.grid_banner_devqc, .devqc-manager-resources, .w-banner_devqc-bd, .banner_devqc-bdn-button,\n.devqc-catfish, .gvbanner-catfish, [class*=\"devqc\"], [id*=\"devqc\"],\n.tvc-pre-roll, .video-wrapper.tvc-pre-roll, .tvc-pre-roll__video, .tvc-pre-roll__skip, .tvc-pre-roll__link-overlay,\n.marquee-container, .marquee-box, .odds-button,\n[class*=\"banner-pos-\"], [class*=\"ad-strip-pos\"], [class*=\"ad-popup-modal\"],\n.match-detail__offer, .offer__buttons, .offer__bet__col, [class*=\"match-detail__offer\"],\n.teambox__odds, [class*=\"teambox__odds\"], .btn-odds, [class*=\"btn-odds\"], .block-int, .block-k {\n  display: none !important;\n  visibility: hidden !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n  z-index: -999999 !important;\n  width: 0 !important;\n  height: 0 !important;\n  max-width: 0 !important;\n  max-height: 0 !important;\n}\n\n/* Đảm bảo khung Player bóng đá Giờ Vàng và các web thể thao luôn hiển thị nguyên vẹn */\n.livestream_widget, .giovang-fixture-player-shell, .giovang-fixture-player-mount, .livestream_widget__content {\n  display: block !important;\n  visibility: visible !important;\n  opacity: 1 !important;\n  pointer-events: auto !important;\n  height: auto !important;\n  max-height: none !important;\n}\n\nhtml, body {\n  overflow: auto !important;\n  position: static !important;\n}\n\n\n    .ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .btv-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n/* ═══════════════════════════════════════════════════════════════\n   Cinema Pro Suite - Theater Mode & OLED HDR CSS\n   ═══════════════════════════════════════════════════════════════ */\n\nvideo.ro-enhanced-hdr {\n  filter: contrast(1.10) saturate(1.25) brightness(1.04) !important;\n}\n\nbody.ro-theater-active {\n  background-color: #050608 !important;\n}\n\nbody.ro-theater-active header,\nbody.ro-theater-active footer,\nbody.ro-theater-active .sidebar,\nbody.ro-theater-active .sidebar-right,\nbody.ro-theater-active nav {\n  opacity: 0.1 !important;\n  transition: opacity 0.3s ease;\n}\n\nbody.ro-theater-active header:hover,\nbody.ro-theater-active footer:hover,\nbody.ro-theater-active nav:hover {\n  opacity: 1 !important;\n}\n\nbody.ro-theater-active .player-wrapper,\nbody.ro-theater-active .player-container,\nbody.ro-theater-active #player,\nbody.ro-theater-active #live-player-content,\nbody.ro-theater-active #embed-player,\nbody.ro-theater-active #iframe-stream,\nbody.ro-theater-active .col-player,\nbody.ro-theater-active iframe {\n  max-height: 88vh !important;\n  box-shadow: 0 10px 50px rgba(81, 240, 133, 0.25) !important;\n  border-radius: 14px;\n}\n\n\n/* ═══════════════════════════════════════════════════════════════\n   Cinema Pro Suite - VIP Hub UI CSS (Sleek Modern Glassmorphism)\n   ═══════════════════════════════════════════════════════════════ */\n\n#ro-vip-hub {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  z-index: 2147483647;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 10px;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n}\n\n#ro-hub-toggle {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #10b981 0%, #059669 100%);\n  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.45);\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #ffffff;\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n  user-select: none;\n}\n\n#ro-hub-toggle:hover {\n  transform: scale(1.1) rotate(6deg);\n  box-shadow: 0 6px 26px rgba(16, 185, 129, 0.65);\n}\n\n#ro-hub-toggle svg {\n  width: 24px;\n  height: 24px;\n}\n\n#ro-hub-menu {\n  display: none;\n  background: rgba(15, 23, 42, 0.95);\n  backdrop-filter: blur(14px);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 14px;\n  padding: 14px;\n  width: 290px;\n  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);\n  flex-direction: column;\n  gap: 8px;\n  color: #e2e8f0;\n}\n\n#ro-hub-menu.show {\n  display: flex;\n  animation: roFadeIn 0.2s ease-out;\n}\n\n@keyframes roFadeIn {\n  from { opacity: 0; transform: translateY(8px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.ro-menu-btn {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  color: #f1f5f9;\n  padding: 8px 12px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  text-align: left;\n}\n\n.ro-menu-btn:hover {\n  background: rgba(16, 185, 129, 0.18);\n  border-color: rgba(16, 185, 129, 0.4);\n  transform: translateX(-2px);\n}\n\n.ro-btn-left {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.ro-icon {\n  width: 15px;\n  height: 15px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n\n.ro-icon svg {\n  width: 100%;\n  height: 100%;\n}\n\n.ro-badge {\n  font-size: 10px;\n  padding: 2px 6px;\n  border-radius: 6px;\n  background: rgba(255, 255, 255, 0.1);\n  color: #a1a1aa;\n}\n\n#ro-stream-preview {\n  background: rgba(16, 185, 129, 0.12);\n  border: 1px solid rgba(16, 185, 129, 0.3);\n  border-radius: 8px;\n  padding: 6px 10px;\n  font-size: 11px;\n  word-break: break-all;\n  color: #51f085;\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;\n  display: none;\n  cursor: pointer;\n}\n\n.ro-dot {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: #10b981;\n  box-shadow: 0 0 8px #10b981;\n  margin-right: 6px;\n  vertical-align: middle;\n}\n\n.ro-toast {\n  position: fixed;\n  top: 24px;\n  right: 24px;\n  z-index: 2147483647;\n  background: rgba(15, 23, 42, 0.95);\n  color: #51f085;\n  padding: 10px 18px;\n  border-radius: 10px;\n  border: 1px solid rgba(81, 240, 133, 0.4);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);\n  font-size: 14px;\n  font-weight: 600;\n  pointer-events: none;\n  animation: roToastAnim 2.2s forwards;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n@keyframes roToastAnim {\n  0% { opacity: 0; transform: translateY(-10px); }\n  15% { opacity: 1; transform: translateY(0); }\n  80% { opacity: 1; transform: translateY(0); }\n  100% { opacity: 0; transform: translateY(-10px); }\n}";

  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  (document.head || document.documentElement).appendChild(styleEl);


  // ─── TOAST NOTIFICATIONS (ZERO EMOJIS, CLEAN TEXT) ───
  function showToast(msg) {
    const t = document.createElement("div");
    t.className = "ro-toast";
    t.innerHTML = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  // ─── VIP CONTROL HUB DOM CREATION ───
  function initVipHub() {
    if (document.getElementById("ro-vip-hub")) return;
    const hub = document.createElement("div");
    hub.id = "ro-vip-hub";
    hub.innerHTML = `
      <div id="ro-hub-menu">
        <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: #51f085; display: flex; justify-content: space-between; align-items: center;">
          <span class="ro-btn-left">
            <span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"/><line x1="7" x2="7" y1="2" y2="22"/><line x1="17" x2="17" y1="2" y2="22"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="2" x2="7" y1="7" y2="7"/><line x1="2" x2="7" y1="17" y2="17"/><line x1="17" x2="22" y1="17" y2="17"/><line x1="17" x2="22" y1="7" y2="7"/></svg></span>
            <span>BanhTV VIP & Cinema Pro Suite</span>
          </span>
          <span style="font-size: 11px; opacity: 0.7;">v5.2</span>
        </div>
        <div id="ro-stream-preview" style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 6px 10px; font-size: 11px; word-break: break-all; color: #51f085; font-family: monospace; display: none; cursor: pointer;" title="Bấm để copy link"></div>
        <button class="ro-menu-btn" id="ro-copym3u8-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span><span>Sao Chép Link Luồng</span></span>
          <span class="ro-badge">IDM/Pot</span>
        </button>
        <button class="ro-menu-btn" id="ro-m3ufile-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg></span><span>Tải Playlist .M3U</span></span>
          <span class="ro-badge">1-Click</span>
        </button>
        <button class="ro-menu-btn" id="ro-potplayer-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg></span><span>Mở PotPlayer</span></span>
          <span class="ro-badge">Direct</span>
        </button>
        <button class="ro-menu-btn" id="ro-vlc-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 2-8 15h12L10 2z"/><path d="M6 17h12v4H6z"/></svg></span><span>Mở VLC Player</span></span>
          <span class="ro-badge">Direct</span>
        </button>
        <button class="ro-menu-btn" id="ro-skipintro-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg></span><span>Bỏ Qua Intro 85s</span></span>
          <span class="ro-badge">S / I</span>
        </button>
        <button class="ro-menu-btn" id="ro-fullscreen-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></span><span>Toàn Màn Hình</span></span>
          <span class="ro-badge">Phím F</span>
        </button>
        <button class="ro-menu-btn" id="ro-hdr-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg></span><span>Anime OLED HDR</span></span>
          <span class="ro-badge">Phím E</span>
        </button>
        <button class="ro-menu-btn" id="ro-theater-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="4.5" rx="2"/><polyline points="2 9.5 22 9.5"/><line x1="12" x2="12" y1="4.5" y2="9.5"/></svg></span><span>Chế Độ Rạp Phim</span></span>
          <span class="ro-badge">Phím T</span>
        </button>
        <button class="ro-menu-btn" id="ro-nukeads-btn" style="border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="9" x2="15" y1="9" y2="15"/><line x1="15" x2="9" y1="9" y2="15"/></svg></span><span>Diệt Sạch Banner Rác</span></span>
          <span class="ro-badge" style="color: #f87171;">Phím X</span>
        </button>
        <div style="display: flex; gap: 8px; margin-top: 4px;">
          <button class="ro-menu-btn" id="ro-vol-down" style="flex: 1; justify-content: center;" title="Giảm âm lượng">
            <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></span><span>Giảm (↓)</span></span>
          </button>
          <button class="ro-menu-btn" id="ro-vol-up" style="flex: 1; justify-content: center;" title="Tăng âm lượng">
            <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></span><span>Tăng (↑)</span></span>
          </button>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="ro-menu-btn" id="ro-speed-down" style="flex: 1; justify-content: center;" title="Giảm tốc độ phát">
            <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" x2="19" y1="12" y2="12"/></svg></span><span>Chậm ([)</span></span>
          </button>
          <button class="ro-menu-btn" id="ro-speed-up" style="flex: 1; justify-content: center;" title="Tăng tốc độ phát">
            <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg></span><span>Nhanh (])</span></span>
          </button>
        </div>
      </div>
      <div id="ro-hub-toggle" title="Cinema Pro Control Hub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg></div>
    `;
    document.body.appendChild(hub);

    const toggle = hub.querySelector("#ro-hub-toggle");
    const menu = hub.querySelector("#ro-hub-menu");
    if (toggle && menu) {
      toggle.onclick = (e) => {
        e.stopPropagation();
        menu.classList.toggle("show");
      };
      document.addEventListener("click", () => menu.classList.remove("show"));
      menu.addEventListener("click", (e) => e.stopPropagation());
    }

    const bind = (id, fn) => {
      const el = hub.querySelector("#" + id) || document.getElementById(id);
      if (el) el.addEventListener("click", fn);
    };

    bind("ro-stream-preview", copyM3u8);
    bind("ro-potplayer-btn", openPotPlayer);
    bind("ro-vlc-btn", openVlcPlayer);
    bind("ro-copym3u8-btn", copyM3u8);
    bind("ro-m3ufile-btn", downloadM3uFile);
    bind("ro-skipintro-btn", () => skipIntro(85));
    bind("ro-fullscreen-btn", toggleFullscreen);
    bind("ro-hdr-btn", toggleHdr);
    bind("ro-theater-btn", toggleTheater);
    bind("ro-nukeads-btn", () => nukeAdElements(true));
    bind("ro-vol-down", () => adjustVolume(-0.05));
    bind("ro-vol-up", () => adjustVolume(0.05));
    bind("ro-speed-down", () => adjustSpeed(-1));
    bind("ro-speed-up", () => adjustSpeed(1));
  }



  function sendCommandToPlayer(cmd) {
    const video = document.querySelector("video");
    if (video) {
      if (cmd.type === "RO_CMD_SKIP_INTRO") {
        video.currentTime = Math.min(video.duration || Infinity, video.currentTime + (cmd.seconds || 85));
      } else if (cmd.type === "RO_CMD_SEEK") {
        video.currentTime = Math.max(0, Math.min(video.duration || Infinity, video.currentTime + (cmd.delta || 0)));
      } else if (cmd.type === "RO_CMD_SEEK_PERCENT") {
        if (video.duration) video.currentTime = (video.duration * (cmd.percent || 0)) / 100;
      } else if (cmd.type === "RO_CMD_VOLUME") {
        video.volume = Math.max(0, Math.min(1, cmd.volume !== undefined ? cmd.volume : 1));
      } else if (cmd.type === "RO_CMD_SET_SPEED") {
        video.playbackRate = cmd.speed || 1;
      } else if (cmd.type === "RO_CMD_TOGGLE_HDR") {
        video.classList.toggle("ro-enhanced-hdr");
      } else if (cmd.type === "RO_CMD_TOGGLE_PLAY") {
        if (video.paused) video.play().catch(() => {});
        else video.pause();
      } else if (cmd.type === "RO_CMD_MUTE") {
        video.muted = !video.muted;
      } else if (cmd.type === "RO_CMD_FULLSCREEN") {
        if (document.fullscreenElement) {
          try { document.exitFullscreen().catch(() => {}); } catch (e) {}
        } else {
          try { video.requestFullscreen().catch(() => {}); } catch (e) {}
        }
      }
    }
    document.querySelectorAll("iframe").forEach(f => {
      try { f.contentWindow.postMessage(cmd, "*"); } catch (e) {}
    });
  }

  function skipIntro(sec = 85) {
    sendCommandToPlayer({ type: "RO_CMD_SKIP_INTRO", seconds: sec });
    showToast("Đã tua Intro: +" + sec + "s");
  }

  function seekRelative(delta = 5) {
    sendCommandToPlayer({ type: "RO_CMD_SEEK", delta });
    showToast(delta > 0 ? ("Tua tới: +" + delta + "s") : ("Tua lùi: " + delta + "s"));
  }

  function seekToPercent(pct = 0) {
    sendCommandToPlayer({ type: "RO_CMD_SEEK_PERCENT", percent: pct });
    showToast("Vị trí video: " + pct + "%");
  }

  function adjustVolume(delta) {
    let newVol = Math.round((currentVolume + delta) * 100) / 100;
    newVol = Math.max(0, Math.min(1.0, newVol));
    currentVolume = newVol;
    sendCommandToPlayer({ type: "RO_CMD_VOLUME", volume: currentVolume });
    showToast("Âm lượng: " + Math.round(currentVolume * 100) + "%");
  }

  function toggleHdr() {
    isHdrEnabled = !isHdrEnabled;
    sendCommandToPlayer({ type: "RO_CMD_TOGGLE_HDR" });
    showToast(isHdrEnabled ? "Anime OLED HDR: BẬT" : "OLED HDR: TẮT");
  }

  function toggleTheater() {
    isTheaterMode = !isTheaterMode;
    document.body.classList.toggle("ro-theater-active", isTheaterMode);
    showToast(isTheaterMode ? "Chế độ Rạp phim: BẬT" : "Chế độ Rạp phim: TẮT");
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      try { document.exitFullscreen().catch(() => {}); } catch (e) {}
      showToast("Đã thoát Toàn màn hình");
    } else {
      const playerWrapper = document.querySelector(".player-wrapper, .player-container, #player, iframe, video");
      const target = playerWrapper || document.documentElement;
      if (target && target.requestFullscreen) {
        try { target.requestFullscreen().catch(() => {}); } catch (e) {}
      }
      sendCommandToPlayer({ type: "RO_CMD_FULLSCREEN" });
      showToast("Toàn màn hình");
    }
  }

  function openPotPlayer() {
    ensureStreamUrl();
    if (!capturedStreamUrl) {
      showToast("Đang chờ bắt link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = capturedStreamUrl.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).catch(() => {});
    }
    window.location.href = "potplayer://" + cleanUrl;
    showToast("Đang mở PotPlayer...");
  }

  function openVlcPlayer() {
    ensureStreamUrl();
    if (!capturedStreamUrl) {
      showToast("Đang chờ bắt link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = capturedStreamUrl.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).catch(() => {});
    }
    window.location.href = "vlc://" + encodeURIComponent(cleanUrl);
    showToast("Đang mở VLC Player (và đã copy link vào Clipboard)...");
  }

  function copyM3u8() {
    ensureStreamUrl();
    if (!capturedStreamUrl) {
      showToast("Đang tìm link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = capturedStreamUrl.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).then(() => {
        showToast("Đã copy link M3U8 chuẩn: " + (cleanUrl.length > 40 ? cleanUrl.slice(0, 37) + "..." : cleanUrl));
      }).catch(() => fallbackCopy(cleanUrl));
    } else {
      fallbackCopy(cleanUrl);
    }
  }

  function fallbackCopy(text) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      (document.body || document.documentElement).appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, 99999);
      document.execCommand("copy");
      ta.remove();
      showToast("Đã copy link M3U8 chuẩn: " + (text.length > 40 ? text.slice(0, 37) + "..." : text));
    } catch (e) {
      prompt("Sao chép link video:", text);
    }
  }

  function downloadM3uFile() {
    ensureStreamUrl();
    if (!capturedStreamUrl) {
      showToast("Chưa có link video, hãy bấm Play trước!");
      return;
    }
    const title = (document.title || "Cinema_Pro_Stream").replace(/[/\\?%*:|"<>]/g, "_").trim();
    const content = "#EXTM3U\n#EXTINF:-1," + title + "\n" + capturedStreamUrl + "\n";
    const blob = new Blob([content], { type: "audio/x-mpegurl" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = title + ".m3u";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(a.href);
    }, 1000);
    showToast("Đã tải playlist .m3u (Mở trực tiếp trong VLC/PotPlayer)!");
  }

  function adjustSpeed(delta) {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0];
    let idx = speeds.indexOf(currentSpeed);
    if (idx === -1) idx = 2;
    idx = Math.max(0, Math.min(speeds.length - 1, idx + delta));
    currentSpeed = speeds[idx];
    sendCommandToPlayer({ type: "RO_CMD_SET_SPEED", speed: currentSpeed });
    showToast("Tốc độ phát: " + currentSpeed + "x");
  }

  // ─── GLOBAL KEYBOARD SHORTCUTS ───
  window.addEventListener("keydown", function (e) {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || e.target?.isContentEditable) return;
    const key = e.key.toLowerCase();
    if (key === "s" || key === "i") {
      e.preventDefault();
      skipIntro(85);
    } else if (key === "arrowleft") {
      e.preventDefault();
      seekRelative(-5);
    } else if (key === "arrowright") {
      e.preventDefault();
      seekRelative(5);
    } else if (key === "arrowup") {
      e.preventDefault();
      adjustVolume(0.05);
    } else if (key === "arrowdown") {
      e.preventDefault();
      adjustVolume(-0.05);
    } else if (key === "f") {
      e.preventDefault();
      toggleFullscreen();
    } else if (key === "e") {
      e.preventDefault();
      toggleHdr();
    } else if (key === "t") {
      e.preventDefault();
      toggleTheater();
    } else if (key === "x") {
      e.preventDefault();
      nukeAdElements(true);
    } else if (e.key === "[") {
      e.preventDefault();
      adjustSpeed(-1);
    } else if (e.key === "]") {
      e.preventDefault();
      adjustSpeed(1);
    } else if (e.key === " " && !e.repeat) {
      e.preventDefault();
      sendCommandToPlayer({ type: "RO_CMD_TOGGLE_PLAY" });
    } else if (key === "m") {
      e.preventDefault();
      sendCommandToPlayer({ type: "RO_CMD_MUTE" });
    } else if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      seekToPercent(parseInt(e.key, 10) * 10);
    }
  });


  if (document.body) initVipHub();
  else document.addEventListener("DOMContentLoaded", initVipHub, { once: true });
  window.addEventListener("DOMContentLoaded", ensureStreamUrl);
  window.addEventListener("load", ensureStreamUrl);



  console.log("%c[Cinema Pro] " + "BanhTV VIP & Cinema Pro Suite" + " Ready!", "font-size: 13px; font-weight: bold; color: #10b981;");
})();
