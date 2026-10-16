module.exports = {
  "id": "film4k",
  "name": "Film4k VIP & Cinema Pro Suite",
  "file": "film4k.user.js",
  "desc": "Mở khóa 4K UHD + Tự động bỏ qua Landing Gate & Popup + M3U8 Sniffer + 1-Click PotPlayer/VLC + Cinema HDR & OLED",
  "version": "5.4.4",
  "domains": [
    "*://film4k.net/*",
    "*://www.film4k.net/*",
    "*://film4knet.ngaodacopho.workers.dev/*",
    "*://*.film4knet.ngaodacopho.workers.dev/*"
  ],
  "includes": [
    "*://*film4k*/*"
  ],
  "siteCss": `
    .landing-ad, dialog.cdlg, .cdlg {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    body.ro-theater-active .player-media-root,
    body.ro-theater-active .watch-player {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 999999 !important;
      background: #000 !important;
    }
  `,
  "category": "movies"
};
