document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById("fetchButton");
    fetchButton.addEventListener("click", async () => {
      try {
        const token = await chrome.identity.getAuthToken({ interactive: true });
        const values = await getValues(token);
        console.log(values);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  });
  
  async function getValues(token) {
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: "YOUR_SPREADSHEET_ID",
      range: "Sheet1!A1:B10" // Modify the range as needed
    });
  
    return response.result.values;
  }
  