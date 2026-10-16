module.exports = {
  "id": "mephim",
  "name": "MePhim VIP & Cinema Pro Suite",
  "file": "mephim.user.js",
  "desc": "Diệt sạch quảng cáo Mê Phim TV + M3U8 Stream Sniffer PotPlayer/VLC + Tua Intro 85s + Chế độ Rạp phim",
  "version": "5.5.0",
  "vipModule": "mephim",
  "domains": [
    "*://*.mephimtv.com/*",
    "*://*.mephim.net/*",
    "*://*.mephim.tv/*",
    "*://mephim.ddns.net/*",
    "*://*.mephim.ddns.net/*"
  ],
  "includes": [
    "*://*mephim*/*"
  ],
  "siteCss": ".ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .mephim-ads, #user-anon-trigger ~ div",
  "category": "movies"
};
