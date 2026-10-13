module.exports = {
  "id": "ssphim",
  "name": "SSPhim VIP & Cinema Pro Suite",
  "file": "ssphim.user.js",
  "desc": "Chặn sạch quảng cáo SSPhim + Tóm link M3U8 PotPlayer/VLC + Skip Intro 85s + Anime OLED HDR rực rỡ & Chế độ Rạp phim",
  "version": "5.2",
  "domains": [
    "*://*.ssphim.net/*",
    "*://*.ssphim.tv/*",
    "*://*.ssphim.org/*",
    "*://*.ssphim.cc/*"
  ],
  "siteCss": ".ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .ss-ads",
  "category": "movies"
};
