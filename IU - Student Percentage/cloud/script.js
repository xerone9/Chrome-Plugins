const TICKETS_SCREEN = document.getElementById("R440138601731385923_fr_search");
const TICKET_OPENED_SCREEN = document.getElementById("R555757530040776432");
const SUBMIT_BUTTON = document.getElementById('B440422889565959082');
const ACTIVITY_LIST = document.getElementById('P9661_EVENT_PROCESSING_TYPE');
const APPROVAL_AGENTS = document.getElementById("P9661_APPROVAL_AGENT_ID")
const TICKET_CLOSED = ["Approved", "Rejected", "Comments", "Close With Success", "Close With Attention", "Closed With Success", "Closed With Attention"]
const today = new Date();
const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

function block_bakcground_styling(div, status) {
    div.style.borderRadius = '5px'
    if (status == "Urgent") {
      div.style.backgroundColor = 'lightpink';
    }
    
    if (status.includes("Approval Request send to ")) {
      div.style.backgroundColor = 'lightgray';
    }
  
    else if (status == "Student Feedback Required") {
      div.style.backgroundColor = 'lightblue';
    }
  
    else if (status == "Ready For Collection") {
      div.style.backgroundColor = 'lightgreen';
    }
  
    else if (status == "In Waiting") {
      div.style.backgroundColor = 'lightyellow';
    }
  
}
  
  
function header_styling(div, status) {
    let text_remarks = status
    if (status.includes("Approval Request send to ")) {
        text_remarks = status.split("Approval Request send to ")[1];
    }


    if (status == "NEW") {
        div.textContent = text_remarks
        div.style.textAlign = 'right';
        div.style.marginRight = '20px';
        div.style.fontStyle = 'italic';
        div.style.fontWeight = 'bolder';

        let isVisible = true;

        const blinkInterval = setInterval(() => {
        if (isVisible) {
            div.style.visibility = 'hidden'; 
        } else {
            div.style.visibility = 'visible';
        }
        isVisible = !isVisible;
        }, 500);
    }

    if (status.includes("Approval Request send to ")) {
        div.textContent = text_remarks
        div.style.textAlign = 'center';
        div.style.color = "white";
        div.style.backgroundColor = 'black';
        div.style.fontWeight = 'bolder';
        div.style.border = '2px solid black';
        div.style.borderTopLeftRadius = '5px';
        div.style.borderTopRightRadius = '5px';
    }
}

function performCustomActivity() {
    var resolution = ACTIVITY_LIST.options[ACTIVITY_LIST.selectedIndex].text;
    const selectedOption = APPROVAL_AGENTS.options[APPROVAL_AGENTS.selectedIndex].text;
    const searchResultsInfo = document.querySelector('.t-SearchResults-info').innerText;
    var status_activity = searchResultsInfo.split("Activities: ")[1]
    if (TICKET_CLOSED.includes(resolution)) {
        const ticketTitle = document.querySelector('#R555757530040776432_report .t-SearchResults-title a');
        const TICKET_DESC = ticketTitle.innerText;
        const TICKET_NO = TICKET_DESC.split(" - ")[0].split("#")[1];
        const TICKET_DATA = JSON.parse(localStorage.getItem('TICKET_DATA'));
        delete TICKET_DATA[TICKET_NO];
        localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
    }
    else if (resolution == "Approval Request") {
        const ticketTitle = document.querySelector('#R555757530040776432_report .t-SearchResults-title a');
        const TICKET_DESC = ticketTitle.innerText;
        const TICKET_NO = TICKET_DESC.split(" - ")[0].split("#")[1];
        const TICKET_DATA = JSON.parse(localStorage.getItem('TICKET_DATA'));
        TICKET_DATA[TICKET_NO] = ["Approval Request send to " + selectedOption, status_activity]
        localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
    }
    else {
        const ticketTitle = document.querySelector('#R555757530040776432_report .t-SearchResults-title a');
        const TICKET_DESC = ticketTitle.innerText;
        const TICKET_NO = TICKET_DESC.split(" - ")[0].split("#")[1];
        const TICKET_DATA = JSON.parse(localStorage.getItem('TICKET_DATA'));
        TICKET_DATA[TICKET_NO] = [resolution, status_activity]
        localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
    }
}

const PENDING_BALANCE_DETAIL_HEADING = document.getElementById('R316390252032604579_heading');
const STUDENT_LEDGER = document.getElementById('report_table_R316385104816604562');
const PENDING_VOUCHER_TABLE = document.getElementById('report_table_R316406986311604642');
const PENDING_BALANCE_DETAIL_TABLE = document.getElementById('report_table_R316390252032604579');
const STUDENT_ID = document.getElementById('P0_V_DIRECT_STUDENT_ID');
const GENERATE_VOUCHER_BUTTON = document.getElementById('B289463526566461369');
const GENERATE_VOUCHER_TABLE = document.getElementById('report_table_R316391895542604585');
const APPLY_CHANGES_BUTTON = document.getElementById("B289463912741461369");
const PRINT_VOUCHER_BUTTON = document.getElementById("B289464337693461371");
const VOUCHER_NO_FOR_SMS = document.getElementById('P3310_VOUCHER_NO_DISPLAY');
const VOUCHER_DUE_DATE_FOR_SMS = document.getElementById('P3310_DUE_DATE');
const CELL_NUMBER_SMS = document.getElementById('P3310_STUDENT_CELL_NO_DISPLAY');
let URL = 'https://api.indus.edu.pk/kuickpay/?stu_id=Student_ID&stu_name=Studnet_Name&stu_voucher=Student_Voucher&stu_amount=Amount&stu_due_date=Due_Date&stu_cell_number=Cell_Number';
        

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function styledRow(rowNo) {
    var newRow = table.insertRow(rowNo);
    
    var tuitionChargedCell = newRow.insertCell(0);
    tuitionChargedCell.colSpan = 1;
    var tuitionPaidCell = newRow.insertCell(1);
    tuitionPaidCell.colSpan = 1;
  
    var balanceCell = newRow.insertCell(2);
    balanceCell.colSpan = 4;
  
    var otherFeeChargedCell = newRow.insertCell(3); // Changed index to 2
    otherFeeChargedCell.colSpan = 1;
    var otherFeePaidCell = newRow.insertCell(4); // Changed index to 2
    otherFeePaidCell.colSpan = 1;
  
    var cellStyle = "text-align: center; background-color: #E6E6E6; padding: 5px; color: black; font-weight: bold;";
  
    tuitionChargedCell.innerHTML = "Tuition DB";
    tuitionChargedCell.setAttribute("style", cellStyle);
    tuitionPaidCell.innerHTML = "Tuiti CR";
    tuitionPaidCell.setAttribute("style", cellStyle);
    
  
    balanceCell.innerHTML = "Remaining Balance";
    balanceCell.setAttribute("style", cellStyle);
    
  
    otherFeeChargedCell.innerHTML = "Other DB";
    otherFeeChargedCell.setAttribute("style", cellStyle);
    otherFeePaidCell.innerHTML = "Other CR";
    otherFeePaidCell.setAttribute("style", cellStyle);
    
  }

  function styledRow2(rowNo, key, sessionData) {
    var data = sessionData.get(key);
    
    var newRow = table.insertRow(rowNo);
    
    var tuitionChargedCell = newRow.insertCell(0);
    tuitionChargedCell.colSpan = 1;
    var tuitionPaidCell = newRow.insertCell(1);
    tuitionPaidCell.colSpan = 1;
  
    var balanceCell = newRow.insertCell(2);
    balanceCell.colSpan = 4;
  
    var otherFeeChargedCell = newRow.insertCell(3); // Changed index to 2
    otherFeeChargedCell.colSpan = 1;
    var otherFeePaidCell = newRow.insertCell(4); // Changed index to 2
    otherFeePaidCell.colSpan = 1;
  
    var cellStyle = "text-align: center; background-color: white; padding: 5px; color: black; border: 1px solid grey;";
  
    
    tuitionChargedCell.innerHTML = data['Tuition Fee Charged'] + "/-";
    tuitionChargedCell.setAttribute("style", cellStyle);
    tuitionPaidCell.innerHTML = data['Tuition Fee Paid'] + "/-";
    tuitionPaidCell.setAttribute("style", cellStyle);
    

    otherFeeChargedCell.innerHTML = data['Other Fee Charged'] + "/-";
    otherFeeChargedCell.setAttribute("style", cellStyle);
    otherFeePaidCell.innerHTML = data['Other Fee Paid'] + "/-";
    otherFeePaidCell.setAttribute("style", cellStyle);

    balance_caluclation = (parseInt(data['Tuition Fee Charged']) + parseInt(data['Other Fee Charged'])) - (parseInt(data['Tuition Fee Paid']) + parseInt(data['Other Fee Paid']));
    balanceCell.innerHTML = balance_caluclation;
    balanceCell.setAttribute("style", cellStyle);
    
  }

if (PENDING_BALANCE_DETAIL_HEADING !== null) {     
    document.addEventListener('keydown', (event) => {
        if (event.key === ',') {
            event.preventDefault();
          const element = document.getElementById('P3310_RFID');
          if (element) {
            element.focus();
            element.value = '';
          }
        }
      });


    var table = PENDING_BALANCE_DETAIL_TABLE;
    var negate_value = 0

    if (table) {        
        for (var i = 1, row; row = table.rows[i]; i++) {    
            for (var j = 0, col; col = row.cells[j]; j++) {
                if (!row.cells[0].innerHTML.includes("strong")){
                    if (row.cells[0].innerHTML != "Tuition Fees" && row.cells[0].innerHTML != "Degree Fees" && row.cells[0].innerHTML != "Urgent Degree" && row.cells[0].innerHTML != "Provisional Certificate Fee" && row.cells[0].innerHTML != "Final Transcript Fees" && row.cells[0].innerHTML != "Urgent Final Transcript") {
                        if (!row.cells[1].innerHTML.includes("-")) {
                            removing_comas = row.cells[1].innerHTML.replace(",", "");
                            negate_value += parseInt(removing_comas) / 2; 
                        }
                    }
                }
            }
        }
    }
    

    // Wait for the page to fully load
    window.onload = function() {
        var retrievedBooleanValue = localStorage.getItem('auto_print_fifty_percent');
        var retrievedBooleanValue2 = localStorage.getItem('print_voucher');
        var retrievedBooleanValue3 = localStorage.getItem('auto_print_hundred_percent');
        var retrievedBooleanValue4 = localStorage.getItem('auto_print_manual_fee');   

        var auto_print_fifty_percent = retrievedBooleanValue === 'true';
        var auto_print_hundred_percent = retrievedBooleanValue3 === 'true';
        var auto_print_manual_fee = retrievedBooleanValue4 === 'true';
        var print_voucher = retrievedBooleanValue2 === 'true';
        if (auto_print_fifty_percent || auto_print_hundred_percent || auto_print_manual_fee) {
            var table = GENERATE_VOUCHER_TABLE;

            if (table) {
                var tbody = table.getElementsByTagName("tbody")[0];

                if (tbody) {
                    var rows = tbody.getElementsByTagName("tr");

                    for (var i = 0; i < rows.length; i++) {
                        var cells = rows[i].getElementsByTagName("td");
                        
                        if (cells.length >= 2 && cells[1].textContent.trim() === "Tuition Fees") {                            
                            var inputElement = cells[2].querySelector("input[type='text']");                            
                            var Fifty_percent_input;                             
                            var table = document.getElementById("my-id");
                            
                            if (table) {
                                var rows = table.getElementsByTagName("tr");                                
                                for (var i = 0; i < rows.length; i++) {
                                    var cells = rows[i].getElementsByTagName("td");                                    
                                    var firstColumnValue = cells[0].textContent.trim();
                                    var secondColumnValue = cells[1].textContent.trim();
                                   
                                    if (firstColumnValue === "50% Tuition Fee") {                                        
                                        Fifty_percent_input = secondColumnValue;
                                        var table = GENERATE_VOUCHER_TABLE;
                                        for (var i = 1, row; row = table.rows[i]; i++) {
                                            var type_fee = row.cells[1].textContent;
                                            var inputField = row.cells[2].querySelector("input"); 
                                            if (inputField) { 
                                                if (type_fee == "Degree Fees" || type_fee == "Urgent Degree" || type_fee == "Provisional Certificate Fee" || type_fee == "Final Transcript Fees" || type_fee == "Urgent Final Transcript"){
                                                    inputField.value = "0"
                                                }
                                            }
                                        }
                                    }
                                }

                                if (auto_print_fifty_percent) {
                                    inputElement.value = Fifty_percent_input;
                                }

                                if (auto_print_manual_fee) {
                                    var table = GENERATE_VOUCHER_TABLE;
                                    for (var i = 1, row; row = table.rows[i]; i++) {
                                        var type_fee = row.cells[1].textContent; // Access content of column 2
                                        var inputField = row.cells[2].querySelector("input");                                                                                
                                        if (inputField) { 
                                            var fee_input_box = inputField.value;
                                            fee_input_box = fee_input_box.replace(",", "");                                         
                                            if (fee_input_box.includes("-")) {
                                                inputField.value = "0"
                                                
                                            }
                                            if (type_fee == "Tuition Fees"){
                                                if (negate_value == quickVoucher.value) {
                                                    inputField.value = "0"
                                                }
                                                else {
                                                    var saved_manual_amount = localStorage.getItem('manual_fee_amount');
                                                    inputField.value = parseInt(saved_manual_amount) - negate_value
                                                }
                                                
                                            }
                                            if (type_fee == "Degree Fees" || type_fee == "Urgent Degree" || type_fee == "Provisional Certificate Fee" || type_fee == "Final Transcript Fees" || type_fee == "Urgent Final Transcript"){
                                                inputField.value = "0"
                                            }
                                        } 
                                    }
                                    
                                }

                                if (APPLY_CHANGES_BUTTON) {
                                    APPLY_CHANGES_BUTTON.click();
                                    localStorage.setItem('auto_print_fifty_percent', false);
                                    localStorage.setItem('auto_print_hundred_percent', false);
                                    localStorage.setItem('auto_print_manual_fee', false);
                                    localStorage.setItem('print_voucher', true);
                                }                                
                                
                            } else {
                                console.log("Table not found");
                            }
                                            
                                            
                        }
                    }
                    if (i === rows.length) {
                        if (table) {
                            if (APPLY_CHANGES_BUTTON) {
                                APPLY_CHANGES_BUTTON.click();
                                localStorage.setItem('auto_print_fifty_percent', false);
                                localStorage.setItem('auto_print_hundred_percent', false);
                                localStorage.setItem('auto_print_manual_fee', false);
                                localStorage.setItem('print_voucher', true);
                            }
                        }
                        else {
                            console.log('Table not Found');
                        }
                        
                    }
                }
            } else {
                console.log("Table not found");
            }
        }
        if (print_voucher){
            if (PRINT_VOUCHER_BUTTON) {
                PRINT_VOUCHER_BUTTON.click();
                localStorage.setItem('print_voucher', false);
                localStorage.setItem('manual_fee_amount', null);
                quickVoucher.value = null;
            }     
        }
        
       
    };


    var table = PENDING_BALANCE_DETAIL_TABLE;

    
    if (table) {
        var tbody = table.getElementsByTagName("tbody")[0]; 

        if (tbody) {
            var rows = tbody.getElementsByTagName("tr");

            
            for (var i = 0; i < rows.length; i++) {
                var cells = rows[i].getElementsByTagName("td"); 
                for (var j = 0; j < cells.length; j++) {
                    if (cells[j].textContent.trim() === "Payable Total") {
                        cells[j].style.cursor = 'pointer';
                        cells[j].addEventListener('click', function() {
                            localStorage.setItem('auto_print_hundred_percent', true);
                            localStorage.setItem('print_voucher', false);
                            var generateVoucherButton = document.getElementById("generate_voucher_button");
                            if (generateVoucherButton) {
                                generateVoucherButton.click();
                            } else {
                                console.log("generate_voucher_button not found");
                            }
                        }); 
                        break;
                    }
                }
            }
        }
    } else {
        console.log("Table not found");
    } 



    const oldDivElement = PENDING_BALANCE_DETAIL_HEADING;
    const parentElement = oldDivElement.parentNode;

    const newDivElement = document.createElement('div');
    newDivElement.setAttribute('class', 'my-class');
    newDivElement.setAttribute('id', 'my-id');

    const tableElement = document.createElement('table');
    tableElement.setAttribute('class', 'my-table'); // Add class to table element

    const rowOneElement = document.createElement('tr');
    const cellOneElement = document.createElement('td');
    cellOneElement.textContent = 'Tuition Fee'; 
    cellOneElement.style.columnWidth = "170px"
    cellOneElement.style.backgroundColor = "#F6F6F6";   
    cellOneElement.style.fontWeight = "bold";
    const feePaidElement = document.createElement('td');
    feePaidElement.textContent = 'Amount';
    feePaidElement.style.columnWidth = "5px"
    feePaidElement.style.backgroundColor = "#F6F6F6";
    feePaidElement.style.fontWeight = "bold";
    feePaidElement.style.textAlign =  "end"; 
    feePaidElement.style.marginRight =  "50px";  
    rowOneElement.appendChild(cellOneElement);
    rowOneElement.appendChild(feePaidElement); 
    
    // rowOneElement.appendChild(feePaidElement);

    // Create second row
    // Create second row
    const rowTwoElement = document.createElement('tr');
    const cellThreeElement = document.createElement('td');
    cellThreeElement.textContent = '50% Tuition Fee'; 
    const tuitionFeeElement = document.createElement('td');
    tuitionFeeElement.textContent = '';
    tuitionFeeElement.style.textAlign =  "end";
    rowTwoElement.appendChild(cellThreeElement);
    rowTwoElement.appendChild(tuitionFeeElement);
    tuitionFeeElement.textContent = "0";

    // Create third row
    const rowThreeElement = document.createElement('tr');
    const cellFiveElement = document.createElement('td');
    cellFiveElement.textContent = '100% Tuition Fee';  
    const fullTuitionFee = document.createElement('td');
    fullTuitionFee.textContent = '';
    fullTuitionFee.style.textAlign =  "end";
    rowThreeElement.appendChild(cellFiveElement);
    rowThreeElement.appendChild(fullTuitionFee);
    fullTuitionFee.textContent = "10,000";

    // Create fourth row
    const rowFourElement = document.createElement('tr');
    const cellSevenElement = document.createElement('td');
    cellSevenElement.textContent = 'Payable Half';     
    cellSevenElement.style.textAlign =  "start"; 
    cellSevenElement.style.fontWeight = "bold";
    const forMidElement = document.createElement('td');
    forMidElement.textContent = '';
    forMidElement.style.textAlign =  "end";
    forMidElement.style.fontWeight = "bold";
    rowFourElement.appendChild(cellSevenElement);
    rowFourElement.appendChild(forMidElement);
    forMidElement.textContent = "0";

    // Append all rows to table element
    // tableElement.appendChild(rowOneElement);
    tableElement.appendChild(rowOneElement);    
    tableElement.appendChild(rowTwoElement);
    tableElement.appendChild(rowThreeElement);
    tableElement.appendChild(rowFourElement);

    // Append table element to new div element
    newDivElement.appendChild(tableElement);
    insertAfter(newDivElement, oldDivElement);
    // parentElement.insertBefore(newDivElement, oldDivElement.nextElementSibling,);

    // CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    .my-table {
        border-collapse: collapse;        
        border-color: #262626;
        font-family: 'Helvetica Neue','Segoe UI',Helvetica,Arial,sans-serif;
        font-weight: lighter;
        WIDTH: 105%;
        
    }
    .my-class {
        margin-top: 10px; 
        margin-bottom: 0px; 
        margin-left: -10px;
        font-size: 0.75rem;       
    }
    .my-table td {
        border: 1px solid black;
        padding: 4.5px 12px;
        border-color: #e6e6e6;              
    }
    `;
    document.head.appendChild(styleElement);
    
    

    document.querySelectorAll('.t-Region-headerItems.t-Region-headerItems--buttons').forEach(function(element) {
        element.remove();
    });
    
    document.querySelectorAll('.t-Region-headerItems--title').forEach(function(element) {
        element.style.display = 'block';
        
    });

    cellThreeElement.style.paddingLeft = '10px'
    cellFiveElement.style.paddingLeft = '10px'
    cellSevenElement.style.paddingLeft = '10px'



    PENDING_BALANCE_DETAIL_HEADING.style.fontFamily = "'Helvetica Neue','Segoe UI',Helvetica,Arial,sans-serif";
    PENDING_BALANCE_DETAIL_HEADING.style.color = "#A020F0";
    PENDING_BALANCE_DETAIL_HEADING.style.fontWeight = "700";
    PENDING_BALANCE_DETAIL_HEADING.style.fontSize = "inherit";
    PENDING_BALANCE_DETAIL_HEADING.style.marginLeft = "45px";

    elements = document.getElementsByTagName("td")
    for (var i = elements.length; i--;) {        
        if (elements[i].innerHTML.includes('Posted')) {
            elements[i].style.color = "green";
            elements[i].style.fontFamily = "Arial";
            elements[i].style.fontWeight = "900";
            elements[i].style.fontSize = "15px";
        }        
    }    

    var originalButton = GENERATE_VOUCHER_BUTTON;
    var referenceElement = PENDING_BALANCE_DETAIL_HEADING

    if (originalButton) {        
        var clonedButton = originalButton.cloneNode(true);        
        clonedButton.id = "generate_voucher_button";
        clonedButton.style.marginLeft = '30px';
        referenceElement.parentNode.insertBefore(clonedButton, referenceElement);
        var spanElements = referenceElement.getElementsByTagName("span");
        for (var i = 0; i < spanElements.length; i++) {
            if (spanElements[i].textContent === "Issuing Fee Voucher") {
                spanElements[i].style.display = "none";
                
            }
        }
    } 

   

    var quickVoucher = document.createElement("input");
    quickVoucher.type = "number"; // Set the input type to number
    quickVoucher.placeholder = "Quick Voucher"
    quickVoucher.id = "quick_voucher"; // Set the ID to "quick_voucher"
    quickVoucher.style.marginBottom = "10px";
    quickVoucher.style.marginLeft = "10px";

    var saved_manual_amount = localStorage.getItem('manual_fee_amount');
    if (saved_manual_amount !== null) {
        quickVoucher.value = saved_manual_amount
    }
    

    quickVoucher.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            if (negate_value <= quickVoucher.value) {
                localStorage.setItem('manual_fee_amount', quickVoucher.value);
                localStorage.setItem('auto_print_manual_fee', true);
                var generateVoucherButton = document.getElementById("generate_voucher_button");
                if (generateVoucherButton) {
                    generateVoucherButton.click();
                }
            }
            else {
                alert("Invalid Amount")
            }            
        }
    });

    // Insert the new number field as a sibling above the reference element
    
    referenceElement.parentNode.insertBefore(quickVoucher, referenceElement);


    var isButtonPressed = false;

    try {
        if (clonedButton) {
            clonedButton.addEventListener("click", function() {
                isButtonPressed = true;
                var tabLink = document.querySelector("a[href='#R312552596540404712']");
                if (tabLink) {
                    tabLink.click();
                }
            });
        }
    } catch (error) {
        
    }
    
    // Main engine
    final_session = "";
    tuition_fee_charged = []
    posted_voucher = []
    remaining_balance = 0;  
    other_values_charged = 0;
    other_values_paid = 0;  
    temp = 0;
    degree_provisional_cms_charged = 0;
    degree_provisional_cms_paid = 0;
    full_scholorship = true;
    package_type = false  
    
    
    var table = STUDENT_LEDGER;
    var arr = new Array();
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (row.cells[3].innerHTML == 'Package') {                
                if (row.cells[4].innerHTML != 'Admission Fees' && row.cells[4].innerHTML != 'Verification of Eligibility Document  Fees') {   
                    package_type = true
                }
            }   
            removing_comas = row.cells[5].innerHTML.replace(",", "");
            if (tuition_fee_charged.includes(removing_comas)) {

            }
            else {
                tuition_fee_charged.push(removing_comas/8)
              
            } 
            if (row.cells[4].innerHTML == "Tuition Fees"){                
                full_scholorship = false;                
            }                      
            if (row.cells[2].innerHTML == "<strong></strong>" || row.cells[2].innerHTML == "" || row.cells[2].innerHTML == "") {                                      
            }            
            else{
                final_session = row.cells[2].innerHTML;
            }
            if (row.cells[7].innerHTML != "<strong></strong>") {
                removing_comas = row.cells[7].innerHTML.replace(",", "");
                remaining_balance = parseInt(removing_comas);                                                     
            } 
            if (row.cells[4].innerHTML != "Tuition Fees" && row.cells[4].innerHTML != "Degree Fees" && row.cells[4].innerHTML != "Urgent Degree" && row.cells[4].innerHTML != "Final Transcript Fees" && row.cells[4].innerHTML != "Urgent Final Transcript" && row.cells[4].innerHTML != "Provisional Certificate Fee") {
                if (row.cells[5].innerHTML != "") {                                          
                    removing_comas = row.cells[5].innerHTML.replace(",", "");
                    temp = parseInt(removing_comas); 
                    if (Number.isInteger(temp)) {                                                
                        other_values_charged += temp / 8                        
                    }                                            
                } 
                if (row.cells[6].innerHTML != "") {                       
                    removing_comas = row.cells[6].innerHTML.replace(",", "");
                    temp = parseInt(removing_comas); 
                    if (Number.isInteger(temp)) {
                        other_values_paid += temp / 8
                    }                                            
                }               
            } 
            if (row.cells[4].innerHTML == "Degree Fees" || row.cells[4].innerHTML == "Urgent Degree" || row.cells[4].innerHTML == "Urgent Final Transcript" || row.cells[4].innerHTML == "Final Transcript Fees" || row.cells[4].innerHTML == "Provisional Certificate Fee") {                              
                if (row.cells[5].innerHTML != "") {                    
                    removing_comas = row.cells[5].innerHTML.replace(",", "");
                    value = parseInt(removing_comas);
                    degree_provisional_cms_charged += value;
                }
                if (row.cells[6].innerHTML != "") {                    
                    removing_comas = row.cells[6].innerHTML.replace(",", "");
                    value = parseInt(removing_comas);
                    degree_provisional_cms_paid += value;
                }
            }
            if (row.cells[4].innerHTML == "Tuition Fees" && row.cells[6].innerHTML != "<strong></strong>" && row.cells[6].innerHTML != "" && row.cells[3].innerHTML != "") {
                posted_voucher_narration = row.cells[3].innerHTML;
                try {
                    posted_voucher_number = posted_voucher_narration.match(/(\d+)/)[1]
                    if (posted_voucher.includes(posted_voucher_number)){

                    }
                    else {
                        posted_voucher.push(posted_voucher_number)
                    }
                  }
                  catch(error) {
                   
                  }                                          
            } 
            if (row.cells[1].innerHTML == "" && row.cells[2].innerHTML == "") {
                if (row.cells[3].innerHTML != "Package") {
                    row.cells[3].style.color = "#00008B";
                    row.cells[3].style.fontWeight = "750";
                }
            }
            if (row.cells[3].innerHTML.toUpperCase().includes('WARNING')) {
                row.cells[3].style.color = "red";
                row.cells[3].style.fontWeight = "750";
            }     
            if (row.cells[3].innerHTML.toUpperCase().includes('BY KUICKPAY')) {
                row.cells[3].style.color = 'rgb(0, 180, 0)';
                row.cells[3].style.fontWeight = "750";
            }
            if (row.cells[3].innerHTML.toUpperCase().includes('POS CARD NO')) {
                row.cells[3].style.color = 'rgb(233, 125, 18)';
                row.cells[3].style.fontWeight = "750";
            }                           
        } 
    }    
    
    if (final_session == "") {
        final_session = "No Session"
    }
    
    // getting total semester tuition fee
    total = 0
    charged = 0;
    paid = 0;
    fee_status = 0;   
    
    var table = STUDENT_LEDGER;
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {             
            if (row.cells[2].innerHTML != final_session) {
                if (row.cells[4].innerHTML == "Tuition Fees"){
                    value = row.cells[3].innerHTML;                                                    
                    if (row.cells[5].innerHTML != "") {
                        removing_comas = row.cells[5].innerHTML.replace(",", ""); 
                        charged += parseInt(removing_comas);                        
                    }
                    if (row.cells[6].innerHTML != "") {
                        removing_comas = row.cells[6].innerHTML.replace(",", "");                    
                        paid += parseInt(removing_comas);                       
                    }                    
                    fee_status = (paid/8) - (charged/8);                    
                }                
            }        
            else{                          
                removing_comas = row.cells[5].innerHTML.replace(",", "");
                value = parseInt(removing_comas);
                if (Number.isInteger(value)) {
                    total += value/8;                                                      
                } 
            }        
        }  
    }  
   
    
    if (full_scholorship == false) {    
        sum = tuition_fee_charged.reduce((partialSum, a) => partialSum + a, 0);
        if (sum == 0) {
            full_scholorship = true
        }
    }
    
    
    degree_provisional_cms = degree_provisional_cms_charged - degree_provisional_cms_paid
    
    advance_fee = 0
    debt = 0
    if (fee_status > 0) {
        advance_fee = fee_status
    }
    else if (fee_status < 0) {
        debt = 0 - fee_status
    }
    else {
        advance_fee = 0
        debt = 0
    }
    
    
    if (remaining_balance != 0) {
        remaining_balance = remaining_balance - (degree_provisional_cms/8)
    }          


    var needed = (total / 2) + debt - advance_fee // tuition fee needed
    if (remaining_balance <= Math.abs(Math.round(needed))) {
        needed = 0;
    }
    else if (needed <= 0) {
        needed = 0
    }
    var required = Math.round(remaining_balance - (total / 2)); // for mid (tuition fee + others if charged) needed

    
    if (required <= 0) {
        if (other_values_charged - other_values_paid > 0) {
            required = other_values_charged - other_values_paid
        }
        else {
            required = 0
        }
    }

    
    if (required > 0) {
        cellSevenElement.style.cursor = 'pointer'; // Change cursor to pointer
        cellSevenElement.addEventListener('click', function() {
            localStorage.setItem('auto_print_fifty_percent', true);
            localStorage.setItem('print_voucher', false);
            var generateVoucherButton = document.getElementById("generate_voucher_button");
            if (generateVoucherButton) {
                generateVoucherButton.click();
            } else {
                console.log("generate_voucher_button not found");
            }
        });       
    }
    
    if (remaining_balance < 0){
        var result = 100;
    }
    
    else {  
        if (remaining_balance < total) {  // student has no previos balance. Shows percentage in positive value or 0                          
            var result = 100 - (remaining_balance / total * 100) 
            
        } 
        else { // previous balance means a negative percentage will be shown on screen 
            if (debt == 0 && total == 0) {                
                result = 100
            }
            else {                             
                var result = 0 - (0 + (debt - advance_fee) / total * 100)
            }  
        }   
    } 

    

    fullTuitionFee.textContent = total.toLocaleString("en-US");    

    if (full_scholorship == true) {        
        PENDING_BALANCE_DETAIL_HEADING.style.color = "#8F00FF";
        PENDING_BALANCE_DETAIL_HEADING.style.marginLeft = "9px";
        PENDING_BALANCE_DETAIL_HEADING.textContent = "Full Scholorship" + " - (For Mid: " + (remaining_balance).toLocaleString("en-US") + ")";
    }
    else {         
        PENDING_BALANCE_DETAIL_HEADING.style.color = "#404040";
        PENDING_BALANCE_DETAIL_HEADING.textContent =  final_session + " (" + Math.round(result).toLocaleString("en-US") + "%)"
        tuitionFeeElement.textContent = Math.abs(Math.round(needed)).toLocaleString("en-US");
        forMidElement.textContent = required.toLocaleString("en-US");
    if (result >= 50) {
        PENDING_BALANCE_DETAIL_HEADING.style.color = "#0000FF";
    }
    else if (result < 0) {
        PENDING_BALANCE_DETAIL_HEADING.style.color = "#FF0000";
    }
    else {
        PENDING_BALANCE_DETAIL_HEADING.style.color = "#404040";
    }    
    }


    // Set headers as per session (Fall-2023 etc)
    headers =  new Map();
    package_row_found = false
    course_row_found = false
    course_row_adjustment = false
    summer_row_found = false
    session = "none"
    var table = STUDENT_LEDGER;
    for (var i = table.rows.length - 1; i > 0; i--) {
        var row = table.rows[i];
        for (var j = row.cells.length - 1; j >= 0; j--) {
            var col = row.cells[j];
            if (row.cells[2].innerHTML != ''){
                if (row.cells[2].innerHTML.includes('</strong>')){}
                else{
                    session = row.cells[2].innerHTML
                }
            }
            if (package_type) {
                
            }
            else {
                if (row.cells[2].innerHTML == session) {
                    var key = session;
                    var value = i - 1;                    
                    headers.set(key, value);                             
                }
                else {
                    if (row.cells[3].innerHTML == 'Package') {
                        course_row_adjustment = true
                        break
                    }           
                } 

            }
        }
    }

    if (course_row_adjustment) {
        var keysArray = Array.from(headers.keys());
        if (keysArray.length > 0) {
            var lastKey = keysArray[keysArray.length - 1];
            headers.delete(lastKey);                            
        }
    }

    
    for (let [key, value] of headers.entries()) {
    var current_session = key; // Get the value associated with the key
    var rowIndex = parseInt(value);

    var newRow = table.insertRow(rowIndex + 1);
    // styledRow2(rowIndex + 1);
    // styledRow(rowIndex + 1); 
    var newCell = newRow.insertCell(0);
    newCell.colSpan = table.rows[0].cells.length;

    newCell.innerHTML = current_session;
    newCell.style.textAlign = "center";
    newCell.style.backgroundColor = "white";
    newCell.style.padding = "5px";
    newCell.style.color = "black";
    newCell.style.fontWeight = "bold";
    newCell.style.border = "1px solid #e6e6e6";

    }

    // first row
    if (!package_type) {
        var newRow = table.insertRow(1);
        var newCell = newRow.insertCell(0);
        newCell.colSpan = table.rows[0].cells.length;
    

        newCell.innerHTML = session;
        newCell.style.textAlign = "center";
        newCell.style.backgroundColor = "white";
        newCell.style.padding = "5px";
        newCell.style.color = "black";
        newCell.style.fontWeight = "bold";
        newCell.style.border = "1px solid #e6e6e6";
        
    }
    
    all_seession_details = new Map();
    current_semester_details = {}
    current_semester = "None"
    current_semester_details['Tuition Fee Charged'] = 0
    current_semester_details['Tuition Fee Paid'] = 0
    current_semester_details['Other Fee Charged'] = 0
    current_semester_details['Other Fee Paid'] = 0

    for (var i = 1, row; row = table.rows[i]; i++) { 
        try{  
            for (var j = 0, col; col = row.cells[j]; j++) { 
                if (row.cells[4].innerHTML.includes('</strong>')) {}
                else {
                    if (row.cells[4].innerHTML != "") {
                        if (row.cells[5].innerHTML != "") {
                            if (row.cells[4].innerHTML == "Tuition Fees") {                                  
                                removing_comas = row.cells[5].innerHTML.replace(",", "");  
                                current_semester_details['Tuition Fee Charged'] += parseInt(removing_comas) / 8                             
                            }
                            else {
                                removing_comas = row.cells[5].innerHTML.replace(",", "");  
                                current_semester_details['Other Fee Charged'] += parseInt(removing_comas) / 8   
                            }                          
                        }
                        if (row.cells[6].innerHTML != "") {
                            if (row.cells[4].innerHTML == "Tuition Fees") {
                                removing_comas = row.cells[6].innerHTML.replace(",", "");   
                                current_semester_details['Tuition Fee Paid'] += parseInt(removing_comas) / 8
                            }
                            else {
                                removing_comas = row.cells[6].innerHTML.replace(",", "");   
                                current_semester_details['Other Fee Paid'] += parseInt(removing_comas) / 8
                            }                            
                        }
                    }
                }
            }
        }
    
        catch (error) {
            if (current_semester != "None") {
                var key = current_semester;
                var value = current_semester_details; 
                all_seession_details.set(current_semester, value);                
                
                current_semester_details = {}
                current_semester_details['Tuition Fee Charged'] = 0
                current_semester_details['Tuition Fee Paid'] = 0
                current_semester_details['Other Fee Charged'] = 0
                current_semester_details['Other Fee Paid'] = 0
                
            }
            
            current_semester = row.cells[0].innerHTML;            
              
        }
    }

    
   // Last row
    if (!package_type) {
        var key = current_semester;
        var value = current_semester_details; 
        all_seession_details.set(current_semester, value);
        styledRow(table.rows.length - 1); 
        styledRow2(table.rows.length - 1, key, all_seession_details);
    }


    for (var i = table.rows.length - 1; i > 0; i--) {
        var row = table.rows[i];
        for (var j = row.cells.length - 1; j >= 0; j--) {
            var col = row.cells[j];
            var numberOfCellsInRow = row.cells.length;
            if (numberOfCellsInRow == 1) {                
                current_session = row.cells[0].innerHTML
                let previousKey = null;
                for (let key of all_seession_details.keys()) {
                    if (key === current_session) {            
                        break;
                    }
                    previousKey = key;
                }
                try {                        
                    styledRow2(i, previousKey, all_seession_details); 
                    styledRow(i); 
                } catch (error) {}                   
                                    
            }
        }
    }

    let studnet_name_for_sms;
    let amount_for_sms;
    let cell_number_for_sms;
    let voucher_for_sms;

    const boldTags = document.querySelectorAll('b');
    boldTags.forEach(boldTag => {
        studnet_name_for_sms = boldTag.textContent;
    });
    let fullName = studnet_name_for_sms;
    let split_name;
    if (fullName.includes(" S/O ")) {
        split_name = fullName.split(" S/O ");
    } else if (fullName.includes(" D/O ")) {
        split_name = fullName.split(" D/O ");
    }
    let firstName = split_name[0];
    cell_number_for_sms = CELL_NUMBER_SMS.textContent

    if (PRINT_VOUCHER_BUTTON) {
        voucher_for_sms = VOUCHER_NO_FOR_SMS.textContent;
        due_date_of_voucher = VOUCHER_DUE_DATE_FOR_SMS.value.split('-');
        day = due_date_of_voucher[0];
        month = due_date_of_voucher[1];
        year = '20' + due_date_of_voucher[2];
        due_date_of_voucher = day + '-' + month + '-' + year;
        const tableElement = document.getElementById('report_table_R316391895542604585');
        const cellsWithStrong = tableElement.querySelectorAll('td strong');
        cellsWithStrong.forEach(cell => 
            amount_for_sms = cell.textContent
        );
        let updated_url = URL.replace('Student_ID', STUDENT_ID.value).replace('Studnet_Name', firstName).replace('Student_Voucher', voucher_for_sms).replace('Due_Date', due_date_of_voucher).replace('Amount', amount_for_sms).replace('Cell_Number', cell_number_for_sms);
        PRINT_VOUCHER_BUTTON.addEventListener('click', function() {
            try {
                fetch(updated_url);
            } catch (error) {

            }
        });
    } 
    
    const div = PENDING_VOUCHER_TABLE;
    const vouchers = {};
    let orderOfKeys = [];
    const tdElements = div.getElementsByTagName('td');
    let foundAnchor = false;
    let scount = 0;
    let voucher_status;
    let voucher_expiry;
    let voucher_key;
    let voucher_total_amount = 0
    if (div) {
        for (let i = 0; i < tdElements.length; i++) {
            const tdElement = tdElements[i];
            const anchorElement = tdElement.querySelector('a');

            if (anchorElement) {
                dcount = 0
                if (foundAnchor) {
                    scount = i; 
                }

                voucher_key = anchorElement.innerHTML;
                foundAnchor = true;
            }

            else {
                voucher_total_amount = tdElements[i].innerText
                const hasBoldText = tdElements[i].querySelector('strong') && tdElements[i].innerText != "";

                if (hasBoldText) {
                    
                    voucher_status = tdElements[scount + 3].innerHTML;
                    voucher_expiry = tdElements[scount + 7].innerHTML;
                    const valueToAppend = [voucher_expiry, voucher_status, voucher_total_amount];
                    

                    if (!orderOfKeys.includes(voucher_key)) {
                        orderOfKeys.push(voucher_key);
                    }
                    
                    if (!vouchers.hasOwnProperty(voucher_key)) {
                        vouchers[voucher_key] = valueToAppend;
                    }
                }
                else {
                    if (tdElement.getAttribute('headers') === 'DUE_DATE_000') {
                        const dueDateText = tdElement.innerText.trim()
                        if (dueDateText !== '') {
                            const [day, month, year] = dueDateText.split('-');
                            const monthIndex = new Date(Date.parse(month + " 1, 2023")).getMonth();
                            const fullYear = 2000 + parseInt(year, 10);
                            const dueDate = new Date(fullYear, monthIndex, day);
                            dueDate.setHours(23, 59, 59);
                            const currentDate = new Date();
                            
                            if (currentDate >= dueDate) {
                                var pending_status = tdElements[i-4]
                                if (pending_status.innerText.trim() === 'Pending') {
                                    pending_status.innerText = 'Expired';
                                    pending_status.style.color = 'red';
                                    pending_status.style.fontFamily = "Arial";
                                    pending_status.style.fontWeight = "900";
                                    pending_status.style.fontSize = "15px";
                                }
                                
                            }
                        }
                    }
                }
                
            }
        }

        const currentDate = new Date();
        get_voucher = '';


        var get_student_id = localStorage.getItem('student_id');
        if (get_student_id != STUDENT_ID.value) {
            let voucher_found = false;
            if (div && remaining_balance > 0) {
                localStorage.setItem('student_id', STUDENT_ID.value);
                const currentDate = new Date();
                get_voucher = '';

                for (let key of orderOfKeys) {
                    const voucherDate = new Date(vouchers[key][0]);
                    const voucherAmount = vouchers[key][2];
                    voucherDate.setHours(23, 59, 59);
                    let day = String(voucherDate.getDate()).padStart(2, '0');
                    let month = voucherDate.toLocaleString('default', { month: 'short' }).toUpperCase();
                    let year = String(voucherDate.getFullYear());
                    let due_date_for_sms = `${day}-${month}-${year}`;
                    const get_voucher_status = vouchers[key][1]
                    if (voucherDate >= currentDate && get_voucher_status == "Pending") {
                        get_voucher = key;
                        voucher_found = true;
                        // let updated_url = URL.replace('Student_ID', STUDENT_ID.value).replace('Studnet_Name', firstName).replace('Student_Voucher', key).replace('Due_Date', due_date_for_sms).replace('Amount', voucherAmount).replace('Cell_Number', cell_number_for_sms);
                        // try {
                        //     fetch(updated_url);
                        // } catch (error) {

                        // }
                        
                        break;
                    }
                        else {
                            
                        }
                    }

                
                if (voucher_found) {
                    const div2 = PENDING_VOUCHER_TABLE;
                    const anchorElements = div2.getElementsByTagName('a');
                    const searchNumber = get_voucher;
                    
                    for (let i = 0; i < anchorElements.length; i++) {
                    const anchorElement = anchorElements[i];
                        if (anchorElement.innerHTML === searchNumber) {
                            const print_voucher = anchorElement;
                            

                            // Get Chrome Version as it only works in most updated chrome browser
                            var inputString = navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)[1];
                            var parts = inputString.split('.');
                            var firstPortion = parts[0];
                            var intValue = parseInt(firstPortion, 10);

                            if (intValue >= 118) {
                                print_voucher.click();  
                                break; 
                            }
                            else{
                                console.log("Auto Print Peding Voucher Not Working")
                                break;
                            }
                            
                        }
                    }
                }
            }
        }

        for (let key of orderOfKeys) {
            const voucherDate = new Date(vouchers[key][0]);
            const voucherAmount = vouchers[key][2];
            voucherDate.setHours(23, 59, 59);
            let day = String(voucherDate.getDate()).padStart(2, '0');
            let month = voucherDate.toLocaleString('default', { month: 'short' }).toUpperCase();
            let year = String(voucherDate.getFullYear());
            let due_date_for_sms = `${day}-${month}-${year}`;
            const get_voucher_status = vouchers[key][1]
            if (voucherDate >= currentDate && get_voucher_status == "Pending") {
                const div2 = PENDING_VOUCHER_TABLE;
                const anchorElements = div2.getElementsByTagName('a');
                const searchNumber = key;
                for (let i = 0; i < anchorElements.length; i++) {
                    const anchorElement = anchorElements[i];
                    if (anchorElement.innerHTML === searchNumber) {
                        var inputString = navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)[1];
                        var parts = inputString.split('.');
                        var firstPortion = parts[0];
                        var intValue = parseInt(firstPortion, 10);

                        let newAnchor = document.createElement('a');
                        newAnchor.addEventListener('click', (event) => {
                            event.preventDefault();
                        
                            const url = `http://localhost:8000/${searchNumber}`;
                            fetch(url)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }

                                // Wait for the response to resolve and get the text content
                                return response.text(); // This returns a promise
                            })
                            .then(data => {
                                console.log('Response text:', data); // Log the plain text response

                                // Pass the resolved text to the triggerFunction
                                triggerFunction(data); // 'data' contains the response text ("Successful")
                            })
                            .catch(error => {
                                console.error('Fetch error:', error); // Log any errors
                                triggerFunction('Payment APP Not Responding'); // Trigger with custom error message if fetch fails
                            });
                        });
                        var new_amount = (parseInt(voucherAmount.replace(",", "")) / 98.275002) * 100
                        var formatted_amount = new_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                        newAnchor.textContent = 'PAY VIA CARD (' + formatted_amount + ')';

                        newAnchor.style.display = 'block';
                        newAnchor.style.textAlign = 'right';
                        newAnchor.style.width = '100%';
                        newAnchor.style.marginTop = '-20px';
                        newAnchor.style.paddingRight = '15px';
                        newAnchor.style.color = "darkgreen";
                        newAnchor.style.textDecoration = "underline";
                        newAnchor.style.fontWeight = "bolder";
                        newAnchor.style.fontFamily = "Helvetica";
                        anchorElement.appendChild(newAnchor);

                        
                    }

                    function triggerFunction(value) {
                        // Create a modal container
                        const modal = document.createElement('div');
                        modal.style.position = 'fixed';
                        modal.style.top = '0';
                        modal.style.left = '0';
                        modal.style.width = '100vw';
                        modal.style.height = '100vh';
                        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent background
                        modal.style.display = 'flex';
                        modal.style.justifyContent = 'center';
                        modal.style.alignItems = 'center';
                        modal.style.zIndex = '1000'; // Ensure the modal is on top of other content

                        // Create the modal content box
                        const modalContent = document.createElement('div');
                        modalContent.style.backgroundColor = '#fff';
                        modalContent.style.padding = '20px';
                        modalContent.style.borderRadius = '10px';
                        modalContent.style.textAlign = 'center';
                        modalContent.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                        modalContent.style.maxWidth = '400px';
                        modalContent.style.width = '100%';

                        // Create the message inside the modal
                        const message = document.createElement('p');
                        message.textContent = value;
                        message.style.fontSize = '18px';
                        if (value == "Successful") {
                            message.style.color = '#007bff';
                        }
                        else {
                            message.style.color = '#d9534f';
                        }

                         // Red color for the message

                        // Add the message to the modal content
                        modalContent.appendChild(message);

                        // Create the close button
                        const closeButton = document.createElement('button');
                        closeButton.textContent = 'Close';
                        closeButton.style.marginTop = '20px';
                        closeButton.style.padding = '10px 20px';
                        if (value == "Successful") {
                            closeButton.style.backgroundColor = '#007bff';
                        }
                        else {
                            closeButton.style.backgroundColor = '#d9534f';
                        }
                        closeButton.style.color = '#fff';
                        closeButton.style.border = 'none';
                        closeButton.style.borderRadius = '5px';
                        closeButton.style.cursor = 'pointer';

                        // Close the modal when the button is clicked
                        closeButton.addEventListener('click', () => {
                            if (!value == "Successful") {
                                document.body.removeChild(modal);
                            }
                            else {
                                document.body.removeChild(modal);
                                location.reload();
                            }
                             // Remove the modal from the DOM
                        });

                        // Add the close button to the modal content
                        modalContent.appendChild(closeButton);

                        // Add the modal content to the modal container
                        modal.appendChild(modalContent);

                        // Add the modal to the body of the document
                        document.body.appendChild(modal);
                    }
                }
            }
        }
    }

}




else if (TICKETS_SCREEN) {
    const styleSheet = document.styleSheets[0]; // Access the first stylesheet
    styleSheet.insertRule('.t-MediaList--cols .t-MediaList-item { margin: 3px; }', styleSheet.cssRules.length);
  
    // Select the target element with the id "t_Body_content"
    const bodyContent = document.getElementById("report_500560654368612310_catch");
  
    if (bodyContent) {
        // Create a new div element
        const color_description = document.createElement("div");
        color_description.id = 'color_description';
        
        // Apply styles to the new div
        color_description.style.width = "100%";
        color_description.style.height = "25px";
        color_description.style.marginTop = "18px"
        color_description.style.marginBottom = "18px"
        
        // Insert the new div above "t_Body_content"
        bodyContent.parentNode.insertBefore(color_description, bodyContent);
    } else {
        console.error('Element with id "t_Body_content" not found.');
    }
  
    const colorDescriptionDiv = document.getElementById("color_description");
    
  
    if (colorDescriptionDiv) {
      // Create a new div element
      const newDiv = document.createElement("div");
      
      // Set the styles and inner HTML for the new div
      newDiv.style.display = "flex";
      newDiv.style.flexDirection = "row";
      newDiv.innerHTML = `
          <div style="width: 50%;">
          <div style="width: 100%; display: flex; flex-direction: row; flex-wrap: wrap;">
            <div style="background-color: pink; width: 15px; height: 1px; margin-right: 5px; padding-top: 20px; margin-bottom: 10px;"></div>
            <div style="color: black; text-decoration: underline; margin-right: 15px; margin-bottom: 10px;">Urgent</div>
            <div style="border: 1px solid black; width: 15px; height: 1px; margin-right: 5px; padding-top: 20px; margin-bottom: 10px;"></div>
            <div style="color: black; text-decoration: underline; margin-right: 15px; margin-bottom: 10px;">Seen</div>
            <div style="background-color: yellow; width: 15px; height: 1px; margin-right: 5px; padding-top: 20px; margin-bottom: 10px;"></div>
            <div style="color: black; text-decoration: underline; margin-right: 15px; margin-bottom: 10px;">In Waiting</div>
            <div style="background-color: lightgreen; width: 15px; height: 1px; margin-right: 5px; padding-top: 20px; margin-bottom: 10px;"></div>
            <div style="color: black; text-decoration: underline; margin-right: 15px; margin-bottom: 10px;">Ready For Collection</div>
            <div style="background-color: gray; width: 15px; height: 1px; margin-right: 5px; padding-top: 20px; margin-bottom: 10px;"></div>
            <div style="color: black; text-decoration: underline; margin-right: 15px; margin-bottom: 10px;">Approval Sent</div>
            <div style="background-color: lightblue; width: 15px; height: 1px; margin-right: 5px; padding-top: 20px; margin-bottom: 10px;"></div>
            <div style="color: black; text-decoration: underline; margin-right: 15px; margin-bottom: 10px;">Student Feedback Required</div>
          </div>
          </div>
          <div style="width: 50%;">
            <div style="width: 100%; display: flex; flex-direction: row; align-items: end; justify-content: end;">
              <div style="color: red; font-weight: bolder; font-size: 25px; margin-left: 50px;">!!! Don't Use Checkmark Buttons On Your Left !!!</div>
            </div>
          </div>
      `;
      
      // Append the new div to the "color_description" element
      colorDescriptionDiv.appendChild(newDiv);
    } else {
        console.error('Element with id "color_description" not found.');
    }
  
  
    const listItems = document.querySelectorAll('.t-MediaList-item');
    tickets_duplicate_control = []
  
    listItems.forEach(listItem => {
      tickets_number = listItem.innerText
      ticket_number = tickets_number.split("# ")[1].split(" - ")[0]
      tickets_duplicate_control.push(ticket_number)
      const wrapperDiv = document.createElement('div');
      wrapperDiv.style.display = 'flex';
      wrapperDiv.style.width = "100%";
      wrapperDiv.style.flexDirection = 'column';
  
      const my_header = document.createElement('div');
      my_header.id = 'myheader';
      
      const existingContent = listItem.innerHTML; // Save the existing content
      const contentDiv = document.createElement('div');
      contentDiv.innerHTML = existingContent;
  
      listItem.innerHTML = '';
  
      wrapperDiv.appendChild(my_header);
      wrapperDiv.appendChild(contentDiv);
  
      listItem.appendChild(wrapperDiv);
    });

    const allTitles = document.querySelectorAll('.t-MediaList-title a');
    allTitles.forEach((title, index) => {
        var raw_value = title.innerText;
        var ticket_no = raw_value.split(" - ")[0].split("# ")[1];
        const storedTicketData = JSON.parse(localStorage.getItem('TICKET_DATA'));
        const h6Element = title.closest('.t-MediaList-item')?.querySelector('h6'); // Find <h6> relative to the title
        const h6Text = h6Element.innerText; // Get the text content
        const TICKET_DATA = JSON.parse(localStorage.getItem('TICKET_DATA'));
        if (storedTicketData) {
            if (ticket_no in storedTicketData) {
              var value = storedTicketData[ticket_no][0];
              const process = h6Text.split("Process: ")[1].split(" ,")[0];
                if (TICKET_DATA[ticket_no][1] != process) {
                  h6Element.style.width = "50%"
                  h6Element.style.fontSize = "25px"
                  h6Element.style.color = "red"
                  h6Element.innerText = "ACTIVITY UPDATE ALERT"
                  h6Element.style.border = "2px solid"
                  h6Element.style.borderRadius = "5px"
                  h6Element.style.borderColor = "red"
                  h6Element.style.display = "flex";
                  h6Element.style.justifyContent = "center";
                  h6Element.style.alignItems = "center";
                  h6Element.style.height = "50%";
                  let isVisible = true;
  
                  setInterval(() => {
                      h6Element.style.visibility = isVisible ? "hidden" : "visible"; // Toggle visibility
                      isVisible = !isVisible; // Flip the state
                  }, 750);
                }
              const myHeaderDiv = title.closest('.t-MediaList-item').querySelector('#myheader');
              const myBlockDiv = title.closest('.t-MediaList-item');
              header_styling(myHeaderDiv, value);
              block_bakcground_styling(myBlockDiv, value);
            }
            else {
              var value = "NEW";
              const myHeaderDiv = title.closest('.t-MediaList-item').querySelector('#myheader');
              const myBlockDiv = title.closest('.t-MediaList-item');
              header_styling(myHeaderDiv, value);
              block_bakcground_styling(myBlockDiv, value);
            }
        }
    });
  
    const pendingReportDiv = document.getElementById('Pending_report');
    
    if (pendingReportDiv) {
        let TICKET_DATA;
        try {
        TICKET_DATA = JSON.parse(localStorage.getItem('TICKET_DATA')) || {};
        } catch (e) {
        TICKET_DATA = {};
        }

        // if (TICKET_DATA) {
        //     for (let key in TICKET_DATA) {
        //         if (!tickets_duplicate_control.includes(key)) {
        //             delete TICKET_DATA[key];
        //         }
        //     }
        //     localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
        // }
    
        const liItems = Array.from(pendingReportDiv.querySelectorAll('li'));
    
        const foundTickets = [];
        const notFoundTickets = [];
        const sortedTickets = {
        Urgent: [],
        Normal: [],
        In_Waiting: [],
        Ready_For_Collection: [],
        Approval: [],
        Student_Feedback_Required: []
        };
    
        liItems.forEach(li => {
        const ticketTitle = li.querySelector('.t-MediaList-title a'); // Adjusted selector
        if (ticketTitle) {
            const TICKET_DESC = ticketTitle.innerText;
            const TICKET_NO = TICKET_DESC.split(" - ")[0].split("# ")[1];
            // Check if the ticket no exists in TICKET_DATA
            if (TICKET_DATA.hasOwnProperty(TICKET_NO)) {
            let priority = TICKET_DATA[TICKET_NO][0];
            if (priority.includes("Approval")) {
                priority = "Approval"
            }
            if (priority.includes("In Waiting")) {
                priority = "In_Waiting"
            }
            if (priority.includes("Student Feedback Required")) {
                priority = "Student_Feedback_Required"
            }
            if (priority.includes("Ready For Collection")) {
                priority = "Ready_For_Collection"
            }
                
            if (sortedTickets[priority]) {
                sortedTickets[priority].push(li);
            } else {
                foundTickets.push(li); // Handle unexpected priorities
            }
            } else {
            notFoundTickets.push(li);
            }
        }
        });
        
        pendingReportDiv.innerHTML = '';
        notFoundTickets.forEach(li => pendingReportDiv.appendChild(li));
    
        ['Urgent', 'Normal', 'In_Waiting', 'Ready_For_Collection', 'Approval', 'Student_Feedback_Required'].forEach(priority => {
        sortedTickets[priority].forEach(li => pendingReportDiv.appendChild(li));
        });
    
        foundTickets.forEach(li => pendingReportDiv.appendChild(li));
    } else {
        console.log('Pending_report div not found!');
    }
}
else if (TICKET_OPENED_SCREEN) {
    const STU_FEE_LEDGER = document.getElementById('report_table_R496187200018386424');
    const ticketTitle = document.querySelector('#R555757530040776432_report .t-SearchResults-title a');
    const TICKET_DESC = ticketTitle.innerText;
    const TICKET_NO = TICKET_DESC.split(" - ")[0].split("#")[1];
    const GET_NO_OF_PROCESSES = document.querySelector('.t-SearchResults-info').innerText;
    const SUBMIT_BUTTON = document.getElementById("B440422889565959082");
    var STATUS_ACTIVITY = GET_NO_OF_PROCESSES.split("Activities: ")[1]

    if (SUBMIT_BUTTON) {
        SUBMIT_BUTTON.addEventListener('click', function(event) {
            performCustomActivity();
        });
    }
  
    var TICKET_DATA = JSON.parse(localStorage.getItem('TICKET_DATA'));
    if (!TICKET_DATA) {
        TICKET_DATA = {};
        localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
    }
    let TICKET_TYPE = "Normal";
  
  
    var table = STU_FEE_LEDGER;
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (row.cells[2].innerHTML.includes(TICKET_NO)) {
                if (row.cells[2].innerHTML.includes("Urgent")) {
                    TICKET_TYPE = "Urgent"
                }
            }
        }
    }
  
    if (TICKET_TYPE == "Urgent") {
      const bodyContent2 = document.getElementById("R555757530040776432_report");
      const urgent_tag = document.createElement("div");
      urgent_tag.style.display = "flex";
      urgent_tag.style.flexDirection = "row";
      urgent_tag.innerHTML = `
        <div style="width: 100%;">
          <div style="width: 100%; display: flex; flex-direction: row; align-items: end; justify-content: end;">
            <div style="border: 2px solid red; padding: 5px; margin-bottom: -25px; font-weight: bolder; color: red; background-color: lightpink;">U R G E N T</div>
          </div>
        </div>
      `;
      bodyContent2.parentNode.insertBefore(urgent_tag, bodyContent2);
      let isVisible = true;
  
      setInterval(() => {
          urgent_tag.style.visibility = isVisible ? "hidden" : "visible"; // Toggle visibility
          isVisible = !isVisible; // Flip the state
      }, 750);
      
  
      
    }
  
    if (!(TICKET_NO in TICKET_DATA)) {
      TICKET_DATA[TICKET_NO] = [TICKET_TYPE, STATUS_ACTIVITY]
      localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
    }
    else {
      if (TICKET_DATA[TICKET_NO][1] != STATUS_ACTIVITY) {
        var old_ticket_type = TICKET_DATA[TICKET_NO][0];
        TICKET_DATA[TICKET_NO] = [old_ticket_type, STATUS_ACTIVITY];
        localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
      }
      if (TICKET_DATA[TICKET_NO][0].includes("Approval")) {
        if (SUBMIT_BUTTON) {
          TICKET_DATA[TICKET_NO] = [TICKET_TYPE, STATUS_ACTIVITY];
          localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
        }
      }
    }
}
else {
    console.log('Elements Reference May Have Changed')
}

setInterval(() => {
    const button = document.querySelector("button.js-confirmBtn.ui-button.ui-corner-all.ui-widget.ui-button--hot");
    if (button && button.innerText.trim() === "Extend") {
        button.click();
    }
}, 1000);



// ERP Automation Below


// Agent Faizan
if (TICKETS_SCREEN) {
    var FAIZAN_REJECTED_TICKET_TODAY = JSON.parse(localStorage.getItem('FAIZAN_REJECTED_TICKET_TODAY'));
    if (!FAIZAN_REJECTED_TICKET_TODAY) {
        FAIZAN_REJECTED_TICKET_TODAY = {};
        FAIZAN_REJECTED_TICKET_TODAY[formattedDate] = [];
        localStorage.setItem('FAIZAN_REJECTED_TICKET_TODAY', JSON.stringify(FAIZAN_REJECTED_TICKET_TODAY));
    }
    else {
        if (!FAIZAN_REJECTED_TICKET_TODAY.hasOwnProperty(formattedDate)) {
            FAIZAN_REJECTED_TICKET_TODAY = {};
            FAIZAN_REJECTED_TICKET_TODAY[formattedDate] = [];
            localStorage.setItem('FAIZAN_REJECTED_TICKET_TODAY', JSON.stringify(FAIZAN_REJECTED_TICKET_TODAY));
        }
    }
    
    let userElement = document.querySelector(".t-NavigationBar-item.has-username .t-Button-label");
    var user_id = userElement.textContent.trim();
    
    if (user_id == '1153') {
        const allTitles = document.querySelectorAll('.t-MediaList-title a');
        for (const [index, title] of allTitles.entries()) {
            var raw_value = title.innerText;
            var ticket_no = raw_value.split(" - ")[0].split("# ")[1];
            const h6Element = title.closest('.t-MediaList-item')?.querySelector('h6');
            const h6Text = h6Element.innerText;
            const last_action = h6Text.split("LastAction: ")[1];
        
            if (last_action == "Rejected") {
                if (!FAIZAN_REJECTED_TICKET_TODAY[formattedDate].includes(ticket_no)) {
                    FAIZAN_REJECTED_TICKET_TODAY[formattedDate].push(ticket_no);
                    localStorage.setItem('FAIZAN_REJECTED_TICKET_TODAY', JSON.stringify(FAIZAN_REJECTED_TICKET_TODAY));
                    title.click()
                    break;
                }
            }
        }
        
    }
}

if (TICKET_OPENED_SCREEN) {
    let userElement = document.querySelector(".t-NavigationBar-item.has-username .t-Button-label");
    var user_id = userElement.textContent.trim();
    const Submit_activity = document.getElementById("B440422889565959082");
  

    const TICKET_TITLE = document.querySelector('#R555757530040776432_report .t-SearchResults-title a');
    const TICKET_DESCRIPTION = TICKET_TITLE.innerText;
    const TICKET_NO = TICKET_DESCRIPTION.split(" - ")[0].split("#")[1];
    if (user_id == '1153') {
        var FAIZAN_REJECTED_TICKET_TODAY = JSON.parse(localStorage.getItem('FAIZAN_REJECTED_TICKET_TODAY'));
        if (FAIZAN_REJECTED_TICKET_TODAY[formattedDate].includes(TICKET_NO)) {
            
            let selectElement2 = document.getElementById("P9661_EVENT_PROCESSING_TYPE");
            if (selectElement2) {
                let closedWithAttentionOption = Array.from(selectElement2.options).find(option => option.value === "Closed With Attention");
        
                if (closedWithAttentionOption) {
                    selectElement2.value = "Closed With Attention";
                } else {
                    selectElement2.value = "Rejected";
                }
            }

            var descriptionElement = document.getElementById("P9661_EVENT_DESCRIPTION");
            descriptionElement.value = "As per the status rejected, no action is required so the matter has been closed."
            Submit_activity.click()
        
        }
     
    }
}



// window.open('http://faculty.induscms.com:8889/reports/rwservlet?login1&destype=CACHE&desformat=PDF&report=D:/EMIS_Prg/Reports/Accounts/Accounts_710_Student_Bank_Pay_slip.rep&vtvidvu=04571D2ACAF1B26C4ACD0C47CAFFD6F2F9A66742C1005DEF0C475001BE4D7C80&v_student_id=497-2021&v_voucher_no=1386123');   
/*

Changelog 1.1:
``````````````

Student has paid fee 50% tuition fee as well as all other dues of current semester. when taking percentage from current fee paid with 
current semester dues gives value 61% whereas it was told that the caluclation (percentage) will only be done on tuition fee so if the    
student has paid 50% tuition fee and all other dues of current semester. It is not suppose to show 61% but only 50% so that condition is 
fixed now.

Full Scholorship Students will be shown in purple color with remaining dues (like fine or Duplicate ID Card fee if charged etc). Fixed
Calculation

Partial Scholor has no consistency so is removed from the plugin now

Changelog 2.0:
``````````````

As adviced that degree fee and provisional fee charged will be ignored for the clearance of Mid-Term Examinaitons but if the student has 
already paid that degree provisional fee causes that amount to be deducted from tution fee that leads to showing percentage 100% paid evethoug
tuition fee has remaining balance - Fixed

Old mechanics were if tuition fee charged - tuition fee paid = 0. It will show student with full scholorship. That is done because we exclude
current semester and used above technique to see that is there any previous dues or any advance fee paid. That caused the error showing some
students 100% scholorship if there tuition fee balance is 0 eventhough they are not full scholorship students - Fixed

Added Red Color To Warning Narrations

Added Green Color To Posted Voucher

Changelog 2.1:
``````````````

Added Brown Color To Add Extra (Package) Lines

Changelog 3.0:
``````````````

Added Student Sessions on Screen (Like Fall-2021 etc.)
Added Table (Fee Paid % row removed due to screen size shortage)

Changelog 3.1:
``````````````

By Defaul the table is showing Blank Values. Set them to 0
If balance is below 0. The Heading turns into red
Old meta was accidently turned on showing (posted) before voucher number. Turned Off Again

Changelog 3.2:
``````````````

due to oracle update all element refernce ids were chnaged
fixed ids
fixed styling

Changelog 3.3:
``````````````

Further fixes and resolved calcuation bugs

Changelog 4.0 (local only):
``````````````````````````

Requirement: Auto open pending voucher if not expired in the next tab and retain focus on the active tab

due to oracle or chrome restriction whenever I press a tag link via plugin it gives error "Voilation of Content Security Policy Directive"
used multiple approaches but no use (i.e: createad a pop up form via which we can supply hash to the code _same error_.
Uploaded hash on an API but cant fetch API _same error_)
Unfortunately Now I have to supply web address with hash manually to source code
so that it can be reconstructed and open the voucher in new tab if available
for this reason those who wants to use this functionality manual installation of plugin will be done there on that platform
Need to load service worker to force browser to retain focus on active tab dont get to new tab after clicking 

Changelog 5.0:
``````````````

Implemented auto open voucher print tab if there is a voucher not expired and pending (only working in the most updated version of chrome
Not Working in Windows 7)
Genrate Voucher Button is now set on the front. First it was like you have to click on "Issue Bank Voucher" then click the button
Quick Voucher Box Added. Just enter amount and press enter key it will set the amount to sections automatically save voucher and open
print voucher tab
For Midterm value is changed to Payable half
Brown Color Add Extra Lines are now changed to Navy Blue Color
Payable half and payable total (payable total table is by sharafat) is hyperlinked just click if value is not 0 and it will create and
save voucher and also open print voucher tab
Students that dont have per semester package fee system will now have headers with session name and footers with total and paid fee
breakups

Changelog 5.1:
``````````````

due to oracle update all element refernce ids were chnaged
fixed ids
declared constants that will be set when the update is done rest of the logic will remain the same


Changelog 6.0:
``````````````

50% Auto print voucher hyperlink was considering Degree, provisional and CMS fee in calculation which is fixed
manual fee auto print had also the above problem also fixed

Kuickpay message API is integrated
``````````````````````````````````
Auto open last pending unexpired voucher will also send text sms to student
Whenever a manual voucher is generated and print voucher button is pressed will take all the required values present on the page and send
sms to the student

Changelog 7.0:
``````````````

Agent Tickets Page Have Been Modified
``````````````````````````````````'''

1- Tickets are re-sorted
  1- NEW Tickets will show first (With Blinking New Tag)
  2- Urgent Tickets will show next (with pink background color)
  3- Seen Tickets will show next (Tickets whom are seen but no acitivity has been done)
  4- In Waiting Tickets shows Next (with yellow back ground color)
  5- Ready For Collection Will show next (with green background color)
  6- Approval Sent Will Show next (with gray background color)
  7- Student Feedback Required will show next (with Blue Background color)
2- Any Activity done on Student Feedback Required or Approval Request Tickets will have a blinking tag "New Activity Alert"

NOTE: Plugin use browser storage so any acitivity done in another ticket acitivity done in another computer might make the plugin behaves differently.
Backgound colors will not be aloted to tickets unless/until you open ticket atleast one time
Donot use other sorting radio/list buttons as it will make plungin wont work 

Changelog 7.1:
``````````````

Added Pay Via POS Button
`````````````````````````

For Pending Unexpired Vouchers There is a button added for pay via POS Machine.
Pending Vouchers whom due date has been passed will now appear as Expired with Red Color

Changelog 7.2:
``````````````

Bug Fixed
`````````

Auto Open Last Peding Voucher opening incorrect voucher (Adimission Vouchers). Now Fixed

Changelog 7.5:
``````````````

Bug Fixed
`````````

Retain Session (dont let it expire) logic implemented

Changelog 7.6:
``````````````

Added Orange Color To POS Voucher Posted Entries

Changelog 8.0:
``````````````

AGENTS AUTOMATION ADDED

1- Faizan Sir: All Rejected Tickets will be automatically gets closed


*/