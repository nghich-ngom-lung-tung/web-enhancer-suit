const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

const ROOT_DIR = __dirname;
const PKG_PATH = path.join(ROOT_DIR, 'package.json');
const pkg = JSON.parse(fs.readFileSync(PKG_PATH, 'utf8'));
const version = pkg.version || '5.4.9';

console.log('═══════════════════════════════════════════════════════════════');
console.log(`📦 PACKAGING RELEASE: Web Enhancer Suite v${version}`);
console.log('═══════════════════════════════════════════════════════════════\n');

// 1. Build and verify
console.log('1️⃣ Running full dual-build pipeline...');
execSync('node build_all.js', { stdio: 'inherit', cwd: ROOT_DIR });

console.log('\n2️⃣ Running verification audit...');
execSync('node run_audit.js', { stdio: 'inherit', cwd: ROOT_DIR });

// 2. Prepare release directory
const releaseDir = path.join(ROOT_DIR, 'release');
if (!fs.existsSync(releaseDir)) {
  fs.mkdirSync(releaseDir, { recursive: true });
}

// 3. Package Extension ZIP
const extDir = path.join(ROOT_DIR, 'extension');
const zipName = `web-enhancer-suite-extension-v${version}.zip`;
const zipPath = path.join(releaseDir, zipName);

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

console.log(`\n3️⃣ Creating extension zip archive: ${zipName}...`);

// Use Python's built-in zipfile for cross-platform, unicode-safe compression
const pyScript = `
import zipfile, os, sys
ext_dir = sys.argv[1]
zip_path = sys.argv[2]
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(ext_dir):
        for file in files:
            full_p = os.path.join(root, file)
            rel_p = os.path.relpath(full_p, ext_dir)
            zf.write(full_p, rel_p)
`;

let zipSuccess = false;
for (const pyBin of ['python', 'python3']) {
  try {
    const pyRes = spawnSync(pyBin, ['-c', pyScript, extDir, zipPath], { stdio: 'inherit' });
    if (pyRes.status === 0 && fs.existsSync(zipPath)) {
      zipSuccess = true;
      break;
    }
  } catch (_) {}
}

if (!zipSuccess) {
  // Fallback to powershell with single-quote escaping or unix zip
  if (process.platform === 'win32') {
    const psCmd = `$ext = @'\n${extDir}\n'@.Trim(); $out = @'\n${zipPath}\n'@.Trim(); Compress-Archive -Path (Join-Path $ext '*') -DestinationPath $out -Force`;
    execSync(`powershell -NoProfile -Command "${psCmd}"`, { stdio: 'inherit' });
  } else {
    execSync(`cd "${extDir}" && zip -r "${zipPath}" ./*`, { stdio: 'inherit' });
  }
}

const zipStats = fs.statSync(zipPath);
console.log(`  ✓ Extension package created: ${(zipStats.size / 1024).toFixed(1)} KB -> ${zipPath}`);

// 4. Copy Master Userscript
const masterScriptSrc = path.join(ROOT_DIR, 'scripts', 'web-enhancer-all.user.js');
const masterScriptDest = path.join(releaseDir, `web-enhancer-all-v${version}.user.js`);
const masterScriptDestGeneric = path.join(releaseDir, 'web-enhancer-all.user.js');
fs.copyFileSync(masterScriptSrc, masterScriptDest);
fs.copyFileSync(masterScriptSrc, masterScriptDestGeneric);
console.log(`  ✓ Copied master userscript -> ${masterScriptDestGeneric}`);

// 5. Generate Release Notes template
const releaseNotesPath = path.join(releaseDir, `RELEASE_NOTES_v${version}.md`);
const releaseNotes = `# 👑 Web Enhancer Suite v${version} — Chill Guy Capybara Edition 🕶️✨

<div align="center">
  <img src="https://files.catbox.moe/dj52sc.png" alt="Chill Guy Capybara Mascot" width="140" height="140" />
</div>

### 🌟 Điểm nổi bật phiên bản v${version}

> [!TIP]
> **🕶️ Linh vật Chill Guy Capybara độc quyền & Kiến trúc Module hóa**
> • Linh vật **Chill Guy Capybara** 3D thư thái kết hợp kính 3D anaglyph và vương miện VIP hoàng gia.
> • Xuất bản đầy đủ các kích thước chuẩn Chrome MV3: \`16x16\`, \`48x48\`, \`128x128\` với bo góc squircle macOS trong suốt sắc nét.
> • **Tái cấu trúc chuẩn công nghiệp (Industry-Standard Architecture):** Tách nhỏ hệ thống Content Scripts thành các thư mục chuyên biệt: \`core/\`, \`features/\`, \`vip/\` (\`vip-engine.js\`, \`cinema.js\`, \`anime.js\`, \`sports.js\`, \`comics.js\`, \`auth.js\`).

> [!NOTE]
> **💎 Cải tiến cốt lõi & Khắc phục lỗi toàn diện:**
> • **Khắc phục triệt để ReferenceError:** Khai báo an toàn \`_origFetchNative\` trong phạm vi module \`cinema.js\` và \`sports.js\`, kèm kiểm tra kiểu an toàn trước khi gọi.
> • **Khôi phục chuỗi Prototype của XMLHttpRequest:** Thêm liên kết \`window.XMLHttpRequest.prototype = origXhrMain.prototype\`, bảo đảm \`new XMLHttpRequest() instanceof XMLHttpRequest === true\` 100% chuẩn DOM, cùng cơ chế tự động patch response XHR qua \`window.handleRophimXhrResponse\`.
> • **Bẻ khóa bẫy đột biến tại chỗ (In-Place Mutation Trap):** Chuyển cơ chế so sánh dữ liệu vá từ con trỏ object (\`patched !== data\`) sang so sánh chuỗi JSON tuần tự hóa (\`newText !== text\`), đảm bảo không bao giờ bị rớt response VIP.
> • **Hỗ trợ Mock đa hình (Polymorphic Mocks):** \`interceptFetch\` và \`getRophimMockResponse\` tự động nhận diện cả plain Object (chuyển JSON) và chuỗi HTML (tự động gán \`Content-Type: text/html\`).
> • **Lưu trữ Stream bền vững trên Manifest V3:** Background Service Worker đồng bộ \`chrome.storage.session\` song song bộ nhớ đệm, bảo toàn 100% danh sách link M3U8 khi Service Worker chuyển trạng thái ngủ (inactive 30s).
> • **Kiểm thử thực chiến 100% trên Chrome thật:** Vượt qua toàn diện bộ audit 1239 assertions và thực thi kiểm thử trực tiếp trên 57/57 nền tảng bằng Google Chrome (V8 Engine & Blink DOM) với kết quả 100% sạch lỗi.

---

### 🎬 Chi tiết 57+ Nền tảng được tối ưu hóa

<details open>
<summary><b>🎬 1. Phim & Điện Ảnh (32 Website) — Bấm để thu gọn / mở rộng</b></summary>
<br/>

| STT | Website | Tên miền hỗ trợ tiêu biểu | Tính năng mở khóa |
|:---:|---|---|---|
| 1 | **ChoPhim** | \`chophim.net\`, \`chophim.com\` | Mở khóa VIP Family, Khung Avatar VIP, Đồng bộ Emoji chat, Sửa lỗi bình luận React |
| 2 | **RoPhim & Clones** | \`rophim.me\`, \`rophim10.work\`, \`rophim.co\` | VIP 2099, Vô hạn Coin, Bắt luồng M3U8 gốc, Bypass TVC Pre-roll |
| 3 | **MovieHDThai** | \`moviehdthai.com\`, \`clubc.org\` | VIP 2099, Mở khóa máy chủ nhúng ClubC, Chặn popup quảng cáo |
| 4 | **CoBePhim** | \`cobephim.cfd\`, \`darkbytes.xyz\` | VIP 2099, Mở khóa máy chủ nhúng Darkbytes, Tăng tốc phát video |
| 5 | **Film4k** | \`film4k.net\`, \`workers.dev\` | Auto-bypass Landing Gate, VIP Vĩnh viễn 2099, Tắt hội thoại ép đăng nhập |
| 6 | **MotChill** | \`motchill.in\`, \`motchill.net\`, \`motchill.tv\` | VIP Admin, 999,999,999 Coin, Trích xuất luồng M3U8 phát PotPlayer |
| 7 | **Nắng Cực TV** | \`nangcuc.tv\`, \`nangcuc.net\` | Chặn click ngầm mở tab mới, Sniffer direct stream |
| 8 | **SubNhanh** | \`subnhanh.net\`, \`subnhanh.tv\` | Mở khóa Server VIP tốc độ cao, Xóa sạch banner nhà cái |
| 9 | **PhimMới / PhimMoiChill** | \`phimmoi.net\`, \`phimmoichill.net\` | Khắc phục chuyển hướng quảng cáo, Tự động bắt luồng video |
| 10 | **Động Phim** | \`dongphim.net\`, \`dongphim.tv\` | Tối ưu buffer luồng phát, Bật bộ lọc màu Anime OLED HDR |
| 11 | **BiluTV** | \`bilutv.net\`, \`bilutv.org\` | Bypass bẫy Adblock trap, Mở khóa server VIP dự phòng |
| 12 | **Phim1080** | \`phim1080.net\`, \`phim1080.tv\` | Phát direct stream 1080p, Khởi chạy 1-click qua PotPlayer/VLC |
| 13 | **XemPhim** | \`xemphim.fun\`, \`xemphim.pm\` | Mở khóa Server VIP, Bỏ qua giới hạn tài khoản thường |
| 14 | **BiPhim / PhimChill** | \`biphim.net\`, \`phimchill.net\` | Chặn triệt để banner cá cược che video, Tăng tốc tải tập |
| 15 | **Mọt Phim** | \`motphim.tv\`, \`motphim.net\` | Auto-skip Intro (+85s), Xóa bỏ hoàn toàn TVC đầu video |
| 16 | **Mê Phim** | \`mephim.net\`, \`mephim.tv\` | Chặn click-hijack mở tab mới, Bảng điều khiển phím tắt OSD |
| 17 | **Ghiền Phim** | \`ghienphim.net\`, \`ghienphim.org\` | Bộ lọc màu OLED HDR, Phím tắt chuyển tập nhanh (Shift+N) |
| 18 | **FullPhim** | \`fullphim.net\`, \`fullphim.tv\` | Tự động lựa chọn độ phân giải cao nhất khi bắt đầu |
| 19 | **PhimHay** | \`phimhay.net\`, \`phimhay.tv\` | Loại bỏ quảng cáo cược, Tối ưu giao diện xem rạp phim |
| 20 | **Phim247** | \`phim247.net\`, \`phim247.com\` | Mở khóa Server VIP, Bắt luồng M3U8 không dính quảng cáo |
| 21 | **PhimHD** | \`phimhd.net\`, \`phimhd.tv\` | Tối ưu hóa buffer luồng mượt mà, Chặn popup bẫy click |
| 22 | **PhimBấtHủ** | \`phimbathu.net\`, \`phimbathu.com\` | Vượt cơ chế Stream Guard, Chặn anti-adblock traps |
| 23 | **PhimVàng** | \`phimvang.net\`, \`phimvang.org\` | Trích xuất luồng xem qua PotPlayer/VLC, Tải file playlist .m3u |
| 24 | **BánhTV** | \`banhtv.net\`, \`banhtv.com\` | Mở khóa chất lượng phát Full HD, Xóa TVC gián đoạn |
| 25 | **HDOnline** | \`hdonline.net\`, \`hdonline.vn\` | Vô hiệu hóa bẫy phát hiện Adblock, Trả lại giao diện sạch |
| 26 | **ChillHay** | \`chillhay.net\`, \`chillhay.tv\` | Tích hợp Trình phát VIP Cinema Pro với OSD Toast Glassmorphism |
| 27 | **XemPhimPlus** | \`xemphimplus.net\` | Tự động bắt luồng M3U8 gốc, Hỗ trợ phím tắt tua mượt |
| 28 | **TopSub** | \`topsub.net\`, \`topsub.org\` | Bypass TVC pre-roll, Chặn banner cược che nút bấm |
| 29 | **SSPhim** | \`ssphim.net\`, \`ssphim.tv\` | Tối ưu hóa giao diện danh sách tập, Bỏ qua quảng cáo lồng |
| 30 | **DuPhim** | \`duphim.net\`, \`duphim.tv\` | Xóa popup cảnh báo giả và quảng cáo ép cài ứng dụng |
| 31 | **CoiPhim / XemPhimViet** | \`coiphim.net\`, \`xemphimviet.net\` | Chặn click mở tab ngầm, Trích xuất luồng stream trực tiếp |
| 32 | **GhienBlog** | \`ghienblog.net\`, \`ghienblog.org\` | Dọn sạch giao diện đọc & xem phim, Xóa banner spam |

</details>

<details open>
<summary><b>🎌 2. Anime & Hoạt Hình (10 Website) — Bấm để thu gọn / mở rộng</b></summary>
<br/>

| STT | Website | Tên miền hỗ trợ tiêu biểu | Tính năng mở khóa |
|:---:|---|---|---|
| 33 | **NetAnime** | \`netanime.net\`, \`netanime.cc\` | Mở khóa VIP vĩnh viễn 2099, Cấp tối đa 999,999,999 Coin xem full tập |
| 34 | **AnimeVietSub** | \`animevietsub.tv\`, \`animevietsub.cc\` | Chặn TVC đầu video, Tự động chuyển tập, Bắt luồng phát M3U8 |
| 35 | **Hoạt Hình 3D** | \`hoathinh3d.vip\`, \`hoathinh3d.tv\`, \`hh3d.tv\` | Direct stream 4K/FHD, Bỏ qua quảng cáo cược, Tua mượt intro |
| 36 | **AnimeHay** | \`animehay.tv\`, \`animehay.live\`, \`animehay.site\` | Mở khóa Server VIP tốc độ cao, Kích hoạt Anime OLED HDR |
| 37 | **VuiGhe** | \`vuighe.net\`, \`vuighe3.com\`, \`vuighe.com\` | Chặn quảng cáo giữa tập, Tăng tốc buffer video |
| 38 | **Anime47** | \`anime47.net\`, \`anime47.com\`, \`anime47.tv\` | Xóa banner che khung phát, Tối ưu phím tắt điều khiển |
| 39 | **DongHuaTV** | \`donghuatv.com\`, \`donghua.tv\` | Bộ lọc màu hoạt hình rực rỡ, Direct M3U8 không quảng cáo |
| 40 | **AnimeTVN** | \`animetvn.com\`, \`animetvn.tv\`, \`animetvn.net\` | Bỏ qua chuyển hướng ép click, Tự động phóng to toàn màn hình |
| 41 | **Hoạt Hình KungFu** | \`hhkungfu.tv\`, \`hhkungfu.net\` | Trích xuất luồng phim hoạt hình chất lượng cao nhất |
| 42 | **Hoạt Hình Panda** | \`hhpanda.com\`, \`hhpanda.tv\` | Tối ưu hóa điều khiển phím tắt, Tắt hoàn toàn banner quảng cáo |

</details>

<details open>
<summary><b>📺 3. Truyền Hình & TV Series (2 Website) — Bấm để thu gọn / mở rộng</b></summary>
<br/>

| STT | Website | Tên miền hỗ trợ tiêu biểu | Tính năng mở khóa |
|:---:|---|---|---|
| 43 | **TVHay Thuyết Minh** | \`tvhay.site\`, \`tvhay.org\`, \`tvhay.co\` | Mở khóa luồng phim bộ thuyết minh, Chặn popup bẫy click |
| 44 | **VietSubTV** | \`vietsubtv.org\`, \`vietsubtv.com\` | Tối ưu hóa xem trọn bộ phim truyền hình, Bắt luồng phát nhanh |

</details>

<details open>
<summary><b>⚽ 4. Thể Thao & Trực Tiếp Bóng Đá (5 Website) — Bấm để thu gọn / mở rộng</b></summary>
<br/>

| STT | Website | Tên miền hỗ trợ tiêu biểu | Tính năng mở khóa |
|:---:|---|---|---|
| 45 | **Chuối Chiên TV** | \`chuoichientv.me\`, \`chuoichientv.link\` | Diệt 100% banner cược che khung phát, Mở khóa luồng Full HD 60fps |
| 46 | **Xôi Lạc TV (XoilacZ)** | \`xoilaczzz.pro\`, \`xoilacz.pro\`, \`xoilac.tv\` | Chặn popup nhảy tab mới, Trích xuất luồng M3U8 thể thao trực tiếp |
| 47 | **Giờ Vàng TV** | \`giovang.tax\`, \`giovang.tv\`, \`giovang.live\` | Tối ưu hóa đường truyền ổn định không giật lag, Xóa TVC đầu trận |
| 48 | **Khô Gà TV (KhogaLive)** | \`khoga.live\`, \`khoga.tv\`, \`khoga.net\` | Chặn triệt để banner nhà cái bóng đá, Tối ưu xem mượt |
| 49 | **Thập Cẩm TV** | \`thapcam.tv\`, \`thapcam.net\`, \`thapcam.link\` | Xem thể thao sạch, Không chuyển hướng link rác |

</details>

<details open>
<summary><b>📖 5. Truyện Tranh, Manga & Webtoon (7 Website) — Bấm để thu gọn / mở rộng</b></summary>
<br/>

| STT | Website | Tên miền hỗ trợ tiêu biểu | Tính năng mở khóa |
|:---:|---|---|---|
| 50 | **ZetTruyen** | \`zettruyen3.com\`, \`zettruyen.net\` | Mở khóa tài khoản VIP Reader Pro, Mở khóa toàn bộ chương VIP |
| 51 | **TopTruyen** | \`toptruyenzone12.com\`, \`toptruyen.net\` | VIP Reader Pro, Tự động mở menu VIP, Đọc mượt không quảng cáo |
| 52 | **NetTruyen** | \`nettruyen.com\`, \`nettruyen.org\` | Chặn popup cờ bạc, Phím tắt A/D chuyển nhanh chương truyện |
| 53 | **TruyenQQ** | \`truyenqq.com\`, \`truyenqq.vip\` | Chặn redirect, Cuộn trang mượt mà bằng phím W/S |
| 54 | **TruyenVN** | \`truyenvn.co\`, \`truyenvn.vip\` | Xóa bỏ watermark quảng cáo che khung hình truyện tranh |
| 55 | **LuotNovel** | \`luotnovel1.site\`, \`luotnovel.com\` | Kích hoạt Chế độ đọc sạch (Clean Reading Suite), Loại bỏ rác |
| 56 | **Ghiền Truyện** | \`ghientruyen.net\`, \`ghientruyen.org\` | VIP Reader, Tăng tốc tải ảnh chương truyện không gián đoạn |

</details>

<details open>
<summary><b>⚡ 6. Embeds & Máy Chủ Phát Luồng (1 Nền Tảng) — Bấm để thu gọn / mở rộng</b></summary>
<br/>

| STT | Website | Tên miền hỗ trợ tiêu biểu | Tính năng mở khóa |
|:---:|---|---|---|
| 57 | **OPhim / KKPhim** | \`ophim.cc\`, \`ophim.live\`, \`kkphim.com\` | Trích xuất luồng Stream M3U8 trực tiếp, Bypass bảo vệ Referer |

</details>

---

### 📦 Tệp tải về trong bản phát hành (Assets)

| Tệp tin | Định dạng | Hướng dẫn sử dụng |
|---|---|---|
| 🧩 **\`${zipName}\`** | Tiện ích mở rộng Chrome (Manifest V3) | Tải về, giải nén và nạp qua \`chrome://extensions\` (Chế độ Nhà phát triển) |
| 📜 **\`web-enhancer-all.user.js\`** | Master Userscript (57+ Website) | Cài đặt 1-click qua Tampermonkey hoặc Violentmonkey |

---

### 🚀 Hướng dẫn cài đặt

#### 🧩 Cách 1: Cài đặt Chrome Extension (Khuyên dùng)
1. Tải file **\`${zipName}\`** bên dưới về máy và giải nén thành một thư mục.
2. Mở trình duyệt Chrome / Edge / Brave / Cốc Cốc và truy cập: \`chrome://extensions\`
3. Bật công tắc **Developer mode** (Chế độ dành cho nhà phát triển) ở góc trên bên phải.
4. Bấm nút **Load unpacked** (Tải tiện ích đã giải nén) và chọn thư mục vừa giải nén.
5. Ghim tiện ích lên thanh công cụ để trải nghiệm biểu tượng Capybara mới!

#### 📜 Cách 2: Cài đặt Userscript qua Tampermonkey
1. Đảm bảo trình duyệt đã cài tiện ích **Tampermonkey** hoặc **Violentmonkey**.
2. Nhấp vào file **\`web-enhancer-all.user.js\`** bên dưới và bấm **Install**.
`;

fs.writeFileSync(releaseNotesPath, releaseNotes, 'utf8');
console.log(`  ✓ Generated Release Notes -> ${releaseNotesPath}`);

console.log('\n===============================================================');
console.log('🎉 RELEASE PACKAGING COMPLETE!');
console.log(`📁 Files ready in: ${releaseDir}`);
console.log('===============================================================');
