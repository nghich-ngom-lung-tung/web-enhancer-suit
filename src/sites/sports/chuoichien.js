module.exports = {
  id: "chuoichien",
  name: "Chuối Chiên TV VIP & Cinema Pro Suite",
  file: "chuoichien.user.js",
  desc: "Chặn 100% popup quảng cáo Chuối Chiên TV + Bắt link M3U8 bóng đá trực tiếp PotPlayer/VLC + Theater Mode",
  version: "5.3",
  category: "sports",
  domains: [
    "*://chuoichientv.me/*", "*://*.chuoichientv.me/*",
    "*://chuoichientv.link/*", "*://*.chuoichientv.link/*",
    "*://chuoichien.tv/*", "*://*.chuoichien.tv/*",
    "*://chuoichien.net/*", "*://*.chuoichien.net/*",
    "*://chuoichientv.info/*", "*://*.chuoichientv.info/*",
    "*://chuoichientv.xyz/*", "*://*.chuoichientv.xyz/*",
    "*://live*.chuoichientv.me/*"
  ],
  siteCss: `.banner-player, .banner-container, .banner-content, .banner-image, [class*="banner-player"], [class*="banner-container"], [class*="banner-content"], [class*="banner-image"], .banner-content.active, [class*="banner-content"][class*="active"], .bet-button, .bet-buttons, [class*="bet-button"], [class*="bet-buttons"], [class*="bet-btn"], [data-v-cede0d5b], img[src*="banner_player"], img[src*="FB88"], img[src*="fb88"], img[src*="net88"], img[src*="NET88"], img[src*="xBet"], .ads-container, .banner-ads, div[id*="ad_"], div[class*="ad_box"], .catfish, #catfish, div[style*="z-index: 9999999"]`
};
