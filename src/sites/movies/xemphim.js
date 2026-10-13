module.exports = {
  "id": "xemphim",
  "name": "XemPhim VIP & Cinema Pro Suite",
  "file": "xemphim.user.js",
  "desc": "Chặn quảng cáo XemPhim + M3U8 Stream Sniffer cho PotPlayer/VLC + Skip Intro 85s + Anime OLED HDR",
  "version": "5.2",
  "domains": [
    "*://*.xemphim.tv/*",
    "*://*.xemphim.in/*",
    "*://*.xemphim.club/*",
    "*://*.xemphim.fun/*",
    "*://*.xemphim.vip/*",
    "*://*.xemphim.org/*",
    "*://*.xemphim.click/*"
  ],
  "siteCss": ".ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .xp-ads",
  "category": "movies"
};
