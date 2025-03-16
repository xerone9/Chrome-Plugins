// Get Chrome Version as it only works in most updated chrome browser
var inputString = navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)[1];
var parts = inputString.split('.');
var firstPortion = parts[0];
var intValue = parseInt(firstPortion, 10);

if (intValue > 110) {

  const today = new Date().toISOString().split('T')[0];

  chrome.storage.local.get('IU_ERP_REPORT_HASH', (result) => {
    let storedObject = result['IU_ERP_REPORT_HASH'];    

    if (!storedObject) {
      const data = {'05-03-1992': 'No Hash'};
      storedObject = data;
      chrome.storage.local.set({ 'IU_ERP_REPORT_HASH': storedObject }, () => {
        console.log("Default stored object created:", data);
      });
    } else {
      const dates_are_equal = storedObject.hasOwnProperty(today);
      if (!dates_are_equal) {
        chrome.tabs.onUpdated.addListener((changeInfo, tab) => {
          if (String(tab.url).includes("&vtvidvu=")){
            const get_hash = tab.url.split("&vtvidvu=")[1].split("&v_student_id=")[0];                                      
            const storedDate = Object.keys(storedObject);
            const storedHash = storedObject[storedDate];
            if (get_hash !== storedHash) { 
              const data = {
                [today]: get_hash
              };
              chrome.storage.local.set({ 'IU_ERP_REPORT_HASH': data });
            }
          }
          
        });
      }
    }
  });
}
else {
  console.log(intValue)
}

