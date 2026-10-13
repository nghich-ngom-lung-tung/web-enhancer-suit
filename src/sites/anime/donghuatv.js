module.exports = {
  "id": "donghuatv",
  "name": "DongHuaTV VIP & Cinema Pro Suite",
  "file": "donghuatv.user.js",
  "desc": "Chặn quảng cáo DongHuaTV + Sniff luồng M3U8 PotPlayer/VLC + Tua Intro 85s + Anime OLED HDR rực rỡ",
  "version": "5.2",
  "domains": [
    "*://*.donghuatv.com/*",
    "*://*.donghua.tv/*",
    "*://*.donghuatv.net/*",
    "*://*.donghuatv.top/*"
  ],
  "siteCss": ".ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .dhtv-ads",
  "category": "anime"
};
