const {
  fetchArticleComments,
} = require("../models/fetchArticleComments.models");

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  console.log(article_id, "<<<<< returns params = 2");
  fetchArticleComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
