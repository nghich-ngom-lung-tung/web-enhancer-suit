module.exports = {
  "id": "moviehdthai",
  "name": "MovieHDThai VIP & Cinema Pro Suite",
  "file": "moviehdthai.user.js",
  "desc": "Mở khóa VIP 2099 + Vô hạn Coin + Chặn 100% AdBlock/Player Guard + M3U8 Sniffer + 1-Click PotPlayer/VLC + Phím tắt Skip Intro & Cinema HDR",
  "version": "5.4.4",
  "isRophim": true,
  "domains": [
    "*://moviehdthai.com/*",
    "*://www.moviehdthai.com/*",
    "*://*.moviehdthai.com/*"
  ],
  "includes": [
    "*://*moviehdthai*/*"
  ],
  "siteCss": "\n      :root {\n        --primary-color: #51f085 !important;\n        --primary-text: #51f085 !important;\n      }\n      .dev.dev-up { color: #51f085 !important; }\n      .tag-imdb { border: 1px solid #51f085 !important; }\n      .tag-imdb:before { color: #51f085 !important; }\n      .app-box-fix { display: none !important; }\n      .tcoin-disabled .tcoin-menu-highlight { display: block !important; }\n      .tcoin-menu-highlight { display: block !important; }\n      .tcoin-disabled .tcoin-highlight { display: block !important; }\n      .tcoin-highlight__text .heading-xs { font-weight: bold !important; }\n      .ad-container, .ads-holder, div[id*=\"ad-\"], div[class*=\"banner-ads\"], div[id*=\"catfish\"], .ads-wrapper, #chancoc, .modal-adblock {\n        display: none !important;\n        visibility: hidden !important;\n        height: 0 !important;\n        opacity: 0 !important;\n        pointer-events: none !important;\n      }\n    ",
  "category": "movies"
};
