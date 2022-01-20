const {
  fetchArticleByTopic,
} = require("../models/fetchArticlesByTopic.models");

exports.getArticleByTopic = (req, res) => {
  const { topic } = req.body;

  console.log(topic);
  // console.log(article_id)
  fetchArticleByTopic(topic).then((articles) =>
    // console.log(article, ' <<< controller')
    res.status(200).send({ articles })
  );
};
