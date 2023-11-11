ID_FOUND = false//
ID_CONTAINER = []; // Function to send a message to the background script
INSURANCE_ROW_CONTAINER = {};
INSURANCE_SHEET_NAME_ID_TRANSLATION = {
    'Jubilee Insurance - 104755': 876492685,
    'Jubilee Insurance - 104962': 2007919091,
    'EFU Life - FT0000606': 698956289,
    'EFU Life Paycon - FT0000668': 1009552247,
    'Deductions': 613767189,
  };
const SPREADSHEETID = '1pOJ_8cSDvF6wVeIQqBND_8i3RcRwTBBEPVkqZhyGtpw';


function sendMessageToBackground(action, callback) {
    chrome.runtime.sendMessage({ action: action }, callback);
}

function rowFontColor(insurance_name, rowToUpdate, columnToUpdate, token){
    
    const sheetName = INSURANCE_SHEET_NAME_ID_TRANSLATION[insurance_name];
    const fontColor = {
        red: 1.0,
        green: 0.0,
        blue: 0.0        
    };

    for (let i = 1; i < columnToUpdate + 1; i++) {
        
        const requests = [
            {
            "updateCells": {
                "range": {
                "sheetId": sheetName,
                "startRowIndex": rowToUpdate - 1,
                "endRowIndex": rowToUpdate, // Updated to include the row below for better compatibility
                "startColumnIndex": i - 1,
                "endColumnIndex": i // Updated to include the column next to the specified one
                },
                "rows": [
                {
                    "values": [
                    {
                        "userEnteredFormat": {
                        "textFormat": {
                            "foregroundColor": fontColor
                        }
                        }
                    }
                    ]
                }
                ],
                "fields": "userEnteredFormat.textFormat.foregroundColor"
            }
            }
        ];

        const batchUpdateRequest = {
            requests: requests
        };

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEETID}:batchUpdate`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(batchUpdateRequest),
        })
            .then(response => response.json())       
            .catch(error => {
                console.error('Error updating font color in Google Sheets:', error);
            });
        }
    }


function make_entry_in_google_sheets() {
    sendMessageToBackground("authenticate", function (response) {
        if (response.error) {
          console.error(response.error);
          return;
        }
        const token = response.token;
        const formattedDate = new Date().toISOString().split('T')[0];
        const updateData = {
            values: [
                [formattedDate]
            ]
        };  
        const dictionaryLength = Object.keys(INSURANCE_ROW_CONTAINER).length;
        const isDictionaryNotEmpty = dictionaryLength !== 0;
        if (isDictionaryNotEmpty) {
            for (let insurance_name in INSURANCE_ROW_CONTAINER) {
                if (INSURANCE_ROW_CONTAINER.hasOwnProperty(insurance_name)) {
                    for (let rowToUpdate of INSURANCE_ROW_CONTAINER[insurance_name]) {
                        if (insurance_name == 'Jubilee Insurance - 104755') {
                            columnToUpdate = 18; // Index for column R
                        }
                        else if (insurance_name == 'Jubilee Insurance - 104962') {
                            columnToUpdate = 12; // Index for column L
                        }
                        else if (insurance_name == 'EFU Life - FT0000606') {
                            columnToUpdate = 16; // Index for column P
                        }
                        else if (insurance_name == 'EFU Life Paycon - FT0000668') {
                            columnToUpdate = 15; // Index for column O
                        }
                        else if (insurance_name == 'Deductions') {
                            columnToUpdate = 3; // Index for column B
                        }
                        
                        if (insurance_name != "Deductions") {
                            const fetchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEETID}/values/${insurance_name}!${String.fromCharCode(64 + columnToUpdate)}${rowToUpdate}:${String.fromCharCode(64 + columnToUpdate)}${rowToUpdate}?valueInputOption=RAW`;

                            fetch(fetchUrl, {
                                method: 'PUT',
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(updateData),
                            })
                            .then(response => response.json())                        
                            .catch(error => {
                                console.error('Error updating date in Google Sheets:', error);
                            });
                        }
                        rowFontColor(insurance_name, rowToUpdate, columnToUpdate, token)
                    }   
                }
            }
        }  
        
    });
}


function get_employee_insurance_data(sheetName, token) {    
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEETID}/values/${sheetName}?valueRenderOption=FORMATTED_VALUE`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
        })
        .then(response => response.json())
        .then(data => {
            if (data.values) {
                if (sheetName == 'Jubilee Insurance - 104755') {
                    indexesToDisplay = [1, 3, 12];
                    check_deletion_row = 17
                }
                else if (sheetName == 'Jubilee Insurance - 104962') {
                    indexesToDisplay = [1, 3, 9];
                    check_deletion_row = 11
                }
                else if (sheetName == 'EFU Life - FT0000606') {
                    indexesToDisplay = [1, 2, 11];
                    check_deletion_row = 15
                }
                else if(sheetName == 'EFU Life Paycon - FT0000668') {
                    indexesToDisplay = [1, 2, 10];
                    check_deletion_row = 14
                }
                const employee_id_values = data.values.map(row => row[1]);                    
                for (let i = 0; i < employee_id_values.length; i++) {
                    if (employee_id_values[i] === employee_id) {
                        if (sheetName != "Deductions") {
                            const matchedRow = data.values[i];
                            if (matchedRow[check_deletion_row]) {
                                document.getElementById('deletionLabelSection').classList.add('hidden');
                                document.getElementById('deletionEmployeeNotFound').classList.remove('hidden');
                                const employeeNotFoundLabel = document.getElementById('EmployeeNotFound');
                                employeeNotFoundLabel.textContent = 'Insurance terminated at ' + matchedRow[check_deletion_row];
                                break;
                            }
                            else if (!matchedRow[check_deletion_row]) { 
                                ID_FOUND = true
                                ID_CONTAINER.push(sheetName)
                                make_entry_to_google_sheets = true
                                document.getElementById('deletionLabelSection').classList.add('hidden');
                                document.getElementById('deletionEmployeeNotFound').classList.add('hidden');

                                document.getElementById('deletionTableSection').classList.remove('hidden');
                                document.getElementById('deletionTableSection').classList.remove('hidden');

                                const table = document.querySelector('#deletionTableSection table');
                                const columns = table.querySelectorAll('th');
                                const newRow = table.insertRow(table.rows.length);
                                const cell = newRow.insertCell();
                                if (sheetName == 'Jubilee Insurance - 104755' || sheetName == 'Jubilee Insurance - 104962') {
                                    cell.textContent = "Jubilee";
                                }
                                else if (sheetName == 'EFU Life - FT0000606') {
                                    cell.textContent = "EFU";
                                }
                                else if(sheetName == 'EFU Life Paycon - FT0000668') {
                                    cell.textContent = "Paycon";
                                }
                                for (let index of indexesToDisplay) {
                                    const cell = newRow.insertCell();
                                    cell.textContent = matchedRow[index];
                                }
                                document.getElementById('data_table').style.width = '600px';
                                let key = sheetName;
                                let value = i + 1;

                                if (INSURANCE_ROW_CONTAINER.hasOwnProperty(key)) {
                                    INSURANCE_ROW_CONTAINER[key].push(value);
                                } else {
                                    INSURANCE_ROW_CONTAINER[key] = [value];
                                } 
                            }
                        }
                        else if (sheetName == "Deductions") {
                            let key = sheetName;
                            let value = i + 1;

                            if (INSURANCE_ROW_CONTAINER.hasOwnProperty(key)) {
                                INSURANCE_ROW_CONTAINER[key].push(value);
                            } else {
                                INSURANCE_ROW_CONTAINER[key] = [value];
                            }
                        }
                        else {
                            if (!ID_FOUND) {
                                document.getElementById('deletionLabelSection').classList.add('hidden');
                                document.getElementById('deletionEmployeeNotFound').classList.remove('hidden');
                            }
                        }            
                    }
                }
            } 
        
            })
            .catch(error => {
                console.error('Error fetching data from Google Sheet:', error);
        });
    
}

function delete_employee() {
    employee_id = document.getElementById('search_employee').value;    
    
    sendMessageToBackground("authenticate", function (response) {
        if (response.error) {
          console.error(response.error);
          return;
        }
        const all_insurance = ["Jubilee Insurance - 104755", "Jubilee Insurance - 104962", "EFU Life - FT0000606", "EFU Life Paycon - FT0000668", "Deductions"];
        const token = response.token;  
        console.log(token)      
        for (let sheetName of all_insurance) {
            get_employee_insurance_data(sheetName, token);   
        }   
    });

}

try {
    document.getElementById('searchButton').onclick = delete_employee;
    document.getElementById('deleteButton').onclick = make_entry_in_google_sheets;
} catch {

}




