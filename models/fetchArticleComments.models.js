const db = require("../db/connection");

exports.fetchArticleComments = (article_id) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1`, [article_id])
    .then((res) => {
      console.log(res.rows)
      return res.rows;
    });
};
