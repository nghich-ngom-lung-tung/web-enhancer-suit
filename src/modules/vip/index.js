/**
 * Cinema Pro Suite - VIP Engine Modular Orchestrator
 * Generates tailored, zero-bloat VIP mock modules for each site.
 */

const film4kCode = require("./film4k");
const motchillCode = require("./motchill");
const sportsCode = require("./sports");
const comicsCode = require("./comics");
const firebaseCode = require("./firebase");
const rophimCode = require("./rophim");
const chophimCode = require("./chophim");
const mephimCode = require("./mephim");

const MODULES = {
  film4k: film4kCode,
  motchill: motchillCode,
  sports: sportsCode,
  comics: comicsCode,
  firebase: firebaseCode,
  rophim: rophimCode,
  chophim: chophimCode,
  mephim: mephimCode
};

function getVipCode(moduleType) {
  if (!moduleType) return "";

  const types = Array.isArray(moduleType)
    ? moduleType
    : (moduleType === "all" ? Object.keys(MODULES) : [moduleType]);

  const activeCodes = types
    .map(t => MODULES[t])
    .filter(Boolean)
    .join("\n\n");

  if (!activeCodes) return "";

  return `
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

${activeCodes}

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
    if (url && (url.includes("/notification") || url.includes("notification"))) {
      if (data && typeof data === "object") {
        if (!Array.isArray(data.notificationsMovie)) data.notificationsMovie = [];
        if (!Array.isArray(data.notificationsOther)) data.notificationsOther = [];
        if (typeof data.unreadCountMovie !== "number") data.unreadCountMovie = 0;
        if (typeof data.unreadCountOther !== "number") data.unreadCountOther = 0;
        if (data.data && typeof data.data === "object") {
          if (!Array.isArray(data.data.notificationsMovie)) data.data.notificationsMovie = [];
          if (!Array.isArray(data.data.notificationsOther)) data.data.notificationsOther = [];
          if (typeof data.data.unreadCountMovie !== "number") data.data.unreadCountMovie = 0;
          if (typeof data.data.unreadCountOther !== "number") data.data.unreadCountOther = 0;
        }
      }
      return data;
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
`;
}

module.exports = {
  getVipCode,
  MODULES
};
