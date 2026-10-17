/**
 * Cinema Pro Suite - RoPhim, CoBePhim, MovieHDThai & NetAnime VIP 2099 Module
 * Dedicated VIP handler for Rophim family sites
 */

module.exports = `
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
          if (node.nodeValue && /\\b0\\s*TCoin\\b/.test(node.nodeValue)) {
            node.nodeValue = node.nodeValue.replace(/\\b0\\s*TCoin\\b/g, "999,999,999 TCoin");
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
    if (url.includes("/notifications") || url.includes("/notification") || url.includes("notification")) {
      const emptyNoti = {
        notificationsMovie: [],
        notificationsOther: [],
        unreadCountMovie: 0,
        unreadCountOther: 0
      };
      return JSON.stringify({
        status: true,
        statusCode: 200,
        code: 200,
        notificationsMovie: [],
        notificationsOther: [],
        unreadCountMovie: 0,
        unreadCountOther: 0,
        data: emptyNoti,
        result: emptyNoti,
        items: [],
        unreadCount: 0,
        unread_count: 0
      });
    }

    return null;
  }
`;
