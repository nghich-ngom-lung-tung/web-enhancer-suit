module.exports = {
  id: "giovang",
  name: "Giờ Vàng TV (Giovang) VIP & Cinema Pro Suite",
  file: "giovang.user.js",
  desc: "Chặn 100% banner cá cược Giờ Vàng TV + Bắt link M3U8 trực tiếp mở PotPlayer/VLC 60fps + Chế độ Sân Cỏ Theater Mode",
  version: "5.3",
  category: "sports",
  domains: [
    "*://giovang.tax/*", "*://*.giovang.tax/*",
    "*://giovang.tv/*", "*://*.giovang.tv/*",
    "*://giovang.net/*", "*://*.giovang.net/*",
    "*://giovang.live/*", "*://*.giovang.live/*",
    "*://giovangtv.net/*", "*://*.giovangtv.net/*",
    "*://giovangtv.org/*", "*://*.giovangtv.org/*"
  ],
  siteCss: `.gv-skeleton-banner, .gv-skeleton-banner-main, .banner-match, div[class*="gv-skeleton-banner"], div[class*="banner-match"], div[id*="banner-match"], .ads-banner, #catfish, div[style*="z-index: 9999999"]`
};
