const db = require('../db');

const fromNow = (days=0, hours=0) => {
    let date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours, 0, 0, 0);
    return date;
}

db.connect('mongodb://localhost/site', async () => {
    await db.collection('turt').deleteMany({});

    let turts = [
        {content: 'content', author: 'author'}
    ];

    await db.collection('turt').insertMany(turts);

    db.close();
});