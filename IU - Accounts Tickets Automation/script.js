
const TICKET_SCREEN_OPENED = document.getElementById("R555757530040776432");
const STUDENT_ID_HEADING = document.getElementById("R2202910372708181235");
const SCREEN_OF_TICKETS = document.getElementById("R440138601731385923_fr_search");
const TICKET_URL = 'http://faculty.induscms.com:81/ords/r/erasoft/a500550500/9660?session=';
const today = new Date();
const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
const ulElement = document.getElementById('R555760607202776462_report');
const TICKET_DATA = JSON.parse(localStorage.getItem('TICKET_DATA'));
var TICKETS_SEEN_TODAY = JSON.parse(localStorage.getItem('TICKETS_SEEN_TODAY'));

// Add Exta Removal Screen / Software
const HOME_SCREEN = document.getElementById("R222539501655764625")
const STUDENT_ACCOUNTS = document.getElementById('P640_V_DIRECT_STUDENT_ID');
const STUDENT_ACCOUNTS_ID_OPENED = document.getElementById('21542748190186981');
const STUDENT_ADD_EXTRA_AMOUNT_SCREEN = document.getElementById('report_R21650644522927723')
const reportTable = document.querySelector('#report_R21650644522927723 .t-Report-report');
const DELETE_BUTTON = document.getElementById('B21655341836927735')
const DEL_OK_BUTTON = document.getElementsByClassName('.js-confirmBtn ui-button ui-corner-all ui-widget ui-button--hot');
const DELETE_SCREEEN_MODAL = document.querySelector('.ui-dialog-content.ui-widget-content .a-AlertMessage .a-AlertMessage-body');
var STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER = JSON.parse(localStorage.getItem('STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER'));
var NARRAION_TO_BE_DELETED = []


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function performAction() {
  console.log('Action started');
  await delay(5000); // Wait for 5 seconds
  console.log('Action performed after 5 seconds');
}
  

if (TICKET_SCREEN_OPENED) {
  const STUDENT_FEE_LEDGER = document.getElementById('report_table_R496187200018386424');
  const SUBMIT_BUTTON = document.getElementById("B440422889565959082");
  const BACK_BUTTON = document.getElementById("B494434577378830659");
  const TICKET_TITLE = document.querySelector('#R555757530040776432_report .t-SearchResults-title a');
  const TICKET_DESCRIPTION = TICKET_TITLE.innerText;
  const TICKET_HEADING = document.querySelector(".t-SearchResults-title a");
  const TICKET_NO = TICKET_DESCRIPTION.split(" - ")[0].split("#")[1];
  var ticket_already_read = JSON.parse(localStorage.getItem('TICKETS_ALREADY_READ'));
  var not_wrong_codition = true 
  var semi_working_condition = false
  var remove_value_from_ticket_data = false
  
  if (!TICKETS_SEEN_TODAY[formattedDate].includes(TICKET_NO)) {
    if (!TICKETS_SEEN_TODAY) {
      TICKETS_SEEN_TODAY = {};
      TICKETS_SEEN_TODAY[formattedDate] = [TICKET_NO];
      localStorage.setItem('TICKETS_SEEN_TODAY', JSON.stringify(TICKETS_SEEN_TODAY));
    }
    else {
      if (!formattedDate in TICKETS_SEEN_TODAY) {
        TICKETS_SEEN_TODAY = {};
        TICKETS_SEEN_TODAY[formattedDate] = [TICKET_NO];
        localStorage.setItem('TICKETS_SEEN_TODAY', JSON.stringify(TICKETS_SEEN_TODAY));
      }
      else {
        if (!TICKETS_SEEN_TODAY[formattedDate].includes(TICKET_NO)) {
          TICKETS_SEEN_TODAY[formattedDate].push(TICKET_NO);
          localStorage.setItem('TICKETS_SEEN_TODAY', JSON.stringify(TICKETS_SEEN_TODAY));
        }
      }  
    }

    if (ulElement) {
      const firstLi = ulElement.querySelector('li:first-child');
      const h3Element = firstLi.querySelector('h3');
      if (h3Element) {
        if (h3Element.innerText.toLowerCase().includes("wrong") || h3Element.innerText.toLowerCase().includes("not submit") || h3Element.innerText.toLowerCase().includes("close") || h3Element.innerText.toLowerCase().includes("mistakenly generate")) {
          if (!h3Element.innerText.toLowerCase().includes("issue")) {
            semi_working_condition = true
            not_wrong_codition = false;
            var boldTag = STUDENT_ID_HEADING.querySelector("b"); // Find the <b> tag inside the element
            var student_id = boldTag.innerHTML;
            var filtered_student_id = student_id.split('(')[1].split(')')[0]
            STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER[formattedDate][filtered_student_id] = TICKET_NO
            localStorage.setItem('STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER', JSON.stringify(STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER));
            var url = 'http://faculty.induscms.com:81/ords/f?p=700:660:15382204497587:::660:P660_V_STUDENT_ID:3447-2016&p_dialog_cs=hnrwo2kaQzSKdWdqiFs0eWri20Pdjpdo80_XTpmyxGeUEGWj-oxUlnzk6p59uNNQBHOXeO07Ink6IhB-VEnbjA'
            var end_url = '&p' + url.split('&p')[1]
            var modified_url = url.split('P660_V_STUDENT_ID:')[0] + 'P660_V_STUDENT_ID:' + filtered_student_id + end_url
            var descriptionElement = document.getElementById("P9661_EVENT_DESCRIPTION");
            var selectElement = document.getElementById("P9661_EVENT_PROCESSING_TYPE");
            if (Array.from(selectElement.options).some(option => option.value === "Closed With Attention")) {
              selectElement.value = "Closed With Attention";
            } else {
              selectElement.value = "Comments";
            }
            descriptionElement.value = "As Requested, Ticket Closed and Fee Removed"
            SUBMIT_BUTTON.click()
            const newTab = window.open(modified_url, '_blank');
            setTimeout(() => {
              newTab.close();
            }, 60000);
            console.log("Wrong Ticket")
          }
        }
      }
    }
      
    if (not_wrong_codition) {
      var TICKET_TYPE = "Normal"
      
      const TICKET_NAMES_VS_ACCT_HEADS = {
        "Bonafide Certificate": "Bonafide Certificate",
        "Character  Certificate": "Character Certificate",
        "Degree Completion Certificate": "Certificate/Letter Fee",
        "Degree Verification": "Degree Verfication Fee",
        "Final Degree Issuing": "Degree Fees",
        "Final Diploma Issuing": "Degree Fees",
        "Final Transcript Issuing": "Final Transcript Fees",
        "Incomplete Marksheet": "Final Transcript Fees",
        "Medium Of Instruction (MOI)": "M.O.I / English Proficiency Certificate",
        "Merit Certificate": "Certificate/Letter Fee",
        // "Migration Certificate": "Migration Letter ",
        "Provisional Certificate": "Provisional Certificate Fee",
        "Revise/Duplicate Final Transcript": "Final Transcript Fees",
        "Recommendation Letter-1": "Recommendation Letter",
        "Recommendation Letters-2": "Recommendation Letter",
        "Revise/Duplicate Final Degree": "Degree Fees",
        "Revise/Duplicate Final Transcript": "Final Transcript Fees",
        "Regular Student Certificate": "Regular Student Certificate",
        "Semester Transcript Issuing": "Mark Sheet Fees",
        "Student Alumni Card": "Alumni Card",
        "Transcript Verification": "Transcript Verfication Fee"
      }

      var table = STUDENT_FEE_LEDGER;
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
        TICKET_NAMES_VS_ACCT_HEADS["Final Degree Issuing"] = "Urgent Degree"
        TICKET_NAMES_VS_ACCT_HEADS["Final Diploma Issuing"] = "Urgent Degree"
        TICKET_NAMES_VS_ACCT_HEADS["Revise/Duplicate Final Degree"] = "Urgent Degree"
        TICKET_NAMES_VS_ACCT_HEADS["Final Transcript Issuing"] = "Urgent Final Transcript"
        TICKET_NAMES_VS_ACCT_HEADS["Revise/Duplicate Final Transcript"] = "Urgent Final Transcript"
        TICKET_NAMES_VS_ACCT_HEADS["Incomplete Marksheet"] = "Urgent Final Transcript"
      }


      let titleText = TICKET_HEADING.textContent;
      var ticket_name = titleText.split(" - ")[1];
      
      var lastRow = table.rows[table.rows.length - 1];
      var lastCell = lastRow.cells[lastRow.cells.length - 1];
      var stu_current_balance = lastCell.textContent || lastCell.innerText;

      let ticket_debit = 0;
      let ticket_credit = 0;

      var allowed_to_process = false
      let narration;
      

      if (stu_current_balance <= 0) {
        allowed_to_process = true
      }
      else {
        var restricted_tickets = ["Final Transcript Issuing", "Revise/Duplicate Final Transcript", "Incomplete Marksheet", "Final Degree Issuing", "Migration Certificate"] 
        if (!restricted_tickets.includes(ticket_name)) {
          allowed_to_process = true
        }
      }
      
      if (allowed_to_process) {
        if (TICKET_NAMES_VS_ACCT_HEADS.hasOwnProperty(ticket_name)) {
          var table = STUDENT_FEE_LEDGER;
          for (var i = 1, row; row = table.rows[i]; i++) {
            for (var j = 0, col; col = row.cells[j]; j++) {
              if (row.cells[1].innerHTML == TICKET_NAMES_VS_ACCT_HEADS[ticket_name]) {
                var ticket_debit_amount = row.cells[4].innerHTML;
                var ticket_credit_amount = row.cells[5].innerHTML;
                ticket_debit += ticket_debit_amount;
                ticket_credit += ticket_credit_amount;
                if (ticket_debit_amount == "") {
                  narration = row.cells[2].innerHTML;
                }
              }
            }
          }
          if ((ticket_debit - ticket_credit) <= 0) {
            var descriptionElement = document.getElementById("P9661_EVENT_DESCRIPTION");
            var selectElement = document.getElementById("P9661_EVENT_PROCESSING_TYPE");
            if (narration) {
              try {
                if (ticket_name == "Transcript Verification"){
                  
                  selectElement.value = "Closed With Success";
                }
                else {
                  selectElement.value = "Approved";
                }
                
                let voucher_narration = narration.split(" Issued ");
                let remarks = ticket_name + " Fee Paid " + voucher_narration[1];
                if (TICKET_TYPE == "Urgent") {
                  remarks = "Urgent " + ticket_name + " Fee Paid " + voucher_narration[1];
                }
              descriptionElement.value = remarks.replace("Issuing", "");
              SUBMIT_BUTTON.click()
              } catch (e) {
                console.log(e)
                delete TICKET_DATA[TICKET_NO];
                localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
                BACK_BUTTON.click()
              }
            }
            else {
              console.log("Paid Voucher Narration Not Found");
              delete TICKET_DATA[TICKET_NO];
              localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
              BACK_BUTTON.click()
            }
          }
          else {
            console.log("Debit - Credit = ", ticket_debit - ticket_credit)
            if (!ticket_already_read.includes(TICKET_NO)) {
              delete TICKET_DATA[TICKET_NO];
              localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
            }
            BACK_BUTTON.click()
          }
        }
        else {
          console.log("Not Trained Tickets")
          delete TICKET_DATA[TICKET_NO];
          localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
          BACK_BUTTON.click()
        }
      }
      else {
        console.log("Student has balance")
        if (!ticket_already_read.includes(TICKET_NO)) {
          delete TICKET_DATA[TICKET_NO];
          localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
        }
        BACK_BUTTON.click()
      }
    }
    else {
      console.log("Wrong Ticket")
      if (!semi_working_condition) {
        delete TICKET_DATA[TICKET_NO];
        localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
        BACK_BUTTON.click()
      }
    }
  }
}

if (SCREEN_OF_TICKETS) {
  const pendingReport = document.getElementById('Pending_report');
  if (pendingReport) {
    const listItems = pendingReport.querySelectorAll('li');
    var ticket_already_read = JSON.parse(localStorage.getItem('TICKETS_ALREADY_READ'));
    if (!ticket_already_read) {
      var tickets_already_read = []
      localStorage.setItem('TICKETS_ALREADY_READ', JSON.stringify(tickets_already_read));
    }

    var tickets_already_read = []

    for (let key in TICKET_DATA) {
        if (!tickets_already_read.includes(key)) {
            tickets_already_read.push(key);
        }
    }
    localStorage.setItem('TICKETS_ALREADY_READ', JSON.stringify(tickets_already_read));


    
    if (!TICKETS_SEEN_TODAY) {
      TICKETS_SEEN_TODAY = {};
      TICKETS_SEEN_TODAY[formattedDate] = [];
      localStorage.setItem('TICKETS_SEEN_TODAY', JSON.stringify(TICKETS_SEEN_TODAY));
    }
    else {
      if (!TICKETS_SEEN_TODAY.hasOwnProperty(formattedDate)) {
        TICKETS_SEEN_TODAY = {};
        TICKETS_SEEN_TODAY[formattedDate] = [];
        localStorage.setItem('TICKETS_SEEN_TODAY', JSON.stringify(TICKETS_SEEN_TODAY));
      }
      else {
        
      }
    }
    
    for (const key in TICKET_DATA) {
      if (TICKET_DATA[key][0].includes('Approval') || TICKET_DATA[key][0].includes('Student')) {
        if (!TICKETS_SEEN_TODAY[formattedDate].includes(key)) {
          TICKETS_SEEN_TODAY[formattedDate].push(key)
          localStorage.setItem('TICKETS_SEEN_TODAY', JSON.stringify(TICKETS_SEEN_TODAY));
        }
      }
    }

    for (let li of listItems) {
        const anchor = li.querySelector('a[href]');
        var anchor_text = anchor.innerText;
        var ticket_no = anchor_text.split("# ")[1].split(" - ")[0]
        if (!TICKETS_SEEN_TODAY[formattedDate].includes(ticket_no)) {
            anchor.click();
            break;
        }
    }
  }
  setInterval(() => {
    current_URL = window.location.href
    if (current_URL.includes("?session=")){
      current_session = current_URL.split("?session=")[1].split("&")[0]
    }
    else {
      breaking_URL = current_URL.split("/")
      current_session = breaking_URL[breaking_URL.length - 1]
    }
      
    call_ticket_page = TICKET_URL + current_session
    window.location.href = call_ticket_page;
  }, 15000);
}

if (HOME_SCREEN) {
  if (!STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER) {
      STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER = {};
      STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER[formattedDate] = {};
      localStorage.setItem('STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER', JSON.stringify(STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER));
    }
  else {
    if (!STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER.hasOwnProperty(formattedDate)) {
      STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER = {};
      STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER[formattedDate] = {};
      localStorage.setItem('STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER', JSON.stringify(STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER));
    }
  }
  
  setInterval(() => {
      window.location.reload();
  }, 15000);
}

if (DELETE_BUTTON) {
  if (Object.keys(STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER[formattedDate]).length !== 0) {
  // Select the table within the specified div by its ID

    if (reportTable) {
      const headerCells = reportTable.querySelectorAll('thead th');
      let narrationIndex = -1;

      // Find the index of the 'Narration' header
      headerCells.forEach((header, index) => {
        if (header.textContent.trim() === 'Narration') {
          narrationIndex = index;
        }
      });

      if (narrationIndex === -1) {
        console.log('No "NARRATION" header found in the table.');
      } 
      else {
        const rows = reportTable.querySelectorAll('tbody tr');
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const cells = row.querySelectorAll('td');
          const narrationCell = cells[narrationIndex];

          if (narrationCell) {
            var current_web_url = window.location.href
            
            var getting_student_id = current_web_url.split('P660_V_STUDENT_ID:')[1].split('&p_dialog_cs')[0]
            let ticket_value = STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER[formattedDate][getting_student_id];
            console.log(ticket_value)
            const inputField = narrationCell.querySelector('input');
            
            
            if (inputField && inputField.value.includes(ticket_value)) {
              console.log(inputField.ticket_value);

              // Find the first column (the checkbox column) in the same row
              const firstColumnCell = cells[0]; // The first column corresponds to the first <td> in the row
              const checkbox = firstColumnCell.querySelector('input[type="checkbox"]');

              // If a checkbox is found, check it
              if (checkbox) {
                checkbox.checked = true; // Check the checkbox
                DELETE_BUTTON.click();
                setTimeout(() => {
                  function isElementClickable(element) {
                    const style = window.getComputedStyle(element);
                    const isVisible = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
                    const isEnabled = !element.disabled;
                    
                    const zIndex = parseInt(style.zIndex, 10);
                    const modalZIndex = parseInt(window.getComputedStyle(modal).zIndex, 10);

                    return isVisible && isEnabled && (zIndex > modalZIndex || !modalZIndex);
                  }


                  const modal = document.querySelector('.ui-dialog-content.ui-widget-content');
                  if (modal) {
                    const allElements = document.querySelectorAll('*');
                    
                    allElements.forEach(element => {
                      const isClickable = isElementClickable(element);

                      if (isClickable && element.classList.contains('js-confirmBtn')) {
                        for (let key in STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER[formattedDate]) {
                          if (STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER[formattedDate][key] === ticket_value) {
                            delete STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER[formattedDate][key];
                          }
                        }
                        localStorage.setItem('STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER', JSON.stringify(STUDENT_ACCOUNTS_ENTRY_REMOVAL_CONTAINER));
                        
                        element.click();
                      }
                    });
                  } else {
                    console.log('No modal found.');
                  }

                }, 5000);
                

              }
              break; // Exit the loop once the desired value is found and checkbox is checked
            }
          }
        }
      }
    }
  }
}

