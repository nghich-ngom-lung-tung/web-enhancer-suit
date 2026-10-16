/**
 * Cinema Pro Suite - ChoPhim VIP 2099 & Pre-roll TVC Killer Module
 * Handles auto-login, subscriptionTier="premium", and eliminates all video ads on chophim.fun
 */

module.exports = `
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
      const skipButtons = document.querySelectorAll("div[class*='z-[70]'] button, button:has(span)");
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
      const loginModals = document.querySelectorAll("div[class*='fixed'][class*='inset-0'], div[role='dialog']");
      loginModals.forEach(m => {
        const text = m.textContent || "";
        if ((text.includes("Đăng nhập") || text.includes("Đăng ký")) && (text.includes("Cloudflare") || text.includes("Turnstile") || text.includes("Mật khẩu") || text.includes("Google"))) {
          const closeBtn = m.querySelector("button[aria-label*='close' i], button[aria-label*='đóng' i], button svg.lucide-x, button:has(svg)");
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

    // 1. Current Auth Me check
    if (url.includes("/api/auth/me") || url.includes("/auth/me")) {
      return JSON.stringify({
        user: u,
        blocked: false,
        temporary: false
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

    // 6. Watch history & user bookmarks/notifications bypass (prevent 401s)
    if (url.includes("/api/watch-history") || url.includes("/watch-history")) {
      return JSON.stringify({ success: true, history: [], items: [], data: [] });
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

    // 7. Block direct ad requests
    if (url.includes("/ads/i9.mp4") || (url.includes("/ads/") && url.endsWith(".mp4"))) {
      return JSON.stringify({ blocked: true });
    }

    return null;
  }
`;
