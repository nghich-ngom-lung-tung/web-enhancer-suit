/**
 * Cinema Pro Suite - Manifest V3 Background Service Worker
 */

const storageArea = (typeof chrome !== "undefined" && chrome.storage && chrome.storage.session)
  ? chrome.storage.session
  : (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local ? chrome.storage.local : null);

// In-memory cache for ultra-fast sync access with persistent backing
const tabStreams = new Map();

function saveTabStream(tabId, data) {
  tabStreams.set(tabId, data);
  if (storageArea) {
    try {
      storageArea.set({ ["stream_" + tabId]: data });
    } catch (e) {}
  }
}

function removeTabStream(tabId) {
  tabStreams.delete(tabId);
  if (storageArea) {
    try {
      storageArea.remove("stream_" + tabId);
    } catch (e) {}
  }
}

// Initialize default settings on install or update
chrome.runtime.onInstalled.addListener(() => {
  console.log("[Cinema Pro] Extension installed/updated successfully!");
  chrome.storage.local.get(["adblockEnabled", "vipEnabled", "hdrEnabled", "theaterEnabled"], (res) => {
    const defaults = {
      adblockEnabled: res.adblockEnabled !== undefined ? res.adblockEnabled : true,
      vipEnabled: res.vipEnabled !== undefined ? res.vipEnabled : true,
      hdrEnabled: res.hdrEnabled !== undefined ? res.hdrEnabled : false,
      theaterEnabled: res.theaterEnabled !== undefined ? res.theaterEnabled : false
    };
    chrome.storage.local.set(defaults);
  });
});

// Clean up closed tabs
chrome.tabs.onRemoved.addListener((tabId) => {
  removeTabStream(tabId);
});

// Reset stream when a tab navigates or reloads
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    removeTabStream(tabId);
    try {
      chrome.action.setBadgeText({ tabId, text: "" });
    } catch (e) {}
  }
});

// Message handler between content scripts, popup, and background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = sender.tab ? sender.tab.id : null;

  if (message.action === "STREAM_DETECTED" && tabId) {
    const streamData = {
      url: message.url,
      title: message.title || "Cinema Pro Stream",
      time: Date.now()
    };
    saveTabStream(tabId, streamData);

    // Show stylish green badge on active stream detection
    try {
      chrome.action.setBadgeText({ tabId, text: "VIP" });
      chrome.action.setBadgeBackgroundColor({ tabId, color: "#10b981" });
    } catch (e) {}

    sendResponse({ success: true });
    return false;
  }

  if (message.action === "GET_TAB_STREAM") {
    const targetTabId = message.tabId || tabId;
    const memStream = tabStreams.get(targetTabId);
    if (memStream) {
      sendResponse({ stream: memStream });
      return false;
    }
    if (storageArea) {
      storageArea.get("stream_" + targetTabId, (res) => {
        const stream = (res && res["stream_" + targetTabId]) || null;
        if (stream) tabStreams.set(targetTabId, stream);
        sendResponse({ stream });
      });
      return true; // Keep message channel open for async response
    }
    sendResponse({ stream: null });
    return false;
  }

  if (message.action === "CLEAR_STREAM" && tabId) {
    removeTabStream(tabId);
    try {
      chrome.action.setBadgeText({ tabId, text: "" });
    } catch (e) {}
    sendResponse({ success: true });
    return false;
  }
});
