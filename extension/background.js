/**
 * Cinema Pro Suite - Manifest V3 Background Service Worker
 */

const tabStreams = new Map();

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
  tabStreams.delete(tabId);
});

// Reset stream when a tab navigates or reloads
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    tabStreams.delete(tabId);
    try {
      chrome.action.setBadgeText({ tabId, text: "" });
    } catch (e) {}
  }
});

// Message handler between content scripts, popup, and background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = sender.tab ? sender.tab.id : null;

  if (message.action === "STREAM_DETECTED" && tabId) {
    tabStreams.set(tabId, {
      url: message.url,
      title: message.title || "Cinema Pro Stream",
      time: Date.now()
    });

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
    const stream = tabStreams.get(targetTabId) || null;
    sendResponse({ stream });
    return false;
  }

  if (message.action === "CLEAR_STREAM" && tabId) {
    tabStreams.delete(tabId);
    try {
      chrome.action.setBadgeText({ tabId, text: "" });
    } catch (e) {}
    sendResponse({ success: true });
    return false;
  }
});
