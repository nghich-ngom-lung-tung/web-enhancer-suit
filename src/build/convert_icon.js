const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function convertMasterIcon() {
  const localMaster = path.resolve(__dirname, '../../extension/icons/icon_master.jpg');
  const artifactMaster = 'C:/Users/Admin/.gemini/antigravity/brain/f36e2fdd-3288-4a42-aea6-d5104d947a66/chill_capybara_movie_app_icon_1792172488139.jpg';
  const masterJpg = fs.existsSync(localMaster) ? localMaster : artifactMaster;
  const tempDir = 'C:/Users/Admin/.gemini/antigravity/brain/f36e2fdd-3288-4a42-aea6-d5104d947a66/scratch/icon_out';
  const targetDir = path.resolve(__dirname, '../../extension/icons');

  if (!fs.existsSync(masterJpg)) {
    console.error('Master icon not found:', masterJpg);
    return false;
  }

  fs.mkdirSync(tempDir, { recursive: true });

  const psScript = `
Add-Type -AssemblyName System.Drawing
$src = "${masterJpg}"
$outDir = "${tempDir}"
$img = [System.Drawing.Image]::FromFile($src)

foreach ($s in @(16, 48, 128)) {
    $bmp = New-Object System.Drawing.Bitmap $s, $s
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $rect = New-Object System.Drawing.Rectangle 0, 0, $s, $s
    $g.DrawImage($img, $rect)
    $g.Dispose()

    $dest = Join-Path $outDir "icon$s.png"
    $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "Resized: icon$s.png"
}
$img.Dispose()
`;

  const res = spawnSync('powershell', ['-NoProfile', '-Command', psScript], {
    encoding: 'utf8'
  });

  if (res.stdout) console.log(res.stdout.trim());
  if (res.stderr) console.error(res.stderr.trim());

  // Copy via Node.js fs with full UTF-8 support
  [16, 48, 128].forEach(s => {
    const srcFile = path.join(tempDir, `icon${s}.png`);
    const dstFile = path.join(targetDir, `icon${s}.png`);
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, dstFile);
      console.log(`  ✓ Synced extension/icons/icon${s}.png (${fs.statSync(dstFile).size} bytes)`);
    }
  });

  return true;
}

if (require.main === module) {
  convertMasterIcon();
}

module.exports = { convertMasterIcon };
