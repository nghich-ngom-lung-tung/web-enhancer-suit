module.exports = {
  "id": "motphim",
  "name": "MotPhim VIP & Cinema Pro Suite",
  "file": "motphim.user.js",
  "desc": "Chặn 100% quảng cáo Mọt Phim + Tóm link M3U8 PotPlayer/VLC + Skip Intro 85s + Bộ lọc Anime OLED HDR",
  "version": "5.2",
  "domains": [
    "*://*.motphim.to/*",
    "*://*.motphimtv.me/*",
    "*://*.motphimtv.top/*",
    "*://*.motphim.net/*"
  ],
  "siteCss": ".ad-container, .ads-holder, .banner-left, .banner-right, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock, .motphim-ads",
  "category": "movies"
};
