module.exports = {
  "id": "fullphim",
  "name": "FullPhim VIP & Cinema Pro Suite",
  "file": "fullphim.user.js",
  "desc": "Chặn sạch banner quảng cáo FullPhim + Sniff luồng M3U8 PotPlayer/VLC + Skip Intro 85s + Cinema Theater Mode",
  "version": "5.2",
  "domains": [
    "*://*.fullphim.net/*",
    "*://*.fullphim.tv/*",
    "*://*.fullphim.org/*"
  ],
  "siteCss": ".ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .fullphim-ads",
  "category": "movies"
};
