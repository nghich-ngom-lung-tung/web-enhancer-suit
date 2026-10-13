module.exports = {
  "id": "subnhanh",
  "name": "SubNhanh VIP & Cinema Pro Suite",
  "file": "subnhanh.user.js",
  "desc": "Chặn quảng cáo SubNhanh + Vô hiệu hóa Stream Guard + Bắt link M3U8 PotPlayer/VLC + Phím tắt Skip Intro & Cinema Mode",
  "version": "5.2",
  "domains": [
    "*://*.subnhanh.org/*",
    "*://*.subnhanh.com/*",
    "*://*.subnhanh.vip/*",
    "*://*.subnhanh.online/*",
    "*://*.subnhanh.site/*",
    "*://*.subnhanh.tv/*",
    "*://*.subnhanh.top/*"
  ],
  "siteCss": ".ad-container, .ads-banner, div[class*=\"banner-ads\"], div[id*=\"ad_\"], .adsbox, #chancoc, .modal-adblock, div[style*=\"z-index: 9999999\"]",
  "category": "movies"
};
