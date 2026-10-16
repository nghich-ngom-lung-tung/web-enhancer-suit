module.exports = {
  "id": "chophim",
  "name": "ChoPhim VIP & Cinema Pro Suite",
  "file": "chophim.user.js",
  "desc": "Chặn 100% quảng cáo Chợ Phim (ChoPhim.fun) + M3U8 Stream Sniffer PotPlayer/VLC + Cinema OLED HDR & Rạp Phim",
  "version": "5.4.9",
  "domains": [
    "*://chophim.fun/*",
    "*://www.chophim.fun/*",
    "*://*.chophim.fun/*"
  ],
  "includes": [
    "*://*chophim*/*"
  ],
  "siteCss": `
    .ad-container,
    .ads-holder,
    div[id*="ad-"],
    div[class*="banner-ads"],
    div[id*="catfish"],
    .ads-wrapper,
    #chancoc,
    .modal-adblock,
    [class*="ad-floater"]
  `,
  "category": "movies"
};
