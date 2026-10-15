/**
 * Cinema Pro Suite - Player Controls & Hotkeys Module (Zero Emojis)
 */
module.exports = `
  function sendCommandToPlayer(cmd) {
    const video = document.querySelector("video");
    if (video) {
      if (cmd.type === "RO_CMD_SKIP_INTRO") {
        video.currentTime = Math.min(video.duration || Infinity, video.currentTime + (cmd.seconds || 85));
      } else if (cmd.type === "RO_CMD_SEEK") {
        video.currentTime = Math.max(0, Math.min(video.duration || Infinity, video.currentTime + (cmd.delta || 0)));
      } else if (cmd.type === "RO_CMD_SEEK_PERCENT") {
        if (video.duration) video.currentTime = (video.duration * (cmd.percent || 0)) / 100;
      } else if (cmd.type === "RO_CMD_VOLUME") {
        video.volume = Math.max(0, Math.min(1, cmd.volume !== undefined ? cmd.volume : 1));
      } else if (cmd.type === "RO_CMD_SET_SPEED") {
        video.playbackRate = cmd.speed || 1;
      } else if (cmd.type === "RO_CMD_TOGGLE_HDR") {
        video.classList.toggle("ro-enhanced-hdr");
      } else if (cmd.type === "RO_CMD_TOGGLE_PLAY") {
        if (video.paused) video.play().catch(() => {});
        else video.pause();
      } else if (cmd.type === "RO_CMD_MUTE") {
        video.muted = !video.muted;
      } else if (cmd.type === "RO_CMD_FULLSCREEN") {
        if (document.fullscreenElement) {
          try { document.exitFullscreen().catch(() => {}); } catch (e) {}
        } else {
          try { video.requestFullscreen().catch(() => {}); } catch (e) {}
        }
      }
    }
    document.querySelectorAll("iframe").forEach(f => {
      try { f.contentWindow.postMessage(cmd, "*"); } catch (e) {}
    });
  }

  function skipIntro(sec = 85) {
    sendCommandToPlayer({ type: "RO_CMD_SKIP_INTRO", seconds: sec });
    showToast("Đã tua Intro: +" + sec + "s");
  }

  function seekRelative(delta = 5) {
    sendCommandToPlayer({ type: "RO_CMD_SEEK", delta });
    showToast(delta > 0 ? ("Tua tới: +" + delta + "s") : ("Tua lùi: " + delta + "s"));
  }

  function seekToPercent(pct = 0) {
    sendCommandToPlayer({ type: "RO_CMD_SEEK_PERCENT", percent: pct });
    showToast("Vị trí video: " + pct + "%");
  }

  function adjustVolume(delta) {
    let newVol = Math.round((currentVolume + delta) * 100) / 100;
    newVol = Math.max(0, Math.min(1.0, newVol));
    currentVolume = newVol;
    sendCommandToPlayer({ type: "RO_CMD_VOLUME", volume: currentVolume });
    showToast("Âm lượng: " + Math.round(currentVolume * 100) + "%");
  }

  function toggleHdr() {
    isHdrEnabled = !isHdrEnabled;
    sendCommandToPlayer({ type: "RO_CMD_TOGGLE_HDR" });
    showToast(isHdrEnabled ? "Anime OLED HDR: BẬT" : "OLED HDR: TẮT");
  }

  function toggleTheater() {
    isTheaterMode = !isTheaterMode;
    document.body.classList.toggle("ro-theater-active", isTheaterMode);
    showToast(isTheaterMode ? "Chế độ Rạp phim: BẬT" : "Chế độ Rạp phim: TẮT");
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      try { document.exitFullscreen().catch(() => {}); } catch (e) {}
      showToast("Đã thoát Toàn màn hình");
    } else {
      const playerWrapper = document.querySelector(".player-wrapper, .player-container, #player, iframe, video");
      const target = playerWrapper || document.documentElement;
      if (target && target.requestFullscreen) {
        try { target.requestFullscreen().catch(() => {}); } catch (e) {}
      }
      sendCommandToPlayer({ type: "RO_CMD_FULLSCREEN" });
      showToast("Toàn màn hình");
    }
  }

  function isNoRefererCdn(url) {
    if (!url || typeof url !== "string") return false;
    const l = url.toLowerCase();
    const hasMetaNoReferrer = Boolean(document.querySelector('meta[name="referrer"][content="no-referrer"]'));
    return (
      hasMetaNoReferrer ||
      l.includes("cdninstagram.com") ||
      l.includes("fbcdn.net") ||
      l.includes("fbsbx.com") ||
      l.includes("akamaihd.net") ||
      l.includes("discordapp.com") ||
      l.includes("discord.com") ||
      l.includes("media.discordapp.net")
    );
  }

  function openPotPlayer() {
    ensureStreamUrl();
    if (!capturedStreamUrl) {
      showToast("Đang chờ bắt link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = capturedStreamUrl.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).catch(() => {});
    }
    function getStreamReferer(url) {
      if (isNoRefererCdn(url)) return "";
      if (url.includes("edgemaxcdn") || url.includes("100ycdn") || url.includes("cctvsignal") || (typeof location !== "undefined" && location.hostname && (location.hostname.includes("chuoichien") || location.hostname.includes("cctvsignal")))) {
        return "https://fhd-01.cctvsignal.xyz/";
      }
      return (typeof location !== "undefined" && location.href) ? location.href : "";
    }

    const ref = getStreamReferer(cleanUrl);
    const potTarget = ref ? (cleanUrl + "|Referer=" + encodeURIComponent(ref)) : cleanUrl;
    window.location.href = "potplayer://" + potTarget;
    showToast("Đang mở PotPlayer...");
  }

  function openVlcPlayer() {
    ensureStreamUrl();
    if (!capturedStreamUrl) {
      showToast("Đang chờ bắt link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = capturedStreamUrl.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).catch(() => {});
    }
    window.location.href = "vlc://" + encodeURIComponent(cleanUrl);
    showToast("Đang mở VLC... Nếu VLC báo lỗi MRL do CDN chặn Referer, hãy bấm 'Tải Playlist .M3U' hoặc dùng PotPlayer!");
  }

  function copyM3u8() {
    ensureStreamUrl();
    if (!capturedStreamUrl) {
      showToast("Đang tìm link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = capturedStreamUrl.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).then(() => {
        showToast("Đã copy link M3U8 chuẩn: " + (cleanUrl.length > 40 ? cleanUrl.slice(0, 37) + "..." : cleanUrl));
      }).catch(() => fallbackCopy(cleanUrl));
    } else {
      fallbackCopy(cleanUrl);
    }
  }

  function fallbackCopy(text) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      (document.body || document.documentElement).appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, 99999);
      document.execCommand("copy");
      ta.remove();
      showToast("Đã copy link M3U8 chuẩn: " + (text.length > 40 ? text.slice(0, 37) + "..." : text));
    } catch (e) {
      prompt("Sao chép link video:", text);
    }
  }

  function downloadM3uFile() {
    ensureStreamUrl();
    if (!capturedStreamUrl) {
      showToast("Chưa có link video, hãy bấm Play trước!");
      return;
    }
    const cleanUrl = capturedStreamUrl.trim();
    const title = (document.title || "Cinema_Pro_Stream").replace(/[/\\?%*:|"<>]/g, "_").trim();
    function getStreamReferer(url) {
      if (isNoRefererCdn(url)) return "";
      if (url.includes("edgemaxcdn") || url.includes("100ycdn") || url.includes("cctvsignal") || (typeof location !== "undefined" && location.hostname && (location.hostname.includes("chuoichien") || location.hostname.includes("cctvsignal")))) {
        return "https://fhd-01.cctvsignal.xyz/";
      }
      return (typeof location !== "undefined" && location.href) ? location.href : "";
    }
    const ref = getStreamReferer(cleanUrl);
    const ua = navigator.userAgent || "Mozilla/5.0";
    const refLine = ref ? ("#EXTVLCOPT:http-referrer=" + ref + "\\n") : "";
    const content = "#EXTM3U\\n#EXTINF:-1," + title + "\\n" + refLine + "#EXTVLCOPT:http-user-agent=" + ua + "\\n#EXTVLCOPT:network-caching=1000\\n" + cleanUrl + "\\n";
    const blob = new Blob([content], { type: "audio/x-mpegurl" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = title + ".m3u";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(a.href);
    }, 1000);
    showToast("Đã tải playlist .m3u (Kèm Referer cho VLC & PotPlayer)!");
  }

  function adjustSpeed(delta) {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0];
    let idx = speeds.indexOf(currentSpeed);
    if (idx === -1) idx = 2;
    idx = Math.max(0, Math.min(speeds.length - 1, idx + delta));
    currentSpeed = speeds[idx];
    sendCommandToPlayer({ type: "RO_CMD_SET_SPEED", speed: currentSpeed });
    showToast("Tốc độ phát: " + currentSpeed + "x");
  }

  function isComicPage() {
    return Boolean(
      document.querySelector(".chapter-images-container") ||
      document.querySelector("[data-chapter-navigation]") ||
      document.querySelector(".chapter-choose") ||
      document.querySelector(".page-chapter") ||
      document.querySelector(".select-chapter") ||
      document.querySelector("#select_chapter") ||
      document.querySelector("#chapter_content") ||
      document.querySelector(".reading-detail") ||
      document.querySelector(".chapter-content") ||
      document.querySelector("#scontent") ||
      document.querySelector(".box_text") ||
      (typeof location !== "undefined" && location.hostname && (
        location.hostname.includes("zettruyen") ||
        location.hostname.includes("toptruyen") ||
        location.hostname.includes("nettruyen") ||
        location.hostname.includes("truyenqq") ||
        location.hostname.includes("truyenvn") ||
        location.hostname.includes("luotnovel") ||
        location.hostname.includes("ghientruyen")
      ))
    );
  }

  function navigateComicChapter(direction) {
    if (direction < 0) {
      let prevBtn = document.querySelector(
        "[data-prev-chapter-container] a, [data-prev-chapter-container] button, a#prevChapter, #prevChapter, a.prev-chapter, a.chapter-previous, a.previous-chapter, a.previous-chapter-mobile, a.previous-chapter-mobi, .chapter-prev a, a.prev, a.back, a.btn-prev, button.btn-prev, a.prev_page, a.link-prev-chap, #prev_chap, a.prev-chap, .nav-previous a, a[rel='prev'], a[title*='Chương trước'], a[title*='Tập trước']"
      );
      if (!prevBtn && document.querySelectorAll) {
        const candidates = Array.from(document.querySelectorAll("a, button"));
        prevBtn = candidates.find(el => {
          const t = (el.textContent || "").trim();
          return t.includes("Chương trước") || t.includes("Tập trước") || t.includes("Chap trước");
        });
      }
      if (prevBtn) {
        prevBtn.click();
        showToast("Đang chuyển về chương trước...");
        return;
      }
    } else {
      let nextBtn = document.querySelector(
        "[data-next-chapter-container] a, [data-next-chapter-container] button, a#nextChapter, #nextChapter, a.next-chapter, a.chapter-next, a.next-chapter-mobile, a.next-chapter-mobi, .chapter-next a, a.next, a.forward, a.btn-next, button.btn-next, a.next_page, a.link-next-chap, #next_chap, a.next-chap, .nav-next a, a[rel='next'], a[title*='Chương sau'], a[title*='Tập sau']"
      );
      if (!nextBtn && document.querySelectorAll) {
        const candidates = Array.from(document.querySelectorAll("a, button"));
        nextBtn = candidates.find(el => {
          const t = (el.textContent || "").trim();
          return t.includes("Chương sau") || t.includes("Tập sau") || t.includes("Chap sau") || t.includes("Chương tiếp");
        });
      }
      if (nextBtn) {
        nextBtn.click();
        showToast("Đang chuyển tới chương tiếp theo...");
        return;
      }
    }

    const select = document.querySelector("select[data-chapter-dropdown], select.chapter-choose, select#select_chapter, select.select-chapter, select#slt_list_chapters, select[name*='ddlSelectChapter'], select.ctl00_mainContent_ddlSelectChapter, select#ddlSelectChapter");
    if (select && select.options && select.options.length > 1) {
      const nextIdx = select.selectedIndex + (direction < 0 ? 1 : -1);
      if (nextIdx >= 0 && nextIdx < select.options.length) {
        select.selectedIndex = nextIdx;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        const optVal = select.options[nextIdx].value;
        if (optVal && optVal.startsWith("http")) {
          location.href = optVal;
        }
        showToast("Đang tải: " + (select.options[nextIdx].text || "Chương mới"));
        return;
      }
    }
    showToast(direction < 0 ? "Đã ở chương đầu tiên!" : "Đã ở chương mới nhất!");
  }

  // ─── GLOBAL KEYBOARD SHORTCUTS ───
  window.addEventListener("keydown", function (e) {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || e.target?.isContentEditable) return;
    const key = e.key.toLowerCase();

    // Chế độ đọc truyện tranh (Comic/Manga Reading Mode)
    if (isComicPage() && !document.querySelector("video")) {
      if (key === "a" || key === "arrowleft") {
        e.preventDefault();
        navigateComicChapter(-1);
        return;
      } else if (key === "d" || key === "arrowright") {
        e.preventDefault();
        navigateComicChapter(1);
        return;
      } else if (key === "w" || key === "arrowup") {
        e.preventDefault();
        window.scrollBy({ top: -450, behavior: "smooth" });
        return;
      } else if (key === "s" || key === "arrowdown") {
        e.preventDefault();
        window.scrollBy({ top: 450, behavior: "smooth" });
        return;
      } else if (key === "f") {
        e.preventDefault();
        if (document.fullscreenElement) {
          try { document.exitFullscreen().catch(() => {}); } catch (err) {}
        } else {
          const container = document.querySelector(".chapter-images-container") || document.documentElement;
          try { container.requestFullscreen().catch(() => {}); } catch (err) {}
        }
        return;
      }
    }

    if (key === "s" || key === "i") {
      e.preventDefault();
      skipIntro(85);
    } else if (key === "arrowleft") {
      e.preventDefault();
      seekRelative(-5);
    } else if (key === "arrowright") {
      e.preventDefault();
      seekRelative(5);
    } else if (key === "arrowup") {
      e.preventDefault();
      adjustVolume(0.05);
    } else if (key === "arrowdown") {
      e.preventDefault();
      adjustVolume(-0.05);
    } else if (key === "f") {
      e.preventDefault();
      toggleFullscreen();
    } else if (key === "e") {
      e.preventDefault();
      toggleHdr();
    } else if (key === "t") {
      e.preventDefault();
      toggleTheater();
    } else if (key === "x") {
      e.preventDefault();
      nukeAdElements(true);
    } else if (e.key === "[") {
      e.preventDefault();
      adjustSpeed(-1);
    } else if (e.key === "]") {
      e.preventDefault();
      adjustSpeed(1);
    } else if (e.key === " " && !e.repeat) {
      e.preventDefault();
      sendCommandToPlayer({ type: "RO_CMD_TOGGLE_PLAY" });
    } else if (key === "m") {
      e.preventDefault();
      sendCommandToPlayer({ type: "RO_CMD_MUTE" });
    } else if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      seekToPercent(parseInt(e.key, 10) * 10);
    }
  });
`;
