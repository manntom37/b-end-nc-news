const db = require("../db/connection");

exports.fetchArticles = (
  order = `desc`,
  sort_by = "created_at",
  author,
  topic
) => {
  let queryParameters = [];
  let queryStr =
    "SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id=comments.article_id";

  if (topic) {
    queryStr += ` WHERE topic = $1`;
    queryParameters.push(topic);
  } else if (author) {
    queryStr += ` WHERE articles.author = $1`;
    queryParameters.push(author);
  }

  queryStr += ` GROUP BY articles.article_id
ORDER BY ${sort_by} ${order} `;

  return db.query(queryStr, queryParameters).then((res) => {
    return res.rows;
  });
};
