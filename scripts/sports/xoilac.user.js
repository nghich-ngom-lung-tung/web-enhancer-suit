// ==UserScript==
// @name         Xôi Lạc TV (XoilacZ) VIP & Cinema Pro Suite
// @namespace    http://tampermonkey.net/
// @version      5.4
// @description  Chặn sạch banner cá cược 8xBet, Catfish Xôi Lạc TV + Tóm link M3U8 trực tiếp PotPlayer/VLC + Chế độ Sân Cỏ Theater Mode
// @author       nghich-ngom-lung-tung
// @match        *://xoilaczzz.pro/*
// @match        *://*.xoilaczzz.pro/*
// @match        *://xoilacz.pro/*
// @match        *://*.xoilacz.pro/*
// @match        *://xoilac.tv/*
// @match        *://*.xoilac.tv/*
// @match        *://xoilac.net/*
// @match        *://*.xoilac.net/*
// @match        *://xoilac.live/*
// @match        *://*.xoilac.live/*
// @match        *://xoilac.link/*
// @match        *://*.xoilac.link/*
// @match        *://xoilac7.net/*
// @match        *://*.xoilac7.net/*
// @match        *://xoilac8.net/*
// @match        *://*.xoilac8.net/*
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
// @match        *://*.stream*.xyz/*
// @match        *://*.stream*.top/*
// @match        *://*.stream*.net/*
// @match        *://*.stream*.org/*
// @match        *://*.stream*.cc/*
// @match        *://*.stream*.co/*
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
// @match        *://*.doubok.xyz/*
// @match        *://doubok.xyz/*
// @match        *://*.doubok.*/*
// @match        *://*.salesperyear.xyz/*
// @match        *://salesperyear.xyz/*
// @match        *://*.salesperyear.*/*
// @match        *://*.cctvsignal.xyz/*
// @match        *://cctvsignal.xyz/*
// @match        *://*.cctvsignal.*/*
// @match        *://*.devwithai.net/*
// @match        *://devwithai.net/*
// @match        *://*.streamxx.net/*
// @match        *://streamxx.net/*
// @match        *://*.streamxx.*/*
// @include      *://*xoilac*/*
// @include      *://embed*.streamc.xyz/*
// @include      *://stream*.xyz/*
// @include      *://stream*.top/*
// @include      *://stream*.net/*
// @include      *://stream*.org/*
// @include      *://stream*.cc/*
// @include      *://stream*.co/*
// @include      *://dood.*/*
// @include      *://doubok.*/*
// @include      *://salesperyear.*/*
// @include      *://cctvsignal.*/*
// @include      *://fhd-*.cctvsignal.xyz/*
// @include      *://streamxx.*/*
// @allFrames    true
// @run-at       document-start
// @grant        none
// @license      MIT
// @icon         https://rophim1.vip/apple-icon.png
// @homepageURL  https://github.com/nghich-ngom-lung-tung/web-enhancer-suit
// @downloadURL  https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/sports/xoilac.user.js
// @updateURL    https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/sports/xoilac.user.js
// ==/UserScript==

(function () {
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
    if (u.includes("_rsc") || u.includes(".rsc") || u.includes("_next/") || u.includes(".js")) return false;
    try {
      if (typeof isAdApi === "function") return isAdApi(url);
      if (typeof window !== "undefined" && typeof window.isAdApi === "function") return window.isAdApi(url);
    } catch (e) {}
    if (u.includes("tvc_") || u.includes("/assets/tvc/") || u.includes("tvc-pre-roll") || u.includes("tvc_net88") || u.includes("tvc_gem88")) return true;
    if (u.includes(".m3u8") || u.includes(".mp4") || u.includes(".ts") || u.includes(".m4s")) return false;
    return (
      u.includes("/ads") ||
      u.includes("/banners") ||
      u.includes("/banner/") ||
      u.includes("/api/widget/data") ||
      u.includes("acscdn.com") ||
      u.includes("yougetwhatyoupayfor.net") ||
      u.includes("chaseherbalpasty.com") ||
      u.includes("streamxx.net") ||
      u.includes("embed_ads") ||
      u.includes("pause_ads") ||
      u.includes("bom88") ||
      u.includes("tin888") ||
      u.includes("net88")
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
      if (url && (url.includes("/encrypted/token") || url.includes("/chat/send") || url.includes("/chat/history"))) {
        const realTok = typeof window !== "undefined" && window.localStorage ? window.localStorage.getItem("guestAccessToken") : null;
        if (realTok && !realTok.includes("cinema-pro-vip") && init && init.headers) {
          if (typeof init.headers.set === "function") {
            const a = init.headers.get("Authorization") || init.headers.get("authorization");
            if (a && a.includes("cinema-pro-vip")) init.headers.set("Authorization", "Bearer " + realTok);
          } else if (typeof init.headers === "object") {
            const a = init.headers.Authorization || init.headers.authorization;
            if (a && a.includes("cinema-pro-vip")) init.headers.Authorization = "Bearer " + realTok;
          }
        }
      }
    } catch (e) {}
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
    
    const origSend = xhr.send;
    xhr.send = function (body) {
      if (safeIsAdApi(targetUrl)) {
        try {
          Object.defineProperty(xhr, "status", { value: 200, writable: false });
          Object.defineProperty(xhr, "responseText", { value: "{}", writable: false });
        } catch (e) {}
        return;
      }
      
      xhr.addEventListener("load", function () {
        try {
          if (xhr.responseText && (xhr.responseText.includes(".m3u8") || xhr.responseText.includes("/hls/") || xhr.responseText.includes(".mpd") || xhr.responseText.includes(".mp4"))) {
            const found = findStreamMatches(xhr.responseText);
            found.forEach(u => checkAndCaptureUrl(u));
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



  // ─── ANTI-ADBLOCK PROBE DEFUSER & POPUP NEUTRALIZER ───
  try {
    localStorage.setItem("ro_probe_", "9999999999999");
    localStorage.setItem("popup_last_shown", "9999999999999");
    localStorage.setItem("corner_start_popup_dismissed", "9999999999999");
    localStorage.setItem("is_banner_popup", "1");
    localStorage.setItem("giovang_tvc_pre_roll_daily", JSON.stringify({ date: "2099-12-31", count: 99999 }));
    localStorage.setItem("rophim-tvc-shown", "1");
    localStorage.setItem("__widget_data:/api/widget", JSON.stringify({ version: 1, items: {} }));
    localStorage.setItem("__pc_geo", "VN");

    window.__WidgetConfig = { zones: {} };
    window.__PopConfig = { zones: [] };
    window.aclib = {
      runBanner: function () {},
      runAutoTag: function () {},
      runPop: function () {}
    };
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
      if (key === "rophim-tvc-shown") return "1";
      return origGetItem.apply(this, arguments);
    };
  } catch (e) {}

  // ─── EMBED PLAYER AD DEFUSER (__V_DATA__ for devwithai, streamxx, rophim) ───
  try {
    let _vdata = window.__V_DATA__;
    function sanitizeVData(val) {
      if (val && typeof val === "object") {
        if (val.ads && typeof val.ads === "object") {
          val.ads.click_redirect = [];
          val.ads.tvc_mp4 = [];
          val.ads.overlay_banner = [];
          val.ads.watermark = [];
          val.ads.pause_ads = [];
          val.ads.player_poster = [];
          val.ads.brand_corner = [];
          val.ads.textlink = [];
        }
      }
      return val;
    }
    if (_vdata) {
      sanitizeVData(_vdata);
    }
    Object.defineProperty(window, "__V_DATA__", {
      configurable: true,
      enumerable: true,
      get: function () {
        return _vdata;
      },
      set: function (newVal) {
        _vdata = sanitizeVData(newVal);
      }
    });
  } catch (e) {}

  // ─── ANTI-CRASH & DEVTOOLS-DETECTOR ATTACK SHIELD ───
  try {
    if (typeof HTMLIFrameElement !== "undefined") {
      const origIframeSrc = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, "src");
      if (origIframeSrc && origIframeSrc.set) {
        const origSet = origIframeSrc.set;
        Object.defineProperty(HTMLIFrameElement.prototype, "src", {
          set: function (val) {
            if (typeof val === "string" && (val.includes("crash.html") || val.includes("/embed/crash"))) {
              console.warn("[Cinema Pro] Blocked malicious anti-tamper crash.html redirect on iframe:", val);
              return;
            }
            return origSet.call(this, val);
          },
          get: origIframeSrc.get,
          configurable: true
        });
      }

      const origSetAttr = HTMLIFrameElement.prototype.setAttribute;
      HTMLIFrameElement.prototype.setAttribute = function (name, val) {
        if (typeof name === "string" && name.toLowerCase() === "src" && typeof val === "string" && (val.includes("crash.html") || val.includes("/embed/crash"))) {
          console.warn("[Cinema Pro] Blocked malicious crash.html setAttribute on iframe:", val);
          return;
        }
        return origSetAttr.apply(this, arguments);
      };
    }
  } catch (e) {}

  // ─── GHIENPHIM & COIPHIM TVC VIDEO ADS DEFUSER ───
  try {
    window._videoAdPremium = "";
    window._totalTVC = 0;
    window._currentTVCIndex = 999;
    window.handleTVC = function () {
      try { clearInterval(window._videoAdPremium); } catch (e) {}
    };
    window.playAdVideo = function () {
      try {
        const layer = document.querySelector(".video-ad-layer");
        if (layer) safeHideOrRemove(layer);
        const vids = document.querySelectorAll("#video-premium, #video-second, #video-third, video[src*='tvc']");
        vids.forEach(v => {
          try { v.pause(); v.src = ""; safeHideOrRemove(v); } catch (e) {}
        });
      } catch (e) {}
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
          url.includes("zettruyen") ||
          url.includes("toptruyen") ||
          url.includes("nettruyen") ||
          url.includes("truyenqq") ||
          url.includes("truyenvn") ||
          url.includes("luotnovel") ||
          url.includes("ghienphim") ||
          url.includes("duphim") ||
          url.includes("coiphim") ||
          url.includes("xemphimviet") ||
          url.includes("ghientruyen") ||
          url.includes("ghienblog") ||
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
    if (u.includes("_rsc") || u.includes(".rsc") || u.includes("_next/") || u.includes(".js") || u.includes(".css")) return false;
    // Chặn tuyệt đối video ads & TVC pre-roll kể cả file .mp4
    if (u.includes("tvc_") || u.includes("/assets/tvc/") || u.includes("tvc-pre-roll") || u.includes("tvc_net88") || u.includes("tvc_gem88")) return true;
    if (u.includes(".m3u8") || u.includes(".mp4") || u.includes(".ts") || u.includes(".m4s")) return false;
    return (
      u.includes("/ads") ||
      u.includes("/banners") ||
      u.includes("/banner/") ||
      u.includes("/api/widget/data") ||
      u.includes("zthomes.js") ||
      u.includes("aclib.js") ||
      u.includes("acscdn.com") ||
      u.includes("yougetwhatyoupayfor.net") ||
      u.includes("chaseherbalpasty.com") ||
      u.includes("dekkopinolin.com") ||
      u.includes("crittereasilyhangover.com") ||
      u.includes("bom88") ||
      u.includes("ok999") ||
      u.includes("linkroyal") ||
      u.includes("hdbet") ||
      u.includes("go8.best") ||
      u.includes("tin888") ||
      u.includes("newbanner2025") ||
      u.includes("no-ads.png") ||
      u.includes("seotraffic.io.vn") ||
      u.includes("irondom.net") ||
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
      u.includes("/images/company/") ||
      u.includes("c-asyncjs") ||
      u.includes("asyncspc") ||
      u.includes("uat-08oc10") ||
      u.includes("cdnvip.chuoichientv.net") ||
      u.includes("net88.boats") ||
      u.includes("net88") ||
      u.includes("c5735ef8") ||
      u.includes("/media/uploads/") && u.includes(".gif") ||
      u.includes("streamxx.net") ||
      u.includes("embed_ads") ||
      u.includes("pause_ads") ||
      u.includes("/ux-toplist/") ||
      u.includes("ux-toplist")
    );
  }

  function safeHideOrRemove(element) {
    if (!element || typeof element !== "object") return false;
    try {
      element.style.setProperty("display", "none", "important");
      element.style.setProperty("visibility", "hidden", "important");
      element.style.setProperty("height", "0", "important");
      element.style.setProperty("width", "0", "important");
      element.style.setProperty("opacity", "0", "important");
      element.style.setProperty("pointer-events", "none", "important");
      element.style.setProperty("position", "absolute", "important");
      element.style.setProperty("clip", "rect(0,0,0,0)", "important");
      element.style.setProperty("margin", "0", "important");
      element.style.setProperty("padding", "0", "important");
    } catch (e) {}
    return true;
  }

  function nukeAdElements(notify = false) {
    let count = 0;
    const adSelectors = [
      // Catfish & Fixed Ads
      '.catfish', '#catfish', '.catfish-banner', '#catfish-banner', '[class*="catfish"]', '[id*="catfish"]',
      '.sspp-area', '[class*="sspp-area"]', '[class*="sspp_area"]', '[class*="sspp-"]',
      '.display-single', '[class*="display-single"]', '.is-demo', '[class*="is-demo"]',
      '.is-image', 'div[class*="is-image"]',

      // Comics Ads: ZetTruyen, TopTruyen, NetTruyen, TruyenQQ, TruyenVN
      '.ads-tool-banner-container', '[class*="ads-tool-banner-container"]',
      '.close-catfish', '[data-zone]', '[data-zone="top"]', '[data-zone="top_content"]', '[data-zone="bottom"]',
      'div[style*="z-index: 2147483000"]', 'div[style*="z-index: 2147483001"]',
      'div[id*="aclib"]', '#aclib', 'iframe[src*="acscdn.com"]', 'iframe[src*="yougetwhatyoupayfor.net"]',
      '#banners-container', '.banners-container',
      '.advertisement', '#video-chapter', 'div[id*="video-chapter"]', 'div[class*="advertisement"]',
      'iframe[src*="chaseherbalpasty.com"]', 'iframe[src*="dekkopinolin.com"]', 'iframe[src*="crittereasilyhangover.com"]',
      '.banner-qc',
      '#top-banner-reading-container', '#top-banner-reading-container-sub', '#mid-banner-reading-container',
      '#ad_info_top', '#ad_info_2', '#ad_info', 'div[id*="ad_info"]', 'div[id*="banner-reading"]',
      '.community-banner', '.iframe-content-mobile', '.iframe-content-desktop', '.banner.text-center',
      '.ads-static-header', '.ads-static-home-detail-chapter', '.ads-static-home-middle', 'div[class*="ads-static"]',
      '.popup_layer', '.popup_content', '#popup_content',
      // GhienPhim, DuPhim, CoiPhim, GhienBlog Banners & Floating Promos
      '.ad-floater', '.new-target-goal', '.new-floater-goal', '.promotion-popup', '.popuptet-bg', '.source-banner',
      '.component.ads', '[class*="component ads"]', '.adtop', '.adbot', '[class*="adtop"]', '[class*="adbot"]',
      '.ad-1170x150', '[class*="ad-1170x150"]', '.no-ads', '.anti-bad-ad', '[class*="no-ads"]', '[class*="anti-bad-ad"]',
      'a[aria-label*="Advertisement"]', 'a[aria-label="Advertisement"]',
      'img[src*="newbanner2025"]', 'img[src*="no-ads.png"]',
      'a[href*="shortlink.linkroyal"]', 'a[href*="linkroyal"]', 'a[href*="hdbet"]', 'a[href*="go8.best"]', 'a[href*="tin888"]',
      'a[href*="bom88"]', 'a[href*="ok999"]', 'iframe[src*="seotraffic.io.vn"]',
      // GhienPhim & CoiPhim TVC Video Ad Layer & Pre-roll
      '.video-ad-layer', '[class*="video-ad-layer"]',
      '.ad-msg', '[class*="ad-msg"]', '.random-content',
      '#video-premium', '#video-second', '#video-third',
      '.btn-video-ad', '.btn-skip-video', '[class*="btn-skip-video"]',

      // Giovang Popups, Ads & Toplists
      '#banner_popup', '.banner_popup', '.banner_inner', '.banner_cursor',
      '.grid_banner_devqc', '.devqc-manager-resources', '.w-banner_devqc-bd', '.banner_devqc-bdn-button',
      '.devqc-catfish', '.gvbanner-catfish', '[class*="devqc"], [id*="devqc"]',
      '#banners-bottom-container', '.banners-bottom', '.banners-bottom-grid', '#open-banner-bottom',
      '.popup-menu', '#popupMenu', '.floating-balloon-container', '.popup-anim', '.popup-item', '[class*="popup-item"]',
      '.fixture-banner', '[class*="fixture-banner"]', '.balloon-wrapper', '[class*="balloon-wrapper"]', '.btn-balloon', '[class*="btn-balloon"]', '.balloon-img-box',
      '.homepage-toplists-content', 'section.homepage-toplists-content', '[class*="homepage-toplists"]',
      '.toplists-home', '[class*="toplists-home"]', '.devvn-topfive-wrapper', '[class*="devvn-topfive"]',
      '.topfive-card', '[class*="topfive-card"]',
      '.box-odds-match', '[class*="box-odds-match"]', '.title-odds', '[class*="title-odds"]',
      '.gv-bet-dropdown', '[class*="gv-bet-dropdown"]', '.gv-bet-dropdown-toggle', '[class*="gv-bet-dropdown-toggle"]',
      '.gv-bet-dropdown-menu', '[class*="gv-bet-dropdown-menu"]',
      '.gv-bet-brand-link--image', '[class*="gv-bet-brand-link"]', '.gv-bet-brand-link__img',
      'a[aria-label="Top Nhà Cái"]', 'img[src*="nav-toplist.svg"]', 'img[src*="nav-active-toplist.svg"]',
      'img[src*="kbv.svg"]', 'img[src*="bet-net88"]', 'img[src*="bet-gem88"]',
      'a[data-brand-id]', 'a.seo4s-resolve-link', 'a[class*="seo4s"]',
      '.bg-modaltrungthuong', '.modal-trungthuong', '.close-modal-trungthuong',
      '.banner-match', '.gv-skeleton-banner', '[class*="gv-skeleton-banner"]',
      'img[src*="giovang-popup"]',
      '.tvc-pre-roll', '.video-wrapper.tvc-pre-roll', '.tvc-pre-roll__video', '.tvc-pre-roll__skip', '.tvc-pre-roll__link-overlay', '[class*="tvc-pre-roll"]',
      'video[src*="tvc_"]', 'video[src*="assets/tvc/"]',

      // In-Player Pause Ads, Watermark & Embed Overlays (devwithai, streamxx, rophim)
      '.pause-ad-overlay', '.pause-ad-center', '.pause-ad-image', '.pause-ad-close', '.pause-ad-click-layer',
      'div[class*="pause-ad"]', 'img[src*="pause_ads"]', 'img[src*="embed_ads"]',
      '.overlay-ad-overlay', '.overlay-ad-close', '.watermark-ad-overlay', '.watermark-ad-close',
      '#pause-ad-styles', '.art-ad', '.art-ads', '[class*="art-ad"]',
      'div[class*="watermark-ad"]', 'div[class*="overlay-ad"]',

      // ChuoiChien Video Player Banner & Gambling Overlays
      '.ads-layer', '[class*="ads-layer"]', 'div.ads-layer',
      '.player-logo-wrapper', '.player-logo-inner', '.player-logo-ad', '[class*="player-logo-"]', '[class*="player-logo"]',
      '.bet-button-player', '.bet-buttons-container', '.bet-button-content', 'button.bet-button-content', '[class*="bet-button-player"]', '[class*="bet-buttons-container"]', '[class*="bet-button-content"]',
      '[data-v-77ed3802]', '[data-v-77cd3882]', '[data-v-4c9315d7]', '[data-v-cede0d5b]',
      '.banner-player', '.banner-canvas', 'div.banner-canvas', '[class*="banner-canvas"]', '.banner-container', '.banner-content', '.banner-image', 'img.banner-image', '.banner-item',
      '[class*="banner-player"]', '[class*="banner-container"]', '[class*="banner-content"]', '[class*="banner-image"]', '[class*="banner-item"]',
      '.banner-content.active', '[class*="banner-content"][class*="active"]',
      '.bet-button', '.bet-buttons', '[class*="bet-button"]', '[class*="bet-buttons"]', '[class*="bet-btn"]',
      '[data-position*="bet-button"]', '[data-position="live-under-player"]', '[data-position*="catfish"]',
      'img[alt*="FB88_banner_player"], img[alt*="net-88-banner-player"], img[alt*="net-88-logo"], img[alt*="banner_player"]',
      'img[src*="1920x60"]', 'img[src*="cdnvip.chuoichientv.net"]', 'img[src*="c5735ef8"]',
      'a[href*="net88.boats"]', 'a[href*="logolive-30x30"]',
      'img[src*="banner_player"]', 'img[src*="FB88"]', 'img[src*="fb88"]', 'img[src*="net88"]', 'img[src*="NET88"]', 'img[src*="xBet"]',

      // ThapCam, Khoga Popups, Balloons & Placements
      '.sticky-message', '.sticky-announcement', '[class*="sticky-announcement"]', '[class*="sticky-message"]',
      '.sticky-header', '.sticky-icon-inline', '.sticky-title', '.sticky-content-text',
      '.detail-live-brand', '[class*="detail-live-brand"]', '.detail-live-brand-title', '.detail-live-brand-logo',
      '[id*="notification-banner"]', '[class*="notification-banner"]',
      '.notification-banner-message-wrapper', '.notification-banner-message-item', '.gwd_notification',
      '#betbutton-world-cup', 'a.btn-bet', 'a.bet-cta',
      '#corner-start-popup', '.corner-start-popup', '.corner-start-popup-backdrop', '.corner-start-popup-content', '.corner-start-popup-inner',
      '.corner-popup-wrap', '.corner-popup-box', '[class*="corner-popup"]', '[id*="corner-popup"]',
      '.block-balloon-right', '.block-balloon-left', '.close-balloon-left', '.close-balloon-right', '[class*="balloon-"]',
      '.bookmaker-title', '.tf-section', '.tf-theme-style4', '[class*="tf-s3-"]', '[class*="tf-section"]',
      '.fixed-ads', '.fixed-ads-1', '.block-fixed-ads-1', '[class*="block-fixed-ads"]', '[class*="fixed-ads"]',
      '.live-ads-temp-1', '.live-ads-temp-2', '.live-ads-temp-3', '.live-ads-temp-4', '.live-ads-temp-5', '[class*="live-ads-temp"]',
      '.left-ads', '.right-ads',
      '.adspot-wrap', '.adspot-1', '.adspot-2', '.adspot-55', '.adspot-56', '.adspot-57', '[class*="adspot-"]', '[class*="adspot"]', 'ins[data-revive-id]',
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

      // Tự động bỏ qua và kết thúc video TVC pre-roll nếu xuất hiện (Giờ Vàng, Thể Thao, GhienPhim, CoiPhim)
      const tvcVideos = document.querySelectorAll(".tvc-pre-roll__video, video[src*='tvc_'], video[src*='assets/tvc/'], #video-premium, #video-second, #video-third");
      tvcVideos.forEach(tvcVideo => {
        try {
          tvcVideo.muted = true;
          tvcVideo.currentTime = tvcVideo.duration || 999;
          tvcVideo.dispatchEvent(new Event("ended"));
          if (tvcVideo.id === "video-premium" || tvcVideo.id === "video-second" || tvcVideo.id === "video-third") {
            tvcVideo.pause();
            tvcVideo.src = "";
            safeHideOrRemove(tvcVideo);
          }
        } catch (e) {}
      });
      const skipBtns = document.querySelectorAll(".tvc-pre-roll__skip button, .tvc-pre-roll__skip, [class*='skip'] button, .btn-skip-video, [class*='btn-skip-video']");
      skipBtns.forEach(skipBtn => {
        if (skipBtn && typeof skipBtn.click === "function") {
          try { skipBtn.click(); } catch (e) {}
        }
      });
      const tvcLayers = document.querySelectorAll(".video-ad-layer, [class*='video-ad-layer'], .ad-msg, [class*='ad-msg'], .random-content");
      tvcLayers.forEach(layer => {
        try {
          safeHideOrRemove(layer);
        } catch (e) {}
      });

      if (document.querySelectorAll) {
        document.querySelectorAll(adSelectors.join(",")).forEach(el => {
          if (
            el.id === "ro-vip-hub" ||
            (el.closest && el.closest("#ro-vip-hub")) ||
            el.classList.contains("livestream_widget") ||
            el.classList.contains("giovang-fixture-player-mount") ||
            el.classList.contains("giovang-fixture-player-shell") ||
            el.classList.contains("livestream_widget__content") ||
            el.classList.contains("hlsp") ||
            el.classList.contains("player-container")
          ) {
            return;
          }
          // Bảo vệ video stream thật không bao giờ bị xóa nhầm (chỉ cho phép xóa TVC/Ads)
          if (
            el.tagName === "VIDEO" &&
            !el.classList.contains("tvc-pre-roll__video") &&
            !el.src?.includes("tvc") &&
            el.id !== "video-premium" &&
            el.id !== "video-second" &&
            el.id !== "video-third"
          ) {
            return;
          }
          const parent = (el.closest && el.closest('.sspp-area, div[class*="sspp"], .component.ads, [class*="component ads"], .adtop, .adbot, .no-ads, .anti-bad-ad, .ad-1170x150, [class*="ad-1170x150"], div[style*="fixed"]:not(.livestream_widget):not(.giovang-fixture-player-shell), div[style*="sticky"], div[class*="catfish"], #banner_popup, .banner_popup, #corner-start-popup, .corner-start-popup, [class*="devqc"], .ads-layer, [class*="ads-layer"], .player-logo-wrapper, .bet-button-player, .banner-player, .banner-canvas, [class*="banner-canvas"], .banner-container, .banner-content, .banner-item, .bet-button, .bet-buttons, [class*="bet-button"], .corner-popup-wrap, .marquee-container, .fixture-banner, [class*="balloon-wrapper"], [class*="banner-pos-"], [class*="ad-popup-modal"], .match-detail__offer, .teambox__odds, .homepage-toplists-content, .toplists-home, .box-odds-match, .gv-bet-dropdown, .sticky-message, .sticky-announcement, [class*="detail-live-brand"], .video-ad-layer, [class*="video-ad-layer"], .ad-msg, [class*="ad-msg"], .random-content')) || el;
          if (parent) {
            if (parent === lw || (lw && parent.contains && parent.contains(lw))) return;
            if (parent.tagName === "VIDEO" || parent.classList.contains("hlsp") || parent.classList.contains("player-container") || (parent.querySelector && parent.querySelector("video"))) return;
            safeHideOrRemove(parent);
            count++;
          }
        });

        // Diệt tận gốc ads-layer, in-player pause ads & banner (devwithai, streamxx, rophim, Chuối Chiên...)
        document.querySelectorAll(
          ".pause-ad-overlay, .pause-ad-center, .pause-ad-image, .pause-ad-close, .pause-ad-click-layer, " +
          "div[class*='pause-ad'], img[src*='pause_ads'], img[src*='embed_ads'], " +
          ".overlay-ad-overlay, .watermark-ad-overlay, #pause-ad-styles, .art-ad, .art-ads, " +
          ".ads-layer, [class*='ads-layer'], .player-logo-wrapper, .player-logo-inner, " +
          ".bet-button-player, .bet-buttons-container, .bet-button-content, button.bet-button-content, [class*='bet-button'], " +
          ".banner-player, .banner-canvas, [class*='banner-canvas'], div.banner-canvas, .banner-container, .banner-content, div.banner-content, .banner-image, img.banner-image, [class*='banner-image'], " +
          "img[src*='1920x60'], img[src*='cdnvip.chuoichientv.net'], img[src*='c5735ef8'], img[alt*='banner-player'], img[alt*='banner_player'], " +
          "img[alt*='FB88'], img[alt*='net-88'], [data-position='live-under-player'], [data-position*='bet-button'], " +
          "[data-v-77ed3802], [data-v-cede0d5b], [data-v-4c9315d7].banner-content, [data-v-4c9315d7].banner-canvas, img[data-v-4c9315d7]"
        ).forEach(ad => {
          if (ad.tagName === "VIDEO" || ad.classList?.contains("hlsp") || ad.classList?.contains("player-container") || (ad.querySelector && ad.querySelector("video"))) return;
          safeHideOrRemove(ad);
          count++;
        });
      }

      // Quét sạch các nút cược và banner theo nội dung text (Chuối Chiên, Giờ Vàng, Thập Cẩm, Xôi Lạc...)
      if (document.querySelectorAll) {
        document.querySelectorAll("button, div, span, a").forEach(el => {
          const txt = (el.textContent || "").trim();
          const isBettingText =
            txt.startsWith("Cược FB88") || txt.startsWith("Cược Net-88") || txt.startsWith("Cược xBet") ||
            txt.includes("Cược 8XBET") || txt.includes("ĐUA TOP THƯỞNG") ||
            txt === "Cược ngay" || txt.startsWith("Cược ngay") || txt === "Soi Kèo" || txt.startsWith("Soi Kèo") ||
            txt === "Top nhà cái" || txt === "Top Nhà Cái" || txt === "Bảng kèo nhà cái" ||
            txt === "FE BET" || txt.startsWith("FE BET") || txt.includes("FE BET") || txt.includes("FEBET") ||
            txt.includes("Húp 2,5 tỷ");

          if (isBettingText && !el.classList.contains("livestream_widget") && !(el.closest && el.closest(".livestream_widget"))) {
            try {
              const p = (el.closest && el.closest('.bet-button, .bet-buttons, [class*="bet-button"], .bet-buttons-container, .banner-canvas, [class*="banner-canvas"], .banner-content, [class*="banner-content"], .ads-layer, [class*="ads-layer"], .gv-bet-dropdown, .box-odds-match, .homepage-toplists-content, .toplists-home, .sticky-message, .sticky-announcement, [class*="detail-live-brand"]')) || el;
              if (p !== lw && !(lw && p.contains && p.contains(lw)) && !(p.querySelector && p.querySelector("video"))) {
                safeHideOrRemove(p);
                count++;
              } else {
                safeHideOrRemove(el);
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
                safeHideOrRemove(el);
                count++;
              }
            }
          }
        });
      }
    } catch (e) {}

    if (notify) {
      const toastMsg = count > 0 ? ("Đã quét sạch " + count + " banner quảng cáo!") : "Đã quét sạch banner!";
      if (typeof window !== "undefined" && typeof window.showToast === "function") {
        window.showToast(toastMsg);
      } else if (typeof showToast === "function") {
        showToast(toastMsg);
      }
    }
  }

  if (typeof window !== "undefined") {
    window.isAdApi = isAdApi;
    window.nukeAdElements = nukeAdElements;
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
  const css = "/* ═══════════════════════════════════════════════════════════════\r\n   Cinema Pro Suite - Adblock & Anti-Banner CSS\r\n   Diệt sạch banner catfish, popup, cá cược, video ads\r\n   ═══════════════════════════════════════════════════════════════ */\r\n\r\n/* Xóa sạch mọi container banner quảng cáo */\r\n.ad-container, .ads-holder, .banner-left, .banner-right,\r\ndiv[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"],\r\n.ads-wrapper, #chancoc, .modal-adblock, .adv-holder, .pm-ads,\r\n.hh3d-ads, .dp-ads, .tvhay-ads, .ah-ads, #box-ads, .ah-banner,\r\n.bl-ads, .a47-ads, .ophim-ads, .biphim-ads, .dhtv-ads,\r\n.motphim-ads, .mephim-ads, .ghienphim-ads, .fullphim-ads, .phimhay-ads,\r\n.atvn-ads, .hhkf-ads, .hhpanda-ads, .vst-ads, .p247-ads, .phd-ads, .pbh-ads,\r\n.pv-ads, .btv-ads, .hdo-ads, .chay-ads, .xpp-ads, .ts-ads, .ss-ads,\r\n[class*=\"ad_placement\"], [id*=\"google_ads\"], div[style*=\"z-index: 9999999\"],\r\ndiv[style*=\"zIndex: 9999999\"], div[style*=\"backdrop-filter: blur(25px)\"],\r\n\r\n/* Diệt sạch banner catfish, fixed bottom bar và cá cược */\r\n.catfish, #catfish, .catfish-banner, #catfish-banner, div[class*=\"catfish\"], div[id*=\"catfish\"],\r\ndiv[class*=\"bottom-ads\"], div[class*=\"bottom_ads\"], div[class*=\"bottom-banner\"], div[class*=\"bottom_banner\"],\r\ndiv[id*=\"bottom-ads\"], div[id*=\"bottom_ads\"], div[id*=\"bottom-banner\"], div[id*=\"bottom_banner\"],\r\ndiv[class*=\"footer-ads\"], div[class*=\"footer_ads\"], div[class*=\"footer-banner\"], div[class*=\"footer_banner\"],\r\ndiv[class*=\"floating-banner\"], div[class*=\"floating_banner\"], div[class*=\"float-ads\"], div[class*=\"float_ads\"],\r\ndiv[class*=\"sticky-ads\"], div[class*=\"sticky-banner\"], div[id*=\"sticky-ads\"], div[id*=\"sticky-banner\"],\r\ndiv[class*=\"qc_bottom\"], div[id*=\"qc_bottom\"], div[class*=\"qc-bottom\"], div[id*=\"qc-bottom\"],\r\ndiv[id*=\"box-bottom\"], div[class*=\"box-bottom\"], div[id*=\"ads_bottom\"], div[class*=\"ads_bottom\"],\r\ndiv[id*=\"floating_bottom\"], div[class*=\"floating_bottom\"], div[id*=\"float_bottom\"],\r\n\r\n/* Diệt sạch banner & popup Truyện Tranh (ZetTruyen, TopTruyen, NetTruyen, TruyenQQ, TruyenVN) */\r\n.ads-tool-banner-container, [class*=\"ads-tool-banner-container\"], .close-catfish,\r\n[data-zone], [data-zone=\"top\"], [data-zone=\"top_content\"], [data-zone=\"bottom\"],\r\n.advertisement, #video-chapter, div[id*=\"video-chapter\"], div[class*=\"advertisement\"],\r\n#top-banner-reading-container, #top-banner-reading-container-sub, #mid-banner-reading-container,\r\n#ad_info_top, #ad_info_2, #ad_info, div[id*=\"ad_info\"], div[id*=\"banner-reading\"],\r\n.community-banner, .iframe-content-mobile, .iframe-content-desktop, .banner.text-center,\r\n.ads-static-header, .ads-static-home-detail-chapter, .ads-static-home-middle, div[class*=\"ads-static\"],\r\n.popup_layer, .popup_content, #popup_content,\r\n#ads, .wrapper-ads, .mission-ads, .tr-ads-click, .popup-noti, .notification-popup, #couter-wrapper, [class*=\"mission-ads\"],\r\n\r\n/* Diệt tận gốc Banner Rophim, Thể thao, Giovang, Chuoichien & Thapcam */\r\n.sspp-area, [class*=\"sspp-area\"], [class*=\"sspp_area\"], [class*=\"sspp-\"],\r\n.display-single, [class*=\"display-single\"], .is-demo, [class*=\"is-demo\"],\r\n.is-image, div[class*=\"is-image\"],\r\n#banner_popup, .banner_popup, .banner_inner, .banner_cursor,\r\n.grid_banner_devqc, .devqc-manager-resources, .w-banner_devqc-bd, .banner_devqc-bdn-button,\r\n.devqc-catfish, .gvbanner-catfish, [class*=\"devqc\"], [id*=\"devqc\"],\r\n#banners-bottom-container, .banners-bottom, .banners-bottom-grid, #open-banner-bottom,\r\n.popup-menu, #popupMenu, .floating-balloon-container, .popup-anim, .popup-item,\r\na[data-brand-id], a.seo4s-resolve-link, a[class*=\"seo4s\"],\r\n.bg-modaltrungthuong, .modal-trungthuong, .close-modal-trungthuong,\r\n.tvc-pre-roll, .video-wrapper.tvc-pre-roll, .tvc-pre-roll__video, .tvc-pre-roll__skip, .tvc-pre-roll__link-overlay, [class*=\"tvc-pre-roll\"],\r\n.xlz-ads-item, .block-catfish, .xlz-btn-8xbet, [class*=\"xlz-ads\"],\r\n.odds-comp-logo, a.odds-comp-logo, .grid-match__odds,\r\n.marquee-container, .marquee-box, [class*=\"marquee-container\"],\r\n.odds-button, div[class*=\"odds-button\"], [class*=\"odds-button\"],\r\n.teambox__odds, [class*=\"teambox__odds\"], .btn-odds, [class*=\"btn-odds\"], .match-detail__offer, .offer__buttons, .offer__bet__col, [class*=\"match-detail__offer\"],\r\n.fixture-banner, [class*=\"fixture-banner\"], [class*=\"balloon-wrapper\"], [class*=\"btn-balloon\"], [class*=\"popup-item\"],\r\n[class*=\"banner-pos-\"], [class*=\"ad-strip-pos\"], [class*=\"ad-popup-modal\"], [class*=\"banner-pos\"], [id*=\"banner-pos\"],\r\n.top-ads, .ads-728-90, .adspot-wrap, .adspot-1, .adspot-2, [class*=\"adspot\"], [id*=\"adspot\"], ins[data-revive-id],\r\n.banner-match, .gv-skeleton-banner, [class*=\"gv-skeleton-banner\"],\r\n.ads-layer, [class*=\"ads-layer\"], div.ads-layer,\r\n.player-logo-wrapper, .player-logo-inner, .player-logo-ad, [class*=\"player-logo-\"], [class*=\"player-logo\"],\r\n.bet-button-player, .bet-buttons-container, .bet-button-content, [class*=\"bet-button-player\"], [class*=\"bet-buttons-container\"], [class*=\"bet-button-content\"],\r\n[data-v-77ed3802], [data-v-77cd3882], [data-v-4c9315d7], [data-v-cede0d5b],\r\n.banner-player, .banner-canvas, div.banner-canvas, [class*=\"banner-canvas\"], .banner-container, .banner-content, .banner-image, .banner-item,\r\n[class*=\"banner-player\"], [class*=\"banner-container\"], [class*=\"banner-content\"], [class*=\"banner-image\"], [class*=\"banner-item\"],\r\n.banner-content.active, [class*=\"banner-content\"][class*=\"active\"],\r\n.bet-button, .bet-buttons, [class*=\"bet-button\"], [class*=\"bet-buttons\"], [class*=\"bet-btn\"],\r\n.homepage-toplists-content, section.homepage-toplists-content, [class*=\"homepage-toplists\"],\r\n.toplists-home, [class*=\"toplists-home\"], .devvn-topfive-wrapper, [class*=\"devvn-topfive\"],\r\n.topfive-card, [class*=\"topfive-card\"],\r\n.box-odds-match, [class*=\"box-odds-match\"], .title-odds, [class*=\"title-odds\"],\r\n.gv-bet-dropdown, [class*=\"gv-bet-dropdown\"], .gv-bet-dropdown-toggle, [class*=\"gv-bet-dropdown-toggle\"],\r\n.gv-bet-dropdown-menu, [class*=\"gv-bet-dropdown-menu\"],\r\n.gv-bet-brand-link--image, [class*=\"gv-bet-brand-link\"], .gv-bet-brand-link__img,\r\na[aria-label=\"Top Nhà Cái\"], img[src*=\"nav-toplist.svg\"], img[src*=\"nav-active-toplist.svg\"],\r\nimg[src*=\"kbv.svg\"], img[src*=\"bet-net88\"], img[src*=\"bet-gem88\"],\r\n.sticky-message, .sticky-announcement, [class*=\"sticky-announcement\"], [class*=\"sticky-message\"],\r\n.sticky-header, .sticky-icon-inline, .sticky-title, .sticky-content-text,\r\n.detail-live-brand, [class*=\"detail-live-brand\"], .detail-live-brand-title, .detail-live-brand-logo,\r\n[id*=\"notification-banner\"], [class*=\"notification-banner\"],\r\n.notification-banner-message-wrapper, .notification-banner-message-item, .gwd_notification,\r\n#betbutton-world-cup, a.btn-bet, a.bet-cta, .adspot-55, .adspot-56, .adspot-57,\r\n#corner-start-popup, .corner-start-popup, .corner-start-popup-backdrop, .corner-start-popup-content, .corner-start-popup-inner,\r\n.corner-popup-wrap, .corner-popup-box, [class*=\"corner-popup\"], [id*=\"corner-popup\"],\r\n.block-balloon-right, .block-balloon-left, .close-balloon-left, .close-balloon-right, [class*=\"balloon-\"],\r\n.bookmaker-title, .tf-section, .tf-theme-style4, [class*=\"tf-s3-\"], [class*=\"tf-section\"],\r\n.fixed-ads, .fixed-ads-1, .block-fixed-ads-1, [class*=\"block-fixed-ads\"], [class*=\"fixed-ads\"],\r\n.live-ads-temp-1, .live-ads-temp-2, .live-ads-temp-3, .live-ads-temp-4, .live-ads-temp-5, [class*=\"live-ads-temp\"],\r\n.left-ads, .right-ads,\r\nimg[alt*=\"FB88_banner_player\"], img[alt*=\"net-88-banner-player\"], img[alt*=\"net-88-logo\"], img[alt*=\"banner_player\"],\r\nimg[src*=\"1920x60\"], img[src*=\"cdnvip.chuoichientv.net\"], img[src*=\"c5735ef8\"],\r\na[href*=\"net88.boats\"], a[href*=\"logolive-30x30\"],\r\nimg[src*=\"giovang-popup\"], img[src*=\"hit.club\"], img[src*=\"go88\"], img[src*=\"sun.win\"],\r\nimg[src*=\"1280x1280px\"], img[src*=\"balloon_1111\"], img[src*=\"FB88\"], img[src*=\"fb88\"], img[src*=\"banner_player\"],\r\nimg[src*=\"net88\"], img[src*=\"NET88\"], img[src*=\"xBet\"],\r\nimg[src*=\"/images/company/\"], img[src*=\"company\"], img[src*=\"21-1.png\"], img[alt=\"company\"],\r\na[href*=\"15.235.211.192\"], a[href*=\"top-nha-cai\"], a[href*=\"xoilacz\"], a[href*=\"fb88.com\"],\r\na[href*=\"154.82.\"], a[href*=\"2138046\"], a[href*=\"9922\"],\r\nimg[src*=\"/media/\"][src*=\".gif\"],\r\ndiv.slide:has(.sspp-area), div.slide:has(.display-single),\r\ndiv.fluid-gap:has(.sspp-area), div.fluid-gap:has(.display-single),\r\na[href*=\"vsbet\"], a[href*=\"bet88\"], a[href*=\"colatv\"], a[href*=\"colascore\"], a[href*=\"kubet\"], a[href*=\"fun88\"],\r\na[href*=\"w88\"], a[href*=\"fb88\"], a[href*=\"bk8\"], a[href*=\"casino\"], a[href*=\"nhacai\"], a[href*=\"nohu\"],\r\na[href*=\"taixiu\"], a[href*=\"gamebai\"], a[href*=\"keonhacai\"], a[href*=\"bongda\"], a[href*=\"link1s\"],\r\na[href*=\"tructiephotlink\"], a[href*=\"branchseo\"], a[href*=\"/mlink/\"], a[href*=\"1-1-1-1\"],\r\ndiv[style*=\"position: fixed\"][style*=\"bottom: 0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell),\r\ndiv[style*=\"position: fixed\"][style*=\"bottom:0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell),\r\ndiv[style*=\"position:fixed\"][style*=\"bottom: 0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell),\r\ndiv[style*=\"position:fixed\"][style*=\"bottom:0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell) {\r\n  display: none !important;\r\n  visibility: hidden !important;\r\n  height: 0 !important;\r\n  max-height: 0 !important;\r\n  pointer-events: none !important;\r\n  opacity: 0 !important;\r\n}\r\n\r\n/* Diệt tuyệt đối các Modal Popup & Floating Ads đè trang */\r\n#banner_popup, #banner_popup.show, div#banner_popup, div#banner_popup.show,\r\n.banner_popup, .banner_popup.show, div.banner_popup, div.banner_popup.show,\r\n#corner-start-popup, .corner-start-popup, .corner-start-popup-backdrop, .corner-start-popup-content,\r\n.corner-popup-wrap, .corner-popup-box,\r\n.ads-layer, [class*=\"ads-layer\"], div.ads-layer,\r\n.player-logo-wrapper, .player-logo-inner, .player-logo-ad, [class*=\"player-logo-\"], [class*=\"player-logo\"],\r\n.bet-button-player, .bet-buttons-container, .bet-button-content, button.bet-button-content, [class*=\"bet-button-player\"], [class*=\"bet-buttons-container\"], [class*=\"bet-button-content\"],\r\n[data-v-77ed3802], [data-v-77cd3882], [data-v-4c9315d7], [data-v-cede0d5b],\r\n.banner-player, .banner-canvas, div.banner-canvas, [class*=\"banner-canvas\"], .banner-container, .banner-content, .banner-image, img.banner-image, .banner-item,\r\n[class*=\"banner-player\"], [class*=\"banner-container\"], [class*=\"banner-content\"], [class*=\"banner-image\"], [class*=\"banner-item\"],\r\n.banner-content.active, [class*=\"banner-content\"][class*=\"active\"],\r\n.bet-button, .bet-buttons, [class*=\"bet-button\"], [class*=\"bet-buttons\"], [class*=\"bet-btn\"],\r\n[data-position*=\"bet-button\"], [data-position=\"live-under-player\"], [data-position*=\"catfish\"],\r\n.ad-wrapper, .ad-container[data-position],\r\n.homepage-toplists-content, section.homepage-toplists-content, [class*=\"homepage-toplists\"],\r\n.toplists-home, [class*=\"toplists-home\"], .devvn-topfive-wrapper, [class*=\"devvn-topfive\"],\r\n.topfive-card, [class*=\"topfive-card\"],\r\n.box-odds-match, [class*=\"box-odds-match\"], .title-odds, [class*=\"title-odds\"],\r\n.gv-bet-dropdown, [class*=\"gv-bet-dropdown\"], .gv-bet-dropdown-toggle, [class*=\"gv-bet-dropdown-toggle\"],\r\n.gv-bet-dropdown-menu, [class*=\"gv-bet-dropdown-menu\"],\r\n.gv-bet-brand-link--image, [class*=\"gv-bet-brand-link\"], .gv-bet-brand-link__img,\r\n.sticky-message, .sticky-announcement, [class*=\"sticky-announcement\"], [class*=\"sticky-message\"],\r\n.sticky-header, .sticky-icon-inline, .sticky-title, .sticky-content-text,\r\n.detail-live-brand, [class*=\"detail-live-brand\"], .detail-live-brand-title, .detail-live-brand-logo,\r\n[id*=\"notification-banner\"], [class*=\"notification-banner\"],\r\n.modal-backdrop, .bg-modaltrungthuong, .modal-trungthuong,\r\n.floating-balloon-container, #popupMenu, .popup-menu, .popup-item, [class*=\"popup-item\"],\r\n.fixture-banner, [class*=\"fixture-banner\"], .balloon-wrapper, [class*=\"balloon-wrapper\"], .btn-balloon, [class*=\"btn-balloon\"],\r\n.grid_banner_devqc, .devqc-manager-resources, .w-banner_devqc-bd, .banner_devqc-bdn-button,\r\n.devqc-catfish, .gvbanner-catfish, [class*=\"devqc\"], [id*=\"devqc\"],\r\n.tvc-pre-roll, .video-wrapper.tvc-pre-roll, .tvc-pre-roll__video, .tvc-pre-roll__skip, .tvc-pre-roll__link-overlay,\r\n.marquee-container, .marquee-box, .odds-button,\r\n[class*=\"banner-pos-\"], [class*=\"ad-strip-pos\"], [class*=\"ad-popup-modal\"],\r\n.match-detail__offer, .offer__buttons, .offer__bet__col, [class*=\"match-detail__offer\"],\r\n.teambox__odds, [class*=\"teambox__odds\"], .btn-odds, [class*=\"btn-odds\"], .block-int, .block-k,\r\n\r\n/* Diệt sạch Player Pause Ads, Watermark & In-Player Embed Banners (devwithai, streamxx, rophim...) */\r\n.pause-ad-overlay, .pause-ad-center, .pause-ad-image, .pause-ad-close, .pause-ad-click-layer,\r\ndiv[class*=\"pause-ad\"], img[src*=\"pause_ads\"], img[src*=\"embed_ads\"],\r\n.overlay-ad-overlay, .overlay-ad-close, .watermark-ad-overlay, .watermark-ad-close,\r\n#pause-ad-styles, .art-ad, .art-ads, [class*=\"art-ad\"],\r\ndiv[class*=\"watermark-ad\"], div[class*=\"overlay-ad\"] {\r\n  display: none !important;\r\n  visibility: hidden !important;\r\n  opacity: 0 !important;\r\n  pointer-events: none !important;\r\n  z-index: -999999 !important;\r\n  width: 0 !important;\r\n  height: 0 !important;\r\n  max-width: 0 !important;\r\n  max-height: 0 !important;\r\n}\r\n\r\n/* Đảm bảo khung Player bóng đá Giờ Vàng, Chuối Chiên và các web thể thao luôn hiển thị nguyên vẹn */\r\n.livestream_widget, .giovang-fixture-player-shell, .giovang-fixture-player-mount, .livestream_widget__content,\r\n.hlsp, .player-container, video {\r\n  display: block !important;\r\n  visibility: visible !important;\r\n  opacity: 1 !important;\r\n  pointer-events: auto !important;\r\n  height: auto !important;\r\n  max-height: none !important;\r\n}\r\n\r\nhtml, body {\r\n  overflow: auto !important;\r\n  position: static !important;\r\n}\r\n\n\n    .xlz-ads-item, .block-catfish, .xlz-btn-8xbet, div[class*=\"xlz-ads\"], a[href*=\"8xbet\"], a[href*=\"bet\"], div[id*=\"catfish\"], #catfish, div[style*=\"z-index: 9999999\"], .odds-comp-logo, a.odds-comp-logo, .grid-match__odds, .marquee-container, .marquee-box, [class*=\"marquee-container\"], .odds-button, div[class*=\"odds-button\"], [class*=\"odds-button\"], img[src*=\"/images/company/\"], img[src*=\"company\"], img[src*=\"21-1.png\"], img[alt=\"company\"], a[href*=\"15.235.211.192\"], a[href*=\"top-nha-cai\"], a[href*=\"xoilacz\"], .teambox__odds, [class*=\"teambox__odds\"], .btn-odds, [class*=\"btn-odds\"], .match-detail__offer, .offer__buttons, .offer__bet__col, [class*=\"match-detail__offer\"] {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n/* ═══════════════════════════════════════════════════════════════\r\n   Cinema Pro Suite - Theater Mode & OLED HDR CSS\r\n   ═══════════════════════════════════════════════════════════════ */\r\n\r\nvideo.ro-enhanced-hdr {\r\n  filter: contrast(1.10) saturate(1.25) brightness(1.04) !important;\r\n}\r\n\r\nbody.ro-theater-active {\r\n  background-color: #050608 !important;\r\n}\r\n\r\nbody.ro-theater-active header,\r\nbody.ro-theater-active footer,\r\nbody.ro-theater-active .sidebar,\r\nbody.ro-theater-active .sidebar-right,\r\nbody.ro-theater-active nav {\r\n  opacity: 0.1 !important;\r\n  transition: opacity 0.3s ease;\r\n}\r\n\r\nbody.ro-theater-active header:hover,\r\nbody.ro-theater-active footer:hover,\r\nbody.ro-theater-active nav:hover {\r\n  opacity: 1 !important;\r\n}\r\n\r\nbody.ro-theater-active .player-wrapper,\r\nbody.ro-theater-active .player-container,\r\nbody.ro-theater-active #player,\r\nbody.ro-theater-active #live-player-content,\r\nbody.ro-theater-active #embed-player,\r\nbody.ro-theater-active #iframe-stream,\r\nbody.ro-theater-active .col-player,\r\nbody.ro-theater-active iframe {\r\n  max-height: 88vh !important;\r\n  box-shadow: 0 10px 50px rgba(81, 240, 133, 0.25) !important;\r\n  border-radius: 14px;\r\n}\r\n\n\n/* ═══════════════════════════════════════════════════════════════\r\n   Cinema Pro Suite - VIP Hub UI CSS\r\n   Glassmorphism Luxury — Black & Gold\r\n   ═══════════════════════════════════════════════════════════════ */\r\n\r\n#ro-vip-hub {\r\n  position: fixed;\r\n  bottom: 24px;\r\n  right: 24px;\r\n  z-index: 2147483647;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: flex-end;\r\n  gap: 10px;\r\n  font-family: 'Fira Code', 'Cascadia Code', 'Courier New', Courier, monospace, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\r\n  user-select: none;\r\n}\r\n\r\n#ro-hub-toggle {\r\n  width: 48px;\r\n  height: 48px;\r\n  border-radius: 50%;\r\n  background: linear-gradient(135deg, #ffd98a 0%, #ffb627 55%, #c8902a 100%);\r\n  box-shadow: 0 4px 22px rgba(255, 182, 39, 0.45);\r\n  border: 2px solid rgba(255, 235, 190, 0.5);\r\n  cursor: pointer;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: #1a1206;\r\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\r\n}\r\n\r\n#ro-hub-toggle:hover {\r\n  transform: scale(1.1) rotate(6deg);\r\n  box-shadow: 0 6px 28px rgba(255, 182, 39, 0.7);\r\n}\r\n\r\n#ro-hub-toggle svg {\r\n  width: 24px;\r\n  height: 24px;\r\n  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));\r\n}\r\n\r\n#ro-hub-menu {\r\n  display: none;\r\n  background: rgba(11, 10, 8, 0.94);\r\n  backdrop-filter: blur(14px);\r\n  -webkit-backdrop-filter: blur(14px);\r\n  border: 1px solid rgba(255, 205, 120, 0.18);\r\n  border-radius: 14px;\r\n  padding: 14px;\r\n  width: 295px;\r\n  box-shadow:\r\n    0 16px 40px rgba(0, 0, 0, 0.75),\r\n    inset 0 1px 0 rgba(255, 235, 190, 0.18),\r\n    0 0 24px rgba(255, 182, 39, 0.12);\r\n  flex-direction: column;\r\n  gap: 8px;\r\n  color: #f6f2e9;\r\n}\r\n\r\n#ro-hub-menu.show {\r\n  display: flex;\r\n  animation: roFadeIn 0.2s ease-out;\r\n}\r\n\r\n@keyframes roFadeIn {\r\n  from { opacity: 0; transform: translateY(8px); }\r\n  to { opacity: 1; transform: translateY(0); }\r\n}\r\n\r\n.ro-menu-btn {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  background: rgba(255, 210, 120, 0.045);\r\n  border: 1px solid rgba(255, 205, 120, 0.14);\r\n  color: #f6f2e9;\r\n  padding: 8px 12px;\r\n  border-radius: 9px;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.18s ease;\r\n  text-align: left;\r\n}\r\n\r\n.ro-menu-btn:hover {\r\n  background: rgba(255, 182, 39, 0.14);\r\n  border-color: #ffb627;\r\n  color: #ffd98a;\r\n  transform: translateX(-2px);\r\n  box-shadow: 0 0 14px rgba(255, 182, 39, 0.2);\r\n}\r\n\r\n.ro-btn-left {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.ro-icon {\r\n  width: 15px;\r\n  height: 15px;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: #ffb627;\r\n}\r\n\r\n.ro-icon svg {\r\n  width: 15px;\r\n  height: 15px;\r\n}\r\n\r\n.ro-badge {\r\n  font-size: 10px;\r\n  font-weight: 700;\r\n  padding: 2px 6px;\r\n  border-radius: 4px;\r\n  background: rgba(0, 0, 0, 0.35);\r\n  border: 1px solid rgba(255, 205, 120, 0.14);\r\n  color: #ffb627;\r\n}\r\n\r\n#ro-stream-preview {\r\n  display: none;\r\n  font-size: 10px;\r\n  padding: 6px 10px;\r\n  background: rgba(0, 0, 0, 0.55);\r\n  border-radius: 6px;\r\n  border: 1px dashed rgba(255, 182, 39, 0.4);\r\n  color: #ffd98a;\r\n  word-break: break-all;\r\n  line-height: 1.35;\r\n  margin-top: 2px;\r\n}\r\n\r\n.ro-dot {\r\n  display: inline-block;\r\n  width: 6px;\r\n  height: 6px;\r\n  border-radius: 50%;\r\n  background-color: #27c93f;\r\n  margin-right: 6px;\r\n  box-shadow: 0 0 6px #27c93f;\r\n}\r\n\r\n.ro-toast {\r\n  position: fixed;\r\n  top: 24px;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n  background: rgba(11, 10, 8, 0.94);\r\n  backdrop-filter: blur(14px);\r\n  -webkit-backdrop-filter: blur(14px);\r\n  border: 1px solid rgba(255, 205, 120, 0.3);\r\n  box-shadow:\r\n    0 12px 32px rgba(0, 0, 0, 0.7),\r\n    inset 0 1px 0 rgba(255, 235, 190, 0.2),\r\n    0 0 20px rgba(255, 182, 39, 0.25);\r\n  color: #ffd98a;\r\n  padding: 10px 18px;\r\n  border-radius: 10px;\r\n  font-size: 13px;\r\n  font-weight: 700;\r\n  letter-spacing: 0.04em;\r\n  z-index: 2147483647;\r\n  pointer-events: none;\r\n  animation: roToastPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);\r\n}\r\n\r\n@keyframes roToastPop {\r\n  from { opacity: 0; transform: translate(-50%, -10px) scale(0.95); }\r\n  to { opacity: 1; transform: translate(-50%, 0) scale(1); }\r\n}";

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


  // ─── TOAST NOTIFICATIONS (ZERO EMOJIS, CLEAN TEXT) ───
  function showToast(msg) {
    if (typeof document === "undefined" || !document.body) {
      console.log("[Cinema Pro]", msg);
      return;
    }
    const t = document.createElement("div");
    t.className = "ro-toast";
    t.innerHTML = msg;
    document.body.appendChild(t);
    setTimeout(() => {
      try { t.remove(); } catch (e) {}
    }, 2200);
  }
  if (typeof window !== "undefined") {
    window.showToast = showToast;
  }

  // ─── VIP CONTROL HUB DOM CREATION ───
  function initVipHub() {
    if (typeof document === "undefined") return;
    // Tuyệt đối không hiển thị VIP Control Hub trùng lặp bên trong iframe nhúng player
    if (typeof window !== "undefined" && window.self !== window.top) return;
    if (document.getElementById("ro-vip-hub")) return;
    if (!document.body) {
      document.addEventListener("DOMContentLoaded", () => setTimeout(initVipHub, 200), { once: true });
      return;
    }
    const isComic = (typeof isComicPage === "function" ? isComicPage() : (typeof window !== "undefined" && typeof window.isComicPage === "function" ? window.isComicPage() : false)) && !document.querySelector("video");
    const hub = document.createElement("div");
    hub.id = "ro-vip-hub";
    hub.innerHTML = isComic ? `
      <div id="ro-hub-menu">
        <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: #51f085; display: flex; justify-content: space-between; align-items: center;">
          <span class="ro-btn-left">
            <span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg></span>
            <span>Xôi Lạc TV (XoilacZ) VIP & Cinema Pro Suite</span>
          </span>
          <span style="font-size: 11px; opacity: 0.7;">v5.4</span>
        </div>
        <button class="ro-menu-btn" id="ro-comic-prev-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg></span><span>Chương Trước</span></span>
          <span class="ro-badge">Phím A / ←</span>
        </button>
        <button class="ro-menu-btn" id="ro-comic-next-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg></span><span>Chương Tiếp Theo</span></span>
          <span class="ro-badge">Phím D / →</span>
        </button>
        <button class="ro-menu-btn" id="ro-comic-up-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></span><span>Cuộn Lên 450px</span></span>
          <span class="ro-badge">Phím W / ↑</span>
        </button>
        <button class="ro-menu-btn" id="ro-comic-down-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></span><span>Cuộn Xuống 450px</span></span>
          <span class="ro-badge">Phím S / ↓</span>
        </button>
        <button class="ro-menu-btn" id="ro-fullscreen-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></span><span>Toàn Màn Hình</span></span>
          <span class="ro-badge">Phím F</span>
        </button>
        <button class="ro-menu-btn" id="ro-nukeads-btn" style="border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="9" x2="15" y1="9" y2="15"/><line x1="15" x2="9" y1="9" y2="15"/></svg></span><span>Diệt Sạch Banner Rác</span></span>
          <span class="ro-badge" style="color: #f87171;">Phím X</span>
        </button>
      </div>
      <div id="ro-hub-toggle" title="Web Enhancer Control Hub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg></div>
    ` : `
      <div id="ro-hub-menu">
        <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: #51f085; display: flex; justify-content: space-between; align-items: center;">
          <span class="ro-btn-left">
            <span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"/><line x1="7" x2="7" y1="2" y2="22"/><line x1="17" x2="17" y1="2" y2="22"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="2" x2="7" y1="7" y2="7"/><line x1="2" x2="7" y1="17" y2="17"/><line x1="17" x2="22" y1="17" y2="17"/><line x1="17" x2="22" y1="7" y2="7"/></svg></span>
            <span>Xôi Lạc TV (XoilacZ) VIP & Cinema Pro Suite</span>
          </span>
          <span style="font-size: 11px; opacity: 0.7;">v5.4</span>
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
      <div id="ro-hub-toggle" title="Web Enhancer Control Hub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg></div>
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

    const execAction = (fnName, ...args) => {
      try {
        if (typeof window !== "undefined" && typeof window[fnName] === "function") {
          return window[fnName](...args);
        }
        if (typeof eval !== "undefined") {
          const fn = eval("(typeof " + fnName + " === 'function' ? " + fnName + " : null)");
          if (fn) return fn(...args);
        }
      } catch (e) {
        console.warn("[Cinema Pro] Action not found:", fnName);
      }
    };

    bind("ro-comic-prev-btn", () => execAction("navigateComicChapter", -1));
    bind("ro-comic-next-btn", () => execAction("navigateComicChapter", 1));
    bind("ro-comic-up-btn", () => window.scrollBy({ top: -450, behavior: "smooth" }));
    bind("ro-comic-down-btn", () => window.scrollBy({ top: 450, behavior: "smooth" }));
    bind("ro-stream-preview", () => execAction("copyM3u8"));
    bind("ro-potplayer-btn", () => execAction("openPotPlayer"));
    bind("ro-vlc-btn", () => execAction("openVlcPlayer"));
    bind("ro-copym3u8-btn", () => execAction("copyM3u8"));
    bind("ro-m3ufile-btn", () => execAction("downloadM3uFile"));
    bind("ro-skipintro-btn", () => execAction("skipIntro", 85));
    bind("ro-fullscreen-btn", () => execAction("toggleFullscreen"));
    bind("ro-hdr-btn", () => execAction("toggleHdr"));
    bind("ro-theater-btn", () => execAction("toggleTheater"));
    bind("ro-nukeads-btn", () => execAction("nukeAdElements", true));
    bind("ro-vol-down", () => execAction("adjustVolume", -0.05));
    bind("ro-vol-up", () => execAction("adjustVolume", 0.05));
    bind("ro-speed-down", () => execAction("adjustSpeed", -1));
    bind("ro-speed-up", () => execAction("adjustSpeed", 1));
  }

  if (typeof window !== "undefined") {
    window.initVipHub = initVipHub;
  }



  const _showToast = (msg) => {
    try {
      if (typeof window !== "undefined" && typeof window.showToast === "function") {
        return window.showToast(msg);
      }
      if (typeof eval !== "undefined") {
        const fn = eval("(typeof showToast === 'function' ? showToast : null)");
        if (fn && fn !== _showToast) return fn(msg);
      }
    } catch (e) {}
    console.log("[Cinema Pro]", msg);
  };

  const getSafeCapturedStreamUrl = () => {
    if (typeof capturedStreamUrl !== "undefined" && capturedStreamUrl) return capturedStreamUrl;
    if (typeof window !== "undefined" && window.capturedStreamUrl) return window.capturedStreamUrl;
    if (typeof window !== "undefined" && typeof window.getCapturedStreamUrl === "function") {
      const u = window.getCapturedStreamUrl();
      if (u) return u;
    }
    try {
      const s = localStorage.getItem("RO_CAPTURED_STREAM");
      if (s) return s;
    } catch (e) {}
    return "";
  };

  const callEnsureStreamUrl = () => {
    try {
      if (typeof ensureStreamUrl === "function") ensureStreamUrl();
      else if (typeof window !== "undefined" && typeof window.ensureStreamUrl === "function") window.ensureStreamUrl();
    } catch (e) {}
  };

  var currentSpeed = (typeof currentSpeed !== "undefined" ? currentSpeed : ((typeof window !== "undefined" && window.__cinema_speed) || 1.0));
  var currentVolume = (typeof currentVolume !== "undefined" ? currentVolume : ((typeof window !== "undefined" && window.__cinema_volume) || 1.0));
  var isHdrEnabled = (typeof isHdrEnabled !== "undefined" ? isHdrEnabled : ((typeof window !== "undefined" && window.__cinema_hdr) || false));
  var isTheaterMode = (typeof isTheaterMode !== "undefined" ? isTheaterMode : ((typeof window !== "undefined" && window.__cinema_theater) || false));

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

  if (typeof window !== "undefined") {
    window.sendCommandToPlayer = sendCommandToPlayer;
  }


  function skipIntro(sec = 85) {
    sendCommandToPlayer({ type: "RO_CMD_SKIP_INTRO", seconds: sec });
    _showToast("Đã tua Intro: +" + sec + "s");
  }

  function seekRelative(delta = 5) {
    sendCommandToPlayer({ type: "RO_CMD_SEEK", delta });
    _showToast(delta > 0 ? ("Tua tới: +" + delta + "s") : ("Tua lùi: " + delta + "s"));
  }

  function seekToPercent(pct = 0) {
    sendCommandToPlayer({ type: "RO_CMD_SEEK_PERCENT", percent: pct });
    _showToast("Vị trí video: " + pct + "%");
  }

  function adjustVolume(delta) {
    let newVol = Math.round((currentVolume + delta) * 100) / 100;
    newVol = Math.max(0, Math.min(1.0, newVol));
    currentVolume = newVol;
    sendCommandToPlayer({ type: "RO_CMD_VOLUME", volume: currentVolume });
    _showToast("Âm lượng: " + Math.round(currentVolume * 100) + "%");
  }

  function toggleHdr() {
    isHdrEnabled = !isHdrEnabled;
    sendCommandToPlayer({ type: "RO_CMD_TOGGLE_HDR" });
    _showToast(isHdrEnabled ? "Anime OLED HDR: BẬT" : "OLED HDR: TẮT");
  }

  function toggleTheater() {
    isTheaterMode = !isTheaterMode;
    document.body.classList.toggle("ro-theater-active", isTheaterMode);
    _showToast(isTheaterMode ? "Chế độ Rạp phim: BẬT" : "Chế độ Rạp phim: TẮT");
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      try { document.exitFullscreen().catch(() => {}); } catch (e) {}
      _showToast("Đã thoát Toàn màn hình");
    } else {
      const playerWrapper = document.querySelector(".player-wrapper, .player-container, #player, iframe, video");
      const target = playerWrapper || document.documentElement;
      if (target && target.requestFullscreen) {
        try { target.requestFullscreen().catch(() => {}); } catch (e) {}
      }
      sendCommandToPlayer({ type: "RO_CMD_FULLSCREEN" });
      _showToast("Toàn màn hình");
    }
  }

  function isNoRefererCdn(url) {
    if (!url || typeof url !== "string") return false;
    const l = url.toLowerCase();
    const hasMetaNoReferrer = Boolean(document.querySelector('meta[name="referrer"][content="no-referrer"]'));
    return (
      hasMetaNoReferrer ||
      l.includes("cdninstagram.com") ||
      l.includes("fbcdn.net") ||
      l.includes("fbsbx.com") ||
      l.includes("akamaihd.net") ||
      l.includes("discordapp.com") ||
      l.includes("discord.com") ||
      l.includes("media.discordapp.net")
    );
  }

  function openPotPlayer() {
    callEnsureStreamUrl();
    const stream = getSafeCapturedStreamUrl();
    if (!stream) {
      _showToast("Đang chờ bắt link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = stream.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).catch(() => {});
    }
    function getStreamReferer(url) {
      if (isNoRefererCdn(url)) return "";
      if (url.includes("edgemaxcdn") || url.includes("100ycdn") || url.includes("cctvsignal") || (typeof location !== "undefined" && location.hostname && (location.hostname.includes("chuoichien") || location.hostname.includes("cctvsignal")))) {
        return "https://fhd-01.cctvsignal.xyz/";
      }
      return (typeof location !== "undefined" && location.href) ? location.href : "";
    }

    const ref = getStreamReferer(cleanUrl);
    const potTarget = ref ? (cleanUrl + "|Referer=" + encodeURIComponent(ref)) : cleanUrl;
    window.location.href = "potplayer://" + potTarget;
    _showToast("Đang mở PotPlayer...");
  }

  function openVlcPlayer() {
    callEnsureStreamUrl();
    const stream = getSafeCapturedStreamUrl();
    if (!stream) {
      _showToast("Đang chờ bắt link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = stream.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).catch(() => {});
    }
    window.location.href = "vlc://" + encodeURIComponent(cleanUrl);
    _showToast("Đang mở VLC... Nếu VLC báo lỗi MRL do CDN chặn Referer, hãy bấm 'Tải Playlist .M3U' hoặc dùng PotPlayer!");
  }

  function copyM3u8() {
    callEnsureStreamUrl();
    const stream = getSafeCapturedStreamUrl();
    if (!stream) {
      _showToast("Đang tìm link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = stream.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).then(() => {
        _showToast("Đã copy link M3U8 chuẩn: " + (cleanUrl.length > 40 ? cleanUrl.slice(0, 37) + "..." : cleanUrl));
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
      _showToast("Đã copy link M3U8 chuẩn: " + (text.length > 40 ? text.slice(0, 37) + "..." : text));
    } catch (e) {
      prompt("Sao chép link video:", text);
    }
  }

  function downloadM3uFile() {
    callEnsureStreamUrl();
    const stream = getSafeCapturedStreamUrl();
    if (!stream) {
      _showToast("Chưa có link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = stream.trim();
    const title = (document.title || "Cinema_Pro_Stream").replace(/[/\?%*:|"<>]/g, "_").trim();
    function getStreamReferer(url) {
      if (isNoRefererCdn(url)) return "";
      if (url.includes("edgemaxcdn") || url.includes("100ycdn") || url.includes("cctvsignal") || (typeof location !== "undefined" && location.hostname && (location.hostname.includes("chuoichien") || location.hostname.includes("cctvsignal")))) {
        return "https://fhd-01.cctvsignal.xyz/";
      }
      return (typeof location !== "undefined" && location.href) ? location.href : "";
    }
    const ref = getStreamReferer(cleanUrl);
    const ua = navigator.userAgent || "Mozilla/5.0";
    const refLine = ref ? ("#EXTVLCOPT:http-referrer=" + ref + "\n") : "";
    const content = "#EXTM3U\n#EXTINF:-1," + title + "\n" + refLine + "#EXTVLCOPT:http-user-agent=" + ua + "\n#EXTVLCOPT:network-caching=1000\n" + cleanUrl + "\n";
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
    _showToast("Đã tải playlist .m3u (Kèm Referer cho VLC & PotPlayer)!");
  }

  function adjustSpeed(delta) {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0];
    let idx = speeds.indexOf(currentSpeed);
    if (idx === -1) idx = 2;
    idx = Math.max(0, Math.min(speeds.length - 1, idx + delta));
    currentSpeed = speeds[idx];
    sendCommandToPlayer({ type: "RO_CMD_SET_SPEED", speed: currentSpeed });
    _showToast("Tốc độ phát: " + currentSpeed + "x");
  }

  function isComicPage() {
    return Boolean(
      document.querySelector(".chapter-images-container") ||
      document.querySelector("[data-chapter-navigation]") ||
      document.querySelector(".chapter-choose") ||
      document.querySelector(".page-chapter") ||
      document.querySelector(".select-chapter") ||
      document.querySelector("#select_chapter") ||
      document.querySelector("#chapter_content") ||
      document.querySelector(".reading-detail") ||
      document.querySelector(".chapter-content") ||
      document.querySelector("#scontent") ||
      document.querySelector(".box_text") ||
      (typeof location !== "undefined" && location.hostname && (
        location.hostname.includes("zettruyen") ||
        location.hostname.includes("toptruyen") ||
        location.hostname.includes("nettruyen") ||
        location.hostname.includes("truyenqq") ||
        location.hostname.includes("truyenvn") ||
        location.hostname.includes("luotnovel") ||
        location.hostname.includes("ghientruyen")
      ))
    );
  }

  function navigateComicChapter(direction) {
    if (direction < 0) {
      let prevBtn = document.querySelector(
        "[data-prev-chapter-container] a, [data-prev-chapter-container] button, a#prevChapter, #prevChapter, a.prev-chapter, a.chapter-previous, a.previous-chapter, a.previous-chapter-mobile, a.previous-chapter-mobi, .chapter-prev a, a.prev, a.back, a.btn-prev, button.btn-prev, a.prev_page, a.link-prev-chap, #prev_chap, a.prev-chap, .nav-previous a, a[rel='prev'], a[title*='Chương trước'], a[title*='Tập trước']"
      );
      if (!prevBtn && document.querySelectorAll) {
        const candidates = Array.from(document.querySelectorAll("a, button"));
        prevBtn = candidates.find(el => {
          const t = (el.textContent || "").trim();
          return t.includes("Chương trước") || t.includes("Tập trước") || t.includes("Chap trước");
        });
      }
      if (prevBtn) {
        prevBtn.click();
        _showToast("Đang chuyển về chương trước...");
        return;
      }
    } else {
      let nextBtn = document.querySelector(
        "[data-next-chapter-container] a, [data-next-chapter-container] button, a#nextChapter, #nextChapter, a.next-chapter, a.chapter-next, a.next-chapter-mobile, a.next-chapter-mobi, .chapter-next a, a.next, a.forward, a.btn-next, button.btn-next, a.next_page, a.link-next-chap, #next_chap, a.next-chap, .nav-next a, a[rel='next'], a[title*='Chương sau'], a[title*='Tập sau']"
      );
      if (!nextBtn && document.querySelectorAll) {
        const candidates = Array.from(document.querySelectorAll("a, button"));
        nextBtn = candidates.find(el => {
          const t = (el.textContent || "").trim();
          return t.includes("Chương sau") || t.includes("Tập sau") || t.includes("Chap sau") || t.includes("Chương tiếp");
        });
      }
      if (nextBtn) {
        nextBtn.click();
        _showToast("Đang chuyển tới chương tiếp theo...");
        return;
      }
    }

    const select = document.querySelector("select[data-chapter-dropdown], select.chapter-choose, select#select_chapter, select.select-chapter, select#slt_list_chapters, select[name*='ddlSelectChapter'], select.ctl00_mainContent_ddlSelectChapter, select#ddlSelectChapter");
    if (select && select.options && select.options.length > 1) {
      const nextIdx = select.selectedIndex + (direction < 0 ? 1 : -1);
      if (nextIdx >= 0 && nextIdx < select.options.length) {
        select.selectedIndex = nextIdx;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        const optVal = select.options[nextIdx].value;
        if (optVal && optVal.startsWith("http")) {
          location.href = optVal;
        }
        _showToast("Đang tải: " + (select.options[nextIdx].text || "Chương mới"));
        return;
      }
    }
    _showToast(direction < 0 ? "Đã ở chương đầu tiên!" : "Đã ở chương mới nhất!");
  }

  // ─── GLOBAL KEYBOARD SHORTCUTS ───
  window.addEventListener("keydown", function (e) {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || e.target?.isContentEditable) return;
    const key = e.key.toLowerCase();

    // Chế độ đọc truyện tranh (Comic/Manga Reading Mode)
    if (isComicPage() && !document.querySelector("video")) {
      if (key === "a" || key === "arrowleft") {
        e.preventDefault();
        navigateComicChapter(-1);
        return;
      } else if (key === "d" || key === "arrowright") {
        e.preventDefault();
        navigateComicChapter(1);
        return;
      } else if (key === "w" || key === "arrowup") {
        e.preventDefault();
        window.scrollBy({ top: -450, behavior: "smooth" });
        return;
      } else if (key === "s" || key === "arrowdown") {
        e.preventDefault();
        window.scrollBy({ top: 450, behavior: "smooth" });
        return;
      } else if (key === "f") {
        e.preventDefault();
        if (document.fullscreenElement) {
          try { document.exitFullscreen().catch(() => {}); } catch (err) {}
        } else {
          const container = document.querySelector(".chapter-images-container") || document.documentElement;
          try { container.requestFullscreen().catch(() => {}); } catch (err) {}
        }
        return;
      }
    }

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
      if (typeof nukeAdElements === "function") nukeAdElements(true);
      else if (typeof window !== "undefined" && typeof window.nukeAdElements === "function") window.nukeAdElements(true);
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

  if (typeof window !== "undefined") {
    window.copyM3u8 = copyM3u8;
    window.openPotPlayer = openPotPlayer;
    window.openVlcPlayer = openVlcPlayer;
    window.downloadM3uFile = downloadM3uFile;
    window.skipIntro = skipIntro;
    window.toggleFullscreen = toggleFullscreen;
    window.toggleHdr = toggleHdr;
    window.toggleTheater = toggleTheater;
    window.adjustVolume = adjustVolume;
    window.adjustSpeed = adjustSpeed;
    window.isComicPage = isComicPage;
    window.navigateComicChapter = navigateComicChapter;
  }


  if (document.body) initVipHub();
  else document.addEventListener("DOMContentLoaded", initVipHub, { once: true });
  window.addEventListener("DOMContentLoaded", ensureStreamUrl);
  window.addEventListener("load", ensureStreamUrl);

  const brandTag = "[Cinema Pro]";
  console.log("%c" + brandTag + " " + "Xôi Lạc TV (XoilacZ) VIP & Cinema Pro Suite" + " Ready!", "font-size: 13px; font-weight: bold; color: #10b981;");
})();
