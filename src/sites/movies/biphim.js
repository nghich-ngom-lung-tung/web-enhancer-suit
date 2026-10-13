module.exports = {
  "id": "biphim",
  "name": "BiPhim & PhimChill VIP & Cinema Pro Suite",
  "file": "biphim.user.js",
  "desc": "Chặn quảng cáo BiPhim/PhimChill + Bắt link M3U8 PotPlayer/VLC + Skip Intro 85s + Chế độ Rạp phim",
  "version": "5.2",
  "domains": [
    "*://*.biphim.net/*",
    "*://*.biphim.co/*",
    "*://*.phimchill.tv/*",
    "*://*.phimchill.net/*"
  ],
  "siteCss": ".ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .biphim-ads",
  "category": "movies"
};
