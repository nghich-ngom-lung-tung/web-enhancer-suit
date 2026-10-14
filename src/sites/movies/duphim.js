module.exports = {
  "id": "duphim",
  "name": "DuPhim VIP & Cinema Pro Suite",
  "file": "duphim.user.js",
  "desc": "Chặn quảng cáo Đu Phim (DuPhim) + Triệt tiêu Popunder / Khuyến mãi + Bắt link M3U8 mở PotPlayer/VLC + Skip Intro 85s + Anime OLED HDR",
  "version": "5.4.5",
  "domains": [
    "*://*.duphim.social/*",
    "*://duphim.social/*",
    "*://*.duphim.*/*",
    "*://duphim.*/*"
  ],
  "includes": [
    "*://*duphim*/*"
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
    a[href*="ok999"],
    a[href*="bom88"],
    .catfish,
    #catfish,
    [class*="catfish"]
  `,
  "category": "movies"
};
