/**
 * Cinema Pro Suite - ChoPhim VIP 2099 & Pre-roll TVC Killer Module
 * Handles auto-login, subscriptionTier="premium", custom emoji & avatar frame persistence,
 * /api/subscription/* endpoints, React DOM removeChild defender, and eliminates all video ads on chophim.fun
 */

module.exports = `
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
`;
