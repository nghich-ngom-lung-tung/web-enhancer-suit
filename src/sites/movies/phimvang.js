module.exports = {
  "id": "phimvang",
  "name": "PhimVang VIP & Cinema Pro Suite",
  "file": "phimvang.user.js",
  "desc": "Chặn sạch banner quảng cáo Phim Vàng + M3U8 Stream Sniffer PotPlayer/VLC + Skip Intro 85s + Rạp phim",
  "version": "5.2",
  "domains": [
    "*://*.phimvang.com/*",
    "*://*.phimvang.tv/*"
  ],
  "siteCss": ".ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .pv-ads",
  "category": "movies"
};
