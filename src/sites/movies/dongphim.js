module.exports = {
  "id": "dongphim",
  "name": "DongPhim VIP & Cinema Pro Suite",
  "file": "dongphim.user.js",
  "desc": "Chặn quảng cáo Động Phim + Bắt link M3U8 PotPlayer/VLC + Skip Intro 85s + Tăng cường màu sắc HDR & Chế độ Rạp phim",
  "version": "5.2",
  "domains": [
    "*://*.dongphim.net/*",
    "*://*.dongphym.net/*",
    "*://*.dongphim.cc/*",
    "*://*.dongphym.org/*",
    "*://*.dongphim.tv/*",
    "*://*.dongphim.me/*",
    "*://*.dongphim.vip/*"
  ],
  "siteCss": ".ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .dp-ads",
  "category": "movies"
};
