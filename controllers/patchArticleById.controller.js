const { updateArticleById } = require("../models/updateArticleById");

exports.patchArticleById = (req, res) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  // console.log(inc_votes)
  // console.log(article_id)
  updateArticleById(article_id, inc_votes).then((article) =>
  // console.log(article, ' <<< controller')
  res.status(200).send({ article })
  );
};
