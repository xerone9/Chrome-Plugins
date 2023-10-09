chrome.action.onClicked.addListener(tab => {
  // Change icon
  chrome.action.setIcon({
    path: "logo.png"
  });

  // Open popup page
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: openPopup
  });
});

function openPopup() {
  window.open("popup.html", "Google Sheets Reader", "width=400,height=300");
}