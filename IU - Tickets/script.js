function block_bakcground_styling(div, status) {
  div.style.borderRadius = '5px'
  if (status == "Urgent") {
    div.style.backgroundColor = 'lightpink';
  }
  
  if (status.includes("Approval Request send to ")) {
    div.style.backgroundColor = 'lightgray';
  }

  else if (status == "Student Feedback Required") {
    div.style.backgroundColor = 'lightblue';
  }

  else if (status == "Ready For Collection") {
    div.style.backgroundColor = 'lightgreen';
  }

  else if (status == "In Waiting") {
    div.style.backgroundColor = 'lightyellow';
  }

}


function header_styling(div, status) {
  let text_remarks = status
  if (status.includes("Approval Request send to ")) {
    text_remarks = status.split("Approval Request send to ")[1];
  }


  if (status == "NEW") {
    div.textContent = text_remarks
    div.style.textAlign = 'right';
    div.style.marginRight = '20px';
    div.style.fontStyle = 'italic';
    div.style.fontWeight = 'bolder';

    let isVisible = true;

    const blinkInterval = setInterval(() => {
      if (isVisible) {
        div.style.visibility = 'hidden'; 
      } else {
        div.style.visibility = 'visible';
      }
      isVisible = !isVisible;
    }, 500);
  }

  if (status.includes("Approval Request send to ")) {
    div.textContent = text_remarks
    div.style.textAlign = 'center';
    div.style.color = "white";
    div.style.backgroundColor = 'black';
    div.style.fontWeight = 'bolder';
    div.style.border = '2px solid black';
    div.style.borderTopLeftRadius = '5px';
    div.style.borderTopRightRadius = '5px';
  }
}

function performCustomActivity() {
  var resolution = ACTIVITY_LIST.options[ACTIVITY_LIST.selectedIndex].text;
  const selectedOption = APPROVAL_AGENTS.options[APPROVAL_AGENTS.selectedIndex].text;
  const searchResultsInfo = document.querySelector('.t-SearchResults-info').innerText;
  var status_activity = searchResultsInfo.split("Activities: ")[1]
  if (TICKET_CLOSED.includes(resolution)) {
    const ticketTitle = document.querySelector('#R555757530040776432_report .t-SearchResults-title a');
    const TICKET_DESC = ticketTitle.innerText;
    const TICKET_NO = TICKET_DESC.split(" - ")[0].split("#")[1];
    const TICKET_DATA = JSON.parse(localStorage.getItem('TICKET_DATA'));
    delete TICKET_DATA[TICKET_NO];
    localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
  }
  else if (resolution == "Approval Request") {
    const ticketTitle = document.querySelector('#R555757530040776432_report .t-SearchResults-title a');
    const TICKET_DESC = ticketTitle.innerText;
    const TICKET_NO = TICKET_DESC.split(" - ")[0].split("#")[1];
    const TICKET_DATA = JSON.parse(localStorage.getItem('TICKET_DATA'));
    TICKET_DATA[TICKET_NO] = ["Approval Request send to " + selectedOption, status_activity]
    localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
  }
  else {
    const ticketTitle = document.querySelector('#R555757530040776432_report .t-SearchResults-title a');
    const TICKET_DESC = ticketTitle.innerText;
    const TICKET_NO = TICKET_DESC.split(" - ")[0].split("#")[1];
    const TICKET_DATA = JSON.parse(localStorage.getItem('TICKET_DATA'));
    TICKET_DATA[TICKET_NO] = [resolution, status_activity]
    localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
  }

}


const TICKETS_SCREEN = document.getElementById("R440138601731385923_fr_search");
const TICKET_OPENED_SCREEN = document.getElementById("R555757530040776432");
const SUBMIT_BUTTON = document.getElementById('B440422889565959082');
const ACTIVITY_LIST = document.getElementById('P9661_EVENT_PROCESSING_TYPE');
const APPROVAL_AGENTS = document.getElementById("P9661_APPROVAL_AGENT_ID")
const TICKET_CLOSED = ["Approved", "Rejected", "Comments", "Close With Success", "Close With Attention"]

if (TICKETS_SCREEN) {
  const styleSheet = document.styleSheets[0]; // Access the first stylesheet
  styleSheet.insertRule('.t-MediaList--cols .t-MediaList-item { margin: 3px; }', styleSheet.cssRules.length);

  // Select the target element with the id "t_Body_content"
  const bodyContent = document.getElementById("report_500560654368612310_catch");

  if (bodyContent) {
      // Create a new div element
      const color_description = document.createElement("div");
      color_description.id = 'color_description';
      
      // Apply styles to the new div
      color_description.style.width = "100%";
      color_description.style.height = "25px";
      color_description.style.marginTop = "18px"
      color_description.style.marginBottom = "18px"
      
      // Insert the new div above "t_Body_content"
      bodyContent.parentNode.insertBefore(color_description, bodyContent);
  } else {
      console.error('Element with id "t_Body_content" not found.');
  }

  const colorDescriptionDiv = document.getElementById("color_description");
  

  if (colorDescriptionDiv) {
    // Create a new div element
    const newDiv = document.createElement("div");
    
    // Set the styles and inner HTML for the new div
    newDiv.style.display = "flex";
    newDiv.style.flexDirection = "row";
    newDiv.innerHTML = `
        <div style="width: 50%;">
        <div style="width: 100%; display: flex; flex-direction: row; flex-wrap: wrap;">
          <div style="background-color: pink; width: 15px; height: 1px; margin-right: 5px; padding-top: 20px; margin-bottom: 10px;"></div>
          <div style="color: black; text-decoration: underline; margin-right: 15px; margin-bottom: 10px;">Urgent</div>
          <div style="border: 1px solid black; width: 15px; height: 1px; margin-right: 5px; padding-top: 20px; margin-bottom: 10px;"></div>
          <div style="color: black; text-decoration: underline; margin-right: 15px; margin-bottom: 10px;">Seen</div>
          <div style="background-color: yellow; width: 15px; height: 1px; margin-right: 5px; padding-top: 20px; margin-bottom: 10px;"></div>
          <div style="color: black; text-decoration: underline; margin-right: 15px; margin-bottom: 10px;">In Waiting</div>
          <div style="background-color: lightgreen; width: 15px; height: 1px; margin-right: 5px; padding-top: 20px; margin-bottom: 10px;"></div>
          <div style="color: black; text-decoration: underline; margin-right: 15px; margin-bottom: 10px;">Ready For Collection</div>
          <div style="background-color: gray; width: 15px; height: 1px; margin-right: 5px; padding-top: 20px; margin-bottom: 10px;"></div>
          <div style="color: black; text-decoration: underline; margin-right: 15px; margin-bottom: 10px;">Approval Sent</div>
          <div style="background-color: lightblue; width: 15px; height: 1px; margin-right: 5px; padding-top: 20px; margin-bottom: 10px;"></div>
          <div style="color: black; text-decoration: underline; margin-right: 15px; margin-bottom: 10px;">Student Feedback Required</div>
        </div>
        </div>
        <div style="width: 50%;">
          <div style="width: 100%; display: flex; flex-direction: row; align-items: end; justify-content: end;">
            <div style="color: red; font-weight: bolder; font-size: 25px; margin-left: 50px;">!!! Don't Use Checkmark Buttons On Your Left !!!</div>
          </div>
        </div>
    `;
    
    // Append the new div to the "color_description" element
    colorDescriptionDiv.appendChild(newDiv);
} else {
    console.error('Element with id "color_description" not found.');
}






  const listItems = document.querySelectorAll('.t-MediaList-item');

  listItems.forEach(listItem => {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.style.display = 'flex';
    wrapperDiv.style.width = "100%";
    wrapperDiv.style.flexDirection = 'column';

    const my_header = document.createElement('div');
    my_header.id = 'myheader';
    
    const existingContent = listItem.innerHTML; // Save the existing content
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = existingContent;

    listItem.innerHTML = '';

    wrapperDiv.appendChild(my_header);
    wrapperDiv.appendChild(contentDiv);

    listItem.appendChild(wrapperDiv);
  });

  const allTitles = document.querySelectorAll('.t-MediaList-title a');
  allTitles.forEach((title, index) => {
      var raw_value = title.innerText;
      var ticket_no = raw_value.split(" - ")[0].split("# ")[1];
      const storedTicketData = JSON.parse(localStorage.getItem('TICKET_DATA'));
      const h6Element = title.closest('.t-MediaList-item')?.querySelector('h6'); // Find <h6> relative to the title
      const h6Text = h6Element.innerText; // Get the text content
      const TICKET_DATA = JSON.parse(localStorage.getItem('TICKET_DATA'));
      if (storedTicketData) {
          if (ticket_no in storedTicketData) {
            var value = storedTicketData[ticket_no][0];
            const process = h6Text.split("Process: ")[1].split(" ,")[0];
              if (TICKET_DATA[ticket_no][1] != process) {
                h6Element.style.width = "50%"
                h6Element.style.fontSize = "25px"
                h6Element.style.color = "red"
                h6Element.innerText = "ACTIVITY UPDATE ALERT"
                h6Element.style.border = "2px solid"
                h6Element.style.borderRadius = "5px"
                h6Element.style.borderColor = "red"
                h6Element.style.display = "flex";
                h6Element.style.justifyContent = "center";
                h6Element.style.alignItems = "center";
                h6Element.style.height = "50%";
                let isVisible = true;

                setInterval(() => {
                    h6Element.style.visibility = isVisible ? "hidden" : "visible"; // Toggle visibility
                    isVisible = !isVisible; // Flip the state
                }, 750);
              }
            // if (value == "Student Feedback Required") {
            //   const lastAction = h6Text.includes("LastAction: ") ? h6Text.split("LastAction: ")[1] : "No LastAction";
            //   if (lastAction != value) {
            //     delete TICKET_DATA[ticket_no];
            //     localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
            //     var value = "NEW";
            //     const myHeaderDiv = title.closest('.t-MediaList-item').querySelector('#myheader');
            //     const myBlockDiv = title.closest('.t-MediaList-item');
            //     header_styling(myHeaderDiv, value);
            //     block_bakcground_styling(myBlockDiv, value);
            //     return;
            //   }
            // }

            // else if (value.includes("Approval")) {
            //   const process = h6Text.split("Process: ")[1].split(" ,")[0];
            //   if (TICKET_DATA[ticket_no][1] == process) {
            //     h6Element.style.fontSize = "25px"
            //     h6Element.innerText = "UPDATE"
            //     let isRed = true;

            //     setInterval(() => {
            //         h6Element.style.color = isRed ? "red" : "blue";
            //         isRed = !isRed;
            //     }, 750);
            //   }
            // }
            
            const myHeaderDiv = title.closest('.t-MediaList-item').querySelector('#myheader');
            const myBlockDiv = title.closest('.t-MediaList-item');
            header_styling(myHeaderDiv, value);
            block_bakcground_styling(myBlockDiv, value);
          }
          else {
            var value = "NEW";
            const myHeaderDiv = title.closest('.t-MediaList-item').querySelector('#myheader');
            const myBlockDiv = title.closest('.t-MediaList-item');
            header_styling(myHeaderDiv, value);
            block_bakcground_styling(myBlockDiv, value);
          }
      }
  });

  const pendingReportDiv = document.getElementById('Pending_report');

if (pendingReportDiv) {
  let TICKET_DATA;
  try {
    TICKET_DATA = JSON.parse(localStorage.getItem('TICKET_DATA')) || {};
  } catch (e) {
    TICKET_DATA = {};
  }

  const liItems = Array.from(pendingReportDiv.querySelectorAll('li'));

  const foundTickets = [];
  const notFoundTickets = [];
  const sortedTickets = {
    Urgent: [],
    Normal: [],
    In_Waiting: [],
    Ready_For_Collection: [],
    Approval: [],
    Student_Feedback_Required: []
  };

  liItems.forEach(li => {
    const ticketTitle = li.querySelector('.t-MediaList-title a'); // Adjusted selector
    if (ticketTitle) {
      const TICKET_DESC = ticketTitle.innerText;
      const TICKET_NO = TICKET_DESC.split(" - ")[0].split("# ")[1];
      // Check if the ticket no exists in TICKET_DATA
      if (TICKET_DATA.hasOwnProperty(TICKET_NO)) {
        let priority = TICKET_DATA[TICKET_NO][0];
        if (priority.includes("Approval")) {
          priority = "Approval"
        }
        if (priority.includes("In Waiting")) {
          priority = "In_Waiting"
        }
        if (priority.includes("Student Feedback Required")) {
          priority = "Student_Feedback_Required"
        }
        if (priority.includes("Ready For Collection")) {
          priority = "Ready_For_Collection"
        }
          
        if (sortedTickets[priority]) {
          sortedTickets[priority].push(li);
        } else {
          foundTickets.push(li); // Handle unexpected priorities
        }
      } else {
        notFoundTickets.push(li);
      }
    }
  });
   
  pendingReportDiv.innerHTML = '';
  notFoundTickets.forEach(li => pendingReportDiv.appendChild(li));

  ['Urgent', 'Normal', 'In_Waiting', 'Ready_For_Collection', 'Approval', 'Student_Feedback_Required'].forEach(priority => {
    sortedTickets[priority].forEach(li => pendingReportDiv.appendChild(li));
  });

  foundTickets.forEach(li => pendingReportDiv.appendChild(li));
} else {
  console.error('Pending_report div not found!');
}



}

if (TICKET_OPENED_SCREEN) {
  const STU_FEE_LEDGER = document.getElementById('report_table_R496187200018386424');
  const ticketTitle = document.querySelector('#R555757530040776432_report .t-SearchResults-title a');
  const TICKET_DESC = ticketTitle.innerText;
  const TICKET_NO = TICKET_DESC.split(" - ")[0].split("#")[1];
  const GET_NO_OF_PROCESSES = document.querySelector('.t-SearchResults-info').innerText;
  const SUBMIT_BUTTON = document.getElementById("B440422889565959082");
  var STATUS_ACTIVITY = GET_NO_OF_PROCESSES.split("Activities: ")[1]

  var TICKET_DATA = JSON.parse(localStorage.getItem('TICKET_DATA'));
  if (!TICKET_DATA) {
      TICKET_DATA = {};
      localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
  }
  let TICKET_TYPE = "Normal";


  var table = STU_FEE_LEDGER;
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
    const bodyContent2 = document.getElementById("R555757530040776432_report");
    const urgent_tag = document.createElement("div");
    urgent_tag.style.display = "flex";
    urgent_tag.style.flexDirection = "row";
    urgent_tag.innerHTML = `
      <div style="width: 100%;">
        <div style="width: 100%; display: flex; flex-direction: row; align-items: end; justify-content: end;">
          <div style="border: 2px solid red; padding: 5px; margin-bottom: -25px; font-weight: bolder; color: red; background-color: lightpink;">U R G E N T</div>
        </div>
      </div>
    `;
    bodyContent2.parentNode.insertBefore(urgent_tag, bodyContent2);
    let isVisible = true;

    setInterval(() => {
        urgent_tag.style.visibility = isVisible ? "hidden" : "visible"; // Toggle visibility
        isVisible = !isVisible; // Flip the state
    }, 750);
    

    
  }

  if (!(TICKET_NO in TICKET_DATA)) {
    TICKET_DATA[TICKET_NO] = [TICKET_TYPE, STATUS_ACTIVITY]
    localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
  }
  else {
    if (TICKET_DATA[TICKET_NO][1] != STATUS_ACTIVITY) {
      var old_ticket_type = TICKET_DATA[TICKET_NO][0];
      TICKET_DATA[TICKET_NO] = [old_ticket_type, STATUS_ACTIVITY];
      localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
    }
    if (TICKET_DATA[TICKET_NO][0].includes("Approval")) {
      if (SUBMIT_BUTTON) {
        TICKET_DATA[TICKET_NO] = [TICKET_TYPE, STATUS_ACTIVITY];
        localStorage.setItem('TICKET_DATA', JSON.stringify(TICKET_DATA));
      }
    }
  }

  
}

if (SUBMIT_BUTTON) {
  SUBMIT_BUTTON.addEventListener('click', function(event) {
      performCustomActivity();
  });
}


