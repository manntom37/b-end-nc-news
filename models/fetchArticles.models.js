const db = require("../db/connection");

exports.fetchArticles = (
  order = "DESC",
  sort_by = "created_at",
  author,
  topic
) => {
  let queryParameters = [];
  let queryStr =
    "SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id=comments.article_id";

  if (topic) {
    queryStr += ` WHERE topic = $1`;
    queryParameters.push(topic)
  }

  queryStr += ` GROUP BY articles.article_id
ORDER BY created_at DESC `;



console.log(queryStr)

  return db.query(queryStr, queryParameters).then((res) => {
    return res.rows;
  });
};
