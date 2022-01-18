const db = require('../db/connection');

exports.fetchTopics = () => {
    return db.query(`SELECT * FROM TOPICS`)
    .then((results) => {
        return results.rows
    })
}