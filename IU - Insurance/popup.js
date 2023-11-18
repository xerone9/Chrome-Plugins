// popup.js

function searchEmployee() {
    var searchInput = document.getElementById("search_employee");
    if (searchInput.value === "") {
        return; // Prevent further execution if the input is empty
    }
}

const additionButton = document.getElementById('additionButton');
const deletionButton = document.getElementById('deletionButton');
const additionSection = document.getElementById('additionSection');
const deletionLabelSection = document.getElementById('deletionLabelSection');
const deletionTableSection = document.getElementById('deletionTableSection');
const deletionEmployeeNotFound = document.getElementById('deletionEmployeeNotFound');

additionButton.addEventListener('click', () => {
    additionButton.style.display = 'none';
    deletionButton.style.display = 'none';
    additionSection.classList.remove('hidden');
    deletionLabelSection.classList.add('hidden');
    deletionTableSection.classList.add('hidden');
    deletionEmployeeNotFound.classList.add('hidden');
});

deletionButton.addEventListener('click', () => {
    deletionButton.style.display = 'none';
    additionButton.style.display = 'none';
    additionSection.classList.add('hidden');
    deletionLabelSection.classList.remove('hidden');
    deletionTableSection.classList.add('hidden');
    deletionEmployeeNotFound.classList.add('hidden');
});
        

