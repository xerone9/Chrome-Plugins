const el = document.getElementById('R26939838904143271_heading');

if (el !== null) {
    // document.body.innerHTML = document.body.innerHTML.replace('Employee Portal', 'Shared Control');
    // document.getElementById("710_menubar_0").innerHTML = "Shared Control";    
    // document.getElementById("710_menubar_0").style.color = "white";    
    // document.getElementById("710_menubar_0").style.padding = "12px";    
    // document.getElementById("710_menubar_0").style.backgroundColor = "red";   
    // document.getElementById("710_menubar_0").style.fontSize = "x-large";    
    // document.getElementById("710_menubar_0").style.fontFamily = "Garamond";
    // var elements = document.getElementsByClassName('t-NavigationBar'); // get all elements
    // for(var i = 0; i < elements.length; i++){
    //     elements[i].style.backgroundColor = "black";
    // }
    // var elements = document.getElementsByClassName('t-Header-logo-link'); // get all elements
    // for(var i = 0; i < elements.length; i++){
    //     elements[i].style.backgroundColor = "black";
    // }    
    
    final_session = "";
    remaining_balance = 0;  
    other_values_charged = 0;
    other_values_paid = 0;  
    temp = 0;
    var table = document.getElementsByClassName("t-Report-report")[2];
    var arr = new Array();
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {  
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
                        other_values_charged += (temp)                         
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
        } 
    }       
    
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
                    if ( row.cells[5].innerHTML != "&nbsp;") {
                        removing_comas = row.cells[5].innerHTML.replace(",", "");
                        charged += parseInt(removing_comas);                        
                    }
                    if (row.cells[6].innerHTML != "&nbsp;") {
                        removing_comas = row.cells[6].innerHTML.replace(",", "");                    
                        paid += parseInt(removing_comas);                       
                    }                    
                    advance_fee = (charged/8) - (paid/8);                    
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
      
      
    sessions = [];
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {
            session = row.cells[2].innerHTML;
            if (session != "&nbsp;"){
                if (session == "<strong>&nbsp;</strong>") {

                }
                else {
                    if (sessions.includes(session)){

                    }
                    else {
                        sessions.push(session)
                    }
                }
            } 
        }
    }

    scholorship_range = 0
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {
            session = row.cells[2].innerHTML;
            if (session == sessions[sessions.length - 2]){
                scholorship_range = i
            }
        }
    }

    scholorship = 0;  
    for (var i = scholorship_range, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {
            value = row.cells[3].innerHTML.toLowerCase();
            if (value.includes("scholarship")) {                
                removing_comas = row.cells[5].innerHTML.replace(",", "");
                value = parseInt(removing_comas);
                scholorship = value;
            }        
        }
    }    

    degree_provisional_cms = 0;
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {            
            if (row.cells[4].innerHTML == "Degree Fees" || row.cells[4].innerHTML == "CMS Fees" || row.cells[4].innerHTML == "Provisional Certificate Fee") {                              
                if (row.cells[5].innerHTML != "&nbsp;") {                    
                    removing_comas = row.cells[5].innerHTML.replace(",", "");
                    value = parseInt(removing_comas);
                    degree_provisional_cms += value;
                }
            }
        }
    }    
    
    document.getElementById('R26939838904143271_heading').style.color = "#000000";

    if (scholorship < 0) {
        total = total + scholorship;
        advance_fee = advance_fee - scholorship;
        console.log("Scholorship Last Semester: " + Math.abs(scholorship))
    } 
    
    if (advance_fee < 0) {
        if (total + advance_fee == 0) {
            var needed = 0
        }
        else {
            var needed = (total / 2) + advance_fee; 
            console.log("Advance Fee: " + Math.abs(advance_fee)) 
        }      
    }
    else {        
        var needed = total / 2;
    }

    debt = 0
    if (advance_fee > 0) {
        debt = advance_fee
        console.log("Previous Balance: " + Math.abs(debt)) 
    }

    
    if (remaining_balance != 0) {
        remaining_balance = remaining_balance - (degree_provisional_cms/8)
    }
    

    var required = 0;
    if (remaining_balance < 0){
        var result = 100;
    }
    else {                     
        var result = 100 - (remaining_balance / (total - advance_fee) * 100)        
    }    
    

    if (result < 0){
        var result = 0;          
        required = Math.round(remaining_balance - needed);
        document.getElementById('R26939838904143271_heading').style.color = "#000000";
        document.getElementById('R26939838904143271_heading').textContent = "Fee Paid: " + Math.round(result).toLocaleString("en-US") + "%" + " - (T. Fee: " + Math.round(needed + debt).toLocaleString("en-US") + ")" + " - (For Mid: " + required.toLocaleString("en-US") + ")";
    }
    else if (result < 50){        
        var result = 100 - (remaining_balance / (total - advance_fee) * 100)        
        required = Math.round(remaining_balance - (total / 2));
        document.getElementById('R26939838904143271_heading').style.color = "#000000";
        document.getElementById('R26939838904143271_heading').textContent = "Fee Paid: " + Math.round(result).toLocaleString("en-US") + "%" + " - (T. Fee: " + Math.round(needed + debt).toLocaleString("en-US") + ")" + " - (For Mid: " + required.toLocaleString("en-US") + ")";
    }
    else {
        if (other_values_charged - other_values_paid > 0) {                          
            var result = 100 - (remaining_balance / (total - advance_fee) * 100)        
            required = Math.round(remaining_balance - (total / 2));
            document.getElementById('R26939838904143271_heading').style.color = "#000000";
            document.getElementById('R26939838904143271_heading').textContent = "Fee Paid: " + Math.round(result).toLocaleString("en-US") + "%" + " - (T. Fee: " + Math.round(needed + debt).toLocaleString("en-US") + ")" + " - (For Mid: " + ((other_values_charged - other_values_paid) / 8).toLocaleString("en-US") + ")";
        }
        else {                               
            var result = 100 - (remaining_balance / (total - advance_fee) * 100)
            document.getElementById('R26939838904143271_heading').style.color = "#0000ff";
            document.getElementById('R26939838904143271_heading').textContent = "Fee Paid: " + Math.round(result).toLocaleString("en-US") + "%";
        }
    }

}


