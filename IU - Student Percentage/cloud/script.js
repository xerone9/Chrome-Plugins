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
  
    var cellStyle = "text-align: center; background-color: black; padding: 5px; color: white;";
  
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
  
    var cellStyle = "text-align: center; background-color: white; padding: 5px; color: black;";
  
    
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

    // creating table

    const oldDivElement = document.getElementById('R312550953030404706_heading');
    const parentElement = oldDivElement.parentNode;

    const newDivElement = document.createElement('div');
    newDivElement.setAttribute('class', 'my-class');
    newDivElement.setAttribute('id', 'my-id');

    const tableElement = document.createElement('table');
    tableElement.setAttribute('class', 'my-table'); // Add class to table element

    const rowTwoElement = document.createElement('tr');
    const cellThreeElement = document.createElement('td');
    cellThreeElement.textContent = '50% Tuition Fee'; 
    cellThreeElement.style.columnWidth = "132px"      
    const tuitionFeeElement = document.createElement('td');
    tuitionFeeElement.textContent = '';
    tuitionFeeElement.style.columnWidth = "78px" 
    tuitionFeeElement.style.textAlign =  "end";
    rowTwoElement.appendChild(cellThreeElement);
    rowTwoElement.appendChild(tuitionFeeElement);
    tuitionFeeElement.textContent = "0";

    const rowThreeElement = document.createElement('tr');
    const cellFiveElement = document.createElement('td');
    cellFiveElement.textContent = 'For Midterm';    
    const forMidElement = document.createElement('td');
    forMidElement.textContent = '';
    forMidElement.style.textAlign =  "end";
    rowThreeElement.appendChild(cellFiveElement);
    rowThreeElement.appendChild(forMidElement);
    forMidElement.textContent = "0";

    tableElement.appendChild(rowTwoElement);
    tableElement.appendChild(rowThreeElement);

    newDivElement.appendChild(tableElement);
    insertAfter(newDivElement, oldDivElement);

    // Styling Table
    
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    .my-table {
        border-collapse: collapse;        
        border-color: #262626;
        font-family: 'Helvetica Neue','Segoe UI',Helvetica,Arial,sans-serif;
        font-weight: lighter;
        
    }
    .my-class {
        margin-top: 10px; 
        margin-bottom: 0px; 
        margin-left: -10px;
        font-size: 0.75rem;       
    }
    .my-table td {
        border: 1px solid black;
        padding: 8px 16px;
        border-color: #e6e6e6;              
    }
    `;
    document.head.appendChild(styleElement);
    
    

    document.querySelectorAll('.t-Region-headerItems.t-Region-headerItems--buttons').forEach(function(element) {
        element.remove();
    });
    
    document.querySelectorAll('.t-Region-headerItems--title').forEach(function(element) {
        element.style.display = 'block';
        element.style.marginRight = '-15px';
    });
    cellThreeElement.style.paddingLeft = '10px'
    cellFiveElement.style.paddingLeft = '10px'


    // Get Package Type (Either it is A session that has computer and library charged per semester or either is the semester which has only tuition fee)
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
                if (!package_row_found) {
                    if (
                        row.cells[3].innerHTML === 'Package' &&
                        row.cells[4].innerHTML !== 'Degree Fees' &&
                        row.cells[4].innerHTML !== 'Provisional Certificate Fee' &&
                        row.cells[4].innerHTML !== 'CMS Fees'
                    ) {
                    package_row_found = true;
                    }
                }               
                if (package_row_found) {    
                    if (row.cells[3].innerHTML != 'Package') {    
                        var key = session;
                        var value = i;                    
                        headers.set(key, value);
                        package_row_found = false                                              
                    }
                }
                if (row.cells[2].innerHTML.includes('Summer')) {
                    summer_row_found = true
                }
                if (summer_row_found) {
                    if (row.cells[2].innerHTML.includes('Summer')) {}
                    else {
                        var key = session;
                        var value = i;                    
                        headers.set(key, value);
                        summer_row_found = false 
                        session = "Spring"
                    }
                }
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
    newCell.style.backgroundColor = "#922D2D";
    newCell.style.text = "#922D2D";
    newCell.style.padding = "5px";
    newCell.style.color = "white";
    newCell.style.fontWeight = "bold";
    
    }

    // first row
    var newRow = table.insertRow(1);
    var newCell = newRow.insertCell(0);
    newCell.colSpan = table.rows[0].cells.length;

    newCell.innerHTML = session;
    newCell.style.textAlign = "center";
    newCell.style.backgroundColor = "#922D2D";
    newCell.style.padding = "5px";
    newCell.style.color = "white";
    newCell.style.fontWeight = "bold";

    
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
    var key = current_semester;
    var value = current_semester_details; 
    all_seession_details.set(current_semester, value);
    styledRow(table.rows.length - 1); 
    styledRow2(table.rows.length - 1, key, all_seession_details);


    console.log(all_seession_details)
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

 


    // All rows except frist and last

    // adjustment = 4
    // for (let [key, value] of headers.entries()) {
    //     var current_session = key;
    //     var rowIndex = parseInt(value);

    //     let previousKey = null;

    //     for (let key of all_seession_details.keys()) {
    //     if (key === current_session) {            
    //         break;
    //     }
    //     previousKey = key;
    //     }

    //     // var sessionData = all_seession_details.get(key);
        
    //     styledRow2(rowIndex + adjustment, previousKey, all_seession_details);
    //     styledRow(rowIndex + adjustment); 
    //     adjustment -= 1
        
        
        
        
    //     }
    
    
    // package_row_found = false
    

    // for (var i = table.rows.length - 1; i > 0; i--) {
    //     var row = table.rows[i];
    //     for (var j = row.cells.length - 1; j >= 0; j--) {
    //       var col = row.cells[j];
    //         if (package_type) {
    //             if (!package_row_found) {
    //                 if (row.cells[3].innerHTML == 'Package') {
    //                     package_row_found = true
    //                 } 
    //             }               
    //             if (package_row_found) {
                    
    //                 if (row.cells[3].innerHTML != 'Package') { 
    //                     var newRow = table.insertRow(i);
    //                     var newCell = newRow.insertCell(0);
    //                     newCell.colSpan = table.rows[0].cells.length; 
    //                     package_row_found = false                                                
    //                 }
                    
    //             }
    //         }

    //     }
    // }
      

   
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

*/