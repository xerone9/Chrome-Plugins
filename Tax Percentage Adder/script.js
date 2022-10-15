function isInteger(n) {
    return n === +n && n === (n|0);
}

function calculateValue() {
    amount = document.getElementById('amount').value;
    tax = document.getElementById('tax').value;
    calculation = 100 - tax;
    result =  ((amount / calculation) * 100).toFixed(2);
    // if (isInteger(result)) {
    //     result = result;
    // }         
    // else{
    //     result =  ((amount / calculation) * 100).toFixed(2);
    // }
    document.getElementById('demo').textContent = "You need to charge " + result.toLocaleString("en-US") + "/-. " + "in order to receive " + amount.toLocaleString("en-US") + " after adding " + tax + "% commission";
}

document.getElementById('paste-result').onclick = calculateValue;