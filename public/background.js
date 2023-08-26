// background.js

let keepPopupOpen = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "togglePopup") {
    keepPopupOpen = request.keepOpen;
  }
});

chrome.tabs.onActivated.addListener(async (tab) => {
  if (keepPopupOpen) {
    const [tabInfo] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabInfo?.url?.startsWith("chrome-extension://")) {
      chrome.action.openPopup();
    }
  }
});
