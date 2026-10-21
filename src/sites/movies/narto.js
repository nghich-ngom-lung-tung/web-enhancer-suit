module.exports = {
  id: "narto",
  name: "Narto Drama VIP & Cinema Pro Suite",
  file: "narto.user.js",
  desc: "Chặn quảng cáo Adsterra / Popunder / VAST Narto Drama + Mở khóa VIP 2099 No Ads + Bắt link M3U8 phim ngắn drama + OLED HDR Filter",
  version: "1.0.0",
  category: "movies",
  isRophim: true,
  vipModule: "rophim",
  domains: [
    "*://narto-drama.com/*",
    "*://*.narto-drama.com/*",
    "*://stream.narto-drama.com/*",
    "*://edge.narto-drama.com/*",
    "*://*.mydramawave.com/*"
  ],
  includes: [
    "*://*narto-drama*/*"
  ],
  siteCss: `
    #adsterra-top-banner,
    #adsterra-top-banner-inner,
    #adsterra-top-banner-frame,
    #adsterra-top-banner-slot,
    .nd-adsterra-card-inner,
    .nd-adsterra-card-frame,
    .nd-hilltop-card-banner-slot,
    [data-adsterra-key],
    [data-adsterra-mounted],
    .nd-timegate-popup,
    .player-subscribe-overlay,
    .nd-vast-overlay,
    .nd-vast-banner,
    .vast-ad-banner-slot,
    .vast-adsterra-wrap,
    [id*="adsterra"],
    [class*="adsterra"],
    [class*="vast-banner"],
    #nd-auth-modal,
    .nd-auth-modal,
    .nd-auth-backdrop,
    .nd-auth-card,
    #nd-auth-title,
    .nd-auth-tabs,
    .nd-auth-panel,
    iframe[src*="bancadeltempoidea"],
    iframe[src*="highperformanceformat"],
    iframe[src*="timely-hello"],
    iframe[src*="untimely-hello"],
    iframe[src*="splendid-garage"],
    iframe[src*="omg10"],
    iframe[src*="juicyads"],
    iframe[src*="magsrv"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      height: 0 !important;
      width: 0 !important;
    }
  `
};
