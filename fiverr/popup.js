document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('readCSV').addEventListener('click', function () {
    var fileInput = document.getElementById('fileInput');

    // Check if a file is selected
    if (fileInput.files.length > 0) {
      var file = fileInput.files[0];
      console.log('Selected file:', file.name);

      var reader = new FileReader();

      reader.onload = function (e) {
        var content = e.target.result;
        // Process the CSV content as needed

        // Split the CSV content by lines
        var lines = content.split('\n');

        // Function to iterate through rows and paste values with delay
        function processRows(index) {
          if (index < lines.length) {
            // Get the content of the first column from the current row
            var firstColumnValue = lines[index].split(',')[0].trim();

            // Send a message to the content script with the current value
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, { action: 'pasteValue', value: firstColumnValue }, function (response) {
                console.log('Message sent to content script');
                // Press enter after pasting the value
                chrome.tabs.sendMessage(tabs[0].id, { action: 'pressEnter' }, function (response) {
                  // Recursively process the next row with a delay of 1.5 seconds
                  setTimeout(function () {
                    processRows(index + 1);
                  }, 1500);
                });
              });
            });
          } else {
            console.log('All rows processed');
          }
        }

        // Start processing rows (start with index 0)
        processRows(0);
      };

      reader.onerror = function (e) {
        console.error('Error reading file:', e.target.error);
      };

      reader.readAsText(file);
    } else {
      console.error('No file selected');
    }
  });
});
