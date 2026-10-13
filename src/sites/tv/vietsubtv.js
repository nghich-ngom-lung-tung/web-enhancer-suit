module.exports = {
  "id": "vietsubtv",
  "name": "VietSubTV VIP & Cinema Pro Suite",
  "file": "vietsubtv.user.js",
  "desc": "Chặn sạch banner quảng cáo VietSubTV + Sniff M3U8 PotPlayer/VLC + Skip Intro 85s + Chế độ Rạp phim",
  "version": "5.2",
  "domains": [
    "*://*.vietsubtv.org/*",
    "*://*.vietsubtv.com/*",
    "*://*.vietsubtv.net/*"
  ],
  "siteCss": ".ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .vst-ads",
  "category": "tv"
};
