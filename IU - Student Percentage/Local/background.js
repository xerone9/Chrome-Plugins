let auto_print_voucher = true;

let statusFlag = false; // Initialize the flag
let lastActiveTabId = -1;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'storeValue') {
    // Store the value in Chrome storage
    chrome.storage.local.set({ storedValue: message.value }, () => {
      // Resolve the Promise to send the response
      sendResponse({ success: true });
    });

    if (message.status) {
      statusFlag = true; // Set the flag to true
    }

    return true; // Indicates that the response will be sent asynchronously
  }
});

// Listen for tab activation event
chrome.tabs.onActivated.addListener(({ tabId }) => {
  lastActiveTabId = tabId;
});

// Perform the desired condition when the flag is set
chrome.tabs.onCreated.addListener((tab) => {
  if (statusFlag && lastActiveTabId !== -1) {
    chrome.tabs.update(lastActiveTabId, { active: true });
  }
});








// if (auto_print_voucher) {   
//     let lastActiveTabId = -1;

//     chrome.tabs.onActivated.addListener(({ tabId }) => {
//         lastActiveTabId = tabId;
//     });

//     chrome.tabs.onCreated.addListener((tab) => {
//         if (lastActiveTabId !== -1) {
//             chrome.tabs.update(lastActiveTabId, { active: true });
//         }
//     });
// }




chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    if (tabs.length > 0 && activeInfo.tabId === tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'focusElement', elementId: 'P3310_RFID' });
    }
  });
});

chrome.commands.onCommand.addListener(function(command) {
  if (command === 'go-to-first-tab') {
    chrome.tabs.query({ currentWindow: true }, function(tabs) {
      if (tabs.length > 0) {
        chrome.tabs.update(tabs[0].id, { active: true });
        chrome.tabs.sendMessage(tabs[0].id, { action: 'focusElement', elementId: 'P3310_RFID' });
      }
    });
  }
});



