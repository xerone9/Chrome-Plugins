TODAY_DATE = new Date().toISOString().split('T')[0];
EXPIRY_DATE = new Date('2024-06-30');

ID_FOUND = false
ADDITION_IN_G_SHEETS = false
ID_CONTAINER = [];
INSURANCE_ROW_CONTAINER = {};
INSURANCE_DATA_CONTAINER = {};

JUBILE_104755_CHARGES = {
    'A': 90580,
    'B': 22004,
    'C': 12980,
    'D': 6238
}
EFU_FT0000606 = {
    'A': 5040,
    'B': 3378,
    'C': 2520,
    'D': 1700
}
PAYCON_CHARGES = 3571


const ALL_INSURANCE = [
    "Jubilee Insurance - 104755",
    // "Jubilee Insurance - 104962", No Fix Charges Defined....
    "EFU Life - FT0000606",
    "EFU Life Paycon - FT0000668",
    "Deductions"
];


INSURANCE_SHEET_NAME_ID_TRANSLATION = {
    'Jubilee Insurance - 104755': 876492685,
    'Jubilee Insurance - 104962': 2007919091,
    'EFU Life - FT0000606': 698956289,
    'EFU Life Paycon - FT0000668': 1009552247,
    'Deductions': 613767189,
};
INSURANCE_DELETE_COLUMN_TO_UPDATE = {
    'Jubilee Insurance - 104755': 18,
    'Jubilee Insurance - 104962': 12,
    'EFU Life - FT0000606': 16,
    'EFU Life Paycon - FT0000668': 15,
    'Deductions': 3,
};
INSURANCE_COLUMN_TO_SHOW = {
    'Jubilee Insurance - 104755': [1, 3, 12],
    'Jubilee Insurance - 104962': [1, 3, 9],
    'EFU Life - FT0000606': [1, 2, 11],
    'EFU Life Paycon - FT0000668': [1, 2, 10]
};
INSURANCE_NAME_TAGS = {
    'Jubilee Insurance - 104755': 'Jubilee',
    'Jubilee Insurance - 104962': 'Jubilee',
    'EFU Life - FT0000606': 'EFU',
    'EFU Life Paycon - FT0000668': 'Paycon'
};
INSURANCE_DATA_COLUMNS_FOR_EMAIL = {
    'Jubilee Insurance - 104755': {
        'Emp_ID': 1,
        'Insured_ID': 2,
        'Employee_Name': 3,
        'Relation': 10,
        'NIC': 12,
        'Plan': 15
    },
    'Jubilee Insurance - 104962': {
        'Emp_ID': 1,
        'Insured_ID': 2,
        'Employee_Name': 3,
        'Relation': 14,
        'NIC': 9,
        'Plan': 10
    },
    'EFU Life - FT0000606': {
        'Emp_ID': 1,
        'Employee_Name': 2,
        'Father_Name': 3,
        'DOB': 4,
        'NIC': 11,
        'Plan': 14
    },
    'EFU Life Paycon - FT0000668': {
        'Emp_ID': 1,
        'Employee_Name': 2,
        'Father_Name': 3,
        'DOB': 4,
        'NIC': 10,
        'Plan': 13
    }
};

INSURANCE_EMAIL_CREDENTIALS = {
    'Jubilee Insurance - 104755': ['Noman', 'Noman.Siddiq@jubileelife.com'],
    'Jubilee Insurance - 104962': ['Noman', 'Noman.Siddiq@jubileelife.com'],
    'EFU Life - FT0000606': ['Mohsin', 'mohsinumer@efulife.com'],
    'EFU Life Paycon - FT0000668': ['Mohsin', 'mohsinumer@efulife.com'],
    'Deductions': ['Kamran Sir', 'accountant@indus.edu.pk']
};


PERSON_ADDITION_FORM_COLUMN_IDS = [
    'emp_id',
    'emp_plan',
    'emp_name',
    'father_name',
    'cnic',
    'dob',
    'relationship',
    'which_insurance'
]
GOOGLE_SHEET_NEW_EMPLOYEE_ADDITION_COLUMNS = {
    'Jubilee Insurance - 104755': [1, 2, 16, 4, 5, 13, 6, 11, 19],
    'Jubilee Insurance - 104962': [1, 2, 11, 4, 5, 10, 6, 15, 13],
    'EFU Life - FT0000606': [1, 2, 15, 3, 4, 12, 5, 10, 17],
    'EFU Life Paycon - FT0000668': [1, 2, 14, 3, 4, 11, 5, 9, 16],
    'Deductions': [1, 2, 3]
}
CHARGES_ADD_COLUMNS = {
  'Standard' : [1, 2, 3, 4, 5, 10, 11, 16, 17],
  'All' : [1, 2, 3, 4, 5, 10, 11, 13, 14, 16, 17],
  'Old Age' : [1, 2, 3, 7, 8, 16, 17],
  'Paycon' : [1, 2, 3, 13, 14, 16, 17],

}

MAKE_ENTRY_IN_WHICH_SHEET = {
    'Standard': ['Jubilee Insurance - 104755', 'EFU Life - FT0000606', 'Deductions'],
    'All': ['Jubilee Insurance - 104755', 'EFU Life - FT0000606', 'EFU Life Paycon - FT0000668', 'Deductions'],
    'Paycon': ['EFU Life Paycon - FT0000668', 'Deductions'],
    'Old_Age': ['Jubilee Insurance - 104962', 'Deductions']
}

const SPREADSHEETID = '1pOJ_8cSDvF6wVeIQqBND_8i3RcRwTBBEPVkqZhyGtpw';

ENTER_ID_LABEL = document.getElementById('enter_employee_id');
DELETION_EMAIL_LABEL = document.getElementById('deletion_sending_email');
DELETION_GOOGLE_SHEET_LABEL = document.getElementById('deletion_excel_entry');

ADDITION_EMAIL_LABEL = document.getElementById('addition_sending_email');
ADDITION_GOOGLE_SHEET_LABEL = document.getElementById('addition_excel_entry');






function sendMessageToBackground(action, callback) {
    chrome.runtime.sendMessage({ action: action }, callback);
}


function create_charged_amount_array (data) {
    var diffMonths = (EXPIRY_DATE.getFullYear() - new Date().getFullYear()) * 12 + (EXPIRY_DATE.getMonth() - new Date().getMonth());
    type = data[data.length - 1]
    values = null
    if (type == 'All') {
        values = [JUBILE_104755_CHARGES[data[2]] / 2, JUBILE_104755_CHARGES[data[2]] / 2, EFU_FT0000606[data[2]] / 2, EFU_FT0000606[data[2]] / 2, PAYCON_CHARGES / 2, PAYCON_CHARGES / 2 ]
        var sum = values.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue;
        }, 0);
        values.push(sum / 2);
        values.push(sum / 2);
        values = [data[0], data[1], data[3], ...values]        
    }
    else if (type == 'Standard') {
        values = [JUBILE_104755_CHARGES[data[2]] / 2, JUBILE_104755_CHARGES[data[2]] / 2, EFU_FT0000606[data[2]] / 2, EFU_FT0000606[data[2]] / 2]
        var sum = values.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue;
        }, 0);
        values.push(sum / 2);
        values.push(sum / 2);
        values = [data[0], data[1], data[3], ...values]        
    }
    if (type == 'Paycon') {
        values = [PAYCON_CHARGES / 2, PAYCON_CHARGES / 2 ]
        var sum = values.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue;
        }, 0);
        values.push(sum / 2);
        values.push(sum / 2);
        values = [data[0], data[1], data[3], ...values]        
    }

    for (var i = 0; i < values.length; i++) {
        if (typeof values[i] === 'number') {  // Check if the element is a number
            values[i] = Math.floor((values[i] / 12) * diffMonths);  // Divide the value by 5
        }
    }

    return values
}

function make_new_person_entry_in_google_sheets_and_send_emails(sheetName, last_row, data, last_serial) {
    sendMessageToBackground("authenticate", function (response) {
        if (response.error) {
            console.error(response.error);
            return;
        }
        else {
            if (MAKE_ENTRY_IN_WHICH_SHEET[data[data.length - 1]].includes(sheetName)) {
                const fetchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEETID}:batchUpdate`;

                const batchUpdateRequest = {
                    requests: [
                        {
                            insertDimension: {
                                range: {
                                    sheetId: INSURANCE_SHEET_NAME_ID_TRANSLATION[sheetName], // Replace with your sheet ID
                                    dimension: 'ROWS',
                                    startIndex: last_row,
                                    endIndex: last_row + 1,
                                },
                            },
                        },
                    ],
                };

                fetch(fetchUrl, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${response.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(batchUpdateRequest),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Row inserted successfully:', data);
                    })
                    .catch(error => {
                        console.error('Error inserting row:', error);
                    });

                
                update_data_with_serail_column_value = [last_serial, ...data];
                if (sheetName != 'Deductions') {
                    if (sheetName == 'EFU Life Paycon - FT0000668') {
                        update_data_with_serail_column_value[2] = 'D' 
                    }
                    columns = GOOGLE_SHEET_NEW_EMPLOYEE_ADDITION_COLUMNS[sheetName];
                    values = update_data_with_serail_column_value.slice(0, -1);
                }
                else {
                    type = update_data_with_serail_column_value[update_data_with_serail_column_value.length - 1]  
                    columns = CHARGES_ADD_COLUMNS[type];
                    values = create_charged_amount_array(update_data_with_serail_column_value)                    
                }
                
                
                const row = new Array(Math.max(...columns)).fill('');

                columns.forEach((column, index) => {
                    row[column - 1] = values[index];
                });

                // Prepare the update data
                const updateData = {
                    values: [row],
                };

                // Prepare the fetch URL
                const range = `${sheetName}!A${last_row}:Z${last_row}`;
                const fetchUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEETID}/values/${range}?valueInputOption=RAW`;

                // Perform the update
                fetch(fetchUrl2, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${response.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateData),
                })
                    .then(response => response.json())
                    .then(data => {
                         console.log('Row updated successfully:', data);
                    })
                    .catch(error => {
                        console.error('Error updating row:', error);
                    });
                    rowFontColor(sheetName, last_row, GOOGLE_SHEET_NEW_EMPLOYEE_ADDITION_COLUMNS[sheetName][GOOGLE_SHEET_NEW_EMPLOYEE_ADDITION_COLUMNS[sheetName].length - 1], response.token)
            }            
            send_email()            
        }
    }); 

}

function new_person_registration_in_insurance() {
    ADDITION_IN_G_SHEETS = true
    var valuesArray = [];

    for (const elementId of PERSON_ADDITION_FORM_COLUMN_IDS) {
        const element = document.getElementById(elementId);
        
        if (element && element.value.trim() === '') {
            ADDITION_GOOGLE_SHEET_LABEL.textContent = `Value Missing: ${elementId}`;
            ADDITION_IN_G_SHEETS = false
            console.log('bye')
            break
        }
    }
    ADDITION_GOOGLE_SHEET_LABEL.textContent = `Please Wait...`;
    if (ADDITION_IN_G_SHEETS) {
        for (var i = 0; i < PERSON_ADDITION_FORM_COLUMN_IDS.length; i++) {
            var element = document.getElementById(PERSON_ADDITION_FORM_COLUMN_IDS[i]);
            if (element) {
                valuesArray.push(element.value);
            } else {
                console.error("Element with ID " + PERSON_ADDITION_FORM_COLUMN_IDS[i] + " not found");
            }
        }
        valuesArray.splice(valuesArray.length - 1, 0, TODAY_DATE)    

        get_last_row_and_new_person_data = valuesArray;
        addition_data = {
            'Emp_ID': get_last_row_and_new_person_data[0],
            'Employee_Name': get_last_row_and_new_person_data[2],
            'Father_Name': get_last_row_and_new_person_data[3],
            'DOB': get_last_row_and_new_person_data[5],
            'NIC': get_last_row_and_new_person_data[4],
            'Plan': get_last_row_and_new_person_data[1]
        }
        if (!INSURANCE_DATA_CONTAINER.hasOwnProperty('Deductions')) {
            INSURANCE_DATA_CONTAINER['Deductions'] = {};
        }
        INSURANCE_DATA_CONTAINER['Deductions'] = addition_data

        sendMessageToBackground("authenticate", function (response) {
            if (response.error) {
                console.error(response.error);
                return;
            }
            const token = response.token;
            for (let sheetName of ALL_INSURANCE) {
                get_employee_insurance_data(sheetName, token, get_last_row_and_new_person_data);            
            }
            
        });
    }
}


function generateTableHtml(data) {
    let currentColor = '#E8E8E8';
    const headers = Object.keys(data);
    if (ADDITION_IN_G_SHEETS) {
        title_bar_color = 'blue'
    }
    else {
        title_bar_color = 'red'
    }
    const max_columns = headers.length
    const headerHtml = headers.map(header => `<th style="background-color: ${title_bar_color}; color: white; font-weight: bold; padding: 4px; border: 1px solid black; height: 10px;">${header}</th>`).join('');

    const rowData = [];
    const numRows = data.Emp_ID.length;
    for (let i = 0; i < numRows; i++) {
        for (const key in data) {
            rowData.push(data[key][i]);
        }
    }

    const rowsHtml = rowData.reduce((accumulator, value, index) => {
        if (index % max_columns === 0) {
            accumulator.push('</tr><tr>');
            currentColor = currentColor === '#E8E8E8' ? '#FFFFFF' : '#E8E8E8';
        }
        accumulator.push(`<td style="background-color: ${currentColor}; border: 1px solid black; padding: 4px;">${value}</td>`);
        return accumulator;
    }, ['<tr>']).join('') + '</tr>';

    return `
    <table style="border-collapse: collapse; width: 100%;">
        <thead><tr>${headerHtml}</tr></thead>
        <tbody>${rowsHtml}</tbody>
    </table>
    `;

}

async function send_email() {
    chrome.runtime.sendMessage({ action: 'authenticate' }, async function (response) {
        if (response.token) {
            if (ADDITION_IN_G_SHEETS) { 
                ADDITION_GOOGLE_SHEET_LABEL.textContent = "Entry Done In Google Sheets";
                ADDITION_GOOGLE_SHEET_LABEL.style.color = "green";
                ADDITION_EMAIL_LABEL.textContent = "Please Wait...";
                ADDITION_EMAIL_LABEL.style.colort = "black";
                for ([sheetName, data] of Object.entries(INSURANCE_DATA_CONTAINER)) {
                    key = sheetName
                    val = data                                        
                }
                if (key == 'Deductions') {
                    type = update_data_with_serail_column_value[update_data_with_serail_column_value.length - 1]  
                    columns = CHARGES_ADD_COLUMNS[type];
                    values = create_charged_amount_array(update_data_with_serail_column_value)                    

                    INSURANCE_DATA_CONTAINER['Deductions']['Amount'] = INSURANCE_DATA_CONTAINER['Deductions']['DOB'];
                    delete INSURANCE_DATA_CONTAINER['Deductions']['DOB'];
                    INSURANCE_DATA_CONTAINER['Deductions']['Amount'] = [values[values.length - 1]];

                    for ([sheetName, data] of Object.entries(INSURANCE_DATA_CONTAINER)) {
                        key = sheetName
                        val = data                                        
                    }   
                }             
                const tableHtml = generateTableHtml(val);
                concerned_name = INSURANCE_EMAIL_CREDENTIALS[key][0]
                if (key != 'Deductions') {
                    today_date2 = new Date();
                    options = { day: 'numeric', month: 'short', year: 'numeric' };
                    today_date_formated = today_date2.toLocaleDateString('en-GB', options).replace(' ', '-').replace(' ', '-');
                    policy_number = key.split(' - ')[1];
                    subject = 'Kindly Add Employee Under Policy No. ' + policy_number;
                    body = `<p>Dear ${concerned_name},</p><p>It is requested that kindly Add below mentioned employee with effective date ${today_date_formated}</p>${tableHtml}<p>Regards,</p><p>Muhammad Arif<br>Accountant<br>Indus University<br>UAN:111-400-300 (EXT: 114, 184)</p>`;
                }
                else {
                    amount = val.Amount[0] * 2
                    subject = 'Kindly Add Insurance Charges Of Employee ID (' +  val.Emp_ID[0] + ')';
                    body = `<p>Dear ${concerned_name},</p><p>It is requested that kindly add insurance charges to below mentioned employee. Total Insuracne Charges are ${amount.toLocaleString()} so add half amount accordingly</p>${tableHtml}<p>Regards,</p><p>Muhammad Arif<br>Accountant<br>Indus University<br>UAN:111-400-300 (EXT: 114, 184)</p>`;
                }
                
                toEmail = INSURANCE_EMAIL_CREDENTIALS[key][1];
                let ccEmail;
                if (toEmail === 'Noman.Siddiq@jubileelife.com') {
                    ccEmail = 'accountofficer-2@indus.edu.pk, dir.finance-admin@indus.edu.pk, Grouphealth.Admin@jubileehealth.com';
                } else {
                    ccEmail = 'accountofficer-2@indus.edu.pk, dir.finance-admin@indus.edu.pk';
                }
                
                await sendEmail(response.token, toEmail, ccEmail, subject, body);                             
            }
            else {
                DELETION_GOOGLE_SHEET_LABEL.textContent = "Entry Done In Google Sheets";
                DELETION_GOOGLE_SHEET_LABEL.style.color = "green";
                DELETION_EMAIL_LABEL.textContent = "Please Wait...";
                DELETION_EMAIL_LABEL.style.colort = "black";
                for ([key, val] of Object.entries(INSURANCE_DATA_CONTAINER)) {
                    const tableHtml = generateTableHtml(val);

                    policy_number = key.split(' - ')[1];
                    concerned_name = INSURANCE_EMAIL_CREDENTIALS[key][0]
                    // const toEmail = INSURANCE_EMAIL_CREDENTIALS[key][1];
                    toEmail = INSURANCE_EMAIL_CREDENTIALS[key][1];
                    let ccEmail;
                    if (toEmail === 'Noman.Siddiq@jubileelife.com') {
                        ccEmail = 'accountofficer-2@indus.edu.pk, dir.finance-admin@indus.edu.pk, Grouphealth.Admin@jubileehealth.com';
                    } else {
                        ccEmail = 'accountofficer-2@indus.edu.pk, dir.finance-admin@indus.edu.pk';
                    }
                    subject = 'Kindly Remove Employee Under Policy No. ' + policy_number;
                    const body = `<p>Dear ${concerned_name},</p><p>It is requested that kindly delete below mentioned employee</p>${tableHtml}<p>Regards,</p><p>Muhammad Arif<br>Accountant<br>Indus University<br>UAN:111-400-300 (EXT: 114, 184)</p>`;

                    await sendEmail(response.token, toEmail, ccEmail, subject, body);
                }
            }
        }
        else {
            console.error('Authentication failed:', response.error);
            if (DELETION_EMAIL_LABEL) {
                DELETION_EMAIL_LABEL.textContent = "Unauthorized Email Account";
                DELETION_EMAIL_LABEL.style.color = "red"
            }

        }




        async function sendEmail(token, to, cc, subject, body) {
            const delay = ms => new Promise(res => setTimeout(res, ms));
            const message = [
                'Content-Type: text/html; charset="UTF-8"',
                'MIME-Version: 1.0',
                `To: ${to}`,
                cc ? `Cc: ${cc}` : '',
                `Subject: ${subject}`,
                '',
                body
            ].join('\r\n');

            // Base64 encode the message
            const encodedMessage = btoa(unescape(encodeURIComponent(message)));

            // Send email using the Gmail API
            fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    raw: encodedMessage
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (DELETION_EMAIL_LABEL) {
                        DELETION_EMAIL_LABEL.textContent = "Email Sent Successfully";
                        DELETION_EMAIL_LABEL.style.color = "blue"
                    }
                    if (ADDITION_EMAIL_LABEL) {
                        ADDITION_EMAIL_LABEL.textContent = "Email Sent Successfully";
                        ADDITION_EMAIL_LABEL.style.color = "blue"
                    }
                })
                .catch(error => {
                    console.error('Error sending email:', error);
                    if (DELETION_EMAIL_LABEL) {
                        DELETION_EMAIL_LABEL.textContent = "Error sending email";
                        DELETION_EMAIL_LABEL.style.color = "red"
                    }
                    if (ADDITION_EMAIL_LABEL) {
                        ADDITION_EMAIL_LABEL.textContent = "Error sending email";                        
                        ADDITION_EMAIL_LABEL.style.color = "red"
                    }
                });
                await delay(1000); 
        }
    });
}

function rowFontColor(insurance_name, rowToUpdate, columnToUpdate, token) {
    const sheetName = INSURANCE_SHEET_NAME_ID_TRANSLATION[insurance_name];
    const deleteFontColor = {
        red: 1.0,
        green: 0.0,
        blue: 0.0
    };
    const additionFontColor = {
        red: 0.0,
        green: 0.0,
        blue: 1.0
    };
    if (ADDITION_IN_G_SHEETS) {
        fontColor = additionFontColor
    }
    else {
        fontColor = deleteFontColor 
    }

    const requests = [
        {
            "repeatCell": {
                "range": {
                    "sheetId": sheetName,
                    "startRowIndex": rowToUpdate - 1,
                    "endRowIndex": rowToUpdate,
                    "startColumnIndex": 0,
                    "endColumnIndex": columnToUpdate
                },
                "cell": {
                    "userEnteredFormat": {
                        "textFormat": {
                            "foregroundColor": fontColor
                        }
                    },
                },
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
            if (DELETION_GOOGLE_SHEET_LABEL) {
                DELETION_GOOGLE_SHEET_LABEL.textContent = "Error updating font color in Google Sheets";
                DELETION_GOOGLE_SHEET_LABEL.style.color = "red"
            }
            if (ADDITION_GOOGLE_SHEET_LABEL) {
                ADDITION_GOOGLE_SHEET_LABEL.textContent = "Error updating font color in Google Sheets";
                ADDITION_GOOGLE_SHEET_LABEL.style.color = "red"
            }
            
        });

}


async function note_deletion_date_in_google_sheets_and_send_emails() {
    sendMessageToBackground("authenticate", async function (response) {
        const delay = ms => new Promise(res => setTimeout(res, ms));

        if (response.error) {
            console.error(response.error);
            return;
        }
        else {
            const token = response.token;
            const updateData = {
                values: [
                    [TODAY_DATE]
                ]
            };
            const dictionaryLength = Object.keys(INSURANCE_ROW_CONTAINER).length;
            const isDictionaryNotEmpty = dictionaryLength !== 0;
            if (isDictionaryNotEmpty) {
                for (let insurance_name in INSURANCE_ROW_CONTAINER) {
                    if (INSURANCE_ROW_CONTAINER.hasOwnProperty(insurance_name)) {
                        for (let rowToUpdate of INSURANCE_ROW_CONTAINER[insurance_name]) {
                            columnToUpdate = INSURANCE_DELETE_COLUMN_TO_UPDATE[insurance_name];
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
                                        if (DELETION_GOOGLE_SHEET_LABEL) {
                                            DELETION_GOOGLE_SHEET_LABEL.textContent = "Error updating date in Google Sheets";
                                            DELETION_GOOGLE_SHEET_LABEL.style.color = "red"
                                        }
                                    });
                            }
                            rowFontColor(insurance_name, rowToUpdate, columnToUpdate, token)
                        }
                    }
                }
                await delay(1000); 
            }
        }
    });
    send_email()

    
}


function get_employee_insurance_data(sheetName, token, get_last_row_and_new_person_data) {


    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEETID}/values/${sheetName}?valueRenderOption=FORMATTED_VALUE`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.values) {
                if (ADDITION_IN_G_SHEETS) {
                    last_row = null;
                    last_serial = null;
                    addition_in_these_sheets = get_last_row_and_new_person_data[get_last_row_and_new_person_data.length - 1]
                    if (MAKE_ENTRY_IN_WHICH_SHEET[addition_in_these_sheets].includes(sheetName)) {
                        if (sheetName == 'Jubilee Insurance - 104755' || sheetName == 'Jubilee Insurance - 104962' || sheetName == 'EFU Life - FT0000606') {
                            const employee_plan_values = data.values.map(row => row[GOOGLE_SHEET_NEW_EMPLOYEE_ADDITION_COLUMNS[sheetName][2] - 1]);
                            for (let i = 0; i < employee_plan_values.length; i++) {
                                if (employee_plan_values[i] == get_last_row_and_new_person_data[1]) {
                                    last_row = i + 2
                                    last_serial = parseInt(data.values[i][0], 10) + 1                              
                                }                            
                            }
                            addition_data = {
                                'Emp_ID': [get_last_row_and_new_person_data[0]],
                                'Employee_Name': [get_last_row_and_new_person_data[2]],
                                'Father_Name': [get_last_row_and_new_person_data[3]],
                                'DOB': [get_last_row_and_new_person_data[5]],
                                'NIC': [get_last_row_and_new_person_data[4]],
                                'Plan': [get_last_row_and_new_person_data[1]]
                            }
                            INSURANCE_DATA_CONTAINER = {}
                            INSURANCE_DATA_CONTAINER[sheetName] = addition_data
                            make_new_person_entry_in_google_sheets_and_send_emails(sheetName, last_row, get_last_row_and_new_person_data, last_serial)
                        }
                        else {
                            if (sheetName == 'Deductions') {
                                addition_data = {
                                    'Emp_ID': [get_last_row_and_new_person_data[0]],
                                    'Employee_Name': [get_last_row_and_new_person_data[2]],
                                    'Father_Name': [get_last_row_and_new_person_data[3]],                                    
                                    'NIC': [get_last_row_and_new_person_data[4]],
                                    'Plan': [get_last_row_and_new_person_data[1]],
                                    'DOB': [get_last_row_and_new_person_data[5]],
                                } 
                            }
                            else {
                                addition_data = {
                                    'Emp_ID': [get_last_row_and_new_person_data[0]],
                                    'Employee_Name': [get_last_row_and_new_person_data[2]],
                                    'Father_Name': [get_last_row_and_new_person_data[3]],
                                    'DOB': [get_last_row_and_new_person_data[5]],
                                    'NIC': [get_last_row_and_new_person_data[4]],
                                    'Plan': [get_last_row_and_new_person_data[1]]
                                } 
                            }  
                        
                            const employee_plan_values = data.values.map(row => row[1]);
                            for (let i = 0; i < employee_plan_values.length; i++) {
                                if (employee_plan_values[i] !== undefined) {
                                    last_row = i + 2
                                    last_serial = parseInt(data.values[i][0], 10) + 1   
                                }
                                else {
                                    break
                                }
                            }
                            
                            
                            INSURANCE_DATA_CONTAINER = {}
                            INSURANCE_DATA_CONTAINER[sheetName] = addition_data
                            make_new_person_entry_in_google_sheets_and_send_emails(sheetName, last_row, get_last_row_and_new_person_data, last_serial)
                        }
                    }

                } else {
                    indexesToDisplay = INSURANCE_COLUMN_TO_SHOW[sheetName];
                    check_deletion_row = INSURANCE_DELETE_COLUMN_TO_UPDATE[sheetName] - 1;
                    const employee_id_values = data.values.map(row => row[1]);
                    for (let i = 0; i < employee_id_values.length; i++) {
                        employee_full_data = data.values[i]
                        if (employee_id_values[i] === employee_id) {
                            if (sheetName != "Deductions") {
                                const matchedRow = data.values[i];
                                if (matchedRow[check_deletion_row]) {
                                    document.getElementById('deletionLabelSection').classList.add('hidden');
                                    document.getElementById('deletionEmployeeNotFound').classList.remove('hidden');
                                    const employeeNotFoundLabel = document.getElementById('EmployeeNotFound');
                                    employeeNotFoundLabel.classList.add('blinking-text');
                                    employeeNotFoundLabel.textContent = 'Insurance terminated at ' + matchedRow[check_deletion_row];
                                    document.getElementById("searchButton").style.display = "none";
                                    document.body.style.width = "300px"; 
                                    document.body.style.height = "230px"; 
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
                                    const newRow = table.insertRow(table.rows.length);
                                    const cell = newRow.insertCell();
                                    cell.textContent = INSURANCE_NAME_TAGS[sheetName];

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



                                    if (!INSURANCE_DATA_CONTAINER.hasOwnProperty(sheetName)) {
                                        INSURANCE_DATA_CONTAINER[sheetName] = {};
                                    }
                                    for (const key in INSURANCE_DATA_COLUMNS_FOR_EMAIL[sheetName]) {
                                        if (!INSURANCE_DATA_CONTAINER[sheetName].hasOwnProperty(key)) {
                                            INSURANCE_DATA_CONTAINER[sheetName][key] = [];
                                        }
                                    }

                                    for (const key in INSURANCE_DATA_COLUMNS_FOR_EMAIL[sheetName]) {
                                        const columnIndex = INSURANCE_DATA_COLUMNS_FOR_EMAIL[sheetName][key];
                                        const value = employee_full_data[columnIndex];

                                        if (!Array.isArray(INSURANCE_DATA_CONTAINER[sheetName][key])) {
                                            INSURANCE_DATA_CONTAINER[sheetName][key] = [];
                                        }

                                        INSURANCE_DATA_CONTAINER[sheetName][key].push(value);
                                        document.getElementById("searchButton").style.display = "none";
                                        document.getElementById("deleteButton").classList.remove('hidden');
                                        document.body.style.width = "700px"; 
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
                        else {
                            ENTER_ID_LABEL.textContent = employee_id + " Not Found"; 
                            if (INSURANCE_DATA_CONTAINER.length < 1) {
                                document.getElementById("searchButton").style.display = "block";
                            }                           
                            
                            ENTER_ID_LABEL.style.color = "red";
                        }
                    }
                }

            }
        })
        .catch(error => {
            ENTER_ID_LABEL.textContent = "Error fetching data from Google Sheet";
            ENTER_ID_LABEL.style.color = "red";
            console.error('Error fetching data from Google Sheet:', error);
        });
}

function delete_employee() {    
    document.body.style.width = "700px";    
    employee_id = document.getElementById('search_employee').value;
    if (employee_id !== '') {
        ENTER_ID_LABEL.textContent = "Please Wait...";
        ENTER_ID_LABEL.style.color = "black"
        sendMessageToBackground("authenticate", function (response) {
            if (response.error) {
                console.error(response.error);
                return;
            }
            const token = response.token;
            for (let sheetName of ALL_INSURANCE) {
                get_last_row_and_new_person_data = null;
                get_employee_insurance_data(sheetName, token, get_last_row_and_new_person_data);                
            }
        });
    }
    else {
        if (ENTER_ID_LABEL) {
            ENTER_ID_LABEL.textContent = "Enter Employe ID";
            ENTER_ID_LABEL.style.color = "red"
        }
    }
}



try {
    document.getElementById('searchButton').onclick = delete_employee;
    document.getElementById('deleteButton').onclick = note_deletion_date_in_google_sheets_and_send_emails;
    document.getElementById('add').onclick = new_person_registration_in_insurance;
} catch {

}




