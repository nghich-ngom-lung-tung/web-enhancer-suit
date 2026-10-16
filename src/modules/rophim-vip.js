/**
 * Cinema Pro Suite - Rophim & Motchill VIP 2099 & Unlimited Coins Patcher Module
 */
module.exports = `
  // ─── LAYER 5: VIP 2099 & T-COIN RESPONSE PATCHER (ROPHIM & MOTCHILL API) ───
  const _origFetchNative = (typeof window !== "undefined" && window.fetch) ? window.fetch.bind(window) : null;
  const VIP_EXPIRY_DATE = new Date(2099, 6, 18, 0, 0, 0);
  const VIP_EXPIRY_TIMESTAMP = Math.floor(VIP_EXPIRY_DATE.getTime() / 1000);
  const COIN_BALANCE = 999999999;
  const ROPHIM_MIRROR_DOMAINS = [
    "moviehdthai.com",
    "cobephim.cfd",
    "rophim10.work",
    "darkbytes.xyz",
    "clubc.org"
  ];
  const ROPHIM_KEYWORDS = [
    "darkbytes.xyz",
    "darkbytes",
    "clubc.org",
    "clubc",
    "/baseapi/api/v1/tcoin",
    "tcoin",
    "/baseapi/api/v1/user/",
    "/baseapi/api/v1/vip/",
    "/api/v1/user/",
    "/api/v1/vip/",
    "/baseapi/api/v1/bookmarks",
    "/users/bookmarks",
    "/bookmarks",
    "/api/v1/bookmarks",
    "/users/reminds",
    "/reminds",
    "/users/reviews",
    "/reviews",
    "/baseapi/api/v1/histories",
    "/histories",
    "/watch-progress",
    "/watchlist",
    "watchlist",
    "checkWatchlist",
    "ckWatchlist",
    "/api/set-auth-cookie",
    "/set-auth-cookie",
    "set-auth-cookie",
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
    const u = url.toLowerCase();
    if (u.includes("_rsc") || u.includes(".rsc") || u.includes("_next/") || u.includes(".js") || u.includes(".css")) return false;
    return ROPHIM_KEYWORDS.some(k => u.includes(k));
  }

  function getMotchillVipUser(curUser) {
    const base = curUser || {};
    const defaultRoles = [
      { id: 1, name: "admin" },
      { id: 2, name: "vip" },
      { id: 3, name: "premium" }
    ];
    return {
      id: base.id || 999999,
      username: base.username || "VIP Cinema Pro",
      name: base.name || "VIP Cinema Pro",
      full_name: base.full_name || "VIP Cinema Pro",
      email: base.email || "vip@motchill.online",
      avatar: base.avatar || "/images/avatars/10.jpg",
      image: base.image || "/images/avatars/10.jpg",
      role: "VIP",
      is_role: "admin",
      is_vip: true,
      is_premium: true,
      gender: 1,
      roles: (base.roles && Array.isArray(base.roles) && base.roles.length > 0) ? base.roles : defaultRoles,
      permissions: ["admin", "vip", "premium", "superadmin"],
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
      name: "VIP Cinema Pro",
      displayName: "VIP Cinema Pro",
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
        is_vip: true,
        vip_expires_at: VIP_EXPIRY_TIMESTAMP,
        role: "VIP",
        thungBalance: COIN_BALANCE,
        coin_balance: COIN_BALANCE,
        expires: VIP_EXPIRY_DATE.toISOString()
      });
    }

    // 2.1 Darkbytes & RoPhim Comments & Reactions Mock (tránh lỗi 401 & crash undefined.substring trên cobephim / moviehdthai / rophim)
    if (url.includes("/comments/movie/") && url.includes("/reactions")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        data: [],
        result: [],
        reactions: [],
        userReaction: null,
        reaction: null,
        message: "Thành công"
      });
    }
    if (url.includes("/api/v1/comments") || (url.includes("/comments") && !url.includes("/comments/top") && !url.includes("/comments/movie/"))) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        data: {
          id: 999999,
          user_id: 999999,
          content: "",
          user: {
            id: 999999,
            name: "VIP Cinema Pro",
            username: "vip_cinemapro",
            avatar: "/images/avatars/10.jpg"
          },
          reactions: [],
          createdAt: new Date().toISOString()
        },
        result: {
          status: true,
          reactions: []
        },
        reactions: [],
        message: "Thành công"
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
        user: user
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
        result: { status: true },
        data: { status: true }
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

    // 7. Watch progress / History / Histories (Next.js App Router expects data: [] as an iterable Array)
    if (url.includes("/watch-progress") || url.includes("/histories") || url.includes("histories")) {
      return JSON.stringify({
        status: 200,
        success: true,
        code: 200,
        data: [],
        items: [],
        result: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 1 }
      });
    }

    // 7.2 Watchlist (checkWatchlist & addWatchlist - ngăn chặn 401 & TypeError: Cannot read properties of undefined (reading 'length'))
    if (url.includes("checkWatchlist") || url.includes("ckWatchlist") || url.includes("/watchlist/checkWatchlist")) {
      return JSON.stringify({
        status: 200,
        success: true,
        code: 200,
        data: [],
        result: [],
        items: []
      });
    }

    if (url.includes("addWatchlist") || url.includes("/watchlist/addWatchlist")) {
      return JSON.stringify({
        status: 200,
        success: true,
        code: 200,
        data: true,
        result: true
      });
    }

    if (url.includes("/watchlist") || url.includes("watchlist")) {
      return JSON.stringify({
        status: 200,
        success: true,
        code: 200,
        data: [],
        result: [],
        items: []
      });
    }

    // 7.3 Set auth cookie API
    if (url.includes("/set-auth-cookie") || url.includes("set-auth-cookie")) {
      return JSON.stringify({
        status: 200,
        success: true,
        code: 200,
        message: "OK"
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

    // 11. Bookmarks (chặn 401 gây fallback guest mode & TypeError includes trên Next.js Redux)
    if (url.includes("/bookmarks") || url.includes("bookmarks")) {
      const bookmarkData = {
        movieIds: [],
        actorIds: [],
        data: [],
        items: [],
        total: 0,
        page: 1,
        limit: 100
      };
      return JSON.stringify({
        status: 200,
        success: true,
        code: 200,
        ...bookmarkData,
        data: bookmarkData,
        result: bookmarkData
      });
    }

    // 11.1 Reminds & Reviews
    if (url.includes("/reminds") || url.includes("reminds")) {
      return JSON.stringify({
        status: 200,
        success: true,
        code: 200,
        reminds: [],
        data: [],
        result: []
      });
    }

    if (url.includes("/reviews") || url.includes("reviews")) {
      return JSON.stringify({
        status: 200,
        success: true,
        code: 200,
        reviews: [],
        data: [],
        result: []
      });
    }

    // 12. Notifications (home & unread counts)
    if (url.includes("/notifications")) {
      const notiData = {
        notificationsMovie: [],
        notificationsOther: [],
        unreadCountMovie: 0,
        unreadCountOther: 0
      };
      return JSON.stringify({
        status: 200,
        success: true,
        code: 200,
        ...notiData,
        data: notiData,
        result: notiData
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
    if (url && (url.includes("/bookmarks") || url.includes("bookmarks"))) {
      const bookmarkData = {
        movieIds: (data && Array.isArray(data.movieIds)) ? data.movieIds : ((data && data.data && Array.isArray(data.data.movieIds)) ? data.data.movieIds : []),
        actorIds: (data && Array.isArray(data.actorIds)) ? data.actorIds : ((data && data.data && Array.isArray(data.data.actorIds)) ? data.data.actorIds : []),
        data: (data && data.data) ? data.data : [],
        items: (data && data.items) ? data.items : [],
        total: (data && typeof data.total === "number") ? data.total : 0,
        page: 1,
        limit: 100
      };
      return {
        status: 200,
        success: true,
        code: 200,
        ...bookmarkData,
        data: bookmarkData,
        result: bookmarkData
      };
    }
    if (url && (url.includes("/reminds") || url.includes("reminds"))) {
      return {
        status: 200,
        success: true,
        code: 200,
        reminds: [],
        data: [],
        result: []
      };
    }
    if (url && (url.includes("/reviews") || url.includes("reviews"))) {
      return {
        status: 200,
        success: true,
        code: 200,
        reviews: [],
        data: [],
        result: []
      };
    }
    if (url && url.includes("/notifications")) {
      const notiData = {
        notificationsMovie: [],
        notificationsOther: [],
        unreadCountMovie: 0,
        unreadCountOther: 0
      };
      return {
        status: 200,
        success: true,
        code: 200,
        ...notiData,
        data: notiData,
        result: notiData
      };
    }
    if (url && (url.includes("/histories") || url.includes("/watch-progress") || url.includes("histories"))) {
      return {
        status: 200,
        success: true,
        code: 200,
        data: [],
        items: [],
        result: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 1 }
      };
    }
    if (url && (url.includes("checkWatchlist") || url.includes("ckWatchlist") || url.includes("/watchlist"))) {
      if (url.includes("addWatchlist")) {
        return { status: 200, success: true, code: 200, data: true, result: true };
      }
      return {
        status: 200,
        success: true,
        code: 200,
        data: (data && Array.isArray(data.data)) ? data.data : [],
        result: (data && Array.isArray(data.result)) ? data.result : [],
        items: []
      };
    }
    if (url && (url.includes("/set-auth-cookie") || url.includes("set-auth-cookie"))) {
      return { status: 200, success: true, code: 200, message: "OK" };
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
      data.user.is_premium = true;
      data.user.vip_expires_at = VIP_EXPIRY_TIMESTAMP;
      data.user.thungBalance = COIN_BALANCE;
      data.user.coin_balance = COIN_BALANCE;
      data.user.role = "VIP";
      data.user.is_role = "admin";
      data.user.roles = (data.user.roles && Array.isArray(data.user.roles) && data.user.roles.length > 0) ? data.user.roles : [
        { id: 1, name: "admin" },
        { id: 2, name: "vip" },
        { id: 3, name: "premium" }
      ];
      data.user.permissions = ["admin", "vip", "premium", "superadmin"];
      data.user.image = data.user.image || "/images/avatars/10.jpg";
      data.user.avatar = data.user.avatar || "/images/avatars/10.jpg";
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
        obj.is_premium = true;
        obj.vip_expires_at = VIP_EXPIRY_TIMESTAMP;
        obj.coin_balance = COIN_BALANCE;
        obj.thungBalance = COIN_BALANCE;
        if (!obj.roles || !Array.isArray(obj.roles) || obj.roles.length === 0) {
          obj.roles = [
            { id: 1, name: "admin" },
            { id: 2, name: "vip" },
            { id: 3, name: "premium" }
          ];
        }
        if (!obj.permissions) obj.permissions = ["admin", "vip", "premium", "superadmin"];
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

    const isRophimHost = location.hostname && (
      location.hostname.includes("rophim") ||
      location.hostname.includes("ro-phim") ||
      location.hostname.includes("netanime") ||
      location.hostname.includes("moviehdthai") ||
      location.hostname.includes("cobephim")
    );
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

          const _h = location.hostname || "";
          // Chỉ chạy trên domain thực sự có NextAuth server session middleware và có /baseapi/api/v1/auth/register (NetAnime & RoPhim)
          // Tuyệt đối không chạy trên cobephim.cfd (endpoint 404) hoặc moviehdthai.com (credentials login 401)
          const isEligibleHost = _h.includes("netanime") || (_h.includes("rophim") && !_h.includes("moviehdthai") && !_h.includes("cobephim"));
          if (!isEligibleHost && !force) return;

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
          const credKey = (typeof location !== "undefined" && location.hostname) ? (
            location.hostname.includes("netanime") ? "NETANIME_CREDENTIALS" :
            location.hostname.includes("moviehdthai") ? "MOVIEHDTHAI_CREDENTIALS" :
            location.hostname.includes("cobephim") ? "COBEPHIM_CREDENTIALS" : "RO_CREDENTIALS"
          ) : "RO_CREDENTIALS";
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

            const regRes = await nativeFetch("/baseapi/api/v1/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json", "X-Cinema-Pro-Internal": "1" },
              body: JSON.stringify(newCreds),
              credentials: "include"
            }).catch(() => null);

            // BẮT BUỘC: Nếu đăng ký thất bại (404/500), dừng ngay lập tức, không gọi credentials login!
            if (!regRes || !regRes.ok) {
              return null;
            }

            try {
              window.localStorage.setItem(credKey, JSON.stringify(newCreds));
            } catch (e) {}

            return newCreds;
          }

          if (!creds || !creds.email || !creds.password || force) {
            creds = await createAndRegister();
          }
          if (!creds) return;

          // 3. Lấy CSRF token từ NextAuth (real server)
          const csrfRes = await nativeFetch("/api/auth/csrf", {
            headers: { "X-Cinema-Pro-Internal": "1" },
            credentials: "include"
          }).catch(() => null);
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

          const loginRes = await nativeFetch("/api/auth/callback/credentials", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Cinema-Pro-Internal": "1"
            },
            body: postParams,
            credentials: "include"
          }).catch(() => null);

          // Nếu login thất bại, dừng lại ngay, không thử lại để tránh 401 spam
          if (!loginRes || !loginRes.ok) {
            return;
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
        } catch (e) {}
      }

      // Kích hoạt khi người dùng click vào nút tài khoản / profile
      if (typeof document !== "undefined") {
        document.addEventListener("click", function (e) {
          const a = e.target && e.target.closest && e.target.closest("a[href*='/user/profile'], a[href*='/user/playlist'], a[href*='/user/thong-bao'], [data-user-nav]");
          if (a) {
            ensureRophimServerSession(false);
          }
        }, true);
      }

      // Trên NetAnime & RoPhim: tự động kích hoạt 1 lần nếu chưa có session cookie
      const _curH = (typeof location !== "undefined" && location.hostname) ? location.hostname : "";
      if (_curH.includes("netanime") || (_curH.includes("rophim") && !_curH.includes("moviehdthai") && !_curH.includes("cobephim"))) {
        if (typeof window !== "undefined" && window.sessionStorage && window.sessionStorage.getItem("RO_SERVER_SESSION_READY") !== "1") {
          setTimeout(() => { ensureRophimServerSession(); }, 150);
        }
      }

      // 5. Phục hồi giao diện nếu rơi vào trang raw RSC text/x-component (?callbackUrl=...)
      try {
        if (typeof window !== "undefined" && window.location && window.location.search && window.location.search.includes("callbackUrl")) {
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, "", window.location.pathname || "/");
          }
          const checkRawRsc = () => {
            if (document.body && document.body.innerText && (document.body.innerText.startsWith('1:"$Sreact.fragment"') || document.body.innerText.includes('ClientSegmentRoot'))) {
              window.location.replace(window.location.pathname || "/");
            }
          };
          checkRawRsc();
          document.addEventListener("DOMContentLoaded", checkRawRsc);
        }
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
          displayName: "VIP Cinema Pro",
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

            // 1. Header Access Account Button -> VIP Member
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
                fastBtn.innerHTML = "ĐĂNG NHẬP VIP 1-CLICK (KHÔNG CẦN PASS)";
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
                coinEl.innerHTML = '<span style="color:#51f085;font-weight:700;">999,999,999 USDT (VIP Vĩnh Viễn 2099)</span>';
              }
            });

            // VIP Badge in profile
            if (pInfo && !pInfo.querySelector(".vip-badge-pro")) {
              const badge = document.createElement("div");
              badge.className = "vip-badge-pro";
              badge.style.cssText = "display:inline-block;padding:6px 14px;border-radius:6px;background:linear-gradient(135deg, #10b981 0%, #059669 100%);color:#fff;font-weight:700;font-size:13px;margin:8px 0;box-shadow:0 2px 10px rgba(16,185,129,0.3);";
              badge.innerHTML = "VIP MEMBER VĨNH VIỄN 2099";
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
              pVer.innerHTML = '<span style="color:#51f085;font-weight:bold;">Tài Khoản VIP Trọn Đời (Hạn dùng: 18/07/2099)</span>';
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
      location.hostname.includes("cctvsignal") ||
      location.hostname.includes("cctv")
    );
    if (isChuoiChienHost) {
      try {
        const VIP_CC_USER = getChuoiChienVipUser();

        // 1. Chuẩn hóa Token cho Chat WebSocket & Nuxt Auth:
        // TUYỆT ĐỐI KHÔNG gán chuỗi giả vào auth._token.local vì backend WebSocket & Chat của Chuối Chiên
        // sẽ từ chối token giả và chặn quyền gửi tin nhắn (bị hạ cấp xuống anonymous).
        if (typeof window !== "undefined" && window.localStorage) {
          try {
            const curToken = window.localStorage.getItem("auth._token.local");
            if (curToken && curToken.includes("cinema-pro-vip")) {
              window.localStorage.removeItem("auth._token.local");
              window.localStorage.removeItem("auth._refresh_token.local");
            }
            window.localStorage.setItem("auth.user", JSON.stringify(VIP_CC_USER));
          } catch (e) {}

          // Tự động đảm bảo có real session token từ /guest-token để WebSocket Chat Centrifugo & /chat/send hoạt động 100%
          async function ensureChuoiChienChatToken() {
            try {
              const nativeFetch = _origFetchNative || (typeof origFetchMain === "function" ? origFetchMain : window.fetch);
              if (!nativeFetch) return;

              let realToken = window.localStorage.getItem("guestAccessToken");
              if (!realToken || realToken.includes("cinema-pro-vip")) {
                const res = await nativeFetch("https://api.chuoichientv.net/v1/guest-token", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", "X-Cinema-Pro-Internal": "1" },
                  body: JSON.stringify({ guestName: "VIP Cinema Pro" })
                });
                if (res && res.ok) {
                  const d = await res.json().catch(() => ({}));
                  realToken = d?.data?.token || d?.data?.guestToken || d?.token;
                  if (realToken && !realToken.includes("cinema-pro-vip")) {
                    window.localStorage.setItem("guestAccessToken", realToken);
                    window.localStorage.setItem("guestName", "VIP Cinema Pro");
                  }
                }
              }
            } catch (e) {}
          }
          ensureChuoiChienChatToken();
        }

        // 2. DOM Patcher & Modal VIP 1-Click Auto-Login Bypass
        function patchChuoiChienAuthDom() {
          try {
            if (typeof document === "undefined") return;

            // Clean boxchat sticky ad & login prompt if present
            const boxChatSticky = document.querySelector(".boxchat-sticky-ad");
            if (boxChatSticky) boxChatSticky.remove();
            const loginPrompt = document.querySelector(".login-prompt");
            if (loginPrompt) loginPrompt.style.display = "none";

            // Header VIP Styling: Replace guest login button if still rendered
            const navLoginBtn = document.querySelector(".nav-login-btn");
            const navActions = document.querySelector(".nav-actions");
            if (navLoginBtn && navActions && !navActions.querySelector(".nav-user")) {
              const userDiv = document.createElement("div");
              userDiv.className = "nav-user";
              userDiv.innerHTML = '<button type="button" class="nav-user-trigger" aria-label="Tài khoản" style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(81,240,133,0.3);border-radius:20px;padding:4px 12px;cursor:pointer;">' +
                '<span class="nav-display-name role-admin" style="color:#51f085;font-weight:700;font-size:13px;">VIP Cinema Pro</span>' +
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
                fastBtn.innerHTML = "ĐĂNG NHẬP VIP 1-CLICK (KHÔNG CẦN PASS)";
                fastBtn.onclick = function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  try {
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
        function injectCcStyle() {
          try {
            if (typeof document === "undefined") return;
            const root = document.head || document.documentElement;
            if (!root) return;
            let s = document.getElementById("cc-nuke-player-ads");
            if (!s) {
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
                "html body img[alt*='FB88'], html body img[alt*='net-88'], html body img[alt*='banner_player'], html body img[alt*='banner-player'], " +
                "html body .player-logo-wrapper, html body [class*='player-logo'], html body .boxchat-sticky-ad, html body [class*='boxchat-sticky-ad'], html body .login-prompt { " +
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
              root.appendChild(s);
            } else if (s && document.head && s.parentNode !== document.head) {
              document.head.appendChild(s);
            }
          } catch (e) {}
        }
        injectCcStyle();
        if (typeof document !== "undefined") {
          document.addEventListener("DOMContentLoaded", injectCcStyle);
          window.addEventListener("load", injectCcStyle);
        }

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
