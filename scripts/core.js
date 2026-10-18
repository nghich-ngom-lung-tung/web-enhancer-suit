(function () {
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
            const nativeFetch = (typeof _origFetchNative !== "undefined" && _origFetchNative) || (typeof origFetchMain === "function" ? origFetchMain : (typeof window !== "undefined" ? window.fetch : null));
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

      const fetchFn = (typeof _origFetchNative !== "undefined" && _origFetchNative) || (typeof window !== "undefined" && typeof window.fetch === "function" ? window.fetch.bind(window) : null);
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
          const nativeFetch = (typeof _origFetchNative !== "undefined" && _origFetchNative) || (typeof origFetchMain === "function" ? origFetchMain : (typeof window !== "undefined" ? window.fetch : null));
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

    // 1b. User Profile
    if (url.includes("/users/profile") || url.includes("/user/profile")) {
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
        status: true,
        statusCode: 200,
        code: 200,
        data: u,
        result: u,
        user: u,
        ...u
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
        statusCode: 200,
        code: 200,
        message: "Đã đánh dấu đọc tất cả",
        notificationsMovie: [],
        notificationsOther: [],
        unreadCountMovie: 0,
        unreadCountOther: 0
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
      if (init && init.method && init.method.toUpperCase() === "DELETE") {
        return JSON.stringify({
          status: true,
          statusCode: 200,
          code: 200,
          message: "Xóa lịch sử thành công",
          success: true
        });
      }
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        data: [],
        items: [],
        list: [],
        total: 0,
        meta: {
          page: 1,
          limit: 18,
          total: 0,
          totalPages: 1,
          totalPage: 1
        }
      });
    }

    // 5. Watchlist & User Playlists
    const defaultPlaylists = [
      { id: 1, name: "Danh sách mặc định", is_default: true, count: 0, movies: [] },
      { id: 2, name: "Phim yêu thích", is_default: false, count: 0, movies: [] }
    ];

    // 5a. User Playlist / Watchlist with movies (GET /baseapi/api/v1/watchlist/with-movie, /users/playlist, /user/playlist, /playlists)
    // Page /user/playlist calls Axios: a.u.get("/baseapi/api/v1/watchlist/with-movie").then(t => { n(t.data), m(t.data[0] || null) })
    // and expects response.data to be an ARRAY directly so that e.map(...) works without crashing!
    if (
      url.includes("watchlist/with-movie") ||
      url.includes("/users/playlist") ||
      url.includes("/user/playlist") ||
      url.includes("/api/v1/users/playlists") ||
      url.includes("/api/v1/user/playlists") ||
      url.includes("/playlists/with-movie")
    ) {
      return JSON.stringify(defaultPlaylists);
    }

    // 5b. Remove movie from playlist (DELETE /baseapi/api/v1/watchlist/remove-movie/:movie_id/:playlist_id)
    if (url.includes("remove-movie") || url.includes("/watchlist/remove-movie/")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        message: "Phim đã được xóa khỏi danh sách",
        success: true
      });
    }

    // 5c. Create new playlist (POST /baseapi/api/v1/watchlist)
    // Frontend does: a.u.post("/baseapi/api/v1/watchlist", { name: x }).then(t => n(e => [...e, t.data]))
    // so t.data must be the created playlist object!
    if (init && init.method && init.method.toUpperCase() === "POST" && (url.includes("/watchlist") || url.includes("watchlist"))) {
      let playlistName = "Danh sách mới";
      try {
        if (bodyStr) {
          const pb = typeof bodyStr === "string" ? JSON.parse(bodyStr) : bodyStr;
          if (pb && pb.name) playlistName = pb.name;
        }
      } catch (e) {}
      const createdItem = {
        id: Date.now(),
        name: playlistName,
        is_default: false,
        count: 0,
        movies: []
      };
      return JSON.stringify(createdItem);
    }

    // 5d. Update / Delete playlist (PATCH/DELETE /baseapi/api/v1/watchlist/:id)
    if (init && init.method && (init.method.toUpperCase() === "PATCH" || init.method.toUpperCase() === "DELETE") && (url.includes("/watchlist") || url.includes("watchlist"))) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        message: "Thao tác danh sách thành công",
        success: true
      });
    }

    // 5e. Movie page watchlist check (checkWatchlist)
    if (url.includes("checkWatchlist") || url.includes("ckWatchlist") || url.includes("/watchlist/checkWatchlist")) {
      const defaultCheckWatchlist = [
        { id: 1, name: "Xem sau", check: false },
        { id: 2, name: "Phim yêu thích", check: false }
      ];
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        data: defaultCheckWatchlist,
        result: defaultCheckWatchlist,
        items: defaultCheckWatchlist,
        isBookmarked: false,
        isWatchlist: false
      });
    }

    if (url.includes("addWatchlist") || url.includes("/watchlist/addWatchlist")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        message: "Thao tác danh sách theo dõi thành công.",
        data: true,
        result: true,
        isBookmarked: true,
        isWatchlist: true
      });
    }

    // 5f. General watchlist fallback:
    if (url.includes("/watchlist") || url.includes("watchlist")) {
      return JSON.stringify(defaultPlaylists);
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

    // 7. Movie Favorites & Bookmarks
    if (url.includes("/favorites") || url.includes("/favourite") || url.includes("/favourites")) {
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        data: [],
        items: [],
        meta: {
          page: 1,
          limit: 18,
          total: 0,
          totalPages: 1,
          totalPage: 1
        }
      });
    }

    // 8. Bookmarks (movie, actor, or general)
    if (url.includes("/bookmarks") || url.includes("bookmarks")) {
      if (init && init.method && init.method.toUpperCase() === "DELETE") {
        return JSON.stringify({
          status: true,
          statusCode: 200,
          code: 200,
          message: "Xóa bookmark thành công",
          success: true
        });
      }
      if (url.includes("/bookmarks/movie") || url.includes("/bookmarks/actor")) {
        return JSON.stringify({
          status: true,
          statusCode: 200,
          code: 200,
          data: [],
          items: [],
          meta: {
            page: 1,
            limit: 18,
            total: 0,
            totalPages: 1,
            totalPage: 1
          }
        });
      }
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        data: {
          movieIds: [],
          actorIds: [],
          movies: [],
          actors: [],
          data: [],
          meta: {
            page: 1,
            limit: 18,
            total: 0,
            totalPages: 1,
            totalPage: 1
          }
        },
        movieIds: [],
        actorIds: [],
        items: [],
        meta: {
          page: 1,
          limit: 18,
          total: 0,
          totalPages: 1,
          totalPage: 1
        }
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

    // 10. Notifications (GET /notifications, PATCH /notifications/:id, POST /notifications/mark-all-as-read)
    if (url.includes("/notifications") || url.includes("/notification") || url.includes("notification")) {
      if (init && init.method && (init.method.toUpperCase() === "PATCH" || init.method.toUpperCase() === "POST")) {
        return JSON.stringify({
          status: true,
          statusCode: 200,
          code: 200,
          message: "Thao tác thông báo thành công",
          success: true
        });
      }
      const emptyNoti = {
        notifications: [],
        notificationsMovie: [],
        notificationsOther: [],
        unreadCountMovie: 0,
        unreadCountOther: 0,
        unreadCount: 0,
        unread_count: 0
      };
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        notifications: [],
        notificationsMovie: [],
        notificationsOther: [],
        unreadCountMovie: 0,
        unreadCountOther: 0,
        unreadCount: 0,
        unread_count: 0,
        data: emptyNoti,
        result: emptyNoti,
        items: [],
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1,
          totalPage: 1
        }
      });
    }

    // 11. Profile Update & Upload Avatar
    if (url.includes("/upload-avatar") || url.includes("/update-user")) {
      const realUser = getRealProvisionedUser();
      const u = {
        id: realUser?.id || 999999,
        name: realUser?.name || "VIP Cinema Pro",
        email: realUser?.email || "vip@rophim.vip",
        role: "VIP",
        is_vip: true,
        is_premium: true,
        avatar: "/images/avatars/10.jpg"
      };
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        message: "Cập nhật thành công",
        user: u,
        data: u
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

  // ─── CHOPHIM VIP 2099 & PERSISTENT PROFILE CUSTOMIZATION ───
  function getChophimVipUser() {
    let saved = {};
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const raw = window.localStorage.getItem("chophim-auth-state");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.user && typeof parsed.user === "object") {
            saved = parsed.user;
          }
        }
      }
    } catch (e) {}

    return {
      id: saved.id || "vip_cinema_pro_2099",
      displayName: saved.displayName || "VIP Cinema Pro",
      name: saved.name || "VIP Cinema Pro",
      email: saved.email || "vip.cinemapro@chophim.fun",
      role: "vip",
      roles: ["vip", "premium", "admin"],
      subscriptionTier: "premium",
      subscriptionExpiresAt: "2099-12-31T23:59:59.000Z",
      isVip: true,
      isAdmin: true,
      avatar: saved.avatar || null,
      avatarUrl: saved.avatarUrl || null,
      avatarFrame: saved.avatarFrame !== undefined ? saved.avatarFrame : null,
      selectedEmoji: saved.selectedEmoji !== undefined ? saved.selectedEmoji : null,
      showPremiumBadge: saved.showPremiumBadge !== undefined ? saved.showPremiumBadge : true,
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

      // Seed localStorage preserving existing custom emoji and frame
      try {
        const existing = window.localStorage.getItem("chophim-auth-state");
        if (existing) {
          const parsed = JSON.parse(existing);
          if (parsed && parsed.user && typeof parsed.user === "object") {
            Object.assign(vipUser, parsed.user);
          }
        }
        vipUser.subscriptionTier = "premium";
        vipUser.cpCoinBalance = 999999999;
        vipUser.role = "vip";
        window.localStorage.setItem("chophim-auth-state", JSON.stringify({
          user: vipUser,
          isBlocked: false,
          blockInfo: null,
          checkedAt: Date.now() + 86400000000
        }));
        window.localStorage.setItem("chophim:popunder-last-shown", String(Date.now() + 86400000000));
        window.localStorage.setItem("chophim:banner-blocked-until", String(Date.now() + 86400000000));
        window.localStorage.setItem("chophim:popup-ad-dismissed-until", String(Date.now() + 86400000000));
      } catch (e) {}

      // Protect chophim-auth-state from being overwritten with null/empty while preserving emoji & frame
      if (typeof window.Storage !== "undefined" && window.Storage.prototype) {
        const origSetItem = window.Storage.prototype.setItem;
        window.Storage.prototype.setItem = function (key, val) {
          if (key === "chophim-auth-state") {
            try {
              const parsed = JSON.parse(val);
              if (parsed && parsed.user && typeof parsed.user === "object") {
                parsed.user.subscriptionTier = "premium";
                parsed.user.cpCoinBalance = 999999999;
                parsed.user.role = "vip";
                if (!parsed.user.roles || !parsed.user.roles.includes("admin")) {
                  parsed.user.roles = ["vip", "premium", "admin"];
                }
                val = JSON.stringify(parsed);
              } else {
                val = JSON.stringify({
                  user: getChophimVipUser(),
                  isBlocked: false,
                  blockInfo: null,
                  checkedAt: Date.now() + 86400000000
                });
              }
            } catch (e) {
              val = JSON.stringify({
                user: getChophimVipUser(),
                isBlocked: false,
                blockInfo: null,
                checkedAt: Date.now() + 86400000000
              });
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
                  user: getChophimVipUser(),
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

    // 4. Update profile (save selectedEmoji, avatarFrame, showPremiumBadge, displayName, avatarUrl)
    if (url.includes("/api/auth/update-profile")) {
      let payload = {};
      if (init && init.body) {
        try {
          payload = typeof init.body === "string" ? JSON.parse(init.body) : init.body;
        } catch (e) {}
      }
      const updatedUser = Object.assign({}, u, payload);

      // Persist immediately into localStorage
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          const stateObj = {
            user: updatedUser,
            isBlocked: false,
            blockInfo: null,
            checkedAt: Date.now() + 86400000000
          };
          window.localStorage.setItem("chophim-auth-state", JSON.stringify(stateObj));
        }
      } catch (e) {}

      // Broadcast update across tabs
      try {
        if (typeof window !== "undefined" && typeof window.BroadcastChannel !== "undefined") {
          const authChannel = new window.BroadcastChannel("chophim-auth");
          authChannel.postMessage({
            type: "auth-state",
            user: updatedUser,
            isBlocked: false,
            blockInfo: null,
            checkedAt: Date.now() + 86400000000
          });
        }
      } catch (e) {}

      return JSON.stringify({
        user: updatedUser,
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

    // 10. Comment & Chat Interception (Bypass 401 & Prevent undefined comment crash)
    if (url.includes("/api/comments") || url.includes("/api/v1/comments")) {
      const method = (init && init.method ? init.method.toUpperCase() : "GET");

      // POST new comment or reply
      if (method === "POST" && !url.includes("/like") && !url.includes("/dislike") && !url.includes("/pin")) {
        let body = {};
        if (init && init.body) {
          try { body = typeof init.body === "string" ? JSON.parse(init.body) : init.body; } catch (e) {}
        }
        const commentId = "cp_cmt_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
        const newComment = {
          id: commentId,
          content: body.content || "",
          isSpoiler: Boolean(body.isSpoiler),
          isPinned: false,
          parentId: body.parentId || null,
          replyCount: 0,
          likesCount: 0,
          dislikesCount: 0,
          isLiked: false,
          isDisliked: false,
          userId: u.id || "vip_cinema_pro_2099",
          user: {
            id: u.id || "vip_cinema_pro_2099",
            displayName: u.displayName || "VIP Cinema Pro",
            avatarUrl: u.avatarUrl || null,
            avatarFrame: u.avatarFrame || null,
            selectedEmoji: u.selectedEmoji || null,
            subscriptionTier: "premium",
            role: "vip",
            showPremiumBadge: u.showPremiumBadge !== false
          },
          createdAt: new Date().toISOString()
        };

        return JSON.stringify({
          success: true,
          comment: newComment,
          data: newComment,
          result: newComment
        });
      }

      // DELETE comment
      if (method === "DELETE") {
        return JSON.stringify({ success: true, message: "Đã xóa bình luận" });
      }
    }

    if (url.includes("/api/comments/like") || url.includes("/api/comments/dislike")) {
      return JSON.stringify({ success: true, ok: true });
    }

    if (url.includes("/api/comments/pin")) {
      return JSON.stringify({ success: true });
    }

    if (url.includes("/api/comments/reply")) {
      return JSON.stringify({ replies: [], hasNextPage: false });
    }

    // 11. Block direct ad requests
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
      if (typeof document === "undefined" || !document || typeof document.getElementById !== "function") return;

      // If anon trigger is present in DOM, simulate auto-login and dispatch update
      const anonTrigger = document.getElementById("user-anon-trigger");
      if (anonTrigger) {
        try {
          const u = getMephimVipUser();
          if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.setItem("mephim_logged_in_user", JSON.stringify({
              username: u.username,
              email: u.email
            }));
            window.dispatchEvent(new Event("mephim_progress_updated"));
          }
        } catch (e) {}
      }

      // Close login modal dropdown if currently expanded (button containing "ĐĂNG NHẬP")
      if (typeof document.querySelector === "function") {
        const loginPopup = document.querySelector(".user-anon-trigger ~ div, div:has(input[placeholder*='đăng nhập' i])");
        if (loginPopup) {
          const closeBtn = loginPopup.querySelector("button:has(svg), .close-btn, button[aria-label*='close' i]");
          if (closeBtn) {
            try { closeBtn.click(); } catch (e) {}
          }
        }
      }
    }

    if (typeof window !== "undefined" && typeof document !== "undefined" && typeof document.addEventListener === "function") {
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
    if (url && (url.includes("/histories") || url.includes("/history") || url.includes("/watch-progress"))) {
      if (data && typeof data === "object") {
        if (!Array.isArray(data.data)) data.data = [];
        if (!Array.isArray(data.items)) data.items = [];
        if (!data.meta || typeof data.meta !== "object") {
          data.meta = { page: 1, limit: 18, total: 0, totalPages: 1, totalPage: 1 };
        }
      }
      return data;
    }
    if (url && (url.includes("/favorites") || url.includes("/favourite") || url.includes("/favourites"))) {
      if (data && typeof data === "object") {
        if (!Array.isArray(data.data)) data.data = [];
        if (!Array.isArray(data.items)) data.items = [];
        if (!data.meta || typeof data.meta !== "object") {
          data.meta = { page: 1, limit: 18, total: 0, totalPages: 1, totalPage: 1 };
        }
      }
      return data;
    }
    if (url && (url.includes("/bookmarks") || url.includes("bookmarks"))) {
      if (url.includes("/bookmarks/movie") || url.includes("/bookmarks/actor")) {
        if (data && typeof data === "object") {
          if (!Array.isArray(data.data)) data.data = [];
          if (!Array.isArray(data.items)) data.items = [];
          if (!data.meta || typeof data.meta !== "object") {
            data.meta = { page: 1, limit: 18, total: 0, totalPages: 1, totalPage: 1 };
          }
        }
        return data;
      }
      const bookmarkData = {
        movieIds: (data && Array.isArray(data.movieIds)) ? data.movieIds : ((data && data.data && Array.isArray(data.data.movieIds)) ? data.data.movieIds : []),
        actorIds: (data && Array.isArray(data.actorIds)) ? data.actorIds : ((data && data.data && Array.isArray(data.data.actorIds)) ? data.data.actorIds : []),
        items: (data && Array.isArray(data.items)) ? data.items : ((data && data.data && Array.isArray(data.data.items)) ? data.data.items : []),
        data: [],
        meta: { page: 1, limit: 18, total: 0, totalPages: 1, totalPage: 1 }
      };
      if (data && typeof data === "object") {
        data.data = bookmarkData;
        data.status = true;
        data.code = 200;
        data.meta = { page: 1, limit: 18, total: 0, totalPages: 1, totalPage: 1 };
      }
      return data;
    }
    if (url && (url.includes("/notification") || url.includes("notification"))) {
      if (data && typeof data === "object") {
        if (!Array.isArray(data.notifications)) data.notifications = [];
        if (!Array.isArray(data.notificationsMovie)) data.notificationsMovie = [];
        if (!Array.isArray(data.notificationsOther)) data.notificationsOther = [];
        if (typeof data.unreadCountMovie !== "number") data.unreadCountMovie = 0;
        if (typeof data.unreadCountOther !== "number") data.unreadCountOther = 0;
        if (typeof data.unreadCount !== "number") data.unreadCount = 0;
        if (!data.meta || typeof data.meta !== "object") {
          data.meta = { page: 1, limit: 10, total: 0, totalPages: 1, totalPage: 1 };
        }
        if (data.data && typeof data.data === "object") {
          if (!Array.isArray(data.data.notifications)) data.data.notifications = [];
          if (!Array.isArray(data.data.notificationsMovie)) data.data.notificationsMovie = [];
          if (!Array.isArray(data.data.notificationsOther)) data.data.notificationsOther = [];
          if (typeof data.data.unreadCountMovie !== "number") data.data.unreadCountMovie = 0;
          if (typeof data.data.unreadCountOther !== "number") data.data.unreadCountOther = 0;
          if (typeof data.data.unreadCount !== "number") data.data.unreadCount = 0;
          if (!data.data.meta || typeof data.data.meta !== "object") {
            data.data.meta = { page: 1, limit: 10, total: 0, totalPages: 1, totalPage: 1 };
          }
        }
      }
      return data;
    }
    if (url && (url.includes("watchlist/with-movie") || url.includes("/users/playlist") || url.includes("/user/playlist") || (url.includes("/playlist") && !url.includes(".js") && !url.includes(".css")))) {
      const defaultPlaylists = [
        { id: 1, name: "Danh sách mặc định", is_default: true, count: 0, movies: [] },
        { id: 2, name: "Phim yêu thích", is_default: false, count: 0, movies: [] }
      ];
      if (!Array.isArray(data)) {
        if (data && Array.isArray(data.data)) return data.data;
        if (data && Array.isArray(data.items)) return data.items;
        if (data && Array.isArray(data.result)) return data.result;
        return defaultPlaylists;
      }
      return data.map(item => ({
        ...item,
        movies: Array.isArray(item.movies) ? item.movies : []
      }));
    }
    if (url && (url.includes("checkWatchlist") || url.includes("ckWatchlist") || (url.includes("watchlist") && !url.includes("addWatchlist")))) {
      if (data && typeof data === "object") {
        const defaultWatchlist = [
          { id: 1, name: "Xem sau", check: false },
          { id: 2, name: "Phim yêu thích", check: false }
        ];
        if (!Array.isArray(data.data)) {
          data.data = defaultWatchlist;
        }
        if (!Array.isArray(data.items)) {
          data.items = defaultWatchlist;
        }
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
          comment: fallbackComment,
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
            comment: fallbackComment,
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
              if (this.responseType === "json") return { status: true, code: 200, message: "Bình luận phim thành công.", comment: fallbackComment, data: fallbackComment, result: fallbackComment };
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
    host.includes("clubc") ||
    host.includes("darkbytes") ||
    path.includes("embed") ||
    path.includes("/v/") ||
    path.includes("/video/");

  // ═══════════════════════════════════════════════════════════════
  // 1. IFRAME EMBED PLAYER GUARD KILLER & STREAM SNIFFER
  // ═══════════════════════════════════════════════════════════════
  if (isEmbedPlayer) {
    try {
      const origGetElementById = Document.prototype.getElementById;
      Document.prototype.getElementById = function (id) {
        const el = origGetElementById.apply(this, arguments);
        if (id === "stream-bootstrap" && el && !el._cpro_hooked) {
          el._cpro_hooked = true;
          const defuse = (raw) => {
            try {
              const parsed = JSON.parse(raw);
              if (parsed && parsed.browserGuard) {
                parsed.browserGuard.detect_devtools = false;
                parsed.browserGuard.anti_adblock = false;
                parsed.browserGuard.devtools_redirect_url = "";
                parsed.browserGuard.block_shortcuts = false;
                parsed.browserGuard.block_context_menu = false;
                return JSON.stringify(parsed);
              }
            } catch (e) {}
            return raw;
          };
          let _text = defuse(el.textContent);
          Object.defineProperty(el, "textContent", {
            get() { return defuse(_text); },
            set(val) { _text = defuse(val); },
            configurable: true
          });
        }
        return el;
      };
    } catch (e) {}

    let activePlayer = null;
    const dummyGuard = {
      version: "guard-7",
      devtoolsBuild: "iframe-local-5",
      detectDevtools: true,
      ready: Promise.resolve(),
      isBlocked: () => false,
      waitForAccess: () => Promise.resolve(),
      reportAdResource: () => {},
      status: () => ({
        version: "guard-7",
        devtoolsBuild: "iframe-local-5",
        devtoolsLocal: "Chưa có tín hiệu cục bộ",
        devtoolsRedirect: false,
        redirectStarted: false,
        blockShortcuts: false,
        antiAdblock: false,
        detectDevtools: true,
        devtoolsSessionLocked: false,
        devtoolsRetainedLock: false,
        action: "none",
        css: "Tắt",
        network: "Tắt",
        devtools: "Tắt trong admin",
        lastKey: "Chưa nhận phím kiểm tra",
        frame: "Embed độc lập",
        parentVersion: "guard-7",
        parentAds: "Tắt",
        adResources: 0,
        uncertainNetwork: false,
        blocked: false
      }),
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
      sessionStorage.removeItem("stream-guard:devtools-session-lock:v1");
      sessionStorage.removeItem("stream-guard:session-lock:v1");
    } catch (e) {}

    try {
      Object.defineProperty(window, "streamGuard", {
        get: () => dummyGuard,
        set: () => {},
        configurable: true
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
          stack.includes("guard-") ||
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
        ".jw-skip:not([data-bypassed]), .videoAdUiSkipButton:not([data-bypassed]), .ytp-ad-skip-button:not([data-bypassed]), .skip-ad:not([data-bypassed]), .ad-skip:not([data-bypassed])"
      );
      if (skipBtn) {
        skipBtn.setAttribute("data-bypassed", "1");
        if (typeof skipBtn.click === "function") {
          try { skipBtn.click(); } catch (e) {}
        }
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
    const appendEmbedStyle = () => {
      const target = document.head || document.documentElement;
      if (target && !embedStyle.parentNode) target.appendChild(embedStyle);
    };
    if (document.head || document.documentElement) {
      appendEmbedStyle();
    } else {
      document.addEventListener("DOMContentLoaded", appendEmbedStyle, { once: true });
    }

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
  var capturedStreamUrl = (typeof window !== "undefined" && window.capturedStreamUrl) || "";
  var currentSpeed = 1.0;
  var currentVolume = 1.0;
  var isHdrEnabled = false;
  var isTheaterMode = false;

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
    localStorage.removeItem("RO_CAPTURED_STREAM");
    window.addEventListener("storage", function (e) {
      if (e.key === "RO_CAPTURED_STREAM" && e.newValue) {
        checkAndCaptureUrl(e.newValue);
      }
    });
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
      if (typeof window !== "undefined") window.capturedStreamUrl = clean;
      try { localStorage.setItem("RO_CAPTURED_STREAM", clean); } catch (e) {}
      try {
        if (typeof window !== "undefined" && window.postMessage) {
          window.postMessage({ type: "CINEMA_PRO_STREAM_FOUND", url: clean, title: (typeof document !== "undefined" ? document.title : "") }, "*");
        }
      } catch (e) {}
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

    // GhienPhim, CoiPhim & DuPhim In-Memory Playlist & Player Sniffing
    try {
      if (Array.isArray(window.sources)) {
        window.sources.forEach(s => {
          if (s && typeof s === "string") checkAndCaptureUrl(s);
        });
      }
      if (Array.isArray(window.playlist)) {
        window.playlist.forEach(s => {
          if (s && typeof s === "string") checkAndCaptureUrl(s);
        });
      }
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

    function safeSendCommandToPlayer(cmd) {
      try {
        if (typeof sendCommandToPlayer === "function") {
          sendCommandToPlayer(cmd);
          return;
        }
        if (typeof window !== "undefined" && typeof window.sendCommandToPlayer === "function") {
          window.sendCommandToPlayer(cmd);
          return;
        }
        document.querySelectorAll("iframe").forEach(f => {
          try { f.contentWindow.postMessage(cmd, "*"); } catch (e) {}
        });
      } catch (e) {}
    }

    scanIframesForStreams();
    if (capturedStreamUrl) return capturedStreamUrl;
    scanPerformanceResources();
    if (capturedStreamUrl) return capturedStreamUrl;
    scanPageScriptsAndDom();
    if (!capturedStreamUrl) {
      safeSendCommandToPlayer({ type: "RO_STREAM_PING" });
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

  // ─── SAFE AD API CHECKER (NEVER THROWS REFERENCE ERROR) ───
  function safeIsAdApi(url) {
    if (!url || typeof url !== "string") return false;
    const u = url.toLowerCase();
    if (u.includes(".m3u8") || u.includes(".mp4") || u.includes(".ts") || u.includes(".m4s")) return false;

    // Chặn triệt để các mạng quảng cáo và tracker rác (tránh ERR_BLOCKED_BY_CLIENT)
    if (
      u.includes("sharethis.com") ||
      u.includes("driverhugoverblown.com") ||
      u.includes("vhyohxarqz.in") ||
      u.includes("mayhapmonisms.com") ||
      u.includes("cloudflareinsights.com") ||
      u.includes("acscdn.com") ||
      u.includes("yougetwhatyoupayfor.net") ||
      u.includes("chaseherbalpasty.com") ||
      u.includes("streamxx.net/storage/embed_ads") ||
      u.includes("streamxx.net/ads") ||
      u.includes("streamxx.net/api/t/") ||
      u.includes("embed_ads") ||
      u.includes("pause_ads") ||
      u.includes("bom88") ||
      u.includes("tin888") ||
      u.includes("net88") ||
      u.includes("gem88") ||
      u.includes("tvc_") ||
      u.includes("/assets/tvc/") ||
      u.includes("tvc-pre-roll")
    ) {
      return true;
    }

    if (u.includes("_rsc") || u.includes(".rsc") || u.includes("_next/") || u.includes(".js")) return false;
    try {
      if (typeof isAdApi === "function") return isAdApi(url);
      if (typeof window !== "undefined" && typeof window.isAdApi === "function") return window.isAdApi(url);
    } catch (e) {}

    return (
      u.includes("/ads") ||
      u.includes("/banners") ||
      u.includes("/banner/") ||
      u.includes("/api/widget/data")
    );
  }

  // ─── HOOK FETCH TRÊN TRANG CHÍNH & CHẶN API BANNER ───
  const origFetchMain = window.fetch;
  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input?.url || "";
    if (safeIsAdApi(url)) {
      console.log("[Web Enhancer] Đã chặn triệt để API banner:", url);
      const emptyPayload = JSON.stringify({
        status: 200,
        success: true,
        version: 1,
        items: [],
        data: [],
        banners: [],
        result: [],
        notificationsMovie: [],
        notificationsOther: [],
        unreadCountMovie: 0,
        unreadCountOther: 0
      });
      if (typeof Response !== "undefined") {
        return new Response(emptyPayload, {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
      return {
        status: 200,
        ok: true,
        headers: { get: (h) => (h && h.toLowerCase() === "content-type" ? "application/json" : null) },
        json: async () => JSON.parse(emptyPayload),
        text: async () => emptyPayload,
        clone: function () { return this; }
      };
    }
    try {
      const mockRes = typeof getRophimMockResponse === "function"
        ? getRophimMockResponse(url, init)
        : (typeof window !== "undefined" && typeof window.getRophimMockResponse === "function" ? window.getRophimMockResponse(url, init) : null);
      if (mockRes) return mockRes;
    } catch (e) {}
    try {
      if (init && init.headers) {
        if (typeof init.headers.get === "function") {
          const a = init.headers.get("Authorization") || init.headers.get("authorization");
          if (a && a.includes("cinema-pro-vip")) {
            const realTok = typeof window !== "undefined" && window.localStorage ? window.localStorage.getItem("guestAccessToken") : null;
            if (realTok && !realTok.includes("cinema-pro-vip")) {
              init.headers.set("Authorization", "Bearer " + realTok);
            } else if (typeof init.headers.delete === "function") {
              init.headers.delete("Authorization");
              init.headers.delete("authorization");
            } else {
              init.headers.set("Authorization", "");
            }
          }
        } else if (typeof init.headers === "object") {
          const a = init.headers.Authorization || init.headers.authorization;
          if (a && String(a).includes("cinema-pro-vip")) {
            const realTok = typeof window !== "undefined" && window.localStorage ? window.localStorage.getItem("guestAccessToken") : null;
            if (realTok && !realTok.includes("cinema-pro-vip")) {
              init.headers.Authorization = "Bearer " + realTok;
            } else {
              delete init.headers.Authorization;
              delete init.headers.authorization;
            }
          }
        }
      }
    } catch (e) {}
    try {
      const isFetchCommentSubmit = url && (typeof url === "string") && (url.includes("/comments") || url.includes("/api/v1/comments")) &&
        !url.includes("/comments/movie/") && !url.includes("/reactions") && !url.includes("/like") &&
        !url.includes("/get-child-comments") && !url.includes("/report") &&
        (Boolean(init && init.body) || (init && init.method && init.method.toUpperCase() === "POST"));
      
      if (isFetchCommentSubmit) {
        let realTok = "";
        let realUserId = null;
        try {
          if (typeof window !== "undefined" && window.localStorage) {
            const h = window.location.hostname || "";
            const cached = window.localStorage.getItem("cinema_pro_real_user_" + h) || window.localStorage.getItem("cinema_pro_real_user");
            if (cached) {
              const u = JSON.parse(cached);
              if (u && u.access_token) {
                realTok = u.access_token;
                realUserId = u.id;
              }
            }
            if (!realTok) realTok = window.localStorage.getItem("guestAccessToken") || "";
          }
        } catch(e) {}

        if (init && typeof init === "object") {
          init.headers = init.headers || {};
          if (realTok && !realTok.includes("cinema-pro-vip")) {
            if (typeof init.headers.set === "function") {
              init.headers.set("Authorization", "Bearer " + realTok);
            } else if (typeof init.headers === "object") {
              init.headers["Authorization"] = "Bearer " + realTok;
            }
          }
          if (init.body && typeof init.body === "string" && realUserId) {
            try {
              const parsed = JSON.parse(init.body);
              if (parsed && typeof parsed === "object") {
                parsed.userId = realUserId;
                init.body = JSON.stringify(parsed);
              }
            } catch(e) {}
          }
        }
      }
    } catch(e) {}
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
    try {
      if (typeof handleRophimFetchResponse === "function") {
        return handleRophimFetchResponse(fetchPromise, url, init);
      }
      if (typeof window !== "undefined" && typeof window.handleRophimFetchResponse === "function") {
        return window.handleRophimFetchResponse(fetchPromise, url, init);
      }
    } catch (e) {}
    return fetchPromise;
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

    const origSetRequestHeader = xhr.setRequestHeader;
    xhr.setRequestHeader = function (header, value) {
      try {
        if (header && typeof header === "string" && header.toLowerCase() === "authorization") {
          if (value && typeof value === "string" && value.includes("cinema-pro-vip")) {
            const realTok = typeof window !== "undefined" && window.localStorage ? window.localStorage.getItem("guestAccessToken") : null;
            if (realTok && !realTok.includes("cinema-pro-vip")) {
              value = "Bearer " + realTok;
            } else {
              return;
            }
          }
        }
      } catch (e) {}
      if (origSetRequestHeader) return origSetRequestHeader.apply(this, arguments);
    };
    
    const origSend = xhr.send;
    xhr.send = function (body) {
      if (safeIsAdApi(targetUrl)) {
        try {
          Object.defineProperty(xhr, "status", { value: 200, writable: false });
          Object.defineProperty(xhr, "responseText", { value: "{}", writable: false });
        } catch (e) {}
        return;
      }
      try {
        const isCommentSubmit = targetUrl && (targetUrl.includes("/comments") || targetUrl.includes("/api/v1/comments")) &&
          !targetUrl.includes("/comments/movie/") && !targetUrl.includes("/reactions") && !targetUrl.includes("/like") &&
          !targetUrl.includes("/get-child-comments") && !targetUrl.includes("/report");
        
        if (isCommentSubmit) {
          xhr._cpro_sent_body = body;
          xhr._cpro_target_url = targetUrl;

          let realTok = "";
          let realUserId = null;
          try {
            if (typeof window !== "undefined" && window.localStorage) {
              const h = window.location.hostname || "";
              const cached = window.localStorage.getItem("cinema_pro_real_user_" + h) || window.localStorage.getItem("cinema_pro_real_user");
              if (cached) {
                const u = JSON.parse(cached);
                if (u && u.access_token) {
                  realTok = u.access_token;
                  realUserId = u.id;
                }
              }
              if (!realTok) realTok = window.localStorage.getItem("guestAccessToken") || "";
            }
          } catch(e) {}

          if (realTok && !realTok.includes("cinema-pro-vip") && origSetRequestHeader) {
            try {
              origSetRequestHeader.call(xhr, "Authorization", "Bearer " + realTok);
            } catch (e) {}
          }

          if (body && typeof body === "string") {
            try {
              const parsed = JSON.parse(body);
              if (parsed && typeof parsed === "object") {
                if (realUserId) parsed.userId = realUserId;
                body = JSON.stringify(parsed);
                xhr._cpro_parsed_body = parsed;
              }
            } catch(e) {}
          }
        }
      } catch(e) {}
      try {
        const mockStr = typeof getRophimMockXhr === "function"
          ? getRophimMockXhr(targetUrl, body)
          : (typeof window !== "undefined" && typeof window.getRophimMockXhr === "function" ? window.getRophimMockXhr(targetUrl, body) : null);
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
      } catch (e) {}
      xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
          try {
            if (typeof handleRophimXhrResponse === "function") {
              handleRophimXhrResponse(xhr, targetUrl);
            } else if (typeof window !== "undefined" && typeof window.handleRophimXhrResponse === "function") {
              window.handleRophimXhrResponse(xhr, targetUrl);
            }
          } catch (e) {}
        }
      });
      xhr.addEventListener("load", function () {
        try {
          if (xhr.responseText && (xhr.responseText.includes(".m3u8") || xhr.responseText.includes("/hls/") || xhr.responseText.includes(".mpd") || xhr.responseText.includes(".mp4"))) {
            const found = findStreamMatches(xhr.responseText);
            found.forEach(u => checkAndCaptureUrl(u));
          }
        } catch (e) {}
        try {
          if (typeof handleRophimXhrResponse === "function") {
            handleRophimXhrResponse(xhr, targetUrl);
          } else if (typeof window !== "undefined" && typeof window.handleRophimXhrResponse === "function") {
            window.handleRophimXhrResponse(xhr, targetUrl);
          }
        } catch (e) {}
      });
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

  if (typeof window !== "undefined") {
    window.unwrapStreamUrl = typeof unwrapStreamUrl === "function" ? unwrapStreamUrl : undefined;
    window.ensureStreamUrl = typeof ensureStreamUrl === "function" ? ensureStreamUrl : undefined;
    window.isNoRefererCdn = typeof isNoRefererCdn === "function" ? isNoRefererCdn : undefined;
    window.capturedStreamUrl = typeof capturedStreamUrl !== "undefined" ? capturedStreamUrl : "";
    window.getCapturedStreamUrl = () => (typeof capturedStreamUrl !== "undefined" && capturedStreamUrl) || (typeof window !== "undefined" && window.capturedStreamUrl) || "";
  }



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
        key === "giovang_tvc_pre_roll_daily" ||
        (typeof key === "string" && (key.includes("session-lock") || key.includes("stream-guard:")))
      ) return;
      return origSetItem.apply(this, arguments);
    };
    const origGetItem = Storage.prototype.getItem;
    Storage.prototype.getItem = function (key) {
      if (typeof key === "string" && (key.includes("session-lock") || key.includes("stream-guard:"))) return null;
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


  // ═══════════════════════════════════════════════════════════════
  // 3. CSS STYLING & THEATER MODE INJECTION
  // ═══════════════════════════════════════════════════════════════
  const css = "/* ═══════════════════════════════════════════════════════════════\r\n   Cinema Pro Suite - Adblock & Anti-Banner CSS\r\n   Diệt sạch banner catfish, popup, cá cược, video ads\r\n   ═══════════════════════════════════════════════════════════════ */\r\n\r\n/* Xóa sạch mọi container banner quảng cáo */\r\n.ad-container, .ads-holder, .banner-left, .banner-right,\r\ndiv[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"],\r\n.ads-wrapper, #chancoc, .modal-adblock, .adv-holder, .pm-ads,\r\n.hh3d-ads, .dp-ads, .tvhay-ads, .ah-ads, #box-ads, .ah-banner,\r\n.bl-ads, .a47-ads, .ophim-ads, .biphim-ads, .dhtv-ads,\r\n.motphim-ads, .mephim-ads, .ghienphim-ads, .fullphim-ads, .phimhay-ads,\r\n.atvn-ads, .hhkf-ads, .hhpanda-ads, .vst-ads, .p247-ads, .phd-ads, .pbh-ads,\r\n.pv-ads, .btv-ads, .hdo-ads, .chay-ads, .xpp-ads, .ts-ads, .ss-ads,\r\n[class*=\"ad_placement\"], [id*=\"google_ads\"], div[style*=\"z-index: 9999999\"],\r\ndiv[style*=\"zIndex: 9999999\"], div[style*=\"backdrop-filter: blur(25px)\"],\r\n\r\n/* Diệt sạch banner catfish, fixed bottom bar và cá cược */\r\n.catfish, #catfish, .catfish-banner, #catfish-banner, div[class*=\"catfish\"], div[id*=\"catfish\"],\r\ndiv[class*=\"bottom-ads\"], div[class*=\"bottom_ads\"], div[class*=\"bottom-banner\"], div[class*=\"bottom_banner\"],\r\ndiv[id*=\"bottom-ads\"], div[id*=\"bottom_ads\"], div[id*=\"bottom-banner\"], div[id*=\"bottom_banner\"],\r\ndiv[class*=\"footer-ads\"], div[class*=\"footer_ads\"], div[class*=\"footer-banner\"], div[class*=\"footer_banner\"],\r\ndiv[class*=\"floating-banner\"], div[class*=\"floating_banner\"], div[class*=\"float-ads\"], div[class*=\"float_ads\"],\r\ndiv[class*=\"sticky-ads\"], div[class*=\"sticky-banner\"], div[id*=\"sticky-ads\"], div[id*=\"sticky-banner\"],\r\ndiv[class*=\"qc_bottom\"], div[id*=\"qc_bottom\"], div[class*=\"qc-bottom\"], div[id*=\"qc-bottom\"],\r\ndiv[id*=\"box-bottom\"], div[class*=\"box-bottom\"], div[id*=\"ads_bottom\"], div[class*=\"ads_bottom\"],\r\ndiv[id*=\"floating_bottom\"], div[class*=\"floating_bottom\"], div[id*=\"float_bottom\"],\r\n\r\n/* Diệt sạch banner & popup Truyện Tranh (ZetTruyen, TopTruyen, NetTruyen, TruyenQQ, TruyenVN) */\r\n.ads-tool-banner-container, [class*=\"ads-tool-banner-container\"], .close-catfish,\r\n[data-zone], [data-zone=\"top\"], [data-zone=\"top_content\"], [data-zone=\"bottom\"],\r\n.advertisement, #video-chapter, div[id*=\"video-chapter\"], div[class*=\"advertisement\"],\r\n#top-banner-reading-container, #top-banner-reading-container-sub, #mid-banner-reading-container,\r\n#ad_info_top, #ad_info_2, #ad_info, div[id*=\"ad_info\"], div[id*=\"banner-reading\"],\r\n.community-banner, .iframe-content-mobile, .iframe-content-desktop, .banner.text-center,\r\n.ads-static-header, .ads-static-home-detail-chapter, .ads-static-home-middle, div[class*=\"ads-static\"],\r\n.popup_layer, .popup_content, #popup_content,\r\n#ads, .wrapper-ads, .mission-ads, .tr-ads-click, .popup-noti, .notification-popup, #couter-wrapper, [class*=\"mission-ads\"],\r\n\r\n/* Diệt tận gốc Banner Rophim, Thể thao, Giovang, Chuoichien & Thapcam */\r\n.sspp-area, [class*=\"sspp-area\"], [class*=\"sspp_area\"], [class*=\"sspp-\"],\r\n.display-single, [class*=\"display-single\"], .is-demo, [class*=\"is-demo\"],\r\n.is-image, div[class*=\"is-image\"],\r\n#banner_popup, .banner_popup, .banner_inner, .banner_cursor,\r\n.grid_banner_devqc, .devqc-manager-resources, .w-banner_devqc-bd, .banner_devqc-bdn-button,\r\n.devqc-catfish, .gvbanner-catfish, [class*=\"devqc\"], [id*=\"devqc\"],\r\n#banners-bottom-container, .banners-bottom, .banners-bottom-grid, #open-banner-bottom,\r\n.popup-menu, #popupMenu, .floating-balloon-container, .popup-anim, .popup-item,\r\na[data-brand-id], a.seo4s-resolve-link, a[class*=\"seo4s\"],\r\n.bg-modaltrungthuong, .modal-trungthuong, .close-modal-trungthuong,\r\n.tvc-pre-roll, .video-wrapper.tvc-pre-roll, .tvc-pre-roll__video, .tvc-pre-roll__skip, .tvc-pre-roll__link-overlay, [class*=\"tvc-pre-roll\"],\r\n.xlz-ads-item, .block-catfish, .xlz-btn-8xbet, [class*=\"xlz-ads\"],\r\n.odds-comp-logo, a.odds-comp-logo, .grid-match__odds,\r\n.marquee-container, .marquee-box, [class*=\"marquee-container\"],\r\n.odds-button, div[class*=\"odds-button\"], [class*=\"odds-button\"],\r\n.teambox__odds, [class*=\"teambox__odds\"], .btn-odds, [class*=\"btn-odds\"], .match-detail__offer, .offer__buttons, .offer__bet__col, [class*=\"match-detail__offer\"],\r\n.fixture-banner, [class*=\"fixture-banner\"], [class*=\"balloon-wrapper\"], [class*=\"btn-balloon\"], [class*=\"popup-item\"],\r\n[class*=\"banner-pos-\"], [class*=\"ad-strip-pos\"], [class*=\"ad-popup-modal\"], [class*=\"banner-pos\"], [id*=\"banner-pos\"],\r\n.top-ads, .ads-728-90, .adspot-wrap, .adspot-1, .adspot-2, [class*=\"adspot\"], [id*=\"adspot\"], ins[data-revive-id],\r\n.banner-match, .gv-skeleton-banner, [class*=\"gv-skeleton-banner\"],\r\n.ads-layer, [class*=\"ads-layer\"], div.ads-layer,\r\n.player-logo-wrapper, .player-logo-inner, .player-logo-ad, [class*=\"player-logo-\"], [class*=\"player-logo\"],\r\n.bet-button-player, .bet-buttons-container, .bet-button-content, [class*=\"bet-button-player\"], [class*=\"bet-buttons-container\"], [class*=\"bet-button-content\"],\r\n[data-v-77ed3802], [data-v-77cd3882], [data-v-4c9315d7], [data-v-cede0d5b],\r\n.banner-player, .banner-canvas, div.banner-canvas, [class*=\"banner-canvas\"], .banner-container, .banner-content, .banner-image, .banner-item,\r\n[class*=\"banner-player\"], [class*=\"banner-container\"], [class*=\"banner-content\"], [class*=\"banner-image\"], [class*=\"banner-item\"],\r\n.banner-content.active, [class*=\"banner-content\"][class*=\"active\"],\r\n.bet-button, .bet-buttons, [class*=\"bet-button\"], [class*=\"bet-buttons\"], [class*=\"bet-btn\"],\r\n.homepage-toplists-content, section.homepage-toplists-content, [class*=\"homepage-toplists\"],\r\n.toplists-home, [class*=\"toplists-home\"], .devvn-topfive-wrapper, [class*=\"devvn-topfive\"],\r\n.topfive-card, [class*=\"topfive-card\"],\r\n.box-odds-match, [class*=\"box-odds-match\"], .title-odds, [class*=\"title-odds\"],\r\n.gv-bet-dropdown, [class*=\"gv-bet-dropdown\"], .gv-bet-dropdown-toggle, [class*=\"gv-bet-dropdown-toggle\"],\r\n.gv-bet-dropdown-menu, [class*=\"gv-bet-dropdown-menu\"],\r\n.gv-bet-brand-link--image, [class*=\"gv-bet-brand-link\"], .gv-bet-brand-link__img,\r\na[aria-label=\"Top Nhà Cái\"], img[src*=\"nav-toplist.svg\"], img[src*=\"nav-active-toplist.svg\"],\r\nimg[src*=\"kbv.svg\"], img[src*=\"bet-net88\"], img[src*=\"bet-gem88\"],\r\n.sticky-message, .sticky-announcement, [class*=\"sticky-announcement\"], [class*=\"sticky-message\"],\r\n.sticky-header, .sticky-icon-inline, .sticky-title, .sticky-content-text,\r\n.detail-live-brand, [class*=\"detail-live-brand\"], .detail-live-brand-title, .detail-live-brand-logo,\r\n[id*=\"notification-banner\"], [class*=\"notification-banner\"],\r\n.notification-banner-message-wrapper, .notification-banner-message-item, .gwd_notification,\r\n#betbutton-world-cup, a.btn-bet, a.bet-cta, .adspot-55, .adspot-56, .adspot-57,\r\n#corner-start-popup, .corner-start-popup, .corner-start-popup-backdrop, .corner-start-popup-content, .corner-start-popup-inner,\r\n.corner-popup-wrap, .corner-popup-box, [class*=\"corner-popup\"], [id*=\"corner-popup\"],\r\n.block-balloon-right, .block-balloon-left, .close-balloon-left, .close-balloon-right, [class*=\"balloon-\"],\r\n.bookmaker-title, .tf-section, .tf-theme-style4, [class*=\"tf-s3-\"], [class*=\"tf-section\"],\r\n.fixed-ads, .fixed-ads-1, .block-fixed-ads-1, [class*=\"block-fixed-ads\"], [class*=\"fixed-ads\"],\r\n.live-ads-temp-1, .live-ads-temp-2, .live-ads-temp-3, .live-ads-temp-4, .live-ads-temp-5, [class*=\"live-ads-temp\"],\r\n.left-ads, .right-ads,\r\nimg[alt*=\"FB88_banner_player\"], img[alt*=\"net-88-banner-player\"], img[alt*=\"net-88-logo\"], img[alt*=\"banner_player\"],\r\nimg[src*=\"1920x60\"], img[src*=\"cdnvip.chuoichientv.net\"], img[src*=\"c5735ef8\"],\r\na[href*=\"net88.boats\"], a[href*=\"logolive-30x30\"],\r\nimg[src*=\"giovang-popup\"], img[src*=\"hit.club\"], img[src*=\"go88\"], img[src*=\"sun.win\"],\r\nimg[src*=\"1280x1280px\"], img[src*=\"balloon_1111\"], img[src*=\"FB88\"], img[src*=\"fb88\"], img[src*=\"banner_player\"],\r\nimg[src*=\"net88\"], img[src*=\"NET88\"], img[src*=\"xBet\"],\r\nimg[src*=\"/images/company/\"], img[src*=\"company\"], img[src*=\"21-1.png\"], img[alt=\"company\"],\r\na[href*=\"15.235.211.192\"], a[href*=\"top-nha-cai\"], a[href*=\"xoilacz\"], a[href*=\"fb88.com\"],\r\na[href*=\"154.82.\"], a[href*=\"2138046\"], a[href*=\"9922\"],\r\nimg[src*=\"/media/\"][src*=\".gif\"],\r\na[href*=\"vsbet\"], a[href*=\"bet88\"], a[href*=\"colatv\"], a[href*=\"colascore\"], a[href*=\"kubet\"], a[href*=\"fun88\"],\r\na[href*=\"w88\"], a[href*=\"fb88\"], a[href*=\"bk8\"], a[href*=\"casino\"], a[href*=\"nhacai\"], a[href*=\"nohu\"],\r\na[href*=\"taixiu\"], a[href*=\"gamebai\"], a[href*=\"keonhacai\"], a[href*=\"bongda\"], a[href*=\"link1s\"],\r\na[href*=\"tructiephotlink\"], a[href*=\"branchseo\"], a[href*=\"/mlink/\"], a[href*=\"1-1-1-1\"],\r\ndiv[style*=\"position: fixed\"][style*=\"bottom: 0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell),\r\ndiv[style*=\"position: fixed\"][style*=\"bottom:0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell),\r\ndiv[style*=\"position:fixed\"][style*=\"bottom: 0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell),\r\ndiv[style*=\"position:fixed\"][style*=\"bottom:0\"]:not(#ro-vip-hub):not(#ro-hub-menu):not(.livestream_widget):not(.giovang-fixture-player-shell) {\r\n  display: none !important;\r\n  visibility: hidden !important;\r\n  height: 0 !important;\r\n  max-height: 0 !important;\r\n  pointer-events: none !important;\r\n  opacity: 0 !important;\r\n}\r\n\r\n/* Diệt tuyệt đối các Modal Popup & Floating Ads đè trang */\r\n#banner_popup, #banner_popup.show, div#banner_popup, div#banner_popup.show,\r\n.banner_popup, .banner_popup.show, div.banner_popup, div.banner_popup.show,\r\n#corner-start-popup, .corner-start-popup, .corner-start-popup-backdrop, .corner-start-popup-content,\r\n.corner-popup-wrap, .corner-popup-box,\r\n.ads-layer, [class*=\"ads-layer\"], div.ads-layer,\r\n.player-logo-wrapper, .player-logo-inner, .player-logo-ad, [class*=\"player-logo-\"], [class*=\"player-logo\"],\r\n.bet-button-player, .bet-buttons-container, .bet-button-content, button.bet-button-content, [class*=\"bet-button-player\"], [class*=\"bet-buttons-container\"], [class*=\"bet-button-content\"],\r\n[data-v-77ed3802], [data-v-77cd3882], [data-v-4c9315d7], [data-v-cede0d5b],\r\n.banner-player, .banner-canvas, div.banner-canvas, [class*=\"banner-canvas\"], .banner-container, .banner-content, .banner-image, img.banner-image, .banner-item,\r\n[class*=\"banner-player\"], [class*=\"banner-container\"], [class*=\"banner-content\"], [class*=\"banner-image\"], [class*=\"banner-item\"],\r\n.banner-content.active, [class*=\"banner-content\"][class*=\"active\"],\r\n.bet-button, .bet-buttons, [class*=\"bet-button\"], [class*=\"bet-buttons\"], [class*=\"bet-btn\"],\r\n[data-position*=\"bet-button\"], [data-position=\"live-under-player\"], [data-position*=\"catfish\"],\r\n.ad-wrapper, .ad-container[data-position],\r\n.homepage-toplists-content, section.homepage-toplists-content, [class*=\"homepage-toplists\"],\r\n.toplists-home, [class*=\"toplists-home\"], .devvn-topfive-wrapper, [class*=\"devvn-topfive\"],\r\n.topfive-card, [class*=\"topfive-card\"],\r\n.box-odds-match, [class*=\"box-odds-match\"], .title-odds, [class*=\"title-odds\"],\r\n.gv-bet-dropdown, [class*=\"gv-bet-dropdown\"], .gv-bet-dropdown-toggle, [class*=\"gv-bet-dropdown-toggle\"],\r\n.gv-bet-dropdown-menu, [class*=\"gv-bet-dropdown-menu\"],\r\n.gv-bet-brand-link--image, [class*=\"gv-bet-brand-link\"], .gv-bet-brand-link__img,\r\n.sticky-message, .sticky-announcement, [class*=\"sticky-announcement\"], [class*=\"sticky-message\"],\r\n.sticky-header, .sticky-icon-inline, .sticky-title, .sticky-content-text,\r\n.detail-live-brand, [class*=\"detail-live-brand\"], .detail-live-brand-title, .detail-live-brand-logo,\r\n[id*=\"notification-banner\"], [class*=\"notification-banner\"],\r\n.modal-backdrop, .bg-modaltrungthuong, .modal-trungthuong,\r\n.floating-balloon-container, #popupMenu, .popup-menu, .popup-item, [class*=\"popup-item\"],\r\n.fixture-banner, [class*=\"fixture-banner\"], .balloon-wrapper, [class*=\"balloon-wrapper\"], .btn-balloon, [class*=\"btn-balloon\"],\r\n.grid_banner_devqc, .devqc-manager-resources, .w-banner_devqc-bd, .banner_devqc-bdn-button,\r\n.devqc-catfish, .gvbanner-catfish, [class*=\"devqc\"], [id*=\"devqc\"],\r\n.tvc-pre-roll, .video-wrapper.tvc-pre-roll, .tvc-pre-roll__video, .tvc-pre-roll__skip, .tvc-pre-roll__link-overlay,\r\n.marquee-container, .marquee-box, .odds-button,\r\n[class*=\"banner-pos-\"], [class*=\"ad-strip-pos\"], [class*=\"ad-popup-modal\"],\r\n.match-detail__offer, .offer__buttons, .offer__bet__col, [class*=\"match-detail__offer\"],\r\n.teambox__odds, [class*=\"teambox__odds\"], .btn-odds, [class*=\"btn-odds\"], .block-int, .block-k,\r\n\r\n/* Diệt sạch Player Pause Ads, Watermark & In-Player Embed Banners (devwithai, streamxx, rophim...) */\r\n.pause-ad-overlay, .pause-ad-center, .pause-ad-image, .pause-ad-close, .pause-ad-click-layer,\r\ndiv[class*=\"pause-ad\"], img[src*=\"pause_ads\"], img[src*=\"embed_ads\"],\r\n.overlay-ad-overlay, .overlay-ad-close, .watermark-ad-overlay, .watermark-ad-close,\r\n#pause-ad-styles, .art-ad, .art-ads, [class*=\"art-ad\"],\r\ndiv[class*=\"watermark-ad\"], div[class*=\"overlay-ad\"] {\r\n  display: none !important;\r\n  visibility: hidden !important;\r\n  opacity: 0 !important;\r\n  pointer-events: none !important;\r\n  z-index: -999999 !important;\r\n  width: 0 !important;\r\n  height: 0 !important;\r\n  max-width: 0 !important;\r\n  max-height: 0 !important;\r\n}\r\n\r\n/* Đảm bảo khung Player bóng đá Giờ Vàng, Chuối Chiên và các web thể thao luôn hiển thị nguyên vẹn */\r\n.livestream_widget, .giovang-fixture-player-shell, .giovang-fixture-player-mount, .livestream_widget__content,\r\n.hlsp, .player-container, video {\r\n  display: block !important;\r\n  visibility: visible !important;\r\n  opacity: 1 !important;\r\n  pointer-events: auto !important;\r\n  height: auto !important;\r\n  max-height: none !important;\r\n}\r\n\r\nhtml, body {\r\n  overflow: auto !important;\r\n  position: static !important;\r\n}\r\n\n\n    :root {\n        --primary-color: #51f085 !important;\n        --primary-text: #51f085 !important;\n      }\n      .dev.dev-up { color: #51f085 !important; }\n      .tag-imdb { border: 1px solid #51f085 !important; }\n      .tag-imdb:before { color: #51f085 !important; }\n      .app-box-fix { display: none !important; }\n      .tcoin-disabled .tcoin-menu-highlight { display: block !important; }\n      .tcoin-menu-highlight { display: block !important; }\n      .tcoin-disabled .tcoin-highlight { display: block !important; }\n      .tcoin-highlight__text .heading-xs { font-weight: bold !important; }\n\n:root {\n        --color-primary: #51f085 !important;\n        --primary-color: #51f085 !important;\n        --primary-text: #51f085 !important;\n      }\n      .ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock {\n        display: none !important;\n        visibility: hidden !important;\n        height: 0 !important;\n        opacity: 0 !important;\n        pointer-events: none !important;\n      }\n\n.ad-banner, .banner-ads, #box-ads, div[id*=\"ad_\"], div[class*=\"ad_box\"], .ads-placement, #catfish, .modal-adblock, div[style*=\"z-index: 9999999\"] {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-banner, div[class*=\"banner-ads\"], div[id*=\"ad_\"], .adsbox, #chancoc, .modal-adblock, div[style*=\"z-index: 9999999\"] {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .adv-holder, .pm-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .dp-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .bl-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .p1080-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .xp-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .biphim-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .motphim-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .mephim-ads, #user-anon-trigger ~ div {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.video-ad-layer,\n    [class*=\"video-ad-layer\"],\n    .ad-msg,\n    [class*=\"ad-msg\"],\n    .random-content,\n    #video-premium,\n    #video-second,\n    #video-third,\n    .btn-video-ad,\n    .btn-skip-video,\n    [class*=\"btn-skip-video\"],\n    .ad-floater,\n    .component.ads,\n    [class*=\"component ads\"],\n    .ads,\n    .source-banner,\n    .promotion-popup,\n    .popuptet-bg,\n    .new-target-goal,\n    .new-floater-goal,\n    .adtop,\n    .adbot,\n    [class*=\"adtop\"],\n    [class*=\"adbot\"],\n    .ad-1170x150,\n    [class*=\"ad-1170x150\"],\n    .no-ads,\n    .anti-bad-ad,\n    [class*=\"no-ads\"],\n    [class*=\"anti-bad-ad\"],\n    a[aria-label*=\"Advertisement\"],\n    a[aria-label=\"Advertisement\"],\n    img[src*=\"newbanner2025\"],\n    img[src*=\"no-ads.png\"],\n    a[href*=\"shortlink.linkroyal\"],\n    a[href*=\"hdbet\"],\n    a[href*=\"go8.best\"],\n    a[href*=\"tin888\"],\n    a[href*=\"bom88\"],\n    a[href*=\"ok999\"],\n    .ad-container,\n    .ads-holder,\n    .banner-left,\n    .banner-right,\n    div[id*=\"ad-\"],\n    div[class*=\"banner-ads\"],\n    div[id*=\"catfish\"],\n    .ads-wrapper,\n    #chancoc,\n    .modal-adblock,\n    .ghienphim-ads,\n    .catfish,\n    #catfish,\n    [class*=\"catfish\"] {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .fullphim-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .phimhay-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .p247-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .phd-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .pbh-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .pv-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .btv-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .hdo-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .chay-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .xpp-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .ts-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .ss-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.video-ad-layer,\n    [class*=\"video-ad-layer\"],\n    .ad-msg,\n    [class*=\"ad-msg\"],\n    .random-content,\n    #video-premium,\n    #video-second,\n    #video-third,\n    .btn-video-ad,\n    .btn-skip-video,\n    [class*=\"btn-skip-video\"],\n    .ad-floater,\n    .component.ads,\n    [class*=\"component ads\"],\n    .ads,\n    .source-banner,\n    .promotion-popup,\n    .popuptet-bg,\n    .new-target-goal,\n    .new-floater-goal,\n    .adtop,\n    .adbot,\n    [class*=\"adtop\"],\n    [class*=\"adbot\"],\n    .ad-1170x150,\n    [class*=\"ad-1170x150\"],\n    .no-ads,\n    .anti-bad-ad,\n    [class*=\"no-ads\"],\n    [class*=\"anti-bad-ad\"],\n    a[aria-label*=\"Advertisement\"],\n    a[aria-label=\"Advertisement\"],\n    img[src*=\"newbanner2025\"],\n    img[src*=\"no-ads.png\"],\n    a[href*=\"shortlink.linkroyal\"],\n    a[href*=\"hdbet\"],\n    a[href*=\"go8.best\"],\n    a[href*=\"tin888\"],\n    a[href*=\"bom88\"],\n    a[href*=\"ok999\"],\n    .ad-container,\n    .ads-holder,\n    .banner-left,\n    .banner-right,\n    div[id*=\"ad-\"],\n    div[class*=\"banner-ads\"],\n    div[id*=\"catfish\"],\n    .ads-wrapper,\n    #chancoc,\n    .modal-adblock,\n    .catfish,\n    #catfish,\n    [class*=\"catfish\"],\n    .logo-partner,\n    [class*=\"logo-partner\"],\n    a[href*=\"hit32\"],\n    img[src*=\"hitlogo\"] {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.video-ad-layer,\n    [class*=\"video-ad-layer\"],\n    .ad-msg,\n    [class*=\"ad-msg\"],\n    .random-content,\n    #video-premium,\n    #video-second,\n    #video-third,\n    .btn-video-ad,\n    .btn-skip-video,\n    [class*=\"btn-skip-video\"],\n    .ad-floater,\n    .component.ads,\n    [class*=\"component ads\"],\n    .ads,\n    .source-banner,\n    .promotion-popup,\n    .popuptet-bg,\n    .new-target-goal,\n    .new-floater-goal,\n    .adtop,\n    .adbot,\n    [class*=\"adtop\"],\n    [class*=\"adbot\"],\n    .ad-1170x150,\n    [class*=\"ad-1170x150\"],\n    .no-ads,\n    .anti-bad-ad,\n    [class*=\"no-ads\"],\n    [class*=\"anti-bad-ad\"],\n    a[aria-label*=\"Advertisement\"],\n    a[aria-label=\"Advertisement\"],\n    img[src*=\"newbanner2025\"],\n    img[src*=\"no-ads.png\"],\n    a[href*=\"shortlink.linkroyal\"],\n    a[href*=\"hdbet\"],\n    a[href*=\"go8.best\"],\n    a[href*=\"tin888\"],\n    a[href*=\"bom88\"],\n    a[href*=\"ok999\"],\n    .ad-container,\n    .ads-holder,\n    .banner-left,\n    .banner-right,\n    div[id*=\"ad-\"],\n    div[class*=\"banner-ads\"],\n    div[id*=\"catfish\"],\n    .ads-wrapper,\n    #chancoc,\n    .modal-adblock,\n    .catfish,\n    #catfish,\n    [class*=\"catfish\"] {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-floater,\n    .component.ads,\n    [class*=\"component ads\"],\n    .ads,\n    .adtop,\n    .adbot,\n    [class*=\"adtop\"],\n    [class*=\"adbot\"],\n    .ad-1170x150,\n    [class*=\"ad-1170x150\"],\n    .no-ads,\n    .anti-bad-ad,\n    [class*=\"no-ads\"],\n    [class*=\"anti-bad-ad\"],\n    a[aria-label*=\"Advertisement\"],\n    a[aria-label=\"Advertisement\"],\n    img[src*=\"newbanner2025\"],\n    img[src*=\"no-ads.png\"],\n    a[href*=\"shortlink.linkroyal\"],\n    a[href*=\"hdbet\"],\n    a[href*=\"go8.best\"],\n    a[href*=\"tin888\"],\n    a[href*=\"bom88\"],\n    a[href*=\"ok999\"],\n    .ad-container,\n    .ads-holder,\n    div[id*=\"ad-\"],\n    div[class*=\"banner-ads\"],\n    div[id*=\"catfish\"],\n    .ads-wrapper,\n    #chancoc,\n    .modal-adblock,\n    .catfish,\n    #catfish,\n    [class*=\"catfish\"] {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n:root {\n        --primary-color: #51f085 !important;\n        --primary-text: #51f085 !important;\n      }\n      .dev.dev-up { color: #51f085 !important; }\n      .tag-imdb { border: 1px solid #51f085 !important; }\n      .tag-imdb:before { color: #51f085 !important; }\n      .app-box-fix { display: none !important; }\n      .tcoin-disabled .tcoin-menu-highlight { display: block !important; }\n      .tcoin-menu-highlight { display: block !important; }\n      .tcoin-disabled .tcoin-highlight { display: block !important; }\n      .tcoin-highlight__text .heading-xs { font-weight: bold !important; }\n      .ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock {\n        display: none !important;\n        visibility: hidden !important;\n        height: 0 !important;\n        opacity: 0 !important;\n        pointer-events: none !important;\n      }\n\n:root {\n        --primary-color: #51f085 !important;\n        --primary-text: #51f085 !important;\n      }\n      .dev.dev-up { color: #51f085 !important; }\n      .tag-imdb { border: 1px solid #51f085 !important; }\n      .tag-imdb:before { color: #51f085 !important; }\n      .app-box-fix { display: none !important; }\n      .tcoin-disabled .tcoin-menu-highlight { display: block !important; }\n      .tcoin-menu-highlight { display: block !important; }\n      .tcoin-disabled .tcoin-highlight { display: block !important; }\n      .tcoin-highlight__text .heading-xs { font-weight: bold !important; }\n      .ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock {\n        display: none !important;\n        visibility: hidden !important;\n        height: 0 !important;\n        opacity: 0 !important;\n        pointer-events: none !important;\n      }\n\n.landing-ad, dialog.cdlg, .cdlg {\n      display: none !important;\n      visibility: hidden !important;\n      height: 0 !important;\n      opacity: 0 !important;\n      pointer-events: none !important;\n    }\n    .side-signin, a[href=\"/login\"].side-signin, .side-pair {\n      display: none !important;\n    }\n    body.ro-theater-active .player-media-root,\n    body.ro-theater-active .watch-player {\n      position: fixed !important;\n      top: 0 !important;\n      left: 0 !important;\n      width: 100vw !important;\n      height: 100vh !important;\n      z-index: 999999 !important;\n      background: #000 !important;\n    }\n\n.ad-container,\n    .ads-holder,\n    div[id*=\"ad-\"],\n    div[class*=\"banner-ads\"],\n    div[id*=\"catfish\"],\n    .ads-wrapper,\n    #chancoc,\n    .modal-adblock,\n    [class*=\"ad-floater\"],\n    div[class*=\"z-[70]\"] {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n#ad_top, #ad_bottom, .ad-banner, .banner_middle, div[id*=\"adv_\"], .catfish-banner, div[class*=\"qc_\"], .anti-adblock-alert, #overlay-banner, div[style*=\"z-index: 2147483647\"] {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .hh3d-ads, .ads-banner {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .ah-ads, #box-ads, .ah-banner {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .a47-ads, #box-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .dhtv-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .ah-ads, #box-ads, .ah-banner {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .atvn-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .hhkf-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .hhpanda-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n:root {\n        --primary-color: #51f085 !important;\n        --primary-text: #51f085 !important;\n      }\n      .dev.dev-up { color: #51f085 !important; }\n      .tag-imdb { border: 1px solid #51f085 !important; }\n      .tag-imdb:before { color: #51f085 !important; }\n      .app-box-fix { display: none !important; }\n      .tcoin-disabled .tcoin-menu-highlight { display: block !important; }\n      .tcoin-menu-highlight { display: block !important; }\n      .tcoin-disabled .tcoin-highlight { display: block !important; }\n      .tcoin-highlight__text .heading-xs { font-weight: bold !important; }\n      .ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock {\n        display: none !important;\n        visibility: hidden !important;\n        height: 0 !important;\n        opacity: 0 !important;\n        pointer-events: none !important;\n      }\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .tvhay-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .vst-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .ophim-ads {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n#banner_popup, .banner_popup, .banner_inner, .banner_cursor, .grid_banner_devqc, .devqc-manager-resources, .w-banner_devqc-bd, .banner_devqc-bdn-button, .devqc-catfish, .gvbanner-catfish, [class*=\"devqc\"], [id*=\"devqc\"], #banners-bottom-container, .banners-bottom, .banners-bottom-grid, #open-banner-bottom, .popup-menu, #popupMenu, .floating-balloon-container, .popup-anim, .popup-item, [class*=\"popup-item\"], a[data-brand-id], a.seo4s-resolve-link, a[class*=\"seo4s\"], .bg-modaltrungthuong, .modal-trungthuong, .close-modal-trungthuong, .gv-skeleton-banner, .gv-skeleton-banner-main, .banner-match, div[class*=\"gv-skeleton-banner\"], div[class*=\"banner-match\"], div[id*=\"banner-match\"], .ads-banner, #catfish, div[style*=\"z-index: 9999999\"], img[src*=\"giovang-popup\"], img[src*=\"hit.club\"], img[src*=\"go88\"], img[src*=\"sun.win\"], .tvc-pre-roll, .video-wrapper.tvc-pre-roll, .tvc-pre-roll__video, .tvc-pre-roll__skip, .tvc-pre-roll__link-overlay, [class*=\"tvc-pre-roll\"], .fixture-banner, [class*=\"fixture-banner\"], .balloon-wrapper, [class*=\"balloon-wrapper\"], .btn-balloon, [class*=\"btn-balloon\"], .homepage-toplists-content, section.homepage-toplists-content, [class*=\"homepage-toplists\"], .toplists-home, [class*=\"toplists-home\"], .devvn-topfive-wrapper, [class*=\"devvn-topfive\"], .topfive-card, [class*=\"topfive-card\"], .box-odds-match, [class*=\"box-odds-match\"], .title-odds, [class*=\"title-odds\"], .gv-bet-dropdown, [class*=\"gv-bet-dropdown\"], .gv-bet-dropdown-toggle, [class*=\"gv-bet-dropdown-toggle\"], .gv-bet-dropdown-menu, [class*=\"gv-bet-dropdown-menu\"], .gv-bet-brand-link--image, [class*=\"gv-bet-brand-link\"], .gv-bet-brand-link__img, a[aria-label=\"Top Nhà Cái\"], img[src*=\"nav-toplist.svg\"], img[src*=\"nav-active-toplist.svg\"], img[src*=\"kbv.svg\"], img[src*=\"bet-net88\"], img[src*=\"bet-gem88\"] {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\ndiv[class*=\"catfish\"], div[class*=\"banner_\"], div[class*=\"ads_\"], .ads-holder, #catfish, a[href*=\"telegram\"], a[href*=\"t.me/khoga\"], [class*=\"banner-pos-\"], [class*=\"ad-strip-pos\"], [class*=\"ad-popup-modal\"], [class*=\"banner-pos\"], [id*=\"banner-pos\"], a[href*=\"fb88.com\"], div[style*=\"z-index: 9999999\"] {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\nhtml body [data-v-4c9315d7].banner-content, html body [data-v-4c9315d7].banner-canvas, html body [data-v-4c9315d7].banner-image, html body img[data-v-4c9315d7], html body div[data-v-4c9315d7].banner-item, html body [data-v-cede0d5b], html body .bet-button-content, html body button.bet-button-content, html body [class*=\"bet-button-content\"], html body .bet-button-player, html body .bet-buttons-container, html body [class*=\"bet-buttons-container\"], html body .banner-canvas, html body div.banner-canvas, html body [class*=\"banner-canvas\"], html body .banner-content, html body div.banner-content, html body [class*=\"banner-content\"], html body .banner-container, html body div.banner-container, html body [class*=\"banner-container\"], html body .banner-image, html body img.banner-image, html body [class*=\"banner-image\"], html body .banner-item, html body [class*=\"banner-item\"], html body .ads-layer, html body [class*=\"ads-layer\"], html body div.ads-layer, html body .player-logo-wrapper, html body .player-logo-inner, html body .player-logo-ad, html body [class*=\"player-logo-\"], html body [class*=\"player-logo\"], html body [data-v-77ed3802], html body [data-v-77cd3882], html body .bet-button, html body .bet-buttons, html body [class*=\"bet-button\"], html body [class*=\"bet-buttons\"], html body [class*=\"bet-btn\"], html body [data-position*=\"bet-button\"], html body [data-position=\"live-under-player\"], html body [data-position*=\"catfish\"], html body .ad-wrapper, html body .ad-container, html body [class*=\"ad-container\"], html body img[alt*=\"FB88_banner_player\"], html body img[alt*=\"net-88-banner-player\"], html body img[alt*=\"net-88-logo\"], html body img[alt*=\"banner_player\"], html body img[alt*=\"banner-player\"], html body img[src*=\"1920x60\"], html body img[src*=\"cdnvip.chuoichientv.net\"], html body img[src*=\"c5735ef8\"], html body a[href*=\"net88.boats\"], html body a[href*=\"logolive-30x30\"], html body img[src*=\"FB88\"], html body img[src*=\"fb88\"], html body img[src*=\"net88\"], html body img[src*=\"NET88\"], html body img[src*=\"xBet\"], html body .ads-container, html body .banner-ads, html body div[id*=\"ad_\"], html body div[class*=\"ad_box\"], html body .catfish, html body #catfish, html body div[style*=\"z-index: 9999999\"], html body .boxchat-sticky-ad, html body [class*=\"boxchat-sticky-ad\"], html body .login-prompt {\n  display: none !important;\n  visibility: hidden !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n  position: absolute !important;\n  top: -99999px !important;\n  left: -99999px !important;\n  width: 0 !important;\n  height: 0 !important;\n  max-width: 0 !important;\n  max-height: 0 !important;\n  clip: rect(0, 0, 0, 0) !important;\n  margin: 0 !important;\n  padding: 0 !important;\n}\n\n#corner-start-popup, .corner-start-popup, .corner-start-popup-backdrop, .corner-start-popup-content, .corner-start-popup-inner, .corner-popup-wrap, .corner-popup-box, [class*=\"corner-popup\"], [id*=\"corner-popup\"], .block-balloon-right, .block-balloon-left, [class*=\"balloon-\"], .bookmaker-title, .tf-section, .tf-theme-style4, [class*=\"tf-s3-\"], [class*=\"tf-section\"], .fixed-ads, .fixed-ads-1, .block-fixed-ads-1, [class*=\"block-fixed-ads\"], [class*=\"fixed-ads\"], .live-ads-temp-1, .live-ads-temp-2, .live-ads-temp-3, .live-ads-temp-4, .live-ads-temp-5, [class*=\"live-ads-temp\"], .left-ads, .right-ads, .top-ads, .ads-728-90, .adspot-wrap, .adspot-1, .adspot-2, .adspot-55, .adspot-56, .adspot-57, div[class*=\"adspot\"], div[id*=\"adspot\"], ins[data-revive-id], img[src*=\"1280x1280px\"], img[src*=\"balloon_1111\"], a[href*=\"tructiephotlink\"], a[href*=\"branchseo\"], a[href*=\"/mlink/\"], a[href*=\"1-1-1-1\"], .catfish-banner, #catfish, div[style*=\"z-index: 9999999\"], .sticky-message, .sticky-announcement, [class*=\"sticky-announcement\"], [class*=\"sticky-message\"], .sticky-header, .sticky-icon-inline, .sticky-title, .sticky-content-text, .detail-live-brand, [class*=\"detail-live-brand\"], .detail-live-brand-title, .detail-live-brand-logo, [id*=\"notification-banner\"], [class*=\"notification-banner\"], .notification-banner-message-wrapper, .notification-banner-message-item, .gwd_notification, #betbutton-world-cup, a.btn-bet, a.bet-cta {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.xlz-ads-item, .block-catfish, .xlz-btn-8xbet, div[class*=\"xlz-ads\"], a[href*=\"8xbet\"], a[href*=\"bet\"], div[id*=\"catfish\"], #catfish, div[style*=\"z-index: 9999999\"], .odds-comp-logo, a.odds-comp-logo, .grid-match__odds, .marquee-container, .marquee-box, [class*=\"marquee-container\"], .odds-button, div[class*=\"odds-button\"], [class*=\"odds-button\"], img[src*=\"/images/company/\"], img[src*=\"company\"], img[src*=\"21-1.png\"], img[alt=\"company\"], a[href*=\"15.235.211.192\"], a[href*=\"top-nha-cai\"], a[href*=\"xoilacz\"], .teambox__odds, [class*=\"teambox__odds\"], .btn-odds, [class*=\"btn-odds\"], .match-detail__offer, .offer__buttons, .offer__bet__col, [class*=\"match-detail__offer\"] {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.ads-tool-banner-container,\n    .close-catfish,\n    [data-zone],\n    [data-zone=\"top\"],\n    [data-zone=\"top_content\"],\n    [data-zone=\"bottom\"],\n    div[style*=\"z-index: 2147483000\"],\n    div[style*=\"z-index: 2147483001\"],\n    div[id*=\"aclib\"],\n    #aclib,\n    iframe[src*=\"acscdn.com\"],\n    iframe[src*=\"yougetwhatyoupayfor.net\"],\n    .catfish,\n    #catfish,\n    [class*=\"catfish\"],\n    #banners-container,\n    .banners-container {\n      display: none !important;\n      visibility: hidden !important;\n      height: 0 !important;\n      opacity: 0 !important;\n      pointer-events: none !important;\n    }\n    .chapter-images-container {\n      display: flex !important;\n      flex-direction: column !important;\n      align-items: center !important;\n      gap: 12px !important;\n      width: 100% !important;\n      max-width: 1000px !important;\n      margin: 0 auto !important;\n    }\n    .chapter-images-container img {\n      display: block !important;\n      margin: 0 auto !important;\n      max-width: 100% !important;\n      height: auto !important;\n      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);\n      border-radius: 4px;\n    }\n\n.advertisement,\n    #video-chapter,\n    div[id*=\"video-chapter\"],\n    div[class*=\"advertisement\"],\n    iframe[src*=\"chaseherbalpasty.com\"],\n    iframe[src*=\"dekkopinolin.com\"],\n    iframe[src*=\"crittereasilyhangover.com\"],\n    iframe[src*=\"google\"],\n    ins.adsbygoogle,\n    .banner-qc,\n    .catfish,\n    #catfish,\n    [class*=\"catfish\"] {\n      display: none !important;\n      visibility: hidden !important;\n      height: 0 !important;\n      opacity: 0 !important;\n      pointer-events: none !important;\n    }\n    .page-chapter {\n      display: flex !important;\n      flex-direction: column !important;\n      align-items: center !important;\n      justify-content: center !important;\n      margin: 0 auto 12px auto !important;\n      text-align: center !important;\n      width: 100% !important;\n    }\n    .page-chapter img {\n      display: block !important;\n      margin: 0 auto !important;\n      max-width: 1000px !important;\n      width: auto !important;\n      height: auto !important;\n      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);\n      border-radius: 4px;\n    }\n\n.banner.text-center,\n    .banner,\n    div[class*=\"banner\"],\n    #popup_content,\n    .popup_content,\n    .popup_layer,\n    .iframe-content-mobile,\n    .iframe-content-desktop,\n    iframe[src*=\"acscdn.com\"],\n    div[id*=\"aclib\"],\n    #aclib,\n    .catfish,\n    #catfish,\n    [class*=\"catfish\"] {\n      display: none !important;\n      visibility: hidden !important;\n      height: 0 !important;\n      opacity: 0 !important;\n      pointer-events: none !important;\n    }\n    .reading-detail,\n    .reading-detail .page-chapter {\n      display: flex !important;\n      flex-direction: column !important;\n      align-items: center !important;\n      justify-content: center !important;\n      margin: 0 auto 12px auto !important;\n      text-align: center !important;\n      width: 100% !important;\n    }\n    .reading-detail img,\n    .page-chapter img {\n      display: block !important;\n      margin: 0 auto !important;\n      max-width: 1000px !important;\n      width: auto !important;\n      height: auto !important;\n      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);\n      border-radius: 4px;\n    }\n\n#top-banner-reading-container,\n    #top-banner-reading-container-sub,\n    #mid-banner-reading-container,\n    #ad_info_top,\n    #ad_info_2,\n    #ad_info,\n    div[id*=\"ad_info\"],\n    div[id*=\"banner-reading\"],\n    .community-banner,\n    .banner-content,\n    .banner-left,\n    .banner-right,\n    .catfish,\n    #catfish,\n    [class*=\"catfish\"] {\n      display: none !important;\n      visibility: hidden !important;\n      height: 0 !important;\n      opacity: 0 !important;\n      pointer-events: none !important;\n    }\n    #chapter_content,\n    .chapter_content_div,\n    .story-see-content {\n      display: flex !important;\n      flex-direction: column !important;\n      align-items: center !important;\n      justify-content: center !important;\n      margin: 0 auto 12px auto !important;\n      text-align: center !important;\n      width: 100% !important;\n    }\n    #chapter_content img,\n    .chapter_content_div img,\n    .story-see-content img {\n      display: block !important;\n      margin: 0 auto !important;\n      max-width: 1000px !important;\n      width: auto !important;\n      height: auto !important;\n      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);\n      border-radius: 4px;\n    }\n\n.ads-static-header,\n    .ads-static-home-detail-chapter,\n    .ads-static-home-middle,\n    div[class*=\"ads-static\"],\n    .catfish,\n    #catfish,\n    [class*=\"catfish\"] {\n      display: none !important;\n      visibility: hidden !important;\n      height: 0 !important;\n      opacity: 0 !important;\n      pointer-events: none !important;\n    }\n    .chapter-content,\n    .content-container {\n      display: flex !important;\n      flex-direction: column !important;\n      align-items: center !important;\n      justify-content: center !important;\n      margin: 0 auto 12px auto !important;\n      text-align: center !important;\n      width: 100% !important;\n    }\n    .chapter-content img,\n    .content-container img {\n      display: block !important;\n      margin: 0 auto !important;\n      max-width: 1000px !important;\n      width: auto !important;\n      height: auto !important;\n      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);\n      border-radius: 4px;\n    }\n\n#ads,\n    .wrapper-ads,\n    .mission-ads,\n    .tr-ads-click,\n    .popup-noti,\n    .notification-popup,\n    #couter-wrapper,\n    [class*=\"mission-ads\"],\n    .banner-bottom,\n    .catfish,\n    #catfish,\n    [class*=\"catfish\"] {\n      display: none !important;\n      visibility: hidden !important;\n      height: 0 !important;\n      opacity: 0 !important;\n      pointer-events: none !important;\n    }\n    .chapter-detail,\n    .reading-detail,\n    #scontent,\n    .scontent,\n    .box_text {\n      max-width: 960px !important;\n      margin: 0 auto !important;\n      line-height: 1.8 !important;\n      font-size: 19px !important;\n      font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif !important;\n      word-break: break-word !important;\n    }\n    .chapter-detail img,\n    .reading-detail img,\n    .page-chapter img {\n      display: block !important;\n      margin: 12px auto !important;\n      max-width: 1000px !important;\n      width: auto !important;\n      height: auto !important;\n      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);\n      border-radius: 4px;\n    }\n\n.advertisement,\n    .ad-container,\n    .ads-holder,\n    .banner-qc,\n    .ads,\n    [class*=\"banner-ads\"],\n    div[id*=\"ad-\"],\n    div[id*=\"catfish\"],\n    .ads-wrapper,\n    #chancoc,\n    .modal-adblock,\n    .catfish,\n    #catfish,\n    [class*=\"catfish\"],\n    iframe[src*=\"seotraffic.io.vn\"],\n    iframe[src*=\"acscdn.com\"],\n    iframe[src*=\"chaseherbalpasty.com\"],\n    iframe[src*=\"dekkopinolin.com\"],\n    a[href*=\"bet\"],\n    a[href*=\"casino\"] {\n  display: none !important;\n  visibility: hidden !important;\n  height: 0 !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n/* ═══════════════════════════════════════════════════════════════\r\n   Cinema Pro Suite - Theater Mode & OLED HDR CSS\r\n   ═══════════════════════════════════════════════════════════════ */\r\n\r\nvideo.ro-enhanced-hdr {\r\n  filter: contrast(1.10) saturate(1.25) brightness(1.04) !important;\r\n}\r\n\r\nbody.ro-theater-active {\r\n  background-color: #050608 !important;\r\n}\r\n\r\nbody.ro-theater-active header,\r\nbody.ro-theater-active footer,\r\nbody.ro-theater-active .sidebar,\r\nbody.ro-theater-active .sidebar-right,\r\nbody.ro-theater-active nav {\r\n  opacity: 0.1 !important;\r\n  transition: opacity 0.3s ease;\r\n}\r\n\r\nbody.ro-theater-active header:hover,\r\nbody.ro-theater-active footer:hover,\r\nbody.ro-theater-active nav:hover {\r\n  opacity: 1 !important;\r\n}\r\n\r\nbody.ro-theater-active .player-wrapper,\r\nbody.ro-theater-active .player-container,\r\nbody.ro-theater-active #player,\r\nbody.ro-theater-active #live-player-content,\r\nbody.ro-theater-active #embed-player,\r\nbody.ro-theater-active #iframe-stream,\r\nbody.ro-theater-active .col-player,\r\nbody.ro-theater-active iframe {\r\n  max-height: 88vh !important;\r\n  box-shadow: 0 10px 50px rgba(81, 240, 133, 0.25) !important;\r\n  border-radius: 14px;\r\n}\r\n\n\n/* ═══════════════════════════════════════════════════════════════\r\n   Cinema Pro Suite - VIP Hub UI CSS\r\n   Glassmorphism Luxury — Black & Gold\r\n   ═══════════════════════════════════════════════════════════════ */\r\n\r\n#ro-vip-hub {\r\n  position: fixed;\r\n  bottom: 24px;\r\n  right: 24px;\r\n  z-index: 2147483647;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: flex-end;\r\n  gap: 10px;\r\n  font-family: 'Fira Code', 'Cascadia Code', 'Courier New', Courier, monospace, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\r\n  user-select: none;\r\n}\r\n\r\n#ro-hub-toggle {\r\n  width: 48px;\r\n  height: 48px;\r\n  border-radius: 50%;\r\n  background: linear-gradient(135deg, #ffd98a 0%, #ffb627 55%, #c8902a 100%);\r\n  box-shadow: 0 4px 22px rgba(255, 182, 39, 0.45);\r\n  border: 2px solid rgba(255, 235, 190, 0.5);\r\n  cursor: pointer;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: #1a1206;\r\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\r\n}\r\n\r\n#ro-hub-toggle:hover {\r\n  transform: scale(1.1) rotate(6deg);\r\n  box-shadow: 0 6px 28px rgba(255, 182, 39, 0.7);\r\n}\r\n\r\n#ro-hub-toggle svg {\r\n  width: 24px;\r\n  height: 24px;\r\n  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));\r\n}\r\n\r\n#ro-hub-menu {\r\n  display: none;\r\n  background: rgba(11, 10, 8, 0.94);\r\n  backdrop-filter: blur(14px);\r\n  -webkit-backdrop-filter: blur(14px);\r\n  border: 1px solid rgba(255, 205, 120, 0.18);\r\n  border-radius: 14px;\r\n  padding: 14px;\r\n  width: 295px;\r\n  box-shadow:\r\n    0 16px 40px rgba(0, 0, 0, 0.75),\r\n    inset 0 1px 0 rgba(255, 235, 190, 0.18),\r\n    0 0 24px rgba(255, 182, 39, 0.12);\r\n  flex-direction: column;\r\n  gap: 8px;\r\n  color: #f6f2e9;\r\n}\r\n\r\n#ro-hub-menu.show {\r\n  display: flex;\r\n  animation: roFadeIn 0.2s ease-out;\r\n}\r\n\r\n@keyframes roFadeIn {\r\n  from { opacity: 0; transform: translateY(8px); }\r\n  to { opacity: 1; transform: translateY(0); }\r\n}\r\n\r\n.ro-menu-btn {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  background: rgba(255, 210, 120, 0.045);\r\n  border: 1px solid rgba(255, 205, 120, 0.14);\r\n  color: #f6f2e9;\r\n  padding: 8px 12px;\r\n  border-radius: 9px;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.18s ease;\r\n  text-align: left;\r\n}\r\n\r\n.ro-menu-btn:hover {\r\n  background: rgba(255, 182, 39, 0.14);\r\n  border-color: #ffb627;\r\n  color: #ffd98a;\r\n  transform: translateX(-2px);\r\n  box-shadow: 0 0 14px rgba(255, 182, 39, 0.2);\r\n}\r\n\r\n.ro-btn-left {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.ro-icon {\r\n  width: 15px;\r\n  height: 15px;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: #ffb627;\r\n}\r\n\r\n.ro-icon svg {\r\n  width: 15px;\r\n  height: 15px;\r\n}\r\n\r\n.ro-badge {\r\n  font-size: 10px;\r\n  font-weight: 700;\r\n  padding: 2px 6px;\r\n  border-radius: 4px;\r\n  background: rgba(0, 0, 0, 0.35);\r\n  border: 1px solid rgba(255, 205, 120, 0.14);\r\n  color: #ffb627;\r\n}\r\n\r\n#ro-stream-preview {\r\n  display: none;\r\n  font-size: 10px;\r\n  padding: 6px 10px;\r\n  background: rgba(0, 0, 0, 0.55);\r\n  border-radius: 6px;\r\n  border: 1px dashed rgba(255, 182, 39, 0.4);\r\n  color: #ffd98a;\r\n  word-break: break-all;\r\n  line-height: 1.35;\r\n  margin-top: 2px;\r\n}\r\n\r\n.ro-dot {\r\n  display: inline-block;\r\n  width: 6px;\r\n  height: 6px;\r\n  border-radius: 50%;\r\n  background-color: #27c93f;\r\n  margin-right: 6px;\r\n  box-shadow: 0 0 6px #27c93f;\r\n}\r\n\r\n.ro-toast {\r\n  position: fixed;\r\n  top: 24px;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n  background: rgba(11, 10, 8, 0.94);\r\n  backdrop-filter: blur(14px);\r\n  -webkit-backdrop-filter: blur(14px);\r\n  border: 1px solid rgba(255, 205, 120, 0.3);\r\n  box-shadow:\r\n    0 12px 32px rgba(0, 0, 0, 0.7),\r\n    inset 0 1px 0 rgba(255, 235, 190, 0.2),\r\n    0 0 20px rgba(255, 182, 39, 0.25);\r\n  color: #ffd98a;\r\n  padding: 10px 18px;\r\n  border-radius: 10px;\r\n  font-size: 13px;\r\n  font-weight: 700;\r\n  letter-spacing: 0.04em;\r\n  z-index: 2147483647;\r\n  pointer-events: none;\r\n  animation: roToastPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);\r\n}\r\n\r\n@keyframes roToastPop {\r\n  from { opacity: 0; transform: translate(-50%, -10px) scale(0.95); }\r\n  to { opacity: 1; transform: translate(-50%, 0) scale(1); }\r\n}";

  function injectCinemaProStyles() {
    if (typeof document === "undefined") return;
    const root = document.head || document.documentElement;
    if (!root) return;
    let s = document.getElementById("cinema-pro-suite-styles");
    if (!s) {
      s = document.createElement("style");
      s.id = "cinema-pro-suite-styles";
      s.textContent = css;
      root.appendChild(s);
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
    if (typeof document === "undefined" || !document.body) {
      console.log("[Cinema Pro]", msg);
      return;
    }
    const t = document.createElement("div");
    t.className = "ro-toast";
    t.innerHTML = msg;
    document.body.appendChild(t);
    setTimeout(() => {
      try { t.remove(); } catch (e) {}
    }, 2200);
  }
  if (typeof window !== "undefined") {
    window.showToast = showToast;
  }

  // ─── VIP CONTROL HUB DOM CREATION ───
  function initVipHub() {
    if (typeof document === "undefined") return;
    // Tuyệt đối không hiển thị VIP Control Hub trùng lặp bên trong iframe nhúng player
    if (typeof window !== "undefined" && window.self !== window.top) return;
    if (document.getElementById("ro-vip-hub")) return;
    if (!document.body) {
      document.addEventListener("DOMContentLoaded", () => setTimeout(initVipHub, 200), { once: true });
      return;
    }
    const isComic = (typeof isComicPage === "function" ? isComicPage() : (typeof window !== "undefined" && typeof window.isComicPage === "function" ? window.isComicPage() : false)) && !document.querySelector("video");
    const hub = document.createElement("div");
    hub.id = "ro-vip-hub";
    hub.innerHTML = isComic ? `
      <div id="ro-hub-menu">
        <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: #51f085; display: flex; justify-content: space-between; align-items: center;">
          <span class="ro-btn-left">
            <span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg></span>
            <span>Web Enhancer (All-In-One)</span>
          </span>
          <span style="font-size: 11px; opacity: 0.7;">v1.0.0</span>
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
            <span>Web Enhancer (All-In-One)</span>
          </span>
          <span style="font-size: 11px; opacity: 0.7;">v1.0.0</span>
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
      // Toggle menu khi bấm nút Vương Miện (dùng duy nhất 1 listener)
      toggle.onclick = (e) => {
        if (e && typeof e.preventDefault === "function") e.preventDefault();
        if (e && typeof e.stopPropagation === "function") e.stopPropagation();
        menu.classList.toggle("show");
      };

      // Ngăn tương tác click trong menu phát tán ra document
      menu.onclick = (e) => {
        if (e && typeof e.stopPropagation === "function") e.stopPropagation();
      };

      // Đóng menu khi click chuột THẬT (isTrusted = true) ra ngoài vùng VIP Hub
      document.addEventListener("click", (e) => {
        if (!e.isTrusted) return;
        if (e.target && (hub.contains(e.target) || (e.target.closest && e.target.closest("#ro-vip-hub")))) return;
        menu.classList.remove("show");
      });
    }

    const bind = (id, fn) => {
      const el = hub.querySelector("#" + id) || document.getElementById(id);
      if (el) el.addEventListener("click", fn);
    };

    const execAction = (fnName, ...args) => {
      try {
        if (typeof window !== "undefined" && typeof window[fnName] === "function") {
          return window[fnName](...args);
        }
        if (typeof eval !== "undefined") {
          const fn = eval("(typeof " + fnName + " === 'function' ? " + fnName + " : null)");
          if (fn) return fn(...args);
        }
      } catch (e) {
        console.warn("[Cinema Pro] Action not found:", fnName);
      }
    };

    bind("ro-comic-prev-btn", () => execAction("navigateComicChapter", -1));
    bind("ro-comic-next-btn", () => execAction("navigateComicChapter", 1));
    bind("ro-comic-up-btn", () => window.scrollBy({ top: -450, behavior: "smooth" }));
    bind("ro-comic-down-btn", () => window.scrollBy({ top: 450, behavior: "smooth" }));
    bind("ro-stream-preview", () => execAction("copyM3u8"));
    bind("ro-potplayer-btn", () => execAction("openPotPlayer"));
    bind("ro-vlc-btn", () => execAction("openVlcPlayer"));
    bind("ro-copym3u8-btn", () => execAction("copyM3u8"));
    bind("ro-m3ufile-btn", () => execAction("downloadM3uFile"));
    bind("ro-skipintro-btn", () => execAction("skipIntro", 85));
    bind("ro-fullscreen-btn", () => execAction("toggleFullscreen"));
    bind("ro-hdr-btn", () => execAction("toggleHdr"));
    bind("ro-theater-btn", () => execAction("toggleTheater"));
    bind("ro-nukeads-btn", () => execAction("nukeAdElements", true));
    bind("ro-vol-down", () => execAction("adjustVolume", -0.05));
    bind("ro-vol-up", () => execAction("adjustVolume", 0.05));
    bind("ro-speed-down", () => execAction("adjustSpeed", -1));
    bind("ro-speed-up", () => execAction("adjustSpeed", 1));
  }

  if (typeof window !== "undefined") {
    window.initVipHub = initVipHub;
  }



  const _showToast = (msg) => {
    try {
      if (typeof window !== "undefined" && typeof window.showToast === "function") {
        return window.showToast(msg);
      }
      if (typeof eval !== "undefined") {
        const fn = eval("(typeof showToast === 'function' ? showToast : null)");
        if (fn && fn !== _showToast) return fn(msg);
      }
    } catch (e) {}
    console.log("[Cinema Pro]", msg);
  };

  const getSafeCapturedStreamUrl = () => {
    if (typeof capturedStreamUrl !== "undefined" && capturedStreamUrl) return capturedStreamUrl;
    if (typeof window !== "undefined" && window.capturedStreamUrl) return window.capturedStreamUrl;
    if (typeof window !== "undefined" && typeof window.getCapturedStreamUrl === "function") {
      const u = window.getCapturedStreamUrl();
      if (u) return u;
    }
    try {
      const s = localStorage.getItem("RO_CAPTURED_STREAM");
      if (s) return s;
    } catch (e) {}
    return "";
  };

  const callEnsureStreamUrl = () => {
    try {
      if (typeof ensureStreamUrl === "function") ensureStreamUrl();
      else if (typeof window !== "undefined" && typeof window.ensureStreamUrl === "function") window.ensureStreamUrl();
    } catch (e) {}
  };

  var currentSpeed = (typeof currentSpeed !== "undefined" ? currentSpeed : ((typeof window !== "undefined" && window.__cinema_speed) || 1.0));
  var currentVolume = (typeof currentVolume !== "undefined" ? currentVolume : ((typeof window !== "undefined" && window.__cinema_volume) || 1.0));
  var isHdrEnabled = (typeof isHdrEnabled !== "undefined" ? isHdrEnabled : ((typeof window !== "undefined" && window.__cinema_hdr) || false));
  var isTheaterMode = (typeof isTheaterMode !== "undefined" ? isTheaterMode : ((typeof window !== "undefined" && window.__cinema_theater) || false));

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

  if (typeof window !== "undefined") {
    window.sendCommandToPlayer = sendCommandToPlayer;
  }


  function skipIntro(sec = 85) {
    sendCommandToPlayer({ type: "RO_CMD_SKIP_INTRO", seconds: sec });
    _showToast("Đã tua Intro: +" + sec + "s");
  }

  function seekRelative(delta = 5) {
    sendCommandToPlayer({ type: "RO_CMD_SEEK", delta });
    _showToast(delta > 0 ? ("Tua tới: +" + delta + "s") : ("Tua lùi: " + delta + "s"));
  }

  function seekToPercent(pct = 0) {
    sendCommandToPlayer({ type: "RO_CMD_SEEK_PERCENT", percent: pct });
    _showToast("Vị trí video: " + pct + "%");
  }

  function adjustVolume(delta) {
    let newVol = Math.round((currentVolume + delta) * 100) / 100;
    newVol = Math.max(0, Math.min(1.0, newVol));
    currentVolume = newVol;
    sendCommandToPlayer({ type: "RO_CMD_VOLUME", volume: currentVolume });
    _showToast("Âm lượng: " + Math.round(currentVolume * 100) + "%");
  }

  function toggleHdr() {
    isHdrEnabled = !isHdrEnabled;
    sendCommandToPlayer({ type: "RO_CMD_TOGGLE_HDR" });
    _showToast(isHdrEnabled ? "Anime OLED HDR: BẬT" : "OLED HDR: TẮT");
  }

  function toggleTheater() {
    isTheaterMode = !isTheaterMode;
    document.body.classList.toggle("ro-theater-active", isTheaterMode);
    _showToast(isTheaterMode ? "Chế độ Rạp phim: BẬT" : "Chế độ Rạp phim: TẮT");
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      try { document.exitFullscreen().catch(() => {}); } catch (e) {}
      _showToast("Đã thoát Toàn màn hình");
    } else {
      const playerWrapper = document.querySelector(".player-wrapper, .player-container, #player, iframe, video");
      const target = playerWrapper || document.documentElement;
      if (target && target.requestFullscreen) {
        try { target.requestFullscreen().catch(() => {}); } catch (e) {}
      }
      sendCommandToPlayer({ type: "RO_CMD_FULLSCREEN" });
      _showToast("Toàn màn hình");
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
    callEnsureStreamUrl();
    const stream = getSafeCapturedStreamUrl();
    if (!stream) {
      _showToast("Đang chờ bắt link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = stream.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).catch(() => {});
    }
    function getStreamReferer(url) {
      if (isNoRefererCdn(url)) return "";
      if (url.includes("edgemaxcdn") || url.includes("100ycdn") || url.includes("cctvsignal") || (typeof location !== "undefined" && location.hostname && (location.hostname.includes("chuoichien") || location.hostname.includes("cctvsignal")))) {
        return "https://fhd-01.cctvsignal.xyz/";
      }
      return (typeof location !== "undefined" && location.href) ? location.href : "";
    }

    const ref = getStreamReferer(cleanUrl);
    const potTarget = ref ? (cleanUrl + "|Referer=" + encodeURIComponent(ref)) : cleanUrl;
    window.location.href = "potplayer://" + potTarget;
    _showToast("Đang mở PotPlayer...");
  }

  function openVlcPlayer() {
    callEnsureStreamUrl();
    const stream = getSafeCapturedStreamUrl();
    if (!stream) {
      _showToast("Đang chờ bắt link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = stream.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).catch(() => {});
    }
    window.location.href = "vlc://" + encodeURIComponent(cleanUrl);
    _showToast("Đang mở VLC... Nếu VLC báo lỗi MRL do CDN chặn Referer, hãy bấm 'Tải Playlist .M3U' hoặc dùng PotPlayer!");
  }

  function copyM3u8() {
    callEnsureStreamUrl();
    const stream = getSafeCapturedStreamUrl();
    if (!stream) {
      _showToast("Đang tìm link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = stream.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).then(() => {
        _showToast("Đã copy link M3U8 chuẩn: " + (cleanUrl.length > 40 ? cleanUrl.slice(0, 37) + "..." : cleanUrl));
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
      _showToast("Đã copy link M3U8 chuẩn: " + (text.length > 40 ? text.slice(0, 37) + "..." : text));
    } catch (e) {
      prompt("Sao chép link video:", text);
    }
  }

  function downloadM3uFile() {
    callEnsureStreamUrl();
    const stream = getSafeCapturedStreamUrl();
    if (!stream) {
      _showToast("Chưa có link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = stream.trim();
    const title = (document.title || "Cinema_Pro_Stream").replace(/[/\?%*:|"<>]/g, "_").trim();
    function getStreamReferer(url) {
      if (isNoRefererCdn(url)) return "";
      if (url.includes("edgemaxcdn") || url.includes("100ycdn") || url.includes("cctvsignal") || (typeof location !== "undefined" && location.hostname && (location.hostname.includes("chuoichien") || location.hostname.includes("cctvsignal")))) {
        return "https://fhd-01.cctvsignal.xyz/";
      }
      return (typeof location !== "undefined" && location.href) ? location.href : "";
    }
    const ref = getStreamReferer(cleanUrl);
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
    _showToast("Đã tải playlist .m3u (Kèm Referer cho VLC & PotPlayer)!");
  }

  function adjustSpeed(delta) {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0];
    let idx = speeds.indexOf(currentSpeed);
    if (idx === -1) idx = 2;
    idx = Math.max(0, Math.min(speeds.length - 1, idx + delta));
    currentSpeed = speeds[idx];
    sendCommandToPlayer({ type: "RO_CMD_SET_SPEED", speed: currentSpeed });
    _showToast("Tốc độ phát: " + currentSpeed + "x");
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
        _showToast("Đang chuyển về chương trước...");
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
        _showToast("Đang chuyển tới chương tiếp theo...");
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
        _showToast("Đang tải: " + (select.options[nextIdx].text || "Chương mới"));
        return;
      }
    }
    _showToast(direction < 0 ? "Đã ở chương đầu tiên!" : "Đã ở chương mới nhất!");
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
      if (typeof nukeAdElements === "function") nukeAdElements(true);
      else if (typeof window !== "undefined" && typeof window.nukeAdElements === "function") window.nukeAdElements(true);
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

  if (typeof window !== "undefined") {
    window.copyM3u8 = copyM3u8;
    window.openPotPlayer = openPotPlayer;
    window.openVlcPlayer = openVlcPlayer;
    window.downloadM3uFile = downloadM3uFile;
    window.skipIntro = skipIntro;
    window.toggleFullscreen = toggleFullscreen;
    window.toggleHdr = toggleHdr;
    window.toggleTheater = toggleTheater;
    window.adjustVolume = adjustVolume;
    window.adjustSpeed = adjustSpeed;
    window.isComicPage = isComicPage;
    window.navigateComicChapter = navigateComicChapter;
  }


  if (document.body) initVipHub();
  else document.addEventListener("DOMContentLoaded", initVipHub, { once: true });
  window.addEventListener("DOMContentLoaded", ensureStreamUrl);
  window.addEventListener("load", ensureStreamUrl);

  const brandTag = "[Web Enhancer]";
  console.log("%c" + brandTag + " " + "Web Enhancer Suite (All-In-One) - Phim, Anime, Bóng Đá & Truyện Tranh" + " Ready!", "font-size: 13px; font-weight: bold; color: #10b981;");
})();
