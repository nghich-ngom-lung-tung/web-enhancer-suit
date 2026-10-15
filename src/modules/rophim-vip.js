/**
 * Cinema Pro Suite - Rophim & Motchill VIP 2099 & Unlimited Coins Patcher Module
 */
module.exports = `
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

    // 2.4 Chuối Chiên TV Auth & User Profile API (Nuxt 3)
    const isChuoiChien = url.includes("chuoichien") || (typeof location !== "undefined" && location.hostname && (location.hostname.includes("chuoichien") || location.hostname.includes("chuoichientv")));
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

        if (typeof document !== "undefined") {
          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", patchChuoiChienAuthDom);
          } else {
            patchChuoiChienAuthDom();
          }
          setInterval(patchChuoiChienAuthDom, 500);
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
          if (node.nodeValue && /\b0\s*TCoin\b/.test(node.nodeValue)) {
            node.nodeValue = node.nodeValue.replace(/\b0\s*TCoin\b/g, "999,999,999 TCoin");
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
`;
