/**
 * Cinema Pro Suite - VIP Hub UI Module (Zero Emojis, Sleek Glassmorphism with Modern SVG Icons)
 */
function getHubUiCode(icons, siteTitle, scriptVersion) {
  return `
  // ─── TOAST NOTIFICATIONS (ZERO EMOJIS, CLEAN TEXT) ───
  function showToast(msg) {
    if (typeof document === "undefined" || !document.body) {
      console.log("[Cinema Pro]", msg);
      return;
    }
    const t = document.createElement("div");
    t.className = "ro-toast";
    t.innerHTML = msg;
    document.body.appendChild(t);
    setTimeout(() => {
      try { t.remove(); } catch (e) {}
    }, 2200);
  }
  if (typeof window !== "undefined") {
    window.showToast = showToast;
  }

  // ─── VIP CONTROL HUB DOM CREATION ───
  function initVipHub() {
    if (typeof document === "undefined") return;
    // Tuyệt đối không hiển thị VIP Control Hub trùng lặp bên trong iframe nhúng player
    if (typeof window !== "undefined" && window.self !== window.top) return;
    if (document.getElementById("ro-vip-hub")) return;
    if (!document.body) {
      document.addEventListener("DOMContentLoaded", () => setTimeout(initVipHub, 200), { once: true });
      return;
    }
    const isComic = (typeof isComicPage === "function" ? isComicPage() : (typeof window !== "undefined" && typeof window.isComicPage === "function" ? window.isComicPage() : false)) && !document.querySelector("video");
    const hub = document.createElement("div");
    hub.id = "ro-vip-hub";
    hub.innerHTML = isComic ? \`
      <div id="ro-hub-menu">
        <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: #51f085; display: flex; justify-content: space-between; align-items: center;">
          <span class="ro-btn-left">
            <span class="ro-icon">${icons.book}</span>
            <span>${siteTitle}</span>
          </span>
          <span style="font-size: 11px; opacity: 0.7;">v${scriptVersion}</span>
        </div>
        <button class="ro-menu-btn" id="ro-comic-prev-btn">
          <span class="ro-btn-left"><span class="ro-icon">${icons.skipBack}</span><span>Chương Trước</span></span>
          <span class="ro-badge">Phím A / ←</span>
        </button>
        <button class="ro-menu-btn" id="ro-comic-next-btn">
          <span class="ro-btn-left"><span class="ro-icon">${icons.skipForward}</span><span>Chương Tiếp Theo</span></span>
          <span class="ro-badge">Phím D / →</span>
        </button>
        <button class="ro-menu-btn" id="ro-comic-up-btn">
          <span class="ro-btn-left"><span class="ro-icon">${icons.volumeUp}</span><span>Cuộn Lên 450px</span></span>
          <span class="ro-badge">Phím W / ↑</span>
        </button>
        <button class="ro-menu-btn" id="ro-comic-down-btn">
          <span class="ro-btn-left"><span class="ro-icon">${icons.volumeDown}</span><span>Cuộn Xuống 450px</span></span>
          <span class="ro-badge">Phím S / ↓</span>
        </button>
        <button class="ro-menu-btn" id="ro-fullscreen-btn">
          <span class="ro-btn-left"><span class="ro-icon">${icons.fullscreen}</span><span>Toàn Màn Hình</span></span>
          <span class="ro-badge">Phím F</span>
        </button>
        <button class="ro-menu-btn" id="ro-nukeads-btn" style="border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
          <span class="ro-btn-left"><span class="ro-icon">${icons.shieldClean}</span><span>Diệt Sạch Banner Rác</span></span>
          <span class="ro-badge" style="color: #f87171;">Phím X</span>
        </button>
      </div>
      <div id="ro-hub-toggle" title="Web Enhancer Control Hub">${icons.crown}</div>
    \` : \`
      <div id="ro-hub-menu">
        <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: #51f085; display: flex; justify-content: space-between; align-items: center;">
          <span class="ro-btn-left">
            <span class="ro-icon">${icons.film}</span>
            <span>${siteTitle}</span>
          </span>
          <span style="font-size: 11px; opacity: 0.7;">v${scriptVersion}</span>
        </div>
        <div id="ro-stream-preview" style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 6px 10px; font-size: 11px; word-break: break-all; color: #51f085; font-family: monospace; display: none; cursor: pointer;" title="Bấm để copy link"></div>
        <button class="ro-menu-btn" id="ro-copym3u8-btn">
          <span class="ro-btn-left"><span class="ro-icon">${icons.copy}</span><span>Sao Chép Link Luồng</span></span>
          <span class="ro-badge">IDM/Pot</span>
        </button>
        <button class="ro-menu-btn" id="ro-m3ufile-btn">
          <span class="ro-btn-left"><span class="ro-icon">${icons.download}</span><span>Tải Playlist .M3U</span></span>
          <span class="ro-badge">1-Click</span>
        </button>
        <button class="ro-menu-btn" id="ro-potplayer-btn">
          <span class="ro-btn-left"><span class="ro-icon">${icons.potplayer}</span><span>Mở PotPlayer</span></span>
          <span class="ro-badge">Direct</span>
        </button>
        <button class="ro-menu-btn" id="ro-vlc-btn">
          <span class="ro-btn-left"><span class="ro-icon">${icons.vlc}</span><span>Mở VLC Player</span></span>
          <span class="ro-badge">Direct</span>
        </button>
        <button class="ro-menu-btn" id="ro-skipintro-btn">
          <span class="ro-btn-left"><span class="ro-icon">${icons.skipForward}</span><span>Bỏ Qua Intro 85s</span></span>
          <span class="ro-badge">S / I</span>
        </button>
        <button class="ro-menu-btn" id="ro-fullscreen-btn">
          <span class="ro-btn-left"><span class="ro-icon">${icons.fullscreen}</span><span>Toàn Màn Hình</span></span>
          <span class="ro-badge">Phím F</span>
        </button>
        <button class="ro-menu-btn" id="ro-hdr-btn">
          <span class="ro-btn-left"><span class="ro-icon">${icons.sparkles}</span><span>Anime OLED HDR</span></span>
          <span class="ro-badge">Phím E</span>
        </button>
        <button class="ro-menu-btn" id="ro-theater-btn">
          <span class="ro-btn-left"><span class="ro-icon">${icons.theater}</span><span>Chế Độ Rạp Phim</span></span>
          <span class="ro-badge">Phím T</span>
        </button>
        <button class="ro-menu-btn" id="ro-nukeads-btn" style="border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
          <span class="ro-btn-left"><span class="ro-icon">${icons.shieldClean}</span><span>Diệt Sạch Banner Rác</span></span>
          <span class="ro-badge" style="color: #f87171;">Phím X</span>
        </button>
        <div style="display: flex; gap: 8px; margin-top: 4px;">
          <button class="ro-menu-btn" id="ro-vol-down" style="flex: 1; justify-content: center;" title="Giảm âm lượng">
            <span class="ro-btn-left"><span class="ro-icon">${icons.volumeDown}</span><span>Giảm (↓)</span></span>
          </button>
          <button class="ro-menu-btn" id="ro-vol-up" style="flex: 1; justify-content: center;" title="Tăng âm lượng">
            <span class="ro-btn-left"><span class="ro-icon">${icons.volumeUp}</span><span>Tăng (↑)</span></span>
          </button>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="ro-menu-btn" id="ro-speed-down" style="flex: 1; justify-content: center;" title="Giảm tốc độ phát">
            <span class="ro-btn-left"><span class="ro-icon">${icons.minus}</span><span>Chậm ([)</span></span>
          </button>
          <button class="ro-menu-btn" id="ro-speed-up" style="flex: 1; justify-content: center;" title="Tăng tốc độ phát">
            <span class="ro-btn-left"><span class="ro-icon">${icons.plus}</span><span>Nhanh (])</span></span>
          </button>
        </div>
      </div>
      <div id="ro-hub-toggle" title="Web Enhancer Control Hub">${icons.crown}</div>
    \`;
    document.body.appendChild(hub);

    const toggle = hub.querySelector("#ro-hub-toggle");
    const menu = hub.querySelector("#ro-hub-menu");
    if (toggle && menu) {
      // Toggle menu khi bấm nút Vương Miện (dùng duy nhất 1 listener)
      toggle.onclick = (e) => {
        if (e && typeof e.preventDefault === "function") e.preventDefault();
        if (e && typeof e.stopPropagation === "function") e.stopPropagation();
        menu.classList.toggle("show");
      };

      // Ngăn tương tác click trong menu phát tán ra document
      menu.onclick = (e) => {
        if (e && typeof e.stopPropagation === "function") e.stopPropagation();
      };

      // Đóng menu khi click chuột THẬT (isTrusted = true) ra ngoài vùng VIP Hub
      document.addEventListener("click", (e) => {
        if (!e.isTrusted) return;
        if (e.target && (hub.contains(e.target) || (e.target.closest && e.target.closest("#ro-vip-hub")))) return;
        menu.classList.remove("show");
      });
    }

    const bind = (id, fn) => {
      const el = hub.querySelector("#" + id) || document.getElementById(id);
      if (el) el.addEventListener("click", fn);
    };

    const execAction = (fnName, ...args) => {
      try {
        if (typeof window !== "undefined" && typeof window[fnName] === "function") {
          return window[fnName](...args);
        }
        if (typeof eval !== "undefined") {
          const fn = eval("(typeof " + fnName + " === 'function' ? " + fnName + " : null)");
          if (fn) return fn(...args);
        }
      } catch (e) {
        console.warn("[Cinema Pro] Action not found:", fnName);
      }
    };

    bind("ro-comic-prev-btn", () => execAction("navigateComicChapter", -1));
    bind("ro-comic-next-btn", () => execAction("navigateComicChapter", 1));
    bind("ro-comic-up-btn", () => window.scrollBy({ top: -450, behavior: "smooth" }));
    bind("ro-comic-down-btn", () => window.scrollBy({ top: 450, behavior: "smooth" }));
    bind("ro-stream-preview", () => execAction("copyM3u8"));
    bind("ro-potplayer-btn", () => execAction("openPotPlayer"));
    bind("ro-vlc-btn", () => execAction("openVlcPlayer"));
    bind("ro-copym3u8-btn", () => execAction("copyM3u8"));
    bind("ro-m3ufile-btn", () => execAction("downloadM3uFile"));
    bind("ro-skipintro-btn", () => execAction("skipIntro", 85));
    bind("ro-fullscreen-btn", () => execAction("toggleFullscreen"));
    bind("ro-hdr-btn", () => execAction("toggleHdr"));
    bind("ro-theater-btn", () => execAction("toggleTheater"));
    bind("ro-nukeads-btn", () => execAction("nukeAdElements", true));
    bind("ro-vol-down", () => execAction("adjustVolume", -0.05));
    bind("ro-vol-up", () => execAction("adjustVolume", 0.05));
    bind("ro-speed-down", () => execAction("adjustSpeed", -1));
    bind("ro-speed-up", () => execAction("adjustSpeed", 1));
  }

  if (typeof window !== "undefined") {
    window.initVipHub = initVipHub;
  }
`;
}

module.exports = { getHubUiCode };
