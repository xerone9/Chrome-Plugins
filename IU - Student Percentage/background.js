let auto_print_voucher = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const myBooleanValue = message.myBoolean;
    auto_print_voucher = myBooleanValue; // Prints the boolean value received from script.js
  });

if (auto_print_voucher) {
        let lastActiveTabId = -1;

        chrome.tabs.onActivated.addListener(({ tabId }) => {
        lastActiveTabId = tabId;
    });

        chrome.tabs.onCreated.addListener((tab) => {
        if (lastActiveTabId !== -1) {
            chrome.tabs.update(lastActiveTabId, { active: true });
        }
    });
}
