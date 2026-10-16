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
try {
  const pyRes = spawnSync('python', ['-c', pyScript, extDir, zipPath], { stdio: 'inherit' });
  if (pyRes.status === 0 && fs.existsSync(zipPath)) {
    zipSuccess = true;
  }
} catch (_) {}

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
const releaseNotes = `# Web Enhancer Suite v${version} - Chill Guy Capybara Edition 🦫✨

## 🌟 Điểm nổi bật phiên bản v${version}

### 🦫 Biểu tượng Mascot Chill Guy Capybara mới
- Thiết kế linh vật **Chill Guy Capybara** siêu thư thái kết hợp kính 3D anaglyph và vương miện VIP hoàng gia.
- Đóng gói đầy đủ các kích thước chuẩn Chrome MV3: \`16x16\`, \`48x48\`, \`128x128\` với bo góc squircle macOS trong suốt sắc nét.

### 🎬 Mở rộng & Tối ưu hóa 57+ nền tảng Phim, Anime & Thể Thao
- **ChoPhim VIP & Social:**
  - Hỗ trợ lưu trữ & đồng bộ Emoji tương tác, khung Avatar VIP và huy hiệu Premium.
  - Sửa lỗi tương thích bình luận/chat thời gian thực trên giao diện React.
  - Tự động bỏ qua lỗi DOM hydration \`removeChild\` collision.
- **RoPhim & Hệ thống Clones:**
  - Hỗ trợ mở rộng domain mới: \`rophim10.work\`, \`moviehdthai.com\`, \`cobephim.cfd\`.
  - Mở khóa luồng video nhúng qua \`clubc.org\` và \`darkbytes.xyz\`.
- **Film4k & NetAnime:**
  - Tự động vượt qua Landing Gate & đóng hội thoại cộng đồng.
  - Mở khóa VIP vĩnh viễn 2099 & túi tiền xu tối đa 999,999,999 Coin.
- **Trực tiếp bóng đá (Chuối Chiên TV, Xôi Lạc):**
  - Chặn triệt để popup quảng cáo và banner cá cược gây lag luồng phát.

---

## 📦 File tải về trong bản phát hành (Assets)

| File | Mô tả | Dành cho |
|---|---|---|
| 🧩 **\`${zipName}\`** | Tiện ích mở rộng Chrome đóng gói sẵn (Manifest V3) | Cài đặt trực tiếp trên Chrome, Edge, Brave, Cốc Cốc |
| 📜 **\`web-enhancer-all.user.js\`** | Userscript tổng hợp 57+ website trong 1 script duy nhất | Tampermonkey, Violentmonkey |

---

## 🚀 Hướng dẫn cài đặt

### Cách 1: Cài đặt Chrome Extension (Khuyên dùng)
1. Tải file **\`${zipName}\`** bên dưới về máy và giải nén thành một thư mục.
2. Mở trình duyệt Chrome/Edge/Brave và truy cập: \`chrome://extensions\`
3. Bật công tắc **Developer mode** (Chế độ dành cho nhà phát triển) ở góc trên bên phải.
4. Bấm nút **Load unpacked** (Tải tiện ích đã giải nén) và chọn thư mục vừa giải nén.
5. Ghim tiện ích lên thanh công cụ để trải nghiệm biểu tượng Capybara mới!

### Cách 2: Cài đặt Userscript qua Tampermonkey
1. Đảm bảo trình duyệt đã cài tiện ích **Tampermonkey** hoặc **Violentmonkey**.
2. Nhấp vào file **\`web-enhancer-all.user.js\`** bên dưới và bấm **Install**.
`;

fs.writeFileSync(releaseNotesPath, releaseNotes, 'utf8');
console.log(`  ✓ Generated Release Notes -> ${releaseNotesPath}`);

console.log('\n===============================================================');
console.log('🎉 RELEASE PACKAGING COMPLETE!');
console.log(`📁 Files ready in: ${releaseDir}`);
console.log('===============================================================');
