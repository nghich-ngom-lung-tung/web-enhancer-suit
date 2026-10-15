// ==UserScript==
// @name         NetAnime VIP & Cinema Pro Suite
// @namespace    http://tampermonkey.net/
// @version      5.4.4
// @description  Mở khóa VIP 2099 + Chặn 100% AdBlock/Player Guard + M3U8 Sniffer + 1-Click PotPlayer/VLC + Phím tắt Skip Intro & Anime HDR
// @author       nghich-ngom-lung-tung
// @match        *://netanime.net/*
// @match        *://www.netanime.net/*
// @match        *://netanime.cc/*
// @match        *://www.netanime.cc/*
// @match        *://api.netanime.net/*
// @match        *://api.netanime.cc/*
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
// @include      *://*netanime*/*
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
// @allFrames    true
// @run-at       document-start
// @grant        none
// @license      MIT
// @icon         https://rophim1.vip/apple-icon.png
// @homepageURL  https://github.com/nghich-ngom-lung-tung/web-enhancer-suit
// @downloadURL  https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/anime/netanime.user.js
// @updateURL    https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/anime/netanime.user.js
// ==/UserScript==

(function () {
  "use strict";


  // ─── LAYER 5: VIP 2099 & T-COIN RESPONSE PATCHER (ROPHIM & MOTCHILL API) ───
  const _origFetchNative = (typeof window !== "undefined" && window.fetch) ? window.fetch.bind(window) : null;
  const VIP_EXPIRY_DATE = new Date(2099, 6, 18, 0, 0, 0);
  const VIP_EXPIRY_TIMESTAMP = Math.floor(VIP_EXPIRY_DATE.getTime() / 1000);
  const COIN_BALANCE = 999999999;
  const ROPHIM_KEYWORDS = [
    "/baseapi/api/v1/tcoin",
    "tcoin",
    "/baseapi/api/v1/user/",
    "/baseapi/api/v1/vip/",
    "/baseapi/api/v1/bookmarks",
    "/baseapi/api/v1/histories",
    "/baseapi/api/v1/notifications",
    "/baseapi/api/v1/notifications/home",
    "/baseapi/api/v1/notifications/unread-counts",
    "/baseapi/api/v1/ads",
    "/baseapi/api/v1/banner",
    "/baseapi/api/v1/advertising",
    "/api/auth/session",
    "/auth/profile",
    "/auth/session/check",
    "/auth/session",
    "/auth/login",
    "/auth/register",
    "/auth/logout",
    "/users/profile",
    "/users/update-user",
    "/users/vip-packages",
    "/vip-packages",
    "/payments/orders",
    "/watch-progress",
    "/histories",
    "/favorites",
    "/favourite",
    "/refresh-token",
    "/api/v1/ads",
    "api.rophim1.vip",
    "rophimapi.net",
    "phimmotchill.online",
    "netanime.net",
    "netanime.cc",
    "api.netanime.net",
    "api.netanime.cc",
    "/api/profile",
    "/header-login",
    "header-login",
    "zettruyen",
    "toptruyen",
    "ghienphim",
    "ghienxemphim",
    "ghienphimhay",
    "coiphim",
    "xemphimviet",
    "duphim",
    "ghienblog",
    "ghientruyen",
    "chuoichien",
    "chuoichientv",
    "/users/login",
    "/users/profile",
    "/users/register",
    "/ads",
    "/v2/ads",
    "/v1/ads",
    "api.chuoichientv",
    "api-v2.chuoichientv"
  ];

  function getTopTruyenVipHeaderHtml() {
    return '<div class="user-logged-in dropdown">' +
      '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style="display:flex;align-items:center;gap:6px;text-decoration:none;color:#fff;">' +
        '<img src="/assets/images/user-default.png" alt="VIP Reader" class="avatar-sm img-circle" style="width:30px;height:30px;border-radius:50%;border:2px solid #51f085;display:inline-block;vertical-align:middle;">' +
        '<span class="user-name" style="color:#51f085;font-weight:600;font-size:13px;">VIP Reader Pro</span>' +
        '<span class="caret" style="margin-left:4px;"></span>' +
      '</a>' +
      '<ul class="dropdown-menu dropdown-menu-right" style="min-width:180px;background:#1e293b;border:1px solid #334155;border-radius:8px;padding:8px 0;box-shadow:0 10px 25px rgba(0,0,0,0.5);">' +
        '<li><a href="/tai-khoan" style="color:#e2e8f0;padding:8px 16px;display:block;"><i class="fa fa-user" style="color:#51f085;margin-right:8px;"></i> Tài khoản (VIP 2099)</a></li>' +
        '<li><a href="/truyen-theo-doi" style="color:#e2e8f0;padding:8px 16px;display:block;"><i class="fa fa-bookmark" style="color:#38bdf8;margin-right:8px;"></i> Truyện theo dõi</a></li>' +
        '<li><a href="/lich-su-doc" style="color:#e2e8f0;padding:8px 16px;display:block;"><i class="fa fa-history" style="color:#fbbf24;margin-right:8px;"></i> Lịch sử đọc</a></li>' +
        '<li role="separator" class="divider" style="margin:6px 0;border-top:1px solid #334155;"></li>' +
        '<li><a href="#" id="vip-logout-btn" style="color:#94a3b8;padding:8px 16px;display:block;"><i class="fa fa-sign-out" style="margin-right:8px;"></i> Đăng xuất</a></li>' +
      '</ul>' +
    '</div>';
  }

  function isRophimTarget(url) {
    if (!url || typeof url !== "string") return false;
    return ROPHIM_KEYWORDS.some(k => url.includes(k));
  }

  function getMotchillVipUser(curUser) {
    const base = curUser || {};
    return {
      id: base.id || 999999,
      username: base.username || "VIP Cinema Pro",
      name: base.name || "VIP Cinema Pro",
      full_name: base.full_name || "VIP Cinema Pro",
      email: base.email || "vip@motchill.online",
      avatar: base.avatar || "/images/avatars/10.jpg",
      image: base.image || "/images/avatars/10.jpg",
      access_token: base.access_token || "cinema-pro-vip-token",
      token: base.token || "cinema-pro-vip-token",
      role: "VIP",
      is_role: "admin",
      is_vip: true,
      gender: 1,
      current_vip: {
        package_id: 999,
        package_name: "VIP Vĩnh Viễn 2099",
        is_active: true,
        expires_at: VIP_EXPIRY_DATE.toISOString(),
        end_at: VIP_EXPIRY_DATE.toISOString()
      },
      vip_info: {
        package_id: 999,
        package_name: "VIP Vĩnh Viễn 2099",
        is_active: true,
        expires_at: VIP_EXPIRY_DATE.toISOString(),
        end_at: VIP_EXPIRY_DATE.toISOString()
      },
      coin: COIN_BALANCE,
      coin_balance: COIN_BALANCE,
      tcoin: COIN_BALANCE,
      thungBalance: COIN_BALANCE
    };
  }

  function getChuoiChienVipUser() {
    return {
      _id: "670bf1000000000000000001",
      id: "670bf1000000000000000001",
      username: "vip_cinemapro",
      name: "VIP Cinema Pro 👑",
      displayName: "VIP Cinema Pro 👑",
      email: "vip.cinemapro@chuoichien.tv",
      role: "admin",
      avatar: "https://chuoichientv.link/favicon.ico",
      avatar_url: "https://chuoichientv.link/favicon.ico",
      is_vip: true,
      vip: 1,
      level: 99,
      coin: COIN_BALANCE,
      balance: COIN_BALANCE,
      points: COIN_BALANCE,
      phone: "0999999999",
      verified: true,
      status: "active"
    };
  }

  function getRophimMockJsonString(url, init) {
    if (!url || typeof url !== "string") return null;

    if (init && init.headers) {
      const h = init.headers;
      const isInternal = (typeof h.get === "function" ? (h.get("X-Cinema-Pro-Internal") || h.get("x-cinema-pro-internal")) : (h["X-Cinema-Pro-Internal"] || h["x-cinema-pro-internal"]));
      if (isInternal) return null;
    }

    let bodyStr = "";
    if (init && init.body) {
      if (typeof init.body === "string") bodyStr = init.body;
      else if (typeof init.body === "object") {
        try { bodyStr = JSON.stringify(init.body); } catch (e) {}
      }
    }

    // 1. Session Check (Bắt buộc valid: true để không gọi o() trigger reload)
    if (url.includes("/auth/session/check")) {
      const user = getMotchillVipUser();
      const sessionResult = {
        valid: true,
        status: true,
        user: user
      };
      return JSON.stringify({
        status: true,
        valid: true,
        success: true,
        code: 200,
        msg: "Thành công",
        data: sessionResult,
        result: sessionResult
      });
    }

    // 2. NextAuth Session (Chỉ mock session payload cho client UI)
    if (url.includes("/api/auth/session") || (url.includes("/auth/session") && !url.includes("/auth/session/check"))) {
      const user = getMotchillVipUser();
      return JSON.stringify({
        user: user,
        access_token: "cinema-pro-vip-token",
        token: "cinema-pro-vip-token",
        is_vip: true,
        vip_expires_at: VIP_EXPIRY_TIMESTAMP,
        role: "VIP",
        thungBalance: COIN_BALANCE,
        coin_balance: COIN_BALANCE,
        expires: VIP_EXPIRY_DATE.toISOString()
      });
    }

    // 2.4 Chuối Chiên TV Auth, User Profile & Ads API (Nuxt 3)
    const isChuoiChien = url.includes("chuoichien") || (typeof location !== "undefined" && location.hostname && (location.hostname.includes("chuoichien") || location.hostname.includes("chuoichientv")));
    const isChuoiChienAds = isChuoiChien && (
      url.includes("/v2/ads") ||
      url.includes("/v1/ads") ||
      url.endsWith("/ads") ||
      url.includes("/ads?") ||
      url.includes("api.chuoichientv.net/v1/ads") ||
      url.includes("api-v2.chuoichientv.net/v2/ads") ||
      (url.includes("position=") && !url.includes("/matches") && !url.includes("/chat"))
    );
    if (isChuoiChienAds) {
      return JSON.stringify({
        success: true,
        status: 200,
        code: 200,
        data: [],
        result: [],
        items: [],
        message: "Cinema Pro: Chuối Chiên TV Ads Eradicated"
      });
    }
    if (isChuoiChien && (url.includes("/users/login") || url.includes("/users/profile") || url.includes("/auth/login") || url.includes("/users/register"))) {
      const ccUser = getChuoiChienVipUser();
      if (url.includes("/login")) {
        return JSON.stringify({
          success: true,
          status: 200,
          code: 200,
          accessToken: "cinema-pro-vip-jwt-token",
          refreshToken: "cinema-pro-vip-refresh-token",
          user: ccUser,
          data: {
            accessToken: "cinema-pro-vip-jwt-token",
            refreshToken: "cinema-pro-vip-refresh-token",
            user: ccUser
          },
          message: "Đăng nhập thành công!"
        });
      }
      if (url.includes("/users/profile")) {
        return JSON.stringify({
          success: true,
          status: 200,
          code: 200,
          ...ccUser,
          data: ccUser,
          result: ccUser
        });
      }
      if (url.includes("/users/register")) {
        return JSON.stringify({
          success: true,
          status: 200,
          code: 200,
          message: "Đăng ký thành công!"
        });
      }
    }

    // 3. User Profile / Login / Register
    if (url.includes("/auth/profile") || url.includes("/users/profile") || url.includes("/auth/login") || url.includes("/auth/register")) {
      const user = getMotchillVipUser();
      return JSON.stringify({
        status: true,
        valid: true,
        success: true,
        code: 200,
        msg: "Thành công",
        data: user,
        result: user,
        user: user,
        token: "cinema-pro-vip-token",
        access_token: "cinema-pro-vip-token"
      });
    }

    // 4. Logout bypass
    if (url.includes("/auth/logout")) {
      return JSON.stringify({
        status: true,
        success: true,
        code: 200,
        msg: "Đăng xuất thành công"
      });
    }

    // 5. Silent Refresh Token
    if (url.includes("/refresh-token")) {
      return JSON.stringify({
        status: true,
        success: true,
        code: 200,
        msg: "Thành công",
        result: { token: "cinema-pro-vip-token" },
        data: { token: "cinema-pro-vip-token" }
      });
    }

    // 6. VIP Packages & Status
    if (url.includes("/vip-packages")) {
      const pkgData = {
        current_vip: {
          package_id: 999,
          package_name: "VIP Vĩnh Viễn 2099",
          is_active: true,
          expires_at: VIP_EXPIRY_DATE.toISOString(),
          end_at: VIP_EXPIRY_DATE.toISOString()
        },
        packages: [
          {
            id: 999,
            name: "VIP Vĩnh Viễn 2099",
            duration_days: 36500,
            price: 0,
            description: "Gói VIP Không Giới Hạn - Cinema Pro"
          }
        ]
      };
      return JSON.stringify({
        status: true,
        success: true,
        code: 200,
        data: pkgData,
        result: pkgData
      });
    }

    // 7. Watch progress / History / Histories (chặn 401 gây reload & console error)
    if (url.includes("/watch-progress") || url.includes("/histories")) {
      return JSON.stringify({
        status: 200,
        success: true,
        code: 200,
        data: { items: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 1 } },
        result: { items: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 1 } }
      });
    }

    // 7.1 User Profile Update
    if (url.includes("/users/update-user")) {
      return JSON.stringify({
        status: 200,
        success: true,
        code: 200,
        message: "Cập nhật thông tin thành công"
      });
    }

    // 8. Movie Favorites (chặn 401 gây reload)
    if (url.includes("/favorites") || url.includes("/favourite")) {
      return JSON.stringify({
        status: true,
        success: true,
        code: 200,
        data: { items: [], pagination: { page: 1, limit: 64, total: 0, totalPages: 1 } },
        result: { items: [], pagination: { page: 1, limit: 64, total: 0, totalPages: 1 } }
      });
    }

    // 9. Payment Orders
    if (url.includes("/orders")) {
      return JSON.stringify({
        status: true,
        success: true,
        code: 200,
        result: {
          items: [],
          pagination: { page: 1, limit: 8, total: 0, totalPages: 1 }
        },
        data: {
          items: [],
          pagination: { page: 1, limit: 8, total: 0, totalPages: 1 }
        }
      });
    }

    // 10. TCoin balance & exchange (Rophim)
    if (url.includes("/tcoin") || url.includes("tcoin")) {
      if (url.includes("redeem") || url.includes("exchange") || url.includes("gift")) {
        return JSON.stringify({
          status: 200,
          success: true,
          code: 200,
          message: "Đổi quà thành công! Gói VIP Cinema Pro đã được kích hoạt.",
          msg: "Đổi quà thành công!",
          data: {
            thungBalance: COIN_BALANCE,
            balance: COIN_BALANCE,
            coin_balance: COIN_BALANCE,
            tcoin: COIN_BALANCE
          }
        });
      }
      return JSON.stringify({
        status: 200,
        success: true,
        code: 200,
        thungBalance: COIN_BALANCE,
        balance: COIN_BALANCE,
        coin_balance: COIN_BALANCE,
        tcoin: COIN_BALANCE,
        total: COIN_BALANCE,
        data: {
          thungBalance: COIN_BALANCE,
          balance: COIN_BALANCE,
          coin_balance: COIN_BALANCE,
          tcoin: COIN_BALANCE,
          total: COIN_BALANCE
        },
        result: {
          thungBalance: COIN_BALANCE,
          balance: COIN_BALANCE,
          coin_balance: COIN_BALANCE,
          tcoin: COIN_BALANCE,
          total: COIN_BALANCE
        }
      });
    }

    // 11. Bookmarks (chặn 401 gây fallback guest mode trên Next.js)
    if (url.includes("/bookmarks")) {
      return JSON.stringify({
        status: 200,
        success: true,
        data: {
          data: [],
          total: 0,
          page: 1,
          limit: 100
        }
      });
    }

    // 12. Notifications (home & unread counts)
    if (url.includes("/notifications")) {
      return JSON.stringify({
        status: 200,
        success: true,
        data: {
          notificationsMovie: [],
          notificationsOther: [],
          unreadCountMovie: 0,
          unreadCountOther: 0
        }
      });
    }

    // 13. ZetTruyen Profile & User Auth API
    if (url.includes("/api/profile")) {
      const zetUser = {
        id: 999999,
        name: "VIP Comic Reader",
        username: "vip_reader",
        email: "vip@zettruyen.com",
        avatar: "/images/profile-picture.webp",
        avatar_url: "/images/profile-picture.webp",
        role: "VIP",
        is_vip: true,
        vip: 1,
        vip_expire: "2099-07-18",
        level: 99,
        coin: COIN_BALANCE,
        gold: COIN_BALANCE,
        exp: 999999
      };
      return JSON.stringify({
        message: "Success",
        data: {
          auth: true,
          info: zetUser
        },
        success: true,
        errors: []
      });
    }

    return null;
  }

  function getRophimMockResponse(url, init) {
    if (url && (url.includes("/header-login") || url.includes("header-login"))) {
      const html = getTopTruyenVipHeaderHtml();
      return new Response(html, {
        status: 200,
        statusText: "OK",
        headers: { "Content-Type": "text/html; charset=UTF-8" }
      });
    }
    const jsonStr = getRophimMockJsonString(url, init);
    if (!jsonStr) return null;
    return new Response(jsonStr, {
      status: 200,
      statusText: "OK",
      headers: { "Content-Type": "application/json" }
    });
  }

  function getRophimMockXhr(url, body) {
    return getRophimMockJsonString(url, { body: body });
  }

  function patchRophimData(data, url) {
    if (!data || typeof data !== "object") return data;
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
    if (url && url.includes("/bookmarks")) {
      return {
        status: 200,
        success: true,
        data: {
          data: [],
          total: 0,
          page: 1,
          limit: 100
        }
      };
    }
    if (url && url.includes("/notifications")) {
      return {
        status: 200,
        success: true,
        data: {
          notificationsMovie: [],
          notificationsOther: [],
          unreadCountMovie: 0,
          unreadCountOther: 0
        }
      };
    }
    if (url && (url.includes("/histories") || url.includes("/watch-progress"))) {
      return {
        status: 200,
        success: true,
        data: {
          items: [],
          pagination: { page: 1, limit: 20, total: 0, totalPages: 1 }
        },
        result: {
          items: [],
          pagination: { page: 1, limit: 20, total: 0, totalPages: 1 }
        }
      };
    }
    if (url && (url.includes("/tcoin") || url.includes("tcoin"))) {
      data.thungBalance = COIN_BALANCE;
      data.balance = COIN_BALANCE;
      data.coin_balance = COIN_BALANCE;
      data.tcoin = COIN_BALANCE;
      data.total = COIN_BALANCE;
      if (data.data && typeof data.data === "object") {
        data.data.thungBalance = COIN_BALANCE;
        data.data.balance = COIN_BALANCE;
        data.data.coin_balance = COIN_BALANCE;
        data.data.tcoin = COIN_BALANCE;
        data.data.total = COIN_BALANCE;
      }
      if (data.result && typeof data.result === "object") {
        data.result.thungBalance = COIN_BALANCE;
        data.result.balance = COIN_BALANCE;
        data.result.coin_balance = COIN_BALANCE;
        data.result.tcoin = COIN_BALANCE;
        data.result.total = COIN_BALANCE;
      }
      return data;
    }
    if (url && (url.includes("/auth/profile") || url.includes("/auth/session/check") || url.includes("/auth/login") || url.includes("/auth/register") || url.includes("/users/profile"))) {
      const curUser = data?.result?.user || data?.result || data?.data || {};
      const patchedUser = getMotchillVipUser(curUser);
      return {
        status: true,
        valid: true,
        success: true,
        code: 200,
        msg: "Thành công",
        data: patchedUser,
        result: data?.result?.user ? { ...data.result, user: patchedUser, valid: true } : patchedUser
      };
    }
    if (url && (url.includes("/users/vip-packages") || url.includes("/vip-packages"))) {
      const pkgData = {
        current_vip: {
          package_id: 999,
          package_name: "VIP Vĩnh Viễn 2099",
          is_active: true,
          expires_at: VIP_EXPIRY_DATE.toISOString(),
          end_at: VIP_EXPIRY_DATE.toISOString()
        },
        packages: [
          {
            id: 999,
            name: "VIP Vĩnh Viễn 2099",
            duration_days: 36500,
            price: 0,
            description: "Gói VIP Không Giới Hạn - Cinema Pro"
          }
        ]
      };
      return {
        status: true,
        success: true,
        code: 200,
        data: pkgData,
        result: pkgData
      };
    }
    if (url && (url.includes("/api/auth/session") || url.includes("/user/profile") || url.includes("/user/info"))) {
      if (!data.user) data.user = {};
      data.user.is_vip = true;
      data.user.vip_expires_at = VIP_EXPIRY_TIMESTAMP;
      data.user.thungBalance = COIN_BALANCE;
      data.user.coin_balance = COIN_BALANCE;
      data.user.role = "VIP";
      data.user.access_token = "cinema-pro-vip-token";
      data.user.token = "cinema-pro-vip-token";
      data.user.image = "/images/avatars/10.jpg";
      data.user.avatar = "/images/avatars/10.jpg";
      data.access_token = "cinema-pro-vip-token";
      data.token = "cinema-pro-vip-token";
      data.expires = VIP_EXPIRY_DATE.toISOString();
      return data;
    }
    if (url && url.includes("/api/profile")) {
      const zetUser = {
        id: 999999,
        name: "VIP Comic Reader",
        username: "vip_reader",
        email: "vip@zettruyen.com",
        avatar: "/images/profile-picture.webp",
        avatar_url: "/images/profile-picture.webp",
        role: "VIP",
        is_vip: true,
        vip: 1,
        vip_expire: "2099-07-18",
        level: 99,
        coin: COIN_BALANCE,
        gold: COIN_BALANCE,
        exp: 999999
      };
      return {
        message: "Success",
        data: {
          auth: true,
          info: (data && data.data && data.data.info) ? { ...data.data.info, ...zetUser } : zetUser
        },
        success: true,
        errors: []
      };
    }
    const recurse = obj => {
      if (!obj || typeof obj !== "object") return;
      if ("is_vip" in obj || "vip_expires_at" in obj || "coin_balance" in obj || "thungBalance" in obj) {
        obj.is_vip = true;
        obj.vip_expires_at = VIP_EXPIRY_TIMESTAMP;
        obj.coin_balance = COIN_BALANCE;
        obj.thungBalance = COIN_BALANCE;
      }
      if (obj.result) recurse(obj.result);
      if (obj.user) recurse(obj.user);
      if (obj.data) recurse(obj.data);
    };
    recurse(data);
    return data;
  }

  async function handleRophimFetchResponse(resPromise, url, init) {
    if (typeof getRophimMockResponse === "function") {
      const mock = getRophimMockResponse(url, init);
      if (mock) return mock;
    }

    const res = await resPromise;
    try {
      const ct = res.headers && res.headers.get && res.headers.get("content-type");
      if (ct && ct.includes("application/json")) {
        const clone = res.clone();
        clone.json().then(data => {
          if (typeof extractStreamFromObject === "function") extractStreamFromObject(data);
        }).catch(() => {});
      }
    } catch (e) {}

    if (!isRophimTarget(url)) return res;
    try {
      const ct = res.headers && res.headers.get && res.headers.get("content-type");
      if (!ct || !ct.includes("application/json")) return res;
      const clone = res.clone();
      const data = await clone.json();
      if (typeof extractStreamFromObject === "function") extractStreamFromObject(data);
      const patched = patchRophimData(data, url);
      return new Response(JSON.stringify(patched), {
        status: 200,
        statusText: "OK",
        headers: res.headers
      });
    } catch (e) {
      return res;
    }
  }

  function handleRophimXhrResponse(xhr, url) {
    try {
      if (url && (url.includes("/header-login") || url.includes("header-login"))) {
        const html = getTopTruyenVipHeaderHtml();
        Object.defineProperty(xhr, "readyState", { value: 4, configurable: true, writable: true });
        Object.defineProperty(xhr, "status", { value: 200, configurable: true, writable: true });
        Object.defineProperty(xhr, "statusText", { value: "OK", configurable: true, writable: true });
        Object.defineProperty(xhr, "responseText", { value: html, configurable: true, writable: true });
        Object.defineProperty(xhr, "responseURL", { value: url, configurable: true, writable: true });
        Object.defineProperty(xhr, "response", {
          get: function () { return html; },
          configurable: true
        });
        xhr.getAllResponseHeaders = function () {
          return "content-type: text/html; charset=utf-8";
        };
        xhr.getResponseHeader = function (h) {
          if (h && h.toLowerCase() === "content-type") return "text/html; charset=utf-8";
          return null;
        };
        return;
      }
      if (typeof getRophimMockXhr === "function") {
        const mockStr = getRophimMockXhr(url);
        if (mockStr) {
          try {
            let parsedObj = null;
            try { parsedObj = JSON.parse(mockStr); } catch (e) {}
            Object.defineProperty(xhr, "readyState", { value: 4, configurable: true, writable: true });
            Object.defineProperty(xhr, "status", { value: 200, configurable: true, writable: true });
            Object.defineProperty(xhr, "statusText", { value: "OK", configurable: true, writable: true });
            Object.defineProperty(xhr, "responseText", { value: mockStr, configurable: true, writable: true });
            Object.defineProperty(xhr, "responseURL", { value: url, configurable: true, writable: true });
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
          } catch (e) {}
          return;
        }
      }
      const ct = xhr.getResponseHeader && xhr.getResponseHeader("content-type");
      if (ct && ct.includes("application/json")) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (typeof extractStreamFromObject === "function") extractStreamFromObject(data);
          if (isRophimTarget(url)) {
            const patched = patchRophimData(data, url);
            const str = JSON.stringify(patched);
            Object.defineProperty(xhr, "readyState", { value: 4, configurable: true, writable: true });
            Object.defineProperty(xhr, "status", { value: 200, configurable: true, writable: true });
            Object.defineProperty(xhr, "responseText", { value: str, configurable: true, writable: true });
            Object.defineProperty(xhr, "response", {
              get: function () {
                if (this.responseType === "json") return patched;
                if (this.responseType === "text") return str;
                return patched || str;
              },
              configurable: true
            });
          }
        } catch (e) {}
      }
    } catch (e) {}
  }

  // ─── PHÒNG CHỐNG RELOAD LOOP & BẢO VỆ PHIÊN ĐĂNG NHẬP MOTCHILL ───
  try {
    // 1. Chặn event auth:logout để không kích hoạt _localLogout() gây redirect / reload
    if (typeof window !== "undefined" && window.dispatchEvent) {
      const origDispatch = window.dispatchEvent.bind(window);
      window.dispatchEvent = function (ev) {
        if (ev && ev.type === "auth:logout") {
          console.log("[Cinema Pro] Neutralized auth:logout event to protect active VIP session");
          return true;
        }
        return origDispatch(ev);
      };
    }

    // 2. Chặn reload loop nhanh từ Next.js router
    if (typeof window !== "undefined" && window.location) {
      let lastReplaceUrl = "";
      let lastReplaceTime = 0;
      if (typeof window.location.replace === "function") {
        const origReplace = window.location.replace.bind(window.location);
        window.location.replace = function (url) {
          const now = Date.now();
          if ((url === "/" || url === location.href || url === location.pathname) && (now - lastReplaceTime < 5000)) {
            console.warn("[Cinema Pro] Blocked rapid location.replace loop to:", url);
            return;
          }
          lastReplaceUrl = url;
          lastReplaceTime = now;
          return origReplace(url);
        };
      }
    }

    // 3. Stub aclib.runPop để tránh lỗi Uncaught TypeError
    if (typeof window !== "undefined") {
      if (!window.aclib) {
        window.aclib = {
          runPop: function () {},
          runBanner: function () {},
          run: function () {}
        };
      } else if (!window.aclib.runPop) {
        window.aclib.runPop = function () {};
      }
    }
  } catch (e) {}

  // Tự động kích hoạt auth_hint = 1 trên Motchill & sync NextAuth trên Rophim
  try {
    const isMotchillHost = location.hostname && (location.hostname.includes("motchill") || location.hostname.includes("phimmotchill"));
    if (isMotchillHost) {
      if (window.localStorage && window.localStorage.getItem("auth_hint") !== "1") {
        window.localStorage.setItem("auth_hint", "1");
      }
      if (window.Storage && window.Storage.prototype) {
        const origRemove = window.Storage.prototype.removeItem;
        window.Storage.prototype.removeItem = function (key) {
          if (key === "auth_hint") return;
          return origRemove.apply(this, arguments);
        };
      }
    }

    const isRophimHost = location.hostname && (location.hostname.includes("rophim") || location.hostname.includes("ro-phim") || location.hostname.includes("netanime"));
    if (isRophimHost) {
      if (typeof window !== "undefined" && window.localStorage) {
        try {
          window.localStorage.setItem("nextauth.message", JSON.stringify({
            event: "session",
            data: { trigger: "getSession" },
            timestamp: Math.floor(Date.now() / 1000)
          }));
        } catch (e) {}
      }

      // RoPhim & NetAnime Real Session Auto-Provisioner:
      // Tự động đăng ký & đăng nhập qua real NextAuth backend để trình duyệt lưu cookie __Secure-next-auth.session-token
      // Nhờ đó server middleware không bị 307 redirect khi người dùng mở /user/profile, /user/playlist, /user/thong-bao
      async function ensureRophimServerSession(force) {
        try {
          const nativeFetch = _origFetchNative || (typeof origFetchMain === "function" ? origFetchMain : window.fetch);
          if (!nativeFetch) return;

          // 1. Kiểm tra xem server đã có session cookie hợp lệ chưa (dùng header X-Cinema-Pro-Internal để bypass mock)
          if (!force && window.sessionStorage && window.sessionStorage.getItem("RO_SERVER_SESSION_READY") === "1") {
            return;
          }

          try {
            const chk = await nativeFetch("/api/auth/session", {
              headers: { "X-Cinema-Pro-Internal": "1" },
              credentials: "include"
            });
            if (chk && chk.ok) {
              const d = await chk.json().catch(() => ({}));
              if (d && d.user && d.user.id && d.user.id !== 999999) {
                if (window.sessionStorage) window.sessionStorage.setItem("RO_SERVER_SESSION_READY", "1");
                return;
              }
            }
          } catch (e) {}

          // 2. Chuẩn bị thông tin tài khoản VIP
          const credKey = (typeof location !== "undefined" && location.hostname && location.hostname.includes("netanime")) ? "NETANIME_CREDENTIALS" : "RO_CREDENTIALS";
          let creds = null;
          try {
            const saved = window.localStorage.getItem(credKey);
            if (saved) creds = JSON.parse(saved);
          } catch (e) {}

          async function createAndRegister() {
            const rand = Math.floor(Math.random() * 900000) + 100000;
            const newCreds = {
              name: "VIP Cinema Pro",
              email: "vip_" + rand + "@gmail.com",
              password: "CinemaPro_" + rand + "!"
            };
            try {
              window.localStorage.setItem(credKey, JSON.stringify(newCreds));
            } catch (e) {}

            await nativeFetch("/baseapi/api/v1/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json", "X-Cinema-Pro-Internal": "1" },
              body: JSON.stringify(newCreds),
              credentials: "include"
            }).catch(() => {});

            return newCreds;
          }

          if (!creds || !creds.email || !creds.password || force) {
            creds = await createAndRegister();
          }

          // 3. Lấy CSRF token từ NextAuth (real server)
          const csrfRes = await nativeFetch("/api/auth/csrf", {
            headers: { "X-Cinema-Pro-Internal": "1" },
            credentials: "include"
          });
          let csrfToken = "";
          if (csrfRes && csrfRes.ok) {
            const csrfData = await csrfRes.json().catch(() => ({}));
            csrfToken = csrfData.csrfToken || "";
          }
          if (!csrfToken) return;

          // 4. Đăng nhập NextAuth Credentials để trình duyệt tự nhận cookie __Secure-next-auth.session-token
          const postParams = new URLSearchParams({
            email: creds.email,
            password: creds.password,
            csrfToken: csrfToken,
            json: "true"
          }).toString();

          let loginRes = await nativeFetch("/api/auth/callback/credentials", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Cinema-Pro-Internal": "1"
            },
            body: postParams,
            credentials: "include"
          });

          // Nếu login thất bại (tài khoản cũ không khớp hoặc DB reset), tạo tài khoản mới và đăng nhập lại ngay
          if (!loginRes || !loginRes.ok) {
            creds = await createAndRegister();
            const csrfRes2 = await nativeFetch("/api/auth/csrf", {
              headers: { "X-Cinema-Pro-Internal": "1" },
              credentials: "include"
            });
            if (csrfRes2 && csrfRes2.ok) {
              const csrfData2 = await csrfRes2.json().catch(() => ({}));
              csrfToken = csrfData2.csrfToken || csrfToken;
            }
            const postParams2 = new URLSearchParams({
              email: creds.email,
              password: creds.password,
              csrfToken: csrfToken,
              json: "true"
            }).toString();

            loginRes = await nativeFetch("/api/auth/callback/credentials", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Cinema-Pro-Internal": "1"
              },
              body: postParams2,
              credentials: "include"
            });
          }

          if (loginRes && loginRes.ok) {
            console.log("[Cinema Pro] Server session cookie (__Secure-next-auth.session-token) established for " + location.hostname + "!");
            if (window.sessionStorage) window.sessionStorage.setItem("RO_SERVER_SESSION_READY", "1");
            try {
              window.localStorage.setItem("nextauth.message", JSON.stringify({
                event: "session",
                data: { trigger: "getSession" },
                timestamp: Math.floor(Date.now() / 1000)
              }));
              if (typeof BroadcastChannel !== "undefined") {
                const bc = new BroadcastChannel("nextauth.message");
                bc.postMessage({ event: "session", data: { trigger: "getSession" } });
                bc.close();
              }
              document.dispatchEvent(new Event("visibilitychange"));
            } catch (e) {}
          }
        } catch (e) {
          console.error("[Cinema Pro] Server session provisioning error:", e);
        }
      }

      setTimeout(() => { ensureRophimServerSession(); }, 50);

      // 5. Chặn 307 Redirect khi bấm "Tài Khoản": Đảm bảo có session cookie trước khi chuyển trang
      try {
        document.addEventListener("click", async function (e) {
          const link = e.target && e.target.closest && e.target.closest('a[href*="/user/profile"], a[href="/user/profile"], a[href^="/user/"]');
          if (link) {
            const isReady = window.sessionStorage && window.sessionStorage.getItem("RO_SERVER_SESSION_READY") === "1";
            if (!isReady) {
              e.preventDefault();
              e.stopPropagation();
              const targetHref = link.getAttribute("href") || "/user/profile";
              console.log("[Cinema Pro] Securing VIP server session before opening:", targetHref);
              await ensureRophimServerSession(true);
              window.location.href = targetHref;
            }
          }
        }, true);
      } catch (e) {}
    }

    const isZetHost = typeof location !== "undefined" && location.hostname && (location.hostname.includes("zettruyen") || location.hostname.includes("zet-truyen"));
    if (isZetHost) {
      try {
        const zetUser = {
          id: 999999,
          name: "VIP Comic Reader",
          username: "vip_reader",
          email: "vip@zettruyen.com",
          avatar: "/images/profile-picture.webp",
          avatar_url: "/images/profile-picture.webp",
          role: "VIP",
          is_vip: true,
          vip: 1,
          vip_expire: "2099-07-18",
          level: 99,
          coin: COIN_BALANCE,
          gold: COIN_BALANCE,
          exp: 999999
        };
        if (typeof window !== "undefined" && window.localStorage) {
          if (!window.localStorage.getItem("userData")) {
            window.localStorage.setItem("userData", JSON.stringify(zetUser));
          }
          if (window.Storage && window.Storage.prototype) {
            const origRemove = window.Storage.prototype.removeItem;
            window.Storage.prototype.removeItem = function (key) {
              if (key === "userData") return;
              return origRemove.apply(this, arguments);
            };
          }
        }
        if (typeof document !== "undefined") {
          try {
            document.cookie = "zt_user_data=true; path=/; max-age=315360000";
          } catch (e) {}
        }
        if (typeof location !== "undefined" && (location.pathname === "/login" || location.pathname === "/dang-nhap")) {
          if (typeof location.replace === "function") {
            location.replace("/");
          }
        }
        function patchZetTruyenAuthDom() {
          try {
            if (typeof document === "undefined") return;
            const authMenu = document.querySelector("#auth_menu");
            if (authMenu) {
              const guestLogin = authMenu.querySelector("a[href*='login'], .btn-login, [onclick*='login']");
              if (guestLogin && !authMenu.querySelector(".user-avatar, .user-name, [data-user]")) {
                authMenu.innerHTML = '<div class="user-profile-menu dropdown" style="display:flex;align-items:center;gap:8px;">' +
                  '<img src="/images/profile-picture.webp" alt="VIP Comic" style="width:32px;height:32px;border-radius:50%;border:2px solid #51f085;">' +
                  '<span style="color:#51f085;font-weight:600;font-size:13px;">VIP Comic Pro</span>' +
                '</div>';
              }
            }
          } catch (e) {}
        }
        if (typeof document !== "undefined") {
          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", patchZetTruyenAuthDom);
          } else {
            patchZetTruyenAuthDom();
          }
          setInterval(patchZetTruyenAuthDom, 500);
        }
      } catch (e) {}
    }

    const isTopHost = typeof location !== "undefined" && location.hostname && (location.hostname.includes("toptruyen") || location.hostname.includes("top-truyen"));
    if (isTopHost) {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem("top_vip", "1");
          window.localStorage.setItem("top_logged", "1");
        }
        if (typeof location !== "undefined" && (location.pathname === "/login" || location.pathname === "/dang-nhap")) {
          if (typeof location.replace === "function") {
            location.replace("/");
          }
        }
        function patchTopTruyenLoginDom() {
          try {
            if (typeof document === "undefined") return;
            const loginContainer = document.querySelector("#login");
            if (loginContainer) {
              const guestBtn = loginContainer.querySelector(".btn-login, a[href*='login'], a[href*='register']");
              if (guestBtn && !loginContainer.querySelector(".user-logged-in")) {
                loginContainer.innerHTML = getTopTruyenVipHeaderHtml();
              }
            }
          } catch (e) {}
        }
        if (typeof document !== "undefined") {
          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", patchTopTruyenLoginDom);
          } else {
            patchTopTruyenLoginDom();
          }
          setInterval(patchTopTruyenLoginDom, 500);

          // TopTruyen dropdown toggle listener (independent of external bootstrap.js)
          document.addEventListener("click", function (e) {
            const toggle = e.target && e.target.closest && e.target.closest("#login .dropdown-toggle, .user-logged-in .dropdown-toggle");
            if (toggle) {
              e.preventDefault();
              e.stopPropagation();
              const container = toggle.closest(".user-logged-in, #login, .dropdown");
              const menu = container && container.querySelector(".dropdown-menu");
              if (menu) {
                const isShown = menu.style.display === "block";
                menu.style.display = isShown ? "none" : "block";
              }
            } else {
              const openMenus = document.querySelectorAll("#login .dropdown-menu, .user-logged-in .dropdown-menu");
              openMenus.forEach(function (m) {
                if (m && m.style.display === "block" && (!e.target || !e.target.closest || !e.target.closest(".user-logged-in"))) {
                  m.style.display = "none";
                }
              });
            }
          });
        }
      } catch (e) {}
    }

    // ─── GHIENPHIM & COIPHIM & DUPHIM FIREBASE VIP AUTH MOCK ───
    const isGhienHost = typeof location !== "undefined" && location.hostname && (
      location.hostname.includes("ghienphim") ||
      location.hostname.includes("ghienxemphim") ||
      location.hostname.includes("ghienphimhay") ||
      location.hostname.includes("coiphim") ||
      location.hostname.includes("xemphimviet") ||
      location.hostname.includes("duphim") ||
      location.hostname.includes("ghienblog") ||
      location.hostname.includes("ghientruyen")
    );
    if (isGhienHost) {
      try {
        const VIP_GHIENPHIM_USER = {
          uid: "ghienphim-vip-2099",
          email: "vip.cinemapro@ghienphim.org",
          displayName: "VIP Cinema Pro 👑",
          photoURL: "https://ghienphimz.mom/client_assets/images/favicon.png",
          isAnonymous: false,
          emailVerified: true,
          result: { msg: "Gói VIP Trọn Đời 2099 Đã Kích Hoạt!", value: 999999999 },
          updateProfile: function (data) {
            if (data && data.displayName) this.displayName = data.displayName;
            return Promise.resolve();
          },
          getIdToken: function () {
            return Promise.resolve("mock-firebase-token-vip-2099");
          },
          getIdTokenResult: function () {
            return Promise.resolve({
              token: "mock-firebase-token-vip-2099",
              claims: { vip: true, expires: "2099-12-31" }
            });
          },
          reload: function () {
            return Promise.resolve();
          }
        };

        function hookFirebaseAuth(fb) {
          if (!fb || fb._vipHooked) return;
          fb._vipHooked = true;
          const mockAuth = {
            currentUser: VIP_GHIENPHIM_USER,
            onAuthStateChanged: function (cb) {
              if (typeof cb === "function") {
                setTimeout(() => {
                  try { cb(VIP_GHIENPHIM_USER); } catch (e) {}
                }, 10);
              }
              return function unsubscribe() {};
            },
            onIdTokenChanged: function (cb) {
              if (typeof cb === "function") {
                setTimeout(() => {
                  try { cb(VIP_GHIENPHIM_USER); } catch (e) {}
                }, 10);
              }
              return function unsubscribe() {};
            },
            signInWithEmailAndPassword: function () {
              return Promise.resolve({ user: VIP_GHIENPHIM_USER });
            },
            createUserWithEmailAndPassword: function () {
              return Promise.resolve({ user: VIP_GHIENPHIM_USER });
            },
            signInWithPopup: function () {
              return Promise.resolve({ user: VIP_GHIENPHIM_USER });
            },
            signOut: function () {
              return Promise.resolve();
            }
          };
          fb.auth = function () {
            return mockAuth;
          };
        }

        if (window.firebase) hookFirebaseAuth(window.firebase);
        let _curFirebase = window.firebase;
        try {
          Object.defineProperty(window, "firebase", {
            configurable: true,
            enumerable: true,
            get: () => _curFirebase,
            set: (v) => {
              _curFirebase = v;
              try { hookFirebaseAuth(v); } catch (e) {}
            }
          });
        } catch (e) {}

        // Mock business.checkReward for VIP
        function hookBusinessReward() {
          try {
            if (window.business && !window.business._vipRewardHooked) {
              window.business._vipRewardHooked = true;
              const origReward = window.business.checkReward;
              window.business.checkReward = function (data, cb) {
                if (typeof cb === "function") {
                  cb({ status: 1, cardType: "VIP 2099,Thẻ Cào 500K,Vô Hạn Xem Phim", value: "VIP,500K,Pro" });
                  return;
                }
                if (origReward) return origReward.apply(this, arguments);
              };
              const origClaim = window.business.claimReward;
              window.business.claimReward = function (data, cb) {
                if (typeof cb === "function") {
                  cb({ status: 1, value: 500000, msg: "Chúc mừng VIP Pro nhận lì xì 500.000đ!", cardType: "Viettel 500K" });
                  return;
                }
                if (origClaim) return origClaim.apply(this, arguments);
              };
              const origHistory = window.business.getHistory;
              window.business.getHistory = function (data, cb) {
                if (typeof cb === "function") {
                  cb({ status: 1, data: [], history: [] });
                  return;
                }
                if (origHistory) return origHistory.apply(this, arguments);
              };
            }
          } catch (e) {}
        }
        hookBusinessReward();
        setInterval(hookBusinessReward, 1000);

        function patchGhienphimProfileDom() {
          try {
            if (typeof document === "undefined") return;

            // 1. Header Access Account Button -> 👑 VIP Member
            const accessBtns = document.querySelectorAll(".access-account button, .access-account a, .notification.user-profile a");
            accessBtns.forEach(btn => {
              if (!btn.getAttribute("data-vip-styled")) {
                btn.setAttribute("data-vip-styled", "true");
                const span = btn.querySelector("span") || btn;
                span.innerHTML = '<span style="color:#51f085;font-weight:700;"><i class="fa fa-crown" style="color:#fbbf24;margin-right:4px;"></i>VIP Member</span>';
              }
            });

            // 2. Profile Page: Hide login form (.c-form), Reveal VIP Dashboard (.profile-infomation)
            const cForm = document.querySelector(".c-form");
            const pInfo = document.querySelector(".profile-infomation");
            const skeleton = document.querySelector(".skeleton");
            if (skeleton) skeleton.remove();

            if (cForm && !cForm.classList.contains("hide")) {
              cForm.classList.add("hide");
              cForm.style.setProperty("display", "none", "important");
            }
            if (pInfo && pInfo.classList.contains("hide")) {
              pInfo.classList.remove("hide");
              pInfo.style.setProperty("display", "block", "important");
            }

            // Unlock and hook form sign-in button if rendered
            if (cForm) {
              const btnSignin = cForm.querySelector(".btn-signin");
              if (btnSignin && !btnSignin.getAttribute("data-vip-hooked")) {
                btnSignin.setAttribute("data-vip-hooked", "true");
                btnSignin.removeAttribute("disabled");
                btnSignin.disabled = false;
                btnSignin.addEventListener("click", function (e) {
                  if (pInfo) {
                    e.preventDefault();
                    e.stopPropagation();
                    cForm.classList.add("hide");
                    cForm.style.setProperty("display", "none", "important");
                    pInfo.classList.remove("hide");
                    pInfo.style.setProperty("display", "block", "important");
                    patchGhienphimProfileDom();
                  }
                }, true);
              }

              // 1-Click VIP Login Button
              if (!cForm.querySelector("#btn-vip-fastlogin")) {
                const fastBtn = document.createElement("button");
                fastBtn.id = "btn-vip-fastlogin";
                fastBtn.type = "button";
                fastBtn.className = "btn btn-primary btn-block";
                fastBtn.style.cssText = "margin-top:12px;width:100%;background:linear-gradient(135deg, #10b981 0%, #059669 100%);border:none;font-weight:700;padding:12px;border-radius:6px;color:#fff;cursor:pointer;display:block;text-align:center;font-size:14px;box-shadow:0 4px 15px rgba(16,185,129,0.4);";
                fastBtn.innerHTML = "👑 ĐĂNG NHẬP VIP 1-CLICK (KHÔNG CẦN PASS)";
                fastBtn.onclick = function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  if (pInfo) {
                    cForm.classList.add("hide");
                    cForm.style.setProperty("display", "none", "important");
                    pInfo.classList.remove("hide");
                    pInfo.style.setProperty("display", "block", "important");
                  }
                  patchGhienphimProfileDom();
                };
                cForm.appendChild(fastBtn);
              }
            }

            // Populate user fields
            const emailEls = document.querySelectorAll(".user-email, .email .value, [data-email]");
            emailEls.forEach(emailEl => {
              if (emailEl.tagName === "INPUT") {
                if (!emailEl.value || emailEl.value !== VIP_GHIENPHIM_USER.email) emailEl.value = VIP_GHIENPHIM_USER.email;
              } else {
                if (!emailEl.textContent || !emailEl.textContent.includes("@")) emailEl.textContent = VIP_GHIENPHIM_USER.email;
              }
            });

            const nameInput = document.querySelector(".fullname .value input, .field.fullname input, input[name='fullname']");
            if (nameInput && (!nameInput.value || nameInput.value !== VIP_GHIENPHIM_USER.displayName)) {
              nameInput.value = VIP_GHIENPHIM_USER.displayName;
            }

            // VIP Coin & USDT balance
            const coinEls = document.querySelectorAll(".field.coin .value, .coin .value");
            coinEls.forEach(coinEl => {
              if (!coinEl.textContent || !coinEl.textContent.includes("999,999,999")) {
                coinEl.innerHTML = '<span style="color:#51f085;font-weight:700;">999,999,999 USDT (VIP Vĩnh Viễn 2099) 👑</span>';
              }
            });

            // VIP Badge in profile
            if (pInfo && !pInfo.querySelector(".vip-badge-pro")) {
              const badge = document.createElement("div");
              badge.className = "vip-badge-pro";
              badge.style.cssText = "display:inline-block;padding:6px 14px;border-radius:6px;background:linear-gradient(135deg, #10b981 0%, #059669 100%);color:#fff;font-weight:700;font-size:13px;margin:8px 0;box-shadow:0 2px 10px rgba(16,185,129,0.3);";
              badge.innerHTML = "👑 VIP MEMBER VĨNH VIỄN 2099";
              const headTarget = pInfo.querySelector(".user-info, .head, .profile-head") || pInfo.firstChild;
              if (headTarget) pInfo.insertBefore(badge, headTarget.nextSibling || headTarget);
            }

            // Unlock Lucky Money Button (.btn-give-me)
            const giveBtns = document.querySelectorAll(".btn-give-me");
            giveBtns.forEach(btn => {
              btn.removeAttribute("disabled");
              btn.disabled = false;
              btn.style.opacity = "1";
              btn.style.cursor = "pointer";
            });

            const pVer = document.querySelector(".profile-version");
            if (pVer && !pVer.textContent.includes("VIP 2099")) {
              pVer.innerHTML = '<span style="color:#51f085;font-weight:bold;">👑 Tài Khoản VIP Trọn Đời (Hạn dùng: 18/07/2099)</span>';
            }
          } catch (e) {}
        }

        if (typeof document !== "undefined") {
          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", patchGhienphimProfileDom);
          } else {
            patchGhienphimProfileDom();
          }
          setInterval(patchGhienphimProfileDom, 500);
        }
      } catch (e) {}
    }

    // ─── CHUỐI CHIÊN TV AUTO VIP LOGIN & MODAL BYPASS (NUXT 3) ───
    const isChuoiChienHost = typeof location !== "undefined" && location.hostname && (
      location.hostname.includes("chuoichien") ||
      location.hostname.includes("chuoichientv")
    );
    if (isChuoiChienHost) {
      try {
        const VIP_CC_USER = getChuoiChienVipUser();

        // 1. Pre-seed & protect localStorage session so Nuxt syncSessionFromStorage immediately logs in on startup
        if (typeof window !== "undefined" && window.localStorage) {
          try {
            if (!window.localStorage.getItem("auth._token.local")) {
              window.localStorage.setItem("auth._token.local", "cinema-pro-vip-jwt-token");
              window.localStorage.setItem("auth._refresh_token.local", "cinema-pro-vip-refresh-token");
              window.localStorage.setItem("auth.user", JSON.stringify(VIP_CC_USER));
            }
          } catch (e) {}

          // Tự động cấp real session token từ /guest-token để WebSocket Chat Centrifugo & /chat/send hoạt động 100%
          async function syncRealChuoiChienChatToken() {
            try {
              const nativeFetch = _origFetchNative || (typeof origFetchMain === "function" ? origFetchMain : window.fetch);
              if (!nativeFetch) return;

              let realToken = window.localStorage.getItem("guestAccessToken");
              if (!realToken || realToken.includes("cinema-pro-vip")) {
                const res = await nativeFetch("https://api.chuoichientv.net/v1/guest-token", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", "X-Cinema-Pro-Internal": "1" },
                  body: JSON.stringify({ guestName: "VIP Cinema Pro 👑" })
                });
                if (res && res.ok) {
                  const d = await res.json().catch(() => ({}));
                  realToken = d?.data?.token || d?.data?.guestToken || d?.token;
                }
              }
              if (realToken && !realToken.includes("cinema-pro-vip")) {
                window.localStorage.setItem("guestAccessToken", realToken);
                window.localStorage.setItem("auth._token.local", realToken);
                window.localStorage.setItem("auth._refresh_token.local", realToken);
              }
              window.localStorage.setItem("auth.user", JSON.stringify(VIP_CC_USER));
            } catch (e) {}
          }
          syncRealChuoiChienChatToken();

          if (window.Storage && window.Storage.prototype) {
            const origRemove = window.Storage.prototype.removeItem;
            window.Storage.prototype.removeItem = function (key) {
              if (key === "auth._token.local" || key === "auth.user" || key === "auth._refresh_token.local") return;
              return origRemove.apply(this, arguments);
            };
          }
        }

        // 2. DOM Patcher & Modal VIP 1-Click Auto-Login Bypass
        function patchChuoiChienAuthDom() {
          try {
            if (typeof document === "undefined") return;

            // Header VIP Styling: Replace guest login button if still rendered
            const navLoginBtn = document.querySelector(".nav-login-btn");
            const navActions = document.querySelector(".nav-actions");
            if (navLoginBtn && navActions && !navActions.querySelector(".nav-user")) {
              const userDiv = document.createElement("div");
              userDiv.className = "nav-user";
              userDiv.innerHTML = '<button type="button" class="nav-user-trigger" aria-label="Tài khoản" style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(81,240,133,0.3);border-radius:20px;padding:4px 12px;cursor:pointer;">' +
                '<span class="nav-display-name role-admin" style="color:#51f085;font-weight:700;font-size:13px;">VIP Cinema Pro 👑</span>' +
                '<span class="nav-avatar-btn" style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg, #10b981 0%, #059669 100%);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:11px;border:2px solid #51f085;">VIP</span>' +
              '</button>';
              navLoginBtn.style.display = "none";
              navActions.appendChild(userDiv);
            }

            // Also style existing .nav-display-name if already rendered by Nuxt
            const existingName = document.querySelector(".nav-display-name");
            if (existingName && !existingName.classList.contains("vip-styled")) {
              existingName.classList.add("vip-styled", "role-admin");
              existingName.style.color = "#51f085";
              existingName.style.fontWeight = "700";
            }

            // Handle Login Modal if opened
            const authPanel = document.querySelector(".auth-modal-panel, [class*='auth-modal-panel']");
            if (authPanel) {
              const authForm = authPanel.querySelector("form.auth-form, form");
              const inputs = authPanel.querySelectorAll("input.auth-input, input");

              // Auto-fill inputs if empty
              if (inputs.length >= 2) {
                const usernameInput = inputs[0];
                const passwordInput = inputs[1];

                if (!usernameInput.value) {
                  usernameInput.value = "vip_cinemapro";
                  usernameInput.dispatchEvent(new Event("input", { bubbles: true }));
                  usernameInput.dispatchEvent(new Event("change", { bubbles: true }));
                }
                if (!passwordInput.value) {
                  passwordInput.value = "CinemaPro2099!";
                  passwordInput.dispatchEvent(new Event("input", { bubbles: true }));
                  passwordInput.dispatchEvent(new Event("change", { bubbles: true }));
                }
              }

              // Add 1-Click VIP Login Button if not present
              if (!authPanel.querySelector("#btn-vip-fastlogin-cc")) {
                const fastBtn = document.createElement("button");
                fastBtn.id = "btn-vip-fastlogin-cc";
                fastBtn.type = "button";
                fastBtn.className = "auth-submit-btn w-full";
                fastBtn.style.cssText = "margin-top:12px;width:100%;background:linear-gradient(135deg, #10b981 0%, #059669 100%);border:none;font-weight:700;padding:12px;border-radius:6px;color:#fff;cursor:pointer;display:block;text-align:center;font-size:14px;box-shadow:0 4px 15px rgba(16,185,129,0.4);";
                fastBtn.innerHTML = "👑 ĐĂNG NHẬP VIP 1-CLICK (KHÔNG CẦN PASS)";
                fastBtn.onclick = function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  try {
                    window.localStorage.setItem("auth._token.local", "cinema-pro-vip-jwt-token");
                    window.localStorage.setItem("auth._refresh_token.local", "cinema-pro-vip-refresh-token");
                    window.localStorage.setItem("auth.user", JSON.stringify(VIP_CC_USER));
                  } catch (err) {}

                  // Trigger form submit to let Vue update
                  if (authForm) {
                    const submitBtn = authForm.querySelector(".auth-submit-btn, button[type='submit']");
                    if (submitBtn && submitBtn !== fastBtn) {
                      submitBtn.click();
                      return;
                    }
                  }
                  // Fallback close modal
                  const closeBtn = authPanel.querySelector(".auth-modal-close, button[aria-label='Đóng']");
                  if (closeBtn) closeBtn.click();
                  else {
                    const modalOverlay = authPanel.closest(".fixed, [class*='fixed']");
                    if (modalOverlay) modalOverlay.style.display = "none";
                  }
                  patchChuoiChienAuthDom();
                };

                if (authForm) {
                  authForm.appendChild(fastBtn);
                } else {
                  authPanel.appendChild(fastBtn);
                }
              }
            }
          } catch (e) {}
        }

        // 3. Chuối Chiên In-Player Banner & Bet Button Cleaner
        try {
          const injectCcStyle = () => {
            let s = document.getElementById("cc-nuke-player-ads");
            if (!s && typeof document !== "undefined") {
              s = document.createElement("style");
              s.id = "cc-nuke-player-ads";
              s.textContent = "html body [data-v-4c9315d7].banner-content, html body [data-v-4c9315d7].banner-canvas, html body [data-v-4c9315d7].banner-image, html body img[data-v-4c9315d7], html body div[data-v-4c9315d7].banner-item, html body [data-v-cede0d5b], " +
                "html body .banner-canvas, html body div.banner-canvas, html body [class*='banner-canvas'], " +
                "html body .banner-content, html body div.banner-content, html body [class*='banner-content'], " +
                "html body .banner-container, html body div.banner-container, html body [class*='banner-container'], " +
                "html body .banner-image, html body img.banner-image, html body [class*='banner-image'], " +
                "html body .bet-button-content, html body button.bet-button-content, html body [class*='bet-button-content'], " +
                "html body .bet-button-player, html body .bet-buttons-container, html body [class*='bet-buttons-container'], " +
                "html body img[src*='1920x60'], html body img[src*='cdnvip.chuoichientv.net'], html body img[src*='c5735ef8'], " +
                "html body img[alt*='FB88'], html body img[alt*='net-88'], html body img[alt*='banner_player'], html body img[alt*='banner-player'] { " +
                "display: none !important; " +
                "visibility: hidden !important; " +
                "height: 0 !important; " +
                "width: 0 !important; " +
                "opacity: 0 !important; " +
                "pointer-events: none !important; " +
                "position: absolute !important; " +
                "top: -99999px !important; " +
                "left: -99999px !important; " +
                "max-height: 0 !important; " +
                "max-width: 0 !important; " +
                "clip: rect(0, 0, 0, 0) !important; " +
                "margin: 0 !important; " +
                "padding: 0 !important; }";
              (document.head || document.documentElement).appendChild(s);
            } else if (s && document.head && s.parentNode !== document.head) {
              document.head.appendChild(s);
            }
          };
          injectCcStyle();
          if (typeof document !== "undefined") {
            document.addEventListener("DOMContentLoaded", injectCcStyle);
            window.addEventListener("load", injectCcStyle);
          }
        } catch (e) {}

        // Prototype interceptor to block Vue mounting banner/bet button nodes
        try {
          if (typeof Element !== "undefined" && Element.prototype) {
            const origAppend = Element.prototype.appendChild;
            const origInsert = Element.prototype.insertBefore;
            function isNukeNode(node) {
              if (!node || node.nodeType !== 1) return false;
              if (node.tagName === "VIDEO" || node.classList?.contains("hlsp") || (node.querySelector && node.querySelector("video"))) return false;
              if (node.getAttribute) {
                if (node.getAttribute("data-v-cede0d5b") !== null) return true;
                if (node.getAttribute("data-v-4c9315d7") !== null && (node.tagName === "IMG" || (node.className && typeof node.className === "string" && (node.className.includes("banner") || node.className.includes("bet"))))) return true;
              }
              if (node.className && typeof node.className === "string") {
                if (node.className.includes("bet-button") || node.className.includes("banner-canvas") || node.className.includes("banner-content") || node.className.includes("banner-image")) return true;
              }
              if (node.tagName === "IMG" && node.src && (node.src.includes("1920x60") || node.src.includes("cdnvip.chuoichientv.net") || node.src.includes("c5735ef8"))) return true;
              const txt = (node.textContent || "").trim();
              if (txt.startsWith("Cược FB88") || txt.startsWith("Cược Net-88") || txt.startsWith("Cược xBet")) return true;
              return false;
            }
            Element.prototype.appendChild = function(node) {
              if (isNukeNode(node)) {
                try {
                  node.style.setProperty("display", "none", "important");
                  node.style.setProperty("visibility", "hidden", "important");
                  node.style.setProperty("position", "absolute", "important");
                  node.style.setProperty("top", "-99999px", "important");
                  node.style.setProperty("width", "0", "important");
                  node.style.setProperty("height", "0", "important");
                  node.style.setProperty("opacity", "0", "important");
                  node.style.setProperty("pointer-events", "none", "important");
                } catch (e) {}
              }
              const res = origAppend.apply(this, arguments);
              if (isNukeNode(node)) {
                try {
                  if (typeof node.remove === "function") node.remove();
                } catch (e) {}
              }
              return res;
            };
            Element.prototype.insertBefore = function(node, ref) {
              if (isNukeNode(node)) {
                try {
                  node.style.setProperty("display", "none", "important");
                  node.style.setProperty("visibility", "hidden", "important");
                  node.style.setProperty("position", "absolute", "important");
                  node.style.setProperty("top", "-99999px", "important");
                  node.style.setProperty("width", "0", "important");
                  node.style.setProperty("height", "0", "important");
                  node.style.setProperty("opacity", "0", "important");
                  node.style.setProperty("pointer-events", "none", "important");
                } catch (e) {}
              }
              const res = origInsert.apply(this, arguments);
              if (isNukeNode(node)) {
                try {
                  if (typeof node.remove === "function") node.remove();
                } catch (e) {}
              }
              return res;
            };
          }
        } catch (e) {}

        function cleanChuoiChienPlayerAds() {
          try {
            if (typeof document === "undefined") return;

            // Diệt sạch banner dưới video player (1920x60.gif, banner-canvas, banner-content, banner-image, net88, fb88)
            const banners = document.querySelectorAll(
              ".banner-canvas, [class*='banner-canvas'], div.banner-canvas, " +
              ".banner-content, [class*='banner-content'], div.banner-content, " +
              ".banner-container, [class*='banner-container'], div.banner-container, " +
              ".banner-image, img.banner-image, [class*='banner-image'], " +
              "img[src*='1920x60'], img[src*='cdnvip.chuoichientv.net'], img[src*='c5735ef8'], " +
              "[alt*='net-88-banner-player'], [alt*='banner-player'], [alt*='banner_player'], [alt*='FB88'], [alt*='net-88'], " +
              "[data-position='live-under-player'], .banner-player, [data-v-4c9315d7].banner-content, [data-v-4c9315d7].banner-canvas, img[data-v-4c9315d7]"
            );
            banners.forEach(b => {
              if (b.tagName === "VIDEO" || b.classList?.contains("hlsp") || (b.querySelector && b.querySelector("video"))) return;
              try {
                b.style.setProperty("display", "none", "important");
                b.style.setProperty("visibility", "hidden", "important");
                b.style.setProperty("height", "0", "important");
                b.style.setProperty("width", "0", "important");
                b.style.setProperty("opacity", "0", "important");
                b.style.setProperty("pointer-events", "none", "important");
                b.style.setProperty("position", "absolute", "important");
                b.style.setProperty("top", "-99999px", "important");
                b.remove();
              } catch (e) {}
            });

            // Diệt sạch nút cược gắn trên player (Cược FB88, Cược Net-88, Cược xBet79)
            const betButtons = document.querySelectorAll(
              ".bet-button-content, button.bet-button-content, [class*='bet-button-content'], " +
              ".bet-button-player, .bet-buttons-container, [class*='bet-buttons-container'], " +
              "[data-position*='bet-button'], [data-v-cede0d5b]"
            );
            betButtons.forEach(btn => {
              if (btn.tagName === "VIDEO" || btn.classList?.contains("hlsp") || (btn.querySelector && btn.querySelector("video"))) return;
              try {
                btn.style.setProperty("display", "none", "important");
                btn.style.setProperty("visibility", "hidden", "important");
                btn.style.setProperty("height", "0", "important");
                btn.style.setProperty("width", "0", "important");
                btn.style.setProperty("opacity", "0", "important");
                btn.style.setProperty("pointer-events", "none", "important");
                btn.style.setProperty("position", "absolute", "important");
                btn.style.setProperty("top", "-99999px", "important");
                btn.remove();
              } catch (e) {}
            });

            // Quét sạch theo text content
            document.querySelectorAll("button, div, span, a").forEach(el => {
              const txt = (el.textContent || "").trim();
              if (txt.startsWith("Cược FB88") || txt.startsWith("Cược Net-88") || txt.startsWith("Cược xBet")) {
                if (el.tagName !== "VIDEO" && !el.classList?.contains("hlsp") && !(el.querySelector && el.querySelector("video"))) {
                  try {
                    el.style.setProperty("display", "none", "important");
                    el.style.setProperty("visibility", "hidden", "important");
                    el.style.setProperty("position", "absolute", "important");
                    el.style.setProperty("top", "-99999px", "important");
                    el.remove();
                  } catch (e) {}
                }
              }
            });
          } catch (e) {}
        }

        function runChuoiChienPatcher() {
          patchChuoiChienAuthDom();
          cleanChuoiChienPlayerAds();
          injectCcStyle();
        }

        if (typeof document !== "undefined") {
          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", runChuoiChienPatcher);
          } else {
            runChuoiChienPatcher();
          }
          setInterval(runChuoiChienPatcher, 100);
          if (window.MutationObserver) {
            try {
              new MutationObserver(() => {
                cleanChuoiChienPlayerAds();
                injectCcStyle();
              }).observe(
                document.documentElement || document.body,
                { childList: true, subtree: true }
              );
            } catch (e) {}
          }
        }
      } catch (e) {}
    }
  } catch (e) {}

  // ─── TỰ ĐỘNG GỠ BỎ TCOIN-DISABLED & ĐỒNG BỘ 999,999,999 TCOIN MỌI GIAO DIỆN ───
  function patchTcoinDom() {
    try {
      const disabledMenu = document.querySelector(".tcoin-disabled");
      if (disabledMenu) disabledMenu.classList.remove("tcoin-disabled");

      // 1. Menu Dropdown góc trên bên phải
      const coinEl = document.querySelector(".tcoin-menu-content strong");
      if (coinEl && (!coinEl.textContent || coinEl.textContent === "0")) {
        coinEl.textContent = "999,999,999";
      }

      // 2. Widget TCoin thanh Sidebar quản lý tài khoản (/user/*)
      const sidebarHeadings = document.querySelectorAll(
        ".tcoin-highlight__text .heading-xs, .tcoin-highlight .heading-xs, .tcoin-highlight__text div:last-child"
      );
      sidebarHeadings.forEach(el => {
        if (!el) return;
        const txt = el.textContent ? el.textContent.trim() : "";
        if (txt === "0 TCoin" || txt === "0" || txt === "999999999 TCoin" || (txt.includes("TCoin") && !txt.includes("999,999,999"))) {
          if (!txt.includes("Bạn hiện có") && !txt.includes("Đổi Quà")) {
            el.textContent = "999,999,999 TCoin";
          }
        }
      });

      // 3. Quét kiểm tra khối .tcoin-highlight
      document.querySelectorAll(".tcoin-highlight, [class*='tcoin-highlight']").forEach(container => {
        const textContainer = container.querySelector(".tcoin-highlight__text");
        if (textContainer) {
          const heading = textContainer.querySelector(".heading-xs");
          if (heading && (!heading.textContent || !heading.textContent.includes("999,999,999"))) {
            heading.textContent = "999,999,999 TCoin";
          }
        }
      });

      // 4. TreeWalker quét nhanh mọi text node chứa '0 TCoin' trên trang
      if (typeof document !== "undefined" && typeof document.createTreeWalker === "function" && typeof NodeFilter !== "undefined") {
        const walker = document.createTreeWalker(
          document.body || document.documentElement,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );
        let node;
        while ((node = walker.nextNode())) {
          if (node.nodeValue && /0s*TCoin/.test(node.nodeValue)) {
            node.nodeValue = node.nodeValue.replace(/0s*TCoin/g, "999,999,999 TCoin");
          }
        }
      }

      if (location.hostname && (location.hostname.includes("motchill") || location.hostname.includes("phimmotchill"))) {
        document.documentElement.style.setProperty("--color-primary", "#51f085");
        document.documentElement.style.setProperty("--primary-color", "#51f085");
        document.documentElement.style.setProperty("--primary-text", "#51f085");
      }
    } catch (e) {}
  }

  // MutationObserver phản ứng tức thì khi Next.js render hoặc đổi trang
  try {
    if (typeof MutationObserver !== "undefined") {
      const tcoinObserver = new MutationObserver(() => {
        patchTcoinDom();
      });
      const targetObs = (typeof document !== "undefined" && (document.body || document.documentElement));
      if (targetObs) {
        tcoinObserver.observe(targetObs, {
          childList: true,
          subtree: true,
          characterData: true
        });
      }
    }
  } catch (e) {}

  // Interval dự phòng định kỳ
  setInterval(patchTcoinDom, 400);



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
    try {
      const stored = localStorage.getItem("RO_CAPTURED_STREAM");
      if (stored && checkAndCaptureUrl(stored)) return capturedStreamUrl;
    } catch (e) {}

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

  // ─── HOOK FETCH TRÊN TRANG CHÍNH & CHẶN API BANNER ───
  const origFetchMain = window.fetch;
  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input?.url || "";
    if (isAdApi(url)) {
      console.log("[Web Enhancer] Đã chặn triệt để API banner:", url);
      return new Response(JSON.stringify({ status: 200, success: true, version: 1, items: {}, data: [], banners: [], result: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (typeof getRophimMockResponse === "function") {
      const mockRes = getRophimMockResponse(url, init);
      if (mockRes) return mockRes;
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
    return handleRophimFetchResponse(fetchPromise, url, init);
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
      if (isAdApi(targetUrl)) {
        try {
          Object.defineProperty(xhr, "status", { value: 200, writable: false });
          Object.defineProperty(xhr, "responseText", { value: "{}", writable: false });
        } catch (e) {}
        return;
      }
      if (typeof getRophimMockXhr === "function") {
        const mockStr = getRophimMockXhr(targetUrl, body);
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
      }
      xhr.addEventListener("load", function () {
        try {
          if (xhr.responseText && (xhr.responseText.includes(".m3u8") || xhr.responseText.includes("/hls/") || xhr.responseText.includes(".mpd") || xhr.responseText.includes(".mp4"))) {
            const found = findStreamMatches(xhr.responseText);
            found.forEach(u => checkAndCaptureUrl(u));
          }
        } catch (e) {}
        handleRophimXhrResponse(xhr, targetUrl);
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
    localStorage.setItem("is_banner_popup", "1");
    localStorage.setItem("giovang_tvc_pre_roll_daily", JSON.stringify({ date: "2099-12-31", count: 99999 }));
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
      return origGetItem.apply(this, arguments);
    };
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
        if (layer) layer.remove();
        const vids = document.querySelectorAll("#video-premium, #video-second, #video-third, video[src*='tvc']");
        vids.forEach(v => {
          try { v.pause(); v.src = ""; v.remove(); } catch (e) {}
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
      u.includes("/ux-toplist/") ||
      u.includes("ux-toplist")
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
            tvcVideo.remove();
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
          layer.style.setProperty("display", "none", "important");
          layer.remove();
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

        // Diệt tận gốc ads-layer & in-player banner Chuối Chiên (watermark + nút cược + banner dưới player)
        document.querySelectorAll(
          ".ads-layer, [class*='ads-layer'], .player-logo-wrapper, .player-logo-inner, " +
          ".bet-button-player, .bet-buttons-container, .bet-button-content, button.bet-button-content, [class*='bet-button'], " +
          ".banner-player, .banner-canvas, [class*='banner-canvas'], div.banner-canvas, .banner-container, .banner-content, div.banner-content, .banner-image, img.banner-image, [class*='banner-image'], " +
          "img[src*='1920x60'], img[src*='cdnvip.chuoichientv.net'], img[src*='c5735ef8'], img[alt*='banner-player'], img[alt*='banner_player'], " +
          "img[alt*='FB88'], img[alt*='net-88'], [data-position='live-under-player'], [data-position*='bet-button'], " +
          "[data-v-77ed3802], [data-v-cede0d5b], [data-v-4c9315d7].banner-content, [data-v-4c9315d7].banner-canvas, img[data-v-4c9315d7]"
        ).forEach(ad => {
          if (ad.tagName === "VIDEO" || ad.classList?.contains("hlsp") || ad.classList?.contains("player-container") || (ad.querySelector && ad.querySelector("video"))) return;
          try {
            ad.style.setProperty("display", "none", "important");
            ad.style.setProperty("visibility", "hidden", "important");
            ad.style.setProperty("height", "0", "important");
            ad.style.setProperty("width", "0", "important");
            ad.style.setProperty("opacity", "0", "important");
            ad.style.setProperty("pointer-events", "none", "important");
            ad.remove();
            count++;
          } catch (e) {}
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
              el.style.setProperty("display", "none", "important");
              el.style.setProperty("visibility", "hidden", "important");
              el.style.setProperty("height", "0", "important");
              const p = (el.closest && el.closest('.bet-button, .bet-buttons, [class*="bet-button"], .bet-buttons-container, .banner-canvas, [class*="banner-canvas"], .banner-content, [class*="banner-content"], .ads-layer, [class*="ads-layer"], .gv-bet-dropdown, .box-odds-match, .homepage-toplists-content, .toplists-home, .sticky-message, .sticky-announcement, [class*="detail-live-brand"]')) || el;
              if (p !== lw && !(lw && p.contains && p.contains(lw)) && !(p.querySelector && p.querySelector("video"))) {
                p.style.setProperty("display", "none", "important");
                p.style.setProperty("visibility", "hidden", "important");
                p.style.setProperty("height", "0", "important");
                if (typeof p.remove === "function") {
                  p.remove();
                  count++;
                }
              } else if (typeof el.remove === "function") {
                el.remove();
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
  const css = "/* ═══════════════════════════════════════════════════════════════\n   Cinema Pro Suite - Adblock & Anti-Banner CSS\n   Diệt sạch banner catfish, popup, cá cược, video ads\n   ═══════════════════════════════════════════════════════════════ */\n\n/* Xóa sạch mọi container banner quảng cáo */\n.ad-container, .ads-holder, .banner-left, .banner-right,\ndiv[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"],\n.ads-wrapper, #chancoc, .modal-adblock, .adv-holder, .pm-ads,\n.hh3d-ads, .dp-ads, .tvhay-ads, .ah-ads, #box-ads, .ah-banner,\n.bl-ads, .a47-ads, .ophim-ads, .biphim-ads, .dhtv-ads,\n.motphim-ads, .mephim-ads, .ghienphim-ads, .fullphim-ads, .phimhay-ads,\n.atvn-ads, .hhkf-ads, .hhpanda-ads, .vst-ads, .p247-ads, .phd-ads, .pbh-ads,\n.pv-ads, .btv-ads, .hdo-ads, .chay-ads, .xpp-ads, .ts-ads, .ss-ads,\n[class*=\"ad_placement\"], [id*=\"google_ads\"], div[style*=\"z-index: 9999999\"],\ndiv[style*=\"zIndex: 9999999\"], div[style*=\"backdrop-filter: blur(25px)\"],\n\n/* Diệt sạch banner catfish, fixed bottom bar và cá cược */\n.catfish, #catfish, .catfish-banner, #catfish-banner, div[class*=\"catfish\"], div[id*=\"catfish\"],\ndiv[class*=\"bottom-ads\"], div[class*=\"bottom_ads\"], div[class*=\"bottom-banner\"], div[class*=\"bottom_banner\"],\ndiv[id*=\"bottom-ads\"], div[id*=\"bottom_ads\"], div[id*=\"bottom-banner\"], div[id*=\"bottom_banner\"],\ndiv[class*=\"footer-ads\"], div[class*=\"footer_ads\"], div[class*=\"footer-banner\"], div[class*=\"footer_banner\"],\ndiv[class*=\"floating-banner\"], div[class*=\"floating_banner\"], div[class*=\"float-ads\"], div[class*=\"float_ads\"],\ndiv[class*=\"sticky-ads\"], div[class*=\"sticky-banner\"], div[id*=\"sticky-ads\"], div[id*=\"sticky-banner\"],\ndiv[class*=\"qc_bottom\"], div[id*=\"qc_bottom\"], div[class*=\"qc-bottom\"], div[id*=\"qc-bottom\"],\ndiv[id*=\"box-bottom\"], div[class*=\"box-bottom\"], div[id*=\"ads_bottom\"], div[class*=\"ads_bottom\"],\ndiv[id*=\"floating_bottom\"], div[class*=\"floating_bottom\"], div[id*=\"float_bottom\"],\n\n/* Diệt sạch banner & popup Truyện Tranh (ZetTruyen, TopTruyen, NetTruyen, TruyenQQ, TruyenVN) */\n.ads-tool-banner-container, [class*=\"ads-tool-banner-container\"], .close-catfish,\n[data-zone], [data-zone=\"top\"], [data-zone=\"top_content\"], [data-zone=\"bottom\"],\n.advertisement, #video-chapter, div[id*=\"video-chapter\"], div[class*=\"advertisement\"],\n#top-banner-reading-container, #top-banner-reading-container-sub, #mid-banner-reading-container,\n#ad_info_top, #ad_info_2, #ad_info, div[id*=\"ad_info\"], div[id*=\"banner-reading\"],\n.community-banner, .iframe-content-mobile, .iframe-content-desktop, .banner.text-center,\n.ads-static-header, .ads-static-home-detail-chapter, .ads-static-home-middle, div[class*=\"ads-static\"],\n.popup_layer, .popup_content, #popup_content,\n#ads, .wrapper-ads, .mission-ads, .tr-ads-click, .popup-noti, .notification-popup, #couter-wrapper, [class*=\"mission-ads\"],\n\n/* Diệt tận gốc Banner Rophim, Thể thao, Giovang, Chuoichien & Thapcam */\n.sspp-area, [class*=\"sspp-area\"], [class*=\"sspp_area\"], [class*=\"sspp-\"],\n.display-single, [class*=\"display-single\"], .is-demo, [class*=\"is-demo\"],\n.is-image, div[class*=\"is-image\"],\n#banner_popup, .banner_popup, .banner_inner, .banner_cursor,\n.grid_banner_devqc, .devqc-manager-resources, .w-banner_devqc-bd, .banner_devqc-bdn-button,\n.devqc-catfish, .gvbanner-catfish, [class*=\"devqc\"], [id*=\"devqc\"],\n#banners-bottom-container, .banners-bottom, .banners-bottom-grid, #open-banner-bottom,\n.popup-menu, #popupMenu, .floating-balloon-container, .popup-anim, .popup-item,\na[data-brand-id], a.seo4s-resolve-link, a[class*=\"seo4s\"],\n.bg-modaltrungthuong, .modal-trungthuong, .close-modal-trungthuong,\n.tvc-pre-roll, .video-wrapper.tvc-pre-roll, .tvc-pre-roll__video, .tvc-pre-roll__skip, .tvc-pre-roll__link-overlay, [class*=\"tvc-pre-roll\"],\n.xlz-ads-item, .block-catfish, .xlz-btn-8xbet, [class*=\"xlz-ads\"],\n.odds-comp-logo, a.odds-comp-logo, .grid-match__odds,\n.marquee-container, .marquee-box, [class*=\"marquee-container\"],\n.odds-button, div[class*=\"odds-button\"], [class*=\"odds-button\"],\n.teambox__odds, [class*=\"teambox__odds\"], .btn-odds, [class*=\"btn-odds\"], .match-detail__offer, .offer__buttons, .offer__bet__col, [class*=\"match-detail__offer\"],\n.fixture-banner, [class*=\"fixture-banner\"], [class*=\"balloon-wrapper\"], [class*=\"btn-balloon\"], [class*=\"popup-item\"],\n[class*=\"banner-pos-\"], [class*=\"ad-strip-pos\"], [class*=\"ad-popup-modal\"], [class*=\"banner-pos\"], [id*=\"banner-pos\"],\n.top-ads, .ads-728-90, .adspot-wrap, .adspot-1, .adspot-2, [class*=\"adspot\"], [id*=\"adspot\"], ins[data-revive-id],\n.banner-match, .gv-skeleton-banner, [class*=\"gv-skeleton-banner\"],\n.ads-layer, [class*=\"ads-layer\"], div.ads-layer,\n.player-logo-wrapper, .player-logo-inner, .player-logo-ad, [class*=\"player-logo-\"], [class*=\"player-logo\"],\n.bet-button-player, .bet-buttons-container, .bet-button-content, [class*=\"bet-button-player\"], [class*=\"bet-buttons-container\"], [class*=\"bet-button-content\"],\n[data-v-77ed3802], [data-v-77cd3882], [data-v-4c9315d7], [data-v-cede0d5b],\n.banner-player, .banner-canvas, div.banner-canvas, [class*=\"banner-canvas\"], .banner-container, .banner-content, .banner-image, .banner-item,\n[class*=\"banner-player\"], [class*=\"banner-container\"], [class*=\"banner-content\"], [class*=\"banner-image\"], [class*=\"banner-item\"],\n.banner-content.active, [class*=\"banner-content\"][class*=\"active\"],\n.bet-button, .bet-buttons, [class*=\"bet-button\"], [class*=\"bet-buttons\"], [class*=\"bet-btn\"],\n.homepage-toplists-content, section.homepage-toplists-content, [class*=\"homepage-toplists\"],\n.toplists-home, [class*=\"toplists-home\"], .devvn-topfive-wrapper, [class*=\"devvn-topfive\"],\n.topfive-card, [class*=\"topfive-card\"],\n.box-odds-match, [class*=\"box-odds-match\"], .title-odds, [class*=\"title-odds\"],\n.gv-bet-dropdown, [class*=\"gv-bet-dropdown\"], .gv-bet-dropdown-toggle, [class*=\"gv-bet-dropdown-toggle\"],\n.gv-bet-dropdown-menu, [class*=\"gv-bet-dropdown-menu\"],\n.gv-bet-brand-link--image, [class*=\"gv-bet-brand-link\"], .gv-bet-brand-link__img,\na[aria-label=\"Top Nhà Cái\"], img[src*=\"nav-toplist.svg\"], img[src*=\"nav-active-toplist.svg\"],\nimg[src*=\"kbv.svg\"], img[src*=\"bet-net88\"], img[src*=\"bet-gem88\"],\n.sticky-message, .sticky-announcement, [class*=\"sticky-announcement\"], [class*=\"sticky-message\"],\n.sticky-header, .sticky-icon-inline, .sticky-title, .sticky-content-text,\n.detail-live-brand, [class*=\"detail-live-brand\"], .detail-live-brand-title, .detail-live-brand-logo,\n[id*=\"notification-banner\"], [class*=\"notification-banner\"],\n.notification-banner-message-wrapper, .notification-banner-message-item, .gwd_notification,\n#betbutton-world-cup, a.btn-bet, a.bet-cta, .adspot-55, .adspot-56, .adspot-57,\n#corner-start-popup, .corner-start-popup, .corner-start-popup-backdrop, .corner-start-popup-content, .corner-start-popup-inner,\n.corner-popup-wrap, .corner-popup-box, [class*=\"corner-popup\"], [id*=\"corner-popup\"],\n.block-balloon-right, .block-balloon-left, .close-balloon-left, .close-balloon-right, [class*=\"balloon-\"],\n.bookmaker-title, .tf-section, .tf-theme-style4, [class*=\"tf-s3-\"], [class*=\"tf-section\"],\n.fixed-ads, .fixed-ads-1, .block-fixed-ads-1, [class*=\"block-fixed-ads\"], [class*=\"fixed-ads\"],\n.live-ads-temp-1, .live-ads-temp-2, .live-ads-temp-3, .live-ads-temp-4, .live-ads-temp-5, [class*=\"live-ads-temp\"],\n.left-ads, .right-ads,\nimg[alt*=\"FB88_banner_player\"], img[alt*=\"net-88-banner-player\"], img[alt*=\"net-88-logo\"], img[alt*=\"banner_player\"],\nimg[src*=\"1920x60\"], img[src*=\"cdnvip.chuoichientv.net\"], img[src*=\"c5735ef8\"],\na[href*=\"net88.boats\"], a[href*=\"logolive-30x30\"],\nimg[src*=\"giovang-popup\"], img[src*=\"hit.club\"], img[src*=\"go88\"], img[src*=\"sun.win\"],\nimg[src*=\"1280x1280px\"], img[src*=\"balloon_1111\"], img[src*=\"FB88\"], img[src*=\"fb88\"], img[src*=\"banner_player\"],\nimg[src*=\"net88\"], img[src*=\"NET88\"], img[src*=\"xBet\"],\nimg[src*=\"/images/company/\"], img[src*=\"company\"], img[src*=\"21-1.png\"], img[alt=\"company\"],\na[href*=\"15.235.211.192\"], a[href*=\"top-nha-cai\"], a[href*=\"xoilacz\"], a[href*=\"fb88.com\"],\na[href*=\"154.82.\"], a[href*=\"2138046\"], a[href*=\"9922\"],\nimg[src*=\"/media/\"][src*=\".gif\"],\ndiv.slide:has(.sspp-area), div.slide:has(.display-single),\ndiv.fluid-gap:has(.sspp-area), div.fluid-gap:has(.display-single),\na[href*=\"vsbet\"], a[href*=\"bet88\"], a[href*=\"colatv\"], a[href*=\"colascore\"], a[href*=\"kubet\"], a[href*=\"fun88\"],\na[href*=\"w88\"], a[href*=\"fb88\"], a[href*=\"bk8\"], a[href*=\"casino\"], a[href*=\"nhacai\"], a[href*=\"nohu\"],\na[href*=\"taixiu\"], a[href*=\"gamebai\"], a[href*=\"keonhacai\"], a[href*=\"bongda\"], a[href*=\"link1s\"],\na[href*=\"tructiephotlink\"], a[href*=\"branchseo\"], a[href*=\"/mlink/\"], a[href*=\"1-1-1-1\"],\ndiv[style*=\"position: fixed\"][style*=\"bottom: 0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell),\ndiv[style*=\"position: fixed\"][style*=\"bottom:0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell),\ndiv[style*=\"position:fixed\"][style*=\"bottom: 0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell),\ndiv[style*=\"position:fixed\"][style*=\"bottom:0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell) {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  max-height: 0 !important;\n  pointer-events: none !important;\n  opacity: 0 !important;\n}\n\n/* Diệt tuyệt đối các Modal Popup & Floating Ads đè trang */\n#banner_popup, #banner_popup.show, div#banner_popup, div#banner_popup.show,\n.banner_popup, .banner_popup.show, div.banner_popup, div.banner_popup.show,\n#corner-start-popup, .corner-start-popup, .corner-start-popup-backdrop, .corner-start-popup-content,\n.corner-popup-wrap, .corner-popup-box,\n.ads-layer, [class*=\"ads-layer\"], div.ads-layer,\n.player-logo-wrapper, .player-logo-inner, .player-logo-ad, [class*=\"player-logo-\"], [class*=\"player-logo\"],\n.bet-button-player, .bet-buttons-container, .bet-button-content, button.bet-button-content, [class*=\"bet-button-player\"], [class*=\"bet-buttons-container\"], [class*=\"bet-button-content\"],\n[data-v-77ed3802], [data-v-77cd3882], [data-v-4c9315d7], [data-v-cede0d5b],\n.banner-player, .banner-canvas, div.banner-canvas, [class*=\"banner-canvas\"], .banner-container, .banner-content, .banner-image, img.banner-image, .banner-item,\n[class*=\"banner-player\"], [class*=\"banner-container\"], [class*=\"banner-content\"], [class*=\"banner-image\"], [class*=\"banner-item\"],\n.banner-content.active, [class*=\"banner-content\"][class*=\"active\"],\n.bet-button, .bet-buttons, [class*=\"bet-button\"], [class*=\"bet-buttons\"], [class*=\"bet-btn\"],\n[data-position*=\"bet-button\"], [data-position=\"live-under-player\"], [data-position*=\"catfish\"],\n.ad-wrapper, .ad-container[data-position],\n.homepage-toplists-content, section.homepage-toplists-content, [class*=\"homepage-toplists\"],\n.toplists-home, [class*=\"toplists-home\"], .devvn-topfive-wrapper, [class*=\"devvn-topfive\"],\n.topfive-card, [class*=\"topfive-card\"],\n.box-odds-match, [class*=\"box-odds-match\"], .title-odds, [class*=\"title-odds\"],\n.gv-bet-dropdown, [class*=\"gv-bet-dropdown\"], .gv-bet-dropdown-toggle, [class*=\"gv-bet-dropdown-toggle\"],\n.gv-bet-dropdown-menu, [class*=\"gv-bet-dropdown-menu\"],\n.gv-bet-brand-link--image, [class*=\"gv-bet-brand-link\"], .gv-bet-brand-link__img,\n.sticky-message, .sticky-announcement, [class*=\"sticky-announcement\"], [class*=\"sticky-message\"],\n.sticky-header, .sticky-icon-inline, .sticky-title, .sticky-content-text,\n.detail-live-brand, [class*=\"detail-live-brand\"], .detail-live-brand-title, .detail-live-brand-logo,\n[id*=\"notification-banner\"], [class*=\"notification-banner\"],\n.modal-backdrop, .bg-modaltrungthuong, .modal-trungthuong,\n.floating-balloon-container, #popupMenu, .popup-menu, .popup-item, [class*=\"popup-item\"],\n.fixture-banner, [class*=\"fixture-banner\"], .balloon-wrapper, [class*=\"balloon-wrapper\"], .btn-balloon, [class*=\"btn-balloon\"],\n.grid_banner_devqc, .devqc-manager-resources, .w-banner_devqc-bd, .banner_devqc-bdn-button,\n.devqc-catfish, .gvbanner-catfish, [class*=\"devqc\"], [id*=\"devqc\"],\n.tvc-pre-roll, .video-wrapper.tvc-pre-roll, .tvc-pre-roll__video, .tvc-pre-roll__skip, .tvc-pre-roll__link-overlay,\n.marquee-container, .marquee-box, .odds-button,\n[class*=\"banner-pos-\"], [class*=\"ad-strip-pos\"], [class*=\"ad-popup-modal\"],\n.match-detail__offer, .offer__buttons, .offer__bet__col, [class*=\"match-detail__offer\"],\n.teambox__odds, [class*=\"teambox__odds\"], .btn-odds, [class*=\"btn-odds\"], .block-int, .block-k {\n  display: none !important;\n  visibility: hidden !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n  z-index: -999999 !important;\n  width: 0 !important;\n  height: 0 !important;\n  max-width: 0 !important;\n  max-height: 0 !important;\n}\n\n/* Đảm bảo khung Player bóng đá Giờ Vàng, Chuối Chiên và các web thể thao luôn hiển thị nguyên vẹn */\n.livestream_widget, .giovang-fixture-player-shell, .giovang-fixture-player-mount, .livestream_widget__content,\n.hlsp, .player-container, video {\n  display: block !important;\n  visibility: visible !important;\n  opacity: 1 !important;\n  pointer-events: auto !important;\n  height: auto !important;\n  max-height: none !important;\n}\n\nhtml, body {\n  overflow: auto !important;\n  position: static !important;\n}\n\n\n    :root {\n        --primary-color: #51f085 !important;\n        --primary-text: #51f085 !important;\n      }\n      .dev.dev-up { color: #51f085 !important; }\n      .tag-imdb { border: 1px solid #51f085 !important; }\n      .tag-imdb:before { color: #51f085 !important; }\n      .app-box-fix { display: none !important; }\n      .tcoin-disabled .tcoin-menu-highlight { display: block !important; }\n      .tcoin-menu-highlight { display: block !important; }\n      .tcoin-disabled .tcoin-highlight { display: block !important; }\n      .tcoin-highlight__text .heading-xs { font-weight: bold !important; }\n      .ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock {\n        display: none !important;\n        visibility: hidden !important;\n        height: 0 !important;\n        opacity: 0 !important;\n        pointer-events: none !important;\n      }\n\n/* ═══════════════════════════════════════════════════════════════\n   Cinema Pro Suite - Theater Mode & OLED HDR CSS\n   ═══════════════════════════════════════════════════════════════ */\n\nvideo.ro-enhanced-hdr {\n  filter: contrast(1.10) saturate(1.25) brightness(1.04) !important;\n}\n\nbody.ro-theater-active {\n  background-color: #050608 !important;\n}\n\nbody.ro-theater-active header,\nbody.ro-theater-active footer,\nbody.ro-theater-active .sidebar,\nbody.ro-theater-active .sidebar-right,\nbody.ro-theater-active nav {\n  opacity: 0.1 !important;\n  transition: opacity 0.3s ease;\n}\n\nbody.ro-theater-active header:hover,\nbody.ro-theater-active footer:hover,\nbody.ro-theater-active nav:hover {\n  opacity: 1 !important;\n}\n\nbody.ro-theater-active .player-wrapper,\nbody.ro-theater-active .player-container,\nbody.ro-theater-active #player,\nbody.ro-theater-active #live-player-content,\nbody.ro-theater-active #embed-player,\nbody.ro-theater-active #iframe-stream,\nbody.ro-theater-active .col-player,\nbody.ro-theater-active iframe {\n  max-height: 88vh !important;\n  box-shadow: 0 10px 50px rgba(81, 240, 133, 0.25) !important;\n  border-radius: 14px;\n}\n\n\n/* ═══════════════════════════════════════════════════════════════\n   Cinema Pro Suite - VIP Hub UI CSS (Sleek Modern Glassmorphism)\n   ═══════════════════════════════════════════════════════════════ */\n\n#ro-vip-hub {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  z-index: 2147483647;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 10px;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n}\n\n#ro-hub-toggle {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #10b981 0%, #059669 100%);\n  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.45);\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #ffffff;\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n  user-select: none;\n}\n\n#ro-hub-toggle:hover {\n  transform: scale(1.1) rotate(6deg);\n  box-shadow: 0 6px 26px rgba(16, 185, 129, 0.65);\n}\n\n#ro-hub-toggle svg {\n  width: 24px;\n  height: 24px;\n}\n\n#ro-hub-menu {\n  display: none;\n  background: rgba(15, 23, 42, 0.95);\n  backdrop-filter: blur(14px);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 14px;\n  padding: 14px;\n  width: 290px;\n  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);\n  flex-direction: column;\n  gap: 8px;\n  color: #e2e8f0;\n}\n\n#ro-hub-menu.show {\n  display: flex;\n  animation: roFadeIn 0.2s ease-out;\n}\n\n@keyframes roFadeIn {\n  from { opacity: 0; transform: translateY(8px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.ro-menu-btn {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  color: #f1f5f9;\n  padding: 8px 12px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  text-align: left;\n}\n\n.ro-menu-btn:hover {\n  background: rgba(16, 185, 129, 0.18);\n  border-color: rgba(16, 185, 129, 0.4);\n  transform: translateX(-2px);\n}\n\n.ro-btn-left {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.ro-icon {\n  width: 15px;\n  height: 15px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n\n.ro-icon svg {\n  width: 100%;\n  height: 100%;\n}\n\n.ro-badge {\n  font-size: 10px;\n  padding: 2px 6px;\n  border-radius: 6px;\n  background: rgba(255, 255, 255, 0.1);\n  color: #a1a1aa;\n}\n\n#ro-stream-preview {\n  background: rgba(16, 185, 129, 0.12);\n  border: 1px solid rgba(16, 185, 129, 0.3);\n  border-radius: 8px;\n  padding: 6px 10px;\n  font-size: 11px;\n  word-break: break-all;\n  color: #51f085;\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;\n  display: none;\n  cursor: pointer;\n}\n\n.ro-dot {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: #10b981;\n  box-shadow: 0 0 8px #10b981;\n  margin-right: 6px;\n  vertical-align: middle;\n}\n\n.ro-toast {\n  position: fixed;\n  top: 24px;\n  right: 24px;\n  z-index: 2147483647;\n  background: rgba(15, 23, 42, 0.95);\n  color: #51f085;\n  padding: 10px 18px;\n  border-radius: 10px;\n  border: 1px solid rgba(81, 240, 133, 0.4);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);\n  font-size: 14px;\n  font-weight: 600;\n  pointer-events: none;\n  animation: roToastAnim 2.2s forwards;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n@keyframes roToastAnim {\n  0% { opacity: 0; transform: translateY(-10px); }\n  15% { opacity: 1; transform: translateY(0); }\n  80% { opacity: 1; transform: translateY(0); }\n  100% { opacity: 0; transform: translateY(-10px); }\n}";

  function injectCinemaProStyles() {
    let s = document.getElementById("cinema-pro-suite-styles");
    if (!s) {
      s = document.createElement("style");
      s.id = "cinema-pro-suite-styles";
      s.textContent = css;
      (document.head || document.documentElement).appendChild(s);
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
    const t = document.createElement("div");
    t.className = "ro-toast";
    t.innerHTML = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  // ─── VIP CONTROL HUB DOM CREATION ───
  function initVipHub() {
    if (document.getElementById("ro-vip-hub")) return;
    const isComic = typeof isComicPage === "function" && isComicPage() && !document.querySelector("video");
    const hub = document.createElement("div");
    hub.id = "ro-vip-hub";
    hub.innerHTML = isComic ? `
      <div id="ro-hub-menu">
        <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: #51f085; display: flex; justify-content: space-between; align-items: center;">
          <span class="ro-btn-left">
            <span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg></span>
            <span>NetAnime VIP & Cinema Pro Suite</span>
          </span>
          <span style="font-size: 11px; opacity: 0.7;">v5.4.4</span>
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
            <span>NetAnime VIP & Cinema Pro Suite</span>
          </span>
          <span style="font-size: 11px; opacity: 0.7;">v5.4.4</span>
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

    bind("ro-comic-prev-btn", () => navigateComicChapter(-1));
    bind("ro-comic-next-btn", () => navigateComicChapter(1));
    bind("ro-comic-up-btn", () => window.scrollBy({ top: -450, behavior: "smooth" }));
    bind("ro-comic-down-btn", () => window.scrollBy({ top: 450, behavior: "smooth" }));
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
    ensureStreamUrl();
    if (!capturedStreamUrl) {
      showToast("Đang chờ bắt link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = capturedStreamUrl.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).catch(() => {});
    }
    const ref = (!isNoRefererCdn(cleanUrl) && location.href) ? location.href : "";
    const potTarget = ref ? (cleanUrl + "|Referer=" + encodeURIComponent(ref)) : cleanUrl;
    window.location.href = "potplayer://" + potTarget;
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
    showToast("Đang mở VLC... Nếu VLC báo lỗi MRL do CDN chặn, hãy bấm 'Tải Playlist .M3U' hoặc dùng PotPlayer!");
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
    const cleanUrl = capturedStreamUrl.trim();
    const title = (document.title || "Cinema_Pro_Stream").replace(/[/\\?%*:|"<>]/g, "_").trim();
    const ref = (!isNoRefererCdn(cleanUrl) && location.href) ? location.href : "";
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
    showToast("Đã tải playlist .m3u (Kèm Referer cho VLC & PotPlayer)!");
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
        showToast("Đang chuyển về chương trước...");
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
        showToast("Đang chuyển tới chương tiếp theo...");
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
        showToast("Đang tải: " + (select.options[nextIdx].text || "Chương mới"));
        return;
      }
    }
    showToast(direction < 0 ? "Đã ở chương đầu tiên!" : "Đã ở chương mới nhất!");
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

  const brandTag = "[Cinema Pro]";
  console.log("%c" + brandTag + " " + "NetAnime VIP & Cinema Pro Suite" + " Ready!", "font-size: 13px; font-weight: bold; color: #10b981;");
})();
