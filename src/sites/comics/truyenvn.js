module.exports = {
  "id": "truyenvn",
  "name": "TruyenVN VIP & Comic Reader Pro",
  "file": "truyenvn.user.js",
  "desc": "Diệt sạch 100% Ads / Popunder + Phím tắt đọc truyện A/D chuyển chap, W/S cuộn mượt, F fullscreen + Tối ưu khung hình đọc TruyenVN",
  "version": "5.4.5",
  "domains": [
    "*://*.truyenvn.co/*",
    "*://*.truyenvn*.com/*",
    "*://*.truyenvn*.vip/*",
    "*://*.truyenvn*.pro/*",
    "*://*.truyenvn*.net/*"
  ],
  "includes": [
    "*://*truyenvn*/*"
  ],
  "siteCss": `
    .ads-static-header,
    .ads-static-home-detail-chapter,
    .ads-static-home-middle,
    div[class*="ads-static"],
    .catfish,
    #catfish,
    [class*="catfish"] {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    .chapter-content,
    .content-container {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      margin: 0 auto 12px auto !important;
      text-align: center !important;
      width: 100% !important;
    }
    .chapter-content img,
    .content-container img {
      display: block !important;
      margin: 0 auto !important;
      max-width: 1000px !important;
      width: auto !important;
      height: auto !important;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
      border-radius: 4px;
    }
  `,
  "category": "comics"
};
