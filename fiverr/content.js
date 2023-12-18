// content.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'pasteValue') {
      // Paste the value into the element with id "textInput" on the webpage
      var textInputElement = document.getElementById('textInput');
      if (textInputElement) {
        textInputElement.value = request.value;
        console.log('Value pasted into textInput:', request.value);
      } else {
        console.error('Element with id "textInput" not found on the webpage');
      }
    } else if (request.action === 'pressEnter') {
      // Press enter after pasting the value
      var textInputElement = document.getElementById('textInput');
      if (textInputElement) {
        textInputElement.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
        console.log('Enter pressed');
      }
    }
  });
  