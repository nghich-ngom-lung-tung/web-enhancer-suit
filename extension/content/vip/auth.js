/**
 * Cinema Pro Suite - Identity & Auth Tokens Module
 * Covers: Firebase Auth & Session Credentials
 */
(() => {
  "use strict";
  const VIP = window.VIP_REGISTRY || { registerMock: () => {}, registerPatcher: () => {} };
  const VIP_EXPIRY_DATE = VIP.VIP_EXPIRY_DATE || new Date(2099, 6, 18, 0, 0, 0);
  const VIP_EXPIRY_TIMESTAMP = VIP.VIP_EXPIRY_TIMESTAMP || Math.floor(VIP_EXPIRY_DATE.getTime() / 1000);
  const COIN_BALANCE = VIP.COIN_BALANCE || 999999999;


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


  if (VIP.registerMock && typeof handleFirebaseMock === "function") {
    VIP.registerMock(handleFirebaseMock);
  }

  window.handleFirebaseMock = typeof handleFirebaseMock === "function" ? handleFirebaseMock : undefined;
})();
