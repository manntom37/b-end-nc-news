const db = require("../db/connection");

exports.fetchArticleComments = (article_id) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1`, [article_id])
    .then((res) => {
      if (res.rows.length < 1) {
        return "No comments!";
      } else return res.rows;
    });
};
