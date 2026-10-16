/**
 * Cinema Pro Suite - Content Bridge Script (Isolated World)
 * Bridges MAIN world with Extension Runtime & Background Service Worker
 */
(function () {
  "use strict";

  // Listen for messages emitted from MAIN world
  window.addEventListener("message", (event) => {
    if (event.source !== window || !event.data || typeof event.data !== "object") return;

    if (event.data.type === "CINEMA_PRO_STREAM_FOUND" || event.data.type === "RO_STREAM_FOUND") {
      const streamUrl = event.data.url || event.data.streamUrl;
      if (streamUrl) {
        try {
          chrome.runtime.sendMessage({
            action: "STREAM_DETECTED",
            url: streamUrl,
            title: event.data.title || document.title
          });
        } catch (e) {}
      }
    }
  });

  // Listen for commands dispatched from Popup or Background
  chrome.runtime.onMessage.addListener((cmd, sender, sendResponse) => {
    try {
      window.postMessage(cmd, "*");
      sendResponse({ status: "forwarded_to_main_world" });
    } catch (e) {
      sendResponse({ status: "error", error: e.message });
    }
    return false;
  });
})();
