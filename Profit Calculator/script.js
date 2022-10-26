function isInteger(n) {
    return n === +n && n === (n|0);
}

function calculateValue() {
    amount = document.getElementById('amount').value;
    tax = document.getElementById('tax').value;
    years = document.getElementById('years').value;
    converting_percentage_to_decimal = tax / 100;    
    calucating_power = Math.pow(converting_percentage_to_decimal + 1, years);
    result = Math.round(amount * calucating_power);  
    interest_amount = result - amount;     
    document.getElementById('interest_label').textContent = "Interest Amount: ";
    document.getElementById('Interest_amount').textContent = interest_amount.toLocaleString("en-US");
    document.getElementById('total_label').textContent = "Total Amount: ";
    document.getElementById('total_amount').textContent = result.toLocaleString("en-US");
}

document.getElementById('paste-result').onclick = calculateValue;