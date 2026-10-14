module.exports = {
  "id": "truyenqq",
  "name": "TruyenQQ VIP & Comic Reader Pro",
  "file": "truyenqq.user.js",
  "desc": "Diệt sạch 100% Ads / Popunder / Gambling Banner + Phím tắt đọc truyện A/D chuyển chap, W/S cuộn mượt, F fullscreen + Tối ưu khung hình đọc TruyenQQ",
  "version": "5.4.5",
  "domains": [
    "*://*.truyenqq*.com/*",
    "*://*.truyenqq*.vn/*",
    "*://*.truyenqq.vip/*",
    "*://*.truyenqq*.net/*",
    "*://*.truyenqq*.org/*",
    "*://*.truyenqq*.pro/*",
    "*://*.st.truyenqq*.com/*"
  ],
  "includes": [
    "*://*truyenqq*/*"
  ],
  "siteCss": `
    #top-banner-reading-container,
    #top-banner-reading-container-sub,
    #mid-banner-reading-container,
    #ad_info_top,
    #ad_info_2,
    #ad_info,
    div[id*="ad_info"],
    div[id*="banner-reading"],
    .community-banner,
    .banner-content,
    .banner-left,
    .banner-right,
    .catfish,
    #catfish,
    [class*="catfish"] {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    #chapter_content,
    .chapter_content_div,
    .story-see-content {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      margin: 0 auto 12px auto !important;
      text-align: center !important;
      width: 100% !important;
    }
    #chapter_content img,
    .chapter_content_div img,
    .story-see-content img {
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
