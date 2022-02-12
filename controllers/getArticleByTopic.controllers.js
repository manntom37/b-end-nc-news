const {
  fetchArticleByTopic,
} = require("../models/fetchArticlesByTopic.models");

exports.getArticleByTopic = (req, res, next) => {
  if (topic) {
    queryStr += ` WHERE articles.topic = $1`;
    queryValues.push(topic);
  }

  queryStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order_by}`;
  const { topic } = req.body;
  fetchArticleByTopic(topic)
    .then((articles) => res.status(200).send({ articles }))
    .catch(next);
};
