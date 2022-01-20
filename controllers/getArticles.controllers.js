const { fetchArticles } = require("../models/fetchArticles.models");

exports.getArticles = (req, res) => {
  const orderBy = req.query.order;
  const sort_by = req.query.sort_by;
  const author = req.query.author;
  const topic = req.query.topic;
  fetchArticles(orderBy, sort_by, author, topic).then((articles) => {
    res.status(200).send({ articles });
  });
};
