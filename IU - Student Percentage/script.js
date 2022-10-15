const el = document.getElementById('R26939838904143271_heading');

if (el !== null) {
    // document.body.innerHTML = document.body.innerHTML.replace('Employee Portal', 'Shared Control');
    document.getElementById("710_menubar_0").innerHTML = "Shared Control";    
    document.getElementById("710_menubar_0").style.color = "white";    
    document.getElementById("710_menubar_0").style.padding = "12px";    
    document.getElementById("710_menubar_0").style.backgroundColor = "red";   
    document.getElementById("710_menubar_0").style.fontSize = "x-large";    
    document.getElementById("710_menubar_0").style.fontFamily = "Garamond";
    
    final_session = "";
    remaining_balance = 0;
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
        }  
    }

    total = 0
    var table = document.getElementsByClassName("t-Report-report")[2];
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (row.cells[2].innerHTML != final_session) {
                
            }        
            else{                          
                removing_comas = row.cells[5].innerHTML.replace(",", "");
                value = parseInt(removing_comas);
                if (Number.isInteger(value)) {
                    total += value/8;                                  
                } else {
                    
                }   
            }        
        }  
    }

    var required = 0;
    if (remaining_balance < 0){
        var result = 100;
    }
    else {
        var result = 100 - (remaining_balance / total * 100)
    }

    document.getElementById('R26939838904143271_heading').style.color = "#000000";

    if (result < 0){
        var result = 0;
        var needed = total / 2;
        required = Math.round(remaining_balance - needed);
        document.getElementById('R26939838904143271_heading').style.color = "#ff0000";
        document.getElementById('R26939838904143271_heading').textContent = "Fee Paid: " + Math.round(result) + "%" + " - (Tui Fee: " + Math.round(needed) + ")" + " - (Balance: " + required + ")";
    }
    else if (result < 50){
        var result = 100 - (remaining_balance / total * 100)
        var needed = total / 2;
        required = Math.round(remaining_balance - needed);
        document.getElementById('R26939838904143271_heading').style.color = "#ff0000";
        document.getElementById('R26939838904143271_heading').textContent = "Fee Paid: " + Math.round(result) + "%" + " - (Tui Fee: " + Math.round(needed) + ")" + " - (Balance: " + required + ")";
    }
    else {
        var result = 100 - (remaining_balance / total * 100)
        document.getElementById('R26939838904143271_heading').style.color = "#0000ff";
        document.getElementById('R26939838904143271_heading').textContent = "Fee Paid: " + Math.round(result) + "%";
    }

}

else {
    
}
