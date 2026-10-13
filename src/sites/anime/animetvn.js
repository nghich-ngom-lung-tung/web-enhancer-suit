module.exports = {
  "id": "animetvn",
  "name": "AnimeTVN VIP & Cinema Pro Suite",
  "file": "animetvn.user.js",
  "desc": "Chặn quảng cáo AnimeTVN + Vô hiệu hóa Stream Guard + Bắt link M3U8 PotPlayer/VLC + Skip Intro 85s + Anime OLED HDR",
  "version": "5.2",
  "domains": [
    "*://*.animetvn.com/*",
    "*://*.animetvn.tv/*",
    "*://*.animetvn.net/*"
  ],
  "siteCss": ".ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .atvn-ads",
  "category": "anime"
};
