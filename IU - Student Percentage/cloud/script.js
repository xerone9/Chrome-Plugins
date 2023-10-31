const el = document.getElementById('R312550953030404706_heading');

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
  
    var cellStyle = "text-align: center; background-color: #E6E6E6; padding: 5px; color: black; font-weight: bold; border: 2px solid black;";
  
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
  
    var cellStyle = "text-align: center; background-color: white; padding: 5px; color: black; border: 2px solid black;";
  
    
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

if (el !== null) { 
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


    const student_id = document.querySelector("input[name='P0_V_DIRECT_STUDENT_ID']");

    var table = document.getElementById("report_table_R312550953030404706");
    var negate_value = 0

    if (table) {        
        for (var i = 1, row; row = table.rows[i]; i++) {    
            for (var j = 0, col; col = row.cells[j]; j++) {
                if (!row.cells[0].innerHTML.includes("strong")){
                    if (row.cells[0].innerHTML != "Tuition Fees") {
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
            var table = document.getElementById("report_table_R312552596540404712");

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
                                    }
                                }

                                if (auto_print_fifty_percent) {
                                    inputElement.value = Fifty_percent_input;
                                }

                                if (auto_print_manual_fee) {
                                    var table = document.getElementById("report_table_R312552596540404712");
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
                                        } 
                                    }
                                    
                                }

                                var applyChangesElement = document.getElementById("B285624613739261496");
                                var printVoucherElement = document.getElementById("B285625038691261498");
                                

                                if (applyChangesElement) {
                                    applyChangesElement.click();
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
                }
            } else {
                console.log("Table not found");
            }
        }
        if (print_voucher){
            var printVoucherElement = document.getElementById("B285625038691261498");
            if (printVoucherElement) {
                printVoucherElement.click();
                localStorage.setItem('print_voucher', false);
                localStorage.setItem('manual_fee_amount', null);
                quickVoucher.value = null;
            }     
        }
        
       
    };


    var table = document.getElementById("report_table_R312550953030404706");

    
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



    // const oldDivElement = document.querySelector('.t-Region-headerItems t-Region-headerItems--buttons');
    const oldDivElement = document.getElementById('R312550953030404706_heading');
    const parentElement = oldDivElement.parentNode;

    const newDivElement = document.createElement('div');
    newDivElement.setAttribute('class', 'my-class');
    newDivElement.setAttribute('id', 'my-id');

    const tableElement = document.createElement('table');
    tableElement.setAttribute('class', 'my-table'); // Add class to table element

    // Create first row
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



    document.getElementById('R312550953030404706_heading').style.fontFamily = "'Helvetica Neue','Segoe UI',Helvetica,Arial,sans-serif";
    document.getElementById('R312550953030404706_heading').style.color = "#A020F0";
    document.getElementById('R312550953030404706_heading').style.fontWeight = "700";
    document.getElementById('R312550953030404706_heading').style.fontSize = "inherit";
    document.getElementById('R312550953030404706_heading').style.marginLeft = "45px";

    elements = document.getElementsByTagName("td")
    for (var i = elements.length; i--;) {        
        if (elements[i].innerHTML.includes('Posted')) {
            elements[i].style.color = "green";
            elements[i].style.fontFamily = "Arial";
            elements[i].style.fontWeight = "900";
            elements[i].style.fontSize = "15px";
        }        
    }    

    var originalButton = document.getElementById("B285624227564261496");
    var referenceElement = document.getElementById("R312550953030404706_heading")

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

    // Get the table element by its ID
    var table = document.getElementById("report_table_R312550953030404706");
    var negate_value = 0

    if (table) {        
        for (var i = 1, row; row = table.rows[i]; i++) {    
            for (var j = 0, col; col = row.cells[j]; j++) {
                if (!row.cells[0].innerHTML.includes("strong")){
                    if (row.cells[0].innerHTML != "Tuition Fees") {
                        removing_comas = row.cells[1].innerHTML.replace(",", "");
                        negate_value += parseInt(removing_comas) / 2; 
                    }
                }
            }
        }
    }

    


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
    var table = document.getElementById("report_table_R312545805814404689");
    var arr = new Array();
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {  
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
            if (row.cells[4].innerHTML != "Tuition Fees" && row.cells[4].innerHTML != "Degree Fees" && row.cells[4].innerHTML != "CMS Fees" && row.cells[4].innerHTML != "Provisional Certificate Fee") {
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
            if (row.cells[4].innerHTML == "Degree Fees" || row.cells[4].innerHTML == "CMS Fees" || row.cells[4].innerHTML == "Provisional Certificate Fee") {                              
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
    
    var table = document.getElementById("report_table_R312545805814404689");
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
        document.getElementById('R312550953030404706_heading').style.color = "#8F00FF";
        document.getElementById('R312550953030404706_heading').style.marginLeft = "9px";
        document.getElementById('R312550953030404706_heading').textContent = "Full Scholorship" + " - (For Mid: " + (remaining_balance).toLocaleString("en-US") + ")";
    }
    else {         
        document.getElementById('R312550953030404706_heading').style.color = "#404040";
        document.getElementById('R312550953030404706_heading').textContent =  final_session + " (" + Math.round(result).toLocaleString("en-US") + "%)"
        tuitionFeeElement.textContent = Math.abs(Math.round(needed)).toLocaleString("en-US");
        forMidElement.textContent = required.toLocaleString("en-US");
    if (result >= 50) {
        document.getElementById('R312550953030404706_heading').style.color = "#0000FF";
    }
    else if (result < 0) {
        document.getElementById('R312550953030404706_heading').style.color = "#FF0000";
    }
    else {
        document.getElementById('R312550953030404706_heading').style.color = "#404040";
    }    
    }



    package_type = false
    var table = document.getElementById("report_table_R312545805814404689");
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) { 
            if (row.cells[3].innerHTML == 'Package') {                
                if (row.cells[4].innerHTML != 'Admission Fees' && row.cells[4].innerHTML != 'Verification of Eligibility Document  Fees') {   
                    package_type = true
                }
            } 
        }
    }

    // Set headers as per session (Fall-2023 etc)
    headers =  new Map();
    package_row_found = false
    course_row_found = false
    course_row_adjustment = false
    summer_row_found = false
    session = "none"
    var table = document.getElementById("report_table_R312545805814404689");
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




    
    
    var get_student_id = localStorage.getItem('student_id');
    if (get_student_id != student_id.value) {
        localStorage.setItem('student_id', student_id.value);
        const div = document.getElementById('report_table_R312567687309404769');
        const tdElements = div.getElementsByTagName('td');
        let foundAnchor = false;
        const vouchers = {};
        let scount = 0;
        let voucher_found = false;

        for (let i = 0; i < tdElements.length; i++) {
        const tdElement = tdElements[i];
        const anchorElement = tdElement.querySelector('a');

        if (anchorElement) {
            if (foundAnchor) {
            scount = i; 
            }

            const voucher_status = tdElements[scount + 3].innerHTML;
            const voucher_expiry = tdElements[scount + 7].innerHTML;
            const key = anchorElement.innerHTML;
            const valueToAppend = [voucher_expiry, voucher_status];

            if (!vouchers.hasOwnProperty(key)) {
            vouchers[key] = valueToAppend;
            }

            foundAnchor = true;
        }
        }


        const currentDate = new Date();
        get_voucher = '';

        for (const key in vouchers) {
        const voucherDate = new Date(vouchers[key][0]);
        const get_voucher_status = vouchers[key][1]
        if (voucherDate >= currentDate && get_voucher_status == "Pending") {
            get_voucher = key;
            voucher_found = true;
            break;
        }
            else {
                
            }
        }

        if (voucher_found) {
            const div2 = document.getElementById('report_table_R312567687309404769');
            const anchorElements = div2.getElementsByTagName('a');
            const searchNumber = get_voucher;
            

            for (let i = 0; i < anchorElements.length; i++) {
            const anchorElement = anchorElements[i];
                if (anchorElement.innerHTML === searchNumber) {
                    const print_voucher = anchorElement; 
                    try{    
                        print_voucher.click();  
                        break;
                    }
                    catch {
                        console.log("Auto Print Peding Voucher Not Working")
                        alert(searchNumber + " in Pending Vouchers");
                        break;
                    }
                }
            }
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
alrady paid that degree provisional fee causes that amount to be deducted from tution fee that leads to showing percentage 100% paid evethoug
tuition fee has remaining balance - Fixed

Old mechanics were if tuition fee charged - tuition fee paid = 0. It will show studnet with full scholorship. That is done because we exclude
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
Payable half and payable total (payable total table is by sharafat) is hyperlinked just click if value is not 0 and it will create and
save voucher and also open print voucher tab
Students that dont have per semester package fee system will now have headers with session name and footers with total and paid fee
breakups

*/