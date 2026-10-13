module.exports = {
  "id": "topsub",
  "name": "TopSub VIP & Cinema Pro Suite",
  "file": "topsub.user.js",
  "desc": "Chặn 100% quảng cáo TopSub Vietsub + Vô hiệu hóa Stream Guard + Bắt link M3U8 PotPlayer/VLC + Phím tắt Skip Intro 85s & Anime HDR",
  "version": "5.2",
  "domains": [
    "*://*.topsub.org/*",
    "*://*.topsub.net/*",
    "*://*.topsub.tv/*",
    "*://*.topsub.site/*"
  ],
  "siteCss": ".ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .ts-ads",
  "category": "movies"
};
