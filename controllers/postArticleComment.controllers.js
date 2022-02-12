const {
  insertArticleComment,
} = require("../models/insertArticleComment.models");

exports.postArticleComment = (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;

  insertArticleComment(username, body, article_id)
    .then((comment) => {
      res.status(201).send({ comment: comment });
    })
    .catch(next);
};
