/**
 * Cinema Pro Suite - MotChill VIP 2099 & Unlimited Coins Module
 * Dedicated VIP handler for motchill.online / phimmotchill.online
 */

module.exports = `
  // ─── MOTCHILL VIP 2099 & COIN BACKEND ENGINE ───
  function getMotchillVipUser(curUser) {
    let base = curUser || {};
    if (typeof getRealProvisionedUser === "function") {
      const realUser = getRealProvisionedUser();
      if (realUser && realUser.id) {
        base = { ...realUser, ...base, id: realUser.id, access_token: realUser.access_token || base.access_token };
      }
    }
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

  // Tự động kích hoạt auth_hint = 1 trên MotChill & bảo vệ removeItem
  try {
    const isMotchillHost = typeof location !== "undefined" && location.hostname && (
      location.hostname.includes("motchill") ||
      location.hostname.includes("phimmotchill")
    );
    if (isMotchillHost || (typeof window !== "undefined" && window.localStorage)) {
      if (typeof window !== "undefined" && window.localStorage && window.localStorage.getItem("auth_hint") !== "1") {
        window.localStorage.setItem("auth_hint", "1");
      }
      if (typeof window !== "undefined" && window.Storage && window.Storage.prototype) {
        const origRemove = window.Storage.prototype.removeItem;
        window.Storage.prototype.removeItem = function (key) {
          if (key === "auth_hint") return;
          return origRemove.apply(this, arguments);
        };
      }
    }

    if (isMotchillHost && typeof document !== "undefined" && document.documentElement) {
      document.documentElement.style.setProperty("--color-primary", "#51f085");
      document.documentElement.style.setProperty("--primary-color", "#51f085");
      document.documentElement.style.setProperty("--primary-text", "#51f085");
    }
  } catch (e) {}

  function handleMotchillMock(url, init) {
    if (!url || typeof url !== "string") return null;
    if (url.includes("chuoichien") || url.includes("cctvsignal")) return null;
    const isMotchillHost = (typeof location !== "undefined" && location.hostname && (location.hostname.includes("motchill") || location.hostname.includes("phimmotchill"))) || url.includes("motchill") || url.includes("phimmotchill");

    // 1. Session Check (Bắt buộc valid: true để không gọi o() trigger reload)
    if (url.includes("/auth/session/check")) {
      return JSON.stringify({
        valid: true,
        expires: VIP_EXPIRY_DATE.toISOString()
      });
    }

    // 2. User Profile / Login / Register
    if (url.includes("/auth/profile") || url.includes("/users/profile") || url.includes("/api/v1/auth/profile") || (isMotchillHost && (url.includes("/api/profile") || url.includes("/api/v1/profile")))) {
      const u = getMotchillVipUser();
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        message: "OK",
        data: { user: u },
        result: { user: u }
      });
    }

    // 3. Logout bypass
    if (url.includes("/auth/logout")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        message: "Logged out"
      });
    }

    // 4. Silent Refresh Token
    if (url.includes("/refresh-token")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        result: {
          access_token: "mock_refreshed_access_token_vip_2099",
          token: "mock_refreshed_access_token_vip_2099",
          expires_in: 315360000
        }
      });
    }

    // 5. VIP Packages & Status
    if (url.includes("/vip-packages") || url.includes("/users/vip-packages")) {
      const vipPkg = {
        package_id: 999,
        package_name: "VIP Vĩnh Viễn 2099",
        is_active: true,
        expires_at: VIP_EXPIRY_DATE.toISOString(),
        end_at: VIP_EXPIRY_DATE.toISOString()
      };
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        data: {
          current_vip: vipPkg,
          packages: [{ id: 999, name: "VIP Vĩnh Viễn 2099", price: 0, days: 99999 }]
        },
        result: {
          current_vip: vipPkg,
          packages: [{ id: 999, name: "VIP Vĩnh Viễn 2099", price: 0, days: 99999 }]
        }
      });
    }

    // 6. User Profile Update
    if (url.includes("/users/update-user")) {
      const u = getMotchillVipUser();
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        message: "Cập nhật thành công",
        result: u,
        data: u
      });
    }

    // 7. Payment Orders
    if (url.includes("/orders") || url.includes("/payments/orders")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        data: [],
        result: []
      });
    }

    return null;
  }
`;
