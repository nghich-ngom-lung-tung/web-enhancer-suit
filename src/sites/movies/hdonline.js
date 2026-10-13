module.exports = {
  "id": "hdonline",
  "name": "HDOnline VIP & Cinema Pro Suite",
  "file": "hdonline.user.js",
  "desc": "Chặn 100% quảng cáo HDOnline + Bắt link M3U8 PotPlayer/VLC + Skip Intro 85s + Cinema Mode",
  "version": "5.2",
  "domains": [
    "*://*.hdonline.co/*",
    "*://*.hdonline.tv/*"
  ],
  "siteCss": ".ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .hdo-ads",
  "category": "movies"
};
