module.exports = {
  "id": "ghientruyen",
  "name": "GhienTruyen VIP Reader Pro Suite",
  "file": "ghientruyen.user.js",
  "desc": "Tự động mở khóa đọc VIP GhienTruyen + Chặn sạch Banner / Popunder + Phím tắt A/D chuyển chương + W/S cuộn mượt + F toàn màn hình",
  "version": "5.4.6",
  "isRophim": true,
  "domains": [
    "*://*.ghientruyen.net/*",
    "*://ghientruyen.net/*",
    "*://*.ghientruyen.org/*",
    "*://ghientruyen.org/*",
    "*://*.ghientruyen.*/*"
  ],
  "includes": [
    "*://*ghientruyen*/*"
  ],
  "siteCss": `
    .advertisement,
    .ad-container,
    .ads-holder,
    .banner-qc,
    .ads,
    [class*="banner-ads"],
    div[id*="ad-"],
    div[id*="catfish"],
    .ads-wrapper,
    #chancoc,
    .modal-adblock,
    .catfish,
    #catfish,
    [class*="catfish"],
    iframe[src*="seotraffic.io.vn"],
    iframe[src*="acscdn.com"],
    iframe[src*="chaseherbalpasty.com"],
    iframe[src*="dekkopinolin.com"],
    a[href*="bet"],
    a[href*="casino"]
  `,
  "category": "comics"
};
