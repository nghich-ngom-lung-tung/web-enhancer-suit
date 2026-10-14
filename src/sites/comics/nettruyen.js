module.exports = {
  "id": "nettruyen",
  "name": "NetTruyen VIP & Comic Reader Pro",
  "file": "nettruyen.user.js",
  "desc": "Diệt sạch 100% Ads / Popunder / Gambling Banner + Phím tắt đọc truyện A/D chuyển chap, W/S cuộn mượt, F fullscreen + Tối ưu khung hình đọc NetTruyen",
  "version": "5.4.5",
  "domains": [
    "*://*.nettruyen*.com/*",
    "*://*.nettruyen*.net/*",
    "*://*.nettruyen*.vn/*",
    "*://*.nettruyen*.me/*",
    "*://*.nettruyen*.org/*",
    "*://*.nettruyen*.top/*",
    "*://*.nettruyen*.cc/*",
    "*://*.nettruyen*.pro/*"
  ],
  "includes": [
    "*://*nettruyen*/*"
  ],
  "siteCss": `
    .banner.text-center,
    .banner,
    div[class*="banner"],
    #popup_content,
    .popup_content,
    .popup_layer,
    .iframe-content-mobile,
    .iframe-content-desktop,
    iframe[src*="acscdn.com"],
    div[id*="aclib"],
    #aclib,
    .catfish,
    #catfish,
    [class*="catfish"] {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    .reading-detail,
    .reading-detail .page-chapter {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      margin: 0 auto 12px auto !important;
      text-align: center !important;
      width: 100% !important;
    }
    .reading-detail img,
    .page-chapter img {
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
