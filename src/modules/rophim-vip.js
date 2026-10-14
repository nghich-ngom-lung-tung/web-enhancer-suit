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
    "/users/profile",
    "/users/vip-packages",
    "/vip-packages",
    "/payments/orders",
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
      role: "admin",
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
    if (isRophimTarget(url)) {
      if (url.includes("/tcoin/me")) {
        const dummyData = {
          status: 200,
          success: true,
          thungBalance: COIN_BALANCE,
          balance: COIN_BALANCE,
          coin_balance: COIN_BALANCE,
          total: COIN_BALANCE
        };
        return new Response(JSON.stringify(dummyData), {
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" }
        });
      }
      if (url.includes("/notifications/unread-counts")) {
        const dummyData = {
          status: 200,
          success: true,
          data: {
            notificationsMovie: [],
            notificationsOther: [],
            unreadCountMovie: 0,
            unreadCountOther: 0
          }
        };
        return new Response(JSON.stringify(dummyData), {
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" }
        });
      }
      if (url.includes("/auth/profile") || url.includes("/auth/session/check") || url.includes("/auth/login") || url.includes("/auth/register") || url.includes("/users/profile")) {
        const user = getMotchillVipUser();
        const dummyData = {
          status: true,
          success: true,
          code: 200,
          msg: "Thành công",
          data: user,
          result: user
        };
        return new Response(JSON.stringify(dummyData), {
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" }
        });
      }
      if (url.includes("/users/vip-packages") || url.includes("/vip-packages")) {
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
        const dummyData = {
          status: true,
          success: true,
          code: 200,
          data: pkgData,
          result: pkgData
        };
        return new Response(JSON.stringify(dummyData), {
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" }
        });
      }
      if (url.includes("/payments/orders")) {
        const dummyData = {
          status: true,
          success: true,
          code: 200,
          msg: "Thành công",
          result: {
            items: [],
            pagination: { page: 1, limit: 8, total: 0, totalPages: 1 }
          }
        };
        return new Response(JSON.stringify(dummyData), {
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    const res = await resPromise;
    try {
      const ct = res.headers.get("content-type");
      if (ct && ct.includes("application/json")) {
        const clone = res.clone();
        clone.json().then(data => extractStreamFromObject(data)).catch(() => {});
      }
    } catch (e) {}

    if (!isRophimTarget(url)) return res;
    try {
      const ct = res.headers.get("content-type");
      if (!ct || !ct.includes("application/json")) return res;
      const clone = res.clone();
      const data = await clone.json();
      extractStreamFromObject(data);
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
      if (isRophimTarget(url)) {
        let dummyData = null;
        if (url.includes("/tcoin/me")) {
          dummyData = { status: 200, success: true, thungBalance: COIN_BALANCE, balance: COIN_BALANCE, coin_balance: COIN_BALANCE, total: COIN_BALANCE };
        } else if (url.includes("/notifications/unread-counts")) {
          dummyData = { status: 200, success: true, data: { notificationsMovie: [], notificationsOther: [], unreadCountMovie: 0, unreadCountOther: 0 } };
        } else if (url.includes("/auth/profile") || url.includes("/auth/session/check") || url.includes("/auth/login") || url.includes("/auth/register") || url.includes("/users/profile")) {
          const user = getMotchillVipUser();
          dummyData = { status: true, success: true, code: 200, msg: "Thành công", data: user, result: user };
        } else if (url.includes("/users/vip-packages") || url.includes("/vip-packages")) {
          const pkgData = {
            current_vip: { package_id: 999, package_name: "VIP Vĩnh Viễn 2099", is_active: true, expires_at: VIP_EXPIRY_DATE.toISOString(), end_at: VIP_EXPIRY_DATE.toISOString() },
            packages: [{ id: 999, name: "VIP Vĩnh Viễn 2099", duration_days: 36500, price: 0, description: "Gói VIP Không Giới Hạn - Cinema Pro" }]
          };
          dummyData = { status: true, success: true, code: 200, data: pkgData, result: pkgData };
        } else if (url.includes("/payments/orders")) {
          dummyData = { status: true, success: true, code: 200, result: { items: [], pagination: { page: 1, limit: 8, total: 0, totalPages: 1 } } };
        }
        if (dummyData) {
          const str = JSON.stringify(dummyData);
          try {
            Object.defineProperty(xhr, "status", { value: 200, configurable: true, writable: true });
            Object.defineProperty(xhr, "statusText", { value: "OK", configurable: true, writable: true });
            Object.defineProperty(xhr, "responseText", { value: str, configurable: true, writable: true });
            Object.defineProperty(xhr, "response", { value: str, configurable: true, writable: true });
          } catch (e) {}
          return;
        }
      }
      const ct = xhr.getResponseHeader && xhr.getResponseHeader("content-type");
      if (ct && ct.includes("application/json")) {
        try {
          const data = JSON.parse(xhr.responseText);
          extractStreamFromObject(data);
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
