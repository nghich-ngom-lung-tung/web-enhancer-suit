/**
 * Cinema Pro Suite - Sports & Chuối Chiên TV VIP Engine
 * Dedicated VIP handler for chuoichientv / cctvsignal
 */

module.exports = `
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
`;
