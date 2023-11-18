const el = document.getElementById('R312550953030404706_heading');

if (el !== null) {
    var table = document.getElementById("report_table_R312545805814404689");
    var remaining_balance = 0;
    for (var i = 1, row; row = table.rows[i]; i++) {    
        for (var j = 0, col; col = row.cells[j]; j++) {            
            if (row.cells[7].innerHTML != "<strong></strong>") {
                removing_comas = row.cells[7].innerHTML.replace(",", "");
                remaining_balance = parseInt(removing_comas);                                                     
            }                       
        } 
    } 

    chrome.storage.local.get('IU_ERP_REPORT_HASH', (result) => {
        const today = new Date().toISOString().split('T')[0];
        const url = 'http://faculty.induscms.com:8889/reports/rwservlet?login1&destype=CACHE&desformat=PDF&report=D:/EMIS_Prg/Reports/Accounts/Accounts_710_Student_Bank_Pay_slip.rep&vtvidvu=INSERT_HASH_HERE&v_student_id=3447-2016&v_voucher_no=3449323';
        const fetch_hash = result['IU_ERP_REPORT_HASH'];
        if (fetch_hash) {
            updatedUrl = url.replace('INSERT_HASH_HERE', fetch_hash[today]);

            const div = document.getElementById('report_table_R312567687309404769');
            const student_id = document.querySelector("input[name='P0_V_DIRECT_STUDENT_ID']");
            var get_student_id = localStorage.getItem('student_id2');
            if (get_student_id != student_id.value) {
                if (div && remaining_balance > 0) {
                localStorage.setItem('student_id2', student_id.value);
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
                        voucherDate.setHours(23, 59, 59);
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
                                // print_voucher.click(); // voilates policy
                                const textField = document.getElementById('P0_V_DIRECT_STUDENT_ID');
                                const value = textField.value;
                                const studentId = value;
                                const voucherNo = print_voucher.innerHTML;

                                updatedUrl = updatedUrl.replace(/v_student_id=[^&]+/, `v_student_id=${studentId}`).replace(/v_voucher_no=[^&]+/, `v_voucher_no=${voucherNo}`);

                                window.open(updatedUrl, '_blank', 'noopener');
                                break;
                            }
                        }
                    }
                }

            }
        }
    });

}
