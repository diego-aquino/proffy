export default function addNewSchedule() {
    const newSchedule = getNewEmptySchedule();

    const scheduleFieldset = document.querySelector('#schedule-items');
    scheduleFieldset.appendChild(newSchedule);

    return newSchedule;
}

function getNewEmptySchedule() {
    const scheduleItem = document.querySelector('.schedule-item');
    const newSchedule = getCloneWithEmptyFields(scheduleItem);

    return newSchedule;
}

function getCloneWithEmptyFields(scheduleItem) {
    const newSchedule = scheduleItem.cloneNode(true);

    const weekdaySelect = newSchedule.querySelector('select');
    weekdaySelect.selectedIndex = 0;

    const timeInputs = newSchedule.querySelectorAll('input');
    timeInputs.forEach( input => { input.value = ''; } );

    return newSchedule;
}
