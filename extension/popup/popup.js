/**
 * Cinema Pro Suite - Extension Popup Script (Ultra-Resilient)
 */

// Chặn tuyệt đối mọi exception chưa bắt làm sập/đóng popup
window.addEventListener("error", (e) => {
  console.warn("[Cinema Pro Popup Error Caught]", e);
});
window.addEventListener("unhandledrejection", (e) => {
  console.warn("[Cinema Pro Popup Rejection Caught]", e);
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const hostEl = document.getElementById("current-host");
    const siteStatusEl = document.getElementById("site-status");
    const streamTextEl = document.getElementById("stream-text");
    const streamActionsEl = document.getElementById("stream-actions");
    const btnCopyStream = document.getElementById("btn-copy-stream");
    const btnVlcGuide = document.getElementById("btn-vlc-guide");
    const btnToggleHdr = document.getElementById("btn-toggle-hdr");
    const btnToggleTheater = document.getElementById("btn-toggle-theater");
    const btnSkipIntro = document.getElementById("btn-skip-intro");
    const btnNukeAds = document.getElementById("btn-nuke-ads");
    const versionEl = document.querySelector(".version");
    if (versionEl && chrome.runtime?.getManifest) {
      try {
        const v = chrome.runtime.getManifest().version;
        if (v) versionEl.textContent = `v${v} (Manifest V3)`;
      } catch (_) {}
    }

    let currentTab = null;
    let activeStreamUrl = "";

    // 1. Lấy thông tin active tab an toàn (hỗ trợ cả khi DevTools F12 đang mở/docked)
    try {
      let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tabs || tabs.length === 0) {
        tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      }
      if (tabs && tabs.length > 0) {
        currentTab = tabs[0];
        if (currentTab && currentTab.url && hostEl) {
          try {
            const urlObj = new URL(currentTab.url);
            hostEl.textContent = urlObj.hostname || "Trang web";
          } catch (e) {
            hostEl.textContent = currentTab.url;
          }
        }
      }
    } catch (e) {
      if (hostEl) hostEl.textContent = "Không xác định";
    }

    // 2. Lấy luồng video đã bắt từ background service worker
    if (currentTab && currentTab.id) {
      try {
        chrome.runtime.sendMessage({ action: "GET_TAB_STREAM", tabId: currentTab.id }, (res) => {
          if (chrome.runtime.lastError) {
            return; // Tránh runtime error khi service worker đang khởi động lại
          }
          if (res && res.stream && res.stream.url) {
            activeStreamUrl = res.stream.url;
            if (streamTextEl) {
              streamTextEl.textContent = activeStreamUrl;
              streamTextEl.classList.remove("placeholder");
            }
            if (streamActionsEl) streamActionsEl.style.display = "flex";
          } else {
            activeStreamUrl = "";
            if (streamTextEl) {
              streamTextEl.textContent = "Chưa phát hiện luồng video. Hãy bấm phát video trên trang!";
              streamTextEl.classList.add("placeholder");
            }
            if (streamActionsEl) streamActionsEl.style.display = "none";
          }
        });
      } catch (e) {}
    }

    // Helper gửi lệnh tới content script của tab hiện tại
    function sendTabCommand(cmd) {
      if (!currentTab || !currentTab.id) return;
      try {
        chrome.tabs.sendMessage(currentTab.id, cmd, () => {
          if (chrome.runtime.lastError) {
            // Tab có thể chưa tải content script hoặc là trang nội bộ chrome://
          }
        });
      } catch (e) {}
    }

    // 3. Xử lý các nút bấm điều khiển
    if (btnCopyStream) {
      btnCopyStream.addEventListener("click", () => {
        if (!activeStreamUrl) return;
        navigator.clipboard.writeText(activeStreamUrl).then(() => {
          const origText = btnCopyStream.innerHTML;
          btnCopyStream.innerHTML = '<svg class="icon-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Đã sao chép!';
          setTimeout(() => {
            btnCopyStream.innerHTML = origText;
          }, 1800);
        }).catch(() => {});
      });
    }

    if (btnVlcGuide) {
      btnVlcGuide.addEventListener("click", () => {
        if (!activeStreamUrl) return;
        navigator.clipboard.writeText(activeStreamUrl).then(() => {
          const origText = btnVlcGuide.innerHTML;
          btnVlcGuide.innerHTML = '<svg class="icon-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Đã copy link!';
          setTimeout(() => {
            btnVlcGuide.innerHTML = origText;
          }, 2000);
        }).catch(() => {});
      });
    }

    if (btnToggleHdr) {
      btnToggleHdr.addEventListener("click", () => {
        sendTabCommand({ type: "RO_CMD_TOGGLE_HDR" });
        btnToggleHdr.classList.toggle("active");
      });
    }

    if (btnToggleTheater) {
      btnToggleTheater.addEventListener("click", () => {
        sendTabCommand({ type: "RO_CMD_TOGGLE_THEATER" });
        btnToggleTheater.classList.toggle("active");
      });
    }

    if (btnSkipIntro) {
      btnSkipIntro.addEventListener("click", () => {
        sendTabCommand({ type: "RO_CMD_SKIP_INTRO", seconds: 85 });
      });
    }

    if (btnNukeAds) {
      btnNukeAds.addEventListener("click", () => {
        sendTabCommand({ type: "RO_CMD_NUKE_ADS" });
      });
    }
  } catch (err) {
    console.warn("[Cinema Pro Popup Handled Error]", err);
  }
});
