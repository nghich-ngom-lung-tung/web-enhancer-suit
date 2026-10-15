const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function makePng(width, height, rgbaBuffer) {
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c >>> 0;
  }

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crc = Buffer.alloc(4);
    const typeAndData = Buffer.concat([typeBuf, data]);
    crc.writeUInt32BE(crc32(typeAndData), 0);
    return Buffer.concat([len, typeAndData, crc]);
  }

  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth 8
  ihdr.writeUInt8(6, 9); // RGBA color type
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  const stride = width * 4;
  const rawScanlines = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    rawScanlines[y * (stride + 1)] = 0; // Filter 0
    rgbaBuffer.copy(rawScanlines, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  const idatData = zlib.deflateSync(rawScanlines);
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', idatData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

function renderCinemaProIcon(size) {
  const buf = Buffer.alloc(size * size * 4);

  function setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    const idx = (y * size + x) * 4;
    // Blend with existing if alpha < 255
    if (a === 255 || buf[idx + 3] === 0) {
      buf[idx] = r;
      buf[idx + 1] = g;
      buf[idx + 2] = b;
      buf[idx + 3] = a;
    } else {
      const srcA = a / 255;
      const dstA = buf[idx + 3] / 255;
      const outA = srcA + dstA * (1 - srcA);
      buf[idx] = Math.round((r * srcA + buf[idx] * dstA * (1 - srcA)) / outA);
      buf[idx + 1] = Math.round((g * srcA + buf[idx + 1] * dstA * (1 - srcA)) / outA);
      buf[idx + 2] = Math.round((b * srcA + buf[idx + 2] * dstA * (1 - srcA)) / outA);
      buf[idx + 3] = Math.round(outA * 255);
    }
  }

  const radius = Math.round(size * 0.22);
  const stroke = Math.max(1, Math.round(size * 0.04));

  // Render rounded dark obsidian background with emerald gradient border
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Check rounded rect distance
      const dx = Math.max(radius - x, 0, x - (size - 1 - radius));
      const dy = Math.max(radius - y, 0, y - (size - 1 - radius));
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= radius) {
        const isBorder = dist > radius - stroke || x < stroke || x >= size - stroke || y < stroke || y >= size - stroke;
        if (isBorder) {
          // Luxury Gold border gradient (#ffd98a -> #ffb627 -> #c8902a)
          const grad = y / size;
          const r = Math.round(255 * (1 - grad) + 200 * grad);
          const g = Math.round(217 * (1 - grad) + 144 * grad);
          const b = Math.round(138 * (1 - grad) + 42 * grad);
          setPixel(x, y, r, g, b, 255);
        } else {
          // Deepest warm black background (#060605 to #0b0a08)
          const grad = y / size;
          const r = Math.round(6 * (1 - grad) + 11 * grad);
          const g = Math.round(6 * (1 - grad) + 10 * grad);
          const b = Math.round(5 * (1 - grad) + 8 * grad);
          setPixel(x, y, r, g, b, 255);
        }
      }
    }
  }

  // Draw Royal Crown
  // Crown coordinates normalized to [0, 1] inside [0.2, 0.8] of the icon
  const cx = size / 2;
  const crownTop = Math.round(size * 0.28);
  const crownBottom = Math.round(size * 0.72);
  const crownHeight = crownBottom - crownTop;
  const crownWidth = Math.round(size * 0.65);
  const crownLeft = Math.round((size - crownWidth) / 2);
  const crownRight = crownLeft + crownWidth;

  // Draw Crown Base Band (Gold Deep)
  const bandHeight = Math.max(2, Math.round(size * 0.12));
  const bandTop = crownBottom - bandHeight;
  for (let y = bandTop; y <= crownBottom; y++) {
    for (let x = crownLeft; x <= crownRight; x++) {
      setPixel(x, y, 200, 144, 42, 255); // Rich gold base band
    }
  }

  // Jewels on Base Band
  if (size >= 16) {
    const jewelY = Math.round(bandTop + bandHeight / 2);
    setPixel(Math.round(cx), jewelY, 254, 240, 138, 255); // Center gold jewel
    if (size >= 32) {
      setPixel(Math.round(crownLeft + crownWidth * 0.25), jewelY, 254, 240, 138, 255);
      setPixel(Math.round(crownLeft + crownWidth * 0.75), jewelY, 254, 240, 138, 255);
    }
  }

  // Draw Crown Peaks (Golden Yellow #f59e0b)
  for (let y = crownTop; y < bandTop; y++) {
    const relY = (y - crownTop) / (bandTop - crownTop); // 0 (top) to 1 (band)
    for (let x = crownLeft; x <= crownRight; x++) {
      const relX = (x - crownLeft) / crownWidth; // 0 (left) to 1 (right)

      // 3 peaks: Left (0.1), Center (0.5), Right (0.9)
      // Valleys at 0.3 and 0.7
      let inCrown = false;

      // Center Peak: from y = crownTop to bandTop
      const centerDist = Math.abs(relX - 0.5);
      const centerLimit = relY * 0.45;
      if (centerDist <= centerLimit) inCrown = true;

      // Left Peak: apex at relX = 0.15, starts lower down at relY = 0.25
      const leftApexY = 0.22;
      if (relY >= leftApexY) {
        const leftDist = Math.abs(relX - 0.15);
        const leftLimit = (relY - leftApexY) * 0.35;
        if (leftDist <= leftLimit) inCrown = true;
      }

      // Right Peak: apex at relX = 0.85
      if (relY >= leftApexY) {
        const rightDist = Math.abs(relX - 0.85);
        const rightLimit = (relY - leftApexY) * 0.35;
        if (rightDist <= rightLimit) inCrown = true;
      }

      if (inCrown) {
        // Gold gradient #fef08a -> #f59e0b -> #d97706
        const goldR = Math.round(254 * (1 - relY) + 217 * relY);
        const goldG = Math.round(240 * (1 - relY) + 119 * relY);
        const goldB = Math.round(138 * (1 - relY) + 6 * relY);
        setPixel(x, y, goldR, goldG, goldB, 255);
      }
    }
  }

  // Peak Jewels (Ruby / Cyan)
  if (size >= 16) {
    // Top center ruby
    setPixel(Math.round(cx), crownTop - 1, 244, 63, 94, 255);
    if (size >= 48) {
      setPixel(Math.round(cx) - 1, crownTop - 1, 244, 63, 94, 255);
      setPixel(Math.round(cx) + 1, crownTop - 1, 244, 63, 94, 255);
      setPixel(Math.round(cx), crownTop - 2, 244, 63, 94, 255);
      // Left and right cyan jewels
      const leftPeakX = Math.round(crownLeft + crownWidth * 0.15);
      const rightPeakX = Math.round(crownLeft + crownWidth * 0.85);
      const sidePeakY = Math.round(crownTop + (bandTop - crownTop) * 0.22);
      setPixel(leftPeakX, sidePeakY - 1, 56, 189, 248, 255);
      setPixel(rightPeakX, sidePeakY - 1, 56, 189, 248, 255);
    }
  }

  return makePng(size, size, buf);
}

function generateAllIcons(outputDir) {
  fs.mkdirSync(outputDir, { recursive: true });
  const sizes = [16, 48, 128];
  sizes.forEach(size => {
    const dest = path.join(outputDir, `icon${size}.png`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      console.log(`  ✓ Preserved icon${size}.png (${fs.statSync(dest).size} bytes) -> ${dest}`);
      return;
    }
    const png = renderCinemaProIcon(size);
    fs.writeFileSync(dest, png);
    console.log(`  ✓ Generated icon${size}.png (${png.length} bytes) -> ${dest}`);
  });
}

module.exports = { generateAllIcons, renderCinemaProIcon };

if (require.main === module) {
  const target = process.argv[2] || path.join(__dirname, '..', '..', 'extension', 'icons');
  generateAllIcons(target);
  console.log('✅ Extension PNG icons generated successfully!');
}
