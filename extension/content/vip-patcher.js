/**
 * Cinema Pro Suite - VIP 2099 & Unlimited Coins Backend Patcher
 */
(() => {
  "use strict";

  // ─── REACT DOM MUTATION DEFENDER (PREVENT NOTFOUNDERROR CRASH) ───
  try {
    if (typeof Node !== "undefined" && Node.prototype && !Node.prototype._cpro_guarded) {
      Node.prototype._cpro_guarded = true;
      const origRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function (child) {
        try {
          return origRemoveChild.call(this, child);
        } catch (err) {
          if (err && (err.name === "NotFoundError" || (err.message && err.message.includes("not a child")))) {
            try {
              if (child && child.parentNode && typeof child.parentNode.removeChild === "function") {
                return child.parentNode.removeChild(child);
              }
            } catch (e) {}
            return child;
          }
          throw err;
        }
      };

      const origInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function (newNode, refNode) {
        try {
          return origInsertBefore.call(this, newNode, refNode);
        } catch (err) {
          if (err && (err.name === "NotFoundError" || (err.message && err.message.includes("not a child")))) {
            return this.appendChild(newNode);
          }
          throw err;
        }
      };
    }
  } catch (e) {}

  // ─── LAYER 5: VIP 2099 & COIN RESPONSE PATCHER (MODULAR ARCHITECTURE) ───
  const _origFetchNative = (typeof window !== "undefined" && window.fetch) ? window.fetch.bind(window) : null;
  const VIP_EXPIRY_DATE = new Date(2099, 6, 18, 0, 0, 0);
  const VIP_EXPIRY_TIMESTAMP = Math.floor(VIP_EXPIRY_DATE.getTime() / 1000);
  const COIN_BALANCE = 999999999;


  // ─── FILM4K VIP 2099 & SETTINGS ENGINE ───
  function getFilm4kVipUser() {
    return {
      id: "6ac449438b0c9ca6944ad999",
      name: "VIP Cinema Pro",
      username: "vip_cinemapro",
      email: "sfrank1e@film4k.vip",
      image: "/images/avatars/10.jpg",
      avatar: "/images/avatars/10.jpg",
      avatar_url: "/images/avatars/10.jpg",
      phone: "0999999999",
      admin: true,
      isAdmin: true,
      is_admin: true,
      role: "vip",
      roles: ["admin", "vip"],
      plan: "VIP 2099",
      vip: true,
      is_vip: true,
      createdAt: "2026-01-01T00:00:00.000Z",
      created_at: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-10-16T00:00:00.000Z",
      updated_at: "2026-10-16T00:00:00.000Z",
      devices: [],
      sessions: [],
      subscriptions: [
        {
          id: "sub_vip_2099",
          name: "VIP 2099",
          status: "active",
          plan: "VIP 2099",
          expires_at: "2099-12-31T23:59:59.000Z",
          created_at: "2026-01-01T00:00:00.000Z"
        }
      ],
      payments: [],
      invoices: [],
      history: []
    };
  }

  const film4kSettings = {
    audioLang: "",
    subLang: "vi",
    subsEnabled: true,
    autoplay: true,
    capToPlayerSize: false,
    subSize: 100,
    subColor: "#ffffff",
    subBg: "",
    subDelay: 0,
    siteLocale: "vi",
    adultEnabled: false,
    historyPaused: false,
    hdrToneMap: 40,
    audio: "default",
    subtitle: "vi",
    sub_size: "medium",
    sub_bg: false,
    auto_play: true,
    auto_next: true,
    auto_skip_intro: true
  };

  // Pre-seed Film4k settings in localStorage (Bảo vệ React Or() khỏi crash subColor.slice)
  try {
    if (typeof window !== "undefined" && window.localStorage && window.location && window.location.hostname && (window.location.hostname.includes("film4k") || window.location.hostname.includes("film4knet"))) {
      const raw = window.localStorage.getItem("seggg:settings");
      let cur = {};
      try { cur = JSON.parse(raw || "{}"); } catch (e) {}
      if (!cur.subColor || typeof cur.subColor !== "string") {
        window.localStorage.setItem("seggg:settings", JSON.stringify({
          ...film4kSettings,
          ...cur
        }));
      }
    }
  } catch (e) {}

  // DOM Patcher & Route Guard cho Film4k
  try {
    const isFilm4kHost = typeof location !== "undefined" && location.hostname && (
      location.hostname.includes("film4k") ||
      location.hostname.includes("film4knet")
    );
    if (isFilm4kHost) {
      if (typeof location !== "undefined" && (location.pathname === "/login" || location.pathname === "/dang-nhap")) {
        if (typeof location.replace === "function") {
          location.replace("/");
        }
      }
      function patchFilm4kAuthDom() {
        try {
          if (typeof document === "undefined") return;
          const signinBtns = document.querySelectorAll(".side-signin, a[href='/login'].side-signin, .side-pair");
          signinBtns.forEach(btn => {
            btn.style.setProperty("display", "none", "important");
          });
        } catch (e) {}
      }
      if (typeof document !== "undefined") {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", patchFilm4kAuthDom);
        } else {
          patchFilm4kAuthDom();
        }
        setInterval(patchFilm4kAuthDom, 300);
      }
    }
  } catch (e) {}

  function handleFilm4kMock(url, init) {
    if (!url || typeof url !== "string") return null;
    const isFilm4kHost = (typeof location !== "undefined" && location.hostname && (location.hostname.includes("film4k") || location.hostname.includes("film4knet"))) || url.includes("film4k");
    if (!isFilm4kHost) return null;

    // 1. Auth Me
    if (url.includes("/api/auth/me") || (url.includes("/auth/me") && !url.includes("/auth/me/")) || (isFilm4kHost && (url.includes("/api/me") || url.includes("/api/user")))) {
      const u = getFilm4kVipUser();
      return JSON.stringify({
        ...u,
        user: u,
        account: u,
        data: u,
        result: u
      });
    }

    // 2. Auth Account
    if (url.includes("/api/auth/account") || url.includes("/api/account") || (url.includes("/auth/account") && !url.includes("/auth/account/")) || (isFilm4kHost && url.includes("/account"))) {
      const u = getFilm4kVipUser();
      return JSON.stringify({
        ...u,
        user: u,
        account: u,
        data: u,
        result: u,
        methods: {
          password: true,
          telegram: null,
          google: null,
          facebook: null
        },
        devices: [],
        sessions: [],
        subscriptions: u.subscriptions,
        payments: [],
        invoices: [],
        history: [],
        createdAt: u.createdAt,
        created_at: u.createdAt,
        updatedAt: u.updatedAt,
        updated_at: u.updatedAt
      });
    }

    // 3. Devices & Sessions
    if (url.includes("/api/devices") || url.includes("/devices") || url.includes("/api/auth/devices")) {
      return JSON.stringify({ devices: [], items: [], list: [], data: [], ok: true, status: 200 });
    }

    if (url.includes("/api/sessions") || url.includes("/sessions") || url.includes("/api/auth/sessions")) {
      return JSON.stringify({ sessions: [], items: [], list: [], data: [], ok: true, status: 200 });
    }

    // 4. Subscriptions
    if (url.includes("/api/subscriptions") || url.includes("/subscriptions") || url.includes("/api/subscription")) {
      const u = getFilm4kVipUser();
      return JSON.stringify({
        subscriptions: u.subscriptions,
        items: u.subscriptions,
        list: u.subscriptions,
        data: u.subscriptions,
        ok: true,
        status: 200
      });
    }

    // 5. Admin Endpoints
    if (url.includes("admin/tv") || (isFilm4kHost && url.includes("/tv") && url.includes("admin"))) {
      return JSON.stringify({
        ok: true,
        status: 200,
        channels: []
      });
    }

    if (url.includes("admin/manifest") || (isFilm4kHost && url.includes("manifest") && url.includes("admin"))) {
      return JSON.stringify({
        ok: true,
        status: 200,
        list: [],
        current: null
      });
    }

    if (url.includes("admin/movie/") || (isFilm4kHost && url.includes("/movie/") && url.includes("admin"))) {
      return JSON.stringify({
        ok: true,
        status: 200,
        movie: {
          slug: "vip-cinema-pro",
          title: { en: "VIP Cinema Pro", vi: "VIP Cinema Pro" },
          year: 2026,
          overview: { en: "VIP Cinema Pro Movie", vi: "Phim VIP Cinema Pro" },
          poster: { en: "/images/avatars/10.jpg", vi: "/images/avatars/10.jpg" },
          genres: { en: ["Action"], vi: ["Hành Động"] },
          okruId: "",
          tmdbId: 0,
          mediaType: "movie"
        }
      });
    }

    if (url.includes("admin/tmdb")) {
      return JSON.stringify({
        ok: true,
        status: 200,
        title: { en: "VIP Movie", vi: "Phim VIP" },
        overview: { en: "VIP Overview", vi: "Tóm tắt VIP" },
        poster: { en: "/images/avatars/10.jpg", vi: "/images/avatars/10.jpg" },
        genres: { en: ["Action"], vi: ["Hành Động"] },
        year: 2026,
        results: []
      });
    }

    if (url.includes("/api/admin") || url.includes("api/admin") || url.includes("admin/movies") || (isFilm4kHost && url.includes("/admin"))) {
      return JSON.stringify({
        ok: true,
        status: 200,
        statusCode: 200,
        code: 200,
        list: [],
        movies: [],
        items: [],
        data: [],
        result: [],
        total: 0,
        page: 1,
        totalPages: 1,
        locale: "vi",
        siteDefaults: film4kSettings,
        featured: []
      });
    }

    // 6. Favourites
    if (url.includes("/favourites/toggle") || url.includes("/favorites/toggle")) {
      return JSON.stringify({
        saved: true,
        signedIn: true
      });
    }

    if (url.includes("/api/favourites") || (isFilm4kHost && (url.includes("/favourites") || (url.includes("/favorites") && !url.includes("baseapi"))))) {
      return JSON.stringify({
        list: [],
        locale: "vi",
        signedIn: true
      });
    }

    // 7. Settings
    if (url.includes("/api/settings") || (isFilm4kHost && url.includes("/settings") && !url.includes("/users/settings") && !url.includes("settings."))) {
      return JSON.stringify({
        ok: true,
        status: 200,
        user: getFilm4kVipUser(),
        signedIn: true,
        settings: film4kSettings,
        data: film4kSettings
      });
    }

    // 8. Site WebManifest
    if (url.includes("site.webmanifest")) {
      return JSON.stringify({
        name: "Film4k VIP",
        short_name: "Film4k",
        start_url: "/",
        display: "standalone",
        background_color: "#0c0d12",
        theme_color: "#5b6cff",
        icons: []
      });
    }

    // 9. History & Progress
    if (url.includes("/api/history") || (isFilm4kHost && url.includes("/history") && !url.includes("/histories") && !url.includes("/lich-su") && !url.includes("history."))) {
      return JSON.stringify({
        movies: [],
        progress: [],
        signedIn: true,
        locale: "vi"
      });
    }

    if (url.includes("/api/progress") || (isFilm4kHost && url.includes("/api/view"))) {
      return JSON.stringify({
        ok: true,
        status: 200,
        signedIn: true
      });
    }

    // 10. Device pairing
    if (isFilm4kHost && (url.includes("/auth/device/code") || url.includes("/api/auth/device/code"))) {
      return JSON.stringify({
        code: "VIP-2099",
        expires: 9999999999
      });
    }

    if (isFilm4kHost && (url.includes("/auth/device/poll") || url.includes("/api/auth/device/poll"))) {
      return JSON.stringify({
        status: "claimed",
        user: getFilm4kVipUser()
      });
    }

    if (isFilm4kHost && (url.includes("/auth/signout") || url.includes("/api/auth/signout"))) {
      return JSON.stringify({
        ok: true
      });
    }

    if (isFilm4kHost && (url.includes("/auth/signin") || url.includes("/auth/signup") || url.includes("/api/auth/signin") || url.includes("/api/auth/signup"))) {
      return JSON.stringify({
        user: getFilm4kVipUser(),
        token: "mock_jwt_token_vip_2099",
        signedIn: true
      });
    }

    if (isFilm4kHost && url.includes("/comments") && !url.includes("/reactions")) {
      return JSON.stringify({
        comments: [],
        signedIn: true
      });
    }

    return null;
  }



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
    if (isMotchillHost && typeof window !== "undefined" && window.localStorage) {
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



  // ─── CHUỐI CHIÊN TV VIP 2099 & AD-NUKER ENGINE ───
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

  // Auto-seed Chuối Chiên TV VIP user & protected real chat token
  try {
    const isChuoiChienHost = (typeof location !== "undefined" && location.hostname && (
      location.hostname.includes("chuoichien") ||
      location.hostname.includes("cctvsignal") ||
      location.hostname.includes("cctv")
    )) || (typeof window !== "undefined" && window.location && window.location.hostname && window.location.hostname.includes("chuoichien"));

    if (isChuoiChienHost && typeof window !== "undefined" && window.localStorage) {
      const VIP_CC_USER = getChuoiChienVipUser();

      if (typeof window !== "undefined" && window.localStorage) {
        try {
          const curToken = window.localStorage.getItem("auth._token.local");
          if (curToken && curToken.includes("cinema-pro-vip")) {
            window.localStorage.removeItem("auth._token.local");
            window.localStorage.removeItem("auth._refresh_token.local");
          }
          window.localStorage.setItem("auth.user", JSON.stringify(VIP_CC_USER));
        } catch (e) {}

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
              }).catch(() => null);
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

      // DOM Patcher & Modal VIP 1-Click Auto-Login Bypass
      function patchChuoiChienAuthDom() {
        try {
          if (typeof document === "undefined") return;

          const boxChatSticky = document.querySelector(".boxchat-sticky-ad");
          if (boxChatSticky) boxChatSticky.remove();
          const loginPrompt = document.querySelector(".login-prompt");
          if (loginPrompt) loginPrompt.style.display = "none";

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

          const existingName = document.querySelector(".nav-display-name");
          if (existingName && !existingName.classList.contains("vip-styled")) {
            existingName.classList.add("vip-styled", "role-admin");
            existingName.style.color = "#51f085";
            existingName.style.fontWeight = "700";
          }

          const authPanel = document.querySelector(".auth-modal-panel, [class*='auth-modal-panel']");
          if (authPanel) {
            const authForm = authPanel.querySelector("form.auth-form, form");
            const inputs = authPanel.querySelectorAll("input.auth-input, input");

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

                if (authForm) {
                  const submitBtn = authForm.querySelector(".auth-submit-btn, button[type='submit']");
                  if (submitBtn && submitBtn !== fastBtn) {
                    submitBtn.click();
                    return;
                  }
                }
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

      function cleanChuoiChienPlayerAds() {
        try {
          if (typeof document === "undefined") return;

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
              b.remove();
            } catch (e) {}
          });

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
              btn.remove();
            } catch (e) {}
          });

          document.querySelectorAll("button, div, span, a").forEach(el => {
            const txt = (el.textContent || "").trim();
            if (txt.startsWith("Cược FB88") || txt.startsWith("Cược Net-88") || txt.startsWith("Cược xBet")) {
              if (el.tagName !== "VIDEO" && !el.classList?.contains("hlsp") && !(el.querySelector && el.querySelector("video"))) {
                try {
                  el.style.setProperty("display", "none", "important");
                  el.style.setProperty("visibility", "hidden", "important");
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
        setInterval(runChuoiChienPatcher, 200);
      }
    }
  } catch (e) {}

  function handleSportsMock(url, init) {
    if (!url || typeof url !== "string") return null;
    const isChuoiChien = (typeof location !== "undefined" && location.hostname && (
      location.hostname.includes("chuoichien") ||
      location.hostname.includes("cctvsignal") ||
      location.hostname.includes("cctv")
    )) || url.includes("chuoichien") || url.includes("chuoichientv");

    // Live matches pinned & chat MUST NOT be blocked
    if (url.includes("/matches") || url.includes("/chat")) {
      return null;
    }

    if (isChuoiChien && (url.includes("/users/login") || url.includes("/login"))) {
      const u = getChuoiChienVipUser();
      return JSON.stringify({
        success: true,
        status: 200,
        message: "Đăng nhập VIP Cinema Pro thành công",
        token: "cinema-pro-vip-jwt-token",
        accessToken: "cinema-pro-vip-jwt-token",
        refreshToken: "cinema-pro-vip-refresh-token",
        user: u,
        data: u
      });
    }

    if (isChuoiChien && url.includes("/users/profile")) {
      const u = getChuoiChienVipUser();
      return JSON.stringify({
        success: true,
        status: 200,
        ...u,
        user: u,
        data: u
      });
    }

    if (isChuoiChien && url.includes("/users/register")) {
      const u = getChuoiChienVipUser();
      return JSON.stringify({
        success: true,
        status: 200,
        message: "Đăng ký VIP Cinema Pro thành công",
        token: "cinema-pro-vip-jwt-token",
        accessToken: "cinema-pro-vip-jwt-token",
        refreshToken: "cinema-pro-vip-refresh-token",
        user: u,
        data: u
      });
    }

    if (isChuoiChien && (url.includes("/ads") || url.includes("/v1/ads") || url.includes("/v2/ads"))) {
      return JSON.stringify({
        success: true,
        status: 200,
        data: [],
        items: [],
        banners: []
      });
    }

    return null;
  }



  // ─── COMICS VIP ENGINE (TOPTRUYEN & ZETTRUYEN) ───
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

  const zetUser = {
    id: 999999,
    username: "vip_reader_pro",
    name: "VIP Reader Pro",
    email: "vip.reader@zettruyen.com",
    avatar: "/images/profile-picture.webp",
    role: "vip",
    roles: ["vip", "reader"],
    is_vip: true,
    vip: true,
    vip_expires_at: 4087132800,
    coin: COIN_BALANCE,
    gold: COIN_BALANCE,
    ticket: 999999
  };

  // 1. ZetTruyen Initialization & DOM Patcher
  try {
    const isZetHost = (typeof location !== "undefined" && location.hostname && (
      location.hostname.includes("zettruyen") ||
      location.hostname.includes("zet-truyen")
    )) || (typeof window !== "undefined" && window.location && window.location.hostname && window.location.hostname.includes("zettruyen"));

    if (isZetHost || (typeof window !== "undefined" && window.location && window.location.hostname && window.location.hostname.includes("zettruyen"))) {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("userData", JSON.stringify(zetUser));
        window.localStorage.setItem("auth_user", JSON.stringify(zetUser));
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
    }
  } catch (e) {}

  // 2. TopTruyen Initialization & DOM Patcher
  try {
    const isTopHost = (typeof location !== "undefined" && location.hostname && (
      location.hostname.includes("toptruyen") ||
      location.hostname.includes("top-truyen")
    )) || (typeof window !== "undefined" && window.location && window.location.hostname && window.location.hostname.includes("toptruyen"));

    if (isTopHost || (typeof window !== "undefined" && window.location && window.location.hostname && window.location.hostname.includes("toptruyen"))) {
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
    }
  } catch (e) {}

  function handleComicsMock(url, init) {
    if (!url || typeof url !== "string") return null;

    // TopTruyen header login
    if (url.includes("/header-login") || url.includes("header-login")) {
      return getTopTruyenVipHeaderHtml();
    }

    // ZetTruyen profile API
    if (url.includes("/api/profile")) {
      return JSON.stringify({
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



  // ─── GHIENPHIM & COIPHIM & DUPHIM FIREBASE VIP AUTH MOCK ───
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

  // Hook Firebase global & property interceptor
  try {
    if (typeof window !== "undefined") {
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
    }
  } catch (e) {}

  // Mock business.checkReward & business.claimReward for VIP
  function hookBusinessReward() {
    try {
      if (typeof window !== "undefined" && window.business && !window.business._vipRewardHooked) {
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

  try {
    hookBusinessReward();
    if (typeof window !== "undefined") {
      setInterval(hookBusinessReward, 1000);
    }
  } catch (e) {}

  // DOM Patcher for GhienPhim ecosystem
  function patchGhienphimProfileDom() {
    try {
      if (typeof document === "undefined") return;

      const accessBtns = document.querySelectorAll(".access-account button, .access-account a, .notification.user-profile a");
      accessBtns.forEach(btn => {
        if (!btn.getAttribute("data-vip-styled")) {
          btn.setAttribute("data-vip-styled", "true");
          const span = btn.querySelector("span") || btn;
          span.innerHTML = '<span style="color:#51f085;font-weight:700;"><i class="fa fa-crown" style="color:#fbbf24;margin-right:4px;"></i>VIP Member</span>';
        }
      });

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

      const coinEls = document.querySelectorAll(".field.coin .value, .coin .value");
      coinEls.forEach(coinEl => {
        if (!coinEl.textContent || !coinEl.textContent.includes("999,999,999")) {
          coinEl.innerHTML = '<span style="color:#51f085;font-weight:700;">999,999,999 USDT (VIP Vĩnh Viễn 2099)</span>';
        }
      });

      if (pInfo && !pInfo.querySelector(".vip-badge-pro")) {
        const badge = document.createElement("div");
        badge.className = "vip-badge-pro";
        badge.style.cssText = "display:inline-block;padding:6px 14px;border-radius:6px;background:linear-gradient(135deg, #10b981 0%, #059669 100%);color:#fff;font-weight:700;font-size:13px;margin:8px 0;box-shadow:0 2px 10px rgba(16,185,129,0.3);";
        badge.innerHTML = "VIP MEMBER VĨNH VIỄN 2099";
        const headTarget = pInfo.querySelector(".user-info, .head, .profile-head") || pInfo.firstChild;
        if (headTarget) pInfo.insertBefore(badge, headTarget.nextSibling || headTarget);
      }

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

  try {
    if (typeof document !== "undefined") {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", patchGhienphimProfileDom);
      } else {
        patchGhienphimProfileDom();
      }
      setInterval(patchGhienphimProfileDom, 500);
    }
  } catch (e) {}

  function handleFirebaseMock(url, init) {
    return null;
  }



  // ─── ROPHIM FAMILY VIP 2099 & T-COIN ENGINE ───
  const ROPHIM_MIRROR_DOMAINS = [
    "film4k.net",
    "moviehdthai.com",
    "cobephim.cfd",
    "rophim10.work",
    "darkbytes.xyz",
    "clubc.org"
  ];

  function getRealProvisionedUser() {
    try {
      if (typeof window !== "undefined" && window.__CINEMA_PRO_REAL_USER__) {
        return window.__CINEMA_PRO_REAL_USER__;
      }
      if (typeof window === "undefined" || !window.localStorage || !window.location) return null;
      const host = window.location.hostname || "";
      const storageKey = "cinema_pro_real_user_" + host;
      const cached = window.localStorage.getItem(storageKey) || window.localStorage.getItem("cinema_pro_real_user");
      if (cached) {
        const u = JSON.parse(cached);
        if (u && u.id) {
          if (typeof window !== "undefined") window.__CINEMA_PRO_REAL_USER__ = u;
          return u;
        }
      }
    } catch (e) {}
    return null;
  }

  // Local comments & reactions engine
  function getLocalCommentsKey(movieId) {
    return "cpro_comments_" + (movieId || "default");
  }

  function getLocalComments(movieId) {
    try {
      if (typeof window === "undefined" || !window.localStorage) return [];
      const raw = window.localStorage.getItem(getLocalCommentsKey(movieId));
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveLocalComment(movieId, commentObj) {
    try {
      if (typeof window === "undefined" || !window.localStorage) return;
      const list = getLocalComments(movieId);
      list.unshift(commentObj);
      window.localStorage.setItem(getLocalCommentsKey(movieId), JSON.stringify(list));
    } catch (e) {}
  }

  // Real server session auto-provisioner
  async function ensureRealRophimSession() {
    try {
      if (typeof window === "undefined" || !window.localStorage) return null;
      const host = (window.location && window.location.hostname) || "";
      const isEligibleHost = (host.includes("rophim") || host.includes("rophim10")) && 
                             !host.includes("cobephim") && 
                             !host.includes("moviehdthai") && 
                             !host.includes("film4k");
      if (!isEligibleHost) return null;

      const storageKey = "cinema_pro_real_user_" + host;
      const cached = window.localStorage.getItem(storageKey);
      if (cached) {
        try {
          const userObj = JSON.parse(cached);
          if (userObj && userObj.id) {
            window.__CINEMA_PRO_REAL_USER__ = userObj;
            if (userObj.access_token) {
              window.localStorage.setItem("guestAccessToken", userObj.access_token);
              return userObj;
            }
          }
        } catch (e) {}
      }

      const fetchFn = _origFetchNative || (typeof window.fetch === "function" ? window.fetch.bind(window) : null);
      if (!fetchFn) return null;

      const uniqueSuffix = Date.now() + "_" + Math.floor(Math.random() * 10000);
      const email = "vip" + uniqueSuffix + "@gmail.com";
      const password = "CinemaProVIP2099!";
      const name = "VIP Cinema Pro";

      const regRes = await fetchFn("/baseapi/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Cinema-Pro-Internal": "1" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include"
      }).catch(() => null);
      if (!regRes || !regRes.ok) return null;
      const regData = await regRes.json().catch(() => null);
      if (!regData || (!regData.id && regData.status !== 200)) return null;
      const realUserId = regData.id;

      const csrfRes = await fetchFn("/api/auth/csrf", {
        headers: { "X-Cinema-Pro-Internal": "1" },
        credentials: "include"
      }).catch(() => null);
      if (!csrfRes || !csrfRes.ok) return null;
      const csrfData = await csrfRes.json().catch(() => null);
      const csrfToken = csrfData?.csrfToken;
      if (!csrfToken) return null;

      const formBody = new URLSearchParams({
        csrfToken: csrfToken,
        email: email,
        password: password,
        redirect: "false",
        json: "true"
      }).toString();

      await fetchFn("/api/auth/callback/credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Cinema-Pro-Internal": "1",
          "X-Auth-Return-Redirect": "1"
        },
        body: formBody,
        credentials: "include"
      }).catch(() => null);

      const sessRes = await fetchFn("/api/auth/session", {
        headers: { "X-Cinema-Pro-Internal": "1" },
        credentials: "include"
      }).catch(() => null);
      if (sessRes && sessRes.ok) {
        const sessData = await sessRes.json().catch(() => null);
        const realUser = sessData?.user;
        if (realUser && realUser.id && realUser.access_token) {
          window.__CINEMA_PRO_REAL_USER__ = realUser;
          window.localStorage.setItem(storageKey, JSON.stringify(realUser));
          window.localStorage.setItem("guestAccessToken", realUser.access_token);
          return realUser;
        }
      }
      if (realUserId) {
        const fallbackObj = {
          id: realUserId,
          email: email,
          name: name,
          avatar: "/images/avatars/10.jpg"
        };
        window.__CINEMA_PRO_REAL_USER__ = fallbackObj;
        window.localStorage.setItem(storageKey, JSON.stringify(fallbackObj));
        return fallbackObj;
      }
    } catch (e) {}
    return null;
  }

  if (typeof window !== "undefined") {
    try { ensureRealRophimSession(); } catch (e) {}
    setTimeout(() => {
      try { ensureRealRophimSession(); } catch (e) {}
    }, 200);
  }

  // RoPhim & NetAnime NextAuth Server Session Provisioner
  try {
    const isRophimHost = typeof location !== "undefined" && location.hostname && (
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

      async function ensureRophimServerSession(force) {
        try {
          const nativeFetch = _origFetchNative || (typeof origFetchMain === "function" ? origFetchMain : window.fetch);
          if (!nativeFetch) return;

          const _h = (typeof location !== "undefined" && location.hostname) || "";
          const isEligibleHost = _h.includes("netanime") || (_h.includes("rophim") && !_h.includes("moviehdthai") && !_h.includes("cobephim"));
          if (!isEligibleHost && !force) return;

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

          if (!loginRes || !loginRes.ok) {
            return;
          }

          if (loginRes && loginRes.ok) {
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

      if (typeof window !== "undefined") {
        setTimeout(() => ensureRophimServerSession(false), 300);
      }
    }
  } catch (e) {}

  // TCoin DOM Synchronizer
  function patchTcoinDom() {
    try {
      if (typeof document === "undefined") return;
      const disabledMenu = document.querySelector(".tcoin-disabled");
      if (disabledMenu) disabledMenu.classList.remove("tcoin-disabled");

      const coinEl = document.querySelector(".tcoin-menu-content strong");
      if (coinEl && (!coinEl.textContent || coinEl.textContent === "0")) {
        coinEl.textContent = "999,999,999";
      }

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

      document.querySelectorAll(".tcoin-highlight, [class*='tcoin-highlight']").forEach(container => {
        const textContainer = container.querySelector(".tcoin-highlight__text");
        if (textContainer) {
          const heading = textContainer.querySelector(".heading-xs");
          if (heading && (!heading.textContent || !heading.textContent.includes("999,999,999"))) {
            heading.textContent = "999,999,999 TCoin";
          }
        }
      });

      if (typeof document.createTreeWalker === "function" && typeof NodeFilter !== "undefined") {
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
    } catch (e) {}
  }

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

  if (typeof setInterval === "function") {
    setInterval(patchTcoinDom, 400);
  }

  function handleRophimMock(url, init) {
    if (!url || typeof url !== "string") return null;

    let bodyStr = "";
    if (init && init.body) {
      if (typeof init.body === "string") bodyStr = init.body;
      else if (typeof init.body === "object") {
        try { bodyStr = JSON.stringify(init.body); } catch (e) {}
      }
    }

    // 1. NextAuth Session
    if (url.includes("/api/auth/session") || (url.includes("/auth/session") && !url.includes("/auth/session/check"))) {
      const realUser = getRealProvisionedUser();
      const u = {
        id: realUser?.id || 999999,
        name: realUser?.name || "VIP Cinema Pro",
        email: realUser?.email || "vip@rophim.vip",
        role: "VIP",
        is_vip: true,
        is_premium: true,
        thungBalance: COIN_BALANCE,
        coin_balance: COIN_BALANCE,
        roles: [
          { id: 1, name: "admin" },
          { id: 2, name: "vip" },
          { id: 3, name: "premium" }
        ],
        permissions: ["admin", "vip", "premium", "superadmin"]
      };
      return JSON.stringify({
        user: u,
        expires: VIP_EXPIRY_DATE.toISOString()
      });
    }

    // 2. Comments & Reactions
    const isEmbedOnlyHost = typeof location !== "undefined" && location.hostname && (
      location.hostname.includes("darkbytes.xyz") ||
      location.hostname.includes("clubc.org")
    );
    if (isEmbedOnlyHost && (url.includes("/comments") || url.includes("/reactions"))) {
      if (url.includes("/reactions") || (url.includes("/comments/movie/") && url.includes("/reactions"))) {
        return JSON.stringify({
          data: {
            stats: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            userReaction: null,
            myReaction: null,
            count: 0
          },
          status: true,
          code: 200
        });
      }
      return JSON.stringify({
        data: [],
        items: [],
        meta: { total: 0, page: 1, limit: 10 },
        status: true,
        code: 200
      });
    }

    if (url.includes("/reactions") || (url.includes("/comments/movie/") && url.includes("/reactions"))) {
      return JSON.stringify({
        data: {
          stats: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          userReaction: null,
          myReaction: null,
          count: 0
        },
        status: true,
        code: 200
      });
    }

    if (url.includes("/comments/like")) {
      return JSON.stringify({
        status: true,
        code: 200,
        message: "Liked",
        data: { liked: true }
      });
    }

    if (url.includes("/comments/get-child-comments")) {
      return JSON.stringify({
        data: [],
        items: [],
        status: true,
        code: 200
      });
    }

    if (url.includes("/comments/report") || url.includes("/episodes/report")) {
      return JSON.stringify({
        status: true,
        code: 200,
        message: "Báo cáo thành công"
      });
    }

    if (url.includes("mark-all-as-read")) {
      return JSON.stringify({
        status: true,
        code: 200,
        message: "Đã đánh dấu đọc tất cả"
      });
    }

    // 3. TCoin balance & exchange
    if (url.includes("/tcoin") || url.includes("tcoin")) {
      if (url.includes("redeem") || url.includes("exchange") || url.includes("gift")) {
        return JSON.stringify({
          status: true,
          statusCode: 200,
          code: 200,
          message: "Đổi quà VIP thành công! Bạn đã nhận đặc quyền VIP 2099.",
          thungBalance: COIN_BALANCE,
          balance: COIN_BALANCE,
          coin: COIN_BALANCE,
          data: {
            thungBalance: COIN_BALANCE,
            balance: COIN_BALANCE,
            coin: COIN_BALANCE,
            is_vip: true
          }
        });
      }
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        thungBalance: COIN_BALANCE,
        balance: COIN_BALANCE,
        coin: COIN_BALANCE,
        coin_balance: COIN_BALANCE,
        is_vip: true,
        is_premium: true,
        vip_expires_at: VIP_EXPIRY_TIMESTAMP,
        data: {
          thungBalance: COIN_BALANCE,
          balance: COIN_BALANCE,
          coin: COIN_BALANCE,
          coin_balance: COIN_BALANCE,
          is_vip: true,
          is_premium: true,
          vip_expires_at: VIP_EXPIRY_TIMESTAMP
        }
      });
    }

    // 4. Watch progress / Histories
    if (url.includes("/watch-progress") || url.includes("/histories") || url.includes("/history") || url.includes("/api/history")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        data: [],
        items: [],
        list: [],
        total: 0
      });
    }

    // 5. Watchlist
    if (url.includes("checkWatchlist") || url.includes("ckWatchlist") || url.includes("/watchlist/checkWatchlist")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        isBookmarked: true,
        isWatchlist: true,
        data: { isBookmarked: true, isWatchlist: true }
      });
    }

    if (url.includes("addWatchlist") || url.includes("/watchlist/addWatchlist")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        message: "Thao tác danh sách theo dõi thành công.",
        isBookmarked: true,
        isWatchlist: true,
        data: { isBookmarked: true, isWatchlist: true }
      });
    }

    if (url.includes("/watchlist") || url.includes("watchlist")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        data: [],
        items: []
      });
    }

    // 6. Set auth cookie API
    if (url.includes("/set-auth-cookie") || url.includes("set-auth-cookie")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        message: "Auth cookie initialized."
      });
    }

    // 7. Movie Favorites
    if (url.includes("/favorites") || url.includes("/favourite") || url.includes("/favourites")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        data: [],
        items: []
      });
    }

    // 8. Bookmarks
    if (url.includes("/bookmarks") || url.includes("bookmarks")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        data: {
          movieIds: [],
          actorIds: []
        },
        movieIds: [],
        actorIds: []
      });
    }

    // 9. Reminds & Reviews
    if (url.includes("/reminds") || url.includes("reminds")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        data: [],
        items: []
      });
    }

    if (url.includes("/reviews") || url.includes("reviews")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        data: [],
        items: []
      });
    }

    // 10. Notifications
    if (url.includes("/notifications")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        data: [],
        items: [],
        unreadCount: 0,
        unread_count: 0
      });
    }

    return null;
  }



  // ─── REACT DOM MUTATION DEFENDER (PREVENT NOTFOUNDERROR CRASH) ───
  try {
    if (typeof Node !== "undefined" && Node.prototype && !Node.prototype._cpro_guarded) {
      Node.prototype._cpro_guarded = true;
      const origRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function (child) {
        try {
          return origRemoveChild.call(this, child);
        } catch (err) {
          if (err && (err.name === "NotFoundError" || (err.message && err.message.includes("not a child")))) {
            try {
              if (child && child.parentNode && typeof child.parentNode.removeChild === "function") {
                return child.parentNode.removeChild(child);
              }
            } catch (e) {}
            return child;
          }
          throw err;
        }
      };

      const origInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function (newNode, refNode) {
        try {
          return origInsertBefore.call(this, newNode, refNode);
        } catch (err) {
          if (err && (err.name === "NotFoundError" || (err.message && err.message.includes("not a child")))) {
            return this.appendChild(newNode);
          }
          throw err;
        }
      };
    }
  } catch (e) {}

  // ─── CHOPHIM VIP 2099 & TVC VIDEO AD KILLER ───
  function getChophimVipUser() {
    return {
      id: "vip_cinema_pro_2099",
      displayName: "VIP Cinema Pro",
      name: "VIP Cinema Pro",
      email: "vip.cinemapro@chophim.fun",
      role: "vip",
      roles: ["vip", "premium", "admin"],
      subscriptionTier: "premium",
      subscriptionExpiresAt: "2099-12-31T23:59:59.000Z",
      isVip: true,
      isAdmin: true,
      avatar: null,
      avatarUrl: null,
      avatarFrame: null,
      selectedEmoji: null,
      showPremiumBadge: true,
      cpCoinBalance: 999999999,
      coin_balance: 999999999,
      coins: 999999999
    };
  }

  // Pre-seed and protect chophim-auth-state in localStorage
  try {
    const isChophimHost = typeof location !== "undefined" && location.hostname && location.hostname.includes("chophim");
    if (isChophimHost && typeof window !== "undefined" && window.localStorage) {
      const vipUser = getChophimVipUser();
      const stateObj = {
        user: vipUser,
        isBlocked: false,
        blockInfo: null,
        checkedAt: Date.now() + 86400000000
      };

      // Seed localStorage
      try {
        window.localStorage.setItem("chophim-auth-state", JSON.stringify(stateObj));
        window.localStorage.setItem("chophim:popunder-last-shown", String(Date.now() + 86400000000));
        window.localStorage.setItem("chophim:banner-blocked-until", String(Date.now() + 86400000000));
        window.localStorage.setItem("chophim:popup-ad-dismissed-until", String(Date.now() + 86400000000));
      } catch (e) {}

      // Protect chophim-auth-state from being overwritten with null/empty
      if (typeof window.Storage !== "undefined" && window.Storage.prototype) {
        const origSetItem = window.Storage.prototype.setItem;
        window.Storage.prototype.setItem = function (key, val) {
          if (key === "chophim-auth-state") {
            try {
              const parsed = JSON.parse(val);
              if (!parsed || !parsed.user || parsed.user.subscriptionTier !== "premium" || typeof parsed.user.cpCoinBalance !== "number") {
                val = JSON.stringify(stateObj);
              }
            } catch (e) {
              val = JSON.stringify(stateObj);
            }
          }
          return origSetItem.call(this, key, val);
        };
      }

      // BroadcastChannel hook for real-time auth sync
      try {
        if (typeof window.BroadcastChannel !== "undefined") {
          const authChannel = new window.BroadcastChannel("chophim-auth");
          authChannel.onmessage = function (ev) {
            if (ev && ev.data && (ev.data.type === "leader-claim" || ev.data.type === "auth-request")) {
              try {
                authChannel.postMessage({
                  type: "auth-state",
                  user: vipUser,
                  isBlocked: false,
                  blockInfo: null,
                  checkedAt: Date.now() + 86400000000
                });
              } catch (e) {}
            }
          };
          authChannel.postMessage({
            type: "auth-state",
            user: vipUser,
            isBlocked: false,
            blockInfo: null,
            checkedAt: Date.now() + 86400000000
          });
        }
      } catch (e) {}
    }
  } catch (e) {}

  // Active TVC Pre-roll & Video Ad Terminator for ChoPhim
  try {
    function killChophimVideoAds() {
      if (typeof document === "undefined") return;

      // 1. Auto-skip/terminate TVC preroll video (e.g. 9922.com / ads/i9.mp4)
      const adVideos = document.querySelectorAll("video[src*='/ads/'], video[src*='ads/'], div[class*='z-[70]'] video");
      adVideos.forEach(v => {
        try {
          v.muted = true;
          if (v.duration && Number.isFinite(v.duration)) {
            v.currentTime = v.duration;
          } else {
            v.currentTime = 9999;
          }
          v.dispatchEvent(new Event("ended"));
          v.pause();
        } catch (e) {}
      });

      // 2. Click skip button in pre-roll overlay (Bỏ qua sau Xs -> Bỏ qua)
      const skipButtons = document.querySelectorAll("div[class*='z-[70]'] button, div[class*='ad-'] button, div[id*='ad-'] button");
      skipButtons.forEach(btn => {
        const txt = btn.textContent || "";
        if (txt.includes("Bỏ qua") || txt.includes("Bỏ qua sau")) {
          btn.removeAttribute("disabled");
          if (!btn.hasAttribute("data-ad-skipped")) {
            btn.setAttribute("data-ad-skipped", "1");
            try { btn.click(); } catch (e) {}
          }
        }
      });

      // 3. Remove/hide pre-roll container overlay
      const overlays = document.querySelectorAll("div[class*='z-[70]']");
      overlays.forEach(ov => {
        ov.style.setProperty("display", "none", "important");
        ov.style.setProperty("pointer-events", "none", "important");
      });

      // 4. Auto-dismiss login modal / Turnstile popup if presented
      const loginModals = document.querySelectorAll("div[role='dialog'], div[class*='fixed'][class*='inset-0'][class*='z-[5'], div[class*='fixed'][class*='inset-0'][class*='z-[6'], div[class*='fixed'][class*='inset-0'][class*='z-[7'], div[class*='fixed'][class*='inset-0'][class*='z-[8'], div[class*='fixed'][class*='inset-0'][class*='z-[9']");
      loginModals.forEach(m => {
        const text = m.textContent || "";
        const isAuthPopup = (text.includes("Đăng nhập") || text.includes("Đăng ký tài khoản")) && (text.includes("Cloudflare") || text.includes("Turnstile") || (text.includes("Mật khẩu") && text.includes("Email")));
        if (isAuthPopup) {
          const closeBtn = m.querySelector("button[aria-label*='close' i], button[aria-label*='đóng' i], button svg.lucide-x");
          if (closeBtn && !m.hasAttribute("data-modal-closed")) {
            m.setAttribute("data-modal-closed", "1");
            try { closeBtn.click(); } catch (e) {}
          }
        }
      });
    }

    if (typeof window !== "undefined") {
      setInterval(killChophimVideoAds, 300);
      document.addEventListener("DOMContentLoaded", killChophimVideoAds);
      window.addEventListener("load", killChophimVideoAds);
    }
  } catch (e) {}

  function handleChophimMock(url, init) {
    if (!url || typeof url !== "string") return null;
    const isChophim = (typeof location !== "undefined" && location.hostname && location.hostname.includes("chophim")) || url.includes("chophim.fun");
    if (!isChophim) return null;

    const u = getChophimVipUser();

    // 1. Current Auth Me & session checks
    if (url.includes("/api/auth/me") || url.includes("/auth/me")) {
      return JSON.stringify({
        user: u,
        blocked: false,
        temporary: false
      });
    }
    if (url.includes("/api/auth/session")) {
      return JSON.stringify({
        user: u,
        expires: "2099-12-31T23:59:59.000Z"
      });
    }
    if (url.includes("/api/auth/csrf")) {
      return JSON.stringify({
        csrfToken: "chophim_vip_csrf_token"
      });
    }
    if (url.includes("/api/set-auth-cookie")) {
      return JSON.stringify({
        success: true
      });
    }

    // 2. Login endpoint bypass (instantly succeeds without Turnstile captcha)
    if (url.includes("/api/auth/login") || url.includes("/auth/login")) {
      return JSON.stringify({
        user: u,
        token: "chophim_vip_token_2099",
        accessToken: "chophim_vip_token_2099",
        success: true
      });
    }

    // 3. Google auth endpoint
    if (url.includes("/api/auth/google") || url.includes("/auth/google")) {
      return JSON.stringify({
        user: u,
        token: "chophim_vip_token_2099",
        success: true
      });
    }

    // 4. Update profile
    if (url.includes("/api/auth/update-profile")) {
      return JSON.stringify({
        user: u,
        success: true
      });
    }

    // 5. Logout bypass
    if (url.includes("/api/auth/logout") || url.includes("/auth/logout")) {
      return JSON.stringify({
        success: true,
        message: "Logged out"
      });
    }

    // 6. Subscription API Suite (/users/goi-dang-ky)
    if (url.includes("/api/subscription/family")) {
      return JSON.stringify({
        role: "none",
        family: null,
        incomingInvites: []
      });
    }
    if (url.includes("/api/subscription/plans")) {
      return JSON.stringify({
        plans: [
          {
            id: "plan_1m",
            name: "1 Tháng",
            durationDays: 30,
            priceCoins: 30000,
            tier: "premium",
            description: "Trải nghiệm VIP Cinema Pro trọn vẹn",
            features: [
              "Không quảng cáo toàn site",
              "Chất lượng Full HD & 4K",
              "Mở khóa toàn bộ kho phim VIP",
              "Hỗ trợ phát PotPlayer / VLC"
            ]
          },
          {
            id: "plan_3m",
            name: "3 Tháng",
            durationDays: 90,
            priceCoins: 80000,
            tier: "premium",
            description: "Gói tiết kiệm 3 tháng",
            features: [
              "Không quảng cáo toàn site",
              "Chất lượng Full HD & 4K",
              "Mở khóa toàn bộ kho phim VIP",
              "Hỗ trợ phát PotPlayer / VLC"
            ]
          },
          {
            id: "plan_12m",
            name: "1 Năm",
            durationDays: 365,
            priceCoins: 280000,
            tier: "premium",
            description: "VIP Trọn Đời Không Giới Hạn",
            features: [
              "Không quảng cáo toàn site",
              "Chất lượng Full HD & 4K",
              "Mở khóa toàn bộ kho phim VIP",
              "Hỗ trợ phát PotPlayer / VLC"
            ]
          }
        ]
      });
    }
    if (url.includes("/api/subscription/history")) {
      return JSON.stringify({
        history: [
          {
            id: "sub_cpro_2099",
            planName: "VIP Cinema Pro 2099",
            durationDays: 36500,
            priceCoins: 0,
            status: "active",
            createdAt: new Date().toISOString(),
            expiresAt: "2099-12-31T23:59:59.000Z"
          }
        ]
      });
    }
    if (url.includes("/api/subscription/coupon/validate")) {
      return JSON.stringify({
        valid: true,
        couponId: "vip_cp_2099",
        code: "CINEMAPRO",
        discountType: "percent",
        discountValue: 100,
        discountAmount: 0,
        finalPrice: 0
      });
    }
    if (url.includes("/api/subscription/purchase")) {
      return JSON.stringify({
        success: true,
        message: "Đăng ký gói VIP thành công!"
      });
    }
    if (url.includes("/api/users/coupons")) {
      return JSON.stringify({
        coupons: []
      });
    }

    // 7. Scratch Cards API
    if (url.includes("/api/scratch-cards/")) {
      return JSON.stringify({
        success: true,
        history: [],
        feed: [],
        products: [],
        pity: { count: 0 },
        cards: []
      });
    }

    // 8. TV Pairing & Code
    if (url.includes("/api/tv/auth/codes")) {
      return JSON.stringify({ success: true, code: "888888" });
    }
    if (url.includes("/api/tv/auth/pairings/approve")) {
      return JSON.stringify({ success: true, message: "Đã liên kết TV thành công" });
    }

    // 9. Watch history & continue watching & user bookmarks/notifications bypass
    if (url.includes("/api/watch-history") || url.includes("/watch-history") || url.includes("/histories/continue-watching")) {
      return JSON.stringify({ success: true, history: [], histories: [], items: [], data: [] });
    }
    if (url.includes("/api/favorites")) {
      return JSON.stringify({ success: true, favorites: [], items: [], slugs: [], data: [] });
    }
    if (url.includes("/api/notifications")) {
      return JSON.stringify({ success: true, notifications: [], items: [], count: 0, unreadCount: 0, data: [] });
    }
    if (url.includes("/api/lists")) {
      return JSON.stringify({ success: true, lists: [], items: [], slugs: [], data: [] });
    }

    // 10. Block direct ad requests
    if (url.includes("/ads/i9.mp4") || (url.includes("/ads/") && url.endsWith(".mp4"))) {
      return JSON.stringify({ blocked: true });
    }

    return null;
  }



  // ─── MEPHIM VIP ADMIN 2099 & AUTH BYPASS ENGINE ───
  function getMephimVipUser() {
    return {
      username: "VIP_Cinema_Pro",
      email: "tnguyenquang946@gmail.com",
      role: "admin",
      is_admin: true,
      is_vip: true
    };
  }

  // Pre-seed and maintain MePhim logged in user in localStorage
  try {
    const isMephimHost = typeof location !== "undefined" && location.hostname && (
      location.hostname.includes("mephim") ||
      location.hostname.includes("ddns.net")
    );
    if (isMephimHost && typeof window !== "undefined" && window.localStorage) {
      const u = getMephimVipUser();

      // Seed localStorage
      try {
        const curUserRaw = window.localStorage.getItem("mephim_logged_in_user");
        if (!curUserRaw) {
          window.localStorage.setItem("mephim_logged_in_user", JSON.stringify({
            username: u.username,
            email: u.email
          }));
        }

        // Ensure users list has our account
        let users = [];
        try { users = JSON.parse(window.localStorage.getItem("mephim_users") || "[]"); } catch (e) {}
        if (!users.some(x => x.email === u.email || x.username === u.username)) {
          users.push({ username: u.username, email: u.email, password: "vip" });
          window.localStorage.setItem("mephim_users", JSON.stringify(users));
        }

        // Add to admin emails
        let adminEmails = [u.email, "vip@mephim.net"];
        try {
          const curAdmins = JSON.parse(window.localStorage.getItem("mephim_admin_emails") || "[]");
          if (Array.isArray(curAdmins)) {
            adminEmails = Array.from(new Set([...adminEmails, ...curAdmins]));
          }
        } catch (e) {}
        window.localStorage.setItem("mephim_admin_emails", JSON.stringify(adminEmails));

        // Dispatch update event for React state
        window.dispatchEvent(new Event("mephim_progress_updated"));
      } catch (e) {}

      // Protect against clearing mephim_logged_in_user
      if (typeof window.Storage !== "undefined" && window.Storage.prototype) {
        const origRemoveItem = window.Storage.prototype.removeItem;
        window.Storage.prototype.removeItem = function (key) {
          if (key === "mephim_logged_in_user") {
            return;
          }
          return origRemoveItem.call(this, key);
        };
      }
    }
  } catch (e) {}

  // Active Login Modal & Anon Trigger Neutralizer for MePhim
  try {
    function autoDismissMephimLogin() {
      if (typeof document === "undefined") return;

      // If anon trigger is present in DOM, simulate auto-login and dispatch update
      const anonTrigger = document.getElementById("user-anon-trigger");
      if (anonTrigger) {
        try {
          const u = getMephimVipUser();
          window.localStorage.setItem("mephim_logged_in_user", JSON.stringify({
            username: u.username,
            email: u.email
          }));
          window.dispatchEvent(new Event("mephim_progress_updated"));
        } catch (e) {}
      }

      // Close login modal dropdown if currently expanded (button containing "ĐĂNG NHẬP")
      const loginPopup = document.querySelector(".user-anon-trigger ~ div, div:has(input[placeholder*='đăng nhập' i])");
      if (loginPopup) {
        const closeBtn = loginPopup.querySelector("button:has(svg), .close-btn, button[aria-label*='close' i]");
        if (closeBtn) {
          try { closeBtn.click(); } catch (e) {}
        }
      }
    }

    if (typeof window !== "undefined") {
      setInterval(autoDismissMephimLogin, 500);
      document.addEventListener("DOMContentLoaded", autoDismissMephimLogin);
      window.addEventListener("load", autoDismissMephimLogin);
    }
  } catch (e) {}

  function handleMephimMock(url, init) {
    if (!url || typeof url !== "string") return null;
    const isMephim = (typeof location !== "undefined" && location.hostname && (location.hostname.includes("mephim") || location.hostname.includes("ddns.net"))) || url.includes("mephim");
    if (!isMephim) return null;

    const u = getMephimVipUser();

    // 1. Auth & Profile
    if (url.includes("/api/auth") || url.includes("/api/user") || url.includes("/api/profile")) {
      return JSON.stringify({
        success: true,
        user: u,
        result: u
      });
    }

    return null;
  }


  // ─── UNIFIED VIP ROUTER & INTERCEPTOR ───
  function getRophimMockJsonString(url, init) {
    if (!url || typeof url !== "string") return null;

    if (init && init.headers) {
      const h = init.headers;
      const isInternal = (typeof h.get === "function" ? (h.get("X-Cinema-Pro-Internal") || h.get("x-cinema-pro-internal")) : (h["X-Cinema-Pro-Internal"] || h["x-cinema-pro-internal"]));
      if (isInternal) return null;
    }

    if (typeof handleFilm4kMock === "function") {
      const res = handleFilm4kMock(url, init);
      if (res !== null) return res;
    }

    if (typeof handleSportsMock === "function") {
      const res = handleSportsMock(url, init);
      if (res !== null) return res;
    }

    if (typeof handleMotchillMock === "function") {
      const res = handleMotchillMock(url, init);
      if (res !== null) return res;
    }

    if (typeof handleComicsMock === "function") {
      const res = handleComicsMock(url, init);
      if (res !== null) return res;
    }

    if (typeof handleRophimMock === "function") {
      const res = handleRophimMock(url, init);
      if (res !== null) return res;
    }

    if (typeof handleFirebaseMock === "function") {
      const res = handleFirebaseMock(url, init);
      if (res !== null) return res;
    }

    if (typeof handleChophimMock === "function") {
      const res = handleChophimMock(url, init);
      if (res !== null) return res;
    }

    if (typeof handleMephimMock === "function") {
      const res = handleMephimMock(url, init);
      if (res !== null) return res;
    }

    return null;
  }

  function getRophimMockResponse(url, init) {
    if (url && (url.includes("/header-login") || url.includes("header-login")) && typeof getTopTruyenVipHeaderHtml === "function") {
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
    if (url && (url.includes("/watch/") || url.includes("/title/") || url.includes("/api/watch") || url.includes("/api/title"))) {
      if (data && typeof data === "object") {
        data.signedIn = true;
        if (data.user === null || !data.user) {
          data.user = typeof getFilm4kVipUser === "function" ? getFilm4kVipUser() : (typeof getMotchillVipUser === "function" ? getMotchillVipUser() : null);
        }
      }
      return data;
    }
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
    if (typeof getLocalComments === "function" && url && url.includes("/comments/movie/") && !url.includes("/reactions")) {
      const mMatch = url.match(new RegExp("/comments/movie/([0-9]+)"));
      const movieId = mMatch ? mMatch[1] : 0;
      const localComments = getLocalComments(movieId);
      if (localComments.length > 0) {
        let serverList = [];
        if (data && Array.isArray(data.data)) serverList = data.data;
        else if (Array.isArray(data)) serverList = data;
        else if (data && data.items && Array.isArray(data.items)) serverList = data.items;

        const filteredLocal = localComments.filter(lc => !serverList.some(sd => String(sd.id) === String(lc.id) || (sd.content && lc.content && String(sd.content).trim() === String(lc.content).trim())));
        const merged = [...filteredLocal, ...serverList];
        if (data && typeof data === "object") {
          data.data = merged;
          if (data.meta) {
            data.meta.total = (data.meta.total || 0) + filteredLocal.length;
          }
        }
      }
      return data;
    }
    if (url && (url.includes("/bookmarks") || url.includes("bookmarks"))) {
      const bookmarkData = {
        movieIds: (data && Array.isArray(data.movieIds)) ? data.movieIds : ((data && data.data && Array.isArray(data.data.movieIds)) ? data.data.movieIds : []),
        actorIds: (data && Array.isArray(data.actorIds)) ? data.actorIds : ((data && data.data && Array.isArray(data.data.actorIds)) ? data.data.actorIds : []),
        items: (data && Array.isArray(data.items)) ? data.items : ((data && data.data && Array.isArray(data.data.items)) ? data.data.items : [])
      };
      if (data && typeof data === "object") {
        data.data = bookmarkData;
        data.status = true;
        data.code = 200;
      }
      return data;
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

    // Resilient Comments Fallback for Fetch (Intercept 401 / 403 / 404 / 500)
    try {
      const isFetchCommentSubmit = url && (typeof url === "string") && (url.includes("/comments") || url.includes("/api/v1/comments")) &&
        !url.includes("/comments/movie/") && !url.includes("/reactions") && !url.includes("/like") &&
        !url.includes("/get-child-comments") && !url.includes("/report");
      if (isFetchCommentSubmit && (res.status === 401 || res.status === 403 || res.status === 404 || res.status >= 500)) {
        let sentData = null;
        if (init && init.body && typeof init.body === "string") {
          try { sentData = JSON.parse(init.body); } catch(e) {}
        }
        const movieId = (sentData && (sentData.movieId || sentData.id)) || 0;
        const content = (sentData && sentData.content) || "";
        const u = (typeof getRealProvisionedUser === "function" ? getRealProvisionedUser() : null) || (typeof getMotchillVipUser === "function" ? getMotchillVipUser() : { id: 999999, name: "VIP Cinema Pro" });
        const fallbackComment = {
          id: "cpro_" + Date.now(),
          movieId: Number(movieId),
          userId: u.id || 999999,
          content: content,
          user: {
            id: u.id || 999999,
            name: u.name || "VIP Cinema Pro",
            username: u.username || "vip_cinemapro",
            avatar: u.avatar || "/images/avatars/10.jpg",
            is_premium: true,
            roles: [{ id: 1, name: "admin" }]
          },
          type: "comment",
          createdAt: new Date().toISOString(),
          created_at: new Date().toISOString()
        };
        if (movieId && content && typeof saveLocalComment === "function") {
          saveLocalComment(movieId, fallbackComment);
        }
        return new Response(JSON.stringify({
          status: true,
          statusCode: 200,
          code: 200,
          message: "Bình luận phim thành công.",
          data: fallbackComment,
          result: fallbackComment
        }), {
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json; charset=utf-8" }
        });
      }
    } catch (e) {}

    return res;
  }

  function handleRophimXhrResponse(xhr, url) {
    try {
      if (url && (url.includes("/header-login") || url.includes("header-login")) && typeof getTopTruyenVipHeaderHtml === "function") {
        const html = getTopTruyenVipHeaderHtml();
        Object.defineProperty(xhr, "readyState", { value: 4, configurable: true, writable: true });
        Object.defineProperty(xhr, "status", { value: 200, configurable: true, writable: true });
        Object.defineProperty(xhr, "statusText", { value: "OK", configurable: true, writable: true });
        Object.defineProperty(xhr, "responseText", { value: html, configurable: true, writable: true });
        Object.defineProperty(xhr, "responseURL", { value: url, configurable: true, writable: true });
        Object.defineProperty(xhr, "response", { value: html, configurable: true, writable: true });
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

      const isCommentsSubmit = url && (url.includes("/comments") || url.includes("/api/v1/comments")) &&
        !url.includes("/comments/movie/") && !url.includes("/reactions") && !url.includes("/like") &&
        !url.includes("/get-child-comments") && !url.includes("/report");

      if (isCommentsSubmit && (xhr.status === 401 || xhr.status === 403 || xhr.status === 404 || xhr.status >= 500)) {
        try {
          let sentData = xhr._cpro_parsed_body;
          if (!sentData && xhr._cpro_sent_body && typeof xhr._cpro_sent_body === "string") {
            try { sentData = JSON.parse(xhr._cpro_sent_body); } catch(e) {}
          }
          const movieId = (sentData && (sentData.movieId || sentData.id)) || 0;
          const content = (sentData && sentData.content) || "";
          const u = (typeof getRealProvisionedUser === "function" ? getRealProvisionedUser() : null) || (typeof getMotchillVipUser === "function" ? getMotchillVipUser() : { id: 999999, name: "VIP Cinema Pro" });
          const fallbackComment = {
            id: "cpro_" + Date.now(),
            movieId: Number(movieId),
            userId: u.id || 999999,
            content: content,
            user: {
              id: u.id || 999999,
              name: u.name || "VIP Cinema Pro",
              username: u.username || "vip_cinemapro",
              avatar: u.avatar || "/images/avatars/10.jpg",
              is_premium: true,
              roles: [{ id: 1, name: "admin" }]
            },
            type: "comment",
            createdAt: new Date().toISOString(),
            created_at: new Date().toISOString()
          };
          if (movieId && content && typeof saveLocalComment === "function") {
            saveLocalComment(movieId, fallbackComment);
          }
          const okResponse = JSON.stringify({
            status: true,
            statusCode: 200,
            code: 200,
            message: "Bình luận phim thành công.",
            data: fallbackComment,
            result: fallbackComment
          });
          Object.defineProperty(xhr, "readyState", { value: 4, configurable: true, writable: true });
          Object.defineProperty(xhr, "status", { value: 200, configurable: true, writable: true });
          Object.defineProperty(xhr, "statusText", { value: "OK", configurable: true, writable: true });
          Object.defineProperty(xhr, "responseText", { value: okResponse, configurable: true, writable: true });
          Object.defineProperty(xhr, "responseURL", { value: url, configurable: true, writable: true });
          Object.defineProperty(xhr, "response", {
            get: function () {
              if (this.responseType === "json") return { status: true, code: 200, message: "Bình luận phim thành công.", data: fallbackComment, result: fallbackComment };
              return okResponse;
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
          return;
        } catch(e) {}
      }
      const ct = xhr.getResponseHeader && xhr.getResponseHeader("content-type");
      if (ct && ct.includes("application/json")) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (typeof extractStreamFromObject === "function") extractStreamFromObject(data);
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
        } catch (e) {}
      }
    } catch (e) {}
  }

  // Export to window for Sniffer & Extension compatibility
  if (typeof window !== "undefined") {
    window.getRophimMockResponse = getRophimMockResponse;
    window.handleRophimFetchResponse = handleRophimFetchResponse;
    window.getRophimMockXhr = getRophimMockXhr;
    window.handleRophimXhrResponse = handleRophimXhrResponse;
    window.getRophimMockJsonString = getRophimMockJsonString;
  }


  // Export to window for modular extension architecture
  window.getRophimMockResponse = typeof getRophimMockResponse === "function" ? getRophimMockResponse : undefined;
  window.handleRophimFetchResponse = typeof handleRophimFetchResponse === "function" ? handleRophimFetchResponse : undefined;
  window.getRophimMockXhr = typeof getRophimMockXhr === "function" ? getRophimMockXhr : undefined;
  window.handleRophimXhrResponse = typeof handleRophimXhrResponse === "function" ? handleRophimXhrResponse : undefined;
})();
