/**
 * Cinema Pro Suite - Comics VIP Engine (TopTruyen & ZetTruyen)
 * Dedicated VIP handler for toptruyen & zettruyen
 */

module.exports = `
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
`;
