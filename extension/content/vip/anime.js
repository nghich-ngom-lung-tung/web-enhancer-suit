/**
 * Cinema Pro Suite - Anime & Animation VIP Module
 * Covers: NetAnime, Hoạt Hình 3D, AnimeHay, VuiGhe
 */
(() => {
  "use strict";
  const VIP = window.VIP_REGISTRY || { registerMock: () => {}, registerPatcher: () => {} };

  if (VIP.registerPatcher) {
    VIP.registerPatcher((data, url) => {
      if (url && (url.includes("netanime") || (typeof location !== "undefined" && location.hostname && location.hostname.includes("netanime")))) {
        if (data && typeof data === "object") {
          data.is_vip = true;
          data.is_premium = true;
          data.coin_balance = 999999999;
          data.thungBalance = 999999999;
        }
      }
      return data;
    });
  }
})();
