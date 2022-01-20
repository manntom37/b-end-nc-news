const db = require("../db/connection");

exports.fetchArticlesByTopic = (topic) => {
  return db
    .query(`SELECT * FROM articles WHERE topic = $1`, [
      topic
    ])
    .then((res) => {
      return res.rows;
    });
};
