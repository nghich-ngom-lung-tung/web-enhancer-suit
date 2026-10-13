module.exports = {
  "id": "ghienphim",
  "name": "GhienPhim VIP & Cinema Pro Suite",
  "file": "ghienphim.user.js",
  "desc": "Chặn quảng cáo Ghiền Phim + Bắt link M3U8 mở PotPlayer/VLC + Skip Intro 85s + Anime OLED HDR",
  "version": "5.2",
  "domains": [
    "*://*.ghienphim.net/*",
    "*://*.ghienphim.tv/*",
    "*://*.ghienphim.org/*"
  ],
  "siteCss": ".ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .ghienphim-ads",
  "category": "movies"
};
