module.exports = {
  "id": "motchill",
  "name": "Motchill VIP & Cinema Pro Suite",
  "file": "motchill.user.js",
  "desc": "Mở khóa VIP Pro 2099 Vĩnh Viễn + Vô hạn Coins + Chặn 100% AdBlock/Stream Guard + M3U8 Sniffer + 1-Click PotPlayer/VLC + Phím tắt Skip Intro & Anime HDR",
  "version": "5.4",
  "isRophim": true,
  "domains": [
    "*://phimmotchill.online/*",
    "*://*.phimmotchill.online/*",
    "*://motchill.online/*",
    "*://*.motchill.online/*",
    "*://motchilltv.org/*",
    "*://*.motchilltv.org/*",
    "*://motchilltv.com/*",
    "*://*.motchilltv.com/*",
    "*://phimmotchill.com/*",
    "*://*.phimmotchill.com/*",
    "*://phimmotchill.run/*",
    "*://*.phimmotchill.run/*",
    "*://phimmotchill.me/*",
    "*://*.phimmotchill.me/*",
    "*://motchill.moe/*",
    "*://*.motchill.moe/*",
    "*://motchilli.com/*",
    "*://*.motchilli.com/*",
    "*://motchilli.vip/*",
    "*://*.motchilli.vip/*",
    "*://motchill.in/*",
    "*://*.motchill.in/*"
  ],
  "includes": [
    "*://*motchill*/*",
    "*://*phimmotchill*/*"
  ],
  "siteCss": `
      :root {
        --color-primary: #51f085 !important;
        --primary-color: #51f085 !important;
        --primary-text: #51f085 !important;
      }
      .ad-container, .ads-holder, .banner-left, .banner-right, div[id*="ad-"], div[class*="banner-ads"], div[id*="catfish"], .ads-wrapper, #chancoc, .modal-adblock {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `,
  "category": "movies"
};
