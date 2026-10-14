module.exports = {
  "id": "ghienphim",
  "name": "GhienPhim VIP & Cinema Pro Suite",
  "file": "ghienphim.user.js",
  "desc": "Chặn quảng cáo Ghiền Phim + Triệt tiêu Popunder / Bom88 + Bắt link M3U8 mở PotPlayer/VLC + Skip Intro 85s + Anime OLED HDR",
  "version": "5.4.5",
  "domains": [
    "*://*.ghienphimz.mom/*",
    "*://ghienphimz.mom/*",
    "*://*.ghienphimz.*/*",
    "*://*.ghienphim.net/*",
    "*://*.ghienphim.tv/*",
    "*://*.ghienphim.org/*",
    "*://*.ghienphim.*/*"
  ],
  "includes": [
    "*://*ghienphim*/*"
  ],
  "siteCss": `
    .ad-floater,
    .component.ads,
    .ads,
    .source-banner,
    .promotion-popup,
    .popuptet-bg,
    .new-target-goal,
    .new-floater-goal,
    .adtop,
    .ad-container,
    .ads-holder,
    .banner-left,
    .banner-right,
    div[id*="ad-"],
    div[class*="banner-ads"],
    div[id*="catfish"],
    .ads-wrapper,
    #chancoc,
    .modal-adblock,
    .ghienphim-ads,
    a[href*="bom88"],
    .catfish,
    #catfish,
    [class*="catfish"]
  `,
  "category": "movies"
};
