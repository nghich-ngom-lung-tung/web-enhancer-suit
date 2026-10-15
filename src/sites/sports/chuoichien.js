module.exports = {
  id: "chuoichien",
  name: "Chuối Chiên TV VIP & Cinema Pro Suite",
  file: "chuoichien.user.js",
  desc: "Chặn 100% popup quảng cáo Chuối Chiên TV + Bắt link M3U8 bóng đá trực tiếp PotPlayer/VLC + Auto VIP Login 2099 + Theater Mode",
  version: "5.4.7",
  category: "sports",
  isRophim: true,
  domains: [
    "*://chuoichientv.me/*", "*://*.chuoichientv.me/*",
    "*://live08.chuoichientv.me/*", "*://live07.chuoichientv.me/*",
    "*://chuoichientv.link/*", "*://*.chuoichientv.link/*",
    "*://chuoichien.tv/*", "*://*.chuoichien.tv/*",
    "*://chuoichien.net/*", "*://*.chuoichien.net/*",
    "*://chuoichientv.info/*", "*://*.chuoichientv.info/*",
    "*://chuoichientv.xyz/*", "*://*.chuoichientv.xyz/*"
  ],
  includes: [
    "*://*chuoichientv*/*",
    "*://*chuoichien*/*"
  ],
  siteCss: `.ads-layer, [class*="ads-layer"], div.ads-layer, .player-logo-wrapper, .player-logo-inner, .player-logo-ad, [class*="player-logo-"], [class*="player-logo"], .bet-button-player, .bet-buttons-container, .bet-button-content, button.bet-button-content, [class*="bet-button-player"], [class*="bet-buttons-container"], [class*="bet-button-content"], [data-v-77ed3802], [data-v-77cd3882], [data-v-cede0d5b], [data-v-4c9315d7], .banner-player, .banner-container, .banner-content, .banner-image, img.banner-image, .banner-item, [class*="banner-player"], [class*="banner-container"], [class*="banner-content"], [class*="banner-image"], [class*="banner-item"], .banner-content.active, [class*="banner-content"][class*="active"], .bet-button, .bet-buttons, [class*="bet-button"], [class*="bet-buttons"], [class*="bet-btn"], [data-position*="bet-button"], [data-position="live-under-player"], [data-position*="catfish"], .ad-wrapper, .ad-container, [class*="ad-container"], img[alt*="FB88_banner_player"], img[alt*="net-88-banner-player"], img[alt*="net-88-logo"], img[alt*="banner_player"], img[src*="1920x60"], img[src*="cdnvip.chuoichientv.net"], img[src*="c5735ef8"], a[href*="net88.boats"], a[href*="logolive-30x30"], img[src*="FB88"], img[src*="fb88"], img[src*="net88"], img[src*="NET88"], img[src*="xBet"], .ads-container, .banner-ads, div[id*="ad_"], div[class*="ad_box"], .catfish, #catfish, div[style*="z-index: 9999999"]`
};
