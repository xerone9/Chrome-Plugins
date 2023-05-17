// let auto_print_voucher = true;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {    
    if (message.type === 'storeValue') {
        // Store the value in Chrome storage        
        chrome.storage.local.set({ storedValue: message.value }, () => {
          // Resolve the Promise to send the response
          sendResponse({ success: true });
        });
        if (message.status) {
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
        return true; // Indicates that the response will be sent asynchronously
    }    
    
  const myBooleanValue = message.myBoolean;
  auto_print_voucher = myBooleanValue;  
  
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
