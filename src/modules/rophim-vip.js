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
    "/baseapi/api/v1/tcoin/me",
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
    "/api/auth/providers",
    "/api/auth/csrf",
    "/api/auth/callback",
    "/api/auth/",
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

    // 2. NextAuth Providers (NextAuth signIn("credentials") checks providers)
    if (url.includes("/api/auth/providers")) {
      return JSON.stringify({
        credentials: {
          id: "credentials",
          name: "Credentials",
          type: "credentials",
          signinUrl: "https://rophim1.vip/api/auth/signin/credentials",
          callbackUrl: "https://rophim1.vip/api/auth/callback/credentials"
        }
      });
    }

    // 2.1 NextAuth CSRF Token
    if (url.includes("/api/auth/csrf")) {
      return JSON.stringify({
        csrfToken: "cinema-pro-csrf-token"
      });
    }

    // 2.2 NextAuth Callback Credentials (Login submission handler)
    if (url.includes("/api/auth/callback/credentials") || url.includes("/api/auth/callback")) {
      return JSON.stringify({
        url: typeof location !== "undefined" ? location.href : "https://rophim1.vip/"
      });
    }

    // 2.3 NextAuth Session
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

    // 10. TCoin balance (Rophim)
    if (url.includes("/tcoin/me")) {
      return JSON.stringify({
        status: 200,
        success: true,
        thungBalance: COIN_BALANCE,
        balance: COIN_BALANCE,
        coin_balance: COIN_BALANCE,
        total: COIN_BALANCE,
        data: {
          thungBalance: COIN_BALANCE,
          balance: COIN_BALANCE,
          coin_balance: COIN_BALANCE,
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
    if (url && url.includes("/tcoin/me")) {
      data.thungBalance = COIN_BALANCE;
      data.balance = COIN_BALANCE;
      data.coin_balance = COIN_BALANCE;
      data.total = COIN_BALANCE;
      if (data.data && typeof data.data === "object") {
        data.data.thungBalance = COIN_BALANCE;
        data.data.balance = COIN_BALANCE;
        data.data.coin_balance = COIN_BALANCE;
        data.data.total = COIN_BALANCE;
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
            Object.defineProperty(xhr, "readyState", { value: 4, configurable: true, writable: true });
            Object.defineProperty(xhr, "status", { value: 200, configurable: true, writable: true });
            Object.defineProperty(xhr, "statusText", { value: "OK", configurable: true, writable: true });
            Object.defineProperty(xhr, "responseText", { value: mockStr, configurable: true, writable: true });
            Object.defineProperty(xhr, "response", { value: mockStr, configurable: true, writable: true });
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

    const isRophimHost = location.hostname && (location.hostname.includes("rophim") || location.hostname.includes("ro-phim"));
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

      // RoPhim Real Session Auto-Provisioner:
      // Tự động đăng ký & đăng nhập qua real NextAuth backend để trình duyệt lưu cookie __Secure-next-auth.session-token
      // Nhờ đó server middleware không bị 307 redirect khi người dùng mở /user/profile, /user/playlist, /user/thong-bao
      setTimeout(async function ensureRophimServerSession() {
        try {
          const nativeFetch = _origFetchNative || (typeof origFetchMain === "function" ? origFetchMain : window.fetch);
          if (!nativeFetch) return;

          // 1. Kiểm tra xem server đã có session cookie hợp lệ chưa
          try {
            const chk = await nativeFetch("/api/auth/session");
            if (chk && chk.ok) {
              const d = await chk.json().catch(() => ({}));
              if (d && d.user && d.user.id) {
                return;
              }
            }
          } catch (e) {}

          // 2. Chuẩn bị thông tin tài khoản VIP
          let creds = null;
          try {
            const saved = window.localStorage.getItem("RO_CREDENTIALS");
            if (saved) creds = JSON.parse(saved);
          } catch (e) {}

          if (!creds || !creds.email || !creds.password) {
            const rand = Math.floor(Math.random() * 900000) + 100000;
            creds = {
              name: "VIP Cinema Pro",
              email: "vip_" + rand + "@gmail.com",
              password: "CinemaPro_" + rand + "!"
            };
            try {
              window.localStorage.setItem("RO_CREDENTIALS", JSON.stringify(creds));
            } catch (e) {}

            await nativeFetch("/baseapi/api/v1/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(creds)
            }).catch(() => {});
          }

          // 3. Lấy CSRF token từ NextAuth
          const csrfRes = await nativeFetch("/api/auth/csrf");
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
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: postParams
          });

          if (loginRes && loginRes.ok) {
            console.log("[Cinema Pro] RoPhim server session cookie (__Secure-next-auth.session-token) established!");
            try {
              window.localStorage.setItem("nextauth.message", JSON.stringify({
                event: "session",
                data: { trigger: "getSession" },
                timestamp: Math.floor(Date.now() / 1000)
              }));
            } catch (e) {}
          }
        } catch (e) {}
      }, 0);
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
