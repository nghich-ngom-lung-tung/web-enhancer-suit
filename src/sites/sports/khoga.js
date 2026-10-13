module.exports = {
  id: "khoga",
  name: "Khô Gà TV (KhogaLive) VIP & Cinema Pro Suite",
  file: "khoga.user.js",
  desc: "Diệt sạch banner cá cược Khô Gà TV + Tóm link M3U8/FLV mở PotPlayer/VLC + Chế độ Sân Cỏ Theater Mode siêu nét",
  version: "5.4",
  category: "sports",
  domains: [
    "*://khoga.live/*", "*://*.khoga.live/*",
    "*://khoga1.live/*", "*://*.khoga1.live/*",
    "*://khoga.tv/*", "*://*.khoga.tv/*",
    "*://khoga.net/*", "*://*.khoga.net/*",
    "*://khogatv.com/*", "*://*.khogatv.com/*",
    "*://khogatv.net/*", "*://*.khogatv.net/*"
  ],
  includes: [
    "*://*khoga*/*"
  ],
  siteCss: `div[class*="catfish"], div[class*="banner_"], div[class*="ads_"], .ads-holder, #catfish, a[href*="telegram"], a[href*="t.me/khoga"], [class*="banner-pos-"], [class*="ad-strip-pos"], [class*="ad-popup-modal"], [class*="banner-pos"], [id*="banner-pos"], a[href*="fb88.com"], div[style*="z-index: 9999999"]`
};
