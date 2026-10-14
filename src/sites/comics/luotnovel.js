module.exports = {
  "id": "luotnovel",
  "name": "LuotNovel VIP & Reader Pro",
  "file": "luotnovel.user.js",
  "desc": "Diệt sạch 100% Ads / Popups / Mission Ads + Phím tắt đọc truyện chữ & truyện tranh A/D chuyển chap, W/S cuộn mượt, F fullscreen + Tối ưu font chữ, lề đọc LuotNovel",
  "version": "5.4.5",
  "domains": [
    "*://*.luotnovel1.site/*",
    "*://luotnovel1.site/*",
    "*://*.luotnovel*.site/*",
    "*://*.luotnovel.com/*",
    "*://luotnovel.com/*"
  ],
  "includes": [
    "*://*luotnovel*/*"
  ],
  "siteCss": `
    #ads,
    .wrapper-ads,
    .mission-ads,
    .tr-ads-click,
    .popup-noti,
    .notification-popup,
    #couter-wrapper,
    [class*="mission-ads"],
    .banner-bottom,
    .catfish,
    #catfish,
    [class*="catfish"] {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    .chapter-detail,
    .reading-detail,
    #scontent,
    .scontent,
    .box_text {
      max-width: 960px !important;
      margin: 0 auto !important;
      line-height: 1.8 !important;
      font-size: 19px !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
      word-break: break-word !important;
    }
    .chapter-detail img,
    .reading-detail img,
    .page-chapter img {
      display: block !important;
      margin: 12px auto !important;
      max-width: 1000px !important;
      width: auto !important;
      height: auto !important;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
      border-radius: 4px;
    }
  `,
  "category": "comics"
};
