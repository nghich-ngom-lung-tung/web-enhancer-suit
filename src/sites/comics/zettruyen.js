module.exports = {
  "id": "zettruyen",
  "name": "ZetTruyen VIP & Comic Reader Pro",
  "file": "zettruyen.user.js",
  "desc": "Diệt sạch 100% Ads / Popunder / Stealth Widget + Phím tắt đọc truyện A/D chuyển chap, W/S cuộn mượt, F fullscreen + Tối ưu khung hình đọc ZetTruyen",
  "version": "5.4.5",
  "domains": [
    "*://*.zettruyen3.com/*",
    "*://*.zettruyen.com/*",
    "*://*.zettruyen.net/*",
    "*://*.zettruyen.org/*"
  ],
  "siteCss": `
    .ads-tool-banner-container,
    .close-catfish,
    [data-zone],
    [data-zone="top"],
    [data-zone="top_content"],
    [data-zone="bottom"],
    div[style*="z-index: 2147483000"],
    div[style*="z-index: 2147483001"],
    div[id*="aclib"],
    #aclib,
    iframe[src*="acscdn.com"],
    iframe[src*="yougetwhatyoupayfor.net"],
    .catfish,
    #catfish,
    [class*="catfish"],
    #banners-container,
    .banners-container {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    .chapter-images-container {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      gap: 12px !important;
      width: 100% !important;
      max-width: 1000px !important;
      margin: 0 auto !important;
    }
    .chapter-images-container img {
      display: block !important;
      margin: 0 auto !important;
      max-width: 100% !important;
      height: auto !important;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
      border-radius: 4px;
    }
  `,
  "category": "comics"
};
