/**
 * Cinema Pro Suite - Rophim & Motchill VIP 2099 & Unlimited Coins Patcher Module
 */
module.exports = `
  // ─── LAYER 5: VIP 2099 & T-COIN RESPONSE PATCHER (ROPHIM & MOTCHILL API) ───
  const VIP_EXPIRY_DATE = new Date(2099, 6, 18, 0, 0, 0);
  const VIP_EXPIRY_TIMESTAMP = Math.floor(VIP_EXPIRY_DATE.getTime() / 1000);
  const COIN_BALANCE = 999999999;
  const ROPHIM_KEYWORDS = [
    "/baseapi/api/v1/tcoin/me",
    "/baseapi/api/v1/user/",
    "/baseapi/api/v1/vip/",
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
    "/users/vip-packages",
    "/vip-packages",
    "/payments/orders",
    "/watch-progress",
    "/favorites",
    "/favourite",
    "/refresh-token",
    "/api/v1/ads",
    "api.rophim1.vip",
    "rophimapi.net",
    "phimmotchill.online"
  ];

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
      avatar: base.avatar || "https://rophim1.vip/apple-icon.png",
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

  function getRophimMockJsonString(url) {
    if (!url || typeof url !== "string") return null;

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

    // 2. NextAuth Session
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

    // 7. Watch progress / History (chặn 401 gây reload)
    if (url.includes("/watch-progress")) {
      return JSON.stringify({
        status: true,
        success: true,
        code: 200,
        data: { items: [], pagination: { page: 1, limit: 12, total: 0, totalPages: 1 } },
        result: { items: [], pagination: { page: 1, limit: 12, total: 0, totalPages: 1 } }
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

    // 10. TCoin balance (Rophim)
    if (url.includes("/tcoin/me")) {
      return JSON.stringify({
        status: 200,
        success: true,
        thungBalance: COIN_BALANCE,
        balance: COIN_BALANCE,
        coin_balance: COIN_BALANCE,
        total: COIN_BALANCE
      });
    }

    // 11. Notifications unread counts
    if (url.includes("/notifications/unread-counts") || url.includes("/notifications")) {
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

    return null;
  }

  function getRophimMockResponse(url) {
    const jsonStr = getRophimMockJsonString(url);
    if (!jsonStr) return null;
    return new Response(jsonStr, {
      status: 200,
      statusText: "OK",
      headers: { "Content-Type": "application/json" }
    });
  }

  function getRophimMockXhr(url) {
    return getRophimMockJsonString(url);
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
    if (url && url.includes("/notifications/unread-counts")) {
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
    if (url && url.includes("/tcoin/me")) {
      data.thungBalance = COIN_BALANCE;
      data.balance = COIN_BALANCE;
      data.coin_balance = COIN_BALANCE;
      data.total = COIN_BALANCE;
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
      data.expires = VIP_EXPIRY_DATE.toISOString();
      return data;
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

  async function handleRophimFetchResponse(resPromise, url) {
    if (typeof getRophimMockResponse === "function") {
      const mock = getRophimMockResponse(url);
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
      if (typeof getRophimMockXhr === "function") {
        const mockStr = getRophimMockXhr(url);
        if (mockStr) {
          try {
            Object.defineProperty(xhr, "status", { value: 200, configurable: true, writable: true });
            Object.defineProperty(xhr, "statusText", { value: "OK", configurable: true, writable: true });
            Object.defineProperty(xhr, "responseText", { value: mockStr, configurable: true, writable: true });
            Object.defineProperty(xhr, "response", { value: mockStr, configurable: true, writable: true });
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
            Object.defineProperty(xhr, "status", { value: 200, configurable: true, writable: true });
            Object.defineProperty(xhr, "responseText", { value: str, configurable: true, writable: true });
            Object.defineProperty(xhr, "response", { value: str, configurable: true, writable: true });
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

  // Tự động kích hoạt auth_hint = 1 trên Motchill & bảo vệ không bị logout
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
  } catch (e) {}

  // Tự động gỡ bỏ tcoin-disabled và đảm bảo số dư TCoin 999,999,999 hiển thị rực rỡ
  setInterval(() => {
    try {
      const disabledMenu = document.querySelector(".tcoin-disabled");
      if (disabledMenu) disabledMenu.classList.remove("tcoin-disabled");
      const coinEl = document.querySelector(".tcoin-menu-content strong");
      if (coinEl && (!coinEl.textContent || coinEl.textContent === "0")) {
        coinEl.textContent = "999,999,999";
      }
      if (location.hostname && (location.hostname.includes("motchill") || location.hostname.includes("phimmotchill"))) {
        document.documentElement.style.setProperty("--color-primary", "#51f085");
        document.documentElement.style.setProperty("--primary-color", "#51f085");
        document.documentElement.style.setProperty("--primary-text", "#51f085");
      }
    } catch (e) {}
  }, 1000);
`;
