const el = document.getElementById('R312550953030404706_heading');

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
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


    document.getElementById('R312550953030404706_heading').style.fontFamily = "'Helvetica Neue','Segoe UI',Helvetica,Arial,sans-serif";
    document.getElementById('R312550953030404706_heading').style.color = "#A020F0";
    document.getElementById('R312550953030404706_heading').style.fontWeight = "700";
    document.getElementById('R312550953030404706_heading').style.fontSize = "inherit";
    document.getElementById('R312550953030404706_heading').style.marginLeft = "45px";
    
    
    // Main Engine (For All Values Collection)
    
    final_session = "";
    missing_itteration = 0
    tuition_fee_charged = 0
    tuition_fee_paid = 0
    current_semester_tuition_fee_charged = 0
    current_semester_tuition_fee_paid = 0
    posted_voucher = []
    rows_to_insert = {};
    per_semester_fee_charged =  new Map();
    filter_per_semester_fee_charged = []
    rows_with_total_tuition_fee = {}
    remaining_balance = 0;  
    other_values_charged = 0;
    other_values_paid = 0;  
    temp = 0;
    is_it_last_package = false
    last_package = 0
    
    var table = document.getElementById("report_table_R312545805814404689");
    var referenceRow = table.rows[0];
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {  
            
            if (row.cells[4].innerHTML.includes('</strong>')) {}
            else {  
                if (row.cells[4].innerHTML == "Tuition Fees") {   
                    removing_comas = row.cells[5].innerHTML.replace(",", "");         
                    tuition_fee_charged += removing_comas/8                                            
                }
            }
            if (row.cells[4].innerHTML.includes('</strong>')) {}
            else {  
                if (row.cells[4].innerHTML == "Tuition Fees") { 
                    removing_comas = row.cells[6].innerHTML.replace(",", "");   
                    tuition_fee_paid += removing_comas/8   
                    
                }
            } 
            
            if (row.cells[3].innerHTML.includes('</strong>')) {}
            else {                  
                if (row.cells[3].innerHTML == "Package") {

                    if (!is_it_last_package) {
                        last_package = 0
                    }
                    is_it_last_package = true                     
                }
                
                if (is_it_last_package) {
                    if (row.cells[3].innerHTML == "Package") {
                        removing_comas = row.cells[5].innerHTML.replace(",", "");
                        last_package += parseInt(removing_comas) / 8
                    }
                    else {
                        is_it_last_package = false
                    }

                }
            }                      
            
            if (row.cells[2].innerHTML.includes('</strong>') || row.cells[2].innerHTML == "") {}
            else{
                if (row.cells[2].innerHTML == final_session) {
                    rows_to_insert[final_session] = i
                    removing_comas = row.cells[5].innerHTML.replace(",", "");
                    current_semester_tuition_fee_charged += removing_comas / 8
                    missing_itteration = removing_comas / 8
                    var key = final_session;
                    var value = current_semester_tuition_fee_charged;                    
                    per_semester_fee_charged.set(key, value);
                    
                }
                else{
                    current_semester_tuition_fee_charged = 0
                    
                }
            }
            if (row.cells[2].innerHTML == "<strong></strong>" || row.cells[2].innerHTML == "" || row.cells[2].innerHTML == "") {                                      
            }            
            else{
                
                final_session = row.cells[2].innerHTML;
            }
            if (row.cells[2].innerHTML != final_session && row.cells[4].innerHTML == "Tuition Fees") {
                removing_comas = row.cells[6].innerHTML.replace(",", "");
                current_semester_tuition_fee_paid += removing_comas / 8
                
                
            }
            else {
                if (row.cells[2].innerHTML != "<strong></strong>") {
                        current_semester_tuition_fee_paid = 0
                }
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
        } 
    }

   
    
    if (final_session == "") {
        final_session = "No Session"
    }

    for (var key in per_semester_fee_charged) {
        per_semester_fee_charged[key] += missing_itteration;
      }
      per_semester_fee_charged.forEach((value) => {
        filter_per_semester_fee_charged.push(value + missing_itteration)
        
      });

      for (var key in rows_to_insert) {
        var value = rows_to_insert[key];
        if (filter_per_semester_fee_charged.length > 0) {
          rows_with_total_tuition_fee[value] = filter_per_semester_fee_charged.shift();
        }
      }

    console.log(rows_with_total_tuition_fee);


    // Setting up variables for further calculation

    

    current_semester_tuition_fee_charged += missing_itteration 
    dues_status = other_values_charged - other_values_paid
    tuition_fee_status = current_semester_tuition_fee_charged - (tuition_fee_charged - tuition_fee_paid)
    current_semester_fee = current_semester_tuition_fee_charged + last_package
    advance_tuition_fee = 0
    previous_tuition_fee = 0 
    advance_other_fee = 0
    previous_other_fee = 0
    current_state = (current_semester_tuition_fee_charged / 2 ) - advance_tuition_fee - advance_other_fee + previous_tuition_fee
   
    
    if (tuition_fee_status > 0) {
        advance_tuition_fee = tuition_fee_status - current_semester_tuition_fee_paid
    }
    else if (tuition_fee_status < 0) {
        previous_tuition_fee = 0 - (tuition_fee_status)
    }

    if (dues_status < 0) {
        advance_other_fee = 0 - (dues_status - last_package)
    }
    else if (dues_status > 0) {
        previous_other_fee = dues_status - last_package
    }

    console.log("Tuition Fee Status: " + tuition_fee_status)
    console.log("Previous Tuition Fee: " + previous_tuition_fee)
    console.log("advance_tuition_fee: " + advance_tuition_fee)
    console.log("advance_other_fee: " + advance_other_fee)
    console.log("previous_other_fee: " + previous_other_fee)    
    console.log("50% Tuition Fee: " + current_state)
    console.log("dues_status: " + dues_status)
    console.log("Tuition Fee Total: " + tuition_fee_charged)
    console.log("Tuition Fee Paid: " + tuition_fee_paid)
    console.log("Current Semester Fee Charged: " + (current_semester_tuition_fee_charged + last_package))    
    console.log("Remaining Balance: " + remaining_balance)
    console.log("final_session: " + final_session)
    console.log("current_semester_tuition_fee_charged: " + current_semester_tuition_fee_charged)
    console.log("Current Semester Tuition Fee Paid: " + (current_semester_tuition_fee_paid))
    console.log("Other Values Charged: " + other_values_charged)
    console.log("Other Values Paid: " + other_values_paid)
    console.log("Last Package: " + last_package)
    
    
    
    
    
    
    
   
    
    // If Student is on full Scholorship there is no concept of 50% fee or 100% fee

    full_scholorship = true;
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (row.cells[4].innerHTML == "Tuition Fees"){                
                full_scholorship = false;
                break;
            }
        }
    }
    if (full_scholorship == false) {    
        sum = tuition_fee_charged;
        if (sum == 0) {
            full_scholorship = true
        }
    }
    
    
     

    // Setting exception for degree provisional and cms fee while 50% fee calculation

    degree_provisional_cms_charged = 0;
    degree_provisional_cms_paid = 0;
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {            
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
        }
    }     
    
    

    
    // Display Values in Blocks (The Table Created above)

    if (full_scholorship == true) {        
        document.getElementById('R312550953030404706_heading').style.color = "#8F00FF";
        document.getElementById('R312550953030404706_heading').style.marginLeft = "9px";
        document.getElementById('R312550953030404706_heading').textContent = "Full Scholorship" + " - (For Mid: " + (remaining_balance).toLocaleString("en-US") + ")";
    }
    else { 
        if (current_state < 0){
            percentage_section = 100;
            document.getElementById('R312550953030404706_heading').style.color = "#0000FF";
        }
        else {
            percentage_section = Math.max(Math.round((current_semester_tuition_fee_charged - remaining_balance) / current_semester_tuition_fee_charged * 100), 0);
            if (percentage_section >= 50) {
                document.getElementById('R312550953030404706_heading').style.color = "#0000FF";  
            } 
            else {
                document.getElementById('R312550953030404706_heading').style.color = "#404040"; 
            }
        }
        fify_percent_tuition_fee = Math.round(Math.abs(Math.round(Math.max((current_state - current_semester_tuition_fee_paid), 0))));
        for_mid_required = Math.max((remaining_balance - (current_semester_tuition_fee_charged / 2)), 0);
        document.getElementById('R312550953030404706_heading').textContent =  final_session + " (" + percentage_section.toLocaleString("en-US") + "%)"
        tuitionFeeElement.textContent = fify_percent_tuition_fee.toLocaleString("en-US");
        forMidElement.textContent = for_mid_required.toLocaleString("en-US"); 
        
    }

    
    // Set Green Color To Add Extra Lines
    
    var table = document.getElementById("report_table_R312545805814404689");
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 1, col; col = row.cells[j]; j++) {
            if (row.cells[1].innerHTML == "" && row.cells[2].innerHTML == "") {
                if (row.cells[3].innerHTML != "Package") {
                    row.cells[3].style.color = "brown";
                    row.cells[3].style.fontWeight = "750";
                }
            }            
        }
    }
    
    
    
    // Set Green Color To Posted Voucher)

    elements = document.getElementsByTagName("td")
    for (var i = elements.length; i--;) {
        if (elements[i].innerHTML.toUpperCase().includes('WARNING')) {
            elements[i].style.color = "red";
            elements[i].style.fontWeight = "750";
        }
        if (elements[i].innerHTML.includes('Posted')) {
            elements[i].style.color = "green";
            elements[i].style.fontFamily = "Arial";
            elements[i].style.fontWeight = "900";
            elements[i].style.fontSize = "15px";
        }        
    }


    
    // Inserting Rows After Session and adding Total semester tuition fee in the row
    adjuster = 1
    for (var key in rows_with_total_tuition_fee) {
        var value = rows_with_total_tuition_fee[key]; // Get the value associated with the key
        var rowIndex = parseInt(key); // Assuming the value is a valid row index
    
        var newRow = table.insertRow(rowIndex + adjuster);
        adjuster += 1
        var newCell = newRow.insertCell(0);
        newCell.colSpan = table.rows[0].cells.length;

        newCell.innerHTML = "Total Tuition Fee: " + value;
        newCell.style.textAlign = "center";
        newCell.style.backgroundColor = "#add8e6";
        newCell.style.padding = "5px";
        
    }

   
    // Auto open voucher if pending and not expired (Not Working Policy Voilation!!!!)
    
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
    }

    if (voucher_found) {
        const div2 = document.getElementById('report_table_R312567687309404769');
        const anchorElements = div2.getElementsByTagName('a');
        const searchNumber = get_voucher;
        

        for (let i = 0; i < anchorElements.length; i++) {
        const anchorElement = anchorElements[i];

            if (anchorElement.innerHTML === searchNumber) {
                const print_voucher = anchorElement;        
                // print_voucher.click(); // voilates policy C.S.P directive, Need Hash
                break;
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

*/