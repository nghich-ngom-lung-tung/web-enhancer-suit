/**
 * Cinema Pro Suite - Ad & Popup Nuker Module
 */
module.exports = `
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

    const todayStr = (function () {
      try { return new Date().toISOString().slice(0, 10); } catch (e) { return "2026-12-31"; }
    })();
    localStorage.setItem("f4k:entered", String(Date.now()));
    localStorage.setItem("community-dismissed", todayStr);

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
      if (key === "f4k:entered") return String(Date.now());
      if (key === "community-dismissed") return todayStr;
      return origGetItem.apply(this, arguments);
    };

    // ─── DEFUSE WEBMANIFEST 503 ERROR (FILM4K & EMBEDS) ───
    const inlineManifest = "data:application/manifest+json," + encodeURIComponent(JSON.stringify({
      name: "Film4k VIP",
      short_name: "Film4k",
      start_url: "/",
      display: "standalone",
      background_color: "#0c0d12",
      theme_color: "#5b6cff"
    }));
    const fixManifest = () => {
      try {
        const m = document.querySelector("link[rel='manifest']");
        if (m && !m.href.startsWith("data:")) {
          m.href = inlineManifest;
        }
      } catch (e) {}
    };
    fixManifest();
    if (typeof document !== "undefined" && document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fixManifest, { once: true });
    }
  } catch (e) {}

  // ─── EMBED PLAYER AD DEFUSER (__V_DATA__ & __ADS_CFG for devwithai, streamxx, rophim) ───
  try {
    function sanitizeVData(val) {
      if (typeof val === "string") {
        try {
          let s = val.replace(/-/g, "+").replace(/_/g, "/");
          while (s.length % 4) s += "=";
          const parsed = JSON.parse(atob(s));
          if (parsed && typeof parsed === "object") {
            parsed.ads = {
              click_redirect: [],
              tvc_mp4: [],
              overlay_banner: [],
              watermark: [],
              pause_ads: [],
              player_poster: [],
              brand_corner: [],
              textlink: []
            };
            return btoa(JSON.stringify(parsed));
          }
        } catch (e) {
          return val;
        }
      } else if (val && typeof val === "object" && val.ads) {
        val.ads = {
          click_redirect: [],
          tvc_mp4: [],
          overlay_banner: [],
          watermark: [],
          pause_ads: [],
          player_poster: [],
          brand_corner: [],
          textlink: []
        };
      }
      return val;
    }

    let _vdata = sanitizeVData(window.__V_DATA__);
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

    let _adsCfg = {
      click_redirect: [],
      tvc_mp4: [],
      overlay_banner: [],
      watermark: [],
      pause_ads: [],
      player_poster: [],
      brand_corner: [],
      textlink: []
    };
    Object.defineProperty(window, "__ADS_CFG", {
      configurable: true,
      enumerable: true,
      get: function () {
        return _adsCfg;
      },
      set: function () {}
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
              // Silent block anti-tamper redirect (avoid triggering chrome://extensions error badge)
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
          // Silent block anti-tamper setAttribute (avoid triggering chrome://extensions error badge)
          return;
        }
        return origSetAttr.apply(this, arguments);
      };
    }

    if (typeof HTMLScriptElement !== "undefined") {
      const origScriptSrc = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "src");
      if (origScriptSrc && origScriptSrc.set) {
        const origSetScript = origScriptSrc.set;
        Object.defineProperty(HTMLScriptElement.prototype, "src", {
          set: function (val) {
            if (typeof val === "string" && (
              val.includes("driverhugoverblown.com") ||
              val.includes("mayhapmonisms.com") ||
              val.includes("vhyohxarqz.in") ||
              val.includes("sharethis.com") ||
              val.includes("cloudflareinsights.com") ||
              val.includes("acscdn.com") ||
              val.includes("yougetwhatyoupayfor.net") ||
              val.includes("chaseherbalpasty.com") ||
              val.includes("bom88") ||
              val.includes("tin888") ||
              val.includes("net88") ||
              val.includes("gem88")
            )) {
              return;
            }
            return origSetScript.call(this, val);
          },
          get: origScriptSrc.get,
          configurable: true
        });
      }
      const origSetScriptAttr = HTMLScriptElement.prototype.setAttribute;
      HTMLScriptElement.prototype.setAttribute = function (name, val) {
        if (typeof name === "string" && name.toLowerCase() === "src" && typeof val === "string") {
          if (
            val.includes("driverhugoverblown.com") ||
            val.includes("mayhapmonisms.com") ||
            val.includes("vhyohxarqz.in") ||
            val.includes("sharethis.com") ||
            val.includes("cloudflareinsights.com") ||
            val.includes("acscdn.com") ||
            val.includes("yougetwhatyoupayfor.net") ||
            val.includes("chaseherbalpasty.com") ||
            val.includes("bom88") ||
            val.includes("tin888") ||
            val.includes("net88") ||
            val.includes("gem88")
          ) {
            return;
          }
        }
        return origSetScriptAttr.apply(this, arguments);
      };
    }

    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const origBeacon = navigator.sendBeacon.bind(navigator);
      navigator.sendBeacon = function (url, data) {
        if (typeof url === "string" && (
          url.includes("vhyohxarqz.in") ||
          url.includes("sharethis.com") ||
          url.includes("cloudflareinsights.com") ||
          url.includes("driverhugoverblown.com") ||
          url.includes("mayhapmonisms.com")
        )) {
          return true;
        }
        return origBeacon(url, data);
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
      u.includes("streamxx.net/storage/embed_ads") ||
      u.includes("streamxx.net/ads") ||
      u.includes("streamxx.net/api/t/") ||
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
      'a[href*="hitclub"]', 'a[href*="hit.club"]', 'a[href*="go88"]', 'a[href*="sunwin"]',
      '.landing-ad', 'dialog.cdlg', '.cdlg', '.landing-box .landing-ad'
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

      // Tự động bỏ qua Landing Gate & Community Dialog trên Film4k (chỉ click 1 lần duy nhất)
      const f4kGate = document.querySelector(".landing-enter:not([data-f4k-done]), button.landing-enter:not([data-f4k-done])");
      if (f4kGate) {
        f4kGate.setAttribute("data-f4k-done", "1");
        if (typeof f4kGate.click === "function") {
          try { f4kGate.click(); } catch (e) {}
        }
        safeHideOrRemove(f4kGate);
      }
      const f4kOk = document.querySelector(".cdlg-ok:not([data-f4k-done]), button.cdlg-ok:not([data-f4k-done])");
      if (f4kOk) {
        f4kOk.setAttribute("data-f4k-done", "1");
        if (typeof f4kOk.click === "function") {
          try { f4kOk.click(); } catch (e) {}
        }
        safeHideOrRemove(f4kOk);
      }
      const f4kDialog = document.querySelector("dialog.cdlg[open]");
      if (f4kDialog) {
        try { if (typeof f4kDialog.close === "function") f4kDialog.close(); } catch (e) {}
        safeHideOrRemove(f4kDialog);
      }

      // Tự động bỏ qua và kết thúc video TVC pre-roll nếu xuất hiện (ChoPhim, Giờ Vàng, Thể Thao, GhienPhim, CoiPhim)
      const tvcVideos = document.querySelectorAll(".tvc-pre-roll__video, video[src*='tvc_'], video[src*='assets/tvc/'], video[src*='/ads/'], video[src*='ads/'], div[class*='z-[70]'] video, #video-premium, #video-second, #video-third");
      tvcVideos.forEach(tvcVideo => {
        try {
          tvcVideo.muted = true;
          tvcVideo.currentTime = tvcVideo.duration || 999;
          tvcVideo.dispatchEvent(new Event("ended"));
          if (tvcVideo.id === "video-premium" || tvcVideo.id === "video-second" || tvcVideo.id === "video-third" || (tvcVideo.src && tvcVideo.src.includes("/ads/"))) {
            tvcVideo.pause();
            tvcVideo.src = "";
            safeHideOrRemove(tvcVideo);
          }
        } catch (e) {}
      });
      const skipBtns = document.querySelectorAll(".tvc-pre-roll__skip button:not([data-tvc-done]), .tvc-pre-roll__skip:not([data-tvc-done]), .btn-skip-video:not([data-tvc-done]), div[class*='z-[70]'] button:not([data-tvc-done]), button:has(span):not([data-tvc-done])");
      skipBtns.forEach(skipBtn => {
        const txt = (skipBtn.textContent || "").trim();
        if (txt.includes("Bỏ qua") || txt.includes("Skip") || txt.includes("intro") || txt.includes("quảng cáo")) {
          skipBtn.setAttribute("data-tvc-done", "1");
          skipBtn.removeAttribute("disabled");
          if (typeof skipBtn.click === "function") {
            try { skipBtn.click(); } catch (e) {}
          }
        }
      });
      const tvcLayers = document.querySelectorAll(".video-ad-layer, [class*='video-ad-layer'], .ad-msg, [class*='ad-msg'], .random-content, div[class*='z-[70]']");
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
`;
