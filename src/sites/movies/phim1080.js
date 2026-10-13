module.exports = {
  "id": "phim1080",
  "name": "Phim1080 VIP & Cinema Pro Suite",
  "file": "phim1080.user.js",
  "desc": "Chặn sạch banner quảng cáo Phim1080 + Tóm link M3U8 PotPlayer/VLC + Skip Intro 85s + Chế độ Rạp phim",
  "version": "5.2",
  "domains": [
    "*://*.phim1080z.org/*",
    "*://*.phim1080.net/*",
    "*://*.phim1080.me/*",
    "*://*.phim1080.vip/*",
    "*://*.phim1080.org/*",
    "*://*.phim1080.in/*"
  ],
  "siteCss": ".ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .p1080-ads",
  "category": "movies"
};
