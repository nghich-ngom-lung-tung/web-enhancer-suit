/**
 * Cinema Pro Suite - MePhim VIP Admin 2099 Module
 * Handles auto-login, Admin/QTV permissions, and instant modal bypass on mephim
 */

module.exports = `
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
`;
