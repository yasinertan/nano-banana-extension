// This script runs in the background of the browser.

// 1. Create the context menu item when the extension is first installed.
chrome.runtime.onInstalled.addListener(() => {
  // A check to prevent errors if the menu already exists.
  chrome.contextMenus.remove("recreate-with-nano-banana", () => {
    chrome.contextMenus.create({
      id: "recreate-with-nano-banana",
      title: "Recreate with Nano Banana",
      // This menu item will only appear when you right-click an image.
      contexts: ["image"]
    });
  });
});

// 2. Listen for a click on our context menu item.
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "recreate-with-nano-banana" && info.srcUrl) {
    
    // THE FIX: Save the image URL to the extension's local storage.
    // This is the most reliable way to pass data.
    await chrome.storage.local.set({ selectedImageUrl: info.srcUrl });

    // Now, create the popup window. The popup is responsible for reading the URL from storage.
    chrome.windows.create({
      url: 'popup.html', // No extra data is needed in the URL itself.
      type: 'popup',
      width: 730,
      height: 560
    });
  }
});

