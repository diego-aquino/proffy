export default function removeSchedule(event) {
    const removeScheduleButton = event.target.parentElement;
    const scheduleItem = removeScheduleButton.parentElement;

    const scheduleFieldset = document.querySelector('#schedule-items');
    scheduleFieldset.removeChild(scheduleItem);
}
