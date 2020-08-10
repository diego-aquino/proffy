import addNewSchedule from './addNewSchedule.js';
import removeSchedule from './removeSchedule.js';

let numberOfSchedules = 1;
setup();

function setup() {
    const addScheduleButton = document.querySelector('#add-schedule');
    addScheduleButton.addEventListener('click', handleAddScheduleClick);
}

function handleAddScheduleClick(event) {
    const scheduleAdded = addNewSchedule(event);
    enableRemoveScheduleButton(scheduleAdded);

    if (++numberOfSchedules == 2) {
        const firstSchedule = document.querySelector('.schedule-item');
        enableRemoveScheduleButton(firstSchedule);
    }
}

function handleRemoveScheduleClick(event) {
    removeSchedule(event);
    numberOfSchedules--;

    if (numberOfSchedules == 1) {
        const remainingSchedule = document.querySelector('.schedule-item');
        disableRemoveScheduleButton(remainingSchedule);
    }
}

function enableRemoveScheduleButton(schedule) {
    const removeScheduleButton = schedule.querySelector('.remove-schedule');

    removeScheduleButton.addEventListener('click', handleRemoveScheduleClick);
    removeScheduleButton.classList.remove('inactive');
}

function disableRemoveScheduleButton(schedule) {
    const removeScheduleButton = schedule.querySelector('.remove-schedule');

    removeScheduleButton.removeEventListener('click', handleRemoveScheduleClick);
    removeScheduleButton.classList.add('inactive');
}
