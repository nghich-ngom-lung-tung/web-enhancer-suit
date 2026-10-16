module.exports = {
  "id": "toptruyen",
  "name": "TopTruyen VIP & Comic Reader Pro",
  "file": "toptruyen.user.js",
  "desc": "Diệt sạch 100% Ads / Popunder / Video Ads + Phím tắt đọc truyện A/D chuyển chap, W/S cuộn mượt, F fullscreen + Tối ưu khung hình đọc TopTruyen",
  "version": "5.4.5",
  "isRophim": true,
  "vipModule": "comics",
  "domains": [
    "*://*.toptruyenzone12.com/*",
    "*://toptruyenzone12.com/*",
    "*://*.toptruyenzone*.com/*",
    "*://toptruyenzone*.com/*",
    "*://*.toptruyen*.com/*",
    "*://toptruyen*.com/*",
    "*://*.toptruyen*.net/*",
    "*://toptruyen*.net/*",
    "*://*.toptruyen*.org/*",
    "*://toptruyen*.org/*",
    "*://*.toptruyen.net/*",
    "*://toptruyen.net/*",
    "*://*.toptruyen.com/*",
    "*://toptruyen.com/*"
  ],
  "includes": [
    "*://*toptruyen*/*"
  ],
  "siteCss": `
    .advertisement,
    #video-chapter,
    div[id*="video-chapter"],
    div[class*="advertisement"],
    iframe[src*="chaseherbalpasty.com"],
    iframe[src*="dekkopinolin.com"],
    iframe[src*="crittereasilyhangover.com"],
    iframe[src*="google"],
    ins.adsbygoogle,
    .banner-qc,
    .catfish,
    #catfish,
    [class*="catfish"] {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    .page-chapter {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      margin: 0 auto 12px auto !important;
      text-align: center !important;
      width: 100% !important;
    }
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
