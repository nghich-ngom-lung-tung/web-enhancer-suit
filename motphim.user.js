// ==UserScript==
// @name         MotPhim VIP & Cinema Pro Suite
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  Chặn 100% quảng cáo Mọt Phim + Tóm link M3U8 PotPlayer/VLC + Skip Intro 85s + Bộ lọc Anime OLED HDR
// @author       nghich-ngom-lung-tung
// @match        *://*.motphim.to/*
// @match        *://*.motphimtv.me/*
// @match        *://*.motphimtv.top/*
// @match        *://*.motphim.net/*
// @match        *://*.streamvsmov.com/*
// @match        *://*.streamvsmov.net/*
// @match        *://*.vsmov.com/*
// @match        *://*.vsmov.net/*
// @match        *://*.streamc.xyz/*
// @match        *://embed*.streamc.xyz/*
// @match        *://*.stream*.xyz/*
// @match        *://*.stream*.top/*
// @match        *://*.stream*.net/*
// @match        *://*.stream*.org/*
// @match        *://*.stream*.cc/*
// @match        *://*.stream*.co/*
// @match        *://*.goatembed.com/*
// @match        *://*.emturbovid.com/*
// @match        *://*.turboviplay.com/*
// @match        *://*.streamtape.com/*
// @match        *://*.streamtape.net/*
// @match        *://*.doodstream.com/*
// @match        *://*.dood.*/*
// @match        *://*.nguonc.com/*
// @match        *://api.nguonc.com/*
// @match        *://*.phimapi.com/*
// @match        *://player.phimapi.com/*
// @match        *://*.2embed.cc/*
// @match        *://*.2embed.to/*
// @match        *://*.vidsrc.to/*
// @match        *://*.vidsrc.me/*
// @match        *://*.vidsrc.net/*
// @match        *://*.streamwish.to/*
// @match        *://*.streamwish.com/*
// @match        *://*.filelions.to/*
// @match        *://*.filelions.com/*
// @match        *://*.vidcdn.pro/*
// @match        *://*.vidembed.cc/*
// @match        *://*.superembed.stream/*
// @match        *://*.streamz.ws/*
// @match        *://*.streamhub.to/*
// @allFrames    true
// @run-at       document-start
// @grant        none
// @license      MIT
// @icon         https://rophim1.vip/apple-icon.png
// @homepageURL  https://github.com/nghich-ngom-lung-tung/web-enhancer-suit
// @downloadURL  https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/motphim.user.js
// @updateURL    https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/motphim.user.js
// ==/UserScript==

(function () {
  "use strict";

  function unwrapStreamUrl(url) {
    if (!url || typeof url !== "string") return "";
    let clean = url.trim();
    clean = clean.split("\/").join("/").replace(/&amp;/g, "&");
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
  // ⚡ 1. IFRAME EMBED PLAYER GUARD KILLER & STREAM SNIFFER
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
        (u.includes(".mp4") && !u.includes("preview") && !u.includes("trailer"))
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

    // Sniff global stream variables on embed players (e.g. VSMov / JWPlayer / Hls.js / Motchill)
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

    // Sniff DOM video element src & performance timing in iframe
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
          if (u) notifyStream(u);
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
            try { if (val) notifyStream(val); } catch (e) {}
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
            try { if (url) notifyStream(url); } catch (e) {}
            return origLoad.apply(this, arguments);
          };
        }
      }
      if (window.Hls) hookHlsProto(window.Hls);
      let _curHls = window.Hls;
      Object.defineProperty(window, "Hls", {
        configurable: true,
        enumerable: true,
        get: () => _curHls,
        set: (v) => {
          _curHls = v;
          hookHlsProto(v);
        }
      });
    } catch (e) {}

    window.addEventListener("message", function (e) {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "RO_STREAM_FOUND") {
        try { window.parent.postMessage(e.data, "*"); } catch (err) {}
        try { if (window.top && window.top !== window.parent) window.top.postMessage(e.data, "*"); } catch (err) {}
      } else if (e.data.type === "RO_STREAM_PING") {
        if (lastNotifiedStream) {
          try { window.parent.postMessage({ type: "RO_STREAM_FOUND", streamUrl: lastNotifiedStream }, "*"); } catch (err) {}
          try { if (window.top && window.top !== window.parent) window.top.postMessage({ type: "RO_STREAM_FOUND", streamUrl: lastNotifiedStream }, "*"); } catch (err) {}
        }
      }
      const video = document.querySelector("video");
      if (e.data.type === "RO_CMD_SKIP_INTRO") {
        const s = e.data.seconds || 85;
        if (video) video.currentTime = Math.min(video.duration || Infinity, video.currentTime + s);
        else if (activePlayer?.seek) activePlayer.seek(activePlayer.getPosition() + s);
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
  // 🛡️ 2. WEBSITE CHÍNH - ANTI-ADBLOCK, PROBE DEFUSER & POPUP TRAP
  // ═══════════════════════════════════════════════════════════════
  try {
    localStorage.setItem("ro_probe_", "9999999999999");
    const origSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === "probe_until" || key === "adblock_detected") return;
      return origSetItem.apply(this, arguments);
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

  // ═══════════════════════════════════════════════════════════════
  // 📺 3. M3U8 SNIFFER & POSTMESSAGE BRIDGE
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

  function checkAndCaptureUrl(url) {
    if (!url || typeof url !== "string") return false;
    if (url.startsWith("blob:") || url.startsWith("data:")) return false;
    const clean = unwrapStreamUrl(url);
    if (!clean) return false;
    const u = clean.toLowerCase();
    if (
      u.includes(".m3u8") ||
      u.includes("/hls/") ||
      u.includes("master") ||
      u.includes("playlist") ||
      u.includes(".mpd") ||
      (u.includes(".mp4") && !u.includes("preview") && !u.includes("trailer"))
    ) {
      capturedStreamUrl = clean;
      console.log("%c🎬 [Cinema Pro Sniffer] Đã bắt được stream chuẩn:", "color: #51f085; font-weight: bold;", clean);
      const btn = document.getElementById("ro-potplayer-btn");
      if (btn) {
        btn.style.borderColor = "#51f085";
        btn.style.color = "#51f085";
      }
      const vlcBtn = document.getElementById("ro-vlc-btn");
      if (vlcBtn) {
        vlcBtn.style.borderColor = "#51f085";
        vlcBtn.style.color = "#51f085";
      }
      const copyBtn = document.getElementById("ro-copym3u8-btn");
      if (copyBtn) {
        copyBtn.style.borderColor = "#51f085";
        copyBtn.style.color = "#51f085";
      }
      const fileBtn = document.getElementById("ro-m3ufile-btn");
      if (fileBtn) {
        fileBtn.style.borderColor = "#51f085";
        fileBtn.style.color = "#51f085";
      }
      const preview = document.getElementById("ro-stream-preview");
      if (preview) {
        preview.style.display = "block";
        const shortUrl = clean.length > 38 ? clean.slice(0, 35) + "..." : clean;
        preview.textContent = "🟢 " + shortUrl;
        preview.title = "Bấm để copy link: " + clean;
      }
      return true;
    }
    return false;
  }

  function extractStreamFromObject(obj) {
    if (!obj) return;
    if (typeof obj === "string") {
      checkAndCaptureUrl(obj);
      return;
    }
    if (Array.isArray(obj)) {
      obj.forEach(extractStreamFromObject);
      return;
    }
    if (typeof obj === "object") {
      for (const k in obj) {
        if (typeof obj[k] === "string") {
          const val = obj[k].toLowerCase();
          if (
            val.includes(".m3u8") ||
            val.includes("/hls/") ||
            val.includes("master") ||
            val.includes("playlist") ||
            val.includes(".mp4") ||
            ((k === "file" || k === "url" || k === "link" || k === "src" || k === "stream" || k === "play_url") && (val.startsWith("http") || val.startsWith("/")))
          ) {
            checkAndCaptureUrl(obj[k]);
          }
        } else if (typeof obj[k] === "object") {
          extractStreamFromObject(obj[k]);
        }
      }
    }
  }

  function scanIframesForStreams() {
    // 0. Quét URL trang hiện tại nếu mở trực tiếp trang player API
    try {
      const cur = new URL(location.href);
      for (const [k, val] of cur.searchParams.entries()) {
        if (!val || typeof val !== "string") continue;
        if (val.includes(".m3u8") || val.includes(".mp4") || val.includes("/hls/")) {
          checkAndCaptureUrl(val);
        }
      }
    } catch (e) {}

    // 1. Quét dữ liệu giải mã __V_DATA__ nếu có trên window (như Motchill)
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

    // 2. Quét iframe
    document.querySelectorAll("iframe").forEach(f => {
      const src = f.src || f.getAttribute("src") || f.getAttribute("data-src") || "";
      if (!src) return;
      
      // streamvsmov pattern: /video/{hash} -> {origin}/stream/{hash}/master.m3u8
      if (src.includes("vsmov") && src.includes("/video/")) {
        const parts = src.split("/video/");
        if (parts.length === 2) {
          const origin = parts[0];
          const hash = parts[1].split("?")[0].split("#")[0].split("/")[0].trim();
          if (hash) {
            checkAndCaptureUrl(`${origin}/stream/${hash}/master.m3u8`);
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
            (n.includes(".mp4") && !n.includes("preview") && !n.includes("trailer"))
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
    const tokens = str.split(/[s"'<>{}()[]`]+/);
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
        t.startsWith("https:\/\/") ||
        t.startsWith("http:\/\/")
      ) {
        if (t.includes(".m3u8") || t.includes("/hls/") || t.includes(".mpd") || t.includes(".mp4")) {
          t = t.replace(/[\,;)]+$/, "");
          results.push(t);
        }
      }
    }
    return results;
  }

  function scanPageScriptsAndDom() {
    if (capturedStreamUrl) return capturedStreamUrl;
    
    // 1. Quét các thẻ <script> trên trang
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

    // 2. Quét các thuộc tính HTML trên trang
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

    // 3. Fallback: Quét toàn bộ HTML tài liệu
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

  // Quét định kỳ iframe, video tag, script tag & performance timing
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

  function isAdApi(url) {
    if (!url || typeof url !== "string") return false;
    const u = url.toLowerCase();
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
      u.includes("vsbet")
    );
  }

  // Sniff fetch trên trang chính & Chặn triệt để API banner
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
          const emptyStr = JSON.stringify({ status: 200, success: true, data: [], items: [], banners: [], result: [] });
          Object.defineProperty(xhr, "responseText", { value: emptyStr, configurable: true, writable: true });
          Object.defineProperty(xhr, "response", { value: emptyStr, configurable: true, writable: true });
          Object.defineProperty(xhr, "status", { value: 200, configurable: true, writable: true });
        } catch (e) {}
      }
      
      if (origSend) return origSend.apply(this, arguments);
    };
    return xhr;
  };
  try {
    window.XMLHttpRequest.prototype = origXhrMain.prototype;
    Object.keys(origXhrMain).forEach(k => {
      try { window.XMLHttpRequest[k] = origXhrMain[k]; } catch (e) {}
    });
  } catch (e) {}

  // ═══════════════════════════════════════════════════════════════
  // 🎨 4. CSS DỌN SẠCH QUẢNG CÁO & THEATER MODE TOÀN TRANG
  // ═══════════════════════════════════════════════════════════════
  const css = `
    /* Xóa sạch mọi banner quảng cáo */
    .ad-container, .ads-holder, .banner-left, .banner-right,
    div[id*="ad-"], div[class*="banner-ads"], div[id*="catfish"],
    .ads-wrapper, #chancoc, .modal-adblock, .adv-holder, .pm-ads,
    .hh3d-ads, .dp-ads, .tvhay-ads, .ah-ads, #box-ads, .ah-banner,
    .bl-ads, .a47-ads, .ophim-ads, .biphim-ads, .dhtv-ads,
    .motphim-ads, .mephim-ads, .ghienphim-ads, .fullphim-ads, .phimhay-ads,
    .atvn-ads, .hhkf-ads, .hhpanda-ads, .vst-ads, .p247-ads, .phd-ads, .pbh-ads,
    .pv-ads, .btv-ads, .hdo-ads, .chay-ads, .xpp-ads, .ts-ads, .ss-ads,
    [class*="ad_placement"], [id*="google_ads"], div[style*="z-index: 9999999"],
    div[style*="zIndex: 9999999"], div[style*="backdrop-filter: blur(25px)"],
    /* Diệt sạch banner catfish, fixed bottom bar và cá cược */
    .catfish, #catfish, .catfish-banner, #catfish-banner, div[class*="catfish"], div[id*="catfish"],
    div[class*="bottom-ads"], div[class*="bottom_ads"], div[class*="bottom-banner"], div[class*="bottom_banner"],
    div[id*="bottom-ads"], div[id*="bottom_ads"], div[id*="bottom-banner"], div[id*="bottom_banner"],
    div[class*="footer-ads"], div[class*="footer_ads"], div[class*="footer-banner"], div[class*="footer_banner"],
    div[class*="floating-banner"], div[class*="floating_banner"], div[class*="float-ads"], div[class*="float_ads"],
    div[class*="sticky-ads"], div[class*="sticky-banner"], div[id*="sticky-ads"], div[id*="sticky-banner"],
    div[class*="qc_bottom"], div[id*="qc_bottom"], div[class*="qc-bottom"], div[id*="qc-bottom"],
    div[id*="box-bottom"], div[class*="box-bottom"], div[id*="ads_bottom"], div[class*="ads_bottom"],
    div[class*="banner_bottom"], div[id*="banner_bottom"], div[class*="banner-bottom"], div[id*="banner-bottom"],
    div[id*="floating_bottom"], div[class*="floating_bottom"], div[id*="float_bottom"],
    /* Diệt tận gốc Banner Rophim: sspp-area, display-single, 9922, 154.82, media gif */
    .sspp-area, [class*="sspp-area"], [class*="sspp_area"], [class*="sspp-"],
    .display-single, [class*="display-single"], .is-demo, [class*="is-demo"],
    .is-image, div[class*="is-image"],
    a[href*="154.82."], a[href*="2138046"], a[href*="9922"],
    img[src*="/media/"][src*=".gif"],
    div.slide:has(.sspp-area), div.slide:has(.display-single),
    div.fluid-gap:has(.sspp-area), div.fluid-gap:has(.display-single),
    a[href*="vsbet"], a[href*="bet88"], a[href*="colatv"], a[href*="colascore"], a[href*="kubet"], a[href*="fun88"],
    a[href*="w88"], a[href*="fb88"], a[href*="bk8"], a[href*="casino"], a[href*="nhacai"], a[href*="nohu"],
    a[href*="taixiu"], a[href*="gamebai"], a[href*="keonhacai"], a[href*="bongda"], a[href*="link1s"],
    div[style*="position: fixed"][style*="bottom: 0"]:not(#ro-vip-hub):not(#ro-hub-menu),
    div[style*="position: fixed"][style*="bottom:0"]:not(#ro-vip-hub):not(#ro-hub-menu),
    div[style*="position:fixed"][style*="bottom: 0"]:not(#ro-vip-hub):not(#ro-hub-menu),
    div[style*="position:fixed"][style*="bottom:0"]:not(#ro-vip-hub):not(#ro-hub-menu) {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      max-height: 0 !important;
      pointer-events: none !important;
      opacity: 0 !important;
    }

    .ad-container, .ads-holder, .banner-left, .banner-right, div[id*="ad-"], div[class*="banner-ads"], div[id*="catfish"], .ads-wrapper, #chancoc, .modal-adblock, .motphim-ads

    html, body {
      overflow: auto !important;
      position: static !important;
    }

    video.ro-enhanced-hdr {
      filter: contrast(1.10) saturate(1.25) brightness(1.04) !important;
    }

    body.ro-theater-active {
      background-color: #050608 !important;
    }
    body.ro-theater-active header,
    body.ro-theater-active footer,
    body.ro-theater-active .sidebar,
    body.ro-theater-active .sidebar-right,
    body.ro-theater-active nav {
      opacity: 0.1 !important;
      transition: opacity 0.3s ease;
    }
    body.ro-theater-active header:hover,
    body.ro-theater-active footer:hover,
    body.ro-theater-active nav:hover {
      opacity: 1 !important;
    }
    body.ro-theater-active .player-wrapper,
    body.ro-theater-active .player-container,
    body.ro-theater-active #player,
    body.ro-theater-active iframe {
      max-height: 88vh !important;
      box-shadow: 0 10px 50px rgba(81, 240, 133, 0.25) !important;
      border-radius: 14px;
    }

    /* VIP Floating Control Hub */
    #ro-vip-hub {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #ro-hub-toggle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      box-shadow: 0 4px 20px rgba(16, 185, 129, 0.45);
      border: 2px solid rgba(255, 255, 255, 0.3);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
    }
    #ro-hub-toggle:hover {
      transform: scale(1.1) rotate(10deg);
      box-shadow: 0 6px 26px rgba(16, 185, 129, 0.65);
    }
    #ro-hub-menu {
      display: none;
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 14px;
      width: 290px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
      flex-direction: column;
      gap: 8px;
      color: #e2e8f0;
    }
    #ro-hub-menu.show {
      display: flex;
      animation: roFadeIn 0.2s ease-out;
    }
    @keyframes roFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .ro-menu-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #f1f5f9;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
      text-align: left;
    }
    .ro-menu-btn:hover {
      background: rgba(16, 185, 129, 0.18);
      border-color: rgba(16, 185, 129, 0.4);
      transform: translateX(-2px);
    }
    .ro-badge {
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.1);
      color: #a1a1aa;
    }
    .ro-toast {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 2147483647;
      background: rgba(15, 23, 42, 0.95);
      color: #51f085;
      padding: 10px 18px;
      border-radius: 10px;
      border: 1px solid rgba(81, 240, 133, 0.4);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      font-size: 14px;
      font-weight: 600;
      pointer-events: none;
      animation: roToastAnim 2.2s forwards;
    }
    @keyframes roToastAnim {
      0% { opacity: 0; transform: translateY(-10px); }
      15% { opacity: 1; transform: translateY(0); }
      80% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-10px); }
    }
  `;

  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  (document.head || document.documentElement).appendChild(styleEl);

  function showToast(msg) {
    const t = document.createElement("div");
    t.className = "ro-toast";
    t.innerHTML = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  function skipIntro(sec = 85) {
    sendCommandToPlayer({ type: "RO_CMD_SKIP_INTRO", seconds: sec });
    showToast(`⏭️ Đã tua Intro: +${sec}s`);
  }

  function seekRelative(delta = 5) {
    sendCommandToPlayer({ type: "RO_CMD_SEEK", delta });
    showToast(delta > 0 ? `⏩ Tua tới: +${delta}s` : `⏪ Tua lùi: ${delta}s`);
  }

  function seekToPercent(pct = 0) {
    sendCommandToPlayer({ type: "RO_CMD_SEEK_PERCENT", percent: pct });
    showToast(`🎯 Vị trí video: ${pct}%`);
  }

  function adjustVolume(delta) {
    let newVol = Math.round((currentVolume + delta) * 100) / 100;
    newVol = Math.max(0, Math.min(1.0, newVol));
    currentVolume = newVol;
    sendCommandToPlayer({ type: "RO_CMD_VOLUME", volume: currentVolume });
    showToast(`🔊 Âm lượng: ${Math.round(currentVolume * 100)}%`);
  }

  function toggleHdr() {
    isHdrEnabled = !isHdrEnabled;
    sendCommandToPlayer({ type: "RO_CMD_TOGGLE_HDR" });
    showToast(isHdrEnabled ? "✨ Anime OLED HDR: BẬT" : "🌑 OLED HDR: TẮT");
  }

  function toggleTheater() {
    isTheaterMode = !isTheaterMode;
    document.body.classList.toggle("ro-theater-active", isTheaterMode);
    showToast(isTheaterMode ? "🎭 Chế độ Rạp phim: BẬT" : "🎭 Chế độ Rạp phim: TẮT");
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      try { document.exitFullscreen().catch(() => {}); } catch (e) {}
      showToast("🗗 Đã thoát Toàn màn hình");
    } else {
      const playerWrapper = document.querySelector(".player-wrapper, .player-container, #player, iframe, video");
      const target = playerWrapper || document.documentElement;
      if (target && target.requestFullscreen) {
        try { target.requestFullscreen().catch(() => {}); } catch (e) {}
      }
      sendCommandToPlayer({ type: "RO_CMD_FULLSCREEN" });
      showToast("⛶ Toàn màn hình");
    }
  }

  function openPotPlayer() {
    ensureStreamUrl();
    if (!capturedStreamUrl) {
      showToast("⚠️ Đang chờ bắt link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = capturedStreamUrl.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).catch(() => {});
    }
    window.location.href = `potplayer://${cleanUrl}`;
    showToast("🚀 Đang mở PotPlayer...");
  }

  function openVlcPlayer() {
    ensureStreamUrl();
    if (!capturedStreamUrl) {
      showToast("⚠️ Đang chờ bắt link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = capturedStreamUrl.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).catch(() => {});
    }
    window.location.href = `vlc://${encodeURIComponent(cleanUrl)}`;
    showToast("🧡 Đang mở VLC Player (và đã copy link vào Clipboard)...");
  }

  function copyM3u8() {
    ensureStreamUrl();
    if (!capturedStreamUrl) {
      showToast("⚠️ Đang tìm link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = capturedStreamUrl.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).then(() => {
        showToast("📋 Đã copy link M3U8 chuẩn: " + (cleanUrl.length > 40 ? cleanUrl.slice(0, 37) + "..." : cleanUrl));
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
      showToast("📋 Đã copy link M3U8 chuẩn: " + (text.length > 40 ? text.slice(0, 37) + "..." : text));
    } catch (e) {
      prompt("Sao chép link video:", text);
    }
  }

  function downloadM3uFile() {
    ensureStreamUrl();
    if (!capturedStreamUrl) {
      showToast("⚠️ Chưa có link video, hãy bấm Play trước!");
      return;
    }
    const title = (document.title || "Cinema_Pro_Stream").replace(/[/\\?%*:|"<>]/g, "_").trim();
    const content = `#EXTM3U\n#EXTINF:-1,${title}\n${capturedStreamUrl}\n`;
    const blob = new Blob([content], { type: "audio/x-mpegurl" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${title}.m3u`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(a.href);
    }, 1000);
    showToast("💾 Đã tải playlist .m3u (Bấm đúp để mở trực tiếp trong VLC/PotPlayer)!");
  }

  function adjustSpeed(delta) {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0];
    let idx = speeds.indexOf(currentSpeed);
    if (idx === -1) idx = 2;
    idx = Math.max(0, Math.min(speeds.length - 1, idx + delta));
    currentSpeed = speeds[idx];
    sendCommandToPlayer({ type: "RO_CMD_SET_SPEED", speed: currentSpeed });
    showToast(`⚡ Tốc độ phát: ${currentSpeed}x`);
  }

  function initVipHub() {
    if (document.getElementById("ro-vip-hub")) return;
    const hub = document.createElement("div");
    hub.id = "ro-vip-hub";
    hub.innerHTML = `
      <div id="ro-hub-menu">
        <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px; color: #51f085; display: flex; justify-content: space-between;">
          <span>🎬 MotPhim VIP & Cinema Pro Suite</span>
          <span style="font-size: 11px; opacity: 0.7;">v5.0</span>
        </div>
        <div id="ro-stream-preview" style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 6px 10px; font-size: 11px; word-break: break-all; color: #51f085; font-family: monospace; display: none; cursor: pointer;" title="Bấm để copy link"></div>
        <button class="ro-menu-btn" id="ro-copym3u8-btn">
          <span>📋 Sao Chép Link Luồng</span>
          <span class="ro-badge">IDM/Pot</span>
        </button>
        <button class="ro-menu-btn" id="ro-m3ufile-btn">
          <span>💾 Tải Playlist .M3U</span>
          <span class="ro-badge">1-Click</span>
        </button>
        <button class="ro-menu-btn" id="ro-potplayer-btn">
          <span>🚀 Mở PotPlayer</span>
          <span class="ro-badge">Direct</span>
        </button>
        <button class="ro-menu-btn" id="ro-vlc-btn">
          <span>🧡 Mở VLC Player</span>
          <span class="ro-badge">Direct</span>
        </button>
        <button class="ro-menu-btn" id="ro-skipintro-btn">
          <span>⏭️ Bỏ Qua Intro 85s</span>
          <span class="ro-badge">S / I</span>
        </button>
        <button class="ro-menu-btn" id="ro-fullscreen-btn">
          <span>⛶ Toàn Màn Hình</span>
          <span class="ro-badge">Phím F</span>
        </button>
        <button class="ro-menu-btn" id="ro-hdr-btn">
          <span>✨ Anime OLED HDR</span>
          <span class="ro-badge">Phím E</span>
        </button>
        <button class="ro-menu-btn" id="ro-theater-btn">
          <span>🎭 Chế Độ Rạp Phim</span>
          <span class="ro-badge">Phím T</span>
        </button>
        <button class="ro-menu-btn" id="ro-nukeads-btn" style="border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
          <span>🧹 Diệt Sạch Banner Rác</span>
          <span class="ro-badge" style="color: #f87171;">Phím X</span>
        </button>
        <div style="display: flex; gap: 8px; margin-top: 4px;">
          <button class="ro-menu-btn" id="ro-vol-down" style="flex: 1; justify-content: center;" title="Giảm âm lượng">
            <span>🔉 Giảm (↓)</span>
          </button>
          <button class="ro-menu-btn" id="ro-vol-up" style="flex: 1; justify-content: center;" title="Tăng âm lượng">
            <span>🔊 Tăng (↑)</span>
          </button>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="ro-menu-btn" id="ro-speed-down" style="flex: 1; justify-content: center;">
            <span>➖ Chậm ([)</span>
          </button>
          <button class="ro-menu-btn" id="ro-speed-up" style="flex: 1; justify-content: center;">
            <span>➕ Nhanh (])</span>
          </button>
        </div>
      </div>
      <div id="ro-hub-toggle" title="Cinema Pro Control Hub">👑</div>
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

  // ═══════════════════════════════════════════════════════════════
  // 🧹 SMART AD & BANNER NUKER (DIỆT TẬN GỐC BANNER CATFISH & CÁ CƯỢC)
  // ═══════════════════════════════════════════════════════════════
  function nukeAdElements(notify = false) {
    let count = 0;
    const adSelectors = [
      '.catfish', '#catfish', '.catfish-banner', '#catfish-banner', '[class*="catfish"]', '[id*="catfish"]',
      '.sspp-area', '[class*="sspp-area"]', '[class*="sspp_area"]', '[class*="sspp-"]',
      '.display-single', '[class*="display-single"]', '.is-demo', '[class*="is-demo"]',
      '.is-image', 'div[class*="is-image"]',
      'a[href*="154.82."]', 'a[href*="2138046"]', 'a[href*="9922"]',
      'img[src*="/media/"][src*=".gif"]',
      '[class*="bottom-ads"]', '[class*="bottom_ads"]', '[class*="bottom-banner"]', '[class*="bottom_banner"]',
      '[id*="bottom-ads"]', '[id*="bottom_ads"]', '[id*="bottom-banner"]', '[id*="bottom_banner"]',
      '[class*="footer-ads"]', '[class*="footer_ads"]', '[class*="footer-banner"]', '[class*="footer_banner"]',
      '[class*="floating-banner"]', '[class*="float-ads"]', '[class*="sticky-ads"]', '[class*="sticky-banner"]',
      '[class*="qc-bottom"]', '[id*="qc-bottom"]', '[class*="banner-ads"]', '[id*="banner-ads"]',
      'a[href*="vsbet"]', 'a[href*="bet88"]', 'a[href*="colatv"]', 'a[href*="colascore"]', 'a[href*="kubet"]',
      'a[href*="casino"]', 'a[href*="fun88"]', 'a[href*="w88"]', 'a[href*="fb88"]', 'a[href*="nohu"]',
      'a[href*="taixiu"]', 'a[href*="gamebai"]', 'a[href*="keonhacai"]'
    ];

    try {
      if (document.querySelectorAll) {
        document.querySelectorAll(adSelectors.join(",")).forEach(el => {
          if (el.id === "ro-vip-hub" || (el.closest && el.closest("#ro-vip-hub"))) return;
          const parent = (el.closest && el.closest('.sspp-area, div[class*="sspp"], div[style*="fixed"], div[style*="sticky"], div[class*="bottom"], div[id*="bottom"], div[class*="catfish"]')) || el;
          if (parent && typeof parent.remove === "function") {
            parent.remove();
            count++;
          }
        });
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
      showToast(count > 0 ? `🧹 Đã quét sạch ${count} banner quảng cáo!` : "🧹 Đã quét sạch banner!");
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

  // Phím tắt toàn cục
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

  

  console.log("%c🎬 " + "MotPhim VIP & Cinema Pro Suite" + " Ready!", "font-size: 13px; font-weight: bold; color: #10b981;");
})();
