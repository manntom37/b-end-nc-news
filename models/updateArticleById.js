const db = require("../db/connection");

exports.updateArticleById = (article_id, inc_votes) => {
  return db
    .query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`, [
      inc_votes,
      article_id,
    ])
    .then((res) => {
        console.log(res.rows, 'model')
      return res.rows[0];
    });
};
