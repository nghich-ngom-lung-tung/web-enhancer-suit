module.exports = {
  id: "chuoichien",
  name: "Chuối Chiên TV VIP & Cinema Pro Suite",
  file: "chuoichien.user.js",
  desc: "Chặn 100% popup quảng cáo Chuối Chiên TV + Bắt link M3U8 bóng đá trực tiếp PotPlayer/VLC + Auto VIP Login 2099 + Theater Mode",
  version: "5.4.9",
  category: "sports",
  isRophim: true,
  vipModule: "sports",
  domains: [
    "*://chuoichientv.me/*", "*://*.chuoichientv.me/*",
    "*://live*.chuoichientv.me/*",
    "*://live08.chuoichientv.me/*", "*://live07.chuoichientv.me/*",
    "*://chuoichientv.link/*", "*://*.chuoichientv.link/*",
    "*://chuoichien.tv/*", "*://*.chuoichien.tv/*",
    "*://chuoichien.net/*", "*://*.chuoichientv.net/*",
    "*://chuoichientv.info/*", "*://*.chuoichientv.info/*",
    "*://chuoichientv.xyz/*", "*://*.chuoichientv.xyz/*",
    "*://*.chuoichientv1.live/*", "*://chuoichientv1.live/*",
    "*://*.chuoichien*.live/*",
    "*://*.chuoichientv.football/*", "*://chuoichientv.football/*",
    "*://*.cctvsignal.xyz/*", "*://cctvsignal.xyz/*",
    "*://*.cctvsignal.*/*", "*://fhd-*.cctvsignal.xyz/*"
  ],
  includes: [
    "*://*chuoichientv*/*",
    "*://*chuoichien*/*",
    "*://*cctvsignal*/*"
  ],
  siteCss: `html body [data-v-4c9315d7].banner-content, html body [data-v-4c9315d7].banner-canvas, html body [data-v-4c9315d7].banner-image, html body img[data-v-4c9315d7], html body div[data-v-4c9315d7].banner-item, html body [data-v-cede0d5b], html body .bet-button-content, html body button.bet-button-content, html body [class*="bet-button-content"], html body .bet-button-player, html body .bet-buttons-container, html body [class*="bet-buttons-container"], html body .banner-canvas, html body div.banner-canvas, html body [class*="banner-canvas"], html body .banner-content, html body div.banner-content, html body [class*="banner-content"], html body .banner-container, html body div.banner-container, html body [class*="banner-container"], html body .banner-image, html body img.banner-image, html body [class*="banner-image"], html body .banner-item, html body [class*="banner-item"], html body .ads-layer, html body [class*="ads-layer"], html body div.ads-layer, html body .player-logo-wrapper, html body .player-logo-inner, html body .player-logo-ad, html body [class*="player-logo-"], html body [class*="player-logo"], html body [data-v-77ed3802], html body [data-v-77cd3882], html body .bet-button, html body .bet-buttons, html body [class*="bet-button"], html body [class*="bet-buttons"], html body [class*="bet-btn"], html body [data-position*="bet-button"], html body [data-position="live-under-player"], html body [data-position*="catfish"], html body .ad-wrapper, html body .ad-container, html body [class*="ad-container"], html body img[alt*="FB88_banner_player"], html body img[alt*="net-88-banner-player"], html body img[alt*="net-88-logo"], html body img[alt*="banner_player"], html body img[alt*="banner-player"], html body img[src*="1920x60"], html body img[src*="cdnvip.chuoichientv.net"], html body img[src*="c5735ef8"], html body a[href*="net88.boats"], html body a[href*="logolive-30x30"], html body img[src*="FB88"], html body img[src*="fb88"], html body img[src*="net88"], html body img[src*="NET88"], html body img[src*="xBet"], html body .ads-container, html body .banner-ads, html body div[id*="ad_"], html body div[class*="ad_box"], html body .catfish, html body #catfish, html body div[style*="z-index: 9999999"], html body .boxchat-sticky-ad, html body [class*="boxchat-sticky-ad"], html body .login-prompt {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  position: absolute !important;
  top: -99999px !important;
  left: -99999px !important;
  width: 0 !important;
  height: 0 !important;
  max-width: 0 !important;
  max-height: 0 !important;
  clip: rect(0, 0, 0, 0) !important;
  margin: 0 !important;
  padding: 0 !important;
}`
};

