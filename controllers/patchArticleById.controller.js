const { updateArticleById } = require("../models/updateArticleById");

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateArticleById(article_id, inc_votes)
    .then((article) => res.status(200).send({ article }))
    .catch(next);
};
