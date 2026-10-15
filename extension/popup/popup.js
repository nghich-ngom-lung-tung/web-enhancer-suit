/**
 * Cinema Pro Suite - Popup Script
 */

document.addEventListener("DOMContentLoaded", async () => {
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

  let currentTab = null;
  let activeStreamUrl = "";

  // 1. Get current active tab
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs && tabs.length > 0) {
      currentTab = tabs[0];
      if (currentTab.url) {
        try {
          const urlObj = new URL(currentTab.url);
          hostEl.textContent = urlObj.hostname || "Trang web";
        } catch (e) {
          hostEl.textContent = currentTab.url;
        }
      }
    }
  } catch (e) {
    hostEl.textContent = "Không xác định";
  }

  // 2. Query detected stream from background worker
  if (currentTab && currentTab.id) {
    chrome.runtime.sendMessage({ action: "GET_TAB_STREAM", tabId: currentTab.id }, (res) => {
      if (res && res.stream && res.stream.url) {
        activeStreamUrl = res.stream.url;
        streamTextEl.textContent = activeStreamUrl;
        streamTextEl.classList.remove("placeholder");
        streamActionsEl.style.display = "flex";
      } else {
        activeStreamUrl = "";
        streamTextEl.textContent = "Chưa phát hiện luồng video. Hãy bấm phát video trên trang!";
        streamTextEl.classList.add("placeholder");
        streamActionsEl.style.display = "none";
      }
    });
  }

  // Helper to send command to content script in current tab
  function sendTabCommand(cmd) {
    if (!currentTab || !currentTab.id) return;
    chrome.tabs.sendMessage(currentTab.id, cmd, () => {
      if (chrome.runtime.lastError) {
        // Tab might not have content script yet or is a chrome:// page
      }
    });
  }

  // 3. Button actions
  if (btnCopyStream) {
    btnCopyStream.addEventListener("click", () => {
      if (!activeStreamUrl) return;
      navigator.clipboard.writeText(activeStreamUrl).then(() => {
        const origText = btnCopyStream.innerHTML;
        btnCopyStream.innerHTML = "✓ Đã sao chép!";
        setTimeout(() => {
          btnCopyStream.innerHTML = origText;
        }, 1800);
      });
    });
  }

  if (btnVlcGuide) {
    btnVlcGuide.addEventListener("click", () => {
      if (!activeStreamUrl) return;
      navigator.clipboard.writeText(activeStreamUrl).then(() => {
        alert("Đã sao chép link M3U8 vào Clipboard!\n\nCách phát trên VLC:\n1. Mở VLC Media Player\n2. Bấm Ctrl + N (Open Network Stream)\n3. Dán link vừa chép và bấm Play!\n\nCách phát trên PotPlayer:\n1. Mở PotPlayer\n2. Bấm Ctrl + U và dán link!");
      });
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
});
