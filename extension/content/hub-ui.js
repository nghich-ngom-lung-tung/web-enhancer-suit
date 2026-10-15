/**
 * Cinema Pro Suite - VIP Control Hub & Toast Notifications
 */
(() => {
  "use strict";

  // ─── TOAST NOTIFICATIONS (ZERO EMOJIS, CLEAN TEXT) ───
  function showToast(msg) {
    const t = document.createElement("div");
    t.className = "ro-toast";
    t.innerHTML = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  // ─── VIP CONTROL HUB DOM CREATION ───
  function initVipHub() {
    if (document.getElementById("ro-vip-hub")) return;
    const isComic = typeof isComicPage === "function" && isComicPage() && !document.querySelector("video");
    const hub = document.createElement("div");
    hub.id = "ro-vip-hub";
    hub.innerHTML = isComic ? `
      <div id="ro-hub-menu">
        <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: #51f085; display: flex; justify-content: space-between; align-items: center;">
          <span class="ro-btn-left">
            <span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg></span>
            <span>Web Enhancer Suite</span>
          </span>
          <span style="font-size: 11px; opacity: 0.7;">v5.4.9</span>
        </div>
        <button class="ro-menu-btn" id="ro-comic-prev-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg></span><span>Chương Trước</span></span>
          <span class="ro-badge">Phím A / ←</span>
        </button>
        <button class="ro-menu-btn" id="ro-comic-next-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg></span><span>Chương Tiếp Theo</span></span>
          <span class="ro-badge">Phím D / →</span>
        </button>
        <button class="ro-menu-btn" id="ro-comic-up-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></span><span>Cuộn Lên 450px</span></span>
          <span class="ro-badge">Phím W / ↑</span>
        </button>
        <button class="ro-menu-btn" id="ro-comic-down-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></span><span>Cuộn Xuống 450px</span></span>
          <span class="ro-badge">Phím S / ↓</span>
        </button>
        <button class="ro-menu-btn" id="ro-fullscreen-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></span><span>Toàn Màn Hình</span></span>
          <span class="ro-badge">Phím F</span>
        </button>
        <button class="ro-menu-btn" id="ro-nukeads-btn" style="border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="9" x2="15" y1="9" y2="15"/><line x1="15" x2="9" y1="9" y2="15"/></svg></span><span>Diệt Sạch Banner Rác</span></span>
          <span class="ro-badge" style="color: #f87171;">Phím X</span>
        </button>
      </div>
      <div id="ro-hub-toggle" title="Web Enhancer Control Hub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg></div>
    ` : `
      <div id="ro-hub-menu">
        <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: #51f085; display: flex; justify-content: space-between; align-items: center;">
          <span class="ro-btn-left">
            <span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"/><line x1="7" x2="7" y1="2" y2="22"/><line x1="17" x2="17" y1="2" y2="22"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="2" x2="7" y1="7" y2="7"/><line x1="2" x2="7" y1="17" y2="17"/><line x1="17" x2="22" y1="17" y2="17"/><line x1="17" x2="22" y1="7" y2="7"/></svg></span>
            <span>Web Enhancer Suite</span>
          </span>
          <span style="font-size: 11px; opacity: 0.7;">v5.4.9</span>
        </div>
        <div id="ro-stream-preview" style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 6px 10px; font-size: 11px; word-break: break-all; color: #51f085; font-family: monospace; display: none; cursor: pointer;" title="Bấm để copy link"></div>
        <button class="ro-menu-btn" id="ro-copym3u8-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span><span>Sao Chép Link Luồng</span></span>
          <span class="ro-badge">IDM/Pot</span>
        </button>
        <button class="ro-menu-btn" id="ro-m3ufile-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg></span><span>Tải Playlist .M3U</span></span>
          <span class="ro-badge">1-Click</span>
        </button>
        <button class="ro-menu-btn" id="ro-potplayer-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg></span><span>Mở PotPlayer</span></span>
          <span class="ro-badge">Direct</span>
        </button>
        <button class="ro-menu-btn" id="ro-vlc-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 2-8 15h12L10 2z"/><path d="M6 17h12v4H6z"/></svg></span><span>Mở VLC Player</span></span>
          <span class="ro-badge">Direct</span>
        </button>
        <button class="ro-menu-btn" id="ro-skipintro-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg></span><span>Bỏ Qua Intro 85s</span></span>
          <span class="ro-badge">S / I</span>
        </button>
        <button class="ro-menu-btn" id="ro-fullscreen-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></span><span>Toàn Màn Hình</span></span>
          <span class="ro-badge">Phím F</span>
        </button>
        <button class="ro-menu-btn" id="ro-hdr-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg></span><span>Anime OLED HDR</span></span>
          <span class="ro-badge">Phím E</span>
        </button>
        <button class="ro-menu-btn" id="ro-theater-btn">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="4.5" rx="2"/><polyline points="2 9.5 22 9.5"/><line x1="12" x2="12" y1="4.5" y2="9.5"/></svg></span><span>Chế Độ Rạp Phim</span></span>
          <span class="ro-badge">Phím T</span>
        </button>
        <button class="ro-menu-btn" id="ro-nukeads-btn" style="border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
          <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="9" x2="15" y1="9" y2="15"/><line x1="15" x2="9" y1="9" y2="15"/></svg></span><span>Diệt Sạch Banner Rác</span></span>
          <span class="ro-badge" style="color: #f87171;">Phím X</span>
        </button>
        <div style="display: flex; gap: 8px; margin-top: 4px;">
          <button class="ro-menu-btn" id="ro-vol-down" style="flex: 1; justify-content: center;" title="Giảm âm lượng">
            <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></span><span>Giảm (↓)</span></span>
          </button>
          <button class="ro-menu-btn" id="ro-vol-up" style="flex: 1; justify-content: center;" title="Tăng âm lượng">
            <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></span><span>Tăng (↑)</span></span>
          </button>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="ro-menu-btn" id="ro-speed-down" style="flex: 1; justify-content: center;" title="Giảm tốc độ phát">
            <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" x2="19" y1="12" y2="12"/></svg></span><span>Chậm ([)</span></span>
          </button>
          <button class="ro-menu-btn" id="ro-speed-up" style="flex: 1; justify-content: center;" title="Tăng tốc độ phát">
            <span class="ro-btn-left"><span class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg></span><span>Nhanh (])</span></span>
          </button>
        </div>
      </div>
      <div id="ro-hub-toggle" title="Web Enhancer Control Hub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg></div>
    `;
    document.body.appendChild(hub);

    const toggle = hub.querySelector("#ro-hub-toggle");
    const menu = hub.querySelector("#ro-hub-menu");
    if (toggle && menu) {
      toggle.onclick = (e) => {
        e.stopPropagation();
        menu.classList.toggle("show");
      };
      document.addEventListener("click", () => menu.classList.remove("show"));
      menu.addEventListener("click", (e) => e.stopPropagation());
    }

    const bind = (id, fn) => {
      const el = hub.querySelector("#" + id) || document.getElementById(id);
      if (el) el.addEventListener("click", fn);
    };

    bind("ro-comic-prev-btn", () => navigateComicChapter(-1));
    bind("ro-comic-next-btn", () => navigateComicChapter(1));
    bind("ro-comic-up-btn", () => window.scrollBy({ top: -450, behavior: "smooth" }));
    bind("ro-comic-down-btn", () => window.scrollBy({ top: 450, behavior: "smooth" }));
    bind("ro-stream-preview", copyM3u8);
    bind("ro-potplayer-btn", openPotPlayer);
    bind("ro-vlc-btn", openVlcPlayer);
    bind("ro-copym3u8-btn", copyM3u8);
    bind("ro-m3ufile-btn", downloadM3uFile);
    bind("ro-skipintro-btn", () => skipIntro(85));
    bind("ro-fullscreen-btn", toggleFullscreen);
    bind("ro-hdr-btn", toggleHdr);
    bind("ro-theater-btn", toggleTheater);
    bind("ro-nukeads-btn", () => nukeAdElements(true));
    bind("ro-vol-down", () => adjustVolume(-0.05));
    bind("ro-vol-up", () => adjustVolume(0.05));
    bind("ro-speed-down", () => adjustSpeed(-1));
    bind("ro-speed-up", () => adjustSpeed(1));
  }


  // Export to window for modular extension architecture
  window.showToast = typeof showToast === "function" ? showToast : undefined;
  window.initVipHub = typeof initVipHub === "function" ? initVipHub : undefined;
})();
