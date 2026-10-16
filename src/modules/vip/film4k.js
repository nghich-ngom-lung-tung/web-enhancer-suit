/**
 * Cinema Pro Suite - Film4k VIP 2099 & Admin Mock Module
 * Dedicated VIP handler for film4k.net (Zero bloat from other sites)
 */

module.exports = `
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
`;
