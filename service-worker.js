chrome.runtime.onInstalled.addListener((details) => {
    chrome.storage.sync.clear(() => {
    console.log("chrome.storage.sync has been cleared for all users.");
    });
});