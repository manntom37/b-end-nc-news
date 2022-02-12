const { fetchArticlesById } = require("../models/fetchArticlesById.models");

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticlesById(article_id)
    .then((article) => res.status(200).send({ article }))
    .catch(next);
};
