const el = document.getElementById('R26939838904143271_heading');

if (el !== null) {
    final_session = "";
    tuition_fee_charged = []
    posted_voucher = []
    remaining_balance = 0;  
    other_values_charged = 0;
    other_values_paid = 0;  
    temp = 0;
    var table = document.getElementsByClassName("t-Report-report")[2];
    var arr = new Array();
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {  
            removing_comas = row.cells[5].innerHTML.replace(",", "");
            if (tuition_fee_charged.includes(removing_comas)) {

            }
            else {
                tuition_fee_charged.push(removing_comas/8)
            }
            if (row.cells[2].innerHTML == "<strong>&nbsp;</strong>" || row.cells[2].innerHTML == "&nbsp;") {                
            }            
            else{
                final_session = row.cells[2].innerHTML;
            }
            if (row.cells[7].innerHTML != "<strong>&nbsp;</strong>") {
                removing_comas = row.cells[7].innerHTML.replace(",", "");
                remaining_balance = parseInt(removing_comas);                                                     
            } 
            if (row.cells[4].innerHTML != "Tuition Fees" && row.cells[4].innerHTML != "Degree Fees" && row.cells[4].innerHTML != "CMS Fees" && row.cells[4].innerHTML != "Provisional Certificate Fee") {
                if (row.cells[5].innerHTML != "&nbsp;") {                                          
                    removing_comas = row.cells[5].innerHTML.replace(",", "");
                    temp = parseInt(removing_comas); 
                    if (Number.isInteger(temp)) {                                                
                        other_values_charged += temp                        
                    }                                            
                } 
                if (row.cells[6].innerHTML != "&nbsp;") {                       
                    removing_comas = row.cells[6].innerHTML.replace(",", "");
                    temp = parseInt(removing_comas); 
                    if (Number.isInteger(temp)) {
                        other_values_paid += temp 
                    }                                            
                }               
            } 
            if (row.cells[4].innerHTML == "Tuition Fees" && row.cells[6].innerHTML != "<strong>&nbsp;</strong>" && row.cells[6].innerHTML != "&nbsp;" && row.cells[3].innerHTML != "&nbsp;") {
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
    
    
    // getting total semester tuition fee
    total = 0
    charged = 0;
    paid = 0;
    advance_fee = 0;
    
    var table = document.getElementsByClassName("t-Report-report")[2];
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (row.cells[2].innerHTML != final_session) {
                if (row.cells[4].innerHTML == "Tuition Fees"){
                    value = row.cells[3].innerHTML;                                 
                    if (row.cells[5].innerHTML != "&nbsp;") {
                        removing_comas = row.cells[5].innerHTML.replace(",", "");                        
                        charged += parseInt(removing_comas);                        
                    }
                    if (row.cells[6].innerHTML != "&nbsp;") {
                        removing_comas = row.cells[6].innerHTML.replace(",", "");                    
                        paid += parseInt(removing_comas);                       
                    }                    
                    advance_fee = (paid/8) - (charged/8);                    
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
        sum = tuition_fee_charged.reduce((partialSum, a) => partialSum + a, 0);
        if (sum == 0) {
            full_scholorship = true
        }
    }
    
    
    // sessions = [];
    // for (var i = 1, row; row = table.rows[i]; i++) {    
    //     for (var j = 0, col; col = row.cells[j]; j++) {
    //         session = row.cells[2].innerHTML;
    //         if (session != "&nbsp;"){
    //             if (session == "<strong>&nbsp;</strong>") {

    //             }
    //             else {
    //                 if (sessions.includes(session)){

    //                 }
    //                 else {
    //                     sessions.push(session)
    //                 }
    //             }
    //         } 
    //     }
    // }

    // scholorship_range = 0
    // for (var i = 1, row; row = table.rows[i]; i++) {    
    //     for (var j = 0, col; col = row.cells[j]; j++) {
    //         session = row.cells[2].innerHTML;
    //         if (session == sessions[sessions.length - 2]){
    //             scholorship_range = i
    //         }
    //     }
    // }
    // 
    // scholorship = 0;  
    // for (var i = scholorship_range, row; row = table.rows[i]; i++) {    
    //     for (var j = 0, col; col = row.cells[j]; j++) {
    //         value = row.cells[3].innerHTML.toLowerCase();
    //         if (value.includes("scholarship")) {                
    //             removing_comas = row.cells[5].innerHTML.replace(",", "");
    //             value = parseInt(removing_comas);
    //             scholorship = value;
    //         }        
    //     }
    // }    

    degree_provisional_cms_charged = 0;
    degree_provisional_cms_paid = 0;
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {            
            if (row.cells[4].innerHTML == "Degree Fees" || row.cells[4].innerHTML == "CMS Fees" || row.cells[4].innerHTML == "Provisional Certificate Fee") {                              
                if (row.cells[5].innerHTML != "&nbsp;") {                    
                    removing_comas = row.cells[5].innerHTML.replace(",", "");
                    value = parseInt(removing_comas);
                    degree_provisional_cms_charged += value;
                }
                if (row.cells[6].innerHTML != "&nbsp;") {                    
                    removing_comas = row.cells[6].innerHTML.replace(",", "");
                    value = parseInt(removing_comas);
                    degree_provisional_cms_paid += value;
                }
            }
        }
    } 
    
    degree_provisional_cms = degree_provisional_cms_charged - degree_provisional_cms_paid
    
    document.getElementById('R26939838904143271_heading').style.color = "#000000";

    // if (scholorship < 0) {
    //     total = total + scholorship;
    //     advance_fee = advance_fee - scholorship;        
    // } 
    
    debt = 0
    if (advance_fee <= 0) { // check access amount is paid or previous balance             
        if (total + advance_fee == 0) { // if 0 means no advance fee paid nor any previos balance
            var needed = 0
        }
        else {             
            debt = advance_fee // if advance fee is in neagtive means its a debt so adding that debt
            var needed = (total / 2) - debt;                                    
        }      
    }
    else { 
        var needed = total / 2;
    }   

     
    
    if (advance_fee > 0) { // if advance fee is in positive means access fee has been paid in previous semester           
        debt = (0 - advance_fee)       
    }
    
    
    if (remaining_balance != 0) {
        remaining_balance = remaining_balance - (degree_provisional_cms/8)
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
                var result = 0 - (0 - debt / total * 100)
            }  
        }   
    }
    
    var required = 0;
    if (full_scholorship == true) {
        document.getElementById('R26939838904143271_heading').style.color = "#8F00FF";
        document.getElementById('R26939838904143271_heading').textContent = "Full Scholorship" + " - (For Mid: " + (remaining_balance).toLocaleString("en-US") + ")";
    }
    else {  
        if (result < 0){
            if (debt < 0) {                
                var result = 0 - (0 - debt / total * 100)
                required = Math.round(remaining_balance - (total / 2));
                document.getElementById('R26939838904143271_heading').style.color = "#000000";
                document.getElementById('R26939838904143271_heading').textContent = "Fee Paid: " + Math.round(result).toLocaleString("en-US") + "%" + " - (T. Fee: " + Math.abs(Math.round(needed)).toLocaleString("en-US") + ")" + " - (For Mid: " + required.toLocaleString("en-US") + ")";
            }
            else {                
                var result = 0;          
                required = Math.round(remaining_balance - needed);
                document.getElementById('R26939838904143271_heading').style.color = "#000000";
                document.getElementById('R26939838904143271_heading').textContent = "Fee Paid: " + Math.round(result).toLocaleString("en-US") + "%" + " - (T. Fee: " + Math.abs(Math.round(needed + debt)).toLocaleString("en-US") + ")" + " - (For Mid: " + required.toLocaleString("en-US") + ")";
            }
        }
        else if (result < 50){                                   
            required = Math.round(remaining_balance - (total / 2));
            document.getElementById('R26939838904143271_heading').style.color = "#000000";
            document.getElementById('R26939838904143271_heading').textContent = "Fee Paid: " + Math.round(result).toLocaleString("en-US") + "%" + " - (T. Fee: " + Math.abs(Math.round(needed + debt)).toLocaleString("en-US") + ")" + " - (For Mid: " + required.toLocaleString("en-US") + ")";
        }
        else {  
            if (other_values_charged - other_values_paid > 0) {                 
                other_amount_charged = (other_values_charged - other_values_paid) / 8                                      
                var result = 100 - ((remaining_balance + other_amount_charged) / (total) * 100)        
                required = Math.round(remaining_balance - (total / 2));
                t_fee_required = needed + debt
                if (t_fee_required < 0) {
                    t_fee_required = 0
                }
                document.getElementById('R26939838904143271_heading').style.color = "#000000";
                document.getElementById('R26939838904143271_heading').textContent = "Fee Paid: " + Math.round(result).toLocaleString("en-US") + "%" + " - (T. Fee: " + Math.round(t_fee_required).toLocaleString("en-US") + ")" + " - (For Mid: " + ((other_values_charged - other_values_paid) / 8).toLocaleString("en-US") + ")";
            }
            else {                                
                document.getElementById('R26939838904143271_heading').style.color = "#0000ff";
                document.getElementById('R26939838904143271_heading').textContent = "Fee Paid: " + Math.round(result).toLocaleString("en-US") + "%";
            }
        }
    }
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

    // var table = document.getElementsByClassName("t-Report-report")[4];
    // for (var i = 1, row; row = table.rows[i]; i++) {    
    //     for (var j = 0, col; col = row.cells[j]; j++) {
    //         if (row.cells[j].tagName == "TD") {
    //             var work = row.cells[j].innerHTML;
    //             if (row.cells[j].innerHTML.includes("a href")) {
    //                 var myArray = row.cells[j].innerHTML.split(">");
    //                 var secondArray = myArray[1].split("<");
    //                 var voucher_number = secondArray[0]
    //                 if (posted_voucher.includes(voucher_number)) {
    //                     row.cells[j].insertAdjacentText('beforebegin', ' (Posted)');
    //                 }
    //             }
    //         }
    //     }
    // }

}

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

Changelog 1.2:
``````````````

As adviced that degree fee and provisional fee charged will be ignored for the clearance of Mid-Term Examinaitons but if the student has 
alrady paid that degree provisional fee causes that amount to be deducted from tution fee that leads to showing percentage 100% paid evethoug
tuition fee has remaining balance - Fixed

Old mechanics were if tuition fee charged - tuition fee paid = 0. It will show studnet with full scholorship. That is done because we exclude
current semester and used above technique to see that is there any previous dues or any advance fee paid. That caused the error showing some
students 100% scholorship if there tuition fee balance is 0 eventhough they are not full scholorship students - Fixed

Added Red Color To Warning Narrations

Added Green Color To Posted Voucher

*/