// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === 'storeValue') {
//     chrome.storage.local.set({ storedValue: message.value }, () => {
     
//     });

//     return true; // Indicates that the response will be sent asynchronously
//   }
// });


chrome.commands.onCommand.addListener(function(command) {
  if (command === 'go-to-first-tab') {
    chrome.tabs.query({ currentWindow: true }, function(tabs) {
      if (tabs.length > 1) {
        const firstTab = tabs[1];
        chrome.tabs.update(firstTab.id, { active: true });        
      }
    });
  }
});

chrome.tabs.onCreated.addListener(() => {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    if (tabs.length > 1) {
      const firstTab = tabs[1];
      chrome.tabs.update(firstTab.id, { active: true });
           
    }
  });
});