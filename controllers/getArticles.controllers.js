const { fetchArticles } = require("../models/fetchArticles.models");

exports.getArticles = (req, res, next) => {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};
