# 🎬 Web Enhancer Suite - Cinema Pro & Comic Edition v5.4.6

![Version](https://img.shields.io/badge/Version-5.4.6_Modular_Architecture-blue?style=for-the-badge&logo=javascript)
![Tests](https://img.shields.io/badge/Tests-1035%2F1035_Passed-success?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-100%25_Production_Ready-brightgreen?style=for-the-badge)

Bộ công cụ toàn diện số 1 Việt Nam: Mở khóa VIP vĩnh viễn, vô hạn Coin/TCoin, **triệt tiêu 100% AdBlock / Stream Guard / Stealth Ads Widget / Video Ads**, tự động tóm link **M3U8 Stream mở bằng PotPlayer/VLC/Tải playlist .M3U**, bộ phím tắt thần thánh **Tua nhanh/lùi 5s, Skip Intro 85s, Chỉnh âm lượng, Đổi chương & Cuộn trang đọc truyện**, bộ lọc màu **Anime OLED HDR**, và chế độ **Rạp phim / Sân cỏ Theater Mode** trên **53+ website xem phim, anime, bóng đá trực tiếp và truyện tranh hàng đầu Việt Nam**!

---

## 📁 Cấu Trúc Thư Mục Modular v5.4.6

Codebase đã được tái cấu trúc hoàn toàn thành hệ thống Module sạch sẽ, chia theo nhóm folder:

```text
├── src/
│   ├── config/          # Embed matchers & aggregated site registry
│   ├── css/             # CSS độc lập (adblock.css, hub.css, theater.css, embed-guard.css)
│   ├── modules/         # Logic module (icons.js, sniffer.js, player-controls.js, ad-nuker.js, hub-ui.js, rophim-vip.js)
│   ├── sites/           # Cấu hình 53+ website chia theo nhóm thư mục:
│   │   ├── anime/       # Anime & Hoạt hình 3D (10 sites: NetAnime, AnimeVietsub, VuiGhe, AnimeHay, HH3D...)
│   │   ├── movies/      # Phim Chiếu Rạp & Phim Tổng Hợp (28 sites: Rophim, Motchill, GhienPhim, DuPhim, CoiPhim, GhienBlog...)
│   │   ├── tv/          # Phim Truyền Hình & Thuyết Minh (2 sites: TVHay, VietSubTV)
│   │   ├── embeds/      # Server Nguồn & Embed (OPhim, KKPhim)
│   │   ├── sports/      # Bóng Đá & Thể Thao Trực Tiếp (5 sites: Xôi Lạc, Thập Cẩm, Khô Gà, Giờ Vàng, Chuối Chiên)
│   │   └── comics/      # Truyện Tranh & Tiểu Thuyết (7 sites: NetTruyen, TruyenQQ, TruyenVN, LuotNovel, ZetTruyen, TopTruyen, GhienTruyen)
│   └── template.js      # Compiler template ráp nối các module
├── scripts/             # Script UserScript xuất bản theo nhóm folder (anime/, movies/, tv/, embeds/, sports/, comics/)
├── build_all_scripts.js # Trình biên dịch tinh gọn (~70 dòng)
└── run_audit.js         # Bộ Test Suite tự động (1035/1035 Assertions)
```

---

## 🌐 Các Tên Miền & Trình Phát Hỗ Trợ (Cập nhật 2026)

Hệ thống script tự động nhận diện và kích hoạt trên toàn bộ 53+ hệ thống website phim, anime, bóng đá, truyện tranh và iframe player nhúng:
- 📖 **Truyện Tranh & Manga/Novel**: GhienTruyen (`ghientruyen.net`, `ghientruyen.org`), NetTruyen (`nettruyen*.com`, `nettruyen*.vn`...), TruyenQQ (`truyenqq*.com`, `truyenqq*.vn`...), TruyenVN (`truyenvn.co`...), LuotNovel (`luotnovel1.site`, `luotnovel.com`...), ZetTruyen (`zettruyen3.com`...), TopTruyen (`toptruyenzone12.com`...)
- ⚽ **Bóng Đá & Thể Thao Trực Tiếp**: `xoilaczzz.pro`, `explorado-invest.com` (ThapCam TV), `khoga.live`, `giovang.tax`, `chuoichientv.me`, `chuoichientv.link`...
- 🌟 **Rổ Phim**: `rophim1.vip`, `rophim1.cc`, `rophim1.co`, `rophimx.net`, `rophim.ws`, `rophim.li`, `rophim.me`, `rophim.mx`
- 🍿 **Motchill, PhimMoi, SSPhim & Mọt Phim**: `phimmotchill.online`, `motchill.online`, `motchilltv.com`, `phimmoiyyy.net`, `phimmoichill.net`, `phimmoi.net`, `motphim.to`, `motphimtv.me`, `ssphim.net`...
- 🌸 **Anime & Hoạt Hình 3D (Donghua)**: NetAnime (`netanime.net`, `netanime.cc`), `animevietsub.moe`, `vuighe.net`, `vuighe3.com`, `animetvn.com`, `animehay.tv`, `anime47.net`, `hoathinh3d.biz`, `hhkungfu.tv`, `hhpanda.com`, `donghuatv.com`, `topsub.org`...
- 🎬 **Kho Phim Chiếu Rạp & Series**: `ghienphimz.mom`, `duphim.social`, `coiphim.mom`, `xemphimviet.com`, `ghienphim.blog`, `bilutv.live`, `phim1080z.org`, `xemphim.tv`, `dongphim.net`, `tvhay.site`, `subnhanh.org`, `ophim.cc`, `biphim.net`, `mephimtv.com`, `ghienphim.net`, `fullphim.net`, `phimhay.co`...
- 💎 **Các Web Kinh Điển Bổ Sung**: `vietsubtv.org`, `phim247.tv`, `phimhd.com`, `phimbathu.com`, `phimvang.com`, `banhtv.net`, `hdonline.co`, `chillhay.com`, `xemphimplus.net`...
- 🛡️ **Hệ thống nhúng Player & Live CDN**: `*.streamc.xyz`, `embed*.streamc.xyz`, `*.goatembed.com`, `*.vcdn.cloud`, `livecdn.cdnfastter.xyz`, `live.khoga.space`, `*.nguonc.com`, `*.phimapi.com`, `*.streamtape.com`, `*.doodstream.com`, `*.vidsrc.to`, `*.streamwish.to`...

---

## ✨ Kho Vũ Khí VIP (Cinema Pro Suite)

### 1. 📺 M3U8 Stream Sniffer & 1-Click PotPlayer / VLC / Tải Playlist .M3U
- Tự động bắt trộm đường link luồng phát `.m3u8` và direct `.mp4` chất lượng gốc khi video tải (bắt cả trong iframe lẫn trang chính).
- **1-Click PotPlayer**: Bấm nút mở ngay phần mềm PotPlayer trên máy tính xem mượt 60fps/HDR, không giật lag, không phụ thuộc trình duyệt!
- **1-Click VLC**: Khởi động trình phát VLC Player đa nền tảng tức thì.
- **Tải Playlist .M3U**: Tải file playlist chuẩn `.m3u` về máy, nhấp đúp là phát ngay trên mọi media player.
- **Copy M3U8**: Sao chép link trực tiếp dán vào IDM hoặc MPV để tải phim và phát offline siêu tốc.

### 2. ⏭️ Bộ Phím Tắt Thần Thánh (Pro Hotkeys)
- **`Phím S` hoặc `I`**: **Tua qua Intro bài hát mở đầu (+85 giây)** — cực kỳ tiện dụng cho Anime và phim bộ Hàn/Trung!
- **`Phím ←` / `→` (Mũi tên Trái / Phải)**: **Tua lùi 5s / Tua tới 5s** mượt mà trên cả trình phát nhúng iframe!
- **`Phím ↑` / `↓` (Mũi tên Lên / Xuống)**: **Tăng / Giảm âm lượng (+/- 5%)** kèm thanh OSD Toast hiển thị trực quan.
- **`Phím F`**: **Bật / Thoát toàn màn hình (Fullscreen)** trực tiếp.
- **`Phím 0` đến `9`**: **Tua nhanh đến 0% ➔ 90%** thời lượng video (chuẩn YouTube).
- **`Phím E`**: **Bộ lọc màu Anime OLED (HDR Enhancer)** — tăng độ tương phản và bão hòa màu, biến hình ảnh thành rực rỡ, sắc nét.
- **`Phím T`**: **Chế độ Rạp phim (Theater Mode)** — làm mờ toàn bộ giao diện xung quanh, tập trung 100% vào khung hình video.
- **`Phím [` và `]`**: Giảm / tăng tốc độ phát video (0.5x ➔ 3.0x) kèm thông báo OSD Toast.
- **`Phím Space`**: Tạm dừng / Tiếp tục phát video thông minh (tự động bỏ qua khi đang gõ phím vào ô nhập liệu).
- **`Phím M`**: Tắt / Mở tiếng (Mute/Unmute) tức thì.

### 3. 👑 Floating VIP Control Hub Glassmorphism (SVG Icons)
- Biểu tượng vương miện VIP dạng SVG thanh lịch ở góc phải dưới màn hình (zero emojis).
- Bấm vào để mở nhanh bảng điều khiển Pro với biểu tượng sắc nét, không dùng emoji.
- Tích hợp thông báo Toast hiện đại với hiệu ứng Glassmorphism viền xanh neon emerald.

### 4. 🛡️ Triệt Tiêu 100% Cảnh Báo AdBlock & Stream Guard
- Vô hiệu hóa Stream Guard bên trong iframe trình phát `streamc.xyz`, `goatembed.com`, `nguonc.com`, `phimapi.com`...
- Tự động phản hồi bắt tay `stream-guard-hello` với trạng thái `hasAdblock: false, key: 'ok'`.
- Chống tự động tạm dừng video (`HTMLMediaElement.prototype.pause`) khi phát hiện AdBlock.
- Tự động tua qua và bỏ qua đếm ngược quảng cáo video pre-roll (JWPlayer, VideoJS, custom HTML5 player).
- Vô hiệu hóa các script chặn chuột phải (`contextmenu`), chặn bôi đen sao chép, cho phép click và copy link thoải mái.
- Chặn sạch các lớp overlay tàng hình click-hijack mở popup lừa đảo.

### 5. 💰 Mở Khóa VIP 2099 & 999,999,999 Coin
- Tự động vá dữ liệu phản hồi từ backend API (`/baseapi/api/v1/tcoin/me`, `/api/auth/session`...).
- Mở khóa VIP vĩnh viễn đến ngày **18/07/2099** kèm 1 tỷ Coin/TCoin.

---

## 🚀 Cài Đặt Siêu Nhanh (1 Click)

### Bước 1: Cài đặt tiện ích Tampermonkey
Nếu trình duyệt của bạn chưa có Tampermonkey, hãy cài đặt extension này trước:
- [Tải Tampermonkey cho Chrome / Edge / Brave / Cốc Cốc](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=vi)

### Bước 2: Cài đặt Script VIP (Chọn Web Phim Của Bạn)

| Trang Web | Trạng Thái | Link Cài Đặt 1-Click | Tên Miền Hỗ Trợ |
| :--- | :---: | :---: | :--- |
| 👑 **ALL-IN-ONE (Bản Gộp Master)** | 🌟 **Khuyên Dùng** | 👉 **[CÀI BẢN ALL-IN-ONE](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/web-enhancer-all.user.js)** | **Cài 1 lần chạy trên TOÀN BỘ 48+ web bên dưới!** |
| 🎬 **Rổ Phim (Rophim)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT RỔ PHIM](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/rophim.user.js)** | `rophim1.vip`, `rophim1.cc`, `streamc.xyz`... |
| 🍿 **Motchill** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT MOTCHILL](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/motchill.user.js)** | `phimmotchill.online`, `motchill.online`, `motchilltv.com`... |
| 🔥 **Nắng Cực TV** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT NẮNG CỰC](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/nangcuc.user.js)** | `nangcuc.tv`, `nangcuc.net`, `nangcuctv.cc`... |
| 🌸 **AnimeVietsub** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT ANIMEVİETSUB](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/anime/animevietsub.user.js)** | `animevietsub.moe`, `animevietsub.link`, `animevietsub.global`... |
| 🍙 **VuiGhe Anime** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT VUIGHE](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/anime/vuighe.user.js)** | `vuighe.net`, `vuighe3.com`, `vuighe.com`... |
| 📺 **AnimeTVN** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT ANIMETVN](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/anime/animetvn.user.js)** | `animetvn.com`, `animetvn.tv`, `animetvn.net`... |
| ⛩️ **Anime47** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT ANIME47](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/anime/anime47.user.js)** | `anime47.net`, `anime47.tv`, `anime47.top`... |
| 🍙 **AnimeHay** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT ANIMEHAY](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/anime/animehay.user.js)** | `animehay.tv`, `animehay.live`, `animehay.site`... |
| 🐉 **Hoạt Hình 3D (HH3D)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT HOẠT HÌNH 3D](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/anime/hoathinh3d.user.js)** | `hoathinh3d.biz`, `hoathinh3d.com`, `hoathinh3d.site`... |
| 🥋 **Hoạt Hình Kungfu** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT HHKUNGFU](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/anime/hhkungfu.user.js)** | `hhkungfu.tv`, `hhkungfu.com`, `hhkungfu.net`... |
| 🐼 **Hoạt Hình Panda** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT HHPANDA](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/anime/hhpanda.user.js)** | `hhpanda.com`, `hhpanda.tv`... |
| ⚔️ **DongHuaTV (TQ)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT DONGHUATV](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/anime/donghuatv.user.js)** | `donghuatv.com`, `donghua.tv`... |
| ⚡ **SubNhanh** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT SUBNHANH](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/subnhanh.user.js)** | `subnhanh.org`, `subnhanh.com`, `subnhanh.vip`... |
| 🎥 **PhimMoi / PhimMoiChill** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT PHIMMOI](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/phimmoi.user.js)** | `phimmoiyyy.net`, `phimmoichill.net`, `phimmoi.net`... |
| 🏮 **Động Phim (DongPhim)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT ĐỘNG PHIM](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/dongphim.user.js)** | `dongphim.net`, `dongphym.net`, `dongphim.tv`... |
| 🎙️ **TVHay (Thuyết Minh)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT TVHAY](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/tv/tvhay.user.js)** | `tvhay.site`, `tvhay.org`, `tvhay.co`... |
| 🎞️ **BiluTV** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT BILUTV](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/bilutv.user.js)** | `bilutv.live`, `bilutva.com`, `bilutv.link`... |
| 📽️ **Phim1080** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT PHIM1080](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/phim1080.user.js)** | `phim1080z.org`, `phim1080.net`, `phim1080.me`... |
| 🎬 **XemPhim** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT XEMPHIM](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/xemphim.user.js)** | `xemphim.tv`, `xemphim.in`, `xemphim.club`... |
| 🌐 **OPhim & KKPhim** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT OPHIM](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/embeds/ophim.user.js)** | `ophim.cc`, `ophim.live`, `kkphim.com`... |
| 📺 **BiPhim & PhimChill** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT BIPHIM](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/biphim.user.js)** | `biphim.net`, `biphim.co`, `phimchill.tv`... |
| 🍿 **Mọt Phim (MotPhim)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT MOTPHIM](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/motphim.user.js)** | `motphim.to`, `motphimtv.me`, `motphim.net`... |
| 🎬 **Mê Phim (MePhim)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT MEPHIM](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/mephim.user.js)** | `mephimtv.com`, `mephim.net`, `mephim.tv`... |
| 📽️ **Ghiền Phim (GhienPhim)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT GHIENPHIM](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/ghienphim.user.js)** | `ghienphimz.mom`, `ghienphim.net`, `ghienphim.tv`... |
| 🎬 **Đu Phim (DuPhim)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT DUPHIM](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/duphim.user.js)** | `duphim.social`, `duphim.net`... |
| 📽️ **Coi Phim / XemPhimViet** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT COIPHIM](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/coiphim.user.js)** | `coiphim.mom`, `xemphimviet.com`... |
| 📝 **Ghiền Blog (GhienBlog)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT GHIENBLOG](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/ghienblog.user.js)** | `ghienphim.blog`... |
| 🌟 **Full Phim (FullPhim)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT FULLPHIM](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/fullphim.user.js)** | `fullphim.net`, `fullphim.tv`... |
| 📺 **Phim Hay (PhimHay)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT PHIMHAY](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/phimhay.user.js)** | `phimhay.co`, `phimhay.net`... |
| 📜 **VietSubTV** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT VIETSUBTV](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/tv/vietsubtv.user.js)** | `vietsubtv.org`, `vietsubtv.com`... |
| 🕒 **Phim 247** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT PHIM247](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/phim247.user.js)** | `phim247.tv`, `phim247.vip`... |
| 💎 **Phim HD** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT PHIMHD](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/phimhd.user.js)** | `phimhd.com`, `phimhd.tv`... |
| 🏆 **Phim Bất Hủ (PhimBatHu)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT PHIMBATHU](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/phimbathu.user.js)** | `phimbathu.com`, `phimbathu.net`... |
| 👑 **Phim Vàng (PhimVang)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT PHIMVANG](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/phimvang.user.js)** | `phimvang.com`, `phimvang.tv`... |
| 🍰 **Bánh TV (BanhTV)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT BANHTV](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/banhtv.user.js)** | `banhtv.net`, `banhtv.cc`... |
| 💻 **HDOnline** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT HDONLINE](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/hdonline.user.js)** | `hdonline.co`, `hdonline.tv`... |
| 🌴 **ChillHay** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT CHILLHAY](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/chillhay.user.js)** | `chillhay.com`, `chillhay.tv`... |
| ➕ **XemPhimPlus** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT XEMPHIMPLUS](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/xemphimplus.user.js)** | `xemphimplus.net`... |
| 🍙 **TopSub (Vietsub)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT TOPSUB](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/topsub.user.js)** | `topsub.org`, `topsub.net`, `topsub.tv`... |
| ⚡ **SSPhim (Phim Nhanh)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT SSPHIM](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/movies/ssphim.user.js)** | `ssphim.net`, `ssphim.tv`, `ssphim.org`... |
| ⚽ **Xôi Lạc TV (XoilacZ)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT XÔI LẠC](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/sports/xoilac.user.js)** | `xoilaczzz.pro`, `xoilac.tv`, `xoilac.net`... |
| 🏆 **Thập Cẩm TV (ThapCam)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT THẬP CẨM](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/sports/thapcam.user.js)** | `explorado-invest.com`, `thapcam.tv`... |
| 🍗 **Khô Gà TV (KhogaLive)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT KHÔ GÀ](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/sports/khoga.user.js)** | `khoga.live`, `khoga1.live`, `khoga.tv`... |
| ⏰ **Giờ Vàng TV (Giovang)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT GIỜ VÀNG](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/sports/giovang.user.js)** | `giovang.tax`, `giovang.tv`, `giovangtv.net`... |
| 🍌 **Chuối Chiên TV** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT CHUỐI CHIÊN](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/sports/chuoichien.user.js)** | `chuoichientv.me`, `chuoichientv.link`... |
| 📖 **ZetTruyen (Truyện Tranh)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT ZETTRUYEN](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/comics/zettruyen.user.js)** | `zettruyen3.com`, `zettruyen.com`, `zettruyen.net`... |
| 📚 **TopTruyen (Truyện Tranh)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT TOPTRUYEN](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/comics/toptruyen.user.js)** | `toptruyenzone12.com`, `toptruyen.com`... |
| 📑 **NetTruyen (Truyện Tranh)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT NETTRUYEN](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/comics/nettruyen.user.js)** | `nettruyen*.com`, `nettruyen*.net`, `nettruyen*.vn`... |
| 📚 **TruyenQQ (Truyện Tranh)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT TRUYENQQ](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/comics/truyenqq.user.js)** | `truyenqq*.com`, `truyenqq*.vn`, `truyenqq.vip`... |
| 📖 **TruyenVN (Truyện Tranh)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT TRUYENVN](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/comics/truyenvn.user.js)** | `truyenvn.co`, `truyenvn*.com`, `truyenvn*.vip`... |
| 📚 **Lướt Novel (Truyện Chữ & Tranh)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT LUOTNOVEL](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/comics/luotnovel.user.js)** | `luotnovel1.site`, `luotnovel.com`... |
| 📖 **Ghiền Truyện (GhienTruyen)** | 🟢 Sẵn sàng | 👉 **[CÀI ĐẶT GHIENTRUYEN](https://raw.githubusercontent.com/nghich-ngom-lung-tung/web-enhancer-suit/main/scripts/comics/ghientruyen.user.js)** | `ghientruyen.net`, `ghientruyen.org`... |

> 💡 **Mẹo**: Nếu anh hay xem nhiều web khác nhau, chỉ cần cài duy nhất bản **ALL-IN-ONE** là xong! Hoặc chọn từng bản riêng lẻ nếu chỉ xem cố định một trang. Nhấp vào nút **Cài đặt** ở trên, Tampermonkey sẽ tự động phát hiện và hiện bảng xác nhận. Nhấn **Install** (Cài đặt) hoặc **Update** (Cập nhật) là hoàn tất!

---

## ⌨️ Bảng Phím Tắt Thần Thánh (Video & Đọc Truyện Tranh)

### 1. Phim & Anime / Thể Thao Trực Tiếp
| Phím tắt | Chức năng | Phản hồi OSD Toast |
| :---: | :--- | :--- |
| **`S`** hoặc **`I`** | Tua nhanh qua Intro bài hát mở đầu (+85 giây) | `⏭️ Đã tua Intro: +85s` |
| **`←` / `→`** | Tua lùi 5 giây / Tua tới 5 giây | `⏪ Tua lùi: -5s` / `⏩ Tua tới: +5s` |
| **`↑` / `↓`** | Tăng / Giảm âm lượng (+/- 5%) | `🔊 Âm lượng: 85%` |
| **`F`** | Bật / Thoát toàn màn hình (Fullscreen) | `⛶ Toàn màn hình` |
| **`0` - `9`** | Tua nhanh đến 0%, 10%, ... 90% video | `🎯 Vị trí video: 50%` |
| **`E`** | Bật / Tắt bộ lọc màu Anime OLED HDR Enhancer | `✨ Anime OLED HDR: BẬT/TẮT` |
| **`T`** | Bật / Tắt chế độ rạp phim (Theater Mode) | `🎭 Chế độ Rạp phim: BẬT/TẮT` |
| **`[`** / **`]`** | Giảm / Tăng tốc độ phát video (0.5x ➔ 3.0x) | `⚡ Tốc độ phát: 1.25x` |
| **`Space`** | Tạm dừng / Tiếp tục phát video (Play / Pause) | Trực tiếp |
| **`M`** | Tắt / Mở tiếng (Mute / Unmute) | Trực tiếp |
| **`👑`** (Góc dưới) | Mở bảng điều khiển VIP Control Hub & Lấy Link M3U8 | Menu Glassmorphism |

### 2. Chế Độ Đọc Truyện Tranh & Tiểu Thuyết (Comics, Manga & Novels - NetTruyen, TruyenQQ, TruyenVN, LuotNovel, ZetTruyen, TopTruyen)
| Phím tắt | Chức năng | Phản hồi OSD Toast |
| :---: | :--- | :--- |
| **`A`** hoặc **`←`** | Chuyển ngay về chương trước đó | `📖 Đang chuyển về chương trước...` |
| **`D`** hoặc **`→`** | Chuyển nhanh sang chương kế tiếp | `📖 Đang chuyển tới chương tiếp theo...` |
| **`W`** hoặc **`↑`** | Cuộn mượt lên trên trang truyện (-450px) | Trực tiếp mượt mà |
| **`S`** hoặc **`↓`** | Cuộn mượt xuống dưới trang truyện (+450px) | Trực tiếp mượt mà |
| **`F`** | Toàn màn hình khung hình đọc truyện (Tập trung tối đa) | Trực tiếp |

---

## 🧪 Kiểm Định Chất Lượng Tự Động (Automated Test Suite)

Dự án tích hợp bộ kiểm thử tự động [`run_audit.js`](file:///run_audit.js) với **1035 Unit & Runtime Assertions** chạy qua Node.js VM Sandbox độc lập:
- **Phase 1: Metadata & Syntax Inspection** (55 files): Kiểm tra cú pháp ES2022, headers `@name`, `@match`, `@downloadURL`, `@updateURL`, `@allFrames`, `@run-at`.
- **Phase 2: Top Window DOM & Runtime Simulation** (55 files): Kiểm thử khởi tạo Floating VIP Hub `#ro-vip-hub`, triệt tiêu `window.open` popup ad trap, phản hồi bắt tay `stream-guard-hello` (`hasAdblock: false, key: 'ok'`), kiểm soát trực tiếp `<video>` trong `sendCommandToPlayer`, hook `fetch` & `XMLHttpRequest` bắt link M3U8, và điều phối 14 phím tắt Pro (`S`, `I`, `Arrows`, `F`, `E`, `T`, `[`, `]`, `Space`, `M`, `0`-`9`, `A`, `D`, `W`).
- **Phase 3: Iframe Player Embed & Stream Guard Defusal** (55 files): Giả lập iframe embed player, kiểm tra defuse `window.streamGuard` (`isBlocked() === false`), vô hiệu hóa `HTMLMediaElement.prototype.pause` do Guard kích hoạt, tự động skip đếm ngược quảng cáo video pre-roll, truyền lệnh điều khiển từ xa (SEEK, VOLUME, FULLSCREEN) và cầu nối `postMessage` M3U8 Stream Sniffer về trang cha.
- **Phase 4: Rophim & NetAnime VIP 2099 & Coin Backend Response Patcher** (`rophim.user.js`, `tampermonkey.user.js`, `web-enhancer-all.user.js`, `netanime.user.js`, `motchill.user.js`): Xác thực can thiệp API backend `/baseapi/api/v1/tcoin/me` (1 tỷ Coin), `/api/auth/session` (VIP đến năm 2099), `/api/v1/auth/profile` và `/api/v1/users/vip-packages`.
- **Phase 5: Live Football Streaming & Sports Ad-Nuker Audit** (`giovang`, `xoilac`, `chuoichien`, `thapcam`, `khoga`, `web-enhancer-all`): Triệt tiêu triệt để TVC pre-roll, odds bet buttons, sticky announcements, gambling banners.
- **Phase 6: Comic Reader & Stealth Ad Defusal** (`zettruyen`, `toptruyen`, `nettruyen`, `truyenqq`, `truyenvn`, `luotnovel`, `ghientruyen`, `web-enhancer-all`): Vô hiệu hóa stealth widget network (`__WidgetConfig`, `__PopConfig`), stub `aclib`, triệt tiêu popunder (`chaseherbalpasty`, `dekkopinolin`, `crittereasilyhangover`), diệt `#video-chapter`, `.advertisement`, mobile iframe popups, mission ads, và kích hoạt phím tắt đọc truyện A/D/W/S/F.
- **Phase 7: GhienPhim Ecosystem Ad Nuker & Master Suite Aggregation** (`ghienphim`, `duphim`, `coiphim`, `ghienblog`, `ghientruyen`, `web-enhancer-all`): Triệt tiêu sạch toàn bộ banner `.component.ads`, `.ad-1170x150`, floating `.no-ads` badge, popup `.anti-bad-ad`, liên kết cờ bạc (QQ88, HDBET, GO8, TIN888, BOM88, OK999) và đảm bảo Master Suite tích hợp đầy đủ 100% CSS quy tắc của toàn bộ 53 sites!

Chạy kiểm định toàn bộ hệ thống:
```bash
node run_audit.js
```
*(Kết quả: 1035/1035 Assertions Passed - Health Score: 100.0%)*
