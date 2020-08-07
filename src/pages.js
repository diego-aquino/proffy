import { db } from './database/db';
import { subjects, weekdays } from './utils/selectOptions';
import createProffy from './database/createProffy';
import {
    convertClockTimeToMinutes,
    replaceSubjectIdBySubjectName
} from './utils/format';

export function pageLanding(req, res) {
    return res.render('index.html');
}

export async function pageStudy(req, res) {
    const filters = req.query;

    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render('study.html', { filters, subjects, weekdays });
    }

    filters.timeInMinutes = convertClockTimeToMinutes(filters.time);

    const query = `
        SELECT proffys.*, classes.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedules.*
            FROM class_schedules
            WHERE class_schedules.class_id = classes.id
            AND class_schedules.weekday = ${filters.weekday}
            AND class_schedules.time_from <= ${filters.timeInMinutes}
            AND class_schedules.time_to > ${filters.timeInMinutes}
        )
        AND classes.subject = "${filters.subject}"
    `;

    try {
        const database = await db;
        const proffys = await database.all(query);

        proffys.map( proffy => replaceSubjectIdBySubjectName(proffy) );

        return res.render('study.html', { proffys, filters, subjects, weekdays });
    } catch (error) {
        console.error(error);
    }
}

export function pageGiveClasses(req, res) {
    return res.render('give-classes.html', { subjects, weekdays });
}

export async function proceedRegistration(req, res) {
    const {
        name, avatar, whatsapp, bio, subject,
        cost, weekdays, timeFrom, timeTo
    } = req.body;

    const proffyData = { name, avatar, whatsapp, bio };
    const classData = { subject, cost };
    const classSchedules = weekdays.map( (weekday, index) => {
        return {
            weekday,
            timeFrom: convertClockTimeToMinutes(timeFrom[index]),
            timeTo: convertClockTimeToMinutes(timeTo[index])
        };
    });

    try {
        const database = await db;
        await createProffy(database, { proffyData, classData, classSchedules});

        const pageQuery = `?subject=${subject}&weekday=${weekdays[0]}&time=${timeFrom[0]}`;

        return res.redirect(`/study${pageQuery}`);
    } catch (error) {
        console.error(error);
    }
}
