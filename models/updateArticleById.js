const db = require("../db/connection");

exports.updateArticleById = (article_id, inc_votes) => {
  const newVotes = inc_votes;
  if (!newVotes || Object.keys(inc_votes).length > 1) {
    return Promise.reject({
      status: 400,
      msg: `Sorry - Bad Request`,
    });
  }
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
      [inc_votes, article_id]
    )
    .then((res) => {
      return res.rows[0];
    });
};
