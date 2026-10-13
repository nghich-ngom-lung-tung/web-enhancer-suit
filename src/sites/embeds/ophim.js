module.exports = {
  "id": "ophim",
  "name": "OPhim & KKPhim VIP & Cinema Pro Suite",
  "file": "ophim.user.js",
  "desc": "Chặn quảng cáo OPhim/KKPhim + Khắc chế Stream Guard + Bắt link M3U8 PotPlayer/VLC + Phím tắt Cinema Pro",
  "version": "5.2",
  "domains": [
    "*://*.ophim.cc/*",
    "*://*.ophim.live/*",
    "*://*.kkphim.com/*",
    "*://*.ophim1.com/*",
    "*://*.ophim.org/*"
  ],
  "siteCss": ".ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .ophim-ads",
  "category": "embeds"
};
