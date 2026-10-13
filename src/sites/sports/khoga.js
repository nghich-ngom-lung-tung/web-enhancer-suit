module.exports = {
  id: "khoga",
  name: "Khô Gà TV (KhogaLive) VIP & Cinema Pro Suite",
  file: "khoga.user.js",
  desc: "Diệt sạch banner cá cược Khô Gà TV + Tóm link M3U8/FLV mở PotPlayer/VLC + Chế độ Sân Cỏ Theater Mode siêu nét",
  version: "5.3",
  category: "sports",
  domains: [
    "*://khoga.live/*", "*://*.khoga.live/*",
    "*://khoga1.live/*", "*://*.khoga1.live/*",
    "*://khoga.tv/*", "*://*.khoga.tv/*",
    "*://khoga.net/*", "*://*.khoga.net/*",
    "*://khogatv.com/*", "*://*.khogatv.com/*",
    "*://khogatv.net/*", "*://*.khogatv.net/*"
  ],
  siteCss: `div[class*="catfish"], div[class*="banner_"], div[class*="ads_"], .ads-holder, #catfish, a[href*="telegram"], a[href*="t.me/khoga"], div[style*="z-index: 9999999"]`
};
