const db = require("../db/connection");

exports.fetchArticlesById = (article_id) => {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id=comments.article_id WHERE comments.article_id = $1 GROUP BY articles.article_id`,
      [article_id]
    )
    .then((res) => {
      return res.rows[0];
    });
};
