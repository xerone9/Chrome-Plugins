// Function to send a message to the background script
function sendMessageToBackground(action, callback) {
  chrome.runtime.sendMessage({ action: action }, callback);
}

window.onload = function () {
  sendMessageToBackground("authenticate", function (response) {
    if (response.error) {
      console.error(response.error);
      return;
    }

    const token = response.token;

    // // Replace with your spreadsheet ID, sheet name, and range
    // const spreadsheetId = '1PcY8tJOiRRgVtYsxzn-OgRRn2VTj88m2Kv8sdnEDhwA';
    // const sheetName = 'Sheet1'; // Replace with your sheet name
    // const range = 'A1:D4'; // Replace with the desired range
    
    // // Use the token to make authorized requests to Google Sheets API
    // fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}`, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    //     // Process and display the data as needed
    // })
    // .catch(error => {
    //     console.error('Error fetching Google Sheet data:', error);
    // });

    // const extractedData = { "Wind": '20', "Humidity": '82', "Visibility": '24', "Sunrise": '6:38' };

    // Replace with your spreadsheet ID and sheet name
    const spreadsheetId = '1PcY8tJOiRRgVtYsxzn-OgRRn2VTj88m2Kv8sdnEDhwA';
    const sheetName = 'Sheet1'; // Replace with your sheet name

    // Function to extract data from the div element and convert it to the desired format
  function extractDataFromDiv(divElement) {
    const label = divElement.querySelector('.label').textContent.trim();
    const value = divElement.querySelector('.value').textContent.trim();

    return {
        [label]: value,
    };
}

    // Initialize an empty object to store the data
    const allData = {};

    // Loop through all .detailed-metrics elements and extract data
    document.querySelectorAll('.detailed-metrics').forEach(element => {
      const jsonData = extractDataFromDiv(element);
      Object.assign(allData, jsonData);
    });

    // Log the final JSON object with all the data
    console.log(allData);
        
    // Define the new values as a dictionary
    const newValue = allData;

    // Use the token to make authorized requests to Google Sheets API
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?valueRenderOption=FORMATTED_VALUE`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    .then(response => response.json())
    .then(data => {
        // Find the last available row by checking the length of the data
        const lastRow = data.values.length + 1; // New row

        const numColumns = Object.keys(newValue).length;

        // Create an array of values from the JSON object
        const valuesArray = Object.values(newValue);

        if (valuesArray.length === numColumns) {

          // Use the token to make authorized requests to Google Sheets API
          fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A${lastRow}:${lastRow}?valueInputOption=RAW`, {
              method: 'PUT',
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  values: [Object.values(newValue)] // Convert the dictionary values to an array
              })
          })
          .then(response => response.json())
          .then(data => {
              console.log(data);
              console.log(`Added data to row ${lastRow}: ${JSON.stringify(newValue)}`);
          })
          .catch(error => {
              console.error('Error adding data to Google Sheet:', error);
          });
        }
        else {
          console.error('Error: Number of values does not match the number of columns');
        }
    })
    .catch(error => {
        console.error('Error fetching data from Google Sheet:', error);
    });
    
  });
};
