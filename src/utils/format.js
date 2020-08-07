import { subjects } from './selectOptions';

export function convertClockTimeToMinutes(clockTime) {
    const [hours, minutes] = clockTime.split(':').map( value => +value );
    const totalTimeInMinutes = hours * 60 + minutes;

    return totalTimeInMinutes;
}

export function replaceSubjectIdBySubjectName(proffyData) {
    proffyData.subject = getSubjectName(proffyData.subject);
}

function getSubjectName(subjectId) {
    return subjects[subjectId - 1];
}
