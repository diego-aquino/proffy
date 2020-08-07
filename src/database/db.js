import database from 'sqlite-async';

function execute(db) {
    // create tables on database
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER,
            class_id INTEGER
        );
    `);
}

export const db = database
    .open(__dirname + '/database.sqlite')
    .then(execute);
