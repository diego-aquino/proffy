export default async function createProffy(db, data) {
    const { proffyData, classData, classSchedules } = data;

    const proffyId = await insertProffy(db, proffyData);
    const classId = await insertClass(db, classData, proffyId);
    await insertClassSchedules(db, classSchedules, classId);
}

async function insertProffy(db, proffyData) {
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyData.name}",
            "${proffyData.avatar}",
            "${proffyData.whatsapp}",
            "${proffyData.bio}"
        );
    `);
    const proffyId = insertedProffy.lastID;

    return proffyId;
}

async function insertClass(db, classData, proffyId) {
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            ${classData.subject},
            "${classData.cost}",
            ${proffyId}
        );
    `);
    const classId = insertedClass.lastID;

    return classId;
}

async function insertClassSchedules(db, classSchedules, classId) {
    const classSchedulesInsertionPromises = classSchedules.map( schedule => {
        return db.run(`
            INSERT INTO class_schedules (
                weekday,
                time_from,
                time_to,
                class_id
            ) VALUES (
                ${schedule.weekday},
                ${schedule.timeFrom},
                ${schedule.timeTo},
                ${classId}
            );
        `);
    });

    await Promise.all(classSchedulesInsertionPromises);
}
